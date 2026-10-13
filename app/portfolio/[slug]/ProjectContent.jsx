'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Building2, Users } from 'lucide-react';
import { GradientBlob, SectionEyebrow } from '@/components/DesignPrimitives';
import Reveal from '@/components/Reveal';
import ScrollImage from '@/components/ScrollImage';
import { categoryKey } from '@/lib/i18n';
import { useT } from '@/components/LocaleProvider';

export default function ProjectContent({ project }) {
  const t = useT();
  const title = t(`project.${project.slug}.title`);
  const description = t(`project.${project.slug}.description`);

  return (
    <>
      <section className="relative overflow-hidden bg-cream-50 px-6 pb-16 pt-40 lg:px-10">
        <GradientBlob className="-right-40 -top-20 h-105 w-105 bg-gold-500/10" />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <Reveal immediate>
            <Link href="/portfolio" className="mb-8 inline-flex items-center gap-2 text-sm text-graphite-500 hover:text-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2">
              <ArrowLeft size={15} /> {t('portfolio.back')}
            </Link>
            <SectionEyebrow index={t(categoryKey(project.category)).toUpperCase()} label={project.location} />
            <h1 className="max-w-2xl font-display text-4xl font-bold leading-[.96] tracking-tighter text-graphite-950 sm:text-5xl">{title}</h1>
            <p className="mt-5 max-w-xl leading-relaxed text-graphite-600">{description}</p>
            <div className="mt-8 space-y-4 border-t border-graphite-950/15 pt-6">
              <p className="flex items-start gap-3 text-sm text-graphite-700"><MapPin className="mt-0.5 shrink-0 text-gold-600" size={17} /><span><span className="block font-mono-tech text-[9px] tracking-[.14em] text-graphite-500">{t('common.locationLabel')}</span>{project.location}</span></p>
              <p className="flex items-start gap-3 text-sm text-graphite-700"><Users className="mt-0.5 shrink-0 text-gold-600" size={17} /><span><span className="block font-mono-tech text-[9px] tracking-[.14em] text-graphite-500">{t('common.projectOwner').toUpperCase()}</span>{project.client}</span></p>
              <p className="flex items-start gap-3 text-sm text-graphite-700"><Building2 className="mt-0.5 shrink-0 text-gold-600" size={17} /><span><span className="block font-mono-tech text-[9px] tracking-[.14em] text-graphite-500">{t('common.interventionType')}</span>{t(categoryKey(project.category))}</span></p>
            </div>
          </Reveal>

          <Reveal immediate variant="mask" delay={0.15}>
            <div className="relative aspect-4/3 overflow-hidden bg-graphite-900">
              <ScrollImage reveal={false} className="absolute inset-0">
                <Image src={project.images[0]} alt={t('common.projectImage', { title })} fill loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
              </ScrollImage>
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-graphite-950/85 to-transparent px-5 pb-5 pt-16 text-xs text-white/80">{project.location}</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-100 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-8 flex items-end justify-between gap-8">
            <div><SectionEyebrow index={t('portfolio.photoRecord')} label={t('common.portfolioStarPrime')} /><h2 className="font-display text-2xl font-bold leading-[.98] tracking-[-.04em] text-graphite-950 sm:text-4xl">{t('portfolio.galleryTitle')}</h2></div>
            <span className="hidden font-mono-tech text-[10px] tracking-[.14em] text-graphite-500 sm:block">{String(project.images.length).padStart(2, '0')} {t('portfolio.photos')}</span>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
            {project.images.map((src, index) => (
              <ScrollImage key={src} className={`relative aspect-4/3 h-full bg-graphite-900 ${index === 0 ? 'sm:col-span-2 lg:col-span-7' : 'lg:col-span-5'}`}>
                <Image src={src} alt={t('common.projectGalleryImage', { title, number: index + 1 })} fill sizes={index === 0 ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 42vw, 100vw'} className="project-image object-cover" />
              </ScrollImage>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
