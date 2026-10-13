'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CircleCheck } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';
import LenisScrollContext from '@/components/LenisScrollContext';
import { OBRA_TYPES, DIMENSOES } from '@/lib/content';
import { useT } from '@/components/LocaleProvider';

const EASE_OUT = [0.16, 1, 0.3, 1];
// Os passos entram pelo lado para onde o utilizador avança (ou recua).
const stepMotion = {
  enter: (direction) => ({ opacity: 0, x: direction * 24 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE_OUT } },
  exit: (direction) => ({ opacity: 0, x: direction * -16, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }),
};

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [notificationWarning, setNotificationWarning] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [consent, setConsent] = useState(false);
  const t = useT();
  const scrollTo = useContext(LenisScrollContext);
  const [data, setData] = useState({ tipoObra: '', localizacao: '', dimensao: '', nome: '', contacto: '', website: '' });
  const startedAt = useRef(Date.now());
  const locationRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    if (step === 1) return undefined;

    let frame = 0;
    let attempts = 0;
    let cancelled = false;
    const focusTarget = () => {
      if (cancelled) return;
      const target = step === 2 ? locationRef.current : nameRef.current;
      if (!target) {
        if (attempts++ < 60) frame = window.requestAnimationFrame(focusTarget);
        return;
      }

      target.focus({ preventScroll: true });
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 0;
      scrollTo?.current?.(target, -(headerHeight + 48));
    };

    frame = window.requestAnimationFrame(focusTarget);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [step, scrollTo]);

  const update = (key, value) => setData((d) => ({ ...d, [key]: value }));
  const next = () => {
    setError('');
    setDirection(1);
    setStep((s) => Math.min(s + 1, 3));
  };
  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (data.website || Date.now() - startedAt.current < 900) return;

    if (!consent) {
      setError(t('quote.privacyRequired'));
      return;
    }

    setSending(true);
    setError('');

    try {
      const response = await fetch('/api/orcamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, consent, startedAt: startedAt.current }),
      });
      if (!response.ok) {
        const errorKey = response.status === 429
          ? 'quote.errors.rateLimited'
          : [400, 413, 422].includes(response.status)
            ? 'quote.errors.invalid'
            : response.status === 503
              ? 'quote.errors.unavailable'
              : 'quote.sendFailed';
        throw new Error(t(errorKey));
      }

      const result = await response.json().catch(() => ({}));
      setNotificationWarning(result.notificationStatus === 'failed');
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : t('quote.sendFailed'));
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE_OUT }} className="flex flex-col items-center gap-4 py-10 text-center" role="status" aria-live="polite">
        <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 380, damping: 22, delay: 0.1 }}><CircleCheck className="text-gold-500" size={40} /></motion.span>
        <h3 className="font-display text-2xl font-semibold text-graphite-950">{t('quote.successTitle')}</h3>
        <p className="max-w-sm text-graphite-600">{t('quote.successDescription')}</p>
        {notificationWarning && <p role="alert" className="max-w-sm text-sm leading-relaxed text-graphite-600">{t('quote.notificationFailed')}</p>}
        {!notificationWarning && <p className="max-w-sm text-sm leading-relaxed text-graphite-600">{t('quote.whatsappAlternative')}</p>}
        <WhatsAppButton className="mt-2">{t('quote.openWhatsApp')}</WhatsAppButton>
      </motion.div>
    );
  }

  return (
    <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); next(); }} className="w-full" autoComplete="on" aria-busy={sending} aria-label={t('quote.title')}>
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">{t('quote.websiteField')}</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => update('website', e.target.value)} />
      </div>
      <nav className="mb-8 flex items-center gap-2 font-mono-tech text-xs text-graphite-950/35" aria-label={t('quote.progress')}>
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-2">
            <span aria-current={step === n ? 'step' : undefined} className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] transition-colors duration-500 ${step >= n ? 'border-gold-500 bg-gold-400/10 text-gold-600' : 'border-graphite-950/15'}`}>{n}</span>
            {n < 3 && <span className="relative h-px w-8 overflow-hidden bg-graphite-950/10"><span className="absolute inset-0 origin-left bg-gold-500 transition-transform duration-500 ease-out" style={{ transform: `scaleX(${step > n ? 1 : 0})` }} /></span>}
          </div>
        ))}
      </nav>

      {error && <p role="alert" className="mb-6 border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-900">{error}</p>}

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        {step === 1 && (
          <motion.div key="s1" custom={direction} variants={stepMotion} initial="enter" animate="center" exit="exit">
            <fieldset>
              <legend className="mb-4 text-sm font-semibold text-graphite-700">{t('quote.workQuestion')}</legend>
            <div className="flex flex-wrap gap-2">
              {OBRA_TYPES.map((type, index) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => { update('tipoObra', type); next(); }}
                  aria-pressed={data.tipoObra === type}
                  className={`min-h-11 rounded-xs border px-4 py-3 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 ${data.tipoObra === type ? 'border-gold-500 bg-gold-400 text-graphite-950' : 'border-graphite-950/15 text-graphite-700 hover:border-graphite-950/40 hover:bg-white'}`}
                >
                  {t(`quote.workTypes.${index}`)}
                </button>
              ))}
            </div>
            </fieldset>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" custom={direction} variants={stepMotion} initial="enter" animate="center" exit="exit" className="space-y-5">
            <div>
              <label htmlFor="localizacao" className="mb-2 block text-sm font-semibold text-graphite-700">{t('quote.location')}</label>
              <input
                id="localizacao"
                name="localizacao"
                ref={locationRef}
                required
                value={data.localizacao}
                onChange={(e) => update('localizacao', e.target.value)}
                onInvalid={(e) => e.currentTarget.setCustomValidity(t('quote.locationInvalid'))}
                onInput={(e) => e.currentTarget.setCustomValidity('')}
                placeholder={t('quote.locationPlaceholder')}
                maxLength={120}
                className="w-full rounded-xl border border-graphite-950/15 bg-cream-50 px-4 py-3 text-base text-graphite-950 placeholder:text-graphite-950/30 outline-none transition-colors focus:border-gold-500/60 focus-visible:ring-2 focus-visible:ring-gold-500/30 sm:text-sm"
              />
            </div>
            <div>
              <fieldset>
                <legend className="mb-2 text-sm font-semibold text-graphite-700">{t('quote.size')}</legend>
              <div className="flex flex-wrap gap-2">
                {DIMENSOES.map((dimension, index) => (
                  <button
                    type="button"
                    key={dimension}
                    onClick={() => update('dimensao', dimension)}
                    aria-pressed={data.dimensao === dimension}
                    className={`min-h-11 rounded-xs border px-4 py-2.5 text-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 ${data.dimensao === dimension ? 'border-gold-500 bg-gold-400 text-graphite-950' : 'border-graphite-950/15 text-graphite-700 hover:border-graphite-950/40 hover:bg-white'}`}
                  >
                    {t(`quote.sizes.${index}`)}
                  </button>
                ))}
              </div>
              </fieldset>
            </div>
            <div className="flex justify-between pt-2">
              <button type="button" onClick={back} className="inline-flex min-h-11 items-center rounded-sm px-1 text-sm text-graphite-600 hover:text-graphite-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2">← {t('quote.back')}</button>
              <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-3 rounded-md bg-gold-400 px-4 py-2 text-[11px] font-bold tracking-[0.09em] text-graphite-950 transition-colors hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2">{t('quote.continue')} <ArrowRight size={15} /></button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" custom={direction} variants={stepMotion} initial="enter" animate="center" exit="exit" className="space-y-5">
            <div>
              <label htmlFor="nome" className="mb-2 block text-sm font-semibold text-graphite-700">{t('quote.name')}</label>
              <input
                id="nome"
                name="nome"
                ref={nameRef}
                required
                value={data.nome}
                onChange={(e) => update('nome', e.target.value)}
                onInvalid={(e) => e.currentTarget.setCustomValidity(t('quote.nameInvalid'))}
                onInput={(e) => e.currentTarget.setCustomValidity('')}
                autoComplete="name"
                maxLength={100}
                className="w-full rounded-xl border border-graphite-950/15 bg-cream-50 px-4 py-3 text-base text-graphite-950 outline-none focus:border-gold-500/60 focus-visible:ring-2 focus-visible:ring-gold-500/30 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="contacto" className="mb-2 block text-sm font-semibold text-graphite-700">{t('quote.phone')}</label>
              <input
                id="contacto"
                name="contacto"
                required
                value={data.contacto}
                onChange={(e) => update('contacto', e.target.value)}
                onInvalid={(e) => e.currentTarget.setCustomValidity(t('quote.phoneInvalid'))}
                onInput={(e) => e.currentTarget.setCustomValidity('')}
                placeholder="+244"
                autoComplete="tel"
                inputMode="tel"
                maxLength={30}
                className="w-full rounded-xl border border-graphite-950/15 bg-cream-50 px-4 py-3 text-base text-graphite-950 placeholder:text-graphite-950/30 outline-none focus:border-gold-500/60 focus-visible:ring-2 focus-visible:ring-gold-500/30 sm:text-sm"
              />
            </div>
            <label htmlFor="consent" className="flex items-start gap-3 text-xs leading-relaxed text-graphite-600">
              <input id="consent" name="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#bd8b13]" />
              <span>{t('quote.consent')} <Link href="/privacidade" className="font-semibold text-graphite-950 underline decoration-gold-500 underline-offset-2 hover:text-gold-600">{t('quote.privacy')}</Link>.</span>
            </label>
            <div className="flex justify-between pt-2">
              <button type="button" onClick={back} className="inline-flex min-h-11 items-center rounded-sm px-1 text-sm text-graphite-600 hover:text-graphite-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2">← {t('quote.back')}</button>
              <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xs bg-gold-400 px-6 py-3 text-[11px] font-bold tracking-[0.09em] text-graphite-950 transition-colors hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45" disabled={sending} aria-busy={sending}>
                {sending ? t('quote.sending') : t('quote.send')} <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
