import type { Metadata } from 'next';
import { CTA } from '@/components/CTA';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Proyectos web en producción',
  description: 'Explora páginas, plataformas, sistemas de reserva y proyectos SEO construidos por Cynador y activos en producción.',
  alternates: { canonical: '/proyectos' },
};

export default function ProjectsPage() {
  return (
    <main className="interior-main">
      <section className="interior-hero"><div className="wrap"><span className="kicker">Trabajo activo</span><h1>No mostramos humo.<br />Mostramos lo que está <em>en producción.</em></h1><p>Plataformas, webs comerciales y sistemas creados por Cynador que hoy reciben usuarios, generan solicitudes y sostienen operaciones reales.</p></div></section>
      <section className="section"><div className="wrap projects-grid">{projects.map((project, index) => <ProjectCard project={project} large={index === 0} key={project.slug} />)}</div></section>
      <CTA />
    </main>
  );
}
