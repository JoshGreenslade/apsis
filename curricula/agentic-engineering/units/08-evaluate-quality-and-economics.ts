import type { Lesson } from "../lesson";
export const unit08EvaluateQualityAndEconomics: Lesson[] = [
  {
    id: "evaluation",
    title: "Evaluation: measure accepted engineering work",
    unit: "08 · Evaluate quality and economics",
    question: "What does an agent’s success rate hide?",
    outcome:
      "Define success, intervention, elapsed time, cost, regressions and unnecessary changes before comparing runs.",
    intro:
      "Suppose two candidates both submit a completed take-home coding exercise, and both submissions technically pass. Look only at that headline fact, “both passed,” and you would rate them equally. Look a little closer, and it turns out one of them worked through the exercise entirely on their own, while the other needed a friend sitting beside them the whole time, quietly fixing every mistake before it got submitted. Both submissions technically “passed.” They represent very different amounts of actual, independent capability, and a single pass/fail number has completely erased that difference.\n\nThe same erasure happens constantly when comparing coding agents. Two agents each solve eight out of ten tasks. The first needs a developer to step in and repair every single one of its eight patches before they are actually usable. The second finishes its eight entirely without any intervention at all. A single success-rate number, eighty percent, eighty percent, treats these two agents as equals, because it has quietly hidden exactly the thing you actually wanted the agent to remove from your workload in the first place: your own time and attention.\n\nSo the unit of success has to be defined before you run any evaluation at all, not discovered afterward once the numbers are already in front of you. For engineering tasks specifically, a genuinely useful unit is an accepted result: one that satisfies the task’s actual behavioural and scope criteria, with the amount of human assistance it required recorded explicitly and separately, rather than folded invisibly into the same single number as everything else.",
    sections: [
      [
        "Separate outcome from effort",
        "Track whether the acceptance criteria actually pass, whether any regressions crept in, and whether unnecessary changes were made beyond what was actually asked for. Alongside all of that, record the number of human interventions required, the active minutes spent reviewing or repairing the result, the total wall-clock duration, and whatever the usage or runtime cost actually came to. A patch can be entirely correct in a narrow technical sense and still be economically unattractive, if reviewing it turns out to take longer than simply doing the task yourself would have.\n\nDo not quietly remove failed runs from your denominator when reporting a rate. A timeout, and an environment blocker that stopped a run in its tracks, are both genuinely important outcomes in their own right. You may choose to analyse them separately from successful runs, but excluding them altogether makes the whole system look considerably more reliable than it actually is. Record, explicitly, whether a given success required intervention at all, so autonomous completion and merely assisted completion remain two visibly distinct things, rather than one blurred category.",
      ],
      [
        "Use cases that reveal different failures",
        "Include routine edits, genuinely cross-file changes, ambiguous investigations with no single obvious answer, and negative cases where the actually correct response is to make no change at all. Draw these from representative tasks out of your own real work, rather than cherry-picking only the cases a favourite tool already happens to handle well. Where revealing the expected outcome would hand the agent the solution outright, keep that outcome private until after the run is complete.\n\nSmall samples are noisy, and it is worth being honest about that rather than dressing up a handful of results as more conclusive than they are. Report raw counts, and the actual categories of task involved, rather than presenting only a single, precise-looking percentage that hides all of that underlying structure. Repeat selected cases where you can, to learn whether the outcomes you are seeing are actually stable or simply the result of one lucky, or unlucky, run. Evaluation, done properly, is a way of finding out where a system is genuinely useful and where it still needs supervision. It was never meant to be a ceremony for crowning a winner you had already decided on in advance.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Two agents can post the same success rate and still represent very different amounts of delegated engineering work.",
        meaning:
          "Tracking human interventions, active repair time and elapsed duration alongside acceptance shows whether a “success” was autonomous or heavily assisted. Removing failed or timed-out runs from the denominator makes reliability look better than it actually is.",
        question:
          "Should failed or timed-out runs be excluded from a reported success rate to make the metric “cleaner”?",
        answer:
          "No. Excluding them silently inflates the apparent reliability; they should be reported, categorised and kept in the denominator.",
        further: [
          {
            question:
              "Two agents both report a 90% success rate, but one required a human to intervene on half its 'successes.' Are the two rates equally meaningful?",
            answer:
              "No. A success rate that doesn't distinguish autonomous completion from heavily human-assisted completion hides a large difference in how much genuine delegated work actually happened.",
          },
          {
            question:
              "Why does active repair time matter as its own tracked metric, separate from whether a task is ultimately marked accepted?",
            answer:
              "A task can eventually be accepted only after significant human correction; tracking repair time separately reveals that hidden cost, which a binary accepted/rejected outcome alone would completely obscure.",
          },
        ],
      },
      {
        bridge:
          "A benchmark is only as informative as the range of situations it actually tests.",
        meaning:
          "Routine edits, cross-file changes, ambiguous investigations and legitimate no-change cases each reveal different failure modes; choosing only tasks a favourite tool already handles well biases the comparison before it starts.",
        question:
          "Should an evaluation set include cases where the correct action is to make no change at all?",
        answer:
          "Yes. Negative cases test whether a system can recognise when no action is warranted, which is a real and separate capability from making correct edits.",
        further: [
          {
            question:
              "An evaluation set contains only tasks a favourite tool is already known to handle well. What does this bias hide?",
            answer:
              "How the tool performs on the harder, more ambiguous or less familiar cases it will actually encounter in practice — a set curated toward known strengths cannot reveal genuine weaknesses.",
          },
          {
            question:
              "Why is a cross-file change a meaningfully different test case from a routine single-file edit, even if both are 'bug fixes'?",
            answer:
              "A cross-file change requires tracking a dependency or contract across module boundaries, which exercises a different capability than a localized edit and can fail in ways a single-file test would never reveal.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "Two systems report the same success rate, but one required human intervention on many of its 'successes.' What is missing from the comparison?",
        [
          "Nothing; the rates are directly comparable",
          "A measure of how much of the work was actually autonomous versus assisted",
          "A count of tokens used",
        ],
        1,
        "Success rate alone can hide large differences in how much genuine autonomous work occurred.",
      ],
      [
        "Why include cases in an evaluation set where the correct action is 'no change'?",
        [
          "To make the set longer",
          "To test whether the system can recognise when no action is warranted",
          "Negative cases are never useful",
        ],
        1,
        "Recognising when not to act is a distinct, real capability worth testing directly.",
      ],
      [
        "A benchmark draws all its tasks from cases a favourite tool is already known to handle well. What does this risk?",
        [
          "A fair, unbiased comparison",
          "A biased comparison that hides genuine weaknesses",
          "No effect on the outcome",
        ],
        1,
        "Curating toward known strengths prevents the evaluation from revealing real limitations.",
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
    nextConnection:
      "Measuring accepted work well is only useful if the comparison it feeds is actually fair. The next lesson is about designing that comparison.",
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
      "Suppose you ran a marathon last year on a notoriously hilly, exposed course, in poor weather, and posted a certain time. This year, you run a different, famously flat and sheltered course, on a perfect day, and post a much faster time. It would be tempting to announce that you have become a considerably better runner over the past year. It would also be entirely unjustified, because the comparison was never actually between your running ability in two different years, it was between two different courses, run under two different conditions, and the courses themselves, not you, may explain the entire difference.\n\nTeams evaluating coding agents fall into this exact trap constantly. A new agent gets tried out on this month’s batch of easy maintenance tasks, and its results get compared against an old agent’s performance on last quarter’s genuinely thorny incidents. The new system wins, handily. Perhaps it really is the better system. Or perhaps this month’s tasks were simply easier than last quarter’s were, and the comparison, as designed, has no way whatsoever of telling these two explanations apart.\n\nA credible benchmark has to fix enough of the actual conditions to make a real comparison possible, in the same way a fair running comparison would demand the same course, run in similar conditions, in both years. And it has to do this while still keeping its tasks genuinely representative of the actual work you need done, rather than narrowing the comparison down to something artificially easy that no longer resembles anything you will actually ask the system to do later.",
    sections: [
      [
        "Reconstruct tasks without leaking the answer",
        "Choose historical issues that have a reproducible starting revision and an independently known, agreed acceptance criterion. Restore the repository to precisely how it looked before the original fix was applied. Supply the issue itself, and whatever context genuinely accompanied it at the time, but remove the actual solution commit, and remove any revealing notes or later tests that would directly hand over the intended patch. Keep a held-out verification path in reserve, one the evaluator can use afterward without ever exposing it to the system under test.\n\nRun every candidate from a genuinely clean, isolated checkout, with equivalent tool access and an equivalent budget. Record the exact product or harness version, the model, the instructions given, and the environment used, for every single run. Randomise, or at least alternate, the order in which candidates are run wherever that is practical, so warm caches, temporary outages, or your own gradually accumulating familiarity with the tasks do not end up systematically favouring whichever candidate happened to run later, or earlier.",
      ],
      [
        "Separate factors when you can",
        "To study a model’s effect specifically, hold the harness and the task fixed, and change only the model, wherever the product actually supports doing that. To study a harness’s effect, hold the model fixed instead, wherever both systems being compared genuinely expose the same one. If a product simply does not allow the same model, or the same tools, to be used across your candidates, report a comparison of the configured systems as they stand, and resist the temptation to claim a causal ranking between the underlying models that your design was never actually capable of establishing.\n\nDecide on your rubric and your intervention policy in advance, before running a single task, and keep whatever tasks you use for exploratory tuning strictly separate from the tasks you actually use for final evaluation. Otherwise, repeated rounds of prompt improvement can quietly end up overfitting to your own benchmark, teaching you far more about your test set than about the systems themselves. Review failures qualitatively as well as simply counting them. A genuinely useful outcome from all of this is a concrete routing rule, something like: delegate this particular class of bounded change, but keep that other kind of open-ended investigation interactive, with a human still in the loop.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Comparing a new system’s easy recent tasks against an old system’s hard historical ones can only tell you about the tasks, not the systems.",
        meaning:
          "Restoring a clean pre-fix revision, supplying only the issue and appropriate context, and withholding the solution commit keeps the comparison about capability rather than about which system happened to see easier problems or the answer key.",
        question:
          "If the evaluator’s context accidentally includes the original fix commit, is a high success rate on that task meaningful?",
        answer:
          "No. The comparison has leaked the answer; success in that case reflects access to the solution, not genuine problem-solving capability.",
        further: [
          {
            question:
              "A benchmark compares a new tool's performance on tasks from last month against an old tool's performance on tasks from two years ago. What confound does this introduce?",
            answer:
              "The comparison conflates 'which tool is better' with 'which set of tasks happened to be harder,' since the two tools were never actually tested against the same problems under the same conditions.",
          },
          {
            question:
              "Why is restoring a clean pre-fix revision, rather than the current repository state, important when re-creating a historical bug for a benchmark?",
            answer:
              "The current state may already contain the fix or related later changes, which would let the evaluated system 'succeed' by accident of context rather than by genuinely solving the original problem.",
          },
        ],
      },
      {
        bridge:
          "A comparison can only support the specific claim its design actually isolates.",
        meaning:
          "Holding the harness fixed while varying the model isolates a model effect; holding the model fixed while varying the harness isolates a harness effect. When a product does not allow that isolation, the honest conclusion is a system-level comparison, not a claim about one component.",
        question:
          "Two products use different underlying models and cannot be configured to match. Can the comparison still support a claim that one model reasons better than the other?",
        answer:
          "No. Without holding the model constant, the result can only support a claim about the two configured systems, not about the models in isolation.",
        further: [
          {
            question:
              "A team wants to isolate the effect of a specific harness change. What must be held constant to make that claim supportable?",
            answer:
              "The underlying model and every other variable besides the harness change itself — only then does a difference in outcome cleanly attribute to the harness rather than to some other varying factor.",
          },
          {
            question:
              "Why is 'Product A beat Product B on our benchmark' a weaker and different claim than 'Model X reasons better than Model Y'?",
            answer:
              "The first is a system-level claim that bundles model, harness, tools and configuration together; the second is a component-level claim that requires isolating the model specifically, which the product-level comparison never actually did.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A benchmark accidentally lets the evaluated system see the original fix commit. What does a high success rate on that task now show?",
        [
          "Genuine problem-solving capability",
          "Only that the answer was leaked into the context",
          "That the benchmark is well-designed",
        ],
        1,
        "A leaked solution invalidates the task as a test of genuine capability.",
      ],
      [
        "To isolate a model's effect from a harness's effect, what must a comparison hold fixed?",
        [
          "Nothing needs to be held fixed",
          "The harness, while only the model varies",
          "The task description only",
        ],
        1,
        "Isolating one variable requires holding every other relevant variable constant.",
      ],
      [
        "A benchmark compares this month's easy tasks against last year's hard tasks across two tools. What does this confound?",
        [
          "Nothing; tasks don't matter",
          "Which tool is better versus which task set happened to be easier",
          "The comparison is still perfectly valid",
        ],
        1,
        "Different task difficulty across conditions undermines a fair tool-to-tool comparison.",
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
    nextConnection:
      "A fair benchmark still only tells you about acceptance. The next lesson asks what should make you actually trust an individual accepted result.",
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
      "A car can pass its emissions test with flying colours and still have brakes that are dangerously close to failing. The emissions test genuinely checked something real and worthwhile; it simply was never designed to check brakes, and passing it tells you precisely nothing about whether the brakes are safe. Nobody would look at a passed emissions certificate and conclude the car is safe to drive at speed down a steep hill. The certificate answered its own question honestly. It was simply never asked the other question at all.\n\nAn agent’s patch that passes its unit tests can be in exactly this position. It sails through the existing suite without a single failure, and yet it also quietly logs an access token on one particular error path that none of those tests happen to exercise. The tests were genuinely useful, and they were not lying to you. They simply never covered that specific property, because nobody wrote a test for it, in the same way nobody checks brake pads during an emissions inspection. Trust, in either case, cannot be delegated wholesale to one green badge, however reassuring that badge looks.\n\nWhat this calls for is treating verification as something built up deliberately from the actual claims a change needs to satisfy, rather than treating any single check as a stand-in for all of them at once. Different kinds of check answer genuinely different questions. Build your verification plan starting from the claims themselves, and only then choose which piece of evidence is actually suited to checking each one.",
    sections: [
      [
        "Match evidence to the property",
        "Unit and integration tests exercise specified behaviour, and they are excellent at that job. Static analysis can catch certain classes of defect without ever having to actually execute the code along every path. Diff review is well suited to catching scope creep and genuine design concerns a reviewer’s eye picks up. Independent review can challenge assumptions nobody else thought to question. None of these, alone, is complete, and it is worth remembering that a suite covering successful retries may say absolutely nothing about cancellation behaviour, about secret handling, or about concurrency, none of which it was ever asked to check.\n\nRecord which exact revision was actually tested, and whether the final diff changed again after that testing happened. Evidence gathered against an earlier version of the tree does not automatically validate whatever a later edit introduced. And if an agent genuinely cannot run some required check, its report needs to say so plainly, rather than quietly substituting a plausible-sounding explanation in place of the verification that was actually asked for.",
      ],
      [
        "Keep prevention separate from detection",
        "Permission boundaries limit what a run is actually able to do before anyone reviews anything at all, they are prevention, acting ahead of time. Tests and human reviewers detect problems in whatever the run actually produced, after the fact. A human approval gate controls some genuinely consequential transition, like merging a change or deploying it, but it only helps at all if the human at that gate actually receives something reviewable, along with enough real evidence to make an informed judgment about it.\n\nA gate that rubber-stamps vague summaries every single time adds delay to the process without adding any real assurance in return. Be specific about what an approver is actually shown: the diff itself, the acceptance results behind it, whatever limitations remain, and any operational risk genuinely relevant to this particular change. Do not demand ceremonial approval for every harmless internal read that changes nothing consequential; place your gates where real authority, or real consequences, are actually about to change hands.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "A green test suite and a genuinely trustworthy patch are not automatically the same thing — it depends on what the suite was actually checking.",
        meaning:
          "Unit tests, static analysis, diff review and independent review each answer a different question about a change, and none of them alone is complete; a suite that covers successful retries may say nothing at all about secret handling on an error path.",
        question:
          "A patch passes all existing unit tests but introduces a new logging statement that includes a credential. Does the passing suite establish this is safe?",
        answer:
          "No. The suite was not designed to check that property; a passing result there says nothing about the newly introduced logging behaviour.",
        further: [
          {
            question:
              "Static analysis flags no issues in a patch, and the diff review also finds nothing wrong. Does this combination guarantee the change is fully correct?",
            answer:
              "No single verification method or even a combination of them can guarantee full correctness; each answers a specific, bounded question, and something outside all of their scopes could still be wrong.",
          },
          {
            question:
              "Why can a diff review catch a problem that a passing test suite misses, and vice versa?",
            answer:
              "A diff review examines the actual code changes for issues a human recognizes on sight, such as an unsafe pattern, while a test suite only checks behaviors it was explicitly written to exercise; each method has blind spots the other can sometimes cover.",
          },
        ],
      },
      {
        bridge:
          "A permission boundary and a human approval gate protect against different things, at different points in time.",
        meaning:
          "Boundaries limit what a run can do while it executes; approval gates control a later, consequential transition like merging or deploying, and are only useful if the approver actually receives a reviewable artifact with real evidence and limitations.",
        question:
          "Does requiring human approval before every single read-only investigation meaningfully increase safety?",
        answer:
          "Not much. Ceremonial approval for harmless actions adds delay without protecting against anything consequential; gates are more valuable where authority or consequences actually change.",
        further: [
          {
            question:
              "An approval gate is placed before a merge to production, but the approver is only shown a one-line summary with no diff or test evidence. Is this gate functioning as intended?",
            answer:
              "No. An approval gate only protects against consequential action if the approver actually receives a reviewable artifact with real evidence; a one-line summary gives them nothing substantive to evaluate.",
          },
          {
            question:
              "Why should a permission boundary and an approval gate be thought of as protecting against different things, rather than as interchangeable safety mechanisms?",
            answer:
              "A boundary limits what actions are even possible while a run executes, while a gate is a human checkpoint at a later, consequential transition; removing one and doubling up on the other leaves a different kind of risk unaddressed.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A patch passes tests, static analysis, and diff review. What can you conclude?",
        [
          "The change is guaranteed fully correct",
          "Each method checked a specific, bounded question; something outside all their scopes could still be wrong",
          "No further review is ever needed for any future change",
        ],
        1,
        "No single verification method, or their sum, guarantees complete correctness.",
      ],
      [
        "An approval gate exists before every read-only investigation action. What is the likely effect?",
        [
          "Meaningfully increased safety",
          "Delay without protecting against anything consequential",
          "No effect on delay or safety",
        ],
        1,
        "Gates are valuable at points where authority or consequences actually change, not for harmless actions.",
      ],
      [
        "An approver is shown only a one-line summary before a production merge. Is the approval gate functioning as intended?",
        [
          "Yes, brevity is fine",
          "No, the approver needs a reviewable artifact with real evidence",
          "Yes, as long as the approver trusts the agent",
        ],
        1,
        "A gate without substantive evidence cannot meaningfully protect against a bad decision.",
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
    nextConnection:
      "Verified, trustworthy results still have a cost to produce. The final evaluation lesson puts a number on that cost.",
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
      "Two flat-pack wardrobes sit side by side in a shop. One is noticeably cheaper. You get it home, open the box, and three hours later you are still wrestling with a wardrobe door that will not sit straight, holding a hex key you have started to resent. The other wardrobe cost a little more at the till, arrived with clearer instructions and better-fitting parts, and took twenty minutes to put together, cleanly, the first time. Judge purely by the price on the sticker, and the first wardrobe was the better deal. Judge by what you actually paid, once your own time and frustration are counted honestly, and the second one plainly was.\n\nCoding agents create exactly this same trap, and the sticker price here is token cost. One agent run costs only a small amount in model usage, and its resulting patch then takes a developer half an hour to review and repair before it is actually usable. A second run costs more in raw inference, and produces a clean, correct change that takes five minutes to review and accept. Looking only at token price picks the wrong winner here, in precisely the way looking only at the shop sticker picked the wrong wardrobe.\n\nThe thing actually worth pricing is the result you wanted all along: accepted engineering work, delivered. And it is worth keeping developer attention carefully separate from mere elapsed waiting, because an unattended run can proceed quietly in the background while a developer goes and does something else entirely, in a way that a half-hour repair session, demanding someone’s full attention, simply cannot.",
    sections: [
      [
        "Build a transparent cost model",
        "For a whole batch of work, add up model charges, execution costs, and active human time valued at some explicit hourly rate you are willing to state out loud. Divide the total by the number of accepted outcomes, to arrive at a genuine cost per accepted result. Include failed attempts and whatever repair effort they demanded in that same numerator, rather than quietly setting them aside. Report your assumptions plainly, rather than pretending your chosen hourly rate, or your particular mix of tasks, is some kind of universal constant that applies everywhere.\n\nAs a concrete illustration: twenty currency units of machine cost, plus ninety minutes of human work valued at sixty units an hour, comes to a total of one hundred and ten units. If five results out of that batch are actually accepted, the batch costs twenty-two units per accepted result. This is a purely instructional calculation, not a claim about any real provider’s current pricing. It is also worth reporting the underlying success rate alongside the cost figure, since a cheap accepted subset can coexist quite comfortably with an unacceptably high overall failure rate hiding just behind it.",
      ],
      [
        "Account for waiting and parallelism honestly",
        "Wall-clock time genuinely matters for deadlines, and for how quickly feedback loops close. It is not automatically the same thing as developer labour, though, because a person can often go and work on something else entirely while an unattended run proceeds in the background. The reverse is also true: repeated interruptions, even brief ones, can impose real costs well beyond whatever click-time you happened to record for them. Choose one consistent measurement policy for all of this, and simply state what that policy is, rather than leaving it implicit and inconsistent from one comparison to the next.\n\nRunning several agents in parallel may reduce how long you wait for an answer, while simultaneously increasing total token usage and the integration effort needed afterward to combine what they each produced. Recurring automation, too, carries genuine setup and maintenance costs of its own, and those deserve to be amortised sensibly across a realistic number of actual future runs, rather than ignored. Stop, or seriously redesign, any workflow whose reports consistently take longer for a human to handle than the manual work it was originally meant to replace would have taken in the first place.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "A cheap-looking model run and an expensive-looking one can trade places entirely once the full cost of getting an accepted result is counted.",
        meaning:
          "Adding machine cost and active human time, then dividing by accepted outcomes (including failed attempts in the numerator), gives a comparable cost per accepted result — token price alone systematically favours whichever system pushes cost onto human repair time.",
        question:
          "An agent run costs very little in machine usage but requires thirty minutes of developer repair per patch. Is it necessarily the cheaper option?",
        answer:
          "Not necessarily. The full cost per accepted result must include that repair time; a nominally cheaper run can be more expensive overall once human effort is counted.",
        further: [
          {
            question:
              "Why should failed attempts be included in the numerator when calculating cost per accepted result, rather than excluded as wasted work?",
            answer:
              "The compute and time spent on failed attempts was a real cost incurred on the way to an eventual accepted result; excluding it understates the true cost of achieving success with that system.",
          },
          {
            question:
              "Two systems have identical token costs, but one has a much lower acceptance rate. What does this imply about their true cost per accepted result?",
            answer:
              "The lower-acceptance system has a higher true cost per accepted result, since more attempts (and their associated cost) are needed on average to reach one accepted outcome.",
          },
        ],
      },
      {
        bridge:
          "Unattended waiting and active attention are not the same resource, and conflating them can distort a genuinely useful comparison.",
        meaning:
          "Latency affects deadlines but is not automatically equal to labour cost, since a person may work elsewhere during an unattended run; parallel agents can reduce latency while increasing total usage and integration effort, and recurring automation carries ongoing maintenance cost that should be amortised realistically.",
        question:
          "Does running four agents in parallel to finish a task faster always reduce its total resource cost?",
        answer:
          "No. It may reduce elapsed time while increasing total model usage and integration effort — latency and total cost are different quantities and can move in opposite directions.",
        further: [
          {
            question:
              "A recurring nightly workflow's setup cost is amortised over its first month only, then ignored. What does this understate?",
            answer:
              "The ongoing maintenance cost of keeping the workflow working as the codebase and dependencies change, which continues to accrue well beyond the first month and should be included in a realistic long-run cost estimate.",
          },
          {
            question:
              "Why can an unattended run's wall-clock time be a poor proxy for its labour cost?",
            answer:
              "A person can work on something else entirely while an unattended run executes, so the elapsed time doesn't directly consume their labour the way an interactive, attended task would.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "Why should failed attempts be counted in the numerator when computing cost per accepted result?",
        [
          "They should be excluded as wasted effort",
          "They represent real cost incurred on the way to an eventual accepted result",
          "Failed attempts have no cost",
        ],
        1,
        "Excluding failed-attempt cost understates the true cost of reaching an accepted result.",
      ],
      [
        "Running four agents in parallel reduces elapsed time but increases total compute and integration effort. What does this show?",
        [
          "Latency and total cost always move together",
          "Latency and total cost are different quantities that can move in opposite directions",
          "Parallel agents never increase cost",
        ],
        1,
        "Reduced wall-clock time does not imply reduced total resource cost.",
      ],
      [
        "A recurring automated workflow's maintenance cost is ignored after its first month. What does this risk?",
        [
          "An accurate long-run cost picture",
          "Understating the true ongoing cost of the workflow",
          "No risk; maintenance cost is always zero",
        ],
        1,
        "Ongoing maintenance is a real, continuing cost that should be amortised realistically.",
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
    nextConnection:
      "You can now measure whether delegated engineering work is actually worth its cost. The final unit puts everything together into working systems you build and evaluate yourself.",
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
