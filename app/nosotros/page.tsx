import type { Metadata } from 'next';
import { Code2, Globe2, Search, ShieldCheck } from 'lucide-react';
import { CTA } from '@/components/CTA';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, buildMetadata, organizationId, schemaGraph, webPageSchema } from '@/lib/seo';

const title = 'Sobre Cynador';
const description = 'Cynador es una agencia de diseño, desarrollo web, aplicaciones y SEO nacida en República Dominicana y construida para competir globalmente.';
export const metadata: Metadata = buildMetadata({ title, description, path: '/nosotros', keywords: ['agencia Cynador', 'agencia de marketing República Dominicana', 'equipo desarrollo web', 'agencia SEO'] });

export default function AboutPage() {
  return (
    <main className="interior-main">
      <JsonLd data={schemaGraph([
        webPageSchema({ path: '/nosotros', name: title, description, type: 'AboutPage', mainEntityId: organizationId }),
        breadcrumbSchema('/nosotros', [{ name: 'Inicio', path: '/' }, { name: 'Nosotros', path: '/nosotros' }]),
      ])} />
      <section className="interior-hero"><div className="wrap"><span className="kicker">Cynador · Digital business engine</span><h1>Pequeños por estructura.<br /><em>Enormes por ambición.</em></h1><p>Nacimos en República Dominicana con una convicción: desde el Caribe se pueden construir productos digitales capaces de competir con cualquier empresa del mundo.</p></div></section>
      <section className="section"><div className="wrap content-grid"><div><span className="kicker">Nuestra posición</span><h2>No vendemos horas. Construimos activos.</h2></div><div><p>Elegimos pocos tipos de trabajo y los llevamos lejos: identidad digital, producto web y crecimiento orgánico. Eso nos permite pensar como socios del negocio y no como una fábrica de tareas.</p><p>Trabajamos con empresas que valoran estrategia, calidad técnica y una relación directa con quienes toman las decisiones.</p></div></div></section>
      <section className="section soft-dark-section"><div className="wrap system-grid">{[[Globe2,'Visión comercial','El producto comienza en el modelo de negocio.'],[Code2,'Ejecución técnica','Construimos el código que sostiene la visión.'],[Search,'Crecimiento orgánico','Diseñamos para demanda acumulativa, no para ruido temporal.'],[ShieldCheck,'Responsabilidad','Decimos lo que sabemos, medimos lo que afirmamos y cuidamos el activo.']].map(([Icon,title,text]) => { const I = Icon as typeof Globe2; return <article key={String(title)}><I /><h3>{String(title)}</h3><p>{String(text)}</p></article>; })}</div></section>
      <CTA />
    </main>
  );
}
