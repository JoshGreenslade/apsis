# Agentic engineering: curriculum and workshop design

Status: curriculum proposal for an experienced practitioner. These parts are
learning movements, not chapter boundaries. No replacement lessons are drafted.

## Audience and destination

The reader already writes software and builds or uses agents. They want to
understand the machinery properly and become more effective at designing,
operating and improving workflows across an organisation.

Assume Git, terminal and basic API experience. Supply optional setup material
for unfamiliar tooling. The opening should investigate a recognisable agent
system, not explain how to open a terminal or begin with an isolated coding bug.

By the end, the learner should be able to explain the agent stack, build and
evaluate reusable capabilities, use gh-aw with sound judgement, deploy an
organisational workflow and coordinate a small fleet. They should leave with
working artifacts and evidence for their design decisions.

## Workshop approach

Borrow the gh-aw workshop's practical pacing: a visible destination, runnable
activities, observable results, recovery help and optional supporting material.
Keep our own narrative and writing. No required heading sequence or lesson form.
A teardown, experiment, guided build and incident investigation need different
structures. Essential theory stays on the main path; optional material adds
depth without concealing prerequisites.

## Projects and environment

Use a small supplied software service with tests, documentation, seeded issues
and a short change history. It must be understandable without learning a new
application domain. Use a disposable practice repository for live GitHub work.

Three projects connect the learning:

- **Repository investigator:** gather evidence about a reported problem and
  propose a bounded change. Inspect an existing agent first, then build a small
  harness to expose the runtime responsibilities.
- **Maintenance workflow:** detect actionable documentation drift after code
  changes. Begin with findings, then propose reviewed patches. This supports
  substantial gh-aw work, including runs where no action is appropriate.
- **Coordinated migration:** apply a modest API change across related repositories.
  Explore dependencies, worker isolation, integration and partial completion.

Supporting examples may differ when they explain a concept better. No single
project must carry every idea. Offer transfer activities using the learner's
own repository after the supplied example is understood.

Default to TypeScript for executable examples, alongside shell and workflow
Markdown. Use established SDKs for provider and protocol plumbing. The small
harness is a teaching instrument, not a proposed production framework. Pin exact
tools after lab feasibility work. Do not require production or organisation-admin
access: fleet labs can use several disposable repositories and simulated policy.

## Curriculum

### 1. Understand the system you are already using

Start with an agent investigating an issue. Examine its result, then follow the
input, context, tool requests, observations and resulting change. Identify which
component supplies each piece and which can enforce a restriction.

Teach model, agent, harness, runtime, tool and workflow responsibilities. Cover
training versus inference, tokens, context, generation, variability, reasoning
budgets and practical model selection. Explore quality, latency, cost and
deployment constraints; distinguish model failures from context or tooling
failures. Explain what a trace reveals without presenting it as private reasoning.

**Practical work:** annotate a recorded run, reproduce it, change one relevant
input and compare repeated runs on a small task set. Try another model where
available. Keep conclusions proportional to the sample.

**Artifact and transition:** a system map and baseline of results, resource use
and review effort. The next work improves the information and capabilities
available to this same system.

### 2. Build capabilities and supply useful information

Give the investigator access to service ownership and API-contract information.
Build a direct tool, expose the capability through an MCP server, and author a
skill describing how to investigate a compatibility issue.

Teach tool descriptions, schemas, bounded output, pagination, errors and
consequential actions. Explain MCP hosts, clients, servers, discovery, tools,
resources, prompts, transport and authentication. Separate protocol capability
from host support and authorization. MCP does not provide the whole runtime.

Compare instructions, skills, scripts, tools and MCP. Cover skill discovery and
loading, supporting references, executable helpers and host-specific behaviour.
Develop context selection, retrieval, source authority, freshness, compaction
and durable records. Examine untrusted tool results, repository instructions,
credential handling and third-party capability review while building.

**Practical work:** inspect an MCP exchange; repair an ambiguous tool interface;
compare a skill with the baseline; test irrelevant requests and misleading
source material. Diagnose whether poor results arise from retrieval, instructions
or execution instead of treating every failure as a prompt problem.

**Artifact and transition:** a tested tool, MCP integration and reusable skill.
The learner now has capabilities worth connecting through an explicit harness.

### 3. Take control of execution

Recreate the investigator using a small SDK-based harness. Keep the application
task familiar so execution is the new subject.

Teach model calls, dispatch, observations, explicit state and stopping. Combine
deterministic steps with model decisions. Cover structured outputs, validation,
task briefs, acceptance criteria, clarification and human intervention. Explore
timeouts, retries, duplicate effects, cancellation, checkpointing and resumption.
Separate conversation history, working memory and persistent records.

