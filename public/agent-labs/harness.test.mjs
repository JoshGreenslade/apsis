import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, cp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  runHarness,
  scriptedModel,
  checkedPath,
  runCommand,
} from "./harness.mjs";
async function fixture() {
  const dir = await mkdtemp(path.join(tmpdir(), "apsis-harness-test-"));
  const root = path.join(dir, "fixture");
  await cp(fileURLToPath(new URL("./fixture", import.meta.url)), root, {
    recursive: true,
  });
  return { root, artifacts: path.join(dir, "artifacts") };
}
test("observes failure, edits fixture, verifies final state and persists evidence", async () => {
  const paths = await fixture();
  const result = await runHarness({ ...paths, model: scriptedModel() });
  assert.equal(result.history[0].observation.status, "failed");
  assert.equal(result.status, "complete");
  assert.notEqual(result.initialFingerprint, result.currentFingerprint);
  assert.equal(
    JSON.parse(await readFile(path.join(paths.artifacts, "state.json"), "utf8"))
      .status,
    "complete",
  );
});
test("rejects false success and preserves exhausted status", async () => {
  assert.equal(
    (
      await runHarness({
        ...(await fixture()),
        model: scriptedModel("false-success"),
      })
    ).status,
    "unverified",
  );
  assert.equal(
    (
      await runHarness({
        ...(await fixture()),
        model: scriptedModel("exhausted"),
        maxTurns: 2,
      })
    ).status,
    "exhausted",
  );
});
test("rejects traversal, unknown commands, protected-test writes and malformed responses", async () => {
  const paths = await fixture();
  await assert.rejects(checkedPath(paths.root, "../outside"));
  await assert.rejects(checkedPath(paths.root, "retry.test.mjs", true));
  assert.equal(
    (await runCommand("rm -rf anything", { cwd: paths.root })).status,
    "denied",
  );
  assert.equal(
    (await runHarness({ ...paths, model: async () => null })).status,
    "blocked",
  );
});
test("bounds an unresponsive model adapter", async () => {
  const paths = await fixture();
  const result = await runHarness({
    ...paths,
    model: () => new Promise(() => {}),
    timeoutMs: 50,
  });
  assert.equal(result.status, "blocked");
  assert.match(result.history[0].message, /model timeout/);
});
test("kills a hanging fixture test at the tool timeout", async () => {
  const paths = await fixture();
  await writeFile(
    path.join(paths.root, "retry.test.mjs"),
    "setInterval(() => {}, 1000);",
  );
  assert.equal(
    (await runCommand("test", { cwd: paths.root, timeoutMs: 150 })).status,
    "timeout",
  );
});
