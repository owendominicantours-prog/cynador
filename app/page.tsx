import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Braces,
  Check,
  ChevronRight,
  Code2,
  Gauge,
  Globe2,
  Layers3,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
  Smartphone,
} from 'lucide-react';
import { CTA } from '@/components/CTA';
import { JsonLd } from '@/components/JsonLd';
import { ProjectCard } from '@/components/ProjectCard';
import { industries, markets, proactivitisPlayStore, projects, services, totalProgrammaticPages } from '@/lib/site-data';
import { buildMetadata, itemListSchema, organizationId, projectsItemList, schemaGraph, servicesItemList, webPageSchema } from '@/lib/seo';

const homeTitle = 'Diseño web, desarrollo y SEO de alto nivel';
const homeDescription = 'Cynador construye páginas web premium, plataformas, aplicaciones y sistemas SEO para empresas que quieren convertirse en la referencia de su mercado.';

export const metadata: Metadata = buildMetadata({
  title: homeTitle,
  description: homeDescription,
  path: '/',
  keywords: ['agencia de marketing digital', 'diseño web premium', 'desarrollo web', 'agencia SEO', 'SEO programático', 'desarrollo de aplicaciones'],
});

const nodes = [
  { src: '/visuals/nodes/node-brand.png', label: 'MARCA', className: 'node-brand' },
  { src: '/visuals/nodes/node-web.png', label: 'WEB', className: 'node-web' },
  { src: '/visuals/nodes/node-search.png', label: 'GOOGLE', className: 'node-search' },
  { src: '/visuals/nodes/node-bookings.png', label: 'SISTEMAS', className: 'node-bookings' },
  { src: '/visuals/nodes/node-sales.png', label: 'VENTAS', className: 'node-sales' },
];

const process = [
  { number: '01', name: 'Descubrimos', text: 'Entendemos el negocio, la oferta, los datos y la oportunidad antes de dibujar una pantalla.' },
  { number: '02', name: 'Diseñamos', text: 'Creamos la arquitectura, el mensaje y la experiencia que justifican una decisión premium.' },
  { number: '03', name: 'Construimos', text: 'Desarrollamos código, contenido, integraciones y medición con una base que puede crecer.' },
  { number: '04', name: 'Escalamos', text: 'Activamos SEO, nuevas rutas e iteraciones usando señales reales del mercado.' },
];

