import type { MetadataRoute } from 'next';
import { industries, markets, projects, services, siteUrl, solutionPath } from '@/lib/site-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ['', '/servicios', '/proyectos', '/casos/proactivitis', '/nosotros', '/contacto'].map((path) => ({ url: `${siteUrl}${path}`, lastModified: now, changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const, priority: path === '' ? 1 : .8 }));
  const servicePages = services.map((service) => ({ url: `${siteUrl}/servicios/${service.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: .82 }));
  const projectPages = projects.map((project) => ({ url: `${siteUrl}/proyectos/${project.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: project.featured ? .85 : .68 }));
  const solutionPages = services.flatMap((service) => markets.flatMap((market) => industries.map((industry) => ({ url: `${siteUrl}${solutionPath(service, market, industry)}`, lastModified: now, changeFrequency: 'monthly' as const, priority: .62 }))));
  return [...staticPages, ...servicePages, ...projectPages, ...solutionPages];
}
