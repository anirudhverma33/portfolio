import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import FadeIn from './FadeIn';
import { GhostButton } from './Buttons';
import type { Img, ProjectData } from './types';

function Plate({ img, height, sizes }: { img: Img; height?: string; sizes: string }) {
  return (
    <div
      className="flex overflow-hidden rounded-[24px] bg-white p-2 sm:rounded-[36px] sm:p-4 md:rounded-[48px] md:p-6"
      style={{ height: height ?? '100%' }}
    >
      <img
        src={img.src}
        srcSet={img.srcSet}
        sizes={sizes}
        width={img.width}
        height={img.height}
        alt={img.alt}
        loading="lazy"
        decoding="async"
        className="block h-full w-full object-contain"
      />
    </div>
  );
}

function Card({ p, index, total, progress }: { p: ProjectData; index: number; total: number; progress: MotionValue<number> }) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const [a, b, c] = p.images;
  return (
    <div className="sticky top-24 flex h-[85vh] items-start justify-center md:top-32">
      <motion.article
        style={{ scale, top: `${index * 28}px`, transformOrigin: 'top center' }}
        className="relative w-full max-w-6xl rounded-[40px] border-2 border-solid border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-3 px-2 sm:mb-6 md:px-4">
          <span aria-hidden="true" className="hero-heading font-black leading-[0.85]" style={{ fontSize: 'clamp(3rem, 8vw, 110px)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex min-w-0 flex-1 basis-[240px] flex-col gap-1">
            <p className="text-xs font-light uppercase tracking-widest text-[#8E9AA3] sm:text-sm">{p.category}</p>
            <h3 className="font-medium uppercase leading-tight text-[#D7E2EA]" style={{ fontSize: 'clamp(1rem, 2vw, 1.75rem)' }}>
              {p.title}
            </h3>
            <p className="hidden max-w-3xl text-sm font-light leading-relaxed text-[#D7E2EA]/70 lg:block">{p.summary}</p>
          </div>
          <GhostButton href={p.href} label="Case study" />
        </div>
        <div className="flex gap-3 sm:gap-4">
          <div className="flex w-[40%] flex-col gap-3 sm:gap-4">
            <Plate img={a} height="clamp(90px, 11vw, 160px)" sizes="(min-width: 1152px) 440px, 38vw" />
            <Plate img={b} height="clamp(110px, 14vw, 210px)" sizes="(min-width: 1152px) 440px, 38vw" />
          </div>
          <div className="w-[60%]">
            <Plate img={c} sizes="(min-width: 1152px) 660px, 58vw" />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection({ projects }: { projects: ProjectData[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <section
      id="research"
      aria-labelledby="research-h"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-4 pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
    >
      <FadeIn
        as="h2"
        id="research-h"
        y={40}
        className="hero-heading mb-12 text-center font-black uppercase leading-none tracking-tight sm:mb-16"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Research
      </FadeIn>
      <div ref={ref}>
        {projects.map((p, i) => (
          <Card key={p.slug} p={p} index={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
