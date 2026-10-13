'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Fingerprint } from 'lucide-react';
import { NAV_LINKS, COMPANY } from '@/lib/content';
import { useT } from '@/components/LocaleProvider';

const navKeys = {
  '/': 'nav.home',
  '/sobre': 'nav.about',
  '/servicos': 'nav.services',
  '/portfolio': 'nav.portfolio',
  '/contactos': 'nav.contacts',
};

export default function Footer() {
  const t = useT();

  return <footer className="bg-graphite-950 px-5 pb-7 pt-20 text-off-white lg:px-10 lg:pt-28">
    <div className="mx-auto max-w-360">
      <div className="grid gap-14 border-b border-white/15 pb-16 lg:grid-cols-[1.3fr_.75fr_.75fr]">
        <div><Image src="/StarPrime-LOGO.png" alt={t('common.logoAlt')} width={341} height={165} sizes="170px" className="h-16 w-auto object-contain object-left" /><p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">{t('footer.tagline')}</p></div>
        <div><p className="font-mono-tech text-[10px] tracking-[.16em] text-gold-300">{t('footer.contacts')}</p><div className="mt-6 space-y-4 text-sm text-white/70"><a href={`tel:+${COMPANY.phoneRaw}`} className="flex min-h-10 items-center gap-3 hover:text-gold-300"><Phone size={16} />{COMPANY.phone}</a><a href={`mailto:${COMPANY.email}`} className="flex min-h-10 items-center gap-3 break-all hover:text-gold-300"><Mail size={16} />{COMPANY.email}</a><p className="flex items-start gap-3"><MapPin className="mt-0.5 shrink-0" size={16} />{t('common.address')}</p><p className="flex items-center gap-3"><Fingerprint size={16} />{t('common.nif')} {COMPANY.nif}</p></div></div>
        <div><p className="font-mono-tech text-[10px] tracking-[.16em] text-gold-300">{t('footer.navigation')}</p><div className="mt-6 grid gap-2 text-sm text-white/70">{NAV_LINKS.map(link => <Link key={link.href} href={link.href} className="flex min-h-10 items-center hover:text-gold-300">{t(navKeys[link.href])}</Link>)}</div><p className="mt-8 border-t border-white/10 pt-5 font-mono-tech text-[10px] tracking-[.16em] text-gold-300">{t('footer.legal')}</p><div className="mt-4 grid gap-2 text-sm text-white/70"><Link href="/privacidade" className="flex min-h-10 items-center hover:text-gold-300">{t('footer.privacy')}</Link><Link href="/termos" className="flex min-h-10 items-center hover:text-gold-300">{t('footer.terms')}</Link></div></div>
      </div>
      <div className="flex flex-col justify-between gap-3 pt-7 text-[10px] font-mono-tech tracking-[.08em] text-white/40 sm:flex-row"><span>{t('footer.copyright', { year: new Date().getFullYear() })}</span><span>{t('footer.location')}</span></div>
    </div>
  </footer>;
}
