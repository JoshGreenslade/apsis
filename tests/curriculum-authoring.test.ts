import test from "node:test";
import assert from "node:assert/strict";
import { choice, defineCurriculumTopic, contentFromCurriculumTopic } from "../curriculum-support/authoring";
import { applyAction, validatePack } from "../lib/curriculum-engine";
import { consolidateTopics } from "../curricula/agentic-engineering/lesson";
import pack from "../curricula/agentic-engineering";
import astro from "../curricula/astrodynamics";
import type { CurriculumTopicDraft } from "../types/curriculum";

const draft: CurriculumTopicDraft = {
  id: "reading", title: "A reading lesson", description: "Follow an argument.",
  domain: "Other", unit: "One", prerequisites: [], minutes: 10,
  content: { sections: [{ id: "opening", title: "The case", blocks: [
    { kind: "prose", body: "Here is the evidence." },
    { kind: "checkpoint", question: "What follows?", answer: "A provisional conclusion." },
  ] }] },
  sources: [{ title: "Source", url: "https://example.com" }],
};

test("multiple prerequisites do not manufacture diagnostics or assessments", () => {
  const a = defineCurriculumTopic({ ...draft, id: "a" });
  const b = defineCurriculumTopic({ ...draft, id: "b" });
  const c = defineCurriculumTopic({ ...draft, id: "c", prerequisites: ["a", "b"] });
  const course = validatePack({ ...pack, topics: [a, b, c] });
  assert.deepEqual(course.topics[2].diagnostics, []);
  assert.deepEqual(course.topics[2].retrievalProblems, []);
  const read = applyAction(course, { topics: {}, scratchpads: {} }, { type: "read", topicId: "c", read: true });
  assert.equal(read.state.topics.c.mastered, false);
});

test("authored questions survive exactly, including multiple prerequisite diagnostics", () => {
  const a = defineCurriculumTopic({ ...draft, id: "a" });
  const b = defineCurriculumTopic({ ...draft, id: "b" });
  const q = choice("q", "Which observation matters?", ["A measurement", "A guess"], 0, "The measurement.", "Check the evidence.");
  const diagnostics = ["a", "b"].map(id => ({ ...q, id: "recall-" + id, prerequisiteId: id }));
  const c = defineCurriculumTopic({
    ...draft, id: "c", prerequisites: ["a", "b"],
    diagnostics, retrievalProblems: [q],
  });
  validatePack({ ...pack, topics: [a, b, c] });
  assert.deepEqual(c.diagnostics, diagnostics);
  assert.deepEqual(c.retrievalProblems, [q]);
  assert.deepEqual(c.fadedExercise.steps, []);
});

test("answering an optional warm-up cannot master an unassessed lesson", () => {
  const q = choice("warmup", "Recall?", ["Yes", "No"], 0, "Yes", "Recall the evidence.");
  const topic = defineCurriculumTopic({ ...draft, diagnostics: [q] });
  const result = applyAction({ ...pack, topics: [topic] }, { topics: {}, scratchpads: {} }, {
    type: "answer", topicId: topic.id, problemId: q.id, submission: { value: "0" },
  });
  assert.equal(result.state.topics[topic.id].mastered, false);
  assert.equal(result.state.topics[topic.id].schedule, null);
});

test("legacy conversion and mixed consolidation preserve reader content", () => {
  const legacy = astro.topics[0];
  const blocks = contentFromCurriculumTopic(legacy).sections.flatMap(s => s.blocks);
  assert.deepEqual(blocks.find(b => b.kind === "diagram"), { kind: "diagram", data: legacy.diagram });
  for (const checkpoint of legacy.teaching!.checkpoints) {
    assert.ok(blocks.some(b => b.kind === "checkpoint" && b.question === checkpoint.question && b.answer === checkpoint.answer));
  }
  for (const question of legacy.intuition.thoughtExperiments) {
    assert.ok(blocks.some(b => b.kind === "callout" && b.body === question));
  }
  for (const sidebar of legacy.sidebars) {
    assert.ok(blocks.some(b => b.kind === "sidebar" && b.body === sidebar.body));
  }
  const modern = defineCurriculumTopic(draft);
  const mixed = consolidateTopics([legacy, modern], [[legacy.id, modern.id]])[0];
  const combined = mixed.content!.sections.flatMap(s => s.blocks);
  assert.equal(combined.length, blocks.length + modern.content!.sections[0].blocks.length);
  assert.equal(new Set(mixed.content!.sections.map(s => s.id)).size, mixed.content!.sections.length);
});

test("reordered warm-ups recall the preceding chapter", () => {
  for (let i = 1; i < pack.topics.length; i++) {
    const previous = pack.topics[i - 1];
    const diagnostic = pack.topics[i].diagnostics[0];
    assert.equal(diagnostic.prerequisiteId, previous.id);
    assert.ok(previous.retrievalProblems.some(p => p.prompt === diagnostic.prompt));
  }
});
