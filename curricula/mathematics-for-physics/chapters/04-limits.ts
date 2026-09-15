import type { Chapter } from "../chapter";
const chapter: Chapter = {
  theoreticalMinimum: { coreIdea: "A limit describes the value approached by a function without pretending that the approaching variable has already reached its destination. This lets us reason about a hole, a sharp change, or an infinitesimal process while keeping the difference between a nearby value and the value at the point explicit.", widerConnection: "That distinction makes derivatives, continuity, approximation, and singular behaviour precise rather than merely intuitive. Whenever a later argument takes a small-parameter or infinite-time limit, the same question returns: what is approaching what, and under which conditions does the limit exist?" },
  "id": "limits",
  "intuition": {
    "body": "A camera can estimate a particle's average velocity between two frames: subtract positions and divide by elapsed time. But “velocity at this instant” appears to ask for two positions at the same time. Directly taking a zero time interval gives a meaningless division by zero. The useful idea is to examine what the average velocities approach while their intervals remain nonzero.\n\nSuppose the prescribed trajectory is $x(t)=t^2$ in metre-second numerical units. Around one second, measurements over increasingly short forward intervals give average velocities 3, 2.1 and 2.01 m/s. These are not equal, but they point toward a definite number. A limit makes the phrase “point toward” precise enough to support further reasoning.\n\nThe limiting number is not obtained by pretending that the final nonzero interval equals zero. Every calculation is performed at an allowed input; then we describe the behaviour as that input approaches a target. This distinction lets us analyze formulas with a hole at the target, and also recognize when no single answer emerges.\n\nA useful way to make the idea operational is to attach an error tolerance to it. Saying that a quantity approaches L means that, once the input is close enough, the output can be forced within any requested tolerance of L. The required closeness may depend on the tolerance, and that dependence is information: it tells us how rapidly the approximation becomes reliable. In numerical physics this is the difference between a graph that looks settled and an error estimate that guarantees it.\n\nLimits are therefore about nearby behaviour. The value assigned at the target is a separate issue. Sometimes nearby behaviour agrees with that value, giving continuity. Sometimes it does not. We will use this distinction to separate a missing data point from a genuine jump and a smooth trajectory from one that changes direction sharply.",
    "thoughtExperiments": [
      "Can a formula have a well-defined limiting value at a point where the formula itself is undefined?",
      "If increasingly close observations from the left and right approach different values, could taking still more observations produce one two-sided limit?"
    ]
  },
  "theory": [
    {
      "heading": "1. Approach a target without substituting it too soon",
      "body": "For a time interval $h$ beginning at $t=1$, the average velocity of the quadratic trajectory is\n$$\\frac{x(1+h)-x(1)}h=\\frac{(1+h)^2-1}{h}=\\frac{2h+h^2}{h}=2+h,$$\nwith the appropriate metre-second units understood. The last cancellation is valid for $h\\ne0$. That is exactly the situation we are studying: intervals can be arbitrarily short without being zero. As $h$ approaches zero, $2+h$ approaches two.\n\nWe write $\\lim_{h\\to0}(2+h)=2$. The arrow describes a process of approaching, not an instruction to equate $h$ with zero inside every earlier expression. The original quotient is undefined at zero; its limit exists nonetheless. The simplified expression agrees with it at every nearby nonzero input, and that agreement is enough to determine the limit.\n\nHow confident can we be from a few numbers? A table suggests a candidate but is not a general argument. In this example the error from the proposed limiting velocity is exactly $|h|$ in the chosen numerical units. To make that error less than 0.001, choose any nonzero interval with $|h|<0.001$. This controls all sufficiently small intervals, not just the few entries that happened to be calculated.\n\nGeometrically, each average velocity is the slope of a secant line through two points of the position graph. As the second point approaches the first, the slopes approach the slope of a tangent. The tangent is a local description of the curve at the first point, not necessarily a line touching the graph only once in the whole picture. A tangent may cross the curve elsewhere, or even at the point of tangency.\n\nNegative $h$ compares a point before one second with the point at one second. The same expression $2+h$ approaches two from that side. Agreement of the two directions matters. A forward sequence alone cannot establish that every nearby approach behaves alike."
    },
    {
      "heading": "2. Distinguish holes, jumps and unbounded behaviour",
      "body": "Consider $f(u)=(u^2-1)/(u-1)$ for $u\\ne1$. Factoring gives $f(u)=u+1$ wherever the original function is defined. Its limit at one is therefore two. Graphically this is a straight line with a missing point at $(1,2)$. We can fill the hole by defining $f(1)=2$, but the limiting statement does not require us to do so.\n\nIf instead we define $f(1)=7$, the limit is still two. Changing a single target value leaves every nearby nonzero separation unchanged. The graph now contains an isolated point at height seven and a hole in the line at height two. This is a removable discontinuity: a single reassignment can make nearby behaviour agree with the target value.\n\nA jump is different. Let $g(u)=0$ for $u<0$ and $g(u)=1$ for $u\\ge0$. Approaching zero from the left gives limit zero; approaching from the right gives limit one. These are called one-sided limits. There is no two-sided limit because there is no single number approached from both sides. Choosing a new value for $g(0)$ cannot join the two nearby behaviours.\n\nUnbounded behaviour is different again. As $u$ approaches zero through positive values, $1/u$ exceeds any fixed positive bound. We often write that its right-hand limit is $+\\infty$. This describes growth without bound; infinity is not an ordinary real number to substitute into arithmetic. From negative values the function tends toward $-\\infty$, so even the directional behaviour differs.\n\nA function may fail to have a limit while remaining bounded. A signal that keeps oscillating between different heights over every sufficiently small neighbourhood never settles toward one height. A bounded graph alone is not enough. What matters is whether every input close enough to the target forces the output close enough to one proposed value.\n\nThese distinctions are useful when interpreting data. A sensor's isolated faulty sample, a genuine abrupt switch and a model that diverges near a boundary call for different responses. Mathematics provides the categories, but identifying which describes a physical experiment requires evidence and an appropriate model."
    },
    {
      "heading": "3. Continuity links the limiting prediction to the value",
      "body": "A function is continuous at an interior point $a$ when it is defined there, has a two-sided limit there, and that limit equals $f(a)$. This joins three requirements that are easy to blur together. The missing-point function fails the first; a jump fails the second; a deliberately misplaced target value fails the third. At an endpoint of a domain, continuity uses the approach available within that domain.\n\nPolynomials are continuous at every real input. Sums, products and compositions of continuous functions remain continuous wherever the operations are defined; quotients require a nonzero denominator. These rules explain why ordinary substitution evaluates many limits. It succeeds because continuity has already connected the function value with nearby behaviour, not because limits universally mean substitution.\n\nContinuity says small enough input changes produce small output changes near the point. It does not say that every small input change everywhere produces the same-sized output change, or that a graph must look flat. The scale of “small enough” can depend on the point and on the demanded output accuracy. A steep but unbroken line is continuous.\n\nA continuous function on an interval cannot move from a negative value to a positive value without taking the value zero somewhere between them. This is the intermediate value property. If a continuous position model gives $x(0)=-1$ m and $x(2)=3$ m, it must cross the origin during that interval. The statement guarantees at least one crossing, but does not identify its time or guarantee only one crossing. Continuity, not merely the endpoint numbers, is the crucial assumption.\n\nContinuity also does not guarantee a well-defined tangent slope. The graph $f(u)=|u|$ is continuous at zero, yet its secant slopes there are $-1$ from the left and $+1$ from the right. The function values meet; the local rates do not. This is the difference between an unbroken trajectory and a differentiable one.\n\nOur next step will be to define a derivative as precisely such a limit of secant slopes. Limits let us make that definition without dividing by a zero interval, and the examples here tell us what can go wrong. Whenever a derivative is used, its existence is a claim about nearby behaviour that deserves checking at corners, jumps and model boundaries."
    }
  ],
  "teaching": {
    "question": "How can shrinking intervals define a precise instantaneous quantity?",
    "why": "Limits describe nearby behaviour without division by zero, and reveal when an apparent local prediction is not well defined.",
    "outcomes": [
      "Calculate a removable limit using nearby equality.",
      "Compare one-sided behaviour and diagnose continuity.",
      "Explain why continuity need not provide a unique tangent slope."
    ],
    "checkpoints": [
      {
        "bridge": "Shrink a camera interval while keeping it nonzero.",
        "meaning": "Cancellation can identify a limit even when the original quotient is undefined at the target.",
        "question": "Why is cancelling h legitimate in the quadratic secant calculation?",
        "answer": "Every interval used in the calculation has h ≠ 0; the limit concerns those nearby intervals.",
        "further": [
          {
            "question": "Why is a short numerical table not a proof of a limit?",
            "answer": "It samples only selected inputs. A limit must control every sufficiently close allowed input."
          },
          {
            "question": "What does the error 2 + h − 2 tell us?",
            "answer": "The numerical error equals h, so choosing |h| below a target tolerance controls the output error."
          },
          {
            "question": "Must a tangent touch a curve only once?",
            "answer": "No. Its defining role is the limiting local slope, not a restriction on distant intersections."
          }
        ]
      },
      {
        "bridge": "Separate the target value from its neighbourhood.",
        "meaning": "A hole can be filled, a jump has disagreeing one-sided limits, and divergence is not a finite limit.",
        "question": "What is the limit of (u² − 1)/(u − 1) at u = 1?",
        "answer": "It is 2 because the expression equals u + 1 at every nearby allowed input.",
        "further": [
          {
            "question": "Would assigning value 7 at u = 1 change that limit?",
            "answer": "No. It changes only the target value, not nearby behaviour."
          },
          {
            "question": "Can redefining a jump at one point remove it?",
            "answer": "No. The left and right limiting values remain different."
          },
          {
            "question": "Does tending to infinity mean reaching a very large real number?",
            "answer": "No. It means eventually exceeding every fixed bound in the specified approach."
          }
        ]
      },
      {
        "bridge": "Ask whether the actual value agrees with the approach.",
        "meaning": "Continuity connects values across nearby inputs, while a derivative additionally requires a unique limiting slope.",
        "question": "Is |u| continuous and differentiable at zero?",
        "answer": "It is continuous, but not differentiable: the left slope is −1 and the right slope +1.",
        "further": [
          {
            "question": "What extra assumption makes opposite endpoint signs guarantee a zero?",
            "answer": "Continuity throughout the intervening interval."
          },
          {
            "question": "Does the guarantee imply a unique zero?",
            "answer": "No. The function may cross zero several times."
          },
          {
            "question": "Why is substitution valid for a polynomial limit?",
            "answer": "Polynomials are continuous, so their nearby limit equals their value at the target."
          }
        ]
      }
    ],
    "takeaway": "A limit controls nearby values; continuity additionally matches the target value, and a tangent needs agreement of nearby slopes.",
    "nextConnection": "We can now define a derivative as a limit and use it to build a local linear model."
  },
  "diagnostics": [
    {
      "id": "d-evaluate",
      "prompt": "For f(u) = u², calculate f(1.1) − f(1). Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 0.21,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "1.21 − 1 = 0.21.",
      "hint": "Evaluate before subtracting.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Evaluate before subtracting.",
        "misconceptions": []
      },
      "prerequisiteId": "functions"
    },
    {
      "id": "d-domain",
      "prompt": "Where is 1/(u − 2) undefined?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "u = 0"
          },
          {
            "id": "1",
            "label": "u = 2"
          },
          {
            "id": "2",
            "label": "u = −2"
          }
        ]
      },
      "solution": "At u = 2 the denominator is zero.",
      "hint": "Check the function's domain.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Check the function's domain.",
        "misconceptions": []
      },
      "prerequisiteId": "functions"
    }
  ],
  "workedExample": {
    "title": "A removable hole",
    "problem": "Define f(u) = (u² − 4)/(u − 2) for u ≠ 2, and f(2) = 9. Find the limit at two and decide how to make the function continuous.",
    "steps": [
      {
        "title": "Identify the obstacle",
        "body": "At u = 2 the quotient would be 0/0, which is undefined.",
        "reason": "Direct substitution does not resolve this limit.",
        "trap": "0/0 is not equal to zero or one."
      },
      {
        "title": "Factor nearby",
        "body": "For u ≠ 2, f(u) = (u − 2)(u + 2)/(u − 2) = u + 2.",
        "reason": "Nearby equality determines nearby behaviour.",
        "trap": "The simplified rule does not automatically redefine the assigned target value."
      },
      {
        "title": "Take the limit",
        "body": "As u approaches 2, u + 2 approaches 4.",
        "reason": "The error from 4 is u − 2, which can be made arbitrarily small.",
        "trap": "The assigned value 9 is irrelevant to the nearby limit."
      },
      {
        "title": "Repair continuity",
        "body": "Set f(2) = 4 instead of 9.",
        "reason": "Continuity requires the target value to equal the limit.",
        "trap": "Do not alter the entire function when only one value causes the mismatch."
      }
    ]
  },
  "fadedExercise": {
    "prompt": "Let q(u) = (u² − 9)/(u − 3) for u ≠ 3, with q(3) = −1. Analyze its limit and continuity.",
    "supplied": [
      {
        "heading": "Algebraic support",
        "body": "Use u² − 9 = (u − 3)(u + 3). The target value is separately assigned."
      }
    ],
    "steps": [
      {
        "id": "f-factor",
        "prompt": "For u ≠ 3, q(u) equals:",
        "answer": {
          "kind": "choice",
          "value": "1",
          "options": [
            {
              "id": "0",
              "label": "u − 3"
            },
            {
              "id": "1",
              "label": "u + 3"
            },
            {
              "id": "2",
              "label": "1"
            }
          ]
        },
        "solution": "Cancel the nonzero factor u − 3 to obtain u + 3.",
        "hint": "Use the supplied factorization.",
        "rubric": {
          "defaultCategory": "conceptual",
          "explanation": "Use the supplied factorization.",
          "misconceptions": []
        }
      },
      {
        "id": "f-near",
        "prompt": "Using q(u) = u + 3 away from 3, find q(3.01). Enter unit 1.",
        "answer": {
          "kind": "numeric",
          "value": 6.01,
          "unit": "1",
          "acceptedUnits": [
            "1"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "3.01 + 3 = 6.01.",
        "hint": "Evaluate the nearby rule.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Evaluate the nearby rule.",
          "misconceptions": []
        }
      },
      {
        "id": "f-limit",
        "prompt": "Find the limit of q(u) as u approaches 3. Enter unit 1.",
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
        "solution": "u + 3 approaches 6 from either side.",
        "hint": "The value at u = 3 is a separate fact.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "The value at u = 3 is a separate fact.",
          "misconceptions": []
        }
      },
      {
        "id": "f-repair",
        "prompt": "What replacement value for q(3) makes the function continuous? Enter unit 1.",
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
        "solution": "Continuity requires q(3) to equal its limit, 6.",
        "hint": "Match value and limit.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Match value and limit.",
          "misconceptions": []
        }
      }
    ]
  },
  "retrievalProblems": [
    {
      "id": "r-zero",
      "prompt": "In a limit as h → 0, the secant interval h is:",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "Exactly zero in every quotient"
          },
          {
            "id": "1",
            "label": "Nonzero while approaching zero"
          },
          {
            "id": "2",
            "label": "Fixed at the smallest machine number"
          }
        ]
      },
      "solution": "The quotient is evaluated for nonzero intervals, then their behaviour is examined.",
      "hint": "Separate evaluation from approach.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Separate evaluation from approach.",
        "misconceptions": []
      }
    },
    {
      "id": "r-polynomial",
      "prompt": "Find lim(u → 2) (3u + 1). Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 7,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "The linear function is continuous, so 3 × 2 + 1 = 7.",
      "hint": "Use continuity.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Use continuity.",
        "misconceptions": []
      }
    },
    {
      "id": "r-jump",
      "prompt": "Left and right limits are 2 and 5. The two-sided limit is:",
      "answer": {
        "kind": "choice",
        "value": "2",
        "options": [
          {
            "id": "0",
            "label": "3.5"
          },
          {
            "id": "1",
            "label": "5"
          },
          {
            "id": "2",
            "label": "Nonexistent"
          }
        ]
      },
      "solution": "A single two-sided limit requires agreement.",
      "hint": "Do not average the sides.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Do not average the sides.",
        "misconceptions": []
      }
    },
    {
      "id": "r-hole",
      "prompt": "Changing only f(a) can change:",
      "answer": {
        "kind": "choice",
        "value": "0",
        "options": [
          {
            "id": "0",
            "label": "Continuity at a without changing the nearby limit"
          },
          {
            "id": "1",
            "label": "Every nearby limit automatically"
          },
          {
            "id": "2",
            "label": "The one-sided values at all other inputs"
          }
        ]
      },
      "solution": "The target assignment affects continuity but not values at nearby distinct inputs.",
      "hint": "Distinguish point value and approach.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Distinguish point value and approach.",
        "misconceptions": []
      }
    },
    {
      "id": "r-error",
      "prompt": "The approximation L(h) = 4 + 3h has limiting value 4. At h = 0.01, what is its absolute error? Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 0.03,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "|3 × 0.01| = 0.03.",
      "hint": "Subtract the limiting value.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Subtract the limiting value.",
        "misconceptions": []
      }
    },
    {
      "id": "r-transfer",
      "prompt": "A continuous signal is −2 at t = 0 and +2 at t = 1. What is guaranteed?",
      "answer": {
        "kind": "choice",
        "value": "2",
        "options": [
          {
            "id": "0",
            "label": "Exactly one zero"
          },
          {
            "id": "1",
            "label": "A zero at t = 0.5"
          },
          {
            "id": "2",
            "label": "At least one zero between the endpoints"
          }
        ]
      },
      "solution": "The intermediate value property guarantees a crossing, not its time or uniqueness.",
      "hint": "Use only what continuity establishes.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use only what continuity establishes.",
        "misconceptions": []
      }
    }
  ],
  "diagram": {
    "title": "A hole and a separate target value",
    "caption": "For u ≠ 2, f(u) = u + 2. The open circle marks the missing value (2,4); the filled point shows the assigned value f(2) = 9. Horizontal units are u, vertical units are f.",
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
          275
        ],
        "to": [
          550,
          275
        ],
        "tone": "muted"
      },
      {
        "kind": "line",
        "from": [
          60,
          275
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
          225
        ],
        "to": [
          255,
          176.25
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          265,
          173.75
        ],
        "to": [
          460,
          125
        ],
        "tone": "accent"
      },
      {
        "kind": "ellipse",
        "center": [
          260,
          175
        ],
        "rx": 5,
        "ry": 5,
        "tone": "accent"
      },
      {
        "kind": "point",
        "at": [
          260,
          50
        ],
        "label": "(2, 9)",
        "tone": "accent"
      },
      {
        "kind": "label",
        "at": [
          278,
          175
        ],
        "text": "hole at (2, 4)"
      },
      {
        "kind": "label",
        "at": [
          505,
          303
        ],
        "text": "u"
      },
      {
        "kind": "label",
        "at": [
          78,
          30
        ],
        "text": "f(u)"
      }
    ]
  },
  "sidebars": [
    {
      "heading": "Optional: the tolerance statement",
      "body": "A finite limit L at a means: for every positive output tolerance ε, there is a positive input tolerance δ such that 0 < |u − a| < δ implies |f(u) − L| < ε. The exclusion of zero separates a limit from the assigned target value. For f(u) = u + 2 at a = 2, choosing δ = ε works directly."
    }
  ],
  "sources": [
    {
      "title": "MIT OpenCourseWare · Single Variable Calculus",
      "url": "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/"
    }
  ]
};
chapter.sidebars.push({
  heading: "A limit can exist while convergence becomes impractically slow",
  body: String.raw`Consider the dimensionless family $f_n(x)=x^n$ on $0\leq x\leq1$. At any fixed $x<1$, repeatedly multiplying by a number smaller than one eventually makes the result approach zero. At $x=1$, every member of the family equals one. Thus the limiting function is zero below one and one at the endpoint.

Each finite-$n$ graph is continuous. How can its limit have a jump? The crucial words are “at any fixed x.” The number of repetitions needed to get close to zero depends on how close x is to one. For a tolerance $\varepsilon$ between zero and one, $x^n<\varepsilon$ requires $n>\ln(\varepsilon)/\ln(x)$ when $0<x<1$. As x approaches one, the required n grows without bound.

You can also choose a different point for each n: $x_n=2^{-1/n}$. These points approach one, yet $f_n(x_n)=1/2$ for every n. There is always a narrow region where the graph has not settled close to zero.

This example explains why a statement about every fixed point does not automatically give one accuracy guarantee across a whole interval. In physics, a small-parameter approximation may work throughout most of a region and fail near a boundary. Before replacing a family by its limit, ask where the error is controlled and whether the point of observation is changing too.`,
});

export default chapter;
