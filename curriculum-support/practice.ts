import type { Expression as E, PracticeTemplate } from "@/types/curriculum";
const v = (variable: string): E => ({ variable });
const op = (
  op:
    | "add"
    | "subtract"
    | "multiply"
    | "divide"
    | "power"
    | "sqrt"
    | "sin"
    | "cos",
  ...args: E[]
): E => ({ op, args });
const add = (a: E, b: E) => op("add", a, b),
  sub = (a: E, b: E) => op("subtract", a, b),
  mul = (a: E, b: E) => op("multiply", a, b),
  div = (a: E, b: E) => op("divide", a, b),
  sqrt = (a: E) => op("sqrt", a);
const variable = (name: string, min: number, max: number, step = 1) => ({
  name,
  min,
  max,
  step,
});
const mu = 398600.4418,
  vc = (r: E) => sqrt(div(mu, r)),
  a = div(add(v("r1"), v("r2")), 2),
  vt = (r: E) => sqrt(mul(mu, sub(div(2, r), div(1, a))));
export const astroPractice: Record<string, PracticeTemplate[]> = {
  "two-body": [
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
  ],
  geometry: [
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
  ],
  hohmann: [
    {
      id: "hohmann-variant",
      title: "Budget an outward transfer",
      prompt:
        "Find the total ideal two-impulse Hohmann Δv from a circular Earth-centered radius of {{r1}} km to {{r2}} km. The orbits are coplanar; use μ = 398600.4418 km³/s².",
      variables: [
        variable("r1", 7000, 10000, 500),
        variable("r2", 18000, 42000, 2000),
      ],
      formula: add(
        sub(vt(v("r1")), vc(v("r1"))),
        sub(vc(v("r2")), vt(v("r2"))),
      ),
      unit: "km/s",
      hint: "Set the transfer semimajor axis to half the sum of the radii. Compare circular and transfer speeds at each end.",
      solution: String.raw`The transfer has $a_t=({{r1}}+{{r2}})/2$ km. Compute $v_{tp}-v_{c1}$ and $v_{c2}-v_{ta}$, then add their positive magnitudes. The total is {{answer}} km/s.`,
    },
  ],
  phasing: [
    {
      id: "plane-variant",
      title: "Turn a velocity vector",
      prompt:
        "At a common node, a spacecraft moving at {{speed}} km/s changes planes through {{angle}} degrees without changing speed. Find the impulse magnitude.",
      variables: [variable("speed", 1, 8, 0.5), variable("angle", 5, 45, 5)],
      formula: mul(
        mul(2, v("speed")),
        op("sin", mul(v("angle"), Math.PI / 360)),
      ),
      unit: "km/s",
      hint: "Draw the chord between equal-length velocity vectors. The angle inside the sine is half the turn angle.",
      solution: String.raw`$\Delta v=2v\sin(\delta/2)=2({{speed}})\sin({{angle}}^\circ/2)={{answer}}\ \mathrm{km/s}$.`,
    },
  ],
  perturbations: [
    {
      id: "node-variant",
      title: "Predict nodal drift",
      prompt:
        "For a circular Earth orbit of radius {{r}} km at inclination {{i}} degrees, find the first-order mean J₂ nodal rate in degrees/day. Use μ = 398600.4418 km³/s², R = 6378 km, and J₂ = 0.00108263.",
      variables: [variable("r", 7000, 9000, 500), variable("i", 20, 120, 10)],
      formula: mul(
        mul(
          mul(-1.5 * 0.00108263, sqrt(div(mu, op("power", v("r"), 3)))),
          op("power", div(6378, v("r")), 2),
        ),
        mul(op("cos", mul(v("i"), Math.PI / 180)), (86400 * 180) / Math.PI),
      ),
      unit: "deg/day",
      hint: "Use the nodal-rate expression, preserve its sign, and convert radians per second to degrees per day.",
      solution: String.raw`For a circle $p=r={{r}}$ km. Substitute into $\dot\Omega=-\frac32 J_2\sqrt{\mu/r^3}(R/r)^2\cos i$, then multiply by $86400(180/\pi)$. The mean rate is {{answer}} deg/day.`,
    },
  ],
  "patched-conics": [
    {
      id: "escape-variant",
      title: "Leave the gravity well",
      prompt:
        "From an Earth circular parking radius of {{r}} km, find the ideal prograde injection Δv for a hyperbolic excess speed of {{excess}} km/s. Use μ = 398600.4418 km³/s².",
      variables: [
        variable("r", 7000, 9000, 500),
        variable("excess", 1, 5, 0.5),
      ],
      formula: sub(
        sqrt(add(op("power", v("excess"), 2), div(2 * mu, v("r")))),
        vc(v("r")),
      ),
      unit: "km/s",
      hint: "The hyperbolic local speed includes the excess-energy term and Earth’s potential well. Subtract the parking speed.",
      solution: String.raw`$\Delta v=\sqrt{v_\infty^2+2\mu/r}-\sqrt{\mu/r}={{answer}}\ \mathrm{km/s}$ for the supplied {{r}} km radius and {{excess}} km/s excess speed.`,
    },
  ],
};
export const foundationsPractice: PracticeTemplate[] = [
  {
    id: "rate-variant",
    title: "A fresh rate problem",
    prompt:
      "A traveler covers {{distance}} km in {{hours}} hours. Find the average speed.",
    variables: [variable("distance", 60, 420, 20), variable("hours", 2, 6)],
    formula: div(v("distance"), v("hours")),
    unit: "km/h",
    hint: "Divide the distance by elapsed time.",
    solution: "{{distance}} km divided by {{hours}} h is {{answer}} km/h.",
  },
];
