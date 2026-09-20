// Curriculum-agnostic problem builders shared by every pack. Content lives in curricula/*.
import type {
  CurriculumTopic,
  CurriculumTopicDraft,
  Diagram,
  Expression,
  LessonContent,
  LessonBlock,
  Problem,
} from "@/types/curriculum";
type E = Expression;
type BinOp =
  | "add"
  | "subtract"
  | "multiply"
  | "divide"
  | "power"
  | "sqrt"
  | "sin"
  | "cos";
export const v = (variable: string): E => ({ variable });
export const op = (kind: BinOp, ...args: E[]): E => ({ op: kind, args });
export const add = (a: E, b: E) => op("add", a, b);
export const sub = (a: E, b: E) => op("subtract", a, b);
export const mul = (a: E, b: E) => op("multiply", a, b);
export const div = (a: E, b: E) => op("divide", a, b);
export const sqrt = (a: E) => op("sqrt", a);
export const variable = (name: string, min: number, max: number, step = 1) => ({
  name,
  min,
  max,
  step,
});
export function numeric(
  id: string,
  prompt: string,
  value: number,
  unit: string,
  solution: string,
  hint: string,
  extra: Partial<Problem> = {},
): Problem {
  return {
    id,
    prompt,
    answer: {
      kind: "numeric",
      value,
      unit,
      acceptedUnits: [unit],
      absoluteTolerance: 0.001,
      relativeTolerance: 0.002,
    },
    solution,
    hint,
    rubric: {
      defaultCategory: "algebraic",
      explanation:
        "Check the governing relation, substitute consistently, and keep unrounded intermediate values.",
      misconceptions: [],
    },
    ...extra,
  };
}
export function choice(
  id: string,
  prompt: string,
  options: string[],
  correct: number,
  solution: string,
  hint: string,
  extra: Partial<Problem> = {},
): Problem {
  return {
    id,
    prompt,
    answer: {
      kind: "choice",
      value: String(correct),
      options: options.map((label, i) => ({ id: String(i), label })),
    },
    solution,
    hint,
    rubric: {
      defaultCategory: "conceptual",
      explanation: hint,
      misconceptions: [],
    },
    ...extra,
  };
}
export function pointFlow(labels: string[]): Diagram {
  return {
    title: "Follow the responsibility",
    caption:
      "Read from top to bottom. Each connection is a handoff of information or control; the lesson explains which component owns it.",
    viewBox: [0, 0, 600, labels.length * 62 + 30],
    elements: labels.flatMap((label, i) => [
      {
        kind: "point" as const,
        at: [48, 35 + i * 62] as [number, number],
        label: String(i + 1),
        labelOffset: [-20, 5] as [number, number],
        tone: "accent" as const,
      },
      {
        kind: "label" as const,
        at: [82, 40 + i * 62] as [number, number],
        text: label,
      },
      ...(i < labels.length - 1
        ? [
            {
              kind: "line" as const,
              from: [48, 44 + i * 62] as [number, number],
              to: [48, 85 + i * 62] as [number, number],
              tone: "muted" as const,
            },
          ]
        : []),
    ]),
  };
}

export function flowDiagram(
  title: string,
  caption: string,
  labels: string[],
): Diagram {
  const height = Math.max(190, labels.length * 86 + 30);
  const centers = labels.map((_, index) => [300, 48 + index * 86] as [number, number]);
  return {
    title,
    caption,
    viewBox: [0, 0, 600, height],
    elements: [
      ...centers.flatMap((center, index) => [
        {
          kind: "box" as const,
          center,
          width: 430,
          height: 54,
          label: labels[index],
          tone: index === 0 || index === labels.length - 1 ? "accent" as const : "muted" as const,
        },
        ...(index < centers.length - 1
          ? [{
              kind: "arrow" as const,
              from: [center[0], center[1] + 27] as [number, number],
              to: [centers[index + 1][0], centers[index + 1][1] - 27] as [number, number],
              tone: "muted" as const,
            }]
          : []),
      ]),
    ],
  };
}

function reflectionProblem(
  id: string,
  question: string,
  answer: string,
): Problem {
  return choice(
    id,
    question,
    [answer, "The question has no bearing on the lesson", "No evidence is needed"],
    0,
    answer,
    "Choose the option that preserves the evidence and decision described in the lesson.",
  );
}

function contentBlocks(content: LessonContent) {
  return content.sections.flatMap((section) => section.blocks);
}

/**
 * Compile the flexible reader-facing authoring format into the normalized
 * runtime topic shape used by the learner, assessment and progress layers.
 * New courses can author content directly without duplicating legacy fields.
 */
