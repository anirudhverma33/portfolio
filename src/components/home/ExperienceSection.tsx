import FadeIn from './FadeIn';
import type { ExperienceItem } from './types';

export default function ExperienceSection({ items }: { items: ExperienceItem[] }) {
  return (
    <section
      id="experience"
      aria-labelledby="exp-h"
      className="rounded-t-[40px] bg-white px-5 pb-28 pt-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:pb-32 sm:pt-24 md:rounded-t-[60px] md:px-10 md:pb-40 md:pt-32"
    >
      <FadeIn
        as="h2"
        id="exp-h"
        y={40}
        className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Experience
      </FadeIn>
      <ol className="mx-auto max-w-5xl list-none">
        {items.map((e, i) => (
          <FadeIn
            as="li"
            key={e.period + e.role}
            delay={i * 0.1}
            className="flex items-start gap-5 py-8 sm:gap-10 sm:py-10 md:gap-14 md:py-12"
            style={{ borderTop: i ? '1px solid rgba(12, 12, 12, 0.15)' : undefined }}
          >
            <span aria-hidden="true" className="w-[1.25em] shrink-0 font-black leading-[0.85]" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-2 pt-1 sm:pt-3">
              <p className="text-xs font-medium uppercase tracking-widest opacity-60 sm:text-sm">{e.period}</p>
              <h3 className="font-medium uppercase leading-tight" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                {e.role}
                <span className="font-light normal-case opacity-70"> · {e.place}</span>
              </h3>
              <p className="max-w-2xl font-light leading-relaxed opacity-60" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>
                {e.detail} With {e.with}.
              </p>
            </div>
          </FadeIn>
        ))}
      </ol>
    </section>
  );
}
