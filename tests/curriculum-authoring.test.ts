import test from "node:test";
import assert from "node:assert/strict";
import { choice, defineCurriculumTopic } from "../prefabs/authoring";
import { applyAction, validatePack } from "../lib/curriculum-engine";
import type { CurriculumTopicDraft } from "../types/curriculum";

const pack = {
  id: "authoring-fixture",
  version: "1",
  title: "Authoring fixture",
  description: "A course-independent fixture for authoring tests.",
  conventions: "",
};

const draft: CurriculumTopicDraft = {
  id: "reading",
  title: "A reading lesson",
  description: "Follow an argument.",
  domain: "Other",
  unit: "One",
  prerequisites: [],
  minutes: 10,
  content: {
    sections: [
      {
        id: "opening",
        title: "The case",
        blocks: [
          { kind: "content", body: "Here is the evidence." },
          {
            kind: "question",
            question: "What follows?",
            answer: "A provisional conclusion.",
          },
        ],
      },
    ],
  },
  sources: [{ title: "Source", url: "https://example.com" }],
};

test("multiple prerequisites do not manufacture diagnostics or assessments", () => {
  const a = defineCurriculumTopic({ ...draft, id: "a" });
  const b = defineCurriculumTopic({ ...draft, id: "b" });
  const c = defineCurriculumTopic({
    ...draft,
    id: "c",
    prerequisites: ["a", "b"],
  });
  const course = validatePack({ ...pack, topics: [a, b, c] });
  assert.deepEqual(course.topics[2].diagnostics, []);
  assert.deepEqual(course.topics[2].retrievalProblems, []);
  const read = applyAction(
    course,
    { topics: {}, scratchpads: {} },
    { type: "read", topicId: "c", read: true },
  );
  assert.equal(read.state.topics.c.mastered, false);
});

test("authored questions survive exactly, including multiple prerequisite diagnostics", () => {
  const a = defineCurriculumTopic({ ...draft, id: "a" });
  const b = defineCurriculumTopic({ ...draft, id: "b" });
  const q = choice(
    "q",
    "Which observation matters?",
    ["A measurement", "A guess"],
    0,
    "The measurement.",
    "Check the evidence.",
  );
  const diagnostics = ["a", "b"].map((id) => ({
    ...q,
    id: "recall-" + id,
    prerequisiteId: id,
  }));
  const c = defineCurriculumTopic({
    ...draft,
    id: "c",
    prerequisites: ["a", "b"],
    diagnostics,
    retrievalProblems: [q],
  });
  validatePack({ ...pack, topics: [a, b, c] });
  assert.deepEqual(c.diagnostics, diagnostics);
  assert.deepEqual(c.retrievalProblems, [q]);
  assert.deepEqual(c.fadedExercise.steps, []);
});

test("answering an optional warm-up cannot master an unassessed lesson", () => {
  const q = choice(
    "warmup",
    "Recall?",
    ["Yes", "No"],
    0,
    "Yes",
    "Recall the evidence.",
  );
  const topic = defineCurriculumTopic({ ...draft, diagnostics: [q] });
  const result = applyAction(
    { ...pack, topics: [topic] },
    { topics: {}, scratchpads: {} },
    {
      type: "answer",
      topicId: topic.id,
      problemId: q.id,
      submission: { value: "0" },
    },
  );
  assert.equal(result.state.topics[topic.id].mastered, false);
  assert.equal(result.state.topics[topic.id].schedule, null);
});
