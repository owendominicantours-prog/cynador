import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { Brand } from '@/components/Brand';
import { services } from '@/lib/site-data';

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
          <a href="mailto:hola@cynador.com"><Mail size={14} /> hola@cynador.com</a>
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
