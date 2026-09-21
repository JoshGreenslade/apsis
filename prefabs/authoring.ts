import { validatePack } from "@/lib/curriculum-engine";
import { CurriculumTopicSchema } from "@/types/curriculum";
// Optional problem, expression and diagram builders shared by every course.
import type {
  CurriculumTopic,
  CurriculumTopicDraft,
  Diagram,
  Expression,
  Problem,
} from "@/types/curriculum";
type E = Expression;
type BinOp =
  "add" | "subtract" | "multiply" | "divide" | "power" | "sqrt" | "sin" | "cos";
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
  const centers = labels.map(
    (_, index) => [300, 48 + index * 86] as [number, number],
  );
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
          tone:
            index === 0 || index === labels.length - 1
              ? ("accent" as const)
              : ("muted" as const),
        },
        ...(index < centers.length - 1
          ? [
              {
                kind: "arrow" as const,
                from: [center[0], center[1] + 27] as [number, number],
                to: [centers[index + 1][0], centers[index + 1][1] - 27] as [
                  number,
                  number,
                ],
                tone: "muted" as const,
              },
            ]
          : []),
      ]),
    ],
  };
}

/** Validate the shared lesson contract without inventing teaching material. */
export function defineCurriculumTopic(
  draft: CurriculumTopicDraft,
): CurriculumTopic {
  return CurriculumTopicSchema.parse(draft);
}

/** Accept JSON or TypeScript course data through the same runtime validation. */
export function defineCourse(input: unknown) {
  return validatePack(input);
}
