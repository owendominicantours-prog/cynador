import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Brush,
  CheckCircle2,
  Code2,
  Globe2,
  Layers3,
  Megaphone,
  MessageCircle,
  PenTool,
  Phone,
  Search,
  ServerCog,
  Smartphone,
  Target,
} from 'lucide-react';

const whatsapp = 'https://wa.me/18295539900';

const services = [
  {
    icon: Code2,
    title: 'Diseno y desarrollo web',
    text: 'Paginas web claras, rapidas y preparadas para captar clientes desde Google, redes sociales y WhatsApp.',
    bullets: ['Web corporativa', 'Landing pages', 'Catalogos y formularios'],
  },
  {
    icon: Search,
    title: 'SEO y posicionamiento',
    text: 'Estructura, contenido y optimizacion local para que tu negocio pueda aparecer cuando el cliente busca.',
    bullets: ['SEO local', 'Contenido comercial', 'Google Business Profile'],
  },
  {
    icon: Megaphone,
    title: 'Publicidad digital',
    text: 'Campanas con mensajes claros, audiencias definidas y paginas listas para convertir trafico en oportunidades.',
    bullets: ['Google Ads', 'Meta Ads', 'Embudos de venta'],
  },
  {
    icon: Brush,
    title: 'Branding y diseno grafico',
    text: 'Identidad visual, piezas publicitarias y direccion creativa para que tu marca se vea seria y recordable.',
    bullets: ['Logo y manual basico', 'Creatividades', 'Material comercial'],
  },
  {
    icon: Smartphone,
    title: 'Redes sociales',
    text: 'Contenido, calendario y piezas enfocadas en explicar tu oferta y mantener presencia profesional.',
    bullets: ['Plan mensual', 'Diseno de posts', 'Contenido para reels'],
  },
  {
    icon: ServerCog,
    title: 'Hosting, soporte y mantenimiento',
    text: 'Acompanamiento tecnico para que tu web siga funcionando, cargue bien y se pueda actualizar sin caos.',
    bullets: ['Hosting', 'Dominio', 'Soporte tecnico'],
  },
];

const industries = [
  ['Turismo y excursiones', 'Landing pages, catalogos, reservas por WhatsApp y SEO local para destinos.'],
  ['Rent car y transporte', 'Flotas, vehiculos, rutas, formularios y paginas listas para solicitudes.'],
  ['Restaurantes y comercios', 'Menus digitales, Google Maps, promociones y presencia local clara.'],
  ['Servicios profesionales', 'Web seria, prueba de confianza, formularios y captacion de clientes.'],
];

const process = [
  ['01', 'Diagnostico', 'Revisamos tu negocio, oferta, competencia y canales actuales.'],
  ['02', 'Estrategia', 'Definimos estructura, mensaje, servicios, SEO y llamadas a la accion.'],
  ['03', 'Produccion', 'Disenamos, desarrollamos y dejamos tu presencia digital lista para operar.'],
  ['04', 'Mejora continua', 'Medimos, corregimos y agregamos contenido o campanas segun resultados.'],
];

