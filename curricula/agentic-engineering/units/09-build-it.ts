import type { Lesson } from "../lesson";

export const unit09BuildIt: Lesson[] = [
  {
    id: "tiny-harness",
    title: "Build a tiny harness, one responsibility at a time",
    unit: "09 · Build it",
    question: "What is the smallest harness that can produce trustworthy progress?",
    outcome:
      "Assemble a minimal agent loop with explicit state, tools, checks, limits and a human-readable result.",
    intro:
      "A small harness is a laboratory, not a miniature platform. Its value is that every part can be seen: the task enters, context is assembled, the agent chooses a tool, the result is observed, a check runs and the loop either continues or stops. Building this small version makes the contracts in the earlier units concrete.",
    sections: [
      ["Watch a failed test become an observation", "Run the normal demo in the lab kit. The fixture has an off-by-one retry limit. Its first test fails; the scripted model reads the implementation, changes the comparison and asks to finish. Follow the trace and match each observation to the call that produced it.\n\nNow run the false-success demo. The model asks to finish before repairing the fixture. The harness must check the workspace as it exists at that moment and return unverified. A passing test from before the final write would be stale evidence. This is the responsibility you are implementing in v1–v3: execute the allowed requests, return their actual results, and distinguish verified completion from a stop caused by a limit."],
      ["Make a restart expose your assumptions", "For v4–v7, generate a long log, keep the useful failure in context and store the rest as a recoverable artifact. Compact the history into a checkpoint, restart the process, and see whether the next action still follows from the evidence. Change the fixture between saving and resuming: the identity check should detect that the old state no longer describes the workspace.\n\nThe last two milestones add a read-only worker and an event controller. Give the worker a question it could answer with disagreement, then inject a timeout and a report with no evidence. Deliver the same event twice and verify that the controller does not create two independent jobs. These experiments reveal which layer owns each failure; the reference core deliberately leaves these extensions for you to build."],
    ],
    checkpoints: [
      { bridge: "The first implementation should make the loop visible before it makes the loop clever.", meaning: "Explicit state and narrow responsibilities give each later control somewhere to live.", question: "What is the minimum useful harness loop?", answer: "Load a bounded task and context, choose from a small tool set, observe the result, verify the requested outcome and stop with a traceable result.", further: [{ question: "Why keep state explicit?", answer: "It makes resumption, debugging and review possible without treating the transcript as hidden program state." }, { question: "Why start with one task?", answer: "A narrow task exposes the contracts without adding orchestration complexity before the basic loop is trustworthy." }] },
      { bridge: "Every new capability should answer a failure or evidence need you can name.", meaning: "Controls become meaningful when they are tied to observable behaviour.", question: "What should be tested before calling a tiny harness trustworthy?", answer: "Valid and invalid tool inputs, denied actions, timeouts, bounded retries, checkpoint recovery and verification of the final result.", further: [{ question: "Why log tool calls?", answer: "A trace connects the final result to the actions and evidence that produced it." }, { question: "What should happen when verification fails?", answer: "Stop or escalate with the state and evidence preserved; do not report a successful task because the agent produced a plausible explanation." }] },
    ],
    example: ["Build a harness for the retry incident.", ["Make the state visible", "Represent task, revision, context bundle, observations, next question, tool budget and status as explicit fields.", "The run can be inspected and resumed.", "Keeping all progress in an unstructured assistant message."], ["Close the loop", "Expose read_file and run_test, log calls, cap output, run the focused test and emit a diff plus evidence report.", "The harness produces a bounded, reviewable outcome.", "Adding a dozen tools before the first verification path works."]],
    checks: [
      ["What should a tiny harness make explicit?", ["Task state and stopping condition", "Only the model name", "An unlimited prompt"], 0, "Explicit state is the foundation of observation and recovery."],
      ["What should happen when verification fails?", ["Report success anyway", "Preserve state and stop or escalate", "Delete the trace"], 1, "Failure is useful when it remains visible and actionable."],
      ["Why add capabilities one at a time?", ["To connect each control to a real need", "To avoid all testing", "To maximize configuration"], 0, "Incremental construction keeps the trust contract legible."],
    ],
    moreChecks: [
      ["What should a run trace connect?", ["Actions, observations and the final result", "Only the model name", "Unrelated history"], 0, "A trace makes the result inspectable."],
      ["What is a safe first tool set?", ["A few typed, bounded tools", "Unrestricted shell and production access", "No observable tools"], 0, "The first loop should limit effects while exposing the contract."],
      ["What should a checkpoint preserve?", ["State, evidence and the next decision", "Only a success message", "Every token without structure"], 0, "Resumption needs actionable state rather than a raw transcript."],
    ],
    takeaway: "Build the smallest visible loop, then add tools, state, controls and verification only where the evidence demands them.",
    nextConnection: "A working harness is not the finish line. Graduation means deciding where it belongs, what it may do and how you will know it remains worth keeping.",
    source: ["tools", "mcp", "engines"],
    practical: {
      title: "Lab 9 · Extend the tiny harness through v1–v9",
      minutes: 120,
      brief:
        "Download [the lab kit](/agent-labs/agent-labs.zip) or use public/agent-labs in the source checkout. The [lab guide](/agent-labs/README.md) provides commands, extension milestones and failure cases. Work in a disposable directory with Node.js 24 or newer.",
      steps: [
        "Run node --test harness.test.mjs, node demo.mjs, node demo.mjs false-success and node demo.mjs exhausted. Inspect the trace, tool policy and final verification gate.",
        "Rebuild the core loop in your own words or code, then implement v1–v3: one named action, file reads and writes, and explicit stop, timeout and verification behaviour.",
        "Implement v4–v7: context selection, compaction, persistent resume with workspace identity checks, and a hypothesis ledger that separates observations from explanations.",
        "Implement v8–v9: a read-only worker with a bounded return schema and an outer controller that classifies events, deduplicates event IDs and routes results to review.",
        "Optionally connect a live model through a provider adapter. Record its model and adapter versions and keep offline harness tests separate from live-agent evaluation.",
      ],
      deliverables: [
        "A working loop and inspectable trace",
        "Nine milestone notes, each naming the code that owns the new responsibility",
        "Evidence for traversal rejection, false-success rejection, exhaustion, resume, worker failure and duplicate-event handling",
      ],
      review:
        "A complete submission can explain every transition. The lab's scriptedModel is a deterministic test double: it validates harness execution, not a real model's reasoning. Compaction must preserve constraints and evidence pointers; resume must check workspace identity; the worker must have a bounded contract; and the outer controller must not process the same event twice. Use only the disposable fixture unless you have added stronger isolation.",
    },
  },
];
