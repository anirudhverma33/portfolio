// Decorative line drawings for the About section: a Bloch sphere, SPDC cones,
// a beam-splitter cube and a wave packet. Purely ornamental, hidden from assistive tech.

const Grad = ({ id }: { id: string }) => (
  <defs>
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#BBCCD7" />
      <stop offset="100%" stopColor="#646973" />
    </linearGradient>
    <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#B600A8" />
      <stop offset="60%" stopColor="#7621B0" />
      <stop offset="100%" stopColor="#BE4C00" />
    </linearGradient>
  </defs>
);

export function BlochSphere({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      <Grad id="g-bloch" />
      <circle cx="100" cy="100" r="78" stroke="url(#g-bloch)" strokeWidth="3" />
      <ellipse cx="100" cy="100" rx="78" ry="24" stroke="url(#g-bloch)" strokeWidth="2" strokeDasharray="5 6" />
      <ellipse cx="100" cy="100" rx="24" ry="78" stroke="url(#g-bloch)" strokeWidth="1.5" opacity="0.5" />
      <line x1="100" y1="12" x2="100" y2="188" stroke="#646973" strokeWidth="1.5" />
      <line x1="100" y1="100" x2="150" y2="48" stroke="url(#g-bloch-a)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="150" cy="48" r="9" fill="url(#g-bloch-a)" />
      <circle cx="100" cy="100" r="4" fill="#BBCCD7" />
    </svg>
  );
}

export function SpdcCones({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      <Grad id="g-cones" />
      <circle cx="78" cy="100" r="58" stroke="url(#g-cones)" strokeWidth="3" />
      <circle cx="122" cy="100" r="58" stroke="url(#g-cones-a)" strokeWidth="3" />
      <circle cx="100" cy="68" r="7" fill="url(#g-cones-a)" />
      <circle cx="100" cy="132" r="7" fill="#BBCCD7" />
    </svg>
  );
}

export function BeamSplitter({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      <Grad id="g-bs" />
      <path d="M60 70 L120 50 L160 80 L100 100 Z" stroke="url(#g-bs)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M60 70 L60 140 L100 170 L100 100" stroke="url(#g-bs)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M100 170 L160 150 L160 80" stroke="url(#g-bs)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M60 140 L160 80" stroke="url(#g-bs-a)" strokeWidth="2.5" opacity="0.9" />
      <path d="M8 112 L110 112" stroke="url(#g-bs-a)" strokeWidth="4" strokeLinecap="round" />
      <path d="M110 112 L192 112" stroke="#BBCCD7" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 8" />
      <path d="M110 112 L110 196" stroke="#B600A8" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 8" />
    </svg>
  );
}

function wave(n: number, carrier: boolean) {
  return Array.from({ length: n + 1 }, (_, i) => {
    const x = i / n;
    const env = Math.exp(-((x - 0.5) ** 2) / 0.03);
    const y = 100 - 70 * env * (carrier ? Math.cos(x * 40) : 1);
    return `${(10 + x * 180).toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

export function WavePacket({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      <Grad id="g-wave" />
      <polyline points={wave(60, false)} stroke="#646973" strokeWidth="1.5" strokeDasharray="4 5" />
      <polyline points={wave(120, true)} stroke="url(#g-wave-a)" strokeWidth="3.5" strokeLinejoin="round" />
      <line x1="10" y1="100" x2="190" y2="100" stroke="url(#g-wave)" strokeWidth="1.5" />
    </svg>
  );
}
