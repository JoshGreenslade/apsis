import { astroOverview, astroTeaching } from "@/curriculum-support/teaching";
import { astroPractice } from "@/curriculum-support/practice";
import type { CurriculumPack, CurriculumTopic } from "@/types/curriculum";
import {
  choice as c,
  numeric as n,
  orbitDiagram,
  transferDiagram,
  nasa,
  jpl,
} from "./helpers";
const mu = 398600.4418;
const circ = (r: number) => Math.sqrt(mu / r);
const speed = (r: number, a: number) => Math.sqrt(mu * (2 / r - 1 / a));
const period = (a: number) => 2 * Math.PI * Math.sqrt(a ** 3 / mu);
const transfer = (r1: number, r2: number) => {
  const a = (r1 + r2) / 2;
  return {
    a,
    d1: speed(r1, a) - circ(r1),
    d2: circ(r2) - speed(r2, a),
    time: period(a) / 2,
  };
};
const leo = transfer(6678, 42164),
  practice = transfer(7000, 14000);

const twoBody: CurriculumTopic = {
  id: "two-body",
  title: "Gravity, energy & vis-viva",
  description: "Turn a falling trajectory into a conserved-energy model.",
  domain: "Astrodynamics",
  unit: "01 · Two-body mechanics",
  prerequisites: [],
  minutes: 35,
  diagnostics: [
    n(
      "root",
      "A speed of 7,500 m/s is how many km/s?",
      7.5,
      "km/s",
      "Divide by 1,000: $7{,}500\\,\\mathrm{m/s}=7.5\\,\\mathrm{km/s}$.",
      "A kilometer contains one thousand meters.",
    ),
    c(
      "direction",
      "A ball moving sideways feels a force directly toward a planet. What changes immediately?",
      [
        "Its velocity direction",
        "Its position jumps inward",
        "Its gravity switches off",
      ],
      0,
      "Acceleration changes velocity continuously. Neither position nor velocity jumps under finite gravity.",
      "Separate position, velocity, and acceleration.",
    ),
  ],
  intuition: {
    body: "An orbit is a fall that keeps missing the ground. Imagine throwing a ball sideways from a very tall mountain on an airless planet. Gravity keeps bending its path inward, but the surface also curves away beneath it. With sufficient sideways speed, the ball falls around the planet. No engine is needed to maintain this ideal motion.\n\nNow briefly fire a spacecraft’s engine along its motion. It has not changed location, yet it carries more motion and follows a new path. It will climb farther away on the opposite side before turning back. While climbing, it slows: motion is traded for height in the gravitational field. The burn is local; the shape change extends around the orbit.",
    thoughtExperiments: [
      "Turn the engine off after entering a circular orbit. What keeps bending the path?",
      "A spacecraft speeds up at its lowest point. Is gravity doing positive or negative work as it climbs away? Explain without equations.",
    ],
  },
  theory: [
    {
      heading: "1. Reduce two moving bodies to one relative coordinate",
      body: String.raw`Following both bodies separately would give us two positions when the orbit needs only their separation. Let $\mathbf r=\mathbf r_2-\mathbf r_1$ point from the primary to the spacecraft. In an inertial frame, their accelerations are $\ddot{\mathbf r}_2=-Gm_1\mathbf r/r^3$ and $\ddot{\mathbf r}_1=+Gm_2\mathbf r/r^3$. The opposite signs express attraction toward one another. Subtracting gives the equation for their relative position:
$$\ddot{\mathbf r}=-\frac{\mu}{r^3}\mathbf r,\qquad \mu=G(m_1+m_2).$$
For a spacecraft much lighter than Earth, $\mu\simeq GM_\oplus$. The relative equation uses axes with fixed inertial orientation; Earth's origin need not itself be inertial for the subtraction to work. In the negligible-spacecraft-mass approximation we can treat Earth as fixed. Here $\mu=398600.4418\ \mathrm{km^3/s^2}$ is a conventional teaching value. A tabulated gravitational parameter is more precise than multiplying separately measured $G$ and Earth mass.

The model assumes point masses or spherical symmetry, no drag, no thrust between impulses, and negligible third-body gravity. These assumptions explain both its simplicity and its limits. We will first learn what this model predicts, then return to the effects it leaves out.`,
    },
    {
      heading: "2. Derive the conserved specific energy",
      body: String.raw`We want to predict speed at a new height without solving for every point along the path. Look for a quantity that stays the same while height and speed change.

Start with $v^2=\mathbf v\cdot\mathbf v$. Differentiating gives $d(v^2/2)/dt=\mathbf v\cdot\dot{\mathbf v}$. This is why we dot Newton's equation with velocity: it turns a vector acceleration into a statement about changing speed. Similarly, differentiating $r^2=\mathbf r\cdot\mathbf r$ gives $\mathbf r\cdot\mathbf v=r\dot r$. Together these identities give
$$\frac{d}{dt}\left(\frac{v^2}{2}\right)=-\frac{\mu\dot r}{r^2},\qquad \frac{d}{dt}\left(-\frac{\mu}{r}\right)=\frac{\mu\dot r}{r^2}.$$
The first expression is negative during outward motion: climbing reduces kinetic energy. The second identifies a height-dependent quantity that increases at exactly the same rate. Adding them gives a zero derivative. Their sum is therefore constant:
$$\varepsilon=\frac{v^2}{2}-\frac{\mu}{r}.$$
We call this **specific orbital energy**; specific means per unit mass in the relative-motion model. Its units are $\mathrm{km^2/s^2}$. You can now compare two points using the same $\varepsilon$, even without knowing the travel time.

Why does the sign matter? At infinity the potential term tends to zero, so reaching infinity would require $v_\infty^2/2=\varepsilon$. A negative value cannot satisfy that condition: the spacecraft is bound. Zero is the escape threshold; a positive value leaves speed to spare. For nonradial Kepler motion these cases correspond to ellipses, parabolas and hyperbolas. Defining potential to vanish at infinity makes zero a useful boundary.

**Test the claim.** Does constant energy imply constant speed? Only if radius is constant. On an ellipse, the two terms change while their sum remains fixed. An engine burn breaks this conservation argument because Newton's equation then contains an additional acceleration.`,
    },
    {
      heading: "3. Connect energy to the ellipse",
      body: String.raw`To connect energy to the ellipse, compare its nearest and farthest points, periapsis and apoapsis. These are convenient because radial velocity is zero there.

We need one more conserved quantity. Differentiating $\mathbf h=\mathbf r\times\mathbf v$ gives $\dot{\mathbf h}=\mathbf v\times\mathbf v+\mathbf r\times\dot{\mathbf v}=\mathbf0$: a vector crossed with itself vanishes, and gravity is parallel to the radius. Thus specific angular momentum is constant. At the apsides the entire velocity is transverse, so $r_pv_p=r_av_a=h$.

Replace the speeds by $h/r_p$ and $h/r_a$, then equate their energies:
$$\frac{h^2}{2r_p^2}-\frac{\mu}{r_p}=\frac{h^2}{2r_a^2}-\frac{\mu}{r_a}.$$
Move the speed terms to one side and factor the differences:
$$\frac{h^2}{2}\frac{(r_a-r_p)(r_a+r_p)}{r_p^2r_a^2}=\mu\frac{r_a-r_p}{r_pr_a}.$$
For a noncircular ellipse, cancel $r_a-r_p$ to obtain $h^2=2\mu r_pr_a/(r_p+r_a)$. Substitution back at periapsis simplifies the energy:
$$\varepsilon=\frac{\mu r_a}{r_p(r_p+r_a)}-\frac{\mu}{r_p}=-\frac{\mu}{r_p+r_a}=-\frac{\mu}{2a}.$$
Here $2a=r_p+r_a$ is the major-axis length. Energy determines the ellipse's size, but does not determine its elongation. A circle follows separately from $v^2=\mu/r$ and $r=a$; we must not cancel a zero factor.

Now put $\varepsilon=-\mu/(2a)$ into the energy definition and solve for positive speed. This gives the **vis-viva relation**:
$$v=\sqrt{\mu\left(\frac{2}{r}-\frac{1}{a}\right)}.$$
Check it before trusting it. A circle has $r=a$ and recovers $v=\sqrt{\mu/r}$. Letting $a\to\infty$ recovers the escape threshold $v_{esc}=\sqrt{2\mu/r}$. On a fixed ellipse, increasing $r$ reduces $v$, as our climbing picture predicted.

**A useful counterexample.** At $r=a$, even a noncircular ellipse has the local circular speed. Equal speed at one point does not make an orbit circular: velocity direction also matters. Vis-viva supplies speed; it cannot tell you whether the spacecraft is inbound or outbound.`,
    },
  ],
  diagram: orbitDiagram,
  sidebars: [
    {
      heading: "Altitude is not radius",
      body: "For Earth examples use $r=R_\\oplus+h$ with $R_\\oplus=6378\ \\mathrm{km}$ unless a center-to-center radius is supplied. Never substitute a 300 km altitude for a 6678 km radius.",
    },
    {
      heading: "Model boundaries",
      body: "A real orbit has drag, nonspherical gravity, solar radiation pressure, and third-body forces. The two-body constants become slowly changing osculating elements. These derivations are reference models, not navigation-grade ephemerides.",
    },
  ],
  workedExample: {
    title: "A circular low-Earth orbit",
    problem:
      "An unpowered spacecraft is 300 km above a spherical Earth of radius 6378 km. Find its circular speed, specific energy, and escape speed.",
    steps: [
      {
        title: "Choose the geometry",
        body: "$r=6378+300=6678\ \\mathrm{km}$; for a circle $a=r$.",
        reason:
          "Gravity uses distance from the center, and circular motion fixes the semimajor axis.",
        trap: "Using the altitude overestimates the gravitational acceleration.",
      },
      {
        title: "Balance curvature and gravity",
        body: `$v_c=\\sqrt{\\mu/r}=${circ(6678).toFixed(5)}\\ \\mathrm{km/s}$.`,
        reason: "The inward acceleration required for a circle is $v^2/r$.",
        trap: "Keep $\\mu$ and radius in the same length system.",
      },
      {
        title: "Interpret the energy",
        body: `$\\varepsilon=-\\mu/(2r)=${(-mu / (2 * 6678)).toFixed(5)}\\ \\mathrm{km^2/s^2}$.`,
        reason:
          "A negative result means the spacecraft cannot reach infinity without adding energy.",
        trap: "Do not omit the minus sign or report energy in km/s.",
      },
      {
        title: "Find the local escape threshold",
        body: `$v_{esc}=\\sqrt2 v_c=${(Math.SQRT2 * circ(6678)).toFixed(5)}\\ \\mathrm{km/s}$.`,
        reason: "Set the total specific energy to zero.",
        trap: "Escape speed is the final inertial speed; the prograde escape burn is $v_{esc}-v_c$.",
      },
    ],
  },
  fadedExercise: {
    prompt:
      "An ellipse has $r_p=7000$ km and $r_a=14000$ km. Complete the energy-to-speed chain.",
    supplied: [
      {
        heading: "Geometry supplied",
        body: "$a=(7000+14000)/2=10500\ \\mathrm{km}$.",
      },
      {
        heading: "Energy supplied",
        body: `$\\varepsilon=-\\mu/(2a)=${(-mu / 21000).toFixed(6)}\\ \\mathrm{km^2/s^2}$.`,
      },
    ],
    steps: [
      n(
        "fade-vp",
        "Find the speed at periapsis.",
        speed(7000, 10500),
        "km/s",
        "Use $v_p=\\sqrt{2(\\varepsilon+\\mu/r_p)}\\simeq8.71343\ \\mathrm{km/s}$.",
        "Solve the energy definition for positive speed.",
      ),
      n(
        "fade-va",
        "Find the speed at apoapsis.",
        speed(14000, 10500),
        "km/s",
        "At apoapsis, $v_a\\simeq4.35672\ \\mathrm{km/s}$. The product $rv$ matches at the two apsides.",
        "Use the same specific energy, with the new radius.",
      ),
    ],
  },
  retrievalProblems: [
    n(
      "retrieve-v",
      "An Earth orbit has $a=12000$ km. Find its speed at $r=8000$ km.",
      speed(8000, 12000),
      "km/s",
      "Vis-viva gives $v\\simeq8.15067\ \\mathrm{km/s}$.",
      "Recover the energy relation from memory.",
    ),
    c(
      "retrieve-energy",
      "Two spacecraft have the same semimajor axis but different eccentricities. Which is equal?",
      ["Speed everywhere", "Specific orbital energy", "Periapsis radius"],
      1,
      "Specific energy is $-\\mu/(2a)$; instantaneous speed still depends on radius.",
      "Ask which property fixes the energy of a two-body ellipse.",
    ),
  ],
  sources: [jpl, nasa],
};

