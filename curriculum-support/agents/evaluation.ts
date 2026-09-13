import type { Lesson } from "./course-builder";
export const evaluation: Lesson[] = [
  {
    id: "evaluation",
    title: "Evaluation: measure accepted engineering work",
    unit: "08 · Evaluate quality and economics",
    question: "What does an agent’s success rate hide?",
    outcome:
      "Define success, intervention, elapsed time, cost, regressions and unnecessary changes before comparing runs.",
    intro:
      "Two agents each solve eight of ten tasks. The first needs a developer to repair every patch; the second finishes its eight without intervention. A single success-rate number treats them as equal because it has hidden the work you wanted the agent to remove.\n\nDefine the unit of success before running an evaluation. For engineering tasks, a useful unit is an accepted result that satisfies the task’s behavioural and scope criteria, with the amount of human assistance recorded.",
    sections: [
      [
        "Separate outcome from effort",
        "Track whether acceptance criteria pass, whether regressions appear and whether unnecessary changes were introduced. Also record human interventions, active review/repair minutes, wall-clock duration and usage/runtime cost. A patch can be technically correct but economically unattractive if review takes longer than doing the task directly.\n\nDo not remove failed runs from the denominator. A timeout and an environment blocker are important outcomes. You may analyse them separately, but excluding them silently makes reliability look better than it is. Record whether success required intervention so autonomous completion and assisted completion remain distinguishable.",
      ],
      [
        "Use cases that reveal different failures",
        "Include routine edits, cross-file changes, ambiguous investigations and negative cases where no change is warranted. Use representative tasks from your own work rather than choosing only ones a favourite tool already handles well. Keep the expected outcome private from the agent when it would reveal the solution.\n\nSmall samples are noisy. Report raw counts and task categories, not just a precise-looking percentage. Repeat selected cases to learn whether outcomes are stable. Evaluation is a way to find where a system is useful and where it needs supervision; it is not a ceremony for choosing a winner in advance.",
      ],
    ],
    example: [
      "Agent A and B each have 8 accepted outcomes from 10 tasks.",
      [
        "Expose intervention",
        "A needed repairs on six accepted tasks; B needed one clarification on one task. Record autonomous and assisted acceptance separately.",
        "The user wants to know how much engineering responsibility can be delegated.",
        "Counting human-repaired output as unassisted agent success.",
      ],
      [
        "Inspect scope and regressions",
        "Compare unnecessary edits and post-acceptance defects by task category. Keep failed and timed-out runs in the report.",
        "A headline rate can hide costly side effects and selection bias.",
        "Discarding inconvenient failures as not representative after seeing the result.",
      ],
    ],
    checks: [
      [
        "Which denominator belongs in an honest attempt success rate?",
        [
          "Only completed runs",
          "All defined attempts, with failure categories reported",
          "Only runs the model liked",
        ],
        1,
        "Excluding failures or timeouts silently inflates the rate.",
      ],
      [
        "Why record human intervention?",
        [
          "To punish engineers",
          "Because it changes the amount of autonomy and effort saved",
          "Because all intervention makes a result worthless",
        ],
        1,
        "An assisted result can still be useful, but it is different from an autonomous one.",
      ],
      [
        "Ten runs produce a 70% rate. How should you report it?",
        [
          "As proof of universal superiority",
          "Without task descriptions",
          "As 7/10 with categories and uncertainty",
        ],
        2,
        "Small samples and task composition limit generalisation.",
      ],
    ],
    takeaway:
      "Measure accepted outcomes alongside the human and machine work needed to obtain them.",
    source: ["tools", "copilot"],
  },
  {
    id: "benchmark",
    title: "Build a benchmark from your own engineering history",
    unit: "08 · Evaluate quality and economics",
    question:
      "How can you tell whether the model or the harness caused the improvement?",
    outcome:
      "Create a controlled internal bake-off using historical tasks, clean revisions and explicit acceptance rules.",
    intro:
      "Your team compares a new agent on this month’s easy maintenance tasks with an old agent’s results from last quarter’s incidents. The new system wins. Perhaps it is better; perhaps the tasks were easier. The design cannot distinguish those explanations.\n\nA credible benchmark fixes enough conditions to make the comparison meaningful, while keeping tasks representative of the work you actually need done.",
    sections: [
      [
        "Reconstruct tasks without leaking the answer",
        "Choose historical issues with reproducible base revisions and independently known acceptance criteria. Restore the repository to before the fix. Supply the issue and appropriate context, but remove the solution commit, revealing notes and later tests if they directly expose the intended patch. Preserve a held-out verification path for the evaluator.\n\nRun each candidate from a clean isolated checkout with equivalent tool access and budget. Record product/harness version, model, instructions and environment. Randomise or alternate run order where practical so warm caches, outages and your own learning do not systematically favour one candidate.",
      ],
      [
        "Separate factors when you can",
        "To study a model effect, hold the harness and task fixed while changing the model where supported. To study a harness effect, hold the model fixed where both systems expose it. If a product does not allow the same model or tools, report a system comparison and avoid claiming a causal model ranking.\n\nPredefine the rubric and intervention policy. Keep exploratory tuning tasks separate from final evaluation tasks; otherwise repeated prompt improvements can overfit the benchmark. Review failures qualitatively as well as aggregating counts. A useful outcome is a routing rule such as “delegate these bounded changes, keep these investigations interactive.”",
      ],
    ],
    example: [
      "Compare three coding-agent products on six historical bugs.",
      [
        "Prepare the task bundle",
        "For each task, record base SHA, issue text, allowed tools, time budget and evaluator acceptance checks. Keep the original fix hidden from the run.",
        "The candidates should face the same engineering problem rather than a leaked solution.",
        "Letting one agent read the solution branch while another cannot.",
      ],
      [
        "Label the conclusion correctly",
        "If models differ across products, report configured-system results. Add a same-harness model comparison only where supported.",
        "The experimental design limits what can be attributed to a model or harness.",
        "Calling a bundled product comparison proof that one model reasons better.",
      ],
    ],
    checks: [
      [
        "How do you isolate a model effect?",
        [
          "Hold harness and task fixed while changing the model",
          "Change tasks, tools and model together",
          "Compare unrelated demos",
        ],
        0,
        "A controlled factor change makes causal attribution more defensible.",
      ],
      [
        "Why separate tuning tasks from evaluation tasks?",
        [
          "To reduce useful evidence",
          "To avoid reporting overfitted prompt improvements as general performance",
          "To make the benchmark secret forever",
        ],
        1,
        "Repeated tuning on the test set can inflate apparent generalisation.",
      ],
      [
        "Two products cannot use the same model. What can you still compare?",
        [
          "Nothing at all",
          "Pure model capability only",
          "The configured systems, with the limitation stated",
        ],
        2,
        "A practical system comparison is useful even when it does not isolate one component.",
      ],
    ],
    takeaway:
      "Control what you can, disclose what you cannot, and let the comparison improve task routing.",
    source: ["copilot", "codex", "claude", "gemini"],
  },
  {
    id: "verification",
    title: "Trust and verification: connect each claim to evidence",
    unit: "08 · Evaluate quality and economics",
    question:
      "What exactly are you trusting when you approve an agent’s patch?",
    outcome:
      "Combine tests, static checks, independent review and permission boundaries without confusing their roles.",
    intro:
      "The agent’s patch passes unit tests, but it logs an access token on the error path. The tests are useful; they simply did not cover that property. Trust cannot be delegated to one green badge.\n\nDifferent checks answer different questions. Build a verification plan from the claims the change must satisfy, then choose evidence for each claim.",
    sections: [
      [
        "Match evidence to the property",
        "Unit and integration tests exercise specified behaviour. Static analysis can detect some classes of defects without executing every path. Diff review catches scope changes and design concerns. Independent review can challenge assumptions. None is complete alone. A test suite that covers successful retries may say nothing about cancellation, secret handling or concurrency.\n\nRecord which revision was tested and whether the final diff changed afterward. Evidence from an earlier tree does not automatically validate a later edit. If an agent cannot run a required check, its report should say so clearly rather than replace verification with a plausible explanation.",
      ],
      [
        "Keep prevention separate from detection",
        "Permission boundaries limit what a run can do before review. Tests and reviewers detect problems in what it produced. A human approval gate controls a consequential transition, such as merging or deployment, but only helps if the human receives a reviewable artifact and enough evidence to judge it.\n\nA gate that always approves vague summaries adds delay without assurance. Specify what the approver sees: diff, acceptance results, limitations and any operational risk relevant to the actual change. Do not require ceremonial approval for every harmless internal read; place gates where authority or consequences meaningfully change.",
      ],
    ],
    example: [
      "Review a patch that fixes retries but adds verbose error logging.",
      [
        "Check the behavioural claim",
        "Run the concurrent retry regression and relevant integration cases on the final revision.",
        "The original defect needs direct verification.",
        "Assuming a passing formatter establishes runtime behaviour.",
      ],
      [
        "Check the new data flow",
        "Inspect log fields and add a targeted check that credentials are not emitted on the error path. Keep deployment behind the existing release review.",
        "The patch introduced a separate property that the retry test does not cover.",
        "Treating the agent’s confidence as evidence about secret handling.",
      ],
    ],
    checks: [
      [
        "A test passed before the final edit. What should you establish?",
        [
          "That the final relevant state still satisfies the check",
          "That the agent remembers the test",
          "That the commit message is longer",
        ],
        0,
        "Verification must correspond to the artifact being approved.",
      ],
      [
        "What is the primary role of a permission boundary?",
        [
          "Explain code style",
          "Prevent out-of-scope actions during execution",
          "Prove all generated code correct",
        ],
        1,
        "Access control constrains actions; it is not a correctness proof.",
      ],
      [
        "What makes a human approval gate useful?",
        [
          "A vague done message",
          "A requirement to click yes on every read",
          "A concrete artifact with evidence and material limitations",
        ],
        2,
        "The human needs enough information to make the consequential decision.",
      ],
    ],
    takeaway:
      "Trust a specific claim because relevant evidence supports it, while permission boundaries limit unreviewed actions.",
    source: ["security", "outputs"],
  },
  {
    id: "economics",
    title: "Economics: cost per accepted result",
    unit: "08 · Evaluate quality and economics",
    question: "When does automation cost more than doing the work?",
    outcome:
      "Calculate total cost and distinguish developer attention, elapsed time and machine usage.",
    intro:
      "An agent run costs only a small amount of model usage, but its patch takes half an hour to review and repair. A second run costs more in inference and produces a clean change in five minutes of review. Token price alone picks the wrong winner.\n\nPrice the result you want: accepted engineering work. Keep developer attention separate from elapsed waiting, because an unattended run can proceed while a developer does something else.",
    sections: [
      [
        "Build a transparent cost model",
        "For a batch, add model charges, execution costs and active human time valued at an explicit hourly rate. Divide by the number of accepted outcomes to estimate cost per accepted result. Include failed attempts and repair effort in the numerator. Report the assumptions rather than pretending the hourly rate or task mix is universal.\n\nFor example, 20 currency units of machine cost plus 90 minutes of human work at 60 units/hour totals 110. If five results are accepted, the batch costs 22 per accepted result. This is an instructional calculation, not a current provider price. Also report success rate; a cheap accepted subset may coexist with unacceptable failure rates.",
      ],
      [
        "Account for waiting and parallelism honestly",
        "Wall-clock time affects deadlines and feedback loops. It is not automatically equal to developer labour: a person may work elsewhere during an unattended run. Conversely, repeated interruptions can impose costs beyond the recorded click time. Choose a consistent measurement policy and explain it.\n\nParallel agents may reduce latency while increasing total usage and integration effort. Recurring automation also has setup and maintenance costs; amortise them over a realistic number of useful runs. Stop or redesign a workflow whose reports take longer to handle than the manual work it replaces.",
      ],
    ],
    example: [
      "A manual task takes 30 active minutes. An agent uses 4 units of compute and 12 active minutes of review at 60 units/hour.",
      [
        "Calculate active cost",
        "Manual labour costs 30 units. The agent-assisted result costs 4 + 12 = 16 units before amortised setup and maintenance.",
        "The rate is one unit per active minute in this example.",
        "Charging unattended waiting as labour without saying that this is your policy.",
      ],
      [
        "Test the decision’s sensitivity",
        "Add setup, failure handling and maintenance across expected runs. If rework rises to 35 minutes, the same agent route costs at least 39 units.",
        "A result can change when intervention or failure rates change.",
        "Promising savings from one successful demonstration.",
      ],
    ],
    checks: [
      [
        "A batch costs 110 units and yields 5 accepted results. Cost per accepted result?",
        ["5.5 units", "22 units", "110 units per attempt regardless of count"],
        1,
        "Divide total batch cost, including failures, by accepted outcomes.",
      ],
      [
        "Should unattended waiting always count as active developer labour?",
        [
          "Yes, by definition",
          "No, never report latency",
          "No; record latency separately and state the costing policy",
        ],
        2,
        "Elapsed time and attention are different resources with different effects.",
      ],
      [
        "What can make a parallel design cheaper in time but more expensive overall?",
        [
          "Additional model usage and integration work",
          "The existence of a diagram",
          "A shorter final answer",
        ],
        0,
        "Latency savings do not imply lower total resource consumption.",
      ],
    ],
    takeaway:
      "Optimise accepted outcomes and human effort saved, with machine usage and latency visible beside them.",
    source: ["engines"],
    practical: {
      title: "Lab 8 · Run an honest internal bake-off",
      minutes: 60,
      brief:
        "Select at least three historical tasks and two configured systems, or start with one system and a manual baseline. Use the downloadable lab kit’s CSV template and summariser.",
      steps: [
        "Define the task rubric, intervention policy, base revisions and budgets before running.",
        "Run each task from an isolated clean state. Record failures and no-action cases as well as successes.",
        "Log active human minutes, elapsed time, machine cost, regressions and unnecessary changes in runs.csv.",
        "Run the lab kit’s evaluation script, then inspect the raw task-level outcomes. Repeat enough cases to understand instability.",
      ],
      deliverables: [
        "Task bundle and configuration manifest",
        "Completed runs.csv and summary",
        "A routing recommendation with sample-size limitations",
      ],
      review:
        "The summary must include every attempt. Report autonomous and assisted success separately, and do not attribute a product comparison to models alone. Small samples support a pilot decision, not a universal ranking. A valid conclusion can be that automation does not yet save time.",
    },
  },
];
