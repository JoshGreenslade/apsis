import test from "node:test";
import assert from "node:assert/strict";
import katex from "katex";
import agents from "../curricula/agentic-engineering";
import astrodynamics from "../curricula/astrodynamics";
import mathematics from "../curricula/mathematics-for-physics";
import { mu } from "../curricula/astrodynamics/constants";
import {
  calculate,
  generatePractice,
  instantiate,
  sample,
} from "../lib/practice-generator";
import { evaluate } from "../lib/curriculum-engine";
const templates = [
  ...agents.topics.flatMap((t) => t.practiceTemplates ?? []),
  ...astrodynamics.topics.flatMap((t) => t.practiceTemplates ?? []),
  ...mathematics.topics.flatMap((t) => t.practiceTemplates ?? []),
];
const astroPractice = (id: string) =>
  astrodynamics.topics.find((t) => t.id === id)!.practiceTemplates![0];
const visVivaPractice =
  astrodynamics.topics.find((t) => t.id === "two-body")!.practiceTemplates!;
test("every practice template calculates finite, parseable questions at boundaries and samples", () => {
  for (const t of templates) {
    const low = Object.fromEntries(t.variables.map((v) => [v.name, v.min])),
      high = Object.fromEntries(t.variables.map((v) => [v.name, v.max]));
    for (const values of [
      low,
      high,
      ...Array.from({ length: 20 }, () => sample(t)),
    ]) {
      const p = instantiate(t, values);
      assert.equal(p.answer.kind, "numeric");
      assert.ok(Number.isFinite(p.answer.value));
      assert.equal(
        evaluate(p, { value: String(p.answer.value), unit: t.unit }).correct,
        true,
      );
      assert.doesNotMatch(p.prompt + p.solution, /\{\{/);
      for (const m of p.solution.matchAll(/\$([^$]+)\$/g))
        assert.doesNotThrow(() =>
          katex.renderToString(m[1], { throwOnError: true }),
        );
    }
  }
});
test("formula values agree with independent numerical benchmarks", () => {
  const p = instantiate(astroPractice("hohmann"), { r1: 7000, r2: 18000 });
  const a = 12500;
  const expected =
    Math.sqrt(mu * (2 / 7000 - 1 / a)) -
    Math.sqrt(mu / 7000) +
    Math.sqrt(mu / 18000) -
    Math.sqrt(mu * (2 / 18000 - 1 / a));
  assert.equal(p.answer.value, expected);
  assert.equal(
    instantiate(visVivaPractice[0], { a: 12000, r: 8000 }).answer.value,
    Math.sqrt(mu * (2 / 8000 - 1 / 12000)),
  );
  assert.throws(
    () => instantiate(astroPractice("geometry"), { rp: 999999, ra: 16000 }),
    /range/,
  );
  assert.throws(
    () => calculate({ op: "divide", args: [1, 0] }, {}),
    /Non-finite/,
  );
  assert.throws(() => calculate({ op: "sqrt", args: [4, 9] }, {}), /arity/);
});
test("fresh sampling avoids the preceding parameter set", () => {
  for (const t of templates) {
    const previous = sample(t);
    assert.notDeepEqual(sample(t, previous), previous);
  }
});
test("offline, successful AI, invalid AI, refusal and provider failure preserve trustworthy answers", async () => {
  const oldKey = process.env.OPENAI_API_KEY,
    oldModel = process.env.OPENAI_MODEL;
  try {
    delete process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_MODEL;
    const offline = await generatePractice(
      visVivaPractice,
      {},
      async () => {
        throw new Error("Must not call provider");
      },
    );
    assert.equal(offline.source, "template");
    process.env.OPENAI_API_KEY = "test-not-a-real-key";
    process.env.OPENAI_MODEL = "test-model";
    let request: any;
    const provider: typeof fetch = async (_url, init) => {
      request = JSON.parse(String(init?.body));
      return Response.json({
        status: "completed",
        output: [
          {
            content: [
              {
                type: "output_text",
                text: JSON.stringify({
                  templateId: "vis-viva-variant",
                  parameters: [
                    { name: "a", value: 12000 },
                    { name: "r", value: 8000 },
                  ],
                }),
              },
            ],
          },
        ],
      });
    };
    const ai = await generatePractice(visVivaPractice, {}, provider);
    assert.equal(ai.source, "ai");
    assert.equal(ai.problem.answer.value, Math.sqrt(mu * (2 / 8000 - 1 / 12000)));
    assert.equal(request.store, false);
    assert.equal(request.text.format.strict, true);
    assert.ok(!("scratchpad" in JSON.parse(request.input)));
    const invalid: typeof fetch = async () =>
      Response.json({
        status: "completed",
        output: [
          {
            content: [
              {
                type: "output_text",
                text: JSON.stringify({
                  templateId: "vis-viva-variant",
                  parameters: [
                    { name: "a", value: 12000 },
                    { name: "r", value: 100 },
                  ],
                }),
              },
            ],
          },
        ],
      });
    assert.equal(
      (await generatePractice(visVivaPractice, {}, invalid)).source,
      "template",
    );
    const refusal: typeof fetch = async () =>
      Response.json({
        status: "completed",
        output: [{ content: [{ type: "refusal", refusal: "No" }] }],
      });
    assert.equal(
      (await generatePractice(visVivaPractice, {}, refusal)).source,
      "template",
    );
    const failure: typeof fetch = async () => new Response("", { status: 429 });
    assert.equal(
      (await generatePractice(visVivaPractice, {}, failure)).source,
      "template",
    );
  } finally {
    if (oldKey === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = oldKey;
    if (oldModel === undefined) delete process.env.OPENAI_MODEL;
    else process.env.OPENAI_MODEL = oldModel;
  }
});
