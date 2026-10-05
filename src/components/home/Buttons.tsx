import { ArrowUpRight, Mail } from 'lucide-react';

export function ContactButton({ href, label = 'Contact Me' }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white no-underline transition-transform duration-200 hover:scale-[1.03]"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid #fff',
        outlineOffset: '-3px',
      }}
    >
      <Mail aria-hidden="true" className="h-4 w-4" />
      {label}
    </a>
  );
}

export function GhostButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border-2 border-solid border-[#D7E2EA] px-6 py-2.5 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] no-underline transition-colors duration-200 hover:bg-[#D7E2EA]/10"
    >
      {label}
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}
