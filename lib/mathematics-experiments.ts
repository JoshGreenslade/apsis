/** Small, fixed mathematical examples used by the lesson explorations. */
export function squareSecant(x: number, h: number) {
  return ((x + h) ** 2 - x ** 2) / h;
}
export function squareIntegralBounds(n: number) {
  const width = 2 / n;
  return {
    lower: width ** 3 * ((n - 1) * n * (2 * n - 1)) / 6,
    upper: width ** 3 * (n * (n + 1) * (2 * n + 1)) / 6,
    exact: 8 / 3,
  };
}
export function symmetricMap(degrees: number) {
  const angle = degrees * Math.PI / 180;
  const x = Math.cos(angle), y = Math.sin(angle);
  const ax = 2 * x + y, ay = x + 2 * y;
  return { x, y, ax, ay, along: x * ax + y * ay, across: x * ay - y * ax };
}
export function squareWaveSum(x: number, terms: number) {
  let sum = 0;
  for (let j = 0; j < terms; j++) {
    const k = 2 * j + 1;
    sum += Math.sin(k * x) / k;
  }
  return 4 * sum / Math.PI;
}
export function boostEvent(ct: number, x: number, beta: number) {
  const gamma = 1 / Math.sqrt(1 - beta ** 2);
  const time = gamma * (ct - beta * x);
  const space = gamma * (x - beta * ct);
  return { ct: time, x: space, interval: -(time ** 2) + space ** 2 };
}
