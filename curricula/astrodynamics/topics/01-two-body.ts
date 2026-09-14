import { numeric as n, choice as c, v, mul, sub, div, sqrt, variable } from "@/curriculum-support/authoring";
import type { CurriculumTopic } from "@/types/curriculum";
import { mu } from "../constants";
import { orbitDiagram } from "../diagrams";
import { nasa, jpl } from "../sources";
const topic: CurriculumTopic = {
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
    c(
      "scaling",
      "An orbiting body's distance from Earth's center triples. By what factor does gravitational acceleration change?",
      ["It is divided by 3", "It is divided by 9", "It is divided by 27"],
      1,
      "Acceleration follows an inverse-square law: tripling r divides acceleration by $3^2=9$.",
      "The exponent on r in the denominator is 2, not 1 or 3.",
    ),
  ],
  teaching: {
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
        further: [
          {
            question:
              "The relative equation was built by subtracting Earth’s acceleration from the spacecraft’s. What guarantees the two individual acceleration terms have exactly opposite sign in the first place?",
            answer:
              "Newton’s third law. Earth pulls the spacecraft with the same size force the spacecraft pulls Earth with, but in the opposite direction, so writing each body’s own $F=ma$ separately and comparing them produces a plus sign for one and a minus sign for the other.",
          },
          {
            question:
              "Why is $\\mu\\simeq GM_\\oplus$ an excellent approximation for a spacecraft, but not for analyzing the Moon’s orbit around Earth using the same equation?",
            answer:
              "μ is defined as $G(m_1+m_2)$. A spacecraft’s mass is negligible next to Earth’s, so the sum collapses to $GM_\\oplus$ alone. The Moon’s mass is roughly one eightieth of Earth’s — not negligible — so a correct treatment must keep both masses in μ rather than dropping the smaller one.",
          },
          {
            question:
              "Suppose Earth’s mass were doubled and, at the same time, the spacecraft’s distance were doubled. Does the gravitational acceleration on the spacecraft increase, decrease, or stay the same?",
            answer:
              "It is cut in half. Doubling Earth’s mass doubles μ, but doubling the distance divides the inverse-square factor by four. Combined, the acceleration scales by $2\\times\\tfrac14=\\tfrac12$ — the two changes do not cancel.",
          },
        ],
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
        further: [
          {
            question:
              "The derivation dots Newton’s equation of motion with velocity. Why velocity, rather than, say, position?",
            answer:
              "Dotting with velocity turns an acceleration into the time derivative of a squared speed, via $\\mathbf v\\cdot\\dot{\\mathbf v}=d(v^2/2)/dt$ — a scalar quantity we can directly compare with the potential term’s derivative. Dotting with position instead relates to how radius changes, which is a different, useful, but unrelated identity, not one that produces a conserved energy.",
          },
          {
            question:
              "One spacecraft has specific energy $-15\\ \\mathrm{km^2/s^2}$; another has $-30\\ \\mathrm{km^2/s^2}$. All else equal, which one sits, on average, farther from Earth?",
            answer:
              "The one with $-15\\ \\mathrm{km^2/s^2}$. Since $\\varepsilon=-\\mu/(2a)$, a less negative energy corresponds to a larger semimajor axis, and semimajor axis is the natural measure of an orbit’s average distance.",
          },
          {
            question:
              "If specific energy had instead been defined with the opposite sign on the potential term, as $\\varepsilon=v^2/2+\\mu/r$, would the same conservation argument in this section still go through?",
            answer:
              "No. The derivation relies on $d(-\\mu/r)/dt=+\\mu\\dot r/r^2$ exactly cancelling $d(v^2/2)/dt=-\\mu\\dot r/r^2$ when added. Flipping the potential’s sign flips that derivative’s sign too, so the two terms would add instead of cancel, and the resulting quantity would not have a zero time derivative — it would not be conserved at all.",
          },
        ],
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
        further: [
          {
            question:
              "Why does the derivation single out periapsis and apoapsis instead of comparing two arbitrary points on the ellipse?",
            answer:
              "Because velocity is purely transverse at those two points only, so speed reduces to the clean product $r v=h$ with no separate radial component to track. At an arbitrary point the velocity has both a radial and a transverse piece, and the algebra would need to carry both.",
          },
          {
            question:
              "The derivation cancels a factor of $(r_a-r_p)$ partway through. What does that step silently assume, and where does this lesson say that assumption is revisited?",
            answer:
              "It assumes the orbit is genuinely elongated, so $r_a\\ne r_p$ and the factor being cancelled is not zero. The circular case, where $r_a=r_p$, is explicitly handled afterward using $v^2=\\mu/r$ and $r=a$ instead — the text flags this directly rather than letting the cancellation apply silently to a circle.",
          },
          {
            question:
              "Vis-viva predicts a spacecraft’s speed at some radius $r_0\\ne a$ to be exactly equal to the local circular speed $\\sqrt{\\mu/r_0}$ at that same radius. Is this possible?",
            answer:
              "No. Setting $\\sqrt{\\mu(2/r_0-1/a)}=\\sqrt{\\mu/r_0}$ and simplifying gives $1/r_0=1/a$, forcing $r_0=a$. So the local circular speed can only be matched at the one radius $r=a$ — consistent with the counterexample already noted in this section.",
          },
        ],
      },
    ],
    takeaway:
      "An unpowered spacecraft exchanges speed for height while keeping total orbital energy constant. A burn changes that energy and therefore changes the whole orbit.",
    nextConnection:
      "Next we need a language for that orbit: how big it is, how stretched it is, where its plane points, and where the spacecraft sits.",
  },
  intuition: {
    body: "Isaac Newton had a favourite way of explaining why the Moon does not fall into the Earth, and it is still the best way in. Picture a cannon standing on top of an impossibly tall mountain, poking out above the atmosphere entirely, so there is no air resistance to worry about. Fire it gently, and the cannonball arcs over, curves downward under gravity, and lands on the ground some distance away, exactly as any thrown object does. Load more powder, and it goes farther before landing. Load enough powder, and something changes in kind rather than in degree: the cannonball is falling toward the ground at every instant, exactly as before, but the ground itself is curving away beneath it, at the same rate, because the Earth is round. The cannonball never gets any closer to the surface than it started. It has become a satellite, and it did this without ever once turning off gravity or ceasing to fall.\n\nThat is the entire content of an orbit, and it is worth sitting with until it feels obvious: an orbit is not the absence of falling, it is falling that keeps missing the ground. Nothing exotic is added by going from a thrown rock to the International Space Station; the geometry of the fall simply closes on itself. This is also why an orbiting spacecraft, engines off, needs nothing at all to keep going. There is no gentle backward push holding it up, in the way a wing holds up an aircraft. Gravity is doing exactly what it always does, and the shape of the path is doing the rest.\n\nNow ask what changes when an engine actually fires. Suppose the spacecraft is coasting on some closed path, and it briefly burns its engine forward, along its direction of travel. At the instant the burn ends, its position has not moved at all, not even slightly, because a burn changes velocity, not location. And yet everything about its subsequent path is different: it now carries more speed than it did a moment before, and that extra speed carries it farther out on the opposite side of its path than it would otherwise have reached, before gravity turns it back. Watch it climb toward that farther point, though, and something worth noticing happens: it slows down as it goes, trading the speed the burn gave it for altitude, the same way a ball thrown straight up trades speed for height on the way up. The burn itself was local, a single instant at a single point. Its consequence, the whole new shape of the path, is not local at all; it is written into every subsequent point of the orbit.",
    thoughtExperiments: [
      "Newton's cannonball reaches orbital speed and the powder runs out — no further burns are possible. What keeps bending its path from then on?",
      "A spacecraft speeds up briefly at the lowest point of its orbit, then coasts with the engine off as it climbs toward the highest point. Is gravity doing positive or negative work on it during that climb? Explain in words, without writing down an equation.",
    ],
  },
  theory: [
    {
      heading: "1. Reduce two moving bodies to one relative coordinate",
      body: String.raw`Strictly speaking, Earth and a spacecraft both move: Earth wobbles very slightly in response to the spacecraft's own gravity, tiny as that pull is, and the spacecraft moves a great deal in response to Earth's. Tracking both of these motions separately, against some fixed background of stars, would work, but it would be answering a question nobody actually asked. What we want to know about an orbit — how large it is, how it changes when an engine fires — depends only on the *separation* between the two bodies, not on where that pair happens to sit in the wider universe. So the first move is to stop describing two positions and start describing one: their difference.

Let $\mathbf r=\mathbf r_2-\mathbf r_1$ point from the primary body to the spacecraft. In an inertial frame — one not itself accelerating — Newton's law of gravitation gives each body's acceleration due to the other: $\ddot{\mathbf r}_2=-Gm_1\mathbf r/r^3$ pulls the spacecraft toward Earth, and $\ddot{\mathbf r}_1=+Gm_2\mathbf r/r^3$ pulls Earth toward the spacecraft, equal and opposite, exactly as Newton's third law demands. Subtract the first equation from the second, and the awkward dependence on the arbitrary inertial origin cancels out entirely, leaving a single, self-contained equation for how the *separation itself* evolves:
$$\ddot{\mathbf r}=-\frac{\mu}{r^3}\mathbf r,\qquad \mu=G(m_1+m_2).$$
Read this equation slowly before moving on, because everything else in this course is built on top of it. The vector $\mathbf r/r^3$ points from the spacecraft back toward Earth (notice the leading minus sign), and its length falls off as $1/r^2$ once you divide the length-$r$ numerator by the length-cubed denominator. The strength of the whole effect, meanwhile, is packaged into the single constant $\mu$, which combines both masses and Newton's gravitational constant $G$ into one number you never have to separate again.

For a spacecraft that is enormously lighter than Earth, $m_2\ll m_1$, so $\mu\simeq GM_\oplus$ to superb accuracy, and we may as well treat Earth as fixed for the rest of this course. In practice you will use the tabulated value $\mu=398600.4418\ \mathrm{km^3/s^2}$ directly, rather than multiplying a separately measured $G$ by a separately measured Earth mass — the tabulated product is simply known to far greater precision than either factor is on its own.

It is worth being honest, from this very first equation onward, about what this model quietly assumes: point masses, or perfectly spherical bodies (which behave, from outside, exactly like points); no atmosphere to drag against; no thrust except at the instants we explicitly choose to fire an engine; and no meaningful pull from any third body such as the Moon or the Sun. None of these assumptions is exactly true of a real mission. They are, however, true enough to make this model the right place to start, and precise enough that its predictions are worth taking seriously before we go back, in a later lesson, to ask what each assumption leaves out.`,
    },
    {
      heading: "2. Derive the conserved specific energy",
      body: String.raw`Here is the question this section actually answers: if you know how fast a spacecraft is moving at one point on its path, can you predict its speed at some other point, without solving the full equation of motion at every instant in between? The answer turns out to be yes, and it hinges on finding some quantity that stays fixed even while both height and speed are changing underneath it.

Start from the plain scalar identity $v^2=\mathbf v\cdot\mathbf v$, and differentiate both sides with respect to time. The product rule gives $d(v^2/2)/dt=\mathbf v\cdot\dot{\mathbf v}$ — this is precisely why it is worth dotting Newton's equation of motion with the velocity vector: doing so converts a statement about a vector *acceleration* into a much more useful statement about a scalar, *changing speed*. Apply exactly the same trick to $r^2=\mathbf r\cdot\mathbf r$, and differentiating gives $\mathbf r\cdot\mathbf v=r\dot r$. Substitute the equation of motion from section 1 into the first of these identities, and the two together give
$$\frac{d}{dt}\left(\frac{v^2}{2}\right)=-\frac{\mu\dot r}{r^2},\qquad \frac{d}{dt}\left(-\frac{\mu}{r}\right)=\frac{\mu\dot r}{r^2}.$$
Look closely at these two results side by side, because the whole derivation turns on noticing something almost too simple to trust at first: they are equal in size and opposite in sign. The left-hand expression is negative while the spacecraft is climbing outward ($\dot r>0$), which matches the intuitive picture from the previous section: climbing costs kinetic energy. The right-hand expression identifies a second, purely radius-dependent quantity that is *growing* at exactly the rate the first is shrinking. Add the two equations together, and their right-hand sides cancel completely, leaving a derivative of exactly zero. Whatever has a derivative of zero is a constant of the motion, so
$$\varepsilon=\frac{v^2}{2}-\frac{\mu}{r}$$
never changes along an unpowered path, no matter how the individual terms $v^2/2$ and $-\mu/r$ trade against one another as the spacecraft climbs and falls. This quantity is called the **specific orbital energy** — "specific" meaning per unit mass, since the spacecraft's own mass cancelled out of the equation of motion long before we got here, and never reappeared. Its units are $\mathrm{km^2/s^2}$, and its real usefulness is exactly what we set out to find: knowing $\varepsilon$ at one point lets you find the speed at any other point on the same path, with no need to integrate anything in between.

The sign of $\varepsilon$ is worth understanding properly, not just memorising. As $r\to\infty$, the potential term $-\mu/r$ tends to zero, so reaching infinity with any residual speed $v_\infty$ requires $v_\infty^2/2=\varepsilon$ exactly. A *negative* $\varepsilon$ can never satisfy that equation, since the right-hand side would have to be negative too, and a squared speed cannot be negative — so a negative-energy spacecraft is permanently bound, unable to reach infinity no matter how long it coasts. Zero energy sits exactly on the escape threshold. A positive value leaves speed to spare even after climbing all the way out. These three cases correspond, for the non-radial motion we care about here, to ellipses, parabolas and hyperbolas respectively — the classical conic sections, and the reason this whole subject is sometimes called "conic-section mechanics."

**Test the claim before trusting it, the way any new tool deserves to be tested.** Does constant energy mean constant speed? Only if the radius never changes either — on an ellipse it plainly does not, and the two terms in $\varepsilon$ trade continuously while their sum stays fixed. And why does a burn break this whole argument? Because the moment an engine fires, Newton's equation of motion picks up an extra term besides gravity, the derivation above no longer applies, and $\varepsilon$ is free to jump to a new value. That, in fact, is the entire point of a burn: it is nothing more or less than a deliberate, controlled change in $\varepsilon$.`,
    },
    {
      heading: "3. Connect energy to the ellipse",
      body: String.raw`Energy is a useful number, but so far it is disconnected from anything you could actually see or measure about the shape of an orbit. To connect the two, look at the two most convenient points on any ellipse: periapsis, the nearest point to the attracting body, and apoapsis, the farthest. They are convenient for a specific reason — at both points, the spacecraft is moving purely sideways, with no component of velocity toward or away from Earth, so its entire speed shows up as motion transverse to the radius.

Making that precise needs one more conserved quantity besides energy. Differentiate the specific angular momentum $\mathbf h=\mathbf r\times\mathbf v$ with respect to time: $\dot{\mathbf h}=\mathbf v\times\mathbf v+\mathbf r\times\dot{\mathbf v}=\mathbf 0$, because a vector crossed with itself is always zero, and because gravity, from section 1, points exactly along $\mathbf r$, so it too vanishes when crossed with $\mathbf r$. So $\mathbf h$ is constant for as long as the spacecraft coasts. At periapsis and apoapsis specifically, where the velocity is entirely transverse, its magnitude reduces to a simple product of radius and speed: $r_pv_p=r_av_a=h$.

Now use that relationship to eliminate speed from the energy expression at both apsides, and set the two resulting energies equal to each other, since $\varepsilon$ must be the same number everywhere along one orbit:
$$\frac{h^2}{2r_p^2}-\frac{\mu}{r_p}=\frac{h^2}{2r_a^2}-\frac{\mu}{r_a}.$$
Move every speed-related term to one side of the equation, and you will find that both sides share a common factor of $(r_a-r_p)$, which can be cancelled — provided the ellipse genuinely is elongated, so that factor is not itself zero:
$$\frac{h^2}{2}\frac{(r_a-r_p)(r_a+r_p)}{r_p^2r_a^2}=\mu\frac{r_a-r_p}{r_pr_a}.$$
Cancelling leaves $h^2=2\mu r_pr_a/(r_p+r_a)$. Feed this back into the energy expression evaluated at periapsis, and after some careful but entirely mechanical algebra, the periapsis and apoapsis radii collapse into a single combined quantity:
$$\varepsilon=\frac{\mu r_a}{r_p(r_p+r_a)}-\frac{\mu}{r_p}=-\frac{\mu}{r_p+r_a}=-\frac{\mu}{2a}.$$
Here $2a=r_p+r_a$ is simply the length of the ellipse's major axis, so $a$, the semimajor axis, is exactly half of it. Notice what this result is actually saying: energy fixes the *size* of the ellipse, full stop — it says nothing whatsoever about how elongated or circular that ellipse happens to be. A circle is recovered separately, from $v^2=\mu/r$ together with $r=a$; the derivation above cannot be pushed through for a circle directly, because we would be dividing by the very factor, $r_a-r_p$, that a circle sets to zero.

Substitute $\varepsilon=-\mu/(2a)$ back into the original definition of specific energy, and solve for the positive root of speed. The result is the single most useful equation in this entire course, the **vis-viva relation**:
$$v=\sqrt{\mu\left(\frac{2}{r}-\frac{1}{a}\right)}.$$
Before trusting an equation this important, check it against cases you already understand. Set $r=a$, the circular case, and it correctly reduces to $v=\sqrt{\mu/r}$. Let $a\to\infty$, corresponding to zero energy, and it correctly recovers the escape threshold $v_{esc}=\sqrt{2\mu/r}$. And on a fixed ellipse, increasing $r$ makes $v$ shrink, exactly matching the climbing-and-slowing picture from the introduction to this lesson.

**A useful counterexample, worth keeping in your back pocket.** At the single radius $r=a$, even a distinctly noncircular ellipse has exactly the local circular speed. Equal speed at one particular radius does not, by itself, make an orbit circular — direction matters just as much as magnitude, and vis-viva only ever tells you the magnitude. It cannot tell you whether the spacecraft, at that instant, is climbing outward or falling inward.`,
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
        body: `$v_c=\\sqrt{\\mu/r}=${Math.sqrt(mu / 6678).toFixed(5)}\\ \\mathrm{km/s}$.`,
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
        body: `$v_{esc}=\\sqrt2 v_c=${(Math.SQRT2 * Math.sqrt(mu / 6678)).toFixed(5)}\\ \\mathrm{km/s}$.`,
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
        Math.sqrt(mu * (2 / 7000 - 1 / 10500)),
        "km/s",
        "Use $v_p=\\sqrt{2(\\varepsilon+\\mu/r_p)}\\simeq8.71343\ \\mathrm{km/s}$.",
        "Solve the energy definition for positive speed.",
      ),
      n(
        "fade-va",
        "Find the speed at apoapsis.",
        Math.sqrt(mu * (2 / 14000 - 1 / 10500)),
        "km/s",
        "At apoapsis, $v_a\\simeq4.35672\ \\mathrm{km/s}$. The product $rv$ matches at the two apsides.",
        "Use the same specific energy, with the new radius.",
      ),
      n(
        "fade-h",
        "Using your periapsis speed, find the specific angular momentum $h=r_pv_p$.",
        7000 * Math.sqrt(mu * (2 / 7000 - 1 / 10500)),
        "km^2/s",
        "$h=r_pv_p\\simeq60994.02\ \\mathrm{km^2/s}$. Check it: $r_av_a$ should give the same value.",
        "At periapsis the entire speed is transverse, so the product is exact.",
      ),
      n(
        "fade-mid",
        "Vis-viva works at any radius, not only the apsides. Find the speed at $r=9000$ km on this same ellipse.",
        Math.sqrt(mu * (2 / 9000 - 1 / 10500)),
        "km/s",
        "$v=\\sqrt{\\mu(2/9000-1/10500)}\\simeq7.99806\ \\mathrm{km/s}$. The same $a$ from the supplied geometry still applies.",
        "Reuse the semimajor axis already supplied; only the radius changes.",
      ),
    ],
  },
  retrievalProblems: [
    n(
      "retrieve-v",
      "An Earth orbit has $a=12000$ km. Find its speed at $r=8000$ km.",
      Math.sqrt(mu * (2 / 8000 - 1 / 12000)),
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
    n(
      "retrieve-escape",
      "Find the escape speed at an Earth-centered radius of 7000 km.",
      Math.sqrt((2 * mu) / 7000),
      "km/s",
      "$v_{esc}=\\sqrt{2\\mu/r}\\simeq10.67308\ \\mathrm{km/s}$: the $a\\to\\infty$ limit of vis-viva.",
      "Escape is the boundary where specific energy is exactly zero.",
    ),
    c(
      "retrieve-sign",
      "A spacecraft has positive specific orbital energy. What kind of path is it on?",
      [
        "A bound ellipse",
        "The circular boundary case",
        "An unbound hyperbolic trajectory",
      ],
      2,
      "Positive energy means speed to spare even after climbing to infinity: an unbound, hyperbolic path.",
      "Recall which sign of energy corresponds to a spacecraft that can reach infinity with speed remaining.",
    ),
    c(
      "retrieve-limit",
      "An elliptical orbit and a circular orbit share the same semimajor axis $a$. At the one radius where the ellipse's distance equals $a$, how do their speeds compare?",
      [
        "The ellipse is faster",
        "They are equal",
        "The circular orbit is faster",
      ],
      1,
      "At $r=a$, vis-viva for the ellipse reduces to exactly $\\sqrt{\\mu/a}$, the circular speed at that radius.",
      "Substitute $r=a$ directly into the vis-viva relation.",
    ),
    n(
      "retrieve-dv",
      "A spacecraft in a circular orbit at $r=7000$ km fires a burn that instantaneously adds 2 km²/s² of specific energy without changing its radius. Find its speed immediately after the burn.",
      Math.sqrt(mu / 7000 + 2 * 2),
      "km/s",
      "$v_{new}=\\sqrt{v_{old}^2+2\\Delta\\varepsilon}=\\sqrt{\\mu/7000+4}\\simeq7.68266\ \\mathrm{km/s}$: radius is unchanged at the instant of the burn, so only $v^2$ absorbs the energy change.",
      "Add the energy change directly to the old energy, then solve the energy definition for the new speed at the same radius.",
    ),
  ],
  sources: [jpl, nasa],
};
topic.practiceTemplates = [
  {
    id: "vis-viva-variant",
    title: "Speed on an ellipse",
    prompt:
      "An Earth-centered orbit has a semimajor axis of {{a}} km. At a radius of {{r}} km, how fast is the spacecraft moving? Use μ = 398600.4418 km³/s².",
    variables: [
      variable("a", 12000, 18000, 500),
      variable("r", 7000, 10000, 250),
    ],
    formula: sqrt(mul(mu, sub(div(2, v("r")), div(1, v("a"))))),
    unit: "km/s",
    hint: "Use the orbit size to identify its energy, then use the current radius to find the speed.",
    solution: String.raw`With $a={{a}}$ km and $r={{r}}$ km, $v=\sqrt{\mu(2/r-1/a)}={{answer}}\ \mathrm{km/s}$.`,
  },
];
export default topic;
