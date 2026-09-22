import { getReleases } from "./api.mjs";
export function report() {
  return { releases: getReleases() };
}
