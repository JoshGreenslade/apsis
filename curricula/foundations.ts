import { foundationsPractice } from "@/curriculum-support/practice";
import type { CurriculumPack } from "@/types/curriculum";
import { choice as c, numeric as n } from "./helpers";
const pack: CurriculumPack = {
  id: "foundations",
  version: "1.0.0",
  title: "Quantitative foundations",
  description:
    "Make sense of ratios, rates, and units before tackling a more complex calculation.",
  conventions:
    "For dimensionless numbers use unit 1. Use scientific notation such as 2.5e3.",
  topics: [
    {
      id: "ratios",
      practiceTemplates: foundationsPractice,
      title: "Ratios & dimensional reasoning",
      description: "Check what a number means before calculating with it.",
      domain: "Mathematics",
      unit: "01 · Foundations",
      prerequisites: [],
      minutes: 15,
      diagnostics: [
        n(
          "gate",
          "Compute 12 divided by 3.",
          4,
          "1",
          "Twelve contains four groups of three.",
          "Think in equal groups.",
        ),
      ],
      intuition: {
        body: "A recipe for two people becomes a recipe for six by scaling every ingredient together. The amounts change, but their ratios do not. Units tell you what each amount counts. Dividing a distance by a duration answers a different question from dividing distance by distance.",
        thoughtExperiments: [
          "If a recipe doubles the flour but not the water, does its mixture stay the same?",
        ],
      },
      theory: [
        {
          heading: "A ratio carries units",
          body: String.raw`A rate $q=x/t$ has units $[q]=[x]/[t]$. A dimensionless ratio $x_2/x_1$ compares quantities with the same dimension after converting to compatible units. If $x=vt$, dimensional consistency requires $L=(L/T)T$; consistency is necessary but cannot determine a missing factor of two.`,
        },
        {
          heading: "Conversion preserves a quantity",
          body: String.raw`Multiply by a factor equal to one: $2500\ \mathrm{m}\times(1\ \mathrm{km}/1000\ \mathrm{m})=2.5\ \mathrm{km}$. The units cancel algebraically. Squaring a length conversion squares its numerical factor: $1\ \mathrm{km^2}=10^6\ \mathrm{m^2}$.`,
        },
      ],
      diagram: {
        title: "Equivalent ratios",
        caption: "Both segments have the same ratio, two to one.",
        viewBox: [0, 0, 600, 180],
        elements: [
          { kind: "line", from: [80, 55], to: [280, 55], tone: "accent" },
          { kind: "line", from: [80, 115], to: [480, 115], tone: "ink" },
          { kind: "label", at: [340, 55], text: "2 parts" },
          { kind: "label", at: [530, 115], text: "4 parts" },
        ],
      },
      sidebars: [
        {
          heading: "Dimensions do not prove a model",
          body: "A dimensionally correct expression can still use the wrong physics or an incorrect dimensionless coefficient. Treat dimensional analysis as a rejection test, then check the model.",
        },
      ],
      workedExample: {
        title: "A steady journey",
        problem: "Travel 150 km in 2 hours. Find the mean speed.",
        steps: [
          {
            title: "Form the rate",
            body: "150 / 2 = 75.",
            reason: "Distance per hour divides distance by elapsed hours.",
            trap: "Multiplication gives the wrong dimension.",
          },
          {
            title: "Attach the units",
            body: "75 km/h.",
            reason: "The units follow the same division as the values.",
            trap: "The result is not 75 km or 75 hours.",
          },
        ],
      },
      fadedExercise: {
        prompt: "A cyclist travels 36 km in 2 hours.",
        supplied: [
          {
            heading: "Relation supplied",
            body: "Mean speed = total distance / elapsed time.",
          },
        ],
        steps: [
          n(
            "fade",
            "Calculate mean speed.",
            18,
            "km/h",
            "36 / 2 = 18 km/h.",
            "Divide distance by time.",
          ),
        ],
      },
      retrievalProblems: [
        n(
          "r1",
          "Convert 4500 meters to kilometers.",
          4.5,
          "km",
          "4500 / 1000 = 4.5 km.",
          "Use a conversion factor equal to one.",
        ),
        c(
          "r2",
          "Which has dimensions of acceleration?",
          ["Distance / time squared", "Distance × time", "Time / distance"],
          0,
          "Acceleration is change in velocity per unit time, so its dimension is length / time squared.",
          "Divide the dimensions of velocity by time.",
        ),
      ],
      sources: [
        {
          title: "BIPM · International System of Units",
          url: "https://www.bipm.org/en/publications/si-brochure",
        },
      ],
    },
  ],
};
export default pack;
