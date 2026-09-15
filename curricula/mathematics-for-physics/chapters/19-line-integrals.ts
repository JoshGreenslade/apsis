import type { Chapter } from "../chapter";
const chapter: Chapter = {
  theoreticalMinimum: { coreIdea: "A line integral accumulates a field along a path, and only conservative structure makes that accumulation depend solely on endpoints. The path is part of the question until a potential or a suitable domain argument proves that it no longer matters.", widerConnection: "This is the bridge from local force laws to potential energy, circulation, and global conservation statements. It also teaches the course's recurring distinction between a local differential test and a global conclusion about all possible paths." },
  id: "line-integrals",
  intuition: {
    body: "Push a trolley from one corner of the workshop to another. If the force changes from place to place, multiplying one force value by the straight-line distance will not generally tell you the work. The trolley may follow a curved route, and at each point only the part of the force along its current motion contributes.\n\nWe can still build the total from small pieces. Break the path into short displacements, dot the local force with each displacement, and add. Taking a limit produces a line integral. The path is part of the input: two routes between the same endpoints may yield different totals.\n\nSome forces have a remarkable simplification. Their work depends only on where the motion starts and finishes, so no detailed record of the route is needed. A potential function stores that endpoint information. The mathematical reason will be the chain rule along a path, not an assumption that every familiar-looking force has a potential.\n\nWe will calculate a deliberately path-dependent field and compare it with a gradient field. The physical law assumed throughout is that incremental work is force dotted with displacement. No equation of motion is required to evaluate work along a specified route; whether an unconstrained trolley would actually follow it is a separate question.",
    thoughtExperiments: [
      "Does retracing the same route reverse the work of a position-dependent force?",
      "If two routes share endpoints, what additional property would make their work equal?",
    ],
  },
  theory: [
    {
      heading: "1. Describe the route before summing the work",
      body: "Suppose the trolley follows a smooth curve $\\mathbf r(t)$ from $t=a$ to $t=b$. The parameter $t$ labels positions in order; it can be time but need not be. The derivative $\\mathbf r'(t)$ points along the curve and describes how quickly the chosen label moves through it. Over a short interval $\\Delta t$, the displacement is approximately $\\mathbf r'(t)\\Delta t$.\n\nAssume a continuous, position-dependent force field $\\mathbf F(\\mathbf r)$. A field assigns a vector to each point in its domain. Adding the local work contributions and taking a limit gives\n$$W=\\int_C\\mathbf F\\cdot d\\mathbf r\n=\\int_a^b\\mathbf F(\\mathbf r(t))\\cdot\\mathbf r'(t)\\,dt.$$\nThe symbol $C$ names the oriented curve: both its geometry and its direction of traversal matter. For a path made of several smooth pieces, evaluate each piece and add its contribution.\n\nThere are two substitutions here. First evaluate the field at the path position, because the force changes as the trolley moves. Then dot that force with the path derivative, because only the tangential displacement contributes to work. Forgetting either step changes the problem. In coordinates the integrand is $F_x\\,dx/dt+F_y\\,dy/dt$ in the plane.\n\nA smooth reparameterization that traverses the same route once in the same direction leaves the answer unchanged. The change in path derivative is cancelled by the change in integration measure, exactly as in one-variable substitution. Traversing the route backwards reverses $d\\mathbf r$ and therefore the sign of this vector line integral. Traversing it twice doubles the integral.\n\nDo not confuse this with a scalar line integral such as wire mass $\\int_C\\rho\\,ds$. There the arc-length element is $ds=|\\mathbf r'(t)|dt$, so reversing the route does not make a mass negative. Work uses an oriented displacement; mass uses a positive length. Both are integrals along curves, but they accumulate different quantities.\n\nFor a concrete reparameterization, a straight path from $(0,0)$ to $(1,1)$ can be written as $\\mathbf r(t)=(t,t)$ for $0\\leq t\\leq1$, or as $\\tilde{\\mathbf r}(s)=(s/2,s/2)$ for $0\\leq s\\leq2$, in the same length units. The second derivative vector is half the first tangent vector, but the parameter interval is twice as long. Substitution $t=s/2$ makes the two integrals identical, including any continuous position dependence of the field.\n\nThat cancellation should not be mistaken for speed independence of every real force. A drag force can depend on velocity as well as position, in which case traversing the same geometric curve at a different physical speed changes the force itself. Our position-only line integral compares a fixed field along a route. If the physical law includes velocity, time or history, those dependencies must be supplied before the work can be evaluated. The path geometry remains relevant, but it no longer contains all the experimental information.",
    },
    {
      heading: "2. Let two routes test path dependence",
      body: "Put a spatially varying force on the workshop floor: $\\mathbf F=(\\kappa y,0)$, where $x,y$ are measured in metres and $\\kappa$ has units N/m. The force points horizontally and grows with height. Ask for work from $(0,0)$ to $(1,1)$ m, taking $\\kappa=1$ N/m. Along the diagonal $\\mathbf r(t)=(t,t)$ m for dimensionless $0\\leq t\\leq1$, the dot product is $t$ joules per unit parameter, so the total is $1/2$ J.\n\nNow travel horizontally along the bottom edge and then vertically up the right edge. On the bottom edge $y=0$, so the force vanishes. On the vertical edge the force is horizontal and the displacement vertical, giving zero dot product. This route produces zero work despite sharing both endpoints with the diagonal. The field is therefore not path independent.\n\nA third route, upward first and then rightward along $y=1$ m, produces one joule: the vertical portion again contributes nothing, but the entire horizontal displacement occurs where the force is stronger. The difference between the routes is understandable from the field picture, not merely from three different antiderivatives.\n\nJoining one route to the reverse of another makes a closed loop. Its integral is the work difference between the two original routes. Thus path independence implies zero work around every closed loop in the domain. Conversely, if every such loop has zero integral and points can be connected by admissible paths, comparing a route with the reverse of another proves equal endpoint-to-endpoint integrals.\n\nPath independence is a statement about all routes in the domain, not a successful test of one convenient pair. One counterexample disproves it, but a few matching examples cannot establish it. Domain restrictions also matter because they determine which paths exist and which closed loops can be filled. Curl will later provide a local diagnostic, accompanied by an important qualification about holes.",
    },
    {
      heading: "3. Derive the endpoint shortcut from the chain rule",
      body: "Imagine recording a scalar height-like function $\\phi(x,y)$ across the floor. Its gradient points in the direction of fastest increase and records the local rate of change. Along the trolley path, the multivariable chain rule states\n$$\\frac{d}{dt}\\phi(\\mathbf r(t))=\\nabla\\phi(\\mathbf r(t))\\cdot\\mathbf r'(t).$$\nIf the vector field is $\\mathbf F=\\nabla\\phi$, the line-integral integrand is exactly this derivative. Integrating therefore yields\n$$\\int_C\\nabla\\phi\\cdot d\\mathbf r=\\phi(\\mathbf r(b))-\\phi(\\mathbf r(a)).$$\nThe route disappears because its contributions assemble into the total change of a single-valued scalar function.\n\nFor example, let $\\mathbf F=(2\\kappa x,2\\kappa y)$ with constant $\\kappa$ in N/m. A potential is $\\phi=\\kappa(x^2+y^2)$, measured in joules. From $(0,0)$ to $(1,1)$ m the work is $2\\kappa\\,\\mathrm m^2$, or $2$ J when $\\kappa=1$ N/m, whatever smooth route is used within the plane. Differentiating the proposed potential recovers both force components and checks the claim.\n\nTo discover a potential rather than guess it, integrate one component and leave an undetermined function of the other coordinate. From $\\partial\\phi/\\partial x=2\\kappa x$, write $\\phi=\\kappa x^2+g(y)$. The second component requires $g'(y)=2\\kappa y$, so $g(y)=\\kappa y^2+C$. The additive constant changes no gradient and no potential difference.\n\nPhysical potential energy uses the opposite sign convention: a conservative force is $\\mathbf F=-\\nabla U$. Consequently its work is $U_{\\rm start}-U_{\\rm end}=-\\Delta U$. A downhill gravitational motion gains positive work from gravity while losing potential energy. Calling both $\\phi$ and $U$ a potential without naming the sign would invite a systematic mistake.\n\nOn a path-connected domain, path independence also lets us construct a potential by defining $\\phi(\\mathbf r)$ as the integral from a fixed reference point to $\\mathbf r$. Independence makes this single-valued, and a short displacement in each coordinate direction shows that its derivative equals the corresponding field component, under continuity assumptions. This connects the global route property with the local gradient property.\n\nThe trolley problem now has a clear decision procedure: specify the path and integrate the local dot product, or establish a valid single-valued potential and use endpoints. The second method is a theorem with hypotheses, not a shortcut available simply because a problem mentions energy.",
    },
  ],
  teaching: {
    question: "When does the route matter to accumulated work?",
    why: "Line integrals connect local force measurements to path-dependent totals and reveal when energy differences replace a full calculation.",
    outcomes: [
      "Parameterize and evaluate work along a curve.",
      "Use two paths to disprove path independence.",
      "Derive the gradient endpoint theorem and keep the energy sign correct.",
    ],
    checkpoints: [
      {
        bridge: "Follow short oriented displacements.",
        meaning: "Work integrates the tangential contribution of the field.",
        question: "Why evaluate F at r(t)?",
        answer:
          "The force depends on the actual position along the chosen route.",
        further: [
          {
            question: "Why include r′(t)?",
            answer:
              "It converts parameter increments into oriented displacements.",
          },
          {
            question: "What happens on reversal?",
            answer:
              "The work changes sign for the same position-dependent field.",
          },
          {
            question: "Would a wire-mass integral change sign on reversal?",
            answer:
              "No. Its arc-length measure uses the magnitude of the tangent.",
          },
        ],
      },
      {
        bridge: "Compare routes through different force strengths.",
        meaning: "One unequal pair disproves path independence.",
        question: "Why is the bottom-then-up route's work zero for F = (κy,0)?",
        answer:
          "The force vanishes on the bottom, and is perpendicular to the upward motion.",
        further: [
          {
            question: "Why does up-then-right give positive work?",
            answer:
              "The rightward segment occurs at nonzero y, where the horizontal force is positive.",
          },
          {
            question: "What does joining one path to another reversed produce?",
            answer:
              "A closed loop whose integral equals the difference of the two path integrals.",
          },
          {
            question:
              "Do two equal path integrals prove a field is conservative?",
            answer:
              "No. The property must hold for every admissible pair of paths.",
          },
        ],
      },
      {
        bridge: "Recognize a total derivative along the path.",
        meaning: "A gradient integral is an endpoint difference.",
        question: "Which rule turns the gradient integrand into a derivative?",
        answer: "The multivariable chain rule for φ(r(t)).",
        further: [
          {
            question: "Why is an additive constant harmless?",
            answer: "It disappears from gradients and endpoint differences.",
          },
          {
            question: "If F = −∇U, is work ΔU or −ΔU?",
            answer:
              "It is −ΔU, so positive conservative work lowers potential energy.",
          },
          {
            question: "Why must a potential be single-valued?",
            answer:
              "Otherwise its value at an endpoint could depend on the route, defeating the endpoint theorem.",
          },
        ],
      },
    ],
    takeaway:
      "A path integral accumulates local oriented contributions; endpoint evaluation requires a valid potential.",
    nextConnection:
      "Flux will measure how much of a field crosses a surface, leading to divergence and conservation.",
  },
  diagnostics: [
    {
      id: "d-integral",
      prompt: "Evaluate the integral of 2t from 0 to 1. Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 1,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "The endpoint difference of t² is 1.",
      hint: "Track the limits.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Track the limits.",
        misconceptions: [],
      },
      prerequisiteId: "multiple-integrals",
    },
    {
      id: "d-dot",
      prompt: "Find (2,3) · (0,4). Enter unit 1.",
      answer: {
        kind: "numeric",
        value: 12,
        unit: "1",
        acceptedUnits: ["1"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "2 × 0 + 3 × 4 = 12.",
      hint: "Only the parallel components contribute.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Only the parallel components contribute.",
        misconceptions: [],
      },
      prerequisiteId: "vectors",
    },
  ],
  workedExample: {
    title: "Work along a curved route",
    problem:
      "Let F = (κy,0), κ = 1 N/m, and r(t) = (t,t²) m for dimensionless t from 0 to 2.",
    steps: [
      {
        title: "Differentiate the route",
        body: "r′(t) = (1,2t) m.",
        reason: "Parameter increments must be converted to displacements.",
        trap: "The parameter is dimensionless here, not seconds.",
      },
      {
        title: "Sample the field",
        body: "F(r(t)) = (t²,0) N.",
        reason: "Substitute the path's y-coordinate into the field.",
        trap: "Using y = t would change the path.",
      },
      {
        title: "Form and integrate work",
        body: "F · r′ = t² J, so W = ∫₀² t² dt = 8/3 J.",
        reason:
          "The vertical tangent contribution is multiplied by zero force.",
        trap: "Do not replace the dot product with a product of magnitudes.",
      },
      {
        title: "Compare another route",
        body: "The same endpoints (0,0) and (2,4) m give zero work along bottom-then-up.",
        reason: "An explicit comparison establishes path dependence.",
        trap: "The endpoint distance alone does not determine work.",
      },
    ],
  },
  fadedExercise: {
    prompt: "For F = (κy,0), κ = 2 N/m, use r(t) = (t,3t) m for 0 ≤ t ≤ 1.",
    supplied: [
      {
        heading: "Route data",
        body: "t is dimensionless, r′ = (1,3) m and F(r(t)) = (6t,0) N. Hence F · r′ = 6t J.",
      },
    ],
    steps: [
      {
        id: "f-force",
        prompt: "At t = 0.5, what is the horizontal force in newtons?",
        answer: {
          kind: "numeric",
          value: 3,
          unit: "N",
          acceptedUnits: ["N"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "6 × 0.5 = 3 N.",
        hint: "Use the supplied field along the route.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Use the supplied field along the route.",
          misconceptions: [],
        },
      },
      {
        id: "f-work",
        prompt: "Integrate 6t from 0 to 1 to find work in joules.",
        answer: {
          kind: "numeric",
          value: 3,
          unit: "J",
          acceptedUnits: ["J"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "The antiderivative is 3t², giving 3 J.",
        hint: "Use the supplied dot product.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "Use the supplied dot product.",
          misconceptions: [],
        },
      },
      {
        id: "f-reverse",
        prompt:
          "The forward work is 3 J. What is the work along the reversed route?",
        answer: {
          kind: "numeric",
          value: -3,
          unit: "J",
          acceptedUnits: ["J"],
          absoluteTolerance: 0.001,
          relativeTolerance: 0.002,
        },
        solution: "Reversing displacement negates the integral.",
        hint: "The field remains position-dependent and unchanged.",
        rubric: {
          defaultCategory: "algebraic",
          explanation: "The field remains position-dependent and unchanged.",
          misconceptions: [],
        },
      },
      {
        id: "f-transfer",
        prompt:
          "From the same start to finish, bottom-then-up gives zero work. What follows?",
        answer: {
          kind: "choice",
          value: "2",
          options: [
            {
              id: "0",
              label: "The field is path independent",
            },
            {
              id: "1",
              label: "The diagonal result must be wrong",
            },
            {
              id: "2",
              label:
                "No single-valued global potential gradient can equal this field",
            },
          ],
        },
        solution:
          "Different endpoint-to-endpoint integrals contradict the gradient endpoint theorem.",
        hint: "Compare the two totals.",
        rubric: {
          defaultCategory: "conceptual",
          explanation: "Compare the two totals.",
          misconceptions: [],
        },
      },
    ],
  },
  retrievalProblems: [
    {
      id: "r-integrand",
      prompt: "For vector work along r(t), which is the integrand?",
      answer: {
        kind: "choice",
        value: "0",
        options: [
          {
            id: "0",
            label: "F(r(t)) · r′(t)",
          },
          {
            id: "1",
            label: "|F| alone",
          },
          {
            id: "2",
            label: "F(r(t)) · r(t)",
          },
        ],
      },
      solution: "Work uses displacement increments, supplied by r′dt.",
      hint: "Differentiate the path.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Differentiate the path.",
        misconceptions: [],
      },
    },
    {
      id: "r-constant",
      prompt:
        "A constant force (3,−1) N acts through displacement (2,4) m. Find work.",
      answer: {
        kind: "numeric",
        value: 2,
        unit: "J",
        acceptedUnits: ["J"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "3 × 2 − 1 × 4 = 2 J.",
      hint: "Use a dot product.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Use a dot product.",
        misconceptions: [],
      },
    },
    {
      id: "r-speed",
      prompt:
        "Reparameterizing the same oriented path once changes its line integral how?",
      answer: {
        kind: "choice",
        value: "1",
        options: [
          {
            id: "0",
            label: "It always doubles",
          },
          {
            id: "1",
            label: "It stays the same",
          },
          {
            id: "2",
            label: "It becomes zero",
          },
        ],
      },
      solution: "The derivative and parameter measure transform together.",
      hint: "Apply substitution.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Apply substitution.",
        misconceptions: [],
      },
    },
    {
      id: "r-potential",
      prompt: "For F = −∇U, U starts at 8 J and ends at 3 J. Find the work.",
      answer: {
        kind: "numeric",
        value: 5,
        unit: "J",
        acceptedUnits: ["J"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "W = 8 − 3 = 5 J.",
      hint: "Use minus the energy change.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Use minus the energy change.",
        misconceptions: [],
      },
    },
    {
      id: "r-loop",
      prompt:
        "A single-valued differentiable potential exists throughout a loop's domain. Its gradient has what closed-loop integral?",
      answer: {
        kind: "choice",
        value: "2",
        options: [
          {
            id: "0",
            label: "The enclosed area",
          },
          {
            id: "1",
            label: "An arbitrary constant",
          },
          {
            id: "2",
            label: "Zero",
          },
        ],
      },
      solution:
        "The start and end are the same point, so the potential difference vanishes.",
      hint: "Use the endpoint theorem.",
      rubric: {
        defaultCategory: "conceptual",
        explanation: "Use the endpoint theorem.",
        misconceptions: [],
      },
    },
    {
      id: "r-transfer",
      prompt:
        "For φ = κ(x² + y²), κ = 1 N/m and F = ∇φ, find work from (1,0) m to (2,1) m.",
      answer: {
        kind: "numeric",
        value: 4,
        unit: "J",
        acceptedUnits: ["J"],
        absoluteTolerance: 0.001,
        relativeTolerance: 0.002,
      },
      solution: "φ changes from 1 J to 5 J, giving 4 J.",
      hint: "Use the stated positive-gradient convention.",
      rubric: {
        defaultCategory: "algebraic",
        explanation: "Use the stated positive-gradient convention.",
        misconceptions: [],
      },
    },
  ],
  diagram: {
    title: "Three routes, three work totals",
    caption:
      "For F = (y,0) in the stated SI scaling, the diagonal gives 1/2 J, bottom-then-up gives 0 J, and up-then-right gives 1 J between the same points.",
    viewBox: [0, 0, 600, 320],
    elements: [
      {
        kind: "line",
        from: [100, 250],
        to: [320, 250],
        tone: "muted",
      },
      {
        kind: "line",
        from: [320, 250],
        to: [320, 30],
        tone: "muted",
      },
      {
        kind: "line",
        from: [100, 250],
        to: [100, 30],
        tone: "ink",
      },
      {
        kind: "line",
        from: [100, 30],
        to: [320, 30],
        tone: "ink",
      },
      {
        kind: "line",
        from: [100, 250],
        to: [320, 30],
        tone: "accent",
      },
      {
        kind: "label",
        at: [70, 285],
        text: "(0,0)",
      },
      {
        kind: "label",
        at: [335, 35],
        text: "(1,1)",
      },
      {
        kind: "label",
        at: [335, 160],
        text: "0 J route",
      },
      {
        kind: "label",
        at: [150, 20],
        text: "1 J route",
      },
      {
        kind: "label",
        at: [110, 130],
        text: "1/2 J",
      },
    ],
  },
  sidebars: [
    {
      heading: "Constructing a potential locally",
      body: "If route independence is established, fix a reference point and define φ by the integral to a variable endpoint. Extending a route by a short horizontal segment changes φ by FₓΔx plus an error smaller than Δx, so ∂φ/∂x = Fₓ. The same argument works in each direction. This explains the converse theorem under continuity and appropriate path-connected domain assumptions.",
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
