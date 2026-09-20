import type {
  CurriculumTopic,
  LessonContent,
  LessonBlock,
  Problem,
} from "@/types/curriculum";
import {
  choice,
  contentFromCurriculumTopic,
  flowDiagram,
  pointFlow,
} from "@/curriculum-support/authoring";
import { sources } from "./sources";
import { lessonLayouts, lessonReferences } from "./layouts";
export type Check = [
  prompt: string,
  options: string[],
  correct: number,
  explanation: string,
];
export type Checkpoint = {
  bridge: string;
  meaning: string;
  question: string;
  answer: string;
  // Additional, progressively harder reflection prompts for the same section.
  further?: { question: string; answer: string }[];
};
export type Lesson = {
  id: string;
  title: string;
  unit: string;
  question: string;
  intro: string;
  sections: [heading: string, body: string][];
  // One checkpoint per theory section: a transition into it, a plain-language
  // reading of it, and a reflection prompt with its disclosed answer.
  checkpoints: [Checkpoint, Checkpoint] | [Checkpoint, Checkpoint, Checkpoint];
  example: [
    problem: string,
    ...steps: [title: string, body: string, reason: string, trap: string][],
  ];
  checks: [Check, Check, Check];
  // Extra graded questions appended to the retrieval-problem pool only.
  moreChecks?: Check[];
  outcome: string;
  takeaway: string;
  nextConnection: string;
  source: (keyof typeof sources)[];
  practical?: CurriculumTopic["practical"];
  flow?: string[];
  content?: LessonContent;
  minutes?: number;
};
type AgenticMinimum = NonNullable<CurriculumTopic["theoreticalMinimum"]>;
type AgenticMinimumOverrides = Pick<
  AgenticMinimum,
  "governingLaw" | "invariant" | "limitingCase" | "counterexample" | "validity"
>;

