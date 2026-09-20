import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import pack from "../curricula/agentic-engineering";
import { validatePack } from "../lib/curriculum-engine";
import { defineCurriculumTopic } from "../curriculum-support/authoring";
import { LessonContentSchema } from "../types/curriculum";
test("the consolidated course covers 15 connected chapters with usable lab references", () => {
  const p = validatePack(pack);
  assert.equal(p.topics.length, 15);
  assert.equal(p.topics.filter((t) => t.practical).length, 10);
  assert.equal(new Set(p.topics.map((t) => t.unit)).size, 15);
  assert.equal(p.topics.at(-2)!.id, "tiny-harness");
  assert.equal(p.topics.at(-1)!.id, "graduation");
  for (const t of p.topics) {
    assert.ok(t.retrievalProblems.length + t.fadedExercise.steps.length >= 6);
    assert.ok(t.teaching?.outcomes.length);
    assert.ok(t.theory.length >= 2);
    assert.ok(t.theoreticalMinimum);
    assert.ok(t.theoreticalMinimum.coreIdea.length > 120);
    assert.ok(t.theoreticalMinimum.widerConnection.length > 120);
    if (t.practical) {
      const text = JSON.stringify(t.practical);
      for (const match of text.matchAll(/\]\((\/agent-labs\/[^)]+)\)/g))
        assert.ok(existsSync(path.join("public", match[1])), match[1]);
    }
  }
});

test("content-first topics compile without duplicating legacy teaching fields", () => {
  const topic = defineCurriculumTopic({
    id: "content-first",
    title: "A flexible lesson",
    description: "Explain one decision clearly.",
    domain: "Test course",
    unit: "01 · Begin",
    prerequisites: [],
    minutes: 20,
    content: {
      sections: [
        {
          id: "opening",
          title: "Open with a case",
          role: "story",
          blocks: [{ kind: "prose", body: "A concrete case starts the lesson." }],
        },
      ],
    },
    sources: [{ title: "Test source", url: "https://example.com/source" }],
  });
  const pack = validatePack({
    id: "content-first-pack",
    version: "1.0.0",
    title: "Content first",
    description: "A test pack",
    conventions: "Test conventions",
    topics: [topic],
  });
  assert.equal(pack.topics[0].content?.sections[0].id, "opening");
});

test("content sections stay unique and agentic chapters retain structure", () => {
  assert.throws(() =>
    LessonContentSchema.parse({
      sections: [
        { id: "same", title: "One", blocks: [{ kind: "prose", body: "A" }] },
        { id: "same", title: "Two", blocks: [{ kind: "prose", body: "B" }] },
      ],
    }),
  );
  assert.equal(
    pack.topics.every((topic) =>
      topic.content?.sections.some((section) =>
        section.blocks.some((block) => block.kind === "diagram"),
      ),
    ),
    true,
  );
  assert.ok(
    new Set(
      pack.topics
        .find((topic) => topic.id === "why-multiple")!
        .retrievalProblems.map((problem) =>
          problem.answer.kind === "choice" ? problem.answer.value : "numeric",
        ),
    ).size > 1,
  );
});
