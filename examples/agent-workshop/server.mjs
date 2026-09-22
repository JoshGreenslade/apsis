import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { lookupContract, lookupShape } from "./contracts.mjs";

const server = new McpServer({ name: "apsis-contracts", version: "1.0.0" });
server.registerTool("lookup_contract", {
  description: "Read the current fixture contract and owner for a service. Does not change files or authorize access to draft releases.",
  inputSchema: lookupShape,
  annotations: { readOnlyHint: true },
}, async (input) => ({
  content: [{ type: "text", text: JSON.stringify(lookupContract(input)) }],
}));

await server.connect(new StdioServerTransport());
