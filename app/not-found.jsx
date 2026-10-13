'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Compass, MapPin } from 'lucide-react';
import { HERO_IMAGE } from '@/lib/content';
import { useT } from '@/components/LocaleProvider';

export default function NotFound() {
  const t = useT();

  return (
    <main className="relative isolate min-h-[calc(100dvh-72px)] overflow-hidden bg-graphite-950 text-off-white">
      <div className="absolute inset-y-0 right-0 w-full bg-graphite-950 lg:w-[54%]">
        <Image
          src={HERO_IMAGE}
          alt={t('notFound.heroAlt')}
          fill
          sizes="(min-width: 1024px) 54vw, 100vw"
          className="object-cover opacity-40 grayscale transition duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-950 via-graphite-950/75 to-graphite-950/10" />
        <div className="absolute inset-0 bg-graphite-950/20" />
      </div>

      <div className="pointer-events-none absolute -right-8 top-16 select-none font-display text-[clamp(12rem,32vw,34rem)] font-bold leading-none tracking-[-.12em] text-white/[.035] lg:right-8 lg:top-4">
        404
      </div>

      <div className="relative mx-auto flex min-h-[calc(100dvh-72px)] max-w-[1440px] items-center px-5 py-28 lg:px-10 lg:py-32">
        <div className="max-w-xl">
          <div className="mb-8 flex items-center gap-3 font-mono-tech text-[10px] tracking-[.2em] text-gold-300">
            <span className="h-px w-10 bg-gold-400" />
            {t('notFound.eyebrow')}
          </div>

          <h1 className="max-w-lg font-display text-[clamp(3.6rem,8vw,7.5rem)] font-bold leading-[.86] tracking-[-.08em]">
            {t('notFound.title')}
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-white/65">
            {t('notFound.description')}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-3 bg-gold-400 px-5 py-4 text-xs font-bold tracking-[.08em] text-graphite-950 transition hover:bg-gold-300 active:translate-y-px">
              <ArrowLeft size={16} /> {t('notFound.home')}
            </Link>
            <Link href="/portfolio" className="inline-flex items-center gap-3 border border-white/25 px-5 py-4 text-xs font-bold tracking-[.08em] text-white transition hover:border-white hover:bg-white/10">
              {t('notFound.portfolio')} <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-5 font-mono-tech text-[10px] tracking-[.14em] text-white/50">
            <span className="flex items-center gap-2"><Compass size={14} className="text-gold-300" /> {t('notFound.brand')}</span>
            <span className="flex items-center gap-2"><MapPin size={14} className="text-gold-300" /> {t('notFound.location')}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
