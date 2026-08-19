import { NextRequest, NextResponse } from 'next/server';
import { createCrmSession, CRM_COOKIE, crmCookieOptions, passwordMatches } from '@/lib/crm-auth';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  if (!passwordMatches(String(body.password || ''))) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return NextResponse.json({ error: 'Contraseña incorrecta.' }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(CRM_COOKIE, createCrmSession(), crmCookieOptions);
  return response;
}
