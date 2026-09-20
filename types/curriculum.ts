import { z } from "zod";

export const ErrorCategorySchema = z.enum([
  "conceptual",
  "algebraic",
  "unit-reference",
]);
export type ErrorCategory = z.infer<typeof ErrorCategorySchema>;
const text = z.string().min(1);
const wrong = z.object({
  value: text,
  category: ErrorCategorySchema,
  feedback: text,
});
export const AnswerSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("numeric"),
    value: z.number().finite(),
    absoluteTolerance: z.number().nonnegative(),
    relativeTolerance: z.number().min(0).max(0.1),
    unit: text,
    acceptedUnits: z.array(text).min(1),
  }),
  z.object({
    kind: z.literal("choice"),
    value: text,
    options: z.array(z.object({ id: text, label: text })).min(2),
  }),
]);
export const ProblemSchema = z.object({
  id: text,
  prompt: text,
  answer: AnswerSchema,
  hint: text,
  solution: text,
  rubric: z.object({
    defaultCategory: ErrorCategorySchema,
    explanation: text,
    misconceptions: z.array(wrong),
  }),
  prerequisiteId: text.optional(),
});
export type Problem = z.infer<typeof ProblemSchema>;
const exposition = z.object({ heading: text, body: text });
export type Expression =
  | number
  | { variable: string }
  | {
      op:
        | "add"
        | "subtract"
        | "multiply"
        | "divide"
        | "power"
        | "sqrt"
        | "sin"
        | "cos";
      args: Expression[];
    };
