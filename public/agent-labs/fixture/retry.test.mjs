import test from "node:test";
import assert from "node:assert/strict";
import { canAttempt } from "./retry.mjs";
test("attempt boundary", () => {
  assert.equal(canAttempt(0, 3), true);
  assert.equal(canAttempt(2, 3), true);
  assert.equal(canAttempt(3, 3), false);
  assert.equal(canAttempt(4, 3), false);
  assert.equal(canAttempt(0, 0), false);
});
