# Curriculum authoring

Curriculum topics have two layers:

- the validated runtime contract, which supplies metadata, practice and compatibility fields;
- `content`, which controls the reader-facing order and shape of a lesson.

Use `content` when a lesson needs a structure that is not the standard story, reasoning, example and takeaway sequence. A lesson can have any number of sections, and each section can mix reusable blocks:

```ts
content: {
  sections: [
    {
      id: "opening",
      title: "The problem",
      role: "story",
      blocks: [
        { kind: "prose", body: "Begin with the concrete situation..." },
        {
          kind: "callout",
          title: "The question",
          body: "What should the reader decide next?",
          tone: "question",
        },
      ],
    },
    {
      id: "investigation",
      title: "Follow the evidence",
      role: "reasoning",
      blocks: [
        { kind: "prose", title: "First idea", body: "..." },
        {
          kind: "checkpoint",
          question: "What changed?",
          answer: "The observation changed the next decision.",
        },
      ],
    },
  ],
},
```

Available blocks are `prose`, `callout`, `list`, `steps`, `diagram`, `checkpoint`, `example`, `sidebar`, `lab` and `takeaway`. These are intentionally subject-neutral. A maths lesson can use a diagram and worked steps; an engineering lesson can use an incident sequence and a lab; neither needs a different renderer.

Keep domain-specific assessment data separate. Numeric answers, units, tolerances, choice options and retrieval scheduling belong in the typed practice fields, not in a generic prose block.

Topics without `content` continue to use the existing presentation. Agentic lessons now emit this content model through their builder, while older maths and astrodynamics topics remain compatible during migration.

For a new course, compile a content-first topic with `defineCurriculumTopic`:

```ts
import { defineCurriculumTopic } from "@/curriculum-support/authoring";

const topic = defineCurriculumTopic({
  id: "first-lesson",
  title: "A lesson with its own shape",
  description: "State the capability the learner should leave with.",
  domain: "Example course",
  unit: "01 · Begin",
  prerequisites: [],
  minutes: 20,
  content: {
    sections: [
      {
        id: "opening",
        title: "Start with the situation",
        role: "story",
        blocks: [{ kind: "prose", body: "Begin with a concrete case." }],
      },
    ],
  },
  sources: [{ title: "Course notes", url: "https://example.com/notes" }],
});
```

The compiler derives the compatibility teaching fields, worked example, diagram and fallback reflection checks. Supply `retrievalProblems`, `diagnostics` and `fadedExercise` when the course needs authored assessment rather than generated reflection checks. This keeps the reader structure independent from the assessment model while retaining the validated runtime contract.
