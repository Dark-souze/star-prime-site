'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PROJECTS } from '@/lib/content';
import { translate } from '@/lib/i18n';

const STORAGE_KEY = 'star-prime-language';
const LocaleContext = createContext(null);

function getBrowserLocale() {
  if (typeof navigator === 'undefined') return 'pt';
  const preferences = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
  const preferredSupportedLanguage = preferences.find((language) => (
    language.toLowerCase().startsWith('en') || language.toLowerCase().startsWith('pt')
  ));
  return preferredSupportedLanguage?.toLowerCase().startsWith('en') ? 'en' : 'pt';
}

export default function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState('pt');
  const pathname = usePathname();

  const setLocale = useCallback((nextLocale) => {
    const next = nextLocale === 'en' ? 'en' : 'pt';
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The language still changes for this visit when storage is unavailable.
    }
  }, []);

  useEffect(() => {
    let savedLocale;
    try {
      savedLocale = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      savedLocale = null;
    }

    setLocaleState(savedLocale === 'en' || savedLocale === 'pt' ? savedLocale : getBrowserLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : 'pt-AO';
  }, [locale]);

  const t = useCallback((key, variables) => translate(locale, key, variables), [locale]);

  useEffect(() => {
    const routeMetadata = {
      '/': ['metadata.homeTitle', 'metadata.homeDescription'],
      '/sobre': ['metadata.aboutTitle', 'metadata.aboutDescription'],
      '/servicos': ['metadata.servicesTitle', 'metadata.servicesDescription'],
      '/portfolio': ['metadata.portfolioTitle', 'metadata.portfolioDescription'],
      '/contactos': ['metadata.contactsTitle', 'metadata.contactsDescription'],
      '/privacidade': ['metadata.privacyTitle', 'metadata.privacyDescription'],
      '/termos': ['metadata.termsTitle', 'metadata.termsDescription'],
    };

    let [titleKey, descriptionKey] = routeMetadata[pathname] || [];
    let title;
    let description;
    const projectSlug = pathname?.match(/^\/portfolio\/([^/]+)$/)?.[1];
    const projectData = projectSlug && PROJECTS.find((item) => item.slug === projectSlug);

    if (projectSlug && projectData) {
      const projectTitle = translate(locale, `project.${projectSlug}.title`);
      const projectDescription = translate(locale, `project.${projectSlug}.description`);
      const fallbackProject = translate(locale, 'portfolio.projectOwner');
      title = `${projectTitle} | Star Prime`;
      description = translate(locale, 'metadata.projectDescription', {
        description: projectDescription,
        client: projectData.client || fallbackProject,
        location: projectData.location,
      });
    } else if (titleKey && descriptionKey) {
      title = translate(locale, titleKey);
      description = translate(locale, descriptionKey);
    } else {
      title = `${translate(locale, 'notFound.title')} | Star Prime`;
      description = translate(locale, 'notFound.description');
    }

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', locale === 'en' ? 'en_US' : 'pt_AO');
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
  }, [locale, pathname]);

  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale deve ser usado dentro de LocaleProvider.');
  return { locale: context.locale, setLocale: context.setLocale };
}

export function useT() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useT deve ser usado dentro de LocaleProvider.');
  return context.t;
}