const agenticMinimumOverrides: Record<string, AgenticMinimumOverrides> = {
  models: {
    governingLaw:
      "A model maps supplied context to a proposed output; execution belongs to a separate system boundary.",
    invariant:
      "A fluent model claim is not an observation of the repository or a proof that any action occurred.",
    limitingCase:
      "With no relevant evidence in context, more inference cannot recover the missing observation.",
    counterexample:
      "A correct diagnosis in chat can coexist with an unchanged file and a still-failing test.",
    validity:
      "Model quality is only one part of a product outcome; context, tools, permissions, and verification remain outside the model.",
  },
  agents: {
    governingLaw:
      "An agent loop couples a model's proposed action with tool execution and an observation returned to the next turn.",
    invariant:
      "Every accepted action needs an attributable observation, and every stop state needs an explicit reason.",
    limitingCase:
      "Without a tool or an observation channel, the system is assistance, not execution-capable agency.",
    counterexample:
      "A model that emits a tool-shaped message but never reaches an executor has not changed the world.",
    validity:
      "The loop model describes control flow, not intelligence or reliability; those require separate evidence.",
  },
  harnesses: {
    governingLaw:
      "A harness owns the boundary between proposed actions and controlled, observable effects.",
    invariant:
      "Authority, identity, timeout, and completion evidence remain enforceable outside the model's request.",
    limitingCase:
      "A harness with no independent verification can only report claims, not establish completion.",
    counterexample:
      "An allowlisted command can still produce a false success if the final state is never checked.",
    validity:
      "Harness controls reduce operational risk but do not prove that the underlying task or model is correct.",
  },
  orchestration: {
    governingLaw:
      "Outer orchestration selects and routes work; the inner agent loop operates within one bounded task.",
    invariant:
      "Task identity, ownership, and completion evidence survive every handoff between layers.",
    limitingCase:
      "If there is only one task and one execution loop, an outer orchestrator adds complexity without leverage.",
    counterexample:
      "A router that retries an event without stable identity can publish duplicate work as if it were independent.",
    validity:
      "Orchestration coordinates bounded systems; it cannot repair an undefined task contract or absent evidence.",
  },
  context: {
    governingLaw:
      "A context window is a bounded evidence-selection problem: relevance matters more than raw volume.",
    invariant:
      "A claim must remain traceable to the context item or observation that supports it.",
    limitingCase:
      "An unlimited context budget would remove truncation pressure, but not ambiguity, stale evidence, or irrelevance.",
    counterexample:
      "A larger context containing the wrong generated file can be worse than a smaller context containing the current source.",
    validity:
      "Context quality is task-specific and cannot be inferred from token count alone.",
  },
  "context-engineering": {
    governingLaw:
      "Context engineering changes the information presented to a model so the intended decision becomes reconstructable.",
    invariant:
      "Every included item has a reason to be present, and omitted information is treated as an explicit uncertainty.",
    limitingCase:
      "Adding more documents eventually increases search and contradiction cost instead of improving the decision.",
    counterexample:
      "A perfectly formatted prompt can still fail when its evidence is stale or its acceptance condition is missing.",
    validity:
      "Context improvements are causal only when the task, model, tools, and acceptance test are otherwise controlled.",
  },
  memory: {
    governingLaw:
      "Memory is durable state carried between runs, not a substitute for revalidating the current world.",
    invariant:
      "Every resumed memory has an owner, scope, timestamp, and identity check against the task it describes.",
    limitingCase:
      "With no state worth carrying forward, adding memory only adds stale-state and privacy risk.",
    counterexample:
      "A confident checkpoint can be wrong after a manual edit changes the workspace it describes.",
    validity:
      "Memory improves continuity only when retrieval, expiry, correction, and provenance are designed explicitly.",
  },
  landscape: {
    governingLaw:
      "A capability choice is a fit problem between task requirements, evidence needs, cost, and operational constraints.",
    invariant:
      "A named model or product is not a complete experimental treatment; configuration and task distribution matter.",
    limitingCase:
      "For a task with no meaningful quality difference, the cheapest adequate capability dominates.",
    counterexample:
      "A benchmark winner can lose on the team's actual workload because its measured distribution is different.",
    validity:
      "Capability comparisons are local claims about a defined workload, not permanent universal rankings.",
  },
  environment: {
    governingLaw:
      "Agent reliability is a property of the model, environment, tools, permissions, and verification together.",
    invariant:
      "The environment presented during evaluation must match the environment in which the result will be accepted.",
    limitingCase:
      "A fully deterministic fixture removes environmental variance but cannot establish production robustness by itself.",
    counterexample:
      "A workflow that succeeds in a clean fixture can fail in a repository with generated files, permissions, or stale state.",
    validity:
      "Environment controls bound reproducibility; they do not make an unverified claim trustworthy.",
  },
  "long-horizon": {
    governingLaw:
      "Long-horizon work requires explicit state, checkpoints, bounded progress, and recovery rather than one uninterrupted context.",
    invariant:
      "A resumed run must re-establish task identity and evidence before continuing from a checkpoint.",
    limitingCase:
      "For a one-step task, checkpointing costs more than it saves and adds no recovery value.",
    counterexample:
      "More turns do not imply more progress when the agent repeats an action without changing its hypothesis.",
    validity:
      "Long-horizon reliability depends on recoverable state and measurable progress, not on context length alone.",
  },
  choosing: {
    governingLaw:
      "The right autonomy level is the least powerful arrangement that can meet the task's evidence and risk requirements.",
    invariant:
      "Escalation changes authority only when the acceptance test and rollback path remain explicit.",
    limitingCase:
      "When the task is ambiguous or irreversible, supervised assistance can be the maximum justified autonomy.",
    counterexample:
      "Automating a frequent task can reduce throughput if review, recovery, and maintenance cost exceed the saved effort.",
    validity:
      "An autonomy choice is valid only for the named task, environment, risk tolerance, and evidence contract.",
  },
  specification: {
    governingLaw:
      "A useful delegation contract maps goal, constraints, inputs, allowed actions, and acceptance evidence into an executable brief.",
    invariant:
      "The agent cannot be held responsible for an acceptance condition that was never made observable.",
    limitingCase:
      "If the goal and acceptance test are already unambiguous, extra prose does not improve the contract.",
    counterexample:
      "A detailed task description without a definition of done still permits plausible but unacceptable outputs.",
    validity:
      "Specifications guide delegated work; they do not replace independent review of the resulting artifact.",
  },
  "agent-friendly": {
    governingLaw:
      "Agent-friendly work exposes small actions, inspectable state, deterministic checks, and recoverable failure paths.",
    invariant:
      "Every important transition has a visible artifact or test that another operator can inspect.",
    limitingCase:
      "A task with no meaningful intermediate state may not benefit from further decomposition.",
    counterexample:
      "Breaking a task into smaller prompts can make it worse when the pieces lose the dependency or global constraint.",
    validity:
      "Agent-friendly design improves operability; it does not guarantee that the agent will choose the intended action.",
  },
  "failure-modes": {
    governingLaw:
      "A failure mode is useful only when its trigger, observable symptom, containment, and recovery are distinguishable.",
    invariant:
      "A failure must not be silently converted into apparent success by retries, truncation, or optimistic summaries.",
    limitingCase:
      "If a failure has no credible effect on acceptance, adding a specialised recovery path may not be justified.",
    counterexample:
      "A successful retry can hide an underlying reliability problem if only final success is counted.",
    validity:
      "Failure taxonomies support diagnosis within their tested environment; novel failures still require investigation.",
  },
  "gh-aw": {
    governingLaw:
      "An unattended workflow connects an external event to bounded execution, evidence collection, and a human decision boundary.",
    invariant:
      "Event identity, permissions, and approval state remain explicit across the workflow run.",
    limitingCase:
      "If no repeatable event or acceptance action exists, an unattended workflow has no stable job to perform.",
    counterexample:
      "A workflow can run successfully while producing no accepted engineering outcome.",
    validity:
      "The workflow's guarantees are limited to its configured triggers, permissions, tools, and checks.",
  },
  controls: {
    governingLaw:
      "Controls reduce the consequences of an agent action by limiting authority, requiring evidence, or stopping execution.",
    invariant:
      "Permission boundaries and approval gates are separate controls and must not be treated as interchangeable.",
    limitingCase:
      "A fully read-only workflow needs no write approval, but still needs evidence and resource limits.",
    counterexample:
      "A human approval gate does not repair an overly broad permission granted before the gate.",
    validity:
      "Controls lower risk within their enforcement point; a control outside the actual execution boundary is cosmetic.",
  },
  customisation: {
    governingLaw:
      "A custom workflow is a new system with its own contract, state transitions, tool policy, and evaluation burden.",
    invariant:
      "Custom behaviour must preserve the platform's event identity, permission, and completion semantics or document the change.",
    limitingCase:
      "If the platform already expresses the required contract, custom code adds maintenance without capability gain.",
    counterexample:
      "A shorter custom path can be less reliable when it removes the platform's verification or retry semantics.",
    validity:
      "Customisation is justified only by a measured requirement the existing path cannot satisfy.",
  },
  "workflow-patterns": {
    governingLaw:
      "A workflow pattern is a reusable arrangement of trigger, state, action, evidence, and human intervention.",
    invariant:
      "The pattern's acceptance condition must remain independent of the agent's own completion claim.",
    limitingCase:
      "A manual step is preferable when the automated path costs more to operate than the work it replaces.",
    counterexample:
      "Adding parallel branches can increase coordination and merge failure enough to reduce total throughput.",
    validity:
      "Patterns transfer only when their event, authority, evidence, and failure assumptions transfer too.",
  },
  tools: {
    governingLaw:
      "A tool is a typed authority boundary: it accepts validated arguments, performs a bounded effect, and returns an observation.",
    invariant:
      "Every tool call has a contract, identity, timeout, and result that can be attributed to that call.",
    limitingCase:
      "If a tool has no effect or observation, it is context rather than an executable capability.",
    counterexample:
      "A successful tool response can still be irrelevant if it acted on the wrong resource or stale revision.",
    validity:
      "Tool contracts describe intended behaviour; the executor must still enforce validation and permissions.",
  },
  mcp: {
    governingLaw:
      "An external capability becomes usable through a protocol contract that separates discovery, invocation, and returned evidence.",
    invariant:
      "The client must validate the server's identity, schema, arguments, authority, and result before using it.",
    limitingCase:
      "When no external state or capability is required, adding a protocol server only adds attack and maintenance surface.",
    counterexample:
      "A tool being discoverable does not mean it is safe, correctly scoped, or suitable for the current task.",
    validity:
      "Protocol guarantees cover message exchange, not the truthfulness, safety, or business meaning of an external result.",
  },
  skills: {
    governingLaw:
      "A skill packages repeatable instructions and checks so a capability can be invoked consistently within a bounded context.",
    invariant:
      "The skill's declared inputs, outputs, side effects, and version remain inspectable to its caller.",
    limitingCase:
      "For a single transparent action, packaging a skill can cost more than invoking the action directly.",
    counterexample:
      "A polished skill can amplify a bad instruction across every invocation instead of improving the underlying decision.",
    validity:
      "A skill is a reusable procedure, not proof that its output is correct in every environment.",
  },
  "why-multiple": {
    governingLaw:
      "Multiple agents earn their cost only when division of labour creates independent evidence, parallelism, or a needed viewpoint.",
    invariant:
      "The roles, contracts, and evidence contributions of each worker remain distinguishable.",
    limitingCase:
      "If one agent can complete and verify the task within its budget, adding another agent is overhead.",
    counterexample:
      "Two agents repeating the same context and conclusion do not provide independent verification.",
    validity:
      "Multi-agent benefits depend on task decomposition, communication cost, and actual independence.",
  },
  subagents: {
    governingLaw:
      "A subagent is a bounded worker with a narrow question, explicit return schema, and an accountable parent.",
    invariant:
      "Every worker result includes evidence and uncertainty, and the parent remains responsible for acceptance.",
    limitingCase:
      "A worker with no distinct question or evidence source should not be spawned.",
    counterexample:
      "A worker that echoes the parent's premise cannot function as independent review.",
    validity:
      "Delegated reasoning reduces local complexity only when the worker contract and failure handling are explicit.",
  },
  coordination: {
    governingLaw:
      "Coordination composes worker outputs through shared state, ordering, identity, and conflict handling.",
    invariant:
      "Every shared-state update has an owner, version, and conflict policy.",
    limitingCase:
      "With one writer and no concurrent work, coordination machinery is unnecessary.",
    counterexample:
      "Parallel workers can each be locally correct while their combined edits violate a global constraint.",
    validity:
      "Coordination protocols are only as reliable as their identity, ordering, and recovery guarantees.",
  },
  patterns: {
    governingLaw:
      "A coordination pattern should be selected from the dependency graph and evidence needs, not from the number of available agents.",
    invariant:
      "The final acceptance authority and evidence path remain singular even when work is parallel.",
    limitingCase:
      "Sequential work is the correct pattern when each step depends on the previous result.",
    counterexample:
      "A fan-out/fan-in design can create a merge bottleneck that erases the benefit of parallel execution.",
    validity:
      "A pattern is appropriate only under its stated dependency, conflict, and review assumptions.",
  },
  "when-not-multi": {
    governingLaw:
      "Complexity is justified by measurable leverage, not by the availability of a multi-agent pattern.",
    invariant:
      "The simplest system that meets the acceptance contract is the preferred baseline.",
    limitingCase:
      "For a small, well-specified, low-risk task, one agent or a manual action is the stronger design.",
    counterexample:
      "More agents can lower reliability, raise cost, and make responsibility ambiguous without improving outcomes.",
    validity:
      "The stop decision is specific to the workload, risk, maintenance burden, and measured alternative.",
  },
  evaluation: {
    governingLaw:
      "Evaluation compares defined outcomes under a declared denominator, baseline, and intervention accounting.",
    invariant:
      "Accepted results, failed attempts, human intervention, and cost remain separately countable.",
    limitingCase:
      "A zero-intervention baseline can still be worse if its accepted-outcome rate is lower or its cost is higher.",
    counterexample:
      "A high success percentage can conceal repeated failed attempts when failures are excluded from the denominator.",
    validity:
      "An evaluation supports only the workload, sample, configuration, and acceptance definition it actually measured.",
  },
  benchmark: {
    governingLaw:
      "A benchmark is a controlled sample of tasks designed to expose a decision-relevant difference.",
    invariant:
      "The task set, scoring rule, model/configuration, and environment are recorded well enough to reproduce the comparison.",
    limitingCase:
      "A benchmark with no variation or no decision-relevant metric cannot discriminate between alternatives.",
    counterexample:
      "Optimising for a visible benchmark can improve its score while degrading the real workload.",
    validity:
      "Benchmark results generalise only to tasks and conditions resembling the measured sample.",
  },
  verification: {
    governingLaw:
      "Verification tests the artifact or outcome against evidence independent of the agent's claim.",
    invariant:
      "Completion is a state established by acceptance evidence, not a message emitted by the worker.",
    limitingCase:
      "If the artifact has no observable acceptance property, the task contract is incomplete.",
    counterexample:
      "A green test run before the final write is stale evidence for the final workspace.",
    validity:
      "Verification proves only the checks performed; untested properties remain uncertainty.",
  },
  economics: {
    governingLaw:
      "Automation is valuable when accepted-result cost, active human time, and maintenance burden beat the manual baseline.",
    invariant:
      "The denominator is accepted outcomes, and all attempted work and recurring costs are included.",
    limitingCase:
      "If maintenance exceeds the saved active effort, a manual workflow is economically superior.",
    counterexample:
      "Lower token cost does not imply lower cost per accepted result when retries and review increase.",
    validity:
      "Economic conclusions depend on workload volume, failure distribution, labour valuation, and time horizon.",
  },
  "tiny-harness": {
    governingLaw:
      "A harness turns model requests into bounded execution, observations, state transitions, and verified completion.",
    invariant:
      "Every action is attributable, every authority is bounded, and every final claim is checked against the final workspace.",
    limitingCase:
      "Without a real tool effect, the loop is a simulation and cannot establish execution reliability.",
    counterexample:
      "A model's request to finish immediately after a write is not evidence that the acceptance test now passes.",
    validity:
      "The fixture demonstrates harness behaviour, not the reasoning quality or production reliability of a live model.",
  },
  graduation: {
    governingLaw:
      "A production decision compares accepted outcomes, human effort, risk, and maintenance against a credible manual baseline.",
    invariant:
      "The keep, change, or stop decision must be traceable to declared evidence and residual risks.",
    limitingCase:
      "A workflow that cannot beat the baseline on the metric that matters should not be kept for novelty.",
    counterexample:
      "A functioning demo is not proof of value when it requires more supervision than the manual process.",
    validity:
      "The conclusion applies to the chosen repository workflow and operating conditions, not to agentic engineering in general.",
  },
};