const geometry: CurriculumTopic = {
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
      circ(7000),
      "km/s",
      "For a circle, $v=\\sqrt{\\mu/r}\\simeq7.54605\ \\mathrm{km/s}$.",
      "Revisit circular speed in the two-body lesson.",
      { prerequisiteId: "two-body" },
    ),
  ],
  intuition: {
    body: "A wire hoop can describe size and tilt, but a stretched hoop needs a direction for its long axis as well. Finally, a bead on the hoop needs a location. An orbit description does the same jobs: set the size, stretch the shape, tip the plane, turn the plane around a reference axis, orient the low point inside the plane, and place the spacecraft.\n\nThe reference plane is a choice, not part of the physical orbit. The same path has different reported angles in an equatorial frame and an ecliptic frame. Always name the reference before comparing element sets.",
    thoughtExperiments: [
      "If the orbit becomes a perfect circle, can you still point to a unique periapsis?",
      "If the orbit lies exactly in the reference plane, where does it cross that plane upward?",
    ],
  },
  theory: [
    {
      heading: "1. Size and shape",
      body: String.raw`Suppose you know the nearest and farthest distances of an ellipse. Adding them gives its size: $a=(r_p+r_a)/2$. To describe elongation independently of size, compare their difference with their sum: $e=(r_a-r_p)/(r_a+r_p)$. A circle has no difference and therefore $e=0$; stretching the orbit while holding its nearest distance fixed makes this ratio approach one.

Solve those two definitions for the distances: adding and subtracting $ae=(r_a-r_p)/2$ from $a$ gives $r_a=a(1+e)$ and $r_p=a(1-e)$. Introduce $p$, the semilatus rectum, to keep the orbit equation compact. For a bound ellipse $0\le e<1$,
$$r_p=a(1-e),\quad r_a=a(1+e),\quad p=a(1-e^2),\quad h=\sqrt{\mu p}.$$
The eccentricity vector $\mathbf e=(\mathbf v\times\mathbf h)/\mu-\mathbf r/r$ points toward periapsis and has magnitude $e$. The scalar orbit equation is
$$r=\frac{p}{1+e\cos\nu}.$$
True anomaly $\nu$ is measured in the direction of motion from periapsis. At $\nu=0$ it yields $r_p$; at $\nu=\pi$ it yields $r_a$. These limits are useful sign checks.`,
    },
    {
      heading: "2. Orient the plane, then the ellipse",
      body: String.raw`Inclination $i$ is the angle from reference normal $\hat{\mathbf z}$ to $\mathbf h$: $\cos i=h_z/h$. The ascending node is where the spacecraft crosses toward positive reference $z$. Let $\mathbf n=\hat{\mathbf z}\times\mathbf h$. The right ascension of ascending node $\Omega$ measures from the reference $x$ axis to $\mathbf n$ in the reference plane. The argument of periapsis $\omega$ measures from that node to $\mathbf e$ in the orbital plane.

Together $(a,e,i,\Omega,\omega,\nu)$ locate a state at an epoch. $\Omega$ and $\omega$ are different rotations about different axes. Specify the epoch, central body, inertial frame and reference plane; six bare numbers are not a complete operational specification.`,
    },
    {
      heading: "3. Recover position and velocity",
      body: String.raw`In the perifocal frame, whose $x$ axis points to periapsis,
$$\mathbf r_{PQW}=\frac{p}{1+e\cos\nu}\begin{bmatrix}\cos\nu\\\sin\nu\\0\end{bmatrix},\qquad \mathbf v_{PQW}=\sqrt{\frac{\mu}{p}}\begin{bmatrix}-\sin\nu\\e+\cos\nu\\0\end{bmatrix}.$$
For active right-handed rotations acting on column vectors, $\mathbf r_I=R_3(\Omega)R_1(i)R_3(\omega)\mathbf r_{PQW}$; apply the same matrix to velocity. The radial and transverse components are $v_r=\sqrt{\mu/p}\,e\sin\nu$ and $v_t=\sqrt{\mu/p}(1+e\cos\nu)$. Away from apsides the velocity is not perpendicular to the radius.`,
    },
    {
      heading: "4. Position is not a uniform clock",
      body: String.raw`Kepler's area law follows from constant $h$: $dA/dt=h/2$. True anomaly grows faster near periapsis. Introduce eccentric anomaly $E$ and mean anomaly $M$:
$$M=E-e\sin E=n(t-\tau),\quad n=\sqrt{\mu/a^3},\quad T=2\pi/n.$$
Solve Kepler's equation for $E$, then use $\nu=2\operatorname{atan2}(\sqrt{1+e}\sin(E/2),\sqrt{1-e}\cos(E/2))$. Use radians inside these functions and preserve quadrants. $\tau$ is a periapsis passage time.`,
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
  ],
  sources: [
    nasa,
    {
      title: "NASA · How orbital motion is calculated",
      url: "https://pwg.gsfc.nasa.gov/stargaze/Smotion.htm",
    },
  ],
};

