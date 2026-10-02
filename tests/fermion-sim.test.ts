import { describe, expect, it } from 'vitest';
import { createState, entropy, mulberry32, occupations, step, symmetricEigenvalues } from '../src/lib/fermion-sim';

describe('Jacobi eigenvalues', () => {
  it('diagonalises a known 2×2 matrix', () => {
    const ev = Array.from(symmetricEigenvalues(new Float64Array([2, 1, 1, 2]), 2)).sort();
    expect(ev[0]).toBeCloseTo(1, 10);
    expect(ev[1]).toBeCloseTo(3, 10);
  });
});

describe('Monitored free-fermion trajectories', () => {
  it('starts as a product state with zero entanglement', () => {
    const s = createState(16, 0);
    expect(entropy(s, 8)).toBeCloseTo(0, 10);
  });

  it('conserves particle number with and without monitoring', () => {
    for (const gamma of [0, 1]) {
      const s = createState(16, gamma);
      const rng = mulberry32(7);
      for (let i = 0; i < 200; i++) step(s, rng);
      const total = occupations(s).reduce((a, b) => a + b, 0);
      expect(total).toBeCloseTo(8, 8);
    }
  });

  it('builds entanglement under unitary evolution', () => {
    const s = createState(16, 0);
    const rng = mulberry32(1);
    for (let i = 0; i < 250; i++) step(s, rng);
    expect(entropy(s, 8)).toBeGreaterThan(1);
  });

  it('strong monitoring keeps half-chain entanglement lower than weak monitoring', () => {
    const run = (gamma: number) => {
      const s = createState(24, gamma);
      const rng = mulberry32(3);
      let acc = 0;
      let count = 0;
      for (let i = 0; i < 1500; i++) {
        step(s, rng);
        if (i > 500 && i % 50 === 0) {
          acc += entropy(s, 12);
          count++;
        }
      }
      return acc / count;
    };
    expect(run(4)).toBeLessThan(run(0.1));
  });
});
