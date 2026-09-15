import type { Chapter } from "../chapter";
const chapter: Chapter = {
  theoreticalMinimum: { coreIdea: "Curl measures local circulation, while Stokes' theorem connects that local density to circulation around an oriented boundary. The theorem is local in its differential ingredients but global in its conclusion, so the topology and orientation of the domain cannot be treated as afterthoughts.", widerConnection: "The local-to-global pattern prepares the learner for PDEs, topology, potentials, and field synthesis. It also explains why a curl-free calculation may be insufficient to produce a single-valued global potential on a punctured domain." },
  id: "curl-stokes",
  intuition: {
    body: "Place a tiny paddle wheel in a flowing stream. A uniform flow carries it along without necessarily turning it, while a flow faster on one side can make it rotate. The turning tendency depends on differences across the wheel, so it cannot be inferred from the velocity at its centre alone.\n\nCirculation measures the signed tangential contribution of a field around a loop. Shrinking the loop and dividing by its area gives a local circulation density. In three dimensions, a loop can face different directions, so this density becomes the component of a vector called curl along the loop's normal.\n\nWe have already seen how fluxes through internal faces cancel to give the divergence theorem. A similar cancellation happens when adjacent surface patches share edges: the same edge is traversed in opposite directions. This is the geometric reason that circulation around an outer boundary can be evaluated through curl across its surface.\n\nThe paddle-wheel picture is a useful guide, but the theorem applies to vector fields far beyond fluid velocity. We will derive the planar formula, state the three-dimensional extension, and then examine a field that has zero curl wherever it is defined yet nonzero circulation around a hole. The domain is part of the mathematics.",
    thoughtExperiments: [
      "Can a moving fluid have no local circulation?",
      "If curl is zero everywhere a field is defined, does every loop necessarily have zero circulation?",
    ],
  },
  theory: [
    {
      heading: "1. Compare tangential contributions around a small rectangle",
      body: "Draw a small rectangle on the workshop floor, with its lower-left corner at $(x,y)$ and side lengths $\\Delta x,\\Delta y$. Traverse its boundary counterclockwise when viewed from above. For a planar field $\\mathbf F=(P,Q)$, the bottom edge contributes approximately $P(x,y)\\Delta x$, and the top edge contributes $-P(x,y+\\Delta y)\\Delta x$ because that edge is traversed leftward.\n\nThe right edge contributes $Q(x+\\Delta x,y)\\Delta y$, while the left contributes $-Q(x,y)\\Delta y$. Adding the four terms and expanding the differences yields\n$$\\oint_C\\mathbf F\\cdot d\\mathbf r\n\\approx\\left(\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}\\right)\\Delta x\\Delta y.$$\nThe loop symbol on the integral marks a closed path. Dividing by the rectangle's area and taking the limit identifies the upward curl component.\n\nThe signs come from the chosen traversal. A counterclockwise boundary pairs with an upward normal by the right-hand rule: curl the right-hand fingers in the traversal direction and the thumb points along the normal. Looking from below changes the apparent clockwise sense, so always specify the viewpoint or normal. Reversing the traversal negates circulation and the associated oriented surface integral.\n\nFor the rotational field $\\mathbf F=(-\\Omega y,\\Omega x)$, the upward curl is $2\\Omega$. On a circle of radius $R$, the field is tangential with magnitude $\\Omega R$ for positive $\\Omega$, so its counterclockwise circulation is $2\\pi\\Omega R^2$. Dividing by area $\\pi R^2$ again gives $2\\Omega$, independently checking the local formula.\n\nFor fluid velocity in rigid rotation, the angular speed is therefore half the curl magnitude, not the full curl. The paddle wheel motivates a turning tendency, but the factor two follows from contributions on both sets of opposite edges. Uniform translation has zero curl because all relevant spatial derivatives vanish, even if the flow speed is large.\n\nThe shear flow $\\mathbf v=(ay,0)$ separates circulation from outward imbalance. Its divergence is zero because the horizontal component does not vary with x, but its upward curl is $-a$. For $a>0$, the top of a small rectangle moves rightward faster than the bottom. Counterclockwise traversal goes leftward along the top, so that stronger contribution is negative, giving clockwise local circulation. The sign follows directly from the physical picture.\n\nConversely, the expanding field $\\mathbf v=(ax,ay)$ has divergence $2a$ and zero curl. It spreads fluid area locally without a turning component. Combining these two examples shows why divergence and curl answer independent questions. Neither one is merely a different name for a nonuniform field, and both can vanish in a uniform translation. When diagnosing a field, compare the particular spatial differences each operation measures rather than trying to infer everything from the visual direction of a few arrows.",
    },
    {
      heading: "2. Cancel interior edges to obtain Stokes' theorem",
      body: "Tile a flat region with tiny rectangles. A shared edge is traversed once in each direction by its two neighbouring patches, so its two line-integral contributions cancel. Summing the remaining outer edges and passing to a limit gives Green's theorem in the plane:\n$$\\oint_{\\partial D}(P\\,dx+Q\\,dy)\n=\\iint_D\\left(\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}\\right)dx\\,dy.$$\nThe outer boundary is counterclockwise for the upward normal. If the region has holes, its inner boundaries are traversed clockwise so that the region remains on the left of each oriented edge.\n\nFor a three-dimensional field $\\mathbf F=(F_x,F_y,F_z)$, applying the same rectangle argument in each coordinate plane gives\n$$\\nabla\\times\\mathbf F=\n\\left(\\partial_yF_z-\\partial_zF_y,\\,\n\\partial_zF_x-\\partial_xF_z,\\,\n\\partial_xF_y-\\partial_yF_x\\right).$$\nIts component along a chosen unit normal measures the limiting circulation per oriented area in that plane. The cross symbol denotes curl here, a differential operation on the field, rather than an ordinary product of two vectors.\n\nOn a smooth oriented surface $S$, neighbouring small patches again share oppositely traversed edges, leaving only its boundary. The three-dimensional result is Stokes' theorem:\n$$\\oint_{\\partial S}\\mathbf F\\cdot d\\mathbf r\n=\\int_S(\\nabla\\times\\mathbf F)\\cdot\\mathbf n\\,dS.$$\nAssume the field has continuous first derivatives on a neighbourhood of the surface and the surface and boundary have appropriate piecewise smoothness. The surface must carry a consistent choice of normal, and its boundary orientation must agree with that choice.\n\nThe practical advantage is freedom to choose a convenient spanning surface when several valid surfaces share the same oriented boundary. For a circular loop in a smooth field, a flat disk may be simpler than a curved cap. Both give the same total curl flux because each equals the same line integral. This freedom does not permit a surface to pass through points where the field is undefined.\n\nFor example, the rotational field above has constant upward curl $2\\Omega$. Across a horizontal disk its flux is just $2\\Omega$ times the area, reproducing the circle calculation. The theorem can simplify the arithmetic, but the direct boundary check remains a valuable way to verify orientation and units.",
    },
    {
      heading: "3. Distinguish local curl from global potential",
      body: "Walk around a drain while staying away from its centre. Consider the dimensionless planar field\n$$\\mathbf F(x,y)=\\left(-\\frac{y}{x^2+y^2},\\frac{x}{x^2+y^2}\\right),\\qquad (x,y)\\ne(0,0).$$\nAway from the origin, differentiation gives $\\partial_xF_y=(y^2-x^2)/(x^2+y^2)^2$ and the same value for $\\partial_yF_x$. The curl is therefore zero at every point where the field is defined.\n\nParameterize a circle of radius $R$ by $(R\\cos t,R\\sin t)$ for $0\\leq t\\leq2\\pi$. The field becomes $(-\\sin t/R,\\cos t/R)$, while the tangent is $(-R\\sin t,R\\cos t)$. Their dot product is one, so the counterclockwise circulation is $2\\pi$, independent of radius. Zero local curl has not made the global loop integral vanish.\n\nThere is no contradiction with Stokes' theorem. The obvious spanning disk contains the origin, where the field is undefined, so the smoothness hypothesis fails. If instead we use an annulus excluding the origin, it has two boundaries: an outer counterclockwise circle and an inner clockwise circle. Their integrals are $2\\pi$ and $-2\\pi$, whose sum is zero, matching the zero curl over the annulus.\n\nA continuously differentiable gradient field has zero curl when the relevant mixed second derivatives commute. The converse requires a domain condition. On an open simply connected region, meaning informally that every closed loop can be contracted to a point without leaving the region, a smooth curl-free field has a single-valued potential. We quote this global result here; the punctured-plane example explains why some such condition is necessary.\n\nLocally our circulating field resembles the gradient of polar angle. But angle increases by $2\\pi$ after one complete turn, so it cannot serve as a globally single-valued real potential on the whole punctured plane. Choosing a cut allows a local branch, at the cost of excluding paths that cross that cut.\n\nWe can now place the three field tools together. Line integrals measure oriented tangential accumulation, divergence measures outward flux density, and curl measures circulation density. Each links local variation to a global integral only under the stated geometric and smoothness assumptions. Keeping those assumptions visible will be especially important in complex contour integration and field models with sources concentrated at points.",
    },
  ],
  teaching: {
    question: "What local information controls circulation around a boundary?",
    why: "Curl and Stokes' theorem connect rotation-like field variation with whole-loop integrals, while exposing the role of holes and singularities.",
    outcomes: [
      "Derive the planar curl component from an oriented rectangle.",
      "Apply Stokes' theorem with consistent orientation.",
      "Explain why curl-free need not imply a global potential.",
    ],
    checkpoints: [
      {
        bridge: "Compare opposite edges.",
        meaning: "Curl measures circulation per oriented area.",
        question:
          "Why is the top horizontal contribution negative for counterclockwise traversal?",
        answer: "That edge is traversed toward decreasing x.",
        further: [
          {
            question:
              "Which normal pairs with counterclockwise motion viewed from above?",
            answer: "The upward normal.",
          },
          {
            question: "Why is rigid-rotation curl twice the angular speed?",
            answer:
              "Both opposite-edge pairs contribute the same angular-rate difference.",
          },
          {
            question: "Does fast uniform translation have nonzero curl?",
            answer:
              "No. Curl depends on spatial differences, which vanish for a uniform field.",
          },
        ],
      },
      {
        bridge: "Cancel shared edges.",
        meaning: "Only the oriented outer and inner boundaries remain.",
        question: "Why do neighbouring patch edges cancel?",
        answer: "The same field integral is traversed in opposite directions.",
        further: [
          {
            question:
              "How is an inner hole boundary oriented for an upward normal?",
            answer: "Clockwise, opposite to the outer boundary.",
          },
          {
            question: "Can any surface with the same boundary be used?",
            answer:
              "Only one satisfying the theorem's orientation and field-smoothness hypotheses.",
          },
          {
            question: "What must change if you reverse the surface normal?",
            answer: "The boundary orientation must reverse as well.",
          },
        ],
      },
      {
        bridge: "Inspect the domain as well as derivatives.",
        meaning: "A hole can obstruct a single-valued potential.",
        question:
          "Why can the punctured-plane field have zero curl and circulation 2π?",
        answer:
          "Its loop encloses a point outside the field's domain, so the disk form of Stokes is invalid.",
        further: [
          {
            question: "What happens on an annulus?",
            answer:
              "Outer and inner oriented circulations cancel, matching zero curl.",
          },
          {
            question: "What does simply connected rule out informally?",
            answer: "An unshrinkable loop around a hole within the domain.",
          },
          {
            question:
              "Why is polar angle not a global single-valued potential here?",
            answer:
              "It changes by 2π after one circuit even though the endpoint is the same.",
          },
        ],
      },
    ],
    takeaway:
      "Match boundary and surface orientation, and check the whole spanning surface before replacing circulation with curl flux.",
    nextConnection:
      "Normal modes and Fourier analysis will organize evolving fields; the domain lesson will return in complex contour reasoning.",
  },
  diagnostics: [
    {
      id: "d-flux",
      prompt:
        "A constant upward field 3/s crosses a horizontal area 2 m² with upward normal. Find its flux.",
      answer: {
        kind: "numeric",
        value: 6,
        unit: "m²/s",
        acceptedUnits: ["m²/s"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "3 × 2 = 6 m²/s.",
      hint: "Dot with the chosen normal and multiply by area.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Dot with the chosen normal and multiply by area.",
        misconceptions: [],
      },
      prerequisiteId: "divergence",
    },
    {
      id: "d-cancel",
      prompt: "Why do internal faces cancel in the divergence theorem?",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "Their fields vanish",
          },
          {
            id: "1",
            label: "They carry opposite outward normals for adjacent cells",
          },
          {
            id: "2",
            label: "Their areas are zero",
          },
        ],
      },
      solution: "The same physical face is counted with opposite orientations.",
      hint: "Track the sign of each contribution.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Track the sign of each contribution.",
        misconceptions: [],
      },
    },
  ],
  workedExample: {
    title: "Circulation around a rectangle",
    problem:
      "For F = (−2y,3x) in dimensionless coordinates, find counterclockwise circulation around 0 ≤ x ≤ 2, 0 ≤ y ≤ 1.",
    steps: [
      {
        title: "Compute the curl component",
        body: "∂Fᵧ/∂x − ∂Fₓ/∂y = 3 − (−2) = 5.",
        reason: "Counterclockwise orientation pairs with the upward component.",
        trap: "Subtract the negative derivative.",
      },
      {
        title: "Integrate over area",
        body: "Area is 2, so circulation is 10.",
        reason: "The curl is constant and the field smooth throughout.",
        trap: "Use area, not perimeter.",
      },
      {
        title: "Check the vertical edges",
        body: "Right edge: ∫₀¹ 6 dy = 6. Left edge: x = 0, so zero.",
        reason: "Keep each edge's traversal direction.",
        trap: "The upward right edge is positive.",
      },
      {
        title: "Check horizontal edges",
        body: "Bottom: zero. Top: ∫₂⁰ (−2) dx = 4. Total 6 + 4 = 10.",
        reason: "The top is traversed leftward.",
        trap: "Using limits 0 to 2 on the top would reverse its contribution.",
      },
    ],
  },
  fadedExercise: {
    prompt: "For F = (−y,x), find circulation around the radius-2 circle.",
    supplied: [
      {
        heading: "Independent information",
        body: "Coordinates are dimensionless. The upward curl is 2, the disk area is 4π, and counterclockwise traversal uses the upward normal.",
      },
    ],
    steps: [
      {
        id: "f-curl",
        prompt: "Evaluate ∂x/∂x − ∂(−y)/∂y. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: 2,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "1 − (−1) = 2.",
        hint: "Keep the subtraction.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Keep the subtraction.",
          misconceptions: [],
        },
      },
      {
        id: "f-area",
        prompt: "Find the radius-2 disk area. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: 12.566370614359172,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "πR² = 4π.",
        hint: "Square the radius.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Square the radius.",
          misconceptions: [],
        },
      },
      {
        id: "f-integral",
        prompt: "Multiply curl 2 by area 4π. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: 25.132741228718345,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "The circulation is 8π.",
        hint: "Use the supplied constant curl.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Use the supplied constant curl.",
          misconceptions: [],
        },
      },
      {
        id: "f-reverse",
        prompt:
          "The counterclockwise circulation is 8π. Find the clockwise circulation. Enter unit 1.",
        answer: {
          kind: "numeric",
          value: -25.132741228718345,
          unit: "1",
          acceptedUnits: ["1"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "Reversing the loop gives −8π.",
        hint: "Orientation changes the sign.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Orientation changes the sign.",
          misconceptions: [],
        },
      },
    ],
  },
  retrievalProblems: [
    {
      id: "r-meaning",
      prompt: "Curl dotted with a unit normal measures:",
      answer: {
        kind: "choice",
        value: "0",
        options: [
          {
            id: "0",
            label: "Local circulation per oriented area",
          },
          {
            id: "1",
            label: "Outward flux per volume",
          },
          {
            id: "2",
            label: "The field's speed",
          },
        ],
      },
      solution:
        "It comes from a shrinking loop in the plane perpendicular to that normal.",
      hint: "Recall the rectangle derivation.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Recall the rectangle derivation.",
        misconceptions: [],
      },
    },
    {
      id: "r-derivative",
      prompt: "For F = (y²,3x), find upward curl at y = 2. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: -1,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "3 − 2y = −1.",
      hint: "Differentiate the correct components.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Differentiate the correct components.",
        misconceptions: [],
      },
    },
    {
      id: "r-orient",
      prompt:
        "Viewed from +z, the positive boundary direction for an upward disk normal is:",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "Clockwise",
          },
          {
            id: "1",
            label: "Counterclockwise",
          },
          {
            id: "2",
            label: "Either without changing signs",
          },
        ],
      },
      solution:
        "The right-hand rule pairs upward normal with counterclockwise traversal.",
      hint: "Curl fingers around the boundary.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Curl fingers around the boundary.",
        misconceptions: [],
      },
    },
    {
      id: "r-rigid",
      prompt:
        "A rigid planar rotation has angular speed 4/s. Find its upward velocity curl.",
      answer: {
        kind: "numeric",
        value: 8,
        unit: "1/s",
        acceptedUnits: ["1/s"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "Curl equals twice the angular speed for v = (−Ωy,Ωx).",
      hint: "Both derivative terms contribute.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Both derivative terms contribute.",
        misconceptions: [],
      },
    },
    {
      id: "r-hole",
      prompt:
        "A field is undefined at the centre of a disk. May ordinary Stokes' theorem be applied across the full disk without further analysis?",
      answer: {
        kind: "choice",
        value: "2",
        options: [
          {
            id: "0",
            label: "Yes, because one point has zero area",
          },
          {
            id: "1",
            label: "Yes, whenever boundary values are finite",
          },
          {
            id: "2",
            label: "No, its field-smoothness hypothesis is not satisfied",
          },
        ],
      },
      solution:
        "A singular point can carry a nonzero circulation contribution.",
      hint: "Check the interior, not only the boundary.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Check the interior, not only the boundary.",
        misconceptions: [],
      },
    },
    {
      id: "r-annulus",
      prompt:
        "The punctured-plane angle field has outer counterclockwise circulation 2π. Find its inner clockwise circulation. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: -6.283185307179586,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution:
        "A circle gives 2π counterclockwise, and reversing it gives −2π.",
      hint: "The annulus has two boundary components.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "The annulus has two boundary components.",
        misconceptions: [],
      },
    },
  ],
  diagram: {
    title: "An annulus keeps both boundary components",
    caption:
      "The outer path runs counterclockwise and the inner path clockwise for an upward surface normal. Their circulations cancel for the curl-free angle field.",
    viewBox: [0, 0, 600, 320],
    elements: [
      {
        kind: "ellipse",
        center: [280, 160],
        rx: 125,
        ry: 125,
        tone: "ink",
      },
      {
        kind: "ellipse",
        center: [280, 160],
        rx: 55,
        ry: 55,
        tone: "muted",
      },
      {
        kind: "line",
        from: [405, 165],
        to: [405, 120],
        tone: "accent",
      },
      {
        kind: "line",
        from: [398, 133],
        to: [405, 120],
        tone: "accent",
      },
      {
        kind: "line",
        from: [412, 133],
        to: [405, 120],
        tone: "accent",
      },
      {
        kind: "line",
        from: [335, 150],
        to: [335, 185],
        tone: "accent",
      },
      {
        kind: "line",
        from: [328, 172],
        to: [335, 185],
        tone: "accent",
      },
      {
        kind: "line",
        from: [342, 172],
        to: [335, 185],
        tone: "accent",
      },
      {
        kind: "label",
        at: [430, 130],
        text: "outer: +2π",
      },
      {
        kind: "label",
        at: [345, 205],
        text: "inner: −2π",
      },
      {
        kind: "label",
        at: [255, 165],
        text: "hole",
      },
    ],
  },
  sidebars: [
    {
      heading: "Why a gradient has zero curl",
      body: "If $\\mathbf F=\\nabla\\phi$ and $\\phi$ has continuous second derivatives, its upward curl is $\\partial_x\\partial_y\\phi-\\partial_y\\partial_x\\phi=0$ by equality of mixed partial derivatives; the other components vanish similarly. This is a local calculation. Recovering a global single-valued potential from zero curl requires additional domain information.",
    },
  ],
  sources: [
    {
      title: "MIT OpenCourseWare · Multivariable Calculus",
      url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/",
    },
  ],
};
chapter.sidebars.push({
  heading: "Why an exact gradient has no circulation—and where the converse fails",
  body: String.raw`Walk around a closed polygon and sum the changes of a single-valued potential. Each vertex value appears once positively and once negatively, leaving zero. Shrinking the segments into a smooth path gives $\oint\nabla U\cdot dr=0$. Stokes’ theorem expresses the same statement locally as $\nabla\times\nabla U=0$, with suitable differentiability.

The reason is cancellation, just as internal fluxes cancelled in the divergence theorem. Here the shared pieces are edges rather than faces. Both theorems relate a derivative inside a region to a measurement along its boundary.

The converse needs more care. On the plane with the origin removed, take $F=(-y/r^2,x/r^2)$, where $r^2=x^2+y^2$. Its curl is zero at every point of the domain. Around a circle of radius R, however, $F$ has tangential magnitude $1/R$, so
$$\oint F\cdot dr=(1/R)(2\pi R)=2\pi.$$
Why does Stokes not force zero? The disk spanning that circle includes the removed origin, where the field is undefined. The hypotheses fail on that surface.

Local information can therefore miss an obstruction created by the domain. The connection to inverse functions is useful: an angle can be chosen smoothly in a small patch, just as an inverse branch can be chosen locally, but those choices need not combine into one global function.`,
});

export default chapter;
