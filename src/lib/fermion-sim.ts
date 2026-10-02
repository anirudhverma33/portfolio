// Illustrative quantum-trajectory simulation of a free-fermion chain under continuous
// monitoring of every site occupation. The Gaussian state is an L×N matrix U of
// orthonormal orbitals. One step of length dt applies
//   U ← exp{Σ_l [δW_l + (2⟨n_l⟩ − 1) γ dt] n_l} · e^{−iH dt} U,   δW_l ~ N(0, γ dt),
// then re-orthonormalises (the standard Gaussian-state update for this stochastic
// Schrödinger equation). H = −Σ_j (c†_j c_{j+1} + h.c.), periodic boundaries.
// This is a browser re-implementation for illustration; it is not the thesis code or data.

export type Rng = () => number;

export interface SimState {
  L: number;
  N: number;
  gamma: number;
  dt: number;
  t: number;
  re: Float64Array; // U, row-major L×N
  im: Float64Array;
}

let propCache: { L: number; dt: number; re: Float64Array; im: Float64Array } | null = null;

function propagator(L: number, dt: number) {
  if (propCache && propCache.L === L && propCache.dt === dt) return propCache;
  const re = new Float64Array(L * L);
  const im = new Float64Array(L * L);
  for (let j = 0; j < L; j++) {
    for (let l = 0; l < L; l++) {
      let sr = 0;
      let si = 0;
      for (let q = 0; q < L; q++) {
        const k = (2 * Math.PI * q) / L;
        const phase = k * (j - l) + 2 * Math.cos(k) * dt; // e^{ik(j−l)} e^{−iε_k dt}, ε_k = −2 cos k
        sr += Math.cos(phase);
        si += Math.sin(phase);
      }
      re[j * L + l] = sr / L;
      im[j * L + l] = si / L;
    }
  }
  propCache = { L, dt, re, im };
  return propCache;
}

/** Néel initial state: one particle on every even site. */
export function createState(L: number, gamma: number, dt = 0.02): SimState {
  const N = L / 2;
  const re = new Float64Array(L * N);
  const im = new Float64Array(L * N);
  for (let m = 0; m < N; m++) re[2 * m * N + m] = 1;
  return { L, N, gamma, dt, t: 0, re, im };
}

export function gaussian(rng: Rng): number {
  let u = 0;
  while (u === 0) u = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng());
}

export function occupations(s: SimState): Float64Array {
  const { L, N, re, im } = s;
  const n = new Float64Array(L);
  for (let i = 0; i < L; i++) {
    let acc = 0;
    for (let m = 0; m < N; m++) acc += re[i * N + m] ** 2 + im[i * N + m] ** 2;
    n[i] = acc;
  }
  return n;
}

function orthonormalise(s: SimState) {
  const { L, N, re, im } = s;
  for (let m = 0; m < N; m++) {
    for (let p = 0; p < m; p++) {
      // ⟨u_p | u_m⟩
      let dr = 0;
      let di = 0;
      for (let i = 0; i < L; i++) {
        const ar = re[i * N + p], ai = im[i * N + p], br = re[i * N + m], bi = im[i * N + m];
        dr += ar * br + ai * bi;
        di += ar * bi - ai * br;
      }
      for (let i = 0; i < L; i++) {
        const ar = re[i * N + p], ai = im[i * N + p];
        re[i * N + m] -= dr * ar - di * ai;
        im[i * N + m] -= dr * ai + di * ar;
      }
    }
    let norm = 0;
    for (let i = 0; i < L; i++) norm += re[i * N + m] ** 2 + im[i * N + m] ** 2;
    norm = Math.sqrt(norm);
    for (let i = 0; i < L; i++) {
      re[i * N + m] /= norm;
      im[i * N + m] /= norm;
    }
  }
}

export function step(s: SimState, rng: Rng) {
  const { L, N, gamma, dt } = s;
  const P = propagator(L, dt);
  const nr = new Float64Array(L * N);
  const ni = new Float64Array(L * N);
  for (let j = 0; j < L; j++) {
    for (let l = 0; l < L; l++) {
      const pr = P.re[j * L + l], pi = P.im[j * L + l];
      if (pr === 0 && pi === 0) continue;
      for (let m = 0; m < N; m++) {
        const ur = s.re[l * N + m], ui = s.im[l * N + m];
        nr[j * N + m] += pr * ur - pi * ui;
        ni[j * N + m] += pr * ui + pi * ur;
      }
    }
  }
  s.re = nr;
  s.im = ni;
  if (gamma > 0) {
    const n = occupations(s);
    const sd = Math.sqrt(gamma * dt);
    for (let i = 0; i < L; i++) {
      const f = Math.exp(sd * gaussian(rng) + (2 * n[i] - 1) * gamma * dt);
      for (let m = 0; m < N; m++) {
        s.re[i * N + m] *= f;
        s.im[i * N + m] *= f;
      }
    }
  }
  orthonormalise(s);
  s.t += dt;
}

/** Eigenvalues of a real symmetric matrix (row-major, size n) by cyclic Jacobi rotations. */
export function symmetricEigenvalues(a: Float64Array, n: number): Float64Array {
  const A = Float64Array.from(a);
  for (let sweep = 0; sweep < 60; sweep++) {
    let off = 0;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += A[p * n + q] ** 2;
    if (off < 1e-22) break;
    for (let p = 0; p < n; p++) {
      for (let q = p + 1; q < n; q++) {
        const apq = A[p * n + q];
        if (Math.abs(apq) < 1e-300) continue;
        const theta = (A[q * n + q] - A[p * n + p]) / (2 * apq);
        const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
        const c = 1 / Math.sqrt(t * t + 1);
        const sn = t * c;
        for (let k = 0; k < n; k++) {
          const akp = A[k * n + p], akq = A[k * n + q];
          A[k * n + p] = c * akp - sn * akq;
          A[k * n + q] = sn * akp + c * akq;
        }
        for (let k = 0; k < n; k++) {
          const apk = A[p * n + k], aqk = A[q * n + k];
          A[p * n + k] = c * apk - sn * aqk;
          A[q * n + k] = sn * apk + c * aqk;
        }
      }
    }
  }
  const ev = new Float64Array(n);
  for (let i = 0; i < n; i++) ev[i] = A[i * n + i];
  return ev;
}

/** Entanglement entropy of the first ℓ sites, from the correlation matrix C = U U†. */
export function entropy(s: SimState, ell: number): number {
  const { N, re, im } = s;
  // Embed Hermitian C_A = X + iY as the real symmetric [[X, −Y], [Y, X]]; each eigenvalue appears twice.
  const n = 2 * ell;
  const M = new Float64Array(n * n);
  for (let i = 0; i < ell; i++) {
    for (let j = 0; j < ell; j++) {
      let xr = 0;
      let xi = 0;
      for (let m = 0; m < N; m++) {
        const ar = re[i * N + m], ai = im[i * N + m], br = re[j * N + m], bi = im[j * N + m];
        xr += ar * br + ai * bi;
        xi += ai * br - ar * bi;
      }
      M[i * n + j] = xr;
      M[(i + ell) * n + (j + ell)] = xr;
      M[i * n + (j + ell)] = -xi;
      M[(i + ell) * n + j] = xi;
    }
  }
  const ev = symmetricEigenvalues(M, n);
  let S = 0;
  for (const raw of ev) {
    const l = Math.min(Math.max(raw, 0), 1);
    if (l > 1e-12 && l < 1 - 1e-12) S -= l * Math.log(l) + (1 - l) * Math.log(1 - l);
  }
  return S / 2;
}

/** Small deterministic generator for reproducible tests. */
export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
