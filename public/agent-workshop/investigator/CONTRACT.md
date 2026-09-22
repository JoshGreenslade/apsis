# Release listing contract

This is a local simulation of the query-processing part of an HTTP endpoint.
It does not start a server or implement authentication.

`listReleases` receives parsed query values as strings. Only the exact value
`includeDrafts=true` includes draft releases. An omitted parameter, `false`,
an empty value and unrecognised values return published releases only.

In a real service, the right to read drafts would also require authorization.
This exercise concerns interpreting the query, not granting that right.

## Reported issue

The dashboard supplies `includeDrafts=false` but displays an unreleased feature.
Omitting the query parameter hides the feature. Investigate the discrepancy and
propose the smallest change consistent with this contract. Preserve the true
case and check unrecognised input. Do not change the contract to match the bug.
