"use client";
import { useState } from "react";
import { Check, Lightbulb, ArrowRight } from "lucide-react";
import type {
  CurriculumTopic,
  Feedback,
  Problem,
  Submission,
} from "@/types/curriculum";
import { MathText } from "./MathText";
export function ProblemInput({
  problem,
  onSubmit,
  disabled = false,
  passed = false,
  allowHint = true,
}: {
  problem: Problem;
  onSubmit: (submission: Submission) => Promise<Feedback | undefined>;
  disabled?: boolean;
  passed?: boolean;
  allowHint?: boolean;
}) {
  const [value, setValue] = useState(""),
    [unit, setUnit] = useState(""),
    [hint, setHint] = useState(false),
    [feedback, setFeedback] = useState<Feedback>(),
    [sending, setSending] = useState(false);
  async function submit() {
    if (!value.trim() || sending || disabled || passed) return;
    setSending(true);
    try {
      setFeedback(await onSubmit({ value, unit }));
    } finally {
      setSending(false);
    }
  }
  return (
    <form
      className={`problem ${passed ? "is-passed" : ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      onKeyDown={(e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          void submit();
        }
      }}
    >
      <MathText>{problem.prompt}</MathText>
      {passed ? (
        <div className="passed">
          <Check size={16} /> Answer verified
        </div>
      ) : (
        <>
          {problem.answer.kind === "choice" ? (
            <fieldset disabled={disabled || sending}>
              <legend className="sr-only">Choose an answer</legend>
              {problem.answer.options.map((o) => (
                <label className="choice" key={o.id}>
                  <input
                    type="radio"
                    name={problem.id}
                    value={o.id}
                    checked={value === o.id}
                    onChange={() => setValue(o.id)}
                  />
                  <span>{o.label}</span>
                </label>
              ))}
            </fieldset>
          ) : (
            <div className="numeric-input">
              <label>
                Value
                <input
                  aria-label="Answer value"
                  inputMode="decimal"
                  placeholder="Your calculation"
                  value={value}
                  disabled={disabled || sending}
                  onChange={(e) => setValue(e.target.value)}
                />
              </label>
              <label>
                Unit
                <input
                  aria-label="Answer unit"
                  placeholder={problem.answer.unit}
                  value={unit}
                  disabled={disabled || sending}
                  onChange={(e) => setUnit(e.target.value)}
                />
              </label>
            </div>
          )}
          <div className="problem-actions">
            <button
              className="primary"
              type="submit"
              disabled={!value.trim() || disabled || sending}
            >
              {sending ? "Checking…" : "Check answer"}
              <ArrowRight size={15} />
            </button>
            {allowHint && (
              <button
                className="text-button"
                type="button"
                onClick={() => setHint(!hint)}
              >
                <Lightbulb size={15} />
                {hint ? "Hide hint" : "Need a hint?"}
              </button>
            )}
          </div>
          {hint && (
            <div className="hint">
              <MathText>{problem.hint}</MathText>
            </div>
          )}
        </>
      )}
      {feedback && (
        <div
          className={`feedback ${feedback.correct ? "correct" : "incorrect"}`}
          role="status"
        >
          <div className="eyebrow">
            {feedback.correct
              ? "Verified"
              : feedback.category === "unit-reference"
                ? "Unit / reference-frame check"
                : `${feedback.category} check`}
          </div>
          <MathText>{feedback.message}</MathText>
        </div>
      )}
    </form>
  );
}
export default function FadedExercise({
  exercise,
  passed,
  onSubmit,
  disabled,
}: {
  exercise: CurriculumTopic["fadedExercise"];
  passed: string[];
  onSubmit: (id: string, s: Submission) => Promise<Feedback | undefined>;
  disabled: boolean;
}) {
  return (
    <div>
      <MathText>{exercise.prompt}</MathText>
      <div className="supplied">
        {exercise.supplied.map((s, index) => (
          <div key={`${s.heading}-${index}`}>
            <h4>{s.heading}</h4>
            <MathText>{s.body}</MathText>
          </div>
        ))}
      </div>
      {exercise.steps.map((p, i) => (
        <div key={p.id} className="faded-step">
          <div className="eyebrow">
            Step {i + 1} / {exercise.steps.length}
          </div>
          {passed.includes(p.id) ? (
            <div className="passed">
              <Check size={16} />
              <MathText>{p.solution}</MathText>
            </div>
          ) : (
            <ProblemInput
              problem={p}
              disabled={disabled}
              onSubmit={(s) => onSubmit(p.id, s)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
