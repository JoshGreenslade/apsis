// Build-time switch between the full server app and the static GitHub Pages
// export. When PAGES_BASE_PATH is set (the Pages workflow sets it), the app is
// built as a read-only static site: the SQLite-backed API routes become inert
// handlers that report the feature is unavailable, and the client components
// degrade gracefully to "you can still read every lesson".
export const isStaticExport = Boolean(process.env.PAGES_BASE_PATH);