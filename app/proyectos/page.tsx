import type { Metadata } from 'next';
import { CTA } from '@/components/CTA';
import { JsonLd } from '@/components/JsonLd';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/lib/site-data';
import { absoluteUrl, breadcrumbSchema, buildMetadata, itemListSchema, projectsItemList, schemaGraph, webPageSchema } from '@/lib/seo';

const title = 'Proyectos web en producción';
const description = 'Explora páginas, plataformas, aplicaciones, sistemas de reserva y proyectos SEO construidos por Cynador y activos en producción.';
export const metadata: Metadata = buildMetadata({ title, description, path: '/proyectos', keywords: ['portafolio desarrollo web', 'proyectos Next.js', 'casos SEO', 'plataformas digitales'] });

export default function ProjectsPage() {
  return (
    <main className="interior-main">
      <JsonLd data={schemaGraph([
        webPageSchema({ path: '/proyectos', name: title, description, type: 'CollectionPage', mainEntityId: `${absoluteUrl('/proyectos')}#itemlist` }),
        breadcrumbSchema('/proyectos', [{ name: 'Inicio', path: '/' }, { name: 'Proyectos', path: '/proyectos' }]),
        itemListSchema({ path: '/proyectos', name: 'Proyectos construidos por Cynador', items: projectsItemList }),
      ])} />
      <section className="interior-hero"><div className="wrap"><span className="kicker">Trabajo activo</span><h1>No mostramos humo.<br />Mostramos lo que está <em>en producción.</em></h1><p>Plataformas, webs comerciales y sistemas creados por Cynador que hoy reciben usuarios, generan solicitudes y sostienen operaciones reales.</p></div></section>
      <section className="section"><div className="wrap projects-grid">{projects.map((project, index) => <ProjectCard project={project} large={index === 0} key={project.slug} />)}</div></section>
      <CTA />
    </main>
  );
}
