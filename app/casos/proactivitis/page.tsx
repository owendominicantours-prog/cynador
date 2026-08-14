import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Database, Search, ShoppingCart, Workflow } from 'lucide-react';
import { CTA } from '@/components/CTA';
import { projects } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Caso Proactivitis: plataforma y SEO a escala',
  description: 'Cómo Cynador construyó una plataforma turística con reservas, operación y más de 60,000 URLs indexadas que genera ventas orgánicas.',
  alternates: { canonical: '/casos/proactivitis' },
};

export default function ProactivitisCasePage() {
  const project = projects[0];
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Caso Proactivitis: de operación turística a plataforma de demanda', author: { '@type': 'Organization', name: 'Cynador' }, about: ['SEO programático', 'Desarrollo web', 'Reservas turísticas'] };
  return (
    <main className="interior-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="interior-hero case-hero"><div className="wrap"><span className="kicker">Caso de estudio · Proactivitis</span><h1>De operación turística a <em>infraestructura de demanda.</em></h1><p>Proactivitis demuestra qué ocurre cuando una web deja de ser una presentación y se convierte en catálogo, vendedor, canal SEO y sistema operativo.</p><div className="case-metrics wide">{project.metrics?.map((metric) => <div key={metric.label}><b>{metric.value}</b><span>{metric.label}</span></div>)}</div><p className="metric-disclaimer">Métricas operativas actuales compartidas por Proactivitis. Los resultados varían por mercado, inversión y ejecución.</p></div></section>
      <section className="section"><div className="wrap case-story-grid"><div><span className="kicker">El desafío</span><h2>Vender cientos de experiencias sin depender de una sola página.</h2></div><div><p>El turismo contiene miles de combinaciones: destino, actividad, idioma, intención, traslado, disponibilidad y tipo de viajero. Una web corporativa tradicional no podía capturar esa demanda ni organizar toda la oferta.</p><p>La solución necesitaba funcionar para el viajero, para Google y para la operación al mismo tiempo.</p></div></div></section>
      <section className="section soft-dark-section"><div className="wrap system-grid">{[[Database,'Modelo de datos','Productos, destinos, variantes, precios y relaciones administrables.'],[Search,'Arquitectura SEO','Rutas comerciales, hubs, canonicals, sitemaps y contenido a escala.'],[ShoppingCart,'Reserva y venta','Catálogo, disponibilidad, checkout, pagos y seguimiento.'],[Workflow,'Operación conectada','Automatizaciones, correos, soporte y procesos internos.']].map(([Icon,title,text]) => { const I = Icon as typeof Database; return <article key={String(title)}><I /><h3>{String(title)}</h3><p>{String(text)}</p></article>; })}</div></section>
      <section className="section"><div className="wrap project-detail-image"><div className="browser-bar"><i /><i /><i /><span>proactivitis.com</span></div><Image src={project.image} width={1440} height={900} alt="Homepage de Proactivitis" /></div></section>
      <section className="section"><div className="wrap content-grid"><div><span className="kicker">Lo que cambió</span><h2>Un activo que trabaja incluso cuando nadie está publicando.</h2></div><div className="check-grid"><span><CheckCircle2 /> Cobertura orgánica de long tail</span><span><CheckCircle2 /> Venta directa sin comisión de OTA</span><span><CheckCircle2 /> Catálogo que puede crecer</span><span><CheckCircle2 /> Operación y captación conectadas</span></div></div><div className="wrap centered-action"><Link className="primary-btn" href="/contacto">Quiero construir un sistema serio <ArrowRight size={17} /></Link></div></section>
      <CTA />
    </main>
  );
}
