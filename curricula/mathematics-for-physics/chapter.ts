import type { CurriculumTopic, Diagram } from "@/types/curriculum";

/** Authors supply complete teaching and assessment; the syllabus owns ordering. */
export type Chapter = Omit<CurriculumTopic,
  "title" | "description" | "domain" | "unit" | "prerequisites" | "minutes"
>;

/** A coordinate diagram has explicit labels and explanatory text, not decorative imagery. */
export function axesDiagram(title: string, caption: string, elements: Diagram["elements"]): Diagram {
  return {
    title, caption, viewBox: [0, 0, 600, 320],
    elements: [
      { kind: "line", from: [60, 265], to: [550, 265], tone: "muted" },
      { kind: "line", from: [60, 265], to: [60, 30], tone: "muted" },
      ...elements,
    ],
  };
}
