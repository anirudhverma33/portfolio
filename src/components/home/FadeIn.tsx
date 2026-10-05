import { motion, useReducedMotion } from 'framer-motion';
import type { ElementType, ReactNode, CSSProperties } from 'react';

interface Props {
  as?: ElementType;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
}

const cache = new Map<ElementType, ReturnType<typeof motion.create>>();
function motionFor(tag: ElementType) {
  let m = cache.get(tag);
  if (!m) {
    m = motion.create(tag as never);
    cache.set(tag, m);
  }
  return m;
}

export default function FadeIn({ as = 'div', delay = 0, duration = 0.7, x = 0, y = 30, children, ...rest }: Props) {
  const M = motionFor(as) as ElementType;
  const reduce = useReducedMotion();
  return (
    <M
      initial={reduce ? { opacity: 0 } : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      {...rest}
    >
      {children}
    </M>
  );
}
