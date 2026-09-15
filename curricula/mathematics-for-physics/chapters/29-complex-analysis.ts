import type { Chapter } from "../chapter";
const chapter: Chapter = {
  theoreticalMinimum: { coreIdea: "Complex differentiability is direction-independent, imposing a rigidity that links real and imaginary changes and controls contour integrals. The Cauchy–Riemann conditions are therefore not a decorative pair of equations: they express the compatibility required for one complex derivative to exist.", widerConnection: "That rigidity makes complex analysis a powerful response and asymptotic tool beyond ordinary real-variable calculus. The chapter also reinforces the course-wide warning that local differential information and global domain topology must be considered together." },
  "id": "complex-analysis",
  "intuition": {
    "body": "A complex number z=x+iy locates a point in a plane. A complex-valued function f(z)=u(x,y)+iv(x,y) therefore maps one plane to another. It is tempting to think that its derivative is just two ordinary derivatives written together. But a difference quotient can approach a point from infinitely many directions, and a complex derivative demands the same limit from all of them.\n\nThe function z² has this property: a tiny displacement is multiplied, to first order, by the same complex number regardless of which direction it points. Complex conjugation behaves differently. It reflects the plane, preserving lengths, yet it reverses the imaginary direction. The difference quotient along a horizontal displacement disagrees with the quotient along a vertical one. Smoothness as a map of two real variables is therefore not enough.\n\nThis strong local condition has remarkable consequences for integration around loops. Earlier, curl-free fields required attention to holes in their domains. The same warning will reappear in the integral of 1/z around the origin. Away from zero it is complex differentiable; a loop enclosing the missing point can nevertheless have a nonzero integral.\n\nThis chapter is a first bridge. We will calculate one contour integral directly, explain the conditions of a useful theorem, and use the simplest residue rule. We will not treat a list of powerful theorems as though stating their names established expertise in complex analysis.",
    "thoughtExperiments": [
      "Conjugation is a perfectly smooth reflection of the plane. Must it have a complex derivative?",
      "If a function has no singularity on a circular path but has one inside it, is the integral necessarily zero?"
    ]
  },
  "theory": [
    {
      "heading": "1. A derivative must agree along every complex direction",
      "body": "Write $f(z)=u(x,y)+iv(x,y)$ with z=x+iy. The complex derivative at z is the limit of $(f(z+h)-f(z))/h$ as the complex increment h tends to zero from any direction. Along real increments h=Δx, the candidate limit is $u_x+iv_x$. Along imaginary increments h=iΔy, it is $v_y-iu_y$. Equality therefore requires the **Cauchy–Riemann equations**\n$$u_x=v_y,\\qquad u_y=-v_x.$$\n\nThese equations express compatibility between the two real components, not four unrelated derivatives. With continuous first partial derivatives in a neighborhood, satisfying them there is sufficient for complex differentiability there. Merely finding partial derivatives and checking equalities at one isolated point, without suitable control of the remainder, is not a universal differentiability test. The distinction parallels the earlier caution that partial derivatives alone need not give a valid total linear model.\n\nFor f(z)=z², we have u=x²−y² and v=2xy. The partial derivatives give uₓ=2x=vᵧ and uᵧ=−2y=−vₓ. Since these polynomial derivatives are continuous, the conditions establish complex differentiability everywhere. Direct algebra confirms the result: $((z+h)^2-z^2)/h=2z+h$, which approaches 2z independently of direction.\n\nFor f(z)=conjugate(z), real increments give quotient 1 and imaginary increments give quotient −1. There is no complex derivative anywhere, despite the real map (x,y)↦(x,−y) being smooth. A complex linear first-order map multiplies all small displacements by one complex number, combining a scaling and rotation. Reflection cannot be represented by such multiplication.\n\nA function complex differentiable throughout an open set is called **holomorphic** there. Openness matters because the derivative probes a neighborhood, not merely points along a drawn curve. When the derivative is nonzero, its local multiplication preserves angles and their orientation at first order. At a zero derivative this nondegenerate local picture fails. These geometric statements help us interpret the condition, but the direction-independent limit remains the definition."
    },
    {
      "heading": "2. Integrate along a path by keeping its parameter",
      "body": "A contour is an oriented, piecewise smooth path z(t) in the complex plane, with a real parameter t running from a to b. Define\n$$\\int_C f(z)\\,dz=\\int_a^b f(z(t))z'(t)\\,dt.$$\nThe differential dz carries the tangent direction and scale of the path. Omitting z′(t) changes the integral, just as omitting the path derivative would spoil a real line integral. Reversing the path orientation reverses the sign.\n\nTake the counterclockwise circle z(t)=Re^(it), with R>0 and 0≤t≤2π. For f(z)=1/z,\n$$\\oint_C\\frac{dz}{z}=\\int_0^{2\\pi}\\frac{iRe^{it}}{Re^{it}}\\,dt=2\\pi i.$$\nThe radius cancels. Traversing the same circle clockwise gives −2πi; traversing twice counterclockwise gives 4πi. This is a direct calculation, not an application of an unnamed cancellation rule.\n\nWhy did the integral not vanish? The function 1/z is undefined at zero, which lies inside the circle. It is holomorphic along and near the path but not throughout the filled disk. That missing point prevents the loop from being shrunk to a point while staying in the function's domain. This is the complex counterpart of the punctured-plane circulation example.\n\nFor comparison, z has the global primitive z²/2, and the chain rule along a path gives $\\int_C z\\,dz=[z^2/2]_{\\text{start}}^{\\text{finish}}$. Its integral around every closed loop is zero. A primitive makes endpoint dependence immediate. Locally, 1/z has logarithmic primitives on suitable restricted regions, but a single-valued logarithm cannot be continued around the origin without a mismatch. A local primitive is therefore not the same as a global one.\n\nIn real coordinates, multiplying $(u+iv)(dx+i\\,dy)$ yields $(u\\,dx-v\\,dy)+i(v\\,dx+u\\,dy)$. This ties the contour integral to two real line integrals and makes orientation concrete. Green's theorem applied to a smooth filled region would turn these into area integrals involving −vₓ−uᵧ and uₓ−vᵧ. The Cauchy–Riemann equations make both zero when the function is smooth throughout that region. The singularity of 1/z blocks exactly that hypothesis."
    },
    {
      "heading": "3. A useful theorem, a simple pole, and the limits of this bridge",
      "body": "A form of **Cauchy's theorem** says that a holomorphic function on a simply connected open domain has zero integral around closed piecewise smooth contours in that domain. Simply connected means, roughly, that loops can be continuously contracted to a point without leaving the domain. For the smooth filled-region case, the previous Green's-theorem calculation supplies the mechanism. The stronger holomorphic theorem is a quoted result here, not a proof that every conceivable domain is harmless.\n\nA **simple pole** at a is a singularity that can be written locally as $f(z)=h(z)/(z-a)$ with h holomorphic near a and h(a)≠0. Split h(z) into h(a) plus the remainder. The leading singular term is h(a)/(z−a); the remainder divided by z−a has a removable singularity. The coefficient h(a) is called the residue. It isolates the part that contributes to a small loop integral.\n\nThe simple-pole residue rule states that a positively oriented simple closed contour gives\n$$\\oint_C f(z)\\,dz=2\\pi i\\sum_{\\text{inside}} \\operatorname{Res}(f,a)$$\nwhen f is holomorphic on and inside the contour except for the finitely many isolated poles being counted, and no pole lies on the contour. This useful version is quoted as a theorem. For one simple pole, the local splitting and the computed integral of 1/(z−a) explain why the coefficient matters.\n\nConsider f(z)=1/[(z−1)(z−3)] on the circle |z|=2, counterclockwise. Only the pole at 1 lies inside. Its residue is the value at z=1 of 1/(z−3), namely −1/2. The contour integral is therefore −πi. The pole at 3 affects the residue algebra but is not itself included in the interior sum. Enlarging the contour past it changes which singularities are enclosed; allowing the contour to pass through it invalidates this ordinary integral.\n\nThis method is valuable in later Fourier and response calculations, where complex singularities organize real integrals. Those applications require further conditions about decay and contour choice. For now, the transferable habit is to name the domain, check orientation, locate singularities, and only then choose a theorem. The ability to perform one residue calculation is a starting point for complex analysis, not a substitute for its deeper convergence and analytic-continuation theory."
    }
  ],
  "teaching": {
    "question": "Why is differentiating in the complex plane more restrictive than differentiating along one line?",
    "why": "Direction-independent complex differentiation links local algebra to contour integrals, while singularities explain why domain assumptions matter.",
    "outcomes": [
      "Test complex differentiability by comparing approach directions.",
      "Evaluate a contour integral through a real parameter.",
      "Use the simple-pole residue rule with explicit domain and orientation conditions."
    ],
    "checkpoints": [
      {
        "bridge": "A derivative must agree along every complex direction",
        "meaning": "Complex differentiability requires one compatible linear response for every small displacement direction.",
        "question": "Why is conjugation not complex differentiable?",
        "answer": "Its difference quotient is 1 along real increments and −1 along imaginary increments, so no direction-independent limit exists.",
        "further": [
          {
            "question": "Are the Cauchy–Riemann equations necessary?",
            "answer": "Yes wherever the complex derivative exists and the relevant real partial derivatives are interpreted through the directional limits."
          },
          {
            "question": "What convenient regularity condition makes them sufficient on a neighborhood?",
            "answer": "Continuous first partial derivatives together with the equations give the required total linear approximation."
          },
          {
            "question": "What is the complex derivative of z² at z=i?",
            "answer": "It is 2i, the same complex multiplier for all sufficiently small increment directions."
          }
        ]
      },
      {
        "bridge": "Integrate along a path by keeping its parameter",
        "meaning": "A contour integral includes the path tangent and the function's domain, not just values at a few points.",
        "question": "Why can the circle integral of 1/z be nonzero despite complex differentiability away from zero?",
        "answer": "The origin is excluded from the domain, so the hypotheses for cancellation over the filled disk do not hold.",
        "further": [
          {
            "question": "What happens when the contour orientation is reversed?",
            "answer": "The integral changes sign because its tangent and limits reverse."
          },
          {
            "question": "Why does the factor z′(t) appear?",
            "answer": "It converts the real parameter increment dt to the oriented complex displacement dz."
          },
          {
            "question": "Does changing the circle radius change ∮dz/z when it still encircles zero once?",
            "answer": "No. The parametrization cancels R, leaving 2πi for counterclockwise orientation."
          }
        ]
      },
      {
        "bridge": "A useful theorem, a simple pole, and the limits of this bridge",
        "meaning": "Residues extract the singular coefficient that survives contour integration, under stated domain conditions.",
        "question": "For a simple pole h(z)/(z−a), what coefficient is the residue?",
        "answer": "It is h(a), equivalently the limit of (z−a)f(z) as z approaches a.",
        "further": [
          {
            "question": "What if a pole lies on the contour?",
            "answer": "The ordinary contour integral is not covered by the stated rule and is generally undefined without an additional prescription."
          },
          {
            "question": "Why are outside poles omitted from the residue sum?",
            "answer": "Only enclosed singularities obstruct contraction of the contour through its interior."
          },
          {
            "question": "Is holomorphic along the path enough for Cauchy's zero-integral conclusion?",
            "answer": "No. The interior or domain topology must also satisfy the theorem's hypotheses."
          }
        ]
      }
    ],
    "takeaway": "A complex derivative is direction-independent; contour conclusions also require control of the entire relevant domain.",
    "nextConnection": "Complex numbers next become components of state vectors, where conjugation is essential to a positive norm."
  },
  "diagnostics": [
    {
      "id": "d-modulus",
      "prompt": "Find |3+4i|. Enter unit 1.",
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
      "solution": "The modulus is √(3²+4²)=5.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      },
      "prerequisiteId": "complex-numbers"
    },
    {
      "id": "d-hole",
      "prompt": "A field is curl-free on a punctured plane. What follows automatically?",
      "answer": {
        "kind": "choice",
        "value": "2",
        "options": [
          {
            "id": "0",
            "label": "Every loop integral is zero"
          },
          {
            "id": "1",
            "label": "A global potential exists"
          },
          {
            "id": "2",
            "label": "Local curl information alone does not settle loops around the hole"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "A spanning region through the missing point is outside the smooth domain.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      },
      "prerequisiteId": "curl-stokes"
    }
  ],
  "workedExample": {
    "title": "A shifted pole inside a circle",
    "problem": "Evaluate the counterclockwise contour integral of f(z)=(z+1)/(z−2) around |z|=3.",
    "steps": [
      {
        "title": "Locate the singularity",
        "body": "The only pole is z=2, strictly inside the radius-three circle.",
        "reason": "The contour must avoid singularities and the interior list must be correct.",
        "trap": "A pole inside is allowed; a pole on the path is not."
      },
      {
        "title": "Separate the singular part",
        "body": "Write (z+1)/(z−2)=1+3/(z−2).",
        "reason": "Polynomial division makes the residue visible.",
        "trap": "The numerator is evaluated at the pole, not at the circle radius."
      },
      {
        "title": "Identify each contribution",
        "body": "The constant term has primitive z and integrates to zero. The simple-pole residue is 3.",
        "reason": "Only the singular coefficient survives this closed contour.",
        "trap": "A nonzero function can still have a zero closed-loop integral."
      },
      {
        "title": "Apply orientation and verify scale",
        "body": "The integral is 2πi×3=6πi.",
        "reason": "The circle is counterclockwise and encloses the pole once.",
        "trap": "Clockwise traversal would give −6πi."
      }
    ]
  },
  "fadedExercise": {
    "prompt": "Evaluate ∮(2z+1)/(z−1) dz on the counterclockwise circle |z|=2. Supply the requested real coefficients.",
    "supplied": [
      {
        "heading": "Starting information",
        "body": "There is one simple pole at z=1. Divide the numerator as 2z+1=2(z−1)+3. The residue rule multiplies the enclosed coefficient by 2πi."
      }
    ],
    "steps": [
      {
        "id": "g-pole",
        "prompt": "What is the real coordinate of the pole? Enter unit 1.",
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
        "solution": "The denominator vanishes at z=1.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Identify the relation before substituting.",
          "misconceptions": []
        }
      },
      {
        "id": "g-residue",
        "prompt": "Evaluate the numerator 2z+1 at z=1. Enter unit 1.",
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
        "solution": "2×1+1=3; this is the residue.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Identify the relation before substituting.",
          "misconceptions": []
        }
      },
      {
        "id": "g-count",
        "prompt": "How many poles are inside |z|=2? Enter unit 1.",
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
        "solution": "The sole pole at 1 has modulus less than 2.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Identify the relation before substituting.",
          "misconceptions": []
        }
      },
      {
        "id": "g-final",
        "prompt": "Write the integral as Cπi. Find the real coefficient C. Enter unit 1.",
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
        "solution": "2πi times the residue 3 gives 6πi.",
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
      "id": "r-direction",
      "prompt": "What must the complex difference quotient do?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "Agree only along the real axis"
          },
          {
            "id": "1",
            "label": "Approach the same limit from every direction"
          },
          {
            "id": "2",
            "label": "Have zero imaginary part"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "The complex limit is independent of how the increment approaches zero.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      }
    },
    {
      "id": "r-derivative",
      "prompt": "For f(z)=z², find the real part of f′(2+i). Enter unit 1.",
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
      "hint": "Identify the relation before substituting.",
      "solution": "f′=2z=4+2i.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      }
    },
    {
      "id": "r-cr",
      "prompt": "For f=u+iv, which is a Cauchy–Riemann equation?",
      "answer": {
        "kind": "choice",
        "value": "0",
        "options": [
          {
            "id": "0",
            "label": "uₓ=vᵧ"
          },
          {
            "id": "1",
            "label": "uₓ=−vᵧ always"
          },
          {
            "id": "2",
            "label": "u=v"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "Comparing horizontal and vertical difference quotients gives uₓ=vᵧ and uᵧ=−vₓ.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      }
    },
    {
      "id": "r-clockwise",
      "prompt": "Write the clockwise integral ∮dz/z around zero once as Cπi. Find C. Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": -2,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "hint": "Identify the relation before substituting.",
      "solution": "Reversing the counterclockwise result 2πi gives −2πi.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      }
    },
    {
      "id": "r-outside",
      "prompt": "How many poles of 1/(z−3) lie inside |z|=1? Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 0,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "hint": "Identify the relation before substituting.",
      "solution": "The sole pole has modulus 3, outside the circle.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Identify the relation before substituting.",
        "misconceptions": []
      }
    },
    {
      "id": "r-transfer",
      "prompt": "Before applying a residue rule, which check is essential?",
      "answer": {
        "kind": "choice",
        "value": "2",
        "options": [
          {
            "id": "0",
            "label": "That the contour is a perfect circle"
          },
          {
            "id": "1",
            "label": "That every pole is real"
          },
          {
            "id": "2",
            "label": "That no pole lies on the contour"
          }
        ]
      },
      "hint": "Use the definition and the stated assumptions.",
      "solution": "The stated ordinary contour rule excludes singularities on the path; many other contour shapes are allowed.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the definition and the stated assumptions.",
        "misconceptions": []
      }
    }
  ],
  "diagram": {
    "title": "One enclosed pole and one excluded pole",
    "caption": "For 1/[(z−1)(z−3)], the circle |z|=2 encloses z=1 but excludes z=3. The circle itself contains no pole. Positive orientation is counterclockwise.",
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
          170
        ],
        "to": [
          550,
          170
        ],
        "tone": "muted"
      },
      {
        "kind": "line",
        "from": [
          240,
          300
        ],
        "to": [
          240,
          25
        ],
        "tone": "muted"
      },
      {
        "kind": "ellipse",
        "center": [
          240,
          170
        ],
        "rx": 120,
        "ry": 120,
        "tone": "accent"
      },
      {
        "kind": "point",
        "at": [
          300,
          170
        ],
        "label": "1",
        "tone": "ink",
        "labelOffset": [
          0,
          25
        ]
      },
      {
        "kind": "point",
        "at": [
          420,
          170
        ],
        "label": "3",
        "tone": "ink",
        "labelOffset": [
          0,
          25
        ]
      },
      {
        "kind": "label",
        "at": [
          190,
          35
        ],
        "text": "|z| = 2"
      },
      {
        "kind": "label",
        "at": [
          500,
          155
        ],
        "text": "Re z"
      },
      {
        "kind": "label",
        "at": [
          255,
          45
        ],
        "text": "Im z"
      },
      {
        "kind": "line",
        "from": [
          240,
          50
        ],
        "to": [
          210,
          54
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          210,
          54
        ],
        "to": [
          224,
          43
        ],
        "tone": "accent"
      }
    ]
  },
  "sidebars": [
    {
      "heading": "Optional: why 1/z has no global primitive on the punctured plane",
      "body": "If a single-valued differentiable primitive F existed everywhere on the punctured plane, the chain rule would make every closed integral of F′ zero. But direct parametrization gives ∮dz/z=2πi on the unit circle. These statements contradict each other. Local logarithms remain possible on domains with a suitable cut; the obstruction is global."
    }
  ],
  "sources": [
    {
      "title": "Cambridge · Mathematical Methods II",
      "url": "https://www.damtp.cam.ac.uk/user/gio10/nst_notes.pdf"
    },
    {
      "title": "MIT OpenCourseWare · Multivariable Calculus",
      "url": "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/"
    }
  ]
};
export default chapter;