const hohmann: CurriculumTopic = {
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
  ],
  intuition: {
    body: "To reach a higher circular orbit, push forward at the lower orbit. That raises the far side of your new path. As you coast outward, gravity slows you. On reaching the high point, you are actually moving too slowly to stay on a circle there. A second forward push prevents the next fall back inward.\n\nBoth burns point along the motion even though the final circular orbit has a lower speed. There is no contradiction: during the coast, kinetic energy has been converted into gravitational potential energy. The two impulses add energy at different positions.",
    thoughtExperiments: [
      "If you skip the second burn, where do you return?",
      "Why can adding forward speed ultimately put you on a slower circular orbit?",
    ],
  },
  theory: [
    {
      heading: "1. Define the transfer before computing burns",
      body: String.raw`Assume two coplanar circular orbits with $r_2>r_1$, instantaneous tangential impulses, and two-body coasting. The transfer is tangent to both circles, so
$$a_t=\frac{r_1+r_2}{2},\quad e_t=\frac{r_2-r_1}{r_2+r_1},\quad \varepsilon_t=-\frac{\mu}{r_1+r_2}.$$
At the tangencies all velocities are collinear. Only under this condition does subtracting speeds produce the correct signed velocity change. Choose prograde positive.`,
    },
    {
      heading: "2. Derive the departure and arrival burns",
      body: String.raw`Keep three orbits distinct: the starting circle, the transfer ellipse, and the destination circle. At departure we change from the first to the second; at arrival we change from the second to the third. Mixing their semimajor axes would compare the wrong states.

For example, insert $a_t=(r_1+r_2)/2$ and $r=r_1$ into vis-viva:
$$v_{tp}^2=\mu\left(\frac{2}{r_1}-\frac{2}{r_1+r_2}\right)=\frac{\mu}{r_1}\frac{2r_2}{r_1+r_2}.$$
The same calculation at $r_2$ gives the other end of the ellipse:
$$v_{tp}=\sqrt{\frac{\mu}{r_1}}\sqrt{\frac{2r_2}{r_1+r_2}},\qquad v_{ta}=\sqrt{\frac{\mu}{r_2}}\sqrt{\frac{2r_1}{r_1+r_2}}.$$
Subtract the preburn velocity from the postburn velocity:
$$\Delta v_1=\sqrt{\frac{\mu}{r_1}}\left(\sqrt{\frac{2r_2}{r_1+r_2}}-1\right),$$
$$\Delta v_2=\sqrt{\frac{\mu}{r_2}}\left(1-\sqrt{\frac{2r_1}{r_1+r_2}}\right).$$
The first square-root factor exceeds one because $r_2>r_1$: departure requires speeding up. At arrival the transfer speed is below the destination's circular speed, so the second burn also speeds up. The spacecraft slows during its climb, yet both burns are prograde. Gravity does the slowing between burns.

The propulsive budget is $|\Delta v_1|+|\Delta v_2|$. For inward transfers the signed burns are retrograde; the budget remains nonnegative. Verify the limit $r_2\to r_1$: both burns vanish. A finite cost for transferring an orbit to itself would signal that we compared the wrong before-and-after velocities.`,
    },
    {
      heading: "3. Time of flight and what the budget excludes",
      body: String.raw`The coast covers half an ellipse:
$$t_t=\pi\sqrt{\frac{a_t^3}{\mu}}.$$
This is a transfer between orbit radii, not automatically a rendezvous with a satellite. Arrival requires the target to be at the intersection at the right time. A LEO-to-GEO calculation below assumes equatorial LEO and GEO radius 42164 km; an inclined parking orbit also needs a plane correction. Finite-duration thrust, losses, navigation corrections and reserves are excluded. A Hohmann transfer is optimal within its usual two-impulse circular coplanar class, but three-impulse bi-elliptic transfers can be cheaper for large radius ratios at the cost of longer flight times.`,
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
  ],
  sources: [nasa, jpl],
};

