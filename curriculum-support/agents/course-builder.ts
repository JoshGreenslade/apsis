import type { CurriculumTopic, Diagram } from "@/types/curriculum";
import { choice } from "@/curricula/helpers";
export type Check = [
  prompt: string,
  options: string[],
  correct: number,
  explanation: string,
];
export type Lesson = {
  id: string;
  title: string;
  unit: string;
  question: string;
  intro: string;
  sections: [heading: string, body: string][];
  example: [
    problem: string,
    ...steps: [title: string, body: string, reason: string, trap: string][],
  ];
  checks: [Check, Check, Check];
  outcome: string;
  takeaway: string;
  source: (keyof typeof sources)[];
  practical?: CurriculumTopic["practical"];
  flow?: string[];
  minutes?: number;
};
export const sources = {
  tools: {
    title: "OpenAI: function calling",
    url: "https://developers.openai.com/api/docs/guides/function-calling",
  },
  codex: {
    title: "Official Codex documentation",
    url: "https://learn.chatgpt.com/docs",
  },
  instructions: {
    title: "Codex: repository instructions",
    url: "https://learn.chatgpt.com/docs/agent-configuration/agents-md",
  },
  security: {
    title: "Codex: security boundaries",
    url: "https://learn.chatgpt.com/docs/security",
  },
  copilot: {
    title: "GitHub: Copilot cloud agent",
    url: "https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent",
  },
  claude: {
    title: "Anthropic: Claude Code overview",
    url: "https://code.claude.com/docs/en/overview",
  },
  gemini: {
    title: "Google: Gemini CLI documentation",
    url: "https://geminicli.com/docs/",
  },
  aw: {
    title: "GitHub: create an agentic workflow",
    url: "https://github.github.io/gh-aw/setup/creating-workflows/",
  },
  engines: {
    title: "gh-aw: engine capabilities and limits",
    url: "https://github.github.io/gh-aw/reference/engines/",
  },
  outputs: {
    title: "gh-aw: safe outputs",
    url: "https://github.github.io/gh-aw/reference/safe-outputs/",
  },
  mcp: {
    title: "MCP: architecture",
    url: "https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture",
  },
};
function diagram(labels: string[]): Diagram {
  return {
    title: "Follow the responsibility",
    caption:
      "Read from top to bottom. Each connection is a handoff of information or control; the lesson explains which component owns it.",
    viewBox: [0, 0, 600, labels.length * 62 + 30],
    elements: labels.flatMap((label, i) => [
      {
        kind: "point" as const,
        at: [48, 35 + i * 62] as [number, number],
        label: String(i + 1),
        labelOffset: [-20, 5] as [number, number],
        tone: "accent" as const,
      },
      {
        kind: "label" as const,
        at: [82, 40 + i * 62] as [number, number],
        text: label,
      },
      ...(i < labels.length - 1
        ? [
            {
              kind: "line" as const,
              from: [48, 44 + i * 62] as [number, number],
              to: [48, 85 + i * 62] as [number, number],
              tone: "muted" as const,
            },
          ]
        : []),
    ]),
  };
}
export function buildLessons(lessons: Lesson[]): CurriculumTopic[] {
  return lessons.map((s, i) => {
    const q = (check: Check, id: string) =>
      choice(
        id,
        check[0],
        check[1],
        check[2],
        check[3],
        "Identify the observation that would distinguish the alternatives.",
      );
    const previous = lessons[i - 1];
    return {
      id: s.id,
      title: s.title,
      description: s.outcome,
      domain: "Agentic engineering",
      unit: s.unit,
      prerequisites: previous ? [previous.id] : [],
      minutes: s.minutes ?? 12,
      teaching: {
        question: s.question,
        why: s.outcome,
        outcomes: [s.outcome],
        checkpoints: [],
        takeaway: s.takeaway,
        nextConnection: lessons[i + 1]
          ? `Next, ${lessons[i + 1].title.toLowerCase()}: ${lessons[i + 1].question}`
          : "Return to your measurements. Keep the architecture only if it improves the engineering outcome.",
      },
      diagnostics: [
        {
          ...q(previous?.checks[0] ?? s.checks[0], "warmup"),
          ...(previous ? { prerequisiteId: previous.id } : {}),
        },
      ],
      intuition: { body: s.intro, thoughtExperiments: [s.question] },
      theory: s.sections.map(([heading, body]) => ({ heading, body })),
      diagram: diagram(
        s.flow ?? [
          "Observe the concrete failure",
          "Choose the responsible layer",
          "Change one thing and verify",
        ],
      ),
      sidebars: [
        {
          heading: "About the examples and sources",
          body: "Examples and numbers are instructional scenarios, not measured product rankings. Product-specific references were checked on 13 September 2026. Commands and configuration can change: record installed versions and verify their help/schema before operating a real workflow.",
        },
      ],
      workedExample: {
        title: "Work through a concrete case",
        problem: s.example[0],
        steps: s.example.slice(1).map((step) => {
          const [title, body, reason, trap] = step as [
            string,
            string,
            string,
            string,
          ];
          return { title, body, reason, trap };
        }),
      },
      fadedExercise: {
        prompt: "Try the next decision yourself.",
        supplied: [
          { heading: "Keep this principle in view", body: s.takeaway },
        ],
        steps: [q(s.checks[2], "apply")],
      },
      retrievalProblems: [q(s.checks[0], "check-1"), q(s.checks[1], "check-2")],
      sources: s.source.map((k) => sources[k]),
      practical: s.practical,
    };
  });
}
