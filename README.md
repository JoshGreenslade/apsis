# Apsis — understand the ideas, then put them to work

A teaching-led Next.js textbook with open lessons, optional questions, persistent notes and progress, and fresh numerical practice. The first screen is a curriculum overview: what you will learn, what you will be able to do, the suggested learning path, prerequisites, and a final application challenge.

## Courses

- **Agentic engineering:** 32 concept lessons in 10 units, ten practical labs, a nine-stage tiny-harness project and a measured repository capstone. Covers models, agents, harnesses, orchestration, context, memory, coding products, delegation, gh-aw, tools/MCP/skills, multi-agent systems, evaluation and economics. Each lesson contains original explanatory prose, teaching checkpoints that bridge each theory section, a worked engineering case and three optional comprehension/application questions. Product references were checked on 13 September 2026.
- **Astrodynamics:** six lessons from two-body energy to transfers, perturbations and patched conics, with worked calculations and numerical practice.

The [agent lab guide](public/agent-labs/README.md) includes an executable offline harness, deliberately failing fixture, evaluator, CSV template and a gh-aw source/compiled example. Download the kit in the app from the harness project. The scripted model is a test double; live-model integration, advanced v4–v9 extensions and the real-repository capstone are learner projects with explicit acceptance criteria. The gh-aw example compiled with v0.88.7; no live agent workflow or model benchmark is claimed.

Labs are optional, self-reviewed work with deliverables and review guides. Reading, quiz mastery and real project completion are distinct. The app does not award project competence merely for reading or answering multiple-choice questions.

## Run

Requires Node.js 24+ and npm; SQLite uses the built-in `node:sqlite` module.

```sh
npm ci
npm run dev
```

Open the printed URL, normally `http://127.0.0.1:3000`. For a production Node server, use `npm run build` then `npm start`. Webpack is selected explicitly for lazy curriculum-module discovery.

## What changed in this revision

The user's textbook shortlist now informs the [teaching standard](docs/TEACHING_STANDARD.md). The energy chapter explicitly develops the conservation argument and apsides algebra, handles the circular exception, and tests a tempting misconception. Geometry, transfers, plane changes and escape include additional reasoning between equations; the perturbation lesson distinguishes quoted advanced results from derivations taught here.

- Lessons start with a motivating question and explain why the idea matters. Explanatory bridges introduce the equations, plain-language interpretations follow them, and prediction prompts let learners compare their reasoning with a revealed explanation.
- Every lesson is readable in full immediately. The four section links navigate within a single continuous lesson. “Focus on reading” hides the practice panel.
- Warm-ups, supported problems, and independent checks are optional and can be attempted in any order. There are no prerequisite-answer or fading-step locks.
- “Mark lesson as read” records reading progress only. Knowledge-check status requires correct answers to the lesson's fixed independent problems. Skipping, browsing, reading, and extra practice do not award mastery.
- Course and lesson outcomes explain the practical abilities being developed. The astrodynamics course ends with an Earth-to-lunar-distance planning challenge.
- “Fresh question” generates analogous numerical problems. It works without an API key, and supports optional bounded AI generation.

Existing notes, passed answers, and review schedules are retained. The added reading flag is optional in stored records so older notebooks remain compatible. The legacy `stage` field and `advance` API action remain supported for older clients but never restrict reading or award mastery.

## Fresh practice and the AI connection

Each topic supplies a checked question template, named parameter ranges, a unit, a hint, a worked explanation, and a small arithmetic expression tree. A fresh parameter set produces a new analogous question. The server computes the answer using the expression tree; it never evaluates arbitrary code or accepts an AI-provided answer.

To enable AI-selected variations, copy `.env.example` to `.env.local`, then set both `OPENAI_API_KEY` and `OPENAI_MODEL` server-side. Choose a model available to your account that supports structured outputs. Restart the development server after configuration. Do not put API keys in browser code or paste them into the interface.

