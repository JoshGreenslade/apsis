import type { Lesson } from "../lesson";
export const unit06AddExternalCapabilities: Lesson[] = [
  {
    id: "tools",
    title: "Tools: design the action and the observation together",
    unit: "06 · Add external capabilities",
    question: "Why is read_customer safer and easier to use than run_anything?",
    outcome:
      "Design a tool schema, validation boundary and informative result for a specific engineering capability.",
    intro:
      "Picture a hotel front desk where the key-request form is beautifully designed: a clear field for the room number, a clear field for the guest’s name, everything filled in exactly as the form intends. A guest submits it, room number and all, and the desk clerk, satisfied that the form itself was filled in correctly, hands over a key to a room that is not actually theirs. The form was a genuine success as a form. It captured the right information in the right shape. It simply never checked the one thing that actually mattered, which was whether this particular guest was allowed into this particular room.\n\nSomething identical happens the moment a coding agent requests a tool. The model sends through a perfectly well-formed request: valid JSON, the right fields, all filled in exactly as the schema describes. The server on the other end accepts a repository path that turns out to be invalid, or simply not one this caller should ever have been allowed to touch, and returns a stack trace back to the model that happens to contain live credentials. The schema did its job, syntactically. The tool’s actual contract, the part that should have decided whether this specific request was allowed at all, was never actually built.\n\nA tool, understood properly, is an interface standing between a proposed action and whatever real execution follows it. Building one well means deciding, deliberately, what can even be requested in the first place, who is allowed to make that request, how the arguments actually get checked once they arrive, and what the caller is actually able to learn back from whatever happens next.",
    sections: [
      [
        "Schemas describe; executors enforce",
        "A schema’s job is to name fields and their types, so a model has something concrete to fill in when it wants to form a request. That is genuinely useful, and it is also the entirety of what a schema does. Server-side validation still has to check the things a schema was never designed to check: whether this particular repository is one the caller is permitted to touch, whether a number falls inside some sensible bounded range, whether a requested state transition is even valid at all, and who, exactly, is asking. Structured output makes a request easy to parse. It does nothing whatsoever to make the requested action correct, or authorised.\n\nWhere you have a choice, prefer a narrow, domain-specific operation over a broad, general-purpose one. Something like get_ci_failure(run_id) can return a bounded, focused summary of one failure, along with a reference back to the raw log if more detail is needed. A general-purpose shell can, admittedly, achieve far more tasks than any narrow tool ever could, but its input space and its possible side effects are correspondingly harder to actually constrain. It is worth noting, though, that narrowness alone is not automatically safety: a narrowly named operation like delete_customer is still every bit as destructive as a broad one, just better labelled.",
      ],
      [
        "Return observations that support the next decision",
        "A genuinely good result carries a clear status, whatever relevant data actually applies, some indication of where that data came from, and an error that can actually be acted on if something went wrong. It is worth distinguishing not_found from denied from transient_error from succeeded, rather than collapsing all four into the same generic failure. Returning an empty string for every possible kind of failure is a common shortcut, and a genuinely costly one: the agent on the receiving end has no way to know whether it should change its argument and try again, request access it currently lacks, or simply wait and retry later, because the response gave it nothing to distinguish those very different situations.\n\nBound the size of what gets returned, while still preserving some way to retrieve further detail if it turns out to be needed. For anything that writes, support idempotency wherever a retry is even conceivable, so a repeated request cannot accidentally cause the same side effect twice. Log enough detail to actually audit what an operation did, while deliberately excluding anything secret from that log. And keep in mind that tool descriptions, and whatever documents a tool happens to return, can themselves contain untrusted text; the policy governing what is allowed to execute must never be quietly handed over to whatever a returned string happens to say.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "A tool call that parses correctly still has to be checked for whether it is actually allowed. Those are two separate jobs.",
        meaning:
          "A schema only names fields and types so a request can be formed; server-side validation must separately enforce permitted values, ranges, state transitions and caller authorisation. Structured output makes a request parseable, not correct or allowed.",
        question:
          "A tool request is valid JSON with a syntactically well-formed repository path. Does this mean the request should be executed?",
        answer:
          "Not necessarily. Validity of shape says nothing about whether that specific path or operation is actually authorised for this caller.",
        further: [
          {
            question:
              "A schema restricts a field to an enum of three values. Does this alone guarantee the caller is allowed to use all three?",
            answer:
              "No. An enum only limits which values a well-formed request may contain; whether this specific caller may invoke each value is a separate, server-side authorisation decision.",
          },
          {
            question:
              "Why is 'the request parsed without error' a weaker claim than 'the request should be executed'?",
            answer:
              "Parsing only confirms the shape matches the schema. Execution additionally requires permission, valid state, and business-rule checks that a schema cannot express on its own.",
          },
        ],
      },
      {
        bridge:
          "Once a request executes, what comes back matters just as much as what went in — it decides whether the next decision can be a good one.",
        meaning:
          "A result should distinguish not_found, denied, transient_error and succeeded, with enough detail to act on, while bounding size and avoiding secret disclosure. An empty string on every kind of failure gives the next decision nothing to work with.",
        question:
          "A tool call is denied for lacking permission, but it returns an empty string just like a genuinely empty result would. What problem does this create?",
        answer:
          "The next decision cannot tell a permission problem from an empty-but-successful result, so it cannot choose the right recovery action, such as requesting access instead of retrying.",
        further: [
          {
            question:
              "Why should a tool distinguish transient_error from denied rather than returning one generic 'failed' status for both?",
            answer:
              "A transient error may succeed if retried, while a denial will not change on retry and instead needs an escalation or a different approach; collapsing them into one status removes the information needed to choose correctly.",
          },
          {
            question:
              "A tool truncates long results without any indication that truncation occurred. What risk does this create?",
            answer:
              "The caller may treat a partial result as the complete picture and draw a wrong conclusion, since nothing in the response signals that data was cut off.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A request has a valid schema-conforming shape. What has this actually established?",
        [
          "That the operation is authorised",
          "That the request can be parsed, nothing about authorisation",
          "That the operation will succeed",
        ],
        1,
        "Schema validity and authorisation are separate concerns; one does not imply the other.",
      ],
      [
        "Why give a tool a narrow, specific name like read_customer rather than a broad one like run_anything?",
        [
          "Narrow names are shorter to type",
          "A narrow tool bounds what can go wrong and what must be reviewed",
          "Broad tools are always faster",
        ],
        1,
        "A narrowly scoped tool limits the blast radius of a mistaken or malicious call.",
      ],
      [
        "What should a well-designed tool result distinguish?",
        [
          "Only success or failure",
          "not_found, denied, transient_error and succeeded, each with enough detail to act on",
          "Nothing; a string is sufficient",
        ],
        1,
        "Distinct, informative outcomes let the next decision choose the correct recovery path.",
      ],
    ],
    example: [
      "Design a CI-log tool for the flaky-retry investigation.",
      [
        "Specify a narrow request",
        "Accept repository and run ID, validate access to that repository and cap the requested log range.",
        "The caller needs one run’s evidence, not arbitrary filesystem or organisation access.",
        "Relying on a description that says only use allowed repositories.",
      ],
      [
        "Return a discriminating result",
        "Return the command, exit status, relevant failure excerpt and an artifact pointer, or a typed error.",
        "The next model decision depends on what actually happened.",
        "Returning success with an empty excerpt when access was denied.",
      ],
    ],
    checks: [
      [
        "Does valid JSON establish authorisation?",
        [
          "Yes",
          "Only for frontier models",
          "No; server policy must check the action",
        ],
        2,
        "Syntax validation and access control are separate concerns.",
      ],
      [
        "Which tool result best supports recovery?",
        [
          "A typed denied error with safe explanatory context",
          "An empty string",
          "A secret-filled stack trace",
        ],
        0,
        "A clear error category supports the right next action without unnecessary disclosure.",
      ],
      [
        "What does idempotency help with?",
        [
          "Making all reasoning correct",
          "Avoiding duplicate side effects when a request is retried",
          "Expanding tool permissions",
        ],
        1,
        "A stable request identity can let an executor recognise already-completed work.",
      ],
    ],
    takeaway:
      "A useful tool couples a constrained operation with an observation the agent can interpret correctly.",
    nextConnection:
      "A well-designed tool is still only useful to one product at a time until it can be shared. The next lesson is about the protocol that makes that sharing possible.",
    source: ["tools", "mcp"],
    flow: [
      "Model proposes structured arguments",
      "Executor validates and authorises",
      "Operation runs within its boundary",
      "Typed, bounded observation returns",
    ],
  },
  {
    id: "mcp",
    title: "MCP: a connection protocol, not an agent",
    unit: "06 · Add external capabilities",
    question: "What changes when the CI tool is exposed through MCP?",
    outcome:
      "Place an MCP host, client and server in the architecture and identify where permissions remain enforced.",
    intro:
      "Before standard electrical plugs existed, every single appliance needed its own custom wiring run directly into the wall, and every new appliance meant an electrician wiring up a new connection from scratch. The invention of the standard plug and socket did not decide which appliances were worth owning, and it certainly did not guarantee that whatever got plugged in was safe or sensible to run. What it did was solve one specific, narrow, extremely useful problem: getting power from the wall into a device no longer required custom wiring work every single time.\n\nYou are facing a version of this problem the moment you have a working CI-log API and three separate agent products that all need to use it. Writing a bespoke integration for each of those three products means repeating the same discovery logic, the same schema, and the same invocation plumbing three separate times, for no reason other than that three different products happen to want the same underlying capability. MCP exists to address exactly this integration boundary, in the same way a standard plug addressed the wiring boundary.\n\nIt is worth being precise about what MCP does not do, because it is tempting to credit it with more than it delivers. It does not decide which incident is actually important, and it does not decide whether an investigation is actually complete, those remain squarely the responsibilities of the agent and whatever workflow surrounds it. The protocol connects capabilities together. It does not supply the entire system that decides what to do with them, any more than a standard plug decides what you should plug into it.",
    sections: [
      [
        "Follow the client–server relationship",
        "An MCP host is the application actually managing the interaction, think of it as the appliance itself. Its MCP client is the part of that host that speaks the protocol, communicating with a server that exposes capabilities such as tools and resources, in the same way a plug communicates with whatever socket it happens to be plugged into. The host can make whatever tools its client discovers available to its own model; a tool request travels from the model, through the client, to the server, and an observation travels all the way back. The server itself may simply wrap an existing company API rather than containing anything resembling a model of its own, there is no requirement that the thing on the other end of the socket be intelligent.\n\nFor the CI example, a server can expose get_ci_failure while the company’s existing CI service remains the actual source of truth underneath it. MCP supplies a common integration shape; the server itself still has to implement the actual domain operation being exposed. Swapping out the transport, or swapping out which client happens to be talking to the server, does not change what a failure log actually means, any more than swapping which brand of plug you use changes what electricity does once it reaches the appliance.",
      ],
      [
        "Keep identity and trust explicit",
        "Decide, explicitly, whose authority is actually being used whenever the server calls through to the underlying company system. A server holding broad, organisation-wide credentials can end up exposing far more than the current user in front of it should be able to see, unless it separately, deliberately enforces the right checks on every single request. The exact transport and authentication details will depend on how you deploy things, so it is worth following whatever the current protocol and host documentation actually say, rather than assuming last year’s setup still applies.\n\nA discovered tool’s description is information about a capability that exists. It is not, on its own, a grant of permission to use it. Tool results, and any resources a server returns, can themselves contain material an attacker deliberately planted there; keep all of it firmly in the category of data to be inspected, never authority to be obeyed, and constrain outbound destinations and write actions on their own separate, independent terms. Adding MCP to your architecture does not, by itself, eliminate prompt injection, does not eliminate the need for real access control, and does not eliminate the need for a genuine audit trail.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "Building the same integration separately for three different agent products repeats the same plumbing three times. MCP exists to remove exactly that repetition.",
        meaning:
          "A host’s client talks to a server that exposes tools and resources; the server can simply wrap an existing company API rather than containing any model itself. The protocol standardises the connection, not the judgement about what to investigate.",
        question:
          "Can an MCP server expose a capability that is implemented entirely by ordinary software, with no model involved at all?",
        answer:
          "Yes. A server can wrap a conventional API and expose its operations as tools; nothing about MCP requires the server itself to run a model.",
        further: [
          {
            question:
              "Two products each build their own bespoke integration with the same internal ticketing API. What does exposing that API via one MCP server change?",
            answer:
              "Both products can reuse the same server instead of each maintaining a separate integration, removing duplicated plumbing without changing what the underlying API actually does.",
          },
          {
            question:
              "Does the MCP protocol itself decide what an agent should investigate or how it should reason?",
            answer:
              "No. It standardises the connection and discovery mechanism between host and server; the judgement about what to investigate remains with the model and the harness, not the protocol.",
          },
        ],
      },
      {
        bridge:
          "Sharing a capability across products raises a question that a single integration could avoid: whose authority is actually being used when the server acts?",
        meaning:
          "A server holding broad credentials can expose more than the current caller should see unless it separately enforces per-caller checks. A tool being discoverable says nothing about whether a specific request should be allowed.",
        question:
          "Can a model’s confident, well-formed tool request to a discovered MCP tool be trusted as automatically authorised?",
        answer:
          "No. Discovery and authorisation are separate; the server must still enforce which records or actions a given caller may access.",
        further: [
          {
            question:
              "A server holds one broad service credential shared across all callers. What risk does this create once the server is exposed to multiple products?",
            answer:
              "Without per-caller checks, any connected caller could potentially reach data or actions beyond what it specifically should be allowed, since the server's own authority doesn't automatically narrow itself per caller.",
          },
          {
            question:
              "Why does making a tool 'discoverable' to a model say nothing about whether a given request to it should be allowed?",
            answer:
              "Discovery is about visibility — the model can see and attempt to call the tool — while authorisation is a separate enforcement step the server must perform per request, independent of what the model can see.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "What is the main benefit of exposing a capability through MCP rather than as a bespoke per-product integration?",
        [
          "It makes the model smarter",
          "It lets multiple host products reuse the same server instead of duplicating integration work",
          "It removes the need for authorisation checks",
        ],
        1,
        "MCP standardises the connection so integration work isn't repeated per product.",
      ],
      [
        "A server can be implemented as a thin wrapper around an existing API. What does this imply about MCP servers generally?",
        [
          "Every server must itself run a model",
          "A server can expose ordinary software capabilities with no model involved",
          "Servers cannot wrap existing APIs",
        ],
        1,
        "MCP servers are a connection and exposure mechanism, not necessarily model-hosting themselves.",
      ],
      [
        "A tool is discoverable by a connected model. What must still happen before a specific request to it is executed?",
        [
          "Nothing further is needed",
          "The server must separately authorise that specific request for that caller",
          "The model's confidence level determines authorisation",
        ],
        1,
        "Discovery and authorisation are distinct; visibility does not imply permission.",
      ],
    ],
    example: [
      "Expose the CI failure reader to two coding-agent products.",
      [
        "Locate MCP in the stack",
        "Each product acts as a host with a client connection to your CI MCP server. The server validates the caller and delegates the read to the CI service.",
        "The integration becomes reusable while the domain policy stays near the data.",
        "Drawing MCP as the model or the job scheduler.",
      ],
      [
        "Test the permission boundary",
        "Use one permitted run and one forbidden repository. Confirm the latter is denied by the server even if the model requests it confidently.",
        "Security must hold for adversarial or mistaken requests.",
        "Assuming successful tool discovery means access to every repository is allowed.",
      ],
    ],
    checks: [
      [
        "What problem does MCP primarily address here?",
        [
          "Selecting the best hypothesis",
          "Standardising capability integration between hosts and servers",
          "Guaranteeing an agent’s task completion",
        ],
        1,
        "MCP handles the integration boundary; the agent and orchestrator still make task decisions.",
      ],
      [
        "Can an MCP server wrap a conventional API without a model?",
        [
          "Yes",
          "No, every server is an autonomous agent",
          "Only if it trains a model first",
        ],
        0,
        "A server can expose tools and data implemented by ordinary software.",
      ],
      [
        "A tool is discoverable. Does that prove a requested record is authorised?",
        [
          "Always",
          "If its name sounds safe",
          "No, authorisation still needs enforcement",
        ],
        2,
        "Discovery and access to a particular resource are distinct operations.",
      ],
    ],
    takeaway:
      "MCP connects hosts to capabilities. The harness, server and underlying system still own decisions, execution and permissions.",
    nextConnection:
      "Tools and MCP supply capability. The next lesson asks how to package the reusable know-how for using them well.",
    source: ["mcp", "security"],
    flow: [
      "Agent product / MCP host",
      "Host’s MCP client",
      "Company MCP server",
      "Authorised CI service operation",
      "Observation returns to the agent",
    ],
  },
  {
    id: "skills",
    title: "Skills and guidance: reuse decisions, not just commands",
    unit: "06 · Add external capabilities",
    question:
      "When should organisational knowledge be an instruction, a tool or a skill?",
    outcome:
      "Package reusable procedures with clear scope while keeping execution capability separate.",
    intro:
      "A hospital ward often keeps a laminated card taped to the crash cart, listing out, step by step, exactly what to check and in what order during a particular kind of emergency. That card is genuinely valuable: it encodes hard-won experience so nobody has to reconstruct the right sequence of questions from memory, under pressure, at three in the morning. But notice what the card itself cannot do. It cannot check a patient’s blood pressure. It cannot administer a drug. If the defibrillator on the cart is missing or broken, the card will not conjure a working one into existence. The card is knowledge about a procedure. The equipment on the cart is what actually lets that procedure be carried out.\n\nEvery incident investigator you might build ends up asking a very similar recurring set of questions: which service actually owns this kind of failure, what evidence belongs in a proper report, and at what point should this be escalated into an issue rather than quietly closed out? Writing these conventions down once, so nobody has to reconstruct them from scratch each time, can genuinely save a great deal of repeated explanation. But a document describing exactly how to run a particular database query does not, by itself, give an agent database access, any more than the laminated card gives the nurse a working defibrillator.\n\nThe distinction worth holding onto here is between procedural knowledge and executable capability, and it is worth keeping the two firmly apart in how you build things. Instructions guide behaviour: they tell you, or an agent, what to do and in what order. Tools actually perform operations: they are the equipment on the cart, not the card taped to it. A skill, in this framing, packages up reusable guidance, and, depending on the product you are using, whatever supporting scripts or resources go along with it, for some particular recurring class of task.",
    sections: [
      [
        "Choose the right home for knowledge",
        "Stable, durable repository conventions belong in whatever guidance mechanism your particular harness actually loads and reads, not scattered across a dozen different files on the hope that something picks them up. A reusable incident procedure can genuinely be packaged as a skill, with a clear trigger describing when it applies, a statement of what evidence it requires, and a template for its output. A permission-sensitive operation, on the other hand, belongs in a tool, with a real executor behind it that actually validates the request before doing anything.\n\nIt is worth avoiding turning a skill into a bag of loosely related instructions that gets loaded for every single task regardless of relevance. Excess material of this kind competes for attention with whatever the current goal actually is, and dilutes the very thing that made the skill useful in the first place. State plainly when a given procedure actually applies, what inputs it genuinely needs, and under what circumstances its assumptions stop holding. Check the specific, current discovery rules of whichever product you are using, rather than assuming one particular folder convention works identically everywhere.",
      ],
      [
        "Version the procedure and its evidence",
        "Organisational knowledge, unlike a law of physics, changes over time, and a skill needs to be maintained with that fact in mind. Include an owner, or at least some kind of review process, references back to wherever the underlying policy actually comes from, and concrete examples of what a correct output looks like in practice. Test the procedure against both a perfectly normal case and a genuine exception, because a runbook that only handles the easy case is not much of a runbook. A stale procedure, quietly followed with confidence, can produce consistent, repeated mistakes far faster than an improvised, uncertain response ever would.\n\nIt is worth remembering, too, that a skill cannot grant access the underlying environment has actually denied, no amount of confident phrasing in a skill’s instructions overrides a sandbox’s decision. The reverse deserves equal caution: a script that happens to be bundled alongside a skill still executes with real, genuine process authority when it runs, and deserves exactly the same code review as anything else that runs with that authority. Keep reusable guidance descriptive enough that it can genuinely transfer from one situation to the next, while keeping secrets and any run-specific state firmly outside the package itself.",
      ],
    ],
    checkpoints: [
      {
        bridge:
          "The same investigation questions get asked on every incident. Before writing them down once and for all, decide what kind of thing that write-up actually is.",
        meaning:
          "Stable conventions belong in the guidance mechanism the harness loads; reusable procedures can be packaged as a skill; permission-sensitive operations belong in a tool with an enforcing executor. A document describing a database query does not, by itself, grant database access.",
        question:
          "Does packaging an incident-investigation procedure as a skill give the agent database access it did not already have?",
        answer:
          "No. A skill can guide behaviour and describe a procedure, but only a tool with a real executor can grant an executable capability like database access.",
        further: [
          {
            question:
              "A skill's written procedure references a query pattern that was correct a year ago but the schema has since changed. What kind of failure does a stale skill like this cause?",
            answer:
              "A consistent, repeated mistake followed with confidence — because the procedure looks authoritative, it can be trusted and applied without question, producing wrong results faster and more consistently than an uncertain, improvised response would.",
          },
          {
            question:
              "Why is a stable convention better placed in the harness's always-loaded guidance mechanism than inside a one-off skill?",
            answer:
              "A convention that should apply universally needs to be seen every time, whereas a skill is invoked selectively for a specific procedure; putting a universal rule inside a selectively-loaded skill risks it silently not applying when it should.",
          },
        ],
      },
      {
        bridge:
          "Organisational knowledge is not static. A reusable procedure needs the same maintenance discipline as any other piece of the system.",
        meaning:
          "An owner, a review process and tested examples on both a normal and an exceptional case keep a procedure trustworthy as circumstances change. A script bundled with a skill still executes with real process authority and deserves the same review as any other code.",
        question:
          "Can a skill’s written guidance override a sandbox’s denial of a requested action?",
        answer:
          "No. Guidance is not a mechanism for granting denied permissions; the execution boundary remains authoritative regardless of what the skill instructs.",
        further: [
          {
            question:
              "A skill bundles a helper script that runs with the agent's full process authority. Does bundling it inside a skill change how much review that script deserves?",
            answer:
              "No. It executes with real, genuine authority when run, and deserves exactly the same code review as any other code granted that authority, regardless of where it's packaged.",
          },
          {
            question:
              "A skill is tested only against the normal, easy case it describes. What does this leave unverified?",
            answer:
              "Whether the procedure handles a genuine exception correctly — a runbook that only works for the easy case can quietly fail, or worse, produce a confident wrong answer, the first time reality departs from the common path.",
          },
        ],
      },
    ],
    moreChecks: [
      [
        "A skill describes a database query procedure in detail. What capability does this description grant on its own?",
        [
          "Full database access",
          "None; a description does not grant an executable capability",
          "Read-only access automatically",
        ],
        1,
        "A skill guides behaviour; only a tool with a real executor grants an actual capability.",
      ],
      [
        "Why does a skill need an owner or review process, unlike a fixed law of physics?",
        [
          "Skills never change once written",
          "Organisational knowledge changes over time and needs maintenance to stay correct",
          "Ownership is only a formality",
        ],
        1,
        "Unlike physical law, organisational procedure drifts and requires upkeep to remain trustworthy.",
      ],
      [
        "A bundled script inside a skill package runs with real process authority. What follows for how it should be reviewed?",
        [
          "It needs no special review since it's just documentation",
          "It deserves the same code review as any other code with that authority",
          "Review is only needed if it touches the network",
        ],
        1,
        "Executable code carries real authority regardless of the package it ships inside.",
      ],
    ],
    example: [
      "Package the flaky-test investigation method for reuse.",
      [
        "Write a scoped procedure",
        "Trigger it for reproducible CI failures. Require run identity, baseline, discriminating experiment and an evidence-backed report; define an unavailable-evidence exit.",
        "Scope prevents the procedure from dominating unrelated tasks.",
        "A global instruction to investigate every warning in every repository.",
      ],
      [
        "Pair it with a capability",
        "Use the CI-log MCP tool for evidence and the skill for deciding what evidence to collect. Test the forbidden-repository case.",
        "The procedure explains how to work; the tool and server enforce what can be accessed.",
        "Embedding broad credentials in the skill so every run can bypass access failures.",
      ],
    ],
    checks: [
      [
        "Which component supplies an executable database capability?",
        [
          "A tool with a configured executor",
          "A sentence saying use the database",
          "A skill title",
        ],
        0,
        "Instructions do not create an API connection or execution authority.",
      ],
      [
        "What makes reusable guidance easier to maintain?",
        [
          "Loading every policy for every task",
          "Clear scope, provenance and a review process",
          "Removing all examples",
        ],
        1,
        "A bounded procedure can be tested and updated when its assumptions change.",
      ],
      [
        "Can a skill override a sandbox denial?",
        [
          "Yes, if it says MUST",
          "Yes, if it includes a diagram",
          "No; the execution boundary remains authoritative",
        ],
        2,
        "Guidance is not a mechanism for granting denied permissions.",
      ],
    ],
    takeaway:
      "Use guidance for conventions, skills for reusable procedures and tools for executable capabilities.",
    nextConnection:
      "You can now add external capability responsibly. The next unit turns to a different kind of complexity: when more than one agent is actually worth the coordination it costs.",
    source: ["instructions", "mcp"],
    practical: {
      title: "Lab 6 · Add one external capability",
      minutes: 40,
      brief:
        "Design or implement a read-only CI failure tool exposed through an MCP server. Use fixture data first so the integration can be tested without company credentials.",
      steps: [
        "Define the tool’s input schema, successful result and denied/not-found error results.",
        "Draw host, client, server and underlying service. Label the identity at each boundary.",
        "Use a supported MCP SDK or host inspector to discover and call the fixture tool. Follow the current protocol documentation linked in this lesson.",
        "Write a small incident-investigation skill that uses this capability, then test an unauthorised repository request.",
      ],
      deliverables: [
        "Tool schema and fixture results",
        "An integration diagram",
        "A scoped procedure and allowed/denied test evidence",
      ],
      review:
        "A valid integration shows discovery and an actual tool call, not merely a JSON schema in a document. The server must reject an out-of-scope request. If you only design the interface, label the artifact a design and record the remaining integration step.",
    },
  },
];
