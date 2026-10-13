'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { NAV_LINKS } from '@/lib/content';
import { useT } from '@/components/LocaleProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const EASE_OUT = [0.16, 1, 0.3, 1];
const menuList = { open: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } } };
const menuItem = {
  closed: { opacity: 0, y: -8 },
  open: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
};

const navKeys = {
  '/': 'nav.home',
  '/sobre': 'nav.about',
  '/servicos': 'nav.services',
  '/portfolio': 'nav.portfolio',
  '/contactos': 'nav.contacts',
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = useT();
  const isHome = pathname === '/';
  const isActive = (href) => pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));
  const close = () => setOpen(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b text-off-white transition-[background-color,border-color,box-shadow] duration-500 ease-out ${isHome && !scrolled && !open ? 'border-transparent bg-graphite-950/20' : 'border-white/10 bg-graphite-950/95 shadow-[0_10px_35px_-22px_rgba(0,0,0,.7)]'} backdrop-blur-xl`}>
      <nav aria-label={t('nav.navigation')} className="mx-auto flex h-18 max-w-360 items-center justify-between px-5 lg:px-10">
        <Link href="/" onClick={close} aria-label={`Star Prime — ${t('nav.home')}`} className="flex shrink-0 items-center"><Image src="/StarPrime-LOGO.png" alt={t('common.logoAlt')} width={341} height={165} sizes="170px" loading="eager" className="h-12 w-auto object-contain sm:h-14" /></Link>
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((item) => <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? 'page' : undefined} className={`nav-link rounded-sm text-[12px] font-semibold tracking-[.08em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950 ${isActive(item.href) ? 'nav-link-active text-gold-300' : 'text-white/70 hover:text-white'}`}>{t(navKeys[item.href])}</Link>)}
        </div>
        <div className="ml-auto flex items-center gap-2 md:ml-0 md:gap-0">
          <LanguageSwitcher />
          <button onClick={() => setOpen(!open)} aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')} aria-expanded={open} aria-controls="mobile-navigation" className="grid h-11 w-11 place-items-center rounded-sm border border-white/20 transition hover:border-gold-300 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 md:hidden"><AnimatePresence mode="wait" initial={false}>
            <motion.span key={open ? 'close' : 'open'} initial={{ opacity: 0, rotate: -60 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 60 }} transition={{ duration: 0.16 }} className="grid place-items-center">
              {open ? <X size={20} /> : <Menu size={21} />}
            </motion.span>
          </AnimatePresence></button>
        </div>
      </nav>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-navigation"
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { height: { duration: 0.45, ease: EASE_OUT }, opacity: { duration: 0.25 } } }}
            exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.2 } } }}
            className="overflow-hidden border-t border-white/10 bg-graphite-950 md:hidden"
          >
            <motion.div variants={menuList} initial="closed" animate="open" className="px-5 pb-6 pt-3">
              {NAV_LINKS.map((item) => (
                <motion.div key={item.href} variants={menuItem}>
                  <Link href={item.href} onClick={close} aria-current={isActive(item.href) ? 'page' : undefined} className={`block border-b border-white/10 py-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-inset ${isActive(item.href) ? 'text-gold-300' : 'text-white/85'}`}>{t(navKeys[item.href])}</Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
