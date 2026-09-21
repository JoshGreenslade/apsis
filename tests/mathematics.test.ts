import test from "node:test";
import assert from "node:assert/strict";
import mathematics from "../curriculums/mathematics-for-physics";

test("overview throughlines reference existing lessons", () => {
  for (const thread of mathematics.overview?.throughlines ?? []) {
    for (const id of thread.topicIds)
      assert.ok(
        mathematics.topics.some((topic) => topic.id === id),
        `${thread.title}/${id}`,
      );
  }
});

test("interactive maths prefabs remain available in the authored lessons", () => {
  const explorations = mathematics.topics
    .flatMap((t) => t.content.sections.flatMap((s) => s.blocks))
    .filter((b) => b.kind === "exploration");
  assert.deepEqual(
    explorations.map((b) => b.experiment),
    ["derivatives", "integrals", "eigenvectors", "fourier", "metrics"],
  );
});
