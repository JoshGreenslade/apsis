import test from "node:test";
import assert from "node:assert/strict";
import { dashboard } from "./dashboard.mjs";
import { report } from "./report.mjs";

test("both consumers retain behaviour through the migration", () => {
  assert.equal(dashboard(), "Latest: 2.1.0");
  assert.deepEqual(report(), { releases: ["2.1.0"] });
});
