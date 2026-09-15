// Build-time switch between the full server app and the static GitHub Pages
// export. When PAGES_BASE_PATH is set (the Pages workflow sets it), the app is
// built as a browser-local static site: SQLite-backed API routes become inert
// handlers, while the client stores learner state and checked-template practice
// locally. AI-selected practice and shared server persistence remain server-only.
export const isStaticExport = Boolean(process.env.PAGES_BASE_PATH);