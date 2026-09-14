// Shared two-body constants and closed-form relations used across topics and practice templates.
export const mu = 398600.4418;
export const earthRadius = 6378;
export const circ = (r: number) => Math.sqrt(mu / r);
export const speed = (r: number, a: number) => Math.sqrt(mu * (2 / r - 1 / a));
export const period = (a: number) => 2 * Math.PI * Math.sqrt(a ** 3 / mu);
export const transfer = (r1: number, r2: number) => {
  const a = (r1 + r2) / 2;
  return {
    a,
    d1: speed(r1, a) - circ(r1),
    d2: circ(r2) - speed(r2, a),
    time: period(a) / 2,
  };
};
export const leo = transfer(6678, 42164);
export const practiceTransfer = transfer(7000, 14000);
