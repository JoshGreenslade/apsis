import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import pack from "../curricula/astrodynamics";
async function main() {
  const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  await context.addInitScript({
    content: `window.__tools={};Object.defineProperty(document,'modelContext',{value:{registerTool:function(t,o){window.__tools[t.name]=t;o.signal.addEventListener('abort',function(){if(window.__tools[t.name]===t)delete window.__tools[t.name];});}},configurable:true});`,
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await mkdir("../../work/qa-v2", { recursive: true });
  await page.goto(base);
  await page.getByLabel("Your course").selectOption("astrodynamics");
  await page
    .getByRole("heading", { name: "Understand an orbit. Then change it." })
    .waitFor();
  await page
    .getByRole("heading", { name: "What you’ll be able to do" })
    .waitFor();
  await page.screenshot({
    path: "../../work/qa-v2/overview.png",
    fullPage: true,
  });
  const nav = page.getByRole("navigation", { name: "Lessons" });
  await nav.getByRole("button", { name: /Escape & patched conics/ }).click();
  await page
    .getByRole("heading", {
      name: "What changes when a spacecraft leaves Earth’s neighborhood?",
    })
    .waitFor();
  assert.equal(await page.locator(".lesson-section").count(), 4);
  assert.ok((await page.locator(".katex").count()) > 0);
  await page
    .getByRole("button", { name: "Mark lesson as read", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Marked as read", exact: true })
    .waitFor();
  let state = (
    await (
      await context.request.get(base + "/api/progress?pack=astrodynamics")
    ).json()
  ).state;
  assert.equal(state.topics["patched-conics"].read, true);
  assert.equal(state.topics["patched-conics"].mastered, false);
  assert.deepEqual(state.topics["patched-conics"].passed, []);
  await nav.getByRole("button", { name: /Gravity, energy/ }).click();
  await page
    .getByRole("heading", {
      name: "Why doesn’t a spacecraft simply fall back to Earth?",
    })
    .waitFor();
  await page.screenshot({ path: "../../work/qa-v2/lesson.png" });
  await page.getByRole("link", { name: /Build the reasoning/ }).click();
  await page.locator(".reflection").first().locator("summary").click();
  assert.ok((await page.locator(".reflection[open]").count()) > 0);
  await page.screenshot({ path: "../../work/qa-v2/reasoning.png" });
  await page.getByLabel("Labels", { exact: true }).uncheck();
  assert.equal(await page.locator(".diagram svg text").count(), 0);
  await page.getByLabel("Labels", { exact: true }).check();
  await page.getByRole("link", { name: /See it in action/ }).click();
  await page
    .getByRole("heading", { name: "A circular low-Earth orbit", exact: true })
    .waitFor();
  await page.getByRole("button", { name: "Focus on reading" }).click();
  assert.equal(await page.locator("#practice-panel").count(), 0);
  await page
    .getByRole("button", { name: "Show practice", exact: true })
    .click();
  await page.getByRole("button", { name: "With support", exact: true }).click();
  const guided = page.locator(".practice-body form");
  assert.equal(await guided.count(), 2);
  const second = pack.topics[0].fadedExercise.steps[1];
  await guided
    .nth(1)
    .getByLabel("Answer value")
    .fill(String(second.answer.value));
  await guided.nth(1).getByLabel("Answer unit").fill("km/s");
  await guided.nth(1).getByLabel("Answer unit").press("Control+Enter");
  await page.locator(".faded-step").nth(1).getByText("Step 2 / 2").waitFor();
  await page.getByRole("button", { name: "Self-check", exact: true }).click();
  assert.equal(
    await page.getByRole("button", { name: "Need a hint?" }).count(),
    0,
  );
  for (const [index, p] of pack.topics[0].retrievalProblems.entries()) {
    const form = page.locator(".practice-body form").nth(index);
    if (p.answer.kind === "numeric") {
      await form.getByLabel("Answer value").fill(String(p.answer.value));
      await form.getByLabel("Answer unit").fill(p.answer.unit);
    } else
      await form
        .getByLabel(
          p.answer.options.find((o) => o.id === p.answer.value)!.label,
        )
        .check();
    await form.getByRole("button", { name: "Check answer" }).click();
    await form.getByText("Answer verified", { exact: true }).waitFor();
  }
  await page.getByText(/Knowledge checked. Next review/).waitFor();
  await page
    .getByLabel("Your thinking space", { exact: false })
    .fill("The burn changes energy; the coast exchanges speed for height.");
  await page.getByRole("button", { name: "Save notes" }).click();
  await page.getByText("Notes saved", { exact: true }).waitFor();
  await page
    .getByRole("button", { name: "Fresh question", exact: true })
    .click();
  const [response] = await Promise.all([
    page.waitForResponse(
      (r) =>
        r.url().endsWith("/api/practice") && r.request().method() === "POST",
    ),
    page.getByRole("button", { name: "Generate a similar question" }).click(),
  ]);
  assert.equal(response.status(), 200);
  const generated = await response.json();
  assert.equal(generated.source, "template");
  assert.ok(
    Math.abs(
      generated.problem.answer.value -
        Math.sqrt(
          398600.4418 *
            (2 / generated.parameters.r - 1 / generated.parameters.a),
        ),
    ) < 1e-10,
  );
  const form = page.locator(".extra-practice form");
  await form
    .getByLabel("Answer value")
    .fill(String(generated.problem.answer.value));
  await form.getByLabel("Answer unit").fill("m/s");
  await form.getByRole("button", { name: "Check answer" }).click();
  await form
    .getByText("Unit / reference-frame check", { exact: true })
    .waitFor();
  await form.getByLabel("Answer unit").fill("km/s");
  await form.getByRole("button", { name: "Check answer" }).click();
  await form.getByText("Verified", { exact: true }).waitFor();
  const [anotherResponse] = await Promise.all([
    page.waitForResponse(
      (r) =>
        r.url().endsWith("/api/practice") && r.request().method() === "POST",
    ),
    page.getByRole("button", { name: "Another similar question" }).click(),
  ]);
  const another = await anotherResponse.json();
  assert.notDeepEqual(another.parameters, generated.parameters);
  await page.screenshot({ path: "../../work/qa-v2/fresh-practice.png" });
  const other = await browser.newContext();
  const forbidden = await other.request.post(base + "/api/practice", {
    headers: { Origin: base },
    data: {
      type: "answer",
      id: generated.problem.id,
      submission: { value: "1", unit: "km/s" },
    },
  });
  assert.equal(forbidden.status(), 404);
  await other.close();
  const wrongOrigin = await context.request.post(base + "/api/practice", {
    headers: { Origin: "https://unrelated.example" },
    data: { type: "generate", packId: pack.id, topicId: "two-body" },
  });
  assert.equal(wrongOrigin.status(), 403);
  state = (
    await (
      await context.request.get(base + "/api/progress?pack=astrodynamics")
    ).json()
  ).state;
  assert.equal(state.topics["two-body"].mastered, true);
  assert.ok(!state.topics["two-body"].passed.includes("root"));
  await page.reload();
  await page.getByLabel("Your course").selectOption("astrodynamics");
  await nav.getByRole("button", { name: /Gravity, energy/ }).click();
  assert.equal(
    await page.getByLabel("Your thinking space", { exact: false }).inputValue(),
    "The burn changes energy; the coast exchanges speed for height.",
  );
  await page
    .getByRole("button", { name: "Mixed practice", exact: false })
    .click();
  await page
    .getByRole("heading", { name: "Mix the ideas together." })
    .waitFor();
  await page.getByRole("button", { name: "Skip for now" }).click();
  await page.getByText(/^QUESTION 2 OF /).waitFor();
  await page
    .getByLabel("Your course", { exact: true })
    .selectOption("foundations");
  await page
    .getByRole("heading", {
      name: /Build confidence in quantitative foundations/,
    })
    .waitFor();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "../../work/qa-v2/mobile-overview.png",
    fullPage: true,
  });
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  await page.getByRole("button", { name: "Start with the first idea" }).click();
  await page.screenshot({ path: "../../work/qa-v2/mobile-lesson.png" });
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  await page.getByRole("button", { name: "Open contents" }).click();
  await page.getByRole("button", { name: "Close contents" }).click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  const tool = await page.evaluate(() => {
    const t = (window as any).__tools.read_learning_progress;
    return t.execute({});
  });
  assert.equal(tool.lessonsUnlocked, true);
  assert.deepEqual(errors, []);
  await browser.close();
  console.log(
    "PASS: overview and outcomes, open final/full lessons, reading vs mastery, out-of-order practice, optional diagnostics, notes, fresh question creation/grading/isolation, mixed skips, responsive UI, WebMCP.",
  );
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
