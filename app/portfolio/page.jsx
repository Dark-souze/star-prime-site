'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin } from 'lucide-react';
import { TechFrame, GradientBlob, SectionEyebrow } from '@/components/DesignPrimitives';
import Reveal from '@/components/Reveal';
import ScrollImage from '@/components/ScrollImage';
import { FILTERS, PROJECTS } from '@/lib/content';
import { useT } from '@/components/LocaleProvider';
import { categoryKey } from '@/lib/i18n';

const EASE_OUT = [0.16, 1, 0.3, 1];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('Todos');
  const t = useT();
  const visible = filter === 'Todos' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <main>
      <section className="relative overflow-hidden bg-cream-50 px-6 pb-16 pt-40 lg:px-10">
        <GradientBlob className="-right-40 -top-20 h-[420px] w-[420px] bg-gold-500/10" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal immediate>
            <SectionEyebrow index={t('portfolio.eyebrow')} label={t('portfolio.label')} />
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-[.96] tracking-[-.05em] text-graphite-950 sm:text-6xl">{t('portfolio.title')}</h1>
          </Reveal>

          <Reveal immediate delay={0.15} className="mt-10 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={`relative isolate min-h-11 rounded-[2px] border px-4 py-2.5 text-xs font-semibold tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 ${
                    active ? 'border-gold-400 text-graphite-950' : 'border-graphite-950/15 text-graphite-600 hover:border-gold-400/50 hover:text-gold-600'
                  }`}
                >
                  {/* O fundo dourado desliza entre filtros em vez de saltar. */}
                  {active && <motion.span layoutId="portfolio-filter" aria-hidden="true" className="absolute -inset-px -z-10 rounded-[2px] bg-gold-400" transition={{ type: 'spring', stiffness: 420, damping: 38 }} />}
                  {t(`portfolio.filters.${f === 'Todos' ? 'all' : f === 'Construção' ? 'construction' : 'rehabilitation'}`)}
                </button>
              );
            })}
          </Reveal>
          <p className="mt-4 text-xs text-graphite-500" aria-live="polite">
            {t(visible.length === 1 ? 'portfolio.projectOne' : 'portfolio.projectsMany', { count: visible.length })}
          </p>
        </div>
      </section>

      <section className="bg-cream-50 px-6 pb-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => {
                const title = t(`project.${p.slug}.title`);
                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2, ease: 'easeIn' } }}
                    transition={{
                      layout: { type: 'spring', stiffness: 300, damping: 36 },
                      opacity: { duration: 0.45, delay: i * 0.05 },
                      y: { duration: 0.7, ease: EASE_OUT, delay: i * 0.05 },
                    }}
                  >
                    <Link href={`/portfolio/${p.slug}`} className="group block overflow-hidden rounded-[3px] border border-cream-200 bg-white transition-colors duration-300 hover:border-gold-400/60">
                    <ScrollImage
                      parallax={6}
                      className="relative h-72 bg-graphite-900"
                      overlay={<TechFrame className="pointer-events-none absolute inset-3 z-20 scale-[1.04] opacity-0 transition-[opacity,scale] duration-500 ease-out group-hover:scale-100 group-hover:opacity-100" />}
                    >
                      <Image src={p.images[0]} alt={t('portfolio.projectImageAlt', { title })} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="project-image object-cover" />
                    </ScrollImage>
                    <div className="p-6">
                      <p className="font-mono-tech text-[11px] tracking-[0.15em] text-gold-600">{t(categoryKey(p.category)).toUpperCase()}</p>
                      <h3 className="mt-1.5 font-display text-lg font-semibold text-graphite-950">{title}</h3>
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-graphite-500"><MapPin size={12} /> {p.location}</p>
                      <p className="mt-4 border-t border-graphite-950/10 pt-3 text-xs leading-relaxed text-graphite-500">{t('portfolio.projectOwner')}: <span className="text-graphite-700">{p.client}</span></p>
                    </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
