import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";
import mathematics from "../curriculums/mathematics-for-physics";

// Run against the actual GitHub Pages export, including its /apsis asset path.
const root = path.resolve("out");
const mime: Record<string, string> = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};
const server = createServer((req, res) => {
  const pathname = new URL(req.url ?? "/", "http://localhost").pathname.replace(
    /^\/apsis(?=\/|$)/,
    "",
  );
  const file = path.join(
    root,
    pathname.endsWith("/") ? pathname + "index.html" : pathname,
  );
  if (
    !file.startsWith(root + path.sep) ||
    !existsSync(file) ||
    statSync(file).isDirectory()
  ) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.setHeader(
    "Content-Type",
    mime[path.extname(file)] ?? "application/octet-stream",
  );
  createReadStream(file).pipe(res);
});

async function main() {
  assert.ok(
    existsSync(path.join(root, "index.html")),
    "Build with PAGES_BASE_PATH=/apsis before this smoke test.",
  );
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    await page.goto(`http://127.0.0.1:${address.port}/apsis/`);
    await page.getByLabel("Your course").selectOption(mathematics.id);
    const lessons = page
      .getByRole("navigation", { name: "Lessons" })
      .getByRole("button");
    await lessons.last().waitFor();
    assert.equal(await lessons.count(), 45);
    const ids = [
      "trajectories",
      "two-body",
      "perturbation",
      "coordinate-fields",
      "vibrating-string",
      "transport-trajectories",
      "electrostatic-boundaries",
      "random-walk-diffusion",
      "least-squares",
    ];
    for (const id of ids) {
      const index = mathematics.topics.findIndex((topic) => topic.id === id);
      assert.ok(index >= 0, id);
      const topic = mathematics.topics[index];
      await lessons.nth(index).click();
      for (const section of topic.content.sections
        .flatMap((s) => s.blocks)
        .filter((b) => b.kind === "content")) {
        if (!section.title) continue;
        await page
          .getByRole("heading", { name: section.title, exact: true })
          .waitFor();
      }
      for (const example of topic.content.sections
        .flatMap((s) => s.blocks)
        .filter((b) => b.kind === "example"))
        await page
          .getByRole("heading", { name: example.title, exact: true })
          .first()
          .waitFor();
      for (const sidebar of topic.content.sections
        .flatMap((s) => s.blocks)
        .filter((b) => b.kind === "sidebar")) {
        const section = page
          .locator("details.deep-dive")
          .filter({
            has: page.locator("summary", { hasText: sidebar.heading }),
          });
        await section.locator("summary").click();
        await section.locator("p").first().waitFor({ state: "visible" });
        assert.equal(
          await section.locator(".katex-error").count(),
          0,
          `${id}: sidebar formulas`,
        );
      }
      assert.equal(
        await page.locator(".katex-error").count(),
        0,
        `${id}: formulas`,
      );
      assert.ok(await page.locator(".diagram svg").count(), `${id}: diagram`);
    }
    assert.deepEqual(errors, []);
    console.log(
      "All nine synthesis chapters are reachable without answering questions; theory, worked examples, diagrams and deep dives render in the 45-chapter Pages export.",
    );
  } finally {
    await browser.close();
    server.close();
  }
}
main().catch((error) => {
  console.error(error);
  server.close();
  process.exitCode = 1;
});
