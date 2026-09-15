import type { Chapter } from "../chapter";
const chapter: Chapter = {
  id: "mechanics-synthesis",
  intuition: {
    body: "Return to the two pendulums from the opening chapter. Dimensional reasoning predicted a period proportional to the square root of length divided by gravity, but it left an unknown dimensionless factor. We can now ask a sharper question: why does that factor approach $2\\pi$ for small swings, and what changes when the release angle is no longer negligible?\n\nA useful model has to connect several kinds of reasoning. Geometry gives the bob's speed from its angular speed, a physical energy model gives a Lagrangian, variation gives an equation of motion, and a local series identifies the approximation that turns the equation into a familiar oscillator. Each step has an assumption we can inspect.\n\nWe will keep an ideal pendulum: a point mass on a massless inextensible string or rod of length $\\ell$, uniform gravity, a fixed support, and no drag. The angle is measured from the downward vertical in radians. We consider librations, back-and-forth swings with amplitude below the upright position, rather than complete rotations.\n\nThe final investigation asks you to compare a small swing with a larger one, using energy and a one-dimensional period integral. A calculator and a short table are enough. The point is to reconstruct a prediction, state its error and explain what evidence would challenge the model, rather than merely quote the pendulum formula.",
    thoughtExperiments: [
      "If the exact restoring sine is smaller than the linear restoring angle, should a finite-amplitude swing be faster or slower?",
      "Why should a pendulum released increasingly close to the upright position take a very long time to complete a swing?",
    ],
  },
  theory: [
    {
      heading: "1. Build the nonlinear model before simplifying it",
      body: "Follow the bob along its circular arc. An angle change $d\\theta$ corresponds to distance $\\ell\\,d\\theta$, so the speed is $\\ell|\\dot\\theta|$. The kinetic energy is $T=\\frac12m\\ell^2\\dot\\theta^2$. Relative to the lowest point, the bob rises through height $\\ell(1-\\cos\\theta)$, giving potential energy $V=mg\\ell(1-\\cos\\theta)$. We assume uniform gravitational force and the standard point-particle kinetic-energy law.\n\nTake $L=T-V$ and apply the Euler–Lagrange equation for $\\theta$. The velocity derivative is $\\partial L/\\partial\\dot\\theta=m\\ell^2\\dot\\theta$, and its time derivative is $m\\ell^2\\ddot\\theta$. The coordinate derivative is $-mg\\ell\\sin\\theta$. Therefore\n$$m\\ell^2\\ddot\\theta+mg\\ell\\sin\\theta=0,\\qquad\n\\ddot\\theta+\\frac g\\ell\\sin\\theta=0.$$\nMass cancels because the inertial and gravitational terms contain the same factor under this model.\n\nThis is nonlinear: the restoring term is sine of the unknown angle. Adding two solutions generally does not give another solution, so the superposition rules for linear oscillators cannot simply be reused. The equation still has two initial conditions, such as release from rest at $\\theta(0)=\\theta_0$ with $\\dot\\theta(0)=0$.\n\nIntroduce the natural time $t_0=\\sqrt{\\ell/g}$ and dimensionless time $\\tau=t/t_0$. Since $\\ddot\\theta=(1/t_0^2)d^2\\theta/d\\tau^2$, the equation becomes\n$$\\frac{d^2\\theta}{d\\tau^2}+\\sin\\theta=0.$$\nLength and gravity disappear from the dimensionless dynamics; the release amplitude remains. Thus the period must have the form $P=t_0F(\\theta_0)$, recovering the opening chapter's scaling while showing exactly where its unknown function enters.\n\nThe derivation assumes a rigid geometric constraint. A real string can go slack in sufficiently energetic motions, and a finite-size bob can have additional rotational inertia. Damping and a moving support add forces or time dependence. Those effects require modifying the physical model before improving the mathematical solution of this one.",
    },
    {
      heading: "2. Recover the small-angle oscillator and conserve energy",
      body: "Release the bob through a small angle. The Taylor expansion $\\sin\\theta=\\theta-\\theta^3/6+\\cdots$ shows why the leading equation is $\\ddot\\theta+(g/\\ell)\\theta=0$. With release from rest, its solution is\n$$\\theta(t)\\approx\\theta_0\\cos(\\omega_0t),\\qquad\n\\omega_0=\\sqrt{g/\\ell},\\qquad P_0=2\\pi\\sqrt{\\ell/g}.$$\nThe coefficient $2\\pi$ now comes from the full cycle of the oscillator solution, not from dimensional reasoning.\n\nFor $|\\theta|\\leq\\theta_0$, the absolute discrepancy between sine and its linear term is bounded by $|\\theta|^3/6$. Relative to the nonzero linear factor, it is at most $\\theta_0^2/6$. This controls the restoring-term approximation, but it is not automatically the same numerical bound on the period or on trajectory error over many cycles. Small frequency errors can accumulate into a noticeable phase error after repeated swings.\n\nThe exact ideal model conserves\n$$E=\\tfrac12m\\ell^2\\dot\\theta^2+mg\\ell(1-\\cos\\theta).$$\nDifferentiate: $dE/dt=m\\ell^2\\dot\\theta[\\ddot\\theta+(g/\\ell)\\sin\\theta]=0$ along a solution. The cancellation gives an independent check of the equation and its signs. With rest release at $\\theta_0$, the energy is $mg\\ell(1-\\cos\\theta_0)$.\n\nSolving the energy relation for angular speed gives\n$$\\dot\\theta^2=\\frac{2g}{\\ell}(\\cos\\theta-\\cos\\theta_0).$$\nDuring the first descent from a positive release angle, choose the negative square root because the angle decreases. Energy alone supplies speed magnitude; the direction comes from the branch of the motion. At the bottom, the bob speed is $v_{\\max}=\\sqrt{2g\\ell(1-\\cos\\theta_0)}$.\n\nThe small-angle prediction $v_{\\max}\\approx\\sqrt{g\\ell}\\,\\theta_0$ follows from $1-\\cos\\theta_0\\approx\\theta_0^2/2$. It is another controlled approximation with its own observable. Comparing exact energy values with the approximate trajectory gives a useful diagnostic, particularly if you later integrate the nonlinear equation numerically. A stable-looking plot is not sufficient evidence that an algorithm preserves the intended physics.",
    },
    {
      heading: "3. Obtain and interpret a finite-amplitude period",
      body: "Time the descent from the turning point to the bottom. By symmetry it is one quarter of a complete libration. Separating time from angle in the exact speed relation gives\n$$P=4\\sqrt{\\frac{\\ell}{2g}}\\int_0^{\\theta_0}\n\\frac{d\\theta}{\\sqrt{\\cos\\theta-\\cos\\theta_0}},\n\\qquad 0<\\theta_0<\\pi.$$\nThe integrand becomes unbounded at the turning point, where speed vanishes, but for amplitudes strictly below $\\pi$ this endpoint singularity is integrable.\n\nA substitution removes that awkward endpoint behaviour. Define $k=\\sin(\\theta_0/2)$ and set $\\sin(\\theta/2)=k\\sin\\phi$. Then $\\cos\\theta-\\cos\\theta_0=2k^2\\cos^2\\phi$ and\n$$d\\theta=\\frac{2k\\cos\\phi}{\\sqrt{1-k^2\\sin^2\\phi}}\\,d\\phi.$$\nThe factors that vanish at the turning point cancel, producing\n$$P=4\\sqrt{\\ell/g}\\int_0^{\\pi/2}\\frac{d\\phi}{\\sqrt{1-k^2\\sin^2\\phi}}.$$\nThis complete elliptic integral has no elementary antiderivative in general, but it is a well-behaved numerical integral for fixed $k<1$.\n\nExpand $(1-z)^{-1/2}=1+z/2+O(z^2)$ with $z=k^2\\sin^2\\phi$. Integrating the constant term gives $\\pi/2$, and integrating the next term uses $\\int_0^{\\pi/2}\\sin^2\\phi\\,d\\phi=\\pi/4$. Hence\n$$\\frac{P}{P_0}=1+\\frac{k^2}{4}+O(k^4)\n=1+\\frac{\\theta_0^2}{16}+O(\\theta_0^4).$$\nThe last step uses $k=\\theta_0/2+O(\\theta_0^3)$. This derives the leading amplitude correction rather than treating a force-error estimate as a period correction.\n\nFor every nonzero amplitude below $\\pi$, the transformed integrand is at least one and exceeds it over most of the interval, so $P>P_0$. Larger amplitude means weaker effective restoring response relative to the linear model and a longer period. As $\\theta_0$ approaches $\\pi$, $k$ approaches one and the integral diverges: the bob spends increasingly long near the unstable upright position.\n\nFor a hand calculation, define $f(\\phi)=(1-k^2\\sin^2\\phi)^{-1/2}$. A five-point Simpson estimate with spacing $h=\\pi/8$ uses\n$$I\\approx\\frac h3[f(0)+4f(h)+2f(2h)+4f(3h)+f(4h)],\\qquad P/P_0=2I/\\pi.$$\nRepeating with eight subintervals checks numerical resolution, while comparing against the small-amplitude expansion checks model approximation. These are separate errors and should be reported separately.\n\nThe regularized integral also supplies simple bounds without any numerical integration. For $0\\leq\\phi\\leq\\pi/2$, the quantity $1-k^2\\sin^2\\phi$ lies between $1-k^2$ and one. Therefore the integrand lies between one and $1/\\sqrt{1-k^2}$, giving\n$$1\\leq\\frac P{P_0}\\leq\\frac1{\\sqrt{1-k^2}}=\\frac1{\\cos(\\theta_0/2)}\n\\qquad(0\\leq\\theta_0<\\pi).$$\nThe upper bound is conservative because the integrand reaches its maximum only near the endpoint, but it is a useful immediate check on a computed period. A numerical ratio below one or above this bound cannot be correct for the stated ideal libration.\n\nFor an amplitude of $0.8$ rad, the leading correction predicts a ratio of 1.04, while the upper bound is about 1.0857. The bound alone cannot establish accuracy to one part in a thousand, so refinement or a stronger series argument is still needed. A check can reject an impossible result without certifying every plausible result.\n\nThere is also a distinction between an integral estimate and a timed experiment. The integral assumes constant amplitude because energy is conserved; a real damped pendulum changes amplitude from cycle to cycle. Averaging many measured cycles can reduce stopwatch noise while also blending periods from slightly different amplitudes. To compare that measurement with this model, record the amplitude range or limit the observation interval so the change is negligible at the desired accuracy. This is a modelling issue that more precise quadrature cannot remove.\n\nWe have answered the opening pendulum question at three levels: dimensions determine the scale, the linearized dynamics determine $2\\pi$, and the exact energy integral determines amplitude dependence. The investigation asks you to keep those levels distinct while using them together.",
    },
  ],
  teaching: {
    question:
      "How much of the pendulum period can we reconstruct from first principles?",
    why: "This investigation joins geometry, variation, series, energy and integration into a model with testable limits.",
    outcomes: [
      "Derive the nonlinear and small-angle equations.",
      "Use energy to predict speed and period.",
      "Separate approximation error from numerical error.",
    ],
    checkpoints: [
      {
        bridge: "Translate geometry into a Lagrangian.",
        meaning:
          "The nonlinear equation follows from explicit physical assumptions.",
        question: "Why is kinetic energy proportional to ℓ²θ̇²?",
        answer: "The bob's speed along its circular path is ℓ|θ̇|.",
        further: [
          {
            question: "Why does mass cancel from the ideal equation?",
            answer:
              "Both inertial and gravitational terms contain the same mass factor.",
          },
          {
            question: "What parameter remains after nondimensionalizing time?",
            answer:
              "The release amplitude θ₀ remains in the initial condition.",
          },
          {
            question: "Can two nonlinear pendulum solutions be superposed?",
            answer:
              "Generally no, because sine of a sum is not the sum of sines.",
          },
        ],
      },
      {
        bridge: "Use a local approximation and an exact invariant.",
        meaning:
          "A force approximation and a period prediction are different claims.",
        question: "Where does 2π enter the small-angle period?",
        answer:
          "It is the phase advance of one cycle of the harmonic solution.",
        further: [
          {
            question:
              "Does the sine remainder directly bound long-time phase error?",
            answer:
              "No. Dynamical errors can accumulate, so the observable needs its own analysis.",
          },
          {
            question:
              "Why choose a negative angular-speed branch on the first descent?",
            answer: "The angle decreases from a positive turning point.",
          },
          {
            question: "How can energy test a numerical trajectory?",
            answer:
              "The exact ideal energy should remain constant; systematic drift signals numerical error or a changed model.",
          },
        ],
      },
      {
        bridge: "Integrate the time spent at each angle.",
        meaning: "The exact period supplies an amplitude-dependent correction.",
        question: "Why multiply the turning-point-to-bottom time by four?",
        answer: "Symmetry gives four equal quarters of an undamped libration.",
        further: [
          {
            question: "What does the half-angle substitution improve?",
            answer:
              "It cancels the integrable endpoint singularity for fixed amplitude below π.",
          },
          {
            question: "Why is the period longer than P₀ for nonzero amplitude?",
            answer:
              "The transformed integrand exceeds one except at isolated points.",
          },
          {
            question: "Why refine quadrature and compare a series separately?",
            answer:
              "Refinement checks numerical integration error; the series comparison checks truncation of the physical solution's approximation.",
          },
        ],
      },
    ],
    takeaway:
      "A complete model connects assumptions, dynamics, observables and separate error checks.",
    nextConnection:
      "The heat-rod investigation will use the same discipline to connect conservation, boundary conditions and mode amplitudes.",
  },
  diagnostics: [
    {
      id: "d-variation",
      prompt: "For L = mℓ²θ̇²/2 − mgℓ(1 − cos θ), which equation follows?",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "θ̈ − (g/ℓ)sin θ = 0",
          },
          {
            id: "1",
            label: "θ̈ + (g/ℓ)sin θ = 0",
          },
          {
            id: "2",
            label: "θ̇ + θ = 0",
          },
        ],
      },
      solution:
        "The potential derivative supplies a restoring minus sign in the force.",
      hint: "Apply Euler–Lagrange.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Apply Euler–Lagrange.",
        misconceptions: [],
      },
      prerequisiteId: "variation",
    },
    {
      id: "d-series",
      prompt: "Find the coefficient of θ³ in sin θ near zero. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: -0.16666666666666666,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "The coefficient is −1/3! = −1/6.",
      hint: "Match derivatives at zero.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Match derivatives at zero.",
        misconceptions: [],
      },
      prerequisiteId: "series",
    },
    {
      id: "d-oscillator",
      prompt: "For g/ℓ = 4/s², find the small-angle angular frequency.",
      answer: {
        kind: "numeric",
        value: 2,
        unit: "1/s",
        acceptedUnits: ["1/s"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "The frequency is the square root, 2/s.",
      hint: "Recognize the oscillator equation.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Recognize the oscillator equation.",
        misconceptions: [],
      },
      prerequisiteId: "oscillators",
    },
  ],
  workedExample: {
    title: "Estimate the amplitude effect on a one-metre pendulum",
    problem: "Use ℓ = 1 m, g = 9.81 m/s² and rest release at θ₀ = 0.4 rad.",
    steps: [
      {
        title: "Find the basic scale",
        body: "t₀ = √(1/9.81) ≈ 0.31928 s and P₀ = 2πt₀ ≈ 2.00607 s.",
        reason: "Separate the dimensional time scale from the cycle factor.",
        trap: "Do not confuse t₀ with a full period.",
      },
      {
        title: "Check the leading correction",
        body: "θ₀²/16 = 0.01, so P ≈ 1.01P₀ ≈ 2.02613 s to leading amplitude order.",
        reason:
          "The period expansion, not the force bound, supplies the correction.",
        trap: "This is an approximation with omitted fourth-order amplitude terms.",
      },
      {
        title: "Predict bottom speed",
        body: "vmax = √[2(9.81)(1)(1 − cos 0.4)] ≈ 1.24450 m/s.",
        reason: "Exact ideal energy determines the speed.",
        trap: "Use radians for the cosine.",
      },
      {
        title: "Plan verification",
        body: "Here k = sin 0.2. Evaluate the regularized period integral and refine the quadrature; it gives P/P₀ about 1.01009.",
        reason: "An independent integral checks the leading approximation.",
        trap: "Agreement of two rounded numbers alone is not a convergence study.",
      },
    ],
  },
  fadedExercise: {
    prompt: "Use ℓ = 4 m, g = 9 m/s² and θ₀ = 0.2 rad, released from rest.",
    supplied: [
      {
        heading: "Independent inputs",
        body: "t₀ = √(ℓ/g), P₀ = 2πt₀, and the leading ratio is 1 + θ₀²/16. Exact bottom speed is √[2gℓ(1 − cos θ₀)].",
      },
    ],
    steps: [
      {
        id: "f-scale",
        prompt: "Find the natural time t₀.",
        answer: {
          kind: "numeric",
          value: 0.6666666666666666,
          unit: "s",
          acceptedUnits: ["s"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "√(4/9) = 2/3 s.",
        hint: "Use the length–gravity ratio.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Use the length–gravity ratio.",
          misconceptions: [],
        },
      },
      {
        id: "f-period",
        prompt: "Using t₀ = 2/3 s, find P₀.",
        answer: {
          kind: "numeric",
          value: 4.1887902047863905,
          unit: "s",
          acceptedUnits: ["s"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "2π × 2/3 = 4π/3 s.",
        hint: "One cycle takes 2π natural time units.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "One cycle takes 2π natural time units.",
          misconceptions: [],
        },
      },
      {
        id: "f-ratio",
        prompt: "Find 1 + 0.2²/16. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: 1.0025,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "1 + 0.04/16 = 1.0025.",
        hint: "This is the leading amplitude approximation.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "This is the leading amplitude approximation.",
          misconceptions: [],
        },
      },
      {
        id: "f-speed",
        prompt: "Find √[72(1 − cos 0.2)] in metres per second.",
        answer: {
          kind: "numeric",
          value: 1.198000999761938,
          unit: "m/s",
          acceptedUnits: ["m/s"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "Energy gives approximately 1.1980 m/s.",
        hint: "Evaluate the exact cosine in radians.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Evaluate the exact cosine in radians.",
          misconceptions: [],
        },
      },
    ],
  },
  retrievalProblems: [
    {
      id: "r-assumption",
      prompt: "Which change requires modifying this ideal pendulum model?",
      answer: {
        kind: "choice",
        value: "2",
        options: [
          {
            id: "0",
            label: "Expressing time in milliseconds",
          },
          {
            id: "1",
            label: "Using a different mass with the same ideal assumptions",
          },
          {
            id: "2",
            label: "Adding appreciable air resistance",
          },
        ],
      },
      solution:
        "Drag adds a nonconservative force and changes energy evolution.",
      hint: "Distinguish representation from physics.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Distinguish representation from physics.",
        misconceptions: [],
      },
    },
    {
      id: "r-scale",
      prompt:
        "At fixed amplitude and gravity, length increases by nine. Find the period ratio. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 3,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "The time scale grows by √9 = 3.",
      hint: "The dimensionless amplitude function stays fixed.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "The dimensionless amplitude function stays fixed.",
        misconceptions: [],
      },
    },
    {
      id: "r-energy",
      prompt:
        "At a turning point in a libration released from rest, kinetic energy is:",
      answer: {
        kind: "choice",
        value: "0",
        options: [
          {
            id: "0",
            label: "Zero",
          },
          {
            id: "1",
            label: "Maximum",
          },
          {
            id: "2",
            label: "Negative",
          },
        ],
      },
      solution: "Angular velocity vanishes at the turning point.",
      hint: "Use T = mℓ²θ̇²/2.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Use T = mℓ²θ̇²/2.",
        misconceptions: [],
      },
    },
    {
      id: "r-correction",
      prompt:
        "For θ₀ = 0.6 rad, find the leading fractional period increase θ₀²/16. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 0.0225,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "0.36/16 = 0.0225.",
      hint: "Use the period correction.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Use the period correction.",
        misconceptions: [],
      },
    },
    {
      id: "r-limit",
      prompt:
        "As a rest-release amplitude approaches π from below, the exact ideal period:",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "Approaches zero",
          },
          {
            id: "1",
            label: "Diverges",
          },
          {
            id: "2",
            label: "Stays exactly P₀",
          },
        ],
      },
      solution:
        "Motion spends increasingly long near the unstable top; the period integral diverges.",
      hint: "Inspect k approaching one.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Inspect k approaching one.",
        misconceptions: [],
      },
    },
    {
      id: "r-transfer",
      prompt:
        "A period estimate changes when the integration grid is refined. What has this diagnosed first?",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "Failure of gravitational physics",
          },
          {
            id: "1",
            label: "Numerical quadrature sensitivity",
          },
          {
            id: "2",
            label: "Proof that the small-angle approximation is exact",
          },
        ],
      },
      solution:
        "Refinement probes the numerical evaluation of the chosen integral.",
      hint: "Separate model and numerical errors.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Separate model and numerical errors.",
        misconceptions: [],
      },
    },
  ],
  diagram: {
    title: "Finite amplitude raises the predicted period",
    caption:
      "The leading approximation P/P₀ = 1 + θ₀²/16 is plotted for 0 ≤ θ₀ ≤ 1 rad. It is an approximation; the exact period grows without bound near π.",
    viewBox: [0, 0, 600, 320],
    elements: [
      {
        kind: "line",
        from: [65, 265],
        to: [545, 265],
        tone: "muted",
      },
      {
        kind: "line",
        from: [65, 280],
        to: [65, 40],
        tone: "muted",
      },
      {
        kind: "line",
        from: [65, 265],
        to: [80, 264.77777777777777],
        tone: "accent",
      },
      {
        kind: "line",
        from: [80, 264.77777777777777],
        to: [95, 264.1111111111111],
        tone: "accent",
      },
      {
        kind: "line",
        from: [95, 264.1111111111111],
        to: [110, 263],
        tone: "accent",
      },
      {
        kind: "line",
        from: [110, 263],
        to: [125, 261.44444444444446],
        tone: "accent",
      },
      {
        kind: "line",
        from: [125, 261.44444444444446],
        to: [140, 259.44444444444446],
        tone: "accent",
      },
      {
        kind: "line",
        from: [140, 259.44444444444446],
        to: [155, 257],
        tone: "accent",
      },
      {
        kind: "line",
        from: [155, 257],
        to: [170, 254.11111111111111],
        tone: "accent",
      },
      {
        kind: "line",
        from: [170, 254.11111111111111],
        to: [185, 250.77777777777777],
        tone: "accent",
      },
      {
        kind: "line",
        from: [185, 250.77777777777777],
        to: [200, 247],
        tone: "accent",
      },
      {
        kind: "line",
        from: [200, 247],
        to: [215, 242.77777777777777],
        tone: "accent",
      },
      {
        kind: "line",
        from: [215, 242.77777777777777],
        to: [230, 238.11111111111111],
        tone: "accent",
      },
      {
        kind: "line",
        from: [230, 238.11111111111111],
        to: [245, 233],
        tone: "accent",
      },
      {
        kind: "line",
        from: [245, 233],
        to: [260, 227.44444444444446],
        tone: "accent",
      },
      {
        kind: "line",
        from: [260, 227.44444444444446],
        to: [275, 221.44444444444446],
        tone: "accent",
      },
      {
        kind: "line",
        from: [275, 221.44444444444446],
        to: [290, 215],
        tone: "accent",
      },
      {
        kind: "line",
        from: [290, 215],
        to: [305, 208.11111111111111],
        tone: "accent",
      },
      {
        kind: "line",
        from: [305, 208.11111111111111],
        to: [320, 200.77777777777777],
        tone: "accent",
      },
      {
        kind: "line",
        from: [320, 200.77777777777777],
        to: [335, 193],
        tone: "accent",
      },
      {
        kind: "line",
        from: [335, 193],
        to: [350, 184.77777777777777],
        tone: "accent",
      },
      {
        kind: "line",
        from: [350, 184.77777777777777],
        to: [365, 176.11111111111111],
        tone: "accent",
      },
      {
        kind: "line",
        from: [365, 176.11111111111111],
        to: [380, 167],
        tone: "accent",
      },
      {
        kind: "line",
        from: [380, 167],
        to: [395, 157.44444444444446],
        tone: "accent",
      },
      {
        kind: "line",
        from: [395, 157.44444444444446],
        to: [410, 147.44444444444443],
        tone: "accent",
      },
      {
        kind: "line",
        from: [410, 147.44444444444443],
        to: [425, 136.99999999999997],
        tone: "accent",
      },
      {
        kind: "line",
        from: [425, 136.99999999999997],
        to: [440, 126.11111111111109],
        tone: "accent",
      },
      {
        kind: "line",
        from: [440, 126.11111111111109],
        to: [455, 114.77777777777777],
        tone: "accent",
      },
      {
        kind: "line",
        from: [455, 114.77777777777777],
        to: [470, 103],
        tone: "accent",
      },
      {
        kind: "line",
        from: [470, 103],
        to: [485, 90.77777777777777],
        tone: "accent",
      },
      {
        kind: "line",
        from: [485, 90.77777777777777],
        to: [500, 78.11111111111111],
        tone: "accent",
      },
      {
        kind: "line",
        from: [500, 78.11111111111111],
        to: [515, 65],
        tone: "accent",
      },
      {
        kind: "label",
        at: [15, 270],
        text: "1",
      },
      {
        kind: "label",
        at: [5, 70],
        text: "1.0625",
      },
      {
        kind: "label",
        at: [470, 305],
        text: "1 rad",
      },
      {
        kind: "label",
        at: [170, 40],
        text: "P/P₀: leading correction",
      },
    ],
  },
  sidebars: [
    {
      heading: "The next period coefficient",
      body: "Retaining the next term gives $(1-z)^{-1/2}=1+z/2+3z^2/8+\\cdots$. Since $\\int_0^{\\pi/2}\\sin^4\\phi\\,d\\phi=3\\pi/16$, the ratio is $1+k^2/4+9k^4/64+\\cdots$. Expanding $k=\\sin(\\theta_0/2)$ consistently gives $P/P_0=1+\\theta_0^2/16+11\\theta_0^4/3072+\\cdots$. Mixing a fourth-order k term with an only first-order conversion from k to θ₀ would give the wrong fourth-order amplitude coefficient.",
    },
  ],
  practical: {
    title: "Audit a pendulum prediction",
    minutes: 60,
    brief:
      "Compare rest releases at 0.2 and 0.8 rad for an ideal pendulum with ℓ = 1 m and g = 9.81 m/s². Use a calculator or optional code. Written reasoning is self-assessed against the worked review; automated numerical questions do not certify the derivation.",
    steps: [
      "State the idealizations, angle convention and initial conditions, then derive the nonlinear equation from the stated Lagrangian.",
      "Calculate P₀ and the leading amplitude-corrected period for each release. Explain why the same dimensional scaling holds at both amplitudes.",
      "For each amplitude evaluate k = sin(θ₀/2), tabulate f(φ) at φ = jπ/8 for j = 0,…,4, and use the supplied Simpson formula. Repeat with spacing π/16.",
      "Compute the exact ideal bottom speed from energy. Explain why it is an independent observable from the period.",
      "Compare the refined integral with the leading approximation. Report numerical refinement separately from amplitude-series truncation and describe one experiment that would test an omitted physical effect.",
    ],
    deliverables: [
      "A derivation with units, assumptions and both initial data.",
      "A table of amplitudes, k, P₀, leading periods, two quadrature estimates and bottom speeds.",
      "A short error discussion and a proposed physical test, such as repeating the measurement at different bob masses or damping conditions.",
    ],
    review:
      "A complete review checks four things. **Model:** the equation is $\\ddot\\theta+(g/\\ell)\\sin\\theta=0$ with rest release; the scale is $\\sqrt{\\ell/g}$. **Numbers:** $P_0\\approx2.00607$ s, leading ratios are 1.0025 and 1.04, while refined integral ratios are about 1.002506 and 1.04153. Corresponding exact bottom speeds are about 0.62538 and 2.43939 m/s. **Verification:** show the endpoint conditions and energy calculation, and include the actual change between the two quadrature grids rather than claiming accuracy from one run. **Interpretation:** the larger-amplitude leading series underestimates the integral by a larger amount; damping, finite bob size or a changing support would require model changes. If your values differ, inspect radians, the quarter-cycle factor and the conversion from integral to P/P₀ before assigning a physical explanation.",
  },
  sources: [
    {
      title: "David Tong · Dynamics and Relativity",
      url: "https://davidtong.org/teaching/dynamics-and-relativity/",
    },
    {
      title: "MIT OpenCourseWare · Single Variable Calculus",
      url: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
    },
  ],
};
export default chapter;
