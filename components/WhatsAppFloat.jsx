'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getWhatsAppLink } from '@/lib/content';
import { useLocale, useT } from '@/components/LocaleProvider';

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const { locale } = useLocale();
  const t = useT();

  useEffect(() => {
    if (pathname === '/contactos') return;
    const updateVisibility = () => {
      const pageContent = document.getElementById('main-content');
      if (!pageContent) return;

      const contentRect = pageContent.getBoundingClientRect();
      const contentTop = window.scrollY + contentRect.top;
      const distanceIntoContent = window.scrollY + window.innerHeight - contentTop;
      const contentProgress = distanceIntoContent / Math.max(contentRect.height, 1);
      const distanceToContentEnd = contentRect.bottom - window.innerHeight;
      const revealDistance = Math.min(520, Math.max(320, window.innerHeight * 0.58));
      const shouldShow = window.scrollY > 64
        && contentProgress >= 0.72
        && distanceToContentEnd <= revealDistance;

      setIsVisible((current) => current === shouldShow ? current : shouldShow);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, [pathname]);

  if (pathname === '/contactos') return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6 motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none ${isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'}`}
      aria-hidden={!isVisible}
    >
      <div aria-hidden="true" className={`max-w-65 border-l-2 border-gold-300 bg-graphite-950 px-4 py-3 text-left text-off-white shadow-[0_12px_32px_-12px_rgba(0,0,0,0.55)] motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none ${isVisible ? 'translate-y-0 opacity-100 delay-75' : 'translate-y-1 opacity-0'}`}>
        <p className="text-xs font-semibold tracking-wide">{t('whatsapp.moreDetails')}</p>
        <p className="mt-1 text-xs leading-relaxed text-white/65">{t('whatsapp.contact')}</p>
      </div>
      <a
        href={getWhatsAppLink(locale)}
        target="_blank"
        rel="noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_22px_-8px_rgba(37,211,102,0.42)] transition-transform duration-200 motion-reduce:transition-none motion-safe:hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950"
        aria-label={t('whatsapp.linkLabel')}
        tabIndex={isVisible ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.87 9.87 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.17 8.17 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.24 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42-.14-.01-.31-.01-.47-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.06 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.25 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28z" />
        </svg>
      </a>
    </div>
  );
}
