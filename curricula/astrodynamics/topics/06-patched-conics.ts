import { numeric as n, choice as c, v, add, sub, mul, div, sqrt, op, variable } from "@/curriculum-support/authoring";
import type { CurriculumTopic } from "@/types/curriculum";
import { mu, circ, speed, period } from "../constants";
import { orbitDiagram } from "../diagrams";
import { nasa, jpl } from "../sources";
const vc = (r: ReturnType<typeof v>) => sqrt(div(mu, r));
const topic: CurriculumTopic = {
  id: "patched-conics",
  title: "Escape & patched conics",
  description:
    "Join local two-body arcs while keeping reference frames explicit.",
  domain: "Astrodynamics",
  unit: "04 · Beyond two-body flight",
  prerequisites: ["two-body", "hohmann"],
  minutes: 35,
  diagnostics: [
    c(
      "patch-g1",
      "An unbound hyperbolic orbit has specific energy…",
      ["Positive", "Negative", "Always zero"],
      0,
      "Positive energy leaves nonzero speed at infinity.",
      "Use the zero of potential at infinity.",
      { prerequisiteId: "two-body" },
    ),
    c(
      "patch-g2",
      "The Δv of an impulse is…",
      [
        "Postburn velocity minus preburn velocity",
        "Postburn speed in every circumstance",
        "The change in altitude",
      ],
      0,
      "Use vector subtraction in one common frame.",
      "A burn changes velocity immediately, not position.",
      { prerequisiteId: "hohmann" },
    ),
    n(
      "patch-g3",
      "Find escape speed at an Earth-centered radius of 6678 km.",
      Math.sqrt((2 * mu) / 6678),
      "km/s",
      "$v_{esc}=\\sqrt{2\\mu/r}\\simeq10.92367\ \\mathrm{km/s}$.",
      "This is the $v_\\infty=0$ limit of the departure speed used in this lesson.",
      { prerequisiteId: "two-body" },
    ),
  ],
  teaching: {
    question: "What changes when a spacecraft leaves Earth’s neighborhood?",
    why: "Escape speed is only the start of an interplanetary story. You need to know what speed remains after climbing out, and how that motion combines with the planet’s motion around the Sun.",
    outcomes: [
      "Convert hyperbolic excess speed into a departure burn.",
      "Add velocities in a common reference frame.",
      "Make an Earth-to-lunar-distance estimate and identify its missing encounter physics.",
    ],
    checkpoints: [
      {
        bridge:
          "Imagine coasting farther and farther from Earth after a burn. Gravity keeps reducing your speed. If energy is positive, a residual speed remains even when Earth’s potential tends to zero. That residual is hyperbolic excess speed.",
        meaning:
          "The departure speed must pay for climbing out of the gravity well and still leave the specified excess. The burn is the difference between that required local speed and your existing parking-orbit velocity.",
        question:
          "If you ask for zero hyperbolic excess speed, does the departure burn become zero?",
        answer:
          "No. Zero excess means reaching infinity with zero remaining speed: the parabolic escape boundary. You still need to increase a circular parking speed to the local escape speed.",
        further: [
          {
            question:
              "Confirm that setting $v_\\infty=0$ in $v_p=\\sqrt{v_\\infty^2+2\\mu/r_p}$ recovers exactly the escape-speed formula from the two-body lesson.",
            answer:
              "With $v_\\infty=0$, $v_p=\\sqrt{2\\mu/r_p}$ — precisely the escape-speed expression derived earlier, confirming the two formulas agree at this limiting case.",
          },
          {
            question:
              "Why is the hyperbolic semimajor axis defined with a negative sign, $a=-\\mu/v_\\infty^2$, rather than positive as for an ellipse?",
            answer:
              "It keeps the single relation $\\varepsilon=-\\mu/(2a)$ valid across every conic type. A hyperbola has positive energy, so $a$ itself must be negative for $-\\mu/(2a)$ to come out positive.",
          },
          {
            question:
              "A mission needs $v_\\infty=4$ km/s from either a 7000 km or a 42000 km circular parking orbit. Which radius needs the larger injection $\\Delta v$?",
            answer:
              "Perhaps surprisingly, the 7000 km orbit needs the larger $\\Delta v$ (about 3.85 km/s, versus about 2.83 km/s from 42000 km). Both the required departure speed and the existing circular speed grow at lower altitude, but the difference between them, the actual burn, grows too — a fixed asymptotic target costs more from deeper in the well, even though the Oberth effect makes each unit of $\\Delta v$ more effective there in other contexts.",
          },
        ],
      },
      {
        bridge:
          "Now switch maps. Earth-relative motion describes leaving Earth; Sun-relative motion describes the larger journey. Changing the origin does not cause a physical burn—it changes how the same velocity is represented.",
        meaning:
          "Add vectors, not bare speeds. Leaving in Earth’s direction of travel can increase heliocentric energy; leaving against it can reduce that energy, even for the same planet-relative excess speed.",
        question:
          "Can two departures with equal excess-speed magnitudes lead to very different heliocentric orbits?",
        answer:
          "Yes. Their excess vectors can point in different directions relative to the planet’s heliocentric velocity. The vector sum changes both the magnitude and direction of the spacecraft’s solar-relative motion.",
        further: [
          {
            question:
              "A spacecraft's excess velocity relative to Earth points exactly opposite Earth's own heliocentric velocity. What happens to its heliocentric speed?",
            answer:
              "The two vectors subtract, reducing the spacecraft's heliocentric speed relative to Earth's own — this is the basic idea behind trajectories designed to fall inward toward the Sun rather than outward.",
          },
          {
            question:
              "Does the sphere-of-influence radius $r_{SOI}\\simeq a_{planet}(m_{planet}/M_\\odot)^{2/5}$ depend on the spacecraft at all?",
            answer:
              "No. It depends only on the planet's orbital distance and its mass ratio to the Sun — a property of the planet–Sun system, not of any particular spacecraft trajectory passing through it.",
          },
          {
            question:
              "Why is the planet-relative speed measured at a finite real boundary not exactly $v_\\infty$?",
            answer:
              "$v_\\infty$ is defined at true infinity, where potential energy is exactly zero. At any finite radius, even a large sphere of influence, the planet's potential well still has a small nonzero effect, so the finite-radius speed only approximates the idealized far-field value.",
          },
        ],
      },
      {
        bridge:
          "Bring the pieces together with an intentionally limited lunar estimate. First ask how much energy reaches lunar distance in an Earth-centered ellipse. Then ask which parts of an actual Moon encounter that ellipse cannot answer.",
        meaning:
          "A distance target is not a moving-body intercept. The Moon has its own velocity and gravity. Arrival timing, approach direction, and capture must be analyzed after the Earth-only energy estimate.",
        question:
          "What important quantity cannot be obtained by calling the transfer’s apoapsis speed “the lunar arrival speed”?",
        answer:
          "The Moon-relative encounter velocity. You must subtract the Moon’s velocity vector in the same frame, then model the lunar approach and any insertion burn. Earth-relative speed alone is insufficient.",
        further: [
          {
            question:
              "Does the coast-time formula used here (half the ellipse period) already account for the Moon's own gravitational pull on the spacecraft?",
            answer:
              "No. The coast time comes purely from the Earth-centered two-body ellipse, exactly as in the Hohmann lesson. The Moon's gravity is entirely omitted until the stated encounter point.",
          },
          {
            question:
              "The ellipse's apoapsis is set at exactly the Moon's average distance, 384400 km. Does arriving at that radius guarantee arriving near the Moon itself?",
            answer:
              "No. The Moon must actually occupy that same point in its own orbit at the same time. Matching radius alone says nothing about the Moon's angular position, which requires timing the departure to the Moon's own motion separately.",
          },
          {
            question:
              "Why can't the injection $\\Delta v$ computed here be treated as the complete propellant budget for a lunar mission?",
            answer:
              "It covers only the departure injection onto the Earth–Moon transfer ellipse. It omits any mid-course corrections, and entirely omits the separate lunar orbit insertion or capture burn needed once the spacecraft nears the Moon — that final stage needs its own Moon-centered analysis with the Moon's own $\\mu$.",
          },
        ],
      },
    ],
    takeaway:
      "A patched-conic estimate joins local models through consistent position and velocity. The reference frame is part of every number.",
    nextConnection:
      "Return to the course challenge: explain a lunar-distance journey in words, attach a first burn and time estimate, and list what a real mission analysis must add.",
  },
  theoreticalMinimum: {
    coreIdea: "Patched conics estimate a multi-body journey by joining local two-body arcs while keeping velocity vectors and reference frames explicit. The approximation is useful precisely because it separates a difficult mission into understandable local problems, provided the joins are treated as modelling boundaries rather than physical discontinuities.",
    widerConnection: "It turns the earlier energy, transfer, and timing ideas into a mission-level estimate and makes the omitted physics visible. The final capstone asks the learner to preserve that honesty while combining calculations into a defensible preliminary design rather than mistaking a first estimate for a flight-ready trajectory.",
    primitives: [
      "Specific energy, hyperbolic excess speed $v_\\infty$, and characteristic energy $C_3$",
      "Planet-relative and heliocentric velocity vectors",
      "Sphere of influence, departure radius, and target-body state",
    ],
    assumptions: [
      "Departure is an ideal two-body hyperbola around one planet with an instantaneous tangential injection.",
      "Patched-conic boundaries are approximate bookkeeping surfaces, not physical discontinuities.",
      "The lunar-distance estimate postpones lunar gravity, lunar motion, encounter geometry, and capture until after the Earth-centred coast.",
    ],
    governingLaw:
      "Set the desired positive energy at infinity, solve $v_p=\\sqrt{v_\\infty^2+2\\mu/r_p}$ locally, and vector-add the planet's heliocentric velocity to the planet-relative excess velocity in one common frame.",
    invariant:
      "A frame change creates no impulse, and velocities must be vector-added or subtracted in a shared basis. Reaching a radius is not equivalent to reaching a moving body.",
    derivation:
      "Choose the residual energy at infinity, equate it to local kinetic plus potential energy, subtract parking-orbit speed for injection, transform the outgoing state, and then state explicitly which target-body physics the patch has omitted.",
    checks: [
      "$v_\\infty=0$ gives parabolic escape but still requires nonzero injection $\\Delta v$.",
      "$C_3$ has units of squared speed and is not itself a burn magnitude.",
      "Equal excess-speed magnitudes can produce different heliocentric orbits because their directions differ.",
    ],
    limitingCase:
      "As distance tends to infinity, planet-relative speed approaches $v_\\infty$; positive $v_\\infty$ gives a hyperbola with negative semimajor axis, while zero gives the parabolic boundary.",
    counterexample:
      "An Earth-centred ellipse reaching lunar distance is not automatically a lunar transfer: the Moon may be elsewhere, with a different velocity, and capture needs a separate Moon-centred analysis.",
    validity:
      "Patched conics are preliminary, piecewise two-body estimates. Low-energy transfers, weak-stability boundaries, long multi-body residence, and precise encounters require restricted-three-body or full numerical dynamics.",
  },
  intuition: {
    body: "Picture Earth's gravity as a steep-sided bowl carved into a much larger, much shallower basin — the Sun's own gravitational field, which extends across the entire solar system but is so gentle near Earth that it is easy to forget it is even there. A spacecraft climbing out of the steep bowl is, from up close, entirely dominated by Earth: every calculation in the last five lessons assumed exactly this, using Earth's $\\mu$ and nothing else. But climb far enough, and the bowl's walls flatten out into the much larger, much gentler slope of the basin beneath it. The spacecraft has not jumped or changed anything about its motion at that boundary; it is simply that describing its motion using Earth alone stops being the useful approximation, and describing it using the Sun instead becomes the useful one.\n\nPatched conics is the name for exactly this trick: modeling a long journey as a sequence of separate, ideal two-body arcs, each dominated by whichever single body happens to matter most in that region, and stitching the arcs together at the boundaries where dominance switches hands. It is a genuinely useful simplification, precisely because each individual arc reuses everything the previous five lessons already built — vis-viva, energy, the six elements — rather than requiring some entirely new three-body theory. But the stitching itself demands real care: position and velocity have to agree at the seam, expressed in one consistent frame, or the two arcs will describe two different spacecraft rather than one continuous journey.\n\nA Moon-bound trajectory is the cleanest way to see both the power and the limit of this idea at once. An Earth-centered ellipse that reaches lunar distance answers a real, useful energy question: how much of a push does it take to get that far out? But reaching a distance is not the same as reaching a body. The Moon has to actually be at that point in space when the spacecraft arrives, and the spacecraft has to arrive with a velocity, relative to the Moon specifically, that some further plan can actually work with — neither of which an Earth-only energy estimate can tell you on its own.",
    thoughtExperiments: [
      "Does switching from Earth-relative speed to Sun-relative speed require an engine burn?",
      "Why does reaching lunar distance not by itself guarantee lunar capture?",
    ],
  },
  theory: [
    {
      heading: "1. Hyperbolic excess is an energy parameter",
      body: String.raw`Escape speed, from the two-body lesson, is a threshold: exactly enough energy to reach infinity with nothing left over. A real interplanetary mission usually wants more than that threshold — it wants to arrive far from the planet still carrying some residual speed, to be used for whatever comes next. Call that leftover speed $v_\infty$, the hyperbolic excess speed. In the idealized local two-body model, the gravitational potential genuinely tends to zero far from the planet, so the specific energy simplifies to just its kinetic half there: $\varepsilon=v_\infty^2/2$.

That same fixed energy, evaluated back at periapsis instead of at infinity, must satisfy $v_p^2/2-\mu/r_p=v_\infty^2/2$. Multiply through by two and rearrange, and the departure speed follows directly:
$$v_p=\sqrt{v_\infty^2+\frac{2\mu}{r_p}},\qquad C_3=v_\infty^2.$$
Notice, and this is worth internalizing rather than just memorizing, that the squared speeds add here, not the speeds themselves. Simply adding $v_\infty$ onto the local escape speed would assign a different, incorrect energy to the departure — energy bookkeeping happens in squared-speed terms, because that is what specific energy actually is. Setting $v_\infty=0$ collapses this formula back to exactly the local escape threshold from the two-body lesson, a reassuring check that the new formula generalizes the old one rather than replacing it.

From a circular parking orbit, a tangential, prograde injection burn is $\Delta v=v_p-\sqrt{\mu/r_p}$ — a subtraction, because the spacecraft already carries circular speed before the engine ever fires. The resulting hyperbolic orbit has a semimajor axis that is, by convention, negative: $a=-\mu/v_\infty^2<0$, a sign worth respecting rather than silently dropping, since substituting a positive ellipse-style semimajor axis into a hyperbola formula produces nonsense. $C_3$, meanwhile, is reported in units of squared speed; it is a convenient energy-like bookkeeping parameter mission designers quote constantly, not a burn size in its own right.`,
    },
    {
      heading: "2. Patch in a common frame",
      body: String.raw`With a departure trajectory in hand, the next question is how that motion, described relative to Earth, connects to the much larger heliocentric journey the spacecraft is actually undertaking. In the idealized asymptotic patch, the spacecraft's velocity relative to the Sun, once it is genuinely clear of Earth's influence, is simply the planet's own heliocentric velocity plus the spacecraft's excess velocity relative to the planet:
$$\mathbf v_{sc,\odot}=\mathbf v_{planet,\odot}+\mathbf v_{\infty,planet}.$$
This is vector addition, and direction is doing real work here, not just magnitude. Two departures with exactly the same excess speed can produce very different heliocentric orbits, depending on which direction that excess velocity points relative to Earth's own motion around the Sun — a prograde departure adds to Earth's heliocentric speed, while a retrograde one subtracts from it, even though both departures cost the same $\Delta v$ locally.

The boundary at which this switch of dominant body actually happens is not a hard wall in reality, but it is convenient to model it as one. A rough scale for it, the Laplace sphere of influence, is $r_{SOI}\simeq a_{planet}(m_{planet}/M_\odot)^{2/5}$ — a useful approximation for where Earth's gravity and the Sun's are roughly comparable in their local effect, not a literal discontinuity nature respects. At any finite, chosen boundary, both position and velocity have to be transformed and matched consistently between the two frames; a spacecraft's speed relative to Earth at that finite boundary is close to, but not exactly, the idealized asymptotic $v_\infty$ used in section one.`,
    },
    {
      heading: "3. An Earth–Moon energy estimate",
      body: String.raw`Bring the pieces together for a genuinely useful, if deliberately limited, estimate: how much does it cost, and how long does it take, to reach the Moon's distance from Earth, ignoring the Moon itself for the moment? Build an Earth-centered ellipse with $r_p=6678$ km and $r_a=384400$ km, giving $a=195539$ km. Vis-viva, from the very first lesson of this course, gives the required injection speed directly, and Kepler's third law gives the coast time to apoapsis as half of that ellipse's period.

This estimate deliberately ignores both the Moon's own motion and its gravity until the moment of encounter — a genuinely useful first pass, but one whose limitations are worth stating plainly rather than glossing over. The apoapsis speed this calculation produces is Earth-relative, not Moon-relative; getting a genuine encounter estimate requires subtracting the Moon's own vector velocity, in a shared frame, from the spacecraft's Earth-relative velocity at that point — exactly the same vector-addition discipline from the previous section, run in reverse. And reaching lunar orbit, rather than merely flying past the Moon, needs a further, separate stage entirely: a Moon-centered hyperbolic approach, analyzed with the Moon's own $\mu$, followed by a capture burn that no Earth-only ellipse can supply on its own.`,
    },
  ],
  diagram: orbitDiagram,
  sidebars: [
    {
      heading: "Why the patch can fail",
      body: "Low-energy transfers, libration-point dynamics and long residence near multiple massive bodies require restricted-three-body or higher-fidelity models. Patched conics are useful for preliminary budgets, but cannot resolve weak stability boundaries or guarantee encounter targeting.",
    },
  ],
  workedExample: {
    title: "Inject from a 300 km Earth parking orbit",
    problem:
      "Require $v_\\infty=3$ km/s. Assume an impulsive prograde departure at $r_p=6678$ km.",
    steps: [
      {
        title: "Compute the hyperbolic energy",
        body: "$C_3=9\ \\mathrm{km^2/s^2}$ and $\\varepsilon=4.5\ \\mathrm{km^2/s^2}$.",
        reason: "At infinity, the potential term vanishes.",
        trap: "Do not equate excess speed with injection Δv.",
      },
      {
        title: "Find speed at departure",
        body: `$v_p=\\sqrt{9+2\\mu/6678}=${Math.sqrt(9 + (2 * mu) / 6678).toFixed(5)}\\ \\mathrm{km/s}$.`,
        reason:
          "The local hyperbolic speed includes both excess energy and the planetary potential well.",
        trap: "The sign before the gravity term is positive.",
      },
      {
        title: "Subtract parking-orbit velocity",
        body: `$\\Delta v=${(Math.sqrt(9 + (2 * mu) / 6678) - circ(6678)).toFixed(5)}\\ \\mathrm{km/s}$.`,
        reason:
          "The collinear prograde assumption permits subtraction of magnitudes.",
        trap: "A required asymptote direction may require additional targeting or plane-change costs.",
      },
    ],
  },
  fadedExercise: {
    prompt:
      "Estimate an Earth-only transfer from 6678 km to lunar distance 384400 km.",
    supplied: [
      {
        heading: "Ellipse supplied",
        body: "$a=195539\ \\mathrm{km}$; the Moon’s gravity is omitted in this estimate.",
      },
    ],
    steps: [
      n(
        "patch-f1",
        "Compute the prograde injection Δv from the circular parking orbit.",
        speed(6678, 195539) - circ(6678),
        "km/s",
        `The injection is ${(speed(6678, 195539) - circ(6678)).toFixed(5)} km/s.`,
        "Subtract circular speed from transfer periapsis speed.",
      ),
      n(
        "patch-f2",
        "Find the coast time to apoapsis in days.",
        period(195539) / 2 / 86400,
        "day",
        `Half the ellipse period is ${(period(195539) / 2 / 86400).toFixed(5)} days.`,
        "Kepler’s period uses seconds with this gravitational parameter.",
      ),
      n(
        "patch-f3",
        "Suppose instead this transfer needed to leave with hyperbolic excess $v_\\infty=1.5$ km/s beyond escape, departing from the same 6678 km parking radius. Find the new injection Δv.",
        Math.sqrt(1.5 ** 2 + (2 * mu) / 6678) - circ(6678),
        "km/s",
        `$\\Delta v=\\sqrt{v_\\infty^2+2\\mu/r_p}-\\sqrt{\\mu/r_p}\\simeq${(Math.sqrt(1.5 ** 2 + (2 * mu) / 6678) - circ(6678)).toFixed(5)}\\ \\mathrm{km/s}$.`,
        "Add the squared excess speed to $2\\mu/r_p$ inside the root, then subtract circular speed.",
      ),
    ],
  },
  retrievalProblems: [
    n(
      "patch-r1",
      "An Earth departure needs $v_\\infty=2$ km/s from a 7000 km circular parking radius. Find the tangential injection Δv.",
      Math.sqrt(4 + (2 * mu) / 7000) - circ(7000),
      "km/s",
      `The ideal impulse is ${(Math.sqrt(4 + (2 * mu) / 7000) - circ(7000)).toFixed(5)} km/s.`,
      "Connect hyperbolic energy to the parking-orbit state.",
    ),
    c(
      "patch-r2",
      "To combine planetary heliocentric motion with planet-relative departure motion, use…",
      [
        "Vector addition in a shared inertial basis",
        "The sum of speed magnitudes for every direction",
        "The Earth escape speed alone",
      ],
      0,
      "Transform both vectors to a shared basis, then add. Magnitudes alone lose direction.",
      "Distinguish a reference-frame change from a physical impulse.",
    ),
    n(
      "patch-r3",
      "Find $C_3$ for a departure with hyperbolic excess speed $v_\\infty=3.5$ km/s.",
      3.5 ** 2,
      "km^2/s^2",
      "$C_3=v_\\infty^2=12.25\ \\mathrm{km^2/s^2}$.",
      "$C_3$ is simply the square of the excess speed.",
    ),
    c(
      "patch-r4",
      "A hyperbolic departure trajectory has semimajor axis…",
      ["Always positive", "Always negative", "Equal to periapsis radius"],
      1,
      "The signed convention keeps $\\varepsilon=-\\mu/(2a)$ valid for all conics; positive energy forces $a<0$.",
      "Recall which sign of energy corresponds to a hyperbola.",
    ),
    n(
      "patch-r5",
      "From a 6800 km circular parking orbit, find the injection Δv needed for $v_\\infty=2.5$ km/s.",
      Math.sqrt(2.5 ** 2 + (2 * mu) / 6800) - circ(6800),
      "km/s",
      `$\\Delta v\\simeq${(Math.sqrt(2.5 ** 2 + (2 * mu) / 6800) - circ(6800)).toFixed(5)}\\ \\mathrm{km/s}$.`,
      "Build the hyperbolic departure speed first, then subtract circular speed.",
    ),
    c(
      "patch-r6",
      "Reaching a distance equal to the Moon's orbital radius in an Earth-centered ellipse guarantees…",
      [
        "A lunar encounter",
        "Only that the spacecraft reaches that distance from Earth at some point",
        "Automatic capture into lunar orbit",
      ],
      1,
      "Distance alone says nothing about the Moon's position or the spacecraft's velocity relative to it.",
      "Separate an energy estimate from a genuine rendezvous condition.",
    ),
  ],
  practical: {
    title: "Capstone · From parking orbit to a defensible lunar estimate",
    minutes: 120,
    brief:
      "Build a preliminary Earth-to-lunar-distance mission estimate from a circular parking orbit. You may use a notebook, spreadsheet, or script, but every number must carry a frame, unit system, model assumption, and stated uncertainty or sensitivity.",
    steps: [
      "Choose a circular parking orbit and a departure direction. Compute its circular speed, the Earth-centred transfer ellipse to 384400 km, the departure burn, and the coast time to the transfer apoapsis.",
      "Declare every reference frame and write the velocity transformation from the Earth-centred departure state to a heliocentric state. Explain which terms are vector additions and which are physical burns.",
      "Estimate the Moon's angular position at departure and arrival using a deliberately stated circular-motion approximation. Decide whether the transfer geometry actually produces a lunar encounter or merely reaches lunar distance.",
      "Compute the arrival velocity relative to the Moon by subtracting the Moon's velocity vector in a common frame. State what a capture or insertion calculation would still need.",
      "Perform a sensitivity study by varying at least two inputs, such as parking-orbit altitude, departure energy, or departure phase. Compare the result with a patched-conic or higher-fidelity reference if available, and explain every discrepancy you can attribute.",
      "Write a final model ledger: what was derived, what was assumed, what was numerically approximated, what was verified, and what remains outside the estimate.",
    ],
    deliverables: [
      "A mission table containing radii, speeds, burns, coast time, frames, and units",
      "A diagram or state table showing Earth-centred, Moon-centred, and heliocentric velocity descriptions",
      "A phase and encounter calculation that distinguishes lunar distance from lunar rendezvous",
      "A sensitivity table for at least two changed inputs",
      "A model ledger and a keep/change/stop judgement about the fidelity of the estimate",
    ],
    review:
      "A defensible submission keeps the Earth-centred ellipse, heliocentric patch, and Moon-relative arrival calculation separate rather than blending their velocities into one scalar. It states that a frame transformation is not a burn, that $C_3$ is an energy-like quantity rather than a propellant budget, and that reaching 384400 km does not establish encounter or capture. A useful sensitivity study changes one input at a time before combining changes. The estimate is successful when its assumptions and omitted physics are visible; numerical agreement with a reference is not enough if the frames or denominators are unclear.",
  },
  sources: [nasa, jpl],
};
topic.practiceTemplates = [
  {
    id: "escape-variant",
    title: "Leave the gravity well",
    prompt:
      "From an Earth circular parking radius of {{r}} km, find the ideal prograde injection Δv for a hyperbolic excess speed of {{excess}} km/s. Use μ = 398600.4418 km³/s².",
    variables: [
      variable("r", 7000, 9000, 500),
      variable("excess", 1, 5, 0.5),
    ],
    formula: sub(sqrt(add(op("power", v("excess"), 2), div(2 * mu, v("r")))), vc(v("r"))),
    unit: "km/s",
    hint: "The hyperbolic local speed includes the excess-energy term and Earth’s potential well. Subtract the parking speed.",
    solution: String.raw`$\Delta v=\sqrt{v_\infty^2+2\mu/r}-\sqrt{\mu/r}={{answer}}\ \mathrm{km/s}$ for the supplied {{r}} km radius and {{excess}} km/s excess speed.`,
  },
];
export default topic;
