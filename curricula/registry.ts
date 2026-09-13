import { validatePack } from "@/lib/curriculum-engine";
import type { CurriculumPack } from "@/types/curriculum";
// Webpack context creates lazy chunks for every curriculum module. Add a default
// CurriculumPack export to this directory; no UI or registry edits are required.
const modules = require.context(
  "./",
  false,
  /^(?!.*(?:registry|helpers)\.).*\.ts$/,
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
