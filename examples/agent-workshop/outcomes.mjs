import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile(new URL("./outcomes.json", import.meta.url), "utf8"));
console.log(data.provenance);
for (const configuration of new Set(data.runs.map((run) => run.configuration))) {
  const runs = data.runs.filter((run) => run.configuration === configuration);
  const accepted = runs.filter((run) => run.accepted).length;
  const totalCost = runs.reduce((sum, run) => sum + run.modelCost, 0);
  const reviewMinutes = runs.reduce((sum, run) => sum + run.reviewMinutes, 0);
  console.log(JSON.stringify({
    configuration, attempts: runs.length, accepted,
    totalCost: Number(totalCost.toFixed(2)), reviewMinutes,
    costPerAccepted: accepted ? Number((totalCost / accepted).toFixed(3)) : null,
  }));
}
