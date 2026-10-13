'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { getWhatsAppLink } from '@/lib/content';
import { useLocale } from '@/components/LocaleProvider';

export default function WhatsAppButton({ children, className = '' }) {
  const { locale } = useLocale();

  return (
    <motion.a
      href={getWhatsAppLink(locale)}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 520, damping: 34 }}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-[2px] bg-gold-400 px-6 py-3 text-[11px] font-bold tracking-[0.09em] text-graphite-950 transition-colors duration-200 hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 ${className}`}
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </motion.a>
  );
}
