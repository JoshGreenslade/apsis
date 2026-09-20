import type { Lesson } from "../lesson";

export const unit01BuildTheMentalModel: Lesson[] = [
  {
    id: "models",
    title: "Models: prediction is not execution",
    unit: "01 · Build the mental model",
    question: "Why can a model explain a bug but fail to fix it?",
    outcome:
      "Separate a model's inference from the product that gives it context, tools and a place to act.",
    intro:
      "A retry-service test is failing. You paste the failure into a chat window, and the assistant gives a convincing diagnosis: a request is being counted as complete before the retry backoff has finished. The explanation is precise enough to guide a fix. Then you ask the assistant to apply it. You look at the file. Nothing has changed.\n\nThe assistant may have been right. It still did not perform the repair.\n\nThat gap is the first distinction in this course. A model produces an answer from the information it receives. A separate system has to turn that answer into an action on a real repository, under real permissions, and then report what happened. When those jobs are blurred together, every failure looks like a failure of intelligence. When they are separated, the next question becomes clearer: did the model reason badly, did it receive the wrong evidence, or did nothing execute its suggestion?",
    sections: [
      [
        "The model produces an output",
        "Training and use are different moments. During training, a model's parameters are adjusted using large collections of examples. During inference, those parameters are fixed. The model receives current input - its context - and produces an output.\n\nThat output might be prose, a proposed patch, structured data or a tool-shaped request. However impressive it is, it is still an output. If the model writes read_file for src/retry.ts, it has not read the file. It has described a request that another program may understand and execute.\n\nThis is also why more reasoning cannot replace missing evidence. If the failure report omits the stack trace, asking the model to think longer may help it organise the information it has, but it cannot make the absent stack trace appear.",
      ],
      [
        "A product is more than its model",
        "The thing people call an assistant is usually a bundle of parts: a model, instructions, retrieval, context assembly, tools, permissions, an interface and sometimes a router that chooses between models.\n\nIf two systems use the same underlying model but one sees the current source file while the other sees a stale generated copy, their different results do not prove that the models differ. They show that the systems supplied different evidence.\n\nWhen a result is poor, ask three questions: did the system have the evidence it needed, did the model have a suitable inference setup, and did the surrounding system have a working way to act and observe the result? Those are different failure surfaces.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Start with the smallest thing the model actually does: transform supplied context into an output.",
        meaning:
          "A model can propose a file read or a patch, but the proposal is not the file read or the patch.",
        question:
          "A model is asked to think longer about a bug report that omits the stack trace. Will more thinking recover the missing evidence?",
        answer:
          "No. More computation can improve the use of existing evidence, but it cannot create an observation that was never supplied.",
      },
      {
        bridge:
          "Once output and execution are separate, comparisons need to keep the model separate from the product around it.",
        meaning:
          "Different context, retrieval, tools or permissions can produce different results even when the underlying model is the same.",
        question:
          "Two products use the same named model, but only one reads the current implementation. What does their different result establish?",
        answer:
          "It establishes that their overall configurations differ in a relevant way. It does not, by itself, establish that the underlying models differ in capability.",
      },
    ],
    example: [
      "A retry bug is diagnosed correctly in chat but the delegated run edits the wrong file.",
      [
        "Compare the evidence",
        "The chat used the current implementation and failing test. The delegated run read an old generated client because its search returned a stale match.",
        "The apparent capability difference may be an input difference.",
        "Choosing a more expensive model before checking which file was supplied.",
      ],
      [
        "Change one factor",
        "Keep the model and task fixed. Point the run at the current source, then inspect the requested path and resulting diff.",
        "A controlled change lets the result tell you whether context caused the failure.",
        "Treating a fluent explanation as proof that the correct file was changed.",
      ],
      [
        "Check the result",
        "Run the focused regression test against the final workspace, not against the model's description of what it intended to do.",
        "The accepted result is the observed change plus evidence that it works.",
        "Stopping at the assistant's statement that the fix is complete.",
      ],
    ],
    checks: [
      [
        "Which event proves that a file changed?",
        [
          "The model describes a patch",
          "A tool applies it and the file or diff is observed",
          "The model says it has write access",
        ],
        1,
        "A model output is a proposal. Execution and an observed file state establish the change.",
      ],
      [
        "Two products use the same model but achieve different results. What should you investigate?",
        [
          "Only the model's training data",
          "Context, tools and surrounding configuration",
          "Whether the longer answer is automatically better",
        ],
        1,
        "The surrounding product changes what the model can see and what its output can do.",
      ],
      [
        "A model invents a missing log line. What should improve first?",
        [
          "Retrieve the actual log",
          "Increase the requested answer length",
          "Add more specialist vocabulary",
        ],
        0,
        "The missing ingredient is evidence. Additional prose does not supply it.",
      ],
    ],
    takeaway:
      "A model produces outputs from context. A product determines what context it sees and what those outputs can do.",
    nextConnection:
      "Once a model's output is separate from execution, the next question is how a system can let it choose actions, observe their results and continue from the evidence.",
    source: ["tools", "codex"],
    flow: [
      "Context supplied to the model",
      "Inference produces an output",
      "A surrounding system interprets it",
      "A tool may change the environment",
      "The result becomes new evidence",
    ],
  },
  {
    id: "agents",
    title: "Agents: close the action-observation loop",
    unit: "01 · Build the mental model",
    question: "What changes when the assistant can try its own suggestion?",
    outcome:
      "Recognise an agent as a model inside a bounded action-observation loop, with explicit goals, budgets and stopping conditions.",
    intro:
      "A chat assistant can suggest where the retry counter is wrong. An agent can ask to open the file, inspect the surrounding code, run the focused test and use the result to decide what to do next.\n\nThat is a real change, but it is not magic. The agent has gained a loop around the model: propose an action, execute it, return an observation, then make another decision.\n\nThe loop makes the system capable of adapting to evidence. It also creates new responsibilities: which actions are allowed, which observations are trustworthy, and what counts as a legitimate stopping point?",
    sections: [
      [
        "The basic loop",
        "A useful abstract loop has four steps:\n\n1. Start with a goal and the evidence currently available.\n2. Ask the model to choose the next action.\n3. Execute that action through a controlled tool.\n4. Return the result as an observation and repeat.\n\nFor the retry incident, the first action might be reading the failing test. The next might be reading the retry implementation. A later action might run the test after a proposed edit. The model chooses among operations that the surrounding system exposes; it does not directly become the filesystem or shell.\n\nWithout the observation step, this is only repeated suggestion. The model cannot adapt to a test result it never receives.",
      ],
      [
        "Observations and stopping states",
        "The loop only helps if observations describe what happened. A denied request, an environment failure and a failing test are different observations and should lead to different next actions.\n\nA run also needs more than a turn limit. It needs explicit outcomes such as complete, blocked and exhausted. A turn limit is a resource boundary, not a definition of success. Completion should be established by acceptance evidence such as a passing regression test and an inspected diff.\n\nA blocked result is meaningful. If the required fixture, permission or runtime is unavailable, the responsible outcome may be a precise report of the blocker rather than another uninformative retry. A good agent loop knows how to stop honestly.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Follow the retry investigation through one complete cycle: choose an action, execute it and return what happened.",
        meaning:
          "The action-observation loop is what lets the model adapt. A tool-shaped message without execution is still just a proposal.",
        question: "What closes an agent loop?",
        answer:
          "The result of an executed action is returned as an observation that informs the next decision.",
      },
      {
        bridge:
          "A system that can act also needs a clear and honest way to stop.",
        meaning:
          "Budgets constrain resource use, while acceptance evidence determines success. They must not be treated as the same thing.",
        question:
          "An agent uses all 20 allotted turns and reports complete. Does the turn count support that claim?",
        answer:
          "No. The run is budget-exhausted unless independent acceptance evidence shows that the task was completed before the limit.",
      },
    ],
    example: [
      "The agent runs the same failing command three times.",
      [
        "Classify the observation",
        "The command reports a missing environment variable before loading the tests. Record an environment blocker, not a retry-logic failure.",
        "The result contains no evidence about the application behaviour.",
        "Interpreting every nonzero exit code as a defect in the code under investigation.",
      ],
      [
        "Choose a new action",
        "Read the test setup instructions and look for the documented fixture configuration. If it is unavailable, stop with a blocked report.",
        "The next action should change the evidence or resolve the blocker.",
        "Issuing a fourth identical command simply because turns remain.",
      ],
      [
        "Verify the stopping state",
        "If the test runs, continue from its actual assertion. If it cannot run, preserve the command, environment and error as the reason for stopping.",
        "A useful run leaves behind a reconstructable account of what happened.",
        "Calling the run complete because the model produced a confident summary.",
      ],
    ],
    checks: [
      [
        "What closes the agent loop?",
        [
          "Returning the tool result for the next decision",
          "Adding the word agent to the prompt",
          "Running without a human watching",
        ],
        0,
        "The next action can adapt only when execution results feed back into the decision.",
      ],
      [
        "A run reaches its turn cap. What status is justified?",
        [
          "Successful by persistence",
          "Budget-exhausted unless completion was verified",
          "Permanently improved for the next task",
        ],
        1,
        "A resource limit describes why execution stopped, not whether the goal was achieved.",
      ],
      [
        "A tool returns permission denied. What is that result?",
        [
          "Useful evidence about the execution boundary",
          "Proof that the model is unintelligent",
          "Nothing until the command is retried",
        ],
        0,
        "A denied action is an observation that should influence the next decision.",
      ],
    ],
    takeaway:
      "An agent is a model inside a bounded action-observation loop. Autonomy requires goals, allowed actions, observations, budgets and stopping rules.",
    nextConnection:
      "The loop describes the behaviour we want. The next lesson asks which machinery validates requests, runs tools, assembles context and enforces the boundary around that behaviour.",
    source: ["tools", "security"],
    flow: [
      "Goal and stopping contract",
      "Model selects an action",
      "Executor returns an observation",
      "Model updates its next decision",
      "Acceptance evidence decides the outcome",
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
      "Give two mechanics the same car and the same diagnosis. Put one in a well-organised workshop, with working tools, a clear job card and a checked lift. Put the other in a room where the tools are scattered and nobody knows which version of the job is current. Their results will differ, even if their technical ability is the same.\n\nCoding agents have workshops too. The harness is the machinery around the model: it builds model requests, interprets tool calls, decides whether they may run, executes them, returns observations and decides when the run ends.\n\nThe model supplies judgement inside the loop. The harness supplies the operating boundary. Keeping those responsibilities distinct gives us somewhere concrete to look when the agent behaves strangely.",
    sections: [
      [
        "Follow one request across the boundary",
        "Suppose the model requests read_file for src/retry.ts. Before the file contents reach the model, the harness may validate the request shape, resolve the path inside the assigned workspace, check access policy, read the bytes, attach the tool-call identity and package the result as new context.\n\nThe model cannot enforce these steps merely by being instructed to behave well. A prompt can say stay inside the repository; executable path checks are what make that boundary real.\n\nUseful failure categories include malformed request, policy denial, execution failure, stale or incorrect result, and successful observation. A harness that reports all of them as tool succeeded destroys the information needed to debug the run.",
      ],
      [
        "Configure before replacing",
        "A harness can enforce that a command is allowed, set a timeout and record its result. It cannot, by those controls alone, establish that the model chose the right hypothesis or that the task was well specified.\n\nIt also decides what survives into the next model request. A perfectly executed file read is of little use if the result is dropped. Retaining every log line can bury the evidence that matters.\n\nA custom harness is justified when the current system cannot enforce a requirement that matters - for example, when every write must pass through a domain-specific transaction service with its own audit trail. Even then, include the ongoing cost of cancellation, retries, provider changes, schema evolution and recovery.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Take the model's request to read a file and follow it into the code that actually acts on the request.",
        meaning:
          "Validation, path resolution, access checks and execution are harness responsibilities. A model's instruction cannot enforce them by itself.",
        question:
          "A tool request is valid JSON but points outside the assigned repository. Who should reject it?",
        answer:
          "The harness validation and access-control layer should reject it before execution.",
      },
      {
        bridge:
          "Before building a replacement, identify the concrete boundary your current setup cannot enforce.",
        meaning:
          "Custom harness ownership includes the unhappy paths as well as the happy path. A missing enforceable requirement can justify it; preference alone cannot.",
        question:
          "A team needs every write to pass through an audit service that the stock product cannot express. Is custom harness work potentially justified?",
        answer:
          "Yes, potentially. This is a concrete missing capability, although the team still needs to weigh implementation and maintenance cost.",
      },
    ],
    example: [
      "The same model succeeds locally but fails in CI.",
      [
        "Compare the execution environments",
        "Record the checkout revision, working directory, available commands, environment inputs and tool outputs. CI starts one directory above the package.",
        "The harness supplies the working environment, so model identity does not control it.",
        "Changing the prompt to compensate for an accidental directory mismatch.",
      ],
      [
        "Make one supported correction",
        "Set the job's working directory and repeat the same task with the same model and instructions.",
        "A controlled rerun separates an environment effect from a reasoning effect.",
        "Declaring a custom harness necessary before checking existing configuration.",
      ],
      [
        "Inspect the final evidence",
        "Compare the command result, resulting diff and final test output. Keep the original failure so the change is attributable.",
        "A useful harness makes both action and observation reconstructable.",
        "Keeping only the final success message.",
      ],
    ],
    checks: [
      [
        "Who must enforce a file-write boundary?",
        [
          "The model's internal reasoning",
          "The harness and underlying execution environment",
          "The final reviewer alone",
        ],
        1,
        "Instructions influence decisions; executable policy and environment permissions constrain actions.",
      ],
      [
        "What is a good reason to build a custom harness?",
        [
          "The word custom sounds more advanced",
          "The team has not read the existing configuration",
          "A required enforceable rule is unavailable in the product",
        ],
        2,
        "Custom machinery should answer a concrete missing capability and its maintenance cost.",
      ],
      [
        "The tool returned the correct file but the next request omitted it. What should you inspect?",
        [
          "Context assembly in the harness",
          "The issue author's writing style",
          "The model's training data first",
        ],
        0,
        "The action succeeded, but its observation was lost before the next decision.",
      ],
    ],
    takeaway:
      "The harness owns the loop's mechanics. Debug its evidence, policy and environment separately from the model.",
    nextConnection:
      "The harness can run a task once it receives one. The next lesson moves outward to the system that decides when a task should run, where it should go and what happens after it finishes.",
    source: ["tools", "security"],
    flow: [
      "Model requests an action",
      "Harness validates policy",
      "Environment performs or denies it",
      "Harness records the observation",
      "Context assembly prepares the next turn",
    ],
  },
  {
    id: "orchestration",
    title: "Orchestration: work outside the inner loop",
    unit: "01 · Build the mental model",
    question: "Who decides that the agent should run at all?",
    outcome:
      "Draw the responsibilities of an external event, workflow, coding-agent engine, harness and model.",
    intro:
      "It is two in the morning and a pull request has just failed its retry-service checks. If the only thing in the system is an agent loop waiting for a task, nothing happens. The model has not been invoked. The harness has no run to manage. The failure simply waits for somebody to notice it.\n\nSomething outside the inner loop has to decide that this event matters, start a job, choose its permissions and carry the result somewhere useful. That outer layer is orchestration.\n\nOrchestration does not replace the agent's reasoning loop. It surrounds it. It decides when work begins, which bounded worker receives it, how stages hand work to one another and what happens when the result is complete, blocked or irrelevant.",
    sections: [
      [
        "Separate the two control loops",
        "The inner loop is local to one task: the model proposes an action, the harness executes it and an observation comes back.\n\nThe outer loop reacts to an event or schedule, creates a run, supplies an environment, selects an engine and routes the result to review, publication or a no-action outcome.\n\nA useful chain is: external event, workflow job, agent engine and harness, model and tools, then result and review. GitHub Actions can provide the event and job runtime. GitHub Agentic Workflows can provide a structured way to author the workflow. An engine runs the agent. The harness manages the inner loop. The model proposes the next action. These names describe different boxes.",
      ],
      [
        "Automation adds repetition, not reliability",
        "Assistance means a person is present and steering. Delegation means a person hands over a bounded task and returns to inspect the result. Automation adds a repeatable trigger and a standing policy, so the cycle can begin without a person deciding each time.\n\nThat extra reach is useful only when the delegated task is already understandable and reasonably reliable. Automating an unreliable investigator does not repair it. It repeats the same failure, often at a larger scale and with less supervision.\n\nStart with a manually triggered investigator. Then add event filtering, stable run identity, duplicate handling, resource limits and a constrained output stage. A no-action result should be normal: if nothing relevant changed, the workflow should be able to say so.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "A failing pull request does not investigate itself. Identify the layer that notices the event and starts the work.",
        meaning:
          "The outer workflow selects and routes a task; the inner agent loop chooses actions after it has been started.",
        question:
          "A nightly job silently stops running two months after setup. Which layer should you inspect first?",
        answer:
          "The outer workflow, trigger or scheduling configuration. The model cannot fail to reason about a run that was never started.",
      },
      {
        bridge:
          "Different operating modes trade supervision for reach. Automation is the last step, not the definition of an agent.",
        meaning:
          "Assistance, delegation and automation differ in who initiates and supervises the work. More independence does not make an unreliable task reliable.",
        question:
          "Should a newly automated investigator create an issue on every scheduled run?",
        answer:
          "No. It should publish an issue only when its contract and evidence justify one. An explicit no-action result is a legitimate outcome.",
      },
    ],
    example: [
      "Design a nightly flaky-test investigation using a repository event, an agent engine and a model.",
      [
        "Assign the owners",
        "A schedule starts the workflow. The workflow creates a job and supplies permissions. The engine runs the harness, which sends the task to the model and executes allowed tools.",
        "Each layer owns a different transition; product names should not hide those boundaries.",
        "Putting the model in charge of the schedule because it writes the final report.",
      ],
      [
        "Define the handoff",
        "The investigator returns evidence, uncertainty and either a supported finding or an explicit no-action result. A constrained output stage decides what may be published.",
        "Investigation and publication have different contracts and should not share unrestricted authority.",
        "Giving every investigative tool permission to create or edit public issues.",
      ],
      [
        "Test the negative path",
        "Deliver the same event twice and run it when no relevant failure has changed. Confirm that identity prevents duplicate work and that no-action is recorded honestly.",
        "A workflow is reliable only when its ordinary non-action and failure paths are meaningful.",
        "Testing only the happy path that produces a report.",
      ],
    ],
    checks: [
      [
        "Which responsibility belongs to outer orchestration?",
        [
          "Predicting the next model output",
          "Selecting a workflow when CI fails",
          "Parsing a source file's syntax",
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
        "An investigation finds no actionable change. What should it support?",
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
      "The inner loop chooses actions. The outer workflow chooses work, manages identity and controls the lifecycle around that loop.",
    nextConnection:
      "The foundation is now in place: a model proposes, an agent loops, a harness enforces and an orchestrator starts and routes work. Next we ask what information should actually reach the model at each step.",
    source: ["aw", "engines", "outputs"],
    flow: [
      "External event or schedule",
      "Workflow creates a bounded run",
      "Engine and harness start the agent",
      "Model chooses tool actions",
      "Evidence becomes a reviewed result",
    ],
    practical: {
      title: "Lab 1 · Draw the stack",
      minutes: 20,
      brief:
        "Sketch a workflow that investigates a failed CI run and recommends a next action. No account or API key is needed.",
      steps: [
        "Draw the event, workflow, harness, model, tools and output as separate boxes.",
        "Label who owns the checkout, permissions, timeout, event identity and success criterion.",
        "Replace the engine with another one. Circle the contracts you expect to remain stable and the configuration you expect to change.",
      ],
      deliverables: [
        "One annotated architecture diagram",
        "A responsibility table and one failure example per layer",
      ],
      review:
        "A sound design places the event and job lifecycle outside the agent loop. The harness executes tools; the model selects requests. Permissions constrain operations. Engine replacement may change supported tools, authentication and context behaviour even when the outer task remains unchanged.",
    },
  },
];
