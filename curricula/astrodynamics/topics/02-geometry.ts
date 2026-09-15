import { numeric as n, choice as c, v, add, sub, div, variable } from "@/curriculum-support/authoring";
import type { CurriculumTopic } from "@/types/curriculum";
import { mu } from "../constants";
import { orbitDiagram } from "../diagrams";
import { nasa, nasaMotion } from "../sources";
const topic: CurriculumTopic = {
  id: "geometry",
  title: "The six Keplerian elements",
  description:
    "Specify an orbit’s size, shape, orientation, and current position.",
  domain: "Astrodynamics",
  unit: "02 · Orbital geometry",
  prerequisites: ["two-body"],
  minutes: 40,
  diagnostics: [
    n(
      "geo-gate",
      "Find circular speed at an Earth-centered radius of 7000 km.",
      Math.sqrt(mu / 7000),
      "km/s",
      "For a circle, $v=\\sqrt{\\mu/r}\\simeq7.54605\ \\mathrm{km/s}$.",
      "Revisit circular speed in the two-body lesson.",
      { prerequisiteId: "two-body" },
    ),
    n(
      "geo-gate2",
      "An ellipse has semimajor axis $a=9000$ km. Find its specific orbital energy.",
      -mu / 18000,
      "km^2/s^2",
      "$\\varepsilon=-\\mu/(2a)\\simeq-22.14\ \\mathrm{km^2/s^2}$.",
      "Recall how energy and semimajor axis are related from the two-body lesson.",
      { prerequisiteId: "two-body" },
    ),
  ],
  teaching: {
    question: "What would you need to tell someone to draw your orbit?",
    why: "“An elliptical orbit” is not enough to locate a spacecraft. The six elements divide the description into manageable jobs, so you can reason about one change at a time.",
    outcomes: [
      "Read the size, shape, orientation, and position from six elements.",
      "Convert orbital geometry into a radius and velocity.",
      "Recognize when an orbital angle stops being meaningful.",
    ],
    checkpoints: [
      {
        bridge:
          "Begin with a flat ellipse lying on a table. Before turning or tilting it, choose its size and shape. These two choices determine how close to the central body it comes and how far away it goes.",
        meaning:
          "Semimajor axis controls the scale; eccentricity controls the stretch. The semilatus rectum is a useful intermediate length, not a seventh independent element. The conic equation turns the spacecraft’s angle around the focus into its distance.",
        question:
          "Keep the semimajor axis fixed and increase eccentricity. What happens at the two ends?",
        answer:
          "Periapsis moves inward and apoapsis moves outward by equal amounts. The energy remains unchanged because semimajor axis is unchanged. The spacecraft experiences a wider range of speeds along its path.",
        further: [
          {
            question:
              "An ellipse has $r_p=6000$ km and $r_a=10000$ km. Find its semilatus rectum $p$.",
            answer:
              "$a=8000$ km, $e=(10000-6000)/16000=0.25$, so $p=a(1-e^2)=8000(0.9375)=7500\ \\mathrm{km}$.",
          },
          {
            question:
              "Why bother introducing $p$ at all, instead of always writing the orbit equation directly in terms of $a$ and $e$?",
            answer:
              "Because $p=a(1-e^2)$ already packages exactly the combination of $a$ and $e$ that the orbit equation needs. Writing $r=a(1-e^2)/(1+e\\cos\\nu)$ everywhere works too, but $p$ makes the equation shorter without hiding any information.",
          },
          {
            question:
              "The eccentricity vector is built from velocity, position and angular momentum, all of which change continuously along the orbit. Why is its magnitude nonetheless constant?",
            answer:
              "Because $\\mathbf e=(\\mathbf v\\times\\mathbf h)/\\mu-\\mathbf r/r$ is itself a conserved quantity of the two-body equation of motion, in the same way specific energy and $\\mathbf h$ are — its individual ingredients change, but the particular combination does not, a fact provable directly from Newton's equation, not merely observed.",
          },
        ],
      },
      {
        bridge:
          "Now lift the ellipse from the table. To specify its orientation, first tip its plane, then say where that tipped plane crosses your reference plane. Only then turn the ellipse within its own plane.",
        meaning:
          "Inclination and RAAN describe the plane. Argument of periapsis describes where the low point lies inside that plane. True anomaly finally locates the spacecraft. Thinking of these as separate operations helps prevent mixing up the three angles.",
        question:
          "Could two spacecraft have equal inclination but occupy different orbital planes?",
        answer:
          "Yes. Their ascending nodes can point in different directions, so their RAANs differ. Inclination says how much a plane is tilted, not which way it is tilted.",
        further: [
          {
            question:
              "Two orbits share both inclination and RAAN. What can still differ between them?",
            answer:
              "Everything else: eccentricity, semimajor axis, argument of periapsis and current true anomaly. Sharing inclination and RAAN only fixes the orbital plane, not the shape of the ellipse within it or where the spacecraft sits.",
          },
          {
            question:
              "A satellite orbits exactly in Earth's equatorial plane, so $i=0$. What happens to $\\Omega$, and why?",
            answer:
              "It becomes undefined. The ascending node is where the orbit crosses the reference plane, but an orbit lying entirely within that plane never crosses it at a single distinguishable point — there is nothing for $\\Omega$ to measure.",
          },
          {
            question:
              "Why must $\\Omega$ be measured within the reference plane, while $\\omega$ is measured within the tilted orbital plane, rather than both being measured the same way?",
            answer:
              "$\\Omega$ describes a rotation about the reference $z$-axis, locating the line of nodes before the plane is even tilted, so it naturally lives in the reference plane. $\\omega$ describes a rotation about $\\mathbf h$, the tilted plane's own normal, locating periapsis after the tilt has already happened. Mixing the two would apply a rotation about the wrong axis.",
          },
        ],
      },
      {
        bridge:
          "The element set is convenient for thinking, but a navigation calculation often wants Cartesian vectors. Start in a frame aligned with the ellipse, where the geometry is simple, then rotate the whole state into your chosen inertial frame.",
        meaning:
          "The two perifocal velocity components contain both radial and sideways motion. Except at the apsides, the spacecraft can move toward or away from the central body as well as around it. Apply the same rotations to position and velocity.",
        question:
          "At a point halfway in angle between periapsis and apoapsis, is the velocity necessarily perpendicular to the radius?",
        answer:
          "No. On an eccentric ellipse the spacecraft is still climbing, so its velocity has an outward radial component. Only at an apsis does the radial speed vanish.",
        further: [
          {
            question:
              "Evaluate $v_r=\\sqrt{\\mu/p}\\,e\\sin\\nu$ at periapsis, $\\nu=0$. Does the result match what was claimed about the apsides?",
            answer:
              "$\\sin0=0$, so $v_r=0$ exactly — confirming that velocity is purely transverse at periapsis, consistent with the earlier claim.",
          },
          {
            question:
              "Why must position and velocity be rotated by the identical matrix, rather than computing velocity some other way directly in the inertial frame?",
            answer:
              "Position and velocity have to stay expressed in the same coordinate basis for any later vector arithmetic, such as recomputing $\\mathbf h=\\mathbf r\\times\\mathbf v$, to remain valid. Rotating only one of them would leave the pair inconsistent with each other, even though each individually looked correct.",
          },
          {
            question:
              "Set $e=0$ in both $v_r$ and $v_t$. Does the circular-orbit result match the speed formula from the two-body lesson?",
            answer:
              "$v_r=0$ for every $\\nu$ (no radial motion at all, as expected for a circle), and $v_t=\\sqrt{\\mu/p}$. Since $e=0$ gives $p=a=r$, this is $\\sqrt{\\mu/r}$ — exactly the circular speed derived in the two-body lesson.",
          },
        ],
      },
      {
        bridge:
          "We have located the spacecraft by angle. To locate it at a future time, we need a clock. Equal angle increments do not take equal times: the spacecraft sweeps through the low, fast part of an ellipse more quickly.",
        meaning:
          "Mean anomaly advances uniformly in time; true anomaly tracks the actual geometric angle. Eccentric anomaly bridges them. Kepler’s equation is the translation between a uniform clock and uneven motion around an ellipse.",
        question:
          "Does a spacecraft take half its orbital period to move through the first 90 degrees after periapsis?",
        answer:
          "No. It moves fastest near periapsis, so that first quarter-turn takes less than a quarter of the full period for a noncircular ellipse. Angle fractions and time fractions are different.",
        further: [
          {
            question:
              "Near periapsis, which advances faster: true anomaly $\\nu$, or mean anomaly $M$?",
            answer:
              "True anomaly, since the spacecraft is genuinely moving fastest there. Mean anomaly always advances at the same fixed rate $n$ by construction, so the real motion outruns the fictitious uniform one near periapsis and falls behind it near apoapsis.",
          },
          {
            question:
              "Kepler's equation has no closed-form solution for $E$. Does that mean an eccentric anomaly does not really exist at a given time?",
            answer:
              "No — a unique $E$ still exists for every time, since the equation is monotonic in $E$ for $0\\le e<1$. It simply has to be found numerically, by iteration, rather than written down as an explicit formula.",
          },
          {
            question:
              "Set $e=0$ in Kepler's equation. What happens to the relationship between $M$, $E$ and $\\nu$?",
            answer:
              "With $e=0$, $M=E$ directly, and the true-anomaly formula collapses to $\\nu=E$ as well. On a circle all three anomalies are literally the same angle, advancing at the same constant rate — consistent with a circular orbit having no fast or slow part at all.",
          },
        ],
      },
    ],
    takeaway:
      "Size and shape tell you what the orbit is; orientation tells you how it sits in space; anomaly and epoch tell you where the spacecraft is.",
    nextConnection:
      "A maneuver changes these properties. Start with the cleanest case: changing the size of a circular orbit while keeping its plane fixed.",
  },
  theoreticalMinimum: {
    primitives: [
      "The six Keplerian elements $a,e,i,\\Omega,\\omega,\\nu$",
      "The perifocal frame $PQW$, inertial frame, and epoch",
      "Derived quantities $p=a(1-e^2)$, $\\mathbf h$, and the eccentricity vector $\\mathbf e$",
    ],
    assumptions: [
      "The motion is a two-body Keplerian conic with constant $\\mu$.",
      "The reference plane, inertial frame, central body, and epoch are declared.",
      "The classical elements are used only away from their singular circular and equatorial cases.",
    ],
    governingLaw:
      "The conic is $r=p/(1+e\\cos\\nu)$, while the mean-anomaly clock advances uniformly through $M=E-e\\sin E=n(t-\\tau)$.",
    invariant:
      "The state and conserved vectors $\\mathbf h$ and $\\mathbf e$ describe one orbit independently of the chosen coordinate representation; mean anomaly advances uniformly even though true anomaly does not.",
    derivation:
      "Recover $a$ and $e$ from the apsides, derive $p$ and the polar conic, build position and velocity in $PQW$, then apply the same ordered rotations to both vectors before introducing the time-of-flight clock.",
    checks: [
      "$\\nu=0$ and $\\nu=\\pi$ recover periapsis and apoapsis.",
      "At an apsis, $v_r=0$ and $h=rv$; for $e=0$, $p=a=r$ and the circular speed is recovered.",
      "The same rotation must transform both $\\mathbf r$ and $\\mathbf v$.",
    ],
    limitingCase:
      "At $e=0$, periapsis and $\\omega$ are undefined; at $i=0$, the ascending node and $\\Omega$ are undefined. Use longitude or argument of latitude instead.",
    counterexample:
      "Equal inclination does not imply equal orbital planes when the RAANs differ, and equal angular intervals do not represent equal elapsed times.",
    validity:
      "The elements are a coordinate description of an ideal two-body state. Perturbations make them time-varying, and singular cases require alternate coordinates even when the physical state remains perfectly defined.",
  },
  intuition: {
    body: "Suppose you wanted to describe, to someone on the phone who cannot see it, the exact shape and position of a bent wire hoop lying on a table. You would naturally break the description into separate, independent pieces: first, how big is the hoop overall; then, is it a perfect circle or has it been squeezed into an oval, and if so how much; only once those two questions are settled does it make sense to ask which way the oval's long axis actually points. Lift the hoop off the table and let it tilt in space, and you need to describe that tilt too, and the direction the tilt itself is facing, since a hoop tilted north looks different from one tilted east even at the same angle. And finally, if there is a bead sitting somewhere on the wire, you need one more piece of information to say exactly where.\n\nDescribing an orbit is exactly this same problem, piece by piece. You are separately choosing: how big the ellipse is; how stretched, or eccentric, it is; how its plane is tilted relative to some reference direction; which way that tilted plane is actually facing; where, within that plane, the ellipse's own long axis points; and finally, where the spacecraft itself currently sits along the path. Six genuinely separate questions, six genuinely separate numbers, usually called the six Keplerian elements — and the reason there are exactly six, no more and no fewer, is that this is precisely how many independent choices are needed to pin down both the shape of a path through space and one object's position on it.\n\nOne thing is worth flagging before going further: the reference plane you measure all of this tilt against is a choice you make, not a property the orbit itself possesses. The very same physical path, described against Earth's equator, gets a different tilt angle than the same path described against the plane of Earth's own orbit around the Sun. Neither answer is wrong; they are answers to two different questions dressed up to look like the same question. Always say which reference plane you are using before comparing two sets of orbital elements, or you risk comparing numbers that were never describing the same thing.",
    thoughtExperiments: [
      "If the orbit becomes a perfect circle, can you still point to a unique periapsis?",
      "If the orbit lies exactly in the reference plane, where does it cross that plane upward?",
    ],
  },
  theory: [
    {
      heading: "1. Size and shape",
      body: String.raw`Suppose someone hands you the nearest and farthest distances of an ellipse, $r_p$ and $r_a$, and asks for its size and shape as two separate, independent numbers, the way the wire-hoop analogy demanded. Size is the easier of the two: add the near and far distances and halve the result, $a=(r_p+r_a)/2$, since $2a$ is exactly the length of the ellipse's long axis, stretching from one apsis to the other. Shape is more subtle, because you want a number that captures how stretched the ellipse is without also depending on how big it is. Comparing the difference of the two distances against their sum does exactly this: $e=(r_a-r_p)/(r_a+r_p)$. A circle has no difference between near and far distance at all, so $e=0$ automatically; stretch the orbit further while holding its nearest point fixed, and this ratio climbs steadily toward one.

Because $a$ and $e$ are more useful to work with than $r_p$ and $r_a$ directly, it helps to move fluidly between the two descriptions. Solve the definitions above for the apsis distances themselves, and you recover $r_a=a(1+e)$ and $r_p=a(1-e)$ — a clean pair worth keeping in view. One further length, the semilatus rectum $p$, makes the orbit equation itself far more compact than working with $a$ and $e$ directly; for a bound ellipse with $0\le e<1$,
$$r_p=a(1-e),\quad r_a=a(1+e),\quad p=a(1-e^2),\quad h=\sqrt{\mu p}.$$
The eccentricity vector $\mathbf e=(\mathbf v\times\mathbf h)/\mu-\mathbf r/r$ is a genuinely useful object in its own right: it points from the focus toward periapsis, and its length is exactly the eccentricity you have already met. With it in hand, the shape of the whole orbit collapses into one short equation,
$$r=\frac{p}{1+e\cos\nu},$$
where true anomaly $\nu$ is measured from periapsis, in the direction the spacecraft is actually travelling. Check the two extremes before trusting it: at $\nu=0$ it correctly returns $r_p$; at $\nu=\pi$, halfway around, it correctly returns $r_a$.`,
    },
    {
      heading: "2. Orient the plane, then the ellipse",
      body: String.raw`With size and shape settled, the wire hoop still needs to be lifted off the table and tilted into its actual orientation in space — and, just as with the hoop, this turns out to be two separate rotations, not one. First, tip the whole orbital plane away from some agreed reference plane; then, separately, turn the already-tilted ellipse within that plane to point its long axis the right way.

The first rotation is measured by the inclination $i$, the angle between the reference direction $\hat{\mathbf z}$ and the orbit's angular momentum vector $\mathbf h$, so $\cos i=h_z/h$. Because $\mathbf h$ is perpendicular to the orbital plane by definition, measuring the angle to $\mathbf h$ is exactly equivalent to measuring the tilt of the plane itself. That tilted plane crosses the reference plane along a line, and the point where the spacecraft's path crosses upward through the reference plane is called the ascending node; let $\mathbf n=\hat{\mathbf z}\times\mathbf h$ point toward it. The right ascension of the ascending node, $\Omega$, measures, within the reference plane, how far the node has been rotated from a fixed reference direction. Only once both are fixed does the second question make sense: where, within the now-oriented plane, does the ellipse's own near point sit? That is the argument of periapsis, $\omega$, measured from the ascending node to the eccentricity vector, within the orbital plane.

Put all six pieces together, $(a,e,i,\Omega,\omega,\nu)$, and you have located a spacecraft's entire state at one instant. But six bare numbers are not yet a complete specification — $\Omega$ and $\omega$ are rotations about genuinely different axes, and without stating the epoch, the central body and the specific reference plane, two people could report the identical orbit with two different-looking element sets, or two different orbits with the same-looking numbers.`,
    },
    {
      heading: "3. Recover position and velocity",
      body: String.raw`The six elements are convenient for thinking and reporting, but a navigation calculation very often wants a position and velocity vector in ordinary Cartesian coordinates instead. The most direct route is to build the state first in a frame naturally aligned with the ellipse, where the geometry is simplest, and only afterward rotate that state into whatever inertial frame you actually need.

In this perifocal frame, whose own $x$ axis points straight at periapsis, the position and velocity take a clean form:
$$\mathbf r_{PQW}=\frac{p}{1+e\cos\nu}\begin{bmatrix}\cos\nu\\\sin\nu\\0\end{bmatrix},\qquad \mathbf v_{PQW}=\sqrt{\frac{\mu}{p}}\begin{bmatrix}-\sin\nu\\e+\cos\nu\\0\end{bmatrix}.$$
Getting from this convenient local frame to a genuine inertial one is a matter of undoing, in order, the two rotations from the previous section: for active right-handed rotations acting on column vectors, $\mathbf r_I=R_3(\Omega)R_1(i)R_3(\omega)\mathbf r_{PQW}$, with the identical matrix applied to velocity. It is worth reading the velocity components for what they say physically: $v_r=\sqrt{\mu/p}\,e\sin\nu$ is the radial component, carrying the spacecraft toward or away from Earth, while $v_t=\sqrt{\mu/p}(1+e\cos\nu)$ is the transverse component, carrying it around the orbit. Away from the two apsides, both are generally nonzero at once — a counterexample already flagged in the previous lesson, now visible directly in the equations themselves.`,
    },
    {
      heading: "4. Position is not a uniform clock",
      body: String.raw`There is one more question the six elements alone cannot answer: given that a spacecraft is somewhere on its ellipse now, where will it be an hour from now? The honest, initially surprising answer is that equal angles do not take equal times. A spacecraft near periapsis, moving quickly, sweeps through a large angle in a short time; near apoapsis, moving slowly, it barely advances at all in the same interval. This is Kepler's second law, and it follows directly from the constancy of $h$: since $h=r^2\dot\nu$ is fixed, a small $r$ near periapsis forces a large $\dot\nu$, and a large $r$ near apoapsis forces a small one. The area swept per unit time, $dA/dt=h/2$, is what actually stays constant — not the angle swept per unit time.

To turn this into a usable clock, astronomers introduce two further angles alongside true anomaly. Mean anomaly $M$ is a deliberately artificial fiction: the angle a spacecraft would have swept if it moved at a perfectly uniform rate, matched to the real orbit's period. Eccentric anomaly $E$ is the genuine geometric bridge between the two, related to both by Kepler's equation:
$$M=E-e\sin E=n(t-\tau),\quad n=\sqrt{\mu/a^3},\quad T=2\pi/n.$$
Solve this equation for $E$ at a desired time — it has no closed-form solution, and is solved numerically in practice — then recover the true, geometric anomaly from $\nu=2\operatorname{atan2}(\sqrt{1+e}\sin(E/2),\sqrt{1-e}\cos(E/2))$. Keep two easily missed details in mind: use radians throughout inside every trigonometric function, and $\tau$ is simply whatever time the spacecraft last passed through periapsis, an epoch tracked alongside the six elements themselves.`,
    },
  ],
  diagram: orbitDiagram,
  sidebars: [
    {
      heading: "Singular elements are a coordinate problem",
      body: "For $e=0$, periapsis and $\\omega$ are undefined; use argument of latitude $u=\\omega+\\nu$ for an inclined circle. For $i=0$, the node and $\\Omega$ are undefined; use longitude of periapsis for a noncircular equatorial orbit. A circular equatorial orbit uses true longitude. The spacecraft state remains well defined.",
    },
  ],
  workedExample: {
    title: "Read an eccentric Earth orbit",
    problem:
      "Given $r_p=7000$ km, $r_a=14000$ km and $\\nu=60^\\circ$, find the shape and current radius.",
    steps: [
      {
        title: "Recover size",
        body: "$a=(r_p+r_a)/2=10500\ \\mathrm{km}$.",
        reason:
          "The major axis spans the two apsidal radii measured on opposite sides of the focus.",
        trap: "Neither apsidal radius alone is the semimajor axis.",
      },
      {
        title: "Recover eccentricity and p",
        body: "$e=(r_a-r_p)/(r_a+r_p)=1/3$ and $p=a(1-e^2)=9333.3333\ \\mathrm{km}$.",
        reason:
          "Adding and subtracting the two apsis equations isolates $a$ and $e$.",
        trap: "Eccentricity has no units.",
      },
      {
        title: "Locate the spacecraft",
        body: "$r=p/(1+e\\cos60^\\circ)=8000\ \\mathrm{km}$.",
        reason: "True anomaly measures from the nearest point on the ellipse.",
        trap: "Convert degrees to radians when calling a programming language cosine function.",
      },
    ],
  },
  fadedExercise: {
    prompt: "An ellipse has $a=15000$ km, $e=0.4$, and $\\nu=90^\\circ$.",
    supplied: [
      {
        heading: "Semilatus rectum supplied",
        body: "$p=a(1-e^2)=12600\ \\mathrm{km}$.",
      },
    ],
    steps: [
      n(
        "geo-f1",
        "Find the current radius.",
        12600,
        "km",
        "$\\cos90^\\circ=0$, hence $r=p=12600\ \\mathrm{km}$.",
        "Use the conic equation.",
      ),
      n(
        "geo-f2",
        "Find the periapsis radius.",
        9000,
        "km",
        "$r_p=a(1-e)=9000\ \\mathrm{km}$.",
        "At the nearest point the true anomaly is zero.",
      ),
      n(
        "geo-f3",
        "Find the apoapsis radius.",
        21000,
        "km",
        "$r_a=a(1+e)=21000\ \\mathrm{km}$.",
        "Use the same $a$ and $e$, with the opposite sign on $e$.",
      ),
      n(
        "geo-f4",
        "Find angular momentum $h=\\sqrt{\\mu p}$ for this ellipse.",
        Math.sqrt(mu * 12600),
        "km^2/s",
        "$h=\\sqrt{398600.4418\\times12600}\\simeq70830.9\ \\mathrm{km^2/s}$.",
        "Substitute the supplied semilatus rectum directly.",
      ),
    ],
  },
  retrievalProblems: [
    n(
      "geo-r1",
      "An Earth ellipse has $r_p=8000$ km and $r_a=24000$ km. Find its eccentricity.",
      0.5,
      "1",
      "$e=(24000-8000)/(24000+8000)=0.5$.",
      "Recover the two apsis equations.",
    ),
    c(
      "geo-r2",
      "Which angle becomes undefined in a circular but inclined orbit?",
      ["Inclination i", "RAAN Ω", "Argument of periapsis ω"],
      2,
      "A circle has no unique periapsis, so its argument of periapsis is undefined.",
      "Which geometric landmark disappears?",
    ),
    n(
      "geo-r3",
      "An orbit has $r_p=7500$ km and $r_a=11500$ km. Find its semilatus rectum $p$.",
      (() => {
        const a = (7500 + 11500) / 2,
          e = (11500 - 7500) / (11500 + 7500);
        return a * (1 - e * e);
      })(),
      "km",
      "$a=9500$ km, $e=4000/19000\\simeq0.21053$, so $p=a(1-e^2)\\simeq9079.6\ \\mathrm{km}$.",
      "Recover $a$ and $e$ from the apsis radii first.",
    ),
    c(
      "geo-r4",
      "An orbit has $i=98^\\circ$. What does this indicate about its motion?",
      [
        "It is prograde and equatorial",
        "It is retrograde, moving against Earth's rotation",
        "It is undefined because inclination cannot exceed 90°",
      ],
      1,
      "Inclinations above 90° describe retrograde orbits; $\\cos i$ is negative there.",
      "Recall the physical meaning of inclinations beyond a right angle.",
    ),
    n(
      "geo-r5",
      "An orbit has $a=10000$ km and $e=0.2$. Find the radius at true anomaly $\\nu=120^\\circ$.",
      (10000 * (1 - 0.2 * 0.2)) / (1 + 0.2 * Math.cos((120 * Math.PI) / 180)),
      "km",
      "$p=a(1-e^2)=9600$ km; $r=p/(1+e\\cos120^\\circ)\\simeq10666.67\ \\mathrm{km}$.",
      "Compute $p$ first, then apply the conic equation at the given angle.",
    ),
    c(
      "geo-r6",
      "An orbit is inclined but has $e=0$. What replaces argument of periapsis for describing where the spacecraft sits?",
      [
        "Argument of latitude $u=\\omega+\\nu$",
        "True anomaly measured from the ascending node",
        "Right ascension of ascending node",
      ],
      0,
      "With no unique periapsis, argument of latitude measures directly from the ascending node instead.",
      "Recall the sidebar on singular elements.",
    ),
  ],
  sources: [nasa, nasaMotion],
};
topic.practiceTemplates = [
  {
    id: "eccentricity-variant",
    title: "Recover the shape",
    prompt:
      "An ellipse has periapsis radius {{rp}} km and apoapsis radius {{ra}} km. Find its eccentricity.",
    variables: [
      variable("rp", 7000, 10000, 500),
      variable("ra", 16000, 30000, 1000),
    ],
    formula: div(sub(v("ra"), v("rp")), add(v("ra"), v("rp"))),
    unit: "1",
    hint: "Add and subtract the equations for the two apsidal radii.",
    solution: String.raw`$e=(r_a-r_p)/(r_a+r_p)=({{ra}}-{{rp}})/({{ra}}+{{rp}})={{answer}}$. Eccentricity is dimensionless.`,
  },
];
export default topic;
