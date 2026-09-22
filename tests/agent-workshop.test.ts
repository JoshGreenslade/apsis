import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

test("investigator starts with two failures and the documented fix satisfies its contract", () => {
  const source = resolve("public/agent-workshop/investigator");
  const directory = mkdtempSync(join(tmpdir(), "apsis-investigator-"));
  try {
    for (const file of ["package.json", "releases.test.mjs", "releases.ts"]) {
      copyFileSync(join(source, file), join(directory, file));
    }
    const env = { ...process.env };
    delete env.NODE_TEST_CONTEXT;
    const run = () => spawnSync(process.execPath, ["--test", "--test-reporter=tap", "releases.test.mjs"], {
      cwd: directory, encoding: "utf8", timeout: 15000, env,
    });
    const before = run();
    assert.equal(before.status, 1, before.stderr);
    assert.match(before.stdout, /# pass 2/);
    assert.match(before.stdout, /# fail 2/);
    const path = join(directory, "releases.ts");
    const code = readFileSync(path, "utf8");
    assert.ok(code.includes("Boolean(query.includeDrafts)"));
    writeFileSync(path, code.replace("Boolean(query.includeDrafts)", 'query.includeDrafts === "true"'));
    const after = run();
    assert.equal(after.status, 0, after.stdout + after.stderr);
    assert.match(after.stdout, /# pass 4/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
