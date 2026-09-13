import type { Lesson } from "./course-builder";
export const projects: Lesson[] = [
  {
    id: "tiny-harness",
    title: "Build a tiny harness, one responsibility at a time",
    unit: "09 · Build it and remove the magic",
    minutes: 15,
    question:
      "Can you point to the code that owns each part of the agent loop?",
    outcome:
      "Build and test a small coding harness, then add stopping, state, recovery, delegation and orchestration deliberately.",
    intro:
      "So far, you have used the stack as a way to diagnose products. Now implement the smallest version that makes its responsibilities visible. Begin with a goal, a model response, a tool request, execution and an observation returned to the model. Do not start with a framework full of features you cannot yet explain.\n\nThe supplied lab kit includes a working offline reference loop, a deliberately failing repository fixture and evaluation utilities. Its scripted model is a test double, not an intelligent agent: it lets you exercise execution and failure paths without credentials or model variability. Connecting a real model is a separate adapter exercise, with its own tests.",
    sections: [
      [
        "v1–v3: an action loop with an honest ending",
        "Start with v1, model plus shell. In the lab, shell access is narrowed to an explicit allowlisted command that runs the fixture’s test. Observe its nonzero exit and return that result as a tool observation. Do not execute arbitrary commands produced by an untrusted model on your everyday machine. The educational restriction is an allowlist, not a claim of OS sandboxing.\n\nIn v2 add read_file and write_file. Resolve paths inside the disposable workspace and reject traversal and symlinks. Give each call an ID so its observation can be matched to the request. Run a sequence that reads the fixture, applies the intended boundary fix and reruns the test.\n\nIn v3 add max turns, per-call timeout and explicit complete/blocked/exhausted states. A model’s finish request is a completion claim. Verify the acceptance tests against the final workspace before accepting it. A passing test from before the last write is stale evidence.",
      ],
      [
        "v4–v7: preserve useful state without hiding uncertainty",
        "In v4 select bounded tool output and preserve artifact pointers; deliberately create a long log and check that the useful failure is still recoverable. In v5 replace old interaction history with a checkpoint containing goal, constraints, observations and next action. Compare behaviour before and after compaction using the same scripted response sequence.\n\nIn v6 persist that checkpoint to a task-state file outside the fixture. Restart the process and revalidate the workspace revision/content fingerprint before resuming. Durable state must not silently attach to a different task. In v7 add a hypothesis ledger. Record evidence for and against a hypothesis and the experiment that will discriminate. A confidence label alone is not evidence.\n\nThe reference loop implements the bounded execution and verification core plus saved observations. You implement compaction and hypothesis tracking as explicit extensions, using the acceptance checks below. This keeps the starting code small enough to understand.",
      ],
      [
        "v8–v9: introduce one worker, then an outer controller",
        "In v8 add one read-only worker with a separate context and a narrow return schema: finding, evidence references and uncertainty. Give it a bounded question and test timeout, contradiction and empty-result behaviour. Keep one writer for the fixture. A function named spawn_agent that simply repeats the parent’s conclusion is not independent verification.\n\nIn v9 add an outer controller that classifies a fixture event as investigate or ignore, chooses the task, invokes the harness and routes its artifact to review. Use a stable event ID to suppress duplicate work. Keep event handling outside the inner model loop so you can test each separately.\n\nWhen connecting a real model, translate provider responses into the reference loop’s decision shape. Validate every tool argument and preserve all provider-required conversation items and call IDs. Treat refusal, malformed output, multiple calls and transient failures explicitly. The OpenAI function-calling guide linked below documents one provider’s interaction contract; other providers need their own adapter.",
      ],
    ],
    example: [
      "The fixture’s retry function allows one attempt beyond the intended maximum.",
      [
        "Observe before editing",
        "Run the provided offline reference. Its scripted model first requests the failing test, then reads the implementation, writes the one-character comparison fix and requests completion.",
        "A known response sequence makes it possible to test the harness independently of model quality.",
        "Calling the scripted fixture an evaluation of a real model.",
      ],
      [
        "Challenge the completion path",
        "Run the false-success and exhausted scenarios in the kit. Confirm that a premature finish claim is rejected and a depleted budget is not called complete.",
        "The harness’s value appears in its control and evidence boundaries, not only its happy path.",
        "Trusting a final message without running the acceptance check.",
      ],
    ],
    checks: [
      [
        "What does the offline scripted model validate?",
        [
          "A frontier model’s reasoning quality",
          "Harness execution and failure behaviour under known decisions",
          "The economics of every real agent",
        ],
        1,
        "A test double controls inputs to test the surrounding machinery; it does not measure real inference.",
      ],
      [
        "When should completion be checked?",
        [
          "Only before the first edit",
          "Whenever the model sounds confident",
          "Against the final relevant workspace state",
        ],
        2,
        "Edits can invalidate prior successful test observations.",
      ],
      [
        "Which responsibility belongs in v9 rather than the inner loop?",
        [
          "Selecting work from an event and routing its result",
          "Returning a tool observation",
          "Reading the next requested file",
        ],
        0,
        "The outer controller manages task lifecycle; the inner loop chooses actions within one task.",
      ],
    ],
    takeaway:
      "You understand the stack when you can locate, test and replace each responsibility without confusing it with another.",
    source: ["tools", "mcp", "engines"],
    flow: [
      "Outer controller selects a task",
      "Harness builds context",
      "Model or scripted test double",
      "Validated tool execution",
      "Observation and task-state update",
      "Verified completion or explicit stop",
    ],
    practical: {
      title: "Lab 9 · Extend the tiny harness through v1–v9",
      minutes: 120,
      brief:
        "Download [the lab kit](/agent-labs/agent-labs.zip) or use public/agent-labs in the source checkout. The [lab guide](/agent-labs/README.md) provides commands, extension milestones and failure cases. Work in a disposable directory with Node.js 24 or newer.",
      steps: [
        "Run the supplied tests and offline fixture demo. Inspect the trace, tool policy and final verification gate.",
        "Rebuild the core loop in your own words/code, then implement v4–v7 using the guide’s milestone checks.",
        "Add the read-only worker and event controller for v8–v9; inject a worker timeout and duplicate event.",
        "Optionally connect a live model through a provider adapter. Record its model/version and costs, and keep offline harness tests separate from live-agent evaluation.",
      ],
      deliverables: [
        "A working loop and inspectable trace",
        "Nine milestone notes, each naming the code that owns the new responsibility",
        "Evidence for traversal rejection, false-success rejection, exhaustion, resume, worker failure and duplicate-event handling",
      ],
      review:
        "A complete submission can explain every transition. A live model is optional for testing the core harness, but you must label scripted runs honestly. Compaction must preserve constraints and evidence pointers; resume must check workspace identity; the worker must have a bounded contract; the outer controller must not process the same event twice. Do not claim the reference skeleton already implements every extension.",
    },
  },
  {
    id: "graduation",
    title: "Graduation: build a workflow worth keeping",
    unit: "10 · Prove the engineering value",
    minutes: 15,
    question: "Does your agent system actually save engineering time?",
    outcome:
      "Build, explain and evaluate an event-driven repository workflow with independent review and a human approval boundary.",
    intro:
      "The final project is not a vocabulary exam. Take a real repository and make one class of engineering work easier. A CI failure or issue enters the system; the workflow decides whether it merits investigation; a coding agent produces a bounded result; review challenges it; a human controls the consequential approval.\n\nThe graduation question is whether this architecture is worth maintaining. A correct conclusion may be to keep only the investigator, reduce autonomy or retire the automation because the measured work saved is too small.",
    sections: [
      [
        "Build a narrow end-to-end path",
        "Choose one task class with a reproducible acceptance boundary, such as diagnosing a known CI failure or proposing a tested dependency update. Use GitHub events and gh-aw to start the work. Classify irrelevant events as ignore. Give the investigator the minimum evidence and tools it needs, and route a sufficiently supported finding to implementation only when the task contract permits it.\n\nThe implementer works in an isolated checkout and returns a diff with test evidence. A separate review stage receives the requirements and artifact and may disagree. Keep human approval at the merge or release boundary. The supplied maintenance workflow is a starting example for the investigator, not a finished auto-merge system.",
      ],
      [
        "Exercise the paths the demo leaves out",
        "Test a valid event, irrelevant event, duplicate delivery, unavailable tool, misleading repository text, budget exhaustion and a reviewer counterexample. For each, name the owner of the recovery decision and the artifact that survives. Prevent a model statement from directly changing workflow authority.\n\nUse fixtures before enabling recurring execution. If a live system is unavailable, produce a dry-run design and clearly state the remaining deployment steps. A dry run can validate contracts, but it cannot establish live reliability or time savings.",
      ],
      [
        "Measure and decide",
        "Collect the same metrics you used in the bake-off: accepted outcomes, interventions, active human time, elapsed time, usage/runtime cost, regressions and unnecessary edits. Include setup and maintenance effort over a realistic horizon. Compare with a manual baseline for the same task class.\n\nWrite a short decision: keep, narrow, change or stop. Explain which layer failed in unsuccessful runs and what evidence would justify more autonomy. Your architecture diagram should now be an operational map: you can identify who owns every action, observation, permission and stopping decision.",
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
