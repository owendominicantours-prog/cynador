import crypto from 'crypto';
import type { NextRequest } from 'next/server';

export const CRM_COOKIE = 'cynador_crm_session';
export const CRM_SESSION_SECONDS = 12 * 60 * 60;

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function passwordMatches(password: string) {
  const expected = process.env.CRM_ADMIN_PASSWORD || '';
  return Boolean(expected) && safeEqual(password, expected);
}

export function createCrmSession() {
  const secret = process.env.CRM_SESSION_SECRET || '';
  const expiresAt = String(Date.now() + CRM_SESSION_SECONDS * 1000);
  const signature = crypto.createHmac('sha256', secret).update(expiresAt).digest('hex');
  return `${expiresAt}.${signature}`;
}

export function hasCrmSession(request: NextRequest) {
  const secret = process.env.CRM_SESSION_SECRET || '';
  if (!secret) return false;
  const token = request.cookies.get(CRM_COOKIE)?.value || '';
  const [expiresAt, signature] = token.split('.');
  if (!expiresAt || !signature || Number(expiresAt) <= Date.now()) return false;
  const expected = crypto.createHmac('sha256', secret).update(expiresAt).digest('hex');
  return safeEqual(signature, expected);
}

export const crmCookieOptions = {
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: CRM_SESSION_SECONDS,
};
