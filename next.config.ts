import type { NextConfig } from "next";
const config: NextConfig = {
  serverExternalPackages: ["node:sqlite"],
  // Static export for GitHub Pages. The workflow sets PAGES_BASE_PATH to the
  // repository's base path (e.g. "/apsis") so assets resolve under the Pages
  // subpath. When unset (local `next dev` / `next build`), the app runs at the
  // root with the full server (SQLite + API routes) intact.
  output: "export",
  basePath: process.env.PAGES_BASE_PATH,
  trailingSlash: true,
};
export default config;
