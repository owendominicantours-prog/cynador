import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="portal-cta">
      <div className="portal-visual" aria-hidden="true">
        <Image src="/visuals/sections/final-cta-portal.png" width={1600} height={1000} alt="" />
      </div>
      <div className="wrap portal-content">
        <span className="kicker">El siguiente sistema puede ser el tuyo</span>
        <h2>Tu negocio ya tiene potencial.<br />Ahora necesita una <em>ventaja.</em></h2>
        <p>Si buscas la opción más barata, no somos el equipo correcto. Si quieres construir un activo digital serio, conversemos.</p>
        <Link className="primary-btn" href="/contacto">Presentar mi proyecto <ArrowRight size={18} /></Link>
      </div>
    </section>
  );
}
