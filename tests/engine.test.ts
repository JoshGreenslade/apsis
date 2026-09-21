import test from "node:test";
import assert from "node:assert/strict";
import katex from "katex";
import astrodynamics from "../curriculums/astrodynamics";
import mathematics from "../curriculums/mathematics-for-physics";
import {
  applyAction,
  evaluate,
  initialProgress,
  reviewQueue,
  scheduleReview,
  topologicalOrder,
  validatePack,
} from "../lib/curriculum-engine";
import type { LearnerState, Problem, Submission } from "../types/curriculum";
const correct = (p: Problem): Submission => ({
  value: String(p.answer.value),
  unit: p.answer.kind === "numeric" ? p.answer.unit : undefined,
});
const blank = (): LearnerState => ({ topics: {}, scratchpads: {} });
const pack = validatePack(astrodynamics),
  t = pack.topics[0];

test("every pack validates, every answer passes, every formula parses", () => {
  for (const p of [pack, validatePack(mathematics)]) {
    for (const t of p.topics)
      for (const problem of [
        ...t.diagnostics,
        ...t.fadedExercise.steps,
        ...t.retrievalProblems,
      ])
        assert.equal(
          evaluate(problem, correct(problem)).correct,
          true,
          problem.id,
        );
    function visit(value: unknown) {
      if (typeof value === "string") {
        assert.doesNotMatch(value, /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/);
        for (const m of value.matchAll(/\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g)) {
          assert.doesNotThrow(
            () =>
              katex.renderToString(m[1] ?? m[2], {
                throwOnError: true,
                strict: "error",
              }),
            value,
          );
        }
      } else if (value && typeof value === "object")
        Object.values(value).forEach(visit);
    }
    visit(p);
  }
});
test("DAG rejects cycles, duplicates, dangling dependencies and permits optional diagnostics", () => {
  const clone = structuredClone(pack.topics);
  clone[0].prerequisites = [clone[1].id];
  assert.throws(() => topologicalOrder(clone), /cycle/);
  assert.throws(() => topologicalOrder([t, t]), /Duplicate/);
  const missing = structuredClone(t);
  missing.prerequisites = ["absent"];
  assert.throws(() => topologicalOrder([missing]), /Missing/);
  const bad = structuredClone(pack);
  bad.topics[1].diagnostics.forEach((d) => (d.prerequisiteId = undefined));
  assert.doesNotThrow(() => validatePack(bad));
});
test("numeric evaluation distinguishes units, malformed inputs and tolerances", () => {
  const p = t.diagnostics[0];
  assert.equal(
    evaluate(p, { value: "7.5", unit: "m/s" }).category,
    "unit-reference",
  );
  for (const value of ["", "NaN", "Infinity", "7.5junk", "7,5", "1/2"])
    assert.equal(evaluate(p, { value, unit: "km/s" }).correct, false);
  assert.equal(evaluate(p, { value: "7.50e0", unit: " km/s " }).correct, true);
  assert.equal(evaluate(p, { value: "7.514", unit: "km/s" }).correct, true);
  assert.equal(evaluate(p, { value: "7.52", unit: "km/s" }).correct, false);
});
test("reading and skipping never grant mastery; every problem is optional and available", () => {
  let state = applyAction(pack, blank(), {
    type: "read",
    topicId: t.id,
    read: true,
  }).state;
  assert.equal(state.topics[t.id].read, true);
  assert.equal(state.topics[t.id].mastered, false);
  assert.equal(state.topics[t.id].schedule, null);
  for (let i = 0; i < 9; i++)
    state = applyAction(pack, state, { type: "advance", topicId: t.id }).state;
  assert.equal(state.topics[t.id].mastered, false);
  const second = t.fadedExercise.steps[1];
  state = applyAction(pack, state, {
    type: "answer",
    topicId: t.id,
    problemId: second.id,
    submission: correct(second),
  }).state;
  assert.equal(state.topics[t.id].passed.includes(second.id), true);
  assert.equal(
    state.topics[t.id].passed.includes(t.fadedExercise.steps[0].id),
    false,
  );
  for (const problem of t.retrievalProblems)
    state = applyAction(pack, state, {
      type: "answer",
      topicId: t.id,
      problemId: problem.id,
      submission: correct(problem),
    }).state;
  assert.equal(state.topics[t.id].mastered, true);
  assert.equal(state.topics[t.id].schedule?.intervalDays, 1);
  assert.equal(state.topics[t.id].passed.includes(t.diagnostics[0].id), false);
});
test("direct retrieval in a later lesson works without reading or prerequisite answers", () => {
  const topic = pack.topics[2];
  let state = blank();
  for (const p of topic.retrievalProblems)
    state = applyAction(pack, state, {
      type: "answer",
      topicId: topic.id,
      problemId: p.id,
      submission: correct(p),
    }).state;
  assert.equal(state.topics[topic.id].mastered, true);
  assert.equal(state.topics["two-body"], undefined);
  assert.equal(state.topics[topic.id].read, undefined);
});
test("SM-2 intervals, ease floor and lapse behavior are deterministic", () => {
  const now = new Date("2026-01-01T12:00:00Z");
  const first = scheduleReview(null, 5, now);
  assert.equal(first.intervalDays, 1);
  assert.equal(first.due, "2026-01-02T12:00:00.000Z");
  const second = scheduleReview(first, 5, now);
  assert.equal(second.intervalDays, 6);
  assert.ok(scheduleReview(second, 5, now).intervalDays > 6);
  let lapse = second;
  for (let i = 0; i < 20; i++) lapse = scheduleReview(lapse, 0, now);
  assert.equal(lapse.ease, 1.3);
  assert.equal(lapse.intervalDays, 1);
  assert.equal(lapse.repetitions, 0);
  assert.equal(lapse.lapses, 20);
});
test("review round-robins due topics, early practice preserves dates, lapses survive retries", () => {
  const now = new Date("2026-01-03T00:00:00Z");
  let state = blank();
  for (const topic of pack.topics.slice(0, 2))
    state.topics[topic.id] = {
      ...initialProgress(),
      stage: "complete",
      mastered: true,
      schedule: scheduleReview(null, 5, new Date("2026-01-01T00:00:00Z")),
    };
  const queue = reviewQueue(pack, state, now);
  assert.deepEqual(
    queue.map((x) => x.topicId),
    [
      "two-body",
      "geometry",
      "two-body",
      "geometry",
      "two-body",
      "geometry",
      "two-body",
      "geometry",
      "two-body",
      "geometry",
      "two-body",
      "geometry",
    ],
  );
  const p = t.retrievalProblems[0];
  state = applyAction(
    pack,
    state,
    {
      type: "answer",
      topicId: t.id,
      problemId: p.id,
      submission: { value: "-999", unit: "km/s" },
      review: true,
    },
    now,
  ).state;
  assert.equal(state.topics[t.id].schedule?.lapses, 1);
  for (const p of t.retrievalProblems)
    state = applyAction(
      pack,
      state,
      {
        type: "answer",
        topicId: t.id,
        problemId: p.id,
        submission: correct(p),
        review: true,
      },
      now,
    ).state;
  assert.equal(state.topics[t.id].schedule?.lapses, 1);
  assert.equal(state.topics[t.id].schedule?.repetitions, 0);
  const before = structuredClone(state.topics[t.id].schedule);
  for (const p of t.retrievalProblems)
    state = applyAction(
      pack,
      state,
      {
        type: "answer",
        topicId: t.id,
        problemId: p.id,
        submission: correct(p),
        review: true,
      },
      now,
    ).state;
  assert.deepEqual(state.topics[t.id].schedule, before);
});
test("independent Hohmann numerical benchmark and vis-viva energy identity", () => {
  const h = pack.topics.find((x) => x.id === "hohmann")!;
  const a = h.fadedExercise.steps[1].answer,
    b = h.fadedExercise.steps[2].answer;
  assert.equal(a.kind, "numeric");
  assert.equal(b.kind, "numeric");
  if (a.kind === "numeric" && b.kind === "numeric") {
    assert.ok(Math.abs(a.value - 1.16738) < 0.00002);
    assert.ok(Math.abs(b.value - 0.97915) < 0.00002);
  }
  const p = t.retrievalProblems[0].answer;
  if (p.kind === "numeric")
    assert.ok(
      Math.abs(p.value ** 2 / 2 - 398600.4418 / 8000 + 398600.4418 / 24000) <
        1e-10,
    );
});
