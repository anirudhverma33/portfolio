import { useEffect, useRef, useState } from 'react';
import type { Img } from './types';

/** Two rows of figure tiles that slide in opposite directions as the page scrolls. */
export default function MarqueeSection({ images, href }: { images: (Img & { href: string })[]; href?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - top + window.innerHeight) * 0.3);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const half = Math.ceil(images.length / 2);
  const rows = [images.slice(0, half), images.slice(half)];

  return (
    <section ref={ref} aria-label="Figures from my papers and theses" className="bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        {rows.map((row, r) => {
          const x = r === 0 ? offset - 200 : -(offset - 200);
          const tripled = [...row, ...row, ...row];
          return (
            <div key={r} className="flex w-max gap-3" style={{ transform: `translateX(${x}px)`, willChange: 'transform', marginLeft: r === 0 ? '-60%' : '-40%' }}>
              {tripled.map((img, i) => {
                const copy = i >= row.length;
                return (
                  <a
                    key={i}
                    href={img.href}
                    tabIndex={copy ? -1 : undefined}
                    aria-hidden={copy ? true : undefined}
                    className="block h-[200px] w-[310px] shrink-0 overflow-hidden rounded-2xl bg-white p-3 sm:h-[270px] sm:w-[420px]"
                  >
                    <img
                      src={img.src}
                      srcSet={img.srcSet}
                      sizes="420px"
                      width={img.width}
                      height={img.height}
                      alt={copy ? '' : img.alt}
                      loading="lazy"
                      decoding="async"
                      className="block h-full w-full rounded-lg object-contain"
                    />
                  </a>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
