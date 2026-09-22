import test from "node:test";
import assert from "node:assert/strict";
import { openQueue } from "./queue.mjs";

test("dependencies, capacity and stale lease fencing", () => {
  let time = 0;
  const queue = openQueue(":memory:", { capacity: 1, leaseMs: 100, now: () => time });
  try {
    queue.add("a");
    queue.add("b", ["a"]);
    const first = queue.claim();
    assert.equal(first.id, "a");
    assert.equal(queue.claim(), null);
    time = 101;
    const retry = queue.claim();
    assert.equal(retry.id, "a");
    assert.notEqual(retry.token, first.token);
    assert.throws(() => queue.complete(first, {}), /Stale/);
    queue.complete(retry, { accepted: true });
    assert.equal(queue.claim().id, "b");
  } finally { queue.close(); }
});

test("unknown dependencies and duplicate jobs are rejected", () => {
  const queue = openQueue(":memory:");
  try {
    assert.throws(() => queue.add("b", ["a"]), /dependencies/);
    queue.add("a");
    assert.throws(() => queue.add("a"));
    assert.equal(queue.snapshot().length, 1);
  } finally { queue.close(); }
});
