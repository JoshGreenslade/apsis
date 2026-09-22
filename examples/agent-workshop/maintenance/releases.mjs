export function visibleReleases(releases, query) {
  return releases.filter((release) => query.includeDrafts === "true" || release.status === "published");
}
