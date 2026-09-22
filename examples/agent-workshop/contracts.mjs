import { z } from "zod";

export const lookupShape = {
  service: z.enum(["releases"]).describe("Service whose current API contract is needed."),
};
export const lookupInput = z.object(lookupShape).strict();

const contract = Object.freeze({
  service: "releases",
  revision: "fixture-1",
  owner: "release-platform",
  source: "fixture://contracts/releases",
  requirement: "Only the exact query string includeDrafts=true includes drafts. All other values list published releases only.",
  scope: "Query parsing only. Authorization must be enforced separately.",
});

export function lookupContract(input) {
  lookupInput.parse(input);
  return { ...contract };
}
