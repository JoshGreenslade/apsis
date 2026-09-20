import type { Lesson } from "../lesson";

export const unit10ProveTheValue: Lesson[] = [
  {
    id: "graduation",
    title: "Graduation: build a workflow worth keeping",
    unit: "10 · Prove the value",
    question: "Does your agent system actually save engineering time?",
    outcome:
      "Turn the course principles into a bounded operating workflow with evidence, ownership, review and a plan for learning.",
    intro:
      "Graduation is not the moment an agent runs without supervision. It is the moment the team can explain what the system is for, what it is allowed to do, how its results are checked and what happens when it fails. A workflow worth keeping earns its place through accepted outcomes and a credible operating story.",
    sections: [
      ["Write the operating model", "Choose a task small enough to operate repeatedly. For example: after a retry-test failure, inspect that run and produce a draft diagnosis with links to the relevant evidence. Do not include automatic repair, merge and release merely because the engine can perform them.\n\nWrite down where the job runs, what it may read or change, how it recognises a duplicate event, and where the result appears. Name the person responsible for reviewing it and the person who can disable it. They may be the same person, but the responsibility should not be implicit.\n\nThe earlier chapters supply the rest of the operating details: context and memory, tool permissions, limits and verification. Keep only what this workflow needs. A clear small system is a better graduation project than a large diagram whose failure paths nobody can explain."],
      ["Run, review and learn", "Run the workflow on your benchmark, then inspect the individual misses alongside the scores. Suppose it handles ordinary timeout failures well but invents explanations when logs are incomplete. That finding suggests a narrower service: draft diagnoses when the required evidence is present, and request missing artifacts otherwise.\n\nCompare review effort and accepted results with the current way of doing the work. Record the limits of the trial; a few successful cases justify further use under observation, not unlimited authority.\n\nSet a review date and decide what would make you stop: repeated unsupported findings, costs above the agreed limit, or an owner who no longer has time to maintain it. Keeping, narrowing and retiring are all legitimate engineering decisions. The course ends when you can make that decision with evidence, not when the automation merely runs."],
    ],
    checkpoints: [
      { bridge: "A production-shaped workflow is a set of explicit promises.", meaning: "The team should be able to state the task, authority, evidence and recovery path without relying on a product demo.", question: "What belongs in an operating model?", answer: "Trigger, task boundary, environment, context and memory, tools, autonomy, controls, outputs, owner and human approval point.", further: [{ question: "Why name an owner?", answer: "Someone must maintain the workflow, review its results and decide when its boundary changes." }, { question: "Why state the human decision?", answer: "It makes the remaining accountability and approval boundary visible instead of implying that the agent owns the whole outcome." }] },
      { bridge: "A launch is only a hypothesis about value until the workflow meets real work.", meaning: "Evidence from repeated operation should control whether the system expands, narrows or ends.", question: "What should happen after a pilot produces mixed results?", answer: "Inspect the failure modes and costs, narrow or redesign the workflow, then run another representative trial. Do not expand scope because the average looks promising.", further: [{ question: "What does a useful review cadence inspect?", answer: "Accepted outcomes, escaped defects, review effort, cost, refusals, stale guidance and changes in the environment." }, { question: "When is retirement a success?", answer: "When the team recognises that the workflow no longer earns its maintenance or risk, and removes it deliberately rather than letting it decay." }] },
    ],
    example: ["A team wants to keep its automated dependency-update workflow.", ["State the promise", "The workflow scans weekly, proposes low-risk updates, runs focused and full checks, produces a diff and never publishes without approval.", "The boundary is understandable and testable.", "Describing it as 'an autonomous maintenance bot.'"], ["Review the evidence", "After four weeks, compare accepted proposals, review minutes, escaped defects, cost and correct refusals with the manual baseline.", "The keep, narrow or retire decision has a basis.", "Expanding to production releases because the first proposal merged cleanly."]],
    checks: [
      ["What is graduation?", ["Unsupervised action by default", "A bounded workflow with an operating and evidence story", "A product demo"], 1, "The system earns a place through clarity and repeated evidence."],
      ["Who owns the workflow?", ["Nobody after launch", "The model alone", "A named team or person"], 2, "Ownership is required for maintenance and boundary decisions."],
      ["What should mixed pilot results cause?", ["Automatic expansion", "Inspection and a narrower next trial", "Hidden reporting"], 1, "Learning should change the operating design."],
    ],
    moreChecks: [
      ["What should a launch-ready workflow state?", ["Only its schedule", "Scope, authority, evidence and recovery", "A promise of autonomy"], 1, "An operating model makes the workflow governable."],
      ["What is a credible baseline?", ["A perfect imagined alternative", "No comparison", "The current way the work is done"], 2, "Value is relative to a real alternative."],
      ["When should a workflow narrow?", ["Never", "Whenever the output is short", "When evidence shows its current boundary is too risky or costly"], 2, "Boundaries should follow operating evidence."],
    ],
    takeaway: "Keep an agentic workflow only when its scope, controls, evidence, cost and ownership make a credible promise to the team.",
    nextConnection:
      "You now have the vocabulary and a small operating loop. The next step is continued practice: run the workflow, review the evidence and let reality refine its boundary.",
    source: ["aw", "outputs", "security"],
    practical: {
      title: "Capstone · Prove one workflow is worth keeping",
      minutes: 60,
      brief:
        "Select one recurring engineering task and produce an operating proposal plus a small evidence-backed pilot. Use the pilot to decide what further work is needed before launch.",
      steps: [
        "Write the task contract, environment contract, autonomy boundary, tools, controls, outputs and owner.",
        "Create three to five representative benchmark cases with independent checks.",
        "Run the workflow against the cases and record accepted outcomes, review effort, cost, defects and refusals.",
        "Choose keep, narrow, redesign or retire, and define the next review date and evidence threshold.",
      ],
      deliverables: [
        "An operating model",
        "A versioned benchmark and evidence scorecard",
        "A keep, narrow, redesign or retire decision",
      ],
      review:
        "A strong capstone is specific enough that another engineer could operate it and sceptical enough to name the failure evidence that would change the decision. The best result may be a deliberately small workflow or a clear decision not to automate yet.",
    },
  },
];