export const ExpressionSchema: z.ZodType<Expression> = z.lazy(() =>
  z.union([
    z.number().finite(),
    z.object({ variable: text }).strict(),
    z
      .object({
        op: z.enum([
          "add",
          "subtract",
          "multiply",
          "divide",
          "power",
          "sqrt",
          "sin",
          "cos",
        ]),
        args: z.array(ExpressionSchema).min(1).max(2),
      })
      .strict(),
  ]),
);
export const PracticeTemplateSchema = z.object({
  id: text,
  title: text,
  prompt: text,
  variables: z
    .array(
      z.object({
        name: text,
        min: z.number().finite(),
        max: z.number().finite(),
        step: z.number().positive(),
      }),
    )
    .min(1),
  formula: ExpressionSchema,
  unit: text,
  hint: text,
  solution: text,
});
export type PracticeTemplate = z.infer<typeof PracticeTemplateSchema>;
export const TeachingSchema = z.object({
  question: text,
  why: text,
  outcomes: z.array(text).min(1),
  checkpoints: z.array(
    z.object({
      bridge: text,
      meaning: text,
      question: text,
      answer: text,
      // Additional, progressively harder reflection prompts for the same
      // theory section, shown after the primary question. Optional so
      // existing single-question checkpoints remain valid unchanged.
      further: z.array(z.object({ question: text, answer: text })).optional(),
    }),
  ),
  takeaway: text,
  nextConnection: text,
});
export type Teaching = z.infer<typeof TeachingSchema>;
const practicalSchema = z.object({
  title: text,
  minutes: z.number().int().positive(),
  brief: text,
  steps: z.array(text).min(1),
  deliverables: z.array(text).min(1),
  review: text,
});
export type Practical = z.infer<typeof practicalSchema>;
export const OverviewSchema = z.object({
  headline: text,
  introduction: text,
  outcomes: z.array(z.object({ title: text, description: text })).min(1),
  startingPoint: text,
  capstone: z.object({ title: text, description: text }),
  throughlines: z
    .array(
      z.object({
        title: text,
        description: text,
        topicIds: z.array(text).min(2),
      }),
    )
    .optional(),
});
const point = z.tuple([z.number().finite(), z.number().finite()]);
export const DiagramSchema = z.object({
  title: text,
  caption: text,
  viewBox: z.tuple([
    z.number(),
    z.number(),
    z.number().positive(),
    z.number().positive(),
  ]),
  elements: z
    .array(
      z.discriminatedUnion("kind", [
        z.object({
          kind: z.literal("ellipse"),
          center: point,
          rx: z.number().positive(),
          ry: z.number().positive(),
          tone: z.enum(["accent", "muted", "ink"]),
          dashed: z.boolean().optional(),
        }),
        z.object({
          kind: z.literal("line"),
          from: point,
          to: point,
          tone: z.enum(["accent", "muted", "ink"]),
          dashed: z.boolean().optional(),
        }),
        z.object({
          kind: z.literal("point"),
          at: point,
          label: text,
          labelOffset: point.optional(),
          tone: z.enum(["accent", "muted", "ink"]),
        }),
        z.object({ kind: z.literal("label"), at: point, text: text }),
        z.object({
          kind: z.literal("box"),
          center: point,
          width: z.number().positive(),
          height: z.number().positive(),
          label: text,
          detail: text.optional(),
          tone: z.enum(["accent", "muted", "ink"]),
        }),
        z.object({
          kind: z.literal("arrow"),
          from: point,
          to: point,
          tone: z.enum(["accent", "muted", "ink"]),
          dashed: z.boolean().optional(),
          label: text.optional(),
        }),
      ]),
    )
    .min(1),
});
const lessonStepSchema = z.object({
  title: text,
  body: text,
  reason: text.optional(),
  trap: text.optional(),
});
const lessonBlockSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("prose"), title: text.optional(), body: text }),
  z.object({
    kind: z.literal("callout"),
    title: text,
    body: text,
    tone: z.enum(["idea", "warning", "question", "definition"]).optional(),
  }),
  z.object({
    kind: z.literal("list"),
    title: text.optional(),
    items: z.array(text).min(1),
  }),
  z.object({
    kind: z.literal("steps"),
    title: text,
    steps: z.array(lessonStepSchema).min(1),
  }),
  z.object({ kind: z.literal("diagram"), data: DiagramSchema }),
  z.object({
    kind: z.literal("checkpoint"),
    bridge: text.optional(),
    meaning: text.optional(),
    question: text,
    answer: text,
    further: z.array(z.object({ question: text, answer: text })).optional(),
  }),
  z.object({
    kind: z.literal("example"),
    title: text,
    problem: text,
    steps: z.array(lessonStepSchema).min(1),
  }),
  z.object({ kind: z.literal("sidebar"), heading: text, body: text }),
  z.object({ kind: z.literal("lab"), data: practicalSchema }),
  z.object({
    kind: z.literal("takeaway"),
    body: text,
    nextConnection: text.optional(),
  }),
]);
export type LessonBlock = z.infer<typeof lessonBlockSchema>;
const lessonSectionSchema = z.object({
  id: text,
  title: text,
  kicker: text.optional(),
  navLabel: text.optional(),
  role: z
    .enum(["story", "reasoning", "example", "takeaway", "custom"])
    .optional(),
  blocks: z.array(lessonBlockSchema).min(1),
});
export type LessonSection = z.infer<typeof lessonSectionSchema>;
export const LessonContentSchema = z.object({
  sections: z.array(lessonSectionSchema).min(1),
}).superRefine((content, ctx) => {
  const ids = content.sections.map((section) => section.id);
  if (new Set(ids).size !== ids.length) {
    ctx.addIssue({
      code: "custom",
      path: ["sections"],
      message: "Lesson section IDs must be unique within a lesson",
    });
  }
});
export type LessonContent = z.infer<typeof LessonContentSchema>;
export type CurriculumTopicDraft = {
  id: string;
  title: string;
  description: string;
  domain: string;
  unit: string;
  prerequisites: string[];
  minutes: number;
  content: LessonContent;
  sources: { title: string; url: string }[];
  practical?: Practical;
  theoreticalMinimum?: NonNullable<
    z.infer<typeof CurriculumTopicSchema>["theoreticalMinimum"]
  >;
  practiceTemplates?: PracticeTemplate[];
  diagnostics?: Problem[];
  retrievalProblems?: Problem[];
  fadedExercise?: {
    prompt: string;
    supplied: { heading: string; body: string }[];
    steps: Problem[];
  };
  transferProblems?: Problem[];
};
export const CurriculumTopicSchema = z.object({
  id: text,
  title: text,
  description: text,
  domain: text,
  unit: text,
  prerequisites: z.array(text),
  minutes: z.number().int().positive(),
  teaching: TeachingSchema.optional(),
  theoreticalMinimum: z
    .object({
      coreIdea: text,
      widerConnection: text,
      primitives: z.array(text).min(1).optional(),
      assumptions: z.array(text).min(1).optional(),
      governingLaw: text.optional(),
      invariant: text.optional(),
      derivation: text.optional(),
      checks: z.array(text).min(1).optional(),
      limitingCase: text.optional(),
      counterexample: text.optional(),
      validity: text.optional(),
    })
    .optional(),
  practiceTemplates: z.array(PracticeTemplateSchema).optional(),
  practical: practicalSchema.optional(),
  diagnostics: z.array(ProblemSchema),
  intuition: z.object({ body: z.string(), thoughtExperiments: z.array(text) }),
  theory: z.array(exposition),
  diagram: DiagramSchema.optional(),
  sidebars: z.array(exposition),
  workedExample: z.object({
    title: z.string(),
    problem: z.string(),
    steps: z
      .array(z.object({ title: text, body: text, reason: text, trap: text }))
      ,
  }),
  fadedExercise: z.object({
    prompt: z.string(),
    supplied: z.array(exposition),
    steps: z.array(ProblemSchema),
  }),
  retrievalProblems: z.array(ProblemSchema),
  transferProblems: z.array(ProblemSchema).optional(),
  sources: z.array(z.object({ title: text, url: z.url() })).min(1),
  content: LessonContentSchema.optional(),
}).superRefine((topic, ctx) => {
  if (topic.content) return;
  const required = {
    intuition: topic.intuition.body.length > 0 && topic.intuition.thoughtExperiments.length > 0,
    theory: topic.theory.length > 0,
    diagram: Boolean(topic.diagram),
    workedExample: Boolean(topic.workedExample.title && topic.workedExample.problem) && topic.workedExample.steps.length >= 2,
    diagnostics: topic.diagnostics.length > 0,
    fadedExercise: Boolean(topic.fadedExercise.prompt) && topic.fadedExercise.supplied.length > 0 && topic.fadedExercise.steps.length > 0,
    retrievalProblems: topic.retrievalProblems.length >= 2,
  };
  for (const [field, valid] of Object.entries(required)) {
    if (!valid) ctx.addIssue({ code: "custom", path: [field], message: "Legacy topics require complete teaching and assessment fields" });
  }
});
export type CurriculumTopic = z.infer<typeof CurriculumTopicSchema>;
export const CurriculumPackSchema = z.object({
  id: text,
  version: text,
  title: text,
  description: text,
  conventions: text,
  overview: OverviewSchema.optional(),
  topics: z.array(CurriculumTopicSchema).min(1),
});
export type CurriculumPack = z.infer<typeof CurriculumPackSchema>;
export type Diagram = z.infer<typeof DiagramSchema>;
export const stages = [
  "diagnostic",
  "intuition",
  "theory",
  "worked",
  "faded",
  "retrieval",
  "complete",
] as const;
export type Stage = (typeof stages)[number];
export type Schedule = {
  due: string;
  intervalDays: number;
  ease: number;
  repetitions: number;
  lapses: number;
};
export type TopicProgress = {
  read?: boolean;
  stage: Stage;
  passed: string[];
  attempts: Record<string, number>;
  mastered: boolean;
  schedule: Schedule | null;
  errors: Record<ErrorCategory, number>;
};
export type LearnerState = {
  topics: Record<string, TopicProgress>;
  scratchpads: Record<string, string>;
};
export type Submission = { value: string; unit?: string };
export type Feedback = {
  correct: boolean;
  category: ErrorCategory | null;
  message: string;
};
export type LearningAction =
  | {
      type: "answer";
      topicId: string;
      problemId: string;
      submission: Submission;
      review?: boolean;
    }
  | { type: "advance"; topicId: string }
  | { type: "read"; topicId: string; read: boolean }
  | { type: "scratchpad"; topicId: string; text: string };
