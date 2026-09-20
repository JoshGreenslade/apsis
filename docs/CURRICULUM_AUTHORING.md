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