export function defineCurriculumTopic(
  draft: CurriculumTopicDraft,
): CurriculumTopic {
  const blocks = contentBlocks(draft.content);
  const prose = blocks.filter(
    (block): block is Extract<LessonBlock, { kind: "prose" }> =>
      block.kind === "prose",
  );
  const checkpoints = blocks.filter(
    (block): block is Extract<LessonBlock, { kind: "checkpoint" }> =>
      block.kind === "checkpoint",
  );
  const example = blocks.find((block) => block.kind === "example");
  const stepBlock = blocks.find((block) => block.kind === "steps");
  const firstBody = prose[0]?.body ?? draft.description;
  const checkpointData = checkpoints.length
    ? checkpoints.map((block) => ({
        bridge: block.bridge ?? "Pause and test the idea against the evidence.",
        meaning: block.meaning ?? block.answer,
        question: block.question,
        answer: block.answer,
        further: block.further,
      }))
    : [
        {
          bridge: "Use the lesson's evidence to choose the next decision.",
          meaning: draft.description,
          question: "What should you carry into the next decision?",
          answer: draft.description,
        },
      ];
  const generatedProblems = checkpointData.map((checkpoint, index) =>
    reflectionProblem(
      `${draft.id}-reflection-${index + 1}`,
      checkpoint.question,
      checkpoint.answer,
    ),
  );
  const retrievalProblems = [
    ...(draft.retrievalProblems ?? []),
    ...generatedProblems,
  ];
  while (retrievalProblems.length < 2) {
    retrievalProblems.push(
      reflectionProblem(
        `${draft.id}-reflection-${retrievalProblems.length + 1}`,
        "What evidence should guide the next step?",
        draft.description,
      ),
    );
  }
  const fadedSteps = draft.fadedExercise?.steps?.length
    ? draft.fadedExercise.steps
    : [
        {
          ...retrievalProblems[retrievalProblems.length - 1],
          id: `${draft.id}-faded`,
        },
      ];
  const diagnostics = draft.diagnostics?.length
    ? draft.diagnostics
    : [
        {
          ...retrievalProblems[0],
          id: `${draft.id}-diagnostic`,
          ...(draft.prerequisites[0]
            ? { prerequisiteId: draft.prerequisites[0] }
            : {}),
        },
      ];
  const workedSteps = example?.steps ?? stepBlock?.steps ?? [];
  const normalizedSteps = [...workedSteps];
  while (normalizedSteps.length < 2) {
    normalizedSteps.push({
      title: "Test the idea",
      body: firstBody,
      reason: "A concrete check turns the explanation into evidence.",
      trap: "Treating a plausible explanation as proof without checking it.",
    });
  }
  const sidebars = blocks
    .filter((block) => block.kind === "sidebar")
    .map((block) => ({ heading: block.heading, body: block.body }));
  const diagram = blocks.find((block) => block.kind === "diagram");
  const question = blocks.find(
    (block): block is Extract<LessonBlock, { kind: "callout" }> =>
      block.kind === "callout" && block.tone === "question",
  );
  return {
    id: draft.id,
    title: draft.title,
    description: draft.description,
    domain: draft.domain,
    unit: draft.unit,
    prerequisites: draft.prerequisites,
    minutes: draft.minutes,
    content: draft.content,
    teaching: {
      question: question?.body ?? checkpointData[0].question,
      why: draft.description,
      outcomes: [draft.description],
      checkpoints: checkpointData,
      takeaway: draft.description,
      nextConnection: "Continue to the next lesson in this course.",
    },
    theoreticalMinimum: draft.theoreticalMinimum,
    practiceTemplates: draft.practiceTemplates,
    diagnostics,
    intuition: { body: firstBody, thoughtExperiments: [checkpointData[0].question] },
    theory: prose.length
      ? prose.map((block) => ({ heading: block.title ?? "Explore the idea", body: block.body }))
      : [{ heading: "Explore the idea", body: firstBody }],
    diagram:
      diagram?.data ??
      flowDiagram(
        `${draft.title} · the path through the lesson`,
        "Each box names a responsibility or decision. Follow the arrows to see what evidence moves the work forward.",
        draft.content.sections.map((section) => section.title),
      ),
    sidebars,
    workedExample: {
      title: example?.title ?? "Work through the idea",
      problem: example?.problem ?? draft.description,
      steps: normalizedSteps.map((step) => ({
        title: step.title,
        body: step.body,
        reason: step.reason ?? "This step connects the idea to observable evidence.",
        trap: step.trap ?? "Skipping the evidence check.",
      })),
    },
    fadedExercise: {
      prompt: draft.fadedExercise?.prompt ?? "Try the next decision yourself.",
      supplied: draft.fadedExercise?.supplied ?? [
        { heading: "Keep this principle in view", body: draft.description },
      ],
      steps: fadedSteps,
    },
    retrievalProblems,
    transferProblems: draft.transferProblems,
    sources: draft.sources,
    practical: draft.practical,
  };
}

/** Convert a legacy normalized topic into reader content during migration. */
export function contentFromCurriculumTopic(topic: CurriculumTopic): LessonContent {
  if (topic.content) return topic.content;
  return {
    sections: [
      {
        id: `${topic.id}-story`,
        title: "The big idea",
        role: "story",
        blocks: [{ kind: "prose", body: topic.intuition.body }],
      },
      {
        id: `${topic.id}-reasoning`,
        title: "Build the reasoning",
        role: "reasoning",
        blocks: topic.theory.map((section) => ({
          kind: "prose" as const,
          title: section.heading,
          body: section.body,
        })),
      },
      {
        id: `${topic.id}-example`,
        title: topic.workedExample.title,
        role: "example",
        blocks: [
          {
            kind: "example" as const,
            title: topic.workedExample.title,
            problem: topic.workedExample.problem,
            steps: topic.workedExample.steps,
          },
        ],
      },
      {
        id: `${topic.id}-takeaway`,
        title: "Bring it together",
        role: "takeaway",
        blocks: [
          ...(topic.sidebars.length
            ? topic.sidebars.map((sidebar) => ({
                kind: "sidebar" as const,
                heading: sidebar.heading,
                body: sidebar.body,
              }))
            : []),
          ...(topic.practical
            ? [{ kind: "lab" as const, data: topic.practical }]
            : []),
          {
            kind: "takeaway" as const,
            body: topic.teaching?.takeaway ?? topic.description,
            nextConnection: topic.teaching?.nextConnection,
          },
        ],
      },
    ],
  };
}
