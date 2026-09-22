import { readFile } from "node:fs/promises";
import { checkParameterName } from "./maintenance/check-docs.mjs";

const cases = JSON.parse(await readFile(new URL("./evaluation-cases.json", import.meta.url), "utf8"));
let correct = 0;
for (const item of cases) {
  const predicted = !checkParameterName(item.document).accepted;
  const matches = predicted === item.actionableDrift;
  correct += Number(matches);
  console.log(JSON.stringify({ id: item.id, predicted, expected: item.actionableDrift, matches, reason: item.reason }));
}
console.log("Correct classifications: " + correct + "/" + cases.length);
console.log("This evaluates the mechanical checker on teaching cases, not an AI model.");
