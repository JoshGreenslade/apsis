import { defineCourse } from "@/prefabs/authoring";
import course from "./course.json";
import lesson1 from "./lessons/two-body.json";
import lesson2 from "./lessons/geometry.json";
import lesson3 from "./lessons/hohmann.json";
import lesson4 from "./lessons/phasing.json";
import lesson5 from "./lessons/perturbations.json";
import lesson6 from "./lessons/patched-conics.json";

export default defineCourse({
  ...course,
  topics: [lesson1, lesson2, lesson3, lesson4, lesson5, lesson6],
});