const phasing: CurriculumTopic = {
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
  ],
  intuition: {
    body: "Catching a spacecraft is a clock problem as much as a path problem. On the same circular track, two spacecraft keep their separation. To meet, one must temporarily change its lap time. A lower orbit runs ahead faster; a higher orbit takes longer to return.\n\nChanging orbital planes is different. It turns the direction of the velocity rather than merely changing the orbital size. Turning a slower velocity vector costs less, so high, slow parts of an orbit are attractive places for a plane change. The burn must occur where the two planes intersect.",
    thoughtExperiments: [
      "A target is ahead on the same circular orbit. Why does simply pointing at it and thrusting not describe a rendezvous strategy?",
      "Why should a plane change be performed on the line of nodes?",
    ],
  },
  theory: [
    {
      heading: "1. Match position at a future time",
      body: String.raw`For circular coplanar orbits the mean motions are $n_j=\sqrt{\mu/r_j^3}$. An outward Hohmann arc sweeps $\pi$ radians in time $t_t$. If the target leads the departure radius by $\phi_0$, rendezvous requires
$$\phi_0+n_2t_t=\pi\pmod{2\pi},\qquad \phi_0=\pi-n_2t_t.$$
Waiting changes relative phase at $n_2-n_1$. The alignment cycle is $T_{syn}=2\pi/|n_1-n_2|$. These formulas assume circular target motion and the same orbital plane; angular alignment alone does not ensure matching velocity.`,
    },
    {
      heading: "2. Design a temporary phasing period",
      body: String.raw`For a target ahead by $\phi$ on the same circle, a chaser that completes one faster phasing revolution can meet the target after $t=(2\pi-\phi)/n$. Choose $T_p=t$, then
$$a_p=\left[\mu\left(\frac{T_p}{2\pi}\right)^2\right]^{1/3}.$$
If the original radius $r_0$ is the phasing ellipse's apoapsis, its periapsis is $2a_p-r_0$. Check this against the planet and atmosphere before accepting the design. Use two impulses at the common intersection to depart and restore the circular orbit; longer multi-revolution phasing can reduce the required change.`,
    },
    {
      heading: "3. A plane change is vector subtraction",
      body: String.raw`Imagine turning a velocity arrow without changing its length. A speedometer would show no change, yet a thruster must still act: the final arrow differs from the initial arrow. The burn is that vector difference, $\Delta\mathbf v=\mathbf v_2-\mathbf v_1$.

The orbital planes intersect along their line of nodes; make an instantaneous plane change at a common position on that line. Let the velocity arrows make angle $\delta$. Squaring their difference gives $|\Delta\mathbf v|^2=v_1^2+v_2^2-2\mathbf v_1\cdot\mathbf v_2$, hence
$$\Delta v=\sqrt{v_1^2+v_2^2-2v_1v_2\cos\delta}.$$
For equal speeds, $\Delta v=2v\sin(\delta/2)$. The plane angle generally satisfies $\cos\delta=\cos i_1\cos i_2+\sin i_1\sin i_2\cos(\Omega_2-\Omega_1)$; it is not always $|i_2-i_1|$. Combining a speed change with a turn can cost less than executing them separately at the same location.`,
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
  ],
  sources: [nasa],
};

