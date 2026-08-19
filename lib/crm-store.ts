import { get, put } from '@vercel/blob';
import { emptyCrmData, type CrmActivity, type CrmClient, type CrmData, type CrmInvoice, type CrmLead, type CrmProject, type CrmTask } from './crm-types';

export type { CrmData, CrmLead } from './crm-types';

const CRM_BLOB_PATH = 'crm/cynador-agency.json';

function normalizeData(value: unknown): CrmData {
  const candidate = value && typeof value === 'object' ? value as Partial<CrmData> : {};
  const cleanArray = <T,>(items: unknown): T[] => Array.isArray(items) ? items.slice(0, 5000) as T[] : [];
  return {
    leads: cleanArray<CrmLead>(candidate.leads),
    clients: cleanArray<CrmClient>(candidate.clients),
    projects: cleanArray<CrmProject>(candidate.projects),
    tasks: cleanArray<CrmTask>(candidate.tasks),
    invoices: cleanArray<CrmInvoice>(candidate.invoices),
    activities: cleanArray<CrmActivity>(candidate.activities),
    updatedAt: typeof candidate.updatedAt === 'string' ? candidate.updatedAt : new Date().toISOString(),
  };
}

export async function readCrmData(): Promise<CrmData> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return emptyCrmData();
  try {
    const result = await get(CRM_BLOB_PATH, { access: 'private', useCache: false });
    if (!result || result.statusCode !== 200) return emptyCrmData();
    return normalizeData(JSON.parse(await new Response(result.stream).text()));
  } catch (error) {
    if ((error as { name?: string }).name !== 'BlobNotFoundError') {
      console.error('CRM read failed', error);
    }
    return emptyCrmData();
  }
}

export async function writeCrmData(value: CrmData): Promise<CrmData> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('CRM storage is not configured.');
  const data = normalizeData({ ...value, updatedAt: new Date().toISOString() });
  await put(CRM_BLOB_PATH, JSON.stringify(data), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
  });
  return data;
}

export async function addWebsiteLead(input: Omit<CrmLead, 'id' | 'stage' | 'value' | 'nextAction' | 'createdAt' | 'updatedAt'>) {
  const data = await readCrmData();
  const now = new Date().toISOString();
  const lead: CrmLead = {
    ...input,
    id: `lead-${crypto.randomUUID()}`,
    stage: 'new',
    value: 0,
    nextAction: 'Contactar y calificar el proyecto',
    createdAt: now,
    updatedAt: now,
  };
  data.leads.unshift(lead);
  data.activities.unshift({
    id: `activity-${crypto.randomUUID()}`,
    type: 'lead',
    message: `Nuevo prospecto desde la web: ${lead.company} — ${lead.name}`,
    createdAt: now,
  });
  await writeCrmData(data);
  return lead;
}
