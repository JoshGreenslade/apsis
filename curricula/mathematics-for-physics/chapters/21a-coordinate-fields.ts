import type { Chapter } from "../chapter";
const chapter: Chapter = {
  "id": "coordinate-fields",
  "theoreticalMinimum": {
    "coreIdea": "Gradient, divergence and curl measure local changes using physical lengths, areas and orientations. In curvilinear coordinates their factors follow from that geometry and from the changing basis, rather than from relabelling Cartesian derivatives.",
    "widerConnection": "The Jacobian, metric, flux theorem and trajectory basis derivatives now describe the same local geometry. Composing divergence with gradient builds a Laplacian whose radial terms control diffusion, electrostatic potentials and later geometric field equations."
  },
  "intuition": {
    "body": "Draw the same short angular interval on two concentric circles. It spans a longer arc on the outer circle. A thermometer whose reading changes by the same amount across both intervals therefore measures different gradients per metre.\n\nNow let fluid move radially through those circles. Their circumferences differ, so identical outward velocity components need not carry identical total flow. The radius factors in vector calculus express these ordinary geometric facts.\n\nWe will derive the operators in plane polar coordinates from small displacements, small wedges and boundary measurements. You should be able to reconstruct the formulas from a picture. The goal is to connect the moving basis from trajectories with the gradient, flux and circulation already studied.",
    "thoughtExperiments": [
      "Does the same change per radian mean the same change per metre at every radius?",
      "Can a field with constant radial component have nonzero divergence?"
    ]
  },
  "theory": [
    {
      "heading": "1. Del is a derivative operator, and a gradient measures change per distance",
      "body": "Place a thermometer on a circular track. Its temperature reading f depends on radius r and angle θ. The partial derivative $f_\\theta$ measures change per radian, not per metre. At radius r, moving through $d\\theta$ covers tangential distance $r\\,d\\theta$. The rate per tangential distance is therefore $f_\\theta/r$.\n\nMore systematically, the small displacement is $d\\mathbf r=\\mathbf e_r\\,dr+\\mathbf e_\\theta\\,r\\,d\\theta$. The total differential is $df=f_r\\,dr+f_\\theta\\,d\\theta$. We define the gradient through $df=\\nabla f\\cdot d\\mathbf r$. Comparing coefficients gives\n$$\\nabla f=\\mathbf e_r f_r+\\mathbf e_\\theta\\frac1r f_\\theta.$$\nThe geometry supplied the conversion factor. It was not added to repair the Cartesian formula after the fact.\n\nDel, also called nabla, is the symbol $\\nabla$. In Cartesian coordinates it packages derivatives along fixed unit directions. Gradient, divergence and curl use those derivatives in different ways: gradient turns a scalar into a vector; divergence measures net outflow; curl measures oriented circulation. Del is an operator acting on what follows, so product rules and coordinate dependence matter.\n\nTake the dimensionless angular field f=θ on a patch that does not wrap around the origin. Its gradient is $\\mathbf e_\\theta/r$. At larger radius the same angular change is spread over more physical distance, so the gradient becomes smaller. The local formula is sound even though a single-valued angle cannot be defined continuously around a whole punctured plane.\n\nThis also clarifies the tensor distinction encountered later. The coefficients $(f_r,f_\\theta)$ belong to the differential, which acts on coordinate increments. Converting that measuring rule into a gradient vector requires the metric. Polar geometry makes the distinction visible before abstract index notation is needed."
    },
    {
      "heading": "2. Derive divergence from a small annular wedge",
      "body": "Let a planar vector field have physical components $F_r$ and $F_\\theta$ along the unit directions. Consider a thin wedge of radial thickness dr and angular width dθ. Its area is approximately $r\\,dr\\,d\\theta$.\n\nThe outer circular edge is longer than the inner one. Their combined outward flux is\n$$[(r+dr)F_r(r+dr,\\theta)-rF_r(r,\\theta)]\\,d\\theta.$$\nTo leading order this is $\\partial_r(rF_r)\\,dr\\,d\\theta$. The two straight radial edges contribute $\\partial_\\theta F_\\theta\\,d\\theta\\,dr$. Divide by area and shrink the wedge:\n$$\\nabla\\cdot\\mathbf F=\\frac1r\\partial_r(rF_r)+\\frac1r\\partial_\\theta F_\\theta.$$\nEven a constant radial component can have divergence: its outward-facing boundary gets longer as radius grows. A constant component list in a changing basis does not describe a spatially constant vector field.\n\nFor $\\mathbf F=a r\\mathbf e_r$, divergence is 2a. Check it on a disk of radius R: the boundary flux is $(aR)(2\\pi R)=2a\\pi R^2$, exactly divergence times disk area. The same field is $a(x,y)$ in Cartesian coordinates, where differentiating the two components also gives 2a.\n\nIn three dimensions a spherical shell has area proportional to r², so a purely radial, angle-independent field has\n$$\\nabla\\cdot(F_r\\mathbf e_r)=\\frac1{r^2}\\frac{d}{dr}(r^2F_r).$$\nThis derivation concerns radial fields; it is not the full spherical-coordinate formula. An inverse-square radial field has zero divergence away from the origin, but nonzero flux through a sphere. The missing origin can contain a singular source. The distinction between a smooth local formula and a global enclosed source is exactly the issue raised in the divergence theorem chapter."
    },
    {
      "heading": "3. Curl and the Laplacian reuse the same geometry",
      "body": "Walk around the small polar wedge counterclockwise. The outer tangential segment contributes $(r+dr)F_\\theta(r+dr,\\theta)d\\theta$ and the inner one contributes the negative of $rF_\\theta(r,\\theta)d\\theta$. The radial edges contribute $-\\partial_\\theta F_r\\,d\\theta\\,dr$. Dividing circulation by area gives\n$$(\\nabla\\times\\mathbf F)_z=\\frac1r\\left[\\partial_r(rF_\\theta)-\\partial_\\theta F_r\\right].$$\nThe sign assumes the positive normal points out of the plane. As with divergence, the factor r tracks changing boundary lengths.\n\nFor rigid rotation $\\mathbf F=\\Omega r\\mathbf e_\\theta$, curl is $2\\Omega$, not Ω. Around a circle, circulation is $2\\pi\\Omega R^2$; dividing by its area confirms the factor two. Curl measures circulation density, which is related to but not numerically identical to the angular speed of rigid rotation.\n\nThe scalar Laplacian is divergence of gradient. Insert the gradient components from section 1 into the divergence formula:\n$$\\nabla^2f=\\frac1r\\partial_r(rf_r)+\\frac1{r^2}f_{\\theta\\theta}\n=f_{rr}+\\frac1r f_r+\\frac1{r^2}f_{\\theta\\theta}.$$\nThe angular factor now appears twice: once to convert angular change into gradient per distance, once when measuring flux per area.\n\nFor f=r² the result is four. Cartesian calculation gives the same answer from $f=x^2+y^2$. Omitting the $f_r/r$ term would incorrectly give two. In a two-dimensional radial heat problem, diffusion therefore satisfies $f_t=D(f_{rr}+f_r/r)$, not the one-dimensional Cartesian heat equation. Similar-looking radial profiles can evolve differently because the sizes of the surrounding shells differ.\n\nAll formulas here use unit-vector components and r>0. At the origin we must use a regular Cartesian description or a carefully justified limiting argument. Coordinate singularities cannot be dismissed merely because the underlying physical field looks harmless."
    }
  ],
  "teaching": {
    "question": "Why do vector derivatives acquire radius factors in changing coordinates?",
    "why": "Coordinates label changes; geometry determines their physical size.",
    "outcomes": [
      "Derive the polar gradient from its action on a displacement.",
      "Derive polar divergence and curl from wedge boundaries.",
      "Build the polar Laplacian and check it in Cartesian coordinates."
    ],
    "checkpoints": [
      {
        "bridge": "Compare angular change with arc length.",
        "meaning": "Gradient measures change per physical distance.",
        "question": "Why divide the angular partial derivative by radius?",
        "answer": "One radian corresponds to radius metres of arc length.",
        "further": [
          {
            "question": "What is del?",
            "answer": "The nabla derivative operator, with its meaning determined by how it acts."
          },
          {
            "question": "Are differential components automatically gradient-vector components?",
            "answer": "No; converting between them uses the metric."
          },
          {
            "question": "Can the angle gradient be locally valid without a global potential?",
            "answer": "Yes, on patches where an angle branch is smooth."
          }
        ]
      },
      {
        "bridge": "Balance flow through a wedge.",
        "meaning": "Outer and inner boundaries have different lengths.",
        "question": "Where does the radial factor inside the divergence derivative come from?",
        "answer": "The circumference grows in proportion to radius.",
        "further": [
          {
            "question": "What is the divergence of a radial field proportional to radius in the plane?",
            "answer": "Twice its proportionality coefficient."
          },
          {
            "question": "Why does a spherical radial formula contain radius squared?",
            "answer": "Spherical surface area scales that way."
          },
          {
            "question": "Does zero divergence away from the origin rule out enclosed singular flux?",
            "answer": "No; the formula excludes the singular point."
          }
        ]
      },
      {
        "bridge": "Measure circulation, then compose divergence and gradient.",
        "meaning": "The same length and area conversions govern all three operations.",
        "question": "Why is rigid-rotation curl twice angular speed?",
        "answer": "Circulation around a disk divided by area equals twice angular speed.",
        "further": [
          {
            "question": "What is the Laplacian of radius squared in the plane?",
            "answer": "Four, as also found in Cartesian coordinates."
          },
          {
            "question": "Why does the angular second derivative have two inverse-radius factors?",
            "answer": "One comes from gradient per distance and one from divergence per area."
          },
          {
            "question": "Can these polar formulas be directly evaluated at the origin?",
            "answer": "No; the coordinate basis fails there."
          }
        ]
      }
    ],
    "takeaway": "Reconstruct coordinate operators from what they measure: change, outflow and circulation.",
    "nextConnection": "The transport chapter follows fields along trajectories, while metrics later organise the geometry behind these coordinate factors."
  },
  "workedExample": {
    "title": "A field that both expands and rotates",
    "problem": "In the plane let F=a r e_r+Ω r e_θ, with a=0.5 per second and Ω=2 per second. Find divergence, curl, and the flux and circulation around a circle of radius 3 m.",
    "steps": [
      {
        "title": "Calculate local outflow",
        "body": "$\\nabla\\cdot\\mathbf F=2a=1$ per second.",
        "reason": "The tangential component is angle independent.",
        "trap": "Differentiating only F_r misses the expanding boundary."
      },
      {
        "title": "Calculate local circulation",
        "body": "$(\\nabla\\times\\mathbf F)_z=2\\Omega=4$ per second.",
        "reason": "The radial component has no angular variation.",
        "trap": "Curl is not the same numerical quantity as angular speed."
      },
      {
        "title": "Integrate directly around the boundary",
        "body": "Flux is $(aR)(2\\pi R)=9\\pi$ m²/s. Circulation is $(\\Omega R)(2\\pi R)=36\\pi$ m²/s.",
        "reason": "Only the normal component enters flux and only the tangent component enters circulation.",
        "trap": "Do not exchange those components."
      },
      {
        "title": "Check in Cartesian coordinates",
        "body": "$\\mathbf F=(ax-\\Omega y,\\;ay+\\Omega x)$. Cartesian divergence is $a+a$, and scalar curl is $\\Omega-(-\\Omega)$. Multiplying each by disk area reproduces both boundary answers.",
        "reason": "Both descriptions represent the same field.",
        "trap": "Changing coordinate descriptions cannot change flux or circulation."
      }
    ]
  },
  "diagram": {
    "title": "A thin annular wedge",
    "caption": "The outer angular edge is longer than the inner one. Flux compares the two before dividing by wedge area.",
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
          100,
          260
        ],
        "to": [
          470,
          220
        ],
        "tone": "muted"
      },
      {
        "kind": "line",
        "from": [
          100,
          260
        ],
        "to": [
          420,
          60
        ],
        "tone": "muted"
      },
      {
        "kind": "line",
        "from": [
          260,
          242
        ],
        "to": [
          240,
          172
        ],
        "tone": "ink"
      },
      {
        "kind": "line",
        "from": [
          420,
          225
        ],
        "to": [
          375,
          88
        ],
        "tone": "accent"
      },
      {
        "kind": "label",
        "at": [
          175,
          140
        ],
        "text": "inner edge: r dθ"
      },
      {
        "kind": "label",
        "at": [
          335,
          55
        ],
        "text": "outer edge: (r+dr) dθ"
      },
      {
        "kind": "label",
        "at": [
          280,
          280
        ],
        "text": "radial thickness dr"
      }
    ]
  },
  "sidebars": [
    {
      "heading": "One metric formula contains every scalar Laplacian",
      "body": "For coordinates with metric matrix g, the gradient has coordinate components $g^{ij}\\partial_jf$, where $g^{ij}$ are entries of the inverse metric. The volume element is $\\sqrt{\\det g}\\,dq^1\\cdots dq^n$ in positive-definite geometry. Local flux balance therefore gives\n$$\\nabla^2 f=\\frac1{\\sqrt{\\det g}}\\partial_i\\!\\left(\\sqrt{\\det g}\\,g^{ij}\\partial_j f\\right),$$\nsumming repeated indices. This compact formula packages exactly the displacement and wedge arguments used above.\n\nFor the polar plane, $g=\\operatorname{diag}(1,r^2)$, so its inverse is $\\operatorname{diag}(1,r^{-2})$ and the area factor is r. Substitution reproduces both radial and angular terms. The inverse metric converts a differential into a vector; the determinant supplies volume weighting. These are distinct jobs performed by the same geometric object.\n\nThe tensor and metric chapters will explain this notation in detail. The derivation in this chapter is the concrete example that makes the later formula understandable rather than merely memorable."
    }
  ],
  "diagnostics": [
    {
      "id": "d-area",
      "prompt": "At r=2 m, what arc length corresponds to 0.1 rad?",
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
      "solution": "2×0.1=0.2.",
      "hint": "Convert angle to arc length.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Convert angle to arc length.",
        "misconceptions": []
      },
      "prerequisiteId": "trajectories"
    },
    {
      "id": "d-flux",
      "prompt": "Which component contributes to outward flux through a circle?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "Tangential"
          },
          {
            "id": "1",
            "label": "Radial"
          },
          {
            "id": "2",
            "label": "Both equally"
          }
        ]
      },
      "solution": "The outward normal is radial.",
      "hint": "Use the surface normal.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Use the surface normal.",
        "misconceptions": []
      },
      "prerequisiteId": "divergence"
    }
  ],
  "fadedExercise": {
    "prompt": "Let F=3r e_r+4r e_θ in scaled plane coordinates. Use unit 1.",
    "supplied": [
      {
        "heading": "Radial-linear field",
        "body": "Divergence is twice the radial coefficient; curl is twice the rotational coefficient."
      }
    ],
    "steps": [
      {
        "id": "f-div",
        "prompt": "Find divergence. Enter unit 1.",
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
        "solution": "2×3=6.",
        "hint": "Use radial expansion.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Use radial expansion.",
          "misconceptions": []
        }
      },
      {
        "id": "f-curl",
        "prompt": "Find scalar curl. Enter unit 1.",
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
        "solution": "2×4=8.",
        "hint": "Use circulation density.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Use circulation density.",
          "misconceptions": []
        }
      },
      {
        "id": "f-flux",
        "prompt": "Across the circle r=2, find flux divided by π. Enter unit 1.",
        "answer": {
          "kind": "numeric",
          "value": 24,
          "unit": "1",
          "acceptedUnits": [
            "1"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "Divergence 6 times area 4π.",
        "hint": "Apply the divergence theorem.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Apply the divergence theorem.",
          "misconceptions": []
        }
      },
      {
        "id": "f-circ",
        "prompt": "Around the same circle, find circulation divided by π. Enter unit 1.",
        "answer": {
          "kind": "numeric",
          "value": 32,
          "unit": "1",
          "acceptedUnits": [
            "1"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "Curl 8 times area 4π.",
        "hint": "Apply Stokes.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Apply Stokes.",
          "misconceptions": []
        }
      }
    ]
  },
  "retrievalProblems": [
    {
      "id": "r-grad",
      "prompt": "On a smooth angle patch f=θ at r=4, find the unit-tangential gradient component. Enter unit 1.",
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
      "solution": "1/r=1/4.",
      "hint": "Change per distance.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Change per distance.",
        "misconceptions": []
      }
    },
    {
      "id": "r-lap",
      "prompt": "Find the planar Laplacian of r². Enter unit 1.",
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
      "solution": "2+2=4.",
      "hint": "Include radial first derivative.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Include radial first derivative.",
        "misconceptions": []
      }
    },
    {
      "id": "r-origin",
      "prompt": "What happens to polar coordinates at the origin?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "The plane tears"
          },
          {
            "id": "1",
            "label": "The angular direction is undefined"
          },
          {
            "id": "2",
            "label": "Every physical field diverges"
          }
        ]
      },
      "solution": "All angle labels meet at one point.",
      "hint": "Distinguish coordinates and geometry.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Distinguish coordinates and geometry.",
        "misconceptions": []
      }
    },
    {
      "id": "r-divconstant",
      "prompt": "For constant F_r=3 in the plane, find divergence at r=2. Enter unit 1.",
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
      "solution": "F_r/r=3/2.",
      "hint": "Boundary length increases.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Boundary length increases.",
        "misconceptions": []
      }
    },
    {
      "id": "r-inverse",
      "prompt": "A spherical inverse-square field has zero divergence away from zero. What follows?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "No enclosed flux is possible"
          },
          {
            "id": "1",
            "label": "A singular central source is still possible"
          },
          {
            "id": "2",
            "label": "The field is zero"
          }
        ]
      },
      "solution": "The origin is excluded from the smooth calculation.",
      "hint": "Check the domain.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Check the domain.",
        "misconceptions": []
      }
    },
    {
      "id": "r-rotate",
      "prompt": "Rigid rotation has Ω=3 per second. Find curl magnitude.",
      "answer": {
        "kind": "numeric",
        "value": 6,
        "unit": "1/s",
        "acceptedUnits": [
          "1/s"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "2Ω=6.",
      "hint": "Use circulation per area.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Use circulation per area.",
        "misconceptions": []
      }
    }
  ],
  "sources": [
    {
      "title": "MIT OpenCourseWare · Multivariable Calculus",
      "url": "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/"
    }
  ]
};
chapter.diagnostics.push(...[
  {
    "id": "d-curl",
    "prompt": "What does curl measure?",
    "answer": {
      "kind": "choice",
      "value": "0",
      "options": [
        {
          "id": "0",
          "label": "Local circulation per oriented area"
        },
        {
          "id": "1",
          "label": "Speed"
        },
        {
          "id": "2",
          "label": "Net outward flux"
        }
      ]
    },
    "solution": "Curl is circulation density.",
    "hint": "Recall the boundary loop.",
    "rubric": {
      "defaultCategory": "conceptual",
      "explanation": "Recall the boundary loop.",
      "misconceptions": []
    },
    "prerequisiteId": "curl-stokes"
  },
  {
    "id": "d-jac",
    "prompt": "In polar integration at r=3, what multiplies dr dθ? Enter unit 1.",
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
    "solution": "The local area factor is r.",
    "hint": "Use the polar Jacobian.",
    "rubric": {
      "defaultCategory": "algebraic",
      "explanation": "Use the polar Jacobian.",
      "misconceptions": []
    },
    "prerequisiteId": "multiple-integrals"
  }
 ] satisfies Chapter["diagnostics"]);
export default chapter;
