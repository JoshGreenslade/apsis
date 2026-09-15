import type { Chapter } from "../chapter";
const chapter: Chapter = {
  theoreticalMinimum: { coreIdea: "A linear map is determined by what it does to a basis, and rank and nullspace describe which information it preserves or loses. Matrix multiplication is composition of actions, so the order of factors records the order in which transformations occur.", widerConnection: "Matrices later become operators, mode equations, coordinate transformations, and numerical systems rather than mere arrays of numbers. The useful habit is to ask what a map does geometrically before manipulating its entries symbolically." },
  id: "linear-maps",
  intuition: {
    body: "A positioning device moves a tool across a flat bench. You give it two control settings, and it produces a two-dimensional displacement. If doubling every setting doubles the displacement, and combining two settings adds their effects, then testing the device on two simple inputs may tell you how it responds to every input.\n\nThose two assumptions define a linear map. The machine could stretch, rotate, shear or flatten the pattern of inputs, but it cannot include a fixed offset while remaining linear. A matrix records the map after we choose input and output bases. Its entries are therefore measurements of what the rule does to reference directions, rather than an unexplained grid of coefficients.\n\nThe reverse question is equally important. If we request a particular displacement, can the device produce it, and are the required settings unique? A machine that flattens all inputs onto one line loses information. No algebraic manipulation can recover a unique two-dimensional input from that output.\n\nA linear map is best understood as an experiment on directions. Its columns show where basis directions go; its nullspace records inputs that become invisible; its range records outputs that are reachable. Rank is the bridge between those two descriptions. This same language later describes measurement operators, differential equations and coordinate changes, so the point is not to memorise elimination steps but to learn what information an operation preserves.\n\nWe will use a small positioning rule to connect columns, equation solving and area change. The same ideas will later organize coupled oscillators and coordinate transformations. Keeping the map distinct from its matrix will help us tell a physical transformation from a change in how we describe it.",
    thoughtExperiments: [
      "If two distinct settings produce the same output, can the device have a unique inverse?",
      "Could testing only the zero input reveal a fixed offset in the device?",
    ],
  },
  theory: [
    {
      heading: "1. Learn the whole rule from a basis",
      body: "Suppose a bench device sends the first unit control input to $(2,1)$ and the second to $(1,2)$. Assume its response $A$ is linear: $A(\\alpha\\mathbf u+\\beta\\mathbf v)=\\alpha A\\mathbf u+\\beta A\\mathbf v$ for all inputs and real scalars. This combines additivity and homogeneous scaling. In particular $A\\mathbf0=\\mathbf0$, so a device with a nonzero baseline offset would need a different model.\n\nEvery input in the chosen basis is $x\\mathbf e_1+y\\mathbf e_2$. Linearity therefore forces\n$$A(x,y)=x(2,1)+y(1,2)=(2x+y,x+2y).$$\nWriting the images of the basis vectors as columns gives\n$$A=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}.$$\nMultiplying a matrix by a column vector means forming this weighted sum of its columns. The first column answers what happens to the first basis vector; the first row answers how the first output component depends on all input components.\n\nA constant translation $\\mathbf v\\mapsto A\\mathbf v+\\mathbf b$ with $\\mathbf b\\ne0$ is affine, meaning linear plus an offset, but it is not linear. Applying it to zero exposes the offset immediately. A nonlinear rule such as $(x,y)\\mapsto(x^2,y)$ passes the zero test but fails scaling. Passing one necessary check is therefore not a proof of linearity.\n\nIf a second device applies $B$ after $A$, its result is $B(A\\mathbf v)$, written $BA\\mathbf v$. Each column of $BA$ is obtained by applying $B$ to the corresponding column of $A$. This explains both the multiplication rule and the order: the rightmost map acts first. A stretch followed by a rotation generally differs from the same operations reversed, because the second operation acts on the output of the first.\n\nMatrix entries may have units when input and output represent different kinds of quantity. Here we can treat the rule as a dimensionless geometric map between displacements measured in the same units. The linearity assumption is the substantive model; matrix notation simply makes its consequences calculable.",
    },
    {
      heading: "2. Solve a system by identifying information that survives",
      body: "Ask the device to produce the output $(5,4)$. The required settings satisfy $2x+y=5$ and $x+2y=4$. Multiply the second equation by two and subtract the first: $3y=3$, hence $y=1$ and $x=2$. Substitution into both original equations checks the answer. Elimination works because adding a multiple of one equation to another preserves exactly the inputs satisfying both.\n\nGeometrically each equation describes a line in the input plane. Two nonparallel lines meet at one point, giving a unique solution. Parallel distinct lines have no common solution, while coincident lines leave a whole line of solutions. These pictures distinguish consistency, whether any solution exists, from uniqueness, whether more than one exists.\n\nThe nullspace of a linear map is the set of inputs sent to zero. If $\\mathbf z$ is in the nullspace and $A\\mathbf v=\\mathbf b$, then $A(\\mathbf v+\\mathbf z)=\\mathbf b$ as well. A nonzero nullspace direction therefore identifies information the device cannot distinguish. For $C(x,y)=(x+y,2x+2y)$, the vector $(1,-1)$ vanishes, and all outputs lie along $(1,2)$.\n\nThe rank is the number of independent output directions, equivalently the dimension of the span of the columns. The map $C$ has rank one: both columns point along the same line. It can produce $(3,6)$ in infinitely many ways but cannot produce $(3,5)$ at all. Saying that a singular system has no solution would miss the first possibility; the requested right-hand side matters.\n\nFor a square map, an inverse exists precisely when no nonzero input is lost, or equivalently when its columns are independent. The inverse reverses the map on every output, not just on one successful example. Our device has inverse $\\frac13\\begin{pmatrix}2&-1\\\\-1&2\\end{pmatrix}$, as direct multiplication verifies. Division by three is legitimate because the relevant determinant is nonzero. We now give that denominator a geometric interpretation rather than treating it as a memorized recipe.",
    },
    {
      heading: "3. Interpret area change and change of basis",
      body: "Draw a unit square in the input plane and follow its sides through the positioning device. Its adjacent edges become the columns $(2,1)$ and $(1,2)$, forming a parallelogram. For a two-by-two matrix $\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$, the signed area scale is the determinant $ad-bc$. In our example it is $4-1=3$. The absolute value is the area multiplier; the sign tells whether orientation is preserved or reversed.\n\nOne way to see the formula is to start with two edge vectors $(a,c)$ and $(b,d)$. Their oriented area is the horizontal contribution $ad$ minus the overlapping contribution $bc$. Equivalently, taking the base along the first edge, projection onto its perpendicular direction produces the same expression. When the columns become parallel the area vanishes, exactly when a two-dimensional map loses an independent output direction.\n\nFor a nonsingular two-by-two matrix, multiplication shows that\n$$A^{-1}=\\frac{1}{ad-bc}\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}.$$\nThe off-diagonal terms cancel, while each diagonal entry of the product becomes $ad-bc$. This explains the formula and its exception together. A small nonzero determinant alone does not universally diagnose poor numerical conditioning, since uniform shrinking can also make it small; sensitivity needs comparison of directional scales.\n\nNow leave the physical rule unchanged and replace the basis. Write $\\mathbf e'=\\mathbf eS$, meaning that the columns of $S$ give the new basis vectors in old coordinates. If $\\mathbf v=\\mathbf e v=\\mathbf e'v'$, then $v=Sv'$ and $v'=S^{-1}v$. Components transform inversely because the reference directions have changed.\n\nFor a map from the space to itself, expressed in the same new basis on input and output, the matrix becomes\n$$A'=S^{-1}AS.$$\nRead this from right to left: convert new input coordinates to old coordinates, apply the old matrix, then convert the output back. The physical map has not changed. If input and output bases are changed differently, the two conversion matrices differ; the displayed formula assumes a shared basis change.\n\nThe bench device can now be understood from several viewpoints: its columns specify the response, elimination finds a requested input, its nullspace diagnoses lost information, and its determinant measures signed area change. The next question is whether some directions avoid being mixed with others. Finding those directions will lead to eigenvectors.\n\nA simple basis rescaling makes the inverse convention tangible. Choose new basis vectors twice as long in the first direction and unchanged in the second, so $S=\\operatorname{diag}(2,1)$. A vector with old components $(2,1)$ has new components $(1,1)$, because one new first-direction step already covers two old steps. Multiplying by $S$ instead would describe a different physical vector.\n\nFor our device, the new matrix is $S^{-1}AS=\\begin{pmatrix}2&1/2\\\\2&2\\end{pmatrix}$. Applying it to the new input $(1,1)$ gives $(5/2,4)$, which converts back through $S$ to $(5,4)$, exactly the old-coordinate output. The matrix entries changed and the displayed matrix is no longer symmetric, yet the underlying device is unchanged. The new basis is not orthonormal, so ordinary transpose symmetry is no longer the correct way to express its Euclidean geometric symmetry. This example anticipates why a metric must accompany unfamiliar coordinates.",
    },
  ],
  teaching: {
    question: "How much can two simple inputs tell us about a linear device?",
    why: "Matrices become understandable when their columns, inverses and determinants describe an actual transformation.",
    outcomes: [
      "Build a matrix from basis-vector images.",
      "Distinguish unique, absent and nonunique solutions.",
      "Interpret a determinant and transform matrix coordinates.",
    ],
    checkpoints: [
      {
        bridge: "Test reference inputs.",
        meaning: "Columns record where a linear map sends a basis.",
        question: "Why is the first column A(1,0)?",
        answer:
          "Multiplication selects one copy of the first column and zero of the second.",
        further: [
          {
            question: "Does A(0) = 0 prove linearity?",
            answer:
              "No. Squaring a coordinate passes that test but fails general scaling.",
          },
          {
            question: "Which operation acts first in BA?",
            answer: "A acts first; B acts on its output.",
          },
          {
            question: "Why can changing the operation order matter?",
            answer:
              "The first map changes the directions and sizes on which the second acts.",
          },
        ],
      },
      {
        bridge: "Ask whether input information is lost.",
        meaning: "Nullspace directions produce indistinguishable outputs.",
        question: "What does a nonzero nullspace vector imply?",
        answer:
          "Any existing solution can be shifted along it to produce another solution.",
        further: [
          {
            question:
              "Can a rank-one map produce an output off its column line?",
            answer: "No. Every output is a linear combination of its columns.",
          },
          {
            question: "Why does row elimination preserve solutions?",
            answer:
              "Its reversible equation combinations impose the same simultaneous conditions.",
          },
          {
            question: "Does singular mean every right-hand side is impossible?",
            answer:
              "No. Some outputs lie in the image and have multiple preimages.",
          },
        ],
      },
      {
        bridge: "Follow a square and then relabel the axes.",
        meaning:
          "Determinants measure oriented area; basis changes relabel the same map.",
        question: "What does a negative determinant indicate?",
        answer:
          "Orientation reversal; the area multiplier is its absolute value.",
        further: [
          {
            question:
              "Why does a zero determinant obstruct inversion in two dimensions?",
            answer:
              "The columns collapse area into fewer independent directions.",
          },
          {
            question: "If e′ = eS, why are components S⁻¹v?",
            answer:
              "The basis has already supplied S, so its inverse is needed to reconstruct the same vector.",
          },
          {
            question: "Explain S⁻¹AS in words.",
            answer:
              "Convert new coordinates to old, apply the map, then convert back.",
          },
        ],
      },
    ],
    takeaway:
      "A matrix records a linear map in chosen bases; inversion fails when the map loses information.",
    nextConnection:
      "Eigenvectors will identify directions that a map stretches without mixing with other directions.",
  },
  diagnostics: [
    {
      id: "d-vector",
      prompt:
        "In an orthonormal basis, find the first component of 2(1,3) + (4,−1). Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 6,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "2 × 1 + 4 = 6.",
      hint: "Combine matching components.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Combine matching components.",
        misconceptions: [],
      },
      prerequisiteId: "vectors",
    },
    {
      id: "d-function",
      prompt: "Solve 2x + 1 = 7. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 3,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "Subtract 1 and divide by 2.",
      hint: "Invert the operations in reverse order.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Invert the operations in reverse order.",
        misconceptions: [],
      },
      prerequisiteId: "functions",
    },
  ],
  workedExample: {
    title: "Recover the control settings",
    problem: "For A = [[2,1],[1,2]], solve Av = (7,5) and check area scaling.",
    steps: [
      {
        title: "Write the equations",
        body: "2x + y = 7 and x + 2y = 5.",
        reason: "Rows record the two output components.",
        trap: "Columns are basis images, not separate equations with the same unknown.",
      },
      {
        title: "Eliminate x",
        body: "Twice the second equation minus the first gives 3y = 3, so y = 1.",
        reason: "A reversible equation combination removes one unknown.",
        trap: "Subtract both right-hand sides too.",
      },
      {
        title: "Recover and verify",
        body: "x = 3; A(3,1) = (7,5).",
        reason: "Check in the original system.",
        trap: "One equation alone is insufficient.",
      },
      {
        title: "Interpret uniqueness",
        body: "det A = 3, so the image parallelogram has three times the area and the inverse exists.",
        reason:
          "Nonzero area means the two output directions remain independent.",
        trap: "Area scaling does not mean every length triples.",
      },
    ],
  },
  fadedExercise: {
    prompt: "Solve B(x,y) = (4,5) for B = [[1,2],[3,1]].",
    supplied: [
      {
        heading: "Independent equations",
        body: "The equations are x + 2y = 4 and 3x + y = 5. Substituting x = 4 − 2y yields 12 − 5y = 5. All numerical answers use unit 1.",
      },
    ],
    steps: [
      {
        id: "f-det",
        prompt: "Find det B = 1 × 1 − 2 × 3. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: -5,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "1 − 6 = −5.",
        hint: "Keep the orientation sign.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Keep the orientation sign.",
          misconceptions: [],
        },
      },
      {
        id: "f-y",
        prompt: "Solve 12 − 5y = 5. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: 1.4,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "5y = 7, so y = 7/5.",
        hint: "Isolate the unknown.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Isolate the unknown.",
          misconceptions: [],
        },
      },
      {
        id: "f-x",
        prompt: "Given y = 1.4 and x = 4 − 2y, find x. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: 1.2,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "4 − 2.8 = 1.2.",
        hint: "Use the supplied intermediate value.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Use the supplied intermediate value.",
          misconceptions: [],
        },
      },
      {
        id: "f-area",
        prompt:
          "With determinant −5, what happens to a unit square's area and orientation?",
        answer: {
          kind: "choice",
          value: "1",
          options: [
            {
              id: "0",
              label: "Area −5, orientation unchanged",
            },
            {
              id: "1",
              label: "Area 5, orientation reversed",
            },
            {
              id: "2",
              label: "Area 1/5, orientation reversed",
            },
          ],
        },
        solution:
          "Area is positive and scales by |det B|; the negative sign reverses orientation.",
        hint: "Separate area magnitude from orientation.",
        rubric: {
          defaultCategory: "conceptual",
          explanation: "Separate area magnitude from orientation.",
          misconceptions: [],
        },
      },
    ],
  },
  retrievalProblems: [
    {
      id: "r-column",
      prompt: "The first column of a matrix records:",
      answer: {
        kind: "choice",
        value: "0",
        options: [
          {
            id: "0",
            label: "The image of the first basis vector",
          },
          {
            id: "1",
            label: "The input required for every output",
          },
          {
            id: "2",
            label: "Its determinant",
          },
        ],
      },
      solution:
        "Applying the matrix to the first unit coordinate vector selects that column.",
      hint: "Use a basis input.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Use a basis input.",
        misconceptions: [],
      },
    },
    {
      id: "r-image",
      prompt:
        "For A = [[2,1],[1,2]], find the second component of A(2,−1). Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 0,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "2 + 2(−1) = 0.",
      hint: "Use the second row.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Use the second row.",
        misconceptions: [],
      },
    },
    {
      id: "r-null",
      prompt: "C(x,y) = (x+y,2x+2y). Which vector lies in its nullspace?",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "(1,1)",
          },
          {
            id: "1",
            label: "(1,−1)",
          },
          {
            id: "2",
            label: "(0,1)",
          },
        ],
      },
      solution: "Both output components vanish when x + y = 0.",
      hint: "Look for cancellation.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Look for cancellation.",
        misconceptions: [],
      },
    },
    {
      id: "r-consistency",
      prompt: "For the same C, how many inputs produce (3,5)?",
      answer: {
        kind: "choice",
        value: "2",
        options: [
          {
            id: "0",
            label: "One",
          },
          {
            id: "1",
            label: "Infinitely many",
          },
          {
            id: "2",
            label: "None",
          },
        ],
      },
      solution: "The second output must be twice the first, but 5 ≠ 6.",
      hint: "Check the image line.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Check the image line.",
        misconceptions: [],
      },
    },
    {
      id: "r-area",
      prompt:
        "A map has determinant −4. What is the area of the image of a triangle of area 3 m²?",
      answer: {
        kind: "numeric",
        value: 12,
        unit: "m²",
        acceptedUnits: ["m²"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "Area scales by 4, giving 12 m².",
      hint: "Use the determinant's absolute value.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Use the determinant's absolute value.",
        misconceptions: [],
      },
    },
    {
      id: "r-basis",
      prompt: "When e′ = eS, the same vector's new components are:",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "Sv",
          },
          {
            id: "1",
            label: "S⁻¹v",
          },
          {
            id: "2",
            label: "Av",
          },
        ],
      },
      solution: "Substituting e′ into e′v′ = ev gives Sv′ = v.",
      hint: "Keep basis change separate from physical transformation.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Keep basis change separate from physical transformation.",
        misconceptions: [],
      },
    },
  ],
  diagram: {
    title: "The image of a unit square",
    caption:
      "A = [[2,1],[1,2]] sends the unit square to the parallelogram with vertices (0,0), (2,1), (3,3), (1,2). Its oriented area is 3.",
    viewBox: [0, 0, 600, 320],
    elements: [
      {
        kind: "line",
        from: [80, 270],
        to: [340, 270],
        tone: "muted",
      },
      {
        kind: "line",
        from: [80, 270],
        to: [80, 30],
        tone: "muted",
      },
      {
        kind: "line",
        from: [80, 270],
        to: [220, 200],
        tone: "accent",
      },
      {
        kind: "line",
        from: [220, 200],
        to: [290, 60],
        tone: "accent",
      },
      {
        kind: "line",
        from: [290, 60],
        to: [150, 130],
        tone: "accent",
      },
      {
        kind: "line",
        from: [150, 130],
        to: [80, 270],
        tone: "accent",
      },
      {
        kind: "label",
        at: [225, 225],
        text: "(2,1)",
      },
      {
        kind: "label",
        at: [305, 60],
        text: "(3,3)",
      },
      {
        kind: "label",
        at: [90, 115],
        text: "(1,2)",
      },
      {
        kind: "label",
        at: [45, 295],
        text: "(0,0)",
      },
    ],
  },
  sidebars: [
    {
      heading: "Composition multiplies area scales",
      body: "Applying A and then B multiplies oriented areas first by det A and then by det B, so det(BA) = det B det A. For square matrices this identity extends to higher-dimensional oriented volume. It also confirms det(S⁻¹AS) = det A: relabelling the same map does not change its determinant.",
    },
  ],
  sources: [
    {
      title: "MIT OpenCourseWare · Linear Algebra",
      url: "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/",
    },
  ],
};
chapter.sidebars.push({
  heading: "An invertible map can still lose practical information",
  body: String.raw`Consider the map $A(x,y)=(x,\varepsilon y)$, with $0<\varepsilon\ll1$. Its determinant is $\varepsilon$, so it has an inverse: if the measured output is $(p,q)$, then $(x,y)=(p,q/\varepsilon)$. Algebraically, nothing has been lost.

Now suppose q has measurement error $\delta$. The reconstructed y has error $\delta/\varepsilon$. With $\varepsilon=0.001$, an output error of $0.0001$ becomes an input error of $0.1$. The map compresses one direction so strongly that differences along it become difficult to distinguish.

At $\varepsilon=0$ the distinction becomes exact: every y produces the same second output, and that direction belongs to the nullspace. For small nonzero $\varepsilon$, it is not in the nullspace, but it is nearly invisible to a measuring device with finite resolution.

This is why solving equations requires more than checking that a determinant is nonzero. The size and direction of data errors matter too. More accurate arithmetic cannot recover information that the measurement never resolved. Later, inverse field problems and parameter fitting will face the same issue: a unique mathematical answer can be very sensitive to tiny changes in the evidence. The geometric question is which input directions the map strongly suppresses.`,
});

