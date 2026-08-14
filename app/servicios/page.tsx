import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { CTA } from '@/components/CTA';
import { JsonLd } from '@/components/JsonLd';
import { services } from '@/lib/site-data';
import { absoluteUrl, breadcrumbSchema, buildMetadata, itemListSchema, schemaGraph, servicesItemList, webPageSchema } from '@/lib/seo';

const title = 'Diseño web, desarrollo y SEO';
const description = 'Servicios de diseño web premium, desarrollo Next.js, plataformas, aplicaciones, e-commerce, SEO técnico y SEO programático.';
export const metadata: Metadata = buildMetadata({ title, description, path: '/servicios', keywords: ['servicios de diseño web', 'desarrollo Next.js', 'SEO técnico', 'SEO programático', 'plataformas web'] });

export default function ServicesPage() {
  return (
    <main className="interior-main">
      <JsonLd data={schemaGraph([
        webPageSchema({ path: '/servicios', name: title, description, type: 'CollectionPage', mainEntityId: `${absoluteUrl('/servicios')}#itemlist` }),
        breadcrumbSchema('/servicios', [{ name: 'Inicio', path: '/' }, { name: 'Servicios', path: '/servicios' }]),
        itemListSchema({ path: '/servicios', name: 'Servicios de Cynador', items: servicesItemList }),
      ])} />
      <section className="interior-hero"><div className="wrap"><span className="kicker">Capacidades</span><h1>Diseñamos, desarrollamos y posicionamos <em>activos digitales.</em></h1><p>No necesitas seis proveedores desconectados. Necesitas una visión que sobreviva desde la estrategia hasta el código y desde el lanzamiento hasta Google.</p></div></section>
      <section className="section"><div className="wrap services-grid">
        {services.map((service, index) => <Link className={`service-card service-${index + 1}`} href={`/servicios/${service.slug}`} key={service.slug}><span className="service-top"><service.icon /><small>Proyecto a medida</small></span><h3>{service.name}</h3><p>{service.description}</p><ul>{service.deliverables.map((item) => <li key={item}><Check size={14} /> {item}</li>)}</ul><span className="service-link">Ver alcance <ArrowRight size={16} /></span></Link>)}
      </div></section>
      <CTA />
    </main>
  );
}
