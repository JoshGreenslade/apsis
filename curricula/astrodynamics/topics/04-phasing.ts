import { numeric as n, choice as c, v, mul, op, variable } from "@/curriculum-support/authoring";
import type { CurriculumTopic } from "@/types/curriculum";
import { mu, practiceTransfer as practice } from "../constants";
import { transferDiagram } from "../diagrams";
import { nasa } from "../sources";
const topic: CurriculumTopic = {
  id: "phasing",
  title: "Phasing & plane changes",
  description: "Distinguish arriving at an orbit from meeting a moving target.",
  domain: "Astrodynamics",
  unit: "03 · Orbital maneuvers",
  prerequisites: ["hohmann"],
  minutes: 35,
  diagnostics: [
    c(
      "phase-gate",
      "At the high apsis of an outward Hohmann transfer, circularization is…",
      ["Prograde", "Retrograde", "Unnecessary"],
      0,
      "Transfer apoapsis speed is below local circular speed.",
      "Compare the two endpoint velocities.",
      { prerequisiteId: "hohmann" },
    ),
    n(
      "phase-gate2",
      "A circular orbit has radius 8000 km. Find its mean motion $n=\\sqrt{\\mu/r^3}$ in rad/s.",
      Math.sqrt(mu / 8000 ** 3),
      "rad/s",
      "$n\\simeq0.000882948\ \\mathrm{rad/s}$: the angular rate of a circular orbit.",
      "Revisit Kepler's third law from the geometry lesson.",
      { prerequisiteId: "hohmann" },
    ),
  ],
  teaching: {
    question: "How do you catch a spacecraft that is already on your orbit?",
    why: "A target can share your altitude and still remain permanently out of reach. Here you will separate three different problems: changing an orbit, matching a clock, and turning a velocity vector.",
    outcomes: [
      "Choose the target’s starting phase for a transfer.",
      "Explain how a temporary orbit changes rendezvous timing.",
      "Estimate a plane-change cost using vector geometry.",
    ],
    checkpoints: [
      {
        bridge:
          "Freeze the departure picture, then let the target move while you coast. You are aiming at where it will be, not where it is now. For circular motion its angular travel is simply angular rate multiplied by elapsed time.",
        meaning:
          "The required starting lead is the angle your transfer covers minus the angle the target covers during the same time. Relative angular rates determine when another suitable departure opportunity comes around.",
        question:
          "If the target moved faster during the same transfer time, would it need a larger or smaller initial lead?",
        answer:
          "A smaller lead, measured in the same unwrapped transfer geometry. It covers more of the required angle itself while you are in transit. Wrap the final phase into your chosen angular interval.",
        further: [
          {
            question:
              "Two orbits share the exact same radius, $r_1=r_2$. What does the synodic period formula $T_{syn}=2\\pi/|n_1-n_2|$ predict, and does it make physical sense?",
            answer:
              "It diverges to infinity, since $n_1=n_2$ makes the denominator zero. That matches physical intuition: two objects sharing one circular orbit have identical angular rates forever, so their relative phase never changes at all — there is no synodic cycle to wait through.",
          },
          {
            question:
              "The target's current lead is 40° short of the required $\\phi_0$. Roughly how long must you wait before the next launch opportunity?",
            answer:
              "Wait until the relative drift rate $n_2-n_1$ accumulates that 40° gap: $\\Delta t=\\Delta\\phi/|n_1-n_2|$, some fraction of one full synodic period $T_{syn}$.",
          },
          {
            question:
              "Matching $\\phi_0$ exactly guarantees the chaser and target occupy the same point at the same time. Does it also guarantee matching velocities there?",
            answer:
              "No. The phase equation constrains position alone. The chaser arrives via the Hohmann ellipse's own velocity at that point, generally different from the target's circular velocity there — a separate velocity-matching burn is still needed after position rendezvous.",
          },
        ],
      },
      {
        bridge:
          "For a target on your own circular orbit, equal periods preserve the separation. To change that separation, briefly leave the shared track. You are buying a different lap time, then returning to the intersection.",
        meaning:
          "A shorter period lets a trailing chaser gain on a target ahead. But the corresponding ellipse may have a dangerously low periapsis. A mathematically correct timing solution still needs a physical feasibility check.",
        question: "Why not always use the shortest possible phasing orbit?",
        answer:
          "Its periapsis may intersect Earth or the atmosphere, and the burns may be too expensive. Taking more revolutions can trade a longer rendezvous time for a gentler maneuver.",
        further: [
          {
            question:
              "If the target is only slightly ahead (small $\\phi$), is the phasing orbit's period close to or far from the original period $T_0$?",
            answer:
              "Close to $T_0$. A small $\\phi$ makes $t\\approx2\\pi/n=T_0$, so $a_p$ ends up very close to $r_0$ itself — a gentle phasing maneuver suffices to close a small gap.",
          },
          {
            question:
              "The phasing orbit described uses $r_0$ as its apoapsis, meaning its periapsis is lower. Does this describe catching a target ahead, or falling back to meet one behind?",
            answer:
              "Catching a target ahead. A lower periapsis means a smaller $a_p$ and hence a shorter period, so the chaser completes its loop faster and gains on a target it is pursuing.",
          },
          {
            question:
              "Allowing several phasing revolutions instead of just one, for the same angular gap, how does the resulting $a_p$ change?",
            answer:
              "Adding revolutions increases the effective $T_p$ used in the formula, pushing $a_p$ back toward $r_0$ and making periapsis less extreme — trading a longer rendezvous time for a gentler, more feasible maneuver.",
          },
        ],
      },
      {
        bridge:
          "A plane change is not a race around the track. Draw the old and new velocity vectors from the same origin. The burn vector is the line joining their tips.",
        meaning:
          "Even when the two speeds are equal, the velocities differ because their directions differ. Turning a shorter velocity vector costs less. This is why a suitable high, slow node can be valuable.",
        question:
          "If you halve the local speed, what happens to the cost of the same pure plane turn?",
        answer:
          "It halves. The angle stays fixed and the chord between the vector tips scales directly with their length. The two orbital planes must still intersect at the burn location.",
        further: [
          {
            question:
              "Evaluate $\\Delta v=2v\\sin(\\delta/2)$ for $\\delta=0$. Does the result make sense?",
            answer:
              "$\\sin0=0$, so $\\Delta v=0$ — no burn is needed when there is no angle between the planes, exactly as expected.",
          },
          {
            question:
              "Two orbits share the same inclination but have different RAAN. Using $\\cos\\delta=\\cos i_1\\cos i_2+\\sin i_1\\sin i_2\\cos(\\Omega_2-\\Omega_1)$, is $\\delta$ necessarily zero?",
            answer:
              "No. Even with $i_1=i_2$, if $\\Omega_1\\ne\\Omega_2$ then $\\cos(\\Omega_2-\\Omega_1)<1$, so $\\cos\\delta<1$ and $\\delta>0$ — the same tilt facing a different direction still needs a nonzero plane change.",
          },
          {
            question:
              "Why can combining a plane change with a speed change in one burn cost less than performing them as two separate burns?",
            answer:
              "The combined $\\Delta v$ is the direct vector distance between the two final velocity vectors — different in both speed and direction. That single diagonal move is generally shorter than the sum of two separate edges (a pure rotation, then a pure speed change), by the same logic as a triangle inequality.",
          },
        ],
      },
    ],
    takeaway:
      "Classify the mismatch before choosing a formula: orbit size, encounter timing, or orbital plane.",
    nextConnection:
      "Even without burns, real orbital planes drift. The next lesson shows why Earth’s shape can turn a plane over time.",
  },
  theoreticalMinimum: {
    primitives: [
      "Mean motion $n$, phase angle, and synodic period",
      "Temporary phasing orbit period $T_p$ and semimajor axis $a_p$",
      "Velocity vectors and the plane angle $\\delta$ between orbital planes",
    ],
    assumptions: [
      "Timing relations use circular, coplanar motion unless a plane change is explicitly introduced.",
      "Plane-change burns occur at a common node and are treated as instantaneous impulses.",
      "A pure plane change assumes equal speeds; unequal speeds require the full vector-difference formula.",
    ],
    governingLaw:
      "A rendezvous is a time-and-position condition: phase evolves through mean motion, while an impulsive plane change costs the magnitude of the velocity-vector difference.",
    invariant:
      "Correct radius does not imply correct position at the correct time, and a frame or phase change is not itself a physical burn.",
    derivation:
      "Compute the target's angular travel during the transfer, derive the required initial lead, wait for relative drift or design a temporary-period orbit, then form the velocity-vector difference at a node for any plane mismatch.",
    checks: [
      "$r_1=r_2$ makes the synodic period infinite because the mean motions match.",
      "$\\delta=0$ gives zero plane-change cost.",
      "Inclination difference alone is insufficient; the RAAN difference enters the full plane-angle relation.",
    ],
    limitingCase:
      "A small phase gap produces a phasing orbit close to the original orbit; as $v\\to0$ at fixed plane angle, the ideal vector-turn cost tends to zero.",
    counterexample:
      "A Hohmann transfer that reaches the target radius is not automatically a rendezvous, and equal inclination does not guarantee coincident orbital planes.",
    validity:
      "The timing and plane-change formulas are local impulsive approximations. Atmosphere, surface intersection, finite burns, and coupled orbital changes require propagation and feasibility checks.",
  },
  intuition: {
    body: "Return to the two circular racetracks from the last lesson. Suppose you are now on the outer one, at the correct radius, but a friend's car is also on that same outer track, some distance ahead of you, and you want to pull up alongside them. On an ordinary racetrack you would simply floor the accelerator and catch up. In orbit that instinct fails immediately: speeding up while staying at the same radius is not an option at all, since the two-body lesson already fixed circular speed as a function of $\\mu$ and $r$ alone, with nothing left free to adjust. If you want to change your position relative to your friend, you have to briefly leave the circle you are both sharing, spend time on a different-sized loop with a different lap time, and rejoin the original circle once you have closed the gap.\n\nThis is the first of two genuinely separate problems this lesson tackles, and it is worth keeping them apart in your head, because they call for different tools entirely. The first is a clock problem: you and a target can share the exact same orbit — same radius, same plane, same everything geometric — and still be permanently unable to meet, simply because you are in the wrong place along that shared orbit at the wrong time. The second is a genuinely geometric problem: even a target sharing your orbit's timing perfectly might be circling in a plane tilted relative to yours, and no amount of speeding up or slowing down along your own path will ever bring you into that other plane. Turning your orbital plane needs a sideways push, not a forward or backward one.\n\nBoth problems eventually reduce to arithmetic, but starting from the right physical picture matters, because the two really are different operations. Changing when you arrive somewhere is a timing adjustment. Changing which plane you arrive in is a direction adjustment. Confusing the two, and reaching for a Hohmann-style forward burn to fix a plane mismatch, wastes propellant solving the wrong problem entirely.",
    thoughtExperiments: [
      "A target is ahead on the same circular orbit. Why does simply pointing at it and thrusting not describe a rendezvous strategy?",
      "Why should a plane change be performed on the line of nodes?",
    ],
  },
  theory: [
    {
      heading: "1. Match position at a future time",
      body: String.raw`Begin with the simplest version of the timing problem: two spacecraft on the same circular orbit, moving at the same constant angular rate, forever holding whatever separation they started with — unless one of them coasts on a temporarily different orbit in between. For circular orbits the angular rate, or mean motion, is $n_j=\sqrt{\mu/r_j^3}$, a direct consequence of the circular period from Kepler's third law. An outward Hohmann transfer sweeps through exactly $\pi$ radians, half a revolution, during its coast time $t_t$, regardless of how far ahead or behind the target happens to be when the burn starts.

This gives a clean condition for a genuine rendezvous, not merely an arrival at the right radius. If the target currently leads the departure point by angle $\phi_0$, then by the time the transfer completes, the target must have moved exactly to the arrival point:
$$\phi_0+n_2t_t=\pi\pmod{2\pi},\qquad \phi_0=\pi-n_2t_t.$$
If the target is not currently at that required lead angle, you are not stuck — you simply have to wait. The relative angle between chaser and target changes at the rate $n_2-n_1$, purely from their differing periods, so the whole configuration repeats itself on a cycle $T_{syn}=2\pi/|n_1-n_2|$, the synodic period. It is worth being honest about what these formulas assume: both orbits genuinely circular, both in the same plane. Getting the angle right guarantees you and the target occupy the same point in space at the same moment; it says nothing about whether your velocities match once you get there.`,
    },
    {
      heading: "2. Design a temporary phasing period",
      body: String.raw`Suppose, though, that you cannot simply wait for the target's lead angle to drift into position — perhaps the mission calendar does not allow it. You need a way to actively change the relative angle, rather than passively waiting for it to evolve on its own. The trick is to temporarily leave the shared circular orbit for a different one with a different period, then rejoin later, having gained or lost exactly the angular separation you needed.

For a target currently ahead by angle $\phi$ on your own circle, a chaser that completes one revolution on a slightly different, faster orbit can close that gap entirely, meeting the target after a time $t=(2\pi-\phi)/n$. Set the phasing orbit's own period $T_p$ equal to this $t$, and Kepler's third law, run in reverse, gives the semimajor axis that achieves it:
$$a_p=\left[\mu\left(\frac{T_p}{2\pi}\right)^2\right]^{1/3}.$$
If the original shared radius $r_0$ becomes this phasing ellipse's apoapsis, its periapsis works out to $2a_p-r_0$ — and this is exactly the point where a purely mathematical timing solution needs a reality check. A periapsis dipping into the atmosphere, or below the planet's surface, is not a usable answer, however elegant the arithmetic looks. Two impulses at the shared intersection point, one to depart onto the phasing orbit and one to rejoin the original circle, complete the maneuver; allowing several slower revolutions rather than insisting on one fast one can ease an otherwise unreasonable periapsis requirement.`,
    },
    {
      heading: "3. A plane change is vector subtraction",
      body: String.raw`A plane change is a different kind of problem altogether, and it helps to picture it very literally. Take a velocity arrow and rotate it in space, without changing its length at all — a speedometer sitting in the spacecraft would show no change whatsoever throughout this rotation. And yet a thruster still has to act, because the velocity's direction genuinely changed even though its magnitude did not. The required burn is simply the vector difference between the new arrow and the old one, $\Delta\mathbf v=\mathbf v_2-\mathbf v_1$, and vector subtraction, unlike the scalar subtraction used for the Hohmann burns, cares about direction as much as size.

The two orbital planes intersect somewhere, along their shared line of nodes, and any plane change has to happen at a point on that line, the only place where a spacecraft on one plane and its target orbit on the other actually coincide in position. Let the angle between the two velocity arrows be $\delta$. Squaring the vector difference and expanding gives $|\Delta\mathbf v|^2=v_1^2+v_2^2-2\mathbf v_1\cdot\mathbf v_2$, and substituting the dot product's definition yields
$$\Delta v=\sqrt{v_1^2+v_2^2-2v_1v_2\cos\delta}.$$
When the two speeds happen to be equal, this collapses to the memorable $\Delta v=2v\sin(\delta/2)$ — literally the length of the chord joining the tips of two equal-length arrows separated by angle $\delta$. The plane angle itself, in general, satisfies $\cos\delta=\cos i_1\cos i_2+\sin i_1\sin i_2\cos(\Omega_2-\Omega_1)$; it is not simply $|i_2-i_1|$ unless the two nodes happen to line up. Because cost scales with local speed, combining a plane change with a size change at the same slow, high-altitude point can genuinely cost less than paying for each maneuver separately at whatever point happens to be convenient.`,
    },
  ],
  diagram: transferDiagram,
  sidebars: [
    {
      heading: "When to consider a bi-elliptic transfer",
      body: "A bi-elliptic maneuver first raises a distant intermediate apoapsis, changes the other apsis there, then circularizes at the destination. Three burns may save propellant for sufficiently large radius ratios. Compare total vector impulse and flight time for a finite chosen intermediate radius; do not choose it from the radius ratio alone.",
    },
  ],
  workedExample: {
    title: "Turn a circular velocity by 10°",
    problem:
      "A pure plane change occurs at a node where speed is 7.5 km/s. The angle between the planes is 10°.",
    steps: [
      {
        title: "Choose the vector model",
        body: "$v_1=v_2=7.5\ \\mathrm{km/s}$ and $\\delta=10^\\circ$.",
        reason: "The orbit size stays fixed; the velocity rotates.",
        trap: "Subtracting speed magnitudes would incorrectly give zero.",
      },
      {
        title: "Compute the chord",
        body: `$\\Delta v=15\\sin5^\\circ=${(15 * Math.sin(Math.PI / 36)).toFixed(5)}\\ \\mathrm{km/s}$.`,
        reason:
          "The velocity change spans the chord between equal-length vectors.",
        trap: "Use half the plane angle inside the sine.",
      },
      {
        title: "Compare a slower node",
        body: `At 1.6 km/s, the same turn costs ${(3.2 * Math.sin(Math.PI / 36)).toFixed(5)} km/s.`,
        reason: "For a fixed turn, cost scales with local speed.",
        trap: "A low speed helps only if the required plane intersection is available there.",
      },
    ],
  },
  fadedExercise: {
    prompt:
      "An outward Earth transfer goes from 7000 to 14000 km. Determine the target lead angle.",
    supplied: [
      {
        heading: "Transfer clock supplied",
        body: `$t_t=${practice.time.toFixed(5)}\\ \mathrm{s}$; $n_2=${Math.sqrt(mu / 14000 ** 3).toFixed(10)}\\ \mathrm{rad/s}$.`,
      },
    ],
    steps: [
      n(
        "phase-f1",
        "How far does the target move during the coast? Give degrees.",
        (Math.sqrt(mu / 14000 ** 3) * practice.time * 180) / Math.PI,
        "deg",
        "Multiply mean motion by time, then convert radians to degrees.",
        "Radians are dimensionless but are not numerical degrees.",
      ),
      n(
        "phase-f2",
        "How far ahead of departure should the target start? Give the angle in [0, 360).",
        180 - (Math.sqrt(mu / 14000 ** 3) * practice.time * 180) / Math.PI,
        "deg",
        "Subtract the target coast angle from 180 degrees.",
        "Both arrive on the opposite side at the same instant.",
      ),
      c(
        "phase-f3",
        "If the actual target lead angle is smaller than this required value, what should you do?",
        [
          "Launch immediately anyway",
          "Wait for the relative phase to drift into alignment",
          "Increase the transfer's semimajor axis to compensate",
        ],
        1,
        "The relative phase evolves at $n_2-n_1$; waiting brings the configuration around to the required lead.",
        "Recall the synodic period concept from this lesson's first checkpoint.",
      ),
    ],
  },
  retrievalProblems: [
    n(
      "phase-r1",
      "At a node, turn a 3 km/s velocity by 20° without changing its magnitude. Find Δv.",
      6 * Math.sin(Math.PI / 18),
      "km/s",
      "Use $2v\\sin(\\delta/2)\\simeq1.04189\ \\mathrm{km/s}$.",
      "The change is a vector difference.",
    ),
    c(
      "phase-r2",
      "Your orbit has the correct radius and plane, but a target remains ahead. Which addresses this gap?",
      [
        "Temporary phasing orbit",
        "Pure plane change",
        "Circularization at the same radius",
      ],
      0,
      "A phasing orbit changes the period so that the relative angle evolves.",
      "Classify the mismatch: size, orientation, or timing.",
    ),
    c(
      "phase-r3",
      "For a very large outward radius ratio, with long flight time allowed, what should be compared against Hohmann?",
      [
        "A three-impulse bi-elliptic transfer",
        "A pure inclination change",
        "A single burn that guarantees circular arrival",
      ],
      0,
      "A distant intermediate apoapsis may reduce total impulse; compare costs and time explicitly.",
      "More than two burns can sometimes improve the energy tradeoff.",
    ),
    n(
      "phase-r4",
      "Two circular orbits have mean motions $n_1=0.0011$ rad/s and $n_2=0.0009$ rad/s. Find the synodic period in hours.",
      (2 * Math.PI) / Math.abs(0.0011 - 0.0009) / 3600,
      "h",
      "$T_{syn}=2\\pi/|n_1-n_2|\\simeq8.72665\ \\mathrm{h}$.",
      "Use the absolute difference of the two mean motions.",
    ),
    c(
      "phase-r5",
      "Two orbits have equal inclination but their ascending nodes point in different directions. Is a plane change needed to move between them?",
      [
        "No, since inclinations already match",
        "Yes, since $\\Omega_2\\ne\\Omega_1$ still gives $\\cos\\delta<1$",
        "Only if eccentricities also differ",
      ],
      1,
      "Matching inclination alone does not make $\\delta=0$ unless the RAANs also match.",
      "Substitute into $\\cos\\delta=\\cos i_1\\cos i_2+\\sin i_1\\sin i_2\\cos(\\Omega_2-\\Omega_1)$.",
    ),
    n(
      "phase-r6",
      "At a node, a 5 km/s velocity must turn through 8° without changing magnitude. Find $\\Delta v$.",
      10 * Math.sin((8 * Math.PI) / 360),
      "km/s",
      "$\\Delta v=2v\\sin(\\delta/2)=10\\sin4^\\circ\\simeq0.69756\ \\mathrm{km/s}$.",
      "Use half the plane angle inside the sine.",
    ),
  ],
  sources: [nasa],
};
topic.practiceTemplates = [
  {
    id: "plane-variant",
    title: "Turn a velocity vector",
    prompt:
      "At a common node, a spacecraft moving at {{speed}} km/s changes planes through {{angle}} degrees without changing speed. Find the impulse magnitude.",
    variables: [variable("speed", 1, 8, 0.5), variable("angle", 5, 45, 5)],
    formula: mul(mul(2, v("speed")), op("sin", mul(v("angle"), Math.PI / 360))),
    unit: "km/s",
    hint: "Draw the chord between equal-length velocity vectors. The angle inside the sine is half the turn angle.",
    solution: String.raw`$\Delta v=2v\sin(\delta/2)=2({{speed}})\sin({{angle}}^\circ/2)={{answer}}\ \mathrm{km/s}$.`,
  },
];
export default topic;
