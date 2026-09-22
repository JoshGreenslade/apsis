import { defineCourse } from "@/prefabs/authoring";
import course from "./course.json";
import inspect from "./lessons/inspect-a-run.json";
import models from "./lessons/model-behaviour.json";
import selection from "./lessons/model-selection.json";
import context from "./lessons/context-design.json";

export default defineCourse({ ...course, topics: [inspect, models, selection, context] });
