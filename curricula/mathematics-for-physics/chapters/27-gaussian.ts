import type { Chapter } from "../chapter";
const chapter: Chapter = {
  theoreticalMinimum: { coreIdea: "Gaussian structure emerges from normalized quadratic weights and, under conditions, from many small independent contributions; it is an approximation with hypotheses. Normalisation, covariance, and tail behaviour matter as much as the familiar bell-shaped graph.", widerConnection: "This supplies the uncertainty language needed to interpret experiments, error propagation, and model comparisons honestly. It gives the laboratory spine a way to report sensitivity and residual error without pretending that every discrepancy is either noise or a failed theory." },
  "id": "gaussian",
  "intuition": {
    "body": "Return to the stationary particle and its noisy position sensor. A reading may contain many small contributions: electrical fluctuations, small mechanical movements and rounding effects. If these contributions are sufficiently independent and none dominates, their sum often has a roughly bell-shaped distribution. “Often” is doing real work. A distribution with rare enormous disturbances, a mixture of drifting operating states, or a common calibration error need not fit the same model.\n\nA Gaussian density is attractive for two reasons that should be separated. First, its normalization and moments can be calculated, so it gives an exact mathematical model once assumed. Second, a central limit theorem explains why suitably rescaled sums approach a Gaussian under stated conditions. The theorem does not claim that every original measurement is Gaussian, or that ten readings are always enough to reach the limiting shape.\n\nWe will use a two-dimensional integral to find the area under the bell, then ask what happens to its width when independent readings are averaged. Finally, the particle's position will feed a derived quantity, such as a calibrated displacement or an energy estimate. A nonlinear function of a noisy reading introduces another approximation: a local Taylor expansion. Gaussian shape, independent averaging and linear error propagation are three different claims, each requiring its own check.\n\nThe goal is not to memorize an uncertainty formula. It is to be able to say which uncertainty is being described, which assumptions produce the formula, and what evidence would make us revise it.",
    "thoughtExperiments": [
      "If every reading shares an unknown offset of 0.2 mm, does collecting a million readings remove it?",
      "If a measured quantity is squared near zero, should a first-derivative uncertainty formula predict its entire spread?"
    ]
  },
  "theory": [
    {
      "heading": "1. Find the bell's area by giving the integral a second dimension",
      "body": "Start with the dimensionless integral $I=\\int_{-\\infty}^{\\infty}e^{-x^2/2}\\,dx$. Its integrand has no elementary antiderivative. That does not mean its definite integral is inaccessible. Square I and write the product as an integral over the entire plane:\n$$I^2=\\int_{\\mathbb R^2}e^{-(x^2+y^2)/2}\\,dx\\,dy.$$\nThe integrand is positive and depends only on distance from the origin. Polar coordinates therefore match its structure.\n\nSet x=r cos θ and y=r sin θ. The area element is r dr dθ, as established through the Jacobian. The angular coordinate ranges through a full turn and the radius from zero to infinity. Consequently\n$$I^2=\\int_0^{2\\pi}d\\theta\\int_0^\\infty e^{-r^2/2}r\\,dr=2\\pi.$$\nThe radial integral is one after the substitution u=r²/2. Since I is positive, $I=\\sqrt{2\\pi}$. The calculation succeeds because squaring reveals circular symmetry; it does not produce an elementary antiderivative of the original integrand.\n\nA Gaussian with mean μ and positive standard deviation σ therefore has density\n$$p(x)=\\frac{1}{\\sqrt{2\\pi}\\sigma}\\exp\\!\\left[-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right].$$\nThe standardized variable z=(x−μ)/σ is dimensionless. Substitution dx=σ dz cancels the factor 1/σ and recovers total probability one. Translating μ moves the bell; enlarging σ broadens it and reduces its height while preserving area.\n\nSymmetry gives E[Z]=0 for the standardized bell. Integration by parts, using the decay of z exp(−z²/2) at infinity, gives $\\int z^2e^{-z^2/2}dz=\\int e^{-z^2/2}dz$. Dividing by √(2π) yields E[Z²]=1. It follows that E[X]=μ and Var(X)=σ². The parameter σ thus has a demonstrated meaning, rather than merely being named “width.”\n\nThe normalization argument assumes integration over the entire real line. If a physical quantity cannot be negative and its Gaussian model places appreciable weight below zero, that is a signal to reconsider or explicitly truncate and renormalize the model. A small tail outside the physically meaningful range may be an acceptable approximation for some purposes, but a Gaussian formula does not remove the need to inspect the domain."
    },
    {
      "heading": "2. Averaging: an exact variance calculation and a limiting shape",
      "body": "Let X₁,…,Xₙ be independent readings with common mean μ and finite variance σ². Their average is $\\bar X=(X_1+\\cdots+X_N)/N$. Linearity gives E[ X̄ ]=μ. Because independent variables have zero covariance,\n$$\\operatorname{Var}(\\bar X)=\\frac{1}{N^2}\\sum_{i=1}^N\\sigma^2=\\frac{\\sigma^2}{N}.$$\nThe standard deviation of the average, often called its standard error in this model, is σ/√N. This calculation is exact under the assumptions and does not require Gaussian individual readings.\n\nThe classical independent, identically distributed central limit theorem adds a statement about shape. With finite, nonzero variance, the standardized average $\\sqrt N(\\bar X-\\mu)/\\sigma$ approaches a standard Gaussian distribution as N grows. We quote the theorem rather than prove it here. Its content is a limiting distribution for the centered and rescaled average, not a declaration that the unscaled errors all become identical or that outliers disappear.\n\nIf the individual readings are Gaussian and independent, their average is exactly Gaussian for every N. If they are not, the approach can be slow, particularly when rare large contributions matter. Independence and finite variance are substantive conditions; there are broader theorems with other hypotheses, but they are not automatic permission to use the elementary result on any data stream.\n\nNow let $X_i=\\mu+B+\\varepsilon_i$, where the random shared offset B has zero mean and variance τ², and the independent fluctuations εᵢ have zero mean and variance σ². Assume B is independent of the fluctuations. The average is μ+B+the average fluctuation, so\n$$\\operatorname{Var}(\\bar X)=\\tau^2+\\frac{\\sigma^2}{N}.$$\nAs N increases the independent part shrinks, but the shared part remains. A fixed unknown calibration bias also persists in the mean; treating it probabilistically requires a justified uncertainty model.\n\nSuppose τ=0.2 mm and σ=1 mm. With N=25 the total variance is 0.04+0.04=0.08 mm², not merely 0.04 mm². Even infinitely many readings cannot reduce the modeled standard deviation below 0.2 mm. This is why improved calibration can be more valuable than collecting a longer series. The useful question is which contributions a proposed averaging procedure actually makes independent."
    },
    {
      "heading": "3. A local model for uncertainty in a derived quantity",
      "body": "Suppose a measured X is near a central value μ and we report Y=g(X). Write X=μ+δ. A first-order Taylor approximation gives\n$$Y\\approx g(\\mu)+g'(\\mu)\\delta.$$\nIf δ has mean zero and its typical size is small enough that higher terms are negligible over the relevant range, the variance is approximately $g'(\\mu)^2\\sigma_X^2$. This is **linear error propagation**. It maps small input deviations through the local slope of the function.\n\nFor a quantity depending on two measured inputs,\n$$\\delta Y\\approx g_x\\delta X+g_z\\delta Z,$$\nwhere the partial derivatives are evaluated at the central inputs. Squaring and averaging produces\n$$\\sigma_Y^2\\approx g_x^2\\sigma_X^2+g_z^2\\sigma_Z^2+2g_xg_z\\operatorname{Cov}(X,Z).$$\nThe covariance term is needed even if each input separately has a Gaussian histogram. Shape alone does not establish independence. The derivative signs also matter: positive covariance can reduce uncertainty in a difference while increasing uncertainty in a sum.\n\nFor Y=X² near a positive central value μ, the local slope is 2μ, so σᵧ≈2|μ|σₓ. But at μ=0 the slope vanishes and the first-order prediction is zero. That does not mean X² has no spread. It means the first nonzero Taylor term is quadratic, so the linear approximation has omitted the entire effect. The correct response is to keep higher terms or propagate the full distribution, not to celebrate an uncertainty-free measurement.\n\nNonlinearity also shifts expectations. The second-order expansion predicts $E[g(X)]\\approx g(\\mu)+g''(\\mu)\\sigma_X^2/2$ when the remainder is controlled. For g(X)=X² this is exact: E[X²]=μ²+σ². Thus a derived estimate evaluated at the mean input need not equal the mean derived output. We must distinguish approximation to a function near a point from averaging over the function's curved shape.\n\nA practical uncertainty statement therefore includes the central inputs, their units, a covariance model and the approximation used. Check that the linear changes are small on the scale over which the slope varies. This chapter supplies an introductory working method, not a universal replacement for examining the actual probability distribution."
    }
  ],
  "teaching": {
    "question": "Why does averaging often improve precision, and what can stop that improvement?",
    "why": "The Gaussian joins a computable density with a qualified model of accumulated noise; propagation formulas are useful only when their assumptions are visible.",
    "outcomes": [
      "Normalize a Gaussian using a two-dimensional integral.",
      "Predict the spread of an average under explicit assumptions.",
      "Propagate small errors while retaining covariance."
    ],
    "checkpoints": [
      {
        "bridge": "Find the bell's area by giving the integral a second dimension",
        "meaning": "Squaring the integral exposes rotational symmetry, while the Jacobian supplies the radial weight.",
        "question": "Why is the polar area factor r essential?",
        "answer": "Annuli at larger radii contain more area. Omitting r integrates radial values without their correct two-dimensional area weights.",
        "further": [
          {
            "question": "Why take the positive square root of 2π?",
            "answer": "The original integral is of a positive function, so its value is positive."
          },
          {
            "question": "What keeps the exponent dimensionless?",
            "answer": "The displacement from the mean is divided by the standard deviation before being squared."
          },
          {
            "question": "Does this derivation assume the sensor noise is Gaussian?",
            "answer": "It normalizes a Gaussian once selected. Whether that density models the sensor is a separate empirical and physical question."
          }
        ]
      },
      {
        "bridge": "Averaging: an exact variance calculation and a limiting shape",
        "meaning": "The inverse-square-root rule concerns independent finite-variance fluctuations; shared uncertainty creates a floor.",
        "question": "Does the variance reduction σ²/N require Gaussian readings?",
        "answer": "No. Independence, equal finite variances and the averaging formula suffice; Gaussian shape is a separate statement.",
        "further": [
          {
            "question": "How many independent readings are needed to halve the standard error?",
            "answer": "Four times as many, since the error scales as 1/√N."
          },
          {
            "question": "What does the central limit theorem rescale?",
            "answer": "It centers the average at μ and multiplies by √N/σ before describing its limiting shape."
          },
          {
            "question": "Why is shared calibration uncertainty not divided by N?",
            "answer": "The same offset appears in every term, so averaging preserves it exactly."
          }
        ]
      },
      {
        "bridge": "A local model for uncertainty in a derived quantity",
        "meaning": "Error propagation is a Taylor approximation, and its cross terms retain correlations.",
        "question": "Why does the first-order formula fail for X² centered at X=0?",
        "answer": "Its slope is zero there, so the leading variation is quadratic and has been omitted from the linear model.",
        "further": [
          {
            "question": "Can correlated inputs be handled in a linear propagation formula?",
            "answer": "Yes. Their covariance appears in the cross terms and must not be silently set to zero."
          },
          {
            "question": "For Y=2X−Z, what is the covariance contribution to Var(Y)?",
            "answer": "It is −4 Cov(X,Z), because twice the product of the two coefficients is −4."
          },
          {
            "question": "Why can g(E[X]) differ from E[g(X)]?",
            "answer": "Curvature weights deviations asymmetrically; the quadratic Taylor term gives a mean shift even when the input deviations average to zero."
          }
        ]
      }
    ],
    "takeaway": "Gaussian normalization is exact mathematics; Gaussian modeling, independent averaging and linear propagation require distinct assumptions.",
    "nextConnection": "Random walks will turn accumulated uncertainty into a diffusion equation; least squares will then use projection and covariance to infer parameters from imperfect measurements."
  },
  "diagnostics": [
    {
      "id": "d-var",
      "prompt": "E[X]=2 and E[X²]=7. Find Var(X). Enter unit 1.",
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
      "solution": "Variance is 7−2²=3.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      },
      "prerequisiteId": "probability"
    },
    {
      "id": "d-polar",
      "prompt": "Which is the polar area measure?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "dr dθ"
          },
          {
            "id": "1",
            "label": "r dr dθ"
          },
          {
            "id": "2",
            "label": "r² dr dθ"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "The local area Jacobian in the plane is r.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      },
      "prerequisiteId": "multiple-integrals"
    },
    {
      "id": "d-slope",
      "prompt": "For g(x)=x², find the coefficient of δ in g(3+δ). Enter unit 1.",
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
      "hint": "Identify the relation before substituting.",
      "solution": "(3+δ)²=9+6δ+δ²; the linear coefficient is 6.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      },
      "prerequisiteId": "series"
    }
  ],
  "workedExample": {
    "title": "A mean limited by shared calibration",
    "problem": "Twenty-five readings each contain independent zero-mean noise with standard deviation 1 mm and a common independent random offset with standard deviation 0.2 mm. The reported quantity is Y=3 X̄ +2 mm. Find its uncertainty.",
    "steps": [
      {
        "title": "Separate the noise sources",
        "body": "Write Xᵢ=μ+B+εᵢ with Var(B)=0.04 mm² and Var(εᵢ)=1 mm².",
        "reason": "Only the εᵢ contribution becomes independent from reading to reading.",
        "trap": "Do not count B as a new independent draw each time."
      },
      {
        "title": "Average the independent part",
        "body": "The average fluctuation has variance 1/25=0.04 mm².",
        "reason": "Averaging N independent contributions divides their variance by N.",
        "trap": "Dividing the standard deviation by N would shrink it too quickly."
      },
      {
        "title": "Retain the shared part",
        "body": "Var( X̄ )=0.04+0.04=0.08 mm², so its standard deviation is √0.08≈0.283 mm.",
        "reason": "Independence of B and the fluctuations permits addition of these two variances.",
        "trap": "The shared variance is not divided by 25."
      },
      {
        "title": "Propagate through the calibration",
        "body": "Var(Y)=9×0.08=0.72 mm² and σᵧ≈0.849 mm. The fixed 2 mm addition changes only the mean.",
        "reason": "This calibration is linear, so variance propagation is exact.",
        "trap": "A fixed additive calibration and an uncertain calibration offset are different objects."
      }
    ]
  },
  "fadedExercise": {
    "prompt": "A different apparatus averages 16 readings with independent noise standard deviation 0.8 mm and shared offset standard deviation 0.1 mm. Report Y=2 X̄.",
    "supplied": [
      {
        "heading": "Starting information",
        "body": "Independent variance in the average is 0.8²/16. Add the shared variance 0.1². A factor of two in the output multiplies variance by four."
      }
    ],
    "steps": [
      {
        "id": "g-independent",
        "prompt": "Find the independent variance 0.8²/16.",
        "answer": {
          "kind": "numeric",
          "value": 0.04,
          "unit": "mm²",
          "acceptedUnits": [
            "mm²"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "hint": "Identify the relation before substituting.",
        "solution": "0.64/16=0.04 mm².",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Identify the relation before substituting.",
          "misconceptions": []
        }
      },
      {
        "id": "g-shared",
        "prompt": "Find the shared variance.",
        "answer": {
          "kind": "numeric",
          "value": 0.01,
          "unit": "mm²",
          "acceptedUnits": [
            "mm²"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "hint": "Identify the relation before substituting.",
        "solution": "Squaring 0.1 mm gives 0.01 mm².",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Identify the relation before substituting.",
          "misconceptions": []
        }
      },
      {
        "id": "g-total",
        "prompt": "The independent and shared contributions are 0.04 and 0.01 mm². Find their total.",
        "answer": {
          "kind": "numeric",
          "value": 0.05,
          "unit": "mm²",
          "acceptedUnits": [
            "mm²"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "hint": "Identify the relation before substituting.",
        "solution": "Their sum is 0.05 mm².",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Identify the relation before substituting.",
          "misconceptions": []
        }
      },
      {
        "id": "g-output",
        "prompt": "Given Var( X̄ )=0.05 mm² and Y=2 X̄, find Var(Y).",
        "answer": {
          "kind": "numeric",
          "value": 0.2,
          "unit": "mm²",
          "acceptedUnits": [
            "mm²"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "hint": "Identify the relation before substituting.",
        "solution": "Multiply by 2² to obtain 0.2 mm².",
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
      "id": "r-standard",
      "prompt": "A Gaussian has μ=10 mm and σ=2 mm. What standardized z corresponds to x=13 mm? Enter unit 1.",
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
      "solution": "z=(13−10)/2=1.5.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      }
    },
    {
      "id": "r-clt",
      "prompt": "Which claim follows from the stated central limit theorem?",
      "answer": {
        "kind": "choice",
        "value": "2",
        "options": [
          {
            "id": "0",
            "label": "Every original reading becomes Gaussian"
          },
          {
            "id": "1",
            "label": "Any finite sample is exactly Gaussian"
          },
          {
            "id": "2",
            "label": "A centered, rescaled iid finite-variance average approaches a Gaussian"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "The theorem concerns a limiting distribution of the standardized average under its assumptions.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      }
    },
    {
      "id": "r-average",
      "prompt": "Independent readings have standard deviation 6 mm. Find the standard deviation of the mean of 9 readings.",
      "answer": {
        "kind": "numeric",
        "value": 2,
        "unit": "mm",
        "acceptedUnits": [
          "mm"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "hint": "Identify the relation before substituting.",
      "solution": "6/√9=2 mm.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      }
    },
    {
      "id": "r-propagate",
      "prompt": "Y=5X and Var(X)=0.04 mm². Find Var(Y).",
      "answer": {
        "kind": "numeric",
        "value": 1,
        "unit": "mm²",
        "acceptedUnits": [
          "mm²"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "hint": "Identify the relation before substituting.",
      "solution": "5²×0.04=1 mm².",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      }
    },
    {
      "id": "r-zero",
      "prompt": "Linear propagation gives zero spread for X² at mean zero. What should you conclude?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "The input is noiseless"
          },
          {
            "id": "1",
            "label": "Higher-order terms are needed"
          },
          {
            "id": "2",
            "label": "The Gaussian cannot be normalized"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "The first derivative vanishes, so the quadratic term supplies the leading fluctuations.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      }
    },
    {
      "id": "r-correlation",
      "prompt": "Var(X)=Var(Z)=1 and Cov(X,Z)=0.5. Find Var(X−Z). Enter unit 1.",
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
      "solution": "1+1−2×0.5=1; positive shared fluctuations cancel in a difference.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      }
    }
  ],
  "diagram": {
    "title": "Broader Gaussians have lower peaks",
    "caption": "Two dimensionless zero-mean Gaussian densities, σ=1 (accent) and σ=2 (ink), sampled at unit intervals and joined by straight segments. Both exact curves have unit area; the wider bell has half the central height.",
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
          40,
          260
        ],
        "to": [
          560,
          260
        ],
        "tone": "muted"
      },
      {
        "kind": "line",
        "from": [
          300,
          270
        ],
        "to": [
          300,
          35
        ],
        "tone": "muted"
      },
      {
        "kind": "line",
        "from": [
          80,
          259.93308488711756
        ],
        "to": [
          135,
          257.78407579403097
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          135,
          257.78407579403097
        ],
        "to": [
          190,
          233.004516743406
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          190,
          233.004516743406
        ],
        "to": [
          245,
          139.01463774042833
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          245,
          139.01463774042833
        ],
        "to": [
          300,
          60.52885979928365
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          300,
          60.52885979928365
        ],
        "to": [
          355,
          139.01463774042833
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          355,
          139.01463774042833
        ],
        "to": [
          410,
          233.004516743406
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          410,
          233.004516743406
        ],
        "to": [
          465,
          257.78407579403097
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          465,
          257.78407579403097
        ],
        "to": [
          520,
          259.93308488711756
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          80,
          246.502258371703
        ],
        "to": [
          135,
          227.62060108352705
        ],
        "tone": "ink"
      },
      {
        "kind": "line",
        "from": [
          135,
          227.62060108352705
        ],
        "to": [
          190,
          199.50731887021416
        ],
        "tone": "ink"
      },
      {
        "kind": "line",
        "from": [
          190,
          199.50731887021416
        ],
        "to": [
          245,
          171.98366830892513
        ],
        "tone": "ink"
      },
      {
        "kind": "line",
        "from": [
          245,
          171.98366830892513
        ],
        "to": [
          300,
          160.2644298996418
        ],
        "tone": "ink"
      },
      {
        "kind": "line",
        "from": [
          300,
          160.2644298996418
        ],
        "to": [
          355,
          171.98366830892513
        ],
        "tone": "ink"
      },
      {
        "kind": "line",
        "from": [
          355,
          171.98366830892513
        ],
        "to": [
          410,
          199.50731887021416
        ],
        "tone": "ink"
      },
      {
        "kind": "line",
        "from": [
          410,
          199.50731887021416
        ],
        "to": [
          465,
          227.62060108352705
        ],
        "tone": "ink"
      },
      {
        "kind": "line",
        "from": [
          465,
          227.62060108352705
        ],
        "to": [
          520,
          246.502258371703
        ],
        "tone": "ink"
      },
      {
        "kind": "label",
        "at": [
          290,
          295
        ],
        "text": "0"
      },
      {
        "kind": "label",
        "at": [
          470,
          295
        ],
        "text": "x"
      },
      {
        "kind": "label",
        "at": [
          320,
          60
        ],
        "text": "σ = 1"
      },
      {
        "kind": "label",
        "at": [
          390,
          150
        ],
        "text": "σ = 2"
      }
    ]
  },
  "sidebars": [
    {
      "heading": "Optional: the exact square of a centered Gaussian",
      "body": "For a centered Gaussian X with variance σ², a further integration-by-parts recurrence gives E[X⁴]=3σ⁴. Therefore Var(X²)=E[X⁴]−E[X²]²=2σ⁴. This nonzero answer demonstrates what the vanishing first-derivative approximation misses. Deriving the recurrence is a useful written exercise; the result is not needed to use the basic linear formula away from a zero slope."
    }
  ],
  "sources": [
    {
      "title": "MIT OpenCourseWare · Introduction to Probability and Statistics",
      "url": "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/"
    },
    {
      "title": "MIT OpenCourseWare · Multivariable Calculus",
      "url": "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/"
    },
    {
      "title": "MIT OpenCourseWare · Single Variable Calculus",
      "url": "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/"
    }
  ]
};
chapter.sidebars.push({
  heading: "Why averaging removes some uncertainty and leaves other uncertainty intact",
  body: String.raw`Suppose repeated measurements satisfy $X_i=\mu+B+\epsilon_i$. Here $\mu$ is the fixed quantity, B is a shared calibration offset with mean zero and variance $\tau^2$, and the independent random errors $\epsilon_i$ have mean zero and variance $\sigma^2$. Assume B is independent of the individual errors.

The average is $\bar X=\mu+B+N^{-1}\sum_i\epsilon_i$. Its variance is therefore
$$\operatorname{Var}(\bar X)=\tau^2+\sigma^2/N.$$
Only the independent part shrinks with more measurements. The shared offset remains because averaging repeats it N times and then divides by N.

This can also be written as $w^T\Sigma w$, where $\Sigma$ is the covariance matrix and every entry of w is $1/N$. Its off-diagonal entries are $\tau^2$: different measurements are correlated through the same calibration. Ignoring those entries would incorrectly predict that all uncertainty vanishes.

A fixed unknown bias has a related interpretation: it shifts the average without appearing as random scatter across repeated readings. A narrow histogram can therefore coexist with a poor estimate of the true value.

Neither the variance calculation nor its warning requires Gaussian errors. If the ingredients are Gaussian, the resulting average is Gaussian too, but it retains the uncertainty floor. This links probability to quadratic forms and linear maps: the covariance matrix describes which combinations of errors persist, and the averaging map selects one such combination.`,
});

export default chapter;

