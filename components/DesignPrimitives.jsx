export function InstagramIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function CornerMark({ className = '' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className} aria-hidden="true">
      <path d="M1 8V1H8" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function TechFrame({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <CornerMark className="absolute -top-px -left-px text-gold-500/70" />
      <CornerMark className="absolute -top-px -right-px text-gold-500/70 rotate-90" />
      <CornerMark className="absolute -bottom-px -left-px text-gold-500/70 -rotate-90" />
      <CornerMark className="absolute -bottom-px -right-px text-gold-500/70 rotate-180" />
      {children}
    </div>
  );
}

export function SectionEyebrow({ index, label }) {
  return (
    <div className="mb-5 flex items-center gap-3 font-mono-tech text-[10px] font-medium tracking-[0.16em] text-gold-600">
      <span>{index}</span><span className="h-px w-7 bg-gold-500/60" /><span className="text-graphite-600">{label}</span>
    </div>
  );
}

export function GradientBlob({ className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute rounded-full blur-[110px] ${className}`} />
  );
}
