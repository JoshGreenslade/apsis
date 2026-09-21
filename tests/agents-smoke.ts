import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import course from "../curriculums/agentic-engineering";
async function main() {
  const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
  const browser = await chromium.launch({
    channel: process.env.BROWSER_CHANNEL ?? "msedge",
    headless: true,
  });
  try {
    const context = await browser.newContext({
        viewport: { width: 1440, height: 1000 },
      }),
      page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await mkdir("../../work/qa-agents", { recursive: true });
    await page.goto(base);
    await page.getByLabel("Your course").selectOption(course.id);
    await page
      .getByRole("heading", { name: course.overview!.headline })
      .waitFor();
    assert.equal(
      await page.locator(`#curriculum option[value="${course.id}"]`).count(),
      1,
    );
    const nav = page.getByRole("navigation", { name: "Lessons" });
    assert.equal(await nav.getByRole("button").count(), 15);
    await page.screenshot({ path: "../../work/qa-agents/overview.png" });
    // Every authored lesson must render with no gates and its complete exposition.
    for (const topic of course.topics) {
      await nav
        .getByRole("button", {
          name: new RegExp(topic.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
        })
        .click();
      await page
        .getByRole("heading", { name: topic.heading!, exact: true })
        .waitFor();
      assert.equal(
        await page.locator(".content-prose h3").count(),
        topic.content.sections
          .flatMap((s) => s.blocks)
          .filter((b) => b.kind === "content" && b.title).length,
        topic.id,
      );
      assert.equal(
        await page.locator(".worked-step").count(),
        topic.content.sections
          .flatMap((s) => s.blocks)
          .flatMap((b) => (b.kind === "example" ? b.steps : [])).length,
        topic.id,
      );
      assert.equal(
        await page.locator(".practical-lab").count(),
        topic.content.sections
          .flatMap((s) => s.blocks)
          .filter((b) => b.kind === "lab").length,
        topic.id,
      );
    }
    await page
      .getByRole("button", { name: "Mark lesson as read", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Marked as read", exact: true })
      .waitFor();
    const state = (
      await (
        await context.request.get(base + "/api/progress?pack=" + course.id)
      ).json()
    ).state;
    assert.equal(state.topics.graduation.read, true);
    assert.equal(state.topics.graduation.mastered, false);
    await nav.getByRole("button", { name: /Build a tiny harness/ }).click();
    await page
      .getByRole("button", { name: "Focus on reading", exact: true })
      .click();
    await page.locator(".lesson-jumps a").last().click();
    await page.locator(".practical-lab summary").click();
    await page
      .getByRole("link", { name: "the lab kit", exact: true })
      .waitFor();
    const kit = await context.request.get(base + "/agent-labs/agent-labs.zip");
    assert.equal(kit.status(), 200);
    assert.equal((await kit.body()).subarray(0, 2).toString(), "PK");
    await page.screenshot({ path: "../../work/qa-agents/harness-lab.png" });
    await nav.getByRole("button", { name: /Models/ }).click();
    await page
      .getByRole("button", { name: "Show practice", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Fresh question", exact: true })
      .click();
    assert.equal(
      await page
        .getByRole("button", { name: "Generate a similar question" })
        .count(),
      0,
    );
    await page
      .getByRole("button", { name: "Try the supported question", exact: true })
      .click();
    await page.locator(".faded-step").first().waitFor();
    await page.getByRole("button", { name: "Self-check", exact: true }).click();
    const first = page.locator(".practice-body form").first(),
      problem = course.topics[0].retrievalProblems[0];
    if (problem.answer.kind !== "choice")
      throw new Error("Expected a conceptual question");
    const correct = problem.answer.options.find(
      (o) => o.id === problem.answer.value,
    )!;
    await first.getByText(correct.label, { exact: true }).click();
    await first.getByRole("button", { name: "Check answer" }).click();
    await first.getByText("Verified", { exact: true }).waitFor();
    await page.screenshot({ path: "../../work/qa-agents/lesson.png" });
    await nav.getByRole("button", { name: /Economics/ }).click();
    await page
      .getByRole("button", { name: "Fresh question", exact: true })
      .click();
    const [r] = await Promise.all([
      page.waitForResponse(
        (r) =>
          r.url().endsWith("/api/practice") && r.request().method() === "POST",
      ),
      page.getByRole("button", { name: "Generate a similar question" }).click(),
    ]);
    assert.equal(r.status(), 200);
    const data = await r.json();
    assert.equal(
      data.problem.answer.value,
      (data.parameters.machine + data.parameters.minutes) /
        data.parameters.accepted,
    );
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator(".lesson-jumps a").last().click();
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    await page.screenshot({ path: "../../work/qa-agents/mobile-lab.png" });
    assert.deepEqual(errors, []);
    console.log(
      "PASS: all 15 consolidated chapters, practicals, course discovery, open reading, conceptual grading, lab download, fresh economics, mobile layout and no browser errors.",
    );
  } finally {
    await browser.close();
  }
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
