import { NextResponse } from 'next/server';
import { CRM_COOKIE, crmCookieOptions } from '@/lib/crm-auth';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(CRM_COOKIE, '', { ...crmCookieOptions, maxAge: 0 });
  return response;
}
