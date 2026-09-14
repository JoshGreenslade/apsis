import type { Chapter } from "../chapter";
import { numeric } from "@/curriculum-support/authoring";
import { linear } from "../sources";

// STUB — placeholder chapter. Full teaching content is not yet written.
// This stub exists so the pack validates and the course can be published
// with the finished chapters. Replace with real content before release.
const chapter: Chapter = {
  id: "eigenvectors",
  intuition: {
    body: "STUB: Eigenvectors and natural coordinates. This chapter is not yet written; it is published as a placeholder so the course remains complete and navigable.",
    thoughtExperiments: ["STUB: A placeholder prediction to be replaced with real content."],
  },
  theory: [
    { heading: "1. STUB", body: "STUB: This section is not yet written." },
  ],
  teaching: {
    question: "STUB",
    why: "STUB",
    outcomes: ["STUB"],
    checkpoints: [
      { bridge: "STUB", meaning: "STUB", question: "STUB", answer: "STUB" },
    ],
    takeaway: "STUB",
    nextConnection: "STUB",
  },
  diagnostics: [
    numeric("d-eigen-maps", "STUB: placeholder readiness check.", 1, "1", "STUB", "STUB", { prerequisiteId: "linear-maps" }),
  ],
  workedExample: {
    title: "STUB",
    problem: "STUB",
    steps: [
      { title: "STUB", body: "STUB", reason: "STUB", trap: "STUB" },
      { title: "STUB", body: "STUB", reason: "STUB", trap: "STUB" },
    ],
  },
  fadedExercise: {
    prompt: "STUB",
    supplied: [{ heading: "STUB", body: "STUB" }],
    steps: [numeric("f-eigen", "STUB", 1, "1", "STUB", "STUB")],
  },
  retrievalProblems: [
    numeric("r-eigen-1", "STUB", 1, "1", "STUB", "STUB"),
    numeric("r-eigen-2", "STUB", 2, "1", "STUB", "STUB"),
  ],
  diagram: {
    title: "STUB",
    caption: "STUB",
    viewBox: [0, 0, 600, 320],
    elements: [{ kind: "line", from: [60, 265], to: [550, 265], tone: "muted" }],
  },
  sidebars: [],
  sources: [linear],
};
export default chapter;