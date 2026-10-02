// Permutation tree of arXiv:2607.02456, Fig. 1: nodes are partial orderings (1, a2, …, am);
// each edge appends one remaining gluon. Leaves are the (n − 1)! color orderings.

export interface TreeNode {
  id: number;
  seq: number[];
  depth: number;
  parent: number | null;
  children: number[];
  x: number;
  y: number;
}

export function buildTree(n: number): TreeNode[] {
  const nodes: TreeNode[] = [];
  const add = (seq: number[], parent: number | null): number => {
    const id = nodes.length;
    nodes.push({ id, seq, depth: seq.length - 1, parent, children: [], x: 0, y: 0 });
    // Descending order of appended gluon matches the left-to-right order of Fig. 1.
    for (let g = n; g >= 2; g--) {
      if (!seq.includes(g)) nodes[id].children.push(add([...seq, g], id));
    }
    return id;
  };
  add([1], null);
  return nodes;
}

/** Radial layout: leaves evenly spaced on the outer ring, parents at the mean angle of their leaves. */
export function layoutRadial(nodes: TreeNode[], radius: number): TreeNode[] {
  const maxDepth = Math.max(...nodes.map((d) => d.depth));
  const leaves = nodes.filter((d) => d.children.length === 0);
  const angle = new Map<number, number>();
  const span = Math.PI * 2;
  leaves.forEach((leaf, i) => angle.set(leaf.id, (i / leaves.length) * span - Math.PI / 2));
  const resolve = (id: number): number => {
    if (angle.has(id)) return angle.get(id)!;
    const kids = nodes[id].children.map(resolve);
    const a = Math.atan2(
      kids.reduce((s, k) => s + Math.sin(k), 0),
      kids.reduce((s, k) => s + Math.cos(k), 0),
    );
    angle.set(id, a);
    return a;
  };
  resolve(0);
  for (const d of nodes) {
    const r = (d.depth / maxDepth) * radius;
    const a = angle.get(d.id)!;
    d.x = r * Math.cos(a);
    d.y = r * Math.sin(a);
  }
  return nodes;
}

export const terminalCount = (n: number) => {
  let f = 1;
  for (let k = 2; k < n; k++) f *= k;
  return f;
};

/** Parke–Taylor denominator ⟨σ1σ2⟩⟨σ2σ3⟩…⟨σnσ1⟩ for a color ordering σ. */
export function parkeTaylorDenominator(seq: number[]): string {
  return seq.map((a, i) => `⟨${a}${seq[(i + 1) % seq.length]}⟩`).join('');
}
