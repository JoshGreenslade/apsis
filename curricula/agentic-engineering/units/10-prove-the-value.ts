import type { Lesson } from "../lesson";
export const unit10ProveTheValue: Lesson[] = [
  {
    id: "graduation",
    title: "Graduation: build a workflow worth keeping",
    unit: "10 · Prove the engineering value",
    minutes: 15,
    question: "Does your agent system actually save engineering time?",
    outcome:
      "Build, explain and evaluate an event-driven repository workflow with independent review and a human approval boundary.",
    intro:
      "There is a natural last step to the story this course has been telling, car by car, mechanic by mechanic, workshop by workshop. You have learned to tell a good diagnosis from a good repair, to judge a mechanic’s workshop rather than just their reputation, to delegate a bounded job with a real contract behind it, to build a small engine yourself, and to measure honestly whether any of it was actually worth the time it cost. The final, natural question left standing is the one an actual garage owner eventually has to answer: is this whole operation, taken together, worth running at all?\n\nThis final project is not a vocabulary exam, and nobody is asking you to recite the terms from the last nine units back at them. Take a real repository, and make one specific class of engineering work in it genuinely easier. A CI failure, or an issue, enters the system; some workflow decides whether it actually merits investigation at all; a coding agent, if it does, produces a bounded result; a review stage gets the chance to challenge that result; and a human retains control over whatever approval is actually consequential.\n\nThe graduation question underneath all of this is whether the resulting architecture is actually worth maintaining, once you have looked honestly at what it costs and what it saves. A perfectly correct conclusion to reach, after building and measuring all of this, may be to keep only the investigator and drop the rest, to reduce how much autonomy the system is given, or to retire the automation altogether, because the actual engineering work it saves turns out to be smaller than what it costs to run and maintain.",
    sections: [
      [
        "Build a narrow end-to-end path",
        "Choose one single task class with a genuinely reproducible acceptance boundary, diagnosing a known, recurring CI failure, say, or proposing a dependency update that has actually been tested. Use GitHub events, and gh-aw, to actually start the work. Classify anything irrelevant as a clean, explicit ignore. Give the investigator only the minimum evidence and tools it genuinely needs, and route a sufficiently well-supported finding on to implementation only when the task’s own contract actually permits that.\n\nThe implementer works inside an isolated checkout, and returns a diff along with real test evidence behind it. A separate review stage receives the original requirements alongside that artifact, and is genuinely allowed to disagree with it. Keep human approval firmly at the merge or release boundary, and nowhere earlier than that. The maintenance workflow supplied with this course is a starting example for the investigator stage specifically, not a finished, ready-to-run auto-merge system you can simply switch on.",
      ],
      [
        "Exercise the paths the demo leaves out",
        "Test a genuinely valid event, an irrelevant one, a duplicate delivery of the same event, an unavailable tool, deliberately misleading repository text, exhausted budget, and a reviewer that raises a real counterexample. For each of these, name explicitly who owns the recovery decision, and what artifact actually survives the encounter. Do not let a mere statement from the model directly change what authority the workflow holds.\n\nUse fixtures before you ever enable recurring, live execution. If a fully live system genuinely is not available to you, produce an honest dry-run design instead, and state plainly what deployment steps genuinely remain. A dry run can validate your contracts and your fixture behaviour. It cannot, on its own, establish live reliability, or demonstrate any actual time savings, however carefully it was built.",
      ],
      [
        "Measure and decide",
        "Collect the same metrics you already used back in the bake-off: accepted outcomes, interventions required, active human time, elapsed time, usage or runtime cost, regressions, and unnecessary edits. Include setup and ongoing maintenance effort, measured over a realistic time horizon, not just the first exciting week. Compare all of it honestly against a manual baseline for the same class of task.\n\nWrite a short, genuinely honest decision: keep it, narrow it, change it, or stop it. Explain which specific layer failed in whatever runs did not succeed, and state what evidence would actually be needed to justify granting the system more autonomy in future. Your architecture diagram, by this point, should have become an operational map rather than a sketch: you should be able to name who owns every single action, every observation, every permission, and every stopping decision in the entire system.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "The final project is not a vocabulary exercise — it is building one real, narrow path from a repository event to a reviewed, human-approved outcome.",
        meaning:
          "A workflow needs an explicit ignore path for irrelevant events, a bounded investigator, an isolated implementer and a review stage that can actually disagree, with human approval kept at the merge or release boundary.",
        question:
          "Should the workflow’s investigator be allowed to merge its own accepted-looking patch directly?",
        answer:
          "No. Merge and release remain a human-owned boundary; the investigator’s and implementer’s outputs still need independent review and explicit approval.",
        further: [
          {
            question:
              "An irrelevant repository event (like a typo-fix commit) triggers the full investigation pipeline anyway. What does the absence of an explicit ignore path cost?",
            answer:
              "Wasted compute and reviewer attention on events that never needed investigation in the first place, and potentially noisy or spurious findings generated from an irrelevant trigger.",
          },
          {
            question:
              "Why must the review stage in this final workflow have genuine permission to disagree, rather than simply confirming the implementer's patch?",
            answer:
              "A review stage that can only confirm provides no real check; the entire point of keeping human approval at the merge boundary is undermined if nothing upstream is actually allowed to catch and flag a mistake.",
          },
        ],
      },
      {
        bridge:
          "A demo that only shows the best case has not actually been tested — the paths it avoids are exactly where the real risk lives.",
        meaning:
          "Valid events, duplicates, unavailable tools, misleading repository text, exhausted budgets and reviewer counterexamples all need an owner and a surviving artifact; a dry run can validate design and fixture behaviour but cannot establish live reliability.",
        question:
          "A workflow has only been exercised on its intended happy-path scenario. Can this be presented as evidence that it is production-ready?",
        answer:
          "No. Without testing duplicate events, unavailable tools and adversarial or misleading input, the workflow’s behaviour under real conditions remains unverified.",
        further: [
          {
            question:
              "A workflow's budget is exhausted mid-investigation, but there is no defined owner or artifact for that case. What happens to the work already done?",
            answer:
              "It is likely lost or unusable, since nothing captured a checkpoint or handoff artifact when the budget ran out; an unowned failure path silently discards partial progress.",
          },
          {
            question:
              "Why is a dry run against a fixture insufficient, on its own, to establish that a workflow is reliable in production?",
            answer:
              "A fixture only reproduces the specific conditions it was built to simulate; live production traffic includes variability, timing, and edge cases a fixture cannot fully anticipate, so a dry run validates design intent but not live-world reliability.",
          },
        ],
      },
      {
        bridge:
          "A working system is not the same as a system worth keeping — that verdict needs a measurement, not an impression.",
        meaning:
          "Accepted outcomes, interventions, active time, elapsed time, cost, regressions and unnecessary edits, compared against a manual baseline, support an honest keep/change/stop decision; a defensible conclusion can be to narrow the system’s scope or retire it.",
        question:
          "If a pilot shows the workflow saves only two minutes of engineering time per incident while creating recurring noise, what is a reasonable decision?",
        answer:
          "Narrow the workflow’s scope or stop running it — a small time saving that comes with ongoing noise may not justify its operational cost.",
        further: [
          {
            question:
              "Why is 'the workflow is technically working' not, by itself, sufficient justification to keep running it indefinitely?",
            answer:
              "Technical functioning says nothing about whether its measured benefit exceeds its measured cost; a working system that saves too little or causes too much noise can still be the wrong system to keep operating.",
          },
          {
            question:
              "A pilot measures accepted outcomes and cost but never establishes what the manual baseline actually cost. What is missing from the keep/change/stop decision?",
            answer:
              "A point of comparison. Without a baseline, there is no way to tell whether the workflow's measured cost and benefit actually represent an improvement over doing the work manually.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "An investigation stage in the final workflow proposes merging its own patch directly. What should happen instead?",
        [
          "Allow it, since the investigator is presumably correct",
          "Route through independent review and a human-owned approval boundary",
          "Skip review to save time",
        ],
        1,
        "Merge and release remain human-owned boundaries regardless of how confident an upstream stage is.",
      ],
      [
        "A workflow has only ever been run against its intended happy path. What can be concluded about production readiness?",
        [
          "It is production-ready",
          "Its behaviour under duplicate, adversarial, or degraded conditions remains unverified",
          "Happy-path testing is sufficient for any workflow",
        ],
        1,
        "Untested failure and edge-case paths leave real-world reliability unverified.",
      ],
      [
        "A pilot shows small time savings alongside recurring operational noise. What is a defensible conclusion?",
        [
          "Always keep running it unchanged",
          "Narrow its scope or stop running it, based on the measured cost/benefit",
          "Ignore the noise since it works technically",
        ],
        1,
        "A keep/change/stop decision should follow from measured cost and benefit, not from technical functioning alone.",
      ],
    ],
    example: [
      "A repeated CI failure currently consumes 25 active engineer minutes per incident.",
      [
        "Pilot one bounded path",
        "Run a manually triggered investigator on historical incidents. Advance to a tested patch only when the report identifies a reproducible defect. Keep review and approval explicit.",
        "A narrow pilot lets you find whether the useful work is diagnosis, implementation or both.",
        "Enabling an unattended writer before validating the investigator’s false-positive rate.",
      ],
      [
        "Evaluate the whole workflow",
        "Count all attempted incidents, review time, failed runs and maintenance. If the workflow saves only two minutes but creates recurring noise, narrow it to a report or stop it.",
        "The system must earn its operational complexity.",
        "Measuring only the quickest successful agent run.",
      ],
    ],
    checks: [
      [
        "What is the graduation criterion?",
        [
          "Can build, explain, diagnose and evaluate the workflow’s value",
          "Can define every acronym",
          "Can run the most agents",
        ],
        0,
        "Operational understanding is demonstrated by a working, inspectable and economically justified system.",
      ],
      [
        "What should happen to an irrelevant event?",
        [
          "Always create an issue",
          "Take an explicit ignore/no-action path",
          "Increase its priority",
        ],
        1,
        "A useful workflow avoids creating work without a justified reason.",
      ],
      [
        "A dry-run prototype has no live measurements. What can it claim?",
        [
          "Proven savings in production",
          "Guaranteed unattended reliability",
          "Validated design/fixture behaviour with live evaluation still pending",
        ],
        2,
        "The evidence limits the conclusion; fixture success is not live performance data.",
      ],
    ],
    takeaway:
      "Keep the architecture only when measured accepted work and human effort justify it. You should be able to explain every box and diagnose every failed handoff.",
    nextConnection:
      "You have now built, tested and measured the full stack from a single model call to a governed repository workflow. Keep the architecture only as long as the evidence says it earns its place.",
    source: ["aw", "outputs", "security"],
    flow: [
      "GitHub issue / CI / PR event",
      "Classify: investigate or ignore",
      "Coding agent implements and tests",
      "Independent review challenges claims",
      "Human approval of merge or release",
      "Measure time saved and failures",
    ],
    practical: {
      title: "Final project · The measured repository workflow",
      minutes: 180,
      brief:
        "Use a repository you control. Start manually and keep merge/release approval human-owned. The goal is a defensible engineering result, not maximum autonomy.",
      steps: [
        "Select a task class and document the manual baseline.",
        "Implement and explain the trigger, classification, agent, review and approval contracts.",
        "Run the positive and negative scenarios listed above; retain traces and artifacts.",
        "Measure at least a small pilot batch, disclose sample-size limits and write a keep/change/stop recommendation.",
      ],
      deliverables: [
        "Repository with workflow source and compiled configuration",
        "Architecture and permission diagram",
        "Reproducible positive and negative test evidence",
        "Raw evaluation records and a cost/time analysis",
        "A short operational runbook naming failure owners",
      ],
      review:
        "Graduation requires a functioning path and honest measurement. Review must be capable of rejecting a patch; the workflow must handle irrelevant and duplicate events without noise. The report must count failures and human repair. If authentication or live infrastructure is missing, record that limitation and finish the fixture-based checks without claiming a deployed system.",
    },
  },
];
