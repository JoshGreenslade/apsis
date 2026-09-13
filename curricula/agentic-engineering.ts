import type { CurriculumPack } from "@/types/curriculum";
import { buildLessons } from "@/curriculum-support/agents/course-builder";
import { foundations } from "@/curriculum-support/agents/foundations";
import { engineering } from "@/curriculum-support/agents/engineering";
import { workflows } from "@/curriculum-support/agents/workflows";
import { coordination } from "@/curriculum-support/agents/coordination";
import { evaluation } from "@/curriculum-support/agents/evaluation";
import { projects } from "@/curriculum-support/agents/projects";
const pack: CurriculumPack = {
  id: "agentic-engineering",
  version: "1.0.0",
  title: "Agentic engineering",
  description:
    "From using a coding assistant to designing, operating and evaluating useful agent systems.",
  conventions:
    "Examples use a fictional retry-service incident. Product references checked 13 September 2026; verify installed versions and engine-specific configuration. All monetary examples are hypothetical. Core lessons take roughly 10–15 minutes including reflection; practical labs require additional time. Fixed checks assess comprehension, not completion of real engineering projects.",
  overview: {
    headline: "Understand the stack. Build systems worth delegating to.",
    introduction:
      "You already write software and use a coding assistant. This course takes you from that starting point to choosing the right autonomy, diagnosing failed runs and building a small agent system you can explain. Follow 30 short concept lessons, eight practical exercises, a nine-stage harness project and a measured repository capstone. Read everything freely; questions are there when you want to test your understanding.",
    startingPoint:
      "Bring competent software-engineering experience: Git, a shell, tests and basic API/JSON knowledge. You do not need transformer mathematics. The offline harness lab uses Node.js 24+. Live product comparisons, MCP integrations and GitHub workflows need your own accounts and appropriate access; the core concepts and fixture exercises work without model credentials.",
    outcomes: [
      {
        title: "Draw the stack",
        description:
          "Separate models, agents, harnesses, tools, context, memory and outer orchestration—and identify which layer owns a failure.",
      },
      {
        title: "Delegate a verifiable task",
        description:
          "Choose assistance or autonomy, prepare a reproducible environment and turn an issue into a clear engineering contract.",
      },
      {
        title: "Operate a useful workflow",
        description:
          "Configure gh-aw, add an external capability through MCP and use multiple agents only when the coordination earns its cost.",
      },
      {
        title: "Evaluate and build",
        description:
          "Run a credible internal comparison, implement a tiny harness and measure whether a repository workflow saves engineering time.",
      },
    ],
    capstone: {
      title: "A repository workflow that earns its place",
      description:
        "Route a GitHub event through investigation, implementation, independent review and human approval. Explain every boundary, test failure paths and compare accepted outcomes, active human time and total cost with a manual baseline. The graduation criterion is a functioning system and a defensible keep/change/stop decision.",
    },
  },
  topics: buildLessons([
    ...foundations,
    ...engineering,
    ...workflows,
    ...coordination,
    ...evaluation,
    ...projects,
  ]),
};
pack.topics.find((t) => t.id === "evaluation")!.practiceTemplates = [
  {
    id: "acceptance-rate",
    title: "Acceptance rate with failed attempts included",
    prompt:
      "A fictional pilot attempts 20 tasks and accepts {{accepted}} results. What is the acceptance rate, including every failed attempt in the denominator?",
    variables: [{ name: "accepted", min: 5, max: 19, step: 1 }],
    formula: { op: "multiply", args: [5, { variable: "accepted" }] },
    unit: "%",
    hint: "Divide accepted outcomes by all 20 attempts, then multiply by 100.",
    solution:
      "{{accepted}} / 20 × 100 = {{answer}}%. This describes the pilot; it does not establish a universal product ranking.",
  },
];
pack.topics.find((t) => t.id === "economics")!.practiceTemplates = [
  {
    id: "accepted-cost",
    title: "Cost per accepted engineering result",
    prompt:
      "A fictional batch costs {{machine}} currency units in machine usage and {{minutes}} active human minutes at 60 units/hour. It yields {{accepted}} accepted results. Find total cost per accepted result, including all attempted work.",
    variables: [
      { name: "machine", min: 10, max: 50, step: 5 },
      { name: "minutes", min: 30, max: 120, step: 10 },
      { name: "accepted", min: 2, max: 8, step: 1 },
    ],
    formula: {
      op: "divide",
      args: [
        { op: "add", args: [{ variable: "machine" }, { variable: "minutes" }] },
        { variable: "accepted" },
      ],
    },
    unit: "units/result",
    hint: "At 60 units/hour, each active minute costs one unit. Add machine and labour costs, then divide by accepted outcomes.",
    solution:
      "({{machine}} + {{minutes}}) / {{accepted}} = {{answer}} units/result. Keep elapsed waiting separate from active labour.",
  },
];
export default pack;
