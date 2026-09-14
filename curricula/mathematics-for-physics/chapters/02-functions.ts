import type { Chapter } from "../chapter";
const chapter: Chapter = {
  "id": "functions",
  "intuition": {
    "body": "A camera records a particle moving along a straight track. Each frame pairs a clock reading with a position. Before asking how quickly the particle moves, we need to understand what kind of relationship the record represents. If the clock reads two seconds, the model should tell us one position. The same position may be visited at several different times; that does not make the forward prediction ambiguous.\n\nA function is a rule assigning exactly one output to each allowed input. The allowed inputs form its domain. This definition includes formulas, tables and experimentally specified rules. A formula is convenient, but the physical relationship is the central object. Knowing which inputs make sense is part of specifying that relationship, not a footnote to the algebra.\n\nFor a concrete model, suppose a particle starts at the origin and follows $x(t)=At^2$ for $0\\le t\\le3\\,\\mathrm s$, with $A=2\\,\\mathrm{m/s^2}$. This is a prescribed trajectory, not yet a deduction from a force law. It tells us that the positions at one, two and three seconds are two, eight and eighteen metres. We will use this simple rule to connect graphs, equations, inverse questions and changes of variable.\n\nThe example contains an important distinction. Evaluating the function asks where the particle is at a chosen time. Solving an equation asks which times give a chosen position. Those are different questions even when the same symbols occur in both. Learning to move between them deliberately will make later calculus much easier.",
    "thoughtExperiments": [
      "If the particle returns to an earlier position, has position stopped being a function of time?",
      "If a formula gives a real number at ten seconds but the experiment lasted only three, what additional claim would using that answer make?"
    ]
  },
  "theory": [
    {
      "heading": "1. Read a graph as paired measurements",
      "body": "Write a graph with time on the horizontal axis and position on the vertical axis. A point on it represents a pair $(t,x)$ satisfying the rule. For our model the point $(2,8)$ means eight metres at two seconds, with the axis units understood. The graph is curved because equal increments in time do not produce equal increments in position. From zero to one second the position changes by two metres; from one to two it changes by six; from two to three it changes by ten.\n\nThe graph's shape expresses a relationship, while its appearance also depends on the axis scales. Stretching the vertical axis makes the curve look steeper without changing any measurement. A slope calculated from axis values has units of position divided by time; a visual angle on the page has no such invariant physical meaning. This distinction will matter when slopes become rates of change.\n\nThe coefficient $A$ is fixed while $t$ varies. Such a fixed but adjustable ingredient is called a parameter. A different value of $A$ gives a different function in the same family. By contrast, the variable $t$ labels inputs within one function. We could investigate how the output depends on the parameter too, but should state when we change that question.\n\nThe domain has two sources of restrictions. Algebraic expressions impose some: division by zero is undefined, and real square roots require a nonnegative argument. A physical model imposes others. Our polynomial exists algebraically for negative times and for times beyond three seconds, but the stated trajectory only describes the selected recording interval. Extending it is a new modelling assumption. The outputs actually reached constitute the range; here it is the interval from zero to eighteen metres.\n\nThe vertical-line test for a graph is simply the function definition in pictures: one input cannot have two outputs. A sideways curve with two heights above the same time cannot describe a single particle's position at that time. Nothing prevents a horizontal line from meeting the graph twice, however. That would represent the same position at two different times."
    },
    {
      "heading": "2. Solving a relation is not always defining an inverse",
      "body": "To ask when the particle reaches eight metres, set $At^2=8\\,\\mathrm m$. Dividing by $A$ gives $t^2=4\\,\\mathrm{s^2}$. As an algebraic equation over all real numbers this has two solutions, $t=2\\,\\mathrm s$ and $t=-2\\,\\mathrm s$. The model's domain retains only the positive solution. We did not make the negative root disappear through an algebraic trick; we excluded it because it is not an allowed input.\n\nA function is one-to-one when different inputs always give different outputs. Only then does reversing the input-output pairs define an inverse function on the range. Our quadratic on nonnegative times is one-to-one, so its inverse is $t(x)=\\sqrt{x/A}$ for positions between zero and eighteen metres. The unrestricted real function $u\\mapsto u^2$ is not one-to-one. Its inverse relation includes both square-root signs and is not one function until a branch is selected.\n\nThe notation $f^{-1}$ for an inverse function is easy to misread. It means undoing $f$, not taking its reciprocal. If $f(u)=u+3$, then $f^{-1}(v)=v-3$, whereas $1/f(u)=1/(u+3)$. Check an inverse by composition: applying the forward rule and then the inverse must return the original input on the specified domain. The check exposes incorrect branches and domain mismatches.\n\nAlgebra should preserve the solution set, or keep track of how it changes. Squaring both sides may add solutions because positive and negative numbers have the same square. Dividing by an expression may remove solutions if that expression can vanish. For example, dividing $u(u-2)=0$ by $u$ loses the valid solution $u=0$. Factoring and checking each factor is safer.\n\nAn equation asserts equality for particular allowed values; an identity holds for every value in its stated domain. The statement $(u+1)^2=u^2+2u+1$ is an identity, while $(u+1)^2=u^2+1$ is true only when $u=0$. Testing $u=1$ disproves the latter as an identity. One counterexample defeats a universal claim, although many successful numerical checks do not establish one."
    },
    {
      "heading": "3. Compose rules and choose useful variables",
      "body": "Suppose the camera converts position to a display value using $s(x)=bx+c$. Here $b$ converts metres to display units and $c$ is an offset. The complete prediction from clock to display is the composition $s(x(t))=bAt^2+c$. The output of the first rule becomes the input of the second. The order carries physical meaning: one cannot put a clock reading directly into a calibration rule defined for positions.\n\nComposition is allowed only when the intermediate output belongs to the next rule's domain. For real functions, $g(u)=\\sqrt{u}$ and $f(v)=v-2$ produce $g(f(v))=\\sqrt{v-2}$ only for $v\\ge2$. Reversing them gives $f(g(u))=\\sqrt u-2$ for $u\\ge0$. These expressions differ both in value and in allowed inputs. A composition is not ordinary commutative multiplication.\n\nA carefully chosen dimensionless variable can simplify a physical rule. Set $t_0=1\\,\\mathrm s$, $x_0=At_0^2=2\\,\\mathrm m$, $\\tau=t/t_0$ and $X=x/x_0$. Then the trajectory becomes $X=\\tau^2$ on $0\\le\\tau\\le3$. The numbers on this rescaled graph carry no units, but the conversion back to measurements remains explicit. This does not discard physical information; it separates the shape of the relationship from the scales used to measure it.\n\nPowers and roots deserve the same attention to domain. For positive $u$, $u^{1/2}$ is the positive square root and $u^{-1}$ is its reciprocal. Over all real $u$, $\\sqrt{u^2}=|u|$, not always $u$, because a square root returns a nonnegative number. A cancellation rule valid for positive inputs can fail when silently applied to negative ones.\n\nThe practical habit is to read a formula in three passes. First identify its quantities and allowed inputs. Next ask whether the task is evaluation, solving or composition. Finally substitute and check the result against the original relationship. These checks are inexpensive, and each protects a different kind of meaning. Calculus will add powerful operations on functions, but it will not repair a function that was never specified clearly."
    }
  ],
  "teaching": {
    "question": "What exactly does an equation let us predict?",
    "why": "A reliable calculation needs an unambiguous rule, an allowed input range and a clear distinction between predicting an output and recovering an input.",
    "outcomes": [
      "Read domains, parameters and graphs as parts of a model.",
      "Solve inverse questions without losing branches or introducing invalid solutions.",
      "Compose functions and distinguish equations from identities."
    ],
    "checkpoints": [
      {
        "bridge": "Start with the camera's clock-position pairs.",
        "meaning": "A graph records allowed pairs; its axes and domain are part of its meaning.",
        "question": "Can one position occur at two times in a function of time?",
        "answer": "Yes. Uniqueness applies to the output at each input, not to the input at each output.",
        "further": [
          {
            "question": "What is the range of x = 2t² for 0 ≤ t ≤ 3 in metre-second units?",
            "answer": "It is 0 to 18 metres because the quadratic increases throughout this nonnegative domain."
          },
          {
            "question": "Does a steeper-looking graph always mean faster motion?",
            "answer": "No. Changing the axis scales changes its visual angle; a physical slope must be calculated using the axis values and units."
          },
          {
            "question": "Why is using the formula at t = 10 s an extra assumption?",
            "answer": "The stated model covers only the first three seconds. Algebraic evaluability does not establish physical validity outside that interval."
          }
        ]
      },
      {
        "bridge": "Reverse the question while retaining its domain.",
        "meaning": "An inverse function requires unique recoverable inputs; algebraic transformations may alter a solution set.",
        "question": "Why does t² = 4 have two real solutions but our arrival time has one?",
        "answer": "Both signs solve the equation, but only the positive time lies in the chosen domain.",
        "further": [
          {
            "question": "Is an inverse a reciprocal?",
            "answer": "No. The inverse undoes the mapping; a reciprocal divides one by its output."
          },
          {
            "question": "Why check a solution after squaring?",
            "answer": "Squaring merges signs and can introduce values that did not solve the original equation."
          },
          {
            "question": "How can one numerical test disprove an identity?",
            "answer": "An identity claims equality for every allowed input, so one allowed counterexample contradicts that claim."
          }
        ]
      },
      {
        "bridge": "Connect a physical rule to a measuring device.",
        "meaning": "Composition passes outputs into inputs in a definite order, with compatible domains.",
        "question": "For f(u) = u − 2 and g(u) = √u, where is g(f(u)) real?",
        "answer": "For u ≥ 2, because the square root receives u − 2.",
        "further": [
          {
            "question": "Why does order matter?",
            "answer": "Subtracting before taking a root produces a different rule from subtracting afterward."
          },
          {
            "question": "What is √(u²) for negative u?",
            "answer": "It is −u, or equivalently |u|, because the root is nonnegative."
          },
          {
            "question": "What information must accompany X = τ²?",
            "answer": "The definitions of the scales x₀ and t₀ and the allowed domain are needed to recover physical measurements."
          }
        ]
      }
    ],
    "takeaway": "Specify the mapping and domain before manipulating its formula; check that every algebraic step preserves the question being asked.",
    "nextConnection": "Circular motion supplies functions whose outputs repeat. Trigonometry will connect their graphs to angles and oscillation."
  },
  "diagnostics": [
    {
      "id": "d-units",
      "prompt": "A coefficient A multiplies t² to give a length. What power of time belongs in the denominator of A's units? Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 2,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "A has units of length/time² so At² is a length.",
      "hint": "Match dimensions.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Match dimensions.",
        "misconceptions": []
      },
      "prerequisiteId": "quantities"
    },
    {
      "id": "d-square",
      "prompt": "Evaluate 3² + 2 × 3. Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 15,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "Square first, then multiply: 9 + 6 = 15.",
      "hint": "Keep the order of operations.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Keep the order of operations.",
        "misconceptions": []
      }
    }
  ],
  "workedExample": {
    "title": "Recover an arrival time",
    "problem": "The model is x = 3t², with x in metres, t in seconds and 0 ≤ t ≤ 4. A display reads s = 2x + 1, where x is entered as its metre value and s is dimensionless. When does the display read 55?",
    "steps": [
      {
        "title": "Undo the calibration",
        "body": "Solve 55 = 2x + 1 to obtain x = 27 m.",
        "reason": "The display is a function of position, so reverse that stage first.",
        "trap": "Do not substitute 55 directly as a position."
      },
      {
        "title": "Use the trajectory",
        "body": "27 = 3t² gives t² = 9 s².",
        "reason": "The position must satisfy the trajectory at the desired time.",
        "trap": "The coefficient carries m/s² even though the numerical equation suppresses units."
      },
      {
        "title": "Select the allowed branch",
        "body": "The algebraic candidates are ±3 s; only 3 s lies in [0,4].",
        "reason": "A solution must belong to the model's domain.",
        "trap": "Taking a square root without discussing the sign hides a domain decision."
      },
      {
        "title": "Check the complete chain",
        "body": "At 3 s, x = 27 m and s = 2(27) + 1 = 55.",
        "reason": "Substitution checks both the inverse steps and the interpretation.",
        "trap": "Checking only t² = 9 does not verify the calibration."
      }
    ]
  },
  "fadedExercise": {
    "prompt": "A different model is x = 2t² m when t is entered in seconds, with 0 ≤ t ≤ 5. The dimensionless display is s = 3x + 2 with x entered in metres. Find the time when s = 98.",
    "supplied": [
      {
        "heading": "Keep the stages separate",
        "body": "First invert the display rule, then the trajectory. Intermediate results needed below are repeated in each question."
      }
    ],
    "steps": [
      {
        "id": "f-position",
        "prompt": "Solve 98 = 3x + 2 for the position in metres.",
        "answer": {
          "kind": "numeric",
          "value": 32,
          "unit": "m",
          "acceptedUnits": [
            "m"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "Subtract 2 and divide by 3: x = 32 m.",
        "hint": "Undo the offset before the multiplier.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Undo the offset before the multiplier.",
          "misconceptions": []
        }
      },
      {
        "id": "f-square",
        "prompt": "At x = 32 m, the trajectory gives 32 = 2t². Find t² in s².",
        "answer": {
          "kind": "numeric",
          "value": 16,
          "unit": "s²",
          "acceptedUnits": [
            "s²"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "Divide by 2 to get t² = 16 s².",
        "hint": "Isolate the square.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Isolate the square.",
          "misconceptions": []
        }
      },
      {
        "id": "f-domain",
        "prompt": "For t² = 16 s² and 0 ≤ t ≤ 5 s, select the arrival time.",
        "answer": {
          "kind": "choice",
          "value": "2",
          "options": [
            {
              "id": "0",
              "label": "−4 s"
            },
            {
              "id": "1",
              "label": "Both signs"
            },
            {
              "id": "2",
              "label": "4 s"
            }
          ]
        },
        "solution": "Only +4 s belongs to the stated domain.",
        "hint": "Use the domain after solving.",
        "rubric": {
          "defaultCategory": "conceptual",
          "explanation": "Use the domain after solving.",
          "misconceptions": []
        }
      },
      {
        "id": "f-check",
        "prompt": "At t = 4 s, x = 32 m. Recompute s = 3x + 2. Enter unit 1.",
        "answer": {
          "kind": "numeric",
          "value": 98,
          "unit": "1",
          "acceptedUnits": [
            "1"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "3 × 32 + 2 = 98, verifying the requested display.",
        "hint": "Check the full composition.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Check the full composition.",
          "misconceptions": []
        }
      }
    ]
  },
  "retrievalProblems": [
    {
      "id": "r-function",
      "prompt": "Which situation violates position being a function of time?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "The same position at two times"
          },
          {
            "id": "1",
            "label": "Two different positions at the same time"
          },
          {
            "id": "2",
            "label": "A stationary interval"
          }
        ]
      },
      "solution": "A function has one output for each input.",
      "hint": "Identify the input.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Identify the input.",
        "misconceptions": []
      }
    },
    {
      "id": "r-value",
      "prompt": "For f(u) = u² − 1, calculate f(3). Enter unit 1.",
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
      "solution": "3² − 1 = 8.",
      "hint": "Substitute into the entire expression.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Substitute into the entire expression.",
        "misconceptions": []
      }
    },
    {
      "id": "r-inverse",
      "prompt": "The inverse of f(u) = 2u + 3 is:",
      "answer": {
        "kind": "choice",
        "value": "2",
        "options": [
          {
            "id": "0",
            "label": "1/(2u + 3)"
          },
          {
            "id": "1",
            "label": "2u − 3"
          },
          {
            "id": "2",
            "label": "(u − 3)/2"
          }
        ]
      },
      "solution": "Undo addition by 3, then multiplication by 2.",
      "hint": "Reverse the operation order.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Reverse the operation order.",
        "misconceptions": []
      }
    },
    {
      "id": "r-absolute",
      "prompt": "Calculate √((-5)²). Enter unit 1.",
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
      "solution": "The positive square root of 25 is 5.",
      "hint": "A real square root is nonnegative.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "A real square root is nonnegative.",
        "misconceptions": []
      }
    },
    {
      "id": "r-identity",
      "prompt": "Which is an identity for all real u?",
      "answer": {
        "kind": "choice",
        "value": "0",
        "options": [
          {
            "id": "0",
            "label": "(u + 1)² = u² + 2u + 1"
          },
          {
            "id": "1",
            "label": "u² = u"
          },
          {
            "id": "2",
            "label": "√(u²) = u"
          }
        ]
      },
      "solution": "Expansion proves the first relation for every real u; the others fail for allowed examples.",
      "hint": "Look for a statement valid throughout the domain.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Look for a statement valid throughout the domain.",
        "misconceptions": []
      }
    },
    {
      "id": "r-domain",
      "prompt": "A temperature calibration is validated from 0 to 100 °C. Its polynomial gives a number at 200 °C. What follows?",
      "answer": {
        "kind": "choice",
        "value": "2",
        "options": [
          {
            "id": "0",
            "label": "The calibration is established there"
          },
          {
            "id": "1",
            "label": "The algebra fails"
          },
          {
            "id": "2",
            "label": "Its physical validity there remains unestablished"
          }
        ]
      },
      "solution": "A formula can be evaluable outside the interval where its model was validated.",
      "hint": "Separate mathematical domain from empirical scope.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Separate mathematical domain from empirical scope.",
        "misconceptions": []
      }
    }
  ],
  "diagram": {
    "title": "A quadratic trajectory",
    "caption": "Position x = 2t² in metre-second units. Straight segments join sampled points; the underlying trajectory is a smooth curve. The domain shown is 0 to 3 seconds.",
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
          135,
          264
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          135,
          264
        ],
        "to": [
          210,
          246
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          210,
          246
        ],
        "to": [
          285,
          216
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          285,
          216
        ],
        "to": [
          360,
          174
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          360,
          174
        ],
        "to": [
          435,
          120
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          435,
          120
        ],
        "to": [
          510,
          54
        ],
        "tone": "accent"
      },
      {
        "kind": "label",
        "at": [
          480,
          307
        ],
        "text": "t (s)"
      },
      {
        "kind": "label",
        "at": [
          75,
          30
        ],
        "text": "x (m)"
      },
      {
        "kind": "point",
        "at": [
          210,
          246
        ],
        "label": "(1, 2)",
        "tone": "accent"
      },
      {
        "kind": "point",
        "at": [
          360,
          174
        ],
        "label": "(2, 8)",
        "tone": "accent"
      },
      {
        "kind": "point",
        "at": [
          510,
          54
        ],
        "label": "(3, 18)",
        "tone": "accent"
      }
    ]
  },
  "sidebars": [
    {
      "heading": "Why the branch is part of the inverse",
      "body": "For $f(u)=u^2$, restricting to $u\\ge0$ produces inverse $\\sqrt v$; restricting to $u\\le0$ produces inverse $-\\sqrt v$. Both have nonnegative input domain, but return different original inputs. Neither is the inverse of the unrestricted real squaring function."
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
