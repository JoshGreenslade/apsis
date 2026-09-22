import test from "node:test";
import assert from "node:assert/strict";
import { openEffects } from "./effects.mjs";

test("lost response does not duplicate an effect with the same key", () => {
  const effects = openEffects(":memory:");
  try {
    assert.throws(() => effects.propose("one", "proposal", true), /lost response/);
    assert.equal(effects.propose("one", "proposal").body, "proposal");
    assert.equal(effects.count(), 1);
    assert.throws(() => effects.propose("one", "changed"), /different content/);
  } finally {
    effects.close();
  }
});
