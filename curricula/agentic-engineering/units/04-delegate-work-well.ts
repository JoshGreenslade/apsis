import type { Lesson } from "../lesson";
export const unit04DelegateWorkWell: Lesson[] = [
  {
    id: "specification",
    title: "Task specification: define the result and its boundaries",
    unit: "04 · Delegate engineering work well",
    question: "Why does “fix retries” produce so many plausible wrong patches?",
    outcome:
      "Turn an ordinary issue into a goal, constraints, context, acceptance criteria and verification plan.",
    intro:
      "Tell a contractor to “fix the kitchen” and you should not be surprised if they come back having done something you didn’t want. Maybe they replaced the leaking tap, maybe they retiled the floor, maybe they knocked out a wall to open up the space, maybe they did all three. Every single one of these is a perfectly competent, professional response to the words you actually said. The problem was never the contractor’s competence. The problem is that “fix the kitchen” does not specify which of several entirely different projects you actually wanted done.\n\n“Fix retries” has exactly the same shape of problem. It could mean: stop the same request from being sent twice. It could mean: make the delay between attempts shorter. It could mean: allow more attempts before giving up. It could mean: remove retries from this code path altogether, because they were never the right idea in the first place. A capable agent can implement any one of these cleanly and confidently, precisely because each is a perfectly coherent thing to build. What is missing from the instruction is not competence on the agent’s side; it is a decision, on your side, about which of these several different behaviours you actually want.\n\nA task specification is best thought of as a contract for a result, in the same way a good conversation with a contractor produces a contract for a renovation. It needs to say enough about the actual problem and its constraints that someone, a person or an agent, can make the many small decisions a real task always requires, without you having to specify every single one of them in advance. And it needs to do this without accidentally locking that person into a diagnosis you have not actually verified yet, the way telling the contractor “it’s definitely the pipes” can send them down entirely the wrong path if it turns out to be the wiring.",
    sections: [
      [
        "Separate requirements from hypotheses",
        "State plainly what was actually observed going wrong, and what behaviour you expect to see once it is fixed. Add whatever scope constraints genuinely matter, point to relevant files or evidence you already have, and write down acceptance criteria in terms someone could actually check. For the retry example, this might read something like: concurrent calls sharing the same idempotency key must end up sharing a single in-flight attempt; calls using independent keys must remain free to proceed independently of each other; and existing cancellation behaviour must not regress as a side effect.\n\nIf you already have a suspicion about the underlying cause, say, a hunch that a particular lock is misbehaving, label it plainly as a hypothesis, not as a requirement. Insisting on a particular mutex before anyone has actually investigated can force the wrong architecture onto a problem that might have a much simpler fix. On the other hand, a vague instruction like “use your judgment” cannot substitute for an actual hard constraint, such as “the public API must not change.” Tell a capable model what genuinely matters, where the relevant evidence lives, and how success will be checked, and then let it make the many small, routine implementation choices that were never actually in dispute.",
      ],
      [
        "Make verification part of the task",
        "Name the specific regression case you expect to be fixed, the exact commands that should be run to check it, and what should be reported if the environment makes verification impossible in the moment. Ask explicitly for any material limitations to be stated plainly, rather than glossed over. It is also worth keeping “producing a change” and “publishing that change” as clearly distinct permissions: an agent producing a patch has not thereby been given permission to merge it, or deploy it, and the task description should make that boundary obvious.\n\nResist the urge to pad a brief with generic advice. Repeating “be careful” or “think it through” rarely adds anything a capable model did not already know to do. A single concrete invariant, or a known repository convention stated plainly, is almost always worth more than several sentences of vague encouragement. A genuinely good brief can afford to be short, precisely because every sentence in it is removing a real ambiguity rather than restating a general principle. A useful test, once you have written one, is to read it back as if you were an independent engineer encountering the task cold: could you actually act on this without having to guess at the intended behaviour?",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "“Fix retries” sounds like one instruction, but it hides several different possible intended behaviours. Before delegating, decide which one you actually mean.",
        meaning:
          "A task brief should state the desired behaviour and its constraints, and clearly label any suspected cause as a hypothesis rather than a requirement. Locking in an untested diagnosis can force the wrong implementation before the evidence is in.",
        question:
          "Should a brief mandate a specific mutex implementation before the agent has investigated the actual concurrency bug?",
        answer:
          "Not if the mutex is only a guess. Requiring an unverified implementation detail can prevent the agent from discovering and using the actually correct fix.",
        further: [
          {
            question:
              "A brief says 'preserve the public API' with no further explanation. Why might this short sentence be worth more than several paragraphs of general advice?",
            answer:
              "It is a concrete, checkable constraint that directly rules out an entire class of otherwise-tempting implementation choices. General advice like 'be careful' does not rule out any specific action.",
          },
          {
            question:
              "A brief lists acceptance criteria but states no hypothesis about the cause. Is this brief incomplete?",
            answer:
              "Not necessarily. A brief can be complete without naming a cause at all, as long as it specifies the desired behavior and how to check it; omitting an unverified guess is often safer than including a wrong one.",
          },
        ],
      },
      {
        bridge:
          "A brief is only as good as the way its result can be checked. Verification deserves the same care as the requirement itself.",
        meaning:
          "Naming the regression case, test commands and what to report when verification is impossible turns “looks done” into something auditable. Producing a patch is not the same permission as merging or deploying it.",
        question:
          "An agent reports “the fix works” but no regression test accompanies the diff. Is that report sufficient to accept the change?",
        answer:
          "No. Without the named verification evidence, the claim of correctness is unsupported regardless of how confident it sounds.",
        further: [
          {
            question:
              "A brief says 'add tests' without naming which behavior they should cover. What ambiguity does this leave open?",
            answer:
              "The agent might add tests for whatever it happened to implement, rather than tests that specifically target the originally reported defect — leaving the actual regression unguarded.",
          },
          {
            question:
              "Why does distinguishing 'producing a change' from 'publishing a change' matter even for a fully trusted, highly capable agent?",
            answer:
              "Publication often carries consequences beyond code correctness — release timing, coordination with other changes, communication — that remain organisational decisions the agent's capability does not automatically extend to.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A task brief says 'fix the bug, use your judgment.' What is most likely missing?",
        [
          "A definition of the desired behavior and how to check it",
          "Enough encouragement",
          "A deadline",
        ],
        0,
        "Judgment cannot substitute for a checkable definition of correct behavior.",
      ],
      [
        "Why label a suspected cause as a hypothesis rather than a requirement in a brief?",
        [
          "To make the brief longer",
          "To avoid forcing the wrong architecture on an unverified diagnosis",
          "Hypotheses are required by convention",
        ],
        1,
        "An unverified cause presented as fact can force an incorrect implementation path.",
      ],
      [
        "Which of these is a genuine acceptance criterion?",
        [
          "Write clean code",
          "Two concurrent calls with the same key share one active attempt",
          "Think about edge cases",
        ],
        1,
        "An acceptance criterion must describe checkable, observable behavior.",
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
    nextConnection:
      "A clear brief still depends on the repository being able to give honest feedback about whether it was satisfied. That is the next lesson’s subject.",
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
      "Imagine a smoke detector that sometimes goes off when there is no fire, and sometimes stays silent when there is one. No amount of skill in interpreting its alarm will fix the underlying problem, because the alarm itself is not a trustworthy signal. You could hire the most experienced firefighter in the city to stand next to it and interpret every beep with great wisdom, and it would not help, because the flaw is in the detector, not in whoever is listening to it.\n\nThe retry regression test in our running example has become exactly this kind of unreliable alarm. It takes twelve minutes to run, depends on a live external service being available, and fails at random even when nothing at all is wrong with the code, let alone once someone has actually attempted a fix. Every single agent run that depends on this test is now working from an alarm that cannot be trusted, and no amount of clever prompting can repair that. You cannot write your way out of a broken measuring instrument; you can only go and fix the instrument.\n\nThis points at something worth naming directly: agent-friendly engineering, in the vast majority of cases, is not some new and exotic discipline invented for the age of coding agents. It is ordinary good engineering, the kind good teams have always tried to practise, made explicit and taken seriously: reproducible setup that works the same way every time, tests narrow enough to actually mean something when they fail, a codebase structured so it can be navigated, and documentation that accurately describes how things actually work today. The genuinely encouraging part is that every one of these improvements helps human engineers exactly as much as it helps an agent, you are not building a special accommodation for machines, you are fixing things that were quietly broken all along.",
    sections: [
      [
        "Make feedback discriminate",
        "A good test should fail when the original defect is present, and pass once the intended behaviour genuinely exists, both halves of that statement matter equally. A deterministic barrier, one that pauses execution at a precise, controlled point and releases it on command, can expose a race condition far more reliably than sleeping for some arbitrary number of milliseconds and hoping the scheduler happens to cooperate that particular run. Before trusting a new test at all, run it against the known-buggy baseline first, to confirm it actually fails there. Only then run it against the patch, and confirm it passes.\n\nA fully passing suite is evidence that the cases it covers behave correctly. It is not proof that every requirement has been satisfied, and treating it as such is a quiet, easy mistake to make. Add boundary cases that map directly onto the actual behavioural contract you care about: different keys behaving independently, cancellation behaving correctly, retries continuing to work sensibly after an earlier failure. A test suite that was written purely to mirror whatever the implementation happens to already assume can end up certifying the wrong behaviour as correct, simply because it was never designed to catch the case where the implementation itself was mistaken.",
      ],
      [
        "Make the repository legible",
        "Keep setup and test commands physically close to the code they apply to, rather than buried in a wiki page nobody remembers to update. Document conventions that are genuinely stable, mark clearly which files are generated and should not be hand-edited, and state public API constraints explicitly rather than leaving them as tribal knowledge. Product-specific repository guidance files can genuinely help here, but the rules for how and when they get loaded differ from product to product, so it is worth actually verifying how your particular installed harness discovers instructions, rather than assuming a filename that worked in one product is a universal standard everywhere.\n\nBound tasks around a single, coherent, describable result. “Add idempotent retry coordination” has a natural edge you can draw around it and check against; “clean up networking” has no edge at all, and quietly invites unrelated changes to wander in under its banner. When the work genuinely is exploratory, and you cannot yet draw that edge, say so explicitly: specify the investigation artifact you actually want first, and defer any decision about implementation until the uncertainty driving the exploration has actually been reduced.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "A slow, flaky test gives every future agent — and every future engineer — the same unreliable signal. Fixing that is not a side project; it is part of making delegation possible at all.",
        meaning:
          "A regression test earns trust only if it fails on the original defect and passes once the intended behaviour exists. A test that merely encodes the current implementation’s assumptions can certify a wrong fix as correct.",
        question:
          "A new test passes immediately, even against the unfixed implementation. What does this suggest?",
        answer:
          "The test may not actually be exercising the defect — it should be checked against the known-buggy baseline before being trusted as a regression guard.",
        further: [
          {
            question:
              "A new regression test is written and passes immediately, even against the known-buggy code. What does this suggest, restated more specifically?",
            answer:
              "The test may not actually be exercising the defect at all; it should be run against the unfixed baseline first to confirm it can fail before it is trusted.",
          },
          {
            question:
              "Why might a deterministic concurrency barrier be better engineering than running a flaky test many times hoping it eventually reveals the bug?",
            answer:
              "Repeated runs rely on chance timing and provide no reliable guarantee of exposing the race, while a deterministic barrier forces the exact scheduling condition every time, making the test both faster and actually trustworthy.",
          },
        ],
      },
      {
        bridge:
          "Even a perfectly reliable test only helps if the surrounding repository makes its purpose and scope discoverable.",
        meaning:
          "Stable setup commands and conventions kept near the code they describe, plus a bounded and coherent task scope, reduce ambiguity for both agents and engineers. An open-ended cleanup task invites unrelated edits where a concrete outcome would not.",
        question:
          "An issue reads “clean up networking” with no further detail. What would most improve an agent’s chances of a useful result?",
        answer:
          "Replacing the vague request with a bounded, concrete outcome or a scoped investigation brief — an open-ended goal invites unfocused, hard-to-review changes.",
        further: [
          {
            question:
              "Two different products load repository guidance files differently. What follows for a team writing shared conventions?",
            answer:
              "They should verify how their specific installed harness actually discovers instructions, rather than assuming a filename convention that worked in one product transfers automatically to another.",
          },
          {
            question:
              "Why might 'clean up networking' be a worse task description than 'add idempotent retry coordination,' even if both matter equally to the codebase's health?",
            answer:
              "The first has no natural boundary, inviting unrelated edits and making review difficult, while the second names a concrete, checkable outcome that scopes the work and gives review a clear standard.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A regression test passes on both the buggy and the fixed implementation. What does this tell you?",
        [
          "The test is trustworthy",
          "The test likely does not discriminate the defect it claims to guard",
          "The bug is already fixed",
        ],
        1,
        "A test that can't tell buggy from fixed code provides no real assurance.",
      ],
      [
        "Where should setup and test commands for a module ideally live?",
        [
          "In a separate wiki nobody maintains",
          "Close to the code they apply to",
          "Only in the original pull request description",
        ],
        1,
        "Commands kept near the relevant code stay discoverable and accurate.",
      ],
      [
        "What is the risk of an open-ended task like 'clean up networking'?",
        [
          "It's too specific",
          "It invites unrelated edits with no clear acceptance boundary",
          "It runs too quickly",
        ],
        1,
        "Vague scope makes both delegation and review harder.",
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
    nextConnection:
      "Good tests and legible repositories reduce failures. The next lesson is about diagnosing the failures that still get through.",
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
      "Suppose a mechanic hands you back your car, tells you it’s fixed, and the very same fault is still there the next morning. The unhelpful response is to tell the mechanic to “try harder.” It doesn’t tell them anything actionable, and it does nothing to address whatever actually went wrong the first time. What you actually want to know is much more specific: did they test the wrong part of the car? Did they misunderstand which noise you were even describing? Did they forget a constraint you mentioned, like needing the car back by Friday? Did some tool they needed turn out to be broken, so they quietly worked around it instead of stopping to report it?\n\nAn agent that declares success while the bug quietly remains deserves exactly this same kind of specific attention, and “try harder” is exactly as useless here as it is with the mechanic. It changes neither the actual gap in verification nor the evidence available to fix it. Before doing anything else, work out precisely how the run actually failed. Did it test the wrong package? Did it misunderstand what was actually being asked of it? Did it lose track of a constraint it was given earlier in the task? Did it hit a tool error and simply carry on regardless, rather than stopping to say so?\n\nA taxonomy of these failure types earns its keep only if it actually changes what you do next, it is not there to give you a satisfying label to pin on a disappointing run. The real goal is to locate the specific feedback loop or control mechanism that broke down, in exactly the same way you would want to know which part of the mechanic’s process actually failed, rather than simply concluding, unhelpfully, that the mechanic “wasn’t good enough.”",
    sections: [
      [
        "Read the trace as an engineering incident",
        "Giving up outright may simply follow from an environment blocker that was never resolved, or a budget that ran out before real progress was made. Wandering aimlessly may point to a goal that was too vague from the start, or the absence of any real stopping rule. A wrong hypothesis needs a genuinely discriminating experiment to correct it, not just another guess. Context degradation, where earlier discoveries quietly get lost, calls for a better state record and a better retrieval habit. Over-editing, where far more changes get made than necessary, usually points at missing scope constraints, or a plan that was allowed to grow far broader than the task actually required.\n\nFalse success deserves particular suspicion, because it is the most dangerous of these by a wide margin: the final message confidently claims completion, with no acceptance evidence anywhere behind it. Check the exact commands that were run, their actual exit codes, which revision of the code they were run against, and whether the tests that matter were even part of what ran at all. It is also worth remembering that a tool failing is not automatically the same thing as the model failing, note carefully whether a given request was malformed to begin with, denied by policy, simply timed out, or executed successfully but against entirely the wrong environment.",
      ],
      [
        "Change the smallest responsible mechanism",
        "If a command ran from the wrong working directory, the fix is to the environment, not to the model. If a test genuinely does not cover concurrent calls, the fix is to verification, not to the prompt. If the agent forgot a constraint after its context was compacted, the fix is to preserve that constraint properly in durable task state going forward. Switching to a different, more capable model can genuinely help when the failure really was a capability failure, but it is a poor, expensive, blunt default response to reach for whenever anything at all goes wrong.\n\nKeep the original failed trace around for comparison, rather than discarding it the moment things start working. After making whatever change you believe addresses the failure, re-run a controlled version of the same task and ask, specifically, whether that particular failure signature actually disappeared. A single new successful run does not, on its own, establish that the underlying mechanism is now reliable; fold the original failing case into your ongoing benchmark, so you keep checking it rather than simply hoping the fix held.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "“Try harder” is not a diagnosis. Before reprompting, work out which specific mechanism actually broke.",
        meaning:
          "Giving up, wandering, wrong hypotheses, context loss, over-editing and false success are distinguishable signatures, each pointing at a different layer. False success — a confident completion claim without acceptance evidence — is especially dangerous because it looks identical to real success in the transcript.",
        question:
          "A run’s final message claims “all tests pass,” but only a documentation linter actually executed. What should this be classified as?",
        answer:
          "Unsupported or unverified completion for the required behaviour — the linter’s success says nothing about the actual regression the task required.",
        further: [
          {
            question:
              "An agent's final report claims success, citing a passing linter, but the task required a behavioral fix. What failure category is this?",
            answer:
              "False success, or unsupported completion — the cited evidence does not match the actual required acceptance criterion.",
          },
          {
            question:
              "Why is 'false success' considered more dangerous than an agent that openly gives up?",
            answer:
              "An agent that gives up is visibly incomplete and prompts further attention. False success looks identical to genuine success in the transcript, so it can slip through review undetected until the underlying bug resurfaces later.",
          },
        ],
      },
      {
        bridge:
          "Diagnosis is only useful if it changes what you do next. Fix the layer that actually failed, not the first thing that comes to mind.",
        meaning:
          "An environment blocker needs an environment fix; a missing test case needs a verification fix; a forgotten constraint after compaction needs durable task state. Switching models can help a genuine capability gap, but it is a poor default response to every failure.",
        question:
          "An agent forgets a stated constraint after its context was compacted. Is switching to a more capable model the appropriate fix?",
        answer:
          "Not necessarily. The likely fix is preserving that constraint in durable task state through compaction, since the failure is about carried context, not raw capability.",
        further: [
          {
            question:
              "An agent's investigation is technically correct, but its final report omits which exact commands were run. What specific fix does this call for?",
            answer:
              "A fix to the completion/reporting contract — require exact commands, exit codes and tested revision to be stated — not necessarily a fix to the underlying investigation itself.",
          },
          {
            question:
              "Why should the original failed trace be kept even after an intervention appears to have fixed the problem?",
            answer:
              "A single new successful run does not establish that a fix is reliable. Keeping the original failure case as part of an ongoing benchmark lets you check the same failure signature does not quietly reappear later.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "An agent stops and reports 'blocked: missing test fixture credentials.' Is this a failure of the agent?",
        [
          "Yes, it should have proceeded anyway",
          "No, this is an honest, useful stopping report",
          "Yes, it wasted its turn budget",
        ],
        1,
        "An accurate blocked report is a legitimate and useful outcome, not a failure.",
      ],
      [
        "A tool call returns a malformed-request error. Is this necessarily a model capability failure?",
        [
          "Yes, always",
          "No, it could be a harness or schema issue unrelated to model reasoning",
          "Yes, if it happens twice",
        ],
        1,
        "Tool failures have multiple possible causes; capability is only one of them.",
      ],
      [
        "What should be preserved after diagnosing and fixing a failure mode?",
        [
          "Nothing; delete the failing trace",
          "The original failing case, to check the fix holds over time",
          "Only the fix, discard all context",
        ],
        1,
        "Retaining the original failure case supports an ongoing regression benchmark.",
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
    nextConnection:
      "You can now specify, engineer for feedback and diagnose failures for a single delegated task. The next unit asks how to run that same discipline unattended, on a schedule.",
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
