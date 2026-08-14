'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setMessage('');
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'No pudimos enviar el mensaje.');
      form.reset();
      setStatus('success');
      setMessage('Recibimos tu proyecto. Te responderemos directamente.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'No pudimos enviar el mensaje.');
    }
  }

  return (
    <form className={`contact-form${compact ? ' compact' : ''}`} onSubmit={submit}>
      <input name="website" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="field-row">
        <label>Nombre<input name="name" required minLength={2} placeholder="Tu nombre" /></label>
        <label>Empresa<input name="company" required minLength={2} placeholder="Nombre de la empresa" /></label>
      </div>
      <div className="field-row">
        <label>Email<input name="email" type="email" required placeholder="tu@empresa.com" /></label>
        <label>WhatsApp<input name="phone" required placeholder="+1 829 000 0000" /></label>
      </div>
      <div className="field-row">
        <label>Tipo de proyecto
          <select name="service" defaultValue="Diseño y desarrollo web">
            <option>Diseño y desarrollo web</option>
            <option>Plataforma o sistema web</option>
            <option>SEO técnico</option>
            <option>SEO programático</option>
            <option>E-commerce o reservas</option>
          </select>
        </label>
        <label>Inversión prevista
          <select name="budget" defaultValue="US$2,000 – US$5,000">
            <option>US$2,000 – US$5,000</option>
            <option>US$5,000 – US$10,000</option>
            <option>US$10,000+</option>
            <option>Necesito definirla</option>
          </select>
        </label>
      </div>
      <label>¿Qué necesitas construir?
        <textarea name="details" required minLength={20} rows={compact ? 4 : 6} placeholder="Cuéntanos qué vende tu empresa, qué existe hoy y qué resultado buscas." />
      </label>
      <button className="primary-btn full" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? <LoaderCircle className="spin" size={18} /> : <ArrowRight size={18} />}
        {status === 'sending' ? 'Enviando…' : 'Solicitar conversación estratégica'}
      </button>
      <p className="form-note">Trabajamos proyectos desde US$2,000. No ofrecemos manejo de redes sociales.</p>
      {message && <p className={`form-status ${status}`} role="status">{status === 'success' && <CheckCircle2 size={17} />}{message}</p>}
    </form>
  );
}
