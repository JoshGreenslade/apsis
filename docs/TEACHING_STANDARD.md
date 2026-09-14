# Teaching standard

The reader should finish a lesson able to reconstruct an idea and use it in a new situation. Clear prose around a list of formulas is not enough. The user's editorial reference shelf is Velleman, Abbott, Griffiths, Schroeder, Taylor, Spivak, Morin, Axler and Tu. Use the teaching goals below to guide original writing; do not reproduce passages or mimic an author's voice.

## Develop an idea

1. Start with a concrete question, puzzle or failed prediction. Explain why a reader would want the next mathematical tool.
2. Establish a physical picture or small example before introducing notation. Define each new quantity when it becomes useful.
3. State assumptions before using them. Distinguish a definition, a derived result and a result quoted from a more advanced theory.
4. Explain the choice of mathematical operation. “Dot with velocity” needs a reason: it produces the derivative of squared speed.
5. Show the consequential intermediate steps. Never conceal a cancellation, sign choice, frame change or exceptional case behind “clearly.” Routine arithmetic can be compact.
6. Interpret the result in words. Check dimensions, a simple case and a limiting case where appropriate. Include a counterexample to a likely overgeneralization.
7. Work an example with reasons for decisions, then reduce support. Include prediction, explanation and derivation prompts alongside numerical practice.
8. Close by answering the opening question and identifying the next unresolved question. Course outcomes must describe usable abilities, with an honest account of what remains outside the course.

## Prose style

Open every lesson's intuition and every theory section with a concrete, often non-technical scene or analogy — a mechanic diagnosing a car, a hospital shift handover, Newton's cannonball — never with a meta sentence like "before we begin, let's...". Write in long, connected sentences with subordinate clauses; a paragraph of short declarative fragments is not prose, however accurate each fragment is. Explain new vocabulary in the sentence that introduces it, even to an experienced audience — do not assume a term is already familiar just because the reader is technical. A lesson's intuition should run several full paragraphs, not a couple of sentences; this is the reader's first contact with the idea, and it should not be rushed. Reusing one analogy across several lessons in the same course (the mechanic and the workshop, in the agentic-engineering course) is good practice, not repetition — it gives the course a thread the reader can follow, the way Taylor and Griffiths reuse worked examples across chapters.

## Question depth

Aim for roughly 20 questions per topic, spanning four pools, each progressing from easy recall to a harder synthesis or counterexample question:

- **Diagnostics** (2-3): gate a prerequisite; these can stay short and easy.
- **Guided practice** (`fadedExercise.steps`, 4+): scaffolded numeric/choice problems that build on supplied intermediate results, ending in an application slightly beyond the worked example.
- **Retrieval problems** (6+): the graded knowledge check. Order roughly from direct recall, through a sign/unit/misconception check, to a synthesis question that combines two ideas from the lesson (a burn plus vis-viva, say) rather than repeating the worked example.
- **Reflection checkpoints** (`teaching.checkpoints`, one per theory section, each carrying 4-5 total prompts via its `question`/`answer` pair plus 3-4 more in `further`): the first question can be an easy comprehension check; the later ones in `further` should test the actual derivation or design decision, not just its conclusion — "would the argument still work if X were flipped?" rather than "what does X equal?".

## Give the learner control

All exposition and worked solutions remain readable without answering anything. Reflection questions use optional answer disclosures. Fixed practice, fresh variants and spaced review are available independently of reading. Marking a lesson read never awards knowledge-check mastery. Skipping a question never prevents reading ahead.

The optional AI service selects bounded variations of reviewed numerical families. The server computes answers from curriculum formulas. These questions provide additional practice; they do not replace the authored conceptual progression or award mastery. Label local fallback questions honestly.

## Editorial review

Read a chapter continuously with practice hidden. Does each paragraph supply something needed by the next? Could a first-time reader explain why the main derivation works? Are any required ideas introduced only in a question? Does the example expose a decision rather than just substitution? Can the reader distinguish what was proved from what was assumed? Revise until those questions have satisfactory answers.

The opening energy lesson ("two-body" in the astrodynamics pack) is the reference exemplar for both prose and question depth described above: a motivating prediction (Newton's cannonball), a justified scalar operation, explicit apsides algebra, a separately handled circular case, a counterexample about circular speed, and roughly twenty-five graduated questions across its diagnostics, guided practice, retrieval problems and reflection checkpoints. Bring every other lesson in every pack up to this same bar; a lesson that only has two or three questions, or whose reflections stop at the first easy one, is not finished yet. This compact course is not a replacement for a full-length textbook.

## Reference context

The user supplied the reference shelf as a preference. As a supporting editorial reference, [Springer's description of Abbott's Understanding Analysis](https://link.springer.com/book/10.1007/978-1-4939-2712-8) describes informal motivating questions followed by precise developments and a coherent progression of ideas. This document turns that general aim into an authoring checklist; it does not claim a comparative study of all the named books.