function agenticTheoreticalMinimum(lesson: Lesson): AgenticMinimum {
  const override = agenticMinimumOverrides[lesson.id];
  if (!override)
    throw new Error(`Missing theoretical minimum for ${lesson.id}`);
  return {
    coreIdea: `${lesson.outcome} The practical question is not whether the system sounds plausible, but which boundary, state transition, or piece of evidence would let another engineer reconstruct and challenge the claim.`,
    widerConnection: `${lesson.nextConnection} This lesson connects the local decision to the wider discipline of reliable delegated work: explicit contracts, bounded authority, observable state, and evidence that remains meaningful after the context or implementation changes.`,
    primitives: [
      `The lesson's target: ${lesson.outcome}`,
      "The model, agent, harness, tool, context, memory, or orchestration layer under examination",
      "An observable outcome and the evidence needed to accept it",
    ],
    assumptions: [
      "The task boundary and acceptance condition are explicit before execution begins.",
      "Claims are kept separate from observations produced by the environment or verifier.",
      "Authority is limited to the actions required by the stated task.",
    ],
    derivation:
      "Start from the concrete failure or design decision, identify the responsible layer, state the contract and invariant, then test the smallest discriminating change against observable evidence.",
    checks: [
      "What observation would distinguish the intended explanation from its nearest alternative?",
      "Which action, state transition, or evidence boundary does the system own?",
      "What would still be unknown after the stated check passes?",
    ],
    ...override,
  };
}

