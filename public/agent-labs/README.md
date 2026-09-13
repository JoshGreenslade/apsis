# Agentic engineering lab kit

This kit accompanies Apsis's 30 concept lessons and two project chapters. Use Node.js 24+ in a disposable directory. No API key or npm install is needed for the offline exercises. The example CSV is fictional, not benchmark evidence.

## Run the reference core

```sh
node --test harness.test.mjs
node demo.mjs
node demo.mjs false-success
node demo.mjs exhausted
node evaluate.mjs runs.csv 60
```

The normal demo should return `complete`, false-success should return `unverified`, and the repeated-read demo should return `exhausted`. Each creates a new temporary fixture and prints its artifact directory. Inspect `state.json`: the first test fails, the file changes, and final verification passes. Negative demo commands exit normally because their non-complete JSON statuses are the expected demonstration results.

`scriptedModel` is a deterministic test double. It knows the fixture's fix. It tests the harness, not a real model's reasoning or general coding ability. The fixture illustrates a boundary defect; the course's richer concurrent-retry story is a separate engineering scenario.

The harness allowlists two filenames and one test command. It rejects path traversal and writes to the test file. This is not an OS sandbox: imported fixture code still runs with your user permissions, path checks are not a race-proof filesystem security mechanism, and subprocess cancellation does not manage arbitrary descendant process trees. Use only this disposable fixture for the demonstration. A production harness needs stronger process, filesystem, network and credential isolation.

## Build your own v1–v9

The reference implements a small execution/verification core, bounded observations and persisted evidence. It intentionally leaves the later architectural extensions for you to implement.

| Stage | Add                                         | Evidence that it works                                                                                                 |
| ----- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| v1    | Model adapter + one named shell/test action | A failed command becomes an observation; unknown commands are denied                                                   |
| v2    | File reads and writes                       | Read the bug, patch only the allowed file; reject traversal and symlinks                                               |
| v3    | Stop conditions                             | Reject a false finish claim; enforce a turn budget and a hanging-tool timeout                                          |
| v4    | Context selection                           | Keep the relevant failure from a long output, with a recoverable artifact pointer                                      |
| v5    | Compaction                                  | Replace old history with goal, constraints, evidence and next action; retain a deliberately important early constraint |
| v6    | Persistent resume                           | Load a saved state and verify task ID plus workspace fingerprint before continuing; reject stale state                 |
| v7    | Hypothesis ledger                           | Keep observations separate from candidate explanations; a contradictory test changes the next action                   |
| v8    | One read-only worker                        | Give it a bounded question and return schema; handle timeout, missing evidence and disagreement                        |
| v9    | Outer orchestrator                          | Classify a fixture event as investigate/ignore; deduplicate a repeated event ID and route the result to review         |

Suggested state structure:

```json
{
  "taskId": "retry-001",
  "goal": "Prevent duplicate concurrent sends for one key",
  "baseRevision": "record-your-actual-revision",
  "constraints": ["Preserve independent-key concurrency"],
  "observations": [
    { "claim": "Failure persists with a fake clock", "artifact": "trace.txt" }
  ],
  "hypotheses": [
    { "claim": "Shared in-flight state races", "status": "untested" }
  ],
  "nextExperiment": "Start two calls behind a promise barrier",
  "remainingBudget": { "turns": 10 }
}
```

Do not confuse this example record with a real observed run. Add evidence from your own experiments. Store task state outside model-writable fixture files and validate its structure when loading.

For v8, keep the worker's role read-only and return `{finding, evidence, uncertainty}`. The parent must be allowed to reject an unsupported worker conclusion. For v9, persist completed event IDs before treating duplicate delivery as new work; define how interrupted processing is recovered so a partial run is not silently lost.

## Optional live-model adapter

`runHarness` accepts an async `model({goal, history, signal})` function. Translate a provider response into either:

```json
{
  "kind": "tool",
  "id": "call-1",
  "name": "read_file",
  "args": { "path": "retry.mjs" }
}
```

or:

```json
{ "kind": "finish", "summary": "Ready for independent verification" }
```

Use an official provider SDK or API and a server/local environment variable for its key. The adapter must honour cancellation, validate responses, preserve provider-required state and associate tool outputs with call IDs. Decide how to handle multiple tool calls: the teaching core consumes one at a time, so either request a single-call policy where supported or implement a correct queue. Handle refusals and transient errors explicitly. Do not assume `history` is already a valid provider message format.

Read the [OpenAI function-calling guide](https://developers.openai.com/api/docs/guides/function-calling) for one concrete provider protocol. Record the model and adapter version, and test malformed output, timeout and missing tool cases before running live. No live-model adapter or live model benchmark is claimed by this kit.

## gh-aw workflow lab

The supplied `maintenance-report.lock.yml` was generated successfully with the official gh-aw v0.88.7 compiler. It is a review example; recompile in your lab repository with your installed version before use. Compilation was verified, but no live GitHub agent run was performed for this kit.

`maintenance-report.md` is a manually triggered investigator example. It is distributed as course material, not installed as an active workflow in the textbook repository. Live execution needs a disposable GitHub repository, GitHub CLI, gh-aw and engine authentication.

1. In your lab repository, install the official extension: `gh extension install github/gh-aw`.
2. Record `gh aw --version`. Copy `maintenance-report.md` into `.github/workflows/`.
3. Follow the current [engine authentication guide](https://github.github.io/gh-aw/reference/engines/). Do not paste tokens into Markdown. Copilot account access alone is not a guarantee that a workflow has the required authentication.
4. Run `gh aw compile`. Resolve schema errors against your installed version's help/reference; configuration evolves.
5. Inspect `.github/workflows/maintenance-report.lock.yml`, especially credentials, read permissions, output jobs and time limits. Commit source and lock together in the lab repository.
6. Trigger manually in Actions. Test a concrete inconsistency, an existing equivalent issue, and unavailable evidence. Confirm the report/no-op/blocker behaviour before introducing recurring triggers.

The example uses top-level `max-turns` as documented on 13 September 2026. Do not assume it means exactly the same unit as this tiny harness's loop counter. Per-tool timeout and continuation support are engine-specific. The generated output job may have additional write permission for its constrained publication role; the investigation's read permissions are not the whole compiled workflow's permission set.

The natural-language deduplication check is a first teaching example, not a transactional guarantee. The final project should implement stable work keys and an explicit idempotency strategy for repeated or interrupted events. The example does not implement automatic code changes, independent review or approval; you add those stages in the final project.

## Evaluation lab

Replace every example row in `runs.csv` with actual observations. Use plain task/system names without commas, quotes or newlines. Accepted means the predeclared rubric passes; record human repairs as interventions. Keep failed attempts in the file. Machine cost includes model and execution cost in one consistent currency. Add setup/maintenance effort as part of the human-time accounting and explain how it is allocated.

The final argument to `evaluate.mjs` is your assumed hourly labour cost. The script groups by system, includes every attempt, separates autonomous acceptance and returns `null` cost per accepted result when none succeeds. It reports descriptive summaries, not statistical significance or causal model rankings. Inspect task-level results and sample sizes before drawing conclusions.

## Final project review

Provide workflow source/lock files, an architecture diagram, a permission map, raw run records and a keep/change/stop recommendation. Exercise valid, irrelevant and duplicate events; missing tools; misleading repository text; exhausted budgets; and a reviewer counterexample. A human owns merge/release approval. A fixture-only prototype must be labelled as such: it cannot establish live time savings.
