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
      ["Write the operating model", "Choose one recurring task and state its trigger, scope, environment, context and memory, tools, autonomy boundary, controls, outputs and owner. Name the human decision that remains. Make the workflow small enough to run repeatedly and specific enough to evaluate."],
      ["Run, review and learn", "Use a real benchmark, compare with the current baseline and inspect the misses. Keep the workflow if it produces useful accepted results at a cost and risk the team can live with. Narrow it when evidence is weak. Retire it when the system is no longer worth its maintenance. Graduation is a review cadence, not a one-time launch ceremony."],
    ],
    checkpoints: [
      { bridge: "A production-shaped workflow is a set of explicit promises.", meaning: "The team should be able to state the task, authority, evidence and recovery path without relying on a product demo.", question: "What belongs in an operating model?", answer: "Trigger, task boundary, environment, context and memory, tools, autonomy, controls, outputs, owner and human approval point.", further: [{ question: "Why name an owner?", answer: "Someone must maintain the workflow, review its results and decide when its boundary changes." }, { question: "Why state the human decision?", answer: "It makes the remaining accountability and approval boundary visible instead of implying that the agent owns the whole outcome." }] },
      { bridge: "A launch is only a hypothesis about value until the workflow meets real work.", meaning: "Evidence from repeated operation should control whether the system expands, narrows or ends.", question: "What should happen after a pilot produces mixed results?", answer: "Inspect the failure modes and costs, narrow or redesign the workflow, then run another representative trial. Do not expand scope because the average looks promising.", further: [{ question: "What does a useful review cadence inspect?", answer: "Accepted outcomes, escaped defects, review effort, cost, refusals, stale guidance and changes in the environment." }, { question: "When is retirement a success?", answer: "When the team recognises that the workflow no longer earns its maintenance or risk, and removes it deliberately rather than letting it decay." }] },
    ],
    example: ["A team wants to keep its automated dependency-update workflow.", ["State the promise", "The workflow scans weekly, proposes low-risk updates, runs focused and full checks, produces a diff and never publishes without approval.", "The boundary is understandable and testable.", "Describing it as 'an autonomous maintenance bot.'"], ["Review the evidence", "After four weeks, compare accepted proposals, review minutes, escaped defects, cost and correct refusals with the manual baseline.", "The keep, narrow or retire decision has a basis.", "Expanding to production releases because the first proposal merged cleanly."]],
    checks: [
      ["What is graduation?", ["A bounded workflow with an operating and evidence story", "Unsupervised action by default", "A product demo"], 0, "The system earns a place through clarity and repeated evidence."],
      ["Who owns the workflow?", ["A named team or person", "Nobody after launch", "The model alone"], 0, "Ownership is required for maintenance and boundary decisions."],
      ["What should mixed pilot results cause?", ["Inspection and a narrower next trial", "Automatic expansion", "Hidden reporting"], 0, "Learning should change the operating design."],
    ],
    moreChecks: [
      ["What should a launch-ready workflow state?", ["Scope, authority, evidence and recovery", "Only its schedule", "A promise of autonomy"], 0, "An operating model makes the workflow governable."],
      ["What is a credible baseline?", ["The current way the work is done", "A perfect imagined alternative", "No comparison"], 0, "Value is relative to a real alternative."],
      ["When should a workflow narrow?", ["When evidence shows its current boundary is too risky or costly", "Never", "Whenever the output is short"], 0, "Boundaries should follow operating evidence."],
    ],
    takeaway: "Keep an agentic workflow only when its scope, controls, evidence, cost and ownership make a credible promise to the team.",
    nextConnection:
      "You now have the vocabulary and a small operating loop. The next step is continued practice: run the workflow, review the evidence and let reality refine its boundary.",
    source: ["aw", "outputs", "security"],
    practical: {
      title: "Capstone · Prove one workflow is worth keeping",
      minutes: 60,
      brief:
        "Select one recurring engineering task and produce a launch-ready operating model plus a small evidence-backed pilot.",
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
