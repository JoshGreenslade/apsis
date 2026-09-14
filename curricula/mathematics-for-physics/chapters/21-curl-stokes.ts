import type { Chapter } from "../chapter";
import { numeric } from "@/curriculum-support/authoring";
import { multivariable } from "../sources";

// STUB — placeholder chapter. Full teaching content is not yet written.
// This stub exists so the pack validates and the course can be published
// with the finished chapters. Replace with real content before release.
const chapter: Chapter = {
  id: "curl-stokes",
  intuition: {
    body: "STUB: Circulation, curl and Stokes' theorem. This chapter is not yet written; it is published as a placeholder so the course remains complete and navigable.",
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
    numeric("d-curl-div", "STUB: placeholder readiness check.", 1, "1", "STUB", "STUB", { prerequisiteId: "divergence" }),
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
    steps: [numeric("f-curl", "STUB", 1, "1", "STUB", "STUB")],
  },
  retrievalProblems: [
    numeric("r-curl-1", "STUB", 1, "1", "STUB", "STUB"),
    numeric("r-curl-2", "STUB", 2, "1", "STUB", "STUB"),
  ],
  diagram: {
    title: "STUB",
    caption: "STUB",
    viewBox: [0, 0, 600, 320],
    elements: [{ kind: "line", from: [60, 265], to: [550, 265], tone: "muted" }],
  },
  sidebars: [],
  sources: [multivariable],
};
export default chapter;