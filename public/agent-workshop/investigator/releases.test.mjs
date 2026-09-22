import assert from "node:assert/strict";
import test from "node:test";
import { listReleases } from "./releases.ts";

test("omitting the parameter lists published releases", () => {
  assert.deepEqual(listReleases({}).map((release) => release.version), ["2.1.0"]);
});

test("explicit false does not expose drafts", () => {
  assert.deepEqual(listReleases({ includeDrafts: "false" }).map((release) => release.version), ["2.1.0"]);
});

test("explicit true includes drafts", () => {
  assert.equal(listReleases({ includeDrafts: "true" }).length, 2);
});

test("unknown values fail closed", () => {
  assert.deepEqual(listReleases({ includeDrafts: "yes" }).map((release) => release.version), ["2.1.0"]);
});