chapter.sidebars.push({
  heading: "Returning to Buckingham: dimensionless groups form a nullspace",
  body: String.raw`In chapter 1, dimensional analysis required a product of physical quantities to have zero net powers of the base units. We can now name the construction precisely. A dimension matrix D maps a vector of chosen powers p to the dimensions of the resulting product. Dimensionless products correspond to $Dp=0$.

For $(P,\ell,g,\gamma)$, using rows for length and time,
$$D=\begin{pmatrix}0&1&1&0\\1&0&-2&-1\end{pmatrix}.$$
Its two rows are independent, so the rank is two. With four exponent coordinates, rank–nullity gives a two-dimensional nullspace. Two independent vectors in it are
$$p_1=(1,-1/2,1/2,0)^T,\qquad p_2=(0,1/2,-1/2,1)^T.$$
Check them by multiplication: both outputs are zero. They produce $\Pi_1=P\sqrt{g/\ell}$ and $\Pi_2=\gamma\sqrt{\ell/g}$.

Every exponent vector $\alpha p_1+\beta p_2$ produces the product $\Pi_1^\alpha\Pi_2^\beta$. Thus choosing a different nullspace basis changes how we write the independent groups without changing the dimensional information. The multiplication of physical products corresponds to addition in exponent space.

This is Buckingham’s count of dimensionless groups, with a concrete meaning for both rank and nullity. Rank counts independent dimensional constraints. Nullity counts independent ways to combine ingredients without leaving a unit behind. The later constraint chapter will use the same nullspace language for motions that leave a constraint unchanged. Linear algebra unifies these examples because it describes what an operation detects and what it cannot detect.`,
});

export default chapter;
