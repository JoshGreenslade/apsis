import type { Chapter } from "../chapter";
const chapter: Chapter = {
  theoreticalMinimum: { coreIdea: "A good integration method changes the problem while preserving the differential relationship, boundary terms, and convergence question. Substitution reverses the chain rule, while integration by parts reverses the product rule; neither method permits us to forget the endpoints or the behaviour at infinity.", widerConnection: "The same habit of choosing a representation for structure drives substitutions, Green functions, coordinate changes, and variational derivations. Mathematical progress often comes from changing the form of a problem until the invariant relationship becomes visible." },
  "id": "integration-methods",
  "intuition": {
    "body": "Some integrals look difficult because they are expressed in an inconvenient variable. Others contain a product in which differentiating one factor would simplify it. The two main methods in this chapter exploit those structures. Substitution reverses the chain rule; integration by parts reverses the product rule.\n\nThe goal is not to transform an expression until it resembles a memorized entry in a table. It is to recognize what an integral is adding, then rewrite the same accumulation in a form with a simpler antiderivative. A correct transformation preserves interval orientation, units and any contributions at the endpoints.\n\nWe will keep a physical example in view: a force on a particle moving along a straight track. Assume the work done by the force over a small displacement is force times displacement, and its total work is their integral. That is the physical rule being used. The mathematics can then answer how much work a force with a specified spatial profile performs.\n\nA final issue arises when the track extends indefinitely or the force becomes singular. An infinite integration range is not an ordinary endpoint to insert casually. It asks whether the finite-range totals approach a finite limit. The same limiting question distinguishes a decaying contribution with a finite total from one whose small tail still adds without bound.",
    "thoughtExperiments": [
      "If a variable substitution reverses the direction in which the new variable runs, what must happen to the bounds or sign?",
      "Can a positive force approach zero at large distance while its total work over an infinite track still diverges?"
    ]
  },
  "theory": [
    {
      "heading": "1. Substitution changes the measuring variable",
      "body": "Suppose an integrand has the form $f(g(x))g'(x)$. The chain rule says that if $F'=f$, then $dF(g(x))/dx=f(g(x))g'(x)$. Reversing that statement gives\n$$\\int_a^b f(g(x))g'(x)\\,dx\n=\\int_{g(a)}^{g(b)}f(u)\\,du,$$\nwhere $u=g(x)$. For a monotone differentiable change of variable this is literally the same accumulation expressed through a new coordinate, with its direction retained.\n\nThe factor $g'(x)$ converts a small old interval into a small new interval: $du=g'(x)dx$ in the differential notation justified by the chain rule. Omitting it changes the weights of the contributions. A substitution is therefore more than renaming the argument of a function. It must account for how the interval widths transform.\n\nFor example,\n$$\\int_0^1 2x e^{x^2}\\,dx$$\nbecomes $\\int_0^1 e^u\\,du=e-1$ under $u=x^2$. The factor $2x\\,dx$ supplies du. The old endpoints x equal to zero and one happen to map to the same numerical new endpoints, but that is a coincidence, not a reason to ignore bound conversion.\n\nFor $\\int_1^2 2x e^{x^2}\\,dx$, the new bounds are one and four, giving $e^4-e$. Mixing the new integrand with the old upper bound two would calculate a different problem. An alternative valid approach is to find the antiderivative in x first, then evaluate it at the original x bounds. The two routes must not be mixed halfway through.\n\nA decreasing substitution illustrates orientation. Under $u=1-x$, x running from zero to one makes u run from one to zero, while $du=-dx$. Thus $\\int_0^1 f(1-x)dx=\\int_1^0-f(u)du=\\int_0^1f(u)du$. The minus sign and reversed limits have separate origins and ultimately compensate.\n\nWhen a substitution is not one-to-one over the whole interval, its geometric interpretation needs care. The chain-rule identity above remains valid for continuous f and differentiable g in the stated form, including cancellation through reversed traversal. For a general attempt to rewrite an arbitrary integrand using an inverse substitution, split into intervals where that inverse is single-valued. Domain awareness prevents an apparently clever substitution from silently losing part of a path."
    },
    {
      "heading": "2. Integration by parts keeps a boundary contribution",
      "body": "The product rule gives $(uv)'=u'v+uv'$. Integrate over a to b and rearrange:\n$$\\int_a^b u(x)v'(x)\\,dx\n=[u(x)v(x)]_a^b-\\int_a^b u'(x)v(x)\\,dx.$$\nThe bracket means the product at b minus the product at a. This is integration by parts. It trades one integral for another and retains the change in the product at the endpoints.\n\nThe method helps when differentiating u simplifies it and integrating v′ is manageable. For $\\int xe^{-x}dx$, choose $u=x$ and $v' = e^{-x}$, giving $u'=1$ and $v=-e^{-x}$. The new integral contains only an exponential. Choosing the reverse roles would replace a simple polynomial with a more complicated one and usually not help.\n\nFor a dimensionally explicit physical example, prescribe the force\n$$F(x)=F_0\\frac{x}{L}e^{-x/L},\\qquad x\\ge0,$$\nwhere F₀ is a force and L a positive length. The force begins at zero, rises and later decays. Its work from zero to a distance B is $W(B)=\\int_0^B F(x)dx$. Set $u=x/L$, so $dx=Ldu$ and the upper limit is $b=B/L$. Then $W(B)=F_0L\\int_0^b ue^{-u}du$.\n\nIntegration by parts gives the antiderivative $-(u+1)e^{-u}$. Evaluating the bounds yields\n$$W(B)=F_0L[1-(b+1)e^{-b}].$$\nThe factor F₀L carries force-times-length units, the units of work, while the bracket is dimensionless. At B equal to zero the bracket vanishes, and as B increases it becomes positive, as expected for a positive force.\n\nThe lower endpoint is essential. At u equal to zero the antiderivative is −1, so subtracting it supplies the +1 in the result. Discarding the boundary term would predict the wrong sign or wrong zero-distance value. Boundary terms often contain physical information about the endpoints; later variational arguments and field theorems will rely on keeping them visible.\n\nA successful integration-by-parts choice reduces the complexity of the remaining integral. It need not eliminate the integral immediately. Repeated use can lower a polynomial power one stage at a time. The decision is structural: ask what differentiating one factor does and whether the other factor has a useful antiderivative."
    },
    {
      "heading": "3. Infinite intervals are limits of finite totals",
      "body": "Define $\\int_a^\\infty f(x)dx$ as $\\lim_{B\\to\\infty}\\int_a^B f(x)dx$, if that limit exists as a finite number. The symbol infinity describes the limiting endpoint, not a large real value. The integral converges when the limit is finite and diverges otherwise.\n\nFor the force profile above, $(b+1)e^{-b}$ tends to zero as b grows, so the total work over the infinite track is $F_0L$. This does not mean that the force becomes exactly zero after some distance. Every finite tail still contributes positively; the sum of all those progressively smaller contributions remains bounded. The exponential decay dominates the linear factor.\n\nA tail approaching zero is necessary for many familiar nonnegative examples, but its size alone does not guarantee convergence. The integral $\\int_1^B dx/x=\\ln B$ increases without bound even though 1/x tends to zero. In contrast, $\\int_1^B dx/x^2=1-1/B$ tends to one. The second tail falls quickly enough to have finite accumulated area.\n\nMore generally, $\\int_1^\\infty x^{-p}dx$ converges exactly when $p>1$. For p different from one, evaluate the antiderivative $x^{1-p}/(1-p)$ and inspect the large endpoint. The borderline p equal to one produces the logarithm. This comparison is useful because it characterizes an entire family instead of a single example.\n\nA singular endpoint uses a similar definition. The integral $\\int_0^1 x^{-p}dx$ means a limit with lower bound ε approaching zero from above. Here convergence occurs when $p<1$, reversing the condition for the far tail. Near-zero and far-away questions concern different ends of the same power law. If a singularity lies inside the interval, split there and require the improper integrals on both sides to converge separately.\n\nThese qualifications prevent false cancellations. An infinite positive contribution on one side and an infinite negative contribution on another do not automatically define an ordinary improper integral. A specially coordinated cancellation can define a principal value, a different concept requiring explicit declaration. In the calculations here, convergence means the finite limits exist under the stated ordinary definitions.\n\nAfter any integration method, differentiate a proposed antiderivative when possible, inspect endpoints, and check dimensions. For an improper integral, finish with the convergence argument. An elegant formula evaluated at a forbidden endpoint is not yet a completed accumulation."
    }
  ],
  "teaching": {
    "question": "How can changing an integral preserve its physical total?",
    "why": "Substitution and parts reorganize accumulations, while convergence tells us whether extending them indefinitely remains meaningful.",
    "outcomes": [
      "Use substitution with its interval conversion and bounds.",
      "Choose integration by parts and retain boundary terms.",
      "Distinguish convergent improper integrals from decaying but divergent tails."
    ],
    "checkpoints": [
      {
        "bridge": "Pass small intervals through a new coordinate.",
        "meaning": "The derivative factor converts interval widths, and bounds record the new traversal.",
        "question": "Why does u = x² require du = 2x dx?",
        "answer": "The local change in u is 2x times the local change in x; that factor preserves the accumulation.",
        "further": [
          {
            "question": "What happens to x bounds 1 and 2?",
            "answer": "They become u bounds 1 and 4."
          },
          {
            "question": "What if the substitution decreases across the interval?",
            "answer": "The new endpoints reverse order and the derivative carries the corresponding sign."
          },
          {
            "question": "Can one keep old bounds with a new-variable antiderivative?",
            "answer": "Only after converting the expression back to the old variable; otherwise those bounds refer to the wrong coordinate."
          }
        ]
      },
      {
        "bridge": "Reverse the product rule.",
        "meaning": "Parts exchanges which factor is differentiated while retaining the endpoint change in their product.",
        "question": "Why choose u = x in ∫x e^(−x) dx?",
        "answer": "Differentiating x simplifies it to one while the exponential is easy to integrate.",
        "further": [
          {
            "question": "What does [uv]ₐᵇ mean?",
            "answer": "The product evaluated at b minus the product evaluated at a."
          },
          {
            "question": "Why does the lower endpoint matter in the force example?",
            "answer": "Its subtraction supplies the constant needed for zero accumulated work at zero distance."
          },
          {
            "question": "What units does F₀L have?",
            "answer": "Force times length, which are the units of work under the stated work law."
          }
        ]
      },
      {
        "bridge": "Take a limit of finite-range results.",
        "meaning": "A tail can shrink without having a finite total; a singular endpoint needs its own convergence check.",
        "question": "Does 1/x → 0 guarantee ∫₁∞ dx/x converges?",
        "answer": "No. Its finite total is ln B, which grows without bound.",
        "further": [
          {
            "question": "When does ∫₁∞ x^(−p) dx converge?",
            "answer": "For p > 1, when the antiderivative's far-end contribution has a finite limit."
          },
          {
            "question": "When does ∫₀¹ x^(−p) dx converge?",
            "answer": "For p < 1; the issue is now the singular lower endpoint."
          },
          {
            "question": "Can opposite infinite contributions simply cancel?",
            "answer": "Not in the ordinary improper-integral definition. Each side of an interior singularity must converge separately."
          }
        ]
      }
    ],
    "takeaway": "Transform the integrand, interval measure and endpoints together; retain boundary terms and finish every infinite-range calculation with a limit.",
    "nextConnection": "Repeated derivatives and integrals will let us build approximations with explicit remainder estimates."
  },
  "diagnostics": [
    {
      "id": "d-ftc",
      "prompt": "Evaluate ∫₀² 2x dx. Enter unit 1.",
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
      "solution": "The antiderivative x² changes by 4.",
      "hint": "Use the fundamental theorem.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Use the fundamental theorem.",
        "misconceptions": []
      },
      "prerequisiteId": "integrals"
    },
    {
      "id": "d-sign",
      "prompt": "If ∫₁³ f(x) dx = 5, then ∫₃¹ f(x) dx is:",
      "answer": {
        "kind": "choice",
        "value": "2",
        "options": [
          {
            "id": "0",
            "label": "5"
          },
          {
            "id": "1",
            "label": "0"
          },
          {
            "id": "2",
            "label": "−5"
          }
        ]
      },
      "solution": "Reversing the interval reverses its oriented accumulation.",
      "hint": "Track bound orientation.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Track bound orientation.",
        "misconceptions": []
      },
      "prerequisiteId": "integrals"
    }
  ],
  "workedExample": {
    "title": "Work of a force with a fading spatial profile",
    "problem": "Assume work W = ∫F dx. A force is F(x) = F₀(x/L)e^(−x/L), with F₀ = 6 N and L = 2 m. Find work from x = 0 to x = 4 m and over the entire positive track.",
    "steps": [
      {
        "title": "Remove the dimensional argument",
        "body": "Let u = x/L. Then dx = Ldu and the finite upper bound is 2.",
        "reason": "The exponential argument and integration variable become dimensionless.",
        "trap": "Do not omit the factor L in the interval conversion."
      },
      {
        "title": "Choose parts",
        "body": "For ∫u e^(−u)du, differentiate u and integrate the exponential to obtain −(u + 1)e^(−u).",
        "reason": "The polynomial simplifies under differentiation.",
        "trap": "Integrating e^(−u) introduces a minus sign."
      },
      {
        "title": "Evaluate both endpoints",
        "body": "W(4 m) = 12[1 − 3e^(−2)] J ≈ 7.12793 J.",
        "reason": "The zero endpoint contributes −1 before subtraction.",
        "trap": "Dropping the lower endpoint destroys the zero-work reference."
      },
      {
        "title": "Extend by a limit",
        "body": "As the upper u bound tends to infinity, (u + 1)e^(−u) tends to zero, so W∞ = 12 J.",
        "reason": "Convergence is decided from the finite-bound expression.",
        "trap": "Infinity is not a finite substitution value."
      }
    ]
  },
  "fadedExercise": {
    "prompt": "For F₀ = 10 N and L = 3 m in the same prescribed force law, find the work from zero to x = 3 m and its infinite-track limit.",
    "supplied": [
      {
        "heading": "Result available for checking",
        "body": "With b = B/L, the dimensionless integral is 1 − (b + 1)e^(−b). The dimensional scale is F₀L."
      }
    ],
    "steps": [
      {
        "id": "f-bound",
        "prompt": "At B = 3 m and L = 3 m, calculate b = B/L. Enter unit 1.",
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
        "solution": "The transformed endpoint is 1.",
        "hint": "Divide compatible lengths.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Divide compatible lengths.",
          "misconceptions": []
        }
      },
      {
        "id": "f-scale",
        "prompt": "Calculate the work scale F₀L for 10 N and 3 m.",
        "answer": {
          "kind": "numeric",
          "value": 30,
          "unit": "J",
          "acceptedUnits": [
            "J"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "10 × 3 = 30 N m = 30 J.",
        "hint": "Retain the transformed interval's length factor.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Retain the transformed interval's length factor.",
          "misconceptions": []
        }
      },
      {
        "id": "f-finite",
        "prompt": "Using b = 1 and F₀L = 30 J, calculate 30(1 − 2/e) J.",
        "answer": {
          "kind": "numeric",
          "value": 7.92723352971346,
          "unit": "J",
          "acceptedUnits": [
            "J"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "The finite work is approximately 7.92723 J.",
        "hint": "Evaluate both endpoint contributions.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Evaluate both endpoint contributions.",
          "misconceptions": []
        }
      },
      {
        "id": "f-infinite",
        "prompt": "The factor (b + 1)e^(−b) tends to zero. Find infinite-track work for F₀L = 30 J.",
        "answer": {
          "kind": "numeric",
          "value": 30,
          "unit": "J",
          "acceptedUnits": [
            "J"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "The bracket tends to one, giving 30 J.",
        "hint": "Take the limit of the finite result.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Take the limit of the finite result.",
          "misconceptions": []
        }
      }
    ]
  },
  "retrievalProblems": [
    {
      "id": "r-chain",
      "prompt": "Substitution reverses which derivative rule?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "Product rule"
          },
          {
            "id": "1",
            "label": "Chain rule"
          },
          {
            "id": "2",
            "label": "Sum rule only"
          }
        ]
      },
      "solution": "The inside derivative converts the integration interval.",
      "hint": "Look for a composite function.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Look for a composite function.",
        "misconceptions": []
      }
    },
    {
      "id": "r-sub",
      "prompt": "Evaluate ∫₀² 2x dx by u = x². Enter unit 1.",
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
      "solution": "The new integral is ∫₀⁴ du = 4.",
      "hint": "Transform the endpoint.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Transform the endpoint.",
        "misconceptions": []
      }
    },
    {
      "id": "r-parts",
      "prompt": "Integration by parts includes:",
      "answer": {
        "kind": "choice",
        "value": "2",
        "options": [
          {
            "id": "0",
            "label": "Only a new integral"
          },
          {
            "id": "1",
            "label": "A product of two integrals"
          },
          {
            "id": "2",
            "label": "An endpoint product minus a new integral"
          }
        ]
      },
      "solution": "Integrating the product rule preserves its boundary product.",
      "hint": "Keep all terms of the product rule.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Keep all terms of the product rule.",
        "misconceptions": []
      }
    },
    {
      "id": "r-tail",
      "prompt": "Evaluate ∫₁∞ x^(−2) dx. Enter unit 1.",
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
      "solution": "The finite result 1 − 1/B tends to 1.",
      "hint": "First use a finite upper bound.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "First use a finite upper bound.",
        "misconceptions": []
      }
    },
    {
      "id": "r-diverge",
      "prompt": "Which integral diverges?",
      "answer": {
        "kind": "choice",
        "value": "0",
        "options": [
          {
            "id": "0",
            "label": "∫₁∞ dx/x"
          },
          {
            "id": "1",
            "label": "∫₁∞ dx/x²"
          },
          {
            "id": "2",
            "label": "∫₀¹ dx/√x"
          }
        ]
      },
      "solution": "The first grows as ln B. The other totals are 1 and 2.",
      "hint": "Distinguish a tail from a singular endpoint.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Distinguish a tail from a singular endpoint.",
        "misconceptions": []
      }
    },
    {
      "id": "r-transfer",
      "prompt": "A nonnegative decaying force tends to zero. Is its infinite-distance work necessarily finite?",
      "answer": {
        "kind": "choice",
        "value": "2",
        "options": [
          {
            "id": "0",
            "label": "Yes, every decaying force converges"
          },
          {
            "id": "1",
            "label": "Only if its derivative is negative"
          },
          {
            "id": "2",
            "label": "No, the tail's accumulation must be checked"
          }
        ]
      },
      "solution": "A 1/x tail is a counterexample: it tends to zero but has divergent work.",
      "hint": "A small local value does not settle the total.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "A small local value does not settle the total.",
        "misconceptions": []
      }
    }
  ],
  "diagram": {
    "title": "A force that rises and then fades",
    "caption": "Dimensionless force F/F₀ = u e^(−u), with u = x/L. The maximum is at u = 1; integrating this profile from zero to infinity gives dimensionless area 1.",
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
          35
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
          75,
          197.40584188502703
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          75,
          197.40584188502703
        ],
        "to": [
          90,
          143.63592639480532
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          90,
          143.63592639480532
        ],
        "to": [
          105,
          108.2040685790258
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          105,
          108.2040685790258
        ],
        "to": [
          120,
          86.74705635471628
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          120,
          86.74705635471628
        ],
        "to": [
          135,
          75.80915443425582
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          135,
          75.80915443425582
        ],
        "to": [
          150,
          72.66630735570672
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          150,
          72.66630735570672
        ],
        "to": [
          165,
          75.18293132146647
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          165,
          75.18293132146647
        ],
        "to": [
          180,
          81.69543204846707
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          180,
          81.69543204846707
        ],
        "to": [
          195,
          90.91761787754541
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          195,
          90.91761787754541
        ],
        "to": [
          210,
          101.86403073223497
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          210,
          101.86403073223497
        ],
        "to": [
          225,
          113.78792270297532
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          225,
          113.78792270297532
        ],
        "to": [
          240,
          126.13118843972603
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          240,
          126.13118843972603
        ],
        "to": [
          255,
          138.48404424204713
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          255,
          138.48404424204713
        ],
        "to": [
          270,
          150.55264124068015
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          270,
          150.55264124068015
        ],
        "to": [
          285,
          162.13312689213916
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          285,
          162.13312689213916
        ],
        "to": [
          300,
          173.09093820655775
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          300,
          173.09093820655775
        ],
        "to": [
          315,
          183.34433169054677
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          315,
          183.34433169054677
        ],
        "to": [
          330,
          192.8513371930245
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          330,
          192.8513371930245
        ],
        "to": [
          345,
          201.59947255467694
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          345,
          201.59947255467694
        ],
        "to": [
          360,
          209.59767886337062
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          360,
          209.59767886337062
        ],
        "to": [
          375,
          216.87003691203688
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          375,
          216.87003691203688
        ],
        "to": [
          390,
          223.4509080335434
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          390,
          223.4509080335434
        ],
        "to": [
          405,
          229.38121006640208
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          405,
          229.38121006640208
        ],
        "to": [
          420,
          234.70559444478482
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          420,
          234.70559444478482
        ],
        "to": [
          435,
          239.4703355022703
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          435,
          239.4703355022703
        ],
        "to": [
          450,
          243.72177984362403
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          450,
          243.72177984362403
        ],
        "to": [
          465,
          247.5052335678503
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          465,
          247.5052335678503
        ],
        "to": [
          480,
          250.8641894511623
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          480,
          250.8641894511623
        ],
        "to": [
          495,
          253.83981593552204
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          495,
          253.83981593552204
        ],
        "to": [
          510,
          256.47064575251494
        ],
        "tone": "accent"
      },
      {
        "kind": "point",
        "at": [
          150,
          72.66630735570672
        ],
        "label": "u = 1",
        "tone": "accent"
      },
      {
        "kind": "label",
        "at": [
          470,
          305
        ],
        "text": "x/L"
      },
      {
        "kind": "label",
        "at": [
          78,
          30
        ],
        "text": "F/F₀"
      }
    ]
  },
  "sidebars": [
    {
      "heading": "Optional: a misleading symmetric cancellation",
      "body": "The integrals of 1/x from −1 to a negative cutoff and from a positive cutoff to 1 diverge separately as the cutoffs approach zero. Choosing equal cutoff magnitudes makes their sum zero, defining a symmetric principal value. It does not make the ordinary integral across zero converge, because that definition requires the two sides separately."
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
  heading: "Why a boundary term can contain the physical answer",
  body: String.raw`Integration by parts comes from adding the product rule over an interval:
$$\int_a^b u\,v'\,dx=[uv]_a^b-\int_a^b u'v\,dx.$$
The endpoint term is sometimes treated as an inconvenience. In physical arguments it often records what the surroundings are doing.

Take a smooth real function y on $[0,L]$ and choose $u=y$, $v'=y''$. Then
$$\int_0^L y\,y''\,dx=[yy']_0^L-\int_0^L(y')^2\,dx.$$
If y vanishes at both endpoints, the boundary term is zero. The remaining expression is nonpositive because it is minus an integral of a square. We have learned a sign without evaluating an antiderivative.

This sign becomes useful when curvature drives evolution, as in diffusion: it can show that a measure of nonuniformity decreases. But change the endpoints and the conclusion needs revisiting. Nonzero boundary values and slopes can contribute through $[yy']_0^L$; an environment that continually supplies heat need not allow the same decay statement.

Try y=x. Its second derivative is zero, so the left side is zero. On the right, the boundary term is L and the integral is also L. Dropping the boundary term would give a false answer. Integration by parts therefore does more than move a derivative: it exposes the boundary assumptions on which an apparently general conclusion depends.`,
});

export default chapter;
