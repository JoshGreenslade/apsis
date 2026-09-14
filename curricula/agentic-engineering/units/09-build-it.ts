import type { Lesson } from "../lesson";
export const unit09BuildIt: Lesson[] = [
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
      "Throughout this course, the car and the mechanic have been a way of talking about someone else’s machinery, something you were diagnosing, comparing, or delegating to, but never actually building yourself. This lesson changes that. It is the moment you put on the overalls and build the smallest possible working engine yourself, not because you need to become a professional mechanic, but because there is a kind of understanding that only shows up once you have assembled something with your own hands and watched, first-hand, exactly which part does which job.\n\nBegin with the smallest version that actually makes every one of its responsibilities visible: a goal, a model’s response to that goal, a resulting tool request, the execution of that request, and an observation handed back to the model so it can decide what comes next. Do not start by reaching for some large, feature-complete framework whose internals you cannot yet explain in your own words. A framework like that hides exactly the seams this exercise is designed to show you.\n\nThe supplied lab kit gives you a working offline reference loop, a repository fixture that has been deliberately broken on purpose, and a set of evaluation utilities to check your work against. Its scripted model is a test double, not a genuinely intelligent agent, and it is worth being clear-eyed about that distinction: it exists so you can exercise execution paths and failure paths in a fully controlled, repeatable way, without needing any credentials, and without any of the variability a real model would introduce. Connecting an actual live model is a separate exercise in its own right, one with its own separate tests, and it comes later, once the harness underneath it is already solid.",
    sections: [
      [
        "v1–v3: an action loop with an honest ending",
        "Start with v1: a model, and nothing more than a shell to act through. In the lab, that shell access is deliberately narrowed down to one explicit, allowlisted command that runs the fixture’s test, and nothing else. Observe its nonzero exit code, and return that exact result back to the model as its next observation. Do not, on your own everyday machine, let an untrusted model execute arbitrary commands of its own choosing; the restriction here is a narrow allowlist, not a claim that anything resembling full operating-system sandboxing is happening.\n\nIn v2, add read_file and write_file. Resolve every path strictly inside the disposable workspace, and reject anything that looks like path traversal, or a symlink pointing somewhere it shouldn’t. Give each call its own ID, so a returned observation can always be matched back to the specific request that produced it. Run a full sequence end to end: read the fixture, apply the one small fix the task actually calls for, and rerun the test to confirm it now passes.\n\nIn v3, add a maximum turn count, a per-call timeout, and explicit complete, blocked, and exhausted states for how a run is allowed to end. A model’s own request to finish is a claim, nothing more; verify the acceptance tests directly against the final state of the workspace before ever accepting that claim as true. A test that passed before the very last write was made is already stale evidence by the time you actually look at it.",
      ],
      [
        "v4–v7: preserve useful state without hiding uncertainty",
        "In v4, select which tool output is actually worth keeping in full, and preserve pointers to the rest as artifacts rather than the whole thing. Deliberately generate a very long log at some point, and check that the one genuinely useful failure buried inside it is still recoverable afterward. In v5, replace old interaction history with a proper checkpoint: goal, constraints, observations so far, and the next intended action. Compare behaviour carefully before and after this kind of compaction, using the exact same scripted sequence of responses both times, so you can be sure any difference you see came from the compaction itself.\n\nIn v6, persist that checkpoint to an actual task-state file living outside the fixture. Restart the whole process, and revalidate the workspace’s revision, or its content fingerprint, before resuming from that saved state. Durable state of this kind must never be allowed to silently attach itself to a different task than the one it was actually written for. In v7, add a genuine hypothesis ledger: record the evidence for and against each hypothesis, and name the specific experiment that would actually discriminate between them. A bare confidence label, on its own, is not evidence of anything.\n\nThe reference loop supplied with the lab kit already implements the bounded execution core, the verification step, and the saving of raw observations. You are the one who implements compaction and hypothesis tracking yourself, as explicit extensions, checked against the acceptance tests below. This is deliberate: it keeps the starting code small enough that you can actually hold the whole thing in your head at once.",
      ],
      [
        "v8–v9: introduce one worker, then an outer controller",
        "In v8, add exactly one read-only worker, running in its own separate context, with a narrow, specific return schema: a finding, references to whatever evidence supports it, and a stated degree of uncertainty. Give it one bounded question, and deliberately test its behaviour under timeout, under contradiction, and under an empty result. Keep exactly one writer for the fixture throughout, a function that is merely named spawn_agent, but that quietly just repeats whatever the parent already concluded, is not independent verification of anything, whatever its name suggests.\n\nIn v9, add an outer controller that classifies a fixture event as either worth investigating or worth ignoring, chooses the appropriate task, invokes the harness itself, and routes whatever artifact comes back to review. Use a stable event ID to actively suppress duplicate work on the same underlying trigger. Keep this event-handling logic clearly outside the inner model loop, so you can genuinely test each of the two layers on its own, independently of the other.\n\nIf and when you connect a real model, translate whatever the provider actually returns into the reference loop’s own decision shape. Validate every single tool argument, and preserve every conversation item and call ID the provider actually requires you to keep. Handle refusal, malformed output, multiple simultaneous calls, and transient failures all explicitly, rather than hoping they simply will not occur. The OpenAI function-calling guide linked below documents one particular provider’s interaction contract; any other provider will need its own separate adapter, built with the same care.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Everything you have studied so far becomes concrete the moment you implement the smallest version yourself and watch each responsibility do its job.",
        meaning:
          "A model’s finish request is only a claim; the harness must independently verify acceptance against the final workspace state, since a passing test observed before the last write is already stale evidence.",
        question:
          "The scripted model requests completion right after writing a fix, but before the harness reruns the acceptance test. Should that request be accepted as done?",
        answer:
          "No. Completion must be checked against the final workspace state; a request to finish is not itself evidence that the fix is correct.",
        further: [
          {
            question:
              "A harness accepts a model's 'done' claim purely on the model's stated confidence, without rerunning anything. What failure mode does this reproduce?",
            answer:
              "The false-success problem studied earlier: a confident claim substitutes for actual verification, and the harness has no way to catch a claim that doesn't match the true workspace state.",
          },
          {
            question:
              "Why does the acceptance check need to run against the workspace as it exists at the moment of the finish request, not against an earlier snapshot?",
            answer:
              "The workspace can change between when a test was last run and when completion is requested; checking a stale snapshot could accept a fix that a later edit silently broke, or reject one that a later edit silently fixed.",
          },
        ],
      },
      {
        bridge:
          "Once the loop works, the next problem is keeping useful state alive as history grows too long to keep in full.",
        meaning:
          "Compaction must preserve goal, constraints and evidence, not just the most recent messages; a resumed run’s identity should be revalidated against the actual workspace, since durable state tied to an old revision is a starting hypothesis, not settled fact.",
        question:
          "After restarting the harness process and reloading a saved checkpoint, should the harness immediately resume without checking anything?",
        answer:
          "No. It should revalidate the workspace’s revision or content fingerprint first, since the checkpoint may no longer match the current state.",
        further: [
          {
            question:
              "A compaction step keeps only the most recent ten messages and discards everything else. What is the risk to a long-running investigation?",
            answer:
              "The discarded messages may have contained the original goal, an established constraint, or key evidence gathered earlier; losing them can cause the agent to lose track of what it was actually trying to establish.",
          },
          {
            question:
              "Why treat a resumed checkpoint's recorded state as a 'starting hypothesis' rather than settled fact?",
            answer:
              "Time may have passed since the checkpoint was written, during which the workspace could have changed through another process or a manual edit, so the checkpoint's assumptions need re-confirming before being trusted again.",
          },
        ],
      },
      {
        bridge:
          "With a solid single loop working, the last extensions add another agent and an outer trigger — each with its own contract to get right.",
        meaning:
          "A worker must return a bounded finding with evidence and uncertainty rather than simply echoing the parent’s assumptions; an outer controller must track stable event identity so the same trigger is not processed as new work twice.",
        question:
          "A function called spawn_agent always returns a result agreeing with the parent’s existing conclusion. Does this constitute independent verification?",
        answer:
          "No. A worker that merely repeats the parent’s premise provides no new evidence and cannot function as independent verification.",
        further: [
          {
            question:
              "An outer controller processes a repository webhook event but has no way to recognise that the same event was already handled once before. What concrete problem results?",
            answer:
              "The same underlying trigger can be treated as new work more than once, causing duplicate investigations or duplicate published results for what was actually a single event.",
          },
          {
            question:
              "Why should a worker's return value include its supporting evidence rather than just a bare conclusion, even inside a tiny, minimal harness?",
            answer:
              "Without evidence attached, the parent has no way to judge whether the worker's conclusion is well-supported or just an assertion, which reintroduces the same false-success risk the harness was built to guard against.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A harness accepts a finish request based only on the model's stated confidence. What risk does this reproduce?",
        [
          "Nothing; confidence is a reliable signal",
          "The false-success problem, where a claim substitutes for actual verification",
          "Faster completion with no downside",
        ],
        1,
        "A model's claim of success is not itself evidence; only checking the actual workspace state verifies it.",
      ],
      [
        "A resumed checkpoint is treated as settled fact without revalidation. What can go wrong?",
        [
          "Nothing; checkpoints are always current",
          "The workspace may have changed since the checkpoint was written, invalidating its assumptions",
          "Revalidation is only needed for the first checkpoint",
        ],
        1,
        "A checkpoint's state can go stale; it should be re-confirmed against the live workspace before resuming.",
      ],
      [
        "A worker always echoes the parent's existing conclusion when asked to verify it. What is this missing?",
        [
          "Speed",
          "Genuine independent evidence that could actually contradict the parent",
          "A confident tone",
        ],
        1,
        "Independent verification requires the possibility of disagreement backed by new evidence, not agreement by default.",
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
    nextConnection:
      "Building the harness proves you can locate every responsibility in the stack. The final lesson asks whether the resulting system is actually worth keeping.",
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
];
