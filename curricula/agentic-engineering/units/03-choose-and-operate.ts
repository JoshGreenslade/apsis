import type { Lesson } from "../lesson";
export const unit03ChooseAndOperate: Lesson[] = [
  {
    id: "landscape",
    title: "The landscape: compare operating modes",
    unit: "03 · Choose and operate a coding agent",
    question: "Are you choosing a model, a harness or a way of working?",
    outcome:
      "Compare Copilot, Codex, Claude Code and Gemini CLI by the workflow you need to operate.",
    intro:
      "Sit in on a team meeting where someone has just suggested trying a coding agent, and listen carefully to what actually gets said. One teammate says, “we should use Copilot.” Another says, “no, we should use GPT.” A third chimes in with, “either way, we should just run it in CI.” On the surface this looks like disagreement — three competing recommendations. Listen more closely, though, and you notice these three people may not be disagreeing with each other at all. The first named a product. The second named a model that could, in principle, sit inside several different products. The third answered a completely different question — not which system to use, but how and when it should run — and named neither a product nor a model at all.\n\nThis kind of meeting happens constantly, and it is worth understanding why it goes nowhere: the three people are answering three different questions while believing they are having one conversation. Before any of them can usefully compare anything, somebody needs to stop and write down, in plain language, what the actual task is and what operating mode it calls for. Do you want inline suggestions while you are actively editing a file, watching each one as it appears? Do you want to hand off a bounded change to run in its own isolated checkout, and look at the result later? Or do you want something that wakes up on its own, triggered by some event, investigates on your behalf, and reports back tomorrow? These are three genuinely different shapes of work, and a single coding-agent product can very often be configured to do any of them, which means a simple, one-row table ranking “Copilot versus GPT versus running it in CI” is comparing three things that were never actually alternatives to begin with.",
    sections: [
      [
        "Map products to concrete capabilities",
        "With that confusion cleared out of the way, it becomes possible to actually place a few real products on the map, rather than treating them as interchangeable rivals. GitHub Copilot includes both an interactive assistant that helps while you edit and a cloud-hosted agent that can work on repository tasks unattended, in the background. Codex is a coding-agent product that spans several supported ways of working, both local and delegated; its identity is not the same thing as the name of any particular underlying API model. Claude Code is an agentic coding tool built around repository access and tool use. Gemini CLI gives you a terminal-based agent, along with mechanisms for extending it with further tools. It is worth checking the current official documentation for whichever of these your account actually has access to, and at whatever version you have installed, because these products evolve quickly.\n\nWhat these descriptions establish is a set of categories, not a ranking. To actually compare two of them meaningfully, you need to record the exact surface being used, its version, the underlying model, what tools it has access to, what instructions it was given, which checkout it operated on, and what permissions it held. Skip that recording, and a comparison of “Copilot versus Codex” can quietly turn into a comparison between an inline autocomplete suggestion and a fully autonomous overnight task, with the entire difference in outcome attributed to raw intelligence when it was really a difference in operating mode all along.",
      ],
      [
        "Choose an experiment, not a mascot",
        "Once you have a genuine, apples-to-apples comparison in mind, the way to actually run it is to pick one bounded bug that already has a known regression test attached to it, and run each candidate system against it from the exact same starting revision, with the exact same task description and the same set of allowed tools. Record every intervention you had to make along the way, whatever counted as completion evidence, and the actual diff each system produced. If a candidate simply cannot operate under the permission or runtime constraints your task requires, that is itself a real engineering finding, one worth writing down, even if the code it happened to generate, in isolation, looked impressive.\n\nIt is worth resisting the temptation to declare a permanent winner in a market that is still changing every few months. The durable skill here is not memorising today’s league table; it is knowing what to measure, and keeping model capability and product configuration as two separate facts rather than one blurred impression. When a meaningful new version of a model or a harness ships, it is worth quietly re-running a small version of this same benchmark, rather than trusting last quarter’s conclusion to still hold.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Before ranking products, translate each brand name into the concrete capability it actually names.",
        meaning:
          "Copilot, Codex, Claude Code and Gemini CLI each span categories of behaviour, not a single fixed performance level. Comparing an inline suggestion from one against an unattended overnight run from another compares operating modes, not intelligence.",
        question:
          "A colleague says “Copilot is smarter than Codex.” What is missing before that claim can be evaluated?",
        answer:
          "Which surface, version, model, tool access and permissions were used in each case. Without those details the comparison could be measuring two entirely different operating modes.",
        further: [
          {
            question:
              "A vendor's marketing page compares 'Copilot' directly against 'GPT-4.' What category error does this comparison make?",
            answer:
              "It compares a product family against a model family as though they were the same kind of thing. A product can use multiple models, and a model can appear in multiple products, so the two names are not interchangeable units of comparison.",
          },
          {
            question:
              "Two products are compared and found to behave identically on one task. Does this establish they use the same underlying model?",
            answer:
              "No. Different models under different configurations could still coincidentally produce equivalent results on one specific task; identical behavior there is not proof of identical internals.",
          },
        ],
      },
      {
        bridge:
          "Once you can name the exact configuration, comparing products becomes an experiment you can actually run, not a debate about reputations.",
        meaning:
          "Matching operating conditions — same revision, task text and allowed tools — makes a difference attributable to the systems rather than to how each was asked. A tool that cannot run under a required permission constraint has failed an engineering requirement even if its output looks good.",
        question:
          "A candidate agent produces excellent code but cannot run inside your required sandboxed environment. Is that a disqualifying finding?",
        answer:
          "Yes, potentially. Fit includes operational constraints such as permissions and runtime environment, not just the quality of a sample output.",
        further: [
          {
            question:
              "Why should the base revision be held identical across all candidates in a comparison?",
            answer:
              "If candidates started from different code states, any difference in outcome could be explained by the different starting points rather than the systems themselves — controlling this variable is what makes the comparison meaningful.",
          },
          {
            question:
              "A benchmark run six months ago crowned a clear winner. Is that conclusion still trustworthy today?",
            answer:
              "Not necessarily. Models and harnesses update frequently; a six-month-old result may no longer reflect current versions, so a fresh, meaningful re-run is warranted before trusting the old conclusion.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "Two engineers argue about 'the best AI coding tool.' What question should be asked first?",
        [
          "Which one is more popular",
          "What specific task and operating mode is being discussed",
          "Which one has a nicer logo",
        ],
        1,
        "Without a task and operating mode, product comparisons are not well-defined.",
      ],
      [
        "A product can be used for interactive suggestions or unattended overnight runs. What does this imply about comparing two products?",
        [
          "The comparison is valid regardless of mode",
          "The comparison must specify which mode each product used",
          "Mode never matters",
        ],
        1,
        "The same product can behave very differently in different modes; mode has to be held constant to compare fairly.",
      ],
      [
        "A candidate agent cannot operate under the required sandboxing constraints. Should this be excluded from the evaluation?",
        [
          "Yes, ignore this fact entirely",
          "No, this is itself a valid and important finding",
          "Only if it also produces bad code",
        ],
        1,
        "Operational constraints are part of fitness for purpose, not a side issue to ignore.",
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
    nextConnection:
      "Once you can compare products fairly, the next question is whether the environment you hand them is actually trustworthy enough to act on.",
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
      "Imagine handing someone the keys to an entire building and telling them, “the workshop is yours, go fix the machine.” They can walk through every room, open every door, read every label. But when they finally reach the machine and reach for the power switch, nothing happens, because the building’s electricity was never actually connected. Having access to every room is not the same thing as having a working environment to actually do the job in — and having the keys, on its own, tells you nothing about whether the lights, the tools, or the power will actually work once you get there.\n\nAn agent can end up in exactly this position. It can read every single source file in a repository, nothing stops it, no door is locked, and yet its test command still fails, because some dependency was never installed in the environment it happens to be running in. Faced with this, an agent will sometimes edit the code anyway, and then report, almost as an afterthought, that verification was unavailable. Repository access, in other words, turned out to be necessary but nowhere near sufficient. Being able to see everything is not the same thing as being able to actually do anything with it.\n\nWhat was really missing was not access, but a working environment, and it is worth being precise about what that phrase actually means. An engineering environment is, in effect, an executable contract: which exact revision of the code is checked out, where commands are actually run from, which runtimes and tools genuinely exist and are on the path, what is and is not permitted to be written, and which systems outside the local machine can actually be reached. A reliable agent cannot simply assume this contract holds. It needs real evidence that it does, gathered before it starts making changes, rather than an optimistic assumption carried forward from the fact that the files were, at least, readable.",
    sections: [
      [
        "Make the baseline observable",
        "Before touching any code, it pays to establish two very simple facts: exactly which checkout you are working from, and what the tests actually do when run against it, completely untouched. A working tree that already has uncommitted changes in it might contain someone else’s half-finished edits, mixed in with whatever you are about to do, and there is no way to tell them apart later unless you looked first. An isolated branch or a separate worktree is genuinely useful here, because it helps you tell your own changes apart from everyone else’s. But notice what it does not do: it does not, on its own, sandbox what a shell command is actually capable of doing on the machine it runs on. Git isolation and operating-system isolation are two different kinds of protection, solving two different problems, and having one does not imply you have the other.\n\nIt is worth documenting the install and test commands somewhere reliable, precisely so a failing baseline — tests that were already broken before anyone touched anything — can be told apart from a genuine regression the agent just introduced. A shell is powerful largely because it can freely combine other programs together, and that same power means its actual reach can exceed what a narrow, single-purpose tool like read_file was ever designed to allow. Tools that reach out to the web, or to an MCP server, add genuinely new observations and genuinely new possible side effects to the picture, and they are worth inventorying separately from ordinary local file access, rather than lumping everything together as “the agent’s access.”",
      ],
      [
        "Permissions are enforced outside prose",
        "A prompt can politely ask an agent not to go anywhere near secrets. That request, on its own, is a sentence, and sentences do not enforce anything. What actually enforces a boundary is a sandbox that constrains the filesystem, a network policy that constrains what can be reached, and credentials that are scoped narrowly to only what a given task genuinely needs. Use clear instructions and real, enforced restrictions together, matched to what the task actually calls for, not one in place of the other. A process running locally, with no isolation around it at all, can quietly inherit far more ambient authority than the task in front of it ever required, even when that particular task itself was entirely harmless.\n\nIt is worth not confusing an approval prompt, a moment where a human clicks “yes,” with an actual, complete security boundary. If an approved command is itself allowed to go on and execute arbitrary scripts from within the repository, those scripts inherit whatever authority was granted at the moment of approval, and the approval step has not actually bounded very much at all. Take the time to inspect what an environment genuinely permits, in practice rather than in the documentation, and keep credentials and any external write access well away from an investigation that only ever needed to read some local fixtures in the first place.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Before an agent changes anything, establish what already works and what does not — otherwise you cannot tell its edits from pre-existing problems.",
        meaning:
          "A documented baseline test result, checkout revision and working directory turn “it failed” into a specific, attributable observation. Git isolation such as a worktree or branch separates whose edits are whose; it does not by itself sandbox what a shell command can do.",
        question:
          "A test fails before the agent makes any edit. Should that failure be attributed to the agent’s change?",
        answer:
          "No. Without a recorded baseline, you cannot distinguish a pre-existing failure from a regression the agent introduced.",
        further: [
          {
            question:
              "Why doesn't an isolated Git worktree, by itself, prove a shell command run inside it is safe?",
            answer:
              "Worktree isolation separates which files are being edited; a shell process inside it still has full OS-level access to network, other directories and credentials unless something else restricts it. File isolation and process sandboxing are different mechanisms.",
          },
          {
            question:
              "A test suite passes both before and after an agent's edit. Can you conclude the edit introduced no regressions?",
            answer:
              "Only for the cases the suite actually covers. A passing suite is evidence about tested behavior, not a guarantee about untested code paths where a genuine regression could hide.",
          },
        ],
      },
      {
        bridge:
          "A written instruction not to touch secrets is a request, not a barrier. Something has to actually be able to say no.",
        meaning:
          "A sandbox, filesystem policy, network policy and scoped credentials constrain what execution can do regardless of what the prompt says. An approval prompt is not the same as a security boundary if the approved command can itself run arbitrary scripts.",
        question:
          "An agent is told in its instructions never to access production credentials, but no environment restriction actually prevents it. Is the task safely bounded?",
        answer:
          "No. Instructions can be ignored, misread or overridden by later context; only enforced permissions and sandboxing actually bound what execution can do.",
        further: [
          {
            question:
              "An agent's instructions say 'never touch the production database.' Is this sufficient to prevent it from doing so?",
            answer:
              "No. Instructions are requests the model may misread, ignore under pressure, or have overridden by later context; only an actual credential or network restriction reliably prevents the action.",
          },
          {
            question:
              "A sandboxed agent runs 'npm install,' which triggers arbitrary postinstall scripts from third-party packages. What does this reveal about the sandbox boundary?",
            answer:
              "That an approved, seemingly narrow command can still grant broad effective authority if what it triggers isn't itself constrained. The boundary needs to account for the transitive effects of approved actions, not just the literal command name.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A Git worktree keeps an agent's edits separate from the main branch. What does this NOT guarantee?",
        [
          "That commits are traceable",
          "That shell commands run inside it cannot access the rest of the machine",
          "That a diff can be reviewed",
        ],
        1,
        "Worktree isolation is about file/branch separation, not OS-level sandboxing.",
      ],
      [
        "Before assigning a task, what should be established about the test suite?",
        [
          "Nothing; assume it works",
          "Whether it currently passes on a clean checkout (the baseline)",
          "Only whether it exists",
        ],
        1,
        "A known baseline is needed to distinguish pre-existing failures from newly introduced ones.",
      ],
      [
        "Which best describes the difference between an approval prompt and a security boundary?",
        [
          "They are the same thing",
          "An approval prompt is a human decision point; a boundary is an enforced technical restriction",
          "A boundary is less reliable than a prompt",
        ],
        1,
        "Approval is a moment of human judgement; a boundary constrains what's possible regardless of judgement.",
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
    nextConnection:
      "A trustworthy environment sets the stage. The next question is what happens once a task runs inside it for a long time: how do you keep it useful, not just busy?",
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
      "Picture two search parties, both sent out to find a hiker lost somewhere on a mountainside. The first team walks briskly for ninety minutes, covers an enormous amount of ground, and returns having seen a great deal of the mountain. The second team spends twenty minutes carefully examining a single set of footprints near the trailhead, works out which direction they lead, follows them a short distance, and finds a dropped water bottle that confirms they are on the right track. If you only counted distance covered, the first team clearly did more. If you were actually trying to find the hiker, the second team’s twenty minutes were worth vastly more than the first team’s ninety, because they were reducing genuine uncertainty about where to look next, while the first team was mostly just producing more ground covered.\n\nThe same gap shows up constantly in long-running agent work. One agent runs for ninety minutes and ends up touching twelve different files. Another spends twenty minutes isolating a specific race condition, adds one targeted test, and changes exactly two lines. Judge purely by runtime or by the number of files touched, and the first agent looks far more productive. Judge by actual engineering value, by what got closer to being fixed and how confidently, and the second agent may well have done the more valuable ninety minutes’ worth of work in a fifth of the time.\n\nWhat this comparison is really pointing at is that long-horizon work is a chain of dependent decisions, where each later action only makes sense in light of an earlier discovery, and the real challenge is keeping the goal, the accumulated evidence, and the current state of the task coherent as all of that unfolds over time. Elapsed time in this kind of work is a cost, and a budget you are spending against, but it was never a proxy for progress, no matter how naturally the two get confused with each other.",
    sections: [
      [
        "Track hypotheses with discriminating experiments",
        "For the flaky retry test, there is a small list of genuinely plausible explanations worth writing down explicitly: something to do with clock handling, something to do with shared state between concurrent calls, or a plain off-by-one boundary in the retry count. For each one, it is worth specifying, in advance, exactly what observation would count as support for it, and what would count as evidence against it. Running the failing case under a deterministic, fake clock is a test that specifically weakens the first explanation, regardless of how it turns out. Two calls deliberately sharing a single promise barrier is a test that specifically targets the second. Neither experiment proves anything about the third.\n\nIt is worth keeping a compact, running ledger alongside this: hypothesis, evidence gathered so far, current status, and the next experiment planned. There is no need to demand a full transcript of the agent’s private reasoning to audit this properly, the observable decisions it makes, together with the evidence attached to them, are enough on their own. If a long run keeps reading the same handful of files over and over, without that ledger or the underlying hypothesis ever actually changing, that repetition is itself a signal worth investigating: something about the context, the available tools, or the way the task was framed may be failing, quite apart from anything wrong with the bug itself.",
      ],
      [
        "Recover without erasing what you learned",
        "Not every setback calls for the same response, and it matters to tell them apart. A transient provider outage calls for a bounded retry policy, tried a reasonable number of times before giving up. A genuine environment blocker calls for a fix, if you are authorised to make one, or an honest report if you are not. A hypothesis that the evidence has just disproved calls for a new hypothesis, not a repeat of the old one. Running an identical, deterministic action for the fourth time, expecting a different result, is not resilience, it is simply a failure to notice that nothing about the situation has changed since the third attempt.\n\nIt is worth writing a checkpoint before any expensive transition, precisely so recovery does not mean starting over from nothing. On resuming from one, revalidate the checkout first, and only then continue from whatever the next justified action turns out to be. A run should be allowed to stop as complete only once real acceptance evidence exists for it; it should stop as blocked with the exact missing input named plainly; and it should stop as budget-exhausted with whatever useful handoff can honestly be offered at that point. A truthful partial result, clearly labelled as partial, is worth far more than a manufactured claim of success invented purely to bring an uncomfortable run to a tidy-sounding close.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Long tasks tempt you to measure progress by the clock. A more honest measure is whether uncertainty about the cause is actually shrinking.",
        meaning:
          "A compact ledger of hypothesis, evidence, status and next experiment turns a long run into a chain of testable claims rather than an unstructured search. Each entry should change confidence in something specific.",
        question:
          "An agent has read the same three files five times without changing its stated hypothesis. Is this a sign of thorough investigation?",
        answer:
          "No. Repeated reading without an updated hypothesis or new evidence suggests the context, tools or task definition may be failing, not that the investigation is progressing.",
        further: [
          {
            question:
              "An investigation ledger lists five hypotheses but none have been updated in the last ten actions. What does this suggest?",
            answer:
              "That recent actions may not be producing genuinely new evidence — a stalled ledger despite continued activity is itself a warning sign worth investigating.",
          },
          {
            question:
              "Why is 'files opened' a worse progress metric than 'hypotheses resolved,' even though both are easy to count?",
            answer:
              "Files opened measures activity volume, not information gained. An agent can open many files without learning anything decision-relevant, while hypotheses resolved directly tracks the reduction in uncertainty, which is the actual goal.",
          },
        ],
      },
      {
        bridge:
          "Not every setback needs the same response. The right recovery depends on what actually went wrong.",
        meaning:
          "A transient failure calls for a bounded retry; a disproved hypothesis calls for a new one; an environment blocker calls for a fix or an honest report. Repeating an identical, deterministic failure changes nothing and is not resilience.",
        question:
          "A command fails identically on three consecutive retries with no change in conditions. What should happen next?",
        answer:
          "Diagnose the precondition causing the failure or change the experiment — repeating the same action again cannot produce a different outcome.",
        further: [
          {
            question:
              "A transient network failure and a deterministic code bug both cause a command to fail. Should both be retried the same number of times?",
            answer:
              "No. A bounded retry policy suits the transient failure, which may succeed later, while retrying a deterministic bug wastes budget without any chance of a different outcome. The two failure types call for different responses.",
          },
          {
            question:
              "Why should a checkpoint be written before an 'expensive transition' specifically, rather than only at the very end of a run?",
            answer:
              "An expensive or risky transition, like a large refactor, is exactly where an interruption would cause the most lost work. Checkpointing there protects the investment made so far against a failure at the worst possible moment.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "An agent's ledger shows a hypothesis marked 'ruled out' with a cited experiment. What should the next action do?",
        [
          "Re-test the same ruled-out hypothesis again",
          "Move to a different, still-open hypothesis",
          "Restart the investigation from scratch",
        ],
        1,
        "A properly ruled-out hypothesis should not be revisited without new contradicting evidence.",
      ],
      [
        "What best distinguishes 'blocked' from 'budget exhausted' as a stopping reason?",
        [
          "They mean the same thing",
          "Blocked means an external requirement is missing; exhausted means the allotted resource ran out",
          "Blocked always means success",
        ],
        1,
        "These are different reasons for stopping, each needing a different response from whoever picks up the task next.",
      ],
      [
        "A long-running agent claims success but the diff shows no relevant file was touched. What should you conclude?",
        [
          "The claim is trustworthy since it sounds confident",
          "The claim is unsupported and needs verification against the actual diff",
          "The task must have been already complete",
        ],
        1,
        "Claims should always be checked against the actual observable artifact, not accepted on tone alone.",
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
    nextConnection:
      "Investigating well is only useful if you are also matching the right amount of autonomy to the task. That choice is next.",
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
      "Think about two very different requests you might make of a new employee in their first week. The first is: “implement this parser so it passes every case in this large, well-established conformance suite.” This might be a genuinely hard, fiddly task, requiring real skill and care, but it comes with an enormous gift built into it: a precise, mechanical way to know whether the result is correct. The second request is: “change how we calculate this billing rule so it matches what we actually intend.” This might be, in a narrow technical sense, a much easier task to type up as code, and yet it is hiding something far more dangerous, because nobody in the room currently agrees on what “what we actually intend” even means. The first task is hard to do and easy to check. The second is easy to do and nearly impossible to check, because the standard it is meant to meet was never actually settled.\n\nYou would not hand these two tasks to your new employee in the same way, and the same logic applies directly to a coding agent. The natural instinct is to route tasks by how big or how complicated they look on the surface. That instinct is a poor guide. The genuinely useful question, before choosing how much independence to grant, is a different one entirely: what is actually known about the desired outcome, what can be checked once the work is done, and what would a wrong action, made confidently and left unnoticed, actually cost you?",
    sections: [
      [
        "Start with the acceptance boundary",
        "Before deciding how much autonomy to hand over, write down the outcome you are actually looking for, and how you would recognise it if you saw it. If the people involved genuinely disagree about what that outcome should even be, the right move is to use assistance for exploration first, talking the disagreement through with help, rather than delegating an implementation of something nobody has actually agreed on yet. If the outcome is instead clear, and there is a real way to verify it, a capable agent, given a suitably bounded harness, can very often work independently inside that boundary without much supervision at all.\n\nIt also helps to match the kind of capability you reach for to the kind of uncertainty you are actually facing. A model that reasons more deeply may genuinely help with an unfamiliar, confusing failure it has never seen the shape of before. Better tools, rather than a smarter model, may matter more for a task that is already well understood but simply lacks the access it needs. A fast, comparatively unsophisticated model can be excellent at a narrow, well-defined transformation and poor at an open-ended investigation, and the reverse can be just as true. Judge by the total number of interventions a task actually required, rather than assuming capability from whatever label a model happens to be marketed under.",
      ],
      [
        "Account for supervision and waiting",
        "Beyond the nature of the task itself, it is worth thinking honestly about who is actually waiting on the result, and for how long. Interactive assistance tends to save real time precisely when you are already sitting there editing and can absorb feedback the moment it appears. Delegation earns its keep when the task can genuinely proceed in the background while you go and do something else entirely. Unattended automation needs something further still: stable triggers that fire reliably, an output contract that behaves predictably, and clearly bounded behaviour for when something goes wrong. None of these arrangements removes you from responsibility for a genuinely unresolved product decision, or for the meaningful approval gates that a consequential change still deserves.\n\nCost, in this accounting, has to include model usage and runtime, but also the time spent reviewing, the time spent fixing what needed fixing, and the time spent simply waiting. A slower agent that barely needs any of your attention can, in the end, be the economically better choice. A cheap model whose output demands constant, repeated repair can turn out to be the more expensive one, once all of that repair time is actually counted. Make the choice at the level of the individual task in front of you, and then revisit that choice later, once you have real recorded results to check it against, rather than trusting your first impression indefinitely.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Before choosing how independent an agent should be, define what a correct outcome would even look like.",
        meaning:
          "If the desired behaviour itself is disputed, no amount of autonomy fixes that — the uncertainty is about the requirement, not the implementation. A clear, verifiable outcome is what makes independent execution reasonable.",
        question:
          "Should a disputed billing-policy change be delegated to an autonomous agent to “just implement it”?",
        answer:
          "No, not yet. The disagreement is about what correct behaviour is, which needs human resolution before implementation autonomy is useful.",
        further: [
          {
            question:
              "A task's outcome is clear and verifiable, but the people requesting it still argue about priorities. Does this block delegation?",
            answer:
              "Not necessarily. Priority disagreement is a project-management question, separate from whether the technical outcome itself is well-defined and checkable — the latter is what actually governs delegation readiness.",
          },
          {
            question:
              "Why might a fast, narrow model outperform a slower general-reasoning model on a well-specified transformation task, even though the general model is 'smarter' broadly?",
            answer:
              "A well-specified, narrow task doesn't need broad reasoning ability; it needs fast, accurate execution of a known transformation, which a narrow specialized model can often do more efficiently without any accuracy tradeoff there.",
          },
        ],
      },
      {
        bridge:
          "Even once the goal is clear, the right amount of autonomy also depends on who is waiting, and what a mistake would cost.",
        meaning:
          "Interactive assistance suits work you are already watching; delegation suits work that can proceed while you do something else; unattended automation needs stable triggers and bounded failure behaviour. Cost includes review and rework time, not just model usage.",
        question:
          "A cheaper agent needs twice as much developer repair time as a pricier one. Which is more economical?",
        answer:
          "It depends on total cost — model usage plus review and repair time — not on the sticker price of either option alone.",
        further: [
          {
            question:
              "An unattended workflow needs 'stable triggers.' What goes wrong if the trigger fires inconsistently?",
            answer:
              "The workflow either misses events it should have acted on, or fires spuriously on irrelevant ones — either failure mode undermines trust in the automation regardless of how good the underlying agent logic is.",
          },
          {
            question:
              "A task is delegated successfully nine times in a row. Is it now safe to fully automate without further human review?",
            answer:
              "Nine successes is encouraging but not proof of reliability across the full range of inputs the task might see. Automation decisions should also weigh the cost of a rare failure and whether nine trials really sampled the task's variability.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A disputed billing-policy change is handed to an autonomous agent to 'just implement it.' What is the core problem?",
        [
          "The agent lacks coding skill",
          "The uncertainty is about the requirement itself, not the implementation",
          "The task is too small",
        ],
        1,
        "Autonomy cannot resolve disagreement about what correct behaviour should be.",
      ],
      [
        "Which cost is most often left out when comparing a 'cheap' automated task to manual work?",
        [
          "Model token cost",
          "Developer review and repair time",
          "Server electricity cost",
        ],
        1,
        "Review and repair time is a common hidden cost that changes the real economics of a comparison.",
      ],
      [
        "What must exist before recurring unattended automation is reasonable?",
        [
          "A charismatic model",
          "Stable triggers, bounded failure behaviour and a defined output contract",
          "Zero cost of operation",
        ],
        1,
        "Automation needs lifecycle guarantees beyond just a capable inner loop.",
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
    nextConnection:
      "Choosing the right autonomy is only useful if the task itself is specified well enough to act on. That is where delegation quality is actually won or lost.",
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
];
