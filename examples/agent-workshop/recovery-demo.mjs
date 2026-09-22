import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { openEffects } from "./effects.mjs";

const directory = mkdtempSync(join(tmpdir(), "apsis-recovery-"));
const path = join(directory, "effects.sqlite");
try {
  let effects = openEffects(path);
  try {
    effects.propose("investigation-1", "Compare includeDrafts with exact true", true);
  } catch (error) {
    console.log(error.message);
  } finally {
    effects.close();
  }
  effects = openEffects(path);
  try {
    console.log("Recovered:", effects.propose("investigation-1", "Compare includeDrafts with exact true"));
    console.log("Stored proposals:", effects.count());
  } finally {
    effects.close();
  }
} finally {
  rmSync(directory, { recursive: true, force: true });
}
