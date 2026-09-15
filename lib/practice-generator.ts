import { z } from "zod";
import type { Expression, PracticeTemplate, Problem } from "@/types/curriculum";
const randomId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const randomInteger = (max: number) => Math.floor(Math.random() * max);

export function calculate(
  expression: Expression,
  values: Record<string, number>,
  depth = 0,
): number {
  if (depth > 25) throw new Error("Expression is too deep");
  if (typeof expression === "number") return expression;
  if ("variable" in expression) {
    const n = values[expression.variable];
    if (!Number.isFinite(n)) throw new Error("Unknown variable");
    return n;
  }
  const unary = ["sqrt", "sin", "cos"].includes(expression.op);
  if (expression.args.length !== (unary ? 1 : 2))
    throw new Error("Wrong expression arity");
  const [a, b] = expression.args.map((e) => calculate(e, values, depth + 1));
  const result =
    expression.op === "add"
      ? a + b
      : expression.op === "subtract"
        ? a - b
        : expression.op === "multiply"
          ? a * b
          : expression.op === "divide"
            ? a / b
            : expression.op === "power"
              ? a ** b
              : expression.op === "sqrt"
                ? Math.sqrt(a)
                : expression.op === "sin"
                  ? Math.sin(a)
                  : Math.cos(a);
  if (!Number.isFinite(result)) throw new Error("Non-finite calculation");
  return result;
}
export function instantiate(
  template: PracticeTemplate,
  values: Record<string, number>,
  id = randomId(),
): Problem {
  if (Object.keys(values).length !== template.variables.length)
    throw new Error("Unexpected parameters");
  for (const v of template.variables) {
    const n = values[v.name];
    if (
      !Number.isFinite(n) ||
      n < v.min ||
      n > v.max ||
      Math.abs((n - v.min) / v.step - Math.round((n - v.min) / v.step)) > 1e-7
    )
      throw new Error("Parameter outside the checked range");
  }
  const answer = calculate(template.formula, values);
  const interpolate = (s: string) =>
    s.replace(/\{\{(\w+)\}\}/g, (_, key: string) =>
      key === "answer"
        ? Number(answer.toPrecision(8)).toString()
        : String(
            values[key] ??
              (() => {
                throw new Error("Missing placeholder");
              })(),
          ),
    );
  return {
    id,
    prompt: interpolate(template.prompt),
    hint: interpolate(template.hint),
    solution: interpolate(template.solution),
    answer: {
      kind: "numeric",
      value: answer,
      unit: template.unit,
      acceptedUnits: [template.unit],
      absoluteTolerance: 0.000001,
      relativeTolerance: 0.002,
    },
    rubric: {
      defaultCategory: "algebraic",
      explanation:
        "Check the governing relation, keep intermediate precision, and carry the stated units through each step.",
      misconceptions: [],
    },
  };
}
export function sample(
  template: PracticeTemplate,
  previous: Record<string, number> = {},
): Record<string, number> {
  let values: Record<string, number> = {};
  for (let attempt = 0; attempt < 8; attempt++) {
    values = Object.fromEntries(
      template.variables.map((v) => [
        v.name,
        Number(
          (
            v.min +
            randomInteger(Math.floor((v.max - v.min) / v.step) + 1) * v.step
          ).toFixed(8),
        ),
      ]),
    );
    if (!template.variables.every((v) => values[v.name] === previous[v.name]))
      break;
  }
  if (template.variables.every((v) => values[v.name] === previous[v.name])) {
    const variable = template.variables.find((v) => v.max - v.min >= v.step);
    if (variable)
      values[variable.name] =
        values[variable.name] + variable.step <= variable.max
          ? Number((values[variable.name] + variable.step).toFixed(8))
          : variable.min;
  }
  return values;
}
export const SelectionSchema = z
  .object({
    templateId: z.string(),
    parameters: z
      .array(
        z.object({ name: z.string(), value: z.number().finite() }).strict(),
      )
      .min(1)
      .max(12),
  })
  .strict();
const schema = {
  type: "object",
  additionalProperties: false,
  required: ["templateId", "parameters"],
  properties: {
    templateId: { type: "string" },
    parameters: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "value"],
        properties: { name: { type: "string" }, value: { type: "number" } },
      },
    },
  },
};
export async function generatePractice(
  templates: PracticeTemplate[],
  previous: Record<string, number> = {},
  provider: typeof fetch = fetch,
) {
  if (!templates.length)
    throw new Error("No checked practice templates for this lesson");
  let template = templates[randomInteger(templates.length)],
    values = sample(template, previous),
    source: "ai" | "template" = "template",
    notice = "A fresh variation from a checked template. AI is not connected.";
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_MODEL) {
    try {
      const response = await provider("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        signal: AbortSignal.timeout(25000),
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL,
          store: false,
          max_output_tokens: 1200,
          instructions:
            "You choose a useful new mathematical practice variation. Select exactly one supplied template and values for all its variables. Respect min/max/step. Avoid the previous parameter set. Prefer pedagogically useful values. Do not invent variables, change formulas, or supply an answer.",
          input: JSON.stringify({
            templates: templates.map((t) => ({
              id: t.id,
              title: t.title,
              prompt: t.prompt,
              variables: t.variables,
            })),
            previous,
          }),
          text: {
            format: {
              type: "json_schema",
              name: "practice_selection",
              strict: true,
              schema,
            },
          },
        }),
      });
      if (!response.ok) throw new Error("Provider unavailable");
      const result = await response.json();
      if (result.status !== "completed") throw new Error("Incomplete response");
      const output = result.output
        ?.flatMap(
          (item: { content?: { type: string; text?: string }[] }) =>
            item.content ?? [],
        )
        .filter((c: { type: string }) => c.type === "output_text")
        .map((c: { text: string }) => c.text)
        .join("");
      const selection = SelectionSchema.parse(JSON.parse(output));
      const selected = templates.find((t) => t.id === selection.templateId);
      if (
        !selected ||
        new Set(selection.parameters.map((p) => p.name)).size !==
          selection.parameters.length
      )
        throw new Error("Invalid template selection");
      const chosen = Object.fromEntries(
        selection.parameters.map((p) => [p.name, p.value]),
      );
      instantiate(selected, chosen);
      if (selected.variables.every((v) => chosen[v.name] === previous[v.name]))
        throw new Error("Repeated question");
      template = selected;
      values = chosen;
      source = "ai";
      notice =
        "AI chose this variation. The answer is calculated from the lesson’s checked formula.";
    } catch {
      notice =
        "AI could not supply a valid variation this time. Here is a fresh question from a checked template.";
    }
  }
  return {
    problem: instantiate(template, values),
    source,
    notice,
    parameters: values,
    templateId: template.id,
  };
}
