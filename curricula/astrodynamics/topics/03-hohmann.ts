import { numeric as n, choice as c, v, add, sub, mul, div, sqrt, variable } from "@/curriculum-support/authoring";
import type { CurriculumTopic } from "@/types/curriculum";
import { mu, circ, speed, leo, practiceTransfer as practice, transfer } from "../constants";
import { transferDiagram } from "../diagrams";
import { nasa, jpl } from "../sources";
const topic: CurriculumTopic = {
  id: "hohmann",
  title: "Hohmann transfers & Δv",
  description: "Derive both burns from a single transfer ellipse.",
  domain: "Astrodynamics",
  unit: "03 · Orbital maneuvers",
  prerequisites: ["two-body", "geometry"],
  minutes: 45,
  diagnostics: [
    n(
      "hoh-g1",
      "A circular Earth orbit has radius 7000 km. Find its specific energy.",
      -mu / 14000,
      "km^2/s^2",
      "A circle has $a=r$, so $\\varepsilon=-28.47146\ \\mathrm{km^2/s^2}$.",
      "Energy is negative for bound motion.",
      { prerequisiteId: "two-body" },
    ),
    n(
      "hoh-g2",
      "A transfer ellipse touches radii 7000 and 14000 km at its apsides. Find a.",
      10500,
      "km",
      "The semimajor axis is half the sum of the apsidal radii.",
      "Revisit ellipse geometry.",
      { prerequisiteId: "geometry" },
    ),
    n(
      "hoh-g3",
      "A transfer ellipse has $a_t=9000$ km. Find its orbital period in hours.",
      (2 * Math.PI * Math.sqrt(9000 ** 3 / mu)) / 3600,
      "h",
      "$T=2\\pi\\sqrt{a^3/\\mu}\\simeq2.36889\ \\mathrm{h}$; Kepler's third law from the geometry lesson.",
      "The coast time in this lesson is half of this full period.",
      { prerequisiteId: "geometry" },
    ),
  ],
  teaching: {
    question: "Why does a trip to a higher orbit need two forward burns?",
    why: "This is where the energy model becomes a design tool. You will build a connecting orbit first, then calculate the two velocity changes that put you onto it and take you off it.",
    outcomes: [
      "Explain what each burn changes on the far side of the orbit.",
      "Calculate both burns for a coplanar circular-orbit transfer.",
      "Estimate the coast time and state what the budget excludes.",
    ],
    checkpoints: [
      {
        bridge:
          "Picture the departure circle and the destination circle together. We want one ellipse that touches each without crossing at an angle. This makes both burns purely along the direction of motion and turns a vector problem into a simpler speed comparison.",
        meaning:
          "Choosing the two apsides fixes the transfer ellipse. There is no free semimajor axis left to guess. Its energy lies between the energies of the two circular orbits.",
        question:
          "At the instant of the first burn, has the spacecraft’s altitude changed?",
        answer:
          "No. An ideal impulse changes velocity at one position. The new ellipse passes through that same point; the raised far side is somewhere the spacecraft will reach later.",
        further: [
          {
            question:
              "Why must the transfer ellipse be tangent to both circles, rather than merely intersecting them at some angle?",
            answer:
              "Tangency makes the ellipse's velocity and the circle's velocity point in exactly the same direction at that shared point, which is what lets a burn's size be found by simply subtracting speeds. A crossing at an angle would need a full vector subtraction instead.",
          },
          {
            question:
              "If $r_1$ and $r_2$ were swapped, describing an inward transfer instead of an outward one, would $a_t$ still equal $(r_1+r_2)/2$?",
            answer:
              "Yes. $a_t$ depends only on the sum of the two radii, half the major axis spanning both apsides, regardless of which one is larger.",
          },
          {
            question:
              "Does the transfer ellipse's eccentricity $e_t=(r_2-r_1)/(r_2+r_1)$ depend on $\\mu$ at all?",
            answer:
              "No. $e_t$ is a purely geometric ratio of the two radii. $\\mu$ only enters once you start computing speeds or energy on that ellipse, not the shape of the ellipse itself.",
          },
        ],
      },
      {
        bridge:
          "At each burn, write down two speeds at the same place: the speed just before and just after. The first pair is departure circle versus transfer periapsis. The second is transfer apoapsis versus destination circle.",
        meaning:
          "Both differences are forward for an outward transfer. The spacecraft loses speed while coasting uphill, and arrives moving too slowly for the new circle. The second burn raises the near side of the ellipse until it becomes circular.",
        question:
          "Why is the second burn forward even though the destination’s circular speed is lower than the departure speed?",
        answer:
          "Because the second burn compares two speeds at the destination, not the destination speed with the original departure speed. Transfer apoapsis speed is lower still. The coast accounts for the large loss of speed between burns.",
        further: [
          {
            question:
              "Confirm algebraically that $\\Delta v_1$ vanishes when $r_2=r_1$.",
            answer:
              "Setting $r_2=r_1$ makes the square-root factor equal to 1, so $\\Delta v_1=\\sqrt{\\mu/r_1}(1-1)=0$ exactly — no burn is needed to transfer a circular orbit to itself.",
          },
          {
            question:
              "Is it possible for $\\Delta v_2$ to come out negative for a genuine outward transfer, $r_2>r_1$?",
            answer:
              "No. The factor $\\sqrt{2r_1/(r_1+r_2)}$ is always less than 1 whenever $r_2>r_1$, so $1$ minus that factor is always positive. $\\Delta v_2$ is always a positive, prograde burn for an outward transfer.",
          },
          {
            question:
              "Someone claims the total budget could be cut by making the departure burn retrograde. Using the energy picture from the two-body lesson, explain why this cannot raise apoapsis.",
            answer:
              "A retrograde burn removes specific energy rather than adding it. Removing energy can only lower an apsis, never raise one — reaching a higher orbit requires adding energy, which requires a prograde burn at departure.",
          },
        ],
      },
      {
        bridge:
          "A useful maneuver estimate needs a clock as well as a fuel budget. We know the size of the connecting ellipse, so Kepler’s period gives the coast time without tracking the spacecraft point by point.",
        meaning:
          "The transfer covers half an ellipse. Reaching the right orbit at that time does not guarantee meeting a target. And a coplanar calculation does not pay for changing inclination or launching from the ground.",
        question:
          "You reach geostationary radius on the opposite side of Earth from a target satellite. Was the Hohmann calculation wrong?",
        answer:
          "Not necessarily. It solved the change of orbit, not the rendezvous timing. You must choose the departure phase so that the target reaches the encounter point at the same time.",
        further: [
          {
            question:
              "Does doubling $\\mu$ (a more massive attracting body, same $a_t$) increase or decrease the coast time $t_t$?",
            answer:
              "It decreases $t_t$, since $t_t\\propto1/\\sqrt{\\mu}$. Stronger gravity moves the spacecraft around the same size ellipse faster.",
          },
          {
            question:
              "Two transfer ellipses share the same $a_t$ but have very different eccentricities. Do they take the same coast time?",
            answer:
              "Yes. Kepler's third law relates period only to semimajor axis, not eccentricity, so two ellipses of the same size but very different shape complete an orbit — and hence a half-orbit coast — in exactly the same time.",
          },
          {
            question:
              "For a very large radius ratio $r_2/r_1$, is a bi-elliptic transfer's flight time typically longer or shorter than the equivalent Hohmann transfer's?",
            answer:
              "Longer. A bi-elliptic transfer trades additional flight time, via a distant intermediate apoapsis, for a potentially lower total $\\Delta v$ at large radius ratios — that time-for-propellant tradeoff is the entire reason to consider it.",
          },
        ],
      },
    ],
    takeaway:
      "Design the connecting ellipse, compare velocities at its endpoints, then add the burn magnitudes. Geometry first; arithmetic second.",
    nextConnection:
      "Once the path is right, ask whether the timing and plane are right. Those mismatches need different maneuvers.",
  },
  theoreticalMinimum: {
    coreIdea: "A Hohmann transfer works because two endpoint radii determine one transfer ellipse and two tangential impulses change its apsides. The burns are not arbitrary speed adjustments: the first creates the transfer geometry, and the second changes the far end of that ellipse into the destination circular orbit.",
    widerConnection: "It is the baseline maneuver against which phasing, plane changes, escape, and more realistic mission designs are compared. Its assumptions also provide a useful control case for asking what changes when timing, inclination, finite burns, or additional bodies enter the problem.",
    primitives: [
      "Initial and final circular radii $r_1$ and $r_2$",
      "Transfer ellipse semimajor axis $a_t$ and endpoint speeds",
      "Impulsive velocity changes $\\Delta v_1$, $\\Delta v_2$, and coast time",
    ],
    assumptions: [
      "The two orbits are circular, coplanar, concentric, and already reached.",
      "Burns are instantaneous and tangential, so velocity vectors are collinear at each endpoint.",
      "The two-body parameter $\\mu$ is constant; launch losses, finite-burn losses, plane changes, and rendezvous corrections are excluded.",
    ],
    governingLaw:
      "The endpoint radii define one transfer ellipse with $a_t=(r_1+r_2)/2$; vis-viva gives its speed and Kepler's law gives its half-period coast time.",
    invariant:
      "An impulse changes velocity immediately but not position. The first tangential burn raises the opposite apsis; the second changes the local apsis to the destination circular radius.",
    derivation:
      "Treat the two circular radii as the transfer ellipse's apsides, apply vis-viva at each endpoint, subtract the corresponding circular speeds, and add the two burn magnitudes. Then use half of the transfer ellipse period for the coast.",
    checks: [
      "$r_2=r_1$ gives $a_t=r_1$ and zero total burn.",
      "For an outward transfer both burns are prograde, even though the destination circular speed is lower.",
      "The second burn must compare transfer apoapsis speed with destination circular speed, not with the departure speed.",
    ],
    limitingCase:
      "As the radius ratio approaches one, the transfer becomes the identity. For very large ratios, a bi-elliptic strategy can challenge Hohmann's propellant advantage by accepting a longer flight.",
    counterexample:
      "Arriving at the destination radius is not rendezvous: the target must also be at the same position with a matching velocity at the same time.",
    validity:
      "The minimum-\\Delta v claim applies only to the stated coplanar, circular, two-impulse problem. Non-tangential or finite burns require vector propagation and a different optimization problem.",
  },
  intuition: {
    body: "Picture two circular racetracks, one inside the other, both centered on the same point, and suppose you are driving on the inner one but need to get onto the outer one. You cannot simply steer outward in a straight line — there is nothing for wheels to push against out there, and besides, the outer track is carrying anything on it around too, just more slowly. What actually works is almost the opposite of what you would guess: speed up, right where you already are, while still on the inner track. That extra speed does not lift you outward immediately. It bulges your path outward on the far side of the circle, the way pulling a slingshot back farther does not move the stone sideways, it lets the stone fly farther once released. Only once you arrive at that far, bulged-out point are you actually at the outer track's radius — and only then does a second push settle you onto it properly.\n\nThis is exactly a Hohmann transfer, translated out of the racetrack picture and into orbital mechanics: two forward burns, one at each end of a connecting ellipse, joining two circular orbits of different sizes. The first burn does not lift the spacecraft to the higher orbit directly; it simply turns a circle into an ellipse whose far side happens to reach the higher altitude. The spacecraft then coasts there, and here is the part worth sitting with, because it looks paradoxical at first: it slows down continuously while it climbs, exactly as the two-body lesson predicted for any unpowered outward coast. By the time it reaches the top of the new ellipse, it is moving too slowly to stay on a circle there at all, and would simply fall back down the way it came without a second burn to catch it.\n\nHere is the detail that trips almost everyone up the first time they meet it: both burns point forward, along the direction of travel, even though the final orbit ends up slower than the one the spacecraft started on. There is no contradiction hiding here, only energy quietly changing hands. Each burn adds specific orbital energy at the position where it happens; the long coast in between simply trades some of that added kinetic energy for altitude, exactly as it always does for an unpowered path.",
    thoughtExperiments: [
      "If you skip the second burn, where do you return?",
      "Why can adding forward speed ultimately put you on a slower circular orbit?",
    ],
  },
  theory: [
    {
      heading: "1. Define the transfer before computing burns",
      body: String.raw`Before any arithmetic can start, the connecting ellipse itself has to be pinned down, and it helps to be explicit about what is being assumed in order to do that cleanly. Suppose the two orbits being connected are circular, coplanar, with the destination farther out than the start ($r_2>r_1$), and suppose each burn is an instantaneous impulse — a simplification, since a real engine burns over some finite time, but a good first model. Because the transfer ellipse must touch both circles tangentially, its own size and shape follow immediately from the two radii alone, with no further freedom to choose:
$$a_t=\frac{r_1+r_2}{2},\quad e_t=\frac{r_2-r_1}{r_2+r_1},\quad \varepsilon_t=-\frac{\mu}{r_1+r_2}.$$
Notice something that makes the rest of the derivation possible: at a tangency, the circle's velocity and the ellipse's velocity at that same point point in exactly the same direction, because both paths touch smoothly there rather than crossing at an angle. Only because the velocities are collinear can a burn's size be found by simple subtraction of speeds, rather than a full vector subtraction — a shortcut that will not survive once we look at maneuvers that also change plane, in a later lesson. For now, adopt the convention that prograde, forward-pointing burns are positive.`,
    },
    {
      heading: "2. Derive the departure and arrival burns",
      body: String.raw`Keep three separate orbits in view throughout, and resist the temptation to blur them together: the starting circle, the connecting transfer ellipse, and the destination circle. The first burn changes the spacecraft from the first orbit to the second; the second burn changes it from the second orbit to the third. Mixing up which semimajor axis belongs to which orbit at which moment is the single most common arithmetic mistake this topic produces.

Substitute the transfer ellipse's own $a_t=(r_1+r_2)/2$ into vis-viva, evaluated at $r=r_1$:
$$v_{tp}^2=\mu\left(\frac{2}{r_1}-\frac{2}{r_1+r_2}\right)=\frac{\mu}{r_1}\frac{2r_2}{r_1+r_2}.$$
Run the identical calculation at the far end, $r=r_2$, and you get the transfer ellipse's speed at its own apoapsis:
$$v_{tp}=\sqrt{\frac{\mu}{r_1}}\sqrt{\frac{2r_2}{r_1+r_2}},\qquad v_{ta}=\sqrt{\frac{\mu}{r_2}}\sqrt{\frac{2r_1}{r_1+r_2}}.$$
A burn's size, at a tangency, is simply postburn speed minus preburn speed, since the two velocities are collinear:
$$\Delta v_1=\sqrt{\frac{\mu}{r_1}}\left(\sqrt{\frac{2r_2}{r_1+r_2}}-1\right),$$
$$\Delta v_2=\sqrt{\frac{\mu}{r_2}}\left(1-\sqrt{\frac{2r_1}{r_1+r_2}}\right).$$
Look at the square-root factor in $\Delta v_1$: it exceeds one precisely because $r_2>r_1$, so departure genuinely requires speeding up. At arrival, the transfer ellipse's own apoapsis speed is below the destination circle's speed, so the second burn also, perhaps surprisingly, requires speeding up — a slower final orbit does not mean a slowing-down burn. Between the two burns, the spacecraft slows continuously simply by coasting uphill; gravity, not the engine, does that work.

The propulsive budget is the sum of magnitudes, $|\Delta v_1|+|\Delta v_2|$; for an inward transfer the signed burns flip to retrograde, but the total budget stays nonnegative either way. It is worth checking a limiting case before trusting this pair of formulas: let $r_2\to r_1$, and both burns correctly shrink to zero. A nonzero cost for transferring a circular orbit into itself would be a clear sign that the wrong before-and-after velocities were compared somewhere.`,
    },
    {
      heading: "3. Time of flight and what the budget excludes",
      body: String.raw`The coast between the two burns covers exactly half of the transfer ellipse, so its duration follows directly from Kepler's third law applied to that ellipse alone:
$$t_t=\pi\sqrt{\frac{a_t^3}{\mu}}.$$
It is worth being precise about what this number actually promises, because it is easy to over-claim. This is a solved transfer between two orbital radii; it is not automatically a rendezvous with any particular satellite sitting on the destination orbit. Arriving at the right radius at the right time still requires the target itself to be at that same point in space at that same moment — a timing problem the next lesson takes up directly. The worked LEO-to-GEO example below also assumes an equatorial parking orbit and a GEO radius of 42164 km; a parking orbit at some other inclination would need a plane change on top of everything derived here. And the whole calculation assumes instantaneous impulses: real finite-duration thrust, navigation losses and propellant reserves are all excluded from this idealized budget. Within its own assumptions — two impulses, circular, coplanar — a Hohmann transfer is provably the cheapest option; relax any one of those assumptions, and a three-impulse bi-elliptic transfer can sometimes beat it for very large radius ratios, at the cost of a considerably longer flight.`,
    },
  ],
  diagram: transferDiagram,
  sidebars: [
    {
      heading: "Why the Oberth effect is an energy statement",
      body: String.raw`An impulse changes energy by $\Delta\varepsilon=\mathbf v\cdot\Delta\mathbf v+|\Delta\mathbf v|^2/2$. The same prograde impulse adds more specific orbital energy when the preburn speed is large. This does not create free energy: the rocket and exhaust exchange energy, and the bookkeeping depends on the reference frame.`,
    },
  ],
  workedExample: {
    title: "300 km LEO → geostationary radius",
    problem:
      "Use $r_1=6678$ km, $r_2=42164$ km and $\\mu=398600.4418\ \\mathrm{km^3/s^2}$. Find the ideal coplanar budget and coast time.",
    steps: [
      {
        title: "Build the connecting ellipse",
        body: `$a_t=${leo.a}\\ \\mathrm{km}$ and $\\varepsilon_t=${(-mu / (2 * leo.a)).toFixed(5)}\\ \\mathrm{km^2/s^2}$.`,
        reason: "Its apsides must touch the departure and arrival circles.",
        trap: "LEO altitude must first become an Earth-centered radius.",
      },
      {
        title: "Burn at periapsis",
        body: `$v_{c1}=${circ(6678).toFixed(5)}$, $v_{tp}=${speed(6678, leo.a).toFixed(5)}$, so $\\Delta v_1=${leo.d1.toFixed(5)}\\ \\mathrm{km/s}$.`,
        reason: "The first impulse raises energy and lifts the opposite apsis.",
        trap: "Subtract departure circular speed from transfer speed, not the reverse.",
      },
      {
        title: "Circularize at apoapsis",
        body: `$v_{ta}=${speed(42164, leo.a).toFixed(5)}$, $v_{c2}=${circ(42164).toFixed(5)}$, so $\\Delta v_2=${leo.d2.toFixed(5)}\\ \\mathrm{km/s}$.`,
        reason:
          "At the high apsis the transfer speed is lower than circular speed.",
        trap: "The second burn is also prograde.",
      },
      {
        title: "Close the budget and clock",
        body: `$\\Delta v=${(leo.d1 + leo.d2).toFixed(5)}\\ \\mathrm{km/s}$; $t_t=${(leo.time / 3600).toFixed(4)}\\ \\mathrm{h}$.`,
        reason: "Sum impulse magnitudes; coast for half the transfer period.",
        trap: "This is not a launch-to-GEO budget and includes no inclination change.",
      },
    ],
  },
  fadedExercise: {
    prompt: "Design an outward transfer from 7000 km to 14000 km.",
    supplied: [
      {
        heading: "Ellipse supplied",
        body: "$a_t=10500\ \\mathrm{km}$, $e_t=1/3$.",
      },
      {
        heading: "Energy supplied",
        body: `$\\varepsilon_t=${(-mu / 21000).toFixed(6)}\\ \\mathrm{km^2/s^2}$.`,
      },
    ],
    steps: [
      c(
        "hoh-f0",
        "Choose the burn sequence.",
        [
          "Prograde at low apsis; prograde at high apsis",
          "Prograde then retrograde",
          "One prograde burn only",
        ],
        0,
        "Raise the far apsis first, then raise the near apsis to circularize.",
        "Compare transfer and circular speed at each endpoint.",
      ),
      n(
        "hoh-f1",
        "Calculate the first burn magnitude.",
        practice.d1,
        "km/s",
        `$\\Delta v_1=${practice.d1.toFixed(5)}\\ \\mathrm{km/s}$.`,
        "Compute transfer periapsis speed minus departure circular speed.",
      ),
      n(
        "hoh-f2",
        "Calculate the second burn magnitude.",
        practice.d2,
        "km/s",
        `$\\Delta v_2=${practice.d2.toFixed(5)}\\ \\mathrm{km/s}$.`,
        "Compute arrival circular speed minus transfer apoapsis speed.",
      ),
      n(
        "hoh-f3",
        "Add the two burns to find the total propulsive budget.",
        practice.d1 + practice.d2,
        "km/s",
        `$\\Delta v=${(practice.d1 + practice.d2).toFixed(5)}\\ \\mathrm{km/s}$: the sum of both burn magnitudes.`,
        "Add the magnitudes of the two burns you just found.",
      ),
    ],
  },
  retrievalProblems: [
    n(
      "hoh-r1",
      "Find the total two-burn coplanar Hohmann budget from Earth radius 8000 km to 24000 km.",
      transfer(8000, 24000).d1 + transfer(8000, 24000).d2,
      "km/s",
      `Derive each endpoint speed. The budget is ${(transfer(8000, 24000).d1 + transfer(8000, 24000).d2).toFixed(5)} km/s.`,
      "Identify the connecting ellipse first.",
    ),
    n(
      "hoh-r2",
      "For the same 8000 km → 24000 km transfer, find the coast time in hours.",
      transfer(8000, 24000).time / 3600,
      "h",
      `The coast takes ${(transfer(8000, 24000).time / 3600).toFixed(5)} h.`,
      "A transfer follows half a period, not a full one.",
    ),
    c(
      "hoh-r3",
      "Which single quantity determines a Hohmann transfer ellipse's shape, given the two circular radii?",
      [
        "Only $\\mu$",
        "The ratio of the two radii",
        "The spacecraft's mass",
      ],
      1,
      "$e_t=(r_2-r_1)/(r_2+r_1)$ depends only on the two radii; $\\mu$ never enters the shape.",
      "Recheck what $e_t$ is actually a function of.",
    ),
    n(
      "hoh-r4",
      "An inward transfer runs from 20000 km to 8000 km. Find the first (departure) burn's signed magnitude.",
      Math.sqrt(mu * (2 / 20000 - 1 / 14000)) - Math.sqrt(mu / 20000),
      "km/s",
      "$a_t=14000$ km; $v_{tp}$ here means the transfer speed at $r=20000$ km, which is below circular speed, so the signed burn is negative (retrograde).",
      "For an inward transfer the first burn slows the spacecraft down.",
    ),
    c(
      "hoh-r5",
      "For a fixed pair of circular orbits, could a three-impulse bi-elliptic transfer ever need less total Δv than the two-impulse Hohmann transfer?",
      [
        "Never, Hohmann is always optimal",
        "Yes, for sufficiently large radius ratios",
        "Only if the orbits are not coplanar",
      ],
      1,
      "At large radius ratios a distant intermediate apoapsis can reduce total impulse, at the cost of longer flight time.",
      "Recall the sidebar comparing bi-elliptic transfers.",
    ),
    n(
      "hoh-r6",
      "A Hohmann transfer connects 7000 km and 21000 km. Find the departure burn Δv₁.",
      transfer(7000, 21000).d1,
      "km/s",
      `$\\Delta v_1\\simeq${transfer(7000, 21000).d1.toFixed(5)}\\ \\mathrm{km/s}$: transfer periapsis speed minus departure circular speed.`,
      "Build the connecting ellipse first, then compare speeds at the low apsis.",
    ),
  ],
  sources: [nasa, jpl],
};
const transferA = div(add(v("r1"), v("r2")), 2);
const vc = (r: ReturnType<typeof v>) => sqrt(div(mu, r));
const vt = (r: ReturnType<typeof v>) => sqrt(mul(mu, sub(div(2, r), div(1, transferA))));
topic.practiceTemplates = [
  {
    id: "hohmann-variant",
    title: "Budget an outward transfer",
    prompt:
      "Find the total ideal two-impulse Hohmann Δv from a circular Earth-centered radius of {{r1}} km to {{r2}} km. The orbits are coplanar; use μ = 398600.4418 km³/s².",
    variables: [
      variable("r1", 7000, 10000, 500),
      variable("r2", 18000, 42000, 2000),
    ],
    formula: add(sub(vt(v("r1")), vc(v("r1"))), sub(vc(v("r2")), vt(v("r2")))),
    unit: "km/s",
    hint: "Set the transfer semimajor axis to half the sum of the radii. Compare circular and transfer speeds at each end.",
    solution: String.raw`The transfer has $a_t=({{r1}}+{{r2}})/2$ km. Compute $v_{tp}-v_{c1}$ and $v_{c2}-v_{ta}$, then add their positive magnitudes. The total is {{answer}} km/s.`,
  },
];
export default topic;
