import { defineCourse } from "@/prefabs/authoring";
import course from "./course.json";
import lesson1 from "./lessons/models.json";
import lesson2 from "./lessons/harnesses.json";
import lesson3 from "./lessons/context.json";
import lesson4 from "./lessons/specification.json";
import lesson5 from "./lessons/evaluation.json";
import lesson6 from "./lessons/verification.json";
import lesson7 from "./lessons/landscape.json";
import lesson8 from "./lessons/long-horizon.json";
import lesson9 from "./lessons/gh-aw.json";
import lesson10 from "./lessons/customisation.json";
import lesson11 from "./lessons/tools.json";
import lesson12 from "./lessons/why-multiple.json";
import lesson13 from "./lessons/coordination.json";
import lesson14 from "./lessons/tiny-harness.json";
import lesson15 from "./lessons/graduation.json";

export default defineCourse({
  ...course,
  topics: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    lesson5,
    lesson6,
    lesson7,
    lesson8,
    lesson9,
    lesson10,
    lesson11,
    lesson12,
    lesson13,
    lesson14,
    lesson15,
  ],
});
