import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { resolve, dirname } from "node:path";

// Run against npm run dev: the temporary course exercises real Webpack discovery.
async function main() {
  const id = "zz-prefab-smoke";
  const folder = resolve("curriculums", id);
  let created = false;
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  try {
    execFileSync(process.execPath, [
      "scripts/new-course.mjs",
      id,
      "Prefab smoke course",
    ]);
    created = true;
    const page = await browser.newPage();
    await page.goto(process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000");
    await page.getByLabel("Your course").selectOption(id);
    assert.equal(
      await page
        .getByText(
          /0 minutes|basic arithmetic|Explain a solution from beginning to end/,
        )
        .count(),
      0,
    );
    await page
      .getByRole("navigation", { name: "Lessons" })
      .getByRole("button")
      .click();
    await page
      .getByText("Replace this with your first lesson.", { exact: true })
      .waitFor();
    assert.equal(
      await page
        .getByRole("navigation", { name: "Within this lesson" })
        .getByRole("link")
        .count(),
      1,
    );
    assert.equal(
      await page.getByRole("navigation", { name: "Practice type" }).count(),
      0,
    );
    await page
      .getByLabel("Your thinking space", { exact: false })
      .fill("A reading-only lesson still has notes.");
    await page.getByRole("button", { name: "Save notes", exact: true }).click();
    await page.getByText("Notes saved", { exact: true }).waitFor();
    await page
      .getByRole("button", { name: "Mark lesson as read", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Marked as read", exact: true })
      .waitFor();
    const response = await page.request.get(
      `${process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000"}/api/progress?pack=${id}`,
    );
    const { state } = await response.json();
    assert.equal(state.topics.introduction.read, true);
    assert.equal(state.topics.introduction.mastered, false);
    assert.equal(
      state.scratchpads.introduction,
      "A reading-only lesson still has notes.",
    );
    console.log(
      "PASS: a newly scaffolded folder is discovered, renders without mandatory pacing or assessments, and saves notes/read progress.",
    );
  } finally {
    await browser.close();
    if (created) {
      assert.equal(dirname(folder), resolve("curriculums"));
      rmSync(folder, { recursive: true });
    }
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
