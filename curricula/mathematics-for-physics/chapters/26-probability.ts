import type { Chapter } from "../chapter";
const chapter: Chapter = {
  theoreticalMinimum: { coreIdea: "Probability is a normalized language for weighted possibilities, and conditioning changes the space over which those weights are interpreted. Density, probability, expectation, independence, and covariance are different operations on that model and should not be collapsed into one vague idea of likelihood.", widerConnection: "Expectation and covariance connect calculus to measurement, uncertainty, statistical mechanics, and quantum probabilities. The wider course repeatedly asks which information was conditioned on and which uncertainty remains after an observation." },
  "id": "probability",
  "intuition": {
    "body": "A position sensor repeatedly measures a stationary particle. Its readings do not coincide, even though the particle is not moving in the model. Calling the readings “random” does not explain their pattern. A probability model must say which outcomes are possible and how probability is assigned to them. We can then ask questions that individual readings cannot answer: where is the distribution centered, how spread out is it, and what changes after we learn something about the apparatus?\n\nImagine first a deliberately simple sensor. Its error is −1, 0 or +1 millimetres, with probabilities one quarter, one half and one quarter. The errors cancel on average, but no individual experiment is obliged to equal that average. The squared errors do not cancel; their average measures spread. This small example will supply the meaning of expectation and variance before we write continuous integrals.\n\nA second sensor displays arbitrarily many decimal places. Assigning a positive probability to every exact real-valued reading cannot work in the same way as the three-outcome table. Instead, probability is assigned to intervals by integrating a density. A tall narrow density can be perfectly valid even when its numerical height exceeds one. It is the area over a set of readings that must lie between zero and one.\n\nThroughout this chapter, the probabilities are supplied by an assumed measurement model. Mathematics tells us the consequences of that model; calibration and experiment decide whether it describes the sensor. This distinction will matter again when quantum probabilities are introduced by a separate physical rule.",
    "thoughtExperiments": [
      "Can a sensor have zero mean error yet never report the true value in any individual trial?",
      "If two sensors share the same drifting reference voltage, should averaging them remove that shared drift?"
    ]
  },
  "theory": [
    {
      "heading": "1. Assign weights to events, not just plausible-looking numbers",
      "body": "A **sample space** is the collection of possible outcomes. An **event** is a set of outcomes about which we ask a yes-or-no question. For the three-outcome error X, the event “positive error” contains +1 alone, while “nonzero error” contains −1 and +1. Their probabilities are 1/4 and 1/2. Probabilities are nonnegative, add for disjoint events, and sum to one over the entire sample space. The normalization expresses that some allowed outcome occurs.\n\nFor a continuous random variable X, a density p(x) assigns probability through\n$$P(a\\leq X\\leq b)=\\int_a^b p(x)\\,dx,\\qquad \\int_{-\\infty}^{\\infty}p(x)\\,dx=1.$$\nFor an ordinary continuous density, the probability of one exact value is zero because an interval of zero width has zero area. This does not make a particular displayed reading impossible in practice: a finite-resolution display collects a small interval into one reported value. The model and the instrument's resolution must be kept distinct.\n\nSuppose an error is uniform between −0.1 mm and +0.1 mm. The density must be 5 mm⁻¹ inside that interval and zero outside: height times width is 5×0.2=1. The probability of lying between −0.02 mm and +0.02 mm is 5×0.04=0.2. A density of 5 is not a probability larger than one. It has inverse-length units, and multiplication by a length supplies a dimensionless probability.\n\nIf the measuring unit changes, the density's numerical height changes along with the horizontal scale so that areas stay fixed. This is another appearance of the integration measure. Probability is attached to the physical event, not to an unaccompanied number on the density's vertical axis.\n\nSome distributions combine isolated outcomes and a continuous part, such as a detector with a positive probability of no detection plus a continuously varying signal when it detects something. The pure-density formula is then only part of the model. We will keep to discrete tables and ordinary continuous densities here, while recognizing that neither representation describes every possible experiment."
    },
    {
      "heading": "2. Mean and spread answer different questions",
      "body": "The **expectation** of a discrete variable is its probability-weighted average: $E[X]=\\sum_i x_iP(X=x_i)$. The symbol E means average under the stated probability model, not an instruction to predict the next reading. For the three-outcome sensor, $E[X]=(-1)/4+0/2+1/4=0$ mm. The expected squared error is $E[X^2]=1/4+0+1/4=1/2$ mm².\n\nFor a continuous variable, sums become integrals:\n$$E[X]=\\int xp(x)\\,dx,\\qquad E[g(X)]=\\int g(x)p(x)\\,dx,$$\nprovided the relevant integrals exist. The second expression matters: first apply the function to each outcome, then average. In general $E[g(X)]$ is not $g(E[X])$. Squaring the mean of our sensor gives zero, but the mean of its square is one half. Nonlinear operations do not generally commute with averaging.\n\nDefine the mean μ=E[X] and the **variance**\n$$\\operatorname{Var}(X)=E[(X-\\mu)^2]=E[X^2]-\\mu^2.$$\nThe first form shows why variance is nonnegative: it averages squared deviations. Expanding the square gives the second form and often makes calculation shorter. The standard deviation σ is the positive square root of variance, returning the spread to the original units. For our example, σ=1/√2 mm, about 0.707 mm.\n\nExpectation is linear: $E[aX+bY]=aE[X]+bE[Y]$ whenever these expectations exist. This statement does not require independence. It follows by averaging each term of the sum. Variance behaves differently. A shift by a fixed b changes the mean but not the spread, while multiplication by a scales variance by a²: $\\operatorname{Var}(aX+b)=a^2\\operatorname{Var}(X)$.\n\nA mean alone therefore does not establish measurement quality. A biased sensor can have a narrow distribution centered on the wrong position; an unbiased sensor can fluctuate widely. Nor must the mean be a possible individual outcome: a variable equal to −1 or +1 with equal probability has mean zero but never takes zero. These are reasons to state both the probability model and the quantity being averaged rather than calling any central-looking number “the answer.”"
    },
    {
      "heading": "3. Information changes weights; dependence changes uncertainty",
      "body": "Conditional probability restricts attention to an event B that is known to have occurred, with P(B)>0. The probability of A under that restriction is\n$$P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}.$$\nThe denominator renormalizes the surviving possibilities. For the three-outcome sensor, conditioning on “error is nonzero” leaves −1 and +1 with equal probability. Thus the probability of a positive error rises from 1/4 to 1/2. No original trials were altered; the question has changed.\n\nTwo events are independent if knowing one does not change the probability of the other, equivalently $P(A\\cap B)=P(A)P(B)$. For random variables, independence requires this factorization for all relevant sets of outcomes. It is stronger than merely having no linear correlation. A model of repeated readings may assume independence, but the presence of a shared influence can make that assumption false.\n\nTo see the effect on spread, define the **covariance**\n$$\\operatorname{Cov}(X,Y)=E[(X-E[X])(Y-E[Y])].$$\nExpanding the squared deviation of a sum gives\n$$\\operatorname{Var}(X+Y)=\\operatorname{Var}(X)+\\operatorname{Var}(Y)+2\\operatorname{Cov}(X,Y).$$\nPositive covariance means deviations tend to have the same sign and reinforce one another. Negative covariance means they tend to oppose one another. Independent variables with finite second moments have zero covariance, but zero covariance alone does not establish independence.\n\nFor two independent sensor errors each with variance 1/2 mm², the average (X+Y)/2 has variance (1/4)(1/2+1/2)=1/4 mm² and standard deviation 1/2 mm. If instead Y=X because both displays repeat exactly the same error, their average is just X and its variance remains 1/2 mm². Averaging does not erase duplicated information.\n\nA useful physical model separates a shared offset B from independent fluctuations εᵢ: $X_i=B+\\varepsilon_i$. A common random offset contributes to every covariance. A fixed but unknown bias requires a different interpretation, but likewise is not removed by taking more readings. Before celebrating a small standard error, ask which sources of uncertainty the independence model actually includes. The next chapter will quantify how many small independent contributions can produce a Gaussian distribution, and why that familiar bell shape has conditions attached."
    }
  ],
  "teaching": {
    "question": "How can uncertain individual readings still support precise statements about averages?",
    "why": "A noisy measurement needs a model of possible outcomes and their weights before an average or uncertainty has a defined meaning.",
    "outcomes": [
      "Distinguish an event probability from a probability density.",
      "Compute mean and variance and use conditional probability.",
      "Identify when independence justifies adding variances."
    ],
    "checkpoints": [
      {
        "bridge": "Assign weights to events, not just plausible-looking numbers",
        "meaning": "Probability is dimensionless integrated weight; a density is weight per unit of the variable.",
        "question": "Can a continuous density have height 10?",
        "answer": "Yes. For example, height 10 over an interval of width 0.1 has total area one, with compatible units.",
        "further": [
          {
            "question": "What does normalization check?",
            "answer": "That all mutually exclusive possibilities together carry total probability one."
          },
          {
            "question": "Does P(X=x)=0 mean a finite-resolution display can never show x?",
            "answer": "No. A displayed value represents an interval of underlying values and that interval can have positive probability."
          },
          {
            "question": "If x is measured in metres, what units does p(x) have?",
            "answer": "Inverse metres, so p(x)dx is dimensionless."
          }
        ]
      },
      {
        "bridge": "Mean and spread answer different questions",
        "meaning": "The mean locates a weighted center; variance measures squared deviations from it.",
        "question": "Why does a zero mean error not imply zero uncertainty?",
        "answer": "Positive and negative errors can cancel in E[X], while their squared deviations remain positive.",
        "further": [
          {
            "question": "What units does a position variance have?",
            "answer": "Length squared; the standard deviation has units of length."
          },
          {
            "question": "Does linearity of expectation require independent variables?",
            "answer": "No. The expectation of a sum is the sum of expectations even for dependent variables, when the expectations exist."
          },
          {
            "question": "If Y=3X+5, how does its variance compare with that of X?",
            "answer": "It is nine times as large. The fixed shift changes no deviations, while the factor three is squared."
          }
        ]
      },
      {
        "bridge": "Information changes weights; dependence changes uncertainty",
        "meaning": "Conditioning changes the ensemble being considered; covariance records how deviations combine.",
        "question": "Why can the average of two readings have the same spread as either reading?",
        "answer": "If they share exactly the same error, their average repeats that error; the covariance term prevents the usual variance reduction.",
        "further": [
          {
            "question": "For P(A∩B)=0.1 and P(B)=0.4, what is P(A|B)?",
            "answer": "It is 0.25 after renormalizing by the probability of the known event."
          },
          {
            "question": "Does zero covariance prove independence?",
            "answer": "No. It rules out one particular linear association, while nonlinear dependence may remain."
          },
          {
            "question": "What distinguishes independent noise from a shared offset when averaging?",
            "answer": "Independent fluctuations partly cancel in the average; a shared offset contributes in the same direction to every reading."
          }
        ]
      }
    ],
    "takeaway": "Probability calculations begin with normalized weights and explicit conditioning; uncertainty reduction depends on the relationships between readings.",
    "nextConnection": "Gaussian models will connect integration, local approximation and independent averaging while preserving these qualifications."
  },
  "diagnostics": [
    {
      "id": "d-area",
      "prompt": "A constant function p=2 on 0≤x≤1/2 is zero elsewhere. Find its total integral. Enter unit 1.",
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
      "hint": "Identify the relation before substituting.",
      "solution": "The rectangular area is 2×1/2=1.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      },
      "prerequisiteId": "integrals"
    },
    {
      "id": "d-weight",
      "prompt": "Evaluate ∫₀¹ 2x dx. Enter unit 1.",
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
      "hint": "Identify the relation before substituting.",
      "solution": "The antiderivative is x², giving one between the bounds.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      },
      "prerequisiteId": "integrals"
    }
  ],
  "workedExample": {
    "title": "An asymmetric sensor with a small bias",
    "problem": "A sensor error X is −1 mm with probability 1/2, 0 mm with probability 1/4 and +2 mm with probability 1/4. Find its mean, variance and the spread of the average of two independent readings.",
    "steps": [
      {
        "title": "Check the probability model",
        "body": "The three nonnegative weights sum to 1/2+1/4+1/4=1.",
        "reason": "Weighted averages require a normalized distribution.",
        "trap": "Renormalizing silently would change a model whose weights were entered incorrectly."
      },
      {
        "title": "Compute the mean",
        "body": "E[X]=(−1)(1/2)+0(1/4)+2(1/4)=0 mm.",
        "reason": "The signs of the errors determine the bias.",
        "trap": "The unequal outcomes and unequal weights can still yield zero mean."
      },
      {
        "title": "Compute the second moment and variance",
        "body": "E[X²]=1(1/2)+0+4(1/4)=1.5 mm². Since the mean is zero, Var(X)=1.5 mm².",
        "reason": "Variance subtracts the square of the mean from the second moment.",
        "trap": "Do not square the weighted average and call it the second moment."
      },
      {
        "title": "Average independent readings",
        "body": "Var((X+Y)/2)=(1.5+1.5)/4=0.75 mm², giving standard deviation √0.75≈0.866 mm.",
        "reason": "Independence removes covariance; the factor one half is squared.",
        "trap": "A repeated reading with identical error would not earn this reduction."
      }
    ]
  },
  "fadedExercise": {
    "prompt": "A different error X takes 0 mm with probability 3/4 and 4 mm with probability 1/4. Two readings X and Y are independent and identically distributed.",
    "supplied": [
      {
        "heading": "Starting information",
        "body": "Use E[X]=Σxp, E[X²]=Σx²p and Var(X)=E[X²]−E[X]². For independent readings, Var((X+Y)/2)=Var(X)/2."
      }
    ],
    "steps": [
      {
        "id": "g-mean",
        "prompt": "Find E[X] from 0×3/4+4×1/4.",
        "answer": {
          "kind": "numeric",
          "value": 1,
          "unit": "mm",
          "acceptedUnits": [
            "mm"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "hint": "Identify the relation before substituting.",
        "solution": "Only the 4 mm outcome contributes, giving 1 mm.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Identify the relation before substituting.",
          "misconceptions": []
        }
      },
      {
        "id": "g-square",
        "prompt": "Find E[X²].",
        "answer": {
          "kind": "numeric",
          "value": 4,
          "unit": "mm²",
          "acceptedUnits": [
            "mm²"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "hint": "Identify the relation before substituting.",
        "solution": "The nonzero squared outcome contributes 16×1/4=4 mm².",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Identify the relation before substituting.",
          "misconceptions": []
        }
      },
      {
        "id": "g-var",
        "prompt": "With E[X]=1 mm and E[X²]=4 mm², find Var(X).",
        "answer": {
          "kind": "numeric",
          "value": 3,
          "unit": "mm²",
          "acceptedUnits": [
            "mm²"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "hint": "Identify the relation before substituting.",
        "solution": "Subtract the squared mean: 4−1=3 mm².",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Identify the relation before substituting.",
          "misconceptions": []
        }
      },
      {
        "id": "g-average",
        "prompt": "Each independent reading has variance 3 mm². Find the variance of their average.",
        "answer": {
          "kind": "numeric",
          "value": 1.5,
          "unit": "mm²",
          "acceptedUnits": [
            "mm²"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "hint": "Identify the relation before substituting.",
        "solution": "The variance of the sum is 6, then division by two in the average gives division by four in variance.",
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
      "id": "r-density",
      "prompt": "For an ordinary continuous density, which gives P(a≤X≤b)?",
      "answer": {
        "kind": "choice",
        "value": "2",
        "options": [
          {
            "id": "0",
            "label": "p(a)+p(b)"
          },
          {
            "id": "1",
            "label": "The density at the midpoint alone"
          },
          {
            "id": "2",
            "label": "The integral of p over [a,b]"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "Probability is area under the density over the event.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      }
    },
    {
      "id": "r-uniform",
      "prompt": "X is uniform on [0,4] seconds. Find P(1≤X≤2). Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 0.25,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "hint": "Identify the relation before substituting.",
      "solution": "The density is 1/4 s⁻¹ and the interval width is 1 s.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      }
    },
    {
      "id": "r-conditional",
      "prompt": "P(A∩B)=0.12 and P(B)=0.3. Find P(A|B). Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 0.4,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "hint": "Identify the relation before substituting.",
      "solution": "Divide 0.12 by 0.3 to renormalize within B.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      }
    },
    {
      "id": "r-mean",
      "prompt": "Which claim is always valid for finite expectations?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "The mean must be a possible outcome"
          },
          {
            "id": "1",
            "label": "E[X+Y]=E[X]+E[Y]"
          },
          {
            "id": "2",
            "label": "E[X²]=E[X]²"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "Linearity holds regardless of independence. The other claims fail for a symmetric ±1 variable.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      }
    },
    {
      "id": "r-cov",
      "prompt": "Var(X)=2, Var(Y)=3 and Cov(X,Y)=−1, in compatible squared units. Find Var(X+Y). Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 3,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "hint": "Identify the relation before substituting.",
      "solution": "The sum variance is 2+3+2(−1)=3.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      }
    },
    {
      "id": "r-bias",
      "prompt": "Many readings share a fixed calibration offset. What does averaging do to that offset?",
      "answer": {
        "kind": "choice",
        "value": "0",
        "options": [
          {
            "id": "0",
            "label": "Leaves it unchanged"
          },
          {
            "id": "1",
            "label": "Divides it by the number of readings"
          },
          {
            "id": "2",
            "label": "Forces it to zero"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "Adding the same offset N times and dividing by N returns that offset.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      }
    }
  ],
  "diagram": {
    "title": "A density is an area rule",
    "caption": "Uniform error on [−0.1,0.1] mm has density 5 mm⁻¹. The inner interval [−0.02,0.02] mm occupies one fifth of the width and has probability 0.2.",
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
          50,
          250
        ],
        "to": [
          550,
          250
        ],
        "tone": "muted"
      },
      {
        "kind": "line",
        "from": [
          70,
          250
        ],
        "to": [
          70,
          50
        ],
        "tone": "muted"
      },
      {
        "kind": "line",
        "from": [
          100,
          250
        ],
        "to": [
          100,
          100
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          100,
          100
        ],
        "to": [
          500,
          100
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          500,
          100
        ],
        "to": [
          500,
          250
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          260,
          250
        ],
        "to": [
          260,
          100
        ],
        "tone": "ink"
      },
      {
        "kind": "line",
        "from": [
          340,
          250
        ],
        "to": [
          340,
          100
        ],
        "tone": "ink"
      },
      {
        "kind": "label",
        "at": [
          86,
          280
        ],
        "text": "−0.1"
      },
      {
        "kind": "label",
        "at": [
          475,
          280
        ],
        "text": "+0.1 mm"
      },
      {
        "kind": "label",
        "at": [
          205,
          305
        ],
        "text": "−0.02     0     +0.02"
      },
      {
        "kind": "label",
        "at": [
          220,
          70
        ],
        "text": "height 5 mm⁻¹"
      },
      {
        "kind": "label",
        "at": [
          280,
          180
        ],
        "text": "0.2"
      }
    ]
  },
  "sidebars": [
    {
      "heading": "Optional: uncorrelated yet dependent",
      "body": "Let X take −1, 0 and +1 with equal probability, and set Y=X². Then E[X]=E[XY]=0, so Cov(X,Y)=0. Nevertheless knowing Y=0 determines X=0, while knowing Y=1 excludes X=0. Y is a function of X, so the variables are dependent. Covariance tests signed linear co-variation, not every form of dependence."
    }
  ],
  "sources": [
    {
      "title": "MIT OpenCourseWare · Introduction to Probability and Statistics",
      "url": "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/"
    },
    {
      "title": "MIT OpenCourseWare · Single Variable Calculus",
      "url": "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/"
    }
  ]
};
export default chapter;