The optional integration uses the [OpenAI Responses API's structured-output format](https://developers.openai.com/api/docs/guides/structured-outputs) with `store: false`. The AI selects a supplied template and a new bounded parameter set. It does **not** invent unrestricted problems or authoritative solutions. Only template descriptions, variable ranges, and the previous parameter set are sent; notes and learner identity are excluded.

Validation checks the template ID, variable names, distinctness, allowed ranges, and step sizes. Out-of-range output, refusal, incomplete output, timeout, provider errors, or repetition fall back to a new locally sampled variation. The interface identifies whether AI selected the variation or a checked template supplied it. Without credentials, it explicitly says that AI is not connected.

The API implementation has been tested with simulated valid responses, invalid values, refusals, and provider failures. A live paid request was not made because no API key/model was configured in this workspace. Numerical correctness is checked independently of the model. Template variety is deliberately bounded: the astrodynamics pack currently has one numerical practice family per lesson.

Practice creation is limited to 30 requests per anonymous identity per hour and 60 globally per hour, stored transactionally in SQLite. Questions are scoped to the creating identity and removed after seven days during subsequent generation. Extra practice is separate from fixed mastery checks and spaced-review scheduling.

## Project structure

```text
types/curriculum.ts                 Runtime schemas and strict TypeScript contracts
lib/curriculum-engine.ts            DAG, answer evaluation, knowledge checks, SM-2
components/LessonViewer.tsx         Stable entry point for the lesson runner
components/TeachingWorkspace.tsx    Course overview, continuous lessons, practice, notes
components/FadedExercise.tsx        Optional supported practice and answer entry
components/ExtraPractice.tsx        Fresh-question generation and feedback
components/MathText.tsx             Markdown, KaTeX, copyable formula source
components/Diagram.tsx              Declarative SVG with optional labels/construction
curricula/astrodynamics/             Folder curriculum pack: index, shared constants/diagrams, topics/
curricula/agentic-engineering/       Folder curriculum pack: index, shared lesson builder, units/
curricula/registry.ts                Lazy discovery of every curricula/<id>/index.ts
curriculum-support/authoring.ts      Shared problem/expression/diagram builders for all packs
lib/practice-generator.ts           Safe arithmetic, sampling, bounded AI integration
lib/store.ts                       Transactional notes, progress, questions, rate limits
app/api/progress/route.ts           Read status, submitted answers, notes
app/api/practice/route.ts           Fresh questions and session-scoped evaluation
app/teaching.css                    Teaching workspace and responsive visual design
```

## Curriculum and extension contract

The application engine contains no orbital equations. All teaching content, prerequisites, diagrams, fixed questions, correct answers, tolerances, and practice formulas come from curriculum data.

Each curriculum is a self-contained folder directly under `curricula/`, with a default `CurriculumPack` export from its `index.ts`. The lazy registry automatically includes every `curricula/<id>/index.ts` on the next build — adding a curriculum is adding a folder, not editing a shared file. Within a pack, give every topic (or, for agentic engineering, every lesson) its own file under a `topics/` or `units/` subfolder so a single lesson can be found, reviewed and extended without scrolling a large shared file. Curriculum-agnostic authoring helpers (numeric/choice problem builders, the practice-formula expression DSL, shared diagram primitives) live in `curriculum-support/authoring.ts`; a curriculum's own constants, diagrams or lesson-building helpers stay local to that curriculum's folder. Discovery is build-time, not hot loading of untrusted remote curricula.

Every pack has a unique ID and version, and every topic has a unique ID and declared dependencies. Dependencies form a validated DAG and guide the recommended learning order; they do not lock the learner out. Each dependency still has a corresponding optional diagnostic. Questions have unique IDs within a topic. Numeric questions specify tolerances and accepted units; choice answers reference declared options.

Optional `overview` data supplies course outcomes and the final challenge. Optional `teaching` data supplies the motivating question, practical outcomes, a bridge/interpretation/checkpoint for each theory section, a takeaway, and the connection to the next lesson. Every current lesson in every pack supplies a checkpoint for each theory section, plus several harder `further` reflections per checkpoint. Older or future packs without these additions still receive a functional generic presentation. Keep the number and order of teaching checkpoints aligned with theory sections.

New lessons follow [docs/TEACHING_STANDARD.md](docs/TEACHING_STANDARD.md), which sets the required prose register (open with a concrete scene or analogy, long connected paragraphs, jargon explained inline) and question depth (roughly 20 graduated questions per topic across diagnostics, guided practice, retrieval problems and reflection checkpoints). The astrodynamics `two-body` lesson is the reference exemplar for both.

`teaching.checkpoints` may be empty for continuous prose lessons whose checks live in the practice panel. Optional `practical` data adds a brief, estimated time, steps, deliverables and an expandable review guide. It never gates reading.

Additional checks: `npm run test:labs` tests the offline harness and evaluator; `npm run test:agents-browser` visits all 32 agent-course lessons, verifies optional labs and questions, downloads the lab kit and checks mobile layout. Browser smoke tests use installed Microsoft Edge by default.

Use `String.raw` template literals for LaTeX and normal paragraph breaks. Use `$...$` for inline math and `$$...$$` for display equations. Raw HTML is disabled. Diagrams contain only validated coordinate primitives. Practice formulas use a bounded arithmetic tree with named variables and explicit operators; they are never JavaScript strings to execute.

The astrodynamics pack covers two-body energy and vis-viva; all six elements and Kepler's equation; Hohmann burns, phasing, and plane changes; and extensions on J₂ and patched conics. Numerical assumptions include Earth μ = 398600.4418 km³/s² and reference Earth radius = 6378 km. Model limitations are described with the calculations.

## Progress, identity, and deployment

An opaque HttpOnly, SameSite=Strict cookie identifies an anonymous notebook. Notes, reading flags, passed answers and schedules persist in `.data/mastery.sqlite`; configure a different path with `CURRICULUM_DB_PATH`. No account login, recovery, or cross-device synchronization is included. Keep the cookie to retain access to the same identity. Curriculum version changes create a separate progress namespace.

Use a persistent disk for production and back up SQLite with WAL-aware tools. A shared database adapter is needed for multiple independent replicas or ephemeral serverless hosts. Behind an HTTPS proxy, configure `APP_ORIGIN` to the exact public origin and preserve the public Host header. Mutation APIs enforce same-origin requests, bounded payloads, and runtime schemas. HTTPS origins use secure cookies. No public deployment was made for this source-code deliverable.

Mastery here means initial success on the fixed self-check set. The simplified SM-2 schedule starts at one day, then six days, then expands with ease after successful scheduled recall. A failed scheduled recall records one lapse per topic-session and brings the interval back to one day. Immediate correction does not erase that lapse; early extra practice preserves due dates. This is a transparent heuristic rather than calibrated FSRS.

Rubrics classify submitted errors as conceptual, algebraic, or unit/reference errors. They do not infer unobserved reasoning or grade free-form notes. Answer data is available in the client for this self-study application; it is not a secure examination system.

## Verification and controls

```sh
npm run typecheck
npm test
npm run test:browser
npm run build
```

The browser test uses a fresh headless Edge context and the running local application. Set `TEST_BASE_URL` to use another instance. It writes QA screenshots under the workspace `work/qa-v2` directory. Tests cover open final lessons, all reading sections available without answers, reading/mastery separation, out-of-order questions, optional diagnostics, persistence, fresh-generation correctness, units, question isolation, cross-origin rejection, mixed-question skipping, mobile layout, and enlarged text. Unit tests cover both packs, formulas, DAG validity, evaluation, schedules and lapses, practice boundaries, independent numerical benchmarks, and AI fallbacks.

`J` / `K` navigate reading sections outside form controls. `Ctrl+Enter` / `Cmd+Enter` checks the focused problem. Notes stay in draft memory when switching lessons; use Save notes for persistence across reloads. An optional WebMCP read-only progress tool is feature-detected; its contract is tested with a browser test registry, not a live agent integration.

Sources linked in lessons include [NASA's trajectory overview](https://science.nasa.gov/learn/basics-of-space-flight/chapter4-1/), [NASA's orbital geometry explanation](https://pwg.gsfc.nasa.gov/stargaze/Smotion.htm), [JPL's parameter reference](https://ssd.jpl.nasa.gov/astro_par.html), and [FreeFlyer's J₂ guide](https://ai-solutions.com/_freeflyeruniversityguide/j2_perturbation.htm). The content is original instructional exposition and idealized calculation, not a flight-navigation solver or independently peer-reviewed textbook.
