import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
export function summarise(csv, hourlyRate = 60) {
  if (!Number.isFinite(hourlyRate) || hourlyRate < 0)
    throw new Error("Hourly rate must be nonnegative");
  const lines = csv.trim().split(/\r?\n/);
  const header =
    "task,system,accepted,interventions,human_minutes,elapsed_minutes,machine_cost,regressions,unnecessary_changes";
  if (lines.shift() !== header) throw new Error("Use the supplied CSV header");
  const systems = new Map();
  for (const line of lines) {
    // Deliberately simple format: names must not contain commas, quotes or newlines.
    if (line.includes('"'))
      throw new Error("Use plain names without quotes or commas");
    const parts = line.split(",");
    if (
      parts.length !== 9 ||
      !parts[0] ||
      !parts[1] ||
      !["true", "false"].includes(parts[2])
    )
      throw new Error("Invalid CSV row");
    const nums = parts.slice(3).map(Number);
    if (
      parts.slice(3).some((v) => !v.trim()) ||
      nums.some((n) => !Number.isFinite(n) || n < 0)
    )
      throw new Error("Invalid numeric value");
    const [
      interventions,
      humanMinutes,
      elapsedMinutes,
      machineCost,
      regressions,
      unnecessaryChanges,
    ] = nums;
    if (
      ![interventions, regressions, unnecessaryChanges].every(Number.isInteger)
    )
      throw new Error("Count fields must be integers");
    const s = systems.get(parts[1]) ?? {
      system: parts[1],
      attempts: 0,
      accepted: 0,
      autonomousAccepted: 0,
      interventions: 0,
      humanMinutes: 0,
      elapsedMinutes: 0,
      machineCost: 0,
      regressions: 0,
      unnecessaryChanges: 0,
    };
    const accepted = parts[2] === "true";
    s.attempts++;
    s.accepted += Number(accepted);
    s.autonomousAccepted += Number(accepted && interventions === 0);
    s.interventions += interventions;
    s.humanMinutes += humanMinutes;
    s.elapsedMinutes += elapsedMinutes;
    s.machineCost += machineCost;
    s.regressions += regressions;
    s.unnecessaryChanges += unnecessaryChanges;
    systems.set(parts[1], s);
  }
  return [...systems.values()].map((s) => {
    const totalCost = s.machineCost + (s.humanMinutes / 60) * hourlyRate;
    return {
      ...s,
      acceptanceRate: s.accepted / s.attempts,
      totalCost,
      costPerAccepted: s.accepted ? totalCost / s.accepted : null,
      meanElapsedMinutes: s.elapsedMinutes / s.attempts,
    };
  });
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const csv = await readFile(
    process.argv[2] ?? new URL("./runs.csv", import.meta.url),
    "utf8",
  );
  console.log(
    JSON.stringify(
      {
        notice:
          "Descriptive pilot summary. Example CSV rows are fictional. Failed attempts remain included; latency is separate from labour. Setup and maintenance must be added to your records.",
        systems: summarise(csv, Number(process.argv[3] ?? 60)),
      },
      null,
      2,
    ),
  );
}
