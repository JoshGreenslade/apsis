import type { Lesson } from "./course-builder";
export const coordination: Lesson[] = [
  {
    id: "why-multiple",
    title: "Why multiple agents? Find the separable work",
    unit: "07 · Coordinate agents deliberately",
    question:
      "What would a second agent do that the first cannot usefully do next?",
    outcome:
      "Identify independent work, useful specialisation, verification and context isolation before adding agents.",
    intro:
      "The retry defect touches the client, transport and metrics. Three files suggest three agents, but every edit may depend on the same decision about ownership of an in-flight request. Splitting by file count can multiply coordination without creating useful independence.\n\nBegin by looking for separable questions. One investigator can reproduce the client race while another checks whether the transport already provides idempotency. Their findings can inform one implementation without concurrent edits to the same design.",
    sections: [
      [
        "Four reasons a second context can help",
        "Parallelisation can reduce elapsed time when work is independent. Specialisation can give a worker a narrower toolset or evidence bundle. Independent verification can look for defects without inheriting the implementer’s assumptions. Context isolation can keep a large investigation from crowding out the parent’s main task.\n\nNone of these benefits follows from agent count alone. Two agents can share the same wrong assumption. A specialist label does not change model capability unless the actual instructions, tools or context help. Ask what distinct evidence or action each worker will contribute.",
      ],
      [
        "Compare the critical path",
        "Suppose two independent investigations each take ten minutes. Parallel execution can approach ten minutes plus coordination and integration, instead of twenty. If the second needs the first’s result, there is no such speedup. If both edit the same module, merge and validation time may exceed the time saved.\n\nWrite the dependency graph and expected output before spawning workers. A report with file references and uncertainty is easier to combine than a stream of unstructured messages. Use one agent when the task is small or its decisions are tightly coupled.",
      ],
    ],
    example: [
      "Investigate retry duplication across client and transport.",
      [
        "Split by question",
        "Worker A reproduces duplicate calls in the client; worker B checks the transport’s documented idempotency contract. Neither edits shared code.",
        "The investigations have distinct evidence sources and can proceed independently.",
        "Assigning both workers to fix retries without ownership boundaries.",
      ],
      [
        "Join before implementation",
        "Compare the findings, choose one owner for the patch and retain contradictions as questions to resolve.",
        "Integration is a decision stage, not a concatenation of reports.",
        "Taking agreement between two agents as proof when both used the same untested premise.",
      ],
    ],
    checks: [
      [
        "Which split offers useful parallelism?",
        [
          "Two independent investigations with distinct outputs",
          "Two writers editing the same function blindly",
          "A second agent waiting for the first to finish",
        ],
        0,
        "Parallelism helps when work can proceed independently and integration is manageable.",
      ],
      [
        "Does a specialist role name guarantee better results?",
        [
          "Yes",
          "No; evaluate its actual context, tools and performance",
          "Only if written in capitals",
        ],
        1,
        "A role label is not evidence of specialised capability.",
      ],
      [
        "What limits the speedup of a multi-agent task?",
        [
          "Only the number of agents",
          "Only token price",
          "Dependencies, coordination and integration on the critical path",
        ],
        2,
        "Serial work and joining costs can dominate parallel execution.",
      ],
    ],
    takeaway:
      "Add an agent for a distinct contribution with a clear join point, not because the task sounds large.",
    source: ["tools", "engines"],
  },
  {
    id: "subagents",
    title: "Sub-agents: delegate a question with a return contract",
    unit: "07 · Coordinate agents deliberately",
    question: "What must a worker know, and what must it return?",
    outcome:
      "Design a parent–worker delegation with sufficient context, bounded scope and inspectable results.",
    intro:
      "The parent asks a worker to “check the transport.” The worker returns “looks fine.” That result cannot support a decision because neither the question nor the evidence standard was clear. Delegation needs a contract in both directions.\n\nA sub-agent is typically a worker created within another agent’s task. The exact lifecycle and inherited context depend on the harness. Do not assume it sees the parent’s full conversation, working directory or discoveries unless the implementation guarantees that.",
    sections: [
      [
        "Send the minimum sufficient brief",
        "Give the worker a concrete question, relevant context, constraints, allowed actions and required output. For transport idempotency, include the interface location, the observed duplicate-send trace and the distinction between retry attempts and independent operations. Ask for evidence and unresolved uncertainty.\n\nPassing every parent message may transfer irrelevant history and mistaken assumptions. Passing only a title may force the worker to repeat discovery. Choose context deliberately. If you want independent verification, provide requirements and artifacts without presenting the implementer’s conclusion as the answer to confirm.",
      ],
      [
        "Make the parent own integration",
        "A useful return includes the conclusion, cited files or experiments, limitations and recommended next action. If the worker edited code, include the base revision, changed paths and verification evidence. The parent must inspect contradictions and decide how the result affects the task.\n\nCancellation and failure also need a contract. What happens if the worker times out, returns no artifact or discovers a blocker? A parent that waits forever on a silent child has an orchestration defect. Set a budget and preserve partial evidence when useful.",
      ],
    ],
    example: [
      "Delegate the question “does transport deduplicate same-key concurrent requests?”",
      [
        "Write the worker brief",
        "“Read the transport interface and tests at this revision. Do not edit. Determine same-key concurrency behaviour; return references and one experiment or a clear evidence gap.”",
        "The worker knows the question, scope and output standard.",
        "Asking it to review everything in networking.",
      ],
      [
        "Inspect the return",
        "The worker cites a sequential retry test only. Mark concurrent behaviour unresolved and request a targeted experiment.",
        "Evidence must match the delegated claim.",
        "Accepting a confident conclusion supported by a different scenario.",
      ],
    ],
    checks: [
      [
        "What is a useful worker return?",
        [
          "Looks good",
          "Conclusion, evidence and limitations",
          "A copied parent prompt",
        ],
        1,
        "The parent needs enough information to evaluate and integrate the result.",
      ],
      [
        "Who owns resolving contradictory worker findings?",
        [
          "Nobody",
          "Whichever worker writes last",
          "The parent or explicit integration stage",
        ],
        2,
        "Delegation does not remove responsibility for the final coherent result.",
      ],
      [
        "How should context inheritance be treated?",
        [
          "As a harness-specific behaviour to verify",
          "As always complete and automatic",
          "As irrelevant to worker performance",
        ],
        0,
        "Missing or excessive context changes what the worker can reliably do.",
      ],
    ],
    takeaway:
      "Delegate a bounded question and require evidence back. The parent remains responsible for integration.",
    source: ["tools", "claude"],
  },
  {
    id: "coordination",
    title: "Coordination: make ownership and state explicit",
    unit: "07 · Coordinate agents deliberately",
    question:
      "What prevents two correct local edits from producing a broken combined system?",
    outcome:
      "Choose artifact, message, shared-state and Git coordination mechanisms with explicit ownership.",
    intro:
      "One agent changes the retry function’s return type while another updates a caller using the old type. Both pass local tests. Their combination fails. The problem is not necessarily either agent’s reasoning; the shared contract changed without coordination.\n\nMultiple workers turn an engineering task into a distributed-systems problem at a small scale. You now have stale reads, concurrent writes, partial failures and integration ordering.",
    sections: [
      [
        "Choose a source of truth",
        "Messages are useful for timely signals. Durable artifacts are useful for handoff and recovery. Shared memory can distribute conventions but needs provenance and update rules. A task board or state file can record ownership and status. Decide which one is authoritative for each kind of fact.\n\nFor shared interfaces, assign one owner or agree on a versioned contract before parallel implementation. A message saying “I changed it” is insufficient if another worker is still acting on an older checkout. Include revision identifiers and invalidate dependent assumptions when the interface changes.",
      ],
      [
        "Use Git as a coordination aid, not a correctness oracle",
        "Separate branches or worktrees let workers produce isolated changes. Commits provide inspectable artifacts and base revisions. They do not prevent semantic conflict: two patches can merge cleanly while disagreeing about behaviour. Integrate deliberately and run cross-component checks on the combined tree.\n\nAvoid several agents writing the same checkout unless the harness and ownership policy explicitly support it. Prefer reports for independent investigation and one patch owner for tightly coupled changes. Record who may merge, who reviews and what happens when a worker’s base becomes stale.",
      ],
    ],
    example: [
      "Two workers need to change a retry API and its metrics consumer.",
      [
        "Stabilise the interface",
        "Agree on the result shape and assign the API owner. Pass the schema and base commit to the consumer worker.",
        "Parallel work needs a shared contract that can be referenced.",
        "Assuming chat messages update another worker’s files.",
      ],
      [
        "Verify the combined tree",
        "Integrate the two commits and run the caller–transport integration test in addition to local suites.",
        "Correctness of parts does not imply correctness of their interaction.",
        "Treating a conflict-free Git merge as an integration test.",
      ],
    ],
    checks: [
      [
        "A Git merge has no textual conflicts. What follows?",
        [
          "The system is behaviourally correct",
          "Only that Git combined the text automatically",
          "No tests are needed",
        ],
        1,
        "Semantic incompatibilities can survive a clean merge.",
      ],
      [
        "Which artifact makes a worker patch easier to integrate?",
        [
          "A commit with base revision and verification evidence",
          "An unlabelled diff pasted into chat",
          "A claim of completion without changed paths",
        ],
        0,
        "Revision and evidence help the integrator detect stale assumptions and reproduce checks.",
      ],
      [
        "What is a sensible policy for a tightly coupled interface?",
        [
          "Unlimited simultaneous writers",
          "Last writer wins silently",
          "An explicit owner and coordinated contract changes",
        ],
        2,
        "Ownership reduces conflicting decisions about shared behaviour.",
      ],
    ],
    takeaway:
      "Coordinate through explicit contracts and durable artifacts, then verify the integrated result.",
    source: ["copilot", "tools"],
  },
  {
    id: "patterns",
    title: "Multi-agent patterns: choose the join as carefully as the split",
    unit: "07 · Coordinate agents deliberately",
    question: "What makes an independent reviewer independent?",
    outcome:
      "Apply planner, investigator, implementer, reviewer and map/reduce patterns to a task’s dependencies.",
    intro:
      "A reviewer is told: “The fix is correct; confirm it.” It sees the implementer’s reassuring summary but not the failing requirement. Calling this independent review does not make it independent. The context and acceptance contract matter more than the role name.\n\nPatterns are useful descriptions of information flow. Choose one because its separation improves a decision, not because it appears in an architecture diagram.",
    sections: [
      [
        "Match the pattern to the uncertainty",
        "Planner to implementer helps when a design artifact can clarify scope, but the implementer must be allowed to report a mistaken plan. Investigator to implementer separates uncertainty reduction from editing. Implementer to reviewer adds a challenge stage focused on requirements and evidence. Parallel investigation explores independent hypotheses or subsystems.\n\nMap/reduce work applies one bounded analysis to many independent items, then combines the results. The reducer must deduplicate findings, resolve contradictions and preserve evidence; it should not merely summarise everything as equally reliable. For a small task, any of these extra stages can cost more than it contributes.",
      ],
      [
        "Create a real challenge stage",
        "Give the reviewer the task requirements, base and final revisions, relevant tests and authority to disagree. It may inspect the diff and reproduce critical checks. Avoid instructing it to defend the implementer’s diagnosis. Independent context reduces one route for bias; it does not guarantee independent errors, especially when agents share models and evidence.\n\nThe join needs a decision rule. Does one valid counterexample send the patch back? Who decides whether a requested change is in scope? A sequence of approvals without a falsifiable standard can become ceremonial rather than protective.",
      ],
    ],
    example: [
      "Use investigator → implementer → reviewer for the retry race.",
      [
        "Define each artifact",
        "Investigator returns a reproducible failure; implementer returns a patch and test evidence; reviewer returns requirement-linked findings or a qualified approval.",
        "Each stage has a different question and useful output.",
        "Sending three agents the same vague instruction to fix the issue.",
      ],
      [
        "Resolve a reviewer counterexample",
        "The reviewer finds different keys are serialised. Return that failed invariant to the implementer and rerun the combined acceptance suite.",
        "A concrete counterexample should change the outcome.",
        "Majority-voting away a reproducible defect because two agents liked the patch.",
      ],
    ],
    checks: [
      [
        "What makes review more independent?",
        [
          "A different name alone",
          "Requirements and artifacts plus permission to challenge the implementation",
          "A prompt to agree politely",
        ],
        1,
        "Independence depends on evidence and incentives, not labels.",
      ],
      [
        "What is the reducer’s job in map/reduce analysis?",
        [
          "Resolve, deduplicate and integrate evidence",
          "Accept every claim equally",
          "Rewrite all reports in a longer style",
        ],
        0,
        "The join must produce a coherent, supported result from potentially conflicting parts.",
      ],
      [
        "A reviewer supplies a reproducible counterexample. What next?",
        [
          "Count votes",
          "Ignore it if the model is smaller",
          "Investigate the counterexample against the requirements",
        ],
        2,
        "A valid failure observation outweighs unsupported confidence.",
      ],
    ],
    takeaway:
      "A pattern is an evidence flow with a join contract. Make disagreement capable of changing the result.",
    source: ["tools", "security"],
  },
  {
    id: "when-not-multi",
    title: "When multiple agents make the task worse",
    unit: "07 · Coordinate agents deliberately",
    question: "When does one stronger, longer-running agent win?",
    outcome:
      "Estimate coordination overhead and reject multi-agent designs that do not improve the outcome.",
    intro:
      "A twelve-minute bug fix is split among four workers. They spend five minutes each reconstructing the context, disagree about the interface and require fifteen minutes of integration. The parallel diagram looked efficient; the measured workflow was slower.\n\nThe right comparison is not one agent’s runtime versus the longest worker runtime. Include context preparation, duplicate work, messages, integration, review and rework.",
    sections: [
      [
        "Price the whole coordination path",
        "If independent worker times are A and B, ideal parallel execution takes roughly max(A, B), but preparation and joining must be added. Shared rate limits and scarce tools can make even nominally independent work compete. Token cost often grows because each worker needs its own context.\n\nFor tightly coupled decisions, one agent can maintain a coherent hypothesis and working tree more cheaply. A stronger model with adequate context management may resolve the problem without repeated handoffs. This is a testable engineering choice, not a universal claim that one or many agents is always best.",
      ],
      [
        "Look for symptoms of a bad split",
        "Duplicate repository discovery suggests insufficiently distinct assignments. Conflicting edits suggest missing ownership. Repeated clarification messages suggest an unstable contract. Fragmented context appears when no worker can explain the end-to-end behaviour. A growing integration queue can erase any benefit from faster workers.\n\nTry a single-agent baseline before adding coordination. Compare accepted results, human intervention and elapsed time. Retain extra agents only where they add useful independent evidence or reduce the critical path. Removing a worker is an architectural improvement when the result becomes simpler and more reliable.",
      ],
    ],
    example: [
      "Choose between one agent taking 25 minutes and two 12-minute workers with 18 minutes of preparation/integration.",
      [
        "Calculate the actual path",
        "The idealised parallel path is 12 + 18 = 30 minutes, already slower than 25. It also may cost more tokens.",
        "The join is part of the task, not overhead to hide outside the measurement.",
        "Reporting only the fastest worker’s time.",
      ],
      [
        "Identify a better boundary",
        "Keep one implementation owner. If useful, add a short independent review whose findings justify its extra cost.",
        "A small verification stage may add value without duplicating the whole investigation.",
        "Adding more workers to compensate for an already expensive integration process.",
      ],
    ],
    checks: [
      [
        "Two 12-minute workers need 18 minutes of shared setup/integration. Ideal elapsed time?",
        ["12 minutes", "24 minutes", "30 minutes"],
        2,
        "The critical path includes the parallel maximum plus setup and integration.",
      ],
      [
        "Which task often favours one agent?",
        [
          "A small, tightly coupled change",
          "A hundred independent document classifications",
          "Two unrelated read-only investigations",
        ],
        0,
        "Handoffs can cost more than they save when decisions are tightly dependent.",
      ],
      [
        "What evidence justifies keeping a multi-agent design?",
        [
          "A more elaborate diagram",
          "Better accepted outcomes or reduced total effort/time",
          "A larger agent count",
        ],
        1,
        "The architecture should earn its complexity through measured benefits.",
      ],
    ],
    takeaway:
      "Count coordination and integration. One coherent agent is often the better baseline.",
    source: ["tools", "engines"],
    practical: {
      title: "Lab 7 · Compare one worker with a team",
      minutes: 35,
      brief:
        "Choose a multi-file engineering task. Design both a single-agent approach and one explicit multi-agent alternative before running either.",
      steps: [
        "Draw the dependency graph and identify work that can truly overlap.",
        "Write each worker’s input, output, write ownership and budget.",
        "Define the join and integrated acceptance test.",
        "Estimate and then measure setup, execution, integration and review separately.",
      ],
      deliverables: [
        "Two competing workflow designs",
        "A dependency graph and ownership table",
        "A decision supported by total time and accepted-result evidence",
      ],
      review:
        "A good answer may choose one agent. Parallel investigation is useful only if distinct findings can be produced independently. Concurrent implementation needs stable interfaces and integrated checks. Count every worker’s usage and the human time spent resolving the join.",
    },
  },
];
