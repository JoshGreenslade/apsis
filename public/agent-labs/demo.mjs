import { mkdtemp, cp } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runHarness, scriptedModel } from "./harness.mjs";
const scenario = process.argv[2] ?? "fix";
if (!["fix", "false-success", "exhausted"].includes(scenario))
  throw new Error("Use fix, false-success or exhausted");
const directory = await mkdtemp(path.join(tmpdir(), "apsis-agent-lab-"));
const root = path.join(directory, "fixture");
await cp(fileURLToPath(new URL("./fixture", import.meta.url)), root, {
  recursive: true,
});
const state = await runHarness({
  model: scriptedModel(scenario),
  root,
  artifacts: path.join(directory, "artifacts"),
  maxTurns: 5,
});
console.log(
  JSON.stringify(
    {
      mode: "scripted offline demonstration, not live AI",
      status: state.status,
      turns: state.history.length,
      artifacts: path.join(directory, "artifacts"),
    },
    null,
    2,
  ),
);
// Negative scenarios deliberately return non-complete status in JSON.
process.exitCode = scenario === "fix" && state.status !== "complete" ? 1 : 0;
