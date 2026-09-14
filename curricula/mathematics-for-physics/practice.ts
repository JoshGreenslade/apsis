import type { PracticeTemplate } from "@/types/curriculum";
export const mathematicsPractice: Record<string, PracticeTemplate[]> = {
  "derivatives": [
    {
      "id": "local-slope",
      "title": "Local velocity from a position curve",
      "prompt": "A particle has position x(t) = a t² with a = {{a}} m/s². Find its velocity at t = {{time}} s.",
      "variables": [
        {
          "name": "a",
          "min": 1,
          "max": 8,
          "step": 1
        },
        {
          "name": "time",
          "min": 1,
          "max": 6,
          "step": 1
        }
      ],
      "formula": {
        "op": "multiply",
        "args": [
          {
            "op": "multiply",
            "args": [
              2,
              {
                "variable": "a"
              }
            ]
          },
          {
            "variable": "time"
          }
        ]
      },
      "unit": "m/s",
      "hint": "Differentiate the position before substituting the time.",
      "solution": "The local slope is dx/dt = 2at, giving 2 × {{a}} × {{time}} = {{answer}} m/s."
    }
  ],
  "integrals": [
    {
      "id": "ramp-displacement",
      "title": "Accumulate a linearly increasing velocity",
      "prompt": "From t = 0 to t = {{time}} s, velocity is v(t) = a t with a = {{a}} m/s². Find the displacement over this interval.",
      "variables": [
        {
          "name": "a",
          "min": 1,
          "max": 8,
          "step": 1
        },
        {
          "name": "time",
          "min": 1,
          "max": 8,
          "step": 1
        }
      ],
      "formula": {
        "op": "divide",
        "args": [
          {
            "op": "multiply",
            "args": [
              {
                "variable": "a"
              },
              {
                "op": "power",
                "args": [
                  {
                    "variable": "time"
                  },
                  2
                ]
              }
            ]
          },
          2
        ]
      },
      "unit": "m",
      "hint": "The area under the velocity graph is a triangle; it is also the integral of at.",
      "solution": "The displacement is aT²/2 = {{a}} × {{time}}² / 2 = {{answer}} m. Units are (m/s²) × s²."
    }
  ],
  "eigenvectors": [
    {
      "id": "symmetric-direction",
      "title": "A preserved direction",
      "prompt": "For the matrix A = [[{{a}}, {{b}}], [{{b}}, {{a}}]], find the eigenvalue belonging to the vector (1,1). Enter unit 1.",
      "variables": [
        {
          "name": "a",
          "min": 2,
          "max": 9,
          "step": 1
        },
        {
          "name": "b",
          "min": 1,
          "max": 5,
          "step": 1
        }
      ],
      "formula": {
        "op": "add",
        "args": [
          {
            "variable": "a"
          },
          {
            "variable": "b"
          }
        ]
      },
      "unit": "1",
      "hint": "Apply the matrix to (1,1) and compare the result with the original vector.",
      "solution": "Both output components are {{a}} + {{b}}, so A(1,1) = {{answer}}(1,1). The eigenvalue is {{answer}}."
    }
  ],
  "oscillators": [
    {
      "id": "oscillation-period",
      "title": "The period of an ideal spring oscillator",
      "prompt": "An ideal undamped spring oscillator has mass {{mass}} kg and spring constant {{stiffness}} N/m. Find its period.",
      "variables": [
        {
          "name": "mass",
          "min": 1,
          "max": 5,
          "step": 1
        },
        {
          "name": "stiffness",
          "min": 4,
          "max": 36,
          "step": 4
        }
      ],
      "formula": {
        "op": "multiply",
        "args": [
          6.283185307179586,
          {
            "op": "sqrt",
            "args": [
              {
                "op": "divide",
                "args": [
                  {
                    "variable": "mass"
                  },
                  {
                    "variable": "stiffness"
                  }
                ]
              }
            ]
          }
        ]
      },
      "unit": "s",
      "hint": "The angular frequency is √(k/m); a complete cycle advances the phase by 2π.",
      "solution": "The period is 2π√({{mass}}/{{stiffness}}) = {{answer}} s. This assumes a linear spring and negligible damping."
    }
  ],
  "multiple-integrals": [
    {
      "id": "disk-mass",
      "title": "A polar area integral",
      "prompt": "A flat disk has radius {{radius}} m and uniform surface mass density {{density}} kg/m². Find its mass.",
      "variables": [
        {
          "name": "radius",
          "min": 1,
          "max": 5,
          "step": 1
        },
        {
          "name": "density",
          "min": 1,
          "max": 8,
          "step": 1
        }
      ],
      "formula": {
        "op": "multiply",
        "args": [
          {
            "op": "multiply",
            "args": [
              3.141592653589793,
              {
                "op": "power",
                "args": [
                  {
                    "variable": "radius"
                  },
                  2
                ]
              }
            ]
          },
          {
            "variable": "density"
          }
        ]
      },
      "unit": "kg",
      "hint": "Integrate density times r dr dθ, or use the disk's area.",
      "solution": "The mass is density × πR² = {{density}} × π × {{radius}}² = {{answer}} kg. The extra r in the polar measure accounts for growing ring area."
    }
  ],
  "probability": [
    {
      "id": "expected-count",
      "title": "Expectation without predicting an exact count",
      "prompt": "Each of {{trials}} trials has success probability {{percent}} percent. What is the expected total number of successes? Enter unit 1.",
      "variables": [
        {
          "name": "trials",
          "min": 10,
          "max": 50,
          "step": 10
        },
        {
          "name": "percent",
          "min": 10,
          "max": 90,
          "step": 10
        }
      ],
      "formula": {
        "op": "divide",
        "args": [
          {
            "op": "multiply",
            "args": [
              {
                "variable": "trials"
              },
              {
                "variable": "percent"
              }
            ]
          },
          100
        ]
      },
      "unit": "1",
      "hint": "Sum the expectations of the individual indicator variables.",
      "solution": "The expectation is {{trials}} × {{percent}}/100 = {{answer}}. An expectation need not be the observed count. Linearity of expectation does not require independence when these marginal probabilities are specified."
    }
  ],
  "gaussian": [
    {
      "id": "average-uncertainty",
      "title": "Uncertainty of an independent average",
      "prompt": "Each of {{count}} independent readings has the same mean and standard deviation {{sigma}} mm, with finite variance. What is the standard deviation of their average?",
      "variables": [
        {
          "name": "count",
          "min": 2,
          "max": 36,
          "step": 1
        },
        {
          "name": "sigma",
          "min": 1,
          "max": 8,
          "step": 1
        }
      ],
      "formula": {
        "op": "divide",
        "args": [
          {
            "variable": "sigma"
          },
          {
            "op": "sqrt",
            "args": [
              {
                "variable": "count"
              }
            ]
          }
        ]
      },
      "unit": "mm",
      "hint": "Independent variances add, then division by the number of readings squares the scale factor.",
      "solution": "The standard deviation of the average is {{sigma}}/√{{count}} = {{answer}} mm. A common calibration offset would not be removed by this calculation."
    }
  ],
  "metrics": [
    {
      "id": "spacetime-interval",
      "title": "The metric chooses the signs",
      "prompt": "In one spatial dimension, an event separation has cΔt = {{ct}} m and Δx = {{x}} m. Using signature (−,+), calculate the squared interval. Enter unit m².",
      "variables": [
        {
          "name": "ct",
          "min": 3,
          "max": 8,
          "step": 1
        },
        {
          "name": "x",
          "min": 0,
          "max": 2,
          "step": 1
        }
      ],
      "formula": {
        "op": "subtract",
        "args": [
          {
            "op": "power",
            "args": [
              {
                "variable": "x"
              },
              2
            ]
          },
          {
            "op": "power",
            "args": [
              {
                "variable": "ct"
              },
              2
            ]
          }
        ]
      },
      "unit": "m²",
      "hint": "The squared interval is −(cΔt)² + (Δx)².",
      "solution": "The squared interval is −{{ct}}² + {{x}}² = {{answer}} m². Its negative sign identifies a timelike separation in this convention; it is not an ordinary squared Euclidean distance."
    }
  ]
};

