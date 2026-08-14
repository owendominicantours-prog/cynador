import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CTA } from '@/components/CTA';
import { getProject, projects } from '@/lib/site-data';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const project = getProject(slug); return project ? { title: project.name, description: project.summary, alternates: { canonical: `/proyectos/${slug}` }, openGraph: { images: [project.image] } } : {}; }

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <main className="interior-main">
      <section className="interior-hero"><div className="wrap"><span className="kicker">{project.category}</span><h1>{project.name}:<br /><em>un producto en producción.</em></h1><p>{project.summary}</p><div className="interior-actions"><a className="primary-btn" href={project.url} target="_blank" rel="noreferrer">Visitar proyecto <ArrowUpRight size={17} /></a>{project.slug === 'proactivitis' && <Link className="ghost-btn" href="/casos/proactivitis">Leer caso completo <ArrowRight size={17} /></Link>}</div></div></section>
      <section className="section"><div className="wrap project-detail-image"><div className="browser-bar"><i /><i /><i /><span>{project.url.replace('https://', '')}</span></div><Image src={project.image} width={1440} height={900} priority alt={`Captura de ${project.name}`} /></div></section>
      <section className="section soft-dark-section"><div className="wrap content-grid"><div><span className="kicker">Visión Cynador</span><h2>El diseño es solo la superficie.</h2><p>La entrega real conecta estrategia, estructura, rendimiento, contenido y una forma clara de convertir interés en una acción de negocio.</p></div><div className="check-grid"><span><CheckCircle2 /> Arquitectura comercial</span><span><CheckCircle2 /> Experiencia responsive</span><span><CheckCircle2 /> Base técnica para SEO</span><span><CheckCircle2 /> Despliegue y operación real</span></div></div></section>
      <CTA />
    </main>
  );
}
