import test from "node:test";
import assert from "node:assert/strict";
import { summarise } from "./evaluate.mjs";
const header =
  "task,system,accepted,interventions,human_minutes,elapsed_minutes,machine_cost,regressions,unnecessary_changes\n";
test("counts failed work, assistance and total cost independently of latency", () => {
  const [s] = summarise(
    header + "one,a,true,0,5,20,4,0,0\ntwo,a,false,2,15,30,6,1,2",
    60,
  );
  assert.equal(s.attempts, 2);
  assert.equal(s.accepted, 1);
  assert.equal(s.autonomousAccepted, 1);
  assert.equal(s.totalCost, 30);
  assert.equal(s.costPerAccepted, 30);
  assert.equal(s.meanElapsedMinutes, 25);
  assert.equal(s.regressions, 1);
  assert.equal(s.unnecessaryChanges, 2);
});
test("no accepted results is not zero cost and malformed rows fail clearly", () => {
  assert.equal(
    summarise(header + "one,a,false,0,0,1,2,0,0")[0].costPerAccepted,
    null,
  );
  assert.throws(() => summarise(header + "one,a,true,0,,1,2,0,0"));
  assert.throws(() => summarise(header + "one,a,true,0,-1,1,2,0,0"));
});
