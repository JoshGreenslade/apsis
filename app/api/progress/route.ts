import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { loadCurricula } from "@/curricula/registry";
import { readState, updateState } from "@/lib/store";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const actionSchema = z.discriminatedUnion("type", [
  z
    .object({
      type: z.literal("read"),
      topicId: z.string().max(100),
      read: z.boolean(),
    })
    .strict(),
  z
    .object({ type: z.literal("advance"), topicId: z.string().max(100) })
    .strict(),
  z
    .object({
      type: z.literal("scratchpad"),
      topicId: z.string().max(100),
      text: z.string().max(20000),
    })
    .strict(),
  z
    .object({
      type: z.literal("answer"),
      topicId: z.string().max(100),
      problemId: z.string().max(100),
      submission: z
        .object({
          value: z.string().max(200),
          unit: z.string().max(40).optional(),
        })
        .strict(),
      review: z.boolean().optional(),
    })
    .strict(),
]);
function session(req: NextRequest) {
  const value = req.cookies.get("learner")?.value;
  return value && z.uuid().safeParse(value).success ? value : randomUUID();
}
function respond(data: unknown, id: string, req: NextRequest, status = 200) {
  const res = NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
  res.cookies.set("learner", id, {
    httpOnly: true,
    sameSite: "strict",
    secure:
      process.env.APP_ORIGIN?.startsWith("https://") ||
      req.nextUrl.protocol === "https:",
    path: "/",
    maxAge: 31536000,
  });
  return res;
}
export async function GET(req: NextRequest) {
  const id = session(req);
  const pack = (await loadCurricula()).find(
    (p) => p.id === req.nextUrl.searchParams.get("pack"),
  );
  if (!pack) return respond({ error: "Unknown curriculum" }, id, req, 404);
  return respond({ state: readState(id, pack) }, id, req);
}
export async function POST(req: NextRequest) {
  // Next may normalize its internal URL to localhost; compare the browser's
  // actual Host, or an explicitly configured public origin behind a proxy.
  const origin =
    process.env.APP_ORIGIN ??
    `${req.nextUrl.protocol}//${req.headers.get("host")}`;
  if (req.headers.get("origin") !== origin)
    return NextResponse.json(
      { error: "Origin is not allowed" },
      { status: 403 },
    );
  const id = session(req);
  let body: unknown;
  try {
    const raw = await req.text();
    if (raw.length > 25000)
      return respond({ error: "Request too large" }, id, req, 413);
    body = JSON.parse(raw);
  } catch {
    return respond({ error: "Invalid JSON" }, id, req, 400);
  }
  const parsed = z
    .object({ packId: z.string().max(100), action: actionSchema })
    .strict()
    .safeParse(body);
  if (!parsed.success)
    return respond({ error: "Invalid learning action" }, id, req, 400);
  const pack = (await loadCurricula()).find((p) => p.id === parsed.data.packId);
  if (!pack) return respond({ error: "Unknown curriculum" }, id, req, 404);
  try {
    return respond(updateState(id, pack, parsed.data.action), id, req);
  } catch (error) {
    if (
      error instanceof Error &&
      /Unknown topic|unavailable|already complete|preceding step|current checks/.test(
        error.message,
      )
    )
      return respond({ error: error.message }, id, req, 409);
    console.error("Progress update failed", error);
    return respond(
      { error: "Progress could not be saved. Please retry." },
      id,
      req,
      500,
    );
  }
}