const perturbations: CurriculumTopic = {
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
  ],
  intuition: {
    body: "Earth has an equatorial bulge. A tilted orbital plane repeatedly passes through a gravitational field that differs slightly from a perfect sphere. Over many revolutions, the small torques accumulate and the plane slowly turns. The instantaneous path still resembles an ellipse, but that ellipse evolves.\n\nThis drift can be useful. A sun-synchronous orbit is designed so that the plane turns at roughly the same yearly rate as the apparent direction to the Sun. A disturbance becomes a mission-design parameter.",
    thoughtExperiments: [
      "Why can a tiny acceleration matter greatly after many orbits?",
      "Would a perfectly spherical Earth select an equatorial direction for a torque?",
    ],
  },
  theory: [
    {
      heading: "1. Perturb the point-mass potential",
      body: String.raw`Using geocentric latitude $\varphi$ and the unnormalized zonal convention,
$$U=-\frac{\mu}{r}\left[1-J_2\left(\frac{R}{r}\right)^2P_2(\sin\varphi)\right],\qquad P_2(x)=\frac12(3x^2-1).$$
The acceleration is $-\nabla U$. For Earth use the approximate instructional constants $J_2=1.08263\times10^{-3}$ and $R=6378\ \mathrm{km}$. $J_2$ is dimensionless. The latitude dependence breaks spherical symmetry; angular momentum is no longer a constant vector.`,
    },
    {
      heading: "2. Average the rapid orbital motion",
      body: String.raw`A small disturbance can produce two different effects: an oscillation that largely undoes itself each revolution, and a small change that accumulates. To see the long-term trend, average over the rapid orbital motion. The resulting mean elements describe the slowly changing orbit; they are not the instantaneous ellipse fitted at every point.

The derivation of these averages requires perturbation theory beyond this lesson. Here we use the first-order result as a model to interpret and test, rather than suggesting that it follows by simple substitution into the potential. To first order in $J_2$, the singly averaged secular rates for mean elements are
$$\dot\Omega=-\frac32J_2n\left(\frac{R}{p}\right)^2\cos i,$$
$$\dot\omega=\frac34J_2n\left(\frac{R}{p}\right)^2(5\cos^2 i-1),\qquad p=a(1-e^2).$$
If $n$ is in rad/s, the rates are in rad/s. Prograde orbits generally have regressing nodes ($\dot\Omega<0$); retrograde orbits have positive nodal rates. A polar orbit has vanishing first-order nodal rate. At $\cos^2 i=1/5$, this approximation predicts no secular apsidal rotation. This is an averaged result, not an absence of short-period variations.`,
    },
    {
      heading: "3. Keep a hierarchy of models",
      body: "For a qualitative sketch use a fixed Kepler ellipse. For long-term plane evolution use averaged perturbation rates. For trajectory targeting integrate a force model with adequate gravity harmonics, drag, third bodies and radiation pressure. Mean and osculating elements are not interchangeable initial conditions. A circular orbit also has no well-defined argument of periapsis, even when a formal rate expression exists.",
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
          0.00108263 *
          Math.sqrt(mu / 7000 ** 3) *
          (6378 / 7000) ** 2 *
          0.5 *
          86400 *
          180) /
          Math.PI,
        "deg/day",
        "The rate is approximately $-3.5973$ deg/day.",
        "Use $-C\\cos i$, then convert the time and angular units.",
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
  ],
  sources: [
    {
      title: "a.i. solutions · FreeFlyer: J2 perturbation",
      url: "https://ai-solutions.com/_freeflyeruniversityguide/j2_perturbation.htm",
    },
    jpl,
  ],
};

