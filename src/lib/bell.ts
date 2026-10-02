import table from '../data/bs-thesis-table-5-1.json';

// Polarizer angles follow the thesis labels E(a, b). A half-wave plate at θ sets 2θ,
// so HWP1 157.5° ↔ −45°, 22.5° ↔ +45°, 45° ↔ 90°, 0° ↔ 0°; HWP2 168.75° ↔ −22.5°, etc.
export interface Setting {
  label: string;
  a: number;
  b: number;
  /** Row indices into Table 5.1: [N(a,b), N(a⊥,b⊥)] count positively, [N(a,b⊥), N(a⊥,b)] negatively. */
  plus: [number, number];
  minus: [number, number];
  sign: 1 | -1;
}

export const rows = table.rows.map(([hwp1, hwp2, , counts]) => ({ hwp1, hwp2, counts }));

export const settings: Setting[] = [
  { label: 'E(−45°, −22.5°)', a: -45, b: -22.5, plus: [0, 10], minus: [2, 8], sign: 1 },
  { label: 'E(−45°, 22.5°)', a: -45, b: 22.5, plus: [1, 11], minus: [3, 9], sign: -1 },
  { label: 'E(90°, −22.5°)', a: 90, b: -22.5, plus: [12, 6], minus: [4, 14], sign: 1 },
  { label: 'E(90°, 22.5°)', a: 90, b: 22.5, plus: [13, 7], minus: [5, 15], sign: 1 },
];

export function correlation(s: Setting): number {
  const n = (i: number) => rows[i].counts;
  const p = n(s.plus[0]) + n(s.plus[1]);
  const m = n(s.minus[0]) + n(s.minus[1]);
  return (p - m) / (p + m);
}

/** S = |E(a,b) − E(a,b′) + E(a′,b) + E(a′,b′)|, the sign convention that reproduces the thesis value. */
export function chsh(): number {
  return Math.abs(settings.reduce((acc, s) => acc + s.sign * correlation(s), 0));
}

export const reported = table.reported;
