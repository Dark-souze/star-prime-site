'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { useScrollValue } from '@/components/useScrollMotion';

/**
 * Imagem que acompanha o scroll:
 * - reveal: a moldura abre-se de fora para dentro à medida que a imagem entra no ecrã;
 * - a fotografia aproxima-se (zoom) durante a entrada;
 * - parallax: depois continua a deslizar mais devagar do que a página.
 * Tudo é reversível — ao subir, a animação recua.
 *
 * `children` é a camada que se move (normalmente o <Image fill />);
 * `overlay` fica fixo por cima (gradientes, legendas, molduras).
 */
export default function ScrollImage({ children, overlay = null, className = '', reveal = true, parallax = 8 }) {
  const ref = useRef(null);
  const { scrollYProgress: passage } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const { scrollYProgress: entry } = useScroll({ target: ref, offset: ['start 1', 'start 0.45'] });

  // A escala final cobre o deslocamento do parallax, para nunca aparecer uma margem vazia.
  const baseScale = 1 + (parallax * 2.2) / 100;
  const y = useScrollValue(passage, [0, 1], [`${-parallax}%`, `${parallax}%`], '0%');
  const scale = useScrollValue(entry, [0, 1], [reveal ? baseScale + 0.22 : baseScale, baseScale], 1);
  const clipPath = useScrollValue(
    entry,
    [0, 0.9],
    reveal ? ['inset(14% 10% 14% 10%)', 'inset(0% 0% 0% 0%)'] : ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
    'inset(0% 0% 0% 0%)',
  );

  return (
    <motion.div ref={ref} data-reveal="image" style={{ clipPath }} className={`overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0 will-change-transform" style={{ y, scale }}>
        {children}
      </motion.div>
      {overlay}
    </motion.div>
  );
}
