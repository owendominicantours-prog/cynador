import type { Metadata } from 'next';
import { CheckCircle2, Clock3, Mail, MessageCircle } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { whatsappUrl } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Iniciar un proyecto web',
  description: 'Cuéntanos qué necesitas construir. Cynador trabaja diseño, desarrollo web y SEO con proyectos desde US$2,000.',
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
            <p>No vendemos manejo de redes, plantillas de US$500 ni páginas construidas en dos días. Nuestro trabajo comienza entendiendo el negocio.</p>
            <div className="checklist-stack">
              <span><CheckCircle2 /> Inversión web desde US$2,000</span>
              <span><CheckCircle2 /> Plataformas desde US$5,000</span>
              <span><Clock3 /> Respuesta habitual en un día laborable</span>
              <a href="mailto:hola@cynador.com"><Mail /> hola@cynador.com</a>
              <a href={`${whatsappUrl}?text=Hola%20Cynador%2C%20quiero%20hablar%20sobre%20un%20proyecto`} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp directo</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
