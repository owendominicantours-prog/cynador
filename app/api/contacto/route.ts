import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

function clean(value: unknown, max = 2000) {
  return String(value || '').trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char] || char);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (clean(data.website)) return NextResponse.json({ ok: true });

    const name = clean(data.name, 120);
    const company = clean(data.company, 160);
    const email = clean(data.email, 180);
    const phone = clean(data.phone, 80);
    const service = clean(data.service, 160);
    const budget = clean(data.budget, 100);
    const details = clean(data.details, 4000);

    if (name.length < 2 || company.length < 2 || details.length < 20 || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Completa los datos del proyecto correctamente.' }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '');
    const to = process.env.CONTACT_TO_EMAIL || gmailUser;

    if (!gmailUser || !gmailPassword || !to) {
      return NextResponse.json({ error: 'El correo todavía no está configurado. Escríbenos por WhatsApp.' }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailPassword },
    });

    await transporter.sendMail({
      from: `"${process.env.CONTACT_FROM_NAME || 'Cynador Web'}" <${gmailUser}>`,
      to,
      replyTo: email,
      subject: `Nuevo proyecto Cynador — ${company}`,
      text: `Nombre: ${name}\nEmpresa: ${company}\nEmail: ${email}\nWhatsApp: ${phone}\nServicio: ${service}\nInversión: ${budget}\n\nProyecto:\n${details}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#0a1728"><h1>Nuevo proyecto para Cynador</h1><table style="width:100%;border-collapse:collapse"><tr><td><b>Nombre</b></td><td>${escapeHtml(name)}</td></tr><tr><td><b>Empresa</b></td><td>${escapeHtml(company)}</td></tr><tr><td><b>Email</b></td><td>${escapeHtml(email)}</td></tr><tr><td><b>WhatsApp</b></td><td>${escapeHtml(phone)}</td></tr><tr><td><b>Servicio</b></td><td>${escapeHtml(service)}</td></tr><tr><td><b>Inversión</b></td><td>${escapeHtml(budget)}</td></tr></table><h2>Proyecto</h2><p style="white-space:pre-wrap">${escapeHtml(details)}</p></div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const mailError = error as Error & { code?: string; command?: string; responseCode?: number };
    console.error('Cynador contact email failed', {
      code: mailError.code,
      command: mailError.command,
      responseCode: mailError.responseCode,
      message: mailError.message,
    });
    return NextResponse.json({ error: 'No pudimos enviar el mensaje. Inténtalo de nuevo.' }, { status: 500 });
  }
}
