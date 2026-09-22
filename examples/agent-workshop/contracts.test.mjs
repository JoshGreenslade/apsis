import test from "node:test";
import assert from "node:assert/strict";
import { lookupContract } from "./contracts.mjs";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { fileURLToPath } from "node:url";

test("direct contract lookup validates input and returns provenance", () => {
  assert.equal(lookupContract({ service: "releases" }).revision, "fixture-1");
  assert.throws(() => lookupContract({ service: "unknown" }));
  assert.throws(() => lookupContract({ service: "releases", write: true }));
});

test("MCP discovers and calls the same read-only capability", { timeout: 10000 }, async () => {
  const client = new Client({ name: "test-client", version: "1.0.0" });
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [fileURLToPath(new URL("./server.mjs", import.meta.url))],
  });
  try {
    await client.connect(transport);
    const tools = await client.listTools();
    assert.equal(tools.tools[0].name, "lookup_contract");
    const result = await client.callTool({ name: "lookup_contract", arguments: { service: "releases" } });
    assert.notEqual(result.isError, true);
    assert.deepEqual(JSON.parse(result.content[0].text), lookupContract({ service: "releases" }));
    const invalid = await client.callTool({ name: "lookup_contract", arguments: { service: "unknown" } });
    assert.equal(invalid.isError, true);
  } finally {
    await client.close();
  }
});
