"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Check,
  Clock,
  Compass,
  Layers,
  Lightbulb,
  Menu,
  Orbit,
  RotateCcw,
  Save,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { initialProgress, reviewQueue } from "@/lib/curriculum-engine";
import type {
  CurriculumPack,
  CurriculumTopic,
  Feedback,
  LearnerState,
  LearningAction,
  Problem,
  Submission,
} from "@/types/curriculum";
import { MathText, FormulaCopies, InlineMathText } from "./MathText";
import { Diagram } from "./Diagram";
import FadedExercise, { ProblemInput } from "./FadedExercise";
import ExtraPractice from "./ExtraPractice";
import MathematicsExplorer from "./MathematicsExplorer";
import LessonContent from "./LessonContent";
import { applyBrowserAction, readBrowserState } from "@/lib/browser-store";
const empty: LearnerState = { topics: {}, scratchpads: {} };
type Screen = "overview" | "lesson" | "review";
type ReviewItem = { topicId: string; problem: Problem };
const sections = [
  ["story", "The big idea"],
  ["reasoning", "Build the reasoning"],
  ["example", "See it in action"],
  ["takeaway", "Bring it together"],
] as const;
function Reflection({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="reflection">
      <summary>
        <Lightbulb size={18} />
        <span>
          <InlineMathText>{question}</InlineMathText>
          <small>Think it through, then compare your reasoning</small>
        </span>
      </summary>
      <MathText>{answer}</MathText>
    </details>
  );
}
function topicOutcomes(t: CurriculumTopic) {
  return (
    t.teaching?.outcomes ?? [
      t.description,
      "Apply the method in a worked example.",
      "Check your understanding with an independent problem.",
    ]
  );
}
function LessonCompletion({
  read,
  busy,
  ready,
  onToggle,
  nextTitle,
  hasNext,
  onNext,
}: {
  read: boolean;
  busy: boolean;
  ready: boolean;
  onToggle: () => void;
  nextTitle: string;
  hasNext: boolean;
  onNext: () => void;
}) {
  return (
    <>
      <div className="reading-complete">
        <button
          className={read ? "secondary" : "primary"}
          disabled={busy || !ready}
          onClick={onToggle}
        >
          {read ? <Check size={17} /> : <BookOpen size={17} />}{" "}
          {read ? "Marked as read" : "Mark lesson as read"}
        </button>
        <p>Reading progress is separate from knowledge checks.</p>
      </div>
      <div className="next-lesson">
        <span>{hasNext ? "UP NEXT" : "BACK TO THE BIG PICTURE"}</span>
        <h3>{nextTitle}</h3>
        <button className="text-button" onClick={onNext}>
          {hasNext
            ? "Continue to the next lesson"
            : "Revisit your learning path"}
          <ArrowRight size={16} />
        </button>
      </div>
    </>
  );
}
export default function TeachingWorkspace({
  packs,
  staticMode = false,
}: {
  packs: CurriculumPack[];
  staticMode?: boolean;
}) {
  const [packId, setPackId] = useState(packs[0].id),
    [topicId, setTopicId] = useState(packs[0].topics[0].id),
    [screen, setScreen] = useState<Screen>("overview"),
    [state, setState] = useState<LearnerState>(empty),
    [ready, setReady] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [mobile, setMobile] = useState(false),
    [practiceOpen, setPracticeOpen] = useState(true),
    [practiceTab, setPracticeTab] = useState<
      "warmup" | "guided" | "check" | "extra"
    >("warmup"),
    [drafts, setDrafts] = useState<Record<string, string>>({}),
    [queue, setQueue] = useState<ReviewItem[]>([]),
    [reviewIndex, setReviewIndex] = useState(0),
    [reviewFeedback, setReviewFeedback] = useState<Feedback>();
  const lock = useRef(false),
    pack = packs.find((p) => p.id === packId)!,
    topic = pack.topics.find((t) => t.id === topicId)!,
    progress = state.topics[topicId] ?? initialProgress(),
    next = pack.topics[pack.topics.indexOf(topic) + 1],
    due = reviewQueue(pack, state),
    checked = pack.topics.filter((t) => state.topics[t.id]?.mastered).length,
    read = pack.topics.filter((t) => state.topics[t.id]?.read).length;
  const noteKey = `${packId}:${topicId}`,
    scratch = drafts[noteKey] ?? state.scratchpads[topicId] ?? "",
    noteSaved = scratch === (state.scratchpads[topicId] ?? ""),
    lessonNavigation =
      topic.content?.sections.map((section) => ({
        id: section.id,
        label: section.navLabel ?? section.title,
      })) ?? sections.map(([id, label]) => ({ id, label }));
  useEffect(() => {
    if (staticMode) {
      setState(readBrowserState(pack));
      setReady(true);
      return;
    }
    const c = new AbortController();
    setReady(false);
    setError("");
    fetch(`/api/progress?pack=${encodeURIComponent(packId)}`, {
      signal: c.signal,
    })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error);
        setState(data.state);
        setReady(true);
      })
      .catch((e) => {
        if (e.name !== "AbortError")
          setError(
            "Your saved notebook could not load. You can still read every lesson. Reload to reconnect.",
          );
      });
    return () => c.abort();
  }, [pack, packId, staticMode]);
  const act = useCallback(
    async (action: LearningAction): Promise<Feedback | undefined> => {
      if (lock.current || !ready) return;
      lock.current = true;
      setBusy(true);
      setError("");
      try {
        if (staticMode) {
          const result = applyBrowserAction(pack, action);
          setState(result.state);
          return (
            result.feedback ?? {
              correct: true,
              category: null,
              message: "Saved",
            }
          );
        }
        const r = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ packId, action }),
        });
        const data = await r.json();
        if (!r.ok) throw new Error(data.error ?? "Could not save");
        setState(data.state);
        return (
          data.feedback ?? { correct: true, category: null, message: "Saved" }
        );
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Could not save. Please try again.",
        );
      } finally {
        lock.current = false;
        setBusy(false);
      }
    },
    [pack, packId, ready, staticMode],
  );
  function selectTopic(id: string) {
    setTopicId(id);
    setScreen("lesson");
    setPracticeTab("warmup");
    setMobile(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function startReview() {
    const mixed = Array.from(
      {
        length: Math.max(...pack.topics.map((t) => t.retrievalProblems.length)),
      },
      (_, i) =>
        pack.topics.flatMap((t) =>
          t.retrievalProblems[i]
            ? [{ topicId: t.id, problem: t.retrievalProblems[i] }]
            : [],
        ),
    ).flat();
    setQueue(due.length ? due : mixed);
    setReviewIndex(0);
    setReviewFeedback(undefined);
    setScreen("review");
    setMobile(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  useEffect(() => {
    function key(e: KeyboardEvent) {
      if (
        screen !== "lesson" ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        (e.target as HTMLElement).closest(
          "input,textarea,select,button,[contenteditable=true]",
        )
      )
        return;
      const k = e.key.toLowerCase();
      if (!["j", "k"].includes(k)) return;
      e.preventDefault();
      const nodes = lessonNavigation
        .map(({ id }) => document.getElementById(id))
        .filter((node): node is HTMLElement => Boolean(node));
      if (!nodes.length) return;
      const current = Math.max(
        0,
        nodes.findLastIndex((n) => n.getBoundingClientRect().top < 180),
      );
      nodes[
        Math.max(0, Math.min(nodes.length - 1, current + (k === "j" ? 1 : -1)))
      ].scrollIntoView({ behavior: "instant" });
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [lessonNavigation, screen]);
  useEffect(() => {
    const ctx = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: unknown,
            options: { signal: AbortSignal },
          ) => unknown;
        };
      }
    ).modelContext;
    if (!ctx) return;
    const c = new AbortController();
    try {
      Promise.resolve(
        ctx.registerTool(
          {
            name: "read_learning_progress",
            description:
              "Read the visible course and separate reading and knowledge-check progress.",
            inputSchema: {
              type: "object",
              properties: {},
              additionalProperties: false,
            },
            annotations: { readOnlyHint: true },
            execute: (input: unknown) => {
              if (
                !input ||
                typeof input !== "object" ||
                Array.isArray(input) ||
                Object.keys(input).length
              )
                throw new Error("Expected an empty object");
              return {
                curriculum: packId,
                topic: topicId,
                screen,
                read,
                checked,
                due: due.length,
                lessonsUnlocked: true,
              };
            },
          },
          { signal: c.signal },
        ),
      ).catch(() => {});
    } catch {}
    return () => c.abort();
  }, [packId, topicId, screen, read, checked, due.length]);
  async function submit(problemId: string, submission: Submission) {
    return act({ type: "answer", topicId, problemId, submission });
  }
  const overview = pack.overview,
    suggested =
      pack.topics.find(
        (t) => !state.topics[t.id]?.read && !state.topics[t.id]?.mastered,
      ) ?? pack.topics[0];
  return (
    <div className="learning-app">
      <a className="skip-link" href="#main-content">
        Skip to lesson content
      </a>
      <header className="app-header">
        <button
          className="brand"
          onClick={() => setScreen("overview")}
          aria-label="Apsis course overview"
        >
          <Orbit size={28} />
          <span>
            apsis<span className="brand-period">.</span>
          </span>
        </button>
        <div className="course-selector">
          <label htmlFor="curriculum">Your course</label>
          <select
            id="curriculum"
            value={packId}
            disabled={busy}
            onChange={(e) => {
              const p = packs.find((p) => p.id === e.target.value)!;
              setPackId(p.id);
              setTopicId(p.topics[0].id);
              setState(empty);
              setScreen("overview");
              setReady(false);
              setMobile(false);
            }}
          >
            {packs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
        <div className="header-note">
          <BookOpen size={16} />
          Learn at your own pace
        </div>
        <button
          className="mobile-menu icon-button"
          onClick={() => setMobile(!mobile)}
          aria-label={mobile ? "Close contents" : "Open contents"}
        >
          {mobile ? <X /> : <Menu />}
        </button>
      </header>
      <aside className={`course-sidebar ${mobile ? "open" : ""}`}>
        <button
          className={`side-link ${screen === "overview" ? "active" : ""}`}
          onClick={() => {
            setScreen("overview");
            setMobile(false);
          }}
        >
          <Compass size={18} />
          Course overview
        </button>
        <div className="nav-label">YOUR LEARNING PATH</div>
        <nav aria-label="Lessons">
          {pack.topics.map((t, i) => (
            <div key={t.id}>
              {(i === 0 || pack.topics[i - 1].unit !== t.unit) && (
                <div className="unit-label">{t.unit}</div>
              )}
              <button
                disabled={busy}
                className={`lesson-link ${screen === "lesson" && topicId === t.id ? "active" : ""}`}
                onClick={() => selectTopic(t.id)}
              >
                <span className="lesson-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{t.title}</span>
                {state.topics[t.id]?.mastered ? (
                  <Check className="status-check" size={16} />
                ) : state.topics[t.id]?.read ? (
                  <BookOpen size={15} />
                ) : null}
              </button>
            </div>
          ))}
        </nav>
        <button
          className={`side-link review-link ${screen === "review" ? "active" : ""}`}
          onClick={startReview}
        >
          <RotateCcw size={17} />
          Mixed practice
          {due.length > 0 && <span className="due-count">{due.length}</span>}
        </button>
        <div className="sidebar-progress">
          <h4>Your progress</h4>
          <div>
            <span>Lessons read</span>
            <strong>
              {read} / {pack.topics.length}
            </strong>
          </div>
          <progress
            max={pack.topics.length}
            value={read}
            aria-label="Lessons read"
          />
          <div>
            <span>Knowledge checked</span>
            <strong>
              {checked} / {pack.topics.length}
            </strong>
          </div>
          <p>
            Read anything. Use questions when you want to check your
            understanding.
          </p>
        </div>
      </aside>
      <main id="main-content" className="course-main">
        {error && (
          <div className="error-banner" role="alert">
            {error}
          </div>
        )}
        {screen === "overview" ? (
          <div className="overview-page">
            <div className="overview-intro">
              <div className="eyebrow">
                <Compass size={15} /> YOUR COURSE, AT A GLANCE
              </div>
              <h1>
                {overview?.headline ??
                  `Build confidence in ${pack.title.toLowerCase()}.`}
              </h1>
              <p className="lead">
                {overview?.introduction ?? pack.description}
              </p>
              <div className="course-facts">
                <span>
                  <Layers size={16} />
                  {pack.topics.length}{" "}
                  {pack.topics.length === 1 ? "lesson" : "lessons"}
                </span>
                <span>
                  <Clock size={16} />
                  {pack.topics.reduce((n, t) => n + t.minutes, 0) < 60
                    ? `${pack.topics.reduce((n, t) => n + t.minutes, 0)} minutes`
                    : `${Math.round(pack.topics.reduce((n, t) => n + t.minutes, 0) / 6) / 10} hours`}{" "}
                  of guided study
                </span>
                <span>
                  <BookOpen size={16} />
                  All lessons open
                </span>
              </div>
              {pack.topics.some((t) => t.practical) && (
                <p className="muted">
                  Practical work is additional:{" "}
                  {pack.topics.filter((t) => t.practical).length} labs and
                  projects, approximately{" "}
                  {Math.round(
                    pack.topics.reduce(
                      (sum, t) => sum + (t.practical?.minutes ?? 0),
                      0,
                    ) / 6,
                  ) / 10}{" "}
                  hours. Live setup and independent investigation may take
                  longer.
                </p>
              )}
              <button
                className="primary"
                onClick={() => selectTopic(suggested.id)}
              >
                {read || checked
                  ? "Continue learning"
                  : "Start with the first idea"}
                <ArrowRight size={17} />
              </button>
            </div>
            <section className="outcomes-section">
              <div className="section-heading">
                <div>
                  <div className="eyebrow">THE DESTINATION</div>
                  <h2>What you’ll be able to do</h2>
                </div>
                <span>Ideas you can put to work</span>
              </div>
              <div className="outcome-grid">
                {(
                  overview?.outcomes ?? [
                    {
                      title: "Understand the quantities",
                      description: pack.description,
                    },
                    {
                      title: "Solve and check a problem",
                      description:
                        "Choose a relation, calculate with units, and explain why your result makes sense.",
                    },
                  ]
                ).map((o, i) => (
                  <article key={o.title} className="outcome-card">
                    <span className="outcome-index">0{i + 1}</span>
                    <h3>{o.title}</h3>
                    <p>{o.description}</p>
                  </article>
                ))}
              </div>
            </section>
            {overview?.throughlines && (
              <section className="throughlines-section">
                <div className="section-heading">
                  <div>
                    <div className="eyebrow">THE IDEAS THAT KEEP RETURNING</div>
                    <h2>Build depth through repetition</h2>
                  </div>
                  <span>Follow a thread across the course</span>
                </div>
                <div className="throughline-grid">
                  {overview.throughlines.map((thread) => (
                    <article className="throughline-card" key={thread.title}>
                      <h3>{thread.title}</h3>
                      <p>{thread.description}</p>
                      <div className="throughline-links">
                        {thread.topicIds.map((id) => {
                          const target = pack.topics.find((t) => t.id === id);
                          return target ? (
                            <button
                              className="text-button"
                              key={id}
                              onClick={() => selectTopic(id)}
                            >
                              {target.title}
                              <ArrowRight size={14} />
                            </button>
                          ) : null;
                        })}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
            <div className="overview-bottom">
              <section>
                <div className="eyebrow">ONE IDEA BUILDS ON ANOTHER</div>
                <h2>Your route through the course</h2>
                <p className="muted">
                  Follow the order, or jump to the question that interests you.
                </p>
                <div className="learning-path">
                  {pack.topics.map((t, i) => (
                    <button
                      className="path-stop"
                      key={t.id}
                      onClick={() => selectTopic(t.id)}
                    >
                      <span className="path-number">{i + 1}</span>
                      <span className="path-copy">
                        <small>{t.unit}</small>
                        <strong>{t.title}</strong>
                        <span>{t.teaching?.outcomes[0] ?? t.description}</span>
                        <em>
                          {t.minutes} min ·{" "}
                          {state.topics[t.id]?.mastered
                            ? "Knowledge checked"
                            : state.topics[t.id]?.read
                              ? "Read"
                              : "Ready to explore"}
                        </em>
                      </span>
                      <ArrowRight size={18} />
                    </button>
                  ))}
                </div>
              </section>
              <aside className="course-guidance">
                <div className="starting-point">
                  <div className="eyebrow">BEFORE YOU START</div>
                  <h3>A little preparation helps</h3>
                  <p>
                    {overview?.startingPoint ??
                      "Start with basic arithmetic. The lessons introduce the remaining ideas as you need them."}
                  </p>
                </div>
                <div className="capstone-card">
                  <Target size={25} />
                  <div className="eyebrow">PUT IT ALL TOGETHER</div>
                  <h3>
                    {overview?.capstone.title ??
                      "Explain a solution from beginning to end"}
                  </h3>
                  <p>
                    {overview?.capstone.description ??
                      "Choose a problem, explain your method, and check that the result makes sense."}
                  </p>
                  <button
                    className="text-button"
                    onClick={() => selectTopic(pack.topics.at(-1)!.id)}
                  >
                    Explore the final lesson
                    <ArrowRight size={15} />
                  </button>
                </div>
                <div className="learning-tip">
                  <Lightbulb size={20} />
                  <p>
                    Try explaining an idea in your own words before calculating.
                    If the explanation feels shaky, revisit the physical story.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        ) : screen === "lesson" ? (
          <>
            <div className="lesson-top">
              <button
                className="text-button"
                onClick={() => setScreen("overview")}
              >
                <ArrowLeft size={15} />
                Back to the learning path
              </button>
              <div className="lesson-meta">
                LESSON {String(pack.topics.indexOf(topic) + 1).padStart(2, "0")}
                <span>·</span>
                {topic.minutes} MIN
              </div>
              <h1>{topic.teaching?.question ?? topic.title}</h1>
              <p className="lead">{topic.teaching?.why ?? topic.description}</p>
              <div className="lesson-tools">
                <span>
                  <BookOpen size={16} />
                  The full lesson is open. Questions are optional.
                </span>
                <button
                  className="secondary"
                  onClick={() => setPracticeOpen(!practiceOpen)}
                >
                  {practiceOpen ? "Focus on reading" : "Show practice"}
                  {practiceOpen ? <X size={15} /> : <Sparkles size={15} />}
                </button>
              </div>
            </div>
            <nav className="lesson-jumps" aria-label="Within this lesson">
              {lessonNavigation.map(({ id, label }, i) => (
                <a key={id} href={`#${id}`}>
                  <span>{i + 1}</span>
                  {label}
                </a>
              ))}
            </nav>
            <div
              className={`teaching-layout ${practiceOpen ? "" : "reading-only"}`}
            >
              <article className="lesson-reading" key={topicId}>
                {topic.content ? (
                  <>
                    <LessonContent content={topic.content} />
                    {pack.id === "mathematics-for-physics" && (
                      <MathematicsExplorer topicId={topic.id} />
                    )}
                    {topic.theoreticalMinimum && (
                      <section
                        className="theoretical-minimum"
                        aria-labelledby="theoretical-minimum-heading"
                      >
                        <h2 id="theoretical-minimum-heading">
                          Theoretical minimum
                        </h2>
                        <MathText>{topic.theoreticalMinimum.coreIdea}</MathText>
                        <MathText>
                          {topic.theoreticalMinimum.widerConnection}
                        </MathText>
                      </section>
                    )}
                    <LessonCompletion
                      read={Boolean(progress.read)}
                      busy={busy}
                      ready={ready}
                      onToggle={() =>
                        act({ type: "read", topicId, read: !progress.read })
                      }
                      nextTitle={next?.title ?? pack.title}
                      hasNext={Boolean(next)}
                      onNext={() =>
                        next ? selectTopic(next.id) : setScreen("overview")
                      }
                    />
                  </>
                ) : (
                  <>
                    <section id="story" className="lesson-section">
                      <div className="section-kicker">
                        01 / START WITH A PICTURE IN YOUR HEAD
                      </div>
                      <h2>The big idea</h2>
                      <MathText>{topic.intuition.body}</MathText>
                      <div className="lesson-outcomes">
                        <h3>By the end of this lesson, you can…</h3>
                        <ul>
                          {topicOutcomes(topic).map((o) => (
                            <li key={o}>
                              <Check size={16} />
                              <span>{o}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pause-card">
                        <div className="eyebrow">
                          <Lightbulb size={16} />
                          PAUSE & PREDICT
                        </div>
                        {topic.intuition.thoughtExperiments.map((q) => (
                          <p key={q}>
                            <InlineMathText>{q}</InlineMathText>
                          </p>
                        ))}
                        <small>
                          No answer box required. Say it aloud or jot down your
                          prediction.
                        </small>
                      </div>
                    </section>
                    <section id="reasoning" className="lesson-section">
                      <div className="section-kicker">
                        02 / LET’S MAKE THAT IDEA PRECISE
                      </div>
                      <h2>Build the reasoning</h2>
                      <Diagram data={topic.diagram} />
                      {topic.theory.map((s, i) => {
                        const checkpoint = topic.teaching?.checkpoints[i];
                        return (
                          <section className="reasoning-step" key={s.heading}>
                            <h3>{s.heading}</h3>
                            {checkpoint && (
                              <p className="teaching-bridge">
                                <InlineMathText>
                                  {checkpoint.bridge}
                                </InlineMathText>
                              </p>
                            )}
                            <div className="formal-theory">
                              <MathText>{s.body}</MathText>
                              <FormulaCopies text={s.body} />
                            </div>
                            {checkpoint && (
                              <>
                                <div className="meaning">
                                  <h4>What this is really saying</h4>
                                  <p>
                                    <InlineMathText>
                                      {checkpoint.meaning}
                                    </InlineMathText>
                                  </p>
                                </div>
                                <Reflection
                                  question={checkpoint.question}
                                  answer={checkpoint.answer}
                                />
                                {checkpoint.further?.map((r) => (
                                  <Reflection
                                    key={r.question}
                                    question={r.question}
                                    answer={r.answer}
                                  />
                                ))}
                              </>
                            )}
                          </section>
                        );
                      })}
                      {pack.id === "mathematics-for-physics" && (
                        <MathematicsExplorer topicId={topic.id} />
                      )}
                      <div className="deeper-heading">
                        Curious about the details?
                      </div>
                      {topic.sidebars.map((s) => (
                        <details className="deep-dive" key={s.heading}>
                          <summary>{s.heading}</summary>
                          <MathText>{s.body}</MathText>
                        </details>
                      ))}
                    </section>
                    <section id="example" className="lesson-section">
                      <div className="section-kicker">
                        03 / WATCH THE METHOD AT WORK
                      </div>
                      <h2>{topic.workedExample.title}</h2>
                      <div className="example-brief">
                        <MathText>{topic.workedExample.problem}</MathText>
                      </div>
                      {topic.workedExample.steps.map((s, i) => (
                        <section className="worked-step" key={s.title}>
                          <span className="step-index">{i + 1}</span>
                          <div>
                            <h3>{s.title}</h3>
                            <div className="reason">
                              <strong>Why this step?</strong>
                              <MathText>{s.reason}</MathText>
                            </div>
                            <MathText>{s.body}</MathText>
                            <div className="trap">
                              <strong>A common wrong turn</strong>
                              <MathText>{s.trap}</MathText>
                            </div>
                          </div>
                        </section>
                      ))}
                      <button
                        className="secondary"
                        onClick={() => {
                          setPracticeOpen(true);
                          setPracticeTab("guided");
                          requestAnimationFrame(() =>
                            document
                              .getElementById("practice-panel")
                              ?.scrollIntoView({ block: "start" }),
                          );
                        }}
                      >
                        Try a similar problem with support
                        <ArrowRight size={16} />
                      </button>
                    </section>
                    <section id="takeaway" className="lesson-section">
                      {topic.practical && (
                        <div className="practical-lab">
                          <div className="section-kicker">
                            PUT IT TO WORK · {topic.practical.minutes} MIN ·
                            OPTIONAL LAB
                          </div>
                          <h2>{topic.practical.title}</h2>
                          <MathText>{topic.practical.brief}</MathText>
                          <ol>
                            {topic.practical.steps.map((step) => (
                              <li key={step}>
                                <MathText>{step}</MathText>
                              </li>
                            ))}
                          </ol>
                          <h3>What to produce</h3>
                          <ul>
                            {topic.practical.deliverables.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                          <details className="deep-dive">
                            <summary>Compare with the review guide</summary>
                            <MathText>{topic.practical.review}</MathText>
                          </details>
                          <p className="muted">
                            Use your notebook below to keep your reasoning. Labs
                            are self-reviewed and do not affect knowledge-check
                            scores.
                          </p>
                        </div>
                      )}
                      <div className="section-kicker">
                        04 / THE IDEA TO TAKE WITH YOU
                      </div>
                      <h2>Bring it together</h2>
                      <p className="takeaway">
                        {topic.teaching?.takeaway ?? topic.description}
                      </p>
                      <p>
                        {topic.teaching?.nextConnection ??
                          "Try explaining the worked example without looking at its solution, then test the method on a new problem."}
                      </p>
                      {topic.theoreticalMinimum && (
                        <section
                          className="theoretical-minimum"
                          aria-labelledby="theoretical-minimum-heading"
                        >
                          <h2 id="theoretical-minimum-heading">
                            Theoretical minimum
                          </h2>
                          <MathText>
                            {topic.theoreticalMinimum.coreIdea}
                          </MathText>
                          <MathText>
                            {topic.theoreticalMinimum.widerConnection}
                          </MathText>
                        </section>
                      )}
                      <LessonCompletion
                        read={Boolean(progress.read)}
                        busy={busy}
                        ready={ready}
                        onToggle={() =>
                          act({ type: "read", topicId, read: !progress.read })
                        }
                        nextTitle={next?.title ?? pack.title}
                        hasNext={Boolean(next)}
                        onNext={() =>
                          next ? selectTopic(next.id) : setScreen("overview")
                        }
                      />
                    </section>
                  </>
                )}
                <footer className="lesson-references">
                  <details>
                    <summary>Assumptions, units & sources</summary>
                    <p>{pack.conventions}</p>
                    {topic.sources.map((s) => (
                      <a
                        key={s.url}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {s.title} ↗
                      </a>
                    ))}
                  </details>
                </footer>
              </article>
              {practiceOpen && (
                <aside id="practice-panel" className="practice-panel">
                  <div className="practice-panel-top">
                    <div className="eyebrow">
                      <Sparkles size={15} />
                      TRY IT, WHEN YOU’RE READY
                    </div>
                    <h2>A place to think</h2>
                    <p>
                      These questions test your understanding. They never hold
                      up the lesson.
                    </p>
                  </div>
                  <nav className="practice-tabs" aria-label="Practice type">
                    {(
                      [
                        ["warmup", "Warm-up"],
                        ["guided", "With support"],
                        ["check", "Self-check"],
                        ["extra", "Fresh question"],
                      ] as const
                    ).map(([key, label]) => (
                      <button
                        key={key}
                        aria-pressed={practiceTab === key}
                        onClick={() => setPracticeTab(key)}
                      >
                        {label}
                      </button>
                    ))}
                  </nav>
                  <div
                    className="practice-body"
                    key={`${topicId}:${practiceTab}`}
                  >
                    {practiceTab === "warmup" ? (
                      <>
                        <h3>Recall the building blocks</h3>
                        <p className="muted">
                          A quick check of ideas this lesson uses. Skip these
                          freely.
                        </p>
                        {topic.diagnostics.map((p) => (
                          <div key={p.id}>
                            <ProblemInput
                              problem={p}
                              passed={progress.passed.includes(p.id)}
                              disabled={busy || !ready}
                              onSubmit={(s) => submit(p.id, s)}
                            />
                            {p.prerequisiteId && (
                              <button
                                className="text-button prerequisite-link"
                                onClick={() => selectTopic(p.prerequisiteId!)}
                              >
                                Revisit{" "}
                                {
                                  pack.topics.find(
                                    (t) => t.id === p.prerequisiteId,
                                  )?.title
                                }
                                <ArrowRight size={13} />
                              </button>
                            )}
                          </div>
                        ))}
                      </>
                    ) : practiceTab === "guided" ? (
                      <>
                        <h3>Keep a little scaffolding</h3>
                        <p className="muted">
                          The setup is supplied. Try any step; the others stay
                          visible.
                        </p>
                        <FadedExercise
                          exercise={topic.fadedExercise}
                          passed={progress.passed}
                          disabled={busy || !ready}
                          onSubmit={submit}
                        />
                      </>
                    ) : practiceTab === "check" ? (
                      <>
                        <h3>Can you use the idea yourself?</h3>
                        <p className="muted">
                          Try these without the worked solution. Passing the set
                          records a knowledge check and schedules a later
                          review.
                        </p>
                        {topic.retrievalProblems.map((p) => (
                          <ProblemInput
                            key={p.id}
                            problem={p}
                            allowHint={false}
                            passed={progress.passed.includes(p.id)}
                            disabled={busy || !ready}
                            onSubmit={(s) => submit(p.id, s)}
                          />
                        ))}
                        {progress.mastered && (
                          <div className="knowledge-complete">
                            <Check size={18} />
                            Knowledge checked. Next review:{" "}
                            {new Date(
                              progress.schedule!.due,
                            ).toLocaleDateString()}
                            .
                          </div>
                        )}
                      </>
                    ) : topic.transferProblems?.length ? (
                      <>
                        <h3>Transfer across the spine</h3>
                        <p className="muted">
                          Recognise the same structure in a different
                          mathematical setting. These questions are practice,
                          not a mastery gate.
                        </p>
                        {topic.transferProblems.map((p) => (
                          <ProblemInput
                            key={p.id}
                            problem={p}
                            allowHint={false}
                            passed={progress.passed.includes(p.id)}
                            disabled={busy || !ready}
                            onSubmit={(s) => submit(p.id, s)}
                          />
                        ))}
                      </>
                    ) : topic.practiceTemplates?.length ? (
                      <ExtraPractice
                        packId={packId}
                        topicId={topicId}
                        pack={pack}
                        staticMode={staticMode}
                        enabled={ready && !busy}
                      />
                    ) : (
                      <div className="extra-practice">
                        <h3>Take the idea to a new case</h3>
                        <p>
                          This lesson uses authored reasoning questions. Try the
                          supported question or apply the idea to a situation of
                          your own.
                        </p>
                        <button
                          className="secondary"
                          onClick={() => setPracticeTab("guided")}
                        >
                          Try the supported question
                        </button>
                        <p className="muted">
                          Fresh numerical variations appear in lessons with
                          calculation practice.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="scratchpad">
                    <label htmlFor="scratch">
                      Your thinking space
                      <span>Predictions, working, questions to revisit</span>
                    </label>
                    <textarea
                      id="scratch"
                      value={scratch}
                      maxLength={20000}
                      onChange={(e) =>
                        setDrafts({ ...drafts, [noteKey]: e.target.value })
                      }
                      placeholder="I think this happens because…"
                    />
                    <div className="scratch-footer">
                      <span>{noteSaved ? "Notes saved" : "Unsaved notes"}</span>
                      <button
                        className="text-button"
                        disabled={busy || !ready || noteSaved}
                        onClick={() =>
                          act({ type: "scratchpad", topicId, text: scratch })
                        }
                      >
                        <Save size={14} />
                        Save notes
                      </button>
                    </div>
                  </div>
                </aside>
              )}
            </div>
          </>
        ) : (
          <div className="review-page">
            <div className="eyebrow">
              RECOGNIZE THE SITUATION, THEN CHOOSE A METHOD
            </div>
            <h1>Mix the ideas together.</h1>
            <p className="lead">
              A problem won’t always tell you which lesson it belongs to.
              Practice choosing the model yourself. Skip any question, or return
              to its lesson.
            </p>
            <div className="review-grid">
              <section className="review-question">
                {reviewIndex >= queue.length ? (
                  <>
                    <Check className="large-check" />
                    <h2>That’s the end of this set.</h2>
                    <p>
                      Your submitted answers are saved. Skipped questions don’t
                      change your mastery.
                    </p>
                    <button
                      className="primary"
                      onClick={() => setScreen("overview")}
                    >
                      Return to the course
                      <ArrowRight size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="eyebrow">
                      QUESTION {reviewIndex + 1} OF {queue.length}
                    </div>
                    <ProblemInput
                      key={reviewIndex}
                      problem={queue[reviewIndex].problem}
                      allowHint={false}
                      disabled={busy || !ready || reviewFeedback?.correct}
                      onSubmit={async (submission) => {
                        const item = queue[reviewIndex];
                        const feedback = await act({
                          type: "answer",
                          topicId: item.topicId,
                          problemId: item.problem.id,
                          submission,
                          review: !!state.topics[item.topicId]?.mastered,
                        });
                        setReviewFeedback(feedback);
                        return feedback;
                      }}
                    />
                    <div className="review-actions">
                      <button
                        className="primary"
                        disabled={busy}
                        onClick={() => {
                          setReviewIndex(reviewIndex + 1);
                          setReviewFeedback(undefined);
                        }}
                      >
                        {reviewFeedback?.correct
                          ? "Next question"
                          : "Skip for now"}
                        <ArrowRight size={15} />
                      </button>
                      <button
                        className="text-button"
                        disabled={busy}
                        onClick={() => selectTopic(queue[reviewIndex].topicId)}
                      >
                        Revisit the lesson
                        <BookOpen size={15} />
                      </button>
                    </div>
                  </>
                )}
              </section>
              <aside className="review-explanation">
                <h3>Learning, not gatekeeping</h3>
                <p>
                  Reading a lesson and recalling it later are different
                  achievements. Only submitted answers affect knowledge checks.
                </p>
                <p>
                  {due.length
                    ? "This set prioritizes questions due for spaced review."
                    : "No reviews are due. This is a mixed set from across the course."}
                </p>
                <div className="review-totals">
                  <strong>
                    {checked}
                    <span>lessons checked</span>
                  </strong>
                  <strong>
                    {read}
                    <span>lessons read</span>
                  </strong>
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
