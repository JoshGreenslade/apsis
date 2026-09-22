import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { openQueue } from "./queue.mjs";

const directory = mkdtempSync(join(tmpdir(), "apsis-fleet-"));
let time = 0;
const queue = openQueue(join(directory, "queue.sqlite"), { now: () => time });
try {
  console.log("SCRIPTED workers: demonstrates coordination, not model performance.");
  queue.add("provider");
  queue.add("dashboard", ["provider"]);
  queue.add("report", ["provider"]);
  queue.add("remove-alias", ["dashboard", "report"]);
  const provider = queue.claim();
  queue.complete(provider, { simulated: true, revision: "provider-ready" });
  const lostWorker = queue.claim();
  const report = queue.claim();
  console.log("Capacity reached:", queue.claim() === null);
  queue.complete(report, { simulated: true, revision: "report-ready" });
  time = 1001;
  const replacement = queue.claim();
  try { queue.complete(lostWorker, { simulated: true }); }
  catch (error) { console.log("Old worker rejected:", error.message); }
  queue.complete(replacement, { simulated: true, revision: "dashboard-ready" });
  const integration = queue.claim();
  queue.complete(integration, { simulated: true, revision: "integrated" });
  console.log(JSON.stringify(queue.snapshot(), null, 2));
} finally {
  queue.close();
  rmSync(directory, { recursive: true, force: true });
}
