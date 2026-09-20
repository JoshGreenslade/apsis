import {
  CurriculumPackSchema,
  stages,
  type CurriculumPack,
  type CurriculumTopic,
  type Feedback,
  type LearnerState,
  type LearningAction,
  type Problem,
  type Schedule,
  type Submission,
  type TopicProgress,
} from "@/types/curriculum";

export function topologicalOrder(topics: CurriculumTopic[]): CurriculumTopic[] {
  const byId = new Map(topics.map((t) => [t.id, t]));
  if (byId.size !== topics.length) throw new Error("Duplicate topic ID");
  const visiting = new Set<string>(),
    visited = new Set<string>(),
    ordered: CurriculumTopic[] = [];
  function visit(id: string) {
    if (visiting.has(id)) throw new Error(`Curriculum cycle at ${id}`);
    if (visited.has(id)) return;
    const t = byId.get(id);
    if (!t) throw new Error(`Missing prerequisite ${id}`);
    visiting.add(id);
    t.prerequisites.forEach(visit);
    visiting.delete(id);
    visited.add(id);
    ordered.push(t);
  }
  topics.forEach((t) => visit(t.id));
  return ordered;
}
export function validatePack(input: unknown): CurriculumPack {
  const pack = CurriculumPackSchema.parse(input);
  topologicalOrder(pack.topics);
  for (const t of pack.topics) {
    const ps = [
      ...t.diagnostics,
      ...t.fadedExercise.steps,
      ...t.retrievalProblems,
      ...(t.transferProblems ?? []),
    ];
    if (new Set(ps.map((p) => p.id)).size !== ps.length)
      throw new Error(`Duplicate problem in ${t.id}`);
    for (const p of ps) {
      if (p.prerequisiteId && !t.prerequisites.includes(p.prerequisiteId))
        throw new Error("Diagnostic references undeclared prerequisite");
      if (
        p.answer.kind === "choice" &&
        (!p.answer.options.some((o) => o.id === p.answer.value) ||
          new Set(p.answer.options.map((o) => o.id)).size !==
            p.answer.options.length)
      )
        throw new Error("Invalid choices");
      if (
        p.answer.kind === "numeric" &&
        !p.answer.acceptedUnits.includes(p.answer.unit)
      )
        throw new Error("Canonical unit must be accepted");
    }
    for (const prerequisite of t.prerequisites)
      if (!t.content && !t.diagnostics.some((p) => p.prerequisiteId === prerequisite))
        throw new Error(`Missing diagnostic for ${prerequisite}`);
  }
  return pack;
}
export function initialProgress(): TopicProgress {
  return {
    stage: "diagnostic",
    passed: [],
    attempts: {},
    mastered: false,
    schedule: null,
    errors: { conceptual: 0, algebraic: 0, "unit-reference": 0 },
  };
}
export function unmetPrerequisites(
  topic: CurriculumTopic,
  state: LearnerState,
): string[] {
  return topic.prerequisites.filter((id) => !state.topics[id]?.mastered);
}
export function evaluate(problem: Problem, submission: Submission): Feedback {
  const a = problem.answer;
  const raw = submission.value.trim();
  if (a.kind === "numeric") {
    if (
      !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(raw) ||
      !Number.isFinite(Number(raw))
    )
      return {
        correct: false,
        category: "algebraic",
        message:
          "Enter a finite number, optionally in scientific notation (for example 3.986e5).",
      };
    const normalize = (s: string) =>
      s
        .trim()
        .toLowerCase()
        .replaceAll("²", "^2")
        .replaceAll("³", "^3")
        .replace(/\s/g, "");
    if (
      !a.acceptedUnits.some(
        (u) => normalize(u) === normalize(submission.unit ?? ""),
      )
    )
      return {
        correct: false,
        category: "unit-reference",
        message: `Use ${a.unit}. Convert your value first; changing the label does not convert it.`,
      };
    if (
      Math.abs(Number(raw) - a.value) <=
      Math.max(a.absoluteTolerance, Math.abs(a.value) * a.relativeTolerance)
    )
      return { correct: true, category: null, message: problem.solution };
  } else if (raw === a.value)
    return { correct: true, category: null, message: problem.solution };
  const known = problem.rubric.misconceptions.find((m) => m.value === raw);
  return {
    correct: false,
    category: known?.category ?? problem.rubric.defaultCategory,
    message: known?.feedback ?? problem.rubric.explanation,
  };
}
// Simplified SM-2: lapse => 1 day; successful recall => 1, 6, then interval × ease.
export function scheduleReview(
  previous: Schedule | null,
  quality: 0 | 1 | 2 | 3 | 4 | 5,
  now = new Date(),
): Schedule {
  const old = previous ?? {
    due: now.toISOString(),
    intervalDays: 0,
    ease: 2.5,
    repetitions: 0,
    lapses: 0,
  };
  const ease = Math.max(
    1.3,
    old.ease + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02),
  );
  const repetitions = quality < 3 ? 0 : old.repetitions + 1;
  const intervalDays =
    quality < 3
      ? 1
      : repetitions === 1
        ? 1
        : repetitions === 2
          ? 6
          : Math.max(1, Math.round(old.intervalDays * ease));
  return {
    due: new Date(now.getTime() + intervalDays * 86400000).toISOString(),
    intervalDays,
    ease,
    repetitions,
    lapses: old.lapses + (quality < 3 ? 1 : 0),
  };
}
export function reviewQueue(
  pack: CurriculumPack,
  state: LearnerState,
  now = new Date(),
) {
  const due = topologicalOrder(pack.topics).filter((t) => {
    const p = state.topics[t.id];
    return p?.mastered && p.schedule && new Date(p.schedule.due) <= now;
  });
  due.sort(
    (a, b) =>
      Date.parse(state.topics[a.id].schedule!.due) -
      Date.parse(state.topics[b.id].schedule!.due),
  );
  // Round robin across topics avoids blocks of same-topic practice.
  return Array.from(
    { length: Math.max(0, ...due.map((t) => t.retrievalProblems.length)) },
    (_, i) =>
      due.flatMap((t) =>
        t.retrievalProblems[i]
          ? [{ topicId: t.id, problem: t.retrievalProblems[i] }]
          : [],
      ),
  ).flat();
}
export function applyAction(
  pack: CurriculumPack,
  current: LearnerState,
  action: LearningAction,
  now = new Date(),
): { state: LearnerState; feedback?: Feedback } {
  const state = structuredClone(current);
  const topic = pack.topics.find((t) => t.id === action.topicId);
  if (!topic) throw new Error("Unknown topic");
  const p = (state.topics[topic.id] ??= initialProgress());
  if (action.type === "read") {
    p.read = action.read;
    return { state };
  }
  if (action.type === "scratchpad") {
    state.scratchpads[topic.id] = action.text.slice(0, 20000);
    return { state };
  }
  if (action.type === "advance") {
    // Legacy clients may advance reading position. This never grants mastery.
    if (!p.mastered) p.stage = stages[Math.min(stages.indexOf(p.stage) + 1, 5)];
    return { state };
  }
  if (action.review && !p.mastered)
    throw new Error("Review is unavailable before initial mastery");
  const pool = action.review
    ? topic.retrievalProblems
    : [
        ...topic.diagnostics,
        ...topic.fadedExercise.steps,
        ...topic.retrievalProblems,
        ...(topic.transferProblems ?? []),
      ];
  const problem = pool.find((x) => x.id === action.problemId);
  if (!problem) throw new Error("Problem is unavailable in this lesson");
  const feedback = evaluate(problem, action.submission);
  p.attempts[problem.id] = (p.attempts[problem.id] ?? 0) + 1;
  if (feedback.correct) {
    if (!p.passed.includes(problem.id)) p.passed.push(problem.id);
  } else if (feedback.category) p.errors[feedback.category]++;
  if (action.review) {
    const isDue = !!p.schedule && Date.parse(p.schedule.due) <= now.getTime();
    const scheduledSession = p.passed.includes("review:scheduled") || isDue;
    if (isDue && !p.passed.includes("review:scheduled"))
      p.passed.push("review:scheduled");
    const key = `review:${problem.id}`;
    p.attempts[key] = (p.attempts[key] ?? 0) + 1;
    // A failed recall is itself evidence of a lapse; retry cannot erase it.
    if (
      !feedback.correct &&
      scheduledSession &&
      !p.passed.includes("review:lapsed")
    ) {
      p.schedule = scheduleReview(p.schedule, 1, now);
      p.passed.push("review:lapsed");
    }
    if (feedback.correct) {
      if (!p.passed.includes(key)) p.passed.push(key);
      if (
        topic.retrievalProblems.every((x) =>
          p.passed.includes(`review:${x.id}`),
        )
      ) {
        const clean = topic.retrievalProblems.every(
          (x) => p.attempts[`review:${x.id}`] === 1,
        );
        if (scheduledSession && !p.passed.includes("review:lapsed"))
          p.schedule = scheduleReview(p.schedule, clean ? 5 : 3, now);
        p.passed = p.passed.filter((x) => !x.startsWith("review:"));
        for (const x of topic.retrievalProblems)
          delete p.attempts[`review:${x.id}`];
      }
    }
  } else if (
    !p.mastered &&
    topic.retrievalProblems.length > 0 &&
    topic.retrievalProblems.every((x) => p.passed.includes(x.id))
  ) {
    p.stage = "complete";
    p.mastered = true;
    p.schedule = scheduleReview(
      null,
      topic.retrievalProblems.every((x) => p.attempts[x.id] === 1) ? 5 : 3,
      now,
    );
  }
  return { state, feedback };
}
