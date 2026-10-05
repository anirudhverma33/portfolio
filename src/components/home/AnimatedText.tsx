import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

function Char({ char, progress, range }: { char: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }} aria-hidden="true">
        {char}
      </motion.span>
    </span>
  );
}

/** Reveals a paragraph character by character as it scrolls through the viewport. */
export default function AnimatedText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const chars = Array.from(text);
  const words = text.split(' ');
  let i = 0;
  return (
    <p ref={ref} className={className} style={style}>
      <span className="sr-only">{text}</span>
      {words.map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap" aria-hidden="true">
          {Array.from(word + (w < words.length - 1 ? '\u00a0' : '')).map((c) => {
            const k = i++;
            return <Char key={k} char={c} progress={scrollYProgress} range={[k / chars.length, (k + 1) / chars.length]} />;
          })}
        </span>
      ))}
    </p>
  );
}
