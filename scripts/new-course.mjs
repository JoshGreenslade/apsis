import { mkdirSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const [id, suppliedTitle] = process.argv.slice(2);
if (!id || !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(id)) {
  console.error('Usage: npm run course:new -- course-id "Course title"');
  process.exit(1);
}
const title =
  suppliedTitle ||
  id
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
const root = resolve(
  fileURLToPath(new URL("../curriculums/", import.meta.url)),
  id,
);
// Exclusive directory creation refuses to overwrite an existing course.
mkdirSync(root);
mkdirSync(join(root, "lessons"));
const json = (name, data) =>
  writeFileSync(join(root, name), JSON.stringify(data, null, 2) + "\n", {
    flag: "wx",
  });
json("course.json", {
  id,
  version: "1.0.0",
  title,
  description: `An introduction to ${title}.`,
});
json("lessons/introduction.json", {
  id: "introduction",
  title: "Introduction",
  content: {
    sections: [
      {
        id: "opening",
        title: "Start here",
        blocks: [
          { kind: "content", body: "Replace this with your first lesson." },
        ],
      },
    ],
  },
});
writeFileSync(
  join(root, "index.ts"),
  `import { defineCourse } from "@/prefabs/authoring";
import course from "./course.json";
import introduction from "./lessons/introduction.json";

export default defineCourse({ ...course, topics: [introduction] });
`,
  { flag: "wx" },
);
console.log(
  `Created curriculums/${id}. Edit the lesson and run npm run build.`,
);
