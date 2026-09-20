import type { Lesson } from "../lesson";

export const unit08EvaluateQualityAndEconomics: Lesson[] = [
  {
    id: "evaluation",
    title: "Evaluation: measure accepted engineering work",
    unit: "08 · Evaluate quality and economics",
    question: "What does an agent's success rate hide?",
    outcome:
      "Design evaluation around accepted outcomes, defect escape, review effort and the quality of evidence.",
    intro:
      "A score can tell you that something changed without telling you whether the change mattered. An agent that produces ten green-looking patches may be less useful than one that produces four accepted patches if the other six need repair. Evaluation should follow the work to the point where a person can responsibly accept it.",
    sections: [
      ["Define the unit of success", "Decide what you will count before running the pilot. For a patch task, acceptance might mean that the requested behaviour works, the diff stays within scope and a reviewer would merge it. For investigation, a correct diagnosis with supporting evidence may be enough; requiring a patch would reward unnecessary changes.\n\nKeep a row for every attempted task, including timeouts and abandoned runs. Record whether the first result was accepted, whether a person repaired it, or whether it remained unresolved. A repaired patch may still be useful, but it should not look identical to one that needed no intervention.\n\nSome tasks should end in refusal or escalation. Define those cases in advance too, so a system cannot improve its apparent success rate by declining everything difficult."],
      ["Measure the human boundary", "One agent takes four minutes to produce a patch and leaves the reviewer twenty minutes of detective work. Another takes eight minutes but points to a small diff, a relevant regression test and one unverified assumption. Generation speed favours the first; the engineer may finish sooner with the second.\n\nMeasure active review and repair time, and keep it separate from elapsed waiting. Note what made a result hard to assess: unrelated edits, missing commands, an unsupported claim, or an explanation that never gets to the point. Those notes tell you what to improve in a way that a single satisfaction score cannot.\n\nAlso revisit accepted work. An error discovered after merge is a defect escape, not evidence that the original acceptance was correct."],
    ],
    checkpoints: [
      { bridge: "Evaluation starts where the work becomes acceptable, not where the model stops speaking.", meaning: "The unit of measurement should connect to the decision the engineering team actually cares about.", question: "Why is 'the agent produced a patch' a weak success metric?", answer: "A patch can be out of scope, unverified, wrong or expensive to review. Production is not acceptance.", further: [{ question: "What is defect escape?", answer: "An error that passes the local workflow and is discovered later, where recovery is more costly." }, { question: "Why measure refusal?", answer: "Correctly declining an unsafe or underspecified task can be a successful outcome." }] },
      { bridge: "The human boundary is part of the system's performance.", meaning: "Review and recovery effort can erase apparent gains from faster generation.", question: "Two systems produce equally correct patches, but one takes twice as long to review. Which metric is missing?", answer: "Review effort or time to acceptance. Correctness alone does not capture the operational result.", further: [{ question: "What is false confidence?", answer: "A result that looks certain or complete while omitting evidence or hiding uncertainty." }, { question: "Why keep qualitative notes?", answer: "Some important failure patterns, such as confusing explanations or poor handoffs, are not visible in a single numeric score." }] },
    ],
    example: ["A team reports that an agent completes 80% of coding tasks.", ["Define completion", "Count a task complete only when the requested behaviour passes its checks, the diff is in scope and review accepts it without repair.", "The metric now follows the real boundary.", "Counting any non-empty patch as a success."], ["Add cost and failure detail", "Track review minutes, rework, escaped defects, correct refusals and evidence quality alongside completion.", "The team can see where the system helps and where it creates debt.", "Optimising the one number that is easiest to improve."]],
    checks: [
      ["What is a strong success unit?", ["An accepted, evidenced outcome", "A generated paragraph", "A token count"], 0, "Evaluation should follow work to acceptance."],
      ["What does review time measure?", ["Human boundary cost", "Model size", "Prompt length only"], 0, "Review is part of the operating result."],
      ["Can refusal be successful?", ["Yes, when the task is unsafe or underspecified", "Never", "Only when it uses more tokens"], 0, "Correct boundaries are valuable behaviour."],
    ],
    takeaway: "Measure accepted outcomes, escaped defects, review effort and evidence, not just output volume or first-pass speed.",
    nextConnection: "A useful metric needs representative tasks. The next lesson shows how to build a benchmark from the work your team has actually seen.",
    source: ["tools", "copilot"],
  },
  {
    id: "benchmark",
    title: "Build a benchmark from your own engineering history",
    unit: "08 · Evaluate quality and economics",
    question: "How do you test an agent without creating a toy contest?",
    outcome:
      "Create a representative, versioned benchmark with task diversity, hidden checks and a review protocol.",
    intro:
      "A benchmark built from easy puzzles can reward clever test-taking rather than useful engineering. The best starting material is your own history: bugs that took time, changes that needed review, incidents that exposed missing context and tasks where humans disagreed about the right result. A good benchmark preserves the ambiguity and evidence shape of real work while making evaluation repeatable.",
    sections: [
      ["Sample the work, not the demos", "Take a resolved retry incident and reconstruct the starting point: the revision before the fix, the original failure report and the evidence available at the time. Keep the eventual patch and diagnosis out of the agent's inputs. Otherwise you may be measuring its ability to follow an answer that the original engineer had to discover.\n\nWrite down what a correct result must preserve, and allow alternative implementations that meet that contract. A hidden check can test a required edge case, but it should not introduce a secret requirement that no reasonable reader could infer from the task.\n\nThen broaden the sample. Include a routine repair, a task with misleading documentation, and a case where the right response is to request missing information. A handful of cases can uncover useful failures; it cannot establish a reliable ranking for every kind of engineering work."],
      ["Version the benchmark", "Tasks drift as code and dependencies change. Pin revisions, update expected results deliberately and record why a task was retired or changed. Run a human baseline when possible, and compare not only success but time, review effort, refusal quality and failure modes."],
    ],
    checkpoints: [
      { bridge: "A benchmark is a sample of work, not a trophy shelf.", meaning: "Representative difficulty and task variety matter more than a clean story about average performance.", question: "Why include ambiguous and failed historical tasks?", answer: "They test whether the system can ask, bound scope and recover, rather than only solve well-formed exercises.", further: [{ question: "Why pin a revision?", answer: "Without a stable environment, score changes may reflect repository drift instead of system improvement." }, { question: "Why include a human baseline?", answer: "It provides context for the cost and difficulty of the work instead of assuming automation should be perfect." }] },
      { bridge: "Repeatability requires the benchmark itself to have a lifecycle.", meaning: "Tasks, checks and accepted answers must be maintained as the engineering environment changes.", question: "A benchmark task now fails because an API was intentionally changed. What should happen?", answer: "Version or retire the task deliberately, record the reason and avoid treating the changed expectation as a model regression.", further: [{ question: "What should hidden checks protect?", answer: "Important behaviour the agent should discover through the contract and evidence, not merely copy from visible tests." }, { question: "Why record acceptable alternatives?", answer: "Good engineering can have more than one implementation; the benchmark should not punish a correct alternative arbitrarily." }] },
    ],
    example: ["Build a retry benchmark from incident history.", ["Select varied cases", "Include a straightforward timeout bug, an ambiguous race, a task with stale documentation and a case that should be refused because production access is missing.", "The set tests capability and judgement.", "Using five nearly identical toy prompts."], ["Define the review", "Pin the repository revisions, hide one behavioural check, record the human baseline and score acceptance plus review effort.", "Results remain interpretable.", "Comparing raw answer length."]],
    checks: [
      ["What makes a benchmark representative?", ["Varied real task shapes", "Only easy examples", "One repeated prompt"], 0, "Engineering work includes ambiguity, risk and different horizons."],
      ["Why version tasks?", ["To distinguish system change from environment drift", "To prevent maintenance", "To hide failures"], 0, "Benchmarks are living artefacts."],
      ["What should a benchmark allow?", ["Only one exact implementation", "Correct alternatives with evidence", "No review"], 1, "Good evaluation recognises valid engineering choices."],
    ],
    takeaway: "Build benchmarks from real work, pin their conditions, include human judgement and maintain them as carefully as code.",
    nextConnection: "Scores tell you where to look; verification tells you whether a particular claim is supported. The next lesson builds that evidence chain.",
    source: ["copilot", "codex", "claude", "gemini"],
  },
  {
    id: "verification",
    title: "Verification: connect every claim to evidence",
    unit: "08 · Evaluate quality and economics",
    question: "What would make you trust an agent's report?",
    outcome:
      "Match claims to independent evidence and distinguish execution status from behavioural correctness.",
    intro:
      "A lab result is persuasive because it says what was measured, under which conditions and with what uncertainty. An agent's 'all done' is not a lab result. Verification means connecting the important claims in the report to evidence that could reveal the claim is false.",
    sections: [
      ["Build a claim-evidence map", "Take the claim 'retries now stop after three attempts'. Lint cannot establish it. A focused test that counts calls under repeated timeouts can. Better still, show that the regression test fails on the old implementation and passes on the new one: that checks whether the test can detect this particular mistake.\n\nDifferent claims need different evidence. The diff can show that the public signature is unchanged. A behavioural check can show which error reaches the caller. Neither establishes that an unavailable integration environment will behave correctly.\n\nAn agent-written test is useful, but the test and patch may share the same mistaken interpretation. Compare both with the task contract, or use a separate check. Where evidence stops, say so: 'local behaviour verified; integration compatibility not checked' is a useful result."],
      ["Verify the boundaries", "Check scope, negative cases, permissions, generated artefacts and failure handling, not only the happy path. A command can exit successfully while testing the wrong revision or skipping the relevant suite. Verification asks what happened, what was actually checked and what remains outside the evidence."],
    ],
    checkpoints: [
      { bridge: "A result becomes trustworthy through the relationship between claim and evidence.", meaning: "The evidence should be specific enough to fail when the claim is false.", question: "An agent says 'the retry bug is fixed' and links only to a passing lint command. What is missing?", answer: "A behavioural check that exercises retry success, exhaustion and error handling on the intended revision.", further: [{ question: "Why prefer independent evidence?", answer: "The agent's explanation may repeat the same mistaken assumption as the implementation." }, { question: "What should an assumption look like?", answer: "A clearly labelled claim with a stated basis and a next check, not a hidden premise." }] },
      { bridge: "Verification includes what did not happen.", meaning: "Scope, skipped checks and external effects matter as much as green commands.", question: "The tests pass, but the changed file is outside the requested package. Is the task verified?", answer: "No. Scope is part of correctness, and the successful tests may not cover the intended result.", further: [{ question: "Why inspect skipped tests?", answer: "A green summary can conceal that the relevant evidence was never executed." }, { question: "What is verification of an external effect?", answer: "A bounded check that the intended side effect occurred, with the right identity and without unintended changes." }] },
    ],
    example: ["An agent reports that a dependency upgrade is complete.", ["Map the claims", "Check the version diff, lockfile, focused tests, full suite status, security advisory result and whether unrelated packages changed.", "Each part of the report has inspectable evidence.", "Accepting the agent's summary as the only proof."], ["Record the gaps", "Mark the integration environment unavailable and state that production compatibility remains unverified.", "Uncertainty stays visible instead of becoming a false guarantee.", "Writing 'verified' because local tests passed."]],
    checks: [
      ["What should support a claim?", ["Specific evidence that could disprove it", "Confidence alone", "A longer explanation"], 0, "Verification needs a checkable relationship."],
      ["What does a green command not prove?", ["That the right behaviour and scope were checked", "That the process ran", "That some output existed"], 0, "Execution status and task correctness are distinct."],
      ["How should unavailable evidence be reported?", ["As verified anyway", "As an explicit gap or assumption", "By deleting the task"], 1, "Uncertainty is part of an honest result."],
    ],
    takeaway: "Make claims inspectable: name the evidence, verify the boundaries and report what remains unknown.",
    nextConnection: "Once you know which results are acceptable, you can price the work honestly. The next section includes the review, repair and failed attempts that a model invoice leaves out.",
    source: ["security", "outputs"],
  },
  {
    id: "economics",
    title: "Economics: cost per accepted result",
    unit: "08 · Evaluate quality and economics",
    question: "When does automation cost more than doing the work?",
    outcome:
      "Compare agentic work using total cost, acceptance rate, review effort, recovery and opportunity value.",
    intro:
      "The model bill is easy to find. The twenty minutes spent repairing a patch may be hidden in somebody's afternoon. A workflow can therefore look cheap on a dashboard while making the team busier.\n\nThe comparison we need follows the task all the way to acceptance. What did it cost to get a useful result, and what would the team have spent getting that result another way?",
    sections: [
      ["Count the whole loop", "Suppose ten attempted tasks cost 30 currency units in model and tool usage. Review and repairs take 90 active minutes, valued for this example at 60 units per hour. Six results are accepted.\n\nThe batch cost is 30 + 90 = 120 units, or 20 per accepted result. Dividing by ten would give 12, but that would price an attempt rather than a useful outcome. The failed attempts still consumed resources and belong in the numerator.\n\nThis simplified calculation excludes setup and ongoing maintenance; a real comparison should allocate those too. Track elapsed waiting separately from active labour. An unattended hour is not automatically an hour of salary cost, although a delayed result may have business consequences.\n\nCompare with a credible manual baseline for similar work. Then inspect the expensive failures rather than stopping at the average. A rare incident can outweigh many small savings."],
      ["Value learning and capacity carefully", "Some systems are worthwhile because they shorten time to evidence, improve consistency or free people for harder work even when direct savings are modest. Make those benefits explicit, and compare them with the opportunity cost of building and operating the system."],
    ],
    checkpoints: [
      { bridge: "The bill for agentic work arrives in more places than the API invoice.", meaning: "Total cost includes the human and operational work around the generated result.", question: "Why can a lower token price fail to make a workflow cheaper?", answer: "If it produces more errors, review and recovery, the total cost per accepted result can rise.", further: [{ question: "Why measure variance?", answer: "Rare, expensive failures can dominate the economics even when the average run looks attractive." }, { question: "What is opportunity cost?", answer: "The valuable work people could have done instead of reviewing, maintaining or recovering the automation." }] },
      { bridge: "Not every benefit appears as immediate cash saving.", meaning: "Speed to evidence, consistency and capacity can matter, but they should be stated and tested rather than assumed.", question: "A workflow costs about the same as manual work but gives engineers reliable evidence earlier. Can it still be valuable?", answer: "Yes, if the earlier evidence improves decisions or frees scarce expertise, and the benefit is measured against the real alternative.", further: [{ question: "What is the right denominator?", answer: "Accepted, useful outcomes or decisions, not raw attempts or generated text." }, { question: "When should a workflow be retired?", answer: "When its total cost or risk exceeds the value of accepted results and learning it provides." }] },
    ],
    example: ["Compare manual triage with an agentic triage workflow.", ["Count the loop", "Include setup, model calls, tool calls, reviewer minutes, false escalations and missed incidents for both approaches.", "The comparison reflects operating reality.", "Comparing only per-call API cost."], ["Make a boundary decision", "Keep automation for low-risk classification, route ambiguous or high-impact cases to a human and review the error sample monthly.", "Economics and risk inform the operating design together.", "Optimising volume while ignoring escaped incidents."]],
    checks: [
      ["What is the useful denominator?", ["Accepted outcomes", "Tokens generated", "Number of prompts"], 0, "Economics should follow useful work."],
      ["What belongs in total cost?", ["Review and recovery", "Only model price", "Only developer salary"], 0, "The loop has operational and human costs."],
      ["Can equal direct cost still be valuable?", ["Yes, if measured capacity or decision quality improves", "Never", "Only with more tokens"], 0, "Opportunity value can matter when it is real and evidenced."],
    ],
    takeaway: "Compare total cost per accepted result, including review, recovery, variance and the value of capacity released.",
    nextConnection: "You have a way to judge quality and cost. Next, use those criteria to choose an operating mode and prepare an environment where its evidence will be reliable.",
    source: ["engines"],
    practical: {
      title: "Lab 4 · Run an honest evaluation",
      minutes: 45,
      brief:
        "Use three to five real or reconstructed tasks to compare an agentic workflow with the current human baseline.",
      steps: [
        "Define accepted outcome, defect escape, review effort and correct refusal before running anything.",
        "Pin the task revisions and record the evidence available to the agent.",
        "Run the workflow and score claims against independent checks.",
        "Calculate cost per accepted result and write one boundary change justified by the evidence.",
      ],
      deliverables: ["A small versioned benchmark", "A claim-evidence scorecard", "A total-cost comparison and decision"],
      review:
        "The evaluation should reveal at least one limitation, not merely produce a flattering average. A credible conclusion says what the system can do, what it cannot yet do and what evidence would change the boundary.",
    },
  },
];
