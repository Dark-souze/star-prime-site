// Company and portfolio content transcribed and adapted from the 2026 portfolio.
// Do not add project dates, areas, durations, or other metrics without confirmation.

export const COMPANY = {
  name: 'Star Prime',
  legalName: 'Star Prime, Engenharia e Construção, Lda.',
  tagline: 'Engenharia, construção e fiscalização de obras.',
  phone: '+244 923 647 909',
  phoneRaw: '244923647909',
  email: 'info@starprime.ao',
  address: 'Talatona, Edifício Masuika, Bloco B, Escritório n.º 19',
  location: 'Luanda, Angola',
  website: 'https://www.starprime.ao',
  nif: '5000970506',
};

export function buildWhatsAppLink(message) {
  return `https://wa.me/${COMPANY.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppLink(locale = 'pt') {
  return buildWhatsAppLink(locale === 'en'
    ? 'Hello. I would like to speak with Star Prime about an engineering, construction or site supervision project.'
    : 'Olá. Gostaria de falar com a Star Prime sobre um projeto de engenharia, construção ou fiscalização.');
}

export const WHATSAPP_LINK = buildWhatsAppLink(
  'Olá. Gostaria de falar com a Star Prime sobre um projeto de engenharia, construção ou fiscalização.'
);

export const HERO_IMAGE = '/projects/residencia-t6-talatona/01.webp';
export const SOBRE_IMAGE = '/projects/condominio-100-casas/05.webp';

export const QUALITY_POLICY =
  'Trabalhamos para satisfazer os clientes e melhorar continuamente a qualidade, os custos e os prazos, com segurança para todas as pessoas envolvidas.';

export const COMPANY_PROFILE = [
  'A Star Prime, Engenharia e Construção, Lda. atua na gestão de projetos, consultoria, construção e fiscalização de obras.',
  'A equipa multidisciplinar reúne arquitetos, engenheiros e técnicos de diferentes especialidades para acompanhar as várias necessidades de cada projeto.',
  'A empresa destaca a atenção aos interesses do cliente, a capacidade de resposta às exigências do setor e o cumprimento de prazos.',
];

export const PILLARS = [
  { title: 'Equipa técnica qualificada', desc: 'Arquitetos, engenheiros e técnicos de várias especialidades.' },
  { title: 'Qualidade e economia', desc: 'Soluções construtivas orientadas para a qualidade e a economia.' },
  { title: 'Cumprimento de prazos', desc: 'Capacidade de resposta e atenção aos prazos do projeto.' },
  { title: 'Segurança', desc: 'Segurança para as pessoas envolvidas no processo.' },
  { title: 'Acompanhamento', desc: 'Feedback dos serviços e acompanhamento da execução.' },
  { title: 'Construção limpa', desc: 'A limpeza da obra é um dos compromissos destacados pela empresa.' },
  { title: 'Respaldo jurídico e garantia', desc: 'O portfólio destaca respaldo jurídico e garantia dos serviços executados.' },
];

export const NAV_LINKS = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Portfólio', href: '/portfolio' },
  { label: 'Contactos', href: '/contactos' },
];

export const SERVICES = [
  {
    slug: 'projetos',
    title: 'Projetos de arquitetura e engenharia',
    short: 'Projetos detalhados e coordenação das diferentes especialidades técnicas.',
    items: [
      'Arquitetura, estabilidade, eletricidade, hidráulica e AVAC',
      'Estruturas e fundações',
      'Abastecimento de água, saneamento e águas pluviais',
      'Abastecimento de gás',
      'Segurança contra incêndios e instalações mecânicas',
      'Instalações elétricas e telecomunicações',
      'Infraestruturas e vias de comunicação',
      'Coordenação da execução de projetos e elaboração de especificações',
      'Preparação de documentos para concurso',
      'Medições e estimativas de custo',
      'Análise e comparação de propostas',
    ],
  },
  {
    slug: 'consultoria',
    title: 'Consultoria e avaliações técnicas',
    short: 'Revisão, análise e verificação técnica de projetos e terrenos.',
    items: [
      'Revisão técnica de projetos de arquitetura e engenharia',
      'Verificação e certificação de projetos de engenharia',
      'Levantamentos topográficos',
      'Levantamentos fotográficos aéreos e ortofotográficos',
      'Decoração de interiores',
      'Arquitetura paisagística e urbanismo',
    ],
  },
  {
    slug: 'fiscalizacao',
    title: 'Supervisão e fiscalização de obras',
    short: 'Acompanhamento técnico da execução, do progresso e da qualidade dos trabalhos.',
    items: [
      'Revisão das peças escritas e desenhadas dos projetos',
      'Análise e emissão de relatórios de progresso',
      'Execução ou acompanhamento de testes de qualidade',
      'Inspeções diárias às atividades da obra',
      'Análise de trabalhos adicionais e recomendações ao dono da obra',
      'Certificação dos trabalhos e recomendações de pagamento',
      'Emissão de autos de receção provisória e definitiva',
      'Controlo da execução da obra',
    ],
  },
  {
    slug: 'construcao',
    title: 'Construção e reabilitação',
    short: 'Acompanhamento global do projeto e da execução, incluindo construção e reabilitação.',
    items: [
      'Construção de residências e habitação unifamiliar',
      'Reabilitação de edifícios e instalações',
      'Trabalho global de projeto e execução',
      'Soluções construtivas acompanhadas por uma equipa técnica',
    ],
  },
];

export const PROJECTS = [
  {
    id: 1,
    slug: 'residencia-t6-talatona',
    title: 'Construção de residência unifamiliar T6',
    category: 'Construção',
    location: 'Talatona',
    client: 'STEERQ – Comércio Geral e Prestação de Serviço',
    description: 'Construção de uma residência unifamiliar T6 em Talatona.',
    images: [1, 2, 3, 4].map((number) => `/projects/residencia-t6-talatona/${String(number).padStart(2, '0')}.webp`),
  },
  {
    id: 2,
    slug: 'hotel-dikanza-bengo',
    title: 'Reabilitação das bombas de combustível e loja de conveniência do Hotel Dikanza',
    category: 'Reabilitação',
    location: 'Via Expressa, Bengo',
    client: 'Caixa Social das FAA',
    description: 'Reabilitação das bombas de combustível e da loja de conveniência do Hotel Dikanza.',
    images: [1, 2, 3, 4].map((number) => `/projects/hotel-dikanza-bengo/${String(number).padStart(2, '0')}.webp`),
  },
  {
    id: 3,
    slug: 'casino-caungula',
    title: 'Reabilitação de um casino em Caungula',
    category: 'Reabilitação',
    location: 'Caungula, Lunda-Norte',
    client: 'FAS – Instituto de Desenvolvimento Local',
    description: 'Reabilitação de um casino no município de Caungula, província da Lunda-Norte.',
    images: [1, 2, 3].map((number) => `/projects/casino-caungula/${String(number).padStart(2, '0')}.webp`),
  },
  {
    id: 4,
    slug: 'residencia-general-pedro-maria-tonha',
    title: 'Reabilitação da viúva do Malogrado General Pedro Maria Tonha',
    category: 'Reabilitação',
    location: 'Luanda',
    client: 'Caixa Social das FAA',
    description: 'Projeto apresentado no portfólio com este título e associado à Caixa Social das FAA, em Luanda.',
    images: [1, 2, 3, 4].map((number) => `/projects/residencia-general-pedro-maria-tonha/${String(number).padStart(2, '0')}.webp`),
  },
  {
    id: 5,
    slug: 'condominio-100-casas',
    title: 'Construção de habitação unifamiliar em banda – Condomínio das 100 Casas',
    category: 'Construção',
    location: 'Via Expressa',
    client: 'Instituto de Segurança Social das FAA',
    description: 'Contrato de construção de habitação unifamiliar em banda no Condomínio das 100 Casas.',
    images: [1, 2, 3, 4, 5].map((number) => `/projects/condominio-100-casas/${String(number).padStart(2, '0')}.webp`),
  },
  {
    id: 6,
    slug: 'lounge-bar-mavunda',
    title: 'Reabilitação do Lounge-Bar Mavunda',
    category: 'Reabilitação',
    location: 'Benfica',
    client: 'Ministério da Defesa',
    description: 'Reabilitação do Lounge-Bar Mavunda, em Benfica.',
    images: [1, 2, 3, 4, 5].map((number) => `/projects/lounge-bar-mavunda/${String(number).padStart(2, '0')}.webp`),
  },
  {
    id: 7,
    slug: 'casa-passagem-luau',
    title: 'Conceção e reabilitação da Casa de Passagem do Luau',
    category: 'Reabilitação',
    location: 'Luau, Moxico',
    client: 'Agência Geral Tributária (AGT)',
    description: 'Empreitada de conceção e reabilitação da Casa de Passagem do Luau, no Moxico.',
    images: [1, 2, 3, 4].map((number) => `/projects/casa-passagem-luau/${String(number).padStart(2, '0')}.webp`),
  },
];

export const FILTERS = ['Todos', 'Construção', 'Reabilitação'];
export const OBRA_TYPES = ['Construção', 'Reabilitação', 'Projetos e consultoria', 'Supervisão e fiscalização', 'Outro'];
export const DIMENSOES = ['Até 150 m²', '150 – 400 m²', '400 – 1000 m²', 'Mais de 1000 m²', 'Não sei ao certo'];

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug);
}
