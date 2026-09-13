import type { Lesson } from "./course-builder";
export const engineering: Lesson[] = [
  {
    id: "landscape",
    title: "The landscape: compare operating modes",
    unit: "03 · Choose and operate a coding agent",
    question: "Are you choosing a model, a harness or a way of working?",
    outcome:
      "Compare Copilot, Codex, Claude Code and Gemini CLI by the workflow you need to operate.",
    intro:
      "A teammate says “we should use Copilot” and another says “we should use GPT.” They may not disagree: one named a product family, the other a model family. A third person says “run it in CI,” which answers a different question again.\n\nBefore comparing brands, write the task and operating mode. Do you want suggestions while editing, a delegated change in an isolated checkout, or an event-triggered investigation that returns tomorrow? A product can span several modes, so a one-row league table quickly becomes misleading.",
    sections: [
      [
        "Map products to concrete capabilities",
        "GitHub Copilot includes interactive development assistance and a cloud agent that can work on repository tasks in the background. Codex is a coding-agent product spanning supported local and delegated workflows; its identity is not the same as an API model name. Claude Code is an agentic coding tool with repository and tool interactions. Gemini CLI provides a terminal agent and extension/tool mechanisms. Consult the linked official documentation for the surfaces available to your account and installed version.\n\nThese descriptions establish categories, not a performance ranking. For a real comparison, record the exact surface, version, model, tool access, instructions, checkout and permissions. “Copilot versus Codex” without those details can compare inline completion against an autonomous task and attribute the difference to intelligence.",
      ],
      [
        "Choose an experiment, not a mascot",
        "Take one bounded bug with a known regression test. Run each candidate from the same base revision, with the same task text and allowed tools. Record interventions, completion evidence and the diff. If a product cannot operate under the required permission or runtime constraints, that is an engineering finding even if its generated code looks good.\n\nAvoid freezing a fast-moving market into a permanent winner. The durable skill is knowing what to measure and how to separate model capability from the product that exposes it. Re-run a small benchmark when a meaningful model or harness version changes.",
      ],
    ],
    example: [
      "You need help with a one-line rename now and a cross-file bug fix overnight.",
      [
        "Match supervision to the task",
        "Use an interactive editor workflow for the rename if you are already reviewing each change. For the bug, evaluate a delegated workflow with tests and a reviewable branch.",
        "The required handoff differs even though both tasks involve code.",
        "Assuming overnight execution makes a poorly specified task suitable for delegation.",
      ],
      [
        "Record the exact configuration",
        "Write down product surface, selected model, tool permissions and verification commands for the bug trial.",
        "A result can only be reproduced if its operating conditions are known.",
        "Using brand names as substitutes for configuration.",
      ],
    ],
    checks: [
      [
        "Which comparison is most interpretable?",
        [
          "Same task, revision and permissions with configurations recorded",
          "One product’s autocomplete against another’s overnight run",
          "Two marketing demos",
        ],
        0,
        "Matching operating conditions makes differences easier to attribute.",
      ],
      [
        "Does a model name fully specify a coding agent?",
        [
          "Yes, tools are built into every model",
          "No, the harness and environment remain unspecified",
          "Only if it is a frontier model",
        ],
        1,
        "A model identity omits execution, context and workflow behaviour.",
      ],
      [
        "A candidate cannot run in your required environment. What does that mean?",
        [
          "Ignore the limitation if its demo is good",
          "It necessarily has a weak model",
          "It may be unsuitable for this use case",
        ],
        2,
        "Fit includes operational constraints, not just answer quality.",
      ],
    ],
    takeaway:
      "Choose an operating mode and evaluate a configured system. Product names alone are not an architecture.",
    source: ["copilot", "codex", "claude", "gemini"],
  },
  {
    id: "environment",
    title: "The environment: give the agent a reproducible workplace",
    unit: "03 · Choose and operate a coding agent",
    question: "What does “the agent has repository access” actually guarantee?",
    outcome:
      "Prepare repository, shell, Git, test and external-tool access with explicit permission boundaries.",
    intro:
      "The agent can read every source file, but its test command fails because dependencies are missing. It edits anyway and reports that verification is unavailable. Repository access was necessary; it was not sufficient.\n\nAn engineering environment is an executable contract: which revision is checked out, where commands start, which runtimes exist, what can be written and which external systems can be reached. A reliable agent needs evidence about that contract rather than optimistic assumptions.",
    sections: [
      [
        "Make the baseline observable",
        "Before changing code, establish the checkout and baseline test result. A dirty working tree may contain someone else’s edits. An isolated branch or worktree helps distinguish the agent’s changes, but does not by itself sandbox command execution. Git isolation and operating-system isolation solve different problems.\n\nProvide a documented install and test path. Separate a failing baseline from a regression introduced by the agent. A shell is powerful because it can combine programs; that also means its permissions can exceed those of a narrow read_file tool. Web and MCP tools add external observations and possible side effects, so inventory them separately.",
      ],
      [
        "Permissions are enforced outside prose",
        "A prompt can ask the agent not to access secrets. A sandbox, filesystem policy, network policy and scoped credentials can prevent access. Use both clear instructions and actual restrictions appropriate to the task. A process running locally without isolation may inherit sensitive ambient authority even if the requested task is harmless.\n\nDo not confuse approval prompts with a complete security boundary. If approved commands can execute arbitrary repository scripts, those scripts run with the granted authority. Inspect what the environment permits and keep credentials and external write access out of an investigation that only needs local fixtures.",
      ],
    ],
    example: [
      "A CI investigator needs source, test logs and a place to reproduce the failure.",
      [
        "Build the smallest useful environment",
        "Use an isolated checkout at the failing SHA, the documented runtime, a fixture dataset and bounded log access. Capture the baseline command result.",
        "Reproduction needs environment fidelity, not broad production access.",
        "Giving the agent production credentials to work around missing fixtures.",
      ],
      [
        "Test an expected denial",
        "Try the environment’s documented policy check for an out-of-scope write or network access and confirm it is denied.",
        "A boundary should be observable before it is relied on.",
        "Treating a worktree as proof that shell commands cannot affect the rest of the machine.",
      ],
    ],
    checks: [
      [
        "What does a Git worktree isolate?",
        [
          "All network and OS access",
          "A working checkout, not arbitrary process authority",
          "The model’s reasoning weights",
        ],
        1,
        "Git provides separate working trees; sandboxing requires additional enforcement.",
      ],
      [
        "Tests fail before any edit. What must the report preserve?",
        [
          "The baseline failure separately from new regressions",
          "Only the latest green test",
          "Nothing; baseline is irrelevant",
        ],
        0,
        "Without a baseline you cannot attribute a failure to the proposed change.",
      ],
      [
        "Where should a read-only investigation’s permissions be enforced?",
        [
          "Only in an instruction paragraph",
          "Only after publication",
          "In tool credentials and execution policy as well as instructions",
        ],
        2,
        "Actual access controls constrain what execution can do.",
      ],
    ],
    takeaway:
      "A reproducible, bounded environment makes observations meaningful and autonomy controllable.",
    source: ["security", "copilot"],
  },
  {
    id: "long-horizon",
    title: "Long-horizon work: accumulate evidence, not elapsed time",
    unit: "03 · Choose and operate a coding agent",
    question:
      "Has an agent running for two hours achieved two hours of useful autonomy?",
    outcome:
      "Maintain hypotheses, recover from failures and stop a long task for a defensible reason.",
    intro:
      "One agent runs for ninety minutes and changes twelve files. Another spends twenty minutes isolating a race, adds a test and changes two lines. Runtime and edit count favour the first; engineering value may favour the second.\n\nLong-horizon work involves a chain of dependent decisions in which later actions rely on earlier discoveries. The challenge is keeping the goal, evidence and state coherent as the task evolves. Time is a cost and a budget, not a proxy for progress.",
    sections: [
      [
        "Track hypotheses with discriminating experiments",
        "For the flaky retry, list plausible causes: clock handling, shared state and an off-by-one boundary. For each, specify an observation that would support or weaken it. A controlled fake clock weakens the first explanation; two calls sharing a promise barrier test the second.\n\nKeep a compact ledger: hypothesis, evidence, status, next experiment. Do not demand an exposed private reasoning transcript; observable decisions and evidence are enough to audit progress. If a run repeatedly reads the same files without changing this ledger or the implementation, investigate whether context, tools or the task definition is failing.",
      ],
      [
        "Recover without erasing what you learned",
        "A provider outage, a tool timeout and a disproved hypothesis need different responses. Retry transient failures with a bounded policy; fix an environment blocker when authorised; revise a hypothesis when evidence contradicts it. Repeating a deterministic failure is not resilience.\n\nUse checkpoints before expensive transitions. On recovery, revalidate the checkout and resume from the next justified action. Stop as complete only with acceptance evidence. Stop as blocked with the exact missing input. Stop as budget exhausted with a useful handoff. A truthful partial result is more valuable than a success claim manufactured to end the run.",
      ],
    ],
    example: [
      "After several searches, the agent still suspects clock skew.",
      [
        "Choose a falsification attempt",
        "Run the failing case under a deterministic clock and record whether it still fails.",
        "A useful experiment changes confidence in a specific hypothesis.",
        "Collecting another general article about flaky tests.",
      ],
      [
        "Update the ledger and scope",
        "Mark clock skew insufficient for this case; investigate shared retry state next. Preserve the observed failure and command.",
        "Progress is the reduction of uncertainty, not the number of searches.",
        "Deleting the failed hypothesis hides why the new direction was chosen.",
      ],
    ],
    checks: [
      [
        "Which metric best indicates investigative progress?",
        [
          "Wall-clock runtime alone",
          "Number of files opened",
          "New evidence that changes or resolves a hypothesis",
        ],
        2,
        "Elapsed effort can grow without improving the task state.",
      ],
      [
        "A deterministic command fails identically on each retry. What next?",
        [
          "Diagnose the precondition or change the experiment",
          "Retry indefinitely",
          "Declare eventual success",
        ],
        0,
        "Recovery needs a mechanism that can change the outcome.",
      ],
      [
        "What is an acceptable budget-exhausted handoff?",
        [
          "Done, with no tests",
          "Evidence, remaining uncertainty and the next action",
          "A claim that the model will remember later",
        ],
        1,
        "The next engineer or run needs recoverable state and an honest completion status.",
      ],
    ],
    takeaway:
      "Useful long-horizon work preserves a chain of evidence and adapts its next experiment.",
    source: ["tools", "instructions"],
  },
  {
    id: "choosing",
    title: "Choosing an agent: buy the right amount of autonomy",
    unit: "03 · Choose and operate a coding agent",
    question: "When is the best agent choice a human?",
    outcome:
      "Choose assistance, delegation or automation using uncertainty, verification, cost and supervision needs.",
    intro:
      "A task can be difficult to code but easy to verify, such as implementing a parser against a strong conformance suite. Another can be easy to code but hard to specify, such as changing a billing rule whose intended behaviour is disputed. The second may need more human ownership.\n\nTask size alone is a poor routing rule. Choose the level of autonomy by asking what is known, what can be checked and what a wrong action would cost.",
    sections: [
      [
        "Start with the acceptance boundary",
        "Write the outcome and how you will recognise it. If stakeholders disagree about the outcome, use assistance for exploration before delegating implementation. If the outcome is clear and verifiable, a capable agent in a suitable harness can often work independently inside a bounded scope.\n\nMatch capability to uncertainty: deeper reasoning may help an unfamiliar failure; better tools may matter more for a known task with missing access. A faster model can be excellent for a narrow transformation and poor at an open investigation. Evaluate total interventions rather than inferring capability from a label.",
      ],
      [
        "Account for supervision and waiting",
        "Interactive assistance can save time when you are already editing and feedback is immediate. Delegation helps when the task can progress while you do other work. Unattended automation needs stable triggers, reliable output contracts and bounded failure behaviour. A human remains responsible for unresolved product decisions and meaningful approval gates.\n\nCost includes model usage, runtime, review, rework and waiting. A slower agent can be economically better if it needs little attention; a cheap model can be expensive if its output demands repeated repair. Make the choice at the task level, then revisit it using recorded results.",
      ],
    ],
    example: [
      "Route three tasks: rename a local variable, fix a reproducible race, decide a disputed retention policy.",
      [
        "Route by uncertainty",
        "Use interactive assistance for the rename. Delegate the race with a reproducer and acceptance tests. Keep the policy decision human-led, using an assistant to summarise alternatives.",
        "These tasks need different kinds of control.",
        "Routing all three to unattended execution because they have issue numbers.",
      ],
      [
        "Set a review point",
        "For the delegated fix, require the targeted regression, broader relevant tests and a small diff before review.",
        "A clear handoff makes autonomy useful to the supervising engineer.",
        "Promising that model confidence replaces acceptance evidence.",
      ],
    ],
    checks: [
      [
        "Which task is the strongest candidate for bounded delegation?",
        [
          "A disputed product policy",
          "A reproducible bug with a clear regression test",
          "An undefined request to improve everything",
        ],
        1,
        "A clear goal and verification reduce the uncertainty that requires continuous supervision.",
      ],
      [
        "A cheaper model needs twice as much developer repair time. What should you compare?",
        [
          "Token prices only",
          "Its answer length",
          "Total cost including repair and review",
        ],
        2,
        "The relevant unit is accepted engineering work, not a token in isolation.",
      ],
      [
        "What must be added before recurring unattended operation?",
        [
          "Stable triggers, bounded failures and an output contract",
          "A more enthusiastic prompt",
          "A promise never to stop",
        ],
        0,
        "Automation needs lifecycle control beyond the inner agent loop.",
      ],
    ],
    takeaway:
      "Choose autonomy that matches the task’s uncertainty and verification, then measure the human work it actually removes.",
    source: ["copilot", "codex", "engines"],
    practical: {
      title: "Lab 3 · Make an autonomy decision",
      minutes: 25,
      brief:
        "Take three recent tasks from your repository: one routine edit, one ambiguous defect and one product decision.",
      steps: [
        "Write an acceptance criterion and verification method for each.",
        "Choose an operating mode, model/harness requirements and allowed tools.",
        "Estimate supervision and the consequence of a wrong output.",
        "Describe the evidence that would make you change your choice.",
      ],
      deliverables: [
        "A three-task decision table",
        "A bounded delegation brief for the most suitable task",
      ],
      review:
        "There is no universal winning product. Good answers separate uncertainty about desired behaviour from uncertainty about implementation. The ambiguous product decision needs resolution before autonomous execution. A strong delegation candidate has enough environmental access to verify its result.",
    },
  },
  {
    id: "specification",
    title: "Task specification: define the result and its boundaries",
    unit: "04 · Delegate engineering work well",
    question: "Why does “fix retries” produce so many plausible wrong patches?",
    outcome:
      "Turn an ordinary issue into a goal, constraints, context, acceptance criteria and verification plan.",
    intro:
      "“Fix retries” could mean avoid duplicates, shorten delays, increase attempts or remove retries entirely. A capable agent can implement each interpretation cleanly. The missing information is the desired behaviour.\n\nA task specification is a contract for a result. It should explain enough of the problem and constraints to support independent decisions, without prescribing every keystroke or locking the agent into an untested diagnosis.",
    sections: [
      [
        "Separate requirements from hypotheses",
        "State the observed failure and expected behaviour. Add scope constraints, relevant files or evidence, and acceptance criteria. For example: concurrent calls with the same idempotency key must share one in-flight attempt; independent keys must remain independent; cancellation behaviour must not regress.\n\nIf you suspect a lock bug, label it as a hypothesis. Requiring a particular mutex before investigation can force the wrong architecture. Conversely, “use your judgment” cannot replace a hard constraint such as preserving the public API. Tell capable models what matters, where the evidence lives and how success is checked. Let them choose routine implementation details.",
      ],
      [
        "Make verification part of the task",
        "Name the regression case, relevant test commands and what to report when the environment prevents verification. Require an explanation of material limitations. Distinguish the allowed change from publication: producing a patch does not imply permission to merge or deploy it.\n\nAvoid instruction clutter. Repeating generic advice about being careful adds less value than a concrete invariant or a known repository convention. A useful brief can be concise because each sentence removes a real ambiguity. Read it as an independent engineer: could you act without guessing the intended behaviour?",
      ],
    ],
    example: [
      "Rewrite “Retries sometimes duplicate requests. Please fix.”",
      [
        "Specify the observable contract",
        "“Reproduce duplicate sends for simultaneous calls using one idempotency key. Ensure only one transport attempt is active per key; preserve independent-key concurrency and the public API.”",
        "The brief defines behaviour without committing to an implementation.",
        "Demanding a global lock would accidentally serialise unrelated requests.",
      ],
      [
        "Add evidence and acceptance",
        "“Start from the attached trace and retry tests. Add a deterministic concurrent regression, run relevant tests and report the exact commands/results. Return a reviewable diff; do not deploy.”",
        "Evidence and acceptance criteria make the handoff auditable.",
        "Counting a changed test expectation as proof that the original defect was fixed.",
      ],
    ],
    checks: [
      [
        "Which sentence is an acceptance criterion?",
        [
          "Use a clever solution",
          "Two concurrent calls with the same key produce one active send",
          "Think longer about the code",
        ],
        1,
        "It specifies observable behaviour that can be tested.",
      ],
      [
        "How should an unverified suspected cause be supplied?",
        [
          "As a mandatory implementation",
          "As an established fact",
          "As a hypothesis with supporting evidence",
        ],
        2,
        "The agent needs room to reject a diagnosis that does not fit the observations.",
      ],
      [
        "What usually adds more value than generic motivational instructions?",
        [
          "A concrete invariant and reproducible failing case",
          "Repeating be careful ten times",
          "Forbidding all independent decisions",
        ],
        0,
        "Operational facts reduce ambiguity and enable verification.",
      ],
    ],
    takeaway:
      "Specify the desired behaviour, constraints and evidence. Preserve freedom over implementation where the requirements do not constrain it.",
    source: ["instructions", "copilot"],
  },
  {
    id: "agent-friendly",
    title: "Agent-friendly engineering: make feedback executable",
    unit: "04 · Delegate engineering work well",
    question: "What repository change helps every future agent—and engineer?",
    outcome:
      "Improve task boundaries, test feedback and repository guidance so correct work is easier to recognise.",
    intro:
      "The retry regression takes twelve minutes, depends on a live service and fails randomly even before a patch. Every agent run now receives an unreliable signal. Improving the prompt will not repair that feedback channel.\n\nAgent-friendly engineering is often ordinary good engineering made explicit: reproducible setup, narrow tests, navigable structure and accurate conventions. These improvements reduce uncertainty for humans too.",
    sections: [
      [
        "Make feedback discriminate",
        "A test should fail for the original defect and pass for the intended behaviour. A deterministic barrier can expose a race more reliably than sleeping and hoping the scheduler cooperates. Run the test against the baseline to confirm it detects the bug. Then run it against the patch.\n\nA passing suite is evidence for covered cases, not a proof of all requirements. Add boundary cases based on the behavioural contract: different keys, cancellation and retries after failure. Tests that merely reproduce the implementation’s assumptions can certify the wrong behaviour.",
      ],
      [
        "Make the repository legible",
        "Keep setup and test commands close to the code they apply to. Document stable conventions, generated-file boundaries and public API constraints. Product-specific repository guidance can help, but loading rules vary; verify how the installed harness discovers instructions. A file name alone is not a cross-product standard.\n\nBound tasks around a coherent result. “Add idempotent retry coordination” can have an acceptance boundary; “clean up networking” invites unrelated edits. When the work is inherently exploratory, specify the investigation artifact first and defer implementation until the uncertainty is reduced.",
      ],
    ],
    example: [
      "Replace a flaky sleep-based test with a controlled concurrency test.",
      [
        "Control the scheduling point",
        "Make the transport await a manually released promise. Start two same-key calls before releasing it and assert that only one transport attempt began.",
        "The test directly observes the concurrency invariant.",
        "Increasing the sleep duration hides nondeterminism without defining the race.",
      ],
      [
        "Prove the test is useful",
        "Observe failure on the original implementation and success after the coordination fix; retain separate-key coverage.",
        "A regression test must distinguish buggy from intended behaviour.",
        "Only running the new test after editing can miss a test that always passed.",
      ],
    ],
    checks: [
      [
        "What makes a regression test persuasive?",
        [
          "It is long",
          "It fails on the relevant baseline and passes with the fix",
          "It mirrors the new implementation",
        ],
        1,
        "The before/after distinction shows that the test detects the specific defect.",
      ],
      [
        "What belongs in durable repository guidance?",
        [
          "Stable setup commands and conventions",
          "Every transient hypothesis",
          "A secret token for convenience",
        ],
        0,
        "Guidance should remain accurate and reusable without exposing credentials.",
      ],
      [
        "An issue asks for broad cleanup with no acceptance boundary. What helps first?",
        [
          "Unlimited edit scope",
          "More parallel agents",
          "A bounded investigation or concrete behavioural outcome",
        ],
        2,
        "A coherent outcome limits wandering and gives review a standard.",
      ],
    ],
    takeaway:
      "Reliable tests and discoverable conventions are part of the agent interface, not background housekeeping.",
    source: ["instructions", "copilot"],
  },
  {
    id: "failure-modes",
    title: "Failure modes: diagnose before you reprompt",
    unit: "04 · Delegate engineering work well",
    question:
      "What failed: the goal, the evidence, the tools or the implementation?",
    outcome:
      "Use observable failure signatures to choose a targeted intervention.",
    intro:
      "The agent declares success, but the bug remains. “Try harder” changes neither the verification gap nor the evidence. First identify how the run failed. Did it test the wrong package, misunderstand the requirement, lose a constraint, or stop after a tool error?\n\nA useful taxonomy earns its place by changing what you do next. The goal is not to label the agent; it is to locate the broken feedback or control mechanism.",
    sections: [
      [
        "Read the trace as an engineering incident",
        "Giving up may follow an unresolved environment blocker or an exhausted budget. Wandering may indicate a vague goal or missing stopping rule. A wrong hypothesis needs a discriminating experiment. Context degradation calls for a better state record and retrieval. Over-editing suggests missing scope constraints or an unnecessarily broad plan.\n\nFalse success is particularly dangerous: the final message claims completion without acceptance evidence. Check exact commands, exit codes, tested revision and test coverage. Tool failure is not automatically model failure; capture whether the request was malformed, denied, timed out or executed against the wrong environment.",
      ],
      [
        "Change the smallest responsible mechanism",
        "If the command ran in the wrong directory, fix the environment. If the test does not cover concurrent calls, fix verification. If the agent forgot a constraint after compaction, preserve that constraint in durable task state. Switching models can help a capability failure, but it is a poor universal response.\n\nKeep the original failed trace for comparison. Re-run a controlled task after the intervention and ask whether the same signature disappeared. A new successful demonstration does not establish that the mechanism is reliable; include the failure case in your future benchmark.",
      ],
    ],
    example: [
      "The final report says “all tests pass,” but only a documentation linter ran.",
      [
        "Identify the evidence gap",
        "The linter’s successful exit says nothing about duplicate retry behaviour. Classify the report as unsupported completion, not a failed regression test.",
        "The observation and claim refer to different acceptance criteria.",
        "Treating any green command as a universal success signal.",
      ],
      [
        "Repair the completion contract",
        "Require the named concurrency regression and relevant suite on the final diff. If they cannot run, the output must say unverified with the blocker.",
        "Completion must be tied to task evidence.",
        "Asking for a more confident summary leaves the same gap.",
      ],
    ],
    checks: [
      [
        "A linter passes but the required regression was not run. Status?",
        [
          "Complete",
          "Unsupported/unverified for the required behaviour",
          "Guaranteed correct if the diff is small",
        ],
        1,
        "The completed check does not establish the acceptance criterion.",
      ],
      [
        "An agent rereads files after each restart. First inspect…",
        [
          "Task-state persistence and retrieval",
          "Its prose tone",
          "The number of emojis in the issue",
        ],
        0,
        "Repeated discovery often indicates that useful state is not carried forward.",
      ],
      [
        "When is changing the model a targeted fix?",
        [
          "Whenever any tool fails",
          "Whenever the run is slow",
          "When controlled evidence indicates a capability limitation",
        ],
        2,
        "Rule out task, tool, context and verification defects before attributing everything to inference.",
      ],
    ],
    takeaway:
      "Treat failed runs as diagnosable systems. Fix the responsible mechanism and retain the case as an evaluation task.",
    source: ["tools", "engines", "security"],
    practical: {
      title: "Lab 4 · Rewrite and diagnose a real issue",
      minutes: 35,
      brief:
        "Choose a normal GitHub or Jira issue. Produce a delegation brief and a failure-response plan.",
      steps: [
        "Separate the observed bug, expected behaviour and suspected cause.",
        "Write scope constraints, acceptance criteria and exact verification commands.",
        "Imagine a missing tool, a wrong hypothesis and false success. State a different intervention for each.",
        "Ask another engineer or fresh agent to identify remaining ambiguities.",
      ],
      deliverables: [
        "A ready-to-delegate task brief",
        "Three failure signatures with targeted recovery actions",
      ],
      review:
        "A good brief leaves implementation choices open while making the result testable. A missing runtime calls for an environment fix or blocker report; contradictory evidence calls for a new hypothesis; false success calls for a completion gate tied to the required checks.",
    },
  },
];
