import { describe, expect, it } from 'vitest';
import { chsh, correlation, reported, settings } from '../src/lib/bell';
import { buildTree, terminalCount } from '../src/lib/perm-tree';
import fringe from '../src/data/bs-thesis-table-5-2.json';
import rho from '../src/data/bs-thesis-table-5-5.json';
import { claims } from '../src/lib/claims';
import { publications } from '../src/lib/publications';

describe('BS thesis Table 5.1 transcription', () => {
  it('reproduces every reported correlation E', () => {
    const values = Object.entries(reported).filter(([k]) => k !== 'S');
    settings.forEach((s, i) => expect(correlation(s)).toBeCloseTo(values[i][1] as number, 7));
  });
  it('reproduces the reported S = 2.729230425', () => {
    expect(chsh()).toBeCloseTo(reported.S, 8);
  });
});

describe('BS thesis Table 5.2 transcription', () => {
  it('has 25 angles and four bases', () => {
    expect(fringe.angles).toHaveLength(25);
    for (const s of fringe.series) expect(s.counts).toHaveLength(25);
  });
});

describe('BS thesis Table 5.5 density matrix', () => {
  it('is Hermitian with unit trace', () => {
    const r = rho.rho;
    let tr = 0;
    for (let i = 0; i < 4; i++) {
      tr += r[i][i][0];
      for (let j = 0; j < 4; j++) {
        expect(r[i][j][0]).toBeCloseTo(r[j][i][0], 10);
        expect(r[i][j][1]).toBeCloseTo(-r[j][i][1], 10);
      }
    }
    expect(tr).toBeCloseTo(1, 3);
  });
});

describe('Permutation tree, arXiv:2607.02456 Table VI', () => {
  const table = { 4: [16, 48], 5: [65, 260], 6: [326, 1630] } as const;
  for (const [n, [g, D]] of Object.entries(table)) {
    it(`n = ${n}: g(n) = ${g}, D(n) = ${D}, ${terminalCount(+n)} terminal sectors`, () => {
      const nodes = buildTree(+n);
      expect(nodes).toHaveLength(g);
      expect((+n - 1) * nodes.length).toBe(D);
      expect(nodes.filter((d) => d.children.length === 0)).toHaveLength(terminalCount(+n));
    });
  }
  it('matches the four-gluon leaves of Fig. 1, left to right', () => {
    const leaves = buildTree(4).filter((d) => d.children.length === 0).map((d) => d.seq.join(','));
    expect(leaves).toEqual(['1,4,3,2', '1,4,2,3', '1,3,4,2', '1,3,2,4', '1,2,4,3', '1,2,3,4']);
  });
});

describe('Content integrity', () => {
  it('every claim has a source and an exact quote', () => {
    for (const c of claims) {
      expect(c.source.length).toBeGreaterThan(5);
      expect(c.quote.length).toBeGreaterThan(0);
    }
  });
  it('every publication has a status date', () => {
    for (const p of publications) expect(p.statusAsOf).toBeTruthy();
  });
});
