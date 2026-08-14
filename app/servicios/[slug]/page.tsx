import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CTA } from '@/components/CTA';
import { getService, industries, markets, services } from '@/lib/site-data';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.name, description: service.description, alternates: { canonical: `/servicios/${service.slug}` } };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return (
    <main className="interior-main">
      <section className="interior-hero"><div className="wrap"><span className="kicker">{service.eyebrow}</span><h1>{service.name}:<br /><em>{service.promise}</em></h1><p>{service.description}</p><div className="interior-actions"><Link className="primary-btn" href="/contacto">Hablar de mi proyecto <ArrowRight size={17} /></Link><span className="price-chip"><b>Propuesta tras diagnóstico</b></span></div></div></section>
      <section className="section"><div className="wrap content-grid"><div><span className="kicker">Qué incluye</span><h2>Alcance con intención, no una lista inflada.</h2><p>Cada decisión debe servir al posicionamiento, la experiencia del cliente o la operación. Lo demás es ruido.</p></div><div className="rich-list">{service.deliverables.map((item, index) => <article key={item}><h3>0{index + 1} · {item}</h3><p>Se define y construye alrededor de los objetivos, restricciones y oportunidades reales de tu empresa.</p></article>)}</div></div></section>
      <section className="section soft-dark-section"><div className="wrap content-grid"><div><span className="kicker">Resultados buscados</span><h2>El producto debe cambiar algo en el negocio.</h2></div><div className="check-grid">{service.outcomes.map((outcome) => <span key={outcome}><CheckCircle2 /> {outcome}</span>)}</div></div></section>
      <section className="section"><div className="wrap section-head"><span className="kicker">Aplicaciones</span><h2>Especialización por industria y mercado.</h2><p>Explora algunas de las arquitecturas comerciales conectadas a este servicio.</p></div><div className="wrap link-cloud">{industries.slice(0, 6).flatMap((industry) => markets.slice(0, 3).map((market) => <Link key={`${industry.slug}-${market.slug}`} href={`/soluciones/${service.slug}/${market.slug}/${industry.slug}`}>{service.shortName} para {industry.name.toLowerCase()} en {market.name} <ArrowRight size={13} /></Link>))}</div></section>
      <CTA />
    </main>
  );
}
