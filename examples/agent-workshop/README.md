# Agent workshop capability kit

Requires Node 24+. From this directory, run:

~~~sh
npm ci
npm test
npm run inspect:mcp
~~~

Installation downloads dependencies from npm. The exercises themselves use
local fixture data, start a local stdio child process and make no model calls.
They need no credentials and create no remote objects. Close the inspector to
stop its child process. Delete your disposable copy to clean up the exercise.

The SDK and Zod versions are pinned in package.json and package-lock.json.
The SDK's supported protocol negotiation, not the newest online documentation,
determines what this example speaks. Do not assume every MCP host supports the
same protocol features or transports.

contracts.mjs contains the capability. server.mjs exposes it as an MCP tool.
inspect-mcp.mjs is an actual SDK client: it discovers and calls the tool without
a model. Its output demonstrates protocol integration, not agent reasoning.

Try the direct path from this directory:

~~~sh
node --input-type=module -e "import { lookupContract } from './contracts.mjs'; console.log(lookupContract({service:'releases'}))"
~~~

The skill under skills/contract-investigation is a portable teaching example.
It is not installed automatically. First give its contents explicitly to your
chosen host in a disposable session. For discovery tests, install a copy using
that host's documented project-skill directory and confirm loading in its log.
Remove the copy afterwards. The skill is guidance, not an authorization boundary.
