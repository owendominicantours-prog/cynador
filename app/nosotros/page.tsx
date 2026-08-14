import type { Metadata } from 'next';
import { Code2, Globe2, Search, ShieldCheck } from 'lucide-react';
import { CTA } from '@/components/CTA';

export const metadata: Metadata = { title: 'Sobre Cynador', description: 'Cynador es un estudio de diseño, desarrollo web y SEO nacido en República Dominicana y construido para competir globalmente.', alternates: { canonical: '/nosotros' } };

export default function AboutPage() {
  return (
    <main className="interior-main">
      <section className="interior-hero"><div className="wrap"><span className="kicker">Cynador · Digital business engine</span><h1>Pequeños por estructura.<br /><em>Enormes por ambición.</em></h1><p>Nacimos en República Dominicana con una convicción: desde el Caribe se pueden construir productos digitales capaces de competir con cualquier empresa del mundo.</p></div></section>
      <section className="section"><div className="wrap content-grid"><div><span className="kicker">Nuestra posición</span><h2>No vendemos horas. Construimos activos.</h2></div><div><p>Elegimos pocos tipos de trabajo y los llevamos lejos: identidad digital, producto web y crecimiento orgánico. Eso nos permite pensar como socios del negocio y no como una fábrica de tareas.</p><p>Trabajamos con empresas que valoran estrategia, calidad técnica y una relación directa con quienes toman las decisiones.</p></div></div></section>
      <section className="section soft-dark-section"><div className="wrap system-grid">{[[Globe2,'Visión comercial','El producto comienza en el modelo de negocio.'],[Code2,'Ejecución técnica','Construimos el código que sostiene la visión.'],[Search,'Crecimiento orgánico','Diseñamos para demanda acumulativa, no para ruido temporal.'],[ShieldCheck,'Responsabilidad','Decimos lo que sabemos, medimos lo que afirmamos y cuidamos el activo.']].map(([Icon,title,text]) => { const I = Icon as typeof Globe2; return <article key={String(title)}><I /><h3>{String(title)}</h3><p>{String(text)}</p></article>; })}</div></section>
      <CTA />
    </main>
  );
}
