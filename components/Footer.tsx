import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { Brand } from '@/components/Brand';
import { contactEmail, contactPhoneDisplay, services, whatsappUrl } from '@/lib/site-data';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main wrap">
        <div className="footer-brand">
          <Brand />
          <p>Digital business engine.</p>
          <span>Diseño. Desarrollo. SEO.</span>
        </div>
        <div>
          <b>Servicios</b>
          {services.slice(0, 5).map((service) => (
            <Link key={service.slug} href={`/servicios/${service.slug}`}>{service.shortName}</Link>
          ))}
        </div>
        <div>
          <b>Explorar</b>
          <Link href="/proyectos">Proyectos</Link>
          <Link href="/casos/proactivitis">Caso Proactivitis</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/contacto">Contacto</Link>
        </div>
        <div>
          <b>Contacto</b>
          <a href={`mailto:${contactEmail}`}><Mail size={14} /> {contactEmail}</a>
          <a href="tel:+18294756298"><Phone size={14} /> {contactPhoneDisplay}</a>
          <a href={`${whatsappUrl}?text=Hola%20Cynador%2C%20quiero%20hablar%20sobre%20un%20proyecto`} target="_blank" rel="noreferrer">WhatsApp directo <ArrowUpRight size={14} /></a>
          <span><MapPin size={14} /> República Dominicana</span>
          <Link href="/contacto">Hablar de un proyecto <ArrowUpRight size={14} /></Link>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <span>© 2026 CYNADOR. Todos los derechos reservados.</span>
        <span>Construimos desde el Caribe para el mundo.</span>
      </div>
    </footer>
  );
}
