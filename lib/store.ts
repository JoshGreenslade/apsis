import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { applyAction } from "./curriculum-engine";
import type {
  CurriculumPack,
  LearnerState,
  LearningAction,
  Problem,
} from "@/types/curriculum";
let db: DatabaseSync | undefined;
function database() {
  if (!db) {
    const path = resolve(
      process.env.CURRICULUM_DB_PATH ?? ".data/mastery.sqlite",
    );
    mkdirSync(dirname(path), { recursive: true });
    db = new DatabaseSync(path);
    db.exec(
      "PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS learners(session TEXT NOT NULL, pack TEXT NOT NULL, version TEXT NOT NULL, state TEXT NOT NULL, updated TEXT NOT NULL, PRIMARY KEY(session,pack,version));",
    );
    db.exec(
      "CREATE TABLE IF NOT EXISTS practice(id TEXT PRIMARY KEY, session TEXT NOT NULL, pack TEXT NOT NULL, topic TEXT NOT NULL, problem TEXT NOT NULL, created INTEGER NOT NULL); CREATE TABLE IF NOT EXISTS practice_limits(bucket TEXT PRIMARY KEY, count INTEGER NOT NULL);",
    );
  }
  return db;
}
export function storePractice(
  session: string,
  pack: string,
  topic: string,
  problem: Problem,
) {
  database()
    .prepare("INSERT INTO practice VALUES(?,?,?,?,?,?)")
    .run(problem.id, session, pack, topic, JSON.stringify(problem), Date.now());
  database()
    .prepare("DELETE FROM practice WHERE created<?")
    .run(Date.now() - 7 * 86400000);
}
export function getPractice(session: string, id: string): Problem | undefined {
  const row = database()
    .prepare("SELECT problem FROM practice WHERE id=? AND session=?")
    .get(id, session) as { problem: string } | undefined;
  return row ? JSON.parse(row.problem) : undefined;
}
export function reservePractice(session: string, now = Date.now()): boolean {
  const db = database(),
    hour = Math.floor(now / 3600000);
  db.exec("BEGIN IMMEDIATE");
  try {
    for (const [bucket, max] of [
      [`global:${hour}`, 60],
      [`${session}:${hour}`, 30],
    ] as const) {
      const row = db
        .prepare("SELECT count FROM practice_limits WHERE bucket=?")
        .get(bucket) as { count: number } | undefined;
      if ((row?.count ?? 0) >= max) {
        db.exec("ROLLBACK");
        return false;
      }
    }
    for (const bucket of [`global:${hour}`, `${session}:${hour}`])
      db.prepare(
        "INSERT INTO practice_limits VALUES(?,1) ON CONFLICT(bucket) DO UPDATE SET count=count+1",
      ).run(bucket);
    db.prepare(
      "DELETE FROM practice_limits WHERE CAST(substr(bucket,instr(bucket,':')+1) AS INTEGER)<?",
    ).run(hour - 24);
    db.exec("COMMIT");
    return true;
  } catch (e) {
    db.exec("ROLLBACK");
    throw e;
  }
}
export function readState(session: string, pack: CurriculumPack): LearnerState {
  const row = database()
    .prepare(
      "SELECT state FROM learners WHERE session=? AND pack=? AND version=?",
    )
    .get(session, pack.id, pack.version) as { state: string } | undefined;
  return row ? JSON.parse(row.state) : { topics: {}, scratchpads: {} };
}
export function updateState(
  session: string,
  pack: CurriculumPack,
  action: LearningAction,
) {
  const db = database();
  db.exec("BEGIN IMMEDIATE");
  try {
    const result = applyAction(pack, readState(session, pack), action);
    db.prepare(
      "INSERT INTO learners VALUES(?,?,?,?,?) ON CONFLICT(session,pack,version) DO UPDATE SET state=excluded.state,updated=excluded.updated",
    ).run(
      session,
      pack.id,
      pack.version,
      JSON.stringify(result.state),
      new Date().toISOString(),
    );
    db.exec("COMMIT");
    return result;
  } catch (e) {
    db.exec("ROLLBACK");
    throw e;
  }
}
