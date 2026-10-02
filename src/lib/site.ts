export const person = {
  name: 'Anirudh Verma',
  role: 'Project Assistant, Quantum Optics & Quantum Information Lab, Indian Institute of Science, Bengaluru',
  areas: [
    'Photonic quantum information',
    'Quantum foundations and nonlocality',
    'Quantum walks',
    'Open quantum many-body systems',
  ],
  email: 'anirudhverma@iisc.ac.in',
  emailAlt: 'anirudhverma33@gmail.com',
};

export const profiles = [
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=l3AJ6DEAAAAJ&hl=en' },
  { label: 'ORCID', href: 'https://orcid.org/0009-0007-6945-1909' },
  { label: 'GitHub', href: 'https://github.com/anirudhverma33' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anirudh33/' },
];

/** Prefix an internal path with the deploy base (GitHub Pages project sites live under /<repo>/). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
