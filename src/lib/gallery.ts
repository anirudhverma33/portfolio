import type { ImageMetadata } from 'astro';
import mhvTree from '../assets/figures/mhv-tree.png';
import mhvWalk from '../assets/figures/mhv-walk.png';
import mhvTerminal from '../assets/figures/mhv-terminal.png';
import mhvFive from '../assets/figures/mhv-five.png';
import prCnot from '../assets/figures/pr-cnot.png';
import prOracle from '../assets/figures/pr-oracle.png';
import prChsh from '../assets/figures/pr-chsh.png';
import prSetup from '../assets/figures/pr-setup.png';
import fqSetup from '../assets/figures/fq-setup.png';
import fqNist from '../assets/figures/fq-nist.png';
import fqEncrypt from '../assets/figures/fq-encrypt.png';
import fqBitrate from '../assets/figures/fq-bitrate.png';
import bsSetup from '../assets/figures/bs-setup.png';
import bsCones from '../assets/figures/bs-cones.png';
import bsDepol from '../assets/figures/bs-depolarisation.png';
import msEntropy from '../assets/figures/ms-entropy-l800.png';
import msCorrMatrix from '../assets/figures/ms-corr-matrix.png';
import msCorrGamma from '../assets/figures/ms-corr-gamma.png';

export interface GalleryFigure {
  src: ImageMetadata;
  alt: string;
  /** Citation for the figure, as used on the case-study page. */
  source: string;
}

const MHV = 'Verma & Chandrashekar, arXiv:2607.02456.';
const PR = 'Shukla et al., arXiv:2509.26271.';
const FQ = 'Kolangatt et al., Phys. Rev. A 110, 032615 (2024).';
const BS = 'Verma, BS thesis, IISc (2024).';
const MS = 'Verma, MS thesis, IISc (2025).';

// Figures per project, keyed by project slug. Alt text matches the case-study pages.
// The first three of each list are the ones shown on the homepage project card.
export const figuresByProject: Record<string, GalleryFigure[]> = {
  'mhv-quantum-walks': [
    { src: mhvTree, alt: 'Directed permutation tree rooted at (1), branching to the six orderings of gluons 2, 3 and 4.', source: MHV },
    { src: mhvTerminal, alt: 'Bar chart of occupation probabilities across the six terminal permutation sectors.', source: MHV },
    { src: mhvFive, alt: 'Radial permutation graph for five gluons with 24 labelled terminal orderings.', source: MHV },
    { src: mhvWalk, alt: 'Four bar charts of walker probability over tree nodes at steps t = 0 to 3.', source: MHV },
  ],
  'pr-box-simulation': [
    { src: prCnot, alt: 'Two circuit diagrams of a CNOT gate between Alice and Bob, with inputs |c⟩ and |+⟩.', source: PR },
    { src: prOracle, alt: 'Four-qubit oracle circuit and its classical analogue.', source: PR },
    { src: prSetup, alt: 'Optical layout with entangled-photon source, the black-box circuit simulating the PR correlation, and measurement units.', source: PR },
    { src: prChsh, alt: 'Three panels: CHSH values by measurement basis, CHSH against basis angle with theory curve, and simulated values for an unentangled state.', source: PR },
  ],
  'four-qubit-qrng': [
    { src: fqNist, alt: 'Bar chart of p-values for 15 NIST tests for strings XA, XB and XC, all above the 0.01 threshold.', source: FQ },
    { src: fqEncrypt, alt: 'Two images shown original, encrypted by Alice as noise, and decrypted by Bob.', source: FQ },
    { src: fqSetup, alt: "Optical layout: 405 nm laser, PPKTP crystal, source characterisation insets, and Alice's and Bob's measurement units.", source: FQ },
    { src: fqBitrate, alt: 'Two plots of CHSH value and bit rate against visibility and against half-wave-plate angle, experiment and theory.', source: FQ },
  ],
  'entangled-photon-source': [
    { src: bsCones, alt: 'EMCCD images of SPDC light cones for horizontal, vertical and both polarizations.', source: BS },
    { src: bsDepol, alt: 'Line plot of S value falling from about 2.7 towards zero as the half-wave-plate angle increases to about 24 degrees.', source: BS },
    { src: bsSetup, alt: 'Schematic of the polarization-entangled photon setup with pump, crystal and two detection arms.', source: BS },
  ],
  'monitored-fermions': [
    { src: msCorrGamma, alt: 'Two curves of averaged correlation against time difference for gamma = 0.2.', source: MS },
    { src: msCorrMatrix, alt: 'Heat map of the two-time correlation matrix with a bright diagonal and oscillating off-diagonal stripes.', source: MS },
    { src: msEntropy, alt: 'Entanglement entropy against log of chord length for many measurement strengths; curves flatten as gamma increases.', source: MS },
  ],
};
