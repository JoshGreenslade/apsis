import type { CurriculumPack } from "@/types/curriculum";
export const astroOverview: NonNullable<CurriculumPack["overview"]> = {
  headline: "Understand an orbit. Then change it.",
  introduction:
    "Why can firing forward leave you moving more slowly? We’ll start with that puzzle and build up to planning a journey from low Earth orbit toward the Moon. Each lesson connects a physical story to a useful calculation, with questions you can try whenever you want.",
  startingPoint:
    "Bring algebra, basic trigonometry, and an idea of vectors. Calculus explains the derivations, but you can follow the physical reasoning and worked calculations first.",
  outcomes: [
    {
      title: "Explain the motion",
      description:
        "Predict where a spacecraft speeds up, slows down, or changes its path—and explain why.",
    },
    {
      title: "Describe any ideal orbit",
      description:
        "Read the six orbital elements and connect them to a spacecraft’s position and velocity.",
    },
    {
      title: "Plan a maneuver",
      description:
        "Estimate burn sizes, coast times, rendezvous timing, and the cost of changing planes.",
    },
    {
      title: "Know when the model breaks",
      description:
        "Recognize orbital drift and keep reference frames straight when approaching another body.",
    },
  ],
  capstone: {
    title: "Sketch a journey from Earth orbit to lunar distance",
    description:
      "Choose a parking orbit, estimate the departure burn and travel time, then explain what lunar motion, capture, and perturbations add to the problem. The final lesson supplies the pieces; the goal is a defensible first estimate, not a flight-ready trajectory.",
  },
};
