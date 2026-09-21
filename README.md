# Apsis

Courses built from reusable prefabs, with open reading, optional practice,
notes and saved progress. Includes agentic engineering, astrodynamics and
mathematics for physics.

## Run

Requires Node.js 24+ (the server uses built-in SQLite).

```sh
npm ci
npm run dev
```

Open the printed local URL. For production, run `npm run build` then `npm start`.

## Add a course

```sh
npm run course:new -- my-course "My course"
```

Edit the generated files:

```text
curriculums/my-course/
  course.json
  index.ts
  lessons/
    introduction.json
```

`course.json` holds metadata; `index.ts` lists lessons in reading order; each
lesson composes prefabs such as `content`, `diagram`, `question` and `example`.
The build discovers new course folders automatically. JSON and TypeScript
lessons use the same contract, validation and renderer.

Courses choose their own teaching style, pace and structure. There is no required
lesson sequence, prose style, question count or set of prefabs.
See [the authoring guide](docs/CURRICULUM_AUTHORING.md) for the complete prefab
catalogue, a minimal lesson and how to extend the library.

## Architecture

| Location                               | Responsibility                                        |
| -------------------------------------- | ----------------------------------------------------- |
| `curriculums/<id>/`                    | Course metadata and authored lessons                  |
| `curriculums/registry.ts`              | Build-time lazy discovery                             |
| `prefabs/`                             | Shared authoring helpers, schema exports and renderer |
| `types/curriculum.ts`                  | Validated course, prefab and assessment contracts     |
| `components/TeachingWorkspace.tsx`     | Navigation, overview, notes and practice              |
| `lib/curriculum-engine.ts`             | Reference validation, grading and spaced review       |
| `lib/practice-generator.ts`            | Bounded numerical practice variants                   |
| `lib/store.ts`, `lib/browser-store.ts` | Server and static-site persistence                    |
| `app/api/`                             | Progress and practice endpoints                       |

All three courses use the same folder layout. Course-specific builders and the
legacy lesson renderer have been removed. The current lessons retain their
authored material and identifiers; future lessons can use any prefab composition.

## Progress and practice

Reading is always open. Marking a lesson read is separate from answering its
knowledge checks; only authored retrieval questions award mastery and scheduled
review. Labs and reflections are self-reviewed. The [agent lab kit](public/agent-labs/README.md)
contains runnable offline examples and a downloadable archive.

Practice templates define variables, bounds, units and arithmetic expression
trees. Answers are computed locally or on the server. Optional AI selection uses
`OPENAI_API_KEY` and `OPENAI_MODEL` from `.env.local` (see `.env.example`) and falls
back to checked local variations. Keys remain server-side. Extra practice does
not award mastery. The server limits generation to 30 requests per anonymous
identity and 60 globally per hour; generated questions expire after seven days.

## Deployment and persistence

The GitHub Pages workflow builds a static export with `PAGES_BASE_PATH` and
publishes `out/`. Static mode saves notes and progress in browser localStorage
and generates practice locally. It has no shared persistence or AI service.
Webpack is selected explicitly for curriculum discovery.

The Node server stores anonymous notebooks in `.data/mastery.sqlite`, identified
by an HttpOnly cookie. Override the path with `CURRICULUM_DB_PATH`. Use persistent
storage and WAL-aware backups; multiple replicas need a shared database adapter.
Behind HTTPS, set `APP_ORIGIN` and preserve the public Host header. Neither mode
provides accounts, recovery or cross-device synchronization.

Course ID and version scope saved progress; lesson and question IDs identify
records within it. Keep these stable to retain notebooks. Answer data is shipped
to the client for self-study, so this is not a secure examination system.

## Checks

```sh
npm run typecheck
npm test
npm run test:labs
npm run build
```

With the app running, `npm run test:browser` and `npm run test:agents-browser`
exercise reading, grading, persistence, course discovery and responsive layouts.
They use Microsoft Edge by default; set `TEST_BASE_URL` for another local port.
After building with `PAGES_BASE_PATH=/apsis`, `npm run test:maths-browser` checks
the static export, including diagrams and expanded supporting material.

Against the development server, `npm run test:course-browser` temporarily
scaffolds a minimal course, verifies discovery and saved notes, then removes it.
Static builds include `.tsx`/`.jsx` app entries; server-only API routes use `.ts`.

`J` / `K` navigate lesson sections outside form controls. `Ctrl+Enter` /
`Cmd+Enter` submits the focused question. Save notes to persist them across reloads.
