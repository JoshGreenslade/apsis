import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import pack from "../curriculums/agentic-engineering";

test("agent labs retain usable local download references", () => {
  for (const topic of pack.topics) {
    for (const block of topic.content.sections.flatMap((s) => s.blocks)) {
      if (block.kind !== "lab") continue;
      for (const match of JSON.stringify(block.data).matchAll(
        /\]\((\/agent-labs\/[^)]+)\)/g,
      ))
        assert.ok(existsSync(path.join("public", match[1])), match[1]);
    }
  }
});
