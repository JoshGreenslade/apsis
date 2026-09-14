import type { Chapter } from "../chapter";
const chapter: Chapter = {
  "id": "integrals",
  "intuition": {
    "body": "A motion sensor reports velocity rather than position. During a short interval in which the velocity hardly changes, displacement is approximately velocity times duration. Adding these little displacements reconstructs the motion over a longer interval. Integration makes that accumulation precise while allowing the rate to vary continuously.\n\nThe signs matter. A negative velocity contributes negative displacement, so a trip out and back can have zero net displacement even though the particle travels a substantial distance. An integral is a signed accumulation; calling it simply “area under a graph” can conceal that distinction.\n\nThere is also a surprising connection to differentiation. If an accumulated amount is built from a rate, then extending the endpoint by a short duration adds approximately the current rate times that duration. The derivative of the accumulation should therefore recover the original rate. This is the reason integration can often be performed by finding a function with a known derivative.\n\nWe will develop that reasoning before using antiderivative shortcuts. The fundamental theorem of calculus is a bridge between two ideas: adding many small contributions and reversing differentiation. Knowing both sides of the bridge lets us use the shortcut without forgetting what quantity it calculates.",
    "thoughtExperiments": [
      "If a particle moves forward and then returns to its starting point, which is zero: distance travelled, displacement or both?",
      "Why should moving only the upper endpoint of an accumulation reveal the rate at that endpoint?"
    ]
  },
  "theory": [
    {
      "heading": "1. Build a total from signed small contributions",
      "body": "Partition a time interval $[a,b]$ into small pieces. If piece i has duration $\\Delta t_i$ and we sample velocity at a time $t_i^*$ within it, the approximate displacement is $v(t_i^*)\\Delta t_i$. Add the contributions:\n$$\\sum_{i=1}^n v(t_i^*)\\Delta t_i.$$\nThe summation symbol means to add one term for each piece. The sample values may differ because velocity changes, and the intervals need not all have equal width.\n\nIf these sums approach one common value as the largest interval width tends to zero, independent of the permitted sample choices, that value is the definite integral $\\int_a^b v(t)\\,dt$. The dt indicates the input variable whose small intervals are being accumulated. It is not an unexplained decoration: changing the integration variable changes how interval widths are represented.\n\nFor continuous velocity on a finite closed interval, the integral exists. Piecewise continuous functions with finitely many finite jumps are also integrable. Not every arbitrary function has a Riemann integral, but continuous and simple piecewise smooth physical models cover the cases we need now. Later improper integrals will handle infinite ranges and certain singularities by an additional limiting procedure.\n\nEach rectangle above the horizontal axis adds positively; a rectangle below subtracts. The integral has units of the function times units of its input. Integrating metres per second over seconds gives metres. Integrating a dimensionless signal over time gives time, which is different from integrating velocity. Axis labels determine the meaning of the geometric area.\n\nFor a simple numerical example, let $v(t)=2t\\,\\mathrm{m/s}$ when t is entered in seconds, on zero to two seconds. Four half-second intervals with right endpoint samples give $(1+2+3+4)(0.5)=5$ m. Left endpoint samples give $(0+1+2+3)(0.5)=3$ m. Since the velocity increases, the exact accumulation lies between them. Refining the partition narrows the discrepancy toward the actual value, four metres.\n\nThat example also explains why one rectangle at the final velocity is usually not enough. Multiplying four metres per second by two seconds gives eight metres, as if the particle had moved at its final velocity for the whole interval. Integration remembers the changing rate throughout the interval."
    },
    {
      "heading": "2. Why accumulation differentiates back to the rate",
      "body": "Define an accumulation function $F(t)=\\int_a^t v(s)\\,ds$. The letter s is a dummy variable inside the integral, while t marks the moving upper endpoint. Changing t changes the interval being accumulated. The lower endpoint a remains fixed and fixes the convention $F(a)=0$.\n\nOver a small positive step h,\n$$F(t+h)-F(t)=\\int_t^{t+h}v(s)\\,ds.$$\nDivide by h. The quotient is the average value of v over that short interval. If v is continuous at t, its values throughout a sufficiently short interval are close to v(t); their average must be close too. The same reasoning works from the other side. Thus $F'(t)=v(t)$ wherever v is continuous.\n\nThis is the first part of the fundamental theorem. It does not depend on already knowing a formula for F. Accumulation itself constructs a function whose derivative is the rate. The continuity condition explains why a jump in the rate requires care: an accumulated function can remain continuous even where its derivative fails to exist.\n\nNow suppose G is any antiderivative of v, meaning $G'(t)=v(t)$. Since F and G have the same derivative throughout the interval, their difference is constant. Evaluating at the endpoints gives the computational form\n$$\\int_a^b v(t)\\,dt=G(b)-G(a).$$\nThis is not “plugging bounds into the integrand.” It is evaluating a function whose derivative equals that integrand, then subtracting its endpoint values.\n\nFor $v(t)=2t$ in consistent numerical units, an antiderivative is $G(t)=t^2$. The displacement from zero to two seconds is $2^2-0^2=4$ m, agreeing with the refined sum. Adding an arbitrary constant to G changes both endpoint values equally, so it cancels from their difference.\n\nAn indefinite integral denotes the family of antiderivatives, such as $\\int2t\\,dt=t^2+C$. A definite integral denotes a number for fixed bounds, with physical units if appropriate. The arbitrary constant matters when recovering a full position function from velocity: a known initial position selects it. The accumulation from a to t gives a change, so the actual position is $x(t)=x(a)+F(t)$."
    },
    {
      "heading": "3. Bounds, reversals and the quantity actually accumulated",
      "body": "Splitting an interval preserves its total: $\\int_a^c v\\,dt=\\int_a^b v\\,dt+\\int_b^c v\\,dt$. Reversing its orientation reverses its sign, $\\int_b^a v\\,dt=-\\int_a^b v\\,dt$, and identical endpoints give zero. These rules match displacement: going from the later state back to the earlier one changes the sign of the coordinate difference.\n\nConsider $v(t)=2-t$ in metres per second with t entered in seconds, from zero to four seconds. Velocity is positive until two seconds and negative afterward. The first half contributes the area of a triangle, +2 m; the second contributes −2 m. Net displacement is zero. The distance travelled is instead $\\int_0^4|v(t)|\\,dt=4$ m because distance counts both directions positively.\n\nTaking the absolute value after integrating does not repair the distinction. Here $|\\int v\\,dt|=0$, while $\\int|v|\\,dt=4$ m. To compute distance, change the integrand to speed before accumulating, splitting at sign changes if necessary. The mathematical operation depends on which physical question is asked.\n\nThe average value of a rate on $[a,b]$ with b greater than a is $\\bar v=(b-a)^{-1}\\int_a^b v\\,dt$. This is the constant rate that would produce the same total over the same duration. It need not be the average of the two endpoint readings; that shortcut works for a linear rate but not in general.\n\nExponential rates provide another useful case. If a signal contributes material at rate $q(t)=q_0e^{-\\lambda t}$, with positive λ, an antiderivative is $-q_0e^{-\\lambda t}/\\lambda$. Accumulating from zero to T gives $q_0(1-e^{-\\lambda T})/\\lambda$. The units are rate divided by inverse time, hence an amount. The expression starts at zero, increases, and remains below $q_0/\\lambda$, consistent with a diminishing positive rate.\n\nThese checks should accompany the algebra. The sign should agree with the rate's sign and bound orientation, the units should represent the accumulated quantity, and a zero-duration interval should contribute nothing. Finding an antiderivative is only the computational middle of a calculation; identifying what to accumulate and interpreting its endpoints complete the argument."
    }
  ],
  "teaching": {
    "question": "Why can adding rates be done by reversing differentiation?",
    "why": "The fundamental theorem connects signed accumulation to local change and lets us recover totals without losing their physical meaning.",
    "outcomes": [
      "Interpret definite integrals as limits of signed sums.",
      "Explain why an accumulation function differentiates to its continuous rate.",
      "Distinguish displacement, distance, average rate and initial-value information."
    ],
    "checkpoints": [
      {
        "bridge": "Add the contribution from each short interval.",
        "meaning": "The limiting sum keeps the function's sign and multiplies its units by input units.",
        "question": "Why do left and right sums bracket the integral of an increasing rate?",
        "answer": "Left samples underestimate each interval's rate and right samples overestimate it.",
        "further": [
          {
            "question": "Must intervals have equal widths?",
            "answer": "No. Each contribution uses its own width; refinement requires the largest width to shrink."
          },
          {
            "question": "What are the units of an integral of velocity over time?",
            "answer": "Metres per second multiplied by seconds gives metres."
          },
          {
            "question": "Why is final velocity times total time generally wrong?",
            "answer": "It treats the final rate as though it applied throughout the interval."
          }
        ]
      },
      {
        "bridge": "Move the accumulation's endpoint.",
        "meaning": "The extra short interval contributes its local rate times its width, so accumulation differentiates to that rate.",
        "question": "Why does F′(t) equal v(t) when v is continuous?",
        "answer": "Its difference quotient is the average rate over a shrinking interval, which approaches the local value.",
        "further": [
          {
            "question": "Where do the bounds go in the computational theorem?",
            "answer": "Into an antiderivative, followed by upper-minus-lower subtraction."
          },
          {
            "question": "Why does the integration constant cancel?",
            "answer": "The same constant appears at both endpoints."
          },
          {
            "question": "What selects the constant in a recovered position function?",
            "answer": "A specified position at a specified time, such as the initial position."
          }
        ]
      },
      {
        "bridge": "Choose the integrand that matches the physical question.",
        "meaning": "Velocity gives signed displacement, whereas speed gives nonnegative distance.",
        "question": "Can zero displacement coexist with nonzero distance?",
        "answer": "Yes. Outward and returning displacements cancel, while their travelled lengths add.",
        "further": [
          {
            "question": "What does reversing bounds do?",
            "answer": "It changes the integral's sign."
          },
          {
            "question": "Is the absolute integral of velocity always the distance?",
            "answer": "No. The absolute value must be inside the integral to count both directions positively."
          },
          {
            "question": "What does dividing a total by its interval duration produce?",
            "answer": "The average rate that would yield that total if held constant."
          }
        ]
      }
    ],
    "takeaway": "An integral accumulates the chosen signed quantity; the fundamental theorem evaluates that accumulation using an antiderivative and endpoints.",
    "nextConnection": "Substitution and integration by parts will reverse the chain and product rules to make harder accumulations tractable."
  },
  "diagnostics": [
    {
      "id": "d-antiderivative",
      "prompt": "The derivative of t² is 2t. Evaluate that derivative at t = 3. Enter unit 1.",
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
      "solution": "2 × 3 = 6.",
      "hint": "Recover the familiar local rate.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Recover the familiar local rate.",
        "misconceptions": []
      },
      "prerequisiteId": "derivatives"
    },
    {
      "id": "d-exp",
      "prompt": "The derivative of e^(−2t) is:",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "e^(−2t)"
          },
          {
            "id": "1",
            "label": "−2e^(−2t)"
          },
          {
            "id": "2",
            "label": "−e^(−2t)/2"
          }
        ]
      },
      "solution": "The chain rule multiplies by the exponent's rate −2.",
      "hint": "Use the exponential rate rule.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the exponential rate rule.",
        "misconceptions": []
      },
      "prerequisiteId": "exponentials"
    }
  ],
  "workedExample": {
    "title": "A trip that returns to its start",
    "problem": "A particle has velocity v(t) = 3 − t m/s, with t in seconds, from t = 0 to t = 6. It starts at x = 5 m. Find final position and total distance.",
    "steps": [
      {
        "title": "Find the direction change",
        "body": "v = 0 at t = 3 s; velocity is positive before and negative after.",
        "reason": "Distance needs a split wherever direction changes.",
        "trap": "Do not infer direction from the position value."
      },
      {
        "title": "Accumulate signed velocity",
        "body": "An antiderivative is 3t − t²/2. Its change from 0 to 6 is 18 − 18 = 0 m.",
        "reason": "The fundamental theorem gives net displacement.",
        "trap": "Zero displacement does not mean no motion."
      },
      {
        "title": "Restore the starting position",
        "body": "x(6) = 5 m + 0 m = 5 m.",
        "reason": "The integral gives change, not an absolute coordinate.",
        "trap": "Do not omit the initial position."
      },
      {
        "title": "Count travelled lengths",
        "body": "Each half contributes a triangle of area (3 s)(3 m/s)/2 = 4.5 m in magnitude, giving 9 m total.",
        "reason": "Integrate speed, or add the absolute displacement of each monotone segment.",
        "trap": "Taking the absolute value of the net displacement would still give zero."
      }
    ]
  },
  "fadedExercise": {
    "prompt": "A particle has v(t) = 2 − t m/s from t = 0 to t = 4 s and begins at x = −3 m. Find its reversal, displacement, final position and distance.",
    "supplied": [
      {
        "heading": "Antiderivative",
        "body": "Use G(t) = 2t − t²/2 in consistent metre-second numerical units. Split distance at the velocity zero."
      }
    ],
    "steps": [
      {
        "id": "f-turn",
        "prompt": "Solve 2 − t = 0 for the reversal time.",
        "answer": {
          "kind": "numeric",
          "value": 2,
          "unit": "s",
          "acceptedUnits": [
            "s"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "The velocity changes sign at 2 s.",
        "hint": "Locate zero velocity.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Locate zero velocity.",
          "misconceptions": []
        }
      },
      {
        "id": "f-displacement",
        "prompt": "Calculate G(4) − G(0) using G(t) = 2t − t²/2.",
        "answer": {
          "kind": "numeric",
          "value": 0,
          "unit": "m",
          "acceptedUnits": [
            "m"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "8 − 8 = 0 m.",
        "hint": "Use signed endpoint subtraction.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Use signed endpoint subtraction.",
          "misconceptions": []
        }
      },
      {
        "id": "f-position",
        "prompt": "With initial position −3 m and displacement 0 m, find final position.",
        "answer": {
          "kind": "numeric",
          "value": -3,
          "unit": "m",
          "acceptedUnits": [
            "m"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "Initial position plus displacement is −3 m.",
        "hint": "Keep change separate from coordinate.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Keep change separate from coordinate.",
          "misconceptions": []
        }
      },
      {
        "id": "f-distance",
        "prompt": "Each monotone half lasts 2 s and has a triangular speed graph of height 2 m/s. Find total distance.",
        "answer": {
          "kind": "numeric",
          "value": 4,
          "unit": "m",
          "acceptedUnits": [
            "m"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "Each half contributes 2 m; together they give 4 m.",
        "hint": "Count both directions positively.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Count both directions positively.",
          "misconceptions": []
        }
      }
    ]
  },
  "retrievalProblems": [
    {
      "id": "r-meaning",
      "prompt": "The definite integral of a signed rate gives:",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "Its largest value"
          },
          {
            "id": "1",
            "label": "Its net accumulation"
          },
          {
            "id": "2",
            "label": "Always a positive area"
          }
        ]
      },
      "solution": "Negative contributions subtract from positive contributions.",
      "hint": "Keep the integrand's sign.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Keep the integrand's sign.",
        "misconceptions": []
      }
    },
    {
      "id": "r-power",
      "prompt": "Evaluate the integral of 2t from 1 to 3. Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 8,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "The antiderivative t² gives 9 − 1 = 8.",
      "hint": "Use upper minus lower.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Use upper minus lower.",
        "misconceptions": []
      }
    },
    {
      "id": "r-reverse",
      "prompt": "If the integral from 2 to 5 is 7, what is the integral from 5 to 2? Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": -7,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "Reversing orientation reverses sign.",
      "hint": "Swap bounds consistently.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Swap bounds consistently.",
        "misconceptions": []
      }
    },
    {
      "id": "r-ftc",
      "prompt": "For continuous q, the derivative of ∫₀ᵗ q(s) ds is:",
      "answer": {
        "kind": "choice",
        "value": "0",
        "options": [
          {
            "id": "0",
            "label": "q(t)"
          },
          {
            "id": "1",
            "label": "q′(t)"
          },
          {
            "id": "2",
            "label": "q(0)"
          }
        ]
      },
      "solution": "The added short interval samples the local rate at the moving endpoint.",
      "hint": "Use the accumulation theorem.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the accumulation theorem.",
        "misconceptions": []
      }
    },
    {
      "id": "r-average",
      "prompt": "A signed displacement is 12 m over 4 s. Find average velocity.",
      "answer": {
        "kind": "numeric",
        "value": 3,
        "unit": "m/s",
        "acceptedUnits": [
          "m/s"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "12/4 = 3 m/s.",
      "hint": "Divide the total by duration.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Divide the total by duration.",
        "misconceptions": []
      }
    },
    {
      "id": "r-distance",
      "prompt": "Which expression gives distance along a one-dimensional trajectory?",
      "answer": {
        "kind": "choice",
        "value": "2",
        "options": [
          {
            "id": "0",
            "label": "|∫v dt|"
          },
          {
            "id": "1",
            "label": "∫v dt + x₀"
          },
          {
            "id": "2",
            "label": "∫|v| dt"
          }
        ]
      },
      "solution": "Speed is |v|, so its integral adds lengths without cancellation.",
      "hint": "Choose the integrand before accumulating.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Choose the integrand before accumulating.",
        "misconceptions": []
      }
    }
  ],
  "diagram": {
    "title": "Velocity can cancel while distance adds",
    "caption": "For v = 2 − t, the line crosses zero at t = 2 s. The positive triangle contributes +2 m and the negative triangle −2 m over 0 to 4 s.",
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
          160
        ],
        "to": [
          550,
          160
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
          35
        ],
        "tone": "muted"
      },
      {
        "kind": "line",
        "from": [
          60,
          60
        ],
        "to": [
          460,
          260
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          460,
          160
        ],
        "to": [
          460,
          260
        ],
        "tone": "muted"
      },
      {
        "kind": "point",
        "at": [
          260,
          160
        ],
        "label": "t = 2",
        "tone": "accent"
      },
      {
        "kind": "label",
        "at": [
          108,
          115
        ],
        "text": "+2 m"
      },
      {
        "kind": "label",
        "at": [
          338,
          214
        ],
        "text": "−2 m"
      },
      {
        "kind": "label",
        "at": [
          490,
          151
        ],
        "text": "t (s)"
      },
      {
        "kind": "label",
        "at": [
          78,
          35
        ],
        "text": "v (m/s)"
      }
    ]
  },
  "sidebars": [
    {
      "heading": "At a jump in the rate",
      "body": "An integral of a bounded piecewise continuous rate remains continuous as its upper endpoint moves. At a jump, however, its left and right derivative values can differ. The accumulation does not jump instantaneously merely because its rate does; it develops a corner."
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
