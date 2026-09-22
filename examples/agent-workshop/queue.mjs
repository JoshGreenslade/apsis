import { DatabaseSync } from "node:sqlite";
import { randomUUID } from "node:crypto";

export function openQueue(path, { capacity = 2, leaseMs = 1000, now = Date.now } = {}) {
  if (!Number.isInteger(capacity) || capacity < 1 || !Number.isFinite(leaseMs) || leaseMs <= 0) {
    throw new Error("Positive capacity and lease duration required");
  }
  const db = new DatabaseSync(path);
  db.exec("PRAGMA busy_timeout=1000");
  db.exec("CREATE TABLE IF NOT EXISTS jobs (id TEXT PRIMARY KEY, status TEXT NOT NULL, token TEXT, expires INTEGER, result TEXT)");
  db.exec("CREATE TABLE IF NOT EXISTS dependencies (job TEXT, needs TEXT, PRIMARY KEY (job, needs))");
  const transaction = (fn) => {
    db.exec("BEGIN IMMEDIATE");
    try { const value = fn(); db.exec("COMMIT"); return value; }
    catch (error) { db.exec("ROLLBACK"); throw error; }
  };
  return {
    add(id, needs = []) {
      if (typeof id !== "string" || !id) throw new Error("Job ID required");
      transaction(() => {
        for (const dependency of needs) {
          if (!db.prepare("SELECT id FROM jobs WHERE id = ?").get(dependency)) throw new Error("Add dependencies first");
        }
        db.prepare("INSERT INTO jobs (id, status) VALUES (?, 'queued')").run(id);
        for (const dependency of needs) db.prepare("INSERT INTO dependencies VALUES (?, ?)").run(id, dependency);
      });
    },
    claim() {
      return transaction(() => {
        const time = now();
        db.prepare("UPDATE jobs SET status='queued', token=NULL, expires=NULL WHERE status='leased' AND expires <= ?").run(time);
        const active = db.prepare("SELECT COUNT(*) AS n FROM jobs WHERE status='leased'").get().n;
        if (active >= capacity) return null;
        const job = db.prepare("SELECT j.id FROM jobs j WHERE j.status='queued' AND NOT EXISTS (SELECT 1 FROM dependencies d JOIN jobs p ON p.id=d.needs WHERE d.job=j.id AND p.status != 'done') ORDER BY j.rowid LIMIT 1").get();
        if (!job) return null;
        const token = randomUUID();
        const expires = time + leaseMs;
        db.prepare("UPDATE jobs SET status='leased', token=?, expires=? WHERE id=?").run(token, expires, job.id);
        return { id: job.id, token, expires };
      });
    },
    complete(lease, result) {
      const updated = db.prepare("UPDATE jobs SET status='done', result=?, token=NULL, expires=NULL WHERE id=? AND status='leased' AND token=? AND expires > ?")
        .run(JSON.stringify(result), lease.id, lease.token, now());
      if (updated.changes !== 1) throw new Error("Stale or expired lease");
    },
    snapshot: () => db.prepare("SELECT id, status, result FROM jobs ORDER BY rowid").all(),
    close: () => db.close(),
  };
}
