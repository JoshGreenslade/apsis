import type { Chapter } from "../chapter";
const chapter: Chapter = {
  "id": "green-functions",
  "intuition": {
    "body": "Imagine a warm object whose excess temperature above its surroundings is x(t). Assume a linear cooling law and a heater whose input has already been divided by the object's heat capacity. The model is dx/dt + ax = f(t), with a positive cooling rate a. Here x has units of temperature and f has units of temperature per time. A momentary burst of heat raises x, after which cooling erases the disturbance exponentially. A complicated heater schedule can be imagined as many short bursts. The question is whether we can add the separately cooled contributions and recover the complete response.\n\nThere are two different ideas inside that picture. First, the equation is linear: doubling a forcing doubles its zero-initial-state response, and adding forcings adds responses. Second, its coefficients are constant in time: the response to a burst tomorrow has the same shape as a burst today, simply shifted. Linearity permits superposition; time translation permits a single response curve indexed by elapsed time. Neither property should be assumed merely because an equation contains derivatives.\n\nWe will first keep the bursts finite, so that their meaning is ordinary integration. Only then will we introduce an ideal impulse, the delta distribution. This order matters because a delta is not a physically infinite heater reading at one instant. It describes a limiting action on integrals. The construction will also explain a distinction that becomes crucial for fields: knowing a differential equation is not enough to know its Green function. We must specify what happens at the initial time or at the spatial boundaries.",
    "thoughtExperiments": [
      "Two equal heat pulses occur one cooling time apart. Immediately after the second, should the total excess equal twice the first pulse's initial excess?",
      "Would the same spatial source produce the same temperature profile in a rod with insulated ends and a rod with ends held cold?"
    ]
  },
  "theory": [
    {
      "heading": "1. Add the histories of small pulses",
      "body": "Set an initial time t₀ and first require $x(t_0)=0$. A small input acting over a duration $\\Delta s$ near time s contributes approximately $f(s)\\Delta s$ to the temperature. Once that interval is over, this contribution solves the homogeneous cooling equation. At a later time t it therefore contributes $e^{-a(t-s)}f(s)\\Delta s$. Earlier inputs receive a smaller weight because they have had more time to decay.\n\nPartition the forcing history into short intervals and add these contributions. Passing from a Riemann sum to its integral gives\n$$x(t)=\\int_{t_0}^{t}e^{-a(t-s)}f(s)\\,ds.$$\nThe variable s names the input time; t names the time at which we inspect the answer. Keeping their jobs separate prevents a common mistake: the exponential depends on elapsed time t−s, not on s alone. The expression has the correct units because f times ds is a temperature and the exponential is dimensionless.\n\nWe can verify rather than merely trust the pulse picture. Differentiating an integral with a moving upper endpoint supplies the new input $f(t)$, while differentiating its exponential kernel supplies $-ax(t)$. Hence $\\dot x=f-ax$, exactly the assumed law. At t=t₀ the integration interval has zero length, so the initial condition also holds. For a nonzero initial excess x₀, add the independent homogeneous contribution $x_0e^{-a(t-t_0)}$. The integral alone is not the full solution in that case.\n\nThis construction is useful even when f has corners or switches: the integral still accounts for each interval of heating. If the cooling rate were itself a function a(t), linear superposition would survive, but the response weight would be $\\exp[-\\int_s^t a(u)\\,du]$. It would depend on the two times separately, not just their difference. Thus convolution is a particularly convenient consequence of translation invariance, not another name for every linear response."
    },
    {
      "heading": "2. An impulse is defined by what its integral does",
      "body": "Take a rectangular pulse of width ε and height J/ε. Its area is J for every positive ε. During a sufficiently short pulse, finite cooling has little time to act, so the net temperature jump approaches J. The pulse height grows without bound as the width shrinks, but its integrated action remains finite. This limiting picture motivates the notation $J\\delta(t-s)$.\n\nThe delta distribution is specified by the sampling rule\n$$\\int_{-\\infty}^{\\infty}\\delta(t-s)\\phi(t)\\,dt=\\phi(s)$$\nfor smooth test functions φ of suitable support. This is a statement about an operation on functions inside integrals. It does not assign an ordinary real value to δ at t=s. Its units are inverse time in this example, since its integral is dimensionless. In a spatial problem the units instead match the inverse spatial measure.\n\nDefine the causal impulse response\n$$G(t-s)=H(t-s)e^{-a(t-s)},$$\nwhere H is zero for negative arguments and one for positive arguments. Its value exactly at zero is immaterial for the ordinary integrals used here. Away from t=s, G solves the homogeneous equation. Across t=s it jumps by one. Integrating the equation across a shrinking interval around s shows that the derivative contributes that jump, while the integral of aG tends to zero. In this distributional sense,\n$$(\\partial_t+a)G(t-s)=\\delta(t-s).$$\n\nThe jump is the important information. Forgetting it would make us incorrectly conclude that applying the operator gives zero everywhere. Conversely, imagining that the delta has an ordinary infinite value encourages meaningless arithmetic. We will use deltas under integration and under linear differentiation, where the rules have precise meanings. Multiplying two deltas is not a rule supplied by this construction.\n\nAn impulse idealizes a short input relative to the response time 1/a. If an actual heater acts for a duration comparable with that time, cooling during the pulse is appreciable and the finite forcing profile must be integrated. The idealization is then a model choice whose accuracy can be checked, not an excuse to discard the pulse duration automatically."
    },
    {
      "heading": "3. Convolution remembers the operator and its conditions",
      "body": "If we extend f by zero before the initial time, the driven response can be written\n$$x(t)=(G*f)(t)=\\int_{-\\infty}^{\\infty}G(t-s)f(s)\\,ds.$$\nThe star here means convolution, a weighted overlap over all possible source times. It is different from ordinary multiplication G(t)f(t). Although the displayed bounds include future s, the causal G vanishes there. The earlier finite-bound expression and this compact notation describe the same response.\n\nA Green function is more generally a kernel that inverts a linear differential operator with specified conditions. For an operator L acting on position x, its defining statement is $L_xG(x,s)=\\delta(x-s)$ together with the boundary conditions in the x variable. A source f(s) then produces an integral of G(x,s)f(s). In a bounded rod, the endpoints select which spatial patterns can occur. The kernel usually depends separately on the observation position x and source position s, because shifting a source toward an endpoint changes its relationship to that endpoint.\n\nWhy do the conditions belong to the definition? If h solves Lh=0, then adding h to one response leaves its differential equation unchanged. A condition at an endpoint or initial time removes this freedom when the problem is well posed. In the cooling example, a multiple of e^(−at) could be added to a formal response unless the prescribed initial state or causality rule excluded it. A claimed inverse that ignores these choices is incomplete.\n\nThere can also be problems for which an inverse does not exist for every source, or is not unique. For instance, steady diffusion with insulated ends permits an arbitrary additive constant, and a nonzero total steady heat source cannot be balanced without somewhere for heat to leave. Those facts are already visible from conservation and the homogeneous solutions. We do not need a general existence theorem here to recognize that “divide by the differential operator” can conceal physical constraints.\n\nGreen functions connect the mode description of a field with its response to localized input. Modes assemble a solution from spatial patterns; a kernel assembles it from source locations. Both exploit linearity, but they organize the information differently. In the final rod investigation we will return to a bounded-domain mode kernel and check its conditions directly."
    }
  ],
  "teaching": {
    "question": "Can one short pulse teach us how a linear system responds to an entire history of forcing?",
    "why": "A response function lets us solve a family of forced problems once the operator and its conditions have been fixed.",
    "outcomes": [
      "Build a causal response by adding delayed pulses.",
      "Interpret the delta through integration, not an infinite point value.",
      "Explain why initial and boundary conditions are part of a Green function."
    ],
    "checkpoints": [
      {
        "bridge": "Add the histories of small pulses",
        "meaning": "The weight records how much of each past input survives at the observation time.",
        "question": "For constant input f₀ starting from zero, what limits the eventual temperature?",
        "answer": "Integrating gives x=f₀(1−e^(−a(t−t₀)))/a. Cooling balances heating at f₀/a.",
        "further": [
          {
            "question": "Why does a pulse at s>t not appear?",
            "answer": "The causal initial-value problem allows only past input to affect x(t). The upper integration bound enforces this."
          },
          {
            "question": "How do you include a nonzero initial temperature?",
            "answer": "Add x₀e^(−a(t−t₀)); linearity lets the freely decaying initial state and the driven state coexist."
          },
          {
            "question": "Does a time-dependent cooling rate destroy linearity?",
            "answer": "No. It destroys the simple dependence on t−s, but the equation remains linear in x and f."
          }
        ]
      },
      {
        "bridge": "An impulse is defined by what its integral does",
        "meaning": "The delta records a finite integrated input concentrated at one location or time.",
        "question": "What fixes the unit jump of the causal Green function?",
        "answer": "Integrating its defining equation across the impulse makes the derivative integral equal the jump; the delta integral is one.",
        "further": [
          {
            "question": "What units does δ(t−s) have?",
            "answer": "Inverse time, because its time integral is the dimensionless number one."
          },
          {
            "question": "Can δ(0) be used as an ordinary number?",
            "answer": "No. The definition specifies integrated action, not pointwise arithmetic."
          },
          {
            "question": "When is a finite pulse well approximated by an impulse?",
            "answer": "When its duration is short compared with response times and only its integrated strength matters at the desired accuracy."
          }
        ]
      },
      {
        "bridge": "Convolution remembers the operator and its conditions",
        "meaning": "An inverse response is tied to both a differential law and the conditions selecting its solution.",
        "question": "Why can two Green functions for the same differential expression differ?",
        "answer": "They may impose different boundary or initial conditions, so different homogeneous contributions and response patterns are selected.",
        "further": [
          {
            "question": "Is every Green-function integral a convolution in x−s?",
            "answer": "No. That requires translation invariance; fixed boundaries usually break it."
          },
          {
            "question": "Why might a steady insulated rod have no solution with a net positive heat source?",
            "answer": "There is no steady outward heat loss to balance the integrated input. Conservation fails for such data."
          },
          {
            "question": "What should be checked after constructing a response?",
            "answer": "Apply the differential law, inspect initial and boundary conditions, and verify units and causal support where appropriate."
          }
        ]
      }
    ],
    "takeaway": "A linear response is an integral of elementary responses; its kernel includes the conditions that make the solution meaningful.",
    "nextConnection": "We next treat integrals as weighted averages over possible outcomes, introducing probability and uncertainty."
  },
  "diagnostics": [
    {
      "id": "d-boundary",
      "prompt": "Why do fixed endpoints matter when solving a rod PDE?",
      "answer": {
        "kind": "choice",
        "value": "0",
        "options": [
          {
            "id": "0",
            "label": "They select allowed spatial modes"
          },
          {
            "id": "1",
            "label": "They change every linear PDE into an ODE"
          },
          {
            "id": "2",
            "label": "They determine the initial temperature automatically"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "The spatial eigenfunctions must satisfy the endpoint conditions; initial amplitudes still require initial data.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      },
      "prerequisiteId": "pdes"
    },
    {
      "id": "d-decay",
      "prompt": "If dx/dt=−2x and x(0)=3, find x at t=(ln 2)/2. Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 1.5,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "hint": "Identify the relation before substituting.",
      "solution": "x=3e^(−2t), so the exponential equals one half.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      },
      "prerequisiteId": "first-order-odes"
    }
  ],
  "workedExample": {
    "title": "A heater switched on for a finite interval",
    "problem": "Solve dx/dt+2x=4 for 0<t<1 and dx/dt+2x=0 for t>1, with x(0)=0. Time is in seconds, x in kelvin and input in K/s.",
    "steps": [
      {
        "title": "Choose the causal response",
        "body": "The rate is a=2 s⁻¹, so G(t−s)=e^(−2(t−s)) for s<t and zero otherwise.",
        "reason": "Only heat supplied before observation can contribute.",
        "trap": "Using e^(−2s) loses the delay t−s."
      },
      {
        "title": "Integrate while heating",
        "body": "For 0<t≤1, $x(t)=4\\int_0^t e^{-2(t-s)}ds=2(1-e^{-2t})$ K.",
        "reason": "Each input slice cools for the remaining time.",
        "trap": "The factor 1/2 from integrating the exponential is essential."
      },
      {
        "title": "Carry the switch value forward",
        "body": "At t=1, x=2(1−e⁻²)≈1.729 K. For t>1, x(t)=2(1−e⁻²)e^(−2(t−1)) K.",
        "reason": "The temperature is continuous when a finite heater turns off.",
        "trap": "Turning off the heater does not reset the stored excess to zero."
      },
      {
        "title": "Check the new rate",
        "body": "At t=2, x≈0.234 K. After switch-off dx/dt=−2x, so the temperature decays toward zero.",
        "reason": "The equation and limiting behavior independently check the expression.",
        "trap": "The equilibrium 2 K applies only while the constant heater remains on."
      }
    ]
  },
  "fadedExercise": {
    "prompt": "A different object obeys dx/dt+x=3 from t=0 to t=ln 2, then cools freely. Initially x=1 K; time is in seconds.",
    "supplied": [
      {
        "heading": "Starting information",
        "body": "The full response while heating is x(t)=x(0)e^(−t)+3(1−e^(−t)). At switch-off e^(−t)=1/2. One additional interval ln 2 halves any freely decaying excess."
      }
    ],
    "steps": [
      {
        "id": "g-free",
        "prompt": "At t=ln 2, how much remains from the initial 1 K?",
        "answer": {
          "kind": "numeric",
          "value": 0.5,
          "unit": "K",
          "acceptedUnits": [
            "K"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "hint": "Identify the relation before substituting.",
        "solution": "The initial contribution is 1×1/2=0.5 K.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Identify the relation before substituting.",
          "misconceptions": []
        }
      },
      {
        "id": "g-driven",
        "prompt": "At switch-off, how large is the driven contribution 3(1−1/2)?",
        "answer": {
          "kind": "numeric",
          "value": 1.5,
          "unit": "K",
          "acceptedUnits": [
            "K"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "hint": "Identify the relation before substituting.",
        "solution": "The heater contributes 1.5 K.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Identify the relation before substituting.",
          "misconceptions": []
        }
      },
      {
        "id": "g-total",
        "prompt": "Find the total switch-off excess; the two contributions are 0.5 K and 1.5 K.",
        "answer": {
          "kind": "numeric",
          "value": 2,
          "unit": "K",
          "acceptedUnits": [
            "K"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "hint": "Identify the relation before substituting.",
        "solution": "Superposition gives 2 K.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Identify the relation before substituting.",
          "misconceptions": []
        }
      },
      {
        "id": "g-later",
        "prompt": "Find x at t=2 ln 2, given a switch-off excess of 2 K at t=ln 2.",
        "answer": {
          "kind": "numeric",
          "value": 1,
          "unit": "K",
          "acceptedUnits": [
            "K"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "hint": "Identify the relation before substituting.",
        "solution": "Free cooling for ln 2 multiplies 2 K by one half.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Identify the relation before substituting.",
          "misconceptions": []
        }
      }
    ]
  },
  "retrievalProblems": [
    {
      "id": "r-linear",
      "prompt": "Which property permits addition of separate forced responses with zero initial state?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "Periodicity"
          },
          {
            "id": "1",
            "label": "Linearity"
          },
          {
            "id": "2",
            "label": "An infinite input"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "Linearity makes the operator of a sum equal the sum of the operators.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      }
    },
    {
      "id": "r-area",
      "prompt": "A rectangular pulse has height 12 K/s and duration 0.05 s. Find its integrated input.",
      "answer": {
        "kind": "numeric",
        "value": 0.6,
        "unit": "K",
        "acceptedUnits": [
          "K"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "hint": "Identify the relation before substituting.",
      "solution": "Area equals height times duration: 12×0.05=0.6 K.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      }
    },
    {
      "id": "r-sample",
      "prompt": "Evaluate ∫δ(t−2)(t²+1)dt over the whole real line. Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 5,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "hint": "Identify the relation before substituting.",
      "solution": "The delta samples the smooth function at t=2, giving 4+1=5.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      }
    },
    {
      "id": "r-product",
      "prompt": "What does G*f mean?",
      "answer": {
        "kind": "choice",
        "value": "2",
        "options": [
          {
            "id": "0",
            "label": "Pointwise product"
          },
          {
            "id": "1",
            "label": "Derivative of the forcing"
          },
          {
            "id": "2",
            "label": "Integral of delayed weighted input"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "Convolution integrates G(t−s)f(s) over source time s.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      }
    },
    {
      "id": "r-steady",
      "prompt": "For dx/dt+4x=8 with constant input, find the steady x in kelvin.",
      "answer": {
        "kind": "numeric",
        "value": 2,
        "unit": "K",
        "acceptedUnits": [
          "K"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "hint": "Identify the relation before substituting.",
      "solution": "At steady state dx/dt=0, so 4x=8.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      }
    },
    {
      "id": "r-transfer",
      "prompt": "A rod's cold endpoints are replaced with insulated ends. Can its old Green function automatically be reused?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "Yes, linearity fixes it uniquely"
          },
          {
            "id": "1",
            "label": "No, the boundary conditions are part of the kernel"
          },
          {
            "id": "2",
            "label": "Yes, because delta inputs ignore endpoints"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "Changing the conditions changes the response and may change solvability.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      }
    }
  ],
  "diagram": {
    "title": "The same pulse seen after two different delays",
    "caption": "For cooling rate 1 s⁻¹, equal unit jumps at t=0 and t=1 each decay exponentially. The plotted samples show their sum, including the second unit jump. Time increases horizontally; excess temperature vertically.",
    "viewBox": [
      0,
      0,
      600,
      320
    ],
    "elements": [
      {
        "kind": "line",
        "from": [
          60,
          270
        ],
        "to": [
          550,
          270
        ],
        "tone": "muted"
      },
      {
        "kind": "line",
        "from": [
          60,
          270
        ],
        "to": [
          60,
          30
        ],
        "tone": "muted"
      },
      {
        "kind": "line",
        "from": [
          60,
          270
        ],
        "to": [
          60,
          130
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          60,
          130
        ],
        "to": [
          130,
          185
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          130,
          185
        ],
        "to": [
          200,
          218.5
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          200,
          218.5
        ],
        "to": [
          200,
          78.5
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          200,
          78.5
        ],
        "to": [
          270,
          153.8
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          270,
          153.8
        ],
        "to": [
          340,
          199.6
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          340,
          199.6
        ],
        "to": [
          410,
          227.3
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          410,
          227.3
        ],
        "to": [
          480,
          244.1
        ],
        "tone": "accent"
      },
      {
        "kind": "label",
        "at": [
          65,
          300
        ],
        "text": "0"
      },
      {
        "kind": "label",
        "at": [
          195,
          300
        ],
        "text": "1"
      },
      {
        "kind": "label",
        "at": [
          335,
          300
        ],
        "text": "2"
      },
      {
        "kind": "label",
        "at": [
          475,
          300
        ],
        "text": "3 s"
      },
      {
        "kind": "label",
        "at": [
          270,
          55
        ],
        "text": "second pulse adds 1 K"
      }
    ]
  },
  "sidebars": [
    {
      "heading": "Optional: verifying the distributional derivative",
      "body": "For a compactly supported smooth φ, integration by parts on (0,∞) gives $-\\int_0^\\infty e^{-at}\\phi'(t)dt=\\phi(0)-a\\int_0^\\infty e^{-at}\\phi(t)dt$. This says $G'=\\delta-aG$ as distributions. The boundary value supplies the impulse; the ordinary derivative away from zero alone would miss it."
    }
  ],
  "sources": [
    {
      "title": "MIT OpenCourseWare · Differential Equations",
      "url": "https://www.ocw.mit.edu/courses/18-03-differential-equations-spring-2010/pages/lecture-notes/"
    },
    {
      "title": "Cambridge · Mathematical Methods II",
      "url": "https://www.damtp.cam.ac.uk/user/gio10/nst_notes.pdf"
    }
  ]
};
export default chapter;

