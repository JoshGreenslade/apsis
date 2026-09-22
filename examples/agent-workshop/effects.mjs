import { DatabaseSync } from "node:sqlite";

export function openEffects(path) {
  const db = new DatabaseSync(path);
  db.exec("CREATE TABLE IF NOT EXISTS proposals (request_id TEXT PRIMARY KEY, body TEXT NOT NULL)");
  return {
    propose(requestId, body, loseResponse = false) {
      if (!requestId || typeof body !== "string" || !body) throw new Error("Request ID and body required");
      db.exec("BEGIN IMMEDIATE");
      try {
        const existing = db.prepare("SELECT body FROM proposals WHERE request_id = ?").get(requestId);
        if (existing && existing.body !== body) throw new Error("Key already used with different content");
        if (!existing) db.prepare("INSERT INTO proposals VALUES (?, ?)").run(requestId, body);
        db.exec("COMMIT");
      } catch (error) {
        db.exec("ROLLBACK");
        throw error;
      }
      if (loseResponse) throw new Error("Simulated lost response after commit");
      return db.prepare("SELECT request_id, body FROM proposals WHERE request_id = ?").get(requestId);
    },
    count: () => db.prepare("SELECT COUNT(*) AS n FROM proposals").get().n,
    close: () => db.close(),
  };
}
