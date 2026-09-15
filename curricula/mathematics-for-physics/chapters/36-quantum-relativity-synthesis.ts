import type { Chapter } from "../chapter";
const chapter: Chapter = {
  id: "quantum-relativity-synthesis",
  intuition: {
    body: "Two calculations can begin with a column of numbers and a matrix multiplication yet describe very different experiments. In a two-state quantum model, a transformation preserves the positive complex norm that normalizes outcome probabilities. In a spacetime calculation, a Lorentz boost preserves an interval with a negative time contribution.\n\nThe shared mathematical question is which bilinear or sesquilinear form survives the transformation. A sesquilinear form conjugates one argument and is linear in the other; the complex inner product is the example here. Naming the preserved form prevents a superficial similarity between matrices from turning into a false physical identification.\n\nWe will perform two separate investigations. First transform a normalized two-state vector and compute probabilities in a fixed measurement basis, including a comparison that reveals relative phase. Then transform timelike, spacelike and null event separations and verify their intervals directly.\n\nThis capstone is a bridge into further physics rather than a unification of quantum theory and relativity. Its standard of success is concrete: carry the units and conventions, distinguish a physical state change from a basis relabelling, and explain why each invariant has the physical meaning claimed for it.",
    thoughtExperiments: [
      "If total quantum probability stays one, must each individual measurement probability stay unchanged?",
      "If a boost preserves a spacetime interval, must it preserve the Euclidean length of the coordinate column?",
    ],
  },
  theory: [
    {
      heading:
        "1. Transform a quantum state and calculate what can be observed",
      body: "Prepare a normalized pure state in an ideal two-outcome model with orthonormal basis $|0\\rangle=(1,0)^T$ and $|1\\rangle=(0,1)^T$. Write $|\\psi\\rangle=\\alpha|0\\rangle+\\beta|1\\rangle$, where amplitudes are complex and $|\\alpha|^2+|\\beta|^2=1$. The Born rule is the physical assumption that a measurement in this fixed basis has probabilities $|\\alpha|^2$ and $|\\beta|^2$. The vector algebra alone does not establish that experimental rule.\n\nUse the real matrix\n$$U(\\theta)=\\begin{pmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{pmatrix}.$$\nIt is also a valid complex unitary matrix because $U^\\dagger U=I$. The dagger means conjugate transpose; here the entries are real so it reduces to the transpose. Multiplying $U^\\dagger U$ gives diagonal entries $\\cos^2\\theta+\\sin^2\\theta=1$ and cancelling off-diagonal entries.\n\nFor any state, $\\|U\\psi\\|^2=\\psi^\\dagger U^\\dagger U\\psi=\\psi^\\dagger\\psi$. Total probability therefore remains normalized under the assumed state transformation. Individual probabilities need not remain fixed. Starting with $\\psi=(\\sqrt3/2,1/2)^T$ and taking $\\theta=\\pi/6$ gives\n$$U\\psi=(1/2,\\sqrt3/2)^T.$$\nThe fixed-basis probabilities change from $(3/4,1/4)$ to $(1/4,3/4)$ while their sum stays one.\n\nNow change only the initial second amplitude's phase: $\\tilde\\psi=(\\sqrt3/2,i/2)^T$. Its initial fixed-basis probabilities are the same as those of $\\psi$. After the same transformation, its amplitudes are $(3-i)/4$ and $\\sqrt3(1+i)/4$, giving probabilities $5/8$ and $3/8$. Relative phase affects how amplitudes combine, even when an earlier measurement basis could not distinguish the states.\n\nMultiplying both amplitudes by one common phase would instead leave every projection probability unchanged. The difference between relative and global phase is therefore observable structure in the finite-state model, not a notation preference. When complex amplitudes are involved, square their moduli using conjugation; ordinary algebraic squares can be complex and cannot serve as probabilities.\n\nAn expectation value offers another check of the quantum probabilities. For the observable $Z=\\operatorname{diag}(1,-1)$, the model assigns outcomes $+1$ and $-1$, with expectation $\\langle Z\\rangle=p_0-p_1$. Both initial states in our comparison have expectation $1/2$. After the transformation, the real-amplitude state has expectation $-1/2$, while the phase-shifted state has expectation $1/4$. Each is an average over repeated preparations, not a third possible result of one ideal measurement.\n\nThe operator calculation $\\psi^\\dagger Z\\psi$ reproduces the same probability-weighted value and so checks the amplitude arithmetic independently. In particular, unitarity does not preserve the expectation of every fixed observable; it preserves the inner product. A particular expectation is guaranteed unchanged for every input when the transformation satisfies $U^\\dagger ZU=Z$. This extra condition makes explicit what would be required to turn normalization preservation into conservation of this chosen measurement average.",
    },
    {
      heading:
        "2. Transform event separations and preserve their classification",
      body: "Record two spacetime events using $T=c\\Delta t$ and $X=\\Delta x$, with zero transverse separation for simplicity. Both quantities are lengths. The Minkowski interval in the course convention is $s^2=-T^2+X^2$, represented by $\\eta=\\operatorname{diag}(-1,1)$. This form is indefinite: a nonzero vector can have positive, negative or zero squared interval.\n\nA standard boost with relative speed $\\beta=v/c$ acts by\n$$\\begin{pmatrix}T'\\\\X'\\end{pmatrix}\n=\\Lambda\\begin{pmatrix}T\\\\X\\end{pmatrix},\\qquad\n\\Lambda=\\gamma\\begin{pmatrix}1&-\\beta\\\\-\\beta&1\\end{pmatrix},\n\\quad \\gamma=(1-\\beta^2)^{-1/2}.$$\nThe assumption is an inertial-frame transformation in flat special relativity with aligned axes and coincident origins. Arbitrary gravitational fields or accelerated coordinates are outside this simple model.\n\nFor $\\beta=0.6$, $\\gamma=1.25$. A timelike separation $(T,X)=(5,3)$ m transforms to $(4,0)$ m. The original interval is $-25+9=-16$ m²; the transformed interval is $-16$ m². For an inertial clock connecting those events, the proper time is $4$ m divided by $c$. The two observers disagree about coordinate differences but agree on this invariant.\n\nApply the same boost to the spacelike separation $(3,5)$ m. It becomes $(0,4)$ m, with interval $16$ m² in both frames. The transformed events are simultaneous in that frame. This does not mean an ordinary clock can travel between them: a spacelike separation lies outside a light-speed connection. For a null separation $(2,2)$ m, the boost gives $(1,1)$ m, preserving zero interval while the events remain distinct.\n\nThe general check is the matrix identity $\\Lambda^T\\eta\\Lambda=\\eta$, or direct expansion:\n$$-T'^2+X'^2\n=\\gamma^2[-(T-\\beta X)^2+(X-\\beta T)^2]\n=-T^2+X^2.$$\nCross terms cancel and $\\gamma^2(1-\\beta^2)=1$. By contrast, the Euclidean sum for the first example changes from $T^2+X^2=34$ m² to $16$ m². A boost is not a Euclidean rotation of that coordinate plane.\n\nThe inverse boost is obtained by replacing $\\beta$ with $-\\beta$. Applying it to the transformed vector recovers the original components, an independent arithmetic check. Interval preservation alone is a broader algebraic condition that also admits discrete reversals; the displayed continuous boost with $|\\beta|<1$ selects the standard time-orientation-preserving family used in this experiment.",
    },
    {
      heading: "3. Compare invariants without confusing physical roles",
      body: "Place the two matrix identities side by side:\n$$U^\\dagger I U=I,\\qquad \\Lambda^T\\eta\\Lambda=\\eta.$$\nBoth assert preservation of a form, but the quantum form is positive and conjugate-linear in its first argument, while the spacetime form is real and indefinite. The first supports normalization of a state vector; the second classifies event separations. Neither identity by itself supplies the dynamics or measurement rules of the other system.\n\nEven the interpretation of multiplying a column needs care. In the quantum calculation above, the measurement basis was held fixed and $U$ actively changed the state. If instead a new basis has columns $Q$ in the old basis, the unchanged state's new components are $Q^\\dagger\\psi$ for unitary $Q$. A fixed physical observable must then also be represented as $Q^\\dagger A Q$. Changing only the state components while pretending the old observable matrix is unchanged would describe a different measurement.\n\nThe boost calculation was a passive comparison of the same two events in two inertial frames. Their components change while their physical separation remains the same. Active spacetime transformations can also be defined, but naming the chosen interpretation prevents the phrase transformation from hiding what was actually changed.\n\nGenerators connect the two identities to the previous chapter. A differentiable unitary family $U(s)=I+sG+\\cdots$ has $G^\\dagger+G=0$, an anti-Hermitian generator. A boost family has a generator satisfying $G^T\\eta+\\eta G=0$. These are different conditions because the preserved forms differ. The existence of either family does not establish that an arbitrary apparatus is symmetric under it or that a corresponding physical quantity is conserved without a dynamical argument.\n\nIn a closed finite-dimensional quantum model, a time-independent Hamiltonian $H$ generates evolution through $U(t)=\\exp(-iHt/\\hbar)$, with Hermitian $H$ and $\\hbar$ the reduced Planck constant. This is a stated physical evolution postulate, not derived from normalization alone. In relativity, interval preservation constrains frame comparisons, while predicting a particle's motion still needs an appropriate physical law. These qualifications mark what the present calculations achieve.\n\nYou can now read several recurring structures in further physics: a state or tangent vector, a basis, a form for comparison, an operator, and an invariant. The next step is to study those structures within a complete physical course—mechanics, electromagnetism, quantum theory or relativity—where experiments and modelling assumptions determine which mathematics applies. The final investigation asks you to make that separation visible in your own explanation.",
    },
  ],
  teaching: {
    question:
      "What is preserved in a quantum transformation and in a spacetime boost?",
    why: "Comparing two explicit calculations teaches how to identify an invariant without conflating distinct mathematical forms or physical models.",
    outcomes: [
      "Calculate unitary two-state probabilities including relative phase.",
      "Verify timelike, spacelike and null intervals under a boost.",
      "Distinguish active changes, coordinate changes and physical assumptions.",
    ],
    checkpoints: [
      {
        bridge: "Keep the measurement basis fixed.",
        meaning: "Unitarity preserves total norm while amplitudes interfere.",
        question: "Why does total probability remain one?",
        answer:
          "U†U = I preserves ψ†ψ, and the Born rule assigns squared projection moduli as probabilities.",
        further: [
          {
            question: "Why can individual probabilities change?",
            answer:
              "The transformation mixes amplitudes within the fixed measurement basis.",
          },
          {
            question: "What makes relative phase observable in this example?",
            answer:
              "It changes the cross terms after the same amplitude-mixing transformation.",
          },
          {
            question: "Why not square complex amplitudes without conjugating?",
            answer:
              "Ordinary squares need not be real or nonnegative; probabilities use squared moduli.",
          },
        ],
      },
      {
        bridge: "Transform both time and space.",
        meaning:
          "The invariant interval retains its sign and physical classification.",
        question: "Why use T = cΔt?",
        answer: "It gives time and spatial coordinates the same length units.",
        further: [
          {
            question: "Can a null vector describe distinct events?",
            answer:
              "Yes. Nonzero lightlike separation has zero squared interval.",
          },
          {
            question: "How do you reverse the boost?",
            answer: "Change β to −β and transform both components.",
          },
          {
            question: "What does a changed T² + X² mean?",
            answer:
              "It is expected: a boost preserves −T² + X², not the Euclidean sum.",
          },
        ],
      },
      {
        bridge: "Name the object, basis and preserved form.",
        meaning:
          "A shared matrix pattern does not identify two physical theories.",
        question: "Which argument is conjugated in the quantum inner product?",
        answer: "The first argument, through the conjugate transpose.",
        further: [
          {
            question: "What changes under a passive quantum basis relabelling?",
            answer:
              "State components and observable matrices change together while predictions remain the same.",
          },
          {
            question: "Does norm preservation alone determine a Hamiltonian?",
            answer:
              "No. Many unitaries preserve norm; a physical dynamical model selects the evolution.",
          },
          {
            question: "What remains outside these investigations?",
            answer:
              "Full quantum measurement theory, infinite-dimensional operator domains, relativistic dynamics and curved-spacetime field equations, among other further topics.",
          },
        ],
      },
    ],
    takeaway:
      "Identify the preserved form and the physical interpretation before treating any matrix transformation as a prediction.",
    nextConnection:
      "Use these calculations as readiness checks for a full physics course, where the same structures are joined to experimental laws and more demanding models.",
  },
  diagnostics: [
    {
      id: "d-quantum",
      prompt:
        "For amplitudes (1,i)/√2, find the squared complex norm. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 1,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "The squared moduli are 1/2 and 1/2.",
      hint: "Conjugate the first argument.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Conjugate the first argument.",
        misconceptions: [],
      },
      prerequisiteId: "quantum-vectors",
    },
    {
      id: "d-metric",
      prompt: "For T = 5 m and X = 3 m, find −T² + X².",
      answer: {
        kind: "numeric",
        value: -16,
        unit: "m²",
        acceptedUnits: ["m²"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "−25 + 9 = −16 m².",
      hint: "Use the negative-time signature.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Use the negative-time signature.",
        misconceptions: [],
      },
      prerequisiteId: "metrics",
    },
    {
      id: "d-symmetry",
      prompt: "A generator of a differentiable unitary family satisfies:",
      answer: {
        kind: "choice",
        value: "0",
        options: [
          {
            id: "0",
            label: "G† + G = 0",
          },
          {
            id: "1",
            label: "G = I",
          },
          {
            id: "2",
            label: "G†G = 0",
          },
        ],
      },
      solution:
        "Differentiating U†U = I at identity gives the anti-Hermitian condition.",
      hint: "Differentiate the preserved-form identity.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Differentiate the preserved-form identity.",
        misconceptions: [],
      },
      prerequisiteId: "symmetry",
    },
  ],
  workedExample: {
    title: "Two transformations, two invariant checks",
    problem:
      "First apply U(π/4) to |0⟩. Separately boost event difference (T,X) = (10,6) m with β = 0.6.",
    steps: [
      {
        title: "Transform the state",
        body: "U(π/4)|0⟩ = (1,1)/√2.",
        reason: "The first column is the image of the first basis vector.",
        trap: "The matrix angle is a state-transformation parameter, not automatically a physical spatial angle.",
      },
      {
        title: "Calculate probabilities",
        body: "The fixed-basis probabilities are 1/2 and 1/2, summing to one.",
        reason: "Use squared moduli and the assumed Born rule.",
        trap: "Amplitudes 1/√2 are not probabilities.",
      },
      {
        title: "Transform the event separation",
        body: "With γ = 1.25, T′ = 8 m and X′ = 0.",
        reason: "The boost mixes both components.",
        trap: "Keep the length coordinate T distinct from time in seconds.",
      },
      {
        title: "Compare the right invariant",
        body: "Both spacetime intervals are −64 m²; the Euclidean sums change from 136 to 64 m².",
        reason:
          "The metric determines which quadratic combination is preserved.",
        trap: "Do not use the quantum positive-norm test for a spacetime boost.",
      },
    ],
  },
  fadedExercise: {
    prompt: "Perform independent quantum and spacetime checks.",
    supplied: [
      {
        heading: "Independent data",
        body: "For ψ = (√3/2,1/2) and U(π/6), the transformed amplitudes are (1/2,√3/2). For a boost of (T,X) = (3,5) m with β = 0.6, use γ = 1.25 and the standard formulas.",
      },
    ],
    steps: [
      {
        id: "f-probability",
        prompt: "Find the transformed probability of outcome 0. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: 0.25,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "|1/2|² = 1/4.",
        hint: "Square the amplitude magnitude.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Square the amplitude magnitude.",
          misconceptions: [],
        },
      },
      {
        id: "f-total",
        prompt:
          "Given probabilities 1/4 and 3/4, find their sum. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: 1,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "The sum is one.",
        hint: "Check normalization.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Check normalization.",
          misconceptions: [],
        },
      },
      {
        id: "f-space",
        prompt: "Find X′ = 1.25(5 − 0.6 × 3) in metres.",
        answer: {
          kind: "numeric",
          value: 4,
          unit: "m",
          acceptedUnits: ["m"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "1.25 × 3.2 = 4 m.",
        hint: "Transform the spatial component.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Transform the spatial component.",
          misconceptions: [],
        },
      },
      {
        id: "f-interval",
        prompt:
          "Given transformed T′ = 0 and X′ = 4 m, find the squared interval.",
        answer: {
          kind: "numeric",
          value: 16,
          unit: "m²",
          acceptedUnits: ["m²"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "−0² + 4² = 16 m².",
        hint: "Keep the indefinite sign convention.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Keep the indefinite sign convention.",
          misconceptions: [],
        },
      },
    ],
  },
  retrievalProblems: [
    {
      id: "r-form",
      prompt: "Which quantity normalizes the two-state probability model?",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "ψᵀψ without conjugation",
          },
          {
            id: "1",
            label: "ψ†ψ",
          },
          {
            id: "2",
            label: "−|α|² + |β|²",
          },
        ],
      },
      solution:
        "The positive complex norm is the sum of squared amplitude moduli.",
      hint: "Use the model's inner product.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Use the model's inner product.",
        misconceptions: [],
      },
    },
    {
      id: "r-modulus",
      prompt: "Find the squared modulus of (3 − i)/4. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 0.625,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "(9 + 1)/16 = 5/8.",
      hint: "Multiply by the complex conjugate.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Multiply by the complex conjugate.",
        misconceptions: [],
      },
    },
    {
      id: "r-phase",
      prompt: "Multiplying every state amplitude by the same phase changes:",
      answer: {
        kind: "choice",
        value: "2",
        options: [
          {
            id: "0",
            label: "Every measurement probability",
          },
          {
            id: "1",
            label: "Only outcome 0",
          },
          {
            id: "2",
            label: "No projection probabilities in this pure-state model",
          },
        ],
      },
      solution:
        "A common unit-modulus factor cancels from each squared projection modulus.",
      hint: "Distinguish global from relative phase.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Distinguish global from relative phase.",
        misconceptions: [],
      },
    },
    {
      id: "r-null",
      prompt: "Boost (T,X) = (2,2) m with β = 0.6 and γ = 1.25. Find T′.",
      answer: {
        kind: "numeric",
        value: 1,
        unit: "m",
        acceptedUnits: ["m"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "1.25(2 − 1.2) = 1 m.",
      hint: "Use the same boost on both components.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Use the same boost on both components.",
        misconceptions: [],
      },
    },
    {
      id: "r-preserved",
      prompt: "What does a standard Lorentz boost preserve?",
      answer: {
        kind: "choice",
        value: "0",
        options: [
          {
            id: "0",
            label: "The Minkowski interval",
          },
          {
            id: "1",
            label: "Each coordinate difference",
          },
          {
            id: "2",
            label: "The sum of four positive squares",
          },
        ],
      },
      solution: "Its defining identity is ΛᵀηΛ = η.",
      hint: "Choose the form with the time sign.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Choose the form with the time sign.",
        misconceptions: [],
      },
    },
    {
      id: "r-transfer",
      prompt:
        "When relabelling a quantum basis while keeping the physical experiment fixed, what must transform?",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "Only the state components",
          },
          {
            id: "1",
            label: "State components and observable representations together",
          },
          {
            id: "2",
            label: "Only the outcome probabilities",
          },
        ],
      },
      solution:
        "Consistent basis changes leave predictions unchanged while relabelling both states and operators.",
      hint: "Separate passive relabelling from an active state change.",
      rubric: {
        defaultCategory: "conceptual",
        explanation:
          "Separate passive relabelling from an active state change.",
        misconceptions: [],
      },
    },
  ],
  diagram: {
    title: "Different quadratic forms define different invariant sets",
    caption:
      "Left: real normalized two-state amplitudes lie on a unit circle. Right: timelike separations with −T² + X² = −1 lie on a hyperbola. Both drawings use equal coordinate scales within their panel.",
    viewBox: [0, 0, 600, 320],
    elements: [
      {
        kind: "line",
        from: [30, 170],
        to: [270, 170],
        tone: "muted",
      },
      {
        kind: "line",
        from: [150, 290],
        to: [150, 40],
        tone: "muted",
      },
      {
        kind: "ellipse",
        center: [150, 170],
        rx: 85,
        ry: 85,
        tone: "accent",
      },
      {
        kind: "label",
        at: [55, 25],
        text: "α² + β² = 1 (real slice)",
      },
      {
        kind: "label",
        at: [230, 200],
        text: "α",
      },
      {
        kind: "label",
        at: [160, 55],
        text: "β",
      },
      {
        kind: "line",
        from: [330, 270],
        to: [565, 270],
        tone: "muted",
      },
      {
        kind: "line",
        from: [360, 285],
        to: [360, 40],
        tone: "muted",
      },
      {
        kind: "line",
        from: [360, 200],
        to: [364.6666666666667, 199.84461690092644],
        tone: "ink",
      },
      {
        kind: "line",
        from: [364.6666666666667, 199.84461690092644],
        to: [369.3333333333333, 199.38051889803273],
        tone: "ink",
      },
      {
        kind: "line",
        from: [369.3333333333333, 199.38051889803273],
        to: [374, 198.613726809701],
        tone: "ink",
      },
      {
        kind: "line",
        from: [374, 198.613726809701],
        to: [378.6666666666667, 197.55385141745322],
        tone: "ink",
      },
      {
        kind: "line",
        from: [378.6666666666667, 197.55385141745322],
        to: [383.3333333333333, 196.2135212627378],
        tone: "ink",
      },
      {
        kind: "line",
        from: [383.3333333333333, 196.2135212627378],
        to: [388, 194.60769270011693],
        tone: "ink",
      },
      {
        kind: "line",
        from: [388, 194.60769270011693],
        to: [392.6666666666667, 192.75292166618135],
        tone: "ink",
      },
      {
        kind: "line",
        from: [392.6666666666667, 192.75292166618135],
        to: [397.3333333333333, 190.66666666666669],
        tone: "ink",
      },
      {
        kind: "line",
        from: [397.3333333333333, 190.66666666666669],
        to: [402, 188.36667347216581],
        tone: "ink",
      },
      {
        kind: "line",
        from: [402, 188.36667347216581],
        to: [406.6666666666667, 185.87047023917359],
        tone: "ink",
      },
      {
        kind: "line",
        from: [406.6666666666667, 185.87047023917359],
        to: [411.3333333333333, 183.19498222388808],
        tone: "ink",
      },
      {
        kind: "line",
        from: [411.3333333333333, 183.19498222388808],
        to: [416, 180.35626067594012],
        tone: "ink",
      },
      {
        kind: "line",
        from: [416, 180.35626067594012],
        to: [420.6666666666667, 177.36931154069703],
        tone: "ink",
      },
      {
        kind: "line",
        from: [420.6666666666667, 177.36931154069703],
        to: [425.3333333333333, 174.24800553281176],
        tone: "ink",
      },
      {
        kind: "line",
        from: [425.3333333333333, 174.24800553281176],
        to: [430, 171.00505063388334],
        tone: "ink",
      },
      {
        kind: "line",
        from: [430, 171.00505063388334],
        to: [434.6666666666667, 167.65200973584723],
        tone: "ink",
      },
      {
        kind: "line",
        from: [434.6666666666667, 167.65200973584723],
        to: [439.3333333333333, 164.1993488782901],
        tone: "ink",
      },
      {
        kind: "line",
        from: [439.3333333333333, 164.1993488782901],
        to: [444, 160.65650453730683],
        tone: "ink",
      },
      {
        kind: "line",
        from: [444, 160.65650453730683],
        to: [448.66666666666663, 157.03196125550477],
        tone: "ink",
      },
      {
        kind: "line",
        from: [448.66666666666663, 157.03196125550477],
        to: [453.3333333333333, 153.33333333333331],
        tone: "ink",
      },
      {
        kind: "line",
        from: [453.3333333333333, 153.33333333333331],
        to: [458, 149.56744626140323],
        tone: "ink",
      },
      {
        kind: "line",
        from: [458, 149.56744626140323],
        to: [462.66666666666663, 145.7404150801861],
        tone: "ink",
      },
      {
        kind: "line",
        from: [462.66666666666663, 145.7404150801861],
        to: [467.33333333333337, 141.85771796770416],
        tone: "ink",
      },
      {
        kind: "line",
        from: [467.33333333333337, 141.85771796770416],
        to: [472, 137.92426415120752],
        tone: "ink",
      },
      {
        kind: "line",
        from: [472, 137.92426415120752],
        to: [476.6666666666667, 133.94445578694297],
        tone: "ink",
      },
      {
        kind: "line",
        from: [476.6666666666667, 133.94445578694297],
        to: [481.33333333333337, 129.92224381516607],
        tone: "ink",
      },
      {
        kind: "line",
        from: [481.33333333333337, 129.92224381516607],
        to: [486, 125.86117802618199],
        tone: "ink",
      },
      {
        kind: "line",
        from: [486, 125.86117802618199],
        to: [490.66666666666663, 121.76445170682646],
        tone: "ink",
      },
      {
        kind: "line",
        from: [490.66666666666663, 121.76445170682646],
        to: [495.33333333333337, 117.63494130506461],
        tone: "ink",
      },
      {
        kind: "line",
        from: [495.33333333333337, 117.63494130506461],
        to: [500, 113.4752415750147],
        tone: "ink",
      },
      {
        kind: "label",
        at: [330, 25],
        text: "−T² + X² = −1",
      },
      {
        kind: "label",
        at: [535, 295],
        text: "X",
      },
      {
        kind: "label",
        at: [375, 55],
        text: "T",
      },
    ],
  },
  sidebars: [
    {
      heading: "A passive basis change preserves an expectation",
      body: "For a unitary basis matrix $Q$, set $\\psi'=Q^\\dagger\\psi$ and $A'=Q^\\dagger A Q$. Then $\\psi'^\\dagger A'\\psi'=\\psi^\\dagger QQ^\\dagger A QQ^\\dagger\\psi=\\psi^\\dagger A\\psi$. The cancellations show why both representations must change together. Applying U to the state while holding A fixed is an active state transformation and can change that expectation.",
    },
  ],
  practical: {
    title: "Compare two invariant audits",
    minutes: 60,
    brief:
      "Carry out two independent mini-investigations: a fixed-basis two-state transformation and an inertial-frame spacetime boost. Present the physical assumptions separately. Written interpretation is self-assessed using the worked review.",
    steps: [
      "Quantum: normalize ψ = (√3/2,1/2) and ψ̃ = (√3/2,i/2), calculate their initial 0/1 probabilities, and apply U(π/6) to each.",
      "Calculate final probabilities from squared moduli, check their sums, and explain why the states initially agree in the selected measurement but differ after transformation.",
      "Spacetime: with β = 0.6 and γ = 1.25, transform (T,X) = (5,3), (3,5) and (2,2), all in metres, with no transverse components.",
      "For every event pair calculate the original and transformed Minkowski intervals, classify them, and apply the inverse boost to recover the original data.",
      "Write a comparison naming each preserved form, its units, what changed physically or by relabelling, and one further physical law needed to predict a real experiment in each setting.",
    ],
    deliverables: [
      "A quantum amplitude and probability table with explicit conjugation.",
      "A boost table containing original and transformed components, intervals and classifications.",
      "One inverse-transformation check for each event pair.",
      "A short comparison that states the Born-rule and inertial-frame assumptions and the limits of the analogy.",
    ],
    review:
      "**Quantum arithmetic:** both initial probability pairs are (3/4,1/4). After U(π/6), ψ becomes (1/2,√3/2), giving (1/4,3/4); ψ̃ becomes ((3−i)/4,√3(1+i)/4), giving (5/8,3/8). Each pair sums to one. **Spacetime arithmetic:** the transformed pairs are (4,0), (0,4) and (1,1) m. Their intervals are −16, +16 and 0 m², matching the originals; classifications are timelike, spacelike and null. The inverse uses β = −0.6. **Interpretation:** the unitary calculation actively changes a state while keeping the measurement basis fixed; the boost compares the same event differences in different inertial frames. A probability norm is positive and dimensionless, whereas the interval is indefinite and has length-squared units. Relative phase matters after mixing; global phase does not change projection probabilities. A satisfactory review identifies a Hamiltonian or interaction model as additional quantum input and a dynamical law as additional input for particle motion. These examples do not establish a unified quantum-relativistic theory.",
  },
  sources: [
    {
      title: "MIT OpenCourseWare · Linear Algebra",
      url: "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/",
    },
    {
      title: "David Tong · Dynamics and Relativity",
      url: "https://davidtong.org/teaching/dynamics-and-relativity/",
    },
  ],
};
export default chapter;
