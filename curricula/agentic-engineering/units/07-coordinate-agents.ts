import type { Lesson } from "../lesson";

export const unit07CoordinateAgents: Lesson[] = [
  {
    id: "why-multiple",
    title: "Why multiple agents? Find the separable work",
    unit: "07 · Coordinate agents",
    question: "When does a second agent create leverage rather than noise?",
    outcome:
      "Identify work that can be split with low coupling and explain the cost of coordination before adding agents.",
    intro:
      "A second pair of hands helps when there are two jobs that can genuinely happen at once. It slows everything down when both people reach for the same tool, edit the same file and wait for each other to explain what changed. Multi-agent design starts with separability, not headcount.",
    sections: [
      ["Look for independent questions", "Good parallel work has separate inputs, a bounded output and a join that can compare or combine results. Examples include asking one agent to map callers while another reads tests, or asking an independent reviewer to challenge a proposed change. A single tightly coupled implementation path usually benefits more from one coherent owner."],
      ["Price the coordination", "Two ten-minute investigations do not automatically become a ten-minute task when run in parallel. If briefing takes five minutes and combining the reports takes another ten, the elapsed saving may disappear. Both workers also consume resources, even when one finding makes the other irrelevant.\n\nBefore launching them, describe what you expect back and how you will use it. 'List callers that depend on the current retry count, with file references' is easier to combine with a test survey than a broad request to 'investigate robustness'.\n\nA split earns its place when the returned evidence advances the decision enough to cover that coordination work. Measure it on the tasks you actually have; headcount is not a performance metric."],
    ],
    checkpoints: [
      { bridge: "Parallelism is useful only when the work can be separated and later joined.", meaning: "Independence is about information and side effects, not merely having different prompts.", question: "Which is the better split: one agent maps callers while another reviews tests, or two agents edit the same retry function?", answer: "The first. The investigations have distinct evidence and can be joined; concurrent edits to one function create conflict and duplicate reasoning.", further: [{ question: "What is a good worker boundary?", answer: "A bounded question, known inputs, a return format and no need to mutate shared state while investigating." }, { question: "Why use an independent reviewer?", answer: "A fresh context can expose assumptions that the original implementer has normalised." }] },
      { bridge: "The join is part of the design from the beginning.", meaning: "A split without an evaluation or merge plan is just more output to sort through.", question: "What should you estimate before adding a second agent?", answer: "The time and evidence needed to compare outputs, resolve conflicts, transfer context and review the combined result.", further: [{ question: "When is parallelism not worth it?", answer: "When the work is tightly coupled, the join is expensive or the task is already small enough for one coherent loop." }, { question: "What is duplicated work?", answer: "Two workers independently rediscovering the same context or solving the same subproblem because their boundaries were not explicit." }] },
    ],
    example: ["A retry change needs both repository mapping and a behavioural critique.", ["Split the questions", "Ask one worker to map callers and test fixtures, and another to inspect the proposed contract for missing failure cases.", "Each worker returns evidence that the main agent can compare.", "Ask both workers to edit the same implementation file."], ["Design the join", "The main agent compares the maps, resolves disagreements against the source and owns the final patch.", "One place remains accountable for synthesis.", "Concatenating both reports and calling the result a decision."]],
    checks: [
      ["What makes work separable?", ["Different agent names", "Distinct inputs, outputs and a join", "More tokens"], 1, "Parallelism depends on low coupling and a planned join."],
      ["What is a coordination cost?", ["A shorter task", "Context transfer and conflict resolution", "A stronger assertion"], 1, "Extra agents create work as well as capacity."],
      ["Who should own synthesis?", ["Nobody", "Every worker at once", "An explicit final owner"], 2, "A join needs accountability."],
    ],
    takeaway: "Add agents only when the work has independent questions, bounded returns and a cheaper join than a single loop.",
    nextConnection: "Once a split is justified, each worker needs a contract. The next lesson designs sub-agent requests that return useful evidence instead of vague prose.",
    source: ["tools", "engines"],
  },
  {
    id: "subagents",
    title: "Sub-agents: delegate a question with a return contract",
    unit: "07 · Coordinate agents",
    question: "What must a worker know, and what must it return?",
    outcome:
      "Write sub-agent briefs that define scope, evidence, limitations and a compact result format.",
    intro:
      "Sending someone to 'look into retries' is not delegation; it is forwarding your uncertainty. A useful sub-agent brief says which question matters, what evidence to inspect, what it must not change and what the caller should receive. The worker is not a smaller copy of the whole system. It is a bounded instrument in a larger investigation.",
    sections: [
      ["Give enough context, not the whole world", "A useful read-only brief could be:\n\n> At revision abc123, find callers that rely on the retry function throwing the first error after exhaustion. Do not edit files. Return caller locations, the relevant behaviour or tests, and anything you could not establish. Do not propose a new retry policy.\n\nThe worker now has a question it can finish answering. Give it access to the named revision and the evidence needed to explore beyond the initial file list. The scope limits the decision, not its ability to follow a relevant reference.\n\nAvoid copying the entire parent conversation by default. Include decisions the worker must respect, but keep tentative explanations labelled as hypotheses so it can disagree with them."],
      ["Make the return inspectable", "Require findings, evidence pointers, uncertainty, rejected explanations and a recommendation or next check. Use a stable shape so the caller can compare workers. Do not ask the worker to quietly edit shared state unless ownership and conflict handling are explicit."],
    ],
    checkpoints: [
      { bridge: "A worker can only return useful evidence if it knows what decision its answer will support.", meaning: "Delegation is a contract between caller and worker, not a vague request for another opinion.", question: "What is missing from 'review this code and tell me what you think'?", answer: "The decision, scope, evidence standard, limitations and return format. The worker may produce an articulate report that does not answer the actual need.", further: [{ question: "Why state a revision?", answer: "It anchors the worker's findings to a known code state." }, { question: "Why state what not to change?", answer: "It prevents a research worker from creating side effects while gathering evidence." }] },
      { bridge: "A worker report should reduce the caller's uncertainty, not transfer a new transcript.", meaning: "Evidence pointers and explicit uncertainty make the result comparable and challengeable.", question: "Which return is more useful: 'the retry code looks risky' or a finding with file, line, observed behaviour and next check?", answer: "The finding with evidence and a next check. It gives the caller something to verify and act on.", further: [{ question: "Should a worker hide uncertainty?", answer: "No. Uncertainty tells the caller where synthesis or further investigation is needed." }, { question: "What makes worker outputs composable?", answer: "A stable structure with scope, findings, evidence, confidence and open questions." }] },
    ],
    example: ["Delegate a repository map to a sub-agent.", ["Write the brief", "Inspect callers of RetryPolicy at abc123. Do not edit files. Return entry points, relevant tests, assumptions, evidence paths and one missing check.", "The worker knows the question and the boundary.", "Asking it to 'understand the retry system.'"], ["Use the result", "Compare its map with the test reviewer, resolve any disagreement against the source and record what remains unknown.", "The parent retains synthesis and accountability.", "Treating the first confident report as ground truth."]],
    checks: [
      ["What belongs in a sub-agent brief?", ["Only a topic", "Question, scope, evidence and boundary", "The entire transcript"], 1, "A worker needs enough context to answer a bounded question."],
      ["What should a return contract include?", ["Only a confidence score", "An unrelated patch", "Evidence and uncertainty"], 2, "The caller must be able to inspect the result."],
      ["Why prohibit edits for a mapping worker?", ["To hide its findings", "To keep ownership and side effects clear", "To reduce all useful work"], 1, "Read-only investigation is easier to join safely."],
    ],
    takeaway: "Delegate a decision-relevant question, then require evidence, uncertainty and a stable return shape.",
    nextConnection: "Several well-scoped workers still need shared ownership and state. The next lesson makes coordination explicit so progress does not dissolve into competing edits.",
    source: ["tools", "claude"],
  },
  {
    id: "coordination",
    title: "Coordination: make ownership and state explicit",
    unit: "07 · Coordinate agents",
    question: "How do multiple agents share progress without sharing confusion?",
    outcome:
      "Coordinate workers through explicit ownership, immutable evidence and a visible state model.",
    intro:
      "One worker reports that the retry API is unchanged. Another reports that callers will break. Before asking either to defend its conclusion, check their revisions: the first inspected the old branch; the second inspected the patch.\n\nCoordination failures often look like reasoning disagreements until you reconstruct who saw what. Shared work needs explicit ownership and versioned evidence, particularly when investigation and implementation overlap.",
    sections: [
      ["Choose the coordination surface", "Use a task record, issue, branch, artifact store or message envelope deliberately. Record status, owner, dependencies, revision and evidence links. Keep raw findings immutable where possible; publish a new state or revision rather than silently rewriting history that another worker may be using."],
      ["Resolve conflicts by authority and evidence", "When workers disagree, compare their scopes and source material before voting. A worker that inspected tests does not automatically outrank one that inspected production code. Let an explicit owner decide, record the reason and send only the unresolved question back for more work."],
    ],
    checkpoints: [
      { bridge: "Coordination is a state problem before it is a messaging problem.", meaning: "Workers need to know what exists, who owns it and which revision it represents.", question: "Two agents edit the same branch without ownership rules. What failure should you expect?", answer: "Overwrites, stale assumptions and an unclear final state. The system cannot tell which result is current or who should resolve the conflict.", further: [{ question: "Why record dependencies?", answer: "A worker should not start from an artifact that is missing, stale or still being changed by another owner." }, { question: "Why prefer immutable findings?", answer: "They preserve the evidence a later reviewer needs to understand how a decision was reached." }] },
      { bridge: "Disagreement is useful when it stays visible and scoped.", meaning: "Conflicts should be resolved against evidence by an accountable owner, not flattened by majority vote.", question: "Two reports disagree about whether retries are safe. What should the coordinator do?", answer: "Compare the exact scopes and evidence, ask a targeted follow-up if needed and record the final decision with its reason.", further: [{ question: "What makes a handoff complete?", answer: "The artifact, owner, revision, status, evidence and next allowed action are all clear." }, { question: "When should work be cancelled?", answer: "When its input is stale, its question is answered or its output can no longer affect the current decision." }] },
    ],
    example: ["Three agents investigate one incident.", ["Assign ownership", "One owns repository mapping, one owns runtime evidence and one owns test design. Each writes to a separate result with the same incident ID.", "Parallel work has clear boundaries.", "Letting all three update a shared diagnosis paragraph in place."], ["Join deliberately", "A lead agent compares revisions and evidence, records the decision and closes or reassigns stale tasks.", "Coordination produces a traceable state transition.", "Merging reports by recency alone."]],
    checks: [
      ["What should a shared task record contain?", ["Only a title", "Owner, status, revision and evidence", "Private guesses"], 1, "Coordination needs visible state."],
      ["How should conflicts be resolved?", ["By the longest report", "By hiding both", "By evidence and accountable ownership"], 2, "Scope and source matter more than volume."],
      ["Why keep raw findings immutable?", ["To prevent review", "To preserve provenance", "To increase duplication"], 1, "Immutable evidence supports later inspection."],
    ],
    takeaway: "Give every worker an owner, a revision, a state and a handoff; let evidence, not recency, resolve disagreement.",
    nextConnection: "Ownership is necessary, but different task shapes call for different coordination patterns. The next lesson compares common splits and joins.",
    source: ["copilot", "tools"],
  },
  {
    id: "patterns",
    title: "Multi-agent patterns: choose the join as carefully as the split",
    unit: "07 · Coordinate agents",
    question: "What makes an independent reviewer independent?",
    outcome:
      "Select a multi-agent pattern whose join preserves evidence, accountability and useful disagreement.",
    intro:
      "There is no single multi-agent architecture. A fan-out/fan-in split gathers independent investigations. A planner/worker split turns a plan into bounded tasks. A reviewer pattern creates a fresh challenge to a proposed result. A pipeline passes an artifact through stages. Each pattern changes where context is copied, where state is shared and where a mistake can compound.",
    sections: [
      ["Match pattern to dependency", "Use fan-out when questions are genuinely independent and the join can compare them. Use a pipeline when each stage consumes a stable artifact. Use planner/worker when the plan can be checked before execution. Use independent review when the main value is a fresh perspective, not another implementation."],
      ["Protect the join", "In a caller survey and test survey, the join should identify gaps: a caller depends on behaviour that no test covers, or a test protects behaviour that the new brief intentionally changes. Concatenating both reports does not make that decision. Assign someone, or a bounded integration step, to reconcile them against the contract.\n\nFor independent review, provide the task, proposed diff and relevant evidence. Do not frame the request as 'confirm that this fix is correct'. The reviewer needs permission to find a different explanation or reject the result.\n\nTwo agreeing agents are still not independent proof. They may share the same misleading input or assumption. Resolve important claims against inspectable evidence, and rerun checks on the integrated revision rather than relying only on separate worker results."],
    ],
    checkpoints: [
      { bridge: "Patterns are useful because they make dependencies and joins visible.", meaning: "The correct shape depends on whether workers share state, consume artifacts or challenge a result.", question: "Which pattern fits three independent investigations of the same incident?", answer: "Fan-out/fan-in, provided the reports have a common return shape and a clear synthesis owner.", further: [{ question: "When is a pipeline appropriate?", answer: "When each stage can consume a stable artifact and produce the next one without hidden shared state." }, { question: "Why check a plan before execution?", answer: "A planner can expose scope or dependency errors before workers create side effects." }] },
      { bridge: "Independence is a property of context and authority, not job titles.", meaning: "A reviewer is not independent if it is primed to defend the same conclusion or can silently change the implementation.", question: "What should an independent reviewer receive?", answer: "The task contract, proposed change and relevant evidence, but enough separation from the original reasoning to form a genuine challenge.", further: [{ question: "What should the reviewer return?", answer: "Findings ranked by evidence and impact, unanswered questions and a clear recommendation." }, { question: "Why preserve dissent?", answer: "A disagreement can reveal a hidden assumption that consensus would otherwise bury." }] },
    ],
    example: ["A patch needs implementation, security review and test review.", ["Select the pattern", "Use a pipeline with one implementation artifact followed by two independent reviewers, then a final owner joins their findings.", "Each review has a distinct question.", "Letting reviewers modify the patch while reviewing it."], ["Define the join", "Require file-and-line evidence, classify findings and make the owner decide whether to revise, accept or escalate.", "Review remains actionable and accountable.", "Taking a majority vote without examining the evidence."]],
    checks: [
      ["When is fan-out/fan-in useful?", ["Tightly coupled edits", "Independent questions with a common join", "Unbounded exploration"], 1, "The pattern depends on separable work and comparable returns."],
      ["What makes a reviewer independent?", ["The same hidden transcript", "A different avatar", "Fresh scope and authority to challenge"], 2, "Independence concerns context and incentives."],
      ["What should cross a stage boundary?", ["Every prior thought", "A defined artifact and evidence", "An unlabelled guess"], 1, "Stable handoffs keep pipelines inspectable."],
    ],
    takeaway: "Choose a pattern by dependency, define the joining artifact and keep review genuinely able to disagree.",
    nextConnection: "The final lesson sets the brake: many tasks are better with one coherent owner. Knowing when not to split is part of multi-agent engineering.",
    source: ["tools", "security"],
  },
  {
    id: "when-not-multi",
    title: "When multiple agents make the task worse",
    unit: "07 · Coordinate agents",
    question: "When does one stronger, longer-running agent win?",
    outcome:
      "Recognise coordination overhead and keep a task single-threaded when coherence is worth more than parallel capacity.",
    intro:
      "A committee is not automatically wiser than one person. If every decision depends on the previous one and everyone must read the same changing document, the committee spends its time handing context around. Multi-agent systems fail in the same way: more reports, more joins and less ownership than the problem deserves.",
    sections: [
      ["Spot the coupling", "Stay with one agent when the work is a short coherent loop, the context is evolving rapidly, the same files must be edited together or the join would require reconstructing the whole reasoning chain. A single owner can keep a hypothesis, evidence and implementation aligned."],
      ["Use a deliberate escalation rule", "Start with one agent and add a worker only when a specific bottleneck appears: independent research, adversarial review, long-running monitoring or a clear parallel partition. Compare the saved work with the coordination cost, and remove workers that do not change a decision."],
    ],
    checkpoints: [
      { bridge: "Parallelism is not a virtue when every step depends on the last.", meaning: "Coherence and context locality can be more valuable than additional capacity.", question: "A small bug needs three sequential edits to one function and one focused test. Should it begin as a five-agent system?", answer: "No. The coupling and join cost dominate. One coherent agent or engineer should own the loop.", further: [{ question: "What is context locality?", answer: "Keeping the relevant hypothesis, evidence and current edits together so the next decision does not require expensive reconstruction." }, { question: "Why can more agents reduce quality?", answer: "They can multiply stale context, duplicated work and unresolved conflicts." }] },
      { bridge: "Escalation should be evidence-led.", meaning: "Add agents to remove an observed bottleneck, not to make the architecture look sophisticated.", question: "What is a good reason to add an independent reviewer after a single-agent patch?", answer: "The change is consequential and a fresh review can test assumptions with a manageable join.", further: [{ question: "When should a worker be removed?", answer: "When its output does not change the decision or costs more to coordinate than the work it saves." }, { question: "What should a single owner retain?", answer: "The task contract, final synthesis and responsibility for the resulting decision." }] },
    ],
    example: ["A one-file fix is being considered for a multi-agent rollout.", ["Measure the join", "The task has one owner, two relevant tests and no independent research. Compare the expected coordination and review effort with simply keeping one loop.", "The simpler design has a clear advantage.", "Adding agents because the task is labelled 'important.'"], ["Escalate if needed", "After implementation, request one focused security review only if the change crosses an external boundary.", "Extra capacity is tied to a real risk.", "Keeping a permanent reviewer running after it stops finding new issues."]],
    checks: [
      ["When should one agent usually win?", ["Many independent investigations", "Tightly coupled, small work", "A need for adversarial review"], 1, "Coherence can outweigh parallelism."],
      ["What should trigger escalation?", ["Architecture fashion", "A larger prompt", "An observed bottleneck or risk"], 2, "Add capacity for a reason."],
      ["When should a worker be removed?", ["Never", "When it no longer changes a decision", "When it finishes one sentence"], 1, "Coordination has an ongoing cost."],
    ],
    takeaway: "Start with one coherent owner; add agents only when a specific, measurable bottleneck justifies the join.",
    nextConnection: "With coordination choices understood, the course turns to the small harness that makes these responsibilities executable and testable.",
    source: ["tools", "engines"],
    practical: {
      title: "Lab 8 · Compare one agent with many",
      minutes: 40,
      brief:
        "Run one bounded task first with a single owner, then design the smallest multi-agent variant that could plausibly improve it.",
      steps: [
        "Record the single-agent task, evidence, elapsed time and review effort.",
        "Identify one independent question or bottleneck that a second worker could address.",
        "Define worker briefs, return contracts, ownership and the join before running them.",
        "Compare decision quality and coordination cost, then choose whether to keep the split.",
      ],
      deliverables: ["A separability map", "Worker briefs and return contracts", "A single-versus-multi comparison"],
      review:
        "The multi-agent design should have a real join and a named owner. If the second agent adds reports without changing a decision, the correct conclusion is to remove it.",
    },
  },
];
