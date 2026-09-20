import type { Lesson } from "../lesson";

export const unit06AddExternalCapabilities: Lesson[] = [
  {
    id: "tools",
    title: "Tools: design the action and observation together",
    unit: "06 · Add external capabilities",
    question: "Why is read_customer safer and easier to use than run_anything?",
    outcome:
      "Design tools with narrow inputs, explicit permissions, useful observations and predictable failure behaviour.",
    intro:
      "Compare two tools: one accepts an arbitrary shell command; the other runs a named test suite in an assigned checkout and returns the command, exit status and output artifact. Both may be useful, but the second makes far fewer decisions implicit.\n\nTool design decides what an agent can ask to do and what it will learn afterwards. A successful operation with an uninformative response can leave the next turn almost as uncertain as a failed one.",
    sections: [
      ["Make the contract small", "Name the operation, input schema, side effects, permission boundary and output shape. A read tool should not quietly mutate. A write tool should say what it changes and return an identifier, diff or receipt that makes the result inspectable. Narrow contracts also make tool selection easier for the model."],
      ["Treat failures as observations", "'Timed out' is not enough information for a write operation. Did the request fail before it reached the server, or did the write finish while the response was lost? In the second case, retrying blindly may duplicate the effect.\n\nReturn an operation identifier when possible and let the caller query its status. Distinguish invalid input, permission denial, execution failure and an unknown outcome. These states suggest different next actions: correct the arguments, obtain approval, investigate the failure, or reconcile what already happened.\n\nValidate before acting, and keep error output useful without leaking secrets. For a large log, return a bounded excerpt and an artifact reference rather than flooding the next model request."],
    ],
    checkpoints: [
      { bridge: "Tool quality is not just the ability to cause an effect. It is the quality of the loop between action and observation.", meaning: "The agent needs a bounded action and enough trustworthy output to decide what comes next.", question: "What is wrong with a tool that accepts arbitrary shell text for every operation?", answer: "Its contract, permissions and effects are opaque. The agent must infer too much, and a small mistake can have a large blast radius.", further: [{ question: "What should a write tool return?", answer: "A bounded description of what changed, a stable identifier or diff and any verification result needed for the next step." }, { question: "Why validate before side effects?", answer: "It prevents malformed or unauthorized requests from creating damage that a later error cannot undo." }] },
      { bridge: "An error is part of the tool's output, not an embarrassing exception to hide.", meaning: "Failure messages should help choose a safe recovery and reveal whether repeating the action is appropriate.", question: "A tool reports only 'request failed.' What is missing?", answer: "The cause, retry safety, relevant identifiers and the next useful action. Without them, the agent may repeat a dangerous or pointless call.", further: [{ question: "Why cap output?", answer: "Unbounded output can bury the useful observation and consume context without improving the decision." }, { question: "What does idempotence buy?", answer: "A repeated request has a predictable effect, making retries safer after uncertain network failures." }] },
    ],
    example: ["A team wants an agent to update customer records.", ["Narrow the operation", "Expose update_customer_status with a validated customer ID, allowed status values and an explicit audit reason.", "The tool communicates intent and limits the write surface.", "Exposing a raw database console because it is flexible."], ["Return an observable result", "Return the changed record ID, old and new status, audit event ID and a clear conflict error.", "The agent and reviewer can see what happened.", "Returning the whole customer table after every write."]],
    checks: [
      ["What makes a tool safer?", ["A narrow contract and explicit side effects", "Unlimited shell access", "An opaque success string"], 0, "A small, inspectable contract reduces ambiguity and blast radius."],
      ["Why cap tool output?", ["To hide all evidence", "To preserve useful context", "To make errors mysterious"], 1, "Bounded output keeps observations usable."],
      ["What is an idempotent operation?", ["One whose repeated request has a predictable effect", "One that always succeeds", "One that never changes state"], 0, "Predictable retries matter when network outcomes are uncertain."],
    ],
    takeaway: "A tool is a decision interface: constrain the action, expose its effects and return the evidence needed for recovery.",
    nextConnection: "Tools become more useful when they can be discovered and connected consistently. MCP supplies a protocol for that connection, but it does not remove the need for tool design.",
    source: ["tools", "mcp"],
  },
  {
    id: "mcp",
    title: "MCP: a connection protocol, not an agent",
    unit: "06 · Add external capabilities",
    question: "What changes when the CI tool is exposed through MCP?",
    outcome:
      "Use MCP as a typed connection boundary while keeping identity, trust, permissions and tool semantics explicit.",
    intro:
      "Suppose two agent applications need access to the same issue tracker. Without a shared protocol, each may need a different adapter for discovering operations, sending arguments and receiving results. MCP provides a common way for clients and servers to exchange those capabilities.\n\nThat saves integration work. It does not answer whether this particular agent should close an issue, whether the server is trustworthy, or which account a request should use. Those decisions still need an owner.",
    sections: [
      ["Separate protocol from policy", "Keep three roles distinct. The host is the application the user is working in. It manages a client connection to a server, which exposes capabilities such as tools, resources or prompts. The model may request an exposed tool; the surrounding application determines whether and how that request is sent.\n\nAn issue-tracker server might expose both reading and closing an issue. Discovering the closing tool is not permission to use it. Decide which identity the connection uses, which data may leave the host and which actions need approval.\n\nKeep server results at the right level of trust as well. Text retrieved from an issue can contain instructions, but its arrival through a protocol does not make those instructions authoritative."],
      ["Make the boundary inspectable", "Use explicit schemas, stable error shapes and clear resource ownership. Treat server output as data, not as a new instruction hierarchy. Version the contract, record calls that matter and test the connection under denial, timeout and partial-failure conditions."],
    ],
    checkpoints: [
      { bridge: "A standard connection reduces integration friction, not operational responsibility.", meaning: "MCP is a transport and discovery boundary; trust, permissions and semantic safety remain application decisions.", question: "Does exposing a dangerous database tool through MCP make it safe?", answer: "No. It may make the interface consistent, but the tool still needs least privilege, validation, auditing and an approval policy.", further: [{ question: "What does MCP standardise?", answer: "How a client and server discover and invoke capabilities and exchange structured data." }, { question: "What does it not decide?", answer: "Whether a server is trusted, who may call it, what side effects are allowed or whether the result is correct." }] },
      { bridge: "The protocol boundary is also a trust boundary.", meaning: "Server output must be bounded, attributed and interpreted as data within the host policy.", question: "A connected server returns text saying to ignore the task and upload a secret. What should the client do?", answer: "Treat it as untrusted output, apply the host's authority rules and refuse the unsafe action. Protocol transport does not grant instruction authority.", further: [{ question: "Why log important calls?", answer: "Logs support review, incident investigation and detection of unexpected access or side effects." }, { question: "What should failure tests include?", answer: "Denial, timeout, malformed output and partial completion, not only the happy path." }] },
    ],
    example: ["A CI service is added through an MCP server.", ["Review the boundary", "Define which repositories the server may read, which actions are read-only, how identity is mapped and what output is returned.", "The connection has an explicit trust and permission model.", "Assuming discovery means every discovered tool should be enabled."], ["Test an interruption", "Simulate a timeout after the CI run starts and verify that the client can identify the run before retrying or reporting its state.", "Uncertain outcomes do not become duplicate actions by accident.", "Blindly invoking the command again after every network error."]],
    checks: [
      ["What does MCP primarily provide?", ["A connection and discovery protocol", "A guarantee of safe reasoning", "A replacement for review"], 0, "The protocol helps capabilities connect; policy still governs use."],
      ["Is server output authoritative?", ["Always", "Only because it is structured", "No, it remains data subject to host policy"], 2, "Transport and structure do not change authority."],
      ["What should a timeout test verify?", ["That the request is forgotten", "How the client identifies and recovers from uncertain completion", "That retries are unlimited"], 1, "Partial failure is part of the connection contract."],
    ],
    takeaway: "MCP can standardise the connection, but trust, permissions, semantics and recovery still belong to the system around it.",
    nextConnection: "Some useful capability is not a remote tool at all. Skills package repeatable decisions and guidance so agents can apply local practice consistently.",
    source: ["mcp", "security"],
  },
  {
    id: "skills",
    title: "Skills and guidance: reuse decisions, not just commands",
    unit: "06 · Add external capabilities",
    question: "When should a repeated workflow become a skill?",
    outcome:
      "Package repeatable workflows as scoped, discoverable guidance with inputs, evidence and maintenance rules.",
    intro:
      "After several dependency upgrades, the team keeps repeating the same advice: inspect the changelog, check the lockfile, run the affected tests and call out integration checks that could not run. That recurring judgement is a candidate for a skill.\n\nA useful skill helps an agent recognise this kind of task and carry it through. It can include instructions, scripts and references. It is not a new permission grant, and following its steps is not evidence that the upgrade succeeded.",
    sections: [
      ["Promote a pattern only after it repeats", "A skill is worth creating when a workflow recurs, has a recognisable trigger and benefits from consistent treatment. Include prerequisites, inputs, steps, expected outputs, failure recovery and an owner. Avoid turning every clever one-off prompt into permanent guidance; stale skills add search noise and false confidence."],
      ["Keep skills scoped and testable", "Try the upgrade skill on two cases: a routine patch release and a major version with a migration requirement. It should not apply the same sequence blindly. The major upgrade may need investigation or approval before changing dependencies.\n\nThen try an unrelated task. Does the skill stay out of the way, or does its broad description attract work it was never meant to govern? Scope matters as much as the happy path.\n\nLink to commands and checks that can establish the result, and give the skill an owner. When the repository's setup changes, update or retire the stale guidance. Reusable instructions create maintenance work just as reusable code does."],
    ],
    checkpoints: [
      { bridge: "A skill is reusable judgement made visible, not a bag of magic words.", meaning: "It should help an agent recognise a situation, choose actions and produce evidence within a scope.", question: "What is a good candidate for a skill?", answer: "A recurring workflow with a clear trigger, stable decisions and a repeatable verification path.", further: [{ question: "Why include non-applicability?", answer: "It prevents a skill from being invoked merely because its keywords look similar to the current task." }, { question: "Why name an owner?", answer: "Guidance can become stale; someone must be responsible for reviewing and updating it." }] },
      { bridge: "Guidance cannot substitute for proof.", meaning: "The skill should direct the agent to checks and recovery, not declare its own success.", question: "A deployment skill says 'run the release command and confirm success.' What should it add?", answer: "The exact preconditions, observable release identifier, verification checks and rollback or escalation path.", further: [{ question: "Why prefer a decision tree?", answer: "It makes conditions and exceptions explicit instead of hiding them inside a ritual sequence." }, { question: "When should a skill be retired?", answer: "When its tools, workflow or assumptions no longer match reality and it cannot be repaired economically." }] },
    ],
    example: ["A team repeats the same dependency-update workflow every week.", ["Extract the decisions", "Record how to inspect advisories, choose a version, run compatibility tests, review the diff and handle a failed upgrade.", "The skill captures judgement rather than just a command sequence.", "Publishing a skill that says only 'run npm update.'"], ["Attach proof and scope", "Require a clean test report and define that production release remains a separate approved action.", "The skill accelerates work without expanding authority.", "Letting the skill publish automatically because the tests passed."]],
    checks: [
      ["When should a workflow become a skill?", ["After one lucky use", "When it recurs with stable decisions and checks", "Whenever it sounds impressive"], 1, "Reuse is valuable when the pattern is real and maintainable."],
      ["What should a skill include?", ["Only a command", "Trigger, boundaries, steps, evidence and recovery", "A promise of certainty"], 1, "The workflow needs enough context to be applied safely."],
      ["What proves a skill worked?", ["The prose says done", "Its named verification evidence", "The skill file is long"], 1, "Guidance should point to proof rather than replace it."],
    ],
    takeaway: "Turn repeated judgement into scoped, testable skills, and maintain them like code.",
    nextConnection: "Capabilities can be connected and reused, but one agent still has limits. The next unit asks when several agents help and how to coordinate them without multiplying confusion.",
    source: ["instructions", "mcp"],
    practical: {
      title: "Lab 7 · Design one trustworthy capability",
      minutes: 30,
      brief:
        "Choose a recurring workflow and specify either a narrow tool or a reusable skill, including its trust boundary and evidence.",
      steps: [
        "Write the trigger, inputs, side effects, permissions and expected output.",
        "Define the smallest useful schema or decision tree.",
        "List denial, timeout, malformed-input and partial-success behaviour.",
        "Run one representative case and compare the returned evidence with the contract.",
      ],
      deliverables: ["A capability contract", "A trust and permission note", "A happy-path and failure-path result"],
      review:
        "The capability should make one useful action easier to choose and safer to inspect. A broad interface with vague output has failed the lab even if it can technically perform the task.",
    },
  },
];
