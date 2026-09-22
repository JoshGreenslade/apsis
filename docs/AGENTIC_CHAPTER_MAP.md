# Agentic engineering: chapter map and feasibility

The curriculum is approved. This map is a working authoring sequence, not a
contract for identical lesson structure. Split or combine chapters when reading
or running them exposes a better boundary. No lesson should exist just to fill
a numbered slot.

## Reading journey

| Chapter | Central question | Practical work and observable result |
| --- | --- | --- |
| 01 Inspect a working agent | What actually happens between a task and a patch? | Investigate a release API exposing drafts; distinguish observations, decisions and runtime actions in a trace. |
| 02 What the model brings | How do training and inference shape the work? | Compare predictions and results with changed evidence; separate learned patterns from facts supplied in context. |
| 03 Choose a model with evidence | Which configuration is useful for this workload? | Run a small repeated comparison; account for quality, latency, cost and human review without claiming a benchmark from one example. |
| 04 Context is a design choice | Which information deserves space in the next call? | Diagnose a stale contract, retrieve current evidence and build a compact handoff with source references. |
| 05 Tools the agent can use well | What makes an executable capability understandable? | Improve a release lookup tool's schema, errors and output; test ambiguous inputs and bounded responses. |
| 06 Follow an MCP request | What does the protocol connect, and what does it leave to the host? | Expose contract information with an SDK server; inspect discovery and a call from a client. |
| 07 Teach a reusable procedure | When should knowledge become a skill? | Write and test a compatibility-investigation skill, including non-triggering requests and supporting scripts. |
| 08 Build the execution loop | What must the harness own? | Connect an SDK model call, tools, observations and stopping; inspect an explicit event log. |
| 09 Work that survives interruption | How do you resume without repeating effects? | Interrupt execution after an action; recover using durable state and an idempotency key. |
| 10 Choose a workflow shape | Where should code, models and people make decisions? | Implement a deterministic check around a model judgement; compare interactive and background execution. |
| 11 First GitHub Agentic Workflow | What gets compiled and what actually runs? | Compile a manual documentation-drift workflow and inspect generated jobs before an optional sandbox run. |
| 12 Give the workflow bounded authority | How can it propose useful changes without broad access? | Configure read access and staged outputs; inspect a proposed change before enabling writes. |
| 13 Make maintenance recurring | How do triggers create useful work rather than noise? | Exercise event and scheduled paths, deduplication, irrelevant changes and deliberate no-ops. |
| 14 Connect the workflow | How do reusable instructions and external data fit? | Integrate a skill or shared instructions, MCP data and deterministic validation; record host compatibility. |
| 15 Diagnose a run | Which layer failed, and what evidence distinguishes it? | Investigate compilation, access, tool and output failures using logs and artifacts. |
| 16 Improve useful outcomes | Is the workflow saving work? | Compare accepted findings, rejected patches, review time and cost; contrast a script-only implementation. |
| 17 Evaluate a change before release | What evidence justifies replacing the current system? | Build held-out cases and repeated evaluations; compare a changed model, skill or prompt against the baseline. |
| 18 Distribute a capability | How can another team adopt it safely? | Package versioned skills and tools, name ownership and compatibility, and stage a pilot. |
| 19 Operate across trust boundaries | Whose authority and data does the agent use? | Map identities and data flows; simulate untrusted content, revoked access and approval requirements. |
| 20 Maintain and retire the system | Who responds when behaviour or dependencies change? | Rehearse a bad release, rollback and shutdown; account for outstanding work and retained data. |
| 21 Divide a project among workers | What can proceed independently? | Decompose an API migration with explicit dependencies, task contracts and bounded context. |
| 22 Integrate their results | What happens when individually plausible changes disagree? | Use isolated workspaces, create a conflict and integrate with independent checks and review. |
| 23 Coordinate across repositories | What does a fleet need beyond more prompts? | Use a durable queue, leases, concurrency bounds and result contracts; recover a lost worker. |
| 24 Route work and control capacity | Does more parallelism improve accepted output? | Apply model escalation and quotas; measure throughput after integration, not just worker completion. |
| 25 Adapt a workflow to your organisation | What should you deploy, retain or reject? | Pilot a chosen workflow with a baseline, ownership, an operational plan and a decision supported by evidence. |

## Prerequisite shape

Chapters 01-03 establish the vocabulary and empirical approach. Context, tools,
MCP and skills build on this without requiring a custom runtime. Chapters 08-10
combine those capabilities and supply the execution model needed for gh-aw.
Chapters 11-16 form a connected deployment workshop. Evaluation and organisational
operation in 17-20 deepen practices introduced earlier rather than withholding
verification or security until the end. Chapters 21-24 use a separate migration
project; 25 draws on all three projects.

The main reading order is sequential. Optional reference material covers setup,
protocol details and alternate providers. Do not duplicate whole chapters for
each provider. A reader may use captured artifacts without live access, but that
does not establish live system performance.

## Feasibility record

Checked locally on 2026-09-22:

- Node 24.16.0 is available; the fixture uses native TypeScript stripping and
  built-in test/assert modules. It requires no dependency installation.
- GitHub CLI 2.86.0 is available. No gh-aw extension is installed. Compilation
  and live Actions execution have not been validated yet.
- The supplied release-service fixture has no network calls, credentials or
  persistent effects. Its starting contract check intentionally fails when
  `includeDrafts=false` is supplied, while the omitted parameter works. Executed
  locally: two checks pass and two fail, matching the documented starting state.
- Teaching transcripts must be labelled as constructed or captured. A scripted
  demonstration is not evidence of a particular model's capability.

### Next technical spikes

1. Execute the release fixture and its contract checks; validate a candidate fix
   in an isolated copy and preserve the broken learner starting point.
2. Select an established model SDK and a compatible MCP SDK/protocol version.
   Test local tool and MCP paths independently of paid model access.
3. Pin a released gh-aw compiler, compile a minimal manual workflow and inspect
   its output. Do not install workflows or create remote effects in Apsis.
4. Build the migration exercise with local repositories first; keep live
   cross-repository dispatch optional until permissions and cleanup are verified.

## Delivery batches

- A: this map and the local investigator fixture.
- B: course registration and chapters 01-04, with a readable opening workshop.
- C: chapters 05-07 and the reusable tool/MCP/skill kit.
- D: chapters 08-10 and execution/recovery labs.
- E: chapters 11-13 and the compiled gh-aw starter.
- F: chapters 14-16 and debugging/outcome exercises.
- G: chapters 17-20 and organisational lifecycle material.
- H: chapters 21-25 and fleet/capstone exercises.
- I: fresh subagent review, critique, revisions and a whole-course learner pass.

Push each completed batch to main. Record what was actually executed and any
live-access gaps. No automatic remote publication is needed to write the course.
