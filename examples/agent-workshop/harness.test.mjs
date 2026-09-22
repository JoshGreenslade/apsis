import test from "node:test";
import assert from "node:assert/strict";
import { investigate } from "./harness.mjs";

test("tool requests receive correlated results before a final answer", async () => {
  let calls = 0;
  const result = await investigate(async ({ messages }) => {
    if (calls++ === 0) return { stop_reason: "tool_use", content: [
      { type: "tool_use", id: "a", name: "lookup_contract", input: { service: "releases" } },
      { type: "tool_use", id: "b", name: "unknown", input: {} },
    ] };
    const results = messages.at(-1).content;
    assert.equal(results[0].tool_use_id, "a");
    assert.equal(results[1].tool_use_id, "b");
    assert.equal(results[1].is_error, true);
    return { stop_reason: "end_turn", content: [{ type: "text", text: "Proposal only" }] };
  });
  assert.equal(result.status, "answered");
  assert.equal(calls, 2);
});

test("persistent tool requests stop at the configured turn bound", async () => {
  const result = await investigate(async () => ({
    stop_reason: "tool_use", content: [{ type: "tool_use", id: "x", name: "unknown", input: {} }],
  }), { maxTurns: 2 });
  assert.equal(result.status, "turn-limit");
});

test("truncated output is not treated as an answer", async () => {
  const result = await investigate(async () => ({ stop_reason: "max_tokens", content: [] }));
  assert.equal(result.status, "truncated");
});
