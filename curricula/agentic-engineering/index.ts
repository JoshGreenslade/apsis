import type { CurriculumPack } from "@/types/curriculum";
import { buildUnit, consolidateTopics } from "./lesson";
import { overview } from "./overview";
import { unit01BuildTheMentalModel } from "./units/01-build-the-mental-model";
import { unit02MakeInformationUsable } from "./units/02-make-information-usable";
import { unit03ChooseAndOperate } from "./units/03-choose-and-operate";
import { unit04DelegateWorkWell } from "./units/04-delegate-work-well";
import { unit05EngineerUnattendedWorkflows } from "./units/05-engineer-unattended-workflows";
import { unit06AddExternalCapabilities } from "./units/06-add-external-capabilities";
import { unit07CoordinateAgents } from "./units/07-coordinate-agents";
import { unit08EvaluateQualityAndEconomics } from "./units/08-evaluate-quality-and-economics";
import { unit09BuildIt } from "./units/09-build-it";
import { unit10ProveTheValue } from "./units/10-prove-the-value";
// Raw lesson files stay individually reviewable; the learner sees consolidated
// chapters whose dependencies form one continuous chain.
const rawTopics = [
  ...buildUnit(unit01BuildTheMentalModel),
  ...buildUnit(unit02MakeInformationUsable, unit01BuildTheMentalModel.at(-1)),
  ...buildUnit(unit03ChooseAndOperate, unit02MakeInformationUsable.at(-1)),
  ...buildUnit(unit04DelegateWorkWell, unit03ChooseAndOperate.at(-1)),
  ...buildUnit(unit05EngineerUnattendedWorkflows, unit04DelegateWorkWell.at(-1)),
  ...buildUnit(unit06AddExternalCapabilities, unit05EngineerUnattendedWorkflows.at(-1)),
  ...buildUnit(unit07CoordinateAgents, unit06AddExternalCapabilities.at(-1)),
  ...buildUnit(unit08EvaluateQualityAndEconomics, unit07CoordinateAgents.at(-1)),
  ...buildUnit(unit09BuildIt, unit08EvaluateQualityAndEconomics.at(-1)),
  ...buildUnit(unit10ProveTheValue, unit09BuildIt.at(-1)),
];
const topics = consolidateTopics(rawTopics, [
  ["models", "agents"],
  ["harnesses", "orchestration"],
  ["context", "context-engineering", "memory"],
  ["landscape", "environment"],
  ["long-horizon", "choosing"],
  ["specification", "agent-friendly", "failure-modes"],
  ["gh-aw", "controls"],
  ["customisation", "workflow-patterns"],
  ["tools", "mcp", "skills"],
  ["why-multiple", "subagents"],
  ["coordination", "patterns", "when-not-multi"],
  ["evaluation", "benchmark"],
  ["verification", "economics"],
  ["tiny-harness"],
  ["graduation"],
]);
const pack: CurriculumPack = {
  id: "agentic-engineering",
  version: "1.0.0",
  title: "Agentic engineering",
  description:
    "From using a coding assistant to designing, operating and evaluating useful agent systems.",
  conventions:
    "Examples use a fictional retry-service incident. Product references checked 13 September 2026; verify installed versions and engine-specific configuration. All monetary examples are hypothetical. The 15 chapters take roughly 25–45 minutes each including reflection; practical labs require additional time. Fixed checks assess comprehension, not completion of real engineering projects.",
  overview,
  topics,
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
pack.topics.find((t) => t.id === "verification")!.practiceTemplates = [
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