const patched: CurriculumTopic = {
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
  ],
  intuition: {
    body: "A spacecraft leaving Earth is first described mainly by Earth’s gravity, and later mainly by the Sun’s. Patched conics simplify this gradual transition by switching between ideal two-body arcs. Think of changing maps: the spacecraft does not jump, but the center used to describe its motion changes.\n\nA Moon-bound trajectory illustrates the limitation. An Earth-centered ellipse that reaches the Moon’s distance is only an energy estimate. The Moon must be there at the right time, and the spacecraft must enter its neighborhood with the correct direction and speed.",
    thoughtExperiments: [
      "Does switching from Earth-relative speed to Sun-relative speed require an engine burn?",
      "Why does reaching lunar distance not by itself guarantee lunar capture?",
    ],
  },
  theory: [
    {
      heading: "1. Hyperbolic excess is an energy parameter",
      body: String.raw`Escape is a threshold, but a mission often needs to depart with energy left over. Call the speed remaining far from the planet $v_\infty$. In the ideal local two-body model the potential approaches zero there, leaving $\varepsilon=v_\infty^2/2$.

The same energy at periapsis satisfies $v_p^2/2-\mu/r_p=v_\infty^2/2$. Multiply by two and move the potential term to the other side:
$$v_p=\sqrt{v_\infty^2+\frac{2\mu}{r_p}},\qquad C_3=v_\infty^2.$$
Notice that the squared speeds add. Adding $v_\infty$ directly to escape speed would assign the wrong energy. Setting $v_\infty=0$ recovers the local escape threshold, a useful check on the formula.

From a circular parking orbit, a tangential prograde injection requires $\Delta v=v_p-\sqrt{\mu/r_p}$. We subtract because the spacecraft already has circular speed before firing. The hyperbolic semimajor axis follows the signed convention $a=-\mu/v_\infty^2<0$. Do not substitute a positive ellipse semimajor axis for a hyperbola. $C_3$ has units of squared speed; it is not a burn magnitude.`,
    },
    {
      heading: "2. Patch in a common frame",
      body: String.raw`In the ideal asymptotic patch, heliocentric departure velocity is
$$\mathbf v_{sc,\odot}=\mathbf v_{planet,\odot}+\mathbf v_{\infty,planet}.$$
Vector direction matters. Prograde and retrograde excess vectors with equal magnitudes can produce very different heliocentric energies. A rough Laplace sphere-of-influence scale is $r_{SOI}\simeq a_{planet}(m_{planet}/M_\odot)^{2/5}$. It is a model boundary, not a physical discontinuity. At a finite boundary, match position and velocity after transforming frames; finite-radius planet-relative speed is not exactly $v_\infty$.`,
    },
    {
      heading: "3. An Earth–Moon energy estimate",
      body: String.raw`For an Earth-centered ellipse with $r_p=6678$ km and $r_a=384400$ km, $a=195539$ km. Compute injection from vis-viva and coast for half the ellipse period. This ignores lunar motion and lunar gravity until encounter. The resulting apoapsis speed is Earth-relative; subtract the Moon's **vector** velocity to obtain a local encounter estimate. Lunar orbit insertion then needs a Moon-centered hyperbolic approach and a capture burn; no Earth-only ellipse supplies that burn automatically.`,
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
  ],
  sources: [nasa, jpl],
};
const pack: CurriculumPack = {
  id: "astrodynamics",
  version: "1.0.0",
  title: "Astrodynamics",
  description: "From a falling body to an interplanetary trajectory.",
  conventions:
    "Earth μ = 398600.4418 km³/s²; Earth radius = 6378 km. Radii are measured from the center unless altitude is stated. Inertial frames, impulsive burns, and spherical two-body coasts are assumed unless a lesson explicitly changes the model. Enter unit 1 for dimensionless values. Numeric tolerance: 0.2% or 0.001, whichever is larger.",
  overview: astroOverview,
  topics: [twoBody, geometry, hohmann, phasing, perturbations, patched].map(
    (topic) => ({
      ...topic,
      teaching: astroTeaching[topic.id],
      practiceTemplates: astroPractice[topic.id],
    }),
  ),
};
export default pack;
