import PrivacyContent from '@/app/privacidade/PrivacyContent';

export const metadata = {
  title: 'Política de Privacidade | Star Prime',
  description: 'Saiba como a Star Prime trata os dados enviados através do site e dos pedidos de orçamento.',
  alternates: { canonical: '/privacidade' },
};

export default function PrivacidadePage() {
  return <PrivacyContent />;
}
