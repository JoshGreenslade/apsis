import test from "node:test";
import assert from "node:assert/strict";
import mathematics from "../curricula/mathematics-for-physics";
import { syllabus } from "../curricula/mathematics-for-physics/syllabus";

const completed = new Set([
  "series",
  "vectors",
  "linear-maps",
  "eigenvectors",
  "line-integrals",
  "divergence",
  "curl-stokes",
  "coupled-modes",
  "fourier",
  "pdes",
  "metrics",
  "symmetry",
  "mechanics-synthesis",
  "fields-synthesis",
  "quantum-relativity-synthesis",
]);

test("the maths syllabus contains real content in every chapter", () => {
  assert.deepEqual(
    mathematics.topics.map((topic) => topic.id),
    syllabus.map((plan) => plan.id),
  );
  for (const topic of mathematics.topics) {
    assert.doesNotMatch(
      JSON.stringify(topic),
      /\bSTUB\b|placeholder (?:chapter|readiness|prediction)|chapter is not yet written/i,
      topic.id,
    );
    assert.ok(topic.theoreticalMinimum, topic.id);
    assert.ok(topic.theoreticalMinimum.coreIdea.length > 120, topic.id);
    assert.ok(topic.theoreticalMinimum.widerConnection.length > 120, topic.id);
  }
});

test("the mathematics overview makes recurring cross-discipline structures explicit", () => {
  const threads = mathematics.overview?.throughlines ?? [];
  assert.ok(threads.length >= 5);
  for (const thread of threads) {
    assert.ok(thread.description.length > 180, thread.title);
    assert.ok(thread.topicIds.length >= 4, thread.title);
    for (const id of thread.topicIds)
      assert.ok(mathematics.topics.some((topic) => topic.id === id), `${thread.title}/${id}`);
  }
});

test("unit boundaries include cumulative transfer practice", () => {
  const boundaryIds = [
    "trigonometry",
    "exponentials",
    "series",
    "eigenvectors",
    "oscillators",
    "constraints",
    "curl-stokes",
    "pdes",
    "gaussian",
    "symmetry",
    "quantum-relativity-synthesis",
  ];
  for (const id of boundaryIds) {
    const topic = mathematics.topics.find((candidate) => candidate.id === id);
    assert.equal(topic?.transferProblems?.length, 2, id);
  }
});

test("completed maths chapters include the authored teaching and practice progression", () => {
  const topics = mathematics.topics.filter((topic) => completed.has(topic.id));
  assert.equal(topics.length, completed.size);
  for (const topic of topics) {
    assert.ok(topic.theory.length >= 3, topic.id);
    assert.ok(topic.intuition.thoughtExperiments.length >= 2, topic.id);
    assert.ok(topic.workedExample.steps.length >= 4, topic.id);
    assert.ok(topic.fadedExercise.steps.length >= 4, topic.id);
    assert.ok(topic.retrievalProblems.length >= 6, topic.id);
    assert.equal(
      topic.teaching?.checkpoints.length,
      topic.theory.length,
      topic.id,
    );
    for (const checkpoint of topic.teaching!.checkpoints) {
      assert.ok((checkpoint.further?.length ?? 0) >= 3, topic.id);
      for (const text of [
        checkpoint.bridge,
        checkpoint.meaning,
        ...topic.teaching!.outcomes,
      ]) {
        assert.doesNotMatch(
          text,
          /\$/,
          `${topic.id}: plain-text teaching field`,
        );
      }
    }
    for (const problem of [
      ...topic.diagnostics,
      ...topic.fadedExercise.steps,
      ...topic.retrievalProblems,
    ]) {
      if (problem.answer.kind === "numeric" && problem.answer.unit === "1") {
        assert.match(problem.prompt, /unit 1/i, `${topic.id}/${problem.id}`);
      }
    }
  }
});

test("all three maths capstones include an independent written investigation and review", () => {
  for (const topic of mathematics.topics.filter((topic) =>
    topic.id.endsWith("-synthesis"),
  )) {
    assert.ok(topic.practical, topic.id);
    assert.ok(topic.practical.steps.length >= 4, topic.id);
    assert.ok(topic.practical.deliverables.length >= 3, topic.id);
    assert.match(topic.practical.brief, /self.assess/i, topic.id);
    assert.ok(topic.practical.review.length > 500, topic.id);
  }
});
