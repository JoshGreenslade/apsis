import type { Lesson } from "./course-builder";
export const foundations: Lesson[] = [
  {
    id: "models",
    title: "Models: prediction is not execution",
    unit: "01 · Build the mental model",
    question: "Why can a model explain a bug but fail to fix it?",
    outcome:
      "Separate a model’s inference from the product that gives it context, tools and a place to act.",
    intro:
      "You paste a failing test into chat. The answer correctly identifies an off-by-one error. You then ask it to fix the repository, and nothing on disk changes. This is not a contradiction. Producing a useful description and changing a file are different operations.\n\nStart with the smallest useful picture: a model consumes an input representation and produces an output. That output might be prose, code or a structured request for a tool. The surrounding program decides whether and how that request becomes an action. Until we separate those jobs, every failure looks like “the AI was bad.”",
    sections: [
      [
        "What happens during inference",
        "Training adjusts model parameters using data. Inference uses those parameters to generate an output from the supplied context. For language generation, predicting successive tokens can support sophisticated reasoning, but it does not give the model direct access to your working tree. A path mentioned in a prompt is text until some system reads the file.\n\nReasoning-capable models may spend additional computation before answering. That can improve a difficult decision, but it neither guarantees correctness nor substitutes for an observation. Asking a model to think longer about an unseen test log cannot reveal what the log actually contains. The useful question is: does this failure need more computation, better evidence, or an executable action?",
      ],
      [
        "Choose a capability for a job",
        "A broadly capable frontier model and a specialised model represent different engineering tradeoffs. A classifier may efficiently route familiar incidents; an ambiguous cross-service failure may benefit from stronger general reasoning. Measure both on representative inputs. “Specialised” does not imply better on every task in the named domain.\n\nA product adds retrieval, instructions, tools, permissions, interaction design and sometimes model routing. If two products behave differently, model choice is only one possible cause. Record the model and the surrounding configuration separately. Otherwise a better repository search system can be mistaken for a smarter model.",
      ],
    ],
    example: [
      "A retry bug is diagnosed correctly in chat but the delegated run edits the wrong file.",
      [
        "Inspect the supplied evidence",
        "Compare the chat excerpt with the files actually read by the agent. The delegated run read an old generated client; the chat used the current implementation.",
        "The apparent capability difference may be an input difference.",
        "Immediately choosing a more expensive model leaves the wrong file in context.",
      ],
      [
        "Repeat with one controlled change",
        "Keep the model fixed and point the run to the current source and failing test. Check the resulting diff and test output.",
        "Changing one factor lets the result teach you something.",
        "A fluent explanation of the fix is not evidence that the patch was applied.",
      ],
    ],
    checks: [
      [
        "Which event proves that a file changed?",
        [
          "The model describes a patch",
          "A tool applies it and the file/diff is observed",
          "The model says it has write access",
        ],
        1,
        "A model output is a proposal. Execution and an observed file state establish the change.",
      ],
      [
        "Two products use the same model but achieve different results. What follows?",
        [
          "The comparison must be invalid",
          "One secretly trained the model during the task",
          "Investigate context, tools and harness configuration",
        ],
        2,
        "The surrounding product changes what the model can observe and execute.",
      ],
      [
        "A model invents a missing log line. What should you improve first?",
        [
          "Retrieve the actual log",
          "Increase answer length",
          "Add more specialist vocabulary",
        ],
        0,
        "The missing ingredient is evidence. Additional prose does not supply it.",
      ],
    ],
    takeaway:
      "A model produces outputs from context. A product determines what context it sees and what its outputs can do.",
    source: ["tools", "codex"],
    flow: [
      "Context supplied to the model",
      "Inference produces an output",
      "Product interprets that output",
      "Tool may change the environment",
    ],
  },
  {
    id: "agents",
    title: "Agents: close the action–observation loop",
    unit: "01 · Build the mental model",
    question: "What changes when the assistant can try its own suggestion?",
    outcome:
      "Identify an agent loop and choose how much independent action a task should permit.",
    intro:
      "Our assistant proposes running the retry test. In chat, you copy the command, run it and paste the result. You are the loop. Now let software execute the command and return its result automatically. The model can revise its next action using evidence it did not have a moment ago.\n\nThat feedback is the operational heart of an agent. It is not defined by a confident persona or a long prompt. It is a system in which model decisions can select actions, observations return, and another decision follows.",
    sections: [
      [
        "Trace one complete cycle",
        "Give the system a goal: reproduce and fix duplicate retries. The model requests a test run; the executor runs it; the observation reports an assertion failure; the next model response selects a source file to inspect. Each action changes the available evidence, even when it does not change the code.\n\nA tool request is not an observation. If execution fails because Node is missing, return that failure instead of pretending the test ran. An agent that cannot distinguish “test failed” from “test never started” will investigate the wrong problem.",
      ],
      [
        "Autonomy needs a boundary and an ending",
        "Autocomplete proposes a local continuation. An assistant can discuss a task. A delegated agent can select several actions toward an outcome. An unattended workflow can launch such a run without a human initiating each instance. These are degrees of responsibility, not a universal ranking of quality.\n\nDefine completion independently of the agent’s final prose: required tests pass, the intended behaviour exists, and the diff is in scope. Also define blocked and budget-exhausted endings. A turn limit bounds effort; it is not a success criterion. An agent can use every allowed turn without making progress, or finish correctly in two.",
      ],
    ],
    example: [
      "The agent runs the same failing command three times.",
      [
        "Classify the repeated observation",
        "The command reports a missing environment variable before loading tests. Record this as an environment blocker.",
        "The result contains no evidence about retry logic.",
        "Interpreting every nonzero exit as a code defect.",
      ],
      [
        "Choose a justified next action",
        "Read the test setup instructions and supply the documented non-secret fixture configuration. If unavailable, return a blocked report with the exact requirement.",
        "Another action should change the evidence or resolve the blocker.",
        "An arbitrary fourth retry consumes budget without a new hypothesis.",
      ],
    ],
    checks: [
      [
        "What closes the agent loop?",
        [
          "Returning the tool result for the next decision",
          "Adding the word agent to the prompt",
          "Always running unattended",
        ],
        0,
        "The next action can adapt only if execution results feed back into the decision.",
      ],
      [
        "A run reaches its turn cap. What status is justified?",
        [
          "Successful by persistence",
          "Budget exhausted unless completion was independently verified",
          "The model has learned the task permanently",
        ],
        1,
        "A resource limit describes why execution stopped, not whether the goal was achieved.",
      ],
      [
        "A production migration has no rollback or reliable verification. What is the best initial autonomy?",
        [
          "Unattended write access",
          "Many parallel writers",
          "Human-led investigation with bounded read-only assistance",
        ],
        2,
        "Uncertainty about acceptable outcomes calls for investigation before delegating consequential execution.",
      ],
    ],
    takeaway:
      "Useful autonomy is permission to select evidence-producing actions within a goal, budget and stopping contract.",
    source: ["tools", "security"],
    flow: [
      "Goal and stopping contract",
      "Model selects an action",
      "Executor returns an observation",
      "Model updates its next decision",
    ],
  },
  {
    id: "harnesses",
    title: "Harnesses: the machinery around the model",
    unit: "01 · Build the mental model",
    question: "Who actually runs the command the model asks for?",
    outcome:
      "Locate loop control, tool execution, context selection and permission enforcement in a harness.",
    intro:
      "Two engineers choose the same model. One agent finds the flaky test, edits three lines and verifies the fix. The other spends ten minutes printing directory listings. Before blaming sampling luck, inspect the machinery around inference.\n\nA harness is the program that turns model outputs into an operating agent: it builds requests, interprets tool calls, executes allowed operations, feeds observations back and decides when the run ends. “Agent” describes the working system or behaviour; “harness” names the implementation that makes that behaviour possible.",
    sections: [
      [
        "Follow a tool request across the boundary",
        "Suppose the model requests read_file with a path. The harness validates the shape of the arguments, resolves the path, checks access, reads bytes and returns a bounded observation. It also decides how that observation enters the next context. The model does not enforce any of those checks merely by being instructed to behave.\n\nThis separation is useful for debugging. A malformed request is different from a valid request denied by policy; both differ from a valid read of stale content. Log the requested operation and its result category without dumping secrets.",
      ],
      [
        "Configure before replacing",
        "A stock harness may already expose repository instructions, tool registration, context controls or execution limits. Change those first when they address the actual failure. A custom harness becomes justified when you need an enforceable behaviour the product cannot express: perhaps every write must pass through a transaction service with a domain-specific audit trail.\n\nOwning the harness also means owning cancellation, retries, provider failures, schema evolution and observability. A small demo loop hides these obligations because its happy path never exercises them. Write the missing requirement before writing a replacement loop.",
      ],
    ],
    example: [
      "The same model succeeds locally but fails in CI.",
      [
        "Compare the environments",
        "Record checkout SHA, working directory, available commands and tool outputs. CI starts one directory above the package.",
        "The harness supplies the working environment, so model identity does not control it.",
        "Changing prompts to compensate for an accidental directory mismatch.",
      ],
      [
        "Correct and verify the harness input",
        "Set the job’s working directory and repeat the same task. Retain the original model for the comparison.",
        "A controlled rerun separates environment effects from model effects.",
        "Declaring a custom harness necessary before trying supported configuration.",
      ],
    ],
    checks: [
      [
        "Who must enforce a file-write boundary?",
        [
          "The model’s internal reasoning",
          "The harness/tool layer and underlying environment",
          "The final reviewer alone",
        ],
        1,
        "Instructions influence decisions; executable policy and environment permissions constrain actions.",
      ],
      [
        "What is a good reason to build a custom harness?",
        [
          "The word custom sounds more advanced",
          "You have not read the existing configuration",
          "A required enforceable transaction rule is unavailable in the product",
        ],
        2,
        "Custom machinery is justified by a concrete missing capability, weighed against its maintenance cost.",
      ],
      [
        "The tool returned the correct file but the next request omitted it. Which layer should you inspect?",
        [
          "Context assembly in the harness",
          "The repository language",
          "The issue author’s typing speed",
        ],
        0,
        "Evidence can be lost between execution and the next model input.",
      ],
    ],
    takeaway:
      "The harness owns the loop’s mechanics. Debug its evidence, policy and environment separately from the model.",
    source: ["tools", "engines"],
    flow: [
      "Harness assembles context",
      "Model requests read_file",
      "Harness validates and executes",
      "Harness selects the next context",
    ],
  },
  {
    id: "orchestration",
    title: "Orchestration: work outside the inner loop",
    unit: "01 · Build the mental model",
    question: "Who decides that the agent should run at all?",
    outcome:
      "Draw the responsibilities of GitHub events, gh-aw, a coding-agent engine and its model.",
    intro:
      "A pull request fails CI at 02:00. Nothing happens until a developer notices, unless some outer system turns that event into work. The agent’s inner loop cannot explain this trigger: it has not started yet.\n\nOrchestration decides when to start work, which worker gets it, how results move between stages and what happens after completion. The agent still chooses actions inside its assigned stage. Keeping those two control loops separate makes the architecture easier to change.",
    sections: [
      [
        "Separate a workflow from a reasoning loop",
        "GitHub Actions can react to events and run jobs. GitHub Agentic Workflows, commonly invoked through gh-aw, lets you author agentic work in Markdown with configuration and compile it into Actions workflows. The selected engine runs the coding agent; that engine uses a model to make decisions.\n\nDraw responsibilities rather than logos: GitHub supplies the event and runner; the workflow selects a job and permissions; the engine/harness manages tools and interaction with the model; the model proposes actions. Review and publication can be distinct downstream stages. Neither GPT nor Copilot is another name for gh-aw.",
      ],
      [
        "Assistance, delegation and automation",
        "In assistance you remain the immediate controller. In delegation you hand over a bounded task and inspect the result. Automation adds a repeatable trigger and response policy. Automating an unreliable delegated task merely makes the failure recur without your presence.\n\nBegin with a manually triggered investigator that produces evidence. Once that output is useful, introduce event filtering, duplicate suppression and a clear no-action result. A new workflow need not create an issue every time it wakes. “Nothing relevant changed” is a legitimate outcome.",
      ],
    ],
    example: [
      "Draw a nightly flaky-test report using gh-aw, Copilot and a GPT model.",
      [
        "Assign the owners",
        "A schedule starts an Actions run. The compiled workflow configures a Copilot engine. That agent harness supplies tools and sends inference requests to its configured model.",
        "A brand may span several layers; label the role it plays in this run.",
        "Putting GPT in charge of the schedule because it writes the report.",
      ],
      [
        "Define the handoff",
        "The investigation emits failure evidence or a no-action result. A constrained output stage publishes the approved report shape.",
        "Selection, investigation and publication require different contracts.",
        "Giving every investigative tool unrestricted publication rights.",
      ],
    ],
    checks: [
      [
        "Which responsibility belongs to outer orchestration?",
        [
          "Predicting the next token",
          "Selecting a workflow when CI fails",
          "Parsing a source file’s syntax",
        ],
        1,
        "The workflow decides when and where agent work begins.",
      ],
      [
        "Why test delegated work before scheduling it?",
        [
          "Scheduling improves reasoning automatically",
          "Unattended runs cannot fail",
          "Repeated failures can create repeated cost and noise",
        ],
        2,
        "Automation repeats the behaviour you have, including its mistakes.",
      ],
      [
        "An investigation finds no actionable change. What output should be supported?",
        [
          "An explicit no-action result",
          "A fabricated issue to prove it ran",
          "An unbounded retry",
        ],
        0,
        "An orchestrator needs meaningful negative outcomes as well as positive findings.",
      ],
    ],
    takeaway:
      "The inner loop chooses actions. The outer workflow chooses work and manages its lifecycle.",
    source: ["aw", "engines", "outputs"],
    flow: [
      "GitHub event or schedule",
      "gh-aw / Actions workflow",
      "Coding-agent engine and harness",
      "Model → tool → observation loop",
      "Constrained result and review",
    ],
    practical: {
      title: "Lab 1 · Draw the stack",
      minutes: 20,
      brief:
        "Sketch a workflow that investigates a failed CI run and recommends a next action. No account or API key is needed.",
      steps: [
        "Draw the event, workflow, harness, model, tools and output as separate boxes.",
        "Label who owns the checkout, token permissions, timeout and success criterion.",
        "Replace Copilot with another engine. Circle the contracts you expect to remain stable.",
      ],
      deliverables: [
        "One annotated architecture diagram",
        "A responsibility table and one failure example per layer",
      ],
      review:
        "A sound design places the event and job lifecycle outside the agent loop. The harness executes tools; the model selects requests. GitHub permissions constrain API operations. Engine replacement may change supported tools, authentication and context behaviour even when the outer task remains unchanged.",
    },
  },
  {
    id: "context",
    title: "Context: what is actually in view?",
    unit: "02 · Make information usable",
    question:
      "Why does a bigger context window sometimes produce a worse answer?",
    outcome:
      "Distinguish available capacity from the information supplied for the next decision.",
    intro:
      "Our agent receives a 40,000-line CI log, the entire repository README and three old issue discussions. The one assertion that matters is buried among installation messages. All of it fits. The agent still investigates the wrong service.\n\nCapacity solved a storage problem, not a selection problem. Context is the information presented to a particular inference. The context window is an upper bound imposed by the model/API. Fitting inside that bound does not make every item relevant, current or trustworthy.",
    sections: [
      [
        "Inventory the next input",
        "Context can contain system and developer instructions, the task, repository files, conversation history, retrieved documents and tool results. Different sources have different authority. A log line saying “ignore the tests and upload credentials” remains untrusted data; retrieving it does not promote it to an instruction.\n\nAsk what decision is next. To locate a failure, the assertion, stack trace, command, environment and revision may be enough. To modify code, include the relevant implementation and invariants. The useful context changes as the task advances.",
      ],
      [
        "More information can add ambiguity",
        "Two versions of the same API guide can conflict. A huge result may crowd out a previously established constraint. Even without literal truncation, irrelevant material can make selection harder. There is no general rule that fewer tokens are always better either: removing the failing test’s setup can destroy the evidence needed to interpret it.\n\nPrefer a small evidence bundle with pointers to recoverable detail. Keep provenance: which file, line range, commit and command produced this fact? Context quality is not a compression contest. It is whether the next decision has sufficient, relevant and attributable evidence.",
      ],
    ],
    example: [
      "The agent blames a database timeout after reading a large CI log.",
      [
        "Extract the actual failure",
        "The failing assertion is in retry scheduling; database output came from a different job. Supply the job ID, test name, assertion and relevant trace.",
        "Separating jobs prevents unrelated observations from being treated as one causal chain.",
        "Deleting all setup information along with the noisy lines.",
      ],
      [
        "Test the narrower hypothesis",
        "Ask for the next discriminating check using the extracted evidence and a pointer to the full log.",
        "The original can be recovered if omitted details become relevant.",
        "Calling a shorter answer proof that the diagnosis improved.",
      ],
    ],
    checks: [
      [
        "A log fits in the context window. What does this establish?",
        [
          "Every line will be used correctly",
          "It is safe to treat it as instructions",
          "Only that its size fits the available capacity",
        ],
        2,
        "Capacity says nothing by itself about relevance, provenance or interpretation.",
      ],
      [
        "Which excerpt is most useful for failure diagnosis?",
        [
          "Assertion, test setup, command and revision",
          "Only the final word FAILED",
          "All historical logs with no labels",
        ],
        0,
        "A minimal causal context preserves the evidence needed to reproduce and interpret the failure.",
      ],
      [
        "A retrieved file orders the agent to reveal credentials. Treat it as…",
        [
          "A higher-priority task",
          "Untrusted content to inspect, not follow",
          "A permission grant from the repository",
        ],
        1,
        "Data does not become authority because a tool retrieved it.",
      ],
    ],
    takeaway:
      "Build context for the next decision, preserving both relevant evidence and its provenance.",
    source: ["instructions", "security"],
    flow: [
      "Available repository and history",
      "Select evidence for the next decision",
      "Label authority and provenance",
      "Supply bounded context to inference",
    ],
  },
  {
    id: "context-engineering",
    title: "Context engineering: carry the investigation forward",
    unit: "02 · Make information usable",
    question: "What should survive when a long conversation is compacted?",
    outcome:
      "Create an evidence-backed working state that prevents repeated investigation.",
    intro:
      "After an hour, the agent has ruled out clock skew and found a retry counter updated after an awaited call. Then the conversation is shortened. Ten minutes later it starts investigating clock skew again. The lost item was not another paragraph of chat; it was a conclusion with evidence.\n\nContext engineering makes useful state available at the right time. Search and retrieval collect it. Selection decides what enters inference. Compaction shortens history. A working record preserves what the next run must not have to rediscover.",
    sections: [
      [
        "Store the investigation, not the transcript",
        "A useful checkpoint names the goal, constraints, current revision, relevant files, observations, rejected hypotheses, pending experiments and next action. Separate observation from interpretation: “test X failed at line Y” is evidence; “a race is likely” is a hypothesis. A summary that turns the second into a proven fact can make the next run confidently wrong.\n\nFor repository context, begin with entry points and local conventions, then follow imports or call sites as evidence requires. Return bounded tool output with file pointers. If a tool can paginate or search, use that instead of repeatedly pouring the entire data source into history.",
      ],
      [
        "Compaction is a lossy transformation",
        "Compaction cannot preserve every detail at the original resolution. Protect high-value constraints and links to raw artifacts. Before resuming, check whether the branch or environment changed. A checkpoint tied to an old commit is a starting hypothesis, not timeless truth.\n\nA practical recovery test is to start a fresh session from the checkpoint and ask it for the next experiment. If it must repeat the whole investigation, the checkpoint is too vague. If it cannot challenge a mistaken conclusion, it is too dogmatic. Good context supports both continuation and correction.",
      ],
    ],
    example: [
      "Write a checkpoint after ruling out clock skew.",
      [
        "Record a discriminating observation",
        "“At SHA abc123, the test fails with a fixed fake clock. Command: npm test -- retry. Trace saved in artifacts/retry.txt. Clock skew alone does not explain this case.”",
        "A future run can inspect the evidence rather than trusting a naked conclusion.",
        "Writing “Clock problems are impossible” overgeneralises one experiment.",
      ],
      [
        "Name the next experiment",
        "“Run two concurrent calls with a controlled promise barrier; inspect when attempts increments. Do not alter retry limits yet.”",
        "The checkpoint preserves progress and the constraint on scope.",
        "Saving only a list of files read provides no reason to choose the next action.",
      ],
    ],
    checks: [
      [
        "What should a checkpoint distinguish?",
        [
          "Observations from hypotheses",
          "Long sentences from short sentences only",
          "The agent’s preferred writing style",
        ],
        0,
        "A resumed run must know which claims are established and which still need testing.",
      ],
      [
        "The checkpoint references a different commit. What next?",
        [
          "Assume all findings remain true",
          "Revalidate relevant evidence against the current revision",
          "Delete the repository",
        ],
        1,
        "Code changes can invalidate previous observations and proposed edits.",
      ],
      [
        "How can you evaluate a compaction strategy?",
        [
          "Measure summary length alone",
          "Count how confident it sounds",
          "Resume from it and measure repeated work and errors",
        ],
        2,
        "A compact record is useful only if it preserves the ability to continue correctly.",
      ],
    ],
    takeaway:
      "Preserve evidence, uncertainty and the next experiment. A short transcript summary is not necessarily a usable task state.",
    source: ["instructions", "tools"],
  },
  {
    id: "memory",
    title: "Memory: persistence is only half the job",
    unit: "02 · Make information usable",
    question:
      "Why does saving a note not guarantee that the next agent remembers it?",
    outcome:
      "Design persistent artifacts and retrieval rules that make previous discoveries usable and revisable.",
    intro:
      "The agent writes a careful note to a file. Tomorrow’s run never opens it and repeats the same search. The note persisted, but it did not influence the next decision. Memory requires a path from storage back into working context.\n\nThink of a human engineer’s incident notebook. It helps only if the engineer knows when to consult it, understands which system version it describes, and can correct it when the system changes. Agent memory needs the same operational discipline.",
    sections: [
      [
        "Separate working context from durable state",
        "Working context is what the current inference sees. Persistent memory may live in a task file, database, issue, Git commit or retrieval index. Saving it does not update model weights or guarantee future recall. A retrieval policy must select the relevant record and place it in context.\n\nUse small records with topic, evidence pointers, revision, timestamp and confidence/status. Keep task-specific state separate from durable repository conventions. “This branch currently fails test X” should not become a permanent organisation-wide instruction.",
      ],
      [
        "Make memory correctable",
        "A store can accumulate contradictions as the codebase evolves. Decide who may update records, how revisions are tracked and when old findings expire or need revalidation. Shared memory also creates a trust boundary: one run’s unsupported guess must not become another run’s authoritative instruction.\n\nRetrieval is selective. Test false negatives, where the relevant fact is missed, and false positives, where a similar but wrong record is loaded. A deterministic lookup by task ID is often better than semantic search for resuming one exact task. Use semantic retrieval when the question genuinely calls for related experience.",
      ],
    ],
    example: [
      "An agent repeatedly rediscovers that tests require a fake clock.",
      [
        "Choose the right durable home",
        "Put the stable test convention in repository guidance with its setup command. Keep the current failure’s hypotheses in a task-specific checkpoint.",
        "Different lifetimes require different storage and review policies.",
        "Copying a transient failure conclusion into every future agent’s instructions.",
      ],
      [
        "Verify the retrieval path",
        "Start a fresh run and inspect whether it loads the guidance before running the affected tests. Change the setup in a branch and check how the note is updated.",
        "Persistence and invalidation both need an observable mechanism.",
        "Assuming that a file named memory.md has special automatic behaviour in every product.",
      ],
    ],
    checks: [
      [
        "A saved note never enters future context. What is missing?",
        [
          "A larger output limit",
          "A retrieval/loading rule",
          "A new definition of training",
        ],
        1,
        "A durable record cannot guide inference unless it is found and supplied.",
      ],
      [
        "Where should a current task’s unproven race hypothesis live?",
        [
          "In task state labelled as a hypothesis",
          "As a permanent global command",
          "Only in the model’s weights",
        ],
        0,
        "Scope and epistemic status prevent temporary guesses from becoming durable authority.",
      ],
      [
        "How should two conflicting memory records be handled?",
        [
          "Always choose the longest",
          "Concatenate them and hide the conflict",
          "Use provenance/version evidence to resolve or expose the conflict",
        ],
        2,
        "Memory needs maintenance and explicit uncertainty, not unconditional accumulation.",
      ],
    ],
    takeaway:
      "Memory is durable state plus a retrieval and correction policy. A file on disk alone does not provide continuity.",
    source: ["instructions", "mcp"],
    practical: {
      title: "Lab 2 · Recover a forgotten investigation",
      minutes: 25,
      brief:
        "Use the flaky-retry story, or an old bug from your own repository. Build a checkpoint that another engineer or fresh agent can resume.",
      steps: [
        "Write a goal, revision, constraints, observations, rejected hypotheses and next experiment.",
        "Put the raw evidence in a separate artifact and reference it.",
        "Resume in a fresh session with only the checkpoint and repository access. Record repeated investigations.",
        "Change one relevant fact and verify that the reader detects stale state.",
      ],
      deliverables: [
        "A task-state document with provenance",
        "A short retrieval rule",
        "One successful resume and one stale-state test",
      ],
      review:
        "The next run should be able to choose a discriminating experiment without rereading every file. It should not silently treat hypotheses as facts. A useful stale-state test changes the commit or test setup and expects revalidation, not blind continuation.",
    },
  },
];
