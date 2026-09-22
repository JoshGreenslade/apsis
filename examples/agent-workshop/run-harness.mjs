import { investigate } from "./harness.mjs";

const live = process.argv.includes("--live");
let complete;
if (live) {
  if (!process.env.ANTHROPIC_API_KEY || !process.env.ANTHROPIC_MODEL) {
    throw new Error("Live mode requires ANTHROPIC_API_KEY and ANTHROPIC_MODEL. Use a currently available tool-capable model.");
  }
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic({ maxRetries: 0, timeout: 45000 });
  complete = (input) => client.messages.create({
    model: process.env.ANTHROPIC_MODEL, max_tokens: 1200, ...input,
  });
  console.error("LIVE: up to 5 paid calls, 1200 output tokens per call. No file changes or test execution.");
} else {
  console.error("SCRIPTED demonstration: no model is called. This checks runtime flow, not model quality.");
  let turn = 0;
  complete = async () => ++turn === 1 ? {
    stop_reason: "tool_use",
    content: [
      { type: "tool_use", id: "contract-1", name: "lookup_contract", input: { service: "releases" } },
      { type: "tool_use", id: "source-1", name: "read_implementation", input: {} },
    ],
  } : {
    stop_reason: "end_turn",
    content: [{ type: "text", text: 'Constructed answer: Boolean("false") is true. Propose exact comparison with "true". No edit or test was performed.' }],
  };
}
const result = await investigate(complete, { onEvent: (event) => console.log(JSON.stringify(event)) });
console.log(JSON.stringify({ status: result.status, answer: result.answer }));
