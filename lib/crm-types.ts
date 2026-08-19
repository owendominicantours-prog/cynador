export type LeadStage = 'new' | 'contacted' | 'proposal' | 'negotiation' | 'won' | 'lost';
export type ProjectStatus = 'planning' | 'design' | 'development' | 'review' | 'live' | 'paused';
export type TaskStatus = 'pending' | 'doing' | 'done';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export type CrmLead = {
  id: string; name: string; company: string; email: string; phone: string;
  service: string; budget: string; details: string; source: string;
  stage: LeadStage; value: number; nextAction: string; createdAt: string; updatedAt: string;
};

export type CrmClient = {
  id: string; name: string; company: string; email: string; phone: string;
  website: string; notes: string; status: 'active' | 'inactive'; createdAt: string;
};

export type CrmProject = {
  id: string; name: string; client: string; status: ProjectStatus; budget: number;
  paid: number; progress: number; dueDate: string; owner: string; notes: string; createdAt: string;
};

export type CrmTask = {
  id: string; title: string; project: string; assignee: string;
  priority: 'low' | 'medium' | 'high'; status: TaskStatus; dueDate: string; createdAt: string;
};

export type CrmInvoice = {
  id: string; number: string; client: string; project: string; amount: number;
  status: InvoiceStatus; dueDate: string; createdAt: string;
};

export type CrmActivity = { id: string; type: string; message: string; createdAt: string };

export type CrmData = {
  leads: CrmLead[]; clients: CrmClient[]; projects: CrmProject[]; tasks: CrmTask[];
  invoices: CrmInvoice[]; activities: CrmActivity[]; updatedAt: string;
};

export function emptyCrmData(): CrmData {
  return {
    leads: [], clients: [], projects: [], tasks: [], invoices: [], activities: [],
    updatedAt: new Date().toISOString(),
  };
}
