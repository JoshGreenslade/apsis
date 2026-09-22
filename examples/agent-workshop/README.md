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

## Harness and recovery

Run node run-harness.mjs for a labelled scripted demonstration, or add --live
with ANTHROPIC_API_KEY and ANTHROPIC_MODEL configured for paid SDK calls. Live
mode is limited to five calls and 1200 output tokens per call, with a 45-second
request timeout and no automatic retries. These are work bounds, not a currency
ceiling. Check provider pricing and spending controls. Never commit credentials.
Live provider execution has not been performed as part of course verification.

The harness reads the investigator fixture from the Apsis checkout, so retain
the repository directory layout. It proposes a fix; it cannot edit or run tests.
The default demonstration and automated tests make no provider calls.

Run node recovery-demo.mjs to simulate a lost response after a committed local
effect. It closes and reopens a temporary SQLite database, retries the same key,
and confirms only one proposal exists. It cleans up its own temporary directory.
This proves the local transaction pattern, not exactly-once remote execution.

## Evaluation, adoption and fleets

node evaluate-checker.mjs evaluates the narrow spelling check on labelled
teaching cases; the expected score is 2/4 and demonstrates its limitations.
node outcomes.mjs accounts for constructed cost/review data, not model results.
ADOPTION.md is the pilot and recovery worksheet.

migration/BRIEF.md defines the manual or agent-assisted API migration. Its
behaviour test starts green; the migration must also remove the old API name.
Run node --test migration/migration.test.mjs to check the starting behaviour.

node fleet-demo.mjs runs scripted workers through a real local SQLite queue.
It demonstrates dependencies, capacity and rejecting stale completion tokens.
It does not run agents, apply patches or fence external service writes. The
temporary database is cleaned up. This is a teaching coordinator, not a
production job service.
