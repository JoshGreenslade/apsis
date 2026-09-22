import { lookupContract, lookupInput } from "./contracts.mjs";
import { z } from "zod";
import { readFile } from "node:fs/promises";

export const tools = [
  {
    name: "lookup_contract",
    description: "Read the release service contract, its scope and provenance.",
    input_schema: z.toJSONSchema(lookupInput),
  },
  {
    name: "read_implementation",
    description: "Read the supplied release-query implementation. This does not edit or execute it.",
    input_schema: { type: "object", properties: {}, additionalProperties: false },
  },
];

async function execute(name, input) {
  if (name === "lookup_contract") return lookupContract(input);
  if (name === "read_implementation") {
    z.object({}).strict().parse(input);
    return { source: "investigator/releases.ts", body: await readFile(
      new URL("../../public/agent-workshop/investigator/releases.ts", import.meta.url), "utf8",
    ) };
  }
  throw new Error("Unknown tool: " + name);
}

export async function investigate(complete, { maxTurns = 5, onEvent = () => {} } = {}) {
  if (!Number.isInteger(maxTurns) || maxTurns < 1 || maxTurns > 10) throw new Error("Invalid turn bound");
  const messages = [{
    role: "user",
    content: "Investigate why includeDrafts=false exposes drafts. Read the implementation and current contract. Explain a bounded proposed fix. You cannot edit files or run tests; do not claim to have done so.",
  }];
  for (let turn = 1; turn <= maxTurns; turn++) {
    onEvent({ type: "model-request", turn });
    const response = await complete({ messages: structuredClone(messages), tools });
    onEvent({ type: "model-response", turn, stop: response.stop_reason, usage: response.usage });
    if (!Array.isArray(response.content)) throw new Error("Missing response content");
    if (response.stop_reason === "max_tokens") return { status: "truncated", messages };
    messages.push({ role: "assistant", content: response.content });
    const calls = response.content.filter((block) => block.type === "tool_use");
    if (calls.length === 0) {
      const answer = response.content.filter((block) => block.type === "text").map((block) => block.text).join("\n");
      return { status: response.stop_reason === "end_turn" ? "answered" : "stopped", answer, messages };
    }
    const results = [];
    for (const call of calls) {
      try {
        const value = await execute(call.name, call.input);
        onEvent({ type: "tool-result", name: call.name, id: call.id, value });
        results.push({ type: "tool_result", tool_use_id: call.id, content: JSON.stringify(value) });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        onEvent({ type: "tool-error", name: call.name, id: call.id, message });
        results.push({ type: "tool_result", tool_use_id: call.id, is_error: true, content: message });
      }
    }
    messages.push({ role: "user", content: results });
  }
  return { status: "turn-limit", messages };
}
