import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CheckCircle2, Database, Search, ShoppingCart, Smartphone, Workflow } from 'lucide-react';
import { CTA } from '@/components/CTA';
import { JsonLd } from '@/components/JsonLd';
import { proactivitisPlayStore, projects } from '@/lib/site-data';
import { absoluteUrl, breadcrumbSchema, buildMetadata, organizationId, pageId, schemaGraph, websiteId, webPageSchema } from '@/lib/seo';

const title = 'Caso Proactivitis: plataforma, app Android y SEO a escala';
const description = 'Cómo Cynador construyó para Proactivitis una plataforma turística, una app Android, reservas y una arquitectura SEO de gran escala.';
const casePath = '/casos/proactivitis';
export const metadata: Metadata = buildMetadata({ title, description, path: casePath, image: '/projects/proactivitis.png', type: 'article', keywords: ['caso de éxito SEO', 'Proactivitis app', 'SEO programático turismo', 'plataforma de reservas'] });

export default function ProactivitisCasePage() {
  const project = projects[0];
  const articleId = `${absoluteUrl(casePath)}#article`;
  const mobileAppId = `${proactivitisPlayStore}#application`;
  const webAppId = `${project.url}/#webapplication`;
  return (
    <main className="interior-main">
      <JsonLd data={schemaGraph([
        webPageSchema({ path: casePath, name: title, description, mainEntityId: articleId, primaryImage: project.image }),
        breadcrumbSchema(casePath, [{ name: 'Inicio', path: '/' }, { name: 'Proyectos', path: '/proyectos' }, { name: 'Caso Proactivitis', path: casePath }]),
        {
          '@type': 'Article',
          '@id': articleId,
          headline: 'Caso Proactivitis: de operación turística a ecosistema digital',
          description,
          image: absoluteUrl(project.image),
          datePublished: '2026-08-14T00:18:52-04:00',
          dateModified: '2026-08-14T00:41:59-04:00',
          author: { '@id': organizationId },
          publisher: { '@id': organizationId },
          isPartOf: { '@id': websiteId },
          mainEntityOfPage: { '@id': pageId(casePath) },
          about: { '@id': webAppId },
          mentions: [{ '@id': mobileAppId }, { '@id': webAppId }],
          inLanguage: 'es',
        },
        {
          '@type': 'MobileApplication',
          '@id': mobileAppId,
          name: 'Proactivitis',
          operatingSystem: 'Android',
          applicationCategory: 'TravelApplication',
          url: proactivitisPlayStore,
          creator: { '@id': organizationId },
        },
        {
          '@type': 'WebApplication',
          '@id': webAppId,
          name: 'Proactivitis',
          url: project.url,
          applicationCategory: 'TravelApplication',
          browserRequirements: 'Requires JavaScript and a modern web browser',
          creator: { '@id': organizationId },
        },
      ])} />
      <section className="interior-hero case-hero"><div className="wrap"><span className="kicker">Caso de estudio · Proactivitis</span><h1>De operación turística a <em>ecosistema digital.</em></h1><p>Proactivitis demuestra qué ocurre cuando una web deja de ser una presentación y se convierte en plataforma, aplicación Android, catálogo, vendedor, canal SEO y sistema operativo.</p><div className="case-metrics wide">{project.metrics?.map((metric) => <div key={metric.label}><b>{metric.value}</b><span>{metric.label}</span></div>)}</div><p className="metric-disclaimer">Métricas operativas actuales compartidas por Proactivitis. Los resultados varían por mercado, inversión y ejecución.</p></div></section>
      <section className="section"><div className="wrap case-story-grid"><div><span className="kicker">El desafío</span><h2>Vender cientos de experiencias sin depender de una sola página.</h2></div><div><p>El turismo contiene miles de combinaciones: destino, actividad, idioma, intención, traslado, disponibilidad y tipo de viajero. Una web corporativa tradicional no podía capturar esa demanda ni organizar toda la oferta.</p><p>La solución necesitaba funcionar para el viajero, para Google y para la operación al mismo tiempo.</p></div></div></section>
      <section className="section soft-dark-section"><div className="wrap system-grid">{[[Database,'Modelo de datos','Productos, destinos, variantes, precios y relaciones administrables.'],[Search,'Arquitectura SEO','Rutas comerciales, hubs, canonicals, sitemaps y contenido a escala.'],[ShoppingCart,'Reserva y venta','Catálogo, disponibilidad, checkout, pagos y seguimiento.'],[Workflow,'Operación conectada','Automatizaciones, correos, soporte y procesos internos.']].map(([Icon,title,text]) => { const I = Icon as typeof Database; return <article key={String(title)}><I /><h3>{String(title)}</h3><p>{String(text)}</p></article>; })}</div></section>
      <section className="section app-proof-section"><div className="wrap app-proof-grid"><div><span className="kicker">Producto móvil publicado</span><h2>La plataforma también vive en <em>Google Play.</em></h2><p>Cynador desarrolló la aplicación Android oficial de Proactivitis para extender el ecosistema más allá del navegador y acercar las experiencias al viajero desde su teléfono.</p><a className="primary-btn" href={proactivitisPlayStore} target="_blank" rel="noreferrer">Ver Proactivitis en Google Play <ArrowUpRight size={17} /></a></div><a className="play-store-card" href={proactivitisPlayStore} target="_blank" rel="noreferrer" aria-label="Abrir Proactivitis en Google Play"><span className="play-phone"><Smartphone /></span><small>Aplicación oficial</small><h3>Proactivitis</h3><p>Experiencias, tours y operación turística en una aplicación Android publicada.</p><span className="play-badge">Disponible en Google Play <ArrowRight size={15} /></span></a></div></section>
      <section className="section"><div className="wrap project-detail-image"><div className="browser-bar"><i /><i /><i /><span>proactivitis.com</span></div><Image src={project.image} width={1440} height={900} alt="Homepage de Proactivitis" /></div></section>
      <section className="section"><div className="wrap content-grid"><div><span className="kicker">Lo que cambió</span><h2>Un activo que trabaja incluso cuando nadie está publicando.</h2></div><div className="check-grid"><span><CheckCircle2 /> Cobertura orgánica de long tail</span><span><CheckCircle2 /> Venta directa sin comisión de OTA</span><span><CheckCircle2 /> Catálogo que puede crecer</span><span><CheckCircle2 /> Operación y captación conectadas</span></div></div><div className="wrap centered-action"><Link className="primary-btn" href="/contacto">Quiero construir un sistema serio <ArrowRight size={17} /></Link></div></section>
      <CTA />
    </main>
  );
}
