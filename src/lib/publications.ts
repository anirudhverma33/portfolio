export type Method = 'experimental' | 'theory' | 'computational';

export interface Publication {
  id: string;
  year: number;
  title: string;
  authors: string[];
  venue: string;
  status: 'published' | 'under-review' | 'preprint';
  /** Date the status was last confirmed, and by what. */
  statusAsOf: string;
  doi?: string;
  arxiv?: string;
  method: Method;
  project?: string;
  abstract: string;
  bibtex: string;
}

export const ME = 'Anirudh Verma';

export const publications: Publication[] = [
  {
    id: 'mhv-quantum-walks',
    year: 2026,
    title: 'A quantum-walk representation of color-ordered MHV scattering amplitudes',
    authors: ['Anirudh Verma', 'C. M. Chandrashekar'],
    venue: 'Physical Review D',
    status: 'under-review',
    statusAsOf: 'September 2026 (CV)',
    arxiv: '2607.02456',
    method: 'theory',
    project: 'mhv-quantum-walks',
    abstract:
      'We introduce a graph-theoretic framework for representing color-ordered maximally helicity violating (MHV) scattering amplitudes in quantum chromodynamics using coined quantum walks on permutation trees. Each root-to-terminal path corresponds to a distinct color ordering of the external gluons, while local transition amplitudes are assigned according to the spinor-product structure of the Parke–Taylor amplitudes. The walk evolves in coherent superpositions over permutation sectors, giving a dynamical picture of the underlying combinatorics. A quantum-channel formulation based on Kraus operators is also introduced to describe sector-resolved contributions, while a weighted collection operator coherently combines the terminal sectors at a common reference node. A quantum Fourier transform on the coin space is then employed to combine the encoded contributions into the corresponding color-decomposed amplitude. Together, these constructions establish a unified graph-based framework connecting permutation trees, quantum walks, and open quantum systems providing a framework for quantum algorithms to simulate scattering processes in quantum field theory. As an example, numerical results for low-point gluon amplitudes demonstrate that the proposed representation faithfully captures the characteristic Parke–Taylor structure and is consistent with analytical results.',
    bibtex: `@misc{Verma2026MHV,
  author        = {Verma, Anirudh and Chandrashekar, C. M.},
  title         = {A Quantum-Walk Representation of Color-Ordered {MHV} Scattering Amplitudes},
  year          = {2026},
  eprint        = {2607.02456},
  archivePrefix = {arXiv},
  primaryClass  = {quant-ph}
}`,
  },
  {
    id: 'pr-box-simulation',
    year: 2025,
    title:
      'Photonic simulation of beyond-quantum nonlocal correlations (e.g. Popescu–Rohrlich box) with non-signaling quantum resources',
    authors: ['Kunal Shukla', 'Anirudh Verma', 'Kanad Sengupta', 'Sanchari Chakraborti', 'Manik Banik', 'C. M. Chandrashekar'],
    venue: 'npj Quantum Information',
    status: 'under-review',
    statusAsOf: 'September 2026 (CV)',
    arxiv: '2509.26271',
    method: 'experimental',
    project: 'pr-box-simulation',
    abstract:
      'Bell nonlocality exemplifies the most profound departure of quantum theory from classical realism. Yet, the extent of nonlocality in quantum theory is intrinsically bounded, falling short of the correlations permitted by the relativistic causality (the no-signaling) principle. A paradigmatic example is the Popescu–Rohrlich correlation: two distant parties sharing arbitrary entanglement cannot achieve this correlation, though it can be simulated with classical communication between them. Here we show how such post-quantum correlations can instead be simulated using intrinsically non-signaling physical resources, and implement the proposed scheme using a quantum circuit on a four-qubit photonic platform. Unlike the conventional approaches, our method exploits dynamical correlations between distinct physical systems, with intrinsic randomness suppressing any signaling capacity. This enables the realization of post-quantum correlations both with and without entanglement. We also analyze how the simulation scheme extends to beyond quantum nonlocal correlations in multipartite systems. Our experimental demonstration using a photonic system establishes a versatile framework for exploring post-quantum correlations in both foundational settings and as a resource for computation and security applications.',
    bibtex: `@misc{Shukla2025PR,
  author        = {Shukla, Kunal and Verma, Anirudh and Sengupta, Kanad and Chakraborti, Sanchari and Banik, Manik and Chandrashekar, C. M.},
  title         = {Photonic Simulation of Beyond-Quantum Nonlocal Correlations (e.g. {Popescu-Rohrlich} Box) with Non-Signaling Quantum Resources},
  year          = {2025},
  eprint        = {2509.26271},
  archivePrefix = {arXiv},
  primaryClass  = {quant-ph}
}`,
  },
  {
    id: 'four-qubit-qrng',
    year: 2024,
    title: 'Four-qubit photonic system for publicly verifiable quantum random numbers and generation of public and private key',
    authors: ['Mayalakshmi Kolangatt', 'Anirudh Verma', 'Sujai Matta', 'Kanad Sengupta', 'C. M. Chandrashekar'],
    venue: 'Physical Review A 110, 032615',
    status: 'published',
    statusAsOf: 'Published 16 September 2024',
    doi: '10.1103/PhysRevA.110.032615',
    method: 'experimental',
    project: 'four-qubit-qrng',
    abstract:
      'We theoretically propose and experimentally demonstrate the use of a configurable four-qubit photonic system to generate publicly verifiable quantum random numbers, to perform entanglement verification, and to generate a secure public and private key. Quantum circuits, to generate the desired four-qubit states and its experimental realization in the photonic architecture, are carried out using photon pairs entangled in polarization and path degrees of freedom. By performing measurements on the four-qubit system and accessing partial information of the four-qubit state for public verification, we generate publicly verified and purely secured random bits at the rate of 185 kbps from collective data of 370 kbps. When the system is used for generating public and private keys, an equal number of public and private keys are generated simultaneously. We also record about 97.9% of sampled bits from four-qubit states passing entanglement verification and demonstrate the use of public and private key generated for image encryption-decryption. The theoretical model of noise on the four-qubit state and its effect on the generation rate of verified and secured bits are in perfect agreement with the experimental results. This demonstrates the practical use of the small-scale multiqubit photonic system for quantum-safe applications by providing the option for real-time verification of the security feature of the quantum system.',
    bibtex: `@article{Kolangatt2024,
  author  = {Kolangatt, Mayalakshmi and Verma, Anirudh and Matta, Sujai and Sengupta, Kanad and Chandrashekar, C. M.},
  title   = {Four-qubit photonic system for publicly verifiable quantum random numbers and generation of public and private key},
  journal = {Phys. Rev. A},
  volume  = {110},
  pages   = {032615},
  year    = {2024},
  doi     = {10.1103/PhysRevA.110.032615}
}`,
  },
];

export const theses = [
  {
    id: 'ms-thesis',
    year: 2025,
    title: 'Response and correlations of weakly measured free fermions',
    detail: 'MS (Research) thesis, Department of Physics, IISc. Supervisor: Sumilan Banerjee.',
    project: 'monitored-fermions',
  },
  {
    id: 'bs-thesis',
    year: 2024,
    title: 'Entanglement certified quantum random number generation using polarisation entangled photons',
    detail: 'BS (Research) thesis, Department of Instrumentation and Applied Physics, IISc. Supervisor: C. M. Chandrashekar.',
    project: 'entangled-photon-source',
  },
];

export const talks = [
  { year: 2025, title: 'Presentation of published work on four-qubit systems', detail: 'Quantum India, Bengaluru' },
];

export function statusText(p: Publication): string {
  if (p.status === 'published') return 'Published';
  if (p.status === 'under-review') return `Under review, ${p.venue}`;
  return 'Preprint';
}

export function getPublication(id: string): Publication {
  const p = publications.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown publication ${id}`);
  return p;
}
