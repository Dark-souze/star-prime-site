import 'lenis/dist/lenis.css';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import LocaleProvider from '@/components/LocaleProvider';
import SkipLink from '@/components/SkipLink';
import LenisProvider from '@/components/LenisProvider';
import GrainOverlay from '@/components/GrainOverlay';
import { COMPANY } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';

const siteUrl = getSiteUrl();
const isPreviewDeployment = process.env.VERCEL_ENV === 'preview';

export const metadata = {
  title: 'Star Prime — Engenharia e Construção',
  description: 'Gestão de projetos, consultoria, construção e fiscalização de obras. Contacte a Star Prime em Talatona, Luanda.',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  ...(isPreviewDeployment ? { robots: { index: false, follow: true } } : {}),
  openGraph: {
    title: 'Star Prime — Engenharia e Construção',
    description: 'Projetos de engenharia, construção, consultoria e fiscalização de obras em Angola.',
    url: '/',
    siteName: 'Star Prime',
    locale: 'pt_AO',
    type: 'website',
    images: [{ url: '/StarPrime-LOGO.jpg', width: 341, height: 165, alt: 'Star Prime Engenharia e Construção' }],
  },
  twitter: { card: 'summary_large_image', title: 'Star Prime — Engenharia e Construção', description: 'Projetos de engenharia, construção, consultoria e fiscalização de obras em Angola.' },
  icons: {
    icon: '/StarPrime-LOGO.png',
    shortcut: '/StarPrime-LOGO.png',
    apple: '/StarPrime-LOGO.png',
  },
};

export const viewport = {
  colorScheme: 'light',
  themeColor: '#293f50',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-AO">
      <body className="bg-cream-50 text-graphite-950 font-body antialiased selection:bg-gold-400 selection:text-graphite-950">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'GeneralContractor',
          name: COMPANY.legalName,
          url: siteUrl,
          logo: `${siteUrl}/StarPrime-LOGO.png`,
          email: COMPANY.email,
          telephone: COMPANY.phone,
          taxID: COMPANY.nif,
          address: {
            '@type': 'PostalAddress',
            streetAddress: COMPANY.address,
            addressLocality: 'Talatona, Luanda',
            addressCountry: 'AO',
          },
          areaServed: { '@type': 'Country', name: 'Angola' },
        }) }} />
        {/* Sem JavaScript, os elementos com entrada animada ficam visíveis de imediato. */}
        <noscript><style>{'[data-reveal]{opacity:1!important;clip-path:none!important;transform:none!important;animation:none!important}'}</style></noscript>
        <LocaleProvider>
          <GrainOverlay />
          <LenisProvider>
            <SkipLink />
            <Navbar />
            <div id="main-content">{children}</div>
            <Footer />
            <WhatsAppFloat />
          </LenisProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
