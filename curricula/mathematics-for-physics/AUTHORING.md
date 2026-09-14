# Mathematics for physics: fixed authoring brief

The learner starts with optional algebra/trigonometry refreshers and wants the mathematics needed for mechanics, electromagnetism, quantum mechanics and relativity. Intuition and understanding why come first. Include a derivation when it explains the result; put technical proofs that interrupt the explanation in optional sidebars. Never replace an explanation with a declaration that a result is obvious.

The lead-designed scope, order and actual prerequisites are in `syllabus.ts`. IDs are fixed. Each author writes complete `Chapter` objects (type in `chapter.ts`) as default exports in separate `chapters/NN-id.ts` files. The lead owns index, overview, syllabus, tests and all UI changes. Do not edit other writers' chapters or shared files.

Read `chapters/01-quantities.ts` as the common exemplar. Its main exposition develops a single pendulum question, explains intermediate steps and explicitly limits the dimensional argument. Aim for comparable explanatory care in every chapter. A typical chapter needs 1,200–1,800 words of intuition and theory alone, longer when necessary; do not pad or treat word count as a substitute for teaching. Use 3–4 connected sections, with several full paragraphs per section. Define terminology when it arrives. Stay with a concrete example long enough to calculate and interpret something. A new analogy is not required when the existing example carries the explanation. Accuracy, clarity and continuity override mechanical sentence-length rules.

Use the recurring moving particle, pendulum, two coupled oscillators/vibrating string, heat field and noisy-measurement stories where appropriate. State the physical law being assumed: the mathematics must not require unexplained physics. Mark advanced quoted results and explain their meaning and scope. Notation must be introduced even when revisiting it after a gap.

Each chapter supplies:

- `intuition.body`: several connected paragraphs; `thoughtExperiments`: two meaningful predictions.
- `theory`: 3–4 sections developing the assigned scope. Mathematical expressions use `$...$` or `$$...$$`; use `String.raw` for LaTeX or properly escaped JSON. Real paragraph newlines, no literal `\n` in rendered strings.
- `teaching`: meaningful question, why, 2–3 outcomes, one aligned checkpoint per theory section, takeaway, explicit next connection. Each checkpoint has its primary question/answer and 3 `further` prompts with explanations. `bridge`, `meaning` and outcomes currently render as plain text: use ordinary words/Unicode there, not dollar-delimited LaTeX.
- `diagnostics`: 2–3 actual optional prerequisite questions, or more if needed to cover every prerequisite in syllabus. Set `prerequisiteId` on at least one appropriate diagnostic for each declared prerequisite. For early chapters diagnose algebra readiness. No question gates reading.
- `workedExample`: a concrete, fully explained numerical or symbolic case with at least 4 decisions/steps, each including a reason and trap.
- `fadedExercise`: a DIFFERENT concrete case with at least 4 graded steps, gradually reducing support. Intermediate values must remain available to readers who skip earlier questions; do not depend on stored answers.
- `retrievalProblems`: at least 6 diverse independently answerable problems (some numeric), progressing from interpretation through calculation/misconception to transfer. Helpers `numeric` and `choice` in `curriculum-support/authoring.ts` are available. IDs must be distinct within a chapter across ALL three pools. Choices should have plausible distractors and varied correct-option positions. Explain answers. Do not repeat the question in place of a solution.
- `diagram`: a mathematically meaningful diagram with accurate caption, SVG primitives per schema. Use 600-wide viewbox and readable coordinates/labels. Avoid decorative flow charts unrelated to mathematics. Diagram labels are plain text, not LaTeX.
- `sidebars`: an optional deeper argument or carefully explained qualification. Technical proofs belong here when not needed for the main intuition.
- `sources`: relevant objects from sources.ts for further study (no copied prose). You can cite these known sources without additional broad browsing for stable elementary mathematics. Verify an additional source if introducing it.
- `practical`: the three synthesis chapters must supply a meaningful self-assessed investigation, explicit deliverables and a worked review rubric. All other chapters may supply a short experiment where useful.

Use dimensionless numeric unit `1` where appropriate; state that instruction in numerical question text. Calculus angles are in radians. Fourier convention: forward integral with exp(-ikx), inverse with 1/(2π). Complex inner product conjugates the first argument. Spacetime coordinates (ct,x,y,z), metric signature (-,+,+,+). Under basis change e′=eS, column vector components transform v′=S⁻¹v, row covector components a′=aS, metric g′=SᵀgS. No unexplained summation convention before tensors.

The final physics sections are bridges, not claims of complete quantum mechanics, general relativity, functional analysis or graduate mathematical physics. Proof tasks use optional written self-assessment with solutions, not false automated certification. Keep all exposition and answers visible without question completion.

Run targeted schema/KaTeX checks where feasible and manually recompute example and exercise answers. Report any suspected prerequisite or design issue to the lead rather than silently changing the syllabus. Do not commit or push; the lead integrates and validates.
