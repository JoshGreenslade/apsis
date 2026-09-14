import type { CurriculumPack } from "@/types/curriculum";
export const overview: NonNullable<CurriculumPack["overview"]> = {
  headline: "Understand the stack. Build systems worth delegating to.",
  introduction:
    "You already write software and use a coding assistant. This course takes you from that starting point to choosing the right autonomy, diagnosing failed runs and building a small agent system you can explain. Follow 32 short concept lessons, ten practical exercises, a nine-stage harness project and a measured repository capstone. Read everything freely; questions are there when you want to test your understanding.",
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
};
