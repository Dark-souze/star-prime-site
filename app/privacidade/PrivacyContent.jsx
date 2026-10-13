'use client';

import { COMPANY } from '@/lib/content';
import { useT } from '@/components/LocaleProvider';

export default function PrivacyContent() {
  const t = useT();

  return (
    <main className="bg-cream-50 px-5 pb-24 pt-40 lg:px-10">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono-tech text-[10px] tracking-[.16em] text-gold-600">{t('privacy.eyebrow')}</p>
        <h1 className="mt-5 font-display text-5xl font-bold leading-[.92] tracking-[-.06em] text-graphite-950 sm:text-6xl">{t('privacy.title')}</h1>
        <p className="mt-6 text-sm text-graphite-500">{t('privacy.updated')}</p>

        <div className="mt-14 space-y-10 text-base leading-relaxed text-graphite-700">
          <section>
            <h2 className="font-display text-2xl font-bold text-graphite-950">{t('privacy.whoTitle')}</h2>
            <p className="mt-3">{t('privacy.who', { company: COMPANY.legalName, address: t('common.address'), location: t('common.location') })} {t('privacy.contactIntro')} <a className="font-semibold text-graphite-950 underline decoration-gold-500 underline-offset-2" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.</p>
          </section>
          <section><h2 className="font-display text-2xl font-bold text-graphite-950">{t('privacy.dataTitle')}</h2><p className="mt-3">{t('privacy.data')}</p></section>
          <section><h2 className="font-display text-2xl font-bold text-graphite-950">{t('privacy.useTitle')}</h2><p className="mt-3">{t('privacy.use')}</p></section>
          <section><h2 className="font-display text-2xl font-bold text-graphite-950">{t('privacy.providersTitle')}</h2><p className="mt-3">{t('privacy.providers')}</p></section>
          <section><h2 className="font-display text-2xl font-bold text-graphite-950">{t('privacy.securityTitle')}</h2><p className="mt-3">{t('privacy.security')}</p></section>
          <section><h2 className="font-display text-2xl font-bold text-graphite-950">{t('privacy.rightsTitle')}</h2><p className="mt-3">{t('privacy.rights')}</p></section>
          <section><h2 className="font-display text-2xl font-bold text-graphite-950">{t('privacy.cookiesTitle')}</h2><p className="mt-3">{t('privacy.cookies')}</p></section>
        </div>
      </article>
    </main>
  );
}
