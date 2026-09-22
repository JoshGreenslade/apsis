import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export function checkParameterName(text) {
  const stale = /\bshowDrafts\s*=\s*true\b/.test(text);
  return { accepted: !stale, reason: stale ? "Stale query parameter showDrafts=true" : "No obsolete query spelling found" };
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const path = process.argv[2];
  if (!path) throw new Error("Supply an API document path");
  const result = checkParameterName(await readFile(path, "utf8"));
  console.log(JSON.stringify(result));
  process.exitCode = result.accepted ? 0 : 1;
}
