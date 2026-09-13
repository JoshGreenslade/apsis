import type { Lesson } from "./course-builder";
export const workflows: Lesson[] = [
  {
    id: "gh-aw",
    title: "gh-aw: turn a repository event into bounded work",
    unit: "05 · Engineer unattended workflows",
    question: "How does a Markdown instruction become a running GitHub job?",
    outcome:
      "Explain a gh-aw source file, compiled workflow, engine, permissions, tools and output path.",
    intro:
      "You already have an investigation brief that works when delegated manually. Now you want the same kind of investigation when a repository event occurs. Copying the prompt into a scheduled job is only the beginning: the job also needs an engine, credentials, tool access, a runtime limit and somewhere to put the result.\n\nGitHub Agentic Workflows provides a structured way to express those pieces. Its Markdown source is an authoring format; GitHub Actions still executes a compiled workflow.",
    sections: [
      [
        "Read the source as two contracts",
        "The YAML frontmatter configures the trigger, engine, permissions, tools and allowed outputs. The Markdown body describes the investigation. This separates executable capabilities from natural-language intent: a sentence asking for an issue is not itself an API permission.\n\nThe documented flow is to install the gh-aw extension, create a source file under .github/workflows, choose and authenticate an engine, run gh aw compile, then commit both the Markdown and generated .lock.yml. Do not hand-edit the lock file as if it were independent source. Recompile when the source changes and review the generated permissions.",
      ],
      [
        "Start with an observable, low-noise result",
        "For the first exercise, use a manual trigger and a repository-maintenance report. The investigator reads evidence; a constrained safe-output mechanism can create a bounded issue. Keep direct investigative access read-only where possible. Safe outputs constrain publication mechanisms, but they do not establish that the report’s claims are true.\n\nA workflow needs a no-action path. If no actionable finding exists, report that outcome without creating an empty issue. Before scheduling, test one positive case, one negative case and one unavailable-evidence case. Those three outcomes reveal more than a single impressive report.",
      ],
    ],
    example: [
      "Prepare an unattended investigation of repeatedly failing CI.",
      [
        "Separate authoring from execution",
        "Write the Markdown source and compile it to an Actions lock file. Inspect the trigger, engine and permissions in both.",
        "The compiler translates intent/configuration into executable workflow machinery.",
        "Assuming a Markdown file alone is an active GitHub Actions job.",
      ],
      [
        "Control the report boundary",
        "Limit output to one evidence-backed finding with a run link and proposed next check. Require no-action when the evidence is insufficient.",
        "A bounded artifact is easier to review than a stream of speculative issues.",
        "Allowing write tools simply because the final workflow needs one report.",
      ],
    ],
    checks: [
      [
        "What does gh aw compile produce?",
        [
          "A trained model",
          "An executable Actions workflow lock file from the source",
          "A guarantee of useful findings",
        ],
        1,
        "Compilation produces workflow machinery; output quality still needs evaluation.",
      ],
      [
        "What gives an action actual authority?",
        [
          "Natural-language enthusiasm",
          "The length of the task description",
          "Configured permissions, credentials and execution controls",
        ],
        2,
        "The prompt does not independently grant API or filesystem access.",
      ],
      [
        "Why include a negative test case?",
        [
          "To verify useful no-action behaviour",
          "To force every run to open an issue",
          "To avoid observing outputs",
        ],
        0,
        "An unattended system must remain quiet when there is no justified action.",
      ],
    ],
    takeaway:
      "gh-aw connects a declarative workflow and natural-language task to an agent engine running in GitHub Actions.",
    source: ["aw", "outputs"],
    flow: [
      "Markdown source + configuration",
      "gh aw compile",
      "Generated Actions lock workflow",
      "Engine investigates with allowed tools",
      "Evidence-backed output or no action",
    ],
  },
  {
    id: "controls",
    title: "Controlling execution: budgets are not success criteria",
    unit: "05 · Engineer unattended workflows",
    question:
      "Which limit stops a runaway tool, and which stops the whole job?",
    outcome:
      "Distinguish model selection, turn budgets, tool timeouts, job timeouts and continuations.",
    intro:
      "The investigator uses only three model turns, yet the job runs for forty minutes because one command hangs. A turn cap did not protect wall-clock time. In another run, every command is quick but the agent cycles through hundreds of low-value requests. A command timeout would not solve that problem.\n\nDifferent limits protect different resources. Name the resource before choosing the knob.",
    sections: [
      [
        "Put each control at its actual layer",
        "A model setting changes inference behaviour. Tool configuration changes available actions. A turn/invocation budget limits loop activity. A per-tool timeout limits a single operation. A job timeout limits total elapsed execution. A continuation may start another agent segment with carried state; it is not automatically a clean new task or proof of progress.\n\nIn the gh-aw documentation checked for this course, max-turns is a top-level control across engines, while the nested engine.max-turns form is deprecated. Engine support is not uniform: continuation and tool-timeout behaviour require checking the selected engine’s current reference. Record the installed compiler and engine versions rather than copying a parameter from another product.",
      ],
      [
        "Budget for recovery and a useful ending",
        "Set a budget that permits the expected investigation plus a small amount of recovery. Preserve time to write a checkpoint and report why the run stopped. If a supervisor kills the entire process abruptly, the last in-memory discovery can be lost. Save durable state before expensive transitions.\n\nA continuation should load the goal, constraints, evidence and remaining budget. Automatically granting another full budget whenever a run fails can make a nominal limit meaningless. Decide whether budgets apply per segment or per logical task, and make that distinction visible in telemetry.",
      ],
    ],
    example: [
      "A workflow has max-turns 20 and a test command that hangs indefinitely.",
      [
        "Add the missing time boundary",
        "Use the selected engine’s supported tool-timeout mechanism and a job-level timeout. Verify their behaviour with a deliberately hanging fixture.",
        "The turn count cannot bound how long one tool invocation waits.",
        "Assuming all engines enforce identically named timeout fields in the same way.",
      ],
      [
        "Separate stop reason from outcome",
        "Return budget exhausted or tool timeout unless the acceptance evidence already exists. Include a checkpoint for any continuation.",
        "A limit is a guard on execution, not a completion detector.",
        "Labelling a killed process successful because it used its allotted time.",
      ],
    ],
    checks: [
      [
        "What does a job timeout bound?",
        [
          "Total job elapsed time",
          "The truth of the final answer",
          "Only output tokens",
        ],
        0,
        "Job-level time limits cover the whole run rather than one model or tool operation.",
      ],
      [
        "Why inspect engine-specific documentation?",
        [
          "Every engine has identical controls",
          "Supported fields and enforcement can differ",
          "Configuration never changes",
        ],
        1,
        "A shared workflow format does not erase differences between runtimes.",
      ],
      [
        "A continuation gets a fresh budget repeatedly. What risk appears?",
        [
          "The task is necessarily solved",
          "Memory is guaranteed correct",
          "The logical task can exceed its intended total budget",
        ],
        2,
        "Segment-level limits do not automatically bound the whole chain of continuations.",
      ],
    ],
    takeaway:
      "Use separate controls for loop activity, tool duration and total runtime; verify each against the selected engine.",
    source: ["engines"],
  },
  {
    id: "customisation",
    title: "Customise the harness only where the contract demands it",
    unit: "05 · Engineer unattended workflows",
    question:
      "Is the missing feature a configuration option or a new system to maintain?",
    outcome:
      "Choose among configuration, a custom driver and a custom harness using a concrete missing capability.",
    intro:
      "Your organisation wants every proposed database migration to be attached to an internal change record before publication. A developer proposes replacing the entire coding agent. That might be necessary, but it is not the first inference to draw.\n\nLocate the requirement. Is it a new tool, an output rule, an engine integration or control over the loop itself? Different gaps justify different amounts of custom machinery.",
    sections: [
      [
        "Use the smallest extension point",
        "Configuration changes an existing system through supported settings. A driver or engine adapter translates a workflow contract into a particular runtime’s interface and back. A custom harness owns the actual loop, context construction and tool-execution policy. Those are different responsibilities even if one repository contains all three.\n\nFor a mandatory change record, a narrow publication tool or downstream workflow gate may suffice. If every file write must participate in a custom transaction protocol, you may need deeper harness control. Check supported extension points and failure semantics before deciding.",
      ],
      [
        "Specify the adapter contract",
        "An engine integration should explain inputs, credentials, tools, cancellation, timeouts, output artifacts and status codes. A process that exits zero without a usable report is not a successful adapter result. The outer workflow needs enough structured information to distinguish complete, blocked, denied and exhausted runs.\n\nCustom code creates maintenance obligations. Provider response formats evolve; subprocesses hang; outputs can be partial. Keep the interface small, test unhappy paths and retain an exit route back to a supported product. Avoid building a harness merely to reproduce behaviour already available through configuration.",
      ],
    ],
    example: [
      "A workflow needs a report in an internal change-management system.",
      [
        "Locate the real gap",
        "The existing agent can investigate and produce the report. Only publication needs a new audited integration.",
        "The missing capability lies at the tool/output boundary.",
        "Replacing context management and the model loop when neither is failing.",
      ],
      [
        "Define a narrow operation",
        "Provide submit_change_draft with a validated report and an idempotency key. Return a record ID or an explicit failure.",
        "A narrow contract supports permission checks and retries without duplicate records.",
        "Exposing an unrestricted administrative shell to achieve one publication operation.",
      ],
    ],
    checks: [
      [
        "What does a custom harness primarily own?",
        [
          "Only the product logo",
          "The loop, context and execution mechanics",
          "Only GitHub scheduling",
        ],
        1,
        "The harness implements the machinery around model inference.",
      ],
      [
        "When is a narrow extension preferable?",
        [
          "When it satisfies the requirement without replacing working layers",
          "Never; custom loops are always better",
          "Only when no testing is needed",
        ],
        0,
        "Minimising new machinery reduces failure and maintenance surfaces.",
      ],
      [
        "What should an engine adapter expose on timeout?",
        [
          "A fabricated success artifact",
          "No distinction from success",
          "An explicit status and any recoverable partial state",
        ],
        2,
        "The orchestrator must be able to reason about the run’s actual outcome.",
      ],
    ],
    takeaway:
      "Extend the layer that owns the missing requirement. Building a whole harness is a maintenance decision, not a rite of passage.",
    source: ["engines", "tools"],
  },
  {
    id: "workflow-patterns",
    title: "Workflow patterns: make the boring path reliable",
    unit: "05 · Engineer unattended workflows",
    question:
      "What keeps a helpful nightly report from becoming nightly noise?",
    outcome:
      "Design useful PR, CI, triage, dependency and maintenance workflows with bounded outputs.",
    intro:
      "A nightly technical-debt agent finds the same TODO every night and creates a new issue. Every report is individually plausible. The workflow as a whole is harmful because it has no memory of its own outputs.\n\nUseful automation needs more than a competent investigator. It needs relevance filters, idempotency, deduplication, stable output contracts and a reason to remain silent.",
    sections: [
      [
        "Choose a pattern by its artifact",
        "PR investigation can produce a claim tied to changed lines and a reproduction. CI investigation should link the failing run, distinguish infrastructure from code and propose the next check. Issue triage can suggest a category with evidence and uncertainty. Dependency updates need compatibility tests and rollback information. Maintenance and technical-debt discovery need a concrete benefit and a check for existing work.\n\nDo not turn every observation into a code edit. Sometimes the valuable result is a precise investigation brief. The artifact should match what the next actor can use, whether that actor is another agent or a human reviewer.",
      ],
      [
        "Design for retries and repeated events",
        "Key work by stable identifiers such as repository, event/run ID and relevant revision. Before publishing, inspect whether equivalent work already exists. Use a bounded output count and keep a no-action result. If a publication call times out, check whether it succeeded before retrying; a timeout does not prove that no side effect occurred.\n\nPromote a workflow gradually: manual positive/negative cases, a limited event scope, then a recurring trigger when quality and noise are understood. Measure actionability and human handling time as well as run success. A technically green job that creates useless reports is not an engineering success.",
      ],
    ],
    example: [
      "A CI investigation receives the same failure event twice.",
      [
        "Assign a stable work key",
        "Use the failing run ID and tested revision to locate an existing investigation artifact before creating another.",
        "Event delivery and retries can duplicate work even when the agent behaves correctly.",
        "Using the current timestamp as the only identifier makes every duplicate look new.",
      ],
      [
        "Publish only a justified next step",
        "If the artifact exists, update or no-op according to policy. If evidence is insufficient, preserve the blocker rather than inventing a diagnosis.",
        "The workflow’s utility depends on reducing work for its recipient.",
        "Treating a new issue as the required proof of activity.",
      ],
    ],
    checks: [
      [
        "What prevents repeated reports for one event?",
        [
          "A more creative prompt",
          "Stable work identity and deduplication",
          "A larger model context alone",
        ],
        1,
        "The orchestrator needs an explicit mechanism for recognising the same work.",
      ],
      [
        "A publication request times out. What should happen before retrying?",
        [
          "Assume nothing happened",
          "Delete all reports",
          "Check for an existing side effect using the work key",
        ],
        2,
        "The request may have succeeded even though the response was lost.",
      ],
      [
        "Which metric detects a noisy workflow?",
        [
          "Actionability and human handling time",
          "Only the number of runs",
          "Only whether the job exited zero",
        ],
        0,
        "Automation succeeds when its outputs help, not merely when it executes.",
      ],
    ],
    takeaway:
      "A good unattended workflow knows when to investigate, when to publish and when to do nothing.",
    source: ["aw", "outputs"],
    practical: {
      title: "Lab 5 · Build and inspect a gh-aw workflow",
      minutes: 45,
      brief:
        "Use the supplied lab kit’s workflow source in a disposable repository. Begin with a manual trigger and an evidence-backed maintenance report. Live execution needs your own engine authentication.",
      steps: [
        "Open /agent-labs/README.md in the browser or public/agent-labs/README.md in the source checkout. Follow the gh-aw setup section.",
        "Inspect every frontmatter field and explain which layer enforces it. Compile the source using the installed gh-aw version.",
        "Review the generated lock workflow, permissions and engine configuration before committing it in the lab repository.",
        "Run positive, no-action and unavailable-evidence cases. Record the output and cost. Add an event or schedule only after the manual cases behave usefully.",
      ],
      deliverables: [
        "Markdown source and compiled lock workflow",
        "A responsibility table",
        "Three run records, or an explicit setup blocker if live execution is unavailable",
      ],
      review:
        "The source and lock file should agree. The investigator should have only the access its task requires, and output should be bounded. A safe-output path limits how publication happens; you still need evidence that the report is correct. Do not claim a live run if you only compiled the workflow.",
    },
  },
  {
    id: "tools",
    title: "Tools: design the action and the observation together",
    unit: "06 · Add external capabilities",
    question: "Why is read_customer safer and easier to use than run_anything?",
    outcome:
      "Design a tool schema, validation boundary and informative result for a specific engineering capability.",
    intro:
      "The model requests a tool with a valid-looking JSON object. The server accepts an invalid repository path and returns a stack trace containing credentials. The schema was syntactically useful, but the tool contract was incomplete.\n\nA tool is an interface between a proposed action and real execution. Design what can be requested, who may request it, how arguments are checked and what the caller can learn from the result.",
    sections: [
      [
        "Schemas describe; executors enforce",
        "A schema names fields and types so the model can form a request. Server-side validation must still check semantic constraints: permitted repository, bounded range, valid state transition and caller authorisation. Structured output helps parse a request; it does not make the requested action correct or authorised.\n\nPrefer domain operations where possible. get_ci_failure(run_id) can return a bounded failure summary with a raw-log reference. A broad shell can achieve more tasks, but its input space and side effects are harder to constrain. Narrow tools are not automatically harmless either: a narrowly named delete_customer operation is still destructive.",
      ],
      [
        "Return observations that support the next decision",
        "A good result includes status, relevant data, provenance and actionable errors. Distinguish not_found, denied, transient_error and succeeded. Avoid returning an empty string for every failure. The agent needs to know whether to change its argument, request missing access or retry later.\n\nBound output size and preserve a way to retrieve details. For writes, support idempotency where retries are possible. Log enough to audit the operation while excluding secrets. Tool descriptions and returned documents can themselves contain untrusted text; execution policy must not be delegated to those strings.",
      ],
    ],
    example: [
      "Design a CI-log tool for the flaky-retry investigation.",
      [
        "Specify a narrow request",
        "Accept repository and run ID, validate access to that repository and cap the requested log range.",
        "The caller needs one run’s evidence, not arbitrary filesystem or organisation access.",
        "Relying on a description that says only use allowed repositories.",
      ],
      [
        "Return a discriminating result",
        "Return the command, exit status, relevant failure excerpt and an artifact pointer, or a typed error.",
        "The next model decision depends on what actually happened.",
        "Returning success with an empty excerpt when access was denied.",
      ],
    ],
    checks: [
      [
        "Does valid JSON establish authorisation?",
        [
          "Yes",
          "Only for frontier models",
          "No; server policy must check the action",
        ],
        2,
        "Syntax validation and access control are separate concerns.",
      ],
      [
        "Which tool result best supports recovery?",
        [
          "A typed denied error with safe explanatory context",
          "An empty string",
          "A secret-filled stack trace",
        ],
        0,
        "A clear error category supports the right next action without unnecessary disclosure.",
      ],
      [
        "What does idempotency help with?",
        [
          "Making all reasoning correct",
          "Avoiding duplicate side effects when a request is retried",
          "Expanding tool permissions",
        ],
        1,
        "A stable request identity can let an executor recognise already-completed work.",
      ],
    ],
    takeaway:
      "A useful tool couples a constrained operation with an observation the agent can interpret correctly.",
    source: ["tools", "mcp"],
    flow: [
      "Model proposes structured arguments",
      "Executor validates and authorises",
      "Operation runs within its boundary",
      "Typed, bounded observation returns",
    ],
  },
  {
    id: "mcp",
    title: "MCP: a connection protocol, not an agent",
    unit: "06 · Add external capabilities",
    question: "What changes when the CI tool is exposed through MCP?",
    outcome:
      "Place an MCP host, client and server in the architecture and identify where permissions remain enforced.",
    intro:
      "You have a working CI-log API. Now three agent products need to use it. Writing a bespoke integration for each product repeats discovery, schema and invocation plumbing. MCP addresses that integration boundary.\n\nIt does not decide which incident is important or whether an investigation is complete. Those remain agent and workflow responsibilities. The protocol connects capabilities; it does not supply the entire system around them.",
    sections: [
      [
        "Follow the client–server relationship",
        "An MCP host is the application managing the interaction. Its MCP client communicates with a server that exposes capabilities such as tools and resources. The host can make discovered tools available to its model; tool requests travel through the client to the server and observations return. The server may wrap an existing company API rather than contain a model itself.\n\nFor the CI example, the server can expose get_ci_failure while retaining the company’s service as the source of truth. MCP supplies a common integration shape; the server still implements the domain operation. Swapping transports or clients does not change what a failure log means.",
      ],
      [
        "Keep identity and trust explicit",
        "Decide whose authority is used when the server calls the company system. A server with organisation-wide credentials can accidentally expose more than the current user should see unless it enforces appropriate checks. Transport/authentication details depend on deployment, so follow the current protocol and host documentation.\n\nA discovered tool description is information about a capability, not a permission grant. Tool results and resources can contain attacker-controlled material. Keep them as data; constrain outbound destinations and write actions independently. Adding MCP does not eliminate prompt injection, access control or audit requirements.",
      ],
    ],
    example: [
      "Expose the CI failure reader to two coding-agent products.",
      [
        "Locate MCP in the stack",
        "Each product acts as a host with a client connection to your CI MCP server. The server validates the caller and delegates the read to the CI service.",
        "The integration becomes reusable while the domain policy stays near the data.",
        "Drawing MCP as the model or the job scheduler.",
      ],
      [
        "Test the permission boundary",
        "Use one permitted run and one forbidden repository. Confirm the latter is denied by the server even if the model requests it confidently.",
        "Security must hold for adversarial or mistaken requests.",
        "Assuming successful tool discovery means access to every repository is allowed.",
      ],
    ],
    checks: [
      [
        "What problem does MCP primarily address here?",
        [
          "Selecting the best hypothesis",
          "Standardising capability integration between hosts and servers",
          "Guaranteeing an agent’s task completion",
        ],
        1,
        "MCP handles the integration boundary; the agent and orchestrator still make task decisions.",
      ],
      [
        "Can an MCP server wrap a conventional API without a model?",
        [
          "Yes",
          "No, every server is an autonomous agent",
          "Only if it trains a model first",
        ],
        0,
        "A server can expose tools and data implemented by ordinary software.",
      ],
      [
        "A tool is discoverable. Does that prove a requested record is authorised?",
        [
          "Always",
          "If its name sounds safe",
          "No, authorisation still needs enforcement",
        ],
        2,
        "Discovery and access to a particular resource are distinct operations.",
      ],
    ],
    takeaway:
      "MCP connects hosts to capabilities. The harness, server and underlying system still own decisions, execution and permissions.",
    source: ["mcp", "security"],
    flow: [
      "Agent product / MCP host",
      "Host’s MCP client",
      "Company MCP server",
      "Authorised CI service operation",
      "Observation returns to the agent",
    ],
  },
  {
    id: "skills",
    title: "Skills and guidance: reuse decisions, not just commands",
    unit: "06 · Add external capabilities",
    question:
      "When should organisational knowledge be an instruction, a tool or a skill?",
    outcome:
      "Package reusable procedures with clear scope while keeping execution capability separate.",
    intro:
      "Every incident investigator asks the same questions: which service owns the failure, what evidence belongs in the report and when should an issue be escalated? Encoding those conventions once can save repeated explanation. But a document describing a database query does not give the agent database access.\n\nSeparate procedural knowledge from executable capability. Instructions guide behaviour; tools perform operations. A skill packages reusable guidance and, depending on the product, supporting scripts or resources for a class of tasks.",
    sections: [
      [
        "Choose the right home for knowledge",
        "Stable repository conventions belong in the guidance mechanism your harness actually loads. A reusable incident procedure can be packaged as a skill with a clear trigger, required evidence and output template. A permission-sensitive operation belongs in a tool whose executor validates it.\n\nAvoid using a skill as a bag of unrelated instructions that loads for every task. Excess material competes with the current goal. State when the procedure applies, which inputs it needs and when its assumptions fail. Check product-specific discovery rules rather than assuming one folder convention works everywhere.",
      ],
      [
        "Version the procedure and its evidence",
        "Organisational knowledge changes. Include an owner or review process, references to the source of policy and examples of correct outputs. Test the procedure on a normal case and an exception. A stale runbook can cause consistent mistakes faster than an improvised prompt.\n\nA skill cannot grant access that the environment denies. Conversely, a script included with a skill can execute with real process authority, so review it as code. Keep reusable guidance descriptive enough to transfer while leaving secrets and run-specific state outside the package.",
      ],
    ],
    example: [
      "Package the flaky-test investigation method for reuse.",
      [
        "Write a scoped procedure",
        "Trigger it for reproducible CI failures. Require run identity, baseline, discriminating experiment and an evidence-backed report; define an unavailable-evidence exit.",
        "Scope prevents the procedure from dominating unrelated tasks.",
        "A global instruction to investigate every warning in every repository.",
      ],
      [
        "Pair it with a capability",
        "Use the CI-log MCP tool for evidence and the skill for deciding what evidence to collect. Test the forbidden-repository case.",
        "The procedure explains how to work; the tool and server enforce what can be accessed.",
        "Embedding broad credentials in the skill so every run can bypass access failures.",
      ],
    ],
    checks: [
      [
        "Which component supplies an executable database capability?",
        [
          "A tool with a configured executor",
          "A sentence saying use the database",
          "A skill title",
        ],
        0,
        "Instructions do not create an API connection or execution authority.",
      ],
      [
        "What makes reusable guidance easier to maintain?",
        [
          "Loading every policy for every task",
          "Clear scope, provenance and a review process",
          "Removing all examples",
        ],
        1,
        "A bounded procedure can be tested and updated when its assumptions change.",
      ],
      [
        "Can a skill override a sandbox denial?",
        [
          "Yes, if it says MUST",
          "Yes, if it includes a diagram",
          "No; the execution boundary remains authoritative",
        ],
        2,
        "Guidance is not a mechanism for granting denied permissions.",
      ],
    ],
    takeaway:
      "Use guidance for conventions, skills for reusable procedures and tools for executable capabilities.",
    source: ["instructions", "mcp"],
    practical: {
      title: "Lab 6 · Add one external capability",
      minutes: 40,
      brief:
        "Design or implement a read-only CI failure tool exposed through an MCP server. Use fixture data first so the integration can be tested without company credentials.",
      steps: [
        "Define the tool’s input schema, successful result and denied/not-found error results.",
        "Draw host, client, server and underlying service. Label the identity at each boundary.",
        "Use a supported MCP SDK or host inspector to discover and call the fixture tool. Follow the current protocol documentation linked in this lesson.",
        "Write a small incident-investigation skill that uses this capability, then test an unauthorised repository request.",
      ],
      deliverables: [
        "Tool schema and fixture results",
        "An integration diagram",
        "A scoped procedure and allowed/denied test evidence",
      ],
      review:
        "A valid integration shows discovery and an actual tool call, not merely a JSON schema in a document. The server must reject an out-of-scope request. If you only design the interface, label the artifact a design and record the remaining integration step.",
    },
  },
];
