import type { Teaching, CurriculumPack } from "@/types/curriculum";
export const astroOverview: NonNullable<CurriculumPack["overview"]> = {
  headline: "Understand an orbit. Then change it.",
  introduction:
    "Why can firing forward leave you moving more slowly? We’ll start with that puzzle and build up to planning a journey from low Earth orbit toward the Moon. Each lesson connects a physical story to a useful calculation, with questions you can try whenever you want.",
  startingPoint:
    "Bring algebra, basic trigonometry, and an idea of vectors. Calculus explains the derivations, but you can follow the physical reasoning and worked calculations first. The quantitative foundations course is a short refresher.",
  outcomes: [
    {
      title: "Explain the motion",
      description:
        "Predict where a spacecraft speeds up, slows down, or changes its path—and explain why.",
    },
    {
      title: "Describe any ideal orbit",
      description:
        "Read the six orbital elements and connect them to a spacecraft’s position and velocity.",
    },
    {
      title: "Plan a maneuver",
      description:
        "Estimate burn sizes, coast times, rendezvous timing, and the cost of changing planes.",
    },
    {
      title: "Know when the model breaks",
      description:
        "Recognize orbital drift and keep reference frames straight when approaching another body.",
    },
  ],
  capstone: {
    title: "Sketch a journey from Earth orbit to lunar distance",
    description:
      "Choose a parking orbit, estimate the departure burn and travel time, then explain what lunar motion, capture, and perturbations add to the problem. The final lesson supplies the pieces; the goal is a defensible first estimate, not a flight-ready trajectory.",
  },
};
export const astroTeaching: Record<string, Teaching> = {
  "two-body": {
    question: "Why doesn’t a spacecraft simply fall back to Earth?",
    why: "Before you calculate a transfer, you need a feel for what gravity does to a moving spacecraft. This lesson gives you one reusable idea: the trade between speed and gravitational potential.",
    outcomes: [
      "Explain an orbit as a continuous fall.",
      "Derive a speed from an orbit’s size and current radius.",
      "Tell circular speed, escape speed, and a burn apart.",
    ],
    checkpoints: [
      {
        bridge:
          "First, choose what you are watching. Both Earth and the spacecraft move, but it is their separation that tells us about the orbit. Using a relative position removes the motion of the whole system and leaves a simpler question: how does that separation accelerate?",
        meaning:
          "The minus sign says “toward the other body.” The vector divided by its length supplies the direction; the remaining inverse-square factor supplies the strength. The parameter μ packages how strongly the two bodies attract each other.",
        question:
          "If the spacecraft doubles its distance from Earth, what happens to the magnitude of gravitational acceleration?",
        answer:
          "It falls to one quarter. The vector expression contains r cubed in the denominator, but the vector in the numerator has length r. The acceleration’s magnitude therefore varies with one over r squared.",
      },
      {
        bridge:
          "Now imagine following the spacecraft up the long side of an ellipse. Gravity is pulling against its outward motion, so it slows. Rather than calculating that change at every instant, we look for a quantity that stays unchanged during the trade.",
        meaning:
          "Specific energy is an account with two entries: kinetic energy per unit mass and gravitational potential per unit mass. One rises when the other falls. “Specific” is why spacecraft mass drops out—you are tracking energy per kilogram, not total energy.",
        question:
          "A spacecraft coasts outward with its engine off. Does its orbital energy increase as its altitude increases?",
        answer:
          "No. Its potential energy becomes less negative while its kinetic energy decreases by the same amount. Total specific energy stays constant in this model. A burn is different because it adds or removes energy.",
      },
      {
        bridge:
          "A conserved quantity is only useful if we can connect it to something we know. The near and far points of an ellipse are especially convenient: there the velocity is sideways to the radius. Comparing those two points connects energy to the size of the entire ellipse.",
        meaning:
          "Vis-viva answers a local question using one global property. Radius tells you where you are now; semimajor axis tells you the orbit’s energy. With both, you can find the speed. You cannot get the direction from this equation alone.",
        question:
          "Two spacecraft pass the same radius, but one has a larger semimajor axis. Which is moving faster?",
        answer:
          "The one with the larger semimajor axis. Its energy is less negative, so at the same gravitational potential it must carry more kinetic energy. In vis-viva, subtracting the smaller one-over-a term leaves a larger squared speed.",
      },
    ],
    takeaway:
      "An unpowered spacecraft exchanges speed for height while keeping total orbital energy constant. A burn changes that energy and therefore changes the whole orbit.",
    nextConnection:
      "Next we need a language for that orbit: how big it is, how stretched it is, where its plane points, and where the spacecraft sits.",
  },
  geometry: {
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
      },
    ],
    takeaway:
      "Size and shape tell you what the orbit is; orientation tells you how it sits in space; anomaly and epoch tell you where the spacecraft is.",
    nextConnection:
      "A maneuver changes these properties. Start with the cleanest case: changing the size of a circular orbit while keeping its plane fixed.",
  },
  hohmann: {
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
      },
    ],
    takeaway:
      "Design the connecting ellipse, compare velocities at its endpoints, then add the burn magnitudes. Geometry first; arithmetic second.",
    nextConnection:
      "Once the path is right, ask whether the timing and plane are right. Those mismatches need different maneuvers.",
  },
  phasing: {
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
      },
      {
        bridge:
          "For a target on your own circular orbit, equal periods preserve the separation. To change that separation, briefly leave the shared track. You are buying a different lap time, then returning to the intersection.",
        meaning:
          "A shorter period lets a trailing chaser gain on a target ahead. But the corresponding ellipse may have a dangerously low periapsis. A mathematically correct timing solution still needs a physical feasibility check.",
        question: "Why not always use the shortest possible phasing orbit?",
        answer:
          "Its periapsis may intersect Earth or the atmosphere, and the burns may be too expensive. Taking more revolutions can trade a longer rendezvous time for a gentler maneuver.",
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
      },
    ],
    takeaway:
      "Classify the mismatch before choosing a formula: orbit size, encounter timing, or orbital plane.",
    nextConnection:
      "Even without burns, real orbital planes drift. The next lesson shows why Earth’s shape can turn a plane over time.",
  },
  perturbations: {
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
      },
    ],
    takeaway:
      "Small disturbances can produce large accumulated changes. Always distinguish an approximate trend from an exact trajectory.",
    nextConnection:
      "The final lesson changes the dominant attracting body itself, and shows how to join local models without mixing reference frames.",
  },
  "patched-conics": {
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
      },
    ],
    takeaway:
      "A patched-conic estimate joins local models through consistent position and velocity. The reference frame is part of every number.",
    nextConnection:
      "Return to the course challenge: explain a lunar-distance journey in words, attach a first burn and time estimate, and list what a real mission analysis must add.",
  },
};