const packages = [
  ['Presencia inicial', 'Para negocios que necesitan verse profesionales rapido.', 'Web base + WhatsApp + contacto'],
  ['Crecimiento local', 'Para empresas que quieren posicionarse y recibir mas solicitudes.', 'Web + SEO local + contenido'],
  ['Marketing completo', 'Para marcas que necesitan web, publicidad, redes y soporte.', 'Estrategia + campanas + soporte'],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Cynador inicio">
          <img src="/logo-cynador.png" alt="Cynador" />
        </a>
        <nav aria-label="Principal">
          <a href="#servicios">Servicios</a>
          <a href="#soluciones">Soluciones</a>
          <a href="#proceso">Proceso</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="header-cta" href={`${whatsapp}?text=Hola%20Cynador%2C%20quiero%20informacion%20sobre%20sus%20servicios`} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </header>

      <section id="inicio" className="hero">
        <div className="hero-bg" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><BadgeCheck size={16} /> Advertising, Marketing Online & Design</span>
            <h1>Una web clara para vender tus servicios sin explicar de mas.</h1>
            <p>
              Cynador crea paginas web, SEO, publicidad digital, branding y soporte para negocios que necesitan una
              presencia profesional, facil de entender y lista para convertir visitas en contactos reales.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#servicios">Ver servicios <ArrowRight size={18} /></a>
              <a className="secondary-btn" href={`${whatsapp}?text=Hola%20Cynador%2C%20quiero%20una%20propuesta%20para%20mi%20negocio`} target="_blank" rel="noreferrer">
                Pedir propuesta
              </a>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="panel-top">
              <span>Plan digital</span>
              <b>Web + SEO + Marketing</b>
            </div>
            <div className="panel-card active">
              <Globe2 />
              <div>
                <strong>Pagina web profesional</strong>
                <p>Estructura clara, rapida y enfocada en conversion.</p>
              </div>
            </div>
            <div className="panel-card">
              <Target />
              <div>
                <strong>Mensaje comercial</strong>
                <p>Textos pensados para explicar, generar confianza y vender.</p>
              </div>
            </div>
            <div className="panel-card">
              <BarChart3 />
              <div>
                <strong>Base para crecer</strong>
                <p>SEO, campanas, redes y soporte segun la etapa del negocio.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="trust-strip">
        <div className="wrap trust-grid">
          <article><Code2 /><strong>Desarrollo web</strong><span>Next.js, paginas rapidas y responsive</span></article>
          <article><Search /><strong>SEO local</strong><span>Contenido y estructura para Google</span></article>
          <article><MessageCircle /><strong>WhatsApp directo</strong><span>Flujos simples para captar clientes</span></article>
          <article><PenTool /><strong>Diseno comercial</strong><span>Marca clara, limpia y profesional</span></article>
        </div>
      </section>

      <section id="servicios" className="section">
        <div className="wrap section-head">
          <span className="kicker">Servicios independientes</span>
          <h2>Elige lo que necesitas ahora y escala cuando el negocio lo pida.</h2>
          <p>Cada servicio funciona por separado, pero tambien puede combinarse en un sistema completo de ventas digitales.</p>
        </div>
        <div className="wrap services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <service.icon />
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>
                {service.bullets.map((item) => <li key={item}><CheckCircle2 size={16} /> {item}</li>)}
              </ul>
              <a href={`${whatsapp}?text=Hola%20Cynador%2C%20quiero%20informacion%20sobre%20${encodeURIComponent(service.title)}`} target="_blank" rel="noreferrer">
                Cotizar servicio <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="soluciones" className="section soft-section">
        <div className="wrap split">
          <div>
            <span className="kicker">Soluciones reales</span>
            <h2>Especialistas en negocios que necesitan confianza antes de vender.</h2>
            <p>
              Trabajamos la web como una herramienta comercial: que el visitante entienda rapido quien eres, que vendes,
              por que confiar y como contactarte.
            </p>
            <div className="checklist">
              <span><CheckCircle2 /> Mensaje claro desde el primer scroll.</span>
              <span><CheckCircle2 /> Servicios separados y faciles de cotizar.</span>
              <span><CheckCircle2 /> Botones de WhatsApp y llamada visibles.</span>
              <span><CheckCircle2 /> Estructura preparada para crecer con SEO.</span>
            </div>
          </div>
          <div className="industry-grid">
            {industries.map(([title, text]) => (
              <article key={title}>
                <Layers3 />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap section-head">
          <span className="kicker">Formas de trabajar</span>
          <h2>Paquetes claros para no empezar a ciegas.</h2>
        </div>
        <div className="wrap package-grid">
          {packages.map(([title, text, detail]) => (
            <article className="package-card" key={title}>
              <span>{detail}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href={`${whatsapp}?text=Hola%20Cynador%2C%20quiero%20informacion%20sobre%20el%20plan%20${encodeURIComponent(title)}`} target="_blank" rel="noreferrer">
                Solicitar informacion
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="proceso" className="section process-section">
        <div className="wrap section-head center">
          <span className="kicker">Proceso</span>
          <h2>Orden para avanzar sin perder tiempo.</h2>
        </div>
        <div className="wrap process-grid">
          {process.map(([num, title, text]) => (
            <article key={num}>
              <b>{num}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contacto" className="section contact-section">
        <div className="wrap contact-grid">
          <div className="contact-copy">
            <span className="kicker">Contacto</span>
            <h2>Cuéntanos que negocio tienes y que necesitas vender.</h2>
            <p>
              Te podemos orientar con web, SEO, publicidad, redes, branding o soporte tecnico. El primer paso es entender
              tu oferta y el objetivo real.
            </p>
            <div className="contact-lines">
              <a href="tel:+18295539900"><Phone size={18} /> +1 (829) 553-9900</a>
              <a href={`${whatsapp}?text=Hola%20Cynador%2C%20quiero%20hablar%20sobre%20mi%20proyecto`} target="_blank" rel="noreferrer">
                <MessageCircle size={18} /> Escribir por WhatsApp
              </a>
            </div>
          </div>

          <form className="contact-form">
            <label>Nombre</label>
            <input placeholder="Tu nombre" />
            <label>WhatsApp</label>
            <input placeholder="+1 ..." />
            <label>Servicio</label>
            <select defaultValue="">
              <option value="" disabled>Selecciona una opcion</option>
              <option>Diseno y desarrollo web</option>
              <option>SEO y posicionamiento</option>
              <option>Publicidad digital</option>
              <option>Branding y diseno grafico</option>
              <option>Redes sociales</option>
              <option>Hosting y soporte</option>
            </select>
            <label>Mensaje</label>
            <textarea rows={5} placeholder="Describe brevemente tu negocio o idea" />
            <a className="primary-btn full" href={`${whatsapp}?text=Hola%20Cynador%2C%20quiero%20una%20propuesta%20para%20mi%20negocio`} target="_blank" rel="noreferrer">
              Enviar por WhatsApp <ArrowRight size={18} />
            </a>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <img src="/logo-cynador.png" alt="Cynador" />
          <p>Advertising, Marketing Online & Design - Diseno y Desarrollo Web.</p>
        </div>
        <div className="footer-links">
          <a href="#servicios">Servicios</a>
          <a href="#soluciones">Soluciones</a>
          <a href="#contacto">Contacto</a>
        </div>
        <p className="copyright">Copyright 2026 Cynador. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
