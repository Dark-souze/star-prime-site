'use client';

import { useT } from '@/components/LocaleProvider';

export default function SkipLink() {
  const t = useT();
  return <a href="#main-content" className="fixed left-4 top-4 z-[1000] -translate-y-[150%] bg-gold-400 px-4 py-3 text-xs font-bold text-graphite-950 transition-transform focus:translate-y-0">{t('common.skipToContent')}</a>;
}