Compare an existing coding harness, an agent SDK and custom orchestration.
Discuss interactive sessions, background jobs and durable workflow engines.

**Practical work:** build and instrument the minimal loop, interrupt a run and
resume it. Simulate a tool completing an action before its response is lost.
Compare the custom implementation with the existing harness used earlier.

**Artifact and transition:** an inspectable agent and a reasoned runtime choice.
Recurring maintenance now raises scheduling and operational requirements.

### 4. Build and operate GitHub Agentic Workflows

This is a substantial workshop sequence, not a survey chapter. Develop the
documentation-maintenance project from manual inspection to recurring operation.

- Author and compile a workflow; inspect the generated Actions workflow. Explain
  authoring, compilation, agent execution and output application separately.
- Configure engines, tools and repository context. Reuse earlier capabilities
  where supported, making compatibility limits explicit.
- Exercise manual, event-driven and scheduled operation. Handle irrelevant
  triggers, duplicates, legitimate no-ops and automation feedback loops.
- Investigate authentication, permissions, network access, isolation and safe
  outputs. Preview consequential actions before enabling them in the sandbox.
- Add reusable configuration, external information and deterministic checks.
  Investigate custom outputs when a built-in operation is insufficient.
- Diagnose compilation, authentication, tool, model and output-application
  failures using logs and audit artifacts.
- Examine memory, concurrency, interrupted work, recovery and maintenance.
  Measure useful outcomes, cost, notification volume and review burden.
- Compare this task with ordinary Actions and scripts. Examine a long-lived
  interactive task to understand when another execution environment fits better.

**Practical work:** deploy the workflow, inspect the compiled jobs, repair seeded
failures, improve weak findings, produce a constrained patch proposal and run
it repeatedly. Keep live writes inside the disposable repository.

**Artifact and transition:** an operational workflow and troubleshooting record.
Its usefulness to a second team raises adoption and ownership questions.

Use a pinned gh-aw release. Label preview or experimental features. Teach
supported composition mechanisms without implying that gh-aw replaces arbitrary
services or distributed job systems. Full effectiveness means choosing and
operating useful features, not enumerating every configuration field.

### 5. Make the workflow usable across an organisation

A second team wants the maintenance workflow. Decide what is shared, what varies
by team and what evidence is needed before expanding access.

Teach use-case discovery, stakeholders, ownership and value. Develop evaluation
sets from real work, held-out cases, repeated trials, regression checks,
deterministic validators, human assessment and calibrated model judges.
Evaluation has appeared throughout; here it becomes a repeatable release practice.

Cover identity, least privilege, secrets, sensitive data, retention, provider
constraints, auditability and consequential-action approvals. Develop versioned
skills and tools, provenance, dependency review, distribution and compatibility.
Include canary releases, observability, service expectations, incident response,
rollback, model upgrades, drift and retirement. Distinguish local policy from
universal requirements; this is not a claim of regulatory compliance.

**Practical work:** turn earlier failures into an evaluation set, compare a
candidate change, plan a pilot and simulate a revoked credential or bad skill
release. Recover and document what the operator needs to know.

**Artifact and transition:** an evidence-backed release candidate, distribution
approach and short runbook. A migration spanning teams creates work to coordinate.

### 6. Orchestrate agents at two scales

Use the API migration to create genuinely divisible work. Preserve a single-agent
or scripted baseline so extra coordination must demonstrate its value.

Within one project, teach decomposition, dependencies, task contracts, context
allocation, supervisor-worker arrangements, fixed pipelines and independent
review. Cover workspace isolation, file ownership, conflicting changes, evidence
exchange and integration responsibility. Discuss correlated mistakes and the
limits of adding another model as a reviewer.

Across repositories, teach queues, schedules, capacity, leases, deduplication,
backpressure, retries, cancellation and partial completion. Cover durable records,
result contracts, identities, quotas, team policy and feedback-loop prevention.
Revisit model routing, escalation, review bottlenecks, useful throughput and cost
allocation. Use gh-aw composition where supported and compare an external
coordinator when requirements exceed that runtime.

**Practical work:** run bounded parallel workers, force overlapping changes,
interrupt a worker and recover unfinished work. Expand to several repositories,
apply a concurrency limit and measure accepted results after integration and
review. Diagnose a fleet that is busy but produces little useful output.

**Artifact and destination:** a small observable fleet and an account of its
trade-offs. Adapt one workflow to the learner's setting, including what remains
with people and what evidence would justify further automation.

## The connecting narrative

We begin inside a system the reader already uses. Taking a run apart exposes
the relationship between the model and its environment. Experiments make those
relationships testable. Tools, MCP and skills supply access and reusable
knowledge; the small harness gives the reader responsibility for execution.

