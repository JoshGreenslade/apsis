import type { Diagram, Problem } from "@/types/curriculum";
export function numeric(
  id: string,
  prompt: string,
  value: number,
  unit: string,
  solution: string,
  hint: string,
  extra: Partial<Problem> = {},
): Problem {
  return {
    id,
    prompt,
    answer: {
      kind: "numeric",
      value,
      unit,
      acceptedUnits: [unit],
      absoluteTolerance: 0.001,
      relativeTolerance: 0.002,
    },
    solution,
    hint,
    rubric: {
      defaultCategory: "algebraic",
      explanation:
        "Check the governing relation, substitute consistently, and keep unrounded intermediate values.",
      misconceptions: [],
    },
    ...extra,
  };
}
export function choice(
  id: string,
  prompt: string,
  options: string[],
  correct: number,
  solution: string,
  hint: string,
  extra: Partial<Problem> = {},
): Problem {
  return {
    id,
    prompt,
    answer: {
      kind: "choice",
      value: String(correct),
      options: options.map((label, i) => ({ id: String(i), label })),
    },
    solution,
    hint,
    rubric: {
      defaultCategory: "conceptual",
      explanation: hint,
      misconceptions: [],
    },
    ...extra,
  };
}
export const orbitDiagram: Diagram = {
  title: "An ellipse, viewed in its orbital plane",
  caption:
    "The attracting body is at a focus, not the center. The radius is measured from this focus. Schematic; not to scale.",
  viewBox: [0, 0, 600, 280],
  elements: [
    { kind: "ellipse", center: [300, 135], rx: 230, ry: 108, tone: "accent" },
    {
      kind: "line",
      from: [70, 135],
      to: [530, 135],
      tone: "muted",
      dashed: true,
    },
    {
      kind: "point",
      at: [96.7858, 135],
      label: "Attracting body",
      labelOffset: [36, -20],
      tone: "ink",
    },
    { kind: "point", at: [530, 135], label: "Apoapsis", tone: "accent" },
    {
      kind: "point",
      at: [70, 135],
      label: "Periapsis",
      labelOffset: [0, 38],
      tone: "accent",
    },
    { kind: "point", at: [390, 36], label: "Spacecraft", tone: "accent" },
    { kind: "line", from: [96.7858, 135], to: [390, 36], tone: "ink" },
    { kind: "label", at: [260, 75], text: "r" },
    { kind: "label", at: [300, 263], text: "a = half the major axis" },
  ],
};
export const transferDiagram: Diagram = {
  title: "Two impulses. One transfer ellipse.",
  caption:
    "Coplanar, circular departure and arrival orbits. Burn 1 at transfer periapsis; burn 2 at transfer apoapsis. Schematic; not to scale.",
  viewBox: [0, 0, 600, 310],
  elements: [
    { kind: "ellipse", center: [300, 155], rx: 140, ry: 140, tone: "muted" },
    { kind: "ellipse", center: [300, 155], rx: 52, ry: 52, tone: "muted" },
    {
      kind: "ellipse",
      center: [344, 155],
      rx: 96,
      ry: 85.3229,
      tone: "accent",
    },
    { kind: "point", at: [300, 155], label: "Earth", tone: "ink" },
    { kind: "point", at: [248, 155], label: "1", tone: "accent" },
    { kind: "point", at: [440, 155], label: "2", tone: "accent" },
    { kind: "line", from: [248, 155], to: [248, 92], tone: "accent" },
    { kind: "line", from: [440, 155], to: [440, 222], tone: "accent" },
    { kind: "label", at: [120, 40], text: "Final circular orbit" },
    { kind: "label", at: [472, 252], text: "Prograde burns" },
  ],
};
export const nasa = {
  title: "NASA · Basics of Space Flight: Trajectories",
  url: "https://science.nasa.gov/learn/basics-of-space-flight/chapter4-1/",
};
export const jpl = {
  title: "JPL · Astrodynamic Parameters",
  url: "https://ssd.jpl.nasa.gov/astro_par.html",
};
