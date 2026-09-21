import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtempSync,
  mkdirSync,
  copyFileSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, sep } from "node:path";
import { execFileSync } from "node:child_process";
import { defineCourse } from "../prefabs/authoring";

test("scaffolding creates a valid course and refuses overwrites and unsafe names", () => {
  const root = mkdtempSync(join(tmpdir(), "apsis-scaffold-"));
  try {
    mkdirSync(join(root, "scripts"));
    mkdirSync(join(root, "curriculums"));
    const script = join(root, "scripts/new-course.mjs");
    copyFileSync("scripts/new-course.mjs", script);
    const run = (...args: string[]) =>
      execFileSync(process.execPath, [script, ...args], { stdio: "pipe" });
    run("new-course", "A new course");
    const load = (file: string) =>
      JSON.parse(
        readFileSync(join(root, "curriculums/new-course", file), "utf8"),
      );
    const pack = defineCourse({
      ...load("course.json"),
      topics: [load("lessons/introduction.json")],
    });
    assert.equal(pack.title, "A new course");
    assert.equal(pack.topics[0].content.sections[0].blocks[0].kind, "content");
    assert.throws(() => run("new-course"));
    assert.equal(load("course.json").title, "A new course");
    assert.throws(() => run("../outside"));
  } finally {
    assert.ok(resolve(root).startsWith(resolve(tmpdir()) + sep));
    rmSync(root, { recursive: true });
  }
});
