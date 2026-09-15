import type { Chapter } from "../chapter";
const chapter: Chapter = {
  theoreticalMinimum: { coreIdea: "An eigenvector is a direction a map preserves, making the map act as simple scalar multiplication in that direction. Finding such directions is a search for coordinates in which a complicated action separates into independent responses, provided enough independent directions exist.", widerConnection: "Natural directions become normal modes, Fourier modes, curvature directions, quantum states, and operator eigenfunctions. The later examples change the object being transformed, but preserve the same question: which patterns evolve without mixing?" },
  id: "eigenvectors",
  intuition: {
    body: "The positioning device from the previous chapter mixes eastward and northward inputs: $A(x,y)=(2x+y,x+2y)$. Yet an input pointing northeast emerges pointing northeast, while an input along the other diagonal also keeps its line. The grid we first chose obscured two directions in which the device behaves as a simple stretch.\n\nAn eigenvector is a nonzero vector whose image is a scalar multiple of itself. The scalar is its eigenvalue. A negative multiplier reverses the arrow but preserves its line, and zero means that the direction is flattened to zero. We exclude the zero vector because every multiplier would satisfy the equation for it.\n\nFinding these directions can turn a coupled calculation into separate scalar calculations. This will matter physically when two oscillators move in patterns that maintain their relative displacements. For now we will work with a real symmetric matrix and examine precisely why its natural directions are perpendicular.\n\nThe transferable idea is natural coordinates. In the original basis, the components interact and the update looks coupled. In an eigenbasis, each coefficient has its own scalar rule. For a differential operator the same statement becomes a mode with its own time dependence; for a quantum observable it becomes a measurement basis. The benefit is conditional: we must establish that the eigenvectors span the states we want to describe.\n\nThere is a limitation worth keeping visible from the start: some maps do not have enough eigenvectors to form a basis. We will calculate a successful example, reconstruct a general input from it, and then examine a counterexample. Natural coordinates are powerful when they exist, rather than a promise every matrix must fulfil.",
    thoughtExperiments: [
      "Can a map preserve a line while reversing every arrow on it?",
      "If a matrix has the same eigenvalue twice, must it have two independent eigenvectors?",
    ],
  },
  theory: [
    {
      heading: "1. Find the directions that remain on their lines",
      body: "Test the device on the two diagonals. For $\\mathbf p=(1,1)$, $A\\mathbf p=(3,3)=3\\mathbf p$; for $\\mathbf q=(1,-1)$, $A\\mathbf q=(1,-1)=\\mathbf q$. These are eigenvectors with eigenvalues three and one. Any nonzero multiple of either vector is also an eigenvector with the same eigenvalue, so the important object is the direction, not a particular arrow length.\n\nTo discover rather than guess the directions, write $A\\mathbf v=\\lambda\\mathbf v$, where $\\lambda$ is unknown. Rearranging gives $(A-\\lambda I)\\mathbf v=\\mathbf0$; $I$ is the identity map, which leaves every vector unchanged. A nonzero solution requires $A-\\lambda I$ to be singular. Consequently its determinant must vanish.\n\nFor our matrix,\n$$\\det(A-\\lambda I)=(2-\\lambda)^2-1\n=\\lambda^2-4\\lambda+3=(\\lambda-1)(\\lambda-3).$$\nThis characteristic equation gives the candidate eigenvalues. It is not yet the complete solution: for each value we must solve the corresponding homogeneous equations to find its vectors.\n\nAt $\\lambda=3$, the equation $-x+y=0$ gives $y=x$, so the eigenspace is the line of multiples of $(1,1)$. An eigenspace includes zero as a vector-space element, although zero itself is not called an eigenvector. At $\\lambda=1$, $x+y=0$ gives the other diagonal. Checking these directions in the original equation guards against sign errors in the determinant.\n\nThe sum of the eigenvalues here equals the trace, the sum of diagonal entries, which is four; their product equals the determinant, which is three. These are useful arithmetic checks for a two-by-two matrix. They do not replace finding eigenvectors, and real matrices need not always have real eigenvalues: a ninety-degree planar rotation has no invariant real line. Complex coordinates will later broaden the possibilities.",
    },
    {
      heading: "2. Explain orthogonality before using it",
      body: "Draw the two diagonals on the workshop floor. They happen to be perpendicular, but for this matrix that is guaranteed by a structural property: $A^T=A$, meaning the matrix equals its transpose, obtained by exchanging rows and columns. Such a real matrix is called symmetric. In an orthonormal basis, symmetry means $\\mathbf u\\cdot A\\mathbf v=A\\mathbf u\\cdot\\mathbf v$ for every pair of vectors.\n\nSuppose $A\\mathbf u=\\lambda\\mathbf u$ and $A\\mathbf v=\\mu\\mathbf v$. Applying the symmetry identity gives\n$$\\mu(\\mathbf u\\cdot\\mathbf v)=\\lambda(\\mathbf u\\cdot\\mathbf v),$$\nand hence $(\\lambda-\\mu)(\\mathbf u\\cdot\\mathbf v)=0$. When the eigenvalues differ, the first factor is nonzero and the vectors must be orthogonal. This short argument explains the geometry instead of treating orthogonality as an extra recipe.\n\nFor a repeated eigenvalue the same argument says $0=0$ and proves nothing about a chosen pair. However, a real symmetric matrix always admits an orthonormal eigenbasis. This is the finite-dimensional spectral theorem, quoted here rather than fully proved. Within a repeated-eigenvalue eigenspace, one can choose perpendicular unit vectors without leaving that eigenspace. Arbitrary vectors originally selected in it need not already be perpendicular.\n\nNormalize our two vectors:\n$$\\mathbf e_+=\\frac{1}{\\sqrt2}(1,1),\\qquad\n\\mathbf e_-=\\frac{1}{\\sqrt2}(1,-1).$$\nThe division changes their lengths to one without changing eigenvalues. Form the matrix $Q$ from these columns. Orthogonality implies $Q^TQ=I$, so $Q^{-1}=Q^T$. The new matrix of the same map is\n$$Q^TAQ=\\begin{pmatrix}3&0\\\\0&1\\end{pmatrix}.$$\nIts diagonal entries are the stretches along the two new axes; its zero off-diagonal entries say that one direction no longer feeds into the other.\n\nSymmetry here is defined relative to an orthonormal Euclidean basis. In arbitrary coordinates, the same geometric self-adjoint property must account for the metric. Later chapters will return to that qualification. For this workshop example, the ordinary transpose and dot product carry exactly the intended geometry.\n\nThe identity-like map $B=2I$ is a useful repeated-eigenvalue comparison. Every nonzero vector satisfies $B\\mathbf v=2\\mathbf v$, so its eigenspace is the entire plane. The two vectors $(1,0)$ and $(1,1)$ are eigenvectors but are not perpendicular. We are free to replace the second by $(0,1)$ and obtain an orthonormal eigenbasis without changing the eigenvalue. Repetition therefore neither forces orthogonality of arbitrary choices nor prevents an orthogonal choice for a symmetric matrix.\n\nThis also clarifies what is meant by natural coordinates when there is degeneracy, a repeated eigenvalue. The map does not distinguish directions within that eigenspace, so there is no unique preferred basis there. Additional physical information or another compatible operator may select a convenient one, but that extra choice does not come from this matrix alone. Contrast the shear in the next section: it has too few eigenvectors, whereas $2I$ has abundant choices. The same repeated characteristic root can conceal very different geometry.\n\nFor a numerical calculation, always substitute each proposed vector into the original matrix equation. A zero characteristic determinant certifies an available direction in exact arithmetic, but a mistaken row reduction can still report the wrong direction or lose a free variable.",
    },
    {
      heading: "3. Reconstruct a general input and recognize failure",
      body: "Give the device the input $\\mathbf v=(2,0)$. Projection onto the normalized eigenvectors gives coefficients $c_+=\\sqrt2$ and $c_-=\\sqrt2$. Thus $\\mathbf v=c_+\\mathbf e_++c_-\\mathbf e_-$. Applying the map simply multiplies these two amplitudes:\n$$A\\mathbf v=3c_+\\mathbf e_++c_-\\mathbf e_-=(4,2).$$\nThe final conversion back to the original axes is essential if those axes describe the measurement we want to report.\n\nRepeating the device $n$ times gives $A^n\\mathbf v=3^n c_+\\mathbf e_++1^n c_-\\mathbf e_-$. Instead of multiplying many full matrices, we raise scalar eigenvalues to powers. For this input, the northeast component eventually dominates because its multiplier has larger magnitude. If its initial coefficient were exactly zero, it would remain absent; a dominant eigenvalue does not create a component from nothing.\n\nThe same reconstruction explains quadratic forms. For real coefficients in this orthonormal eigenbasis,\n$$\\mathbf v^TA\\mathbf v=3c_+^2+c_-^2.$$\nBoth eigenvalues are positive, so this expression is positive for every nonzero input. A symmetric matrix with that property is positive definite. In a later oscillator model, positive stiffness eigenvalues will correspond to restoring curvature, but that interpretation needs the physical equations and masses.\n\nNow try the shear $J=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$. Its characteristic equation is $(1-\\lambda)^2=0$, yet $(J-I)(x,y)=(y,0)$ vanishes only when $y=0$. There is just one independent eigenvector direction. The repeated root has algebraic multiplicity two, meaning it occurs twice in the polynomial, but its eigenspace has dimension one.\n\nThis matrix is defective: it lacks a basis of eigenvectors, so no change of basis can make it diagonal. Direct calculation gives $J^n=\\begin{pmatrix}1&n\\\\0&1\\end{pmatrix}$ for nonnegative integers $n$. Its unit eigenvalue therefore does not prevent growth of some inputs. A separate treatment using generalized eigenvectors exists, but the counterexample already establishes the limitation we need.\n\nThe successful device and the shear together answer our opening question. Some transformations become independent stretches in natural coordinates; symmetric real matrices guarantee enough orthogonal directions. For other matrices, calculate the available eigenspaces rather than assuming that a list of roots supplies a complete coordinate system.",
    },
  ],
  teaching: {
    question: "Can we choose directions that a transformation does not mix?",
    why: "Eigenvectors expose independent patterns and make repeated transformations and quadratic models easier to interpret.",
    outcomes: [
      "Calculate eigenvalues and their eigenspaces.",
      "Explain orthogonality for a symmetric matrix.",
      "Use an eigenbasis and recognize when one is unavailable.",
    ],
    checkpoints: [
      {
        bridge: "Find invariant lines.",
        meaning:
          "Eigenvalues are candidates until their eigenvectors are found.",
        question: "Why exclude zero as an eigenvector?",
        answer:
          "It satisfies A0 = λ0 for every λ and therefore identifies no special direction.",
        further: [
          {
            question: "Why set det(A − λI) to zero?",
            answer:
              "A nonzero nullspace vector exists only when that matrix is singular.",
          },
          {
            question: "Can an eigenvalue be negative?",
            answer:
              "Yes. The map reverses the arrow while preserving its line.",
          },
          {
            question: "Does scaling an eigenvector change its eigenvalue?",
            answer:
              "No. Linearity preserves the same multiplier for every nonzero multiple.",
          },
        ],
      },
      {
        bridge: "Use symmetry to explain perpendicular directions.",
        meaning:
          "Distinct eigenvalues of a real symmetric matrix have orthogonal eigenvectors.",
        question: "Where does orthogonality enter the proof?",
        answer:
          "Symmetry gives (λ − μ)(u · v) = 0; distinct values force the dot product to vanish.",
        further: [
          {
            question: "What does this proof say for a repeated eigenvalue?",
            answer:
              "Nothing by itself, because the eigenvalue difference is zero.",
          },
          {
            question: "Why does Q⁻¹ equal Qᵀ?",
            answer: "Its columns form an orthonormal basis, so QᵀQ = I.",
          },
          {
            question:
              "Do arbitrary vectors in a repeated eigenspace have to be perpendicular?",
            answer:
              "No. The spectral theorem guarantees that an orthonormal choice can be made.",
          },
        ],
      },
      {
        bridge: "Reconstruct before interpreting.",
        meaning:
          "A complete eigenbasis simplifies a map; a repeated root does not guarantee one.",
        question:
          "How do you calculate eigenbasis coefficients in an orthonormal basis?",
        answer: "Take dot products with its unit basis vectors.",
        further: [
          {
            question:
              "Does the largest eigenvalue always dominate repeated application?",
            answer:
              "Only if the initial vector has a component in its eigenspace, with suitable magnitude comparisons.",
          },
          {
            question: "Why is the shear defective?",
            answer:
              "Its repeated eigenvalue has only one independent eigenvector in a two-dimensional space.",
          },
          {
            question:
              "Can eigenvalues all equal one while some iterated inputs grow?",
            answer:
              "Yes. The shear has Jⁿ with an off-diagonal entry n, so an input with nonzero second component grows.",
          },
        ],
      },
    ],
    takeaway:
      "Find the vectors as well as the roots, and check that they form a basis before treating a map as independent stretches.",
    nextConnection:
      "Complex numbers will describe rotations; later, eigenvectors will become the normal patterns of coupled oscillators.",
  },
  diagnostics: [
    {
      id: "d-det",
      prompt: "Find det [[2,1],[1,2]]. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 3,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "2 × 2 − 1 × 1 = 3.",
      hint: "Use ad − bc.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Use ad − bc.",
        misconceptions: [],
      },
      prerequisiteId: "linear-maps",
    },
    {
      id: "d-null",
      prompt: "What permits (A − λI)v = 0 to have a nonzero solution?",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "A − λI is invertible",
          },
          {
            id: "1",
            label: "A − λI is singular",
          },
          {
            id: "2",
            label: "v must equal zero",
          },
        ],
      },
      solution: "A singular matrix has a nontrivial nullspace.",
      hint: "Recall what inversion preserves.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Recall what inversion preserves.",
        misconceptions: [],
      },
    },
  ],
  workedExample: {
    title: "Find natural directions of a new symmetric map",
    problem: "Diagonalize B = [[3,1],[1,3]] and calculate B²(1,0).",
    steps: [
      {
        title: "Find the roots",
        body: "det(B − λI) = (3 − λ)² − 1, giving λ = 4 and 2.",
        reason: "A nonzero eigenvector requires singularity.",
        trap: "The roots are not 3 ± √3.",
      },
      {
        title: "Find and normalize vectors",
        body: "Use e₊ = (1,1)/√2 and e₋ = (1,−1)/√2.",
        reason: "Solve each nullspace and normalize for projection.",
        trap: "Do not normalize the eigenvalues.",
      },
      {
        title: "Resolve the input",
        body: "(1,0) = e₊/√2 + e₋/√2.",
        reason: "Dot products give coefficients in an orthonormal basis.",
        trap: "The coefficients are not both one.",
      },
      {
        title: "Apply twice and reconstruct",
        body: "B²(1,0) = 16e₊/√2 + 4e₋/√2 = (10,6).",
        reason: "Two applications square each eigenvalue.",
        trap: "Squaring the vector's components is a different operation.",
      },
    ],
  },
  fadedExercise: {
    prompt: "Use C = [[2,−1],[−1,2]] on the input (0,2).",
    supplied: [
      {
        heading: "Independent mode data",
        body: "e₊ = (1,1)/√2 has eigenvalue 1; e₋ = (1,−1)/√2 has eigenvalue 3. The input coefficients are √2 and −√2. All answers use unit 1.",
      },
    ],
    steps: [
      {
        id: "f-trace",
        prompt: "Find the sum of the supplied eigenvalues. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: 4,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "1 + 3 = 4, matching the trace.",
        hint: "Add the diagonal stretches.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Add the diagonal stretches.",
          misconceptions: [],
        },
      },
      {
        id: "f-coefficient",
        prompt:
          "What is the coefficient of e₋ after applying C, given its initial coefficient −√2? Enter unit 1.",
        answer: {
          kind: "numeric",
          value: -4.242640687119286,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "Multiply −√2 by eigenvalue 3.",
        hint: "Scale each mode independently.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Scale each mode independently.",
          misconceptions: [],
        },
      },
      {
        id: "f-x",
        prompt:
          "Given C(0,2) = √2e₊ − 3√2e₋, find its x-component. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: -2,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "The two x contributions are 1 and −3.",
        hint: "Convert back to the original basis.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Convert back to the original basis.",
          misconceptions: [],
        },
      },
      {
        id: "f-twice",
        prompt:
          "Given C²(0,2) = √2e₊ − 9√2e₋, find its y-component. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: 10,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "The y contributions are 1 and 9.",
        hint: "The y-component of e₋ is negative.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "The y-component of e₋ is negative.",
          misconceptions: [],
        },
      },
    ],
  },
  retrievalProblems: [
    {
      id: "r-definition",
      prompt: "Which is required for an eigenvector v?",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "v = 0",
          },
          {
            id: "1",
            label: "Av = λv with v nonzero",
          },
          {
            id: "2",
            label: "Its length is always one",
          },
        ],
      },
      solution:
        "Normalization is optional; nonzero proportionality is the definition.",
      hint: "Separate direction from normalization.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Separate direction from normalization.",
        misconceptions: [],
      },
    },
    {
      id: "r-root",
      prompt:
        "For diagonal matrix diag(2,5), what eigenvalue belongs to (0,3)? Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 5,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "The second coordinate is multiplied by five.",
      hint: "Apply the matrix.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Apply the matrix.",
        misconceptions: [],
      },
    },
    {
      id: "r-orthogonal",
      prompt:
        "What guarantees orthogonality of eigenvectors with distinct eigenvalues?",
      answer: {
        kind: "choice",
        value: "0",
        options: [
          {
            id: "0",
            label: "A real symmetric matrix in an orthonormal basis",
          },
          {
            id: "1",
            label: "Any square matrix",
          },
          {
            id: "2",
            label: "A repeated characteristic root",
          },
        ],
      },
      solution: "The symmetry identity forces their dot product to vanish.",
      hint: "Recall the proof's hypothesis.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Recall the proof's hypothesis.",
        misconceptions: [],
      },
    },
    {
      id: "r-power",
      prompt:
        "A vector has Av = −2v. Find the multiplier in A³v. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: -8,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "(−2)³ = −8.",
      hint: "Apply the same map three times.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Apply the same map three times.",
        misconceptions: [],
      },
    },
    {
      id: "r-repeat",
      prompt:
        "The matrix [[1,1],[0,1]] has how many independent eigenvector directions?",
      answer: {
        kind: "choice",
        value: "2",
        options: [
          {
            id: "0",
            label: "Two",
          },
          {
            id: "1",
            label: "Zero",
          },
          {
            id: "2",
            label: "One",
          },
        ],
      },
      solution: "The eigenvector equation requires y = 0.",
      hint: "Solve the nullspace, not just the characteristic polynomial.",
      rubric: {
        defaultCategory: "conceptual",
        explanation:
          "Solve the nullspace, not just the characteristic polynomial.",
        misconceptions: [],
      },
    },
    {
      id: "r-transfer",
      prompt:
        "For symmetric A with eigenvalues 2 and 7, what can you say about vᵀAv for nonzero real v?",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "It may be negative",
          },
          {
            id: "1",
            label: "It is positive",
          },
          {
            id: "2",
            label: "It is always 9",
          },
        ],
      },
      solution:
        "In an orthonormal eigenbasis it equals 2c₁² + 7c₂², with at least one nonzero coefficient.",
      hint: "Resolve the quadratic form in natural coordinates.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Resolve the quadratic form in natural coordinates.",
        misconceptions: [],
      },
    },
  ],
  diagram: {
    title: "Two invariant diagonal directions",
    caption:
      "For A = [[2,1],[1,2]], northeast inputs stretch by 3 while southeast inputs keep their length. The two eigenvector lines are perpendicular.",
    viewBox: [0, 0, 600, 320],
    elements: [
      {
        kind: "line",
        from: [70, 160],
        to: [490, 160],
        tone: "muted",
      },
      {
        kind: "line",
        from: [280, 300],
        to: [280, 20],
        tone: "muted",
      },
      {
        kind: "line",
        from: [160, 280],
        to: [400, 40],
        tone: "ink",
      },
      {
        kind: "line",
        from: [160, 40],
        to: [400, 280],
        tone: "ink",
      },
      {
        kind: "line",
        from: [280, 160],
        to: [325, 115],
        tone: "accent",
      },
      {
        kind: "line",
        from: [280, 160],
        to: [415, 25],
        tone: "accent",
      },
      {
        kind: "label",
        at: [425, 35],
        text: "λ = 3",
      },
      {
        kind: "label",
        at: [390, 265],
        text: "λ = 1",
      },
      {
        kind: "label",
        at: [75, 310],
        text: "Same line before and after",
      },
    ],
  },
  sidebars: [
    {
      heading: "A short check of shear growth",
      body: "Write $J=I+N$ with $N=\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$. Since $N^2=0$, multiplying $(I+N)$ repeatedly gives $J^n=I+nN$. The growing term comes from a direction that is not an eigenvector. This explains why a repeated eigenvalue alone cannot justify replacing a matrix by a diagonal one.",
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
