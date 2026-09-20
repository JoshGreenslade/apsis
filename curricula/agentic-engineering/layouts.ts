// Reading order is an editorial choice for each source lesson.
// Numbers refer to that lesson's authored section/checkpoint pair.
type Beat = "opening" | "case" | "map" | "lab" | "close" | "reference" | number;
export const lessonLayouts: Record<string, Beat[]> = {
  models: ["opening", 0, "case", 1, "map", "close"],
  agents: ["opening", "case", 0, "map", 1, "close"],
  harnesses: ["opening", 0, "map", "case", 1, "close"],
  orchestration: ["opening", "map", 0, 1, "case", "lab", "close"],
  context: ["opening", 0, "case", 1, "close"],
  "context-engineering": ["opening", "case", 0, 1, "close"],
  memory: ["opening", 0, "case", 1, "lab", "close"],
  specification: ["opening", "case", 0, 1, "close"],
  "agent-friendly": ["opening", 0, "case", 1, "close"],
  "failure-modes": ["opening", "case", 0, 1, "lab", "close"],
  evaluation: ["opening", "case", 0, 1, "close"],
  benchmark: ["opening", 0, "case", 1, "close"],
  verification: ["opening", "case", 0, 1, "close"],
  economics: ["opening", 0, "case", 1, "lab", "close"],
  landscape: ["opening", 0, 1, "case", "close"],
  environment: ["opening", "case", 0, 1, "close"],
  "long-horizon": ["opening", "case", 0, 1, "close"],
  choosing: ["opening", 0, "case", 1, "lab", "close"],
  "gh-aw": ["opening", 0, "reference", "case", 1, "close"],
  controls: ["opening", 0, "case", 1, "close"],
  customisation: ["opening", "case", 0, 1, "close"],
  "workflow-patterns": ["opening", 0, "case", 1, "lab", "close"],
  tools: ["opening", "case", 0, 1, "close"],
  mcp: ["opening", 0, "reference", 1, "case", "close"],
  skills: ["opening", "case", 0, 1, "lab", "close"],
  "why-multiple": ["opening", 0, "case", 1, "close"],
  subagents: ["opening", "case", 0, 1, "close"],
  coordination: ["opening", 0, "case", 1, "close"],
  patterns: ["opening", "case", 0, 1, "close"],
  "when-not-multi": ["opening", 0, "case", 1, "lab", "close"],
  "tiny-harness": ["opening", "reference", 0, "case", 1, "lab", "close"],
  graduation: ["opening", "case", 0, 1, "lab", "close"],
};

export const lessonReferences: Record<string, { title: string; body: string }> = {
  "gh-aw": {
    title: "Trace the production architecture",
    body: "Open the [GitHub Agentic Workflows architecture diagram](https://github.github.com/gh-aw/introduction/architecture/). Locate the agent job and the separate output jobs. Trace where a proposed change becomes an external write, then compare the permissions on either side of that boundary.",
  },
  mcp: {
    title: "Read the host/client/server diagram",
    body: "The [MCP architecture diagram in the March 2025 specification](https://modelcontextprotocol.io/specification/2025-03-26/architecture) shows the host managing separate client/server connections. Follow one tool request across that boundary. This is a versioned reference: check your negotiated protocol version before implementing lifecycle details.",
  },
  "tiny-harness": {
    title: "Open the runnable companion",
    body: "The [harness lab guide](/agent-labs/README.md) contains the commands and nine extension milestones. Keep it beside this lesson. Its scripted model is a test double for the harness, so successful offline runs do not measure a real model's reasoning.",
  },
};
