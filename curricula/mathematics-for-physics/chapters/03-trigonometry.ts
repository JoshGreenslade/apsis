import type { Chapter } from "../chapter";
const chapter: Chapter = {
  theoreticalMinimum: { coreIdea: "Sine and cosine are coordinates on the unit circle, so radians, phase, and projections are geometric before they become formulas. The insistence on radians is not a convention chosen for elegance: it makes arc length, angular change, and the local derivative speak the same language.", widerConnection: "The same phase and projection language supports derivatives, vectors, oscillators, Fourier modes, and orbital geometry. Later equations may look unrelated, but they repeatedly ask us to resolve a quantity into components or to track where a periodic state sits on its cycle." },
  "id": "trigonometry",
  "intuition": {
    "body": "Watch a mark on a wheel as the wheel turns steadily. The mark follows a circle, but its shadow on a horizontal screen moves back and forth along a line. That projection is the simplest route to sine and cosine. They describe how circular position appears when we keep only one coordinate, and therefore provide natural functions for repeated motion.\n\nNo force law is needed for this construction. We prescribe uniform rotation and ask what its coordinates do. Later a spring's equation will lead independently to the same functions. Recognizing the shape now will help us understand that later result rather than merely identify a familiar formula.\n\nA circle also supplies its own way of measuring angle. A quarter turn cuts off an arc proportional to the radius. Divide the arc length by the radius and the size of the circle cancels. The resulting number, the radian measure, lets geometry and arithmetic speak the same language.\n\nWe will move between three views of one situation: a point on a circle, its coordinate as an angle changes, and its coordinate as time passes. Keep asking which variable is the input. An angle measured in radians and a time measured in seconds are different quantities even when both label a graph of cosine.",
    "thoughtExperiments": [
      "If the radius doubles while the angle stays fixed, which changes: arc length, radian measure or both?",
      "Two identical wheels rotate at the same rate but start a quarter turn apart. Will their shadows ever remain identical for all later times?"
    ]
  },
  "theory": [
    {
      "heading": "1. Measure a turn using the circle itself",
      "body": "Let a circle have radius $R$ and let an angle cut off an arc of length $s$. Define its radian measure by $\\theta=s/R$. Both numerator and denominator are lengths, so the ratio is dimensionless. It is still useful to write “rad” when communicating an angle because the number's role matters. A full circumference is $2\\pi R$, giving $2\\pi$ radians per turn, while a right angle is $\\pi/2$ radians.\n\nDegrees divide a turn into 360 equal pieces. Thus $180^\\circ=\\pi$ radians, and multiplying degrees by $\\pi/180$ converts their numerical value to radians. The conversion is not optional inside formulas derived using arc length. An angle of 0.1 radian is a small turn; 0.1 degree is a much smaller one. A calculator's angle setting changes which function its numerical sine button is evaluating.\n\nTake the positive horizontal direction as the starting ray and measure positive angles counterclockwise. Angles can be negative, and can exceed a complete turn. The endpoint after $\\theta+2\\pi$ is the same as after $\\theta$, although a rotating object may have completed one additional revolution. An angle coordinate can preserve the count of turns even when the point's position repeats.\n\nSmall radian angles connect curved and straight geometry. The arc length is exactly $R\\theta$. The vertical projection near the positive horizontal axis is nearly that length, because a short arc is nearly straight and nearly vertical there. Consequently $\\sin\\theta$ is close to $\\theta$ for small angles in radians. This is a local approximation, not an identity and not a degree formula. Calculus and series will later quantify its error.\n\nThe geometry also tells us why an angular rate differs from an ordinary cycle count. One cycle advances the angle by $2\\pi$, not by one radian. Losing that factor changes a predicted period by more than sixfold, a much larger error than rounding any reasonable measurement."
    },
    {
      "heading": "2. Define sine and cosine as coordinates",
      "body": "On a unit circle, define the point at angle $\\theta$ to have coordinates $(\\cos\\theta,\\sin\\theta)$. On a circle of radius $R$ those coordinates become $x=R\\cos\\theta$ and $y=R\\sin\\theta$. These definitions work in every quadrant, including angles for which a right-triangle sketch with positive side lengths would be misleading.\n\nAt zero angle the point is $(1,0)$, so cosine is one and sine zero. At a quarter turn it is $(0,1)$; at a half turn it is $(-1,0)$. The signs record directions along the axes. Cosine is negative on the left half of the circle and sine negative on the lower half. This provides a way to check a calculation without memorizing a long table of values.\n\nBecause the point lies one unit from the origin, the Pythagorean theorem gives $\\cos^2\\theta+\\sin^2\\theta=1$. The superscript means the square of the function value, not cosine of a squared angle. The identity states a geometric constraint linking two coordinates of the same point. If one coordinate is known, the other coordinate's magnitude follows, but its sign still needs quadrant information.\n\nReflecting the point across the horizontal axis changes $\\theta$ to $-\\theta$. Its horizontal coordinate stays the same and its vertical coordinate reverses. Therefore cosine is even, $\\cos(-\\theta)=\\cos\\theta$, while sine is odd, $\\sin(-\\theta)=-\\sin\\theta$. These are symmetry statements made algebraic. Shifting through a full turn leaves both coordinates unchanged.\n\nFor a right triangle in the first quadrant, dividing its legs by the hypotenuse reproduces the unit-circle coordinates: cosine is adjacent over hypotenuse and sine opposite over hypotenuse. Tangent is their ratio, $\\tan\\theta=\\sin\\theta/\\cos\\theta$, wherever cosine is nonzero. Its failure at a vertical direction is meaningful: the ratio of vertical displacement to zero horizontal displacement is undefined, even though the point on the circle is perfectly well defined.\n\nA directed segment of length $R$ at angle $\\theta$ has these same horizontal and vertical projections. We are not yet assuming matrix methods or vector algebra. We are simply reading signed distances from a geometric construction; later those projections will become vector components."
    },
    {
      "heading": "3. Turn an angle into an oscillation in time",
      "body": "Prescribe a steadily rotating angle $\\theta(t)=\\omega t+\\phi$. The angular frequency $\\omega$ is the angle advanced per unit time, measured conventionally in rad/s; the phase $\\phi$ is the angle at time zero. The horizontal shadow is then $x(t)=A\\cos(\\omega t+\\phi)$, where $A>0$ is the circle radius and also the shadow's amplitude, its maximum distance from the centre.\n\nFor $\\omega>0$, one repetition takes a period $P$ satisfying $\\omega P=2\\pi$. Thus $P=2\\pi/\\omega$. Ordinary frequency $f=1/P$ counts cycles per second, so $\\omega=2\\pi f$. The argument of cosine is dimensionless: inverse time multiplying time produces an angle number, and the initial phase has the same kind of number. The output still has the units supplied by $A$.\n\nConsider $x(t)=2\\cos(\\pi t/2)\\,\\mathrm m$ with $t$ entered in seconds. The amplitude is two metres and the period four seconds. At times zero, one, two, three and four seconds, the position is respectively $2,0,-2,0,2$ metres. The motion spends an equal amount of time in each quarter cycle, but does not cover equal distances in every smaller equal time interval. Uniform circular rotation does not project into constant-speed motion along the screen.\n\nPhase determines where the cycle begins, not how quickly it repeats. Adding $\\pi/2$ puts the initial horizontal coordinate at zero, and the prescribed positive rotation then carries it toward negative positions. The initial position alone does not distinguish positive and negative phases with the same cosine. The next part of the motion resolves that ambiguity. A complete description of an oscillation therefore includes a phase convention and direction of progression.\n\nReplacing the argument by $\\omega(t-t_0)$ delays the pattern by $t_0$: the maximum formerly at zero occurs at $t=t_0$. This gives $\\phi=-\\omega t_0$, explaining why a positive phase shift inside the function corresponds to an earlier feature on the time graph. Read the location of a maximum from its argument rather than guessing the sign from the word “shift.”\n\nThese formulas describe the geometry of a repeating signal. They do not establish that every periodic motion is a single sine or cosine. A triangular wave repeats too, but its shape differs. Later Fourier analysis will express more complicated repeating patterns as sums of these simple components. Here we have identified the building block and the meanings of its three parameters."
    }
  ],
  "teaching": {
    "question": "Why do circle coordinates describe back-and-forth motion?",
    "why": "Radians and phase connect geometry to oscillations without requiring a differential equation.",
    "outcomes": [
      "Recover sine and cosine from a circle and predict their signs.",
      "Convert between angular frequency, period and ordinary frequency.",
      "Interpret amplitude and phase as distinct changes of a signal."
    ],
    "checkpoints": [
      {
        "bridge": "Use arc length to measure the turn.",
        "meaning": "A radian is an arc-to-radius ratio, so the angle survives a change of circle size.",
        "question": "What angle does an arc of 3 m subtend on a circle of radius 2 m?",
        "answer": "It is 3/2 = 1.5 radians.",
        "further": [
          {
            "question": "How many radians are in a half turn?",
            "answer": "The arc is πR, so dividing by R gives π."
          },
          {
            "question": "Does dimensionless mean an angle's convention is irrelevant?",
            "answer": "No. Degrees and radians give different numbers for the same turn; formulas need the intended convention."
          },
          {
            "question": "Why is sin θ approximately θ tied to radians?",
            "answer": "Radians measure the arc divided by radius. Near zero the vertical projection nearly equals that arc; degree numbers do not have this geometric equality."
          }
        ]
      },
      {
        "bridge": "Read the point's coordinates, including their signs.",
        "meaning": "The unit circle extends right-triangle ratios to all angles.",
        "question": "If cosine is −3/5 and the angle lies in quadrant II, what is sine?",
        "answer": "It is +4/5: the squared coordinates sum to one and the upper half gives the positive sign.",
        "further": [
          {
            "question": "What changes under reflection θ → −θ?",
            "answer": "Sine changes sign; cosine stays fixed because only the vertical coordinate is reversed."
          },
          {
            "question": "Why is tangent undefined at π/2?",
            "answer": "Its denominator cosine is zero, although sine and the point remain defined."
          },
          {
            "question": "Why is sin² θ + cos² θ = 1 an identity?",
            "answer": "Every point of the unit circle satisfies the Pythagorean relation, for every allowed angle."
          }
        ]
      },
      {
        "bridge": "Let the angle advance with time.",
        "meaning": "Amplitude sets size, angular frequency sets repetition rate, and phase sets the starting point.",
        "question": "If angular frequency doubles with amplitude fixed, what happens to the period?",
        "answer": "It halves because one cycle still requires an angular advance of 2π.",
        "further": [
          {
            "question": "Does a phase change alter the amplitude?",
            "answer": "No. It changes when a coordinate is reached; the extreme values remain ±A."
          },
          {
            "question": "Why is 2 Hz not 2 rad/s?",
            "answer": "Two cycles per second means an angular advance of 4π radians per second."
          },
          {
            "question": "Does x(0) = 0 determine the phase uniquely?",
            "answer": "No. Several phases have zero cosine. The direction of subsequent motion and a convention modulo 2π are also needed."
          }
        ]
      }
    ],
    "takeaway": "Sine and cosine are signed circle coordinates; amplitude, angular frequency and phase describe different aspects of their time dependence.",
    "nextConnection": "To describe the changing speed of a shadow, we need a limit of measurements over shrinking time intervals."
  },
  "diagnostics": [
    {
      "id": "d-function",
      "prompt": "Can cosine be a function even though the same output repeats?",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "No, every output must be unique"
          },
          {
            "id": "1",
            "label": "Yes, each angle still gives one output"
          },
          {
            "id": "2",
            "label": "Only for positive angles"
          }
        ]
      },
      "solution": "A function requires one output per input, not a unique input per output.",
      "hint": "Recall the direction of the function rule.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Recall the direction of the function rule.",
        "misconceptions": []
      },
      "prerequisiteId": "functions"
    },
    {
      "id": "d-ratio",
      "prompt": "A circle's radius is 4 m and an arc is 2 m. Calculate arc/radius. Enter unit 1.",
      "answer": {
        "kind": "numeric",
        "value": 0.5,
        "unit": "1",
        "acceptedUnits": [
          "1"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "2/4 = 0.5; the length units cancel.",
      "hint": "Form a ratio.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Form a ratio.",
        "misconceptions": []
      }
    }
  ],
  "workedExample": {
    "title": "Read a rotating shadow",
    "problem": "A point rotates counterclockwise with x(t) = 3 cos(2πt/6 + π/3) m, with t in seconds. Interpret its parameters and find its first nonnegative zero of x.",
    "steps": [
      {
        "title": "Identify the scale",
        "body": "A = 3 m, so the horizontal coordinate lies between −3 and 3 m.",
        "reason": "Cosine ranges from −1 to 1.",
        "trap": "Amplitude is not the peak-to-peak span of 6 m."
      },
      {
        "title": "Read the clock",
        "body": "ω = π/3 rad/s and P = 6 s.",
        "reason": "A full repetition advances the argument by 2π.",
        "trap": "Do not call π/3 the frequency in cycles per second."
      },
      {
        "title": "Locate the starting point",
        "body": "The initial phase is π/3, giving x(0) = 3/2 m.",
        "reason": "The angle at zero time controls the initial coordinate.",
        "trap": "The initial coordinate need not equal the amplitude."
      },
      {
        "title": "Find the next zero",
        "body": "The next zero occurs at angle π/2. Solve (π/3)t + π/3 = π/2 to get t = 1/2 s.",
        "reason": "The angle increases, so choose the first zero ahead of the initial phase.",
        "trap": "A later zero such as 3π/2 is valid but is not the first."
      }
    ]
  },
  "fadedExercise": {
    "prompt": "A shadow obeys x(t) = 4 cos(πt/2 − π/2) m, with t in seconds. Interpret the signal and locate its first maximum.",
    "supplied": [
      {
        "heading": "Reference points",
        "body": "Cosine is zero at −π/2 and is one at 0. The angle increases at π/2 rad/s."
      }
    ],
    "steps": [
      {
        "id": "f-amp",
        "prompt": "What is the amplitude?",
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
        "solution": "The coefficient of cosine sets the maximum displacement magnitude.",
        "hint": "Use the outside factor.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Use the outside factor.",
          "misconceptions": []
        }
      },
      {
        "id": "f-period",
        "prompt": "For ω = π/2 rad/s, calculate P = 2π/ω.",
        "answer": {
          "kind": "numeric",
          "value": 4,
          "unit": "s",
          "acceptedUnits": [
            "s"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "2π divided by π/2 is 4 s.",
        "hint": "A cycle is 2π radians.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "A cycle is 2π radians.",
          "misconceptions": []
        }
      },
      {
        "id": "f-start",
        "prompt": "Evaluate x(0) = 4 cos(−π/2) m.",
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
        "solution": "Cosine vanishes at −π/2.",
        "hint": "Use the circle coordinate.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Use the circle coordinate.",
          "misconceptions": []
        }
      },
      {
        "id": "f-maximum",
        "prompt": "The first maximum has argument 0. Solve πt/2 − π/2 = 0.",
        "answer": {
          "kind": "numeric",
          "value": 1,
          "unit": "s",
          "acceptedUnits": [
            "s"
          ],
          "absoluteTolerance": 0.001,
          "relativeTolerance": 0.002
        },
        "solution": "The argument reaches zero at t = 1 s.",
        "hint": "Locate the feature through its phase.",
        "rubric": {
          "defaultCategory": "algebraic",
          "explanation": "Locate the feature through its phase.",
          "misconceptions": []
        }
      }
    ]
  },
  "retrievalProblems": [
    {
      "id": "r-radians",
      "prompt": "Convert 90 degrees to radians; enter unit rad.",
      "answer": {
        "kind": "numeric",
        "value": 1.5707963267948966,
        "unit": "rad",
        "acceptedUnits": [
          "rad"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "A quarter turn is π/2 radians.",
      "hint": "Use 180 degrees = π radians.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Use 180 degrees = π radians.",
        "misconceptions": []
      }
    },
    {
      "id": "r-sign",
      "prompt": "At an angle in quadrant III, the signs of (cosine, sine) are:",
      "answer": {
        "kind": "choice",
        "value": "2",
        "options": [
          {
            "id": "0",
            "label": "(+, −)"
          },
          {
            "id": "1",
            "label": "(−, +)"
          },
          {
            "id": "2",
            "label": "(−, −)"
          }
        ]
      },
      "solution": "The point is left of and below the origin.",
      "hint": "Read the signed coordinates.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Read the signed coordinates.",
        "misconceptions": []
      }
    },
    {
      "id": "r-frequency",
      "prompt": "A signal has period 0.25 s. Find its ordinary frequency.",
      "answer": {
        "kind": "numeric",
        "value": 4,
        "unit": "Hz",
        "acceptedUnits": [
          "Hz"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "Frequency is the reciprocal period: 1/0.25 = 4 cycles/s.",
      "hint": "Count cycles per second.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "Count cycles per second.",
        "misconceptions": []
      }
    },
    {
      "id": "r-phase",
      "prompt": "Adding a constant phase to A cos(ωt) changes:",
      "answer": {
        "kind": "choice",
        "value": "1",
        "options": [
          {
            "id": "0",
            "label": "The repetition period"
          },
          {
            "id": "1",
            "label": "The timing of features"
          },
          {
            "id": "2",
            "label": "The amplitude"
          }
        ]
      },
      "solution": "A constant phase shifts the pattern in time without changing the rate or extremes.",
      "hint": "Separate the three parameters.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Separate the three parameters.",
        "misconceptions": []
      }
    },
    {
      "id": "r-circle",
      "prompt": "On a radius-5 m circle at angle π, find the horizontal coordinate.",
      "answer": {
        "kind": "numeric",
        "value": -5,
        "unit": "m",
        "acceptedUnits": [
          "m"
        ],
        "absoluteTolerance": 0.001,
        "relativeTolerance": 0.002
      },
      "solution": "x = 5 cos π = −5 m.",
      "hint": "The point lies on the negative horizontal axis.",
      "rubric": {
        "defaultCategory": "algebraic",
        "explanation": "The point lies on the negative horizontal axis.",
        "misconceptions": []
      }
    },
    {
      "id": "r-approx",
      "prompt": "Which use of sin θ ≈ θ is justified by the discussion?",
      "answer": {
        "kind": "choice",
        "value": "0",
        "options": [
          {
            "id": "0",
            "label": "For a small angle in radians"
          },
          {
            "id": "1",
            "label": "For every angle in radians"
          },
          {
            "id": "2",
            "label": "For any small degree number without conversion"
          }
        ]
      },
      "solution": "The arc-projection comparison is local and uses radians.",
      "hint": "Ask about size and angle convention.",
      "rubric": {
        "defaultCategory": "conceptual",
        "explanation": "Ask about size and angle convention.",
        "misconceptions": []
      }
    }
  ],
  "diagram": {
    "title": "A projection from the circle",
    "caption": "The radius is drawn at 60°. Its horizontal projection is R/2 and its vertical projection is √3 R/2. The circle and radius use equal horizontal and vertical scales.",
    "viewBox": [
      0,
      0,
      600,
      320
    ],
    "elements": [
      {
        "kind": "ellipse",
        "center": [
          190,
          165
        ],
        "rx": 115,
        "ry": 115,
        "tone": "muted"
      },
      {
        "kind": "line",
        "from": [
          60,
          165
        ],
        "to": [
          330,
          165
        ],
        "tone": "muted"
      },
      {
        "kind": "line",
        "from": [
          190,
          290
        ],
        "to": [
          190,
          30
        ],
        "tone": "muted"
      },
      {
        "kind": "line",
        "from": [
          190,
          165
        ],
        "to": [
          247.5,
          65.407
        ],
        "tone": "accent"
      },
      {
        "kind": "line",
        "from": [
          247.5,
          65.407
        ],
        "to": [
          247.5,
          165
        ],
        "tone": "muted"
      },
      {
        "kind": "point",
        "at": [
          247.5,
          65.407
        ],
        "label": "(R cos θ, R sin θ)",
        "tone": "accent"
      },
      {
        "kind": "label",
        "at": [
          208,
          153
        ],
        "text": "θ"
      },
      {
        "kind": "label",
        "at": [
          305,
          210
        ],
        "text": "x = R/2"
      },
      {
        "kind": "label",
        "at": [
          340,
          245
        ],
        "text": "θ = π/3 rad"
      }
    ]
  },
  "sidebars": [
    {
      "heading": "The sign of angular frequency",
      "body": "For a rotating point, a negative angular frequency describes clockwise rotation. Its period is $2\\pi/|\\omega|$ when $\\omega\\ne0$. A cosine coordinate alone can conceal the direction because cosine is even; keeping both sine and cosine coordinates preserves the orientation."
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
  heading: "When two oscillations reinforce—and when they cancel",
  body: String.raw`Two identical sources produce displacements $A\cos\theta$ and $A\cos(\theta+\phi)$ at one point. Assume the displacements add; this is physical input about the system. The angle-addition identities then give
$$A\cos\theta+A\cos(\theta+\phi)=2A\cos(\phi/2)\cos(\theta+\phi/2).$$
The right-hand side separates two jobs. The second cosine describes the continuing oscillation. The factor in front determines its amplitude, whose nonnegative magnitude is $2A|\cos(\phi/2)|$.

For $\phi=0$ the sources reinforce and the amplitude doubles. For $\phi=\pi$ they cancel at every instant. Both sources can be active while their combined displacement is zero: amplitude is a signed, phase-sensitive contribution before we take its magnitude.

Now change the assumption that the frequencies match. Write the phases as $\omega_1t$ and $\omega_2t$. The sum becomes $2A\cos((\omega_1-\omega_2)t/2)\cos((\omega_1+\omega_2)t/2)$. Nearby frequencies produce a slowly varying envelope around a rapid oscillation—the origin of beats. Nothing new was added to the algebra; a fixed phase difference became a changing one. Later, complex amplitudes and normal modes will make this same separation easier to manage. The physical requirement that the responses add must still be checked.`,
});

export default chapter;
