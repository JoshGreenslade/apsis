"use client";
import { useEffect, useRef, useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import type { Feedback, Problem, Submission } from "@/types/curriculum";
import { ProblemInput } from "./FadedExercise";
type Generated = {
  problem: Problem;
  source: "ai" | "template";
  notice: string;
  parameters: Record<string, number>;
};
export default function ExtraPractice({
  packId,
  topicId,
  enabled = true,
}: {
  packId: string;
  topicId: string;
  enabled?: boolean;
}) {
  const [question, setQuestion] = useState<Generated>(),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [ai, setAi] = useState(false);
  const controller = useRef<AbortController | null>(null);
  useEffect(() => {
    fetch("/api/practice")
      .then((r) => r.json())
      .then((data) => setAi(data.aiAvailable))
      .catch(() => {});
    return () => controller.current?.abort();
  }, []);
  async function generate() {
    if (busy || !enabled) return;
    const c = new AbortController();
    controller.current = c;
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/practice", {
        method: "POST",
        signal: c.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "generate",
          packId,
          topicId,
          previous: question?.parameters,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setQuestion(data);
    } catch (e) {
      if (!c.signal.aborted)
        setError(e instanceof Error ? e.message : "Please try again.");
    } finally {
      if (!c.signal.aborted) setBusy(false);
    }
  }
  async function answer(submission: Submission): Promise<Feedback | undefined> {
    setError("");
    try {
      const r = await fetch("/api/practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "answer",
          id: question!.problem.id,
          submission,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      return data.feedback;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not check the answer.");
    }
  }
  return (
    <section className="extra-practice">
      <div className="practice-title">
        <Sparkles size={19} />
        <h3>Try a fresh variation</h3>
      </div>
      <p>
        Same idea, different numbers. Use a new situation to find out whether
        the method makes sense.
      </p>
      <button
        className="primary"
        onClick={generate}
        disabled={busy || !enabled}
      >
        {question ? <RefreshCw size={16} /> : <Sparkles size={16} />}{" "}
        {busy
          ? "Creating your question…"
          : question
            ? "Another similar question"
            : "Generate a similar question"}
      </button>
      <p className="practice-source">
        {question?.notice ??
          (ai
            ? "AI chooses variations; the lesson formula checks the arithmetic."
            : "Checked-template practice is ready. AI is not connected.")}
      </p>
      {error && (
        <p role="alert" className="error-banner">
          {error}
        </p>
      )}
      {question && (
        <ProblemInput
          key={question.problem.id}
          problem={question.problem}
          disabled={busy}
          onSubmit={answer}
        />
      )}
      <p className="muted">
        Extra practice is for exploration and does not change your scheduled
        mastery checks.
      </p>
    </section>
  );
}
