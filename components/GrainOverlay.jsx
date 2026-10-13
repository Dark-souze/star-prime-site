// Textura de grão renderizada uma vez como mosaico de 160px, em vez de um filtro SVG
// a ocupar o ecrã inteiro — mesmo aspeto, bem menos trabalho para o browser.
const NOISE_TILE = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999] opacity-[0.035] mix-blend-overlay"
      style={{ backgroundImage: NOISE_TILE, backgroundSize: '160px 160px' }}
    />
  );
}
