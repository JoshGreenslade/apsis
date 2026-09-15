import type { Chapter } from "../chapter";
const chapter: Chapter = {
  theoreticalMinimum: { coreIdea: "Fourier analysis represents a signal through orthogonal global modes, with projection determining coefficients and convergence determining what reconstruction means. The coefficients are measurements in a function space, not arbitrary fitting constants, and the chosen convention controls their scale and phase.", widerConnection: "Modes become the language of waves, diffusion, filtering, Green functions, and spectral computation. The later PDE chapters use this representation to turn spatial structure into independent temporal evolution, while the synthesis work asks what the reconstruction does and does not preserve." },
  id: "fourier",
  intuition: {
    body: "Pluck a string and its initial shape need not resemble a single smooth sine wave. Nevertheless, simple standing-wave patterns can be combined to reproduce increasingly detailed shapes. The task resembles resolving a two-cart displacement into normal modes, except that a string has a value at every position rather than just two coordinates.\n\nTo measure how much of a pattern is present, we need a way to compare whole functions. Multiplying their values point by point and integrating plays the role of a dot product. Orthogonal patterns then separate cleanly: projecting onto one does not accidentally count another.\n\nFourier analysis uses sine, cosine and complex exponential patterns for this purpose. The resulting coefficients describe a function through its frequency content, but the function and its representation must remain distinct. A finite sum smooths or misses features; an infinite sum still needs a statement about the sense in which it converges.\n\nWe will derive coefficients on a periodic interval, calculate the first terms of a square wave, and then explain the transform used on an unbounded line. The main physical thread is decomposition into patterns. The evolution of those patterns depends on the wave or heat equation, which comes next.",
    thoughtExperiments: [
      "How could an integral distinguish a sine pattern from a different harmonic?",
      "Can finitely many smooth waves reproduce an exact jump discontinuity?",
    ],
  },
  theory: [
    {
      heading: "1. Project functions as if they were vectors",
      body: "Take a periodic profile $f(x)$ on $[-\\pi,\\pi]$, with dimensionless coordinate $x$ and matching repetitions every $2\\pi$. For real functions define an inner product $\\langle f,g\\rangle=\\int_{-\\pi}^{\\pi}f(x)g(x)\\,dx$. It adds signed pointwise agreement across the whole interval. The squared norm $\\int f^2dx$ measures total squared size, not the maximum height at any one point.\n\nThe sine and cosine harmonics are orthogonal under this product. For positive integers $m,n$, integrating $\\sin(mx)\\sin(nx)$ gives zero when $m\\ne n$ and $\\pi$ when $m=n$. The product-to-sum identity converts the product into cosines, whose integrals vanish over a full period except for the constant term. Cosine pairs behave similarly, and sine–cosine products integrate to zero by parity or the same identities.\n\nSuppose we seek a representation\n$$f(x)\\sim\\frac{a_0}{2}+\\sum_{n=1}^{\\infty}[a_n\\cos(nx)+b_n\\sin(nx)].$$\nThe symbol $\\sim$ initially records the proposed Fourier representation; equality will require a convergence statement. Multiply by $\\sin(mx)$ and integrate. Orthogonality removes every term except $b_m\\pi$, suggesting\n$$b_m=\\frac1\\pi\\int_{-\\pi}^{\\pi}f(x)\\sin(mx)\\,dx.$$\nSimilarly $a_m=\\frac1\\pi\\int f(x)\\cos(mx)\\,dx$, including $a_0=\\frac1\\pi\\int f(x)\\,dx$.\n\nThese coefficient formulas are already justified for a finite least-squares approximation: projection minimizes the integral of the squared residual in the chosen finite-dimensional span. We need not assume an arbitrary infinite interchange of sum and integral to define them. Orthogonality of the residual to every retained basis function supplies the normal projection condition.\n\nThe constant function has squared norm $2\\pi$, whereas each nonconstant sine or cosine has squared norm $\\pi$. That is why the mean is $a_0/2$ under this convention. For a physical interval of length $L$, the harmonic arguments become $2\\pi nx/L$, ensuring dimensionless phases and adapting the normalization to the integration interval.",
    },
    {
      heading: "2. Calculate a jump and interpret convergence",
      body: "Imagine a periodic signal that is $+1$ on $0<x<\\pi$ and $-1$ on $-\\pi<x<0$. It is odd, so its mean and cosine coefficients vanish. For its sine coefficients, oddness makes the product with sine even:\n$$b_n=\\frac{2}{\\pi}\\int_0^\\pi\\sin(nx)\\,dx\n=\\frac{2[1-(-1)^n]}{\\pi n}.$$\nEven harmonics vanish, while odd harmonics have coefficient $4/(\\pi n)$. The first three nonzero terms are therefore\n$$S_3(x)=\\frac4\\pi\\left[\\sin x+\\frac{\\sin3x}{3}+\\frac{\\sin5x}{5}\\right].$$\n\nThe coefficient's inverse-frequency decay explains why a sharp feature needs many harmonics. At $x=\\pi/2$, the three retained sine values are $1,-1,1$, so this sum is $52/(15\\pi)\\approx1.1035$, higher than the target value one. Adding patterns improves the overall representation without making every partial sum lie between the signal's minimum and maximum.\n\nFor a periodic piecewise smooth function, the Fourier series converges at each point to the average of the left and right limits. We quote this standard convergence theorem here. At a continuous point that average is the function's value; at a jump from $-1$ to $+1$ it is zero. Changing the assigned value at the jump does not change any coefficient, because a single point contributes zero to these integrals.\n\nNear a jump, truncated Fourier sums exhibit Gibbs oscillations. As more terms are added, the overshoot region narrows, but its largest overshoot relative to the jump does not disappear. This does not contradict convergence at each fixed point away from the jump: the location of the worst overshoot moves toward the discontinuity as the truncation grows.\n\nA different useful statement is convergence in mean square, meaning that the integral of $|f-S_N|^2$ tends to zero. For square-integrable periodic functions, Fourier modes form a complete system in this sense, a theorem quoted rather than proved here. Mean-square convergence allows narrow local discrepancies and does not assert uniform pointwise accuracy. When using a truncated signal to predict a physical maximum, this distinction matters.\n\nOur square-wave coefficients describe a periodic idealization with instantaneous jumps. A real apparatus may smooth those transitions, changing the high-frequency content. Fourier analysis does not decide which physical idealization is appropriate; it tells us what patterns belong to the function we supplied.\n\nFor the square wave, the total squared size is $\\int_{-\\pi}^{\\pi}f^2dx=2\\pi$. Keeping only its first sine harmonic gives a projected squared size $\\pi(4/\\pi)^2=16/\\pi$. Orthogonality therefore makes the integrated squared residual exactly $2\\pi-16/\\pi$, which is positive. This error can be computed without locating the largest pointwise discrepancy or integrating the squared residual from scratch.\n\nAdding the third harmonic reduces that squared error by $\\pi[4/(3\\pi)]^2=16/(9\\pi)$; adding the fifth reduces it by a further $16/(25\\pi)$. Each orthogonal addition improves the integrated squared approximation even though a particular point, or the largest overshoot, may not improve monotonically. This gives a precise interpretation of more harmonics helping: the statement is guaranteed for the projection norm, while claims about pointwise extrema need a separate examination. The distinction is particularly useful when a sensor records a peak rather than an average signal strength.",
    },
    {
      heading: "3. Move from discrete harmonics to a continuous spectrum",
      body: "Now imagine a localized pulse on a very long string, where an artificial short repetition interval would introduce unwanted copies. On an unbounded line, spatial frequencies are no longer restricted to integer multiples of one fundamental frequency. The Fourier transform uses a continuous wavenumber $k$, measured in inverse length when $x$ is a physical position.\n\nUsing the course convention,\n$$\\hat f(k)=\\int_{-\\infty}^{\\infty}f(x)e^{-ikx}\\,dx,\\qquad\nf(x)=\\frac1{2\\pi}\\int_{-\\infty}^{\\infty}\\hat f(k)e^{ikx}\\,dk.$$\nThe first formula analyzes the signal; the second synthesizes it. Euler's formula packages sine and cosine projections into complex exponentials. For complex functions the inner product conjugates the first argument, so projection onto $e^{ikx}$ naturally uses $e^{-ikx}$.\n\nThe two integrals are ordinary absolutely convergent expressions for suitable sufficiently regular, decaying functions; more general square-integrable signals require an extension in the mean-square sense. We quote Fourier inversion under those qualifications, rather than claiming every displayed integral converges for every function. The factor $1/(2\\pi)$ and exponent signs belong to one consistent convention; moving a factor requires adjusting related formulas.\n\nFor the rectangular pulse $f(x)=1$ on $|x|<a$ and zero outside, direct integration gives\n$$\\hat f(k)=\\frac{2\\sin(ka)}{k},\\qquad \\hat f(0)=2a.$$\nThe value at zero follows by a limit and equals the pulse area. The transform has units of length for a dimensionless pulse. Its first positive zero is $k=\\pi/a$, so a narrower pulse spreads its spectrum over a wider wavenumber range. This is a concrete comparison of widths, not yet a quantum uncertainty statement.\n\nOrthogonality also connects total squared size with coefficient size. For the periodic convention above, Parseval's identity is\n$$\\int_{-\\pi}^{\\pi}|f|^2dx\n=\\pi\\left(\\frac{|a_0|^2}{2}+\\sum_{n\\geq1}(|a_n|^2+|b_n|^2)\\right),$$\nwith the usual complex-coefficient interpretation if needed. On the line the matching formula is $\\int|f|^2dx=(1/2\\pi)\\int|\\hat f|^2dk$ for square-integrable functions, interpreted through the transform's mean-square extension.\n\nParseval can measure a truncation's total squared error through omitted coefficients, but calling that quantity physical energy requires a model connecting energy to the relevant norm. String energy, for example, involves displacement gradients and velocities. The next chapter supplies the physical equations that determine how each spatial pattern evolves.",
    },
  ],
  teaching: {
    question:
      "How do we measure the amount of each wave pattern in a function?",
    why: "Fourier projection connects spatial shapes with mode amplitudes while distinguishing global approximation from pointwise accuracy.",
    outcomes: [
      "Derive Fourier coefficients using orthogonality.",
      "Compute square-wave harmonics and explain jump behaviour.",
      "Use the stated transform convention and interpret a pulse spectrum.",
    ],
    checkpoints: [
      {
        bridge: "Replace a finite dot product with an integral.",
        meaning: "Orthogonality isolates individual harmonic coefficients.",
        question: "Why divide a sine projection by π?",
        answer: "The sine harmonic's squared norm on [−π,π] is π.",
        further: [
          {
            question: "Why is the constant term a₀/2?",
            answer:
              "The constant function has squared norm 2π, twice that of a nonconstant harmonic.",
          },
          {
            question:
              "Can coefficients be defined before proving infinite-series convergence?",
            answer:
              "Yes. Each finite orthogonal projection is already a well-defined least-squares approximation.",
          },
          {
            question: "Why use 2πnx/L on a physical interval?",
            answer:
              "It makes the phase dimensionless and fits n full periods into length L.",
          },
        ],
      },
      {
        bridge: "Test the reconstruction near a jump.",
        meaning:
          "Convergence must specify both its hypotheses and its meaning.",
        question: "Why are the square wave's cosine coefficients zero?",
        answer:
          "The signal is odd, so its product with cosine is odd and integrates to zero symmetrically.",
        further: [
          {
            question: "Why do even sine harmonics vanish?",
            answer: "The coefficient contains 1 − (−1)ⁿ.",
          },
          {
            question:
              "What value does the series approach at a jump from −1 to +1?",
            answer: "Zero, the mean of the one-sided limits.",
          },
          {
            question:
              "Why does Gibbs overshoot not contradict convergence away from the jump?",
            answer:
              "Its region narrows and its worst location moves toward the jump as more terms are kept.",
          },
        ],
      },
      {
        bridge: "Let wavenumber vary continuously.",
        meaning:
          "Transform normalization controls inversion and norm identities.",
        question: "Why is the forward exponential negative?",
        answer:
          "It is the conjugate of the positive-exponential basis function under the chosen convention.",
        further: [
          {
            question: "What is the rectangular pulse transform at k = 0?",
            answer: "Its area, 2a, obtained directly or by taking the limit.",
          },
          {
            question:
              "What happens to the first spectral zero when a is halved?",
            answer: "It doubles from π/a to 2π/a.",
          },
          {
            question: "Does Parseval automatically measure physical energy?",
            answer:
              "No. It measures squared norm; the physical energy law must identify the relevant quantity.",
          },
        ],
      },
    ],
    takeaway:
      "Fourier coefficients are projections; their reconstruction and physical interpretation require explicit convergence and model assumptions.",
    nextConnection:
      "Wave and heat equations will show why the same spatial harmonics can oscillate in one system and decay in another.",
  },
  diagnostics: [
    {
      id: "d-mode",
      prompt:
        "Find the coefficient of (1,1)/√2 in the vector (1,1). Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 1.4142135623730951,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "The dot product is √2.",
      hint: "Project onto the normalized shape.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Project onto the normalized shape.",
        misconceptions: [],
      },
      prerequisiteId: "coupled-modes",
    },
    {
      id: "d-integral",
      prompt: "Evaluate ∫₀^π sin x dx. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 2,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "The antiderivative −cos x gives 2.",
      hint: "Use endpoint values.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Use endpoint values.",
        misconceptions: [],
      },
      prerequisiteId: "integration-methods",
    },
    {
      id: "d-complex",
      prompt: "The complex conjugate of exp(ikx), for real k and x, is:",
      answer: {
        kind: "choice",
        value: "0",
        options: [
          {
            id: "0",
            label: "exp(−ikx)",
          },
          {
            id: "1",
            label: "−exp(ikx)",
          },
          {
            id: "2",
            label: "exp(kx)",
          },
        ],
      },
      solution: "Conjugation reverses the imaginary phase.",
      hint: "Use Euler's formula.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Use Euler's formula.",
        misconceptions: [],
      },
      prerequisiteId: "complex-numbers",
    },
  ],
  workedExample: {
    title: "Extract and check two harmonics",
    problem:
      "For f(x) = 3cos x − 2sin(2x) on [−π,π], recover its nonzero coefficients and squared norm.",
    steps: [
      {
        title: "Check the mean",
        body: "Both harmonics integrate to zero, so a₀ = 0.",
        reason: "A full-period mean isolates the constant contribution.",
        trap: "The absence of a written constant must agree with the integral.",
      },
      {
        title: "Project onto cosine",
        body: "a₁ = (1/π)∫ f cos x dx = 3.",
        reason: "The mixed sine term vanishes by orthogonality.",
        trap: "Do not retain cross terms with zero integral.",
      },
      {
        title: "Project onto sine",
        body: "b₂ = (1/π)∫ f sin(2x) dx = −2; all other coefficients vanish.",
        reason: "The matching harmonic has squared norm π.",
        trap: "Projection preserves the negative sign.",
      },
      {
        title: "Check the squared size",
        body: "∫ f²dx = π(3² + (−2)²) = 13π.",
        reason: "Orthogonality removes the cross term in the square.",
        trap: "The norm is √(13π); the squared norm is 13π.",
      },
    ],
  },
  fadedExercise: {
    prompt: "Analyze g(x) = 2 + cos(2x) + 3sin x on [−π,π].",
    supplied: [
      {
        heading: "Independent facts",
        body: "The mean is 2; each nonconstant harmonic has squared norm π, and cross integrals vanish. Use a₀/2 for the constant term.",
      },
    ],
    steps: [
      {
        id: "f-constant",
        prompt: "Find a₀ when a₀/2 = 2. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: 4,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "a₀ = 4.",
        hint: "Respect the constant-term convention.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Respect the constant-term convention.",
          misconceptions: [],
        },
      },
      {
        id: "f-cosine",
        prompt: "Find a₂ by projection. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: 1,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution:
          "The cos(2x) coefficient is 1 because its projection integral is π.",
        hint: "Divide by the harmonic norm π.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Divide by the harmonic norm π.",
          misconceptions: [],
        },
      },
      {
        id: "f-size",
        prompt: "Compute π(4²/2 + 1² + 3²), the squared norm. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: 56.548667764616276,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "π(8 + 1 + 9) = 18π.",
        hint: "Include the constant's normalization.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Include the constant's normalization.",
          misconceptions: [],
        },
      },
      {
        id: "f-residual",
        prompt:
          "If 3sin x is omitted, find the integral of the squared residual. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: 28.274333882308138,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "The residual is 3sin x, whose squared norm is 9π.",
        hint: "Use the omitted orthogonal coefficient.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Use the omitted orthogonal coefficient.",
          misconceptions: [],
        },
      },
    ],
  },
  retrievalProblems: [
    {
      id: "r-projection",
      prompt:
        "Why does integrating against one harmonic isolate its coefficient?",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "All other functions are zero pointwise",
          },
          {
            id: "1",
            label:
              "Orthogonality cancels different harmonics over the interval",
          },
          {
            id: "2",
            label: "Integration always removes oscillations",
          },
        ],
      },
      solution:
        "Different harmonics have zero inner product over the full period.",
      hint: "Distinguish pointwise values from integral cancellation.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Distinguish pointwise values from integral cancellation.",
        misconceptions: [],
      },
    },
    {
      id: "r-square",
      prompt:
        "Find the square wave's third sine coefficient 4/(3π). Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 0.4244131815783876,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "The odd-harmonic formula gives 4/(3π).",
      hint: "Use n = 3.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Use n = 3.",
        misconceptions: [],
      },
    },
    {
      id: "r-jump",
      prompt:
        "At a jump with left value 2 and right value 6, a piecewise smooth Fourier series converges to:",
      answer: {
        kind: "choice",
        value: "2",
        options: [
          {
            id: "0",
            label: "2",
          },
          {
            id: "1",
            label: "6",
          },
          {
            id: "2",
            label: "4",
          },
        ],
      },
      solution: "The theorem gives the average (2 + 6)/2.",
      hint: "Use one-sided limits.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Use one-sided limits.",
        misconceptions: [],
      },
    },
    {
      id: "r-gibbs",
      prompt:
        "As more square-wave harmonics are retained, the Gibbs overshoot:",
      answer: {
        kind: "choice",
        value: "0",
        options: [
          {
            id: "0",
            label:
              "Occupies a narrower region but retains a nonvanishing relative peak",
          },
          {
            id: "1",
            label: "Vanishes uniformly everywhere",
          },
          {
            id: "2",
            label: "Grows without bound",
          },
        ],
      },
      solution:
        "The peak approaches the discontinuity rather than disappearing uniformly.",
      hint: "Separate width from height.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Separate width from height.",
        misconceptions: [],
      },
    },
    {
      id: "r-pulse",
      prompt:
        "A unit-height pulse occupies −3 m < x < 3 m. Find its transform at zero wavenumber.",
      answer: {
        kind: "numeric",
        value: 6,
        unit: "m",
        acceptedUnits: ["m"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "The zero-frequency integral equals the pulse area, 6 m.",
      hint: "Set the exponential to one.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Set the exponential to one.",
        misconceptions: [],
      },
    },
    {
      id: "r-transfer",
      prompt:
        "Under the stated transform convention, inverse reconstruction includes:",
      answer: {
        kind: "choice",
        value: "0",
        options: [
          {
            id: "0",
            label: "1/(2π) and exp(ikx)",
          },
          {
            id: "1",
            label: "No normalization and exp(−ikx)",
          },
          {
            id: "2",
            label: "1/π and exp(kx)",
          },
        ],
      },
      solution:
        "The forward negative phase pairs with a positive inverse phase and 1/(2π).",
      hint: "Keep the convention consistent.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Keep the convention consistent.",
        misconceptions: [],
      },
    },
  ],
  diagram: {
    title: "First three nonzero square-wave harmonics",
    caption:
      "The ink step is the periodic target near its central jump. The accent polyline is (4/π)[sin x + sin(3x)/3 + sin(5x)/5] on [−π,π], showing smooth transitions and overshoot.",
    viewBox: [0, 0, 600, 320],
    elements: [
      {
        kind: "line",
        from: [50, 160],
        to: [550, 160],
        tone: "muted",
      },
      {
        kind: "line",
        from: [300, 290],
        to: [300, 30],
        tone: "muted",
      },
      {
        kind: "line",
        from: [50, 240],
        to: [300, 240],
        tone: "ink",
      },
      {
        kind: "line",
        from: [300, 80],
        to: [550, 80],
        tone: "ink",
      },
      {
        kind: "line",
        from: [50, 160.00000000000003],
        to: [56.25, 183.71392390112854],
        tone: "accent",
      },
      {
        kind: "line",
        from: [56.25, 183.71392390112854],
        to: [62.5, 205.75370901447656],
        tone: "accent",
      },
      {
        kind: "line",
        from: [62.5, 205.75370901447656],
        to: [68.75, 224.65041378648613],
        tone: "accent",
      },
      {
        kind: "line",
        from: [68.75, 224.65041378648613],
        to: [75, 239.31664341712602],
        tone: "accent",
      },
      {
        kind: "line",
        from: [75, 239.31664341712602],
        to: [81.25, 249.1694657650757],
        tone: "accent",
      },
      {
        kind: "line",
        from: [81.25, 249.1694657650757],
        to: [87.5, 254.18318971790012],
        tone: "accent",
      },
      {
        kind: "line",
        from: [87.5, 254.18318971790012],
        to: [93.75, 254.86561823075792],
        tone: "accent",
      },
      {
        kind: "line",
        from: [93.75, 254.86561823075792],
        to: [100, 252.1625879178076],
        tone: "accent",
      },
      {
        kind: "line",
        from: [100, 252.1625879178076],
        to: [106.25, 247.30601011517274],
        tone: "accent",
      },
      {
        kind: "line",
        from: [106.25, 247.30601011517274],
        to: [112.5, 241.62867933157762],
        tone: "accent",
      },
      {
        kind: "line",
        from: [112.5, 241.62867933157762],
        to: [118.75, 236.37361860822085],
        tone: "accent",
      },
      {
        kind: "line",
        from: [118.75, 236.37361860822085],
        to: [125, 232.5260325118718],
        tone: "accent",
      },
      {
        kind: "line",
        from: [125, 232.5260325118718],
        to: [131.25, 230.69202064430206],
        tone: "accent",
      },
      {
        kind: "line",
        from: [131.25, 230.69202064430206],
        to: [137.5, 231.04069031727988],
        tone: "accent",
      },
      {
        kind: "line",
        from: [137.5, 231.04069031727988],
        to: [143.75, 233.31636211655655],
        tone: "accent",
      },
      {
        kind: "line",
        from: [143.75, 233.31636211655655],
        to: [150, 236.9167165451798],
        tone: "accent",
      },
      {
        kind: "line",
        from: [150, 236.9167165451798],
        to: [156.25, 241.02264443602024],
        tone: "accent",
      },
      {
        kind: "line",
        from: [156.25, 241.02264443602024],
        to: [162.5, 244.75777620904938],
        tone: "accent",
      },
      {
        kind: "line",
        from: [162.5, 244.75777620904938],
        to: [168.75, 247.3513561301456],
        tone: "accent",
      },
      {
        kind: "line",
        from: [168.75, 247.3513561301456],
        to: [175, 248.27794176830463],
        tone: "accent",
      },
      {
        kind: "line",
        from: [175, 248.27794176830463],
        to: [181.25, 247.35135613014558],
        tone: "accent",
      },
      {
        kind: "line",
        from: [181.25, 247.35135613014558],
        to: [187.5, 244.75777620904938],
        tone: "accent",
      },
      {
        kind: "line",
        from: [187.5, 244.75777620904938],
        to: [193.75, 241.02264443602022],
        tone: "accent",
      },
      {
        kind: "line",
        from: [193.75, 241.02264443602022],
        to: [200, 236.91671654517978],
        tone: "accent",
      },
      {
        kind: "line",
        from: [200, 236.91671654517978],
        to: [206.25, 233.31636211655655],
        tone: "accent",
      },
      {
        kind: "line",
        from: [206.25, 233.31636211655655],
        to: [212.5, 231.04069031727988],
        tone: "accent",
      },
      {
        kind: "line",
        from: [212.5, 231.04069031727988],
        to: [218.75, 230.69202064430203],
        tone: "accent",
      },
      {
        kind: "line",
        from: [218.75, 230.69202064430203],
        to: [225, 232.5260325118718],
        tone: "accent",
      },
      {
        kind: "line",
        from: [225, 232.5260325118718],
        to: [231.25, 236.37361860822088],
        tone: "accent",
      },
      {
        kind: "line",
        from: [231.25, 236.37361860822088],
        to: [237.5, 241.62867933157764],
        tone: "accent",
      },
      {
        kind: "line",
        from: [237.5, 241.62867933157764],
        to: [243.75, 247.30601011517277],
        tone: "accent",
      },
      {
        kind: "line",
        from: [243.75, 247.30601011517277],
        to: [250, 252.1625879178076],
        tone: "accent",
      },
      {
        kind: "line",
        from: [250, 252.1625879178076],
        to: [256.25, 254.86561823075792],
        tone: "accent",
      },
      {
        kind: "line",
        from: [256.25, 254.86561823075792],
        to: [262.5, 254.1831897179001],
        tone: "accent",
      },
      {
        kind: "line",
        from: [262.5, 254.1831897179001],
        to: [268.75, 249.1694657650757],
        tone: "accent",
      },
      {
        kind: "line",
        from: [268.75, 249.1694657650757],
        to: [275, 239.316643417126],
        tone: "accent",
      },
      {
        kind: "line",
        from: [275, 239.316643417126],
        to: [281.25, 224.6504137864861],
        tone: "accent",
      },
      {
        kind: "line",
        from: [281.25, 224.6504137864861],
        to: [287.5, 205.75370901447656],
        tone: "accent",
      },
      {
        kind: "line",
        from: [287.5, 205.75370901447656],
        to: [293.75, 183.7139239011285],
        tone: "accent",
      },
      {
        kind: "line",
        from: [293.75, 183.7139239011285],
        to: [300, 160],
        tone: "accent",
      },
      {
        kind: "line",
        from: [300, 160],
        to: [306.25, 136.28607609887163],
        tone: "accent",
      },
      {
        kind: "line",
        from: [306.25, 136.28607609887163],
        to: [312.5, 114.24629098552346],
        tone: "accent",
      },
      {
        kind: "line",
        from: [312.5, 114.24629098552346],
        to: [318.75, 95.3495862135139],
        tone: "accent",
      },
      {
        kind: "line",
        from: [318.75, 95.3495862135139],
        to: [325, 80.68335658287408],
        tone: "accent",
      },
      {
        kind: "line",
        from: [325, 80.68335658287408],
        to: [331.25, 70.83053423492431],
        tone: "accent",
      },
      {
        kind: "line",
        from: [331.25, 70.83053423492431],
        to: [337.5, 65.81681028209991],
        tone: "accent",
      },
      {
        kind: "line",
        from: [337.5, 65.81681028209991],
        to: [343.75, 65.1343817692421],
        tone: "accent",
      },
      {
        kind: "line",
        from: [343.75, 65.1343817692421],
        to: [350, 67.8374120821924],
        tone: "accent",
      },
      {
        kind: "line",
        from: [350, 67.8374120821924],
        to: [356.25, 72.69398988482722],
        tone: "accent",
      },
      {
        kind: "line",
        from: [356.25, 72.69398988482722],
        to: [362.5, 78.37132066842237],
        tone: "accent",
      },
      {
        kind: "line",
        from: [362.5, 78.37132066842237],
        to: [368.75, 83.62638139177909],
        tone: "accent",
      },
      {
        kind: "line",
        from: [368.75, 83.62638139177909],
        to: [375, 87.47396748812821],
        tone: "accent",
      },
      {
        kind: "line",
        from: [375, 87.47396748812821],
        to: [381.25, 89.30797935569797],
        tone: "accent",
      },
      {
        kind: "line",
        from: [381.25, 89.30797935569797],
        to: [387.5, 88.95930968272012],
        tone: "accent",
      },
      {
        kind: "line",
        from: [387.5, 88.95930968272012],
        to: [393.75, 86.68363788344341],
        tone: "accent",
      },
      {
        kind: "line",
        from: [393.75, 86.68363788344341],
        to: [400, 83.0832834548202],
        tone: "accent",
      },
      {
        kind: "line",
        from: [400, 83.0832834548202],
        to: [406.25, 78.97735556397983],
        tone: "accent",
      },
      {
        kind: "line",
        from: [406.25, 78.97735556397983],
        to: [412.5, 75.24222379095065],
        tone: "accent",
      },
      {
        kind: "line",
        from: [412.5, 75.24222379095065],
        to: [418.75, 72.6486438698544],
        tone: "accent",
      },
      {
        kind: "line",
        from: [418.75, 72.6486438698544],
        to: [425, 71.72205823169537],
        tone: "accent",
      },
      {
        kind: "line",
        from: [425, 71.72205823169537],
        to: [431.25, 72.6486438698544],
        tone: "accent",
      },
      {
        kind: "line",
        from: [431.25, 72.6486438698544],
        to: [437.5, 75.24222379095063],
        tone: "accent",
      },
      {
        kind: "line",
        from: [437.5, 75.24222379095063],
        to: [443.75, 78.97735556397978],
        tone: "accent",
      },
      {
        kind: "line",
        from: [443.75, 78.97735556397978],
        to: [450, 83.08328345482019],
        tone: "accent",
      },
      {
        kind: "line",
        from: [450, 83.08328345482019],
        to: [456.25, 86.68363788344342],
        tone: "accent",
      },
      {
        kind: "line",
        from: [456.25, 86.68363788344342],
        to: [462.5, 88.95930968272012],
        tone: "accent",
      },
      {
        kind: "line",
        from: [462.5, 88.95930968272012],
        to: [468.75, 89.30797935569797],
        tone: "accent",
      },
      {
        kind: "line",
        from: [468.75, 89.30797935569797],
        to: [475, 87.47396748812821],
        tone: "accent",
      },
      {
        kind: "line",
        from: [475, 87.47396748812821],
        to: [481.25, 83.62638139177909],
        tone: "accent",
      },
      {
        kind: "line",
        from: [481.25, 83.62638139177909],
        to: [487.5, 78.37132066842238],
        tone: "accent",
      },
      {
        kind: "line",
        from: [487.5, 78.37132066842238],
        to: [493.75, 72.69398988482723],
        tone: "accent",
      },
      {
        kind: "line",
        from: [493.75, 72.69398988482723],
        to: [500, 67.8374120821924],
        tone: "accent",
      },
      {
        kind: "line",
        from: [500, 67.8374120821924],
        to: [506.25, 65.13438176924205],
        tone: "accent",
      },
      {
        kind: "line",
        from: [506.25, 65.13438176924205],
        to: [512.5, 65.81681028209987],
        tone: "accent",
      },
      {
        kind: "line",
        from: [512.5, 65.81681028209987],
        to: [518.75, 70.83053423492424],
        tone: "accent",
      },
      {
        kind: "line",
        from: [518.75, 70.83053423492424],
        to: [525, 80.68335658287398],
        tone: "accent",
      },
      {
        kind: "line",
        from: [525, 80.68335658287398],
        to: [531.25, 95.34958621351397],
        tone: "accent",
      },
      {
        kind: "line",
        from: [531.25, 95.34958621351397],
        to: [537.5, 114.24629098552344],
        tone: "accent",
      },
      {
        kind: "line",
        from: [537.5, 114.24629098552344],
        to: [543.75, 136.2860760988716],
        tone: "accent",
      },
      {
        kind: "line",
        from: [543.75, 136.2860760988716],
        to: [550, 159.99999999999997],
        tone: "accent",
      },
      {
        kind: "label",
        at: [50, 305],
        text: "−π",
      },
      {
        kind: "label",
        at: [305, 305],
        text: "0",
      },
      {
        kind: "label",
        at: [535, 305],
        text: "π",
      },
      {
        kind: "label",
        at: [555, 85],
        text: "+1",
      },
      {
        kind: "label",
        at: [555, 245],
        text: "−1",
      },
    ],
  },
  sidebars: [
    {
      heading: "Why finite projection minimizes squared error",
      body: "Write $f=S_N+r$, where $S_N$ is its orthogonal projection onto the retained harmonics and $r$ is orthogonal to their span. For any other candidate $T_N$ in that span, $\\|f-T_N\\|^2=\\|r\\|^2+\\|S_N-T_N\\|^2$, because the cross inner product vanishes. The minimum occurs at $T_N=S_N$. This is an integrated squared-error claim, not a guarantee about the largest pointwise error.",
    },
  ],
  sources: [
    {
      title: "Cambridge · Mathematical Methods II",
      url: "https://www.damtp.cam.ac.uk/user/gio10/nst_notes.pdf",
    },
    {
      title: "MIT OpenCourseWare · Single Variable Calculus",
      url: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
    },
  ],
};
chapter.sidebars.push({
  heading: "Fourier coefficients are coordinates obtained by projection",
  body: String.raw`For ordinary orthonormal vectors, a component is obtained by taking an inner product with a basis vector. Fourier analysis does the same thing with functions. On $[0,L]$, define $\langle f,g\rangle=\int_0^L f(x)g(x)\,dx$ for real functions. Distinct sine modes $\phi_n=\sin(n\pi x/L)$ are orthogonal, and $\langle\phi_n,\phi_n\rangle=L/2$.

If $f\approx\sum_{n=1}^Na_n\phi_n$, taking the inner product with $\phi_m$ removes every term except one:
$$a_m=\frac{\langle f,\phi_m\rangle}{\langle\phi_m,\phi_m\rangle}.$$
This is the projection formula from vectors, with an integral replacing a finite sum.

Why are these coefficients the best ones for squared error? Let r be the residual after projection. It is orthogonal to every retained mode. Changing the approximation by any retained combination h gives
$$\|r-h\|^2=\|r\|^2+\|h\|^2,$$
because the cross term vanishes. No such change reduces the integrated squared error.

That is a precise sense of “best,” but it does not promise small error at every point. A sharp edge can retain overshoot while the integrated error shrinks. The choice of inner product determines what is being minimised. Fourier analysis is linear algebra in a function space, and its convergence questions ask how faithfully finite-dimensional projections approximate the original object.`,
});

export default chapter;
