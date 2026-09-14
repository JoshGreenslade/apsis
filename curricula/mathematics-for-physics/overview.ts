import type { CurriculumPack } from "@/types/curriculum";

export const overview: NonNullable<CurriculumPack["overview"]> = {
  headline: "Understand the mathematics. See the physics it makes possible.",
  introduction: "A derivative is a way to describe change locally. An eigenvector reveals a pattern that a transformation preserves. A field equation relates what happens in a small region to what happens throughout a system. In this course we develop those ideas from familiar measurements and pictures, explain why the calculations work, and return to the same physical problems as our mathematical tools become stronger. The 36 chapters form 12 connected parts; they are chapters to work through patiently, not brief summaries to skim. Read every explanation and solution freely, and use the questions whenever you want to test your understanding.",
  startingPoint: "Begin with ordinary arithmetic and a willingness to draw pictures and work through examples. The first three chapters refresh units, algebra, functions and trigonometry; their optional diagnostics help you decide what to revisit. No prior calculus or university physics is assumed. The first nine chapters establish calculus and approximation; vectors and linear algebra then open the route to differential equations, fields and waves. Later branches develop probability, variation, complex methods and the mathematical language of quantum mechanics and relativity. Proofs appear when they reveal why something works; harder formal details are optional.",
  outcomes: [
    { title: "Reconstruct a calculation", description: "Explain a derivative, integral or approximation through its underlying meaning, keep units and assumptions straight, and estimate whether an answer is plausible." },
    { title: "Build a model of motion", description: "Translate a stated force law into a differential equation, apply initial conditions, identify normal modes and connect stationary action with equations of motion." },
    { title: "Reason about fields and waves", description: "Interpret gradients, flux and circulation, connect local and integral laws, and use boundary conditions and Fourier modes to build a diffusion or wave solution." },
    { title: "Work with uncertainty and states", description: "Distinguish probabilities from probability densities, propagate simple measurement uncertainty and calculate with complex state vectors and Hermitian operators." },
    { title: "Keep geometry separate from coordinates", description: "Change a basis without changing the underlying object, interpret tensors through their action, and check which metric a transformation preserves." },
    { title: "Know what you are ready to study next", description: "Enter mechanics, electromagnetism and introductory quantum mechanics with usable mathematical tools, and approach special relativity and the first geometric ideas of general relativity. Full general relativity, functional analysis and graduate field theory require further study." },
  ],
  capstone: {
    title: "Reconstruct three pieces of physics",
    description: "Develop a pendulum model and test its small-angle approximation; solve heat flow on a finite rod using conservation and modes; then compare norm preservation in a two-state quantum example with interval preservation under a Lorentz transformation. Each investigation includes a worked route and a rubric for checking your own reasoning. The last comparison connects mathematical habits, not a claim to unify quantum mechanics and relativity.",
  },
};
