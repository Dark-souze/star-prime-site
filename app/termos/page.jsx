import TermsContent from '@/app/termos/TermsContent';

export const metadata = {
  title: 'Termos de Utilização | Star Prime',
  description: 'Termos de utilização do site da Star Prime Engenharia e Construção Civil.',
  alternates: { canonical: '/termos' },
};

export default function TermosPage() {
  return <TermsContent />;
}
