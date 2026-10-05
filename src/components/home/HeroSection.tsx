import FadeIn from './FadeIn';
import Magnet from './Magnet';
import { ContactButton } from './Buttons';
import type { Img, Links } from './types';

interface Props {
  firstName: string;
  tagline: string;
  portrait: Img;
  links: Links;
}

export default function HeroSection({ firstName, tagline, portrait, links }: Props) {
  const nav = [
    { label: 'About', href: links.about },
    { label: 'Research', href: links.research },
    { label: 'Papers', href: links.papers },
    { label: 'Contact', href: links.contact },
  ];
  return (
    <section className="relative flex h-screen min-h-[560px] flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn as="nav" delay={0} y={-20} aria-label="Main" className="relative z-20 px-6 pt-6 md:px-10 md:pt-8">
        <ul className="flex list-none justify-between">
          {nav.map((n) => (
            <li key={n.label}>
              <a
                href={n.href}
                className="inline-block py-2 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] no-underline transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      <div className="overflow-hidden">
        <FadeIn
          as="h1"
          delay={0.15}
          y={40}
          className="hero-heading mt-6 w-full whitespace-nowrap text-center font-black uppercase leading-none tracking-tight sm:mt-4 md:-mt-3"
          style={{ fontSize: '13.2vw' }}
        >
          Hi, i&apos;m {firstName}
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            {tagline}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton href={links.contact} />
        </FadeIn>
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 w-[min(280px,70vw)] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[min(360px,50vh)] sm:translate-y-0 md:w-[min(440px,54vh)] lg:w-[min(520px,58vh)]">
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
            <img
              src={portrait.src}
              srcSet={portrait.srcSet}
              sizes="(min-width: 1024px) 520px, (min-width: 768px) 440px, 360px"
              width={portrait.width}
              height={portrait.height}
              alt={portrait.alt}
              className="block h-auto w-full rounded-[32px] sm:rounded-b-none sm:rounded-t-[48px]"
              style={{ boxShadow: '0 -20px 80px rgba(118, 33, 176, 0.25)' }}
              fetchPriority="high"
            />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}
