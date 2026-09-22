import { getReleases } from "./api.mjs";
export function dashboard() {
  return "Latest: " + getReleases()[0];
}
