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
  Feedback,
  LearnerState,
  LearningAction,
  Problem,
  Submission,
} from "@/types/curriculum";
import { MathText } from "./MathText";
import FadedExercise, { ProblemInput } from "./FadedExercise";
import ExtraPractice from "./ExtraPractice";
import LessonContent from "@/prefabs/Renderer";
import { applyBrowserAction, readBrowserState } from "@/lib/browser-store";
const empty: LearnerState = { topics: {}, scratchpads: {} };
type Screen = "overview" | "lesson" | "review";
type ReviewItem = { topicId: string; problem: Problem };
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
  const hasPractice = Boolean(
    topic.diagnostics.length ||
    topic.fadedExercise.steps.length ||
    topic.retrievalProblems.length ||
    topic.transferProblems?.length ||
    topic.practiceTemplates?.length,
  );
  const showPractice = practiceOpen;
  const labs = pack.topics
    .flatMap((t) => t.content.sections.flatMap((s) => s.blocks))
    .filter((b) => b.kind === "lab");
  const noteKey = `${packId}:${topicId}`,
    scratch = drafts[noteKey] ?? state.scratchpads[topicId] ?? "",
    noteSaved = scratch === (state.scratchpads[topicId] ?? ""),
    lessonNavigation = topic.content.sections.map((section) => ({
      id: section.id,
      label: section.navLabel ?? section.title,
    }));
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
                {pack.topics.every((t) => t.minutes !== undefined) && (
                  <span>
                    <Clock size={16} />
                    {pack.topics.reduce((n, t) => n + (t.minutes ?? 0), 0) < 60
                      ? `${pack.topics.reduce((n, t) => n + (t.minutes ?? 0), 0)} minutes`
                      : `${Math.round(pack.topics.reduce((n, t) => n + (t.minutes ?? 0), 0) / 6) / 10} hours`}{" "}
                    of estimated study
                  </span>
                )}
                <span>
                  <BookOpen size={16} />
                  All lessons open
                </span>
              </div>
              {labs.length > 0 && (
                <p className="muted">
                  Practical work is additional: {labs.length} labs and projects,
                  approximately{" "}
                  {Math.round(
                    labs.reduce((sum, lab) => sum + lab.data.minutes, 0) / 6,
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
            {Boolean(overview?.outcomes?.length) && (
              <section className="outcomes-section">
                <div className="section-heading">
                  <div>
                    <div className="eyebrow">THE DESTINATION</div>
                    <h2>What you’ll be able to do</h2>
                  </div>
                  <span>Ideas you can put to work</span>
                </div>
                <div className="outcome-grid">
                  {(overview?.outcomes ?? []).map((o, i) => (
                    <article key={o.title} className="outcome-card">
                      <span className="outcome-index">0{i + 1}</span>
                      <h3>{o.title}</h3>
                      <p>{o.description}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}
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
                        <span>{t.outcomes[0] ?? t.description}</span>
                        <em>
                          {t.minutes && `${t.minutes} min · `}
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
                {overview?.startingPoint && (
                  <div className="starting-point">
                    <div className="eyebrow">BEFORE YOU START</div>
                    <h3>A little preparation helps</h3>
                    <p>{overview.startingPoint}</p>
                  </div>
                )}
                {overview?.capstone && (
                  <div className="capstone-card">
                    <Target size={25} />
                    <div className="eyebrow">PUT IT ALL TOGETHER</div>
                    <h3>{overview.capstone.title}</h3>
                    <p>{overview.capstone.description}</p>
                    <button
                      className="text-button"
                      onClick={() => selectTopic(pack.topics.at(-1)!.id)}
                    >
                      Explore the final lesson
                      <ArrowRight size={15} />
                    </button>
                  </div>
                )}
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
                {topic.minutes && (
                  <>
                    <span>·</span>
                    {topic.minutes} MIN
                  </>
                )}
              </div>
              <h1>{topic.heading ?? topic.title}</h1>
              <p className="lead">{topic.lead ?? topic.description}</p>
              <div className="lesson-tools">
                <span>
                  <BookOpen size={16} />
                  The full lesson is open. Questions are optional.
                </span>
                <button
                  className="secondary"
                  onClick={() => setPracticeOpen(!practiceOpen)}
                >
                  {practiceOpen
                    ? "Focus on reading"
                    : hasPractice
                      ? "Show practice"
                      : "Show notes"}
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
              className={`teaching-layout ${showPractice ? "" : "reading-only"}`}
            >
              <article className="lesson-reading" key={topicId}>
                <LessonContent content={topic.content} />
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
              {showPractice && (
                <aside id="practice-panel" className="practice-panel">
                  {hasPractice && (
                    <>
                      <div className="practice-panel-top">
                        <div className="eyebrow">
                          <Sparkles size={15} />
                          TRY IT, WHEN YOU’RE READY
                        </div>
                        <h2>A place to think</h2>
                        <p>
                          These questions test your understanding. They never
                          hold up the lesson.
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
                          topic.diagnostics.length === 0 ? (
                            <p>
                              No warm-up questions are assigned to this lesson.
                            </p>
                          ) : (
                            <>
                              <h3>Recall the building blocks</h3>
                              <p className="muted">
                                A quick check of ideas this lesson uses. Skip
                                these freely.
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
                                      onClick={() =>
                                        selectTopic(p.prerequisiteId!)
                                      }
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
                          )
                        ) : practiceTab === "guided" ? (
                          topic.fadedExercise.steps.length === 0 ? (
                            <p>
                              No guided exercise is assigned to this lesson.
                            </p>
                          ) : (
                            <>
                              <h3>Keep a little scaffolding</h3>
                              <p className="muted">
                                The setup is supplied. Try any step; the others
                                stay visible.
                              </p>
                              <FadedExercise
                                exercise={topic.fadedExercise}
                                passed={progress.passed}
                                disabled={busy || !ready}
                                onSubmit={submit}
                              />
                            </>
                          )
                        ) : practiceTab === "check" ? (
                          topic.retrievalProblems.length === 0 ? (
                            <p>
                              This lesson has no graded knowledge check. You can
                              still mark it as read and keep notes.
                            </p>
                          ) : (
                            <>
                              <h3>Can you use the idea yourself?</h3>
                              <p className="muted">
                                Try these without the worked solution. Passing
                                the set records a knowledge check and schedules
                                a later review.
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
                          )
                        ) : topic.transferProblems?.length ? (
                          <>
                            <h3>Transfer across the spine</h3>
                            <p className="muted">
                              Recognise the same structure in a different
                              mathematical setting. These questions are
                              practice, not a mastery gate.
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
                              This lesson uses authored reasoning questions. Try
                              the supported question or apply the idea to a
                              situation of your own.
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
                    </>
                  )}
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
