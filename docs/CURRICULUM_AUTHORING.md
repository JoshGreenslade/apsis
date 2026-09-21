# Courses and prefabs

Every course uses the same file layout and runtime contract. Teaching style,
pace, length, section names, prefab order and assessment choices belong to the
course. No prefab or question count is mandatory.

```text
curriculums/my-course/
  course.json          Course metadata (id, version, title, description)
  index.ts             Imports lessons in the intended reading order
  lessons/
    introduction.json  Lesson metadata and prefab sections
```

Run `npm run course:new -- my-course "My course"` to create this layout, or copy
an existing course. The registry discovers `curriculums/*/index.ts` at build time;
there is no central course list to update. Lesson files may also be TypeScript
when helpers or shared constants are useful; import them in the same `index.ts`.

```ts
import { defineCourse } from "@/prefabs/authoring";
import course from "./course.json";
import introduction from "./lessons/introduction.json";

export default defineCourse({ ...course, topics: [introduction] });
```

A complete minimal lesson:

```json
{
  "id": "introduction",
  "title": "Introduction",
  "content": {
    "sections": [
      {
        "id": "opening",
        "title": "An idea",
        "blocks": [
          {
            "kind": "content",
            "body": "Write in Markdown, with optional $math$."
          },
          {
            "kind": "question",
            "question": "What follows?",
            "answer": "An optional reflection."
          }
        ]
      }
    ]
  }
}
```

## Prefab library

`prefabs/schema.ts` exports the contracts, `prefabs/Renderer.tsx` renders them,
and `prefabs/authoring.ts` supplies optional numeric, choice, expression and
diagram helpers. Type definitions and runtime schemas live in `types/curriculum.ts`.

| Kind          | Data                              | Purpose                                                                     |
| ------------- | --------------------------------- | --------------------------------------------------------------------------- |
| `content`     | `body`, optional `title`          | Markdown and mathematics                                                    |
| `diagram`     | `data`                            | Declarative SVG primitives                                                  |
| `question`    | `question`, `answer`              | Ungraded reflection with answer disclosure                                  |
| `example`     | `title`, `problem`, `steps`       | Worked example                                                              |
| `steps`       | `title`, `steps`                  | An ordered explanation                                                      |
| `callout`     | `title`, `body`, optional `tone`  | Emphasis or a warning                                                       |
| `list`        | `items`, optional `title`         | A list                                                                      |
| `sidebar`     | `heading`, `body`                 | Expandable supporting material                                              |
| `lab`         | `data`                            | Practical brief, steps, deliverables and review                             |
| `takeaway`    | `body`, optional `nextConnection` | A closing thought                                                           |
| `summary`     | `data`                            | Optional mathematical assumptions, laws and checks                          |
| `exploration` | `experiment`                      | Interactive derivative, integral, eigenvector, Fourier or metric experiment |

Use any mix, repeat blocks, and order sections however the lesson needs. Section
IDs must be unique within a lesson because they are navigation anchors. Optional
section `role` values affect styling only. To add a prefab, add a discriminated
variant to `LessonBlockSchema`, its renderer case, and a rendering test. The
exhaustive switch flags missing renderers. New experiments can extend the
exploration prefab; they are selected by data, never by course ID.

## Optional features

Lessons may supply `description`, `heading`, `lead`, `outcomes`, `domain`, `unit`,
`minutes`, `sources` and `prerequisites`. Time is an estimate, never a limit.
Prerequisites must reference lessons in the same course and form an acyclic
graph; they do not lock reading or require diagnostic questions.

Graded questions live in optional `diagnostics`, `fadedExercise.steps`,
`retrievalProblems` and `transferProblems`. `practiceTemplates` provides bounded
numerical variants. These use `ProblemSchema` and the shared practice engine.
Question IDs are unique within a lesson. Choice answers reference valid options;
numeric answers declare accepted units and tolerances. Reflection prefabs do not
award mastery. Reading progress and scheduled knowledge checks remain separate.

Keep course IDs, lesson IDs, question IDs and versions stable when retaining
existing notebooks. Bumping a course version creates a new progress namespace.
