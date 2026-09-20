# Curriculum authoring

## Editorial judgement

The original agentic lessons were too dense. Preserve the readability of the rewrite when repairing omissions; do not bring back compressed explanations.

Write naturally. There is no required opening, paragraph rhythm, or definition-example-warning sequence. Choose the shape of each lesson for what it teaches. Give difficult ideas room, explain unfamiliar terms when needed, and retain examples, runnable exercises and qualifications that help the reader understand. Shorter is not automatically clearer.

Read the course as a learner before polishing its machinery. Look for advice that names a technique without explaining how to use it, repeated analogies and examples that never reach an actual decision. Improve those passages directly. Do not turn this advice into a requirement that every lesson begin with an incident or contain the same kind of example. Tests can catch missing blocks; they cannot establish that the prose is worth reading.

Use diagrams only when they explain something the prose cannot show as well. A well-chosen, attributed external diagram can be better than a generic flowchart. Check the rendered lesson and its actual neighbours, not just the source file.

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

The compiler supplies empty compatibility containers, not invented teaching material. It does not generate diagrams, examples or graded questions from prose or checkpoints. Supply `retrievalProblems`, `diagnostics` and `fadedExercise` explicitly when needed. Checkpoints remain ungraded reflections.

Content-first lessons can declare prerequisites without assigning diagnostics. Any supplied diagnostic must refer to a declared prerequisite. Without retrieval questions, a lesson can be marked as read but cannot earn mastery or enter scheduled review merely by answering a warm-up.

Legacy lessons retain their stricter requirements. `contentFromCurriculumTopic` preserves their diagrams, thought experiments, checkpoints, examples and sidebars during migration. Consolidation must not turn example introductions into artificial solution steps. Warm-ups must match the actual chapter order.

Course-specific reading orders belong with that course, not in the shared renderer. Reusable blocks are a vocabulary, not a required checklist. Test content-only lessons, mixed legacy content, explicit assessments and rendered navigation when extending the model.
