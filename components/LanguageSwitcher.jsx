'use client';

import { useLocale, useT } from '@/components/LocaleProvider';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const t = useT();

  return (
    <div role="group" aria-label={t('language.label')} className="relative inline-grid h-10 w-[5.5rem] shrink-0 grid-cols-2 items-center rounded-full border border-white/15 bg-white/[0.06] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-1 left-1 w-10 rounded-full bg-gold-400 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4)] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none ${locale === 'en' ? 'translate-x-10' : 'translate-x-0'}`}
      />
      <button
        type="button"
        onClick={() => setLocale('pt')}
        aria-label={t('language.switchToPortuguese')}
        aria-pressed={locale === 'pt'}
        className={`relative z-10 grid h-8 w-10 place-items-center rounded-full text-[10px] font-bold tracking-[.08em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950 ${locale === 'pt' ? 'text-graphite-950' : 'text-white/60 hover:text-white'}`}
      >
        PT
      </button>
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-label={t('language.switchToEnglish')}
        aria-pressed={locale === 'en'}
        className={`relative z-10 grid h-8 w-10 place-items-center rounded-full text-[10px] font-bold tracking-[.08em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950 ${locale === 'en' ? 'text-graphite-950' : 'text-white/60 hover:text-white'}`}
      >
        EN
      </button>
    </div>
  );
}
