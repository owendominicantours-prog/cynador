import { NextRequest, NextResponse } from 'next/server';
import { hasCrmSession } from '@/lib/crm-auth';

export async function GET(request: NextRequest) {
  return hasCrmSession(request)
    ? NextResponse.json({ authenticated: true })
    : NextResponse.json({ authenticated: false }, { status: 401 });
}
