import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { defineCourse, defineCurriculumTopic } from "../prefabs/authoring";
import { LessonContentSchema } from "../prefabs/schema";
import Renderer from "../prefabs/Renderer";

const content = {
  sections: [
    {
      id: "one",
      title: "Start here",
      blocks: [{ kind: "content" as const, body: "A short lesson." }],
    },
  ],
};
test("a minimal course needs no pace, question quota, sources or teaching sequence", () => {
  const course = defineCourse({
    id: "minimal",
    version: "1",
    title: "Minimal",
    description: "A test",
    topics: [{ id: "one", title: "One", content }],
  });
  assert.equal(course.topics[0].minutes, undefined);
  assert.deepEqual(course.topics[0].retrievalProblems, []);
  assert.deepEqual(course.topics[0].sources, []);
  assert.equal(course.topics[0].content.sections.length, 1);
  assert.match(
    renderToStaticMarkup(
      createElement(Renderer, { content: course.topics[0].content }),
    ),
    /A short lesson/,
  );
});

test("prefabs can repeat and appear in any authored order", () => {
  const lesson = defineCurriculumTopic({
    id: "mixed",
    title: "Mixed",
    content: {
      sections: [
        {
          id: "mixed",
          title: "Mixed",
          blocks: [
            { kind: "question", question: "First?", answer: "Yes." },
            { kind: "content", body: "Then an explanation." },
            { kind: "question", question: "Another?", answer: "Optional." },
          ],
        },
      ],
    },
  });
  const html = renderToStaticMarkup(
    createElement(Renderer, { content: lesson.content }),
  );
  assert.ok(html.indexOf("First?") < html.indexOf("Then an explanation."));
  assert.ok(html.indexOf("Then an explanation.") < html.indexOf("Another?"));
});

test("duplicate section IDs and unknown prefabs fail validation", () => {
  assert.throws(
    () =>
      LessonContentSchema.parse({
        sections: [content.sections[0], content.sections[0]],
      }),
    /unique/,
  );
  assert.throws(() =>
    LessonContentSchema.parse({
      sections: [
        {
          ...content.sections[0],
          blocks: [{ kind: "typo", body: "Lost content" }],
        },
      ],
    }),
  );
});

test("every course follows the same folder contract and renders through the prefab renderer", async () => {
  const folders = readdirSync("curriculums", { withFileTypes: true }).filter(
    (e) => e.isDirectory(),
  );
  for (const folder of folders) {
    for (const required of ["course.json", "index.ts", "lessons"])
      assert.ok(readdirSync(`curriculums/${folder.name}`).includes(required));
    const { default: course } = await import(
      `../curriculums/${folder.name}/index.ts`
    );
    const validated = defineCourse(course);
    assert.equal(validated.id, folder.name);
    assert.equal(
      readdirSync(`curriculums/${folder.name}/lessons`).length,
      validated.topics.length,
    );
    for (const topic of validated.topics) {
      const html = renderToStaticMarkup(
        createElement(Renderer, { content: topic.content }),
      );
      assert.ok(html.length > 0, `${validated.id}/${topic.id}`);
    }
  }
});
