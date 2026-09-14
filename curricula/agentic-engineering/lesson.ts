import type { CurriculumTopic } from "@/types/curriculum";
import { choice, pointFlow } from "@/curriculum-support/authoring";
import { sources } from "./sources";
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
  minutes?: number;
};
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
      ...(lesson.moreChecks ?? []).map((check, i) => q(check, `check-extra-${i + 1}`)),
    ],
    sources: lesson.source.map((k) => sources[k]),
    practical: lesson.practical,
  };
}
// Build every topic in a unit, wiring each lesson's diagnostic prerequisite to
// the immediately preceding lesson so a unit reads as one continuous chain.
export function buildUnit(lessons: Lesson[], previousLast?: Lesson): CurriculumTopic[] {
  return lessons.map((lesson, i) =>
    buildTopic(lesson, i === 0 ? previousLast : lessons[i - 1]),
  );
}
