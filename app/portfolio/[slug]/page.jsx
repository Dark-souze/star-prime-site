import { notFound } from 'next/navigation';
import { COMPANY, getProjectBySlug, PROJECTS } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';
import ProjectContent from './ProjectContent';

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Projeto não encontrado | Star Prime', robots: { index: false, follow: false } };

  const title = `${project.title} | Star Prime`;
  const description = `${project.description} Dono da obra: ${project.client}. Localização: ${project.location}.`;
  return {
    title,
    description,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title,
      description,
      url: `/portfolio/${project.slug}`,
      siteName: COMPANY.name,
      locale: 'pt_AO',
      type: 'article',
      images: [{ url: project.images[0], alt: project.title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [project.images[0]] },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const siteUrl = getSiteUrl();
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Portfólio', item: `${siteUrl}/portfolio` },
      { '@type': 'ListItem', position: 3, name: project.title, item: `${siteUrl}/portfolio/${project.slug}` },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ProjectContent project={project} />
    </main>
  );
}
