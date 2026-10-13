'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useT } from '@/components/LocaleProvider';

export default function BeforeAfterSlider({ before, after, label }) {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const t = useT();

  function handleMove(clientX) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }

  function handleKeyDown(event) {
    const step = event.shiftKey ? 10 : 5;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      setPos((value) => Math.max(0, value - step));
    }
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      setPos((value) => Math.min(100, value + step));
    }
    if (event.key === 'Home') {
      event.preventDefault();
      setPos(0);
    }
    if (event.key === 'End') {
      event.preventDefault();
      setPos(100);
    }
  }

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-[3px]"
      onMouseMove={(event) => event.buttons === 1 && handleMove(event.clientX)}
      onTouchMove={(event) => handleMove(event.touches[0].clientX)}
      role="group"
      aria-label={t('common.comparison', { label })}
    >
      <Image src={after} alt={t('common.afterImage', { label })} fill loading="lazy" sizes="(min-width: 1024px) 83vw, 100vw" className="object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <Image src={before} alt={t('common.beforeImage', { label })} width={1200} height={900} sizes="(min-width: 1024px) 83vw, 100vw" className="h-full w-auto max-w-none object-cover" style={{ width: ref.current?.offsetWidth || '100%' }} draggable={false} />
      </div>

      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono-tech text-[10px] tracking-[0.15em] text-graphite-950 backdrop-blur">{t('common.before')}</div>
      <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono-tech text-[10px] tracking-[0.15em] text-graphite-950 backdrop-blur">{t('common.after')}</div>

      <div className="absolute inset-y-0 z-10 flex w-0.5 -translate-x-1/2 items-center bg-gold-500" style={{ left: `${pos}%` }}>
        <button
          type="button"
          role="slider"
          aria-label={t('common.comparisonPosition', { label })}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={t('common.beforePercentage', { value: Math.round(pos) })}
          onKeyDown={handleKeyDown}
          onMouseDown={(event) => event.preventDefault()}
          className="flex h-9 w-9 -translate-x-1/2 cursor-ew-resize items-center justify-center rounded-full bg-gold-400 text-graphite-950 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
        >
          <span aria-hidden="true" className="text-xs">↔</span>
        </button>
      </div>
    </div>
  );
}
