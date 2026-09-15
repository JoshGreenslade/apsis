import type { Chapter } from "../chapter";
const chapter: Chapter = {
  theoreticalMinimum: { coreIdea: "Divergence measures local net outflow, and integrating it over a region leaves the flux through the external boundary after internal faces cancel. A tiny-box calculation therefore becomes a global balance only when orientation, smoothness, and the closed boundary are kept explicit.", widerConnection: "Local-to-global balance becomes conservation laws, heat flow, and field equations. The learner should begin to recognise this cancellation pattern as a structural reason, not a theorem to apply without inspecting its hypotheses." },
  id: "divergence",
  intuition: {
    body: "Draw an imaginary box inside a flowing fluid. Fluid may enter one face and leave another, so looking at the speed on a single face cannot tell you whether the box is gaining material. You need a signed total over the entire boundary, with outward flow counted positive and inward flow negative.\n\nFlux measures how much of a vector field crosses an oriented surface. For a velocity field it has units of volume per time; for a mass-current field it has units of mass per time. The distinction matters when density is not constant. A field's magnitude alone does not determine its flux, because flow parallel to a surface does not cross it.\n\nIf we shrink the box, the net outward flux per unit volume approaches a local quantity called divergence. It compares opposing faces rather than measuring how far arrows happen to point from a chosen origin. We will derive its coordinate formula from this small-box balance and then explain why internal faces cancel when many boxes are assembled.\n\nThe physical law we will assume is conservation of the transported material, allowing an explicitly specified source. That turns the geometric flux identity into an evolution equation for density. The theorem itself is mathematics; the statement that a particular substance obeys that balance is physical input.",
    thoughtExperiments: [
      "Can a uniform fast flow pass through a box with zero net outward flux?",
      "Can a point where the field vector vanishes still have nonzero divergence?",
    ],
  },
  theory: [
    {
      heading: "1. Count crossing through an oriented surface",
      body: "Hold a small flat frame in a stream. When its opening faces the flow, much fluid crosses it; when its plane lies along the flow, little or none crosses. A unit normal $\\mathbf n$ describes the chosen positive crossing direction, perpendicular to the frame. For a nearly constant field $\\mathbf F$ over a small area $\\Delta S$, the signed flux is approximately $\\mathbf F\\cdot\\mathbf n\\,\\Delta S$.\n\nAdding patches and refining them defines the surface integral\n$$\\Phi=\\int_S\\mathbf F\\cdot\\mathbf n\\,dS.$$\nHere $dS$ is a positive area element; orientation is carried by $\\mathbf n$. Reversing the normal negates the flux. On the closed boundary of a volume, the conventional normal points outward, so positive net flux means more outward than inward crossing.\n\nFor a surface parameterized by $\\mathbf r(u,v)$, the two tangent derivatives span a small parallelogram. Their cross product is an oriented area vector:\n$$\\mathbf n\\,dS=(\\mathbf r_u\\times\\mathbf r_v)\\,du\\,dv.$$\nThe cross product is the perpendicular vector whose magnitude is the parallelogram area and whose direction follows the right-hand rule from the first tangent to the second. Reversing their order reverses orientation. For coordinate-aligned box faces, we can work directly with unit coordinate normals instead.\n\nLet $\\mathbf v$ be fluid velocity. Its flux has units $(\\mathrm m/\\mathrm s)\\mathrm m^2=\\mathrm m^3/\\mathrm s$. If density $\\rho$ has units kg/m³, the mass-current field $\\mathbf j=\\rho\\mathbf v$ has units kg/(m² s), and its flux is mass per time. When density varies, replacing $\\mathbf j$ by velocity alone loses the amount of material carried by each volume.\n\nA uniform field through a closed box illustrates the sign convention. The outgoing flux on one face is exactly cancelled by incoming flux on the opposite face. There can be substantial transport through the box while its net outward flux is zero. Flux is a boundary comparison, not the sum of unsigned crossing rates.",
    },
    {
      heading: "2. Shrink a box to derive divergence",
      body: "Take a small rectangular box whose side lengths are $\\Delta x,\\Delta y,\\Delta z$. On its right face the outward normal is $+\\mathbf e_x$, while on its left face it is $-\\mathbf e_x$. To leading order, their combined flux is\n$$[F_x(x+\\Delta x,y,z)-F_x(x,y,z)]\\Delta y\\Delta z.$$\nThe minus sign is an orientation effect: a positive horizontal field enters through the left face and leaves through the right.\n\nFor a differentiable field, the bracket is approximately $(\\partial F_x/\\partial x)\\Delta x$. The other two opposing face pairs similarly contribute $(\\partial F_y/\\partial y)\\Delta V$ and $(\\partial F_z/\\partial z)\\Delta V$, where $\\Delta V=\\Delta x\\Delta y\\Delta z$. Dividing the total by volume and shrinking the box gives\n$$\\nabla\\cdot\\mathbf F=\n\\frac{\\partial F_x}{\\partial x}+\n\\frac{\\partial F_y}{\\partial y}+\n\\frac{\\partial F_z}{\\partial z}.$$\nThis divergence measures local net outward flux per volume.\n\nOnly the derivative of each component in its own coordinate direction appears. A horizontal field varying with height can shear a flow without producing a horizontal difference between the box's left and right faces. For example $\\mathbf F=(y,0,0)$ has zero divergence, despite not being spatially uniform. A different local comparison, curl, will detect its circulation.\n\nFor $\\mathbf F=\\alpha(x,y,z)$, divergence is $3\\alpha$. At the origin the field itself vanishes, but nearby arrows point outward more strongly on the outgoing faces than on the incoming faces, so the divergence remains positive if $\\alpha>0$. The value of a field at a point and its spatial rate of change are different data.\n\nDivergence is a scalar geometric quantity, although the displayed expression uses Cartesian coordinates. In curvilinear coordinates the changing areas and volumes introduce additional factors. Simply replacing $x,y,z$ by radial and angular labels would miss those factors. The small-volume flux interpretation remains the guide when the coordinate formula becomes more complicated.",
    },
    {
      heading: "3. Assemble local balances into a conservation law",
      body: "Fill a larger region with small boxes. Each internal face belongs to two boxes with opposite outward normals. Its flux appears once positive and once negative, so the two contributions cancel exactly. Only the exterior boundary remains. Passing to the limit gives the divergence theorem\n$$\\int_V\\nabla\\cdot\\mathbf F\\,dV=\\int_{\\partial V}\\mathbf F\\cdot\\mathbf n\\,dS.$$\nWe assume a sufficiently smooth field on the region and its boundary, and a piecewise smooth closed boundary. Singularities inside the region require separate treatment; the cancellation argument cannot silently pass through an undefined field.\n\nCheck the theorem independently for $\\mathbf F=\\alpha(x,y,z)$ on the cube $0\\leq x,y,z\\leq L$. Divergence is $3\\alpha$, so the volume side is $3\\alpha L^3$. On each coordinate-zero face the normal component vanishes. On each opposite face it equals $\\alpha L$, multiplying area $L^2$ to give $\\alpha L^3$. Three faces contribute, reproducing the total without using the volume calculation.\n\nNow interpret $\\mathbf F$ as a material current $\\mathbf j$. In a fixed volume, conservation with source density $s$ says\n$$\\frac{d}{dt}\\int_V\\rho\\,dV\n=-\\int_{\\partial V}\\mathbf j\\cdot\\mathbf n\\,dS+\\int_V s\\,dV.$$\nThe negative boundary sign expresses loss from outward flow. A positive $s$ represents local production of the tracked quantity, with units of density per time. The region is fixed in space; moving boundaries would require an additional transport term.\n\nApply the divergence theorem and, assuming sufficient regularity to differentiate under the integral, combine the volume integrals. Because the resulting balance holds for every small fixed region, the local equation is\n$$\\frac{\\partial\\rho}{\\partial t}+\\nabla\\cdot\\mathbf j=s.$$\nWithout sources, positive current divergence means density is decreasing locally. It does not by itself mean matter is being created. The word source in the geometric interpretation of divergence describes outward field flow, which must be distinguished from the physical production term $s$.\n\nFor constant density and no material sources, $\\mathbf j=\\rho\\mathbf v$ reduces the equation to $\\nabla\\cdot\\mathbf v=0$. For variable density the product rule introduces $\\mathbf v\\cdot\\nabla\\rho$, so zero velocity divergence alone does not say that density at a fixed point is constant in time. This qualification will matter in heat flow, where a constitutive law relates the transported current to a temperature gradient.\n\nA divergence-free field need not have zero flux through every open surface. A constant rightward current crosses a vertical frame with nonzero flux; it is only the complete closed boundary balance that cancels. Similarly, zero net flux through one chosen box does not prove the divergence vanishes everywhere inside. Positive and negative local contributions could integrate to zero. Inferring a local equation requires balances over arbitrary sufficiently small regions.\n\nFor a simple density example, take a one-dimensional current $j_x=ax$ with $a>0$ constant and no production. The continuity equation gives $\\partial_t\\rho=-a$, so a profile initially uniform at $\\rho_0$ becomes $\\rho_0-at$ wherever that prescribed-current model applies. This cannot remain a physical positive density indefinitely. The calculation therefore needs a time range or a constitutive law that changes the current as material is depleted. Conservation constrains a model, but it does not by itself select a physically valid current for all times.",
    },
  ],
  teaching: {
    question: "How does flow across a boundary determine change inside?",
    why: "Divergence turns surface balances into local conservation equations while keeping units and signs visible.",
    outcomes: [
      "Compute oriented flux through simple faces.",
      "Derive divergence from opposite-face differences.",
      "Connect the divergence theorem with local conservation.",
    ],
    checkpoints: [
      {
        bridge: "Count crossing rather than arrow length.",
        meaning: "Flux is signed normal field times area.",
        question: "Why can a large tangential field have zero flux?",
        answer: "Its dot product with the normal vanishes.",
        further: [
          {
            question: "What changes on reversing the normal?",
            answer: "The flux sign reverses.",
          },
          {
            question: "Does velocity flux measure mass per time?",
            answer:
              "It measures volume per time; mass flux uses density times velocity.",
          },
          {
            question: "Can uniform flow have zero closed-surface flux?",
            answer: "Yes. Incoming and outgoing face contributions cancel.",
          },
        ],
      },
      {
        bridge: "Compare opposite faces.",
        meaning: "Divergence is local net outward flux per volume.",
        question: "Why subtract the left-face contribution?",
        answer:
          "Its outward normal points in the negative coordinate direction.",
        further: [
          {
            question: "Why is ∂Fₓ/∂y absent from divergence?",
            answer:
              "Horizontal flux imbalance compares left and right faces, separated in x.",
          },
          {
            question: "Can F vanish at a point while divergence is positive?",
            answer:
              "Yes. F = α(x,y,z) vanishes at the origin but has divergence 3α.",
          },
          {
            question:
              "Can Cartesian formulas be reused unchanged in polar coordinates?",
            answer:
              "No. Coordinate-dependent area and volume factors must be included.",
          },
        ],
      },
      {
        bridge: "Cancel internal boundaries.",
        meaning:
          "The global flux identity becomes conservation only after a physical balance law is supplied.",
        question: "Why do interior faces disappear?",
        answer:
          "Adjacent cells count the same flux with opposite outward normals.",
        further: [
          {
            question: "Why is outward current negative in the density balance?",
            answer:
              "Material leaving a fixed region decreases the amount inside.",
          },
          {
            question:
              "Does positive current divergence necessarily imply production?",
            answer: "No. Without production it implies local depletion.",
          },
          {
            question: "Why specify a fixed volume?",
            answer:
              "A moving boundary can carry material across the chosen region even apart from the fixed-surface current term.",
          },
        ],
      },
    ],
    takeaway:
      "Divergence measures a signed local imbalance; conservation connects that imbalance to changing density and explicit sources.",
    nextConnection:
      "Curl will compare circulation around small loops and connect it to a spanning surface.",
  },
  diagnostics: [
    {
      id: "d-orientation",
      prompt: "Reversing a vector work path does what to its integral?",
      answer: {
        kind: "choice",
        value: "0",
        options: [
          {
            id: "0",
            label: "Negates it",
          },
          {
            id: "1",
            label: "Leaves it unchanged",
          },
          {
            id: "2",
            label: "Squares it",
          },
        ],
      },
      solution: "The oriented displacement reverses.",
      hint: "Recall orientation in a line integral.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Recall orientation in a line integral.",
        misconceptions: [],
      },
      prerequisiteId: "line-integrals",
    },
    {
      id: "d-partial",
      prompt: "For Fₓ = x²y, find ∂Fₓ/∂x at x = 2, y = 3. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 12,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "The derivative is 2xy = 12.",
      hint: "Hold y fixed.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Hold y fixed.",
        misconceptions: [],
      },
      prerequisiteId: "multivariable",
    },
  ],
  workedExample: {
    title: "Check both sides on a rectangular box",
    problem:
      "For velocity v = (2x,−y,3z)/s, find outward volume flux from 0 ≤ x ≤ 1 m, 0 ≤ y ≤ 2 m, 0 ≤ z ≤ 3 m.",
    steps: [
      {
        title: "Find the local imbalance",
        body: "∇ · v = (2 − 1 + 3)/s = 4/s.",
        reason: "Differentiate each component along its own coordinate.",
        trap: "The negative y component contributes −1/s.",
      },
      {
        title: "Integrate through the volume",
        body: "Volume is 6 m³, so net flux is 24 m³/s.",
        reason: "Divergence is constant.",
        trap: "Divergence itself is not the total flux.",
      },
      {
        title: "Check individual positive faces",
        body: "x = 1 gives 2 × 6 = 12; y = 2 gives −2 × 3 = −6; z = 3 gives 9 × 2 = 18, all in m³/s.",
        reason: "Use each face's normal speed and area.",
        trap: "The y-face flow is inward, so its flux is negative.",
      },
      {
        title: "Finish the independent check",
        body: "The coordinate-zero faces contribute zero; 12 − 6 + 18 = 24 m³/s.",
        reason: "Both methods now agree.",
        trap: "Adding unsigned values would give a false net balance.",
      },
    ],
  },
  fadedExercise: {
    prompt: "A cube of side 2 m contains velocity v = (x,y,z)/s.",
    supplied: [
      {
        heading: "Independent data",
        body: "Each positive-coordinate face has normal speed 2 m/s and area 4 m². The three coordinate-zero faces have zero normal speed. The volume is 8 m³.",
      },
    ],
    steps: [
      {
        id: "f-face",
        prompt: "Find outward flux through one positive-coordinate face.",
        answer: {
          kind: "numeric",
          value: 8,
          unit: "m³/s",
          acceptedUnits: ["m³/s"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "2 × 4 = 8 m³/s.",
        hint: "Multiply normal speed by area.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Multiply normal speed by area.",
          misconceptions: [],
        },
      },
      {
        id: "f-total",
        prompt: "Three faces each contribute 8 m³/s. Find total outward flux.",
        answer: {
          kind: "numeric",
          value: 24,
          unit: "m³/s",
          acceptedUnits: ["m³/s"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "3 × 8 = 24 m³/s.",
        hint: "The other faces contribute zero.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "The other faces contribute zero.",
          misconceptions: [],
        },
      },
      {
        id: "f-div",
        prompt: "Find ∇ · v in inverse seconds.",
        answer: {
          kind: "numeric",
          value: 3,
          unit: "1/s",
          acceptedUnits: ["1/s"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "Each coordinate derivative is 1/s, so the sum is 3/s.",
        hint: "Differentiate before summing.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Differentiate before summing.",
          misconceptions: [],
        },
      },
      {
        id: "f-density",
        prompt:
          "A mass current has divergence 6 kg/(m³ s) with no source. Find the local density time derivative.",
        answer: {
          kind: "numeric",
          value: -6,
          unit: "kg/(m³ s)",
          acceptedUnits: ["kg/(m³ s)"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "Conservation gives ∂ρ/∂t = −∇ · j = −6.",
        hint: "Outward imbalance depletes material.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Outward imbalance depletes material.",
          misconceptions: [],
        },
      },
    ],
  },
  retrievalProblems: [
    {
      id: "r-normal",
      prompt: "Flux through an oriented plane uses:",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "The tangential field alone",
          },
          {
            id: "1",
            label: "The field dotted with its unit normal",
          },
          {
            id: "2",
            label: "The field's magnitude regardless of direction",
          },
        ],
      },
      solution: "Only normal crossing contributes.",
      hint: "Picture flow parallel to the surface.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Picture flow parallel to the surface.",
        misconceptions: [],
      },
    },
    {
      id: "r-div",
      prompt:
        "For F = (x²,2y,−z) in dimensionless coordinates, find divergence at x = 3. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 7,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "2x + 2 − 1 = 7.",
      hint: "Differentiate matching components.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Differentiate matching components.",
        misconceptions: [],
      },
    },
    {
      id: "r-uniform",
      prompt: "A uniform vector field through a closed cube has net flux:",
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
            label: "Always positive",
          },
          {
            id: "2",
            label: "Equal to speed times total surface area",
          },
        ],
      },
      solution: "Opposite faces cancel.",
      hint: "Use outward normals.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Use outward normals.",
        misconceptions: [],
      },
    },
    {
      id: "r-theorem",
      prompt:
        "A constant divergence of 5/s fills volume 4 m³. Find outward velocity flux.",
      answer: {
        kind: "numeric",
        value: 20,
        unit: "m³/s",
        acceptedUnits: ["m³/s"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "Integrate 5/s over 4 m³.",
      hint: "Use the volume side.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Use the volume side.",
        misconceptions: [],
      },
    },
    {
      id: "r-source",
      prompt: "With no production, positive mass-current divergence means:",
      answer: {
        kind: "choice",
        value: "2",
        options: [
          {
            id: "0",
            label: "Density increases",
          },
          {
            id: "1",
            label: "Density is necessarily constant",
          },
          {
            id: "2",
            label: "Density decreases at that point",
          },
        ],
      },
      solution: "The continuity equation has ∂ρ/∂t = −∇ · j.",
      hint: "Keep the minus sign.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Keep the minus sign.",
        misconceptions: [],
      },
    },
    {
      id: "r-transfer",
      prompt:
        "Why must an interior field singularity be checked before applying the divergence theorem?",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "It changes the definition of area",
          },
          {
            id: "1",
            label:
              "The required smoothness may fail, so an inner boundary or singular contribution may be needed",
          },
          {
            id: "2",
            label: "Singularities never affect flux",
          },
        ],
      },
      solution:
        "The ordinary theorem assumes a well-defined sufficiently smooth field throughout the relevant region.",
      hint: "Check hypotheses before converting integrals.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Check hypotheses before converting integrals.",
        misconceptions: [],
      },
    },
  ],
  diagram: {
    title: "Opposite faces compare outflow with inflow",
    caption:
      "For Fₓ increasing with x, a stronger rightward field exits the right face than enters the left. The shaded geometry is a two-dimensional slice of the small box argument.",
    viewBox: [0, 0, 600, 320],
    elements: [
      {
        kind: "line",
        from: [200, 80],
        to: [400, 80],
        tone: "ink",
      },
      {
        kind: "line",
        from: [400, 80],
        to: [400, 250],
        tone: "ink",
      },
      {
        kind: "line",
        from: [400, 250],
        to: [200, 250],
        tone: "ink",
      },
      {
        kind: "line",
        from: [200, 250],
        to: [200, 80],
        tone: "ink",
      },
      {
        kind: "line",
        from: [120, 165],
        to: [200, 165],
        tone: "accent",
      },
      {
        kind: "line",
        from: [400, 165],
        to: [535, 165],
        tone: "accent",
      },
      {
        kind: "line",
        from: [190, 155],
        to: [200, 165],
        tone: "accent",
      },
      {
        kind: "line",
        from: [190, 175],
        to: [200, 165],
        tone: "accent",
      },
      {
        kind: "line",
        from: [525, 155],
        to: [535, 165],
        tone: "accent",
      },
      {
        kind: "line",
        from: [525, 175],
        to: [535, 165],
        tone: "accent",
      },
      {
        kind: "label",
        at: [65, 135],
        text: "inward: −Fₓ(left)",
      },
      {
        kind: "label",
        at: [365, 135],
        text: "outward: +Fₓ(right)",
      },
      {
        kind: "label",
        at: [250, 285],
        text: "separation Δx",
      },
    ],
  },
  sidebars: [
    {
      heading: "Velocity divergence and changing density",
      body: "Expanding $\\nabla\\cdot(\\rho\\mathbf v)$ gives $\\rho\\nabla\\cdot\\mathbf v+\\mathbf v\\cdot\\nabla\\rho$. Thus source-free conservation is $\\partial_t\\rho+\\mathbf v\\cdot\\nabla\\rho=-\\rho\\nabla\\cdot\\mathbf v$. The left side follows density along a moving fluid element. A divergence-free velocity preserves that carried density, even when spatial variations pass a fixed observer.",
    },
  ],
  sources: [
    {
      title: "MIT OpenCourseWare · Multivariable Calculus",
      url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/",
    },
  ],
};
export default chapter;