export default function Home() {
  const featured = projects[0];

  return (
    <main>
      <JsonLd data={schemaGraph([
        webPageSchema({ path: '/', name: homeTitle, description: homeDescription, mainEntityId: organizationId, primaryImage: '/projects/proactivitis.png' }),
        itemListSchema({ path: '/', idSuffix: 'services', name: 'Servicios principales de Cynador', items: servicesItemList }),
        itemListSchema({ path: '/', idSuffix: 'featured-projects', name: 'Proyectos destacados de Cynador', items: projectsItemList.slice(0, 5) }),
      ])} />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="hero-stars" aria-hidden="true" />
        <div className="wrap hero-layout">
          <div className="hero-copy">
            <span className="eyebrow"><span className="live-dot" /> Digital business engine</span>
            <h1 id="hero-title">No hacemos<br /><span>páginas baratas.</span><br />Construimos <em>ventajas.</em></h1>
            <p>Diseño web, desarrollo y SEO para empresas que quieren convertirse en la referencia de su mercado.</p>
            <div className="hero-actions">
              <Link className="primary-btn" href="/contacto">Iniciar un proyecto <ArrowRight size={18} /></Link>
              <Link className="ghost-btn" href="/casos/proactivitis"><span className="play-dot">↗</span> Ver cómo escalamos Proactivitis</Link>
            </div>
            <div className="hero-qualifier">
              <span><b>No competimos por precio</b></span>
              <span>Cada proyecto se construye <b>a medida</b></span>
            </div>
          </div>

          <div className="engine" aria-label="Cynador conecta marca, web, posicionamiento, sistemas y ventas">
            <div className="engine-orbit orbit-one" />
            <div className="engine-orbit orbit-two" />
            <Image className="engine-core" src="/visuals/hero/cynador-engine-core.png" width={1100} height={1100} priority alt="Motor digital Cynador" />
            {nodes.map((node) => (
              <div className={`engine-node ${node.className}`} key={node.label}>
                <Image src={node.src} width={320} height={320} alt="" />
                <b>{node.label}</b>
              </div>
            ))}
          </div>

          <aside className="hero-metrics" aria-label="Capacidades">
            <div><b>01</b><span>ESTRATEGIA</span><svg viewBox="0 0 130 30"><path d="M2 25 18 20 31 21 47 12 62 16 77 8 92 11 110 3 128 6" /></svg></div>
            <div><b>02</b><span>DESARROLLO</span><svg viewBox="0 0 130 30"><path d="M2 26 18 24 31 18 47 20 62 9 77 13 92 8 110 10 128 2" /></svg></div>
            <div><b>03</b><span>CRECIMIENTO</span><svg viewBox="0 0 130 30"><path d="M2 27 18 26 31 23 47 20 62 18 77 12 92 14 110 5 128 1" /></svg></div>
          </aside>
        </div>
        <div className="hero-trust wrap">
          <span><BadgeCheck size={17} /> Estrategia antes de diseño</span>
          <span><Code2 size={17} /> Código propio y escalable</span>
          <span><Search size={17} /> SEO desde la arquitectura</span>
          <span><ShieldCheck size={17} /> Proyectos de inversión seria</span>
        </div>
      </section>

      <section className="section manifesto">
        <div className="wrap manifesto-grid">
          <div>
            <span className="kicker">La diferencia</span>
            <h2>Tu competencia tiene una web.<br />Nosotros construiremos tu <em>ventaja.</em></h2>
          </div>
          <p>Una página bonita puede llamar la atención. Una plataforma pensada como negocio conecta percepción, tecnología, demanda y conversión para producir valor durante años.</p>
        </div>
        <div className="wrap capability-line">
          {[
            [Globe2, 'Estrategia', 'Entender dónde se crea el valor.'],
            [Sparkles, 'Diseño', 'Hacer que el precio se sienta lógico.'],
            [Braces, 'Código', 'Convertir la visión en un activo.'],
            [BarChart3, 'Crecimiento', 'Capturar demanda de forma acumulativa.'],
          ].map(([Icon, title, text], index) => {
            const CapabilityIcon = Icon as typeof Globe2;
            return <article key={String(title)}><CapabilityIcon /><span className="cap-number">0{index + 1}</span><h3>{String(title)}</h3><p>{String(text)}</p></article>;
          })}
        </div>
      </section>

      <section className="section case-section">
        <div className="wrap case-grid">
          <div className="case-copy">
            <span className="kicker">Caso principal · Proactivitis</span>
            <h2>No construimos un sitio turístico.<br />Construimos una <em>máquina de demanda.</em></h2>
            <p>{featured.summary} La solución une catálogo, reservas, contenido, SEO programático, aplicación móvil y operación en un solo sistema.</p>
            <div className="case-metrics">
              {featured.metrics?.map((metric) => <div key={metric.label}><b>{metric.value}</b><span>{metric.label}</span></div>)}
            </div>
            <p className="metric-disclaimer">Resultados actuales informados por la operación de Proactivitis. No representan una garantía para otros proyectos.</p>
            <div className="case-links">
              <Link className="text-link" href="/casos/proactivitis">Estudiar el caso completo <ArrowRight size={17} /></Link>
              <a className="text-link play-link" href={proactivitisPlayStore} target="_blank" rel="noreferrer"><Smartphone size={16} /> Ver app en Google Play <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="case-browser">
            <div className="browser-bar"><i /><i /><i /><span>proactivitis.com</span></div>
            <Image src={featured.image} width={1440} height={900} alt="Plataforma Proactivitis desarrollada por Cynador" />
            <div className="case-badge"><span>Ecosistema digital</span><b>WEB + APP + SEO + RESERVAS</b></div>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="wrap section-head split-head">
          <div><span className="kicker">Lo que construimos</span><h2>Tres disciplinas.<br />Un solo estándar.</h2></div>
          <p>No administramos redes sociales. Diseñamos, desarrollamos y posicionamos activos digitales que el negocio puede controlar.</p>
        </div>
        <div className="wrap services-grid">
          {services.map((service, index) => (
            <Link className={`service-card service-${index + 1}`} href={`/servicios/${service.slug}`} key={service.slug}>
              <span className="service-top"><service.icon /><small>Proyecto a medida</small></span>
              <h3>{service.name}</h3>
              <p>{service.promise}</p>
              <ul>{service.deliverables.slice(0, 3).map((item) => <li key={item}><Check size={14} /> {item}</li>)}</ul>
              <span className="service-link">Explorar servicio <ArrowUpRight size={16} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section portfolio-section">
        <div className="wrap section-head split-head">
          <div><span className="kicker">Trabajo en producción</span><h2>Webs reales.<br />Negocios reales.</h2></div>
          <div><p>No presentamos conceptos que nunca salieron al mercado. Estas plataformas están activas y puedes visitarlas.</p><Link className="text-link" href="/proyectos">Ver todos los proyectos <ArrowRight size={16} /></Link></div>
        </div>
        <div className="wrap projects-grid">
          {projects.slice(0, 5).map((project, index) => <ProjectCard project={project} large={index === 0} key={project.slug} />)}
        </div>
      </section>

      <section className="section technology-section">
        <div className="wrap technology-grid">
          <div className="technology-copy">
            <span className="kicker">Tecnología con propósito</span>
            <h2>Diseñamos lo que otros dicen que es imposible.</h2>
            <p>La tecnología no se muestra para impresionar desarrolladores. Se selecciona para crear velocidad, control, automatización y capacidad de crecer.</p>
            <div className="tech-pills"><span>Next.js</span><span>TypeScript</span><span>APIs</span><span>Bases de datos</span><span>IA aplicada</span><span>Vercel</span></div>
          </div>
          <div className="technology-visual">
            <Image src="/visuals/sections/technology-stack.png" width={1800} height={900} alt="Capas de tecnología: experiencia, interfaz, código, datos e inteligencia artificial" />
            <div className="tech-labels"><span>EXPERIENCIA</span><span>INTERFAZ</span><span>CÓDIGO</span><span>DATOS</span><span>IA</span></div>
          </div>
        </div>
      </section>

      <section className="section seo-scale-section">
        <div className="wrap seo-scale-grid">
          <div>
            <span className="kicker">Cynador también compite</span>
            <h2>Una web no es una página.<br />Es un <em>territorio de búsqueda.</em></h2>
            <p>Esta plataforma conecta {services.length} servicios, {industries.length} industrias y {markets.length} mercados para cubrir {totalProgrammaticPages.toLocaleString('en-US')} oportunidades comerciales sin depender de una sola landing.</p>
            <Link className="primary-btn" href="/servicios/seo-programatico">Ver nuestra arquitectura SEO <ArrowRight size={17} /></Link>
          </div>
          <div className="seo-console">
            <div className="console-head"><span className="live-dot" /> SEO COVERAGE ENGINE <b>ONLINE</b></div>
            <div className="console-number">{totalProgrammaticPages.toLocaleString('en-US')}</div>
            <span className="console-label">rutas comerciales conectadas</span>
            <div className="console-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <div className="console-grid"><span><b>{services.length}</b> Servicios</span><span><b>{industries.length}</b> Industrias</span><span><b>{markets.length}</b> Mercados</span></div>
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="wrap section-head"><span className="kicker">Cómo trabajamos</span><h2>De una idea a un sistema<br />que puede vender.</h2></div>
        <div className="wrap process-grid">
          {process.map((step, index) => <article key={step.number}><b>{step.number}</b>{index < process.length - 1 && <ChevronRight className="process-arrow" />}<h3>{step.name}</h3><p>{step.text}</p></article>)}
        </div>
      </section>

      <section className="section global-section">
        <div className="wrap global-grid">
          <div>
            <span className="kicker">Origen local · Ambición global</span>
            <h2>Nacimos en República Dominicana.<br />Construimos para el mundo.</h2>
            <p>Entendemos el Caribe, los negocios internacionales y lo difícil que es vender confianza a distancia. Nuestra ubicación es un punto de partida, no una frontera.</p>
            <div className="global-points"><span><Gauge /> Rendimiento global</span><span><Globe2 /> Arquitectura multilingüe</span><span><Workflow /> Operación remota</span><span><Layers3 /> Sistemas a medida</span></div>
          </div>
          <div className="global-map"><Image src="/visuals/sections/global-network-punta-cana.png" width={1700} height={900} alt="Red digital global con origen en República Dominicana" /><span>REPÚBLICA DOMINICANA<i /></span></div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
