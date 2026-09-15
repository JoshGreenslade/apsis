import type { Chapter } from "../chapter";
const chapter: Chapter = {
  theoreticalMinimum: { coreIdea: "A vector is a geometric object independent of its components; the inner product supplies length, projection, and orthogonality. Components are coordinates relative to a basis, so changing the list of numbers need not change the vector being represented.", widerConnection: "This separation between object and representation is the foundation for linear maps, tensors, orbital states, and quantum vectors. It also gives physics a reliable way to distinguish a change in description from a change in the state itself." },
  id: "vectors",
  intuition: {
    body: "A trolley is pushed diagonally across a workshop floor. One observer records three metres east and four metres north; another turns their measuring axes and writes different numbers for the same motion. If the numbers change while the trolley follows the same path, what is the thing that both observers are describing?\n\nA vector records a magnitude and direction in a way that can survive a change of coordinates. Displacement is our first example. Its components are instructions relative to chosen reference directions: walk this far along one direction and that far along another. The instructions are useful, but they are not the displacement itself.\n\nWe also need to compare vectors. A force can point partly along a motion and partly across it, and only the along-motion part contributes to the elementary work formula that we will assume here. That physical question motivates projection, the signed amount of one vector pointing along another. The dot product packages this comparison into a calculation.\n\nWe will stay on a flat workshop floor with ordinary Euclidean distance. The resulting geometry underlies later matrix calculations, gradients and modes. Other inner products will eventually measure other kinds of objects, but we should first understand why this one works and which coordinate assumptions its familiar formula contains.",
    thoughtExperiments: [
      "If the axes rotate while the trolley stays still, should the displacement's length change?",
      "Can a large force do zero work during a displacement?",
    ],
  },
  theory: [
    {
      heading: "1. Separate a displacement from its components",
      body: "Mark the trolley's start and finish on the floor. A displacement is the directed separation of those points; in the ideal flat plane, translating that directed segment elsewhere does not change the vector. Taking one displacement followed by another defines vector addition. Reversing a displacement changes its sign, while multiplying it by a positive number scales its length without changing its direction.\n\nChoose a unit vector $\\mathbf e_1$ east and a unit vector $\\mathbf e_2$ north. Then $\\mathbf v=3\\mathbf e_1+4\\mathbf e_2$ describes the trolley's motion in metres. The pair $(3,4)$ lists its components in this basis. A basis is a set of independent reference vectors that can express every vector in the space uniquely. Independence means that no reference direction is redundant: neither of these two vectors is a multiple of the other.\n\nThe head-to-tail picture explains component addition. If $\\mathbf u=(1,-2)$ m and $\\mathbf v=(3,4)$ m in the same basis, the combined displacement is $(4,2)$ m. We add corresponding components because both sets of instructions refer to the same directions. Adding a component measured along east to a component measured along a rotated direction would mix different instructions.\n\nRotate the reference frame by ninety degrees, choosing $\\mathbf e'_1=\\mathbf e_2$ and $\\mathbf e'_2=-\\mathbf e_1$. The same trolley displacement becomes $4\\mathbf e'_1-3\\mathbf e'_2$, with components $(4,-3)$. Substitution reconstructs $4\\mathbf e_2+3\\mathbf e_1$, confirming that the vector has not changed. A coordinate change is therefore different from physically rotating the trolley's displacement.\n\nThe east–north basis is orthonormal: its vectors are mutually perpendicular and each has unit length. A basis need not have either property, but the simplest component formulas for length rely on both. We will make those assumptions explicit now so that unfamiliar coordinates later do not seem to violate geometry.",
    },
    {
      heading: "2. Derive the dot product from projection",
      body: "Suppose a constant force pulls the trolley at an angle to its motion. We assume the elementary physical work rule: work equals force magnitude times displacement magnitude times the cosine of their angle. The cosine selects the signed component of force along the displacement. A perpendicular force contributes zero to this work, even though it may matter in other ways.\n\nFor ordinary Euclidean vectors define the dot product by $\\mathbf u\\cdot\\mathbf v=|\\mathbf u||\\mathbf v|\\cos\\alpha$, where $\\alpha$ is their angle. The operation returns a scalar, meaning a single quantity rather than another directed vector. It is positive for an acute angle, negative for an obtuse angle, and zero for perpendicular nonzero vectors. The zero vector has zero dot product with every vector without needing an angle.\n\nIn an orthonormal basis, dot products of matching basis vectors equal one and dot products of different basis vectors vanish. Distributing over the component expansions therefore gives\n$$\\mathbf u\\cdot\\mathbf v=u_1v_1+u_2v_2.$$\nThe three-dimensional version includes a third term. This formula is a compact expression of the projection geometry, not an instruction to multiply and add arbitrary lists regardless of their basis.\n\nFor a unit direction $\\mathbf n$, the scalar projection of $\\mathbf v$ along it is $\\mathbf v\\cdot\\mathbf n$. Multiplying by $\\mathbf n$ restores a vector pointing along that direction:\n$$\\mathbf v_\\parallel=(\\mathbf v\\cdot\\mathbf n)\\mathbf n,\\qquad\n\\mathbf v_\\perp=\\mathbf v-\\mathbf v_\\parallel.$$\nDotting the remainder with $\\mathbf n$ gives zero, because $\\mathbf n\\cdot\\mathbf n=1$. Thus the subtraction really does remove all the along-direction contribution.\n\nFor a nonunit reference vector $\\mathbf w\\ne0$, normalize it or use\n$$\\mathbf v_\\parallel=\\frac{\\mathbf v\\cdot\\mathbf w}{\\mathbf w\\cdot\\mathbf w}\\mathbf w.$$\nThe denominator is essential. Doubling the vector used to label a direction must not double the physical projection. The formula compensates by scaling its coefficient inversely. With physical units, the dot product carries the product of the inputs' units; force dotted with displacement is measured in joules.\n\nConsider a force $\\mathbf F=(6,8)$ N acting through displacement $\\mathbf d=(2,0)$ m. The force has magnitude 10 N, but its component along the motion is only 6 N, so the work is 12 J rather than 20 J. The dot-product calculation $6\\cdot2+8\\cdot0$ reproduces this projection argument. The remaining 8 N points perpendicular to the stated displacement and makes no contribution to this work.\n\nNow double the direction vector used to describe the rail from $(1,0)$ to $(2,0)$. The force projection must remain $(6,0)$ N: its formula gives $(12/4)(2,0)$ N. This is a useful invariance test of a projection formula. If changing only the length of a reference arrow changes the physical projected force, normalization has been missed. The scalar projection onto a unit direction has force units, whereas an angle obtained by dividing a dot product by two magnitudes is dimensionless.",
    },
    {
      heading: "3. Use lengths and orthogonality as checks",
      body: "The trolley's three-metre eastward and four-metre northward movements form a right triangle. Pythagoras gives a five-metre displacement, which we can now express as the norm $|\\mathbf v|=\\sqrt{\\mathbf v\\cdot\\mathbf v}$. A norm is a nonnegative measure of size, and this one is zero only for the zero vector. In orthonormal coordinates it becomes $\\sqrt{v_1^2+v_2^2}$.\n\nProject a vector $\\mathbf v$ along a unit direction $\\mathbf n$ and use its perpendicular remainder. Since the two pieces have zero dot product, expanding the squared norm gives\n$$|\\mathbf v|^2=(\\mathbf v\\cdot\\mathbf n)^2+|\\mathbf v_\\perp|^2.$$\nThe second term cannot be negative, so $|\\mathbf v\\cdot\\mathbf n|\\leq|\\mathbf v|$. Setting $\\mathbf n=\\mathbf u/|\\mathbf u|$ for nonzero $\\mathbf u$ yields\n$$|\\mathbf u\\cdot\\mathbf v|\\leq|\\mathbf u||\\mathbf v|.$$\nThis is the Cauchy–Schwarz inequality. It states that a signed projection cannot have greater magnitude than the original vector. Equality holds when the perpendicular remainder vanishes, including antiparallel vectors; if either vector is zero, equality also holds.\n\nThe inequality gives a practical calculation check. If a purported cosine $(\\mathbf u\\cdot\\mathbf v)/(|\\mathbf u||\\mathbf v|)$ lies outside $[-1,1]$, something is wrong with the arithmetic or coordinate assumptions. It also leads to the triangle inequality: expanding $|\\mathbf u+\\mathbf v|^2$ and bounding its cross term gives $|\\mathbf u+\\mathbf v|\\leq|\\mathbf u|+|\\mathbf v|$. The direct displacement cannot exceed the total length of two consecutive straight moves.\n\nNow choose two unit basis directions meeting at sixty degrees. A vector with components $(1,1)$ in this oblique basis has squared length $1+1+2\\cos60^\\circ=3$, not two. The missing cross term is the price of using reference directions that are not perpendicular. The vector is perfectly legitimate; the simplified sum-of-squares formula is what no longer applies.\n\nFinally, an inner product generalizes the dot product as a symmetric bilinear rule that gives a positive squared size for every nonzero real vector. Bilinear means linear in each input separately. We will later use such rules to compare functions and complex states, with an appropriate conjugation for complex numbers. For now the lesson is concrete: define the geometric comparison first, and use components only with the basis assumptions that justify the calculation.",
    },
  ],
  teaching: {
    question: "What stays the same when we turn the measuring axes?",
    why: "Vectors let us calculate motion and forces without confusing coordinates with physical quantities.",
    outcomes: [
      "Reconstruct a vector from a stated basis.",
      "Calculate signed and vector projections.",
      "Use norms and orthogonality to check a calculation.",
    ],
    checkpoints: [
      {
        bridge: "Describe one motion in two frames.",
        meaning: "Components depend on the basis; the displacement does not.",
        question: "What changes when the axes rotate?",
        answer:
          "The component numbers change, while the physical displacement stays fixed.",
        further: [
          {
            question: "Why must a basis be independent?",
            answer:
              "Otherwise different combinations could describe the same vector, so components would not be unique.",
          },
          {
            question: "Why add corresponding components?",
            answer: "They multiply the same reference vectors.",
          },
          {
            question: "Are all bases orthonormal?",
            answer:
              "No. Independence and spanning do not require unit length or perpendicular directions.",
          },
        ],
      },
      {
        bridge: "Measure the part along a direction.",
        meaning: "Projection isolates a signed contribution.",
        question: "What does a negative dot product mean geometrically?",
        answer:
          "The nonzero vectors form an obtuse angle and oppose each other in projection.",
        further: [
          {
            question: "Why divide by w · w when w is not a unit vector?",
            answer:
              "The division removes the arbitrary size of the direction vector.",
          },
          {
            question: "How can you check the perpendicular remainder?",
            answer: "Dot it with the direction vector; the result must vanish.",
          },
          {
            question:
              "Can a nonzero force do no work on a nonzero displacement?",
            answer:
              "Yes, when it is perpendicular to that displacement under the stated constant-force work rule.",
          },
        ],
      },
      {
        bridge: "Check size through a perpendicular decomposition.",
        meaning: "A projection cannot exceed the original vector's magnitude.",
        question: "Why is v · v nonnegative?",
        answer: "In an orthonormal basis it is a sum of squares.",
        further: [
          {
            question: "When does Cauchy–Schwarz become an equality?",
            answer:
              "When the vectors are linearly dependent, including the zero-vector case.",
          },
          {
            question: "Why can (1,1) have length √3 in an oblique unit basis?",
            answer:
              "The cross term from the sixty-degree angle contributes one to its squared length.",
          },
          {
            question: "What should a computed cosine of 1.2 tell you?",
            answer:
              "The result violates Cauchy–Schwarz, so check arithmetic and basis assumptions.",
          },
        ],
      },
    ],
    takeaway:
      "A vector is independent of its coordinates; projection and length formulas must respect the chosen basis.",
    nextConnection:
      "Linear maps will describe how a rule transforms vectors, with matrices recording its action on a basis.",
  },
  diagnostics: [
    {
      id: "d-trig",
      prompt: "What is cos(π/2)? Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 0,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution:
        "A quarter-turn on the unit circle has horizontal coordinate zero.",
      hint: "Use the unit circle.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Use the unit circle.",
        misconceptions: [],
      },
      prerequisiteId: "trigonometry",
    },
    {
      id: "d-units",
      prompt: "A speed of 3 m/s lasts 4 s. Find the distance in metres.",
      answer: {
        kind: "numeric",
        value: 12,
        unit: "m",
        acceptedUnits: ["m"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "3 × 4 = 12 m.",
      hint: "Multiply compatible quantities.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Multiply compatible quantities.",
        misconceptions: [],
      },
      prerequisiteId: "quantities",
    },
  ],
  workedExample: {
    title: "Split a trolley displacement along a diagonal rail",
    problem:
      "In orthonormal metre coordinates, v = (3,4). Resolve it parallel and perpendicular to w = (1,1), a dimensionless direction vector.",
    steps: [
      {
        title: "Normalize the comparison",
        body: "w · w = 2 and v · w = 7 m.",
        reason: "The rail direction is not a unit vector.",
        trap: "Using 7w directly would overcount.",
      },
      {
        title: "Build the parallel vector",
        body: "v∥ = (7/2)(1,1) = (3.5,3.5) m.",
        reason: "Divide by the squared direction length.",
        trap: "The coefficient 3.5 m is not the scalar projection onto a unit vector.",
      },
      {
        title: "Subtract the remainder",
        body: "v⊥ = (−0.5,0.5) m; v⊥ · w = 0.",
        reason:
          "Subtraction preserves the original total and the zero dot product checks orthogonality.",
        trap: "Subtract components in the same order.",
      },
      {
        title: "Check the sizes",
        body: "|v∥|² = 24.5 m² and |v⊥|² = 0.5 m², giving |v|² = 25 m².",
        reason: "Orthogonality makes the squared lengths add.",
        trap: "Lengths themselves do not add for perpendicular pieces.",
      },
    ],
  },
  fadedExercise: {
    prompt:
      "Resolve u = (5,0) m along w = (3,4), a dimensionless direction in orthonormal coordinates.",
    supplied: [
      {
        heading: "Inputs for independent steps",
        body: "Use w · w = 25, u · w = 15 m and u∥ = (u · w)w/(w · w). The parallel component is (1.8,2.4) m.",
      },
    ],
    steps: [
      {
        id: "f-coefficient",
        prompt: "Find the multiplier 15/25 in metres.",
        answer: {
          kind: "numeric",
          value: 0.6,
          unit: "m",
          acceptedUnits: ["m"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "15/25 = 0.6 m.",
        hint: "Divide dot product by squared direction length.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Divide dot product by squared direction length.",
          misconceptions: [],
        },
      },
      {
        id: "f-parallel",
        prompt: "Find the y-component of 0.6(3,4) m.",
        answer: {
          kind: "numeric",
          value: 2.4,
          unit: "m",
          acceptedUnits: ["m"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "0.6 × 4 = 2.4 m.",
        hint: "Scale each component.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Scale each component.",
          misconceptions: [],
        },
      },
      {
        id: "f-remainder",
        prompt: "Given u∥ = (1.8,2.4) m, find the x-component of u − u∥.",
        answer: {
          kind: "numeric",
          value: 3.2,
          unit: "m",
          acceptedUnits: ["m"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "5 − 1.8 = 3.2 m.",
        hint: "Subtract the supplied projection.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Subtract the supplied projection.",
          misconceptions: [],
        },
      },
      {
        id: "f-size",
        prompt: "The remainder is (3.2,−2.4) m. Find its magnitude.",
        answer: {
          kind: "numeric",
          value: 4,
          unit: "m",
          acceptedUnits: ["m"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "√(3.2² + 2.4²) = 4 m.",
        hint: "Use orthonormal coordinates.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Use orthonormal coordinates.",
          misconceptions: [],
        },
      },
    ],
  },
  retrievalProblems: [
    {
      id: "r-object",
      prompt: "After rotating the axes, which is unchanged?",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "Every component",
          },
          {
            id: "1",
            label: "The geometric displacement",
          },
          {
            id: "2",
            label: "Every basis vector",
          },
        ],
      },
      solution:
        "Coordinates and basis vectors change together while describing the same displacement.",
      hint: "Separate the object from its description.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Separate the object from its description.",
        misconceptions: [],
      },
    },
    {
      id: "r-dot",
      prompt: "Find (2,−1) · (3,4) in an orthonormal basis. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 2,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "2 × 3 − 1 × 4 = 2.",
      hint: "Multiply matching components.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Multiply matching components.",
        misconceptions: [],
      },
    },
    {
      id: "r-norm",
      prompt: "Find the norm of (−6,8) m.",
      answer: {
        kind: "numeric",
        value: 10,
        unit: "m",
        acceptedUnits: ["m"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "√(36 + 64) = 10 m.",
      hint: "Signs disappear when squared.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Signs disappear when squared.",
        misconceptions: [],
      },
    },
    {
      id: "r-projection",
      prompt: "Which projects v onto a nonzero, nonunit w?",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "(v · w)w",
          },
          {
            id: "1",
            label: "(v · w)/(w · w) times w",
          },
          {
            id: "2",
            label: "v − w",
          },
        ],
      },
      solution:
        "The denominator removes the reference vector's arbitrary scale.",
      hint: "Check what doubling w would do.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Check what doubling w would do.",
        misconceptions: [],
      },
    },
    {
      id: "r-bound",
      prompt:
        "For vectors of lengths 2 and 3, which dot product is impossible?",
      answer: {
        kind: "choice",
        value: "2",
        options: [
          {
            id: "0",
            label: "−6",
          },
          {
            id: "1",
            label: "0",
          },
          {
            id: "2",
            label: "7",
          },
        ],
      },
      solution: "Cauchy–Schwarz bounds the magnitude by 6.",
      hint: "Compare with the product of lengths.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Compare with the product of lengths.",
        misconceptions: [],
      },
    },
    {
      id: "r-transfer",
      prompt:
        "Two unit basis vectors meet at 60°. Find the squared length of their sum. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 3,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "1 + 1 + 2cos60° = 3.",
      hint: "Include the cross term.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Include the cross term.",
        misconceptions: [],
      },
    },
  ],
  diagram: {
    title: "Projection on a diagonal rail",
    caption:
      "The endpoint (3,4) projects to (3.5,3.5) on y = x. Equal axis scales make the short joining segment perpendicular to the rail.",
    viewBox: [0, 0, 600, 320],
    elements: [
      {
        kind: "line",
        from: [80, 270],
        to: [370, 270],
        tone: "muted",
      },
      {
        kind: "line",
        from: [80, 270],
        to: [80, 25],
        tone: "muted",
      },
      {
        kind: "line",
        from: [80, 270],
        to: [320, 30],
        tone: "muted",
      },
      {
        kind: "line",
        from: [80, 270],
        to: [230, 70],
        tone: "accent",
      },
      {
        kind: "line",
        from: [80, 270],
        to: [255, 95],
        tone: "ink",
      },
      {
        kind: "line",
        from: [230, 70],
        to: [255, 95],
        tone: "accent",
      },
      {
        kind: "label",
        at: [140, 55],
        text: "(3,4)",
      },
      {
        kind: "label",
        at: [270, 105],
        text: "(3.5,3.5)",
      },
      {
        kind: "label",
        at: [340, 40],
        text: "y = x",
      },
      {
        kind: "label",
        at: [60, 295],
        text: "0",
      },
    ],
  },
  sidebars: [
    {
      heading: "Why component formulas depend on the basis",
      body: "For any real basis, bilinearity gives $\\mathbf u\\cdot\\mathbf v=\\sum_{i,j}u_i v_j(\\mathbf e_i\\cdot\\mathbf e_j)$. The double sum includes every pair of basis directions. In an orthonormal basis only matching pairs survive; in an oblique basis the cross terms retain the geometric information. The array of basis dot products will later be called a metric matrix.",
    },
  ],
  sources: [
    {
      title: "MIT OpenCourseWare · Linear Algebra",
      url: "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/",
    },
  ],
};
export default chapter;
