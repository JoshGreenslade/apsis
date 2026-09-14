import type { Lesson } from "../lesson";
export const unit05EngineerUnattendedWorkflows: Lesson[] = [
  {
    id: "gh-aw",
    title: "gh-aw: turn a repository event into bounded work",
    unit: "05 · Engineer unattended workflows",
    question: "How does a Markdown instruction become a running GitHub job?",
    outcome:
      "Explain a gh-aw source file, compiled workflow, engine, permissions, tools and output path.",
    intro:
      "You already have a recipe that works beautifully when you cook it yourself, in your own kitchen, standing right there watching the pan. Now you want the same dish to appear on a table automatically, every night at seven, without you personally being in the kitchen at all. Simply writing the recipe out and pinning it to a corkboard somewhere does not make that happen. Something still needs an actual kitchen, a cook who is actually present and actually capable, the right ingredients already delivered, a working oven, and a waiter who knows where the finished plate is supposed to go.\n\nThe same gap shows up the moment you try to move a working investigation brief from something you delegate manually to something that runs automatically whenever a repository event occurs. You already have a brief that works well when you hand it to an agent yourself and watch what happens. Copying that same prompt into a scheduled job is only the very beginning of the work, because that job also needs an actual engine to run it, credentials it is allowed to use, access to whatever tools the investigation depends on, a limit on how long it is allowed to run, and somewhere sensible to actually put whatever it finds.\n\nGitHub Agentic Workflows exists to give you a structured, checkable way of expressing all of those missing pieces together, rather than leaving them scattered and implicit. Its Markdown source format is how you, the author, write the recipe down. GitHub Actions is still the actual kitchen that does the cooking: a separate, compiled workflow, generated from that Markdown, is what genuinely runs.",
    sections: [
      [
        "Read the source as two contracts",
        "It helps to read a gh-aw source file as two quite different documents stitched together, each doing a different job. The YAML frontmatter at the top is where the trigger, the engine, the permissions, the tools and the allowed outputs all get configured, this is the part that actually grants capability. The Markdown body underneath it is where the investigation itself gets described in plain language. Keeping these visibly separate matters, because a sentence in the Markdown body asking for an issue to be created is not, on its own, an API permission; only the frontmatter can actually grant that.\n\nThe documented way to work with this is to install the gh-aw extension, create a source file somewhere under .github/workflows, choose and authenticate whichever engine you want to run the work, run gh aw compile to generate the actual executable workflow, and then commit both the Markdown source and the generated .lock.yml file together. Do not treat that generated lock file as though it were independent source you can hand-edit freely; recompile from the Markdown whenever it changes, and review whatever permissions the compiler actually produced, rather than assuming they match your intentions.",
      ],
      [
        "Start with an observable, low-noise result",
        "For a first attempt, keep things deliberately small: use a manual trigger rather than an automatic one, and aim for a repository-maintenance report rather than anything more ambitious. Let the investigator read whatever evidence it needs, and use a constrained, safe-output mechanism to actually create a bounded issue, if one is warranted. Keep the investigation itself read-only wherever you possibly can. A safe-output mechanism constrains how publication is allowed to happen; it does not, on its own, establish that whatever the report claims is actually true.\n\nWhatever you build needs a genuine no-action path built in from the start. If nothing actionable turns up, the workflow should say so plainly, rather than manufacturing an empty issue simply to prove it ran. Before trusting this with a real, recurring schedule, test three distinct cases: one where there genuinely is something to find, one where there genuinely is not, and one where the evidence needed is simply unavailable. Those three outcomes, taken together, reveal far more about whether a workflow is trustworthy than a single impressive-looking report ever will.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "A Markdown file describing an investigation is not yet a running job. Something has to turn that description into an executable workflow with real permissions.",
        meaning:
          "The YAML frontmatter configures triggers, engine, permissions and tools; the Markdown body only describes intent. A sentence asking for an issue to be created is not itself an API permission — the frontmatter is what actually grants that.",
        question:
          "Does compiling a gh-aw source file guarantee that its resulting report will be accurate?",
        answer:
          "No. Compilation produces the executable workflow machinery; the quality and truthfulness of what it investigates and reports still needs separate evaluation.",
        further: [
          {
            question:
              "A gh-aw source file asks, in prose, for write access to create issues, but the frontmatter does not grant that permission. What happens?",
            answer:
              "The workflow lacks that capability regardless of what the prose says. Only the frontmatter's declared permissions actually grant API access; the prose describes intent, not authority.",
          },
          {
            question:
              "Why does the workflow require committing both the Markdown source and the generated lock file, rather than just one?",
            answer:
              "The Markdown is the human-editable source of intent and configuration; the lock file is the actual artifact GitHub Actions executes. Keeping both, and recompiling on change, ensures what runs matches what was authored.",
          },
        ],
      },
      {
        bridge:
          "Before scheduling anything, prove the workflow behaves sensibly in the cases where nothing should happen.",
        meaning:
          "A workflow needs an explicit no-action path as much as it needs a positive one. Testing one positive case, one negative case and one unavailable-evidence case reveals more about reliability than a single impressive demo run.",
        question:
          "Why deliberately test a case where the workflow should find nothing actionable?",
        answer:
          "Because an unattended system that always finds something to report will generate noise; verifying it can stay quiet is as important as verifying it can act.",
        further: [
          {
            question:
              "A workflow is tested only with a case where it definitely should find something. What blind spot does this leave?",
            answer:
              "Whether it can correctly recognize and report 'nothing to find.' Untested negative cases can hide a tendency to manufacture false positives once deployed on real, more ambiguous data.",
          },
          {
            question:
              "Why might granting only read-only access during a workflow's early testing, even if writes will eventually be needed, be sound?",
            answer:
              "It limits the blast radius of any bug or unexpected behavior found during testing, letting you validate the investigation logic before trusting the system with the ability to make changes.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A gh-aw source file's Markdown body asks the model to 'merge the pull request.' Does this grant merge authority?",
        [
          "Yes, prose requests are binding",
          "No, only the frontmatter's declared permissions grant real authority",
          "Only if the model is confident",
        ],
        1,
        "Natural-language requests in the body do not themselves grant API capabilities.",
      ],
      [
        "Why recompile a gh-aw workflow after editing its Markdown source?",
        [
          "It's optional; the lock file updates itself",
          "The lock file must be regenerated to reflect the new source",
          "Recompiling is only needed for the first version",
        ],
        1,
        "The lock file is a generated artifact; changes to source must be recompiled to take effect.",
      ],
      [
        "What is a legitimate first test case for a new investigative workflow?",
        [
          "Only ever the positive, exciting case",
          "A case where no actionable finding exists",
          "Skipping testing and going straight to a recurring schedule",
        ],
        1,
        "Negative cases reveal whether a workflow can correctly stay quiet.",
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
    nextConnection:
      "Compiling a workflow is only the start. The next lesson asks which specific limit protects which specific resource once it is actually running.",
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
      "A factory floor typically has several different kinds of limit running at once, and it is worth noticing that none of them do the same job as any other. There might be a cap on how many parts one machine is allowed to produce in a shift, there might be an alarm that goes off if any single operation on that machine runs on for too long without finishing, and there is, separately again, a closing time for the whole building, after which everyone has to leave regardless of what is mid-task. Mix these up, and you get exactly the kind of failure that should worry you: a machine that has made very few parts today, well within its quota, can still be the reason the whole shift runs late, because one single operation on it got stuck and nobody had a timer watching for that specific thing.\n\nSomething very similar happens with an automated investigator. One run uses only three model turns, comfortably within any reasonable turn budget, and yet the job still takes forty minutes to finish, because one single command hung and nobody was watching the clock on that particular operation. A limit on the number of turns did nothing at all to protect the wall-clock time the whole job actually took. In a different run, every individual command returns quickly, and yet the agent still cycles through hundreds of low-value requests before finishing, burning far more than it should have. A timeout on any one command would not have caught that problem either, because no single command was ever slow.\n\nThe lesson underneath both of these stories is the same: different limits protect different resources, and confusing them is how a system ends up with a false sense of safety. Before reaching for any particular knob, it is worth naming, out loud if necessary, exactly which resource you are actually trying to protect.",
    sections: [
      [
        "Put each control at its actual layer",
        "A model setting changes how inference itself behaves. Tool configuration changes what actions are actually available to select. A turn or invocation budget limits how much looping activity the agent is allowed to do. A per-tool timeout limits how long any single operation is allowed to run before it is cut off. A job timeout limits the total elapsed time of the whole run, end to end. And a continuation, where a fresh agent segment picks up with some carried-forward state, is not automatically a clean new task, nor is it automatically evidence that real progress is being made, it is simply another segment, subject to whatever limits actually apply to it.\n\nIn the gh-aw documentation checked while writing this course, max-turns sits as a top-level control that applies across different engines, while an older nested engine.max-turns form has been marked deprecated. Support for these controls is not uniform across every engine, either; continuation behaviour and tool-timeout behaviour genuinely need checking against whichever specific engine’s current reference documentation you are actually using. Record the exact compiler and engine versions you have installed, rather than copying a parameter you saw work somewhere else, in a different product, at a different time.",
      ],
      [
        "Budget for recovery and a useful ending",
        "Set a budget generous enough to cover the investigation you actually expect, plus a small margin left over for graceful recovery. Reserve enough of that margin to actually write a checkpoint and report why the run stopped, if it has to stop before finishing. If some outer supervisor kills the whole process abruptly, without warning, whatever discovery was only sitting in memory at that moment can be lost entirely; save anything durable before any expensive transition, precisely so that loss cannot happen.\n\nA continuation should load the original goal, the original constraints, whatever evidence has accumulated so far, and however much budget genuinely remains. Automatically handing out a full, fresh budget every single time a run happens to fail can quietly make a stated overall limit meaningless in practice, since nothing then actually bounds the total resources a stubborn, repeatedly failing task can consume. Decide explicitly whether your budgets apply per individual segment or per whole logical task, and make that distinction visible somewhere in your telemetry, rather than leaving it as an unstated assumption someone has to reconstruct later.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Two different runs can fail in opposite ways — one exceeds its turn count without taking long, the other takes forever without exceeding its turn count. That tells you the two limits protect different things.",
        meaning:
          "A turn/invocation budget limits loop activity; a per-tool timeout limits one operation; a job timeout limits total wall-clock time. Naming which resource a limit protects prevents reaching for the wrong knob.",
        question:
          "A workflow has a strict turn cap, but one tool call hangs indefinitely. Will the turn cap stop the job?",
        answer:
          "No. The turn cap limits how many decisions the loop makes, not how long any single tool call is allowed to run — a separate timeout is needed for that resource.",
        further: [
          {
            question:
              "A workflow's turn budget is generous, but a single tool call hangs forever with no timeout configured. What actually stops the job?",
            answer:
              "Potentially nothing on its own. Without a separate per-tool or job-level timeout, a hanging call can consume the entire job's wall-clock allowance, regardless of how generous the turn budget is.",
          },
          {
            question:
              "Why might copying a working timeout configuration from one gh-aw engine to another silently fail to protect a workflow?",
            answer:
              "Engine support for specific controls is not uniform; a field enforced in one engine may be ignored, deprecated, or named differently in another, so the configuration needs to be verified against the current documentation for the engine actually in use.",
          },
        ],
      },
      {
        bridge:
          "A budget should leave room to fail gracefully, not just to fail.",
        meaning:
          "Reserving time to write a checkpoint and report why a run stopped preserves the discoveries made so far. Automatically granting a full fresh budget on every continuation can make a stated limit effectively meaningless for the overall task.",
        question:
          "A continuation is granted a brand-new full turn budget every time the previous segment fails. What risk does this create?",
        answer:
          "The logical task as a whole can consume far more resources than its nominal budget suggests, since per-segment limits do not bound the total chain of continuations.",
        further: [
          {
            question:
              "A job is killed abruptly by an external supervisor mid-run. What determines whether recent discoveries survive?",
            answer:
              "Whether a checkpoint was written to durable storage before the kill. Anything only held in the process's memory at that moment is lost when the process is terminated.",
          },
          {
            question:
              "If every failed continuation is automatically granted a brand-new full turn budget, what emergent problem can arise across many continuations?",
            answer:
              "The logical task's total resource consumption becomes effectively unbounded, since no single segment ever exceeds its stated per-segment limit even though the chain of segments together can run far longer than any nominal budget suggests.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "What resource does a per-tool timeout specifically protect?",
        [
          "Total job wall-clock time",
          "How long a single operation is allowed to run before being cut off",
          "The number of decisions the model makes",
        ],
        1,
        "A per-tool timeout is scoped to one operation, distinct from job-level or turn-based limits.",
      ],
      [
        "A workflow's max-turns setting is respected by one engine but ignored by another. What does this imply?",
        [
          "All engines behave identically",
          "Control support must be verified per engine, not assumed uniform",
          "The setting is deprecated everywhere",
        ],
        1,
        "Engine-specific behavior means configuration must be checked against the actual engine in use.",
      ],
      [
        "Why preserve some budget specifically for writing a checkpoint before a run might have to stop?",
        [
          "To make the run take longer",
          "So an interruption doesn't lose the discoveries made so far",
          "It's a cosmetic best practice with no real effect",
        ],
        1,
        "Reserved recovery budget protects accumulated progress against an abrupt stop.",
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
    nextConnection:
      "Controls keep execution bounded. The next question is when it is actually worth building something beyond what the stock harness already offers.",
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
      "Suppose you realise your kitchen is missing a single electrical outlet in an inconvenient but fairly ordinary spot. One response, admittedly dramatic, would be to propose demolishing the house and building a new one with outlets in all the right places from the start. It might, in some far-fetched sense, solve the problem. It would also be wildly disproportionate to what was actually missing, which was one outlet, in one place, that an electrician could add in an afternoon.\n\nSomething like this happens regularly with coding agents. Your organisation decides that every proposed database migration needs to be attached to an internal change-management record before it can be published. A developer, faced with this new requirement, proposes replacing the entire coding agent with something custom-built from scratch. That might, in some cases, genuinely turn out to be necessary. But it is not the first conclusion to reach, and reaching for it immediately skips over a question that deserves to be asked first.\n\nThat question is simply: where, precisely, does the actual gap sit? Is it a missing tool? A missing rule about how output gets published? A missing integration with a particular engine? Or does it genuinely require control over the loop itself, the core decide-act-observe cycle we spent the first unit of this course taking apart? Different answers to this question justify very different amounts of custom machinery, and conflating them, the way the demolish-the-house response conflates a missing outlet with a fundamentally broken building, is how a one-afternoon fix turns into a months-long rebuild that was never actually warranted.",
    sections: [
      [
        "Use the smallest extension point",
        "Configuration changes an existing system through settings it already supports, and it is always worth checking this option first, because it is the cheapest one by a wide margin. A driver or engine adapter translates a workflow’s contract into whatever interface some particular runtime actually expects, and back again, without touching the core loop itself. A custom harness, at the far end, owns the actual loop, the construction of context, and the policy for executing tools. These are genuinely different responsibilities, even on the days when one single repository happens to contain all three of them tangled together.\n\nFor the mandatory change record described above, a narrow publication tool, or a downstream workflow gate sitting after the agent’s own work is done, may well be entirely sufficient. If, instead, every single file write in the whole system needs to participate in some custom transaction protocol, you may genuinely need deeper control over the harness itself. Check what your chosen product’s supported extension points can actually do, and how they behave when something fails, before deciding which of these levels you actually need to reach for.",
      ],
      [
        "Specify the adapter contract",
        "An engine integration, if you do end up building one, should spell out its inputs, its credentials, the tools it exposes, how cancellation works, what its timeouts are, what artifacts it produces, and what status codes it returns. A process that simply exits with a zero status code, without producing anything a human or a downstream system can actually use as a report, is not a successful integration, whatever its exit code claims. The outer workflow needs enough structured information from this contract to reliably tell apart a run that completed, one that was blocked, one that was denied, and one that simply ran out of budget.\n\nWriting custom code of this kind creates ongoing obligations that are easy to underestimate at the start. Providers change their response formats without much warning. Subprocesses hang for reasons that have nothing to do with your logic. Outputs can arrive genuinely partial, half-written, or malformed. Keep whatever interface you build here as small as you can manage, actually test its unhappy paths rather than only its happy one, and keep an honest route back to a fully supported product available, rather than committing irreversibly to custom machinery you built to reproduce behaviour that ordinary configuration could already have given you for free.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "A missing capability does not automatically mean you need a new harness. Locate exactly which layer is actually missing something first.",
        meaning:
          "Configuration, a driver/adapter and a custom harness are progressively larger commitments with progressively larger maintenance costs. A narrow publication requirement is not evidence that the model loop or context management needs replacing.",
        question:
          "A workflow needs its report attached to an internal audit system the stock product cannot reach. Does this justify replacing the entire agent harness?",
        answer:
          "Not necessarily. The missing capability is likely at the tool/output boundary; a narrow publication tool may be sufficient without touching the working loop or context management.",
        further: [
          {
            question:
              "A team needs every commit message to follow a specific format. Should this require a custom harness?",
            answer:
              "Unlikely. This is very probably achievable via existing configuration — a commit-message template, a lint or format check, or an instruction plus a verification step — well short of owning the core loop.",
          },
          {
            question:
              "What distinguishes a driver/engine adapter from a full custom harness, in terms of what each actually owns?",
            answer:
              "An adapter translates between an existing workflow contract and a particular runtime's interface, without touching the core decision loop or context construction; a full custom harness owns that loop and context construction itself — the adapter is a much narrower, lower-risk layer.",
          },
        ],
      },
      {
        bridge:
          "If a narrow extension really is the right call, its contract needs to be precise enough that the rest of the system can trust its outcome.",
        meaning:
          "An adapter should expose inputs, credentials, tools, cancellation, timeouts and clear status codes so the orchestrator can distinguish complete, blocked, denied and exhausted outcomes. A process that exits zero without a usable report is not a working integration.",
        question:
          "A custom publication tool exits successfully but leaves no way to tell whether the record was actually created. Is this a sufficient integration?",
        answer:
          "No. The orchestrator needs an explicit, checkable outcome — a silent success with no confirming artifact cannot be distinguished from a silent failure.",
        further: [
          {
            question:
              "An engine adapter returns identical output whether a task succeeded, was denied, or timed out. What capability does the orchestrator lose?",
            answer:
              "The ability to route the outcome correctly — retry a timeout, escalate a denial, or accept a success — since all three look the same from the outside.",
          },
          {
            question:
              "Why is testing an adapter's unhappy paths as important as testing its happy path?",
            answer:
              "Production traffic will eventually hit every one of those conditions, and an adapter that only works when everything goes right will produce confusing, hard-to-diagnose failures exactly when the orchestrator most needs a clear signal.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A team wants a mandatory audit record attached to every database migration. What is the first thing to check?",
        [
          "Whether existing configuration or a narrow tool can satisfy this",
          "Whether to replace the whole coding agent",
          "Whether to disable database migrations entirely",
        ],
        0,
        "Start with the smallest extension point that could satisfy a concrete requirement.",
      ],
      [
        "What is the defining responsibility of a full custom harness, as opposed to a driver/adapter?",
        [
          "Only formatting output nicely",
          "Owning the core loop, context construction and tool-execution policy",
          "Choosing a font for logs",
        ],
        1,
        "A custom harness owns the fundamental mechanics; an adapter only translates at the edges.",
      ],
      [
        "An adapter exits with status zero but produces no usable report. What should the orchestrator conclude?",
        [
          "The task definitely succeeded",
          "The result is not trustworthy without an actual reviewable artifact",
          "The exit code alone is sufficient evidence",
        ],
        1,
        "A zero exit code without a usable artifact does not establish success.",
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
    nextConnection:
      "With the right extension point chosen, the next question is how to design whole categories of recurring workflows so they stay useful rather than noisy.",
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
      "Imagine a well-meaning assistant who, every single morning, notices the same unwashed coffee cup sitting on your desk, and dutifully writes you a fresh note about it: “there is a coffee cup on your desk.” Each individual note, taken entirely on its own, is accurate. There genuinely is a cup on the desk. And yet a pile of three hundred identical notes, accumulated over a year, is not three hundred useful pieces of information; it is one useful piece of information, repeated relentlessly by someone who never thought to check whether they had already mentioned it yesterday, and the day before, and every day before that.\n\nA nightly technical-debt agent can fall into exactly this trap. It finds the same lingering TODO comment every single night, and dutifully creates a brand-new issue about it every single time. Judge each individual report in isolation, and every single one of them is perfectly plausible, accurate, and well-formed. Judge the workflow as a whole, though, and it is actively harmful, because it has no memory whatsoever of its own previous outputs, and so it can never tell the difference between “here is something new” and “here is the same thing I already told you about yesterday.”\n\nWhat this points at is that useful automation needs considerably more than a competent investigator underneath it. It needs relevance filters that can tell a genuinely new finding apart from a stale one, idempotency so the same underlying event does not get treated as several different pieces of work, deduplication against whatever has already been reported, a stable and predictable output contract, and, perhaps most importantly of all, a genuine willingness to stay quiet when staying quiet is actually the correct thing to do.",
    sections: [
      [
        "Choose a pattern by its artifact",
        "Different recurring situations call for genuinely different shapes of output, and it is worth choosing deliberately rather than defaulting to the same one every time. A pull-request investigation can produce a specific claim, tied directly to the changed lines, along with a way to reproduce it. A CI investigation should link back to the actual failing run, distinguish clearly between an infrastructure problem and a genuine code problem, and propose whatever the next useful check would be. Issue triage can suggest a likely category, along with its supporting evidence and however much uncertainty remains. Dependency updates need compatibility tests run against them, and a clear way to roll back if something goes wrong. Maintenance and technical-debt discovery need a concrete, stated benefit, and a check for whether the same finding already exists somewhere.\n\nNot every observation needs to become a code change, and it is worth resisting the pull to make one anyway. Sometimes the genuinely valuable output is a precise, well-evidenced investigation brief, and nothing more, at least for now. The right artifact is whichever one the next actor, whether that is a human reviewer or another agent picking up the thread later, can actually put to use.",
      ],
      [
        "Design for retries and repeated events",
        "Key each piece of work by stable identifiers, things like the repository, the specific event or run ID, and the relevant revision of the code, rather than anything that changes every time the workflow happens to run. Before publishing anything new, check whether equivalent work already exists somewhere. Cap the total number of outputs a run is allowed to produce, and keep a genuine no-action result available as a first-class outcome, not an afterthought. If a call to publish something times out, check whether it actually succeeded before assuming it failed and retrying, a timeout tells you the response was lost, not that nothing happened as a result of the request.\n\nPromote a workflow gradually, rather than flipping it straight to fully automatic. Start with manual positive and negative test cases, move to a limited scope of events once those look right, and only then introduce a recurring trigger, once you actually understand the quality and the noise level of what it produces. Measure actionability and the amount of human handling time a report demands, not merely whether the job technically ran to completion. A technically green job that reliably produces useless reports every single time is not, by any honest reckoning, an engineering success.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Different recurring tasks need different kinds of output. Choosing the pattern means choosing what artifact the next actor can actually use.",
        meaning:
          "A PR investigation, a CI failure report and a dependency update each call for a different shape of result — sometimes a precise investigation brief is more useful than an attempted code edit. The right artifact matches what the recipient, human or agent, can act on.",
        question: "Should every technical-debt finding automatically become a code change?",
        answer:
          "No. Sometimes the most valuable output is a precise investigation brief that a human or later agent can act on deliberately, rather than an immediate, possibly premature edit.",
        further: [
          {
            question:
              "A CI-investigation workflow always proposes a code fix, even when the actual root cause is an infrastructure outage. What does this reveal about its design?",
            answer:
              "It lacks a category for 'infrastructure problem, not a code problem,' forcing every finding into the same code-fix-shaped output regardless of whether that's the appropriate response.",
          },
          {
            question:
              "Why might issuing a precise investigation brief, rather than an attempted code change, sometimes be the more valuable output for an ambiguous finding?",
            answer:
              "An investigation brief lets a human or a later, better-informed agent decide how to act, while a premature code change risks locking in a guess about intent that turns out to be wrong, creating rework instead of saving it.",
          },
        ],
      },
      {
        bridge:
          "A workflow that runs repeatedly will eventually see the same event twice. Design for that from the start, not after the duplicate reports pile up.",
        meaning:
          "Keying work by stable identifiers and checking for existing artifacts before publishing prevents the same finding from being reported over and over. A timeout on a publish call does not prove nothing happened — it may have succeeded before the response was lost.",
        question:
          "A publication request times out. Should you immediately retry it without checking anything first?",
        answer:
          "No. Check whether the side effect already occurred using the stable work key before retrying, since a timeout does not prove the original request failed.",
        further: [
          {
            question:
              "A workflow is keyed by timestamp rather than by event/run ID. What problem does this create on retry?",
            answer:
              "Every retry gets a new timestamp, so the workflow can never recognize a retried event as the same underlying work, and ends up treating every retry as brand new — defeating deduplication entirely.",
          },
          {
            question:
              "Why is 'the publish call timed out' not sufficient evidence that the publish failed?",
            answer:
              "A timeout only tells you the response was lost in transit, not that the request never reached or was never processed by the server — the side effect may have already happened, so blindly retrying could create a duplicate.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A maintenance workflow finds the same TODO comment every night and files a new issue each time. What is missing?",
        [
          "A more creative prompt",
          "Deduplication against previously reported findings",
          "A longer report format",
        ],
        1,
        "Without deduplication, a stable finding gets re-reported indefinitely.",
      ],
      [
        "Which artifact best fits an ambiguous, not-yet-understood issue?",
        [
          "An immediate code change",
          "A precise investigation brief with evidence and uncertainty",
          "No output at all",
        ],
        1,
        "Investigation briefs are appropriate when the right action is not yet clear.",
      ],
      [
        "What should happen before retrying a timed-out publish request?",
        [
          "Retry immediately without checking anything",
          "Check whether the side effect already occurred using a stable work key",
          "Assume the request definitely failed",
        ],
        1,
        "A timeout does not prove nothing happened; check before retrying to avoid duplicates.",
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
    nextConnection:
      "Reliable, deduplicated workflows still only reach as far as the tools connected to them. The next unit is about designing those external capabilities themselves.",
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
];
