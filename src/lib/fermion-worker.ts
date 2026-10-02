/// <reference lib="webworker" />
import { createState, entropy, occupations, step, type SimState } from './fermion-sim';

let state: SimState | null = null;
let running = false;
let timer: ReturnType<typeof setTimeout> | undefined;
let avg: Float64Array | null = null;
let avgCount = 0;
let sinceChange = 0;
let batches = 0;

const STEPS_PER_BATCH = 5; // dt = 0.02 → 0.1 time units per batch
const RELAX = 4; // time units before averaging starts after a change

const rng = () => {
  const b = new Uint32Array(1);
  crypto.getRandomValues(b);
  return (b[0] + 0.5) / 4294967296;
};

function profile(s: SimState) {
  const half = s.L / 2;
  const out = new Float64Array(half);
  for (let ell = 1; ell <= half; ell++) out[ell - 1] = entropy(s, ell);
  return out;
}

function loop() {
  if (!running || !state) return;
  for (let i = 0; i < STEPS_PER_BATCH; i++) step(state, rng);
  sinceChange += STEPS_PER_BATCH * state.dt;
  batches++;
  const msg: Record<string, unknown> = { t: state.t, n: occupations(state) };
  if (batches % 4 === 0) {
    const p = profile(state);
    if (sinceChange > RELAX) {
      if (!avg) avg = new Float64Array(p.length);
      for (let i = 0; i < p.length; i++) avg[i] += p[i];
      avgCount++;
    }
    msg.half = p[p.length - 1];
    msg.profile = p;
    if (avg && avgCount) msg.avg = avg.map((v) => v / avgCount);
    msg.avgCount = avgCount;
  }
  postMessage(msg);
  timer = setTimeout(loop, 0);
}

function resetAverage() {
  avg = null;
  avgCount = 0;
  sinceChange = 0;
}

onmessage = (e: MessageEvent) => {
  const { cmd, L, gamma } = e.data;
  if (cmd === 'reset') {
    state = createState(L, gamma);
    resetAverage();
    postMessage({ t: 0, n: occupations(state), half: 0, reset: true });
  } else if (cmd === 'gamma' && state) {
    state.gamma = gamma;
    resetAverage();
  } else if (cmd === 'run') {
    if (!state) state = createState(L, gamma);
    if (!running) {
      running = true;
      loop();
    }
  } else if (cmd === 'pause') {
    running = false;
    clearTimeout(timer);
  }
};
