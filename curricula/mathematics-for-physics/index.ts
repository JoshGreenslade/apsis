import type { CurriculumPack } from "@/types/curriculum";
import { syllabus } from "./syllabus";
import { overview } from "./overview";
import { mathematicsPractice } from "./practice";
import chapter1 from "./chapters/01-quantities";
import chapter2 from "./chapters/02-functions";
import chapter3 from "./chapters/03-trigonometry";
import chapter4 from "./chapters/04-limits";
import chapter5 from "./chapters/05-derivatives";
import chapter6 from "./chapters/06-exponentials";
import chapter7 from "./chapters/07-integrals";
import chapter8 from "./chapters/08-integration-methods";
import chapter9 from "./chapters/09-series";
import chapter10 from "./chapters/10-vectors";
import chapter11 from "./chapters/11-linear-maps";
import chapter12 from "./chapters/12-eigenvectors";
import chapter13 from "./chapters/13-complex-numbers";
import chapter14 from "./chapters/14-first-order-odes";
import chapter15 from "./chapters/15-oscillators";
import chapter16 from "./chapters/16-multivariable";
import chapter17 from "./chapters/17-multiple-integrals";
import chapter18 from "./chapters/18-constraints";
import chapter19 from "./chapters/19-line-integrals";
import chapter20 from "./chapters/20-divergence";
import chapter21 from "./chapters/21-curl-stokes";
import chapter22 from "./chapters/22-coupled-modes";
import chapter23 from "./chapters/23-fourier";
import chapter24 from "./chapters/24-pdes";
import chapter25 from "./chapters/25-green-functions";
import chapter26 from "./chapters/26-probability";
import chapter27 from "./chapters/27-gaussian";
import chapter28 from "./chapters/28-variation";
import chapter29 from "./chapters/29-complex-analysis";
import chapter30 from "./chapters/30-quantum-vectors";
import chapter31 from "./chapters/31-tensors";
import chapter32 from "./chapters/32-metrics";
import chapter33 from "./chapters/33-symmetry";
import chapter34 from "./chapters/34-mechanics-synthesis";
import chapter35 from "./chapters/35-fields-synthesis";
import chapter36 from "./chapters/36-quantum-relativity-synthesis";
const chapters = [chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7, chapter8, chapter9, chapter10, chapter11, chapter12, chapter13, chapter14, chapter15, chapter16, chapter17, chapter18, chapter19, chapter20, chapter21, chapter22, chapter23, chapter24, chapter25, chapter26, chapter27, chapter28, chapter29, chapter30, chapter31, chapter32, chapter33, chapter34, chapter35, chapter36];
const topics = syllabus.map((plan, i) => {
  const chapter = chapters[i];
  if (chapter.id !== plan.id) throw new Error("Mathematics chapter order mismatch: " + plan.id);
  return {
    ...chapter,
    practiceTemplates: mathematicsPractice[plan.id] ?? chapter.practiceTemplates,
    title: plan.title, description: plan.outcome, domain: "Mathematics for physics",
    unit: plan.unit, prerequisites: plan.prerequisites,
    minutes: i < 3 ? 45 : i >= 33 ? 90 : 60,
  };
});
const pack: CurriculumPack = {
  id: "mathematics-for-physics", version: "1.0.0",
  title: "Mathematics for physics",
  description: "Understand the mathematical ideas behind mechanics, fields, quantum states and spacetime.",
  conventions: "Start with the algebra and trigonometry refreshers, or use their optional questions to check readiness. Angles are in radians unless stated otherwise. Enter unit 1 for dimensionless numerical answers. Work in metres, seconds and kilograms when a problem specifies SI units. Complex inner products conjugate the first argument; spacetime uses coordinates (ct,x,y,z) and signature (−,+,+,+). Allow several sittings for demanding chapters: time estimates include practice, not just reading. Automated checks assess selected answers; written reasoning and investigations have solutions for self-assessment.",
  overview, topics,
};
export default pack;