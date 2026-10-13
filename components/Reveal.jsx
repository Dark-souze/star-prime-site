'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { useScrollValue } from '@/components/useScrollMotion';

/**
 * Entrada de texto e blocos.
 * - immediate: anima no carregamento da página (hero), em CSS, sem esperar pelo JavaScript.
 * - caso contrário: acompanha o scroll — o bloco sobe e aparece à medida que entra no ecrã,
 *   e volta a recuar se o utilizador subir. `delay` desfasa a entrada de elementos vizinhos.
 */
export default function Reveal({ children, className = '', delay = 0, immediate = false, variant = 'fade' }) {
  if (immediate) {
    return (
      <div data-reveal={variant} data-reveal-load="" style={delay ? { '--reveal-delay': `${delay}s` } : undefined} className={className}>
        {children}
      </div>
    );
  }
  return <ScrollReveal className={className} delay={delay}>{children}</ScrollReveal>;
}

function ScrollReveal({ children, className, delay }) {
  const ref = useRef(null);
  // Cada 0,1 s de "delay" atrasa a entrada 4 % da altura do ecrã.
  const shift = Math.min(delay, 0.5) * 0.4;
  const { scrollYProgress } = useScroll({ target: ref, offset: [`start ${1 - shift}`, `start ${0.72 - shift}`] });
  const opacity = useScrollValue(scrollYProgress, [0, 1], [0, 1], 1);
  const y = useScrollValue(scrollYProgress, [0, 1], [56, 0], 0);

  return (
    <motion.div ref={ref} data-reveal="scroll" style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}
