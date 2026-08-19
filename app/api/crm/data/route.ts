import { NextRequest, NextResponse } from 'next/server';
import { hasCrmSession } from '@/lib/crm-auth';
import { readCrmData, writeCrmData, type CrmData } from '@/lib/crm-store';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  if (!hasCrmSession(request)) return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  return NextResponse.json({ data: await readCrmData() });
}

export async function PUT(request: NextRequest) {
  if (!hasCrmSession(request)) return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  try {
    const body = await request.json() as { data?: CrmData };
    if (!body.data || typeof body.data !== 'object') {
      return NextResponse.json({ error: 'Datos inválidos.' }, { status: 400 });
    }
    return NextResponse.json({ data: await writeCrmData(body.data) });
  } catch (error) {
    console.error('CRM save failed', error);
    return NextResponse.json({ error: 'No se pudo guardar el CRM.' }, { status: 500 });
  }
}
