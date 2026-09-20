import type { Lesson } from "../lesson";

export const unit03ChooseAndOperate: Lesson[] = [
  {
    id: "landscape",
    title: "The landscape: compare operating modes",
    unit: "03 · Choose and operate",
    question: "Are you choosing a model, a harness or a way of working?",
    outcome:
      "Compare agentic setups by the work they support, the evidence they expose and the control they retain.",
    intro:
      "Choosing an agent from a feature list is like choosing a vehicle by counting cup holders. The useful question is what journey you need to make, what terrain you will cross and how much control you need when conditions change. Models, harnesses and operating practices are separate choices, even when a product presents them as one package.",
    sections: [
      ["Name the layer you are choosing", "A model supplies inference. A harness supplies tools, context handling, permissions and state. A workflow supplies the rhythm of planning, execution, review and approval. Changing one layer does not automatically improve the others. A strong model in a weak harness may be less useful than a modest model with clear tools, narrow permissions and excellent feedback."],
      ["Compare by evidence and control", "Evaluate a setup against a representative task: how quickly does it reach useful evidence, how well can you inspect its decisions, what happens when a tool fails, and how easy is it to stop or resume? Cost and speed matter, but so do reversibility, auditability and the quality of the boundary around the work."],
    ],
    checkpoints: [
      { bridge: "Before comparing products, identify which layer is limiting the work.", meaning: "Model capability, harness capability and workflow design are different levers.", question: "A strong model cannot run the repository's tests. What kind of improvement is needed first?", answer: "A harness or environment improvement. More model capability cannot substitute for a missing tool path.", further: [{ question: "What does a model contribute?", answer: "Inference and generation from the context it receives." }, { question: "What does a harness contribute?", answer: "Tool access, state, permissions, context handling and the ability to observe or constrain actions." }] },
      { bridge: "A comparison becomes meaningful only when it uses the work you actually need to do.", meaning: "The best setup is task-relative, and should be judged by evidence and control rather than a generic leaderboard.", question: "Why run a representative task when comparing two agent setups?", answer: "Because the setup's usefulness depends on the tools, context, verification and failure recovery the real task demands.", further: [{ question: "Why include reversibility in the comparison?", answer: "A fast system that is hard to stop or undo can create more operational risk than it removes." }, { question: "What does auditability buy you?", answer: "It lets a reviewer understand what happened and distinguish a reliable result from a lucky one." }] },
    ],
    example: ["A team is choosing between a polished chat interface and a repository-connected harness.", ["Map the task", "The task needs search, edits, tests, resumable state and reviewable diffs. Score each setup against those needs.", "The comparison reflects the work rather than the product's feature names.", "Choosing the chat interface because its demo answer sounded fluent."], ["Run a small trial", "Use the same retry bug and record time to first useful evidence, failed-tool recovery, verification quality and reviewer effort.", "The decision has observable evidence.", "Measuring only first-response latency."]],
    checks: [
      ["Which layer supplies inference?", ["The model", "The harness", "The review policy"], 0, "Inference is one layer of an agentic setup."],
      ["What is the fairest comparison?", ["A feature checklist", "A representative task with evidence", "A marketing demo"], 1, "Task-relative evidence reveals the trade-offs that matter."],
      ["Why score control?", ["It makes failures reversible and inspectable", "It increases token count", "It hides uncertainty"], 0, "Control is part of usefulness when work can change real systems."],
    ],
    takeaway: "Choose a model, harness and workflow against the evidence and control your real work requires.",
    nextConnection: "A promising operating mode still needs a workplace. The next lesson turns the abstract idea of repository access into a concrete environment contract.",
    source: ["copilot", "codex", "claude", "gemini"],
  },
  {
    id: "environment",
    title: "The environment: give the agent a reproducible workplace",
    unit: "03 · Choose and operate",
    question: "What does 'the agent has repository access' actually guarantee?",
    outcome:
      "Define an environment contract covering identity, tools, state, permissions, network and verification.",
    intro:
      "Giving someone a key to a workshop does not tell them whether the lights work, the right tools are installed or the material on the bench is the right version. Repository access is similarly incomplete. An agent needs a known checkout, commands it can run, dependencies it can resolve, permissions that match the task and a way to tell whether its evidence is current.",
    sections: [
      ["Write the environment contract", "Record the revision, runtime, package manager, required services, test commands, network assumptions, secrets policy and writable paths. Make the contract executable where possible: a setup check should report which prerequisite is missing rather than letting the agent discover it halfway through a change."],
      ["Constrain the blast radius", "Use the narrowest permissions and network access that allow the task. Keep changes reversible through branches, worktrees or patches. Separate credentials for reading from credentials for publishing, and make destructive actions require an explicit boundary. A reproducible workplace is also a safer workplace."],
    ],
    checkpoints: [
      { bridge: "Access is a capability, not a guarantee of usable evidence.", meaning: "The agent must know what it is looking at, what it can run and which actions are permitted.", question: "An agent can read the repository but cannot install dependencies or run tests. Is the environment ready?", answer: "No. It has source access but not a complete verification path. The missing capability should be surfaced before implementation begins.", further: [{ question: "Why record the revision?", answer: "A result tied to an unknown or moving revision is hard to reproduce and may describe code nobody is reviewing." }, { question: "What should a setup check do?", answer: "Report prerequisites and fail clearly before the agent spends time on an investigation it cannot complete." }] },
      { bridge: "The same environment that enables progress can also enable damaging actions.", meaning: "Least privilege, reversibility and explicit publish boundaries turn autonomy into a controlled capability.", question: "Why separate read credentials from publish credentials?", answer: "Most investigations need to inspect more than they need to release. Separating them limits the consequences of a mistaken or compromised action.", further: [{ question: "Why use a worktree or branch?", answer: "It isolates changes, makes review straightforward and provides a clear path to discard or compare the result." }, { question: "What belongs behind an approval boundary?", answer: "Actions with external, destructive or irreversible effects, such as publishing, deleting data or changing production configuration." }] },
    ],
    example: ["An agent is asked to fix a failing service in a fresh checkout.", ["Probe first", "Check the revision, runtime, dependency install, service stubs, test command and writable directories before editing.", "The agent knows whether later evidence will be trustworthy.", "Starting implementation and discovering halfway through that the test service is unavailable."], ["Keep the change contained", "Work on a branch with read-only external access, then produce a diff and test report for review.", "The task remains reversible and inspectable.", "Giving the agent production credentials to avoid a local setup step."]],
    checks: [
      ["Which belongs in an environment contract?", ["Only the repository URL", "Revision, tools, permissions and verification", "The agent's favourite font"], 1, "A workplace contract describes the conditions that make evidence trustworthy."],
      ["What does least privilege reduce?", ["The number of tests", "The blast radius of a mistake", "The need for a task"], 1, "Capabilities should match the work, not exceed it by default."],
      ["Why pin a revision?", ["To make the result reproducible", "To prevent all editing", "To increase latency"], 0, "A known revision anchors the investigation."],
    ],
    takeaway: "Treat the environment as part of the task: make prerequisites visible, permissions narrow and changes reversible.",
    nextConnection: "Some tasks fit one short loop; others span hours or days. The next lesson shows how to keep long-horizon work moving without confusing elapsed time for progress.",
    source: ["security", "copilot"],
  },
  {
    id: "long-horizon",
    title: "Long-horizon work: accumulate evidence, not elapsed time",
    unit: "03 · Choose and operate",
    question: "How can an agent work for longer without losing the thread?",
    outcome:
      "Break extended work into resumable experiments with explicit state, gates and evidence.",
    intro:
      "A long journey is not made reliable by driving faster for longer. It needs landmarks, fuel checks and decisions about when to stop. Long-running agent work is similar. The danger is not simply context length; it is that an agent can spend hours producing activity while losing the original question, repeating failed paths or crossing a boundary nobody meant to cross.",
    sections: [
      ["Make progress legible", "Turn a broad goal into stages with an outcome, evidence and stopping condition for each. At the end of a stage, write what changed, what was learned, what remains uncertain and what the next stage is allowed to do. This creates a trail a person can inspect and a fresh run can resume."],
      ["Use gates, not hope", "Pause before expensive, risky or irreversible transitions. A gate can ask whether the hypothesis still fits, whether the tests are trustworthy and whether the next action remains inside scope. Long-horizon autonomy should be a sequence of bounded commitments, not one large permission slip."],
    ],
    checkpoints: [
      { bridge: "Elapsed time is not evidence of progress.", meaning: "A long task needs observable stage outcomes and resumable state.", question: "An agent has edited twenty files but cannot say which hypothesis the changes test. What is missing?", answer: "A progress contract: the task was not broken into stages with a decision, evidence and stopping condition.", further: [{ question: "What should a stage record?", answer: "The goal, changed artifacts, observations, uncertainty and the next permitted experiment." }, { question: "Why record rejected paths?", answer: "They stop a resumed run from repeating work that already failed to explain the problem." }] },
      { bridge: "Long-horizon work needs moments where autonomy narrows before risk rises.", meaning: "Gates preserve human control at transitions where the next action changes cost, scope or reversibility.", question: "When should a human approval gate appear?", answer: "Before a consequential transition such as publishing, changing production configuration or committing to a broad refactor.", further: [{ question: "What makes a gate useful?", answer: "It has a clear question and evidence to inspect, rather than asking for a vague feeling of confidence." }, { question: "Should every small action need approval?", answer: "No. Excessive gates destroy the benefit of delegation; use them where risk or irreversibility changes." }] },
    ],
    example: ["A migration task may run across several sessions.", ["Divide the route", "Stage one maps callers, stage two adds compatibility, stage three migrates one path, and stage four removes the old path only after evidence.", "Each stage has a smaller proof and a safe stopping point.", "Giving one prompt permission to rewrite every caller and delete the old API."], ["Resume from state", "After each stage, record the revision, tests, unresolved questions and next gate.", "A fresh run can continue without replaying the whole investigation.", "Relying on the transcript as the only memory."]],
    checks: [
      ["What is a useful stage boundary?", ["A time limit only", "A result with evidence and a stopping condition", "A larger prompt"], 1, "Stages make progress inspectable and resumable."],
      ["What does a gate protect?", ["Only prose style", "A consequential transition", "The model's context limit"], 1, "Gates narrow autonomy where risk changes."],
      ["What belongs in resumable state?", ["Only the final answer", "Observations, uncertainty and the next action", "Every token ever produced"], 1, "A handoff needs the reasoning state, not a raw transcript."],
    ],
    takeaway: "Long-horizon work is a chain of bounded experiments, each leaving enough evidence for the next one.",
    nextConnection: "The final lesson in this unit asks the harder question: given the task, environment and horizon, how much autonomy should you buy?",
    source: ["tools", "instructions"],
  },
  {
    id: "choosing",
    title: "Choosing an agent: buy the right amount of autonomy",
    unit: "03 · Choose and operate",
    question: "When is the best agent choice a human?",
    outcome:
      "Match autonomy, cost and review effort to task risk, uncertainty and reversibility.",
    intro:
      "Autonomy is not a trophy. It is a setting. A human should not hand over a task simply because an agent can attempt it, just as a team should not manually repeat a safe, well-specified check that a machine can perform reliably. The useful choice depends on uncertainty, consequence, reversibility and the quality of available evidence.",
    sections: [
      ["Use a risk-adjusted decision", "Automate when the task is bounded, feedback is fast and mistakes are easy to detect or undo. Add review when the work affects users, data, money or public behaviour. Keep a human in the loop when the objective is contested, the evidence is weak or the action is difficult to reverse. Review effort is part of the cost, not a footnote."],
      ["Prefer a smaller promise you can prove", "A modest agent that produces a reviewable patch may beat a powerful agent that takes broad action with opaque evidence. Start with the narrowest autonomy that could deliver value, measure the result and expand only when the failure modes are understood."],
    ],
    checkpoints: [
      { bridge: "The best agent is the one whose level of autonomy matches the task, not the one with the most impressive demo.", meaning: "Risk, uncertainty and reversibility determine how much delegation is sensible.", question: "Which task is the better first candidate for autonomy: formatting a known set of files or deleting production data?", answer: "Formatting the known files. It is bounded, observable and reversible; production deletion demands a much stronger approval boundary.", further: [{ question: "Why does reversibility matter?", answer: "It reduces the cost of a wrong action and makes experimentation safer." }, { question: "When is a human the right choice?", answer: "When the objective or evidence requires judgment that cannot be made legible enough for safe delegation, especially before irreversible consequences." }] },
      { bridge: "Autonomy should expand from evidence, not optimism.", meaning: "Start with a narrow promise, measure the outcome and use what you learn to set the next boundary.", question: "What should a team measure before increasing autonomy?", answer: "Task success, defect escape, review effort, recovery time, cost and the quality of evidence accompanying decisions.", further: [{ question: "Why include review effort?", answer: "A result that takes longer to verify than to produce may not be an efficiency gain." }, { question: "What is a good expansion rule?", answer: "Increase scope only when the existing scope has reliable checks and known recovery paths." }] },
    ],
    example: ["A team wants an agent to own a dependency upgrade.", ["Start at a safe boundary", "Let it inspect the dependency, propose the version change, run the focused tests and produce a diff.", "The team gets useful work with a clear review point.", "Allowing an automatic publish on the first trial."], ["Expand by evidence", "After repeated successful trials, consider automatic branch creation or merge checks, while keeping release changes gated.", "Autonomy grows with demonstrated control.", "Treating a high benchmark score as permission for production actions."]],
    checks: [
      ["What should determine autonomy?", ["Demo excitement", "Risk, uncertainty and reversibility", "The number of tools installed"], 1, "Autonomy is a task decision."],
      ["Why start with a narrow promise?", ["It makes outcomes and failures easier to understand", "It guarantees perfection", "It removes review"], 0, "Small scope creates evidence for the next decision."],
      ["When might a human be the best agent?", ["When the objective is contested or the action irreversible", "For every spelling fix", "Only when no model exists"], 0, "Some decisions need accountable judgment and cannot yet be delegated safely."],
    ],
    takeaway: "Buy the amount of autonomy you can supervise, verify and recover from; expand only when evidence earns it.",
    nextConnection: "With operating choices made, the course can add capabilities deliberately. The next unit introduces tools, MCP and skills as controlled extensions of the harness.",
    source: ["copilot", "codex", "engines"],
    practical: {
      title: "Lab 3 · Choose an autonomy boundary",
      minutes: 30,
      brief:
        "Take one real engineering task and decide which actions an agent may inspect, propose, apply and publish.",
      steps: [
        "Describe the task's uncertainty, consequence, reversibility and available checks.",
        "Draw four boundaries: read, propose, apply and publish.",
        "Run a narrow trial and record success, review effort, recovery and escaped defects.",
        "Use the evidence to keep, narrow or expand one boundary.",
      ],
      deliverables: ["An environment contract", "An autonomy boundary map", "A trial report with an expansion decision"],
      review:
        "A good decision explains why each boundary matches the task's risk and names the evidence that would justify changing it. 'The agent seemed capable' is not enough.",
    },
  },
];
