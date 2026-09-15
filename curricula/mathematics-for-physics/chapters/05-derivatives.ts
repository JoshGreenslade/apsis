import type { Chapter } from "../chapter";
const chapter: Chapter = {
  theoreticalMinimum: { coreIdea: "A derivative is the coefficient of the best local linear prediction, with an error smaller than the displacement being modelled. It is therefore more than a slope calculated by a rule: it is a controlled statement about what a function looks like when viewed close enough to one point.", widerConnection: "Local linearisation becomes the common language of rates, gradients, error propagation, stability, and numerical methods. The later subjects repeatedly replace a difficult object by its first-order behaviour, then ask whether the neglected terms are small enough for the conclusion being drawn." },
  "id": "derivatives",
  "intuition": {
    "body": "Suppose a particle follows the prescribed trajectory $x(t)=At^2$, where $A$ has units of length divided by time squared. A short film gives average velocities over intervals. A derivative asks whether those averages settle toward one value as the interval shrinks around a chosen instant.\n\nThe answer, when it exists, is more useful than a single speed reading. It supplies a local model: start from the current position and add the derivative multiplied by a small time change. The curved trajectory can then be approximated near that instant by a straight line. The approximation is deliberately local; its neglected part tells us when to distrust it.\n\nThis idea applies beyond motion. A derivative can describe how a sensor's voltage changes with temperature or how a geometric area changes with length. Its units are always output units divided by input units. “Rate” need not mean rate per second.\n\nWe will reconstruct the derivative of the quadratic before learning rules. Then we will see why products and compositions have their particular rules. The rules are compact records of how small changes propagate; understanding that propagation makes them easier to remember and harder to misuse.",
    "thoughtExperiments": [
      "If a tangent predicts a position over a short interval, what would make the same prediction unreliable over a much longer interval?",
      "Can a continuous position graph change direction through a sharp corner while still having a single instantaneous velocity there?"
    ]
  },
  "theory": [
    {
      "heading": "1. A derivative is the coefficient of the local straight line",
      "body": "At time $t$, compare positions separated by a nonzero interval $h$. For the quadratic,\n$$\\frac{x(t+h)-x(t)}h=A\\frac{(t+h)^2-t^2}h=2At+Ah.$$\nAs $h$ approaches zero from either side, the second term vanishes and the limit is $2At$. We call this derivative $x'(t)$ or $dx/dt$. The notation does not require treating $dx$ and $dt$ as ordinary independent numbers; at this stage it names a limit of ratios.\n\nThe same expansion gives the exact increment $x(t+h)-x(t)=2Ath+Ah^2$. The first term is linear in $h$ and the remaining term is quadratic. Thus the local model is $x(t+h)\\approx x(t)+x'(t)h$. For fixed nonzero $t$, the quadratic error becomes small relative to the linear term as $h$ shrinks. At $t=0$ the linear term vanishes, but the approximation still has absolute error $Ah^2$; relative error needs separate care when a leading contribution is zero.\n\nMore generally, differentiability means that $f(a+h)=f(a)+f'(a)h+r(h)$, where $r(h)/h$ tends to zero. The remainder is smaller than the interval to first order. This is stronger and more informative than merely saying a graph looks smooth. It identifies exactly the sense in which a straight line is a good local replacement.\n\nFor $A=2\\,\\mathrm{m/s^2}$ at $t=3\\,\\mathrm s$, the position is 18 m and derivative 12 m/s. A 0.1 s step predicts 19.2 m. The exact position is 19.22 m, so the local model misses by 0.02 m. The error is $Ah^2$ and a tenfold smaller step reduces this absolute error one hundredfold.\n\nA derivative may be negative. For a position coordinate that means motion toward decreasing coordinate values, not a negative magnitude of speed. The speed is $|x'(t)|$ in one dimension. Differentiating velocity again gives acceleration, with units length/time squared. These definitions describe the trajectory; relating acceleration to force requires a separate physical law."
    },
    {
      "heading": "2. Explain the product and chain rules through increments",
      "body": "For a sum, changes simply add. If $y=f(u)+g(u)$, its derivative is $f'(u)+g'(u)$. A constant multiplier scales the derivative. The rule for a product has two terms because either factor can change. Write the exact product increment as\n$$\\Delta(fg)=g\\,\\Delta f+f\\,\\Delta g+\\Delta f\\,\\Delta g.$$\nThe unmarked factors are their values at the original input. Each increment is proportional to the small input step to leading order, so the last term is second order. Dividing by the step and taking the limit leaves $(fg)'=f'g+fg'$.\n\nA rectangle makes the terms visible. Increase its width and height slightly. One new strip comes from the width change and one from the height change; a small corner comes from both changes together. Omitting the corner is justified only for the first-order rate, not for an exact finite area change. The product rule retains the two strips rather than multiplying the two rates.\n\nFor a composition $y=f(g(u))$, let the intermediate value be $v=g(u)$. A small input step changes $v$ by about $g'(u)h$, which changes $y$ by about $f'(v)g'(u)h$. Therefore\n$$\\frac{dy}{du}=f'(g(u))g'(u).$$\nThis chain rule evaluates the outside derivative at the actual inside value, then multiplies by the inside rate. It is the algebra of passing a small change through two stages.\n\nFor example, if $y=(3u+1)^2$, the derivative is $2(3u+1)\\cdot3$, not merely $2(3u+1)$. The intermediate quantity changes three times as fast as $u$. If a calibration converts temperature to resistance and another rule converts resistance to voltage, the same multiplication passes temperature changes through the measuring chain.\n\nThe power rule $d(u^n)/du=nu^{n-1}$ follows for positive integers by expanding $(u+h)^n$: the one-$h$ term is $nu^{n-1}h$, while higher powers of $h$ vanish after division and limiting. Extensions to other powers require their appropriate real domains. For instance, the derivative of $\\sqrt u$ is $1/(2\\sqrt u)$ for $u>0$; at zero the finite derivative does not exist.\n\nThese rules require the differentiability of the functions involved at the relevant points. They are not permission to differentiate across a jump or divide by a vanishing expression. Always keep the original domain and any local exceptions in view."
    },
    {
      "heading": "3. Circular rates, stationary points and failures",
      "body": "A point advancing through a small angle $h$ on a unit circle has $\\sin h/h\\to1$ and $(\\cos h-1)/h\\to0$ as $h\\to0$, with angles in radians. Geometrically the first compares a short vertical projection with the arc; the second records the smaller horizontal change near the starting point. Combining these limits with the angle-addition relations gives\n$$\\frac{d}{du}\\sin u=\\cos u,\\qquad\n\\frac{d}{du}\\cos u=-\\sin u.$$\nThe minus sign matches geometry: near a small positive angle, increasing the angle decreases the horizontal coordinate.\n\nFor $x(t)=A\\cos(\\omega t+\\phi)$, the chain rule gives $x'(t)=-A\\omega\\sin(\\omega t+\\phi)$. The shadow is momentarily at rest at an extreme position because sine is then zero, and moves fastest in magnitude as it crosses the centre. Differentiating again gives $x''(t)=-\\omega^2x(t)$. This is a mathematical property of the prescribed curve; a later force model will explain when a real oscillator follows it.\n\nUsing degree numbers changes the derivative formula. Since $\\sin(\\pi u/180)$ is sine of an angle of $u$ degrees, its derivative with respect to that degree number contains a factor $\\pi/180$. Radians remove this conversion factor because they are based on arc length. This is the reason for the course's calculus angle convention.\n\nA zero derivative marks a stationary point, but does not alone establish a maximum or minimum. The function $u^3$ has derivative zero at zero and still increases through that point. The local tangent is horizontal; nearby behaviour on both sides determines whether an extremum occurs. Conversely, $|u|$ has a minimum at zero without a derivative there, because the one-sided slopes disagree.\n\nDifferentiability implies continuity: a change consisting of a finite slope times $h$ plus a smaller remainder tends to zero. The reverse implication fails at corners. At a domain endpoint we may discuss a one-sided rate, but should not silently call it a two-sided derivative. These qualifications matter in physical models involving switching, impacts or piecewise calibration curves.\n\nThe central question remains practical: what part of the change is captured by a first-order local model, and how small is what remains? Derivative rules calculate that first-order coefficient efficiently. They become reliable tools when paired with units, domain checks and an explicit recognition that local accuracy does not automatically extend over a long interval."
    }
  ],
  "teaching": {
    "question": "How does one local slope become a predictive model?",
    "why": "Derivatives turn nearby changes into a linear approximation and explain how rates propagate through products and compositions.",
    "outcomes": [
      "Derive a quadratic's local model and its error.",
      "Explain product and chain rules using increments.",
      "Differentiate oscillations and recognize failures of differentiability."
    ],
    "checkpoints": [
      {
        "bridge": "Keep the linear part of a small displacement.",
        "meaning": "A derivative is a local coefficient with output-per-input units; the remainder must be smaller than the input step.",
        "question": "For x = At², what error remains after the tangent prediction over h?",
        "answer": "The exact error is Ah².",
        "further": [
          {
            "question": "What are the units of dx/dt?",
            "answer": "Length divided by time, because the derivative is a limit of displacement/time ratios."
          },
          {
            "question": "Does a zero slope mean the function is locally constant?",
            "answer": "No. Higher-order changes can remain, as with t² at zero."
          },
          {
            "question": "Why can a tangent prediction fail far away?",
            "answer": "The neglected remainder need not remain small over a large interval."
          }
        ]
      },
      {
        "bridge": "Track each route by which the output changes.",
        "meaning": "A product has two first-order contributions, and a composition transmits one rate through another.",
        "question": "Why is the derivative of a product not the product of the derivatives?",
        "answer": "Either factor can change while the other retains its current value; those two contributions add.",
        "further": [
          {
            "question": "What happens to the product of the two increments?",
            "answer": "It is second order in the input step and disappears from the first-order derivative limit."
          },
          {
            "question": "What factor appears for the inside function 3u + 1?",
            "answer": "A factor of 3, because that intermediate value changes three times as fast as u."
          },
          {
            "question": "Where is the outside derivative evaluated?",
            "answer": "At g(u), the actual intermediate output, not at u unless they coincide."
          }
        ]
      },
      {
        "bridge": "Apply local rates to circle projections.",
        "meaning": "Radian geometry supplies trigonometric derivatives, while corners and stationary points require interpretation.",
        "question": "Does derivative zero prove a maximum?",
        "answer": "No. For example, u³ has zero derivative at zero but continues increasing.",
        "further": [
          {
            "question": "Why does differentiating a cosine signal introduce ω?",
            "answer": "The phase changes at angular rate ω, so the chain rule contributes that factor."
          },
          {
            "question": "Why does degree input introduce π/180?",
            "answer": "The numerical input must first be converted to radians; differentiating that conversion gives π/180."
          },
          {
            "question": "Why is |u| not differentiable at zero?",
            "answer": "The left and right secant slopes approach −1 and +1, so no unique slope exists."
          }
        ]
      }
    ],
    "takeaway": "A derivative is the first-order response to a small input change; its rules record how that response travels through a formula.",
    "nextConnection": "A rate proportional to the current amount leads to exponentials and a natural logarithmic measure of change."
  },
  "diagnostics": [
    {
      "id": "d-limit",
      "prompt": "Find lim(h → 0) (6 + 2h). Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 6,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "The linear expression approaches 6 from both sides.",
      "hint": "Read its nearby behaviour.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Read its nearby behaviour.",
        "misconceptions": []
      },
      "prerequisiteId": "limits"
    },
    {
      "id": "d-sine",
      "prompt": "Evaluate sin(π/2). Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 1,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "The unit-circle vertical coordinate at a quarter turn is 1.",
      "hint": "Use radians.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Use radians.",
        "misconceptions": []
      },
      "prerequisiteId": "trigonometry"
    }
  ],
  "workedExample": {
    "title": "Predict a small change through a composition",
    "problem": "A dimensionless response is y(u) = (2u + 1)². At u = 1, predict y(1.05) using a derivative and check the exact error.",
    "steps": [
      {
        "title": "Establish the base value",
        "body": "y(1) = 3² = 9.",
        "reason": "A tangent model needs a starting value as well as a slope.",
        "trap": "The derivative alone is not the output."
      },
      {
        "title": "Propagate the rate",
        "body": "y′(u) = 2(2u + 1) × 2, so y′(1) = 12.",
        "reason": "The chain rule includes the rate of the inner expression.",
        "trap": "Dropping the inner factor would halve the slope."
      },
      {
        "title": "Make the local prediction",
        "body": "With h = 0.05, y(1.05) ≈ 9 + 12(0.05) = 9.6.",
        "reason": "Use slope times input change.",
        "trap": "Do not multiply the slope by the full input 1.05."
      },
      {
        "title": "Measure the neglected part",
        "body": "The exact value is 3.1² = 9.61, giving error 0.01 = 4h².",
        "reason": "Expansion identifies the curvature contribution and tests the approximation.",
        "trap": "Do not claim the tangent value is exact."
      }
    ]
  },
  "fadedExercise": {
    "prompt": "Use a local model for q(u) = (3u − 1)² at u = 1 to estimate q(1.02).",
    "supplied": [
      {
        "heading": "Support",
        "body": "The inside derivative is 3. The exact increment contains a remainder 9h²."
      }
    ],
    "steps": [
      {
        "id": "f-base",
        "prompt": "Calculate q(1). Enter unit 1.",
        "answer": {
          "kind": "numeric",
          "value": 4,
          "unit": "1",
          "acceptedUnits": [
            "1"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "(3 − 1)² = 4.",
        "hint": "Evaluate the starting output.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Evaluate the starting output.",
          "misconceptions": []
        }
      },
      {
        "id": "f-slope",
        "prompt": "Using q′(u) = 6(3u − 1), find q′(1). Enter unit 1.",
        "answer": {
          "kind": "numeric",
          "value": 12,
          "unit": "1",
          "acceptedUnits": [
            "1"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "6 × 2 = 12.",
        "hint": "Use the chain rule's inner factor.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Use the chain rule's inner factor.",
          "misconceptions": []
        }
      },
      {
        "id": "f-predict",
        "prompt": "With q(1) = 4, slope 12 and h = 0.02, give the tangent prediction. Enter unit 1.",
        "answer": {
          "kind": "numeric",
          "value": 4.24,
          "unit": "1",
          "acceptedUnits": [
            "1"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "4 + 12 × 0.02 = 4.24.",
        "hint": "Add the predicted increment.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Add the predicted increment.",
          "misconceptions": []
        }
      },
      {
        "id": "f-error",
        "prompt": "Calculate the exact remainder 9h² at h = 0.02. Enter unit 1.",
        "answer": {
          "kind": "numeric",
          "value": 0.0036,
          "unit": "1",
          "acceptedUnits": [
            "1"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "9 × 0.0004 = 0.0036.",
        "hint": "Square the interval, not the slope.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Square the interval, not the slope.",
          "misconceptions": []
        }
      }
    ]
  },
  "retrievalProblems": [
    {
      "id": "r-power",
      "prompt": "Find the derivative of u³ at u = 2. Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 12,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "The derivative is 3u², giving 12.",
      "hint": "Apply the power rule.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Apply the power rule.",
        "misconceptions": []
      }
    },
    {
      "id": "r-product",
      "prompt": "The derivative of f(u)g(u) is:",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "f′g′"
          },
          {
            "id": "1",
            "label": "f′g + fg′"
          },
          {
            "id": "2",
            "label": "f′ + g′"
          }
        ]
      },
      "solution": "There is one first-order contribution from each changing factor.",
      "hint": "Think of the two added strips.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Think of the two added strips.",
        "misconceptions": []
      }
    },
    {
      "id": "r-chain",
      "prompt": "Find d/du [(5u)²] at u = 1. Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 50,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "The expression is 25u², whose derivative is 50u; the chain rule gives the same result.",
      "hint": "Include the inside rate 5.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Include the inside rate 5.",
        "misconceptions": []
      }
    },
    {
      "id": "r-corner",
      "prompt": "At u = 0, |u| is:",
      "answer": {
        "kind": "choice",
        "value": "2",
        "options": [
          {
            "id": "0",
            "label": "Differentiable but discontinuous"
          },
          {
            "id": "1",
            "label": "Neither continuous nor differentiable"
          },
          {
            "id": "2",
            "label": "Continuous but not differentiable"
          }
        ]
      },
      "solution": "The values meet, but the slopes do not.",
      "hint": "Compare one-sided slopes.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Compare one-sided slopes.",
        "misconceptions": []
      }
    },
    {
      "id": "r-oscillation",
      "prompt": "For x(t) = 2 cos(3t) m, find velocity at t = π/6 s.",
      "answer": {
        "kind": "numeric",
        "value": -6,
        "unit": "m/s",
        "acceptedUnits": [
          "m/s"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "Velocity is −6 sin(3t); at π/6 the sine is 1.",
      "hint": "Differentiate the phase too.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Differentiate the phase too.",
        "misconceptions": []
      }
    },
    {
      "id": "r-zero",
      "prompt": "A sensor response has derivative zero at one input. What follows?",
      "answer": {
        "kind": "choice",
        "value": "0",
        "options": [
          {
            "id": "0",
            "label": "Its first-order change vanishes there"
          },
          {
            "id": "1",
            "label": "Its output is zero"
          },
          {
            "id": "2",
            "label": "It must have a maximum"
          }
        ]
      },
      "solution": "Zero derivative removes the linear increment but does not determine the value or all higher-order behaviour.",
      "hint": "Separate slope from height.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Separate slope from height.",
        "misconceptions": []
      }
    }
  ],
  "diagram": {
    "title": "A tangent models a quadratic locally",
    "caption": "Dimensionless y = u² near u = 2. The straight line y = 4u − 4 agrees in value and slope at (2,4); sampled segments show the quadratic rising above it.",
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
          280
        ],
        "to": [
          550,
          280
        ],
        "tone": "muted"
      },
      {
        "kind": "line",
        "from": [
          60,
          280
        ],
        "to": [
          60,
          25
        ],
        "tone": "muted"
      },
      {
        "kind": "line",
        "from": [
          160,
          280
        ],
        "to": [
          460,
          40
        ],
        "tone": "muted"
      },
      {
        "kind": "line",
        "from": [
          160,
          260
        ],
        "to": [
          210,
          235
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          210,
          235
        ],
        "to": [
          260,
          200
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          260,
          200
        ],
        "to": [
          310,
          155
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          310,
          155
        ],
        "to": [
          360,
          100
        ],
        "tone": "accent"
      },
      {
        "kind": "point",
        "at": [
          260,
          200
        ],
        "label": "(2, 4)",
        "tone": "accent"
      },
      {
        "kind": "label",
        "at": [
          368,
          95
        ],
        "text": "quadratic"
      },
      {
        "kind": "label",
        "at": [
          380,
          180
        ],
        "text": "tangent"
      },
      {
        "kind": "label",
        "at": [
          510,
          307
        ],
        "text": "u"
      }
    ]
  },
  "sidebars": [
    {
      "heading": "Optional: why the sine limit is geometric",
      "body": "For 0 < h < π/2 on a unit circle, comparing a triangle, circular sector and tangent triangle gives sin h < h < tan h. Dividing and rearranging gives cos h < sin h/h < 1. As h shrinks, cosine approaches one, so the trapped ratio approaches one too. Symmetry supplies the negative side. This argument depends on h being the arc-based radian measure."
    }
  ],
  "sources": [
    {
      "title": "MIT OpenCourseWare · Single Variable Calculus",
      "url": "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/"
    }
  ]
};
export default chapter;
