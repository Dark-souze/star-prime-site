import { PROJECTS } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';

const routes = ['', '/sobre', '/servicos', '/portfolio', '/contactos', '/privacidade', '/termos'];

export default function sitemap() {
  const base = getSiteUrl();
  const staticRoutes = routes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));

  const projectRoutes = PROJECTS.map((project) => ({
    url: `${base}/portfolio/${project.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
