import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { loadCurricula } from "@/curricula/registry";
import { generatePractice } from "@/lib/practice-generator";
import { evaluate } from "@/lib/curriculum-engine";
import { getPractice, reservePractice, storePractice } from "@/lib/store";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const schema = z.discriminatedUnion("type", [
  z
    .object({
      type: z.literal("generate"),
      packId: z.string().max(100),
      topicId: z.string().max(100),
      previous: z.record(z.string().max(40), z.number().finite()).optional(),
    })
    .strict(),
  z
    .object({
      type: z.literal("answer"),
      id: z.uuid(),
      submission: z
        .object({
          value: z.string().max(200),
          unit: z.string().max(40).optional(),
        })
        .strict(),
    })
    .strict(),
]);
export async function GET() {
  return NextResponse.json(
    { aiAvailable: !!(process.env.OPENAI_API_KEY && process.env.OPENAI_MODEL) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
export async function POST(req: NextRequest) {
  const origin =
    process.env.APP_ORIGIN ??
    `${req.nextUrl.protocol}//${req.headers.get("host")}`;
  if (req.headers.get("origin") !== origin)
    return NextResponse.json(
      { error: "Origin is not allowed" },
      { status: 403 },
    );
  const cookie = req.cookies.get("learner")?.value;
  const session =
    cookie && z.uuid().safeParse(cookie).success ? cookie : randomUUID();
  const respond = (data: unknown, status = 200) => {
    const r = NextResponse.json(data, {
      status,
      headers: { "Cache-Control": "no-store" },
    });
    r.cookies.set("learner", session, {
      httpOnly: true,
      sameSite: "strict",
      secure: origin.startsWith("https:"),
      path: "/",
      maxAge: 31536000,
    });
    return r;
  };
  try {
    const raw = await req.text();
    if (raw.length > 12000) return respond({ error: "Request too large" }, 413);
    const parsed = schema.safeParse(JSON.parse(raw));
    if (!parsed.success)
      return respond({ error: "Invalid practice request" }, 400);
    const body = parsed.data;
    if (body.type === "answer") {
      const problem = getPractice(session, body.id);
      if (!problem)
        return respond(
          { error: "This practice question has expired. Generate another." },
          404,
        );
      return respond({ feedback: evaluate(problem, body.submission) });
    }
    const pack = (await loadCurricula()).find((p) => p.id === body.packId),
      topic = pack?.topics.find((t) => t.id === body.topicId);
    if (!topic) return respond({ error: "Unknown lesson" }, 404);
    if (!topic.practiceTemplates?.length)
      return respond(
        {
          error:
            "Extra practice is not available for this lesson yet. The set questions are ready to use.",
        },
        422,
      );
    if (!reservePractice(session))
      return respond(
        {
          error:
            "The practice-generation limit has been reached. Try the set questions and return later.",
        },
        429,
      );
    const generated = await generatePractice(
      topic.practiceTemplates,
      body.previous,
    );
    storePractice(session, pack!.id, topic.id, generated.problem);
    return respond(generated);
  } catch (error) {
    if (error instanceof SyntaxError)
      return respond({ error: "Invalid JSON" }, 400);
    console.error(
      "Practice generation failed",
      error instanceof Error ? error.message : "Unknown error",
    );
    return respond(
      { error: "Could not create a practice question. Please try again." },
      500,
    );
  }
}
