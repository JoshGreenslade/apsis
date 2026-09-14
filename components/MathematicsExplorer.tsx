"use client";
import { useState } from "react";
import { MathText } from "./MathText";
import { boostEvent, squareIntegralBounds, squareSecant, squareWaveSum, symmetricMap } from "@/lib/mathematics-experiments";

const supported = new Set(["derivatives", "integrals", "eigenvectors", "fourier", "metrics"]);
const fmt = (n: number) => Math.abs(n) < 0.00001 ? "0" : n.toFixed(3);
const curve = (f: (x: number) => number, start: number, end: number, sx: (x: number) => number, sy: (y: number) => number) =>
  Array.from({ length: 241 }, (_, i) => {
    const x = start + (end - start) * i / 240;
    return `${i ? "L" : "M"}${sx(x).toFixed(2)},${sy(f(x)).toFixed(2)}`;
  }).join(" ");

export default function MathematicsExplorer({ topicId }: { topicId: string }) {
  if (!supported.has(topicId)) return null;
  return <details className="math-explorer">
    <summary>Explore the idea · change one thing and predict what happens</summary>
    <div className="math-explorer-body"><Experiment key={topicId} topicId={topicId} /></div>
  </details>;
}

function Experiment({ topicId }: { topicId: string }) {
  const [value, setValue] = useState(topicId === "derivatives" ? 1 : topicId === "integrals" ? 4 : topicId === "eigenvectors" ? 20 : topicId === "fourier" ? 1 : 0);
  const [revealed, setRevealed] = useState(false);
  const range = (label: string, min: number, max: number, step: number, display: string) => <label className="math-range">
    <span>{label}: <strong>{display}</strong></span>
    <input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={e => setValue(Number(e.target.value))} />
  </label>;
  const explanation = (text: string) => <>
    <button className="text-button" type="button" onClick={() => setRevealed(!revealed)} aria-expanded={revealed}>
      {revealed ? "Hide explanation" : "Compare your reasoning"}
    </button>
    {revealed && <MathText>{text}</MathText>}
  </>;
  const axes = (x: number, y: number) => <g className="math-axes"><line x1="40" y1={y} x2="560" y2={y} /><line x1={x} y1="20" x2={x} y2="280" /></g>;

  if (topicId === "derivatives") {
    const h = value, slope = squareSecant(1, h);
    const sx = (x: number) => 55 + 160 * x, sy = (y: number) => 275 - 27 * y;
    return <>
      <h3>From an average slope to a local slope</h3>
      <MathText>{"The graph is $f(t)=t^2$. Keep the first point at $t=1$ and move the second point to $1+h$. Predict the secant slope as the gap shrinks. The dashed tangent stays fixed."}</MathText>
      {range("Gap h", .05, 2, .05, h.toFixed(2))}
      <svg viewBox="0 0 600 310" role="img" aria-label={`Parabola, secant slope ${fmt(slope)}, and tangent slope 2 at t equals 1`}>
        {axes(55, 275)}
        <path className="math-curve" d={curve(x => x * x, 0, 3, sx, sy)} />
        <path className="math-comparison" d={curve(x => 1 + 2 * (x - 1), .5, 2.5, sx, sy)} />
        <line className="math-highlight" x1={sx(1)} y1={sy(1)} x2={sx(1 + h)} y2={sy((1 + h) ** 2)} />
        <circle cx={sx(1)} cy={sy(1)} r="5" /><circle cx={sx(1 + h)} cy={sy((1 + h) ** 2)} r="5" />
        <text x="530" y="298">t</text><text x="10" y="30">f(t)</text><text x="223" y="266">t = 1</text>
      </svg>
      <p className="math-readout" aria-live="polite">Secant slope: {fmt(slope)} · Tangent slope: 2 · Difference: {fmt(slope - 2)}</p>
      {explanation("Expanding $(1+h)^2$ gives $1+2h+h^2$, so the secant slope is $(2h+h^2)/h=2+h$ for nonzero $h$. Its difference from 2 is exactly $h$. A limit asks what value these slopes approach; it does not ask us to divide by zero. The picture compares vertical and horizontal changes, so the axes do not need identical scales.")}
    </>;
  }
  if (topicId === "integrals") {
    const n = value, width = 2 / n, bounds = squareIntegralBounds(n);
    const sx = (x: number) => 55 + 230 * x, sy = (y: number) => 275 - 60 * y;
    return <>
      <h3>Trap an area between two estimates</h3>
      <MathText>{"For $f(x)=x^2$ on $[0,2]$, a left-endpoint rectangle lies below the graph and a right-endpoint rectangle lies above it. Predict what happens to the gap between the estimates when you double the number of intervals."}</MathText>
      {range("Number of intervals", 2, 40, 1, String(n))}
      <svg viewBox="0 0 600 310" role="img" aria-label={`${n} lower and upper rectangles enclosing the area under x squared from zero to two`}>
        {Array.from({length:n}, (_, i) => <g key={i}>
          <rect className="math-upper" x={sx(i * width)} y={sy(((i + 1) * width) ** 2)} width={230 * width} height={275 - sy(((i + 1) * width) ** 2)} />
          <rect className="math-lower" x={sx(i * width)} y={sy((i * width) ** 2)} width={230 * width} height={275 - sy((i * width) ** 2)} />
        </g>)}
        {axes(55, 275)}<path className="math-curve" d={curve(x => x * x, 0, 2, sx, sy)} />
        <text x="48" y="298">0</text><text x="510" y="298">2</text><text x="550" y="298">x</text>
      </svg>
      <p className="math-readout" aria-live="polite">Lower: {fmt(bounds.lower)} · Exact area: {fmt(bounds.exact)} · Upper: {fmt(bounds.upper)} · Gap: {fmt(bounds.upper - bounds.lower)}</p>
      <p>Filled rectangles show the lower estimate; outlined rectangles show the upper estimate.</p>
      {explanation("The function increases on this interval, so every rectangle estimate has a known direction of error. When we subtract the left sum from the right sum, all interior sampled heights cancel. The gap is $\\Delta x[f(2)-f(0)]=(2/n)4=8/n$. Doubling $n$ halves that gap. Both estimates approach $\\int_0^2x^2\\,dx=8/3$, enclosing rather than guessing the answer.")}
    </>;
  }
  if (topicId === "eigenvectors") {
    const v = symmetricMap(value), sx = (x: number) => 300 + 60 * x, sy = (y: number) => 155 - 60 * y;
    return <>
      <h3>Find a direction that the map does not turn</h3>
      <MathText>{"The matrix is $A=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$. Rotate a unit input vector. Can you find both directions where the output lies on the same line as the input? Then compare their stretch factors."}</MathText>
      {range("Direction angle", 0, 180, 1, `${value}°`)}
      <svg viewBox="0 0 600 310" role="img" aria-label={`Unit input at ${value} degrees and its transformed vector; signed perpendicular component ${fmt(v.across)}`}>
        {axes(300, 155)}
        <circle className="math-unit-circle" cx="300" cy="155" r="60" />
        <line className="math-comparison" x1="300" y1="155" x2={sx(v.ax)} y2={sy(v.ay)} />
        <line className="math-highlight" x1="300" y1="155" x2={sx(v.x)} y2={sy(v.y)} />
        <circle cx={sx(v.x)} cy={sy(v.y)} r="5" /><circle cx={sx(v.ax)} cy={sy(v.ay)} r="5" />
        <text x="45" y="285">Solid: input v · Dashed: output Av</text>
      </svg>
      <p className="math-readout" aria-live="polite">Output along v: {fmt(v.along)} · Signed perpendicular component: {fmt(v.across)}{Math.abs(v.across) < .00001 ? " · Eigenvector found" : ""}</p>
      {explanation("At 45°, the input is proportional to $(1,1)$ and the output is three times that vector. At 135°, it is proportional to $(-1,1)$ and the output equals the input. Those are eigenvectors with eigenvalues 3 and 1. At other angles the output has a perpendicular component, so it cannot be written as a scalar times the input. The displayed 'along' component is only an eigenvalue when that perpendicular component is zero.")}
    </>;
  }
  if (topicId === "fourier") {
    const sx = (x: number) => 300 + 78 * x, sy = (y: number) => 155 - 85 * y;
    return <>
      <h3>Build a square wave from smooth oscillations</h3>
      <MathText>{"Add the first N odd sine modes of the square wave: $S_N(x)=\\frac4\\pi\\sum_{j=0}^{N-1}\\frac{\\sin((2j+1)x)}{2j+1}$. Predict whether more terms remove the overshoot near a jump."}</MathText>
      {range("Number of odd modes", 1, 12, 1, String(value))}
      <svg viewBox="0 0 600 310" role="img" aria-label={`Square wave compared with a sum of ${value} odd sine modes`}>
        {axes(300, 155)}
        <path className="math-comparison" d={`M${sx(-Math.PI)},${sy(-1)}H300 M300,${sy(1)}H${sx(Math.PI)}`} />
        <path className="math-curve" d={curve(x => squareWaveSum(x, value), -Math.PI, Math.PI, sx, sy)} />
        <text x="45" y="290">−π</text><text x="290" y="290">0</text><text x="542" y="290">π</text>
      </svg>
      <p className="math-readout" aria-live="polite">Value at the jump x = 0: {fmt(squareWaveSum(0, value))} · Target values on either side: −1 and +1</p>
      {explanation("Every sine term vanishes at zero, so every partial sum gives zero there: the midpoint of the jump. More modes make the transition region narrower and improve the approximation away from the jump. The peak overshoot does not disappear in the limit; it concentrates into a narrower region (the Gibbs phenomenon). A statement that a Fourier series 'equals the function' needs a precise meaning and conditions, especially at discontinuities.")}
    </>;
  }
  const event = boostEvent(2, 1, value), euclidean = event.ct ** 2 + event.x ** 2;
  return <>
    <h3>Change coordinates while preserving the interval</h3>
    <MathText>{"Start with an event at $ct=2$ and $x=1$, both in metres. Change the relative frame velocity $\\beta=v/c$. Predict which quantity stays fixed: the ordinary sum of squares, or the spacetime interval $-(ct)^2+x^2$. This is a coordinate comparison, not motion of the event."}</MathText>
    {range("Relative velocity v/c", -.8, .8, .05, value.toFixed(2))}
    <svg viewBox="0 0 600 310" role="img" aria-label={`Event coordinates ct prime ${fmt(event.ct)}, x prime ${fmt(event.x)} with invariant interval minus three square metres`}>
      {axes(300, 275)}
      <path className="math-comparison" d={curve(x => Math.sqrt(x * x + 3), -4.4, 4.4, x => 300 + 45 * x, t => 275 - 45 * t)} />
      <circle cx={300 + 45 * event.x} cy={275 - 45 * event.ct} r="7" />
      <text x="515" y="296">x′ (m)</text><text x="310" y="22">ct′ (m)</text><text x="40" y="30">Same interval, different coordinates</text>
    </svg>
    <p className="math-readout" aria-live="polite">ct′ = {fmt(event.ct)} m · x′ = {fmt(event.x)} m · Interval = {fmt(event.interval)} m² · Sum of squares = {fmt(euclidean)} m²</p>
    {explanation("The Lorentz transformation is $ct'=\\gamma(ct-\\beta x)$ and $x'=\\gamma(x-\\beta ct)$ with $\\gamma=1/\\sqrt{1-\\beta^2}$. Subtracting the squares cancels the cross terms and leaves $\\gamma^2(1-\\beta^2)[-(ct)^2+x^2]=-3$. Adding the squares has no such cancellation. Preserving a geometry means preserving its specified metric, which need not be an ordinary Euclidean sum of squares.")}
  </>;
}