function authoredLessonContent(lesson: Lesson): LessonContent {
  const exampleSteps = lesson.example.slice(1) as [string, string, string, string][];
  const plan = lessonLayouts[lesson.id];
  if (!plan) throw new Error(`Missing editorial layout for ${lesson.id}`);
  const blocks: LessonBlock[] = plan.flatMap((item): LessonBlock[] => {
    if (typeof item === "number") {
      const section = lesson.sections[item];
      const checkpoint = lesson.checkpoints[item];
      if (!section || !checkpoint) throw new Error(`Missing section ${item} in ${lesson.id}`);
      return [
        { kind: "prose", title: section[0], body: section[1] },
        { kind: "checkpoint", ...checkpoint },
      ];
    }
    switch (item) {
      case "opening": return [{ kind: "prose", body: lesson.intro }];
      case "case": return [{
        kind: "example", title: lesson.example[0],
        problem: lesson.example[0],
        steps: exampleSteps.map(([title, body, reason, trap]) => ({ title, body, reason, trap })),
      }];
      case "map": return lesson.flow ? [{
        kind: "diagram",
        data: flowDiagram(lesson.title, "Read each handoff in order; the surrounding case explains who owns it.", lesson.flow),
      }] : [];
      case "lab": return lesson.practical ? [{ kind: "lab", data: lesson.practical }] : [];
      case "close": return [{ kind: "takeaway", body: lesson.takeaway, nextConnection: lesson.nextConnection }];
      case "reference": {
        const reference = lessonReferences[lesson.id];
        return reference ? [{ kind: "sidebar", heading: reference.title, body: reference.body }] : [];
      }
    }
  });
  return { sections: [{
    id: lesson.id, title: lesson.title,
    navLabel: lesson.title.split(":")[0],
    blocks,
  }] };
}

