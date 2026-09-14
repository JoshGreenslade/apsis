import type { Chapter } from "../chapter";
const chapter: Chapter = {
  "id": "variation",
  "intuition": {
    "body": "A moving particle can travel between two fixed positions in many imagined ways. One trial path accelerates early, another late; a third wiggles unnecessarily. Instead of choosing a single number to optimize, we can assign a number to every whole path and ask how that number changes when the path is slightly reshaped. The input is now a function of time. The output is still a number.\n\nFor a free particle with mass m, consider the time integral of m times speed squared divided by two. Paths with rapid motion contribute more strongly than paths with slow motion. If the endpoints and duration are fixed, a uniform-speed path looks special. We will calculate exactly which local condition makes its first-order change vanish under every small endpoint-preserving reshaping.\n\nFor mechanics, the quantity we vary is the action, built from a Lagrangian. Choosing the usual Lagrangian as kinetic energy minus potential energy is physical input for the class of systems studied here. Mathematics then turns that choice into a differential equation. It would be circular to claim that the mathematics alone selects the correct force law.\n\nYou already know integration by parts and the distinction between a stationary point and a minimum. Those two ideas will do most of the work. Integration by parts will move a derivative off the arbitrary reshaping, while the endpoint conditions will explain which boundary contribution vanishes. We will keep each piece visible so that the final equation is something you can reconstruct, not an isolated rule to memorize.",
    "thoughtExperiments": [
      "If a path variation must vanish at the starting and finishing times, can its slope still change there?",
      "Does an integral being stationary under small changes guarantee it is smaller than for every nearby path?"
    ]
  },
  "theory": [
    {
      "heading": "1. Give a whole path a nearby neighbor",
      "body": "A function such as f(x)=x² accepts a number x. A **functional** such as\n$$S[q]=\\int_{t_0}^{t_1}L(q(t),\\dot q(t),t)\\,dt$$\naccepts a path q(t) and returns a number. The square brackets emphasize this distinction. Here q is a generalized coordinate, such as a particle's position or a pendulum's angle; a dot denotes a time derivative. The function L of coordinate, velocity and time is called the Lagrangian. We assume enough smoothness for the derivatives and integrations below.\n\nTo compare nearby paths, choose an arbitrary smooth shape η(t) and form $q_\\varepsilon(t)=q(t)+\\varepsilon\\eta(t)$, where ε is a small parameter. The shape η tells us where and in which direction to nudge the path; ε controls the size of the nudge. If the endpoints are fixed, η(t₀)=η(t₁)=0. The derivative of η need not vanish there. Endpoint position and endpoint velocity are distinct restrictions.\n\nThe **first variation** is the ordinary derivative of S[qε] with respect to ε at zero. The multivariable chain rule gives\n$$\\left.\\frac{dS[q_\\varepsilon]}{d\\varepsilon}\\right|_{\\varepsilon=0}\n=\\int_{t_0}^{t_1}\\left(L_q\\eta+L_{\\dot q}\\dot\\eta\\right)dt.$$\nThe subscripts here mean partial derivatives of L, evaluated along the unperturbed path. Both q and its velocity change when the path is perturbed, which is why there are two terms.\n\nA stationary path makes this first variation zero for every allowed η. Testing only a constant nudge or one sinusoid would not be enough. An arbitrary trajectory can be perturbed in many independent regions; stationarity must survive all such localized tests. This is the path version of requiring every directional derivative to vanish at an unconstrained stationary point.\n\nThe notation does not imply that the particle physically tries all these paths. They are mathematical comparison objects used to express a law. In a boundary-value calculation we fix endpoint positions; in an initial-value prediction we later solve the resulting differential equation using initial position and velocity. These are different ways of specifying a problem and should not be confused."
    },
    {
      "heading": "2. Move the derivative and read the local equation",
      "body": "The first-variation formula mixes η and its derivative. Integration by parts puts both interior terms in terms of η:\n$$\\delta S=\\left[L_{\\dot q}\\eta\\right]_{t_0}^{t_1}\n+\\int_{t_0}^{t_1}\\left(L_q-\\frac{d}{dt}L_{\\dot q}\\right)\\eta\\,dt.$$\nThe displayed boundary term is not automatically zero. It vanishes here because fixed endpoints require η=0 at both ends. If the endpoints were allowed to move, the same term would have to be treated rather than discarded.\n\nWe are left with an integral of an unknown coefficient times every smooth endpoint-vanishing η. If the coefficient were positive in a small interior region, we could choose a nonnegative perturbation supported just there and make the integral positive. A negative region could be detected similarly. For a continuous coefficient, the only way the integral can vanish for every such test is for the coefficient to vanish throughout the interior. This is the useful intuition behind the fundamental lemma of the calculus of variations.\n\nThe resulting **Euler–Lagrange equation** is\n$$\\frac{d}{dt}\\frac{\\partial L}{\\partial\\dot q}-\\frac{\\partial L}{\\partial q}=0.$$\nThe outer derivative is a total time derivative along the path; the inner derivatives are partial derivatives treating q, q̇ and t as independent arguments of L. Mixing those operations can hide terms. If L contains q q̇², for example, its velocity derivative depends on q as well as q̇, and the total time derivative must differentiate both.\n\nFor a free particle choose $L=m\\dot q^2/2$ with positive constant mass. Then Lq=0 and Lq̇=mq̇, so the equation becomes mq̈=0. The stationary trajectory has constant velocity. Given q(t₀)=q₀ and q(t₁)=q₁ over a nonzero duration, it is the straight time graph joining the endpoints.\n\nIn this particular case we can say more than stationarity. Substitute q+εη into the action around the constant-velocity path. The first-order term vanishes, and the remaining change is $(m\\varepsilon^2/2)\\int\\dot\\eta^2dt$, which is nonnegative. Thus the free-particle path is indeed a minimum for these fixed endpoints and duration. That extra conclusion required a second-order check; it did not follow merely from writing the Euler–Lagrange equation."
    },
    {
      "heading": "3. Insert a physical model and interpret stationarity honestly",
      "body": "For a particle moving in a differentiable potential U(q), take the mechanical model\n$$L=\\frac12m\\dot q^2-U(q).$$\nWe assume this Lagrangian formulation applies to the conservative, constant-mass system. Its Euler–Lagrange equation is $m\\ddot q+U'(q)=0$, or $m\\ddot q=-U'(q)$. The usual force law is recovered with force equal to minus the potential gradient in one dimension.\n\nFor a spring with U=kq²/2 and positive k, this becomes mq̈+kq=0. Its frequency is ω=√(k/m). The action contains kinetic minus potential energy, while the conserved mechanical energy is kinetic plus potential energy. Replacing the minus sign in L with a plus sign would reverse the restoring force and describe a different system. The two expressions have different jobs even though they contain the same ingredients.\n\nThe oscillator also reveals why “least action” can mislead. Its second-order change under a fixed-endpoint perturbation is\n$$\\Delta S=\\frac{\\varepsilon^2}{2}\\int(m\\dot\\eta^2-k\\eta^2)\\,dt.$$\nA rapidly oscillating η makes the positive derivative term large. Over a sufficiently long interval, a slowly varying η can make the negative potential term dominate. For the test shape η=sin(π(t−t₀)/T), where T=t₁−t₀, the sign is set by mπ²/T²−k. It is negative when T>π/ω. The stationary path need not be a local minimum.\n\nThis is not a defect in the equation of motion. Stationarity is the principle used here; minimum is an additional property that may hold only for some problems or time intervals. Likewise, not every force is represented by a time-independent scalar potential. Ordinary friction requires additional modeling and cannot be inserted by simply pretending it is another U(q).\n\nFor several coordinates q₁,…,qₙ, independently varying each coordinate gives one Euler–Lagrange equation per coordinate. This introductory extension explains why the method is useful for constrained mechanical descriptions: a suitable coordinate can build the geometric constraint into the path itself. In the pendulum synthesis, using an angle ensures the bob stays at its prescribed distance from the pivot. We will derive the full nonlinear equation before deciding when a small-angle approximation is justified."
    }
  ],
  "teaching": {
    "question": "What changes when the unknown is an entire trajectory rather than one number?",
    "why": "Varying a path explains how local equations of motion can follow from a stationary accumulated quantity, including the boundary conditions that the argument needs.",
    "outcomes": [
      "Distinguish a function from a functional and construct a fixed-endpoint variation.",
      "Derive the Euler–Lagrange equation while retaining its boundary term.",
      "Recover free-particle and oscillator motion without confusing stationarity with minimization."
    ],
    "checkpoints": [
      {
        "bridge": "Give a whole path a nearby neighbor",
        "meaning": "A variation changes both a path and its velocity while respecting the stated endpoint restrictions.",
        "question": "Why does the first variation contain a term involving the derivative of η?",
        "answer": "Because changing q to q+εη changes its velocity to q̇+εη̇, and L depends on both arguments.",
        "further": [
          {
            "question": "Must η̇ vanish at a fixed endpoint?",
            "answer": "No. Fixing position imposes η=0, not a fixed slope."
          },
          {
            "question": "Why is one trial shape insufficient to establish stationarity?",
            "answer": "The first variation must vanish under every admissible shape, including localized changes in different parts of the interval."
          },
          {
            "question": "Is the action a function of one time value?",
            "answer": "It is a functional of the entire path over a specified interval; after evaluating the integral it is one number."
          }
        ]
      },
      {
        "bridge": "Move the derivative and read the local equation",
        "meaning": "Integration by parts turns global stationarity into a local equation and exposes the boundary assumption.",
        "question": "What permits us to conclude that the Euler–Lagrange coefficient vanishes at each interior time?",
        "answer": "The integral must vanish for every localized smooth variation; a nonzero continuous coefficient could be detected by a variation supported where it has one sign.",
        "further": [
          {
            "question": "What removes the boundary term in this derivation?",
            "answer": "The fixed endpoint positions imply η(t₀)=η(t₁)=0."
          },
          {
            "question": "Why is d/dt applied after the partial velocity derivative?",
            "answer": "The partial derivative first creates a function of the path variables; the total derivative then follows its time dependence along the trajectory."
          },
          {
            "question": "What establishes a minimum for the free particle?",
            "answer": "The second-order action change is an integral of a nonnegative square, not just a vanishing first variation."
          }
        ]
      },
      {
        "bridge": "Insert a physical model and interpret stationarity honestly",
        "meaning": "The Lagrangian states the physical model; stationarity yields dynamics without guaranteeing a minimum.",
        "question": "Why is kinetic minus potential energy used in L, while total mechanical energy has a plus sign?",
        "answer": "With L=T−U, the Euler–Lagrange equation gives the restoring force −U′. Energy and action integrand are different quantities with different roles.",
        "further": [
          {
            "question": "For U=kq²/2, what does the equation predict?",
            "answer": "mq̈+kq=0, the harmonic oscillator with angular frequency √(k/m)."
          },
          {
            "question": "What does a negative second variation demonstrate?",
            "answer": "An admissible nearby path lowers the action in that direction, so the stationary path is not a local minimum."
          },
          {
            "question": "Can ordinary friction be included by inventing a position potential?",
            "answer": "Generally no. Velocity-dependent dissipative forces need additional modeling beyond this conservative L=T−U setup."
          }
        ]
      }
    ],
    "takeaway": "Vary the path, integrate by parts, apply the actual boundary restrictions, and only then read the local equation.",
    "nextConnection": "Complex differentiation will provide another example of a local requirement becoming much stronger when it must hold in every direction."
  },
  "diagnostics": [
    {
      "id": "d-stationary",
      "prompt": "At a stationary point, what is guaranteed?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "A global minimum"
          },
          {
            "id": "1",
            "label": "A vanishing first-order change in allowed directions"
          },
          {
            "id": "2",
            "label": "Positive curvature"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "Stationarity alone gives first-order information; curvature is needed to classify the point.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      },
      "prerequisiteId": "constraints"
    },
    {
      "id": "d-parts",
      "prompt": "Which boundary term arises in ∫A(t)η̇(t)dt?",
      "answer": {
        "kind": "choice",
        "value": "0",
        "options": [
          {
            "id": "0",
            "label": "[Aη] at the endpoints"
          },
          {
            "id": "1",
            "label": "[Ȧη̇] at the endpoints"
          },
          {
            "id": "2",
            "label": "No boundary term"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "Integration by parts gives [Aη]−∫Ȧη dt.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      },
      "prerequisiteId": "integration-methods"
    },
    {
      "id": "d-frequency",
      "prompt": "For q̈+9q=0 with time in seconds, find the angular frequency.",
      "answer": {
        "kind": "numeric",
        "value": 3,
        "unit": "s⁻¹",
        "acceptedUnits": [
          "s⁻¹"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "hint": "Identify the relation before substituting.",
      "solution": "The coefficient is ω²=9 s⁻², so ω=3 s⁻¹.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      },
      "prerequisiteId": "oscillators"
    }
  ],
  "workedExample": {
    "title": "Recover a spring trajectory from a stationary action",
    "problem": "Use L=q̇²−8q² in SI units, corresponding to m=2 kg and k=16 N/m. Recover the equation and the motion with q(0)=0.1 m and q̇(0)=0.",
    "steps": [
      {
        "title": "Differentiate the Lagrangian's arguments",
        "body": "∂L/∂q̇=2q̇ and ∂L/∂q=−16q.",
        "reason": "These are partial derivatives before following a time-dependent path.",
        "trap": "Treating q and q̇ as the same argument obscures the variational calculation."
      },
      {
        "title": "Apply the local stationarity equation",
        "body": "d(2q̇)/dt−(−16q)=0, hence 2q̈+16q=0.",
        "reason": "Fixed-endpoint variation produces the Euler–Lagrange relation.",
        "trap": "The two minus signs are what produce a restoring force."
      },
      {
        "title": "Identify the frequency",
        "body": "Divide by 2 to obtain q̈+8q=0, with ω=√8=2√2 s⁻¹.",
        "reason": "The oscillator coefficient is frequency squared.",
        "trap": "Using 8 s⁻¹ as the frequency misses the square root."
      },
      {
        "title": "Impose initial data and check",
        "body": "q(t)=0.1 cos(2√2 t) m satisfies both initial conditions and q̈=−8q.",
        "reason": "The second-order equation needs position and velocity to select one solution.",
        "trap": "The variational endpoint construction does not mean the initial velocity must vanish in every problem."
      }
    ]
  },
  "fadedExercise": {
    "prompt": "Use L=(3/2)q̇²−6q² for a different oscillator with q(0)=0 and q̇(0)=0.4 m/s.",
    "supplied": [
      {
        "heading": "Starting information",
        "body": "The mass is 3 kg and the spring constant is 12 N/m. A solution with zero initial displacement can be written q=A sin(ωt)."
      }
    ],
    "steps": [
      {
        "id": "g-mass",
        "prompt": "What coefficient multiplies q̈ in the Euler–Lagrange equation?",
        "answer": {
          "kind": "numeric",
          "value": 3,
          "unit": "kg",
          "acceptedUnits": [
            "kg"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "hint": "Identify the relation before substituting.",
        "solution": "The velocity derivative is 3q̇, whose time derivative is 3q̈.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Identify the relation before substituting.",
          "misconceptions": []
        }
      },
      {
        "id": "g-omega2",
        "prompt": "The equation is 3q̈+12q=0. Find ω².",
        "answer": {
          "kind": "numeric",
          "value": 4,
          "unit": "s⁻²",
          "acceptedUnits": [
            "s⁻²"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "hint": "Identify the relation before substituting.",
        "solution": "Divide the spring coefficient by mass: 12/3=4.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Identify the relation before substituting.",
          "misconceptions": []
        }
      },
      {
        "id": "g-omega",
        "prompt": "Given ω²=4 s⁻², find the positive angular frequency.",
        "answer": {
          "kind": "numeric",
          "value": 2,
          "unit": "s⁻¹",
          "acceptedUnits": [
            "s⁻¹"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "hint": "Identify the relation before substituting.",
        "solution": "Taking the positive square root gives 2 s⁻¹.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Identify the relation before substituting.",
          "misconceptions": []
        }
      },
      {
        "id": "g-amplitude",
        "prompt": "For q=A sin(2t) and q̇(0)=0.4 m/s, find A.",
        "answer": {
          "kind": "numeric",
          "value": 0.2,
          "unit": "m",
          "acceptedUnits": [
            "m"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "hint": "Identify the relation before substituting.",
        "solution": "q̇(0)=2A=0.4, hence A=0.2 m.",
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
      "id": "r-functional",
      "prompt": "Which object takes an entire path as input?",
      "answer": {
        "kind": "choice",
        "value": "0",
        "options": [
          {
            "id": "0",
            "label": "A functional"
          },
          {
            "id": "1",
            "label": "A single coordinate value"
          },
          {
            "id": "2",
            "label": "An endpoint only"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "The action assigns a number to the function q(t) over an interval.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      }
    },
    {
      "id": "r-endpoints",
      "prompt": "Fixed endpoint position implies which condition on η?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "η̇=0 everywhere"
          },
          {
            "id": "1",
            "label": "η=0 at each endpoint"
          },
          {
            "id": "2",
            "label": "η=0 throughout the interval"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "Interior variations remain arbitrary; only their endpoint values are restricted.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      }
    },
    {
      "id": "r-free",
      "prompt": "A free particle goes from q=1 m to q=7 m in 3 s. Find its constant stationary-path velocity.",
      "answer": {
        "kind": "numeric",
        "value": 2,
        "unit": "m/s",
        "acceptedUnits": [
          "m/s"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "hint": "Identify the relation before substituting.",
      "solution": "The displacement is 6 m over 3 s.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      }
    },
    {
      "id": "r-force",
      "prompt": "U(q)=5q² in SI units. Find the force at q=0.3 m.",
      "answer": {
        "kind": "numeric",
        "value": -3,
        "unit": "N",
        "acceptedUnits": [
          "N"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "hint": "Identify the relation before substituting.",
      "solution": "Force is −U′=−10q, giving −3 N.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      }
    },
    {
      "id": "r-minimum",
      "prompt": "What does solving the Euler–Lagrange equation establish?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "The action is always a global minimum"
          },
          {
            "id": "1",
            "label": "The action is stationary under the stated variations"
          },
          {
            "id": "2",
            "label": "All boundary conditions are optional"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "Classification needs additional analysis; stationarity is first-order.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      }
    },
    {
      "id": "r-transfer",
      "prompt": "If an endpoint is free to move, which step needs reconsideration?",
      "answer": {
        "kind": "choice",
        "value": "2",
        "options": [
          {
            "id": "0",
            "label": "The existence of time"
          },
          {
            "id": "1",
            "label": "The meaning of mass"
          },
          {
            "id": "2",
            "label": "Discarding the boundary term"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "η need not vanish at a free endpoint, so the boundary term may impose a natural boundary condition.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      }
    }
  ],
  "diagram": {
    "title": "Different paths, the same endpoints",
    "caption": "The straight path from (t,q)=(0,0) to (1,1) is the free-particle stationary path. The curved comparison is q=t+0.3 sin(πt), sampled and joined. Their difference vanishes at both endpoints.",
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
          510,
          70
        ],
        "tone": "ink"
      },
      {
        "kind": "line",
        "from": [
          60,
          270
        ],
        "to": [
          105,
          231.45898033750316
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          105,
          231.45898033750316
        ],
        "to": [
          150,
          194.7328848624516
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          150,
          194.7328848624516
        ],
        "to": [
          195,
          161.45898033750316
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          195,
          161.45898033750316
        ],
        "to": [
          240,
          132.93660902229078
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          240,
          132.93660902229078
        ],
        "to": [
          285,
          110
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          285,
          110
        ],
        "to": [
          330,
          92.93660902229081
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          330,
          92.93660902229081
        ],
        "to": [
          375,
          81.45898033750316
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          375,
          81.45898033750316
        ],
        "to": [
          420,
          74.73288486245161
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          420,
          74.73288486245161
        ],
        "to": [
          465,
          71.45898033750314
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          465,
          71.45898033750314
        ],
        "to": [
          510,
          70
        ],
        "tone": "accent"
      },
      {
        "kind": "point",
        "at": [
          60,
          270
        ],
        "label": "start",
        "tone": "ink",
        "labelOffset": [
          5,
          25
        ]
      },
      {
        "kind": "point",
        "at": [
          510,
          70
        ],
        "label": "finish",
        "tone": "ink",
        "labelOffset": [
          -30,
          -20
        ]
      },
      {
        "kind": "label",
        "at": [
          140,
          90
        ],
        "text": "q + εη"
      },
      {
        "kind": "label",
        "at": [
          340,
          230
        ],
        "text": "q = t"
      },
      {
        "kind": "label",
        "at": [
          510,
          300
        ],
        "text": "t"
      }
    ]
  },
  "sidebars": [
    {
      "heading": "Optional: adding a total time derivative",
      "body": "Replacing L by $L+dF(q,t)/dt$ changes the action by $F(q(t_1),t_1)-F(q(t_0),t_0)$. With fixed times and endpoint positions this change is constant across admissible paths, so its variation vanishes. The interior Euler–Lagrange equations are unchanged. This is an example of different Lagrangian expressions representing the same fixed-endpoint dynamics; it does not justify discarding arbitrary terms."
    }
  ],
  "sources": [
    {
      "title": "Cambridge · Mathematical Methods II",
      "url": "https://www.damtp.cam.ac.uk/user/gio10/nst_notes.pdf"
    },
    {
      "title": "David Tong · Dynamics and Relativity",
      "url": "https://davidtong.org/teaching/dynamics-and-relativity/"
    }
  ]
};
export default chapter;

