'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'motion/react';
import LenisScrollContext from '@/components/LenisScrollContext';

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function LenisProvider({ children }) {
  const scrollToRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      scrollToRef.current = (target, offset) => {
        const top = target.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
      };
      return () => { scrollToRef.current = null; };
    }

    // lerp dá um scroll que acompanha a roda do rato sem atraso perceptível.
    // anchors: os links "#secção" deslizam suavemente e respeitam o scroll-margin (scroll-mt-*).
    // stopInertiaOnNavigate: ao mudar de página, a inércia pára em vez de arrastar a página nova.
    const lenis = new Lenis({
      lerp: 0.1,
      autoRaf: true,
      anchors: { duration: 1.1, easing: easeOutExpo },
      stopInertiaOnNavigate: true,
    });
    scrollToRef.current = (target, offset) => lenis.scrollTo(target, { offset, duration: 0.9, easing: easeOutExpo });
    return () => {
      scrollToRef.current = null;
      lenis.destroy();
    };
  }, []);

  return (
    <LenisScrollContext.Provider value={scrollToRef}>
      {/* reducedMotion="user": todas as animações Motion respeitam a preferência do sistema. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisScrollContext.Provider>
  );
}
