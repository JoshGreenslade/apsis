import type { CurriculumPack } from "@/types/curriculum";
import { astroOverview } from "./overview";
import twoBody from "./topics/01-two-body";
import geometry from "./topics/02-geometry";
import hohmann from "./topics/03-hohmann";
import phasing from "./topics/04-phasing";
import perturbations from "./topics/05-perturbations";
import patchedConics from "./topics/06-patched-conics";
const pack: CurriculumPack = {
  id: "astrodynamics",
  version: "1.0.0",
  title: "Astrodynamics",
  description: "From a falling body to an interplanetary trajectory.",
  conventions:
    "Earth μ = 398600.4418 km³/s²; Earth radius = 6378 km. Radii are measured from the center unless altitude is stated. Inertial frames, impulsive burns, and spherical two-body coasts are assumed unless a lesson explicitly changes the model. Enter unit 1 for dimensionless values. Numeric tolerance: 0.2% or 0.001, whichever is larger.",
  overview: astroOverview,
  topics: [twoBody, geometry, hohmann, phasing, perturbations, patchedConics],
};
export default pack;
