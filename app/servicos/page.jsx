'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import ScrollImage from '@/components/ScrollImage';
import { useT } from '@/components/LocaleProvider';
import { SERVICES, PROJECTS } from '@/lib/content';
import { categoryKey } from '@/lib/i18n';

const SERVICE_PROJECTS = {
  projetos: { slug: 'residencia-t6-talatona', image: 1 },
  consultoria: { slug: 'lounge-bar-mavunda', image: 0 },
  fiscalizacao: { slug: 'casino-caungula', image: 0 },
  construcao: { slug: 'condominio-100-casas', image: 0 },
};

const PROJECTS_BY_SLUG = Object.fromEntries(PROJECTS.map((project) => [project.slug, project]));

function ProjectImage({ service, index, t }) {
  const selectedProject = SERVICE_PROJECTS[service.slug];
  const project = PROJECTS_BY_SLUG[selectedProject.slug];
  const image = project.images[selectedProject.image];
  const title = t(`project.${project.slug}.title`);

  return (
    <ScrollImage
      className="group relative aspect-4/3 bg-graphite-800 lg:aspect-square"
      overlay={<>
      <div className="absolute inset-0 bg-linear-to-t from-graphite-950/75 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 pb-4 text-[9px] font-medium tracking-[.15em] text-white sm:px-5 sm:pb-5">
        <span className="flex min-w-0 items-center gap-2 font-mono-tech">
          <span className="h-px w-5 shrink-0 bg-gold-300" />
          <span className="truncate">{project.location.toUpperCase()}</span>
          <span className="text-white/50">/</span>
          <span className="truncate">{t(categoryKey(project.category)).toUpperCase()}</span>
        </span>
        <span className="shrink-0 font-mono-tech text-gold-300">0{index + 1}</span>
      </div>
      </>}
    >
      <Image
        src={image}
        alt={t('common.projectImage', { title })}
        fill
        sizes="(min-width: 1024px) 42vw, 100vw"
        className="project-image object-cover"
      />
    </ScrollImage>
  );
}