export function buildTopic(lesson: Lesson, previous?: Lesson): CurriculumTopic {
  const q = (check: Check, id: string) =>
    choice(
      id,
      check[0],
      check[1],
      check[2],
      check[3],
      "Identify the observation that would distinguish the alternatives.",
    );
  return {
    id: lesson.id,
    title: lesson.title,
    description: lesson.outcome,
    domain: "Agentic engineering",
    unit: lesson.unit,
    prerequisites: previous ? [previous.id] : [],
    minutes: lesson.minutes ?? 12,
    teaching: {
      question: lesson.question,
      why: lesson.outcome,
      outcomes: [lesson.outcome],
      checkpoints: lesson.checkpoints,
      takeaway: lesson.takeaway,
      nextConnection: lesson.nextConnection,
    },
    theoreticalMinimum: agenticTheoreticalMinimum(lesson),
    content: lesson.content ?? authoredLessonContent(lesson),
    diagnostics: [
      {
        ...q(previous?.checks[0] ?? lesson.checks[0], "warmup"),
        ...(previous ? { prerequisiteId: previous.id } : {}),
      },
    ],
    intuition: { body: lesson.intro, thoughtExperiments: [lesson.question] },
    theory: lesson.sections.map(([heading, body]) => ({ heading, body })),
    diagram: pointFlow(
      lesson.flow ?? [
        "Observe the concrete failure",
        "Choose the responsible layer",
        "Change one thing and verify",
      ],
    ),
    sidebars: [
      {
        heading: "About the examples and sources",
        body: "Examples and numbers are instructional scenarios, not measured product rankings. Product-specific references were checked on 13 September 2026. Commands and configuration can change: record installed versions and verify their help/schema before operating a real workflow.",
      },
    ],
    workedExample: {
      title: "Work through a concrete case",
      problem: lesson.example[0],
      steps: lesson.example.slice(1).map((step) => {
        const [title, body, reason, trap] = step as [
          string,
          string,
          string,
          string,
        ];
        return { title, body, reason, trap };
      }),
    },
    fadedExercise: {
      prompt: "Try the next decision yourself.",
      supplied: [
        { heading: "Keep this principle in view", body: lesson.takeaway },
      ],
      steps: [q(lesson.checks[2], "apply")],
    },
    retrievalProblems: [
      q(lesson.checks[0], "check-1"),
      q(lesson.checks[1], "check-2"),
      ...(lesson.moreChecks ?? []).map((check, i) =>
        q(check, `check-extra-${i + 1}`),
      ),
    ],
    sources: lesson.source.map((k) => sources[k]),
    practical: lesson.practical,
  };
}
// Build every topic in a unit, wiring each lesson's diagnostic prerequisite to
// the immediately preceding lesson so a unit reads as one continuous chain.
export function buildUnit(
  lessons: Lesson[],
  previousLast?: Lesson,
): CurriculumTopic[] {
  return lessons.map((lesson, i) =>
    buildTopic(lesson, i === 0 ? previousLast : lessons[i - 1]),
  );
}

