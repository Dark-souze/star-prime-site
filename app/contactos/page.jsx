'use client';

import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowUpRight, Globe2, Fingerprint } from 'lucide-react';
import { SectionEyebrow } from '@/components/DesignPrimitives';
import Reveal from '@/components/Reveal';
import ScrollImage from '@/components/ScrollImage';
import QuoteForm from '@/components/QuoteForm';
import { COMPANY, getWhatsAppLink, SOBRE_IMAGE } from '@/lib/content';
import { useLocale, useT } from '@/components/LocaleProvider';

export default function ContactosPage() {
  const t = useT();
  const { locale } = useLocale();
  const channels = [
    { icon: Phone, labelKey: 'phone', value: COMPANY.phone, href: `tel:+${COMPANY.phoneRaw}` },
    { icon: Mail, labelKey: 'email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: MapPin, labelKey: 'address', value: t('common.address'), href: null },
    { icon: Globe2, labelKey: 'website', value: 'www.starprime.ao', href: COMPANY.website },
  ];

  return <main>
    <section className="relative overflow-hidden bg-graphite-950 px-5 pb-16 pt-32 text-off-white lg:px-10 lg:pb-20 lg:pt-36">
      <div className="mx-auto grid max-w-360 gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20">
        <Reveal immediate>
          <SectionEyebrow index={t('contacts.eyebrow')} label={t('contacts.label')} />
          <h1 className="max-w-[10ch] font-display text-[clamp(3.25rem,6vw,6rem)] font-bold leading-[.88] tracking-[-.07em]">{t('contacts.title')}</h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-white/65">{t('contacts.intro')}</p>
        </Reveal>
        <Reveal immediate variant="mask" delay={.15} className="group relative aspect-[5/3] min-h-64 overflow-hidden border border-white/15 sm:min-h-80 lg:min-h-[30rem]">
          <ScrollImage reveal={false} className="absolute inset-0">
            <Image src={SOBRE_IMAGE} alt={t('contacts.imageAlt')} fill loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover object-center opacity-85" />
          </ScrollImage>
          <div className="absolute inset-0 bg-linear-to-t from-graphite-950/80 via-transparent to-graphite-950/10" />
          <div className="absolute bottom-5 left-5 flex items-center gap-3 font-mono-tech text-[10px] tracking-[.15em] text-gold-300"><span className="h-px w-8 bg-gold-400" />{t('contacts.imageCaption')}</div>
        </Reveal>
      </div>
    </section>

    <section className="site-grid bg-cream-50 px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-310 gap-16 lg:grid-cols-[.78fr_1.22fr] lg:gap-24">
        <Reveal>
          <p className="font-mono-tech text-[10px] font-medium tracking-[.16em] text-gold-600">{t('contacts.directChannels')}</p>
          <h2 className="mt-5 max-w-sm font-display text-3xl font-bold leading-[.97] tracking-tighter text-graphite-950 sm:text-4xl">{t('contacts.detailsTitle')}</h2>
          <div className="mt-10 border-t border-graphite-950/15">
            {channels.map((channel) => {
              const Icon = channel.icon;
              const inner = <div className="group flex items-center justify-between gap-4 border-b border-graphite-950/15 py-5 transition-colors hover:bg-white/60"><div className="flex items-center gap-4"><Icon size={18} strokeWidth={1.5} className="text-gold-600" /><div><p className="font-mono-tech text-[9px] tracking-[.14em] text-graphite-500">{t(`contacts.${channel.labelKey}`).toUpperCase()}</p><p className="mt-1 text-sm font-semibold text-graphite-950">{channel.value}</p></div></div>{channel.href && <ArrowUpRight size={16} className="text-graphite-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-600" />}</div>;
              return channel.href ? <a key={channel.labelKey} href={channel.href} target={channel.href.startsWith('http') ? '_blank' : undefined} rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}>{inner}</a> : <div key={channel.labelKey}>{inner}</div>;
            })}
          </div>
          <div className="mt-8 flex items-start gap-3 text-sm leading-relaxed text-graphite-600"><Fingerprint size={17} className="mt-0.5 shrink-0 text-gold-600" /><span>{t('common.nif')}: <strong className="font-semibold text-graphite-950">{COMPANY.nif}</strong></span></div>
          <a href={getWhatsAppLink(locale)} target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-graphite-950 text-xs font-bold tracking-[.08em] text-graphite-950 hover:border-gold-600 hover:text-gold-600">{t('contacts.talkWhatsApp')} <ArrowUpRight size={15} /></a>
        </Reveal>

        <Reveal delay={.1} className="border-t-2 border-graphite-950 bg-white p-5 shadow-[10px_10px_0_#d6dbcf] sm:p-10 sm:shadow-[18px_18px_0_#d6dbcf]">
          <div className="mb-9 flex items-end justify-between gap-5"><div><p className="font-mono-tech text-[10px] font-medium tracking-[.16em] text-gold-600">{t('contacts.quoteEyebrow')}</p><h2 className="mt-3 font-display text-3xl font-bold leading-[.95] tracking-tighter text-graphite-950">{t('contacts.quoteTitle')}</h2></div><span className="hidden shrink-0 whitespace-nowrap font-mono-tech text-[10px] text-graphite-400 sm:inline-block">01 — 03</span></div>
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  </main>;
}
