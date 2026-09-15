import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import pack from "../curricula/agentic-engineering";
import { validatePack } from "../lib/curriculum-engine";
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