/**
 * Join adjacent lessons when their ideas form one teachable argument. The
 * source lessons remain separate files so they are reviewable, while the
 * learner sees a chapter with one opening question and one continuous path.
 */
export function consolidateTopics(
  topics: CurriculumTopic[],
  groups: string[][],
): CurriculumTopic[] {
  const byId = new Map(topics.map((topic) => [topic.id, topic]));
  const assigned = new Set<string>();
  return groups.map((ids, groupIndex) => {
    const parts = ids.map((id) => {
      const topic = byId.get(id);
      if (!topic) throw new Error(`Unknown lesson in consolidation: ${id}`);
      assigned.add(id);
      return topic;
    });
    const first = parts[0];
    const last = parts.at(-1)!;
    const prefix = (part: CurriculumTopic, id: string) => `${part.id}-${id}`;
    const renameProblem = (
      part: CurriculumTopic,
      problem: Problem,
    ): Problem => ({
      ...problem,
      id: prefix(part, problem.id),
      ...(problem.prerequisiteId ? { prerequisiteId: undefined } : {}),
    });
    const prior = groupIndex ? groups[groupIndex - 1][0] : undefined;
    const previousPart = groupIndex ? byId.get(groups[groupIndex - 1].at(-1)!) : undefined;
    const previousCheck = previousPart?.retrievalProblems[0];
    const diagnostics = previousPart && previousCheck ? [{
      ...previousCheck,
      id: `warmup-${previousPart.id}-${previousCheck.id}`,
      prerequisiteId: prior,
    }] : [];
    const sections = parts.flatMap((part) =>
      part.theory.map((section) => ({
        heading: `${part.title} · ${section.heading}`,
        body: section.body,
      })),
    );
    const checkpoints = parts.flatMap(
      (part) => part.teaching?.checkpoints ?? [],
    );
    const examples = parts.flatMap(part => part.workedExample.steps);
    const practicalParts = parts.flatMap((part) =>
      part.practical ? [part.practical] : [],
    );
    const practical = practicalParts.length
      ? {
          title: practicalParts.map((p) => p.title).join(" · "),
          minutes: practicalParts.reduce((sum, p) => sum + p.minutes, 0),
          brief: practicalParts.map((p) => p.brief).join("\n\n"),
          steps: practicalParts.flatMap((p) => p.steps),
          deliverables: practicalParts.flatMap((p) => p.deliverables),
          review: practicalParts.map((p) => p.review).join("\n\n"),
        }
      : undefined;
    const content = {
      sections: parts.flatMap(part =>
        contentFromCurriculumTopic(part).sections.map(section => ({
          ...section,
          id: `${part.id}--${section.id}`,
        })),
      ),
    };
    const minimums = parts.flatMap((part) =>
      part.theoreticalMinimum ? [part.theoreticalMinimum] : [],
    );
    return {
      ...first,
      id: first.id,
      title: parts.map((part) => part.title.split(":")[0]).join(" · "),
      description: parts.map((part) => part.description).join(" "),
      unit: `${String(groupIndex + 1).padStart(2, "0")} · ${first.unit.replace(/^\d+\s*·\s*/, "")}`,
      prerequisites: prior ? [prior] : [],
      minutes: Math.max(
        25,
        parts.reduce((sum, part) => sum + part.minutes, 0),
      ),
      teaching: {
        question: first.teaching?.question ?? first.title,
        why: parts
          .map((part) => part.teaching?.why ?? part.description)
          .join(" "),
        outcomes: [
          ...new Set(parts.flatMap((part) => part.teaching?.outcomes ?? [])),
        ],
        checkpoints,
        takeaway: last.teaching?.takeaway ?? last.description,
        nextConnection:
          last.teaching?.nextConnection ?? "Continue to the next chapter.",
      },
      theoreticalMinimum: minimums.length
        ? {
            coreIdea: minimums.map((m) => m.coreIdea).join(" "),
            widerConnection: minimums.map((m) => m.widerConnection).join(" "),
            primitives: [
              ...new Set(minimums.flatMap((m) => m.primitives ?? [])),
            ],
            assumptions: [
              ...new Set(minimums.flatMap((m) => m.assumptions ?? [])),
            ],
            derivation: minimums.map((m) => m.derivation).join(" "),
            checks: [...new Set(minimums.flatMap((m) => m.checks ?? []))],
            governingLaw: minimums.map((m) => m.governingLaw).join(" "),
            invariant: minimums.map((m) => m.invariant).join(" "),
            limitingCase: minimums.map((m) => m.limitingCase).join(" "),
            counterexample: minimums.map((m) => m.counterexample).join(" "),
            validity: minimums.map((m) => m.validity).join(" "),
          }
        : undefined,
      diagnostics,
      intuition: {
        body: parts.map((part) => part.intuition.body).join("\n\n"),
        thoughtExperiments: [
          ...new Set(
            parts.flatMap((part) => part.intuition.thoughtExperiments),
          ),
        ],
      },
      theory: sections,
      workedExample: {
        title: "One connected case, examined in stages",
        problem: first.workedExample.problem,
        steps: examples.map((step) => ({
          title: step.title,
          body: step.body,
          reason: step.reason,
          trap: step.trap,
        })),
      },
      fadedExercise: {
        prompt:
          "Try the next decision yourself, then compare the layers involved.",
        supplied: parts.flatMap((part) => part.fadedExercise.supplied),
        steps: parts.flatMap((part) =>
          part.fadedExercise.steps.map((problem) =>
            renameProblem(part, problem),
          ),
        ),
      },
      retrievalProblems: parts.flatMap((part) =>
        part.retrievalProblems.map((problem) => renameProblem(part, problem)),
      ),
      diagram: first.diagram,
      sidebars: parts.flatMap((part) => part.sidebars),
      sources: [
        ...new Map(
          parts
            .flatMap((part) => part.sources)
            .map((source) => [source.url, source]),
        ).values(),
      ],
      practical,
      content,
    };
  });
}
