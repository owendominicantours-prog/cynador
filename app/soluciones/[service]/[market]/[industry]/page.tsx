import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, CircleDollarSign, Gauge, Search, ShieldCheck } from 'lucide-react';
import { CTA } from '@/components/CTA';
import { JsonLd } from '@/components/JsonLd';
import { contactPhoneE164, getIndustry, getMarket, getService, industries, markets, services, solutionPath } from '@/lib/site-data';
import { absoluteUrl, breadcrumbSchema, buildMetadata, pageId, schemaGraph, serviceSchema, webPageSchema } from '@/lib/seo';

type Props = { params: Promise<{ service: string; market: string; industry: string }> };

export function generateStaticParams() {
  return services.flatMap((service) => markets.flatMap((market) => industries.map((industry) => ({ service: service.slug, market: market.slug, industry: industry.slug }))));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const values = await params;
  const service = getService(values.service);
  const market = getMarket(values.market);
  const industry = getIndustry(values.industry);
  if (!service || !market || !industry) return {};
  const title = `${service.shortName} para ${industry.name} en ${market.name}`;
  const description = `${service.name} para ${industry.name.toLowerCase()} en ${market.name}. Estrategia, diseño, desarrollo y SEO premium orientados a ${industry.conversion}.`;
  return buildMetadata({
    title,
    description,
    path: solutionPath(service, market, industry),
    keywords: [title, `${service.shortName} ${market.name}`, `${service.shortName} para ${industry.name}`, `agencia web ${market.name}`],
  });
}

