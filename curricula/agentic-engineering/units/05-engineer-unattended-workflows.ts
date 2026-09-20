import type { Lesson } from "../lesson";

export const unit05EngineerUnattendedWorkflows: Lesson[] = [
  {
    id: "gh-aw",
    title: "Repository automation: turn an event into bounded work",
    unit: "05 · Engineer unattended workflows",
    question: "How does a repository event become a running agent job?",
    outcome:
      "Design an unattended workflow with a clear trigger, task contract, permissions, evidence and approval boundary.",
    intro:
      "A scheduled job is a small production system, even when its instruction lives in Markdown. Something wakes it, constructs context, grants tools, runs an agent and reports an output. The convenience is real, but the event is also a permission to act. Treating the workflow as a paragraph with a cron expression attached is how silent assumptions become recurring incidents.",
    sections: [
      ["Trace the execution path", "Start with the event: issue opened, pull request changed, schedule reached or command requested. Then identify the instruction source, checkout revision, identity, tools, outputs and final destination. Each transition should be explicit enough that a reviewer can answer what ran, against what and with which authority."],
      ["Make the unattended contract narrow", "Define what the job may read, change and publish. Prefer an artifact or draft proposal before a merge or release. Make failure visible, preserve logs and ensure the workflow can be disabled without editing the system that it is currently trying to repair."],
    ],
    checkpoints: [
      { bridge: "An event is not the work. It starts a chain of context and authority.", meaning: "Reliable automation makes each transition from trigger to output inspectable.", question: "A nightly workflow opens a pull request with no recorded revision or tool list. What cannot a reviewer establish?", answer: "They cannot tell exactly what code was examined, what capabilities were available or why the output should be trusted.", further: [{ question: "Why record the checkout revision?", answer: "The same prompt can produce a different result against a different repository state." }, { question: "Why separate draft output from merge?", answer: "It keeps the agent's work reviewable and reversible before an external effect becomes permanent." }] },
      { bridge: "Unattended does not mean unbounded.", meaning: "A scheduled workflow needs explicit permissions, failure reporting and a disable path.", question: "What is the safer default for a new automated maintenance job?", answer: "Read and propose first: produce a branch, patch or draft with evidence, then expand permissions only after the workflow is understood.", further: [{ question: "What should happen on failure?", answer: "The workflow should surface a clear status, preserve enough logs to diagnose it and avoid silently presenting partial work as complete." }, { question: "Why keep a disable path?", answer: "A recurring system must be stoppable quickly when its assumptions or dependencies change." }] },
    ],
    example: ["A repository wants a nightly dependency advisory workflow.", ["Map the chain", "Schedule the event, pin the checkout, load the local instructions, run the advisory tool, create a draft report and attach the evidence.", "The output can be reviewed and traced.", "Letting the job push directly to the default branch."], ["Bound the effect", "Grant read access to dependencies and repository metadata; require approval before changing versions or publishing.", "The automation has useful reach without hidden authority.", "Using a broad token because the workflow is trusted." ]],
    checks: [
      ["What starts an unattended workflow?", ["An event or schedule", "A vague intention", "A successful merge only"], 0, "The trigger begins the chain that must then be made explicit."],
      ["What should a first automation produce?", ["An unreviewed production change", "A traceable proposal or artifact", "No evidence"], 1, "Reviewable output is a safer first boundary."],
      ["Why pin the checkout?", ["For reproducibility", "To prevent all updates", "To increase permissions"], 0, "The run should identify the state it examined."],
    ],
    takeaway: "Treat repository automation as a small production system: trace the trigger, bound authority and make the output reviewable.",
    nextConnection: "A workflow can be correctly wired and still run too long or spend too much. The next lesson separates operational controls from evidence of success.",
    source: ["aw", "outputs"],
  },
  {
    id: "controls",
    title: "Controlling execution: budgets are not success criteria",
    unit: "05 · Engineer unattended workflows",
    question: "What do timeouts, budgets and approval gates actually guarantee?",
    outcome:
      "Use execution controls to limit cost and blast radius without mistaking them for proof of correctness.",
    intro:
      "A kitchen timer can stop an oven, but it cannot tell you whether the cake is baked. Agent controls have the same boundary. Time limits, token budgets, retry caps and concurrency limits protect resources. They do not prove that the intended change was made or that a green-looking output is safe.",
    sections: [
      ["Control the run", "Set a maximum duration, retry policy, spend ceiling, tool-call budget and concurrency limit appropriate to the task. Decide what happens when each is reached: stop, save a checkpoint, ask for approval or produce a partial report. A budget without a recovery policy turns a limit into a confusing failure."],
      ["Prove the result separately", "Success criteria belong to the task: tests, invariants, review checks and output completeness. A run can finish under budget and still be wrong; it can also exceed a budget while discovering useful evidence. Record operational status and task status separately."],
    ],
    checkpoints: [
      { bridge: "Control answers 'how much may this run consume?' Success answers 'did it achieve the task?'", meaning: "Operational limits and correctness evidence are complementary, not interchangeable.", question: "A workflow finishes within its token budget but edits the wrong package. Did the budget help prove success?", answer: "No. It controlled consumption, but the task still failed. Scope and behavioural checks are separate evidence.", further: [{ question: "What should a timeout produce?", answer: "A clear partial status, preserved state or logs and an instruction for safe continuation or escalation." }, { question: "Why cap concurrency?", answer: "Parallel work can multiply side effects, rate pressure and review complexity." }] },
      { bridge: "A good control has a deliberate response when it fires.", meaning: "Limits should preserve useful state and avoid ambiguous partial effects.", question: "A tool-call budget is reached halfway through an investigation. What is better than silently ending?", answer: "Save the current observations and next decision, report the limit, and ask whether to resume or narrow the scope.", further: [{ question: "Can a longer timeout fix a wrong task?", answer: "No. It may spend more resources on an incorrect objective." }, { question: "What is a useful approval gate?", answer: "A gate tied to evidence and a consequential transition, not a ritual pause with no decision to inspect." }] },
    ],
    example: ["A nightly job sometimes runs for an hour without producing a useful patch.", ["Add operational limits", "Set a 15-minute budget, two tool retries, one concurrent run and a checkpoint artifact on timeout.", "The job is bounded and recoverable.", "Increasing the timeout until the behaviour is forgotten."], ["Add task evidence", "Require the focused test, diff scope and advisory report before marking the job successful.", "A completed run must also satisfy the task contract.", "Treating exit code zero as proof." ]],
    checks: [
      ["What does a timeout prove?", ["The task is correct", "The run reached an operational limit", "The output is safe"], 1, "A timeout is a control signal, not a correctness result."],
      ["What should happen at a budget boundary?", ["Silently disappear", "Preserve state and report the boundary", "Publish partial work automatically"], 1, "Recovery needs an observable stopping point."],
      ["What is task evidence?", ["Tests and invariants tied to the requested result", "Token count", "Elapsed time alone"], 0, "Correctness is assessed separately from consumption."],
    ],
    takeaway: "Budget the run to protect resources, then verify the result with evidence that speaks to the task.",
    nextConnection: "Controls are useful defaults, but every harness has different contracts. The next lesson asks when customisation earns its complexity.",
    source: ["engines"],
  },
  {
    id: "customisation",
    title: "Customise the harness only where the contract demands it",
    unit: "05 · Engineer unattended workflows",
    question: "When does a custom harness improve the work rather than multiply maintenance?",
    outcome:
      "Choose customisation by a clear contract, measurable benefit and manageable maintenance burden.",
    intro:
      "A custom tool can fit a hand perfectly, but it also becomes one more tool to sharpen, document and repair. Harness customisation is worthwhile when the default loses an important invariant, hides a necessary observation or makes a repeated workflow unnecessarily costly. It is not worthwhile merely because a local abstraction feels more elegant.",
    sections: [
      ["Start with the unmet contract", "Name the failure of the current harness: missing repository state, unsafe permissions, poor output, no resume path or an untestable side effect. Then define the smallest addition that fixes it. Preserve familiar interfaces where possible so the custom piece reduces cognitive load instead of adding a private dialect."],
      ["Measure the trade", "A custom harness has acquisition cost, maintenance cost and migration risk. Compare those with the recurring cost of the problem it solves. Keep configuration explicit, test failure paths and provide a fallback or removal plan if the underlying platform changes."],
    ],
    checkpoints: [
      { bridge: "Customisation should answer a real contract gap.", meaning: "A new abstraction earns its place when it improves safety, evidence or repeatability in a measurable way.", question: "A team wants a custom agent wrapper because its name sounds nicer. Is that enough?", answer: "No. It needs a concrete problem and a benefit worth the implementation and maintenance cost.", further: [{ question: "What is a good reason to customise?", answer: "The default cannot expose a required invariant, enforce a permission boundary or support a repeatable verification path." }, { question: "Why keep interfaces familiar?", answer: "Familiar shapes reduce training, integration and migration cost." }] },
      { bridge: "Every custom layer becomes part of the system you must understand.", meaning: "Maintenance and failure behaviour are part of the design, not an afterthought.", question: "What should accompany a custom harness component?", answer: "A focused contract, tests for denial and failure, explicit configuration and a plan for updating or removing it.", further: [{ question: "What is migration risk?", answer: "The chance that the custom layer becomes a dependency that blocks a platform or model change." }, { question: "When should a customisation be removed?", answer: "When the underlying platform now supplies the contract reliably or the maintenance cost exceeds the recurring benefit." }] },
    ],
    example: ["The default runner cannot expose a stable diff after a long task.", ["Name the gap", "The team needs resumable state and a reviewable patch, but the default runner returns only a final message.", "The custom requirement is about evidence and recovery.", "Building a new orchestration framework before proving the gap."], ["Add the smallest adapter", "Persist the revision, checkpoint and diff artifact, then test timeout and resume behaviour.", "The change improves the contract without replacing the whole harness.", "Hiding the adapter's configuration in an opaque service." ]],
    checks: [
      ["What justifies customisation?", ["A concrete contract gap", "A new name", "More configuration"], 0, "Custom work should solve a real recurring problem."],
      ["What belongs in the cost comparison?", ["Only implementation time", "Maintenance, migration and recurring benefit", "The colour of the UI"], 1, "A harness is a long-lived system."],
      ["What should a custom component expose?", ["Only the happy path", "Its contract and failure behaviour", "No logs"], 1, "Failure paths are part of trust."],
    ],
    takeaway: "Customise for a measurable contract gap, and keep the new layer small, explicit and removable.",
    nextConnection: "The final lesson turns these principles into recurring workflow shapes that teams can operate without improvising every run.",
    source: ["engines", "tools"],
  },
  {
    id: "workflow-patterns",
    title: "Workflow patterns: make the boring path reliable",
    unit: "05 · Engineer unattended workflows",
    question: "Which workflow shape gives people the right control at the right moment?",
    outcome:
      "Select and combine workflow patterns for proposals, reviews, scheduled maintenance and gated release.",
    intro:
      "Most useful automation is deliberately boring. It notices a known event, gathers bounded evidence, produces a familiar artefact and asks for the next decision in a predictable place. Patterns help teams recognise that shape instead of inventing a new control model for every job.",
    sections: [
      ["Choose the shape before the implementation", "A proposal workflow reads inputs and creates a draft. A review workflow gathers evidence around a change. A scheduled maintenance workflow checks for drift and opens a bounded issue or patch. A gated release workflow carries a reviewed result across an approval boundary. The pattern determines where state, evidence and authority should live."],
      ["Compose with explicit handoffs", "Keep the transitions visible: trigger to investigation, investigation to artifact, artifact to review, review to apply and apply to verification. Use idempotency keys, stable identifiers and status reporting so retries do not create duplicate work or ambiguous outcomes."],
    ],
    checkpoints: [
      { bridge: "A workflow pattern is a control shape, not a branded recipe.", meaning: "Choose it by the kind of effect and decision the workflow needs to support.", question: "Which pattern fits a nightly scan that should propose dependency updates for review?", answer: "Scheduled maintenance producing a bounded proposal or issue, with merge and release kept behind review.", further: [{ question: "What is a proposal workflow for?", answer: "Turning an investigation into a reviewable artifact without applying the consequential change automatically." }, { question: "What makes a release workflow gated?", answer: "The reviewed result crosses an explicit approval boundary before external or production effect." }] },
      { bridge: "Reliable patterns make retries and handoffs ordinary.", meaning: "Stable identifiers and explicit status stop a partially completed run from becoming duplicate or invisible work.", question: "A network retry repeats a workflow after the draft already exists. What should the design use?", answer: "An idempotency key or stable task identifier that lets the workflow find and update the existing artifact.", further: [{ question: "Why make handoffs explicit?", answer: "Each stage can show what evidence and authority it received instead of inheriting hidden assumptions." }, { question: "What should status distinguish?", answer: "Operational state, such as timed out, from task state, such as proposal ready or verification failed." }] },
    ],
    example: ["A team wants automated stale-issue triage.", ["Pick the pattern", "Use an event-triggered proposal workflow: classify the issue, attach evidence and draft a label or comment for review.", "The effect is bounded and familiar.", "Letting the agent close issues directly on its first run."], ["Make reruns safe", "Use the issue ID and a comment marker to update the existing proposal instead of creating duplicates.", "The workflow can recover from delivery retries.", "Treating every trigger as a brand-new task." ]],
    checks: [
      ["What does a workflow pattern provide?", ["A control shape for a recurring decision", "A guarantee of correctness", "An unlimited token budget"], 0, "Patterns organise authority, evidence and handoffs."],
      ["Why use a stable task identifier?", ["To make retries and updates idempotent", "To conceal the output", "To remove review"], 0, "Stable identity makes recovery legible."],
      ["What belongs behind release approval?", ["An external or production effect", "A read-only scan", "A local draft"], 0, "Consequential transitions deserve an explicit gate."],
    ],
    takeaway: "Choose a workflow shape that makes evidence, handoffs, retries and approval boundaries predictable.",
    nextConnection: "These workflows can run with one agent, but some problems benefit from deliberate division of labour. The next unit explores multiple agents and the coordination cost they introduce.",
    source: ["aw", "outputs"],
    practical: {
      title: "Lab 5 · Design an unattended workflow",
      minutes: 35,
      brief:
        "Choose a recurring repository event and design the smallest workflow that can investigate, produce evidence and stop safely.",
      steps: [
        "Draw the trigger, checkout, instructions, tools, identity, output and approval boundary.",
        "Set duration, retry, spend and concurrency controls with a response for each limit.",
        "Choose a workflow pattern and add an idempotency key or stable task identifier.",
        "Run a happy path and one timeout or duplicate-delivery simulation.",
      ],
      deliverables: ["A workflow diagram", "A permission and budget table", "A happy-path and recovery report"],
      review:
        "The design should make it clear what can happen without approval, what evidence is produced and how a retry avoids duplicate effects. A schedule plus a prompt is not yet an operating workflow.",
    },
  },
];
