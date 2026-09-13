import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile, writeFile, realpath, lstat, mkdir } from "node:fs/promises";
import path from "node:path";

// Teaching core, not an OS sandbox. Only the disposable fixture is supported.
const permittedFiles = new Set(["retry.mjs", "retry.test.mjs"]);
export async function checkedPath(root, name, write = false) {
  if (
    typeof name !== "string" ||
    !permittedFiles.has(name) ||
    (write && name !== "retry.mjs")
  )
    throw new Error("denied: path is outside the fixture policy");
  const canonicalRoot = await realpath(root);
  const target = path.join(canonicalRoot, name);
  const info = await lstat(target);
  if (info.isSymbolicLink() || !info.isFile())
    throw new Error("denied: expected a regular fixture file");
  const resolved = await realpath(target);
  if (path.dirname(resolved) !== canonicalRoot)
    throw new Error("denied: escaped fixture root");
  return resolved;
}
export async function fingerprint(root) {
  const hash = createHash("sha256");
  for (const name of [...permittedFiles].sort())
    hash.update(name).update(await readFile(await checkedPath(root, name)));
  return hash.digest("hex");
}
export function runCommand(
  command,
  { cwd, timeoutMs = 5000, outputLimit = 12000 } = {},
) {
  if (command !== "test")
    return Promise.resolve({
      status: "denied",
      output: "Only the named test command is allowed.",
    });
  return new Promise((resolve) => {
    let output = "",
      truncated = false,
      timedOut = false,
      settled = false;
    // A nested node:test process must not inherit its parent's test-runner IPC mode.
    const childEnv = { ...process.env };
    delete childEnv.NODE_TEST_CONTEXT;
    const child = spawn(process.execPath, ["--test", "retry.test.mjs"], {
      cwd,
      windowsHide: true,
      shell: false,
      env: childEnv,
    });
    const collect = (chunk) => {
      const text = chunk.toString();
      if (output.length + text.length > outputLimit) truncated = true;
      output = (output + text).slice(0, outputLimit);
    };
    child.stdout.on("data", collect);
    child.stderr.on("data", collect);
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, timeoutMs);
    const finish = (result) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(result);
    };
    child.on("error", (error) =>
      finish({ status: "tool_error", output: error.message }),
    );
    child.on("close", (exitCode) =>
      finish({
        status: timedOut ? "timeout" : exitCode === 0 ? "passed" : "failed",
        exitCode,
        output,
        truncated,
      }),
    );
  });
}
function validateDecision(value) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("invalid model response");
  if (value.kind === "finish") {
    if (typeof value.summary !== "string")
      throw new Error("finish requires a summary");
    return value;
  }
  if (
    value.kind !== "tool" ||
    typeof value.id !== "string" ||
    !value.id ||
    typeof value.name !== "string" ||
    !value.args ||
    typeof value.args !== "object" ||
    Array.isArray(value.args)
  )
    throw new Error("invalid tool request");
  return value;
}
export async function runHarness({
  model,
  root,
  artifacts,
  maxTurns = 8,
  timeoutMs = 5000,
  goal = "Allow attempts only while count is strictly below maximum.",
}) {
  if (!Number.isInteger(maxTurns) || maxTurns < 1 || maxTurns > 100)
    throw new Error("maxTurns must be 1..100");
  if (!Number.isFinite(timeoutMs) || timeoutMs < 1 || timeoutMs > 60000)
    throw new Error("timeoutMs must be 1..60000");
  root = await realpath(root);
  await mkdir(artifacts, { recursive: true });
  const initialFingerprint = await fingerprint(root),
    history = [],
    seen = new Set();
  const save = async (status) => {
    const state = {
      goal,
      root,
      initialFingerprint,
      currentFingerprint: await fingerprint(root),
      status,
      history,
    };
    await writeFile(
      path.join(artifacts, "state.json"),
      JSON.stringify(state, null, 2),
    );
    return state;
  };
  for (let turn = 0; turn < maxTurns; turn++) {
    let decision;
    try {
      // Bound the wait even if an adapter ignores cancellation. Adapters should
      // still honour the signal so the underlying request stops consuming work.
      const controller = new AbortController();
      let modelTimer;
      try {
        decision = validateDecision(
          await Promise.race([
            Promise.resolve().then(() =>
              model({
                goal,
                history: structuredClone(history),
                signal: controller.signal,
              }),
            ),
            new Promise((_, reject) => {
              modelTimer = setTimeout(() => {
                controller.abort();
                reject(new Error("model timeout"));
              }, timeoutMs);
            }),
          ]),
        );
      } finally {
        clearTimeout(modelTimer);
      }
    } catch (error) {
      history.push({
        kind: "model_error",
        message: String(error.message ?? error),
      });
      return save("blocked");
    }
    if (decision.kind === "finish") {
      // Re-run on final state: a statement, or an earlier green test, is insufficient.
      const verification = await runCommand("test", { cwd: root, timeoutMs });
      history.push({ decision, verification });
      return save(verification.status === "passed" ? "complete" : "unverified");
    }
    let observation;
    try {
      if (seen.has(decision.id)) throw new Error("duplicate call ID");
      seen.add(decision.id);
      const args = decision.args;
      if (decision.name === "shell") {
        await checkedPath(root, "retry.test.mjs");
        await checkedPath(root, "retry.mjs");
        observation = await runCommand(args.command, { cwd: root, timeoutMs });
      } else if (decision.name === "read_file") {
        const content = await readFile(
          await checkedPath(root, args.path),
          "utf8",
        );
        observation = {
          status: "read",
          content: content.slice(0, 12000),
          truncated: content.length > 12000,
        };
      } else if (decision.name === "write_file") {
        const target = await checkedPath(root, args.path, true);
        if (typeof args.content !== "string" || args.content.length > 12000)
          throw new Error("invalid or oversized file content");
        await writeFile(target, args.content);
        observation = { status: "written", path: args.path };
      } else throw new Error("denied: unknown tool");
    } catch (error) {
      observation = {
        status: "tool_error",
        message: String(error.message ?? error),
      };
    }
    history.push({ decision, observation });
    await save("running");
  }
  return save("exhausted");
}

export function scriptedModel(scenario = "fix") {
  // Deliberately scripted. This is a harness test double, not an AI model.
  return async ({ history }) => {
    const turn = history.length;
    if (scenario === "false-success")
      return { kind: "finish", summary: "I claim the fixture is fixed." };
    if (scenario === "exhausted")
      return {
        kind: "tool",
        id: `read-${turn}`,
        name: "read_file",
        args: { path: "retry.mjs" },
      };
    if (turn === 0)
      return {
        kind: "tool",
        id: "baseline",
        name: "shell",
        args: { command: "test" },
      };
    if (turn === 1)
      return {
        kind: "tool",
        id: "inspect",
        name: "read_file",
        args: { path: "retry.mjs" },
      };
    if (turn === 2) {
      const content = history[1].observation.content.replace(
        "count <= maximum",
        "count < maximum",
      );
      return {
        kind: "tool",
        id: "patch",
        name: "write_file",
        args: { path: "retry.mjs", content },
      };
    }
    return {
      kind: "finish",
      summary: "Changed the boundary comparison; verify before accepting.",
    };
  };
}