export default async function SolutionPage({ params }: Props) {
  const values = await params;
  const service = getService(values.service);
  const market = getMarket(values.market);
  const industry = getIndustry(values.industry);
  if (!service || !market || !industry) notFound();

  const path = solutionPath(service, market, industry);
  const serviceId = `${absoluteUrl(path)}#service`;
  const faqId = `${absoluteUrl(path)}#faq`;
  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const relatedIndustries = industries.filter((item) => item.slug !== industry.slug).slice(0, 4);
  const relatedMarkets = markets.filter((item) => item.slug !== market.slug && item.region === market.region).slice(0, 4);
  const faqs = [
    { question: `¿Qué inversión requiere ${service.shortName.toLowerCase()} para ${industry.name.toLowerCase()} en ${market.name}?`, answer: `Cynador no publica una tarifa estándar porque cada solución se define por estrategia, contenido, integraciones, idiomas, migración y complejidad operativa. No competimos en el mercado de páginas económicas; preparamos una propuesta después del diagnóstico.` },
    { question: `¿Cynador necesita estar físicamente en ${market.name}?`, answer: `No. Nuestro proceso es remoto y documentado. Trabajamos desde República Dominicana con empresas de distintos mercados, usando reuniones estratégicas, prototipos y entregas verificables.` },
    { question: `¿La solución incluye SEO para ${market.name}?`, answer: `La arquitectura técnica, el rendimiento, los metadatos y la indexación forman parte de la base. Una estrategia continua de contenidos y autoridad se define según la competencia y los objetivos.` },
    { question: `¿En cuánto tiempo puede estar listo el proyecto?`, answer: `Una web premium suele requerir entre 6 y 12 semanas. Plataformas e integraciones complejas se planifican por fases para proteger calidad, presupuesto y salida al mercado.` },
  ];
  const solutionTitle = `${service.shortName} para ${industry.name} en ${market.name}`;
  const solutionDescription = `${service.description} Una solución especializada para ${industry.name.toLowerCase()} que buscan ${industry.conversion} en ${market.name}.`;

  return (
    <main className="interior-main solution-page">
      <JsonLd data={schemaGraph([
        {
          ...webPageSchema({ path, name: solutionTitle, description: solutionDescription, mainEntityId: serviceId }),
          hasPart: { '@id': faqId },
        },
        breadcrumbSchema(path, [{ name: 'Inicio', path: '/' }, { name: 'Servicios', path: '/servicios' }, { name: service.name, path: `/servicios/${service.slug}` }, { name: `${industry.name} en ${market.name}`, path }]),
        {
          ...serviceSchema({ path, name: solutionTitle, description: solutionDescription, audience: industry.name, areaServed: market.name }),
          category: service.name,
          availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl: absoluteUrl(path),
            servicePhone: { '@type': 'ContactPoint', telephone: contactPhoneE164, contactType: 'sales' },
          },
        },
        {
          '@type': 'FAQPage',
          '@id': faqId,
          url: absoluteUrl(path),
          isPartOf: { '@id': pageId(path) },
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        },
      ])} />
      <section className="interior-hero solution-hero">
        <div className="wrap">
          <nav className="breadcrumbs" aria-label="Migas de pan"><Link href="/">Cynador</Link><span>/</span><Link href={`/servicios/${service.slug}`}>{service.shortName}</Link><span>/</span><span>{market.name}</span></nav>
          <span className="kicker">{service.eyebrow} · {market.region}</span>
          <h1>{service.shortName} para<br />{industry.name.toLowerCase()} en <em>{market.name}.</em></h1>
          <p>Construimos una presencia capaz de resolver {industry.challenge} y convertir interés en {industry.conversion}. Diseñada para {market.angle}.</p>
          <div className="interior-actions"><Link className="primary-btn" href={`/contacto?servicio=${service.slug}&mercado=${market.slug}&industria=${industry.slug}`}>Evaluar mi proyecto <ArrowRight size={17} /></Link><span className="price-chip"><b>Selección limitada de proyectos</b></span></div>
        </div>
      </section>

      <section className="section"><div className="wrap solution-intro-grid"><div><span className="kicker">El contexto</span><h2>Una plantilla no entiende el mercado de {market.name}.</h2></div><div><p>Una empresa de {industry.name.toLowerCase()} no necesita únicamente verse moderna. Necesita explicar por qué confiar, presentar su oferta con claridad y eliminar fricción antes de pedir una llamada, una reserva o un pago.</p><p>En {market.name}, la oportunidad consiste en {market.angle}. Por eso la estrategia combina el enfoque de {service.name.toLowerCase()} con {industry.proof}.</p></div></div></section>

      <section className="section soft-dark-section"><div className="wrap content-grid"><div><span className="kicker">El sistema</span><h2>Qué construiremos para convertir demanda en {industry.conversion}.</h2><p>El alcance se adapta a la empresa, pero estas son las capas que sostienen la propuesta.</p></div><div className="rich-list">{service.deliverables.map((deliverable, index) => <article key={deliverable}><h3>0{index + 1} · {deliverable}</h3><p>{index === 0 ? `Definimos cómo debe presentarse un ${industry.singular} para competir en ${market.name} sin reducir la conversación al precio.` : index === 1 ? `Construimos la experiencia en ${market.language}, con jerarquía, velocidad y llamadas a la acción conectadas a ${industry.conversion}.` : index === 2 ? `Integramos las herramientas necesarias para que la captación no termine en procesos manuales desconectados.` : `Medimos el comportamiento, protegemos la indexación y dejamos una base preparada para nuevas rutas, idiomas y ofertas.`}</p></article>)}</div></div></section>

      <section className="section"><div className="wrap section-head"><span className="kicker">Estándar Cynador</span><h2>No buscamos entregar páginas.<br />Buscamos producir una ventaja.</h2></div><div className="wrap system-grid"><article><Gauge /><h3>Rendimiento</h3><p>Una experiencia rápida en móvil y escritorio, incluso para usuarios internacionales.</p></article><article><Search /><h3>Descubrimiento</h3><p>Arquitectura semántica para que Google entienda servicios, zonas e intención comercial.</p></article><article><ShieldCheck /><h3>Confianza</h3><p>Diseño, prueba y contenido capaces de sostener una compra de alto valor.</p></article><article><CircleDollarSign /><h3>Conversión</h3><p>Una ruta clara desde la primera visita hasta {industry.conversion}.</p></article></div></section>

      <section className="section soft-dark-section"><div className="wrap content-grid"><div><span className="kicker">Inversión y proceso</span><h2>Un proyecto premium necesita decisiones premium.</h2><p>No publicamos una tarifa genérica porque no vendemos una plantilla repetida. La propuesta se define después de descubrir el alcance, los riesgos, las integraciones y el resultado esperado.</p></div><div className="check-grid">{service.outcomes.map((outcome) => <span key={outcome}><CheckCircle2 /> {outcome}</span>)}<span><CheckCircle2 /> Arquitectura preparada para crecer</span></div></div></section>

      <section className="section"><div className="wrap content-grid"><div><span className="kicker">Preguntas frecuentes</span><h2>Lo importante antes de comenzar.</h2></div><div className="faq-grid">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>

      <section className="section related-section"><div className="wrap"><span className="kicker">Arquitectura conectada</span><h2>Explora soluciones relacionadas.</h2><div className="related-columns"><div><b>Otros servicios para {industry.name.toLowerCase()}</b>{relatedServices.map((item) => <Link key={item.slug} href={solutionPath(item, market, industry)}>{item.shortName} en {market.name}<ArrowRight size={13} /></Link>)}</div><div><b>Otras industrias en {market.name}</b>{relatedIndustries.map((item) => <Link key={item.slug} href={solutionPath(service, market, item)}>{service.shortName} para {item.name.toLowerCase()}<ArrowRight size={13} /></Link>)}</div><div><b>Mercados relacionados</b>{(relatedMarkets.length ? relatedMarkets : markets.slice(0, 4)).map((item) => <Link key={item.slug} href={solutionPath(service, item, industry)}>{industry.name} en {item.name}<ArrowRight size={13} /></Link>)}</div></div></div></section>
      <CTA />
    </main>
  );
}
