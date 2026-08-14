import type { Metadata } from 'next';
import { CheckCircle2, Clock3, Mail, MessageCircle, Phone } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { contactPhoneDisplay, whatsappUrl } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Iniciar un proyecto web',
  description: 'Cuéntanos qué necesitas construir. Cynador trabaja diseño, desarrollo web y SEO para empresas que buscan una solución premium.',
  alternates: { canonical: '/contacto' },
};

export default function ContactPage() {
  return (
    <main className="interior-main">
      <section className="interior-hero">
        <div className="wrap">
          <span className="kicker">Iniciar un proyecto</span>
          <h1>Hablemos de lo que tu empresa puede <em>llegar a ser.</em></h1>
          <p>Cuéntanos el objetivo, no solo las páginas que imaginas. Te responderemos con una conversación honesta sobre estrategia, alcance e inversión.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap contact-page-grid">
          <div>
            <span className="kicker">Antes de escribir</span>
            <h2>Elegimos proyectos donde podemos crear una diferencia real.</h2>
            <p>No vendemos manejo de redes, plantillas de bajo costo ni páginas construidas en dos días. Si el criterio principal es encontrar el menor precio, no somos el equipo adecuado.</p>
            <div className="checklist-stack">
              <span><CheckCircle2 /> Proyectos digitales de inversión seria</span>
              <span><CheckCircle2 /> Alcance y propuesta completamente a medida</span>
              <span><Clock3 /> Respuesta habitual en un día laborable</span>
              <a href="mailto:hola@cynador.com"><Mail /> hola@cynador.com</a>
              <a href="tel:+18294756298"><Phone /> {contactPhoneDisplay}</a>
              <a href={`${whatsappUrl}?text=Hola%20Cynador%2C%20quiero%20hablar%20sobre%20un%20proyecto`} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp directo</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
