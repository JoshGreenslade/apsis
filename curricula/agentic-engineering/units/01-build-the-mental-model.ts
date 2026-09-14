import type { Lesson } from "../lesson";
export const unit01BuildTheMentalModel: Lesson[] = [
  {
    id: "models",
    title: "Models: prediction is not execution",
    unit: "01 · Build the mental model",
    question: "Why can a model explain a bug but fail to fix it?",
    outcome:
      "Separate a model’s inference from the product that gives it context, tools and a place to act.",
    intro:
      "Imagine you are stuck with a broken-down car, and you call a friend who happens to know a great deal about engines. Over the phone, you describe the noise it is making, and your friend correctly diagnoses the problem: a belt has worn down and is slipping, three bolts back from the front of the engine. This is genuinely useful. Your friend has done real, skilled work — turning a vague complaint (“it’s making a weird noise”) into a precise, checkable claim (“it’s this belt, right here”). But your car is still broken. Nothing has changed under the hood. If you want the belt actually replaced, someone still has to open the car, remove the old belt and put a new one on, and that is a different kind of activity from the diagnosis, even though the diagnosis was a necessary step toward it.\n\nNow replace the friend with a coding assistant, and the car with a piece of software. You paste a failing test into a chat window, and the assistant’s answer is exactly right: it tells you that a loop runs one iteration too many, that this is a classic off-by-one error, and that changing a particular comparison on a particular line would fix it. This is exactly as useful as the phone call about the belt. And then, just as with the belt, you ask the assistant to go ahead and actually make the change — and nothing happens. The file on disk is untouched. The test still fails. The line reads exactly as it did before.\n\nIt is tempting, at this point, to feel a little cheated: surely if it knew the answer, it should have simply gone and fixed it? But notice that we did not feel this way about the friend on the phone. We understood, without having to think about it, that correctly figuring out what is wrong and physically fixing it are two different jobs, done by two different processes, even when the very same person could in principle do both. Somewhere along the way — perhaps because the “friend” became a chat window instead of a person on the other end of a phone line — we quietly lost track of that distinction. It is worth getting it back, because a great many confusing moments in this course, every time an agent “should have known better,” trace back to blurring these two different jobs together.\n\nSo here is the idea, stated as plainly as we can manage. A model does not act on the world. A model takes in some representation of a situation and produces an output, and that output — no matter how confident, detailed or technically correct it is — is still just more representation: a sentence, a suggested edit, a description of what ought to happen. It is not the same kind of thing as the change actually happening. Whether that output ever becomes a real change to a real file depends entirely on some other piece of software, one we have not even discussed yet, that has to read the model’s output and decide, on its own, whether and how to act on it.\n\nThis distinction — between producing an output and taking an action — is the single most useful thing to carry with you through this course, and we will return to it constantly. For now, hold onto its shape: there is the part of the system that works out what should happen, and there is the part that makes it happen, and, exactly as with the friend and the mechanic, these do not have to be the same thing at all, even when it feels like they should be.",
    sections: [
      [
        "What happens during inference",
        "Let’s make this more precise, because “a model produces an output from a representation” is still fairly abstract, and it will help to have a slightly more mechanical picture in your head.\n\nThere are two very different things going on here, happening at very different times, and conflating them is a common source of confusion. The first is training: an offline, extremely expensive process, carried out once — or occasionally again, when a new version is released — in which a model’s internal parameters (think of them as an enormous number of adjustable dials) are tuned against a huge body of data, until the model becomes good at a certain kind of prediction: given some text, what is a plausible way to continue it? Crucially, this is not something that happens while you are using the model. By the time you are typing into a chat window, training is long finished and those dials are frozen in place.\n\nThe second thing — the one that happens every single time you actually use the model — is called inference. During inference, those frozen dials are combined with whatever you currently put in front of the model, usually called its context: the conversation so far, any files it has been shown, any instructions it was given. Together these produce an output. For the kind of language model this course is mostly about, that output is typically built one small piece at a time, called a token — roughly a word or word-fragment — with each new token chosen based on everything that came before it. It is a strange thing to sit with: an impressively sophisticated piece of reasoning, capable of explaining a subtle bug buried deep in a large codebase, is, mechanically, built up one small predicted fragment after another. But however it is built, notice what this process still does not include, no matter how good the model becomes at it: at no point does the model reach out and touch your actual working tree of files. If your prompt happens to mention a file path, that path is, to the model, simply a string of characters — text, exactly as much as the rest of your prompt is text. It becomes a real file, sitting on a real disk, only once some other program reads that string, goes looking on the filesystem for something with that name, and does something with what it finds there.\n\nThis becomes even more important once you start using a model that is allowed to “think” before it answers: one that spends some extra computation quietly working through a chain of reasoning before committing to a final response. That extra thinking time is genuinely useful — given the same starting evidence, a model that reasons more carefully and for longer will often reach a better conclusion than one that answers immediately. But, and this is worth sitting with for a moment, it is still reasoning about the evidence it was actually given. No amount of additional thinking can conjure evidence that was never supplied in the first place. If you hand a model a bug report with the one crucial log line missing, and then tell it to think harder, you are asking it to reason more carefully about an incomplete picture. You are not asking it to somehow perceive the missing line. So the next time a diagnosis goes wrong, try not to reach immediately for “was the model smart enough?” Hiding behind that question are almost always three much sharper, much more useful ones: did this failure need more computation, did it need better evidence, or did it need someone — or something — to actually go and do something?",
      ],
      [
        "Choose a capability for a job",
        "Once this distinction settles — between what a model does and what happens to its output afterward — a second, related confusion tends to unravel almost on its own: the question of whether one model is simply “better” than another, as though every model could be lined up on a single ladder running from worse to best.\n\nIn practice, it is far more useful to think of a broad, general-purpose model and a narrower, specialised one as representing different trade-offs suited to different jobs, rather than different rungs on the same ladder. Picture a small, cheap classifier that has been tuned specifically to recognise a handful of familiar categories of incident — “this looks like a timeout,” “this looks like a bad deploy.” On the routine cases it was built for, it may be faster, cheaper and just as accurate as a vastly larger general-purpose model. But hand that same small classifier an unfamiliar failure that crosses two services in a way nobody anticipated when it was built, and it may do far worse than a model built for broad, general reasoning would. Calling a model “specialised” tells you what kind of task it was shaped for. It does not tell you that it is better at every task that merely sounds like it belongs to that same general area. The only honest way to find out which model actually suits your job is to measure both of them on the specific inputs you care about, and see what happens.\n\nThere is one more layer of confusion worth clearing up here, and it is probably the most common one in everyday use: the thing you are actually interacting with is very rarely just a model. Wrapped around it, usually invisibly, is a whole apparatus — retrieval that decides which documents or files the model even gets to see, instructions that shape how it is supposed to respond, tools it is permitted to call, permissions that limit what those tools can actually do, an interface that shapes how you interact with all of this, and sometimes an invisible router that quietly switches between several different underlying models depending on what you asked. So if you notice that two different products behave differently on what looks like the same task, the underlying model is only one of many possible explanations for that difference, and often not the right one.\n\nThis has a very concrete, practical consequence, worth stating outright: get into the habit of writing down, separately, which model you used and which surrounding configuration it was running inside of. Treat these as two different facts, not one blurred impression. If you do not, you risk a particular mistake that is easy to make and hard to notice: one day someone quietly improves the repository search that feeds context to the model, the model’s answers get noticeably better as a result, and you find yourself writing an excited note about how much smarter the model has become — when, in fact, nothing about the model itself changed at all.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Before separating capability from configuration, look at the one operation a model actually performs: turning an input representation into an output. Everything else in this course sits on top of that fact.",
        meaning:
          "Inference produces text or a structured request; it does not touch your disk on its own. A tool request is a proposal until something executes it. Extra “thinking” can change which proposal is chosen; it cannot supply an observation the model was never given.",
        question:
          "A reasoning-capable model is asked to think longer about a bug report that omits the actual stack trace. Will more thinking time recover the missing evidence?",
        answer:
          "No. Additional computation can improve how well the model uses what it already has, but it cannot manufacture an observation it was never supplied. The fix is to supply the stack trace, not to request more reasoning time.",
        further: [
          {
            question:
              "A model is given the exact same context twice and asked to produce a tool request each time. Could it legitimately return two different requests?",
            answer:
              "Yes. Inference is generally a probabilistic process; the same context does not guarantee an identical output unless sampling is made fully deterministic, and even then subtle context differences can change the result.",
          },
          {
            question:
              "If a harness silently retried a failed tool call before the model ever saw the failure, would the model's own context reflect what actually happened?",
            answer:
              "No. The model would only see the eventually reported result, missing the fact that a retry occurred. Anything a harness does invisibly falls outside what the model's context can ever describe.",
          },
        ],
      },
      {
        bridge:
          "Once you accept that a model only reasons over what it is given, product comparisons stop being about “which AI is smarter” and start being about which configuration supplied better context.",
        meaning:
          "A product bundles a model with retrieval, instructions, tools and permissions. Two products showing different results may differ in any of these layers, not necessarily in the underlying model. Record model and configuration separately so you know which one actually changed.",
        question:
          "Two products use the same underlying model, yet one investigates correctly and the other reads a stale generated file. What does this show about the two models’ capability?",
        answer:
          "Very little on its own. It is evidence about the surrounding product — retrieval, tool wiring or context assembly — not proof that the underlying models differ in ability.",
        further: [
          {
            question:
              "A team swaps their assistant's underlying model but keeps the same product, instructions and tools. Performance changes. What can this comparison conclude?",
            answer:
              "That the model is a plausible cause, since it was the one thing deliberately varied while everything else stayed fixed — a cleaner attribution than is typically available.",
          },
          {
            question:
              "Why can recording 'model' and 'configuration' as two separate facts be harder in practice than it sounds?",
            answer:
              "A product update can silently change context assembly, tool wiring, or default instructions at the same time it changes, or doesn't change, the underlying model. Both often ship in one release note, so teasing apart which change caused an observed difference takes deliberate effort.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A model's context window is described as 'large.' What does this establish on its own?",
        [
          "Every included item will be used correctly",
          "Only an upper bound on how much can be supplied at once",
          "That the model is more capable than a smaller-window model",
        ],
        1,
        "Window size is a capacity limit, not a guarantee about relevance or correct use of what's inside it.",
      ],
      [
        "Two coding products report different bug-fix success rates using the same named model. Which explanation should you check first?",
        [
          "The model secretly changed itself between runs",
          "Differences in context, tools, or harness configuration",
          "The bug reports were different lengths",
        ],
        1,
        "Surrounding product configuration is the most common source of behavioral differences between products sharing one model name.",
      ],
      [
        "A reasoning model spends much longer 'thinking' about a task with complete, correct evidence already in context. What is the most likely benefit?",
        [
          "It can recover missing evidence it wasn't given",
          "It may reach a better conclusion from the evidence already present",
          "It gains permission to execute tools directly",
        ],
        1,
        "More computation helps use existing evidence better; it does not conjure missing evidence or grant new capabilities.",
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
    nextConnection:
      "Once you can separate a model’s output from what happens to it, ask what has to exist for that output to become an action: an agent loop that observes and reacts.",
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
      "Go back to the friend on the phone, diagnosing your car by ear. Suppose your friend says something different this time: “Let me come over, and if I’m wrong about the belt, I’ll try the next thing.” Now your friend does not just deliver a single verdict from a distance. Your friend walks over, opens the hood, loosens a bolt, listens to the engine again, and revises the diagnosis if the noise is still there. This is a substantial change, even though the same underlying expertise is being applied. Each attempt produces some new fact, and each new fact can change what your friend decides to try next.\n\nCarry this back to software. Picture an assistant that proposes running the failing retry test. In a plain chat window, you are the one who actually copies that command, runs it yourself, and pastes the result back in — you are standing in as the mechanic, carrying messages back and forth between yourself and the diagnosis. Now imagine that loop closed: some piece of software runs the command automatically and hands the result straight back to the model, with no you in the middle. The model can look at that result and decide what to try next, using evidence that, a moment before, it simply did not have.\n\nThat closed loop — decide, act, observe, decide again — is the entire operational content of the word “agent.” It has nothing to do with how confident the system sounds, or how long and elaborate its instructions are. An agent is not a personality; it is a system in which a decision can select an action, that action produces an observation, and that observation feeds back into the next decision. Strip away everything else, and this loop is what is actually left.",
    sections: [
      [
        "Trace one complete cycle",
        "To see this loop clearly, it helps to walk through one concrete pass around it rather than talk about it in the abstract. Give the system a goal: reproduce the duplicate-retry bug, and fix it. The model’s first move might be to request that the retry test actually be run. Some executor — the piece of software standing in for you, the mechanic — carries out that request and reports back what happened: say, an assertion failure, on a particular line, with a particular message. The model reads that observation and makes its next decision, perhaps asking to inspect a source file that now looks relevant. Notice that this second action was only possible because the first one produced a genuinely new fact. Nothing about the code changed between these two steps, and yet the evidence available to the system did change, and that alone is enough to move the investigation forward.\n\nNow consider what happens if that first request does not actually succeed — if, say, the environment does not even have Node.js installed, and the command fails before any test runs at all. This case is easy to get wrong, and getting it wrong matters: a tool request is not automatically the same thing as an observation. If the executor pretends the test ran when it did not, or quietly swallows the failure, the model has been handed a false premise, and everything it decides next will be built on top of that false premise. The honest thing to return is exactly what happened — the command failed to start, for this reason. An agent that cannot tell “the test failed” apart from “the test never had the chance to run” will confidently investigate the wrong problem, and it will do so with just as much apparent conviction as if it had gotten things right.",
      ],
      [
        "Autonomy needs a boundary and an ending",
        "Once this loop is in view, a further question becomes unavoidable: how much should the system be allowed to do with it on its own, before you step back in? It helps to think of this as a spectrum of responsibility rather than a single switch. At one end, plain autocomplete proposes a small, local continuation of what you are already typing, and nothing more. A step further, an assistant can discuss a task with you, offering suggestions you remain free to accept or reject one at a time. Further still, a delegated agent can select and carry out several actions in a row in pursuit of some larger outcome, checking back with you only once it is done, or stuck. And at the far end, an unattended workflow can launch a whole run of this kind on its own initiative, triggered by some event, with no human deciding in the moment that this particular run should happen at all. None of these positions is simply “better” than the others; they are different amounts of responsibility, suited to different situations, and choosing badly among them is its own kind of mistake, in either direction.\n\nWherever you land on that spectrum, one thing has to be settled in advance, and it is easy to skip past: what, exactly, counts as being finished? It is tempting to let the model’s own closing remarks answer this — if it says “done,” perhaps that is good enough. Resist this. Define completion independently of whatever the model happens to say about itself: the required tests actually pass, the intended behaviour is actually present, and the change actually stays within the scope you asked for. Alongside that, define what a blocked ending looks like, and what a budget-exhausted ending looks like, because a long-running task will not always end in success. A limit on the number of turns a model may take is a guard against a runaway process, not a definition of success. A run can burn through every one of its allotted turns without making any real progress at all, just as easily as it can finish correctly with turns to spare — the number of turns used tells you almost nothing, on its own, about whether the work is actually done.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Return to the retry bug. In chat you were the one who ran the command and reported the result back — you were the loop. Automate exactly that role, and you have an agent.",
        meaning:
          "An action and its resulting observation are two different events. A tool request that never actually executed is not an observation of anything; treating a bare request as if it had happened invites the next decision to reason from a false premise.",
        question:
          "The harness cannot start Node.js and returns an error before any test runs. Should the next step be to investigate the retry logic itself?",
        answer:
          "No. The observation reports that no test executed at all. Investigating retry logic now would test a hypothesis with no supporting evidence; the environment blocker must be resolved or reported first.",
        further: [
          {
            question:
              "An agent's tool call returns a result, but the harness omits which command produced it. What problem does this create for the next decision?",
            answer:
              "The model can't tell whether the observation actually answers the question it just asked, or is stale evidence from an earlier request — undermining its ability to reason about what its own action just changed.",
          },
          {
            question:
              "Could an agent loop technically satisfy the decide-act-observe-decide pattern while still being useless? What would that look like?",
            answer:
              "Yes. If chosen actions never actually change the available evidence, such as rereading the same unchanged file repeatedly, the loop mechanically closes but produces no genuine progress. Closing the loop does not guarantee the decisions inside it are good ones.",
          },
        ],
      },
      {
        bridge:
          "Not every task deserves the same amount of independence. Before granting it, decide what “done” means and what should happen if the budget runs out first.",
        meaning:
          "A turn limit is a resource boundary, not a definition of success. A run can exhaust its budget having made no real progress, or finish correctly with turns to spare — the limit only says when it must stop, never whether it succeeded.",
        question:
          "An agent uses all 20 of its allotted turns and then reports “complete.” Does the turn count support that claim?",
        answer:
          "No. The turn count only shows the run used its full budget. Only independent acceptance evidence, such as a passing regression test, can support a claim of completion.",
        further: [
          {
            question:
              "Why is 'the agent stopped because it ran out of turns' not, by itself, informative about whether the task succeeded?",
            answer:
              "A turn limit describes a resource exhaustion event, not an evaluation of the work done. Success has to be checked against acceptance criteria independently of why the run stopped.",
          },
          {
            question:
              "A task has no test suite and a genuinely disputed definition of 'correct behavior.' Does raising the turn budget help an agent working on it?",
            answer:
              "Not really. A bigger budget lets the agent do more work, but with no way to check whether that work is correct, more turns just produce more unverifiable output. The bottleneck here is verification, not compute.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "An agent requests a shell command; the shell returns ‘permission denied.’ What has been observed?",
        [
          "A successful command execution",
          "A denied request, which is itself useful information",
          "Nothing, since the model must retry silently",
        ],
        1,
        "A denial is a valid, informative observation distinct from both success and a malformed request.",
      ],
      [
        "Which best distinguishes autocomplete from a full agent loop?",
        [
          "Autocomplete never touches a keyboard",
          "Autocomplete proposes a local continuation with no action–observation cycle",
          "Autocomplete requires more turns",
        ],
        1,
        "Autocomplete lacks the closed action–observation loop that defines an agent.",
      ],
      [
        "A long-running agent's final message is confident and detailed. Is this sufficient evidence of successful completion?",
        [
          "Yes, confidence correlates with correctness",
          "No, completion needs independent acceptance evidence",
          "Yes, if the message is long enough",
        ],
        1,
        "Prose confidence is not a substitute for checking the actual required outcome.",
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
    nextConnection:
      "Knowing what an agent loop is does not yet explain who actually executes the tool call it proposes. That machinery is the harness.",
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
      "Suppose you have two equally skilled mechanics — genuinely the same level of skill, perhaps even trained by the same person — and you give them the same car with the same fault. Send one of them to a well-organised workshop: the right tools are on the wall in the right place, the lift works, the diagnostic computer is plugged in and calibrated. Send the other to a workshop where the tools are scattered across three benches, half of them mislabeled, and the lift needs to be checked before anyone trusts it. It should not surprise you that the first mechanic fixes the car in twenty minutes while the second spends the morning just finding the right wrench. Nobody would conclude from this that the second mechanic is less skilled. The difference lies entirely in the workshop.\n\nThe same thing happens with coding agents, and it is one of the easiest things to get backwards. Give two engineers access to the very same underlying model. One agent finds the flaky test, edits three lines, and verifies the fix within a couple of minutes. The other spends ten minutes running directory listings that go nowhere. Before concluding that one run simply got luckier, or that the model behaved inconsistently, look at the machinery surrounding it — because that machinery, and not the model itself, is very often where the real difference actually lives.\n\nThat machinery has a name: the harness. A harness is the program that turns a model’s raw outputs into an actual operating agent. It builds the requests sent to the model, interprets whatever tool calls come back, decides whether and how to execute them, feeds the resulting observations back in, and decides when the whole run should end. It is worth keeping two words apart here, because people use them interchangeably and it causes real confusion: “agent” describes the working system, or the behaviour you observe; “harness” names the actual piece of software that makes that behaviour possible in the first place. The mechanic’s skill is the model. The workshop is the harness.",
    sections: [
      [
        "Follow a tool request across the boundary",
        "To make this concrete, follow one tool request all the way across the boundary between the model and the world. Suppose the model asks to read_file, with some particular path attached. Before anything is actually read, the harness has several jobs to do, none of which the model can do on its own: it must check that the request is even shaped correctly, resolve the path against the real filesystem, check whether that path is one this run is actually allowed to touch, read the bytes if it is, and then decide how to package the result before handing it back as the next piece of context. None of this happens simply because the model was instructed to “behave.” An instruction is a sentence; a permission check is code that runs, whether or not anyone asked it nicely to do so.\n\nThis separation turns out to be extremely useful when something goes wrong, because it gives you several distinct places to look rather than one vague suspect. A request that is malformed is a different problem from a request that was valid but denied by policy, and both are different again from a request that succeeded but returned stale content. It is worth logging which of these three things actually happened, for every tool call — without, of course, letting anything secret leak into that log.",
      ],
      [
        "Configure before replacing",
        "Once you understand what a harness does, a tempting next step is to build your own — and sometimes that really is the right call, but it is worth resisting the urge until you have actually earned it. A stock harness that ships with a product may already let you configure repository instructions, register new tools, control what enters context, and set execution limits, all through ordinary settings rather than new code. If the problem you are facing can be solved by turning one of those existing knobs, turn the knob. Reach for a custom harness only once you need some enforceable behaviour that the existing product genuinely cannot express — for instance, a rule that every write must pass through a particular transaction service with its own audit trail, where no amount of instruction-writing will make that happen on its own.\n\nThe reason to be cautious here is not laziness; it is that owning a harness means owning far more than the happy path. It means owning cancellation when a run needs to stop early, retries when a request fails transiently, the inevitable day a provider changes its response format under you, and the ongoing job of actually observing what the system is doing in production. A small demo loop, built over a weekend, can look deceptively complete, precisely because its happy path is the only path it has ever been asked to walk. Before you write a replacement loop, write down the specific requirement your current setup cannot satisfy, in concrete and checkable terms, and only then decide whether a new harness is the proportionate answer to it.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Take one tool request and follow it past the model’s boundary, into the code that actually acts on it.",
        meaning:
          "Validating shape, resolving a path, checking access and executing are separate operations performed by the harness, not by the model. A confidently worded instruction cannot substitute for any of these checks actually running in code.",
        question:
          "A tool call is syntactically well-formed but requests a path outside the repository. Who is responsible for rejecting it?",
        answer:
          "The harness’s execution layer, through its access checks — not the model’s own judgement, which the harness cannot verify or enforce by itself.",
        further: [
          {
            question:
              "A harness logs 'tool call succeeded' for every request regardless of outcome. What debugging capability does this destroy?",
            answer:
              "The ability to tell malformed requests, policy denials and stale successful reads apart from each other — collapsing three different categories into one uninformative label.",
          },
          {
            question:
              "Could a well-written system prompt alone enforce that an agent never reads outside its assigned directory?",
            answer:
              "No. A prompt can request this behavior, but only code-level path resolution and access checks in the harness can actually enforce it. An instruction is advisory, not a technical control.",
          },
        ],
      },
      {
        bridge:
          "Most failures do not require writing a new harness. Before reaching for one, check what the existing machinery already lets you configure.",
        meaning:
          "A custom harness is justified by a concrete missing capability — such as an enforceable transaction rule — weighed against the ongoing cost of owning cancellation, retries and observability yourself. “It feels more advanced” is not that justification.",
        question:
          "A team wants every model-proposed write to pass through a domain-specific audit service that the stock harness cannot express. Is building custom harness machinery reasonable here?",
        answer:
          "Potentially, yes — this is a concrete, unmet requirement, not a preference. The team should still weigh the resulting maintenance burden against configuring the existing product first.",
        further: [
          {
            question:
              "A team wants stricter logging of every tool call. Is this generally a reason to replace the harness?",
            answer:
              "Usually not. Logging is a common configurable capability in most stock harnesses; check existing observability settings before concluding a custom harness is required.",
          },
          {
            question:
              "What ongoing cost does a team take on the day they commit to a custom harness, beyond the initial build?",
            answer:
              "Ownership of cancellation, retries, provider format changes, schema evolution and observability, indefinitely — obligations a maintained stock product would otherwise absorb.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A tool request has correct JSON syntax but references a path outside the repository. Whose job is it to reject this?",
        [
          "The model, by reasoning more carefully",
          "The harness’s validation and access-control layer",
          "The end user, after reviewing the output",
        ],
        1,
        "Syntax validity and semantic/permission validity are different checks, and only the harness enforces the latter.",
      ],
      [
        "Which is a legitimate reason to build a custom harness?",
        [
          "A required enforceable behavior the current product cannot express",
          "The team prefers writing their own code",
          "A demo loop was easy to build over a weekend",
        ],
        0,
        "Custom machinery should be justified by a concrete missing capability, not preference or a deceptively simple prototype.",
      ],
      [
        "The same model succeeds locally but fails in CI. What should be compared first?",
        [
          "The two models’ training data",
          "The working directory, checkout state and available commands",
          "The user’s typing speed",
        ],
        1,
        "Environment differences are the first place to look before suspecting the model itself.",
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
    nextConnection:
      "The harness executes what is in front of it. What decides that something should run at all, and when, belongs to a layer further out: orchestration.",
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
      "It is two in the morning, and a pull request has just failed its CI checks. Nobody is awake to see it. If nothing else exists in the system beyond the model and its harness, then quite literally nothing happens next: the model has not been asked anything, the harness has nothing to run, and the failure will simply sit there, waiting for a human to notice it over coffee. The agent’s own inner loop — decide, act, observe, decide again — cannot explain who or what decided that this particular moment was one worth acting on. That loop has not even started yet, and something outside of it has to be the reason it starts at all.\n\nThat something outside is orchestration, and it is worth thinking of it as an entirely separate job from the one the agent itself does. Orchestration decides when work should begin, which worker should receive it, how the results of one stage travel to the next, and what ought to happen once everything is finished. None of this replaces the agent’s own inner loop of choosing actions once it has been handed a task; it simply exists a level above it, deciding when and whether that inner loop gets to run in the first place. Keeping these as two separate control loops, rather than folding them into one blurry idea of “the AI,” is what makes the whole architecture something you can actually reason about and change later.",
    sections: [
      [
        "Separate a workflow from a reasoning loop",
        "GitHub Actions is a good place to start, because it already gives you a vocabulary for the outer loop, quite independently of anything resembling a model. It reacts to events — a pull request opened, a schedule reached — and runs jobs in response. GitHub Agentic Workflows, usually invoked through a tool called gh-aw, lets you author that kind of agentic work in Markdown, alongside configuration, and compiles the whole thing down into an ordinary Actions workflow. Inside that compiled workflow, some selected engine is the thing that actually runs the coding agent, and that engine, in turn, is the thing that calls a model to make its moment-to-moment decisions.\n\nIt is worth drawing this out as a chain of concrete responsibilities, rather than reaching for brand names, because brand names blur exactly the distinction we are trying to keep sharp. GitHub supplies the triggering event and somewhere to run a job. The compiled workflow decides which job gets started and with what permissions. The engine, together with its harness, manages the back-and-forth of tools and model calls within that job. The model itself only ever proposes the next action. Review and publication, if they exist at all, are further downstream stages again. Neither a particular chat product nor a particular model brand is another name for gh-aw; each occupies a different, specific box in this chain, and it pays to know which box is which.",
      ],
      [
        "Assistance, delegation and automation",
        "Given that chain, a further set of questions becomes unavoidable: who initiates each run, and how much do they trust it to proceed without them? In assistance, you remain the one directly steering things in the moment — you are present, and you are the one deciding what happens next. In delegation, you hand over some bounded task and go do something else, coming back later to inspect what was produced. In automation, on top of delegation, you add a repeatable trigger and a standing policy for how to respond to it, so the whole cycle can recur without you deciding, each time, that it should. It is worth noticing what automation actually multiplies: if the underlying delegated task is not yet reliable, automating it does not fix that unreliability, it simply repeats the same failure, over and over, without you there to catch it each time.\n\nA sensible way to build up to this is to start smaller than you might expect. Begin with a manually triggered investigator: something that produces useful evidence about a problem, on demand, whenever you choose to run it. Only once that output is genuinely useful should you start layering on event filtering, protection against duplicate runs, and a clearly defined “nothing to report” result. A newly automated workflow does not have to create an issue every single time it wakes up. “Nothing relevant changed since last time” is not a failure of the system; it is one of the legitimate things the system is allowed to conclude.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "A failing pull request at 02:00 does not investigate itself. Something outside the agent’s own loop has to notice the event and start the work.",
        meaning:
          "GitHub supplies the event and a place to run; a compiled workflow selects a job and permissions; the engine and its model make in-task decisions. Attributing all of that to “the model” collapses several distinct responsibilities into one.",
        question:
          "A nightly job silently stops running two months after being set up. Which layer most likely owns that failure?",
        answer:
          "Most likely the outer workflow or its trigger configuration, not the model — the model never runs unless the outer scheduling and event layer starts a job in the first place.",
        further: [
          {
            question:
              "If a workflow's compiled permissions are broader than the task actually needs, what specific risk does this create?",
            answer:
              "It expands the blast radius of any bug or injection in the agent's behavior — the workflow could take actions it never actually needed, purely because the permission happened to be available.",
          },
          {
            question:
              "A workflow's trigger fires, but the engine that is supposed to run never starts. Whose responsibility was that?",
            answer:
              "The outer workflow/orchestration layer's, or whatever job-scheduling infrastructure launches the engine — not the model, which was never invoked, and not the harness, which needs the engine running to exist at all.",
          },
        ],
      },
      {
        bridge:
          "Not every task needs the same amount of standing independence. Assistance, delegation and automation trade supervision for reach in different amounts.",
        meaning:
          "Automating a task before its delegated version is reliable just repeats the same mistakes on a schedule, without you present to notice. A legitimate output of an investigation can be “nothing relevant happened” — that is not a failure to report.",
        question:
          "Should a newly automated investigator create an issue on every scheduled run, even when it finds nothing actionable?",
        answer:
          "No. Requiring an issue every run rewards noise over honesty; a no-action result should be a normal, supported outcome of the workflow.",
        further: [
          {
            question:
              "A team automates a delegated task the day after first trying it successfully once. What's the risk in moving that fast?",
            answer:
              "One success doesn't establish reliability. Automating immediately risks repeating an uncharacterized failure mode at scale, without the human oversight that caught problems during the single manual trial.",
          },
          {
            question:
              "Why might 'no action taken' be a harder outcome for a workflow to implement correctly than 'action taken'?",
            answer:
              "It requires the workflow to positively conclude that nothing relevant changed and to resist a bias toward always producing visible output; without deliberate design, a workflow can drift toward manufacturing busywork just to appear active.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "Which component actually decides that a CI failure is worth investigating right now?",
        ["The model", "The outer workflow/orchestration layer", "The harness’s tool executor"],
        1,
        "Selecting and triggering work is an orchestration responsibility, separate from the inner agent loop.",
      ],
      [
        "A workflow is compiled with write access to the whole repository, though the task only ever reads logs. What is the concern?",
        [
          "None, broader access is always safer",
          "Unused permission still expands what a bug or injection could do",
          "Write access always improves performance",
        ],
        1,
        "Permissions should match the task's actual needs; unused scope is unnecessary risk.",
      ],
      [
        "What is a legitimate output for an unattended investigation to produce?",
        [
          "Always an issue, regardless of findings",
          "An explicit 'no action needed' result when appropriate",
          "Silence with no logged outcome at all",
        ],
        1,
        "A defined no-action result is a legitimate, auditable outcome distinct from silent failure.",
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
    nextConnection:
      "You now have vocabulary for the inner loop and the outer workflow. The next unit asks a related but separate question: with all these layers wired up, what information should actually reach the model at each step?",
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
];
