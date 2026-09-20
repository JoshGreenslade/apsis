import type { Lesson } from "../lesson";

export const unit04DelegateWorkWell: Lesson[] = [
  {
    id: "specification",
    title: "Specification: define the result and its boundaries",
    unit: "04 · Delegate work well",
    question: "Why does 'fix retries' produce so many plausible wrong patches?",
    outcome:
      "Turn an intention into an executable brief with acceptance evidence, constraints and a clear stopping point.",
    intro:
      "'Make retries more robust' sounds like a task until two engineers start implementing it. One increases the attempt limit. The other keeps the limit but changes which failures are retried. Both can defend their choice.\n\nAn agent faces the same ambiguity, except that it may quietly choose an interpretation and return a finished-looking patch. The brief needs to settle the decisions that affect correctness, while leaving room for the implementer to choose how to achieve them.",
    sections: [
      [
        "Specify the observable result",
        "A useful retry brief might read:\n\n> The service currently retries every exception. Change it to retry only transient timeouts. Allow three attempts in total, including the first call. Wait between attempts using the existing delay policy, capped at one second. If all three fail, return the first timeout error unchanged. Other errors must fail immediately. Keep the public API unchanged.\n\nNow there are decisions a reviewer can check. 'Three attempts' cannot accidentally become one initial call plus three retries. 'Original error' names a particular error, rather than leaving the agent to choose the first or last one.\n\nPair the brief with deterministic cases: success on attempt two, exhaustion after three, and a non-timeout error on the first call. The brief describes the desired behaviour; the tests give the implementation a way to demonstrate it. Neither needs to dictate the internal function layout.",
      ],
      [
        "Make the stopping point explicit",
        "Include non-goals, risk boundaries and the checks that must pass before the work is done. A task without a stopping point expands by invitation: the agent cleans nearby code, changes an API and reports green unit tests while the actual behaviour remains unproved. A good specification is a contract for evidence, not a wish for activity.",
      ],
    ],
    checkpoints: [
      {
        bridge: "The first question is not 'what files should the agent edit?' but 'what must be true when it stops?'",
        meaning:
          "A task is executable when its success can be observed and its boundaries are explicit. Implementation choices can remain open.",
        question: "Which is the stronger brief: 'improve retries' or 'retry timeouts three times with bounded backoff and retain the original error'?",
        answer:
          "The second. It states behaviour that can be tested without prematurely prescribing the implementation.",
        further: [
          { question: "Why name non-goals?", answer: "They prevent a helpful agent from silently widening the change into adjacent refactoring or API redesign." },
          { question: "Does a detailed specification need to prescribe the exact patch?", answer: "No. It should constrain the outcome and evidence while leaving room for the agent to choose an appropriate implementation." },
        ],
      },
      {
        bridge: "A task is not complete because an agent did work. It is complete when the promised behaviour is evidenced.",
        meaning:
          "Acceptance evidence turns 'looks plausible' into a decision another person can inspect.",
        question: "What is missing from a task that says 'update the retry loop and run tests'?",
        answer:
          "The expected behaviour and proof that distinguishes it from a superficially green patch, including the relevant failure and boundary cases.",
        further: [
          { question: "What is a useful stopping condition?", answer: "A small set of observable checks, such as deterministic tests for success, exhaustion and error preservation, plus the requested review artefact." },
          { question: "Why is 'run tests' weaker than a named acceptance check?", answer: "A broad test command may pass without exercising the changed behaviour. A named check explains what evidence matters." },
        ],
      },
    ],
    example: [
      "Turn a vague retry request into a brief another engineer can execute.",
      ["State the behaviour", "Retry only transient timeouts, use a capped delay, stop after three attempts and return the original error.", "The agent can distinguish required behaviour from implementation preference.", "Writing 'make the retry code more robust.'"],
      ["Name the evidence", "Add deterministic tests for success on attempt two, exhaustion on attempt three and preservation of the error.", "The result can be inspected without trusting the patch's explanation.", "Accepting a green unrelated test suite as proof."],
    ],
    checks: [
      ["What makes a task executable?", ["A long file list", "Observable success and explicit boundaries", "A confident tone"], 1, "The agent needs a testable result, not merely an activity list."],
      ["What belongs in a non-goal?", ["An adjacent refactor to avoid", "A hidden implementation detail", "A second unrelated feature"], 0, "Non-goals protect the task's boundary."],
      ["What is stronger evidence?", ["The agent says it works", "A named test exercises the acceptance behaviour", "The diff is large"], 1, "Acceptance evidence should discriminate between the intended result and a plausible substitute."],
    ],
    takeaway: "Specify the observable result, the evidence that proves it and the boundaries that keep the task from expanding.",
    nextConnection: "Once the task is clear, the repository itself can either help or hinder the agent. The next lesson turns good intentions into executable feedback.",
    source: ["instructions", "copilot"],
  },
  {
    id: "agent-friendly",
    title: "Agent-friendly engineering: make feedback executable",
    unit: "04 · Delegate work well",
    question: "What repository change helps every future agent and engineer?",
    outcome:
      "Shape code, tests and documentation so that the next useful action is easy to discover and verify.",
    intro:
      "The agent has a clear brief. Its next problem is finding out how this repository works. There are three test scripts, one obsolete setup guide and a generated file with the same name as the implementation. Before it can reason about retries, it must work out which of these to trust.\n\nMaking a repository agent-friendly is largely the same work that helps a new colleague: make the real entry points easy to find and give changes fast, informative feedback.",
    sections: [
      [
        "Turn conventions into affordances",
        "Agents do better when the repository says where behaviour lives, how to run the narrow test, which invariants matter and what a successful change looks like. A focused test is not only regression protection; it is a question the agent can answer. A clear module boundary is not only style; it reduces the search space.",
      ],
      [
        "Design feedback for diagnosis",
        "Compare two failures: 'test failed' and 'expected 3 attempts, observed 4 after the final timeout'. The second gives the agent a reason to inspect the loop boundary. It also helps a human distinguish an off-by-one error from a missing fixture.\n\nUse a fake clock when testing backoff so the test can advance time deliberately instead of waiting and hoping the scheduler behaves. Keep unrelated network calls out of that focused check. A failure should usually mean that the behaviour changed, not that today's network was slow.\n\nPut the command next to the code's local guidance, with any setup it requires. Each future task can then begin by asking the code a useful question instead of rediscovering how to run it.",
      ],
    ],
    checkpoints: [
      {
        bridge: "An agent-friendly repository does not contain more instructions everywhere. It makes the right next action obvious.",
        meaning:
          "Affordances reduce search and interpretation: local rules, clear entry points and focused checks let the agent spend effort on the problem.",
        question: "Which helps more with a flaky retry bug: a giant architecture document or a deterministic test named for the retry boundary?",
        answer:
          "The deterministic, focused test. It turns the desired behaviour into executable feedback and narrows the relevant code path.",
        further: [
          { question: "Why keep guidance near the code it governs?", answer: "The rule is easier to retrieve at the moment it matters and less likely to be treated as universal when it is local." },
          { question: "What makes a test a useful question?", answer: "It isolates one behaviour, fails for a meaningful reason and gives enough output to choose the next investigation step." },
        ],
      },
      {
        bridge: "Good feedback is not just a green or red light. It helps explain what the next move should be.",
        meaning:
          "Determinism and diagnostic output make verification repeatable for both agents and people.",
        question: "A retry test passes locally but fails randomly in CI because it uses the real clock. What repository improvement is indicated?",
        answer:
          "Control time in the test and expose the relevant event or assertion. The fix should remove incidental timing from the evidence, not merely add more retries to the test runner.",
        further: [
          { question: "Why is adding a sleep often a poor fix?", answer: "It hides a timing dependency and can make the test slower without making the behaviour deterministic." },
          { question: "What is a good narrow verification command?", answer: "The smallest command that exercises the changed behaviour and gives a meaningful failure when its contract is violated." },
        ],
      },
    ],
    example: [
      "A repository has a flaky retry test and no obvious local guidance.",
      ["Find the missing affordance", "Add a fake-clock fixture, a focused test command and a short local note naming the retry invariant.", "The next run can discover both the rule and its proof.", "Adding a broad README paragraph without an executable check."],
      ["Read the failure as feedback", "Make the test report the attempt count and terminal error, then run it repeatedly under the controlled clock.", "A failure points to a behaviour rather than to incidental timing.", "Increasing CI retries until the symptom becomes rare."],
    ],
    checks: [
      ["What is an agent-friendly test?", ["A huge end-to-end suite only", "A focused, deterministic question with useful failure output", "A test with no assertions"], 1, "A test should narrow the search and make its evidence legible."],
      ["Where should a local invariant be documented?", ["Only in a distant handbook", "Near the code and check that enforce it", "In an untracked note"], 1, "Proximity improves retrieval and keeps scope visible."],
      ["What does a fake clock provide?", ["More production latency", "Deterministic timing evidence", "A larger context window"], 1, "Controlled dependencies make the behaviour repeatable."],
    ],
    takeaway: "Make the repository answer common questions through structure, focused tests, local guidance and diagnostic failures.",
    nextConnection: "Even a clear brief and a friendly repository cannot remove every uncertainty. The next lesson teaches how to classify what went wrong before asking the agent to try again.",
    source: ["instructions", "copilot"],
  },
  {
    id: "failure-modes",
    title: "Failure modes: diagnose before you reprompt",
    unit: "04 · Delegate work well",
    question: "How do you know whether to improve the task, the environment or the agent's reasoning?",
    outcome:
      "Classify failures by cause and choose a targeted recovery instead of repeating the same prompt.",
    intro:
      "The patch looks reasonable, but it does not fix the reported failure. Before writing a sterner prompt, find the earliest point where the run went wrong.\n\nDid the agent solve a different interpretation of the task? Read the wrong file? Fail to start the tests? Or did it have the right evidence and draw the wrong conclusion? These failures can produce similar final answers, but repeating the request will not repair all of them.",
    sections: [
      [
        "Separate the layers",
        "A specification failure leaves the desired result ambiguous. A context failure withholds a necessary fact or includes misleading noise. An environment failure makes the tool, dependency or checkout unreliable. A reasoning failure misreads adequate evidence. A verification failure lets the wrong result look acceptable. These can overlap, but they point to different repairs.",
      ],
      [
        "Change one thing that could explain the miss",
        "Suppose the agent changes the retry delay, but the failing assertion concerns the number of attempts. First inspect what it saw. If the assertion was absent, supply it. If the assertion was present but misunderstood, ask for a trace of the counter through the three attempts before requesting another patch. If the wrong patch passed its checks, add a case that would expose it.\n\nKeep the failed run and change one relevant condition. Otherwise, if a new model, a new prompt and a repaired environment all arrive together, you will not know what helped.\n\nAn unchanged rerun can sometimes succeed because outputs vary. That is useful when measuring variability, but it is weak evidence that you have repaired the cause. For routine recovery, make a change you can explain and check whether the expected effect follows.",
      ],
    ],
    checkpoints: [
      {
        bridge: "The same visible mistake can have several causes. Classify the cause before choosing the remedy.",
        meaning:
          "A wrong patch is not automatically a model failure. The task, evidence, tools and checks are all part of the system.",
        question: "The agent changes the wrong service because the task named a feature but not the owning package. What failed first?",
        answer:
          "The specification or context boundary. The agent lacked a constraint that should have made the target unambiguous.",
        further: [
          { question: "What is an environment failure?", answer: "A tool, dependency, permission or checkout prevents the agent from obtaining reliable evidence or applying the intended change." },
          { question: "What is a verification failure?", answer: "The checks allow an incorrect result to appear acceptable, often because the important behaviour is not exercised." },
        ],
      },
      {
        bridge: "Recovery should change the condition that could have produced the failure, not merely repeat the request louder.",
        meaning:
          "Targeted retries preserve learning. Blind retries spend time while leaving the original ambiguity or broken evidence untouched.",
        question: "A test command is unavailable in the agent's environment. Should the prompt simply be repeated?",
        answer:
          "No. Repair the environment or choose an available verification path, and record what evidence remains unavailable. Repeating the prompt cannot create a missing tool.",
        further: [
          { question: "When is a smaller follow-up useful?", answer: "When the evidence is adequate but the reasoning step is too broad. Ask for one discriminating check with a clear expected observation." },
          { question: "What should a recovery record contain?", answer: "The observed failure, its classification, the changed condition and the evidence showing whether the recovery worked." },
        ],
      },
    ],
    example: [
      "The agent produces a clean patch, but it changes a sibling service and the relevant test never runs.",
      ["Classify the failure", "The task did not identify the owning package, and the verification command did not cover the changed behaviour.", "There are both specification and verification gaps.", "Treating the result as a pure coding mistake."],
      ["Choose targeted recovery", "State the package boundary, add the retry acceptance test and rerun the narrow command before asking for further implementation.", "The next attempt has better information and stronger evidence.", "Sending the same prompt with 'please be careful' appended."],
    ],
    checks: [
      ["A missing dependency prevents a test from running. Which layer failed?", ["Environment", "Reasoning", "Typography"], 0, "Unavailable tools are an environment problem until proven otherwise."],
      ["The task's desired behaviour is ambiguous. What is the best recovery?", ["Repeat the prompt", "Rewrite the acceptance criteria", "Add random files"], 1, "Fix the specification before asking for another implementation."],
      ["The test suite passes without exercising the changed path. What failed?", ["Verification", "The model's vocabulary", "The repository name"], 0, "A weak check can certify the wrong result."],
    ],
    takeaway: "Classify the failure, change the condition that caused it and preserve the evidence from the recovery.",
    nextConnection: "The delegation loop now has a brief, an executable repository and a diagnosis step. The next chapter asks how to measure whether the resulting work is actually accepted and useful.",
    source: ["tools", "engines", "security"],
    practical: {
      title: "Lab 3 · Build a recovery loop",
      minutes: 30,
      brief:
        "Give an agent an intentionally underspecified maintenance task, observe the miss, classify it and improve exactly one layer at a time.",
      steps: [
        "Run the task once and record the requested result, evidence supplied and failure observed.",
        "Classify the miss as specification, context, environment, reasoning or verification.",
        "Change one condition that could explain the miss, then rerun the narrow task.",
        "Compare the second result and record which evidence supports the diagnosis.",
      ],
      deliverables: ["A failure classification", "One targeted recovery change", "A before-and-after evidence note"],
      review:
        "A strong lab report explains why the selected layer could produce the failure and shows evidence that the recovery changed the outcome. A second attempt that merely sounds more emphatic is not a controlled recovery.",
    },
  },
];
