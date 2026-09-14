import type { Lesson } from "../lesson";
export const unit07CoordinateAgents: Lesson[] = [
  {
    id: "why-multiple",
    title: "Why multiple agents? Find the separable work",
    unit: "07 · Coordinate agents deliberately",
    question:
      "What would a second agent do that the first cannot usefully do next?",
    outcome:
      "Identify independent work, useful specialisation, verification and context isolation before adding agents.",
    intro:
      "Suppose you are renovating one room, and the room needs three walls built, a new window fitted, and the wiring redone. It is tempting to hire three separate contractors and hand each of them one of these jobs, purely because there happen to be three distinct pieces of work. But if the exact dimensions of the room have not actually been settled yet, all three contractors are quietly depending on the same unresolved decision, and putting three people on the job at once does not make that decision get made any faster, it just means three people are now waiting on it, or worse, three people are each guessing at it differently.\n\nThe retry defect in our running example has a similar shape. It touches the client, the transport layer, and the metrics that get reported. Three affected files might suggest three agents, one per file. But every one of those edits may quietly depend on the very same underlying decision: who actually owns an in-flight request, and how is that ownership tracked? Splitting the work by file count, in a case like this, does not create three independent jobs. It creates three jobs that all secretly depend on the same open question, and adds coordination overhead on top, without buying you anything in return.\n\nThe more productive place to begin is by looking for questions that are actually separable from each other, rather than files that happen to be separate. One investigator can spend its time reproducing the client-side race condition in isolation. A second, entirely independently, can check whether the transport layer already provides some idempotency guarantee on its own, without needing to know anything about the client at all. Their two findings can then genuinely inform a single, coherent implementation, without either of them ever needing to make concurrent edits to the same underlying design.",
    sections: [
      [
        "Four reasons a second context can help",
        "There are, broadly, four genuine reasons a second agent can help, and it is worth being able to name which one actually applies before adding a worker, rather than adding one on instinct. Parallelisation can reduce elapsed time, but only when the underlying work is genuinely independent. Specialisation can give a worker a narrower toolset, or a more focused bundle of evidence, suited to one particular kind of question. Independent verification can look for defects without inheriting the original implementer’s assumptions, precisely because it started from a different vantage point. Context isolation can keep one large, sprawling investigation from crowding out and confusing a parent task’s own main thread of work.\n\nNone of these four benefits follows automatically from simply having more agents involved. Two agents can share the exact same wrong assumption, and multiplying the number of agents holding that assumption does nothing to correct it. A label like “specialist” attached to a worker does not, on its own, change what that worker is actually capable of, unless its instructions, its tools, or its context genuinely differ from a generalist’s. Before adding a second worker, it is worth asking plainly: what distinct evidence, or what distinct action, will this particular worker actually contribute that the first one could not?",
      ],
      [
        "Compare the critical path",
        "Suppose two genuinely independent investigations each take about ten minutes on their own. Run them in parallel, and the whole thing can approach ten minutes plus whatever coordination and integration afterward actually costs, rather than the twenty minutes it would take to run them one after another. But if the second investigation actually needs the first one’s result before it can even begin, there is no speedup available at all, no matter how many agents you throw at it, the dependency itself sets the floor. And if both workers end up editing the same shared module, the time spent merging and validating their combined result can easily exceed whatever time the parallel split was supposed to save in the first place.\n\nBefore spawning any workers at all, it is worth writing out the actual dependency graph between the pieces of work, along with what output you expect each piece to produce. A report that comes back with clear file references and stated uncertainty is far easier to combine with another report than a stream of loosely structured chat messages ever is. And when a task is genuinely small, or its internal decisions are tightly coupled to one another, using a single agent is very often simply the correct call, rather than a compromise you settle for.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Three files touched by one bug does not automatically mean three separable jobs. Look for genuinely independent questions before splitting the work.",
        meaning:
          "Parallelisation, specialisation, independent verification and context isolation are the actual reasons a second agent can help — agent count alone is not one of them. A specialist label changes nothing unless its instructions, tools or context genuinely differ.",
        question:
          "Does giving a worker a specialist-sounding role name make its output more trustworthy?",
        answer:
          "No. A role label is not evidence of specialised capability; what matters is whether its actual context, tools and instructions differ in a way that helps.",
        further: [
          {
            question:
              "A team names three workers 'Architect,' 'Reviewer' and 'Tester' but gives all three identical context and tools. Have they actually specialised the work?",
            answer:
              "No. Without any difference in context, tools or instructions, the names are cosmetic; genuine specialisation requires an actual difference in what each worker can see or do.",
          },
          {
            question:
              "Why is context isolation, on its own, sometimes a valid reason to use a second agent even without any difference in role or specialisation?",
            answer:
              "A fresh, narrow context can prevent an investigation from being biased or cluttered by an unrelated earlier conversation, which is a genuine benefit independent of any specialist labelling.",
          },
        ],
      },
      {
        bridge:
          "Before spawning workers, do the arithmetic on what splitting the work would actually cost and save.",
        meaning:
          "Two independent ten-minute investigations can approach ten minutes total plus coordination; a dependent second task cannot be sped up this way, and tasks that edit the same module can cost more in merging than they save in parallel time.",
        question:
          "Two investigations each take ten minutes, but the second needs the first’s conclusion before it can start. Does running them in parallel save time?",
        answer:
          "No. Because the second depends on the first’s result, there is no parallel speedup available; the tasks are effectively sequential regardless of how many agents are used.",
        further: [
          {
            question:
              "Two workers are each assigned independent investigations, but both need to edit the same shared configuration file. What cost does this introduce that a truly independent split would avoid?",
            answer:
              "Merging and validating the two conflicting edits to the shared file, which can consume more time than the parallel investigation saved, even though the investigations themselves were independent.",
          },
          {
            question:
              "Why is writing out the dependency graph before spawning workers more useful than just guessing which tasks look independent?",
            answer:
              "A guess can miss a hidden dependency or shared resource; an explicit graph makes both the true independence and any shared touch points visible before time is committed to a split that won't actually pay off.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A worker is labelled 'Senior Security Reviewer' but given the same tools and context as every other worker. What has actually changed?",
        [
          "Its output is now more trustworthy",
          "Nothing meaningful; the label alone changes no real capability",
          "It gains extra permissions automatically",
        ],
        1,
        "A role name is cosmetic unless paired with an actual difference in context, tools or instructions.",
      ],
      [
        "Which of these is a genuine reason to use a second agent?",
        [
          "It sounds more impressive in a demo",
          "Context isolation, specialisation, verification or genuine parallelisation",
          "Agent count alone improves quality",
        ],
        1,
        "Real benefits come from a structural difference in context, tools or independence, not from agent count.",
      ],
      [
        "Two tasks both edit the same shared module. What does this imply for a parallel split?",
        [
          "It guarantees a speedup",
          "The merge and validation cost can outweigh the time saved by parallel work",
          "It has no effect on total time",
        ],
        1,
        "Shared touch points introduce integration cost that can erase the benefit of splitting work.",
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
    nextConnection:
      "Once a genuinely separable piece of work exists, the next question is how to hand it to a worker with enough context to actually answer it.",
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
      "Send a research assistant off with nothing more than “go find out whether this claim about the transport layer is true,” and do not be surprised if they return an hour later with “yeah, I think it’s probably fine.” That answer cannot actually settle anything, and the fault does not lie with the assistant. Neither the exact question nor the standard of evidence that would count as an answer was ever actually specified, so there was no way for them to know what “fine” was even supposed to mean, or what would have counted as genuinely checking.\n\nThis is precisely what happens when a parent agent asks a worker to “check the transport,” and the worker duly returns “looks fine.” That answer cannot support any real decision, for exactly the same reason the research assistant’s answer could not: neither the actual question nor the evidence standard behind it was ever made clear enough to act on. Delegation of this kind needs a contract running in both directions, what the worker is actually being asked, and what it is expected to bring back, not just a task handed off and forgotten about until something returns.\n\nA sub-agent, in most implementations, is simply a worker created from within another agent’s own task. It is worth being careful here, because it is tempting to assume this worker automatically inherits everything the parent already knows, the full conversation so far, the current working directory, whatever has already been discovered. The exact lifecycle, and exactly what context actually gets inherited, depends entirely on the specific harness you are using, and you should not assume any of it holds unless the implementation you are relying on actually guarantees it.",
    sections: [
      [
        "Send the minimum sufficient brief",
        "Give the worker a genuinely concrete question, whatever context is actually relevant to answering it, any real constraints, which actions it is actually allowed to take, and a clear statement of what its output should look like. For the transport-idempotency question, this might mean pointing directly at where the interface actually lives, including the trace that shows the duplicate sends happening, and drawing out the distinction between a retry attempt and a genuinely independent operation. Ask explicitly for supporting evidence, and for whatever uncertainty remains once the worker is done.\n\nPassing along the parent’s entire message history can transfer far more than intended, including irrelevant tangents and mistaken assumptions the parent itself never got around to correcting. Passing along nothing but a bare title can force the worker to repeat discovery work the parent had already done. Choose what actually goes across that boundary deliberately, rather than defaulting to either extreme. And if the actual goal is independent verification, hand over the requirements and the raw artifacts themselves, rather than the implementer’s own conclusion, framed as something merely to be rubber-stamped.",
      ],
      [
        "Make the parent own integration",
        "A genuinely useful return from a worker includes its conclusion, whatever it is citing as evidence for that conclusion, any limitations it is aware of, and a recommended next action, if one is warranted. If the worker actually edited code along the way, include the base revision it started from, exactly which paths it touched, and whatever verification evidence it can offer. The parent still has to inspect all of this for contradictions, and still has to decide, itself, how the result actually changes the shape of the task, delegation moves the labour, not the responsibility.\n\nCancellation and failure need their own contract too, worked out in advance rather than discovered by accident. What should happen if a worker times out, returns with no usable artifact at all, or surfaces a genuine blocker partway through? A parent that simply waits forever on a silent, unresponsive child has an orchestration defect of its own, quite separate from whatever the worker was actually supposed to be doing. Set a real budget for how long a worker is allowed to take, and preserve whatever partial evidence it managed to gather, even when the worker itself never finishes.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Telling a worker to “check the transport” and receiving “looks fine” back proves nothing, because neither the question nor the evidence standard was ever specified.",
        meaning:
          "A worker needs a concrete question, relevant context, constraints, allowed actions and a required output shape — passing the parent’s entire history or only a bare title are both failures of the same kind, just in opposite directions.",
        question:
          "A parent hands a worker its complete prior conversation, including several abandoned lines of investigation. Is more context always better here?",
        answer:
          "Not necessarily. Irrelevant history and prior mistaken assumptions can transfer along with anything useful; context should be chosen deliberately for the delegated question.",
        further: [
          {
            question:
              "A worker is given only a bare task title, with no constraints, allowed actions or output shape specified. What is the likely failure mode?",
            answer:
              "The worker has to guess at scope and format, so its answer may not match what the parent actually needed, even if the work itself is competent — the failure is one of underspecification, the mirror image of over-sharing context.",
          },
          {
            question:
              "Why might passing along an abandoned, disproven hypothesis from the parent's history actively hurt a worker's investigation rather than just being neutral extra information?",
            answer:
              "The worker may anchor on that hypothesis as a plausible lead and spend effort re-investigating something already ruled out, rather than starting fresh with an unbiased view of the actual question.",
          },
        ],
      },
      {
        bridge:
          "A worker’s answer is not the end of the story — someone still has to decide what it means for the overall task.",
        meaning:
          "A useful return includes the conclusion, cited evidence, limitations and a recommended next action; the parent must still inspect contradictions and integrate the result rather than accepting it automatically. A silent, indefinitely waiting parent has an orchestration defect of its own.",
        question:
          "A worker returns a confident conclusion supported only by a test scenario different from the one the parent actually asked about. Should the parent accept it?",
        answer:
          "No. The parent should notice the mismatch between the claim and its supporting evidence and treat the actual question as still unresolved.",
        further: [
          {
            question:
              "A parent spawns a worker and then waits indefinitely with no timeout or check-in point. What kind of problem is this, and whose is it?",
            answer:
              "An orchestration defect belonging to the parent, not the worker — the parent's design failed to bound how long it would wait or what it would do if the worker never returned.",
          },
          {
            question:
              "Why should a worker's return include stated limitations and a recommended next action, rather than just a bare conclusion?",
            answer:
              "A bare conclusion gives the parent no way to judge how much to trust it or what to do next; limitations and a recommendation let the parent integrate the result responsibly instead of accepting it at face value.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A worker is given a bare task title with no constraints or expected output shape. What is the most likely consequence?",
        [
          "The worker will always guess correctly",
          "The worker may return something that doesn't match what was actually needed",
          "Nothing; titles are always sufficient",
        ],
        1,
        "Underspecified delegation leaves the worker to guess at scope and format.",
      ],
      [
        "What should a useful worker return include beyond the bare conclusion?",
        [
          "Nothing else is needed",
          "Cited evidence, limitations, and a recommended next action",
          "Only a confidence percentage",
        ],
        1,
        "A useful return lets the parent judge and integrate the result, not just receive an answer.",
      ],
      [
        "A parent waits forever for a worker with no timeout configured. Whose design issue is this?",
        [
          "The worker's, for taking too long",
          "The parent's orchestration design",
          "Neither; this is expected behaviour",
        ],
        1,
        "Bounding how long a parent waits is part of the parent's own orchestration responsibility.",
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
    nextConnection:
      "Delegating one question well is a start. Coordinating several workers whose edits might conflict is a harder, related problem.",
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
      "Imagine two translators, each assigned a different half of the same novel, working entirely independently and never speaking to each other. Each of them, read in isolation, produces a perfectly fluent, competent translation of their half. And yet the combined book is subtly broken, because one of them rendered a recurring character’s nickname one way, and the other rendered it a different way, and neither had any way of knowing the other had made a different, incompatible choice. Nothing about either translator’s individual skill was at fault. The shared thing they both depended on, what this character is actually called, simply never got decided between them.\n\nSomething structurally identical happens when one agent changes the return type of the retry function, while a second agent, working at the same time, updates a caller that still expects the old type. Tested entirely on its own, each change passes its local tests without complaint. Combined, the whole thing fails. The underlying problem here is not really about either agent’s individual reasoning; it is that a shared contract changed while the two of them were working, and neither one was coordinating with the other around that change.\n\nBring more than one worker onto an engineering task, and you have, in effect, created a small-scale distributed-systems problem, whether you intended to or not. You now have to think about stale reads, concurrent writes, partial failures partway through, and the exact ordering in which separate pieces of work eventually get integrated together, concerns that a single agent, working entirely alone, never had to face at all.",
    sections: [
      [
        "Choose a source of truth",
        "Messages are genuinely useful for timely signals, “I’ve started on this,” “this is now blocked.” Durable artifacts are useful for handoff and for recovery after something goes wrong. Shared memory can distribute conventions across workers, but only if it carries clear provenance and clear rules about how it gets updated. A task board, or a shared state file, can record who owns what and what its current status is. What matters is deciding, deliberately, which of these is actually authoritative for any given kind of fact, rather than letting all of them compete, informally, to be believed.\n\nFor any interface shared between workers, assign a single clear owner, or agree explicitly on a versioned contract before parallel implementation even begins. A message that simply says “I changed it” is not enough if another worker is still quietly operating from an older checkout that has not caught up yet. Include actual revision identifiers in your communication, and treat any assumption downstream of a changed interface as invalidated the moment that interface actually changes, rather than trusting it to have magically updated itself.",
      ],
      [
        "Use Git as a coordination aid, not a correctness oracle",
        "Separate branches, or separate worktrees, let different workers produce genuinely isolated changes without stepping on each other’s files while they work. Commits give you an inspectable artifact and a clear base revision to reason from afterward. What Git does not do, on its own, is prevent semantic conflict: two patches can merge together with zero textual conflicts while still flatly disagreeing about what the resulting behaviour should actually be. Integrate deliberately, as its own explicit step, and run genuine cross-component checks on the combined tree rather than trusting the merge itself to have validated anything.\n\nAvoid letting several agents write to the very same checkout at once, unless your harness and your ownership policy have explicitly been designed to support that. Prefer separate reports for genuinely independent investigation, and a single clear patch owner for anything tightly coupled. Record, in writing, who is actually allowed to merge, who is expected to review, and what should happen the moment a worker’s starting point becomes stale relative to what has since changed underneath it.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Two agents can each write correct code locally and still break the system together, if neither one knows the shared contract just changed.",
        meaning:
          "Messages, durable artifacts, shared state files and revision identifiers each serve different coordination needs; the important decision is which one is authoritative for a given fact, and stale assumptions must be invalidated when an interface changes.",
        question:
          "One worker announces in a chat message that it changed a shared interface. Does this guarantee that another worker’s stale checkout now reflects that change?",
        answer:
          "No. A message is a signal, not a synchronisation mechanism; the other worker’s actual working state must be checked and updated against the new interface separately.",
        further: [
          {
            question:
              "Two workers both treat a shared state file as authoritative, but only one is allowed to write to it. What problem does designating a single writer solve?",
            answer:
              "It prevents conflicting simultaneous updates to the same fact, giving both workers one unambiguous source of truth instead of two potentially disagreeing copies.",
          },
          {
            question:
              "Why might a durable artifact (like a written interface spec) be a more reliable coordination mechanism than a transient chat message?",
            answer:
              "A durable artifact persists and can be re-checked at any point, while a chat message can be missed, arrive out of order, or be read once and forgotten — the artifact remains the stable reference even after the message is gone.",
          },
        ],
      },
      {
        bridge:
          "Git can isolate whose changes are whose, but it cannot tell you whether those changes actually agree with each other.",
        meaning:
          "A conflict-free merge only proves the text combined without a textual collision; it says nothing about whether the two changes are behaviourally compatible. Deliberate ownership and cross-component verification are still needed on the combined result.",
        question:
          "Two independently written patches merge without any conflicts. Does this establish that the combined system behaves correctly?",
        answer:
          "No. A clean merge only shows the text combined automatically; semantic incompatibilities between the two changes can still exist and need their own tests.",
        further: [
          {
            question:
              "Why is 'no merge conflicts' a weaker guarantee than 'the integration tests pass'?",
            answer:
              "A merge conflict is purely textual — two edits touching the same lines. Two changes can combine cleanly at the text level while still disagreeing behaviourally, which only a running test can reveal.",
          },
          {
            question:
              "Which specific ownership question should be settled before two agents start editing related components in parallel?",
            answer:
              "Which agent's output is authoritative for any given shared fact or interface, so that a conflicting assumption can be resolved by referring to a designated owner rather than by guessing.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A worker announces a change in a chat message. What must still happen before another worker's state can be trusted as current?",
        [
          "Nothing; the message alone updates the state",
          "The other worker's actual working state must be separately checked and updated",
          "The message automatically triggers a rebuild",
        ],
        1,
        "A message is a signal, not a synchronisation mechanism.",
      ],
      [
        "Two patches merge with zero textual conflicts. What has this established?",
        [
          "The combined system is behaviourally correct",
          "Only that the text combined without a collision, nothing about behaviour",
          "That no further testing is needed",
        ],
        1,
        "A clean merge is a textual fact, not a behavioural guarantee.",
      ],
      [
        "What should be designated before two agents edit related, interacting components?",
        [
          "Nothing; ownership sorts itself out",
          "Which agent or artifact is authoritative for each shared fact",
          "Which agent is faster",
        ],
        1,
        "Explicit ownership prevents ambiguity about whose version of a shared fact is correct.",
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
    nextConnection:
      "With coordination mechanisms in place, the next question is which overall shape of collaboration — planner, reviewer, map/reduce — actually fits a given task.",
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
      "Imagine a courtroom where the jury is handed a single instruction before deliberating: “the defendant is guilty; please confirm.” They are shown the prosecutor’s closing summary, but never the actual evidence, never the defence’s argument, never anything that might genuinely contradict the stated conclusion. Whatever they come back with, calling it a “verdict” would be a considerable stretch. It is theatre wearing the costume of judgment, because nothing about the setup actually gave them room to disagree, even if disagreement were the correct outcome.\n\nA reviewer agent given the instruction “the fix is correct, confirm it” is in exactly the same position. It sees the implementer’s own reassuring summary of what was done, but never the original failing requirement the fix was actually supposed to satisfy. Calling this “independent review” does not make it independent, any more than handing a jury a foregone conclusion makes their nod a genuine verdict. What actually determines independence is the context a reviewer is given, and the acceptance contract it is asked to check against, and neither of those things has anything to do with what you happen to label the role.\n\nIt is worth thinking of patterns like planner, investigator, reviewer, and map/reduce as useful descriptions of how information is meant to flow between workers, nothing more mystical than that. Choose one of them because its particular separation genuinely improves some decision you are trying to make, not simply because it happens to appear as a labelled box in an architecture diagram you liked the look of.",
    sections: [
      [
        "Match the pattern to the uncertainty",
        "A planner handing work to an implementer helps when some design artifact can genuinely clarify scope in advance, but only if the implementer is still allowed to come back and say the plan itself was wrong. An investigator handing off to an implementer separates the work of reducing uncertainty from the work of actually writing the fix. An implementer handing off to a reviewer adds a genuine challenge stage, one focused on requirements and on evidence rather than on politeness. Parallel investigation lets you explore several independent hypotheses, or several independent subsystems, at the same time.\n\nMap/reduce work applies one bounded piece of analysis across many independent items, and then combines whatever comes back. The reducer, in this arrangement, has real work to do: it must deduplicate overlapping findings, resolve outright contradictions, and preserve the evidence behind whatever survives, rather than simply averaging everything together as though every input were equally trustworthy. And for a genuinely small task, it is worth saying plainly that any of these extra stages can cost considerably more than they actually contribute.",
      ],
      [
        "Create a real challenge stage",
        "Give a reviewer the actual task requirements, the base revision and the final revision of the code, whatever tests are actually relevant, and real authority to disagree with what it is being shown. Let it inspect the diff directly, and let it reproduce whatever checks matter most, rather than trusting a description of those checks secondhand. Avoid instructing a reviewer, even gently, to defend the implementer’s own diagnosis, doing so quietly converts a check into a formality. Independent context removes one route by which bias can creep in; it does not, by itself, guarantee independent errors, particularly when two agents are drawing on the same underlying model and the same evidence.\n\nThe join at the end of all this needs its own explicit decision rule. Does a single valid counterexample send a patch back for rework? Who actually gets to decide whether some newly requested change falls inside or outside the original scope? A long sequence of approvals, granted without any real, falsifiable standard behind them, can quietly turn into ceremony rather than genuine protection, present, visible, and reassuring, while actually catching nothing at all.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "A named architecture pattern is only useful if its particular separation actually improves a real decision in your task.",
        meaning:
          "Planner/implementer, investigator/implementer, implementer/reviewer and map/reduce each address a different kind of uncertainty; choosing one because it appears in a diagram, rather than because it fits the task’s actual uncertainty, adds cost without benefit.",
        question:
          "Is adding a separate reviewer stage automatically worthwhile for every task, regardless of size?",
        answer:
          "No. For a small or tightly coupled task, the extra stage can cost more in coordination than it contributes; the pattern should be chosen because it addresses a real source of uncertainty.",
        further: [
          {
            question:
              "A team adds a map/reduce pattern to a task that has no genuinely separable sub-problems. What is the likely result?",
            answer:
              "Artificial splitting with an integration cost that a single agent working the whole task would not have incurred, since the pattern doesn't match a real structural feature of the task.",
          },
          {
            question:
              "Why does an investigator/implementer split help specifically with uncertainty about cause, while a planner/implementer split helps with uncertainty about approach?",
            answer:
              "Each pattern targets a different unknown: investigator/implementer separates 'what is actually wrong' from 'how to fix it,' while planner/implementer separates 'what should be done' from 'how to execute it' — matching the pattern to the specific unknown is what makes it useful.",
          },
        ],
      },
      {
        bridge:
          "Calling a stage “independent review” does not make it independent — that depends on what it is actually given and allowed to do.",
        meaning:
          "A genuine challenge stage needs the requirements, the artifact and explicit permission to disagree, not just the implementer’s reassuring summary; the join also needs a clear decision rule for what happens when a valid counterexample appears.",
        question:
          "A reviewer is shown only the implementer’s summary claiming the fix is correct, not the original requirement or a failing test. Is this an independent review?",
        answer:
          "No. Without the actual requirements and evidence, and without permission to disagree, the review cannot meaningfully challenge the implementer’s claim.",
        further: [
          {
            question:
              "A reviewer stage has access to the original requirement and the diff, but its instructions only ask it to 'confirm the fix looks good.' What is missing for genuine independence?",
            answer:
              "Explicit permission and expectation to disagree — instructions framed only around confirmation bias the reviewer toward agreement rather than toward a genuine, adversarial check.",
          },
          {
            question:
              "What must a join step decide when an independent reviewer produces a valid counterexample to the implementer's claim?",
            answer:
              "A clear decision rule for what happens next — whether that means sending the task back to the implementer, escalating to a human, or some other defined path — rather than leaving the disagreement unresolved.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A task has no genuinely separable sub-problems, but a team applies a map/reduce split anyway. What is the likely outcome?",
        [
          "Guaranteed speedup",
          "An artificial split with integration cost the single-agent approach wouldn't have paid",
          "No effect either way",
        ],
        1,
        "A pattern only helps when it matches a real structural feature of the task.",
      ],
      [
        "What distinguishes investigator/implementer from planner/implementer as patterns?",
        [
          "They are interchangeable",
          "Each targets a different kind of uncertainty — cause versus approach",
          "Only the names differ",
        ],
        1,
        "Matching the pattern to the specific unknown is what makes the separation useful.",
      ],
      [
        "A review stage's instructions only ask it to 'confirm the fix looks good.' What is missing?",
        [
          "Nothing; confirmation is sufficient",
          "Explicit permission and expectation to disagree",
          "A faster model",
        ],
        1,
        "Genuine independent review requires the latitude to challenge, not just confirm.",
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
    nextConnection:
      "Even a well-designed multi-agent pattern has to earn its coordination cost. The next lesson asks when it does not.",
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
      "There is an old, slightly tired saying about too many cooks spoiling the broth, and it earns its place here because it is worth watching happen in slow motion, rather than simply repeating as a proverb. A twelve-minute bug fix gets split across four separate workers. Each of them spends roughly five minutes just reconstructing enough context to understand what they are looking at. They then discover they disagree with each other about what the interface between their pieces should actually look like. Untangling that disagreement, and stitching their four separate pieces back into one coherent whole, takes a further fifteen minutes on top of everything else. On paper, the architecture diagram for this looked efficient: four workers, running in parallel, surely faster than one. In practice, the measured workflow took considerably longer than a single competent agent would have taken working alone.\n\nThe mistake being made here is a comparison that looks reasonable but is not: comparing one agent’s total runtime against the longest individual worker’s runtime among the four, as though that worker finishing quickly were the whole story. It never was. The honest comparison has to include the time spent by every worker getting up to speed in the first place, any work that ended up duplicated across them, the messages exchanged while sorting out their disagreement, the actual integration work needed to combine their output, and whatever review and rework followed once problems in that combination were discovered.",
    sections: [
      [
        "Price the whole coordination path",
        "If two workers’ independent tasks take times A and B respectively, an idealised parallel execution takes roughly the larger of the two, max(A, B), but preparation and joining still have to be added on top of that idealised figure, not ignored as though they were free. Shared rate limits, and tools that can only be used by one worker at a time, can make even genuinely independent-looking work quietly compete with itself for the same scarce resources. Token cost, in particular, tends to grow simply because each additional worker needs its own copy of whatever context it requires to function at all.\n\nFor decisions that are tightly coupled to one another, a single agent, maintaining one coherent hypothesis and one working tree throughout, can very often resolve the whole problem more cheaply than several agents handing pieces back and forth ever could. A single, sufficiently capable model, with genuinely adequate context management, may resolve a problem entirely without the repeated handoffs a multi-agent design would have required. This is a testable engineering choice you can actually measure, not a universal law claiming that either one agent or many agents is always the right answer.",
      ],
      [
        "Look for symptoms of a bad split",
        "Duplicate repository discovery, where two workers independently rediscover the same basic facts about the codebase, suggests their assignments were never actually distinct enough to begin with. Conflicting edits suggest missing ownership over some shared piece of the system. Repeated clarification messages, going back and forth, suggest the contract between workers was never actually stable. Fragmented context, where no single worker can explain the end-to-end behaviour of what was built, is its own kind of warning sign. And a steadily growing integration queue can quietly erase any benefit that faster individual workers ever provided.\n\nBefore committing to a multi-agent design, it is worth actually trying a single-agent baseline first, and comparing the two on accepted results, on how much human intervention each needed, and on total elapsed time. Keep additional agents around only where they demonstrably add useful independent evidence, or genuinely reduce the critical path of the work. Removing a worker, and simplifying the whole design back down, is very often the actual architectural improvement, precisely when the result becomes both simpler and more reliable as a consequence.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "A diagram with parallel boxes looks efficient. Whether it actually is depends on costs the diagram usually leaves out.",
        meaning:
          "The real elapsed time for a split task is roughly the parallel maximum plus preparation and integration, not just the longest individual worker’s time; shared rate limits and per-worker context costs can also erode the apparent savings.",
        question:
          "Two workers each take 12 minutes, but 18 minutes of shared setup and integration surround them. What is the realistic total elapsed time, compared to a single 25-minute agent?",
        answer:
          "About 30 minutes (12 + 18), which is worse than the single agent’s 25 minutes — the coordination and integration cost more than the parallel work saved.",
        further: [
          {
            question:
              "A team estimates a multi-agent split's benefit using only the longest individual worker's time, ignoring setup and integration. What error does this make?",
            answer:
              "It omits real costs that surround the parallel work itself, producing an optimistic estimate that can make a genuinely slower approach look faster on paper.",
          },
          {
            question:
              "Two workers share the same rate-limited API. How does this affect the apparent benefit of running them in parallel?",
            answer:
              "A shared rate limit means the two workers effectively compete for the same throughput, eroding some or all of the parallel speedup that separate, unconstrained workers would have provided.",
          },
        ],
      },
      {
        bridge:
          "Certain repeated symptoms are a sign that a split was the wrong call, not that the workers need more instructions.",
        meaning:
          "Duplicate discovery, conflicting edits, repeated clarification messages and a growing integration queue each point at a coordination design problem. Comparing against a single-agent baseline is the most direct way to tell whether the extra agents are actually earning their cost.",
        question:
          "Multiple workers keep independently rediscovering the same repository structure before doing any useful work. What does this suggest?",
        answer:
          "The task assignments were probably not distinct enough — the split did not actually separate the work, so each worker repeats the same discovery.",
        further: [
          {
            question:
              "An integration queue of completed worker outputs keeps growing faster than it can be reviewed and merged. What does this suggest about the split's design?",
            answer:
              "That output production has outpaced the system's actual capacity to integrate it, meaning the parallel work is creating a backlog rather than net progress — a sign the split needs rethinking or the integration step needs its own attention.",
          },
          {
            question:
              "Why is comparing a multi-agent approach against a single-agent baseline on the same task the most direct way to judge whether the split is worthwhile?",
            answer:
              "It directly measures the actual outcome achieved against the actual outcome a simpler approach would have achieved, cutting through assumptions about theoretical parallel speedup and revealing whether coordination costs actually paid off in this case.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A split task's benefit is estimated using only the longest worker's time, ignoring setup and integration. What error does this make?",
        [
          "It correctly estimates total elapsed time",
          "It omits real surrounding costs, producing an overly optimistic estimate",
          "It overestimates the true cost",
        ],
        1,
        "Setup and integration time are real costs that a naive parallel-max estimate leaves out.",
      ],
      [
        "Workers repeatedly rediscover the same repository structure before doing useful work. What is the likely cause?",
        [
          "The workers are unusually thorough",
          "The task split didn't actually separate the work",
          "This is expected and harmless",
        ],
        1,
        "Duplicate discovery signals overlapping, insufficiently distinct assignments.",
      ],
      [
        "What is the most direct way to tell whether a multi-agent split is actually worth its coordination cost?",
        [
          "Assume it must be faster because there are more agents",
          "Compare its actual outcome against a single-agent baseline on the same task",
          "Count the number of tool calls made",
        ],
        1,
        "A direct baseline comparison reveals whether coordination costs were actually earned.",
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
    nextConnection:
      "You can now judge whether coordination pays for itself. The next unit turns to a related discipline: measuring whether any of this delegated work is actually worth its cost.",
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
