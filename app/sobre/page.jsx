'use client';

import Image from 'next/image';
import { UsersRound, BadgeCheck, CalendarCheck, ShieldCheck, ClipboardCheck, Broom, Scale } from 'lucide-react';
import { TechFrame, GradientBlob, SectionEyebrow } from '@/components/DesignPrimitives';
import Reveal from '@/components/Reveal';
import ScrollImage from '@/components/ScrollImage';
import { COMPANY_PROFILE, PILLARS, SOBRE_IMAGE } from '@/lib/content';
import { useLocale, useT } from '@/components/LocaleProvider';

const PILLAR_ICONS = [UsersRound, BadgeCheck, CalendarCheck, ShieldCheck, ClipboardCheck, Broom, Scale];

export default function SobrePage() {
  const t = useT();
  const { locale } = useLocale();

  return (
    <main>
      <section className="bg-cream-50 px-6 pb-20 pt-40 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <Reveal immediate>
            <SectionEyebrow index={t('about.whoWeAre')} label={t('about.starPrime')} />
            <h1 className="font-display text-4xl font-bold leading-[.95] tracking-tighter text-graphite-950 sm:text-6xl">{t('about.title')}</h1>
          </Reveal>
          <Reveal immediate delay={0.12} className="space-y-5 border-t border-gold-500/50 pt-5 text-base leading-relaxed text-graphite-600 lg:border-l lg:border-t-0 lg:pt-0 lg:pl-8">
            {COMPANY_PROFILE.map((_, index) => <p key={index}>{t(`about.profile.${index}`)}</p>)}
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream-100 px-6 py-24 lg:px-10">
        <GradientBlob className="-left-32 top-0 h-72 w-72 bg-gold-500/10" />
        <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
          <TechFrame className="relative aspect-4/3 border border-cream-200">
            <ScrollImage className="absolute inset-0">
              <Image src={SOBRE_IMAGE} alt={t('about.imageAlt')} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
            </ScrollImage>
          </TechFrame>
          <Reveal delay={0.15}>
            <SectionEyebrow index={t('about.quality')} label={t('about.qualityLabel')} />
            <h2 className="font-display text-3xl font-bold leading-[.98] tracking-[-.045em] text-graphite-950 sm:text-4xl">{t('about.qualityTitle')}</h2>
            <p className="mt-6 leading-relaxed text-graphite-600">{t('about.qualityPolicy')}</p>
            <p className="mt-4 leading-relaxed text-graphite-600">{t('about.qualityAdditional')}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-50 px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <SectionEyebrow index={t('about.commitments')} label={t('about.commitmentLabel')} />
            <h2 className="font-display text-3xl font-bold leading-[.98] tracking-[-.045em] text-graphite-950 sm:text-5xl">{t('about.commitmentsTitle')}</h2>
          </Reveal>
          <div className="mt-14 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((_, index) => {
              const Icon = PILLAR_ICONS[index];
              return (
                <Reveal key={index} delay={index * 0.05} className="border-t border-graphite-950/15 py-7">
                  <div className="flex items-center gap-3"><Icon className="text-gold-600" size={20} strokeWidth={1.5} /><span className="font-mono-tech text-[10px] tracking-[.15em] text-gold-600">0{index + 1}</span></div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-graphite-950">{t(`about.pillars.${index}.title`)}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-graphite-600">{t(`about.pillars.${index}.desc`)}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