Recurring maintenance changes the problem: it needs triggers, bounded actions
and an operational record. This gives gh-aw a substantial, natural place in
the story. A successful sandbox workflow attracts another team, making
evaluation, distribution and ownership concrete. Finally, a migration introduces
coordination requirements that a single run cannot resolve alone.

The progression is from understanding a run to designing a workflow to owning
an organisational system. Models remain relevant throughout, as later work
revisits selection, routing and upgrades with better evidence and higher stakes.

## Lab and writing requirements

- Provide fixtures, known starting states and recovery points. An early broken
  lab must not block the rest of the course.
- Supply captured traces for readers without paid access. Explain what that
  route cannot establish without live execution.
- State access requirements, side effects, cleanup and estimated cost ranges
  before live labs. Verify estimates with the eventual pinned kit.
- Check observable properties, not exact generated prose. Include ambiguous,
  failed and no-op cases as well as successful ones.
- Encourage AI-assisted building and debugging, coupled with inspection and
  explanation of consequential choices. Manual typing is not the objective.
- Develop explanations in connected prose. Commands need context; avoid hiding
  the reasoning inside checklist fragments.
- Do not imitate lecture mannerisms or force worked-example boxes, warnings,
  recaps and reflections into every lesson. Length follows the idea.
- Use diagrams for relationships and execution paths. Link strong existing
  visuals with attribution rather than adding decorative or unclear diagrams.
- Separate durable concepts from version-sensitive configuration. Record tested
  versions and source dates in the runnable materials.

## Sources and validation

Consulted 2026-09-21. These inform scope; proposed labs have not yet been built
or validated.

- [Workshop welcome](https://github.com/githubnext/gh-aw-workshop/blob/main/workshop/00-welcome.md)
  and [audit activity](https://github.com/githubnext/gh-aw-workshop/blob/main/workshop/25-audit-and-observability.md):
  practical destination, run inspection and observable checkpoints.
- [GitHub Agentic Workflows](https://github.com/github/gh-aw): release and
  implementation entry point; recheck before selecting the lab version.
- [Safe outputs](https://github.github.com/gh-aw/reference/safe-outputs/):
  bounded output application, staged mode and workflow composition.
- [Custom safe outputs](https://github.github.com/gh-aw/reference/custom-safe-outputs/):
  external effects and deterministic post-processing.
- [Outcomes](https://github.github.com/gh-aw/reference/outcomes/): measuring
  what happens after a workflow publishes its result.
- [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture):
  protocol roles and scope. Pin compatible protocol and SDK versions; deployed
  clients may not implement the latest documentation.
- [Agent Skills specification](https://agentskills.io/specification): portable
  format. Verify actual discovery and execution in the selected hosts.

Before writing implementation instructions, add primary documentation for the
chosen models, harness, SDK, authentication and orchestration runtime. Verify
commands in the lab environment. Proposed comparisons are not performance claims.

## Bounded authoring batches

1. Curriculum and narrative: this proposal. Check coverage and project scope.
2. Chapter map and lab feasibility: identify natural boundaries and prerequisites;
   spike the investigator, maintenance workflow and migration starting states.
   Select versions, access requirements and realistic lab sizes.
3. Opening workshop: write and run the first coherent unit, including its trace
   and experiment. Read it as an experienced learner before extending the prose.
4. Capabilities and execution: small groups of related chapters around tools,
   MCP, skills, context and harness responsibilities.
5. gh-aw workshops: separate first deployment, extension and operational work
   into manageable writing and verification batches.
6. Organisational adoption: evaluation, distribution and lifecycle exercises.
7. Fleets and application: project coordination, cross-repository operation and
   the learner's own workflow.
8. Whole-course review: clean learner run, narrative continuity, repetition,
   source verification, recovery and cleanup.

Batch sizes follow new machinery and prose, not a chapter quota. Review the
chapter map before drafting the course. Finish each bounded writing batch and
verify its exercises before moving to the next.

## Next-session handoff

The user approved this curriculum. Proceed to batch 2; do not restart curriculum
design or draft lessons yet.

- Create a provisional chapter map. For each chapter, identify its central
  question, prerequisites, practical activity and observable result. These are
  planning fields, not mandatory headings for the eventual prose.
- Check that models, harnesses, tools, MCP, skills, gh-aw, organisational lifecycle
  and both scales of orchestration have meaningful coverage. Split chapters
  where too much new machinery arrives at once; impose no chapter count.
- Start feasibility with the repository investigator: select a minimal service
  fixture and one bounded investigation that exposes a useful agent trace.
  Record candidate runtime versions, access requirements and unresolved choices.
- Keep proposed, source-checked and actually executed labs clearly distinguished.
  Do not provision paid services or publish live workflow effects for a spike.

The next deliverable is the chapter map with feasibility notes, not lesson text.
