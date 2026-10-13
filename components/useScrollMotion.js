'use client';

import { useRef } from 'react';
import { useReducedMotion, useTransform } from 'motion/react';

/**
 * Como useTransform, mas devolve o valor "neutro" quando o utilizador pede menos movimento.
 * Os motion values estão sempre ligados (o HTML do servidor e do cliente coincidem);
 * só o resultado muda, por isso não há conteúdo preso a meio de uma animação.
 */
export function useScrollValue(progress, input, output, neutral) {
  const reduceMotion = useReducedMotion();
  const reduceRef = useRef(reduceMotion);
  reduceRef.current = reduceMotion;
  const mapped = useTransform(progress, input, output);
  return useTransform(() => (reduceRef.current ? neutral : mapped.get()));
}
