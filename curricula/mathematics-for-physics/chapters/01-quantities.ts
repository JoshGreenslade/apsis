import type { Chapter } from "../chapter";
const chapter: Chapter = {
  "id": "quantities",
  "intuition": {
    "body": "Imagine two pendulums hanging beside a workbench. One is made by attaching a small metal weight to a string; the other uses a string four times as long. You could release both, record their motion with a camera and fit equations to the result. But before doing any of that, can you predict whether the longer pendulum takes twice as long, four times as long, or some other multiple of the time to swing? Mathematics begins here, with a question about a relationship, rather than with a formula someone has asked you to remember.\n\nThere is an immediate complication. The time you write down depends on whether you measure in seconds or milliseconds, while the pendulum knows nothing about your choice of clock display. A good physical statement must survive a change in the way we label its measurements. That requirement is much more useful than it first appears. It can rule out proposed equations and, when the relevant ingredients are few, tell us most of the form an equation must have.\n\nThis does not mean that units can replace an experiment or a physical model. A length and a gravitational acceleration will let us construct a time, but they will not tell us the numerical factor multiplying that time, whether air resistance matters, or whether a very large swing behaves like a small one. Understanding exactly what a method establishes, and what remains undecided, is part of understanding the mathematics.\n\nWe will use the pendulum to develop three habits that will recur throughout this course: keep the quantity separate from its numerical representation, reason about changes through ratios, and state the assumptions behind a prediction. You need only multiplication, division and square roots. Later, after we have developed calculus, we will return to the same pendulum and explain the dynamics that dimensional reasoning cannot supply.",
    "thoughtExperiments": [
      "If a measurement changes from 2 seconds to 2,000 milliseconds, what has changed about the pendulum?",
      "If one pendulum is four times as long, why is “four times as slow” a prediction that needs an argument?"
    ]
  },
  "theory": [
    {
      "heading": "1. A quantity is more than the number on the display",
      "body": "Suppose a ruler says a string is $0.50\\,\\mathrm{m}$ long. Another ruler could label the same endpoints as $50\\,\\mathrm{cm}$. The number and the unit change together, while their product describes the same length. Thinking of a measurement as “number times unit” makes conversion an equality rather than a trick: because $1\\,\\mathrm m=100\\,\\mathrm{cm}$, multiplying $0.50$ by $100$ simply changes the representation.\n\nA **dimension** names the kind of quantity being measured, such as length or time. A **unit** specifies a particular measuring standard within that kind, such as metres or seconds. We write $L$ for the dimension of length and $T$ for the dimension of time; these capital symbols are bookkeeping labels here, not extra physical variables. A speed has dimension $L/T$, because it compares a change of position with a duration. Acceleration has dimension $L/T^2$, because it compares a change of speed with a duration. You do not yet need derivatives to make either statement.\n\nAddition imposes a stronger requirement than multiplication. You can add two lengths, after expressing them in compatible units, because the result is another length. An expression such as “three metres plus two seconds” cannot become a single length or a single time just by doing arithmetic with the numbers. Multiplication, on the other hand, can create a new kind of quantity: speed times time has dimension length. Thus an equation for a distance might contain $vt$, where $v$ is a speed and $t$ is a time, but it could not contain $v+t$ as a distance.\n\nApply this to a candidate formula $d=at^2$. Its right side has dimension $(L/T^2)T^2=L$, matching the distance on the left. That makes the formula dimensionally possible. It does not establish that the formula describes a particular motion. A particle beginning from rest under constant acceleration actually travels $d=at^2/2$; we will derive that result after learning integration. Both expressions pass the dimensional test. The test detects incompatible kinds of quantities, not incorrect dimensionless factors.\n\nThere is also a more subtle warning: quantities with the same dimensions need not represent the same physical concept. Work and torque both have dimensions of force times length, but they answer different questions about motion. Dimensions are a useful first check on meaning; they are not the whole meaning."
    },
    {
      "heading": "2. Use ratios to see what a change really does",
      "body": "Return to the workbench and compare the two strings. Calling the first length $\\ell$ and the second length $\\ell'$, the statement “the second is four times as long” is $\\ell'/\\ell=4$. The units cancel. You obtain the same ratio whether both lengths are measured in metres or both in centimetres. This is a **dimensionless ratio**, a comparison whose value does not depend on the common unit.\n\nA proportionality such as $y=Cx$ says that multiplying $x$ by a factor multiplies $y$ by the same factor, provided the coefficient $C$ remains fixed. The qualification matters. A journey at twice the speed takes half the time only if the distance remains fixed. A useful scaling argument therefore names what changes and what stays the same.\n\nFor a power relationship $y=Cx^p$, division removes the unknown coefficient:\n$$\\frac{y'}{y}=\\frac{C(x')^p}{Cx^p}=\\left(\\frac{x'}{x}\\right)^p.$$\nThe cancellation is why ratios are so effective. You may not know $C$, but you can still make a comparative prediction. If $p=2$, doubling $x$ quadruples $y$; if $p=1/2$, quadrupling $x$ doubles $y$; if $p=-1$, doubling $x$ halves $y$. Negative and fractional powers describe ordinary, testable relationships.\n\nA ratio can also tell you whether an approximation might make sense. If a bob has radius $b$ and its string has length $\\ell$, the ratio $b/\\ell$ compares the size of the bob with the size of its motion. A very small value suggests that treating the bob as a point might be useful. It is not a universal certificate of accuracy: the force law and the particular measurement still matter. Nevertheless, “small compared with the string length” is more informative than simply calling the bob small.\n\nWe will repeatedly use this idea to decide which terms in an equation can be neglected. A correction is small relative to something, and the comparison must be dimensionless. Saying that an acceleration is “less than 0.01” without specifying a unit or a reference acceleration does not identify a physically meaningful small effect."
    },
    {
      "heading": "3. Build the pendulum's time scale—and mark the limit of the argument",
      "body": "Let the pendulum's period, the duration of one complete back-and-forth motion, be $P$. Begin with an idealization: a very small bob, a light inextensible string of length $\\ell$, negligible air resistance, uniform gravitational acceleration $g$, and a fixed small release angle. We also take the period to be independent of the bob's mass in this ideal gravitational model. That last statement is physical input, not something that units alone prove.\n\nSuppose the relevant dimensional quantities are just $\\ell$ and $g$, and look for a time of the form $P=C\\ell^\\alpha g^\\beta$, with $C$ dimensionless. Here $\\alpha$ and $\\beta$ are unknown exponents. Length contributes dimension $L$, while gravitational acceleration contributes $L/T^2$, so the product has dimension\n$$[\\ell^\\alpha g^\\beta]=L^{\\alpha+\\beta}T^{-2\\beta}.$$\nThe square brackets mean “the dimensions of,” not a new operation on the pendulum. To match a time, there must be no leftover length factor and there must be one power of time. Consequently $\\alpha+\\beta=0$ and $-2\\beta=1$. The second equation gives $\\beta=-1/2$, and the first then gives $\\alpha=1/2$. We have found\n$$P=C\\sqrt{\\frac{\\ell}{g}}.$$\n\nNow the comparative prediction is available even though $C$ remains unknown. With the same release angle and gravity, quadrupling $\\ell$ doubles $P$. With the same length and angle, reducing $g$ to one quarter doubles $P$. These statements follow by taking ratios; neither requires guessing the coefficient.\n\nWhat has been left out? Release angle is dimensionless when expressed in radians, a convention we will develop in the trigonometry chapter. Dimensional reasoning therefore permits $C$ to be a function of that angle. It cannot tell us that the period is approximately independent of amplitude for small swings. The dynamical calculation will later give the small-angle result $P\\approx2\\pi\\sqrt{\\ell/g}$, with a correction when the amplitude is appreciable. Here that coefficient is a preview of a result, not a derivation.\n\nIt is useful to rename the combination we have found: $t_0=\\sqrt{\\ell/g}$ is a **characteristic time**, a time built from the model's ingredients. The ratio $\\tau=t/t_0$ measures elapsed time in the pendulum's own natural units. Changing the pendulum changes $t_0$, while a suitably rescaled description can retain the same form. This is the beginning of nondimensionalization, a method that will later let us compare apparently different differential equations. For now, its message is concrete: choose comparisons that reveal the relationship rather than comparisons that depend on your ruler and clock."
    }
  ],
  "diagram": {
    "title": "A fourfold change in length",
    "caption": "Schematic pendulums at the same small release angle. The length ratio is 4; under the stated idealization, the period ratio is 2. This is a scaling diagram, not a trajectory plot.",
    "viewBox": [
      0,
      0,
      600,
      340
    ],
    "elements": [
      {
        "kind": "line",
        "from": [
          100,
          45
        ],
        "to": [
          116,
          105
        ],
        "tone": "accent"
      },
      {
        "kind": "point",
        "at": [
          116,
          105
        ],
        "label": "length ℓ",
        "tone": "accent",
        "labelOffset": [
          15,
          0
        ]
      },
      {
        "kind": "line",
        "from": [
          330,
          45
        ],
        "to": [
          394,
          285
        ],
        "tone": "accent"
      },
      {
        "kind": "point",
        "at": [
          394,
          285
        ],
        "label": "length 4ℓ",
        "tone": "accent",
        "labelOffset": [
          15,
          0
        ]
      },
      {
        "kind": "label",
        "at": [
          65,
          155
        ],
        "text": "period P"
      },
      {
        "kind": "label",
        "at": [
          335,
          325
        ],
        "text": "period 2P"
      },
      {
        "kind": "line",
        "from": [
          50,
          45
        ],
        "to": [
          500,
          45
        ],
        "tone": "muted"
      }
    ]
  },
  "teaching": {
    "question": "How much can you predict before solving an equation of motion?",
    "why": "A physical calculation starts by deciding what the symbols measure and which comparisons have meaning. Scaling offers useful predictions while making the limits of those predictions visible.",
    "outcomes": [
      "Distinguish a physical quantity, a dimension and a unit.",
      "Use a ratio to predict the effect of changing a scale.",
      "Construct a pendulum time scale and explain what dimensions cannot determine."
    ],
    "checkpoints": [
      {
        "bridge": "Keep the physical string fixed while changing the ruler's labels.",
        "meaning": "Changing units changes a number, not the physical length. An equation must compare compatible kinds of quantities.",
        "question": "Why does 50 cm describe the same length as 0.50 m?",
        "answer": "Because a centimetre is one hundredth of a metre. The numerical value grows by a factor of one hundred while the unit shrinks by that factor, leaving the product unchanged.",
        "further": [
          {
            "question": "Could a dimensionally correct equation still predict the wrong distance?",
            "answer": "Yes. For motion from rest at constant acceleration, both at² and at²/2 have dimensions of length, but only the second is the correct displacement. Dimensions cannot determine the factor one half."
          },
          {
            "question": "Why can speed multiplied by time be a distance, while speed plus time cannot?",
            "answer": "The product has dimensions (length/time) × time = length. Addition requires compatible dimensions before any numerical calculation can represent a single quantity."
          },
          {
            "question": "Does sharing dimensions mean two physical quantities are interchangeable?",
            "answer": "No. Work and torque share dimensions but describe different physical effects. A dimension check cannot replace the definition and context of the quantities."
          }
        ]
      },
      {
        "bridge": "Compare two experiments without committing to a particular unit.",
        "meaning": "Ratios remove common units and often cancel unknown constants, provided the underlying model and fixed conditions remain the same.",
        "question": "If y = Cx² and x triples, what must be held fixed before saying y increases ninefold?",
        "answer": "C must remain the same. Then dividing the new relation by the old one gives y′/y = (x′/x)² = 9.",
        "further": [
          {
            "question": "Why is a bob radius of 1 cm not enough information to judge a point-bob approximation?",
            "answer": "Its size must be compared with relevant lengths. A 1 cm bob is a different fraction of a 2 cm pendulum than of a 2 m pendulum. Even a small ratio must be considered alongside the required accuracy and physical model."
          },
          {
            "question": "If y varies as the inverse square root of x, what does multiplying x by four do?",
            "answer": "The ratio is 4 raised to the power −1/2, which equals one half. The output is halved."
          },
          {
            "question": "Why is 'the correction is 0.001' an incomplete statement about its importance?",
            "answer": "A correction must be compared with a relevant quantity in compatible units. Its ratio to the leading contribution, along with the required accuracy, determines whether neglecting it is sensible."
          }
        ]
      },
      {
        "bridge": "Ask which combination of length and gravitational acceleration can represent a time.",
        "meaning": "Matching dimensions fixes the length and gravity exponents under the chosen model, but leaves dimensionless factors and amplitude dependence undetermined.",
        "question": "What would fail if we proposed P = Cℓ/g with dimensionless C?",
        "answer": "Length divided by acceleration has dimensions time squared. It cannot equal a period, which has dimensions time. The square root repairs this mismatch.",
        "further": [
          {
            "question": "Why does this argument not derive the factor 2π?",
            "answer": "Any dimensionless coefficient has no effect on matching the length and time exponents. The coefficient comes from the dynamical model and its small-angle solution."
          },
          {
            "question": "Could two pendulums at different amplitudes violate the simple period ratio without violating dimensional reasoning?",
            "answer": "Yes. The dimensionless coefficient can depend on amplitude. Cancelling it requires the same amplitude or an independently justified approximation that makes it effectively constant."
          },
          {
            "question": "What extra possibility appears if the bob radius b is no longer negligible?",
            "answer": "The period can also depend on the dimensionless ratio b/ℓ. The simple length–gravity scaling then needs additional physical justification or a correction function."
          }
        ]
      }
    ],
    "takeaway": "A useful prediction names the quantities, fixed conditions and assumptions. Dimensional ratios can determine scaling while leaving genuine physical questions unresolved.",
    "nextConnection": "We have used equations to compare measurements. Next we will examine what it means for one quantity to be a function of another, and why graphs, domains and inverse relations matter."
  },
  "diagnostics": [
    {
      "id": "d-convert",
      "prompt": "A string measures 150 cm. What is its length in metres?",
      "answer": {
        "kind": "numeric",
        "value": 1.5,
        "unit": "m",
        "acceptedUnits": [
          "m"
        ],
        "relativeTolerance": 0.002,
        "absoluteTolerance": 0.001
      },
      "hint": "Convert the measuring unit while preserving the physical length.",
      "solution": "There are 100 cm in 1 m, so divide 150 by 100.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Convert the measuring unit while preserving the physical length.",
        "misconceptions": []
      }
    },
    {
      "id": "d-root",
      "prompt": "What is the positive square root of 9? Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 3,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "relativeTolerance": 0.002,
        "absoluteTolerance": 0.001
      },
      "hint": "Which positive number multiplied by itself gives 9?",
      "solution": "The positive number whose square is 9 is 3.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Which positive number multiplied by itself gives 9?",
        "misconceptions": []
      }
    }
  ],
  "workedExample": {
    "title": "Compare a pendulum in a weaker gravitational field",
    "problem": "Pendulum A has length 1 m in a uniform gravitational field of 9 m/s² and a measured period of 2 s. Pendulum B has length 4 m in a field of 4 m/s². Both obey the same idealization and use the same release angle. Predict B's period without assuming a value for the dimensionless coefficient.",
    "steps": [
      {
        "title": "Name the shared physical assumptions",
        "body": "The release angle and the idealizations are the same, so the dimensionless coefficient C is the same. The changes are length and gravitational acceleration.",
        "reason": "Taking a ratio cancels C only if it remains unchanged.",
        "trap": "Similar-looking apparatus does not guarantee that damping, angle or finite bob size can be ignored."
      },
      {
        "title": "Divide the two period relations",
        "body": "Write $P_B/P_A=\\sqrt{(\\ell_B/g_B)/(\\ell_A/g_A)}$. The quantity inside the outer square root is a ratio of two quantities with dimensions time squared, so it is dimensionless.",
        "reason": "Division preserves both length and gravity changes and removes the unknown coefficient.",
        "trap": "Comparing the lengths alone would ignore the second change."
      },
      {
        "title": "Evaluate the ratio before the absolute time",
        "body": "Here $(\\ell_B/g_B)/(\\ell_A/g_A)=(4/4)/(1/9)=9$, hence $P_B/P_A=3$.",
        "reason": "The square root turns the ratio of time scales squared into the ratio of periods.",
        "trap": "The value 9 is not the period ratio; the square root is still required."
      },
      {
        "title": "Recover and interpret the period",
        "body": "B's period is 3 × 2 s = 6 s. Its longer string and weaker gravity both act in the direction of a longer period, consistent with the prediction.",
        "reason": "A qualitative check should agree with the arithmetic.",
        "trap": "This inference uses A's measured period. It does not independently derive C or establish a model for large swings."
      }
    ]
  },
  "fadedExercise": {
    "prompt": "Now compare a new pair yourself. Keep the same release angle and idealization throughout. A has length 1 m, gravity 8 m/s² and measured period 2 s. B has length 2 m and gravity 4 m/s².",
    "supplied": [
      {
        "heading": "A useful starting point",
        "body": "Use $P_B/P_A=\\sqrt{(\\ell_B/\\ell_A)(g_A/g_B)}$. First find each ratio, then combine them. Later steps give less guidance."
      }
    ],
    "steps": [
      {
        "id": "g-length",
        "prompt": "Find ℓB/ℓA. Enter unit 1.",
        "answer": {
          "kind": "numeric",
          "value": 2,
          "unit": "1",
          "acceptedUnits": [
            "1"
          ],
          "relativeTolerance": 0.002,
          "absoluteTolerance": 0.001
        },
        "hint": "Compare the lengths in the same units.",
        "solution": "2 m divided by 1 m equals 2; metres cancel.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Compare the lengths in the same units.",
          "misconceptions": []
        }
      },
      {
        "id": "g-gravity",
        "prompt": "Find gA/gB. Enter unit 1.",
        "answer": {
          "kind": "numeric",
          "value": 2,
          "unit": "1",
          "acceptedUnits": [
            "1"
          ],
          "relativeTolerance": 0.002,
          "absoluteTolerance": 0.001
        },
        "hint": "The gravity ratio is reversed relative to the length ratio.",
        "solution": "8 m/s² divided by 4 m/s² equals 2.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "The gravity ratio is reversed relative to the length ratio.",
          "misconceptions": []
        }
      },
      {
        "id": "g-ratio",
        "prompt": "Find PB/PA. Enter unit 1.",
        "answer": {
          "kind": "numeric",
          "value": 2,
          "unit": "1",
          "acceptedUnits": [
            "1"
          ],
          "relativeTolerance": 0.002,
          "absoluteTolerance": 0.001
        },
        "hint": "Combine the two effects before taking the square root.",
        "solution": "The ratio is √(2 × 2) = 2.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Combine the two effects before taking the square root.",
          "misconceptions": []
        }
      },
      {
        "id": "g-period",
        "prompt": "Predict B's period.",
        "answer": {
          "kind": "numeric",
          "value": 4,
          "unit": "s",
          "acceptedUnits": [
            "s"
          ],
          "relativeTolerance": 0.002,
          "absoluteTolerance": 0.001
        },
        "hint": "Use the dimensionless result to scale A's measured period.",
        "solution": "PB = 2PA = 4 s.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Use the dimensionless result to scale A's measured period.",
          "misconceptions": []
        }
      }
    ]
  },
  "retrievalProblems": [
    {
      "id": "r-units",
      "prompt": "Changing a recorded length from metres to centimetres changes which of the following?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "The physical length"
          },
          {
            "id": "1",
            "label": "Its numerical representation and unit"
          },
          {
            "id": "2",
            "label": "Its dimension from length to time"
          }
        ]
      },
      "hint": "Separate the object from the ruler's labels.",
      "solution": "The same physical quantity receives a different numerical value paired with a different unit.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Separate the object from the ruler's labels.",
        "misconceptions": []
      }
    },
    {
      "id": "r-dimensions",
      "prompt": "Which expression has dimensions of time if ℓ is length and g is acceleration?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "ℓ/g"
          },
          {
            "id": "1",
            "label": "√(ℓ/g)"
          },
          {
            "id": "2",
            "label": "√(g/ℓ)"
          }
        ]
      },
      "hint": "Acceleration has dimensions length divided by time squared.",
      "solution": "ℓ/g has dimensions time squared, so its square root has dimensions time.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Acceleration has dimensions length divided by time squared.",
        "misconceptions": []
      }
    },
    {
      "id": "r-scale",
      "prompt": "With fixed gravity and angle, a pendulum becomes nine times as long. By what factor does its period change? Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 3,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "relativeTolerance": 0.002,
        "absoluteTolerance": 0.001
      },
      "hint": "The period varies with the square root of length.",
      "solution": "The period ratio is √9 = 3.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "The period varies with the square root of length.",
        "misconceptions": []
      }
    },
    {
      "id": "r-constant",
      "prompt": "What does dimensional reasoning alone establish about C in P = C√(ℓ/g)?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "C must equal 2π"
          },
          {
            "id": "1",
            "label": "C is dimensionless but its value is not fixed"
          },
          {
            "id": "2",
            "label": "C cannot depend on amplitude"
          }
        ]
      },
      "hint": "Ask what information disappears during a dimension check.",
      "solution": "Matching dimensions does not determine a dimensionless coefficient or exclude dependence on a dimensionless release angle.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Ask what information disappears during a dimension check.",
        "misconceptions": []
      }
    },
    {
      "id": "r-combine",
      "prompt": "If length and gravitational acceleration both double while the idealization and angle stay the same, what is the period ratio? Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 1,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "relativeTolerance": 0.002,
        "absoluteTolerance": 0.001
      },
      "hint": "Keep both changes in the same comparison.",
      "solution": "The ratio is √(2/2) = 1: the two changes cancel.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Keep both changes in the same comparison.",
        "misconceptions": []
      }
    },
    {
      "id": "r-transfer",
      "prompt": "Two pendulums have the same ℓ and g but different large release angles. Which conclusion is justified by dimensions alone?",
      "answer": {
        "kind": "choice",
        "value": "2",
        "options": [
          {
            "id": "0",
            "label": "Their periods must match"
          },
          {
            "id": "1",
            "label": "Their periods must differ by exactly two"
          },
          {
            "id": "2",
            "label": "Their periods may differ through an angle-dependent coefficient"
          }
        ]
      },
      "hint": "A dimensionless input can change a dimensionless coefficient.",
      "solution": "Amplitude is dimensionless, so a coefficient depending on amplitude is allowed. Dynamics is needed to find that dependence.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "A dimensionless input can change a dimensionless coefficient.",
        "misconceptions": []
      }
    }
  ],
  "sidebars": [
    {
      "heading": "An optional challenge: when the list of ingredients changes",
      "body": "Suppose a time also depends on a damping rate $\\gamma$ with units $1/\\mathrm s$. The product $\\gamma\\sqrt{\\ell/g}$ is dimensionless, so a more general form is $P=\\sqrt{\\ell/g}\\,F(\\gamma\\sqrt{\\ell/g},\\theta_0)$, where $F$ is an unknown dimensionless function and $\\theta_0$ is the release angle. This form does not assert that oscillations exist for every damping rate. It shows why adding physical ingredients weakens the prediction available from dimensions alone."
    }
  ],
  "sources": [
    {
      "title": "MIT OpenCourseWare · Single Variable Calculus (further study)",
      "url": "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/"
    },
    {
      "title": "David Tong · Dynamics and Relativity (physical context)",
      "url": "https://davidtong.org/teaching/dynamics-and-relativity/"
    }
  ],
  "practiceTemplates": [
    {
      "id": "pendulum-scaling",
      "title": "A fresh period ratio",
      "prompt": "Two ideal pendulums have the same release angle. B's length is {{lengthFactor}} times A's, and A's gravity is {{gravityFactor}} times B's. Find PB/PA. Enter unit 1.",
      "variables": [
        {
          "name": "lengthFactor",
          "min": 1,
          "max": 9,
          "step": 1
        },
        {
          "name": "gravityFactor",
          "min": 1,
          "max": 4,
          "step": 1
        }
      ],
      "formula": {
        "op": "sqrt",
        "args": [
          {
            "op": "multiply",
            "args": [
              {
                "variable": "lengthFactor"
              },
              {
                "variable": "gravityFactor"
              }
            ]
          }
        ]
      },
      "unit": "1",
      "hint": "Use the square root of the length ratio multiplied by the inverse gravity ratio.",
      "solution": "The period ratio is √({{lengthFactor}} × {{gravityFactor}}) = {{answer}}. The shared dimensionless coefficient cancels."
    }
  ]
};
export default chapter;

