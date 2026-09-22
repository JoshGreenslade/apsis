import test from "node:test";
import assert from "node:assert/strict";
import { checkParameterName } from "./maintenance/check-docs.mjs";

test("mechanical drift check recognises a spelling, not semantic correctness", () => {
  assert.equal(checkParameterName("Use showDrafts=true.").accepted, false);
  assert.equal(checkParameterName("Use includeDrafts=true.").accepted, true);
  assert.equal(checkParameterName("All callers can always read drafts.").accepted, true);
});
