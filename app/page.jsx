'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll } from 'motion/react';
import Image from 'next/image';
import { ArrowUpRight, ArrowDownRight, ClipboardList, Hammer, HardHat, MapPin, Ruler } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import Reveal from '@/components/Reveal';
import ScrollImage from '@/components/ScrollImage';
import { useScrollValue } from '@/components/useScrollMotion';
import { COMPANY, SERVICES, PROJECTS, HERO_IMAGE, SOBRE_IMAGE } from '@/lib/content';
import { useT } from '@/components/LocaleProvider';
import { categoryKey } from '@/lib/i18n';

const icons = { projetos: ClipboardList, consultoria: Ruler, fiscalizacao: HardHat, construcao: Hammer };

function Label({ children, dark = false }) { return <p className={`mb-5 font-mono-tech text-[10px] font-medium tracking-[.18em] ${dark ? 'text-gold-300' : 'text-gold-600'}`}>{children}</p>; }

export default function Home() {
  const t = useT();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  // Ao descer: a fotografia desliza mais devagar do que a página e aproxima-se,
  // e o texto sobe e desvanece — o hero "fica para trás" ao ritmo do scroll.
  const heroImageY = useScrollValue(scrollYProgress, [0, 1], ['0%', '14%'], '0%');
  const heroImageScale = useScrollValue(scrollYProgress, [0, 1], [1, 1.08], 1);
  const heroTextY = useScrollValue(scrollYProgress, [0, 0.7], [0, -90], 0);
  const heroTextOpacity = useScrollValue(scrollYProgress, [0.1, 0.65], [1, 0], 1);

  return <main className="overflow-hidden">
    <section ref={heroRef} className="relative min-h-175 overflow-hidden bg-graphite-950 pt-19 text-off-white lg:min-h-190">
      <motion.div className="absolute inset-x-0 -top-[14%] bottom-0" style={{ y: heroImageY, scale: heroImageScale }}>
        <Image src={HERO_IMAGE} alt={t('home.heroAlt')} fill preload sizes="100vw" className="hero-settle object-cover object-center opacity-80" />
      </motion.div>
      <div className="image-shade absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-graphite-950 to-transparent" />
      <motion.div style={{ y: heroTextY, opacity: heroTextOpacity }} className="relative mx-auto flex min-h-156 max-w-360 flex-col justify-end px-5 pb-12 lg:min-h-171 lg:px-10 lg:pb-16">
        <div className="max-w-3xl">
          <Reveal immediate delay={0.15}><Label dark>{t('home.heroEyebrow')}</Label></Reveal>
          <Reveal immediate delay={0.25}><h1 className="max-w-3xl font-display text-[clamp(3rem,6.2vw,6.35rem)] font-bold leading-[.91] tracking-[-.065em]">{t('home.heroTitle')}</h1></Reveal>
          <Reveal immediate delay={0.4}><p className="mt-7 max-w-lg text-base leading-relaxed text-white/75">{t('home.heroDescription')}</p></Reveal>
          <Reveal immediate delay={0.52} className="mt-9 flex flex-wrap gap-3">
            <WhatsAppButton className="min-h-0! rounded-none! px-5! py-4!">{t('home.talkProject')}</WhatsAppButton>
            <Link href="/portfolio" className="group inline-flex items-center gap-3 border border-white/30 px-5 py-4 text-xs font-bold tracking-[.08em] text-white transition-colors duration-300 hover:border-white hover:bg-white/10">{t('home.viewPortfolio')} <ArrowUpRight size={16} className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/></Link>
          </Reveal>
        </div>
        <div className="mt-10 grid max-w-4xl grid-cols-3 gap-2 font-mono-tech text-[9px] tracking-[.07em] text-white/55 sm:text-[10px] sm:tracking-[.12em]">
          {['home.proofProjects', 'home.proofConstruction', 'home.proofInspection'].map((key, index) => (
            <Reveal immediate delay={0.7 + index * 0.08} key={key} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2"><span className="text-gold-300">0{index + 1}</span><span className="whitespace-nowrap">{t(key)}</span></Reveal>
          ))}
        </div>
      </motion.div>
    </section>

    <section className="site-grid bg-cream-50 px-5 py-20 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-360 gap-16 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
        <Reveal>
          <Label>{t('home.companyLabel')}</Label>
          <h2 className="font-display text-4xl font-bold leading-[.95] tracking-[-.055em] text-graphite-950 sm:text-5xl">{t('home.companyTitle')}</h2>
          <p className="mt-7 max-w-md leading-relaxed text-graphite-600">{t('about.qualityPolicy')}</p>
          <Link href="/sobre" className="mt-9 inline-flex items-center gap-2 border-b border-graphite-950 pb-2 text-xs font-bold tracking-[.08em] text-graphite-950 hover:text-gold-600 hover:border-gold-600">{t('home.aboutCompany')} <ArrowUpRight size={15}/></Link>
        </Reveal>
        <div className="space-y-2">
          {SERVICES.map((service, i) => { const Icon = icons[service.slug]; return <Reveal key={service.slug} delay={i * 0.08} className="group grid gap-5 py-7 transition-colors duration-300 hover:bg-white/60 sm:grid-cols-[64px_1fr_auto] sm:items-start lg:py-9">
            <span className="font-mono-tech text-xs text-gold-600">0{i + 1}</span><Icon size={26} strokeWidth={1.35} className="hidden text-gold-500 sm:block" />
            <div className="sm:col-start-2"><h3 className="font-display text-2xl font-bold tracking-[-.04em] text-graphite-950">{t(`services.items.${service.slug}.title`)}</h3><p className="mt-3 max-w-xl text-sm leading-relaxed text-graphite-600">{t(`services.items.${service.slug}.short`)}</p><p className="mt-2 text-xs text-graphite-500">{t(`services.items.${service.slug}.items.0`)} · {t(`services.items.${service.slug}.items.1`)}</p></div><ArrowDownRight className="hidden text-graphite-950 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1 sm:block" size={20}/>
          </Reveal>; })}
        </div>
      </div>
    </section>

    <section className="bg-graphite-950 px-5 py-20 text-off-white lg:px-10 lg:py-32">
      <div className="mx-auto max-w-360">
        <Reveal className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><Label dark>{t('home.selectedWorks')}</Label><h2 className="max-w-2xl font-display text-4xl font-bold leading-[.95] tracking-[-.055em] sm:text-5xl">{t('home.worksTitle')}</h2></div><Link href="/portfolio" className="inline-flex items-center gap-2 border-b border-white/40 pb-2 text-xs font-bold tracking-[.08em] hover:border-gold-300 hover:text-gold-300">{t('home.allProjects')} <ArrowUpRight size={15}/></Link></Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {PROJECTS.slice(0,3).map((project, i) => {
            const title = t(`project.${project.slug}.title`);
            return <Link key={project.id} href={`/portfolio/${project.slug}`} className={`group block ${i === 0 ? 'lg:col-span-7' : 'lg:col-span-5'}`}><ScrollImage className={`relative bg-graphite-800 ${i === 0 ? 'h-[260px] sm:h-[340px] lg:h-102.5' : 'h-[220px] sm:h-63.75'}`}><Image src={project.images[0]} alt={t('common.projectImage', { title })} fill sizes={i === 0 ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 42vw, 100vw'} className="project-image object-cover" /></ScrollImage><div className="flex items-start justify-between border-b border-white/20 py-5"><div><p className="font-mono-tech text-[10px] tracking-[.13em] text-gold-300">{t(categoryKey(project.category)).toUpperCase()}</p><h3 className="mt-2 font-display text-2xl font-bold tracking-[-.04em]">{title}</h3><p className="mt-2 flex items-center gap-1.5 text-xs text-white/55"><MapPin size={13}/>{project.location}</p><p className="mt-2 text-xs text-white/45">{t('common.projectOwner')}: {project.client}</p></div><ArrowUpRight className="mt-1 text-gold-300 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={20}/></div></Link>;
          })}
        </div>
      </div>
    </section>

    <section id="orcamento" className="bg-cream-100 px-5 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-310 gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
        <div className="group"><Reveal><Label>{t('home.firstContact')}</Label><h2 className="font-display text-4xl font-bold leading-[.95] tracking-[-.055em] text-graphite-950 sm:text-5xl">{t('home.quoteTitle')}</h2><p className="mt-7 max-w-sm leading-relaxed text-graphite-600">{t('home.quoteDescription')}</p></Reveal><ScrollImage className="relative mt-12 h-48 w-full sm:h-56"><Image src={SOBRE_IMAGE} alt={t('home.quoteImageAlt')} fill sizes="(min-width: 1024px) 34vw, 100vw" className="image-reveal-color object-cover" /></ScrollImage><p className="mt-5 text-xs text-graphite-500">{COMPANY.legalName}</p></div>
        <Reveal delay={0.15} className="border-t-2 border-graphite-950 bg-cream-50 p-5 shadow-[10px_10px_0_#d6dbcf] sm:p-10 sm:shadow-[20px_20px_0_#d6dbcf]"><QuoteForm /></Reveal>
      </div>
    </section>
  </main>;
}
