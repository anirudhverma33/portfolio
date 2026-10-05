import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import { ContactButton } from './Buttons';
import { BeamSplitter, BlochSphere, SpdcCones, WavePacket } from './Glyphs';

interface Props {
  text: string;
  role: string;
  contact: string;
  profiles: { label: string; href: string }[];
}

export default function AboutSection({ text, role, contact, profiles }: Props) {
  return (
    <section
      id="about"
      aria-labelledby="about-h"
      className="relative flex min-h-screen flex-col items-center justify-center gap-16 overflow-hidden px-5 py-20 sm:gap-20 sm:px-8 md:gap-24 md:px-10"
    >
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="pointer-events-none absolute left-[1%] top-[4%] sm:left-[2%] md:left-[4%]">
        <BlochSphere className="w-[100px] opacity-80 sm:w-[140px] md:w-[190px]" />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="pointer-events-none absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]">
        <SpdcCones className="w-[90px] opacity-80 sm:w-[130px] md:w-[170px]" />
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="pointer-events-none absolute right-[1%] top-[4%] sm:right-[2%] md:right-[4%]">
        <BeamSplitter className="w-[100px] opacity-80 sm:w-[140px] md:w-[190px]" />
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="pointer-events-none absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]">
        <WavePacket className="w-[110px] opacity-80 sm:w-[150px] md:w-[200px]" />
      </FadeIn>

      <div className="relative flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn
          as="h2"
          id="about-h"
          delay={0}
          y={40}
          className="hero-heading text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          About me
        </FadeIn>
        <AnimatedText
          text={text}
          className="max-w-[600px] text-center font-medium leading-relaxed text-[#D7E2EA]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />
        <FadeIn delay={0.1} y={20} className="flex flex-col items-center gap-4">
          <p className="max-w-[520px] text-center text-sm font-light uppercase tracking-wide text-[#8E9AA3] sm:text-base">{role}</p>
          <ul className="flex list-none flex-wrap justify-center gap-x-6 gap-y-1">
            {profiles.map((p) => (
              <li key={p.label}>
                <a
                  href={p.href}
                  className="inline-block py-2 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] underline decoration-[#646973] underline-offset-4 transition-opacity duration-200 hover:opacity-70"
                >
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>

      <FadeIn delay={0.1} y={20} className="relative">
        <ContactButton href={contact} />
      </FadeIn>
    </section>
  );
}
