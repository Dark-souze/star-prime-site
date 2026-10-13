'use client';

import { COMPANY } from '@/lib/content';
import { useT } from '@/components/LocaleProvider';

export default function TermsContent() {
  const t = useT();

  return (
    <main className="bg-cream-50 px-5 pb-24 pt-40 lg:px-10">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono-tech text-[10px] tracking-[.16em] text-gold-600">{t('terms.eyebrow')}</p>
        <h1 className="mt-5 font-display text-5xl font-bold leading-[.92] tracking-[-.06em] text-graphite-950 sm:text-6xl">{t('terms.title')}</h1>
        <p className="mt-6 text-sm text-graphite-500">{t('terms.updated')}</p>

        <div className="mt-14 space-y-10 text-base leading-relaxed text-graphite-700">
          <section><h2 className="font-display text-2xl font-bold text-graphite-950">{t('terms.siteTitle')}</h2><p className="mt-3">{t('terms.site')}</p></section>
          <section><h2 className="font-display text-2xl font-bold text-graphite-950">{t('terms.quoteTitle')}</h2><p className="mt-3">{t('terms.quote')}</p></section>
          <section><h2 className="font-display text-2xl font-bold text-graphite-950">{t('terms.contentTitle')}</h2><p className="mt-3">{t('terms.content')}</p></section>
          <section><h2 className="font-display text-2xl font-bold text-graphite-950">{t('terms.linksTitle')}</h2><p className="mt-3">{t('terms.links')}</p></section>
          <section><h2 className="font-display text-2xl font-bold text-graphite-950">{t('terms.availabilityTitle')}</h2><p className="mt-3">{t('terms.availability')}</p></section>
          <section><h2 className="font-display text-2xl font-bold text-graphite-950">{t('terms.contactTitle')}</h2><p className="mt-3">{t('terms.contactIntro')} <a className="font-semibold text-graphite-950 underline decoration-gold-500 underline-offset-2" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.</p></section>
        </div>
      </article>
    </main>
  );
}
