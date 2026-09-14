import { validatePack } from "@/lib/curriculum-engine";
import type { CurriculumPack } from "@/types/curriculum";
// Each curriculum is a self-contained folder with a default CurriculumPack export
// from its index.ts. Webpack creates one lazy chunk per curriculum folder; adding a
// new curriculum is just adding a new folder here, no registry or UI edits required.
const modules = require.context(
  "./",
  true,
  /^\.\/[^/]+\/index\.ts$/,
  "lazy",
) as { keys(): string[]; (key: string): Promise<{ default: unknown }> };
let cached: Promise<CurriculumPack[]> | undefined;
export function loadCurricula(): Promise<CurriculumPack[]> {
  return (cached ??= Promise.all(
    modules
      .keys()
      .map(async (key) => validatePack((await modules(key)).default)),
  ).then((packs) => {
    if (new Set(packs.map((p) => p.id)).size !== packs.length)
      throw new Error("Duplicate curriculum ID");
    return packs.sort((a, b) => a.title.localeCompare(b.title));
  }));
}
