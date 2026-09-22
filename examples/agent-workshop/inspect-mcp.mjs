import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { fileURLToPath } from "node:url";

const transport = new StdioClientTransport({
  command: process.execPath,
  args: [fileURLToPath(new URL("./server.mjs", import.meta.url))],
});
const client = new Client({ name: "apsis-inspector", version: "1.0.0" });
try {
  await client.connect(transport);
  console.log("DISCOVERED TOOLS", JSON.stringify(await client.listTools(), null, 2));
  console.log("TOOL RESULT", JSON.stringify(await client.callTool({
    name: "lookup_contract", arguments: { service: "releases" },
  }), null, 2));
} finally {
  await client.close();
}