export default function ServicosPage() {
  const t = useT();
  const heroProject = PROJECTS_BY_SLUG['residencia-t6-talatona'];

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-graphite-950 text-off-white">
        <ScrollImage reveal={false} parallax={10} className="absolute inset-0">
          <Image
            src={heroProject.images[1]}
            alt={t('common.projectImage', { title: t(`project.${heroProject.slug}.title`) })}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="hero-settle object-cover object-[58%_48%] opacity-70"
          />
        </ScrollImage>
        <div className="absolute inset-0 bg-linear-to-b from-graphite-950/60 via-graphite-950/80 to-graphite-950 lg:bg-linear-to-r lg:from-graphite-950 lg:via-graphite-950/85 lg:to-graphite-950/20" />

        <div className="relative mx-auto max-w-360 px-5 pb-0 pt-34 sm:px-8 lg:px-10 lg:pt-40">
          <div className="grid min-h-116 gap-10 pb-12 lg:min-h-136 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:pb-16">
            <Reveal immediate className="max-w-3xl">
              <p className="mb-6 flex items-center gap-3 font-mono-tech text-[10px] font-medium tracking-[.18em] text-gold-300">
                <span>{t('services.eyebrow')}</span><span className="h-px w-8 bg-gold-400/70" /><span className="text-white/65">{t('services.label')}</span>
              </p>
              <h1 className="max-w-3xl font-display text-[clamp(3.25rem,7.1vw,7.25rem)] font-bold leading-[.88] tracking-[-.07em] text-balance">
                {t('services.title')}
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                {t('services.intro')}
              </p>
            </Reveal>

            <Reveal immediate delay={0.12} className="hidden justify-self-end self-end pb-7 lg:block">
              <div className="flex items-end gap-4 border-l border-gold-400/60 pl-5">
                <span className="font-display text-7xl font-bold leading-none tracking-[-.08em] text-white/90">0{SERVICES.length}</span>
                <span className="max-w-28 pb-1 font-mono-tech text-[9px] leading-relaxed tracking-[.14em] text-white/60">{t('services.areaLabel')}</span>
              </div>
            </Reveal>
          </div>

          <nav aria-label={t('services.areaLabel')} className="grid grid-cols-2 border-t border-white/25 sm:grid-cols-4">
            {SERVICES.map((service, index) => (
              <a
                key={service.slug}
                href={`#servico-${service.slug}`}
                className="group flex min-h-24 items-start justify-between gap-3 border-b border-r border-white/15 px-3 py-4 transition-colors hover:bg-white/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-300 sm:min-h-28 sm:px-4 sm:py-5 lg:border-b-0 lg:px-5"
              >
                <span className="flex min-w-0 flex-col gap-2">
                  <span className="font-mono-tech text-[9px] tracking-[.16em] text-gold-300">0{index + 1}</span>
                  <span className="max-w-48 text-xs font-medium leading-snug text-white/85 transition-colors group-hover:text-white sm:text-sm">{t(`services.items.${service.slug}.title`)}</span>
                </span>
                <ArrowDown size={14} aria-hidden="true" className="mt-1 shrink-0 text-white/45 transition-transform duration-200 group-hover:translate-y-1 group-hover:text-gold-300" />
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="bg-cream-50">
        {SERVICES.map((service, index) => {
          const project = PROJECTS_BY_SLUG[SERVICE_PROJECTS[service.slug].slug];
          const imageFirstOnDesktop = index % 2 === 0;

          return (
            <section
              key={service.slug}
              id={`servico-${service.slug}`}
              aria-labelledby={`titulo-${service.slug}`}
              className={`scroll-mt-24 border-b border-graphite-950/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24 ${index % 2 ? 'bg-cream-100' : 'bg-cream-50'}`}
            >
              <div className="mx-auto grid max-w-360 items-center gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-24">
                <div className={imageFirstOnDesktop ? '' : 'lg:order-2'}>
                  <ProjectImage service={service} index={index} t={t} />
                </div>

                <Reveal delay={0.18} className={imageFirstOnDesktop ? '' : 'lg:order-1'}>
                  <article>
                    <div className="mb-5 flex items-center gap-3 font-mono-tech text-[10px] font-medium tracking-[.16em] text-gold-600">
                      <span>0{index + 1}</span><span className="h-px w-8 bg-gold-500/60" /><span>{t('services.scopeLabel')}</span>
                    </div>
                    <h2 id={`titulo-${service.slug}`} className="max-w-2xl font-display text-3xl font-bold leading-[.94] tracking-[-.055em] text-graphite-950 sm:text-4xl lg:text-5xl">
                      {t(`services.items.${service.slug}.title`)}
                    </h2>
                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-graphite-600 sm:text-base">
                      {t(`services.items.${service.slug}.short`)}
                    </p>

                    <div className="mt-8 border-t border-graphite-950/15 pt-3">
                      <ul className="grid gap-x-7 sm:grid-cols-2">
                        {service.items.map((_, itemIndex) => (
                          <li key={itemIndex} className="flex gap-3 border-b border-graphite-950/10 py-3 text-sm leading-relaxed text-graphite-700">
                            <span aria-hidden="true" className="mt-[.58rem] h-1 w-1 shrink-0 bg-gold-600" />
                            <span>{t(`services.items.${service.slug}.items.${itemIndex}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href={`/portfolio/${project.slug}`} className="group mt-6 inline-flex min-h-11 items-center gap-2 text-xs font-bold tracking-[.06em] text-graphite-950 transition-colors hover:text-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-4">
                      {t('services.viewProject')}<ArrowUpRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </article>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      <section className="bg-graphite-950 px-5 py-16 text-off-white sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Reveal className="mx-auto grid max-w-360 gap-8 border-t border-gold-400/50 pt-8 sm:pt-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <p className="mb-5 font-mono-tech text-[10px] font-medium tracking-[.16em] text-gold-300">{t('services.ctaEyebrow')}</p>
            <h2 className="max-w-3xl font-display text-3xl font-bold leading-[.95] tracking-[-.055em] sm:text-5xl">{t('services.ctaTitle')}</h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">{t('services.ctaDescription')}</p>
          </div>
          <Link href="/contactos" className="inline-flex min-h-12 w-fit items-center justify-center gap-3 bg-gold-400 px-5 py-3 text-[11px] font-bold tracking-[.08em] text-graphite-950 transition-colors hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950">
            {t('services.contactButton')}<ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
