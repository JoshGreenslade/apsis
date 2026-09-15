import { numeric as n, choice as c, v, mul, op, div, variable } from "@/curriculum-support/authoring";
import type { CurriculumTopic } from "@/types/curriculum";
import { mu, earthRadius } from "../constants";
import { orbitDiagram } from "../diagrams";
import { jpl, freeflyerJ2 } from "../sources";
const j2 = 0.00108263;
const topic: CurriculumTopic = {
  id: "perturbations",
  title: "Beyond the sphere: J₂",
  description:
    "Understand secular drift without discarding the two-body model.",
  domain: "Astrodynamics",
  unit: "04 · Beyond two-body flight",
  prerequisites: ["geometry"],
  minutes: 30,
  diagnostics: [
    c(
      "j2-gate",
      "RAAN locates…",
      [
        "The ascending node in the reference plane",
        "The spacecraft along its ellipse",
        "Periapsis inside the orbital plane",
      ],
      0,
      "RAAN is the reference-plane angle to the ascending node.",
      "Recall which rotation orients the plane.",
      { prerequisiteId: "geometry" },
    ),
    c(
      "j2-gate2",
      "Angular momentum $\\mathbf h=\\mathbf r\\times\\mathbf v$ is constant in the two-body model because gravity is…",
      [
        "Parallel to the position vector",
        "Constant in magnitude",
        "Always tangential to the orbit",
      ],
      0,
      "A force parallel to $\\mathbf r$ contributes nothing to $\\mathbf r\\times\\mathbf F$.",
      "Recall the angular-momentum derivation from the two-body lesson.",
      { prerequisiteId: "geometry" },
    ),
  ],
  teaching: {
    question: "Can a small imperfection in Earth change an orbit every day?",
    why: "The two-body model is powerful because it is simple. Understanding its first correction teaches you when that simplicity is good enough—and when a tiny effect accumulates into a mission constraint.",
    outcomes: [
      "Explain how Earth’s bulge produces a preferred direction.",
      "Predict the sign of nodal drift for prograde and retrograde orbits.",
      "Distinguish a mean trend from the exact instantaneous orbit.",
    ],
    checkpoints: [
      {
        bridge:
          "A perfect sphere looks gravitationally the same from every direction at a given distance. Earth’s equatorial bulge breaks that symmetry. We keep the spherical term and add the largest shape correction.",
        meaning:
          "J₂ scales the leading latitude-dependent correction. Its small value does not mean its long-term consequences are negligible. A weak torque acting on every revolution can noticeably reorient the orbit.",
        question:
          "Why can the spherical term alone not produce a preferred equatorial drift?",
        answer:
          "It has no equator in its mathematics. The force is radial and rotationally symmetric, so it supplies no torque about the attracting center.",
        further: [
          {
            question:
              "Evaluate $P_2(\\sin\\varphi)$ at the equator ($\\varphi=0$) and at a pole ($\\varphi=90^\\circ$). What does the difference tell you?",
            answer:
              "At the equator, $\\sin\\varphi=0$ gives $P_2=-1/2$; at a pole, $\\sin\\varphi=1$ gives $P_2=1$. The correction has opposite sign at these two locations, so the bulge's effect pulls in opposite senses relative to the point-mass baseline depending on latitude.",
          },
          {
            question:
              "Why is angular momentum no longer strictly constant once $J_2$ is included, when it was exactly constant in the two-body model?",
            answer:
              "The two-body proof that $\\mathbf h$ is constant relied on gravity pointing exactly along $\\mathbf r$, so $\\mathbf r\\times\\mathbf F=\\mathbf0$. The $J_2$ potential depends on latitude, so its force has a component off the radial direction, and that proof no longer applies.",
          },
          {
            question:
              "If Earth's distortion instead depended on longitude too (not just latitude), would inclination alone still determine the nodal drift rate?",
            answer:
              "No. A longitude-dependent distortion introduces tesseral and sectorial terms that depend on the spacecraft's position around the equator, not just its inclination. The clean $\\cos i$ dependence here relies specifically on the bulge being symmetric about the spin axis.",
          },
        ],
      },
      {
        bridge:
          "The exact disturbance varies around each orbit. If the question is “where will the plane point next week?”, it helps to average those rapid variations and keep the slow trend.",
        meaning:
          "The cosine of inclination controls the direction of node drift. Prograde orbits usually regress; retrograde orbits usually advance. The formula predicts a mean secular rate, not a perfectly smooth instantaneous node angle.",
        question:
          "What happens to the first-order nodal drift as inclination approaches 90 degrees?",
        answer:
          "Its magnitude approaches zero because cosine approaches zero. The sign changes across a polar inclination. This statement concerns the first-order averaged J₂ term, not every possible perturbation.",
        further: [
          {
            question:
              "At what inclination does the first-order nodal rate exactly reverse sign, from regression to advance?",
            answer:
              "Exactly $i=90^\\circ$, polar orbit, where $\\cos i$ itself crosses zero.",
          },
          {
            question:
              "The apsidal-rate formula uses $(5\\cos^2i-1)$. Is the rate positive or negative for an equatorial orbit, $i=0$?",
            answer:
              "Positive. $\\cos^20=1$, so $5(1)-1=4>0$.",
          },
          {
            question:
              "Both rate formulas share the prefactor $(R/p)^2$. What does this say about how strongly $J_2$ effects depend on altitude?",
            answer:
              "Since $p$ grows with altitude, $(R/p)^2$ shrinks rapidly higher up. $J_2$ effects are strongest for low orbits and fall off quickly with altitude — exactly why sun-synchronous designs are a low-Earth-orbit phenomenon.",
          },
        ],
      },
      {
        bridge:
          "A model earns its place by answering the question you actually have. An ellipse may explain a single coast, an averaged rate may estimate long-term drift, and a detailed force model may be needed to target an encounter.",
        meaning:
          "More equations are not automatically a better explanation. Start with the simplest adequate model, identify its omitted effects, and increase fidelity when the error matters to your goal.",
        question:
          "Does adding J₂ make a two-body trajectory a complete real-world prediction?",
        answer:
          "No. Drag, higher gravity harmonics, third-body attraction, radiation pressure, and uncertainties can also matter. J₂ is one deliberate improvement, not a guarantee of navigation accuracy.",
        further: [
          {
            question:
              "For a spacecraft in a very low, 300 km orbit, which matters more day to day: $J_2$, or atmospheric drag?",
            answer:
              "Both matter, for different things. Drag typically dominates the orbit's decay over days; $J_2$ dominates the plane's slow rotation. A realistic model needs both — neither alone is complete.",
          },
          {
            question:
              "Why can't mean elements and osculating elements be substituted for each other as starting conditions?",
            answer:
              "Mean elements already have short-period oscillations averaged out; osculating elements are the exact instantaneous best-fit ellipse, including that same wiggle. Feeding one representation into a calculation expecting the other introduces a systematic error equal to the oscillation each handles differently.",
          },
          {
            question:
              "A circular orbit still has no well-defined argument of periapsis, yet its apsidal-rate formula can still be evaluated numerically. What does this tell you about that number?",
            answer:
              "It is a mathematical artifact of the averaging, not a physically meaningful rate. Since $\\omega$ itself is undefined for $e=0$, a computed \"rate of change\" for it is not meaningful either — the formula only means something once eccentricity actually defines a periapsis to track.",
          },
        ],
      },
    ],
    takeaway:
      "Small disturbances can produce large accumulated changes. Always distinguish an approximate trend from an exact trajectory.",
    nextConnection:
      "The final lesson changes the dominant attracting body itself, and shows how to join local models without mixing reference frames.",
  },
  theoreticalMinimum: {
    coreIdea: "A small nonspherical correction can create a measurable long-term drift when its short-period effects are averaged over many orbits. The important move is to distinguish the instantaneous osculating state from the slow secular trend, because a small force can accumulate into a large operational effect.",
    widerConnection: "The lesson introduces the model hierarchy between ideal invariants and higher-fidelity numerical mission analysis. It is the point where the course stops asking only whether a formula is correct and begins asking which approximation is adequate for the timescale and decision at hand.",
    primitives: [
      "The spherical potential, Earth radius $R$, and dimensionless coefficient $J_2$",
      "Mean motion $n$, semilatus rectum $p$, inclination $i$, and orbital elements",
      "Mean elements versus instantaneous osculating elements",
    ],
    assumptions: [
      "The correction is axisymmetric, first-order in $J_2$, and averaged over one orbit.",
      "Higher harmonics, drag, third-body gravity, radiation pressure, and uncertainty are omitted.",
      "The quoted rates describe mean secular trends, not exact instantaneous element rates.",
    ],
    governingLaw:
      "Replace the spherical potential by $U=-(\\mu/r)[1-J_2(R/r)^2P_2(\\sin\\varphi)]$, then use its gradient and orbital average to obtain secular node and apsidal rates.",
    invariant:
      "The spherical model has no preferred equatorial direction; $J_2$ introduces a slow nodal and apsidal drift whose strength scales as $J_2n(R/p)^2$ rather than preserving the two-body angular-momentum vector.",
    derivation:
      "Identify the perturbing potential, separate short-period oscillations from long-term trends, average over the fast orbital phase, and interpret the first-order rates through their sign, inclination dependence, and altitude scaling.",
    checks: [
      "At $i=90^\\circ$, $\\cos i=0$ and the first-order nodal rate vanishes.",
      "At $i=\\arccos(1/\\sqrt5)$, the first-order apsidal rate vanishes.",
      "For a circular orbit, $p=r$, and increasing altitude weakens the effect through $(R/p)^2$.",
    ],
    limitingCase:
      "$J_2\\to0$ recovers the fixed-plane two-body model; the critical inclination zeros $\\dot\\omega$ but does not generally zero $\\dot\\Omega$.",
    counterexample:
      "A small coefficient does not guarantee a small accumulated effect, and a secular rate is not the same thing as the instantaneous angle of the orbit.",
    validity:
      "These are first-order, averaged, axisymmetric-$J_2$ trend estimates. Precise orbit maintenance and encounter targeting require higher-fidelity numerical force models.",
  },
  intuition: {
    body: "Give a spinning top a nudge while it is spinning fast, and it does something that looks paradoxical the first time you see it: instead of toppling over in the direction you pushed it, its axis slowly sweeps around in a circle, tracing out a cone. This is precession, and it happens because a fast-spinning object responds to a sideways torque not by immediately tilting toward that torque, but by having its angular momentum vector slowly rotate around the direction the torque is trying to push it. The top does not stop spinning; the whole spin axis just slowly drifts, revolution after revolution, tracing out a lazy circle over many spins.\n\nSomething extremely similar happens to a tilted spacecraft orbit around the real, imperfect Earth. Earth is not a perfect sphere: it bulges very slightly at the equator, a consequence of its own rotation, and this bulge means a tilted orbital plane repeatedly passes through a gravitational field that differs, very slightly, from the perfectly spherical field the last three lessons assumed. Each individual pass contributes only a tiny torque. But — and this is the entire point of the lesson — a tiny torque, applied consistently on every single revolution for months or years, accumulates into something you cannot ignore: the orbital plane itself slowly precesses, exactly like the spinning top's axis, sweeping its ascending node around Earth's equator over time.\n\nFar from being merely a nuisance to correct for, this drift can be turned into a deliberate design tool. A sun-synchronous orbit, used by countless Earth-observation satellites, is deliberately inclined so its $J_2$-driven nodal precession keeps pace with Earth's own yearly trip around the Sun — the satellite passes overhead at the same local solar time on every orbit, year after year, purely because a disturbance that could have been treated as an error was instead treated as a resource.",
    thoughtExperiments: [
      "Why can a tiny acceleration matter greatly after many orbits?",
      "Would a perfectly spherical Earth select an equatorial direction for a torque?",
    ],
  },
  theory: [
    {
      heading: "1. Perturb the point-mass potential",
      body: String.raw`The two-body model derived earlier assumed Earth behaves, gravitationally, exactly like a point mass or a perfect sphere — and it is worth being precise about why that assumption was reasonable there and needs revisiting now. A genuinely spherical mass distribution produces a gravitational field that looks identical from every direction at a given distance; there is no preferred direction anywhere in it. Earth's actual mass distribution is very close to this, but not exactly: it is very slightly flattened at the poles and bulged at the equator, and that bulge introduces a preferred direction, the equatorial plane, into the gravity field itself.

The standard way to capture this correction is to add one more term to the gravitational potential, using geocentric latitude $\varphi$:
$$U=-\frac{\mu}{r}\left[1-J_2\left(\frac{R}{r}\right)^2P_2(\sin\varphi)\right],\qquad P_2(x)=\frac12(3x^2-1).$$
The correction term's job is entirely carried by $P_2(\sin\varphi)$, a function that depends on latitude and nothing else — this is precisely what breaks the spherical symmetry the point-mass model relied on. The acceleration itself follows as $-\nabla U$; for Earth, use the instructional constants $J_2=1.08263\times10^{-3}$ and $R=6378\ \mathrm{km}$, keeping in mind that $J_2$ itself is a dimensionless number, a small correction factor rather than a length or a force. Because this latitude dependence exists, angular momentum, conserved exactly in the pure two-body model of the earlier lessons, is no longer a fixed vector once $J_2$ is included — the very quantity that gave an orbit its unchanging plane is now the thing being slowly disturbed.`,
    },
    {
      heading: "2. Average the rapid orbital motion",
      body: String.raw`A small disturbance acting continuously can, in general, produce two quite different kinds of effect, and separating them is the entire purpose of this section. One part of the disturbance oscillates back and forth over the course of a single orbit and largely cancels itself out by the time the spacecraft returns to where it started — a short-period wiggle, not a lasting change. The other part is a small, one-directional nudge that survives the averaging and accumulates, revolution after revolution, into a genuine long-term trend. If the question you actually care about is "where will this orbital plane point next month?", it is this second, secular part that matters, and the way to isolate it is to average the full disturbance over one complete, rapid orbital revolution and see what survives.

Deriving these averaged rates properly requires perturbation theory that goes beyond this lesson's scope; what follows is the first-order result, offered as a model to interpret and test, not something that falls out by simply substituting the potential above into Newton's equation directly. To first order in $J_2$, the resulting secular rates for the mean orbital elements are
$$\dot\Omega=-\frac32J_2n\left(\frac{R}{p}\right)^2\cos i,$$
$$\dot\omega=\frac34J_2n\left(\frac{R}{p}\right)^2(5\cos^2 i-1),\qquad p=a(1-e^2).$$
With $n$ in rad/s, both rates come out in rad/s. Read the first equation for what it says physically: prograde orbits ($i<90^\circ$, so $\cos i>0$) generally have their nodes regress, drifting backward, while retrograde orbits ($i>90^\circ$) have their nodes advance instead. A polar orbit, at exactly $i=90^\circ$, has a vanishing first-order nodal rate — the bulge's torque, in this particular averaged sense, has nothing left to act on. The second equation similarly vanishes at $\cos^2 i=1/5$, predicting no secular apsidal rotation at that specific critical inclination. Both are statements about the averaged, secular trend; neither claims the instantaneous, moment-to-moment orbit is free of shorter-period wiggling.`,
    },
    {
      heading: "3. Keep a hierarchy of models",
      body: "It is worth stepping back and asking plainly which of several available models actually suits the question in front of you, rather than reflexively reaching for the most detailed one available. For a rough qualitative sketch of a single coast, the fixed two-body ellipse from three lessons ago remains entirely adequate — J₂'s effect over one orbit is genuinely small. For understanding how an orbital plane evolves over weeks or months, the averaged secular rates derived above are the right tool: they capture exactly the long-term trend that matters at that timescale, while deliberately discarding short-period detail that would only add noise to the question being asked. For actually targeting a precise encounter or maintaining a real operational orbit, none of this is enough; that requires numerically integrating a genuine force model, including higher gravity harmonics beyond J₂, atmospheric drag, third-body attraction and radiation pressure together.\n\nOne easy trap is worth flagging explicitly: mean elements, the smoothed, averaged description used in section two, and osculating elements, the instantaneous best-fit ellipse at one exact moment, are not interchangeable starting conditions for a calculation, even though both are reported using the same six familiar symbols. And a circular orbit still has no well-defined argument of periapsis, exactly as in the geometry lesson, even once a formal apsidal-rate expression has been written down for it — a rate for an angle that does not exist is a mathematical artifact of the averaging, not a physically meaningful quantity.",
    },
  ],
  diagram: orbitDiagram,
  sidebars: [
    {
      heading: "The J₂ term is not the entire gravity field",
      body: "Higher zonal terms add latitude structure; tesseral and sectorial terms add longitude dependence in the rotating Earth frame. Drag exchanges energy with an atmosphere; third-body gravity depends on other bodies’ positions. Do not fit every observed drift by adjusting a single coefficient.",
    },
  ],
  workedExample: {
    title: "Nodal regression in low Earth orbit",
    problem: "Estimate the node rate for $a=7000$ km, $e=0$, $i=28.5^\\circ$.",
    steps: [
      {
        title: "Choose mean elements and units",
        body: "$p=7000\ \\mathrm{km}$ and $n=\\sqrt{\\mu/a^3}=0.00107801\ \\mathrm{rad/s}$.",
        reason:
          "The averaged expression requires the mean motion and semilatus rectum.",
        trap: "Use radians for trigonometric functions in software.",
      },
      {
        title: "Evaluate the signed rate",
        body: "$\\dot\\Omega\\simeq-1.277\\times10^{-6}\ \\mathrm{rad/s}$.",
        reason:
          "The positive cosine of a prograde inclination gives a negative rate.",
        trap: "A magnitude alone hides whether the node advances or regresses.",
      },
      {
        title: "Make the drift interpretable",
        body: "Multiply by $86400\\times180/\\pi$: approximately $-6.323$ degrees per day.",
        reason: "A small instantaneous rate accumulates noticeably over days.",
        trap: "This predicts secular drift, not the exact short-period node angle.",
      },
    ],
  },
  fadedExercise: {
    prompt: "Use a circular 7000 km orbit inclined at 60°.",
    supplied: [
      {
        heading: "Coefficient supplied",
        body: "$C=\\tfrac32 J_2 n(R/p)^2=1.45333\\times10^{-6}\ \\mathrm{s^{-1}}$.",
      },
    ],
    steps: [
      n(
        "j2-f1",
        "Calculate the nodal rate in degrees per day.",
        (-1.5 *
          j2 *
          Math.sqrt(mu / 7000 ** 3) *
          (earthRadius / 7000) ** 2 *
          0.5 *
          86400 *
          180) /
          Math.PI,
        "deg/day",
        "The rate is approximately $-3.5973$ deg/day.",
        "Use $-C\\cos i$, then convert the time and angular units.",
      ),
      c(
        "j2-f2",
        "Is this nodal rate a regression (westward drift) or an advance (eastward drift)?",
        ["Regression", "Advance", "Neither; the node is fixed"],
        0,
        "A negative $\\dot\\Omega$ for this prograde orbit means the node drifts westward: regression.",
        "Recall the sign convention linking prograde inclination to node direction.",
      ),
    ],
  },
  retrievalProblems: [
    c(
      "j2-r1",
      "For a retrograde nonpolar Earth orbit, the first-order J₂ nodal rate is…",
      ["Positive", "Negative", "Always zero"],
      0,
      "For $i>90^\\circ$, $\\cos i<0$, reversing the sign of $\\dot\\Omega$.",
      "Trace the two minus signs.",
    ),
    n(
      "j2-r2",
      "Find the prograde critical inclination where the first-order secular apsidal rate vanishes.",
      (Math.acos(Math.sqrt(0.2)) * 180) / Math.PI,
      "deg",
      "$i=\\arccos(1/\\sqrt5)\\simeq63.43495^\\circ$.",
      "Set the angular factor in the apsidal-rate expression to zero.",
    ),
    n(
      "j2-r3",
      "Estimate the nodal rate in degrees per day for a circular Earth orbit at $r=7500$ km, $i=51.6^\\circ$ (roughly the ISS inclination).",
      (-1.5 *
        j2 *
        Math.sqrt(mu / 7500 ** 3) *
        (earthRadius / 7500) ** 2 *
        Math.cos((51.6 * Math.PI) / 180) *
        86400 *
        180) /
        Math.PI,
      "deg/day",
      "Substitute directly into $\\dot\\Omega=-\\tfrac32J_2n(R/p)^2\\cos i$, then convert units.",
      "For a circle, $p=r$.",
    ),
    c(
      "j2-r4",
      "A mission wants zero nodal drift without flying polar. Besides $i=90^\\circ$, does another inclination achieve this in the first-order model?",
      [
        "No, only the polar inclination gives zero nodal rate",
        "Yes, the same critical inclination that zeroes the apsidal rate",
        "Yes, any equatorial orbit",
      ],
      0,
      "The nodal rate depends only on $\\cos i$, which is zero uniquely at $i=90^\\circ$ in this first-order model.",
      "Distinguish the nodal-rate zero from the apsidal-rate zero — they are different conditions.",
    ),
  ],
  practical: {
    title: "Lab 5 · Measure a secular drift",
    minutes: 90,
    brief:
      "Extend the two-body propagator from Lab 1 with the $J_2$ acceleration, or use a numerical orbit tool that exposes the force model. Compare the ideal two-body orbit with the perturbed orbit and separate short-period motion from the long-term secular trend.",
    steps: [
      "Choose one inclined Earth orbit and record $a$, $e$, $i$, $p$, and the initial RAAN and argument of periapsis. State whether your plotted elements are osculating or mean elements.",
      "Propagate the same initial state with $J_2=0$ and with the stated $J_2$ value. Use the same integrator, timestep, duration, and output sampling in both runs.",
      "Plot RAAN and argument of periapsis against time. Fit a straight line to the long-term trend and compare its slope with the first-order averaged formulas, while showing the short-period residuals around that fit.",
      "Repeat for a near-polar inclination and for the critical inclination. Predict which rate should approach zero before running each case, then compare the numerical result with the prediction.",
      "Vary altitude or semilatus rectum while holding the other choices explicit. Explain whether the observed change is consistent with the $(R/p)^2$ scaling and identify where the first-order model becomes inadequate.",
    ],
    deliverables: [
      "A table of force model, duration, timestep, initial elements, fitted nodal rate, and fitted apsidal rate",
      "Overlaid plots for two-body and $J_2$ RAAN and apsidal angle, with units and angle unwrapping stated",
      "A comparison between measured slopes and the quoted secular formulas",
      "A short explanation of mean versus osculating elements and the residual short-period variation",
      "One limitation that belongs to the physical force model and one that belongs to the numerical method",
    ],
    review:
      "A strong result uses identical numerical settings for the control and perturbed runs, unwraps angular data before fitting, and reports the fit interval. The two-body control should keep its orbital plane fixed apart from numerical drift; $J_2$ should produce a secular nodal trend whose sign changes across polar inclination, while the apsidal trend approaches zero near the critical inclination. The quoted expressions are first-order averaged rates, so short-period oscillations and differences between mean and osculating elements are expected. Do not infer that a small instantaneous residual disproves a long-term drift, and do not attribute integrator drift to $J_2$ without comparing the control run.",
  },
  sources: [freeflyerJ2, jpl],
};
topic.practiceTemplates = [
  {
    id: "node-variant",
    title: "Predict nodal drift",
    prompt:
      "For a circular Earth orbit of radius {{r}} km at inclination {{i}} degrees, find the first-order mean J₂ nodal rate in degrees/day. Use μ = 398600.4418 km³/s², R = 6378 km, and J₂ = 0.00108263.",
    variables: [variable("r", 7000, 9000, 500), variable("i", 20, 120, 10)],
    formula: mul(
      mul(
        mul(-1.5 * j2, op("sqrt", div(mu, op("power", v("r"), 3)))),
        op("power", div(earthRadius, v("r")), 2),
      ),
      mul(op("cos", mul(v("i"), Math.PI / 180)), (86400 * 180) / Math.PI),
    ),
    unit: "deg/day",
    hint: "Use the nodal-rate expression, preserve its sign, and convert radians per second to degrees per day.",
    solution: String.raw`For a circle $p=r={{r}}$ km. Substitute into $\dot\Omega=-\frac32 J_2\sqrt{\mu/r^3}(R/r)^2\cos i$, then multiply by $86400(180/\pi)$. The mean rate is {{answer}} deg/day.`,
  },
];
export default topic;
