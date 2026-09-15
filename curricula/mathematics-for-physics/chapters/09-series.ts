import type { Chapter } from "../chapter";
const chapter: Chapter = {
  theoreticalMinimum: { coreIdea: "A Taylor approximation matches local derivatives, and its usefulness depends on controlling the terms that were left out. Matching more derivatives gives a more detailed local model, but the result is meaningful only together with an estimate of the remainder and a stated range of validity.", widerConnection: "Approximation error becomes a recurring bridge between ideal physics, numerical calculation, Fourier representation, and synthesis investigations. The course will keep separating a finite approximation, an infinite convergent representation, and the physical model that motivated either one." },
  id: "series",
  intuition: {
    body: "A pendulum released through a small angle swings almost like one released through an even smaller angle. The gravitational restoring effect contains $\\sin\\theta$, yet the simpler model replaces this with $\\theta$. Why should replacing one function by another work, and how small must the angle be before the replacement meets a measurement's tolerance?\n\nAn approximation is a deliberately simpler description with a statement about what it leaves behind. A tangent line already supplies a local model: it matches a function's value and slope at one point. It does not follow curvature, so a quadratic correction should help. We will build these corrections by matching information we know, rather than memorizing a list of expansions.\n\nThe distinction between a useful local approximation and a representation valid everywhere is essential. A short polynomial may work beautifully over a small interval while failing at a distant input. Adding terms does not establish accuracy without an error argument. We will keep the pendulum's restoring factor in view, measuring angles in radians and asking what the approximation actually establishes.\n\nOur route is to construct a polynomial, control the remainder, and then examine the separate question of an infinite sum. The period of the pendulum requires a later dynamical calculation; controlling the sine approximation is one ingredient in that calculation, not a substitute for it.",
    thoughtExperiments: [
      "How could two curves with the same value and slope at zero still disagree nearby?",
      "Would adding terms to an infinite series improve a prediction at every input?",
    ],
  },
  theory: [
    {
      heading: "1. Build a polynomial from local measurements",
      body: "Imagine measuring the restoring factor $\\sin\\theta$ close to zero. Its value at zero is zero, its slope is one, and its second derivative at zero vanishes. A polynomial should reproduce those measurements before we trust it away from zero. Write $P_3(\\theta)=a_0+a_1\\theta+a_2\\theta^2+a_3\\theta^3$. Evaluation at zero identifies $a_0$; one derivative identifies $a_1$; two derivatives identify $2a_2$; three identify $6a_3$. The numerical factors arise from repeated differentiation.\n\nFor a smooth function $f$ near a point $a$, let $h=x-a$ be the displacement from that point. Matching derivatives through order $n$ yields\n$$P_n(a+h)=\\sum_{j=0}^n\\frac{f^{(j)}(a)}{j!}h^j.$$\nHere $f^{(j)}$ is the $j$th derivative, $f^{(0)}=f$, and $j!=1\\cdot2\\cdots j$, with $0!=1$. This Taylor polynomial includes one more piece of local information with each new term: value, slope, curvature, and higher changes of shape.\n\nFor sine, the successive derivatives at zero begin $0,1,0,-1$. Therefore $P_3(\\theta)=\\theta-\\theta^3/6$. The negative correction says something physical: for a small positive angle the sine is below its tangent line, so the linear model overestimates the restoring factor. At $0.2$ rad the linear value is $0.2$, whereas the cubic value is $0.198666\\ldots$. We can already interpret the correction before deciding how accurately it follows sine.\n\nThe expansion point is a choice. To estimate a square root near $4$, derivatives at $4$ are more convenient than derivatives at zero, where the square-root derivative is singular. Powers must then be powers of $x-4$. Matching derivatives at one point does not force agreement elsewhere: adding a multiple of $(x-a)^{n+1}$ changes the function while preserving all the matched data.\n\nWhen the input has units, the derivative in each term carries the compensating units needed for that term to match the output. A sine argument must be dimensionless; one cannot start from the sine of an unscaled length. These checks prevent an algebraically tidy expansion from concealing a physically meaningless starting expression.\n\nA numerical square-root example shows how the centre and the required accuracy interact. For $f(x)=\\sqrt{x}$ near $a=1$, the first derivatives give $P_2(1+h)=1+h/2-h^2/8$. At $h=0.1$, the linear estimate is 1.05 and the quadratic estimate is 1.04875. The second correction is small because the displacement from the centre is small, not because square roots are globally close to straight lines. If the target were instead near 100, centring at 100 would again keep the displacement small relative to the local scale.\n\nThe retained powers also tell us how an error estimate should respond to changing the interval. A cubic-order remainder bound proportional to $|h|^3$ becomes eight times smaller when $|h|$ is halved, provided the same derivative bound remains valid. This comparison is often more useful than a long decimal output: it predicts how much improvement a smaller step or a closer expansion point can deliver.",
    },
    {
      heading: "2. Bound what the polynomial leaves out",
      body: "Suppose a sensor can resolve changes of a few millionths in the restoring factor. Giving a six-decimal prediction is useful only if the neglected contribution is smaller than that scale. Define the remainder $R_n(x)=f(x)-P_n(x)$, the signed difference between the true function and its model. A bound contains that difference within a guaranteed interval; it need not equal the actual error.\n\nRepeated application of the fundamental theorem of calculus gives the integral remainder\n$$R_n(a+h)=\\frac{1}{n!}\\int_a^{a+h}f^{(n+1)}(t)(a+h-t)^n\\,dt.$$\nThe first instance is familiar: $f(a+h)-f(a)$ is the integral of $f'$. Subtracting the constant-slope contribution leaves the integral of $f'(t)-f'(a)$; expressing this difference as an integral of $f''$ produces the next correction. Continuing this process explains why an extra derivative controls the next neglected power. We assume the relevant derivatives are continuous on the intervening interval.\n\nIf $|f^{(n+1)}(t)|\\leq M$ throughout that interval, integration of the remaining power gives\n$$|R_n(a+h)|\\leq\\frac{M|h|^{n+1}}{(n+1)!}.$$\nThe entire interval matters because the remainder samples it. Evaluating the derivative only at the final point is not generally a valid maximum. A larger valid choice of $M$ produces a weaker but still correct guarantee.\n\nFor sine, the fourth Taylor coefficient at zero vanishes, so the cubic polynomial is also its fourth-order Taylor polynomial. Its fifth derivative is cosine, bounded in magnitude by one. Thus\n$$|\\sin\\theta-(\\theta-\\theta^3/6)|\\leq|\\theta|^5/120.$$\nAt $0.2$ rad this is approximately $2.67\\times10^{-6}$. For the linear approximation, applying the same idea to the second-order polynomial gives $|\\sin\\theta-\\theta|\\leq|\\theta|^3/6$.\n\nRelative to the proposed linear factor, the discrepancy is therefore at most $\\theta^2/6$ for nonzero $\\theta$. This is not exactly the error relative to the true sine, which has a different denominator. Near a zero, relative error may be undefined while absolute error stays useful. A careful report names the comparison being made and ties the retained terms to the required tolerance; there is no universal angle below which every experiment may neglect the correction.",
    },
    {
      heading: "3. Decide whether an infinite series represents the function",
      body: "Imagine adding a fixed fraction of the previous correction each time. The finite sum $S_n=1+x+\\cdots+x^n$ can be evaluated before taking any limit. Subtracting $xS_n$ cancels all intermediate terms, giving $(1-x)S_n=1-x^{n+1}$ and hence\n$$S_n=\\frac{1-x^{n+1}}{1-x}\\qquad(x\\ne1).$$\nOnly if $|x|<1$ does the leftover power tend to zero, establishing $1/(1-x)=\\sum_{j=0}^{\\infty}x^j$ there. The exact finite remainder is $x^{n+1}/(1-x)$.\n\nThe function exists at many points where this series fails. At $x=2$ the rational expression equals $-1$, but the positive partial sums grow. At $x=-1$ they alternate between one and zero, so they have no ordinary limit. At $x=1$ the rational expression itself is undefined. These failures are different, and direct substitution into a formula obtained under $|x|<1$ cannot repair them.\n\nA power series has a radius of convergence: inside that distance from its centre it converges absolutely, while boundary points need separate analysis. The geometric series has radius one. A finite polynomial has no infinite-sum convergence issue; its usefulness depends on its approximation error at the point in question. Confusing the two questions can lead either to rejecting a good finite model or trusting a divergent representation.\n\nEven a function with derivatives of every order need not equal its Taylor series. That stronger property is called analyticity. One must establish that the remainders tend to zero, not simply keep writing derivative coefficients. For sine, the factorial in the derivative bound supplies that argument at every fixed real angle, although a low-order truncation can still be poor at a large angle.\n\nReturn to the pendulum. We now know when replacing sine by a linear or cubic expression meets a specified bound on the restoring factor. We have not derived a period correction or an exact polynomial force law. The transferable method is to choose a sensible centre, match the available local data, and retain an explicit account of the neglected contribution.",
    },
  ],
  teaching: {
    question: "When can we trust a simpler formula?",
    why: "Controlled approximation lets a physical model make accurate predictions without hiding its limits.",
    outcomes: [
      "Construct a polynomial from derivative data.",
      "Bound an error on a stated interval.",
      "Distinguish local approximation from infinite-series equality.",
    ],
    checkpoints: [
      {
        bridge: "Match local measurements.",
        meaning: "Derivative matching determines the polynomial coefficients.",
        question: "Why divide the second derivative by two?",
        answer: "Two differentiations multiply the quadratic coefficient by 2.",
        further: [
          {
            question: "Why is the cubic sine coefficient negative?",
            answer:
              "Its third derivative at zero is −1, so the coefficient is −1/6.",
          },
          {
            question: "Which powers appear when expanding about 4?",
            answer:
              "Powers of x − 4, which vanish at the point where data are matched.",
          },
          {
            question:
              "Does matching finitely many derivatives force global equality?",
            answer:
              "No. Adding a higher power preserves the matched data and changes values elsewhere.",
          },
        ],
      },
      {
        bridge: "Compare the neglected contribution with a tolerance.",
        meaning: "Bounds require information throughout the interval.",
        question: "Why must M bound the derivative between the endpoints?",
        answer: "The integral remainder samples every point in that interval.",
        further: [
          {
            question:
              "Why does the cubic sine estimate admit a fifth-power bound?",
            answer:
              "The fourth Taylor coefficient vanishes, so it also equals P₄.",
          },
          {
            question: "Is an error bound the actual error?",
            answer:
              "No. It is a guaranteed maximum magnitude and may be conservative.",
          },
          {
            question: "Why avoid relative error at a zero?",
            answer:
              "Its denominator vanishes; absolute error still describes the discrepancy.",
          },
        ],
      },
      {
        bridge: "Check the term left over before taking a limit.",
        meaning:
          "Finite approximations and infinite representations require different checks.",
        question: "What proves geometric-series convergence for |x| < 1?",
        answer: "The exact remainder xⁿ⁺¹/(1 − x) tends to zero.",
        further: [
          {
            question: "Why does the series fail at x = 2?",
            answer: "Its terms grow instead of tending to zero.",
          },
          {
            question: "Do infinitely many derivatives establish analyticity?",
            answer: "No. One also needs Taylor remainders tending to zero.",
          },
          {
            question:
              "Does convergence of the sine series guarantee a good linear estimate at 3 rad?",
            answer:
              "No. Convergence of the entire sum does not make a one-term truncation accurate.",
          },
        ],
      },
    ],
    takeaway:
      "State the expansion point, retained terms and an error argument together.",
    nextConnection:
      "Vectors will organize several quantities at once; later, local Taylor models will extend to several directions.",
  },
  diagnostics: [
    {
      id: "d-integral",
      prompt: "Integrate t² from 0 to 1. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 0.3333333333333333,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "The antiderivative t³/3 gives 1/3.",
      hint: "Use the power rule in reverse.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Use the power rule in reverse.",
        misconceptions: [],
      },
      prerequisiteId: "integration-methods",
    },
    {
      id: "d-derivative",
      prompt: "Find the second derivative of x³ at x = 2. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 12,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "Two derivatives give 6x = 12.",
      hint: "Differentiate before substituting.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Differentiate before substituting.",
        misconceptions: [],
      },
    },
  ],
  workedExample: {
    title: "A square root with a guaranteed error",
    problem: "Estimate √1.1 using a quadratic Taylor polynomial at 1.",
    steps: [
      {
        title: "Choose the centre",
        body: "Use a = 1 and h = 0.1.",
        reason: "Values and derivatives are simple at 1.",
        trap: "The square-root derivative is singular at zero.",
      },
      {
        title: "Match derivatives",
        body: "f(1) = 1, f′(1) = 1/2, f″(1) = −1/4, so P₂ = 1 + h/2 − h²/8.",
        reason: "The second derivative is divided by 2!.",
        trap: "The quadratic coefficient is not −1/4.",
      },
      {
        title: "Evaluate",
        body: "P₂(1.1) = 1.04875.",
        reason: "Include the curvature correction.",
        trap: "Do not round away 0.00125.",
      },
      {
        title: "Bound the error",
        body: "On $[1,1.1]$, $|f'''(x)|=3/(8x^{5/2})\\leq3/8$, so $|R_2|\\leq(3/8)(0.1)^3/6=0.0000625$.",
        reason: "Use a bound valid over the whole interval.",
        trap: "The derivative at the right endpoint is not the maximum.",
      },
    ],
  },
  fadedExercise: {
    prompt: "Estimate exp(0.2) and its error using a quadratic polynomial.",
    supplied: [
      {
        heading: "Inputs for every step",
        body: "All derivatives of exp at zero equal 1. Use P₂ = 1 + h + h²/2, h = 0.2, and the supplied bound exp(t) < 1.23 on [0, 0.2].",
      },
    ],
    steps: [
      {
        id: "f-term",
        prompt: "Find h²/2 for h = 0.2. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: 0.02,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "0.04/2 = 0.02.",
        hint: "Square first.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Square first.",
          misconceptions: [],
        },
      },
      {
        id: "f-estimate",
        prompt: "Evaluate 1 + 0.2 + 0.02. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: 1.22,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "The quadratic estimate is 1.22.",
        hint: "Sum the retained terms.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Sum the retained terms.",
          misconceptions: [],
        },
      },
      {
        id: "f-error",
        prompt: "Evaluate 1.23(0.2)³/6. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: 0.00164,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "1.23 × 0.008/6 = 0.00164.",
        hint: "Use the third-derivative bound.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Use the third-derivative bound.",
          misconceptions: [],
        },
      },
      {
        id: "f-tolerance",
        prompt:
          "With an error bound of 0.00164, which tolerance is guaranteed?",
        answer: {
          kind: "choice",
          value: "1",
          options: [
            {
              id: "0",
              label: "0.0001",
            },
            {
              id: "1",
              label: "0.002",
            },
            {
              id: "2",
              label: "Zero",
            },
          ],
        },
        solution: "The bound is below 0.002 but not below 0.0001.",
        hint: "Compare the bound with each tolerance.",
        rubric: {
          defaultCategory: "conceptual",
          explanation: "Compare the bound with each tolerance.",
          misconceptions: [],
        },
      },
    ],
  },
  retrievalProblems: [
    {
      id: "r-coefficient",
      prompt: "If f″(a) = 8, find the coefficient of (x − a)². Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 4,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "8/2! = 4.",
      hint: "Match the second derivative.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Match the second derivative.",
        misconceptions: [],
      },
    },
    {
      id: "r-finite",
      prompt: "What justifies using a finite Taylor approximation?",
      answer: {
        kind: "choice",
        value: "0",
        options: [
          {
            id: "0",
            label: "Controlled error where it is used",
          },
          {
            id: "1",
            label: "Convergence at every real input",
          },
          {
            id: "2",
            label: "An infinite number of terms",
          },
        ],
      },
      solution:
        "A finite model needs an error argument in its intended region.",
      hint: "Separate approximation from infinite convergence.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Separate approximation from infinite convergence.",
        misconceptions: [],
      },
    },
    {
      id: "r-sine",
      prompt: "Evaluate θ − θ³/6 at θ = 0.3. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 0.2955,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "0.3 − 0.027/6 = 0.2955.",
      hint: "The correction is negative.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "The correction is negative.",
        misconceptions: [],
      },
    },
    {
      id: "r-sum",
      prompt: "Sum 1 + 0.5 + 0.5² + 0.5³. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 1.875,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "1 + 0.5 + 0.25 + 0.125 = 1.875.",
      hint: "This is a finite sum.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "This is a finite sum.",
        misconceptions: [],
      },
    },
    {
      id: "r-boundary",
      prompt: "At x = −1, what happens to 1 + x + x² + …?",
      answer: {
        kind: "choice",
        value: "2",
        options: [
          {
            id: "0",
            label: "It converges to 1/2",
          },
          {
            id: "1",
            label: "It converges to zero",
          },
          {
            id: "2",
            label: "Its partial sums alternate without converging",
          },
        ],
      },
      solution: "The partial sums are 1, 0, 1, 0, ….",
      hint: "Examine partial sums.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Examine partial sums.",
        misconceptions: [],
      },
    },
    {
      id: "r-transfer",
      prompt: "Halving θ changes the relative-to-θ bound θ²/6 by what factor?",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "One half",
          },
          {
            id: "1",
            label: "One quarter",
          },
          {
            id: "2",
            label: "Two",
          },
        ],
      },
      solution: "The bound is quadratic, so halving θ multiplies it by 1/4.",
      hint: "Track the power.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Track the power.",
        misconceptions: [],
      },
    },
  ],
  diagram: {
    title: "Sine and its tangent",
    caption:
      "θ runs from 0 to 1 rad horizontally. The tangent θ lies above sin θ; their gap grows with angle.",
    viewBox: [0, 0, 600, 320],
    elements: [
      {
        kind: "line",
        from: [60, 270],
        to: [550, 270],
        tone: "muted",
      },
      {
        kind: "line",
        from: [60, 270],
        to: [60, 40],
        tone: "muted",
      },
      {
        kind: "line",
        from: [60, 270],
        to: [510, 70],
        tone: "accent",
      },
      {
        kind: "line",
        from: [60, 270],
        to: [105, 250.03331667063438],
        tone: "ink",
      },
      {
        kind: "line",
        from: [105, 250.03331667063438],
        to: [150, 230.26613384098775],
        tone: "ink",
      },
      {
        kind: "line",
        from: [150, 230.26613384098775],
        to: [195, 210.8959586677321],
        tone: "ink",
      },
      {
        kind: "line",
        from: [195, 210.8959586677321],
        to: [240, 192.1163315382699],
        tone: "ink",
      },
      {
        kind: "line",
        from: [240, 192.1163315382699],
        to: [285, 174.1148922791594],
        tone: "ink",
      },
      {
        kind: "line",
        from: [285, 174.1148922791594],
        to: [330, 157.0715053209929],
        tone: "ink",
      },
      {
        kind: "line",
        from: [330, 157.0715053209929],
        to: [375, 141.1564625524618],
        tone: "ink",
      },
      {
        kind: "line",
        from: [375, 141.1564625524618],
        to: [420, 126.52878182009545],
        tone: "ink",
      },
      {
        kind: "line",
        from: [420, 126.52878182009545],
        to: [465, 113.33461807450331],
        tone: "ink",
      },
      {
        kind: "line",
        from: [465, 113.33461807450331],
        to: [510, 101.7058030384207],
        tone: "ink",
      },
      {
        kind: "label",
        at: [440, 55],
        text: "θ",
      },
      {
        kind: "label",
        at: [440, 125],
        text: "sin θ",
      },
      {
        kind: "label",
        at: [490, 300],
        text: "1 rad",
      },
      {
        kind: "label",
        at: [40, 290],
        text: "0",
      },
    ],
  },
  sidebars: [
    {
      heading: "Smoothness is weaker than analyticity",
      body: "Set $f(x)=e^{-1/x^2}$ when $x\\ne0$ and $f(0)=0$. Every derivative at zero vanishes: differentiating away from zero gives powers of $1/x$ multiplying the exponential, whose decay dominates each such power. Thus all Taylor polynomials at zero vanish, while the function is positive elsewhere. The example shows why derivative matching alone cannot establish equality to an infinite Taylor series.",
    },
  ],
  sources: [
    {
      title: "MIT OpenCourseWare · Single Variable Calculus",
      url: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
    },
  ],
};
chapter.sidebars.push({
  heading: "A small error can become large after enough time",
  body: String.raw`Suppose an oscillator has exact motion $\cos((1+\varepsilon)t)$ in dimensionless time, with $|\varepsilon|\ll1$. Replacing its frequency by one gives $\cos t$. Is the approximation good simply because the frequency error is small?

Expand in the frequency change while holding t fixed:
$$\cos((1+\varepsilon)t)=\cos t-\varepsilon t\sin t+O((\varepsilon t)^2).$$
The correction contains $\varepsilon t$, not just $\varepsilon$. For times of order one, it is small. For times of order $1/|\varepsilon|$, the phase difference is of order one and the two oscillations may disagree strongly, despite having the same amplitude.

This is a different failure from an amplitude blowing up. Both exact and approximate motions stay between minus one and one. Their timing drifts. A graph over a few cycles can hide the problem because it has not run long enough to expose the accumulated phase error.

The better expression, when the corrected frequency is known, keeps it inside the cosine. Expanding every part of an answer is not always the most useful way to approximate it. In later numerical mechanics, a method may conserve energy quite well and still develop phase error. A trustworthy approximation must therefore specify both a small parameter and the interval over which its error is controlled.`,
});

export default chapter;
