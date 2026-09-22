export type Release = {
  version: string;
  status: "published" | "draft";
  summary: string;
};

const releases: Release[] = [
  { version: "2.1.0", status: "published", summary: "Export completed reports." },
  { version: "2.2.0", status: "draft", summary: "Preview: scheduled exports." },
];

export function listReleases(query: { includeDrafts?: string }): Release[] {
  const includeDrafts = Boolean(query.includeDrafts);
  return releases.filter((release) => includeDrafts || release.status === "published");
}
