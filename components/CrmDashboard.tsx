'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Activity, BarChart3, BriefcaseBusiness, CheckCircle2, CircleDollarSign,
  Clock3, Download, FileText, LayoutDashboard, Loader2, LockKeyhole,
  LogOut, Menu, Plus, Search, Sparkles, Target, Trash2, UserRound,
  UsersRound, X,
} from 'lucide-react';
import { Brand } from '@/components/Brand';
import { emptyCrmData, type CrmData, type InvoiceStatus, type LeadStage, type ProjectStatus, type TaskStatus } from '@/lib/crm-types';

type Tab = 'dashboard' | 'leads' | 'clients' | 'projects' | 'tasks' | 'invoices';
type Collection = Exclude<Tab, 'dashboard'>;

const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Resumen', icon: LayoutDashboard },
  { id: 'leads', label: 'Prospectos', icon: Target },
  { id: 'clients', label: 'Clientes', icon: UsersRound },
  { id: 'projects', label: 'Proyectos', icon: BriefcaseBusiness },
  { id: 'tasks', label: 'Tareas', icon: CheckCircle2 },
  { id: 'invoices', label: 'Finanzas', icon: CircleDollarSign },
];

const leadStages: Record<LeadStage, string> = {
  new: 'Nuevo', contacted: 'Contactado', proposal: 'Propuesta', negotiation: 'Negociación', won: 'Ganado', lost: 'Perdido',
};
const projectStatuses: Record<ProjectStatus, string> = {
  planning: 'Planificación', design: 'Diseño', development: 'Desarrollo', review: 'Revisión', live: 'Publicado', paused: 'Pausado',
};
const taskStatuses: Record<TaskStatus, string> = { pending: 'Pendiente', doing: 'En curso', done: 'Terminada' };
const invoiceStatuses: Record<InvoiceStatus, string> = { draft: 'Borrador', sent: 'Enviada', paid: 'Pagada', overdue: 'Vencida' };

const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value || 0);
const shortDate = (value: string) => value ? new Intl.DateTimeFormat('es-DO', { dateStyle: 'medium' }).format(new Date(`${value}T12:00:00`)) : 'Sin fecha';
const text = (form: FormData, key: string) => String(form.get(key) || '').trim();
const number = (form: FormData, key: string) => Number(form.get(key)) || 0;

export function CrmDashboard() {
  const [auth, setAuth] = useState<'checking' | 'guest' | 'authenticated'>('checking');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [data, setData] = useState<CrmData>(emptyCrmData());
  const [tab, setTab] = useState<Tab>('dashboard');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState<Collection | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [notice, setNotice] = useState('');

  const loadData = async () => {
    setLoading(true);
    const response = await fetch('/api/crm/data', { cache: 'no-store', credentials: 'same-origin' });
    if (response.status === 401) {
      setAuth('guest');
      setLoading(false);
      return;
    }
    const payload = await response.json();
    setData(payload.data || emptyCrmData());
    setLoading(false);
  };

  useEffect(() => {
    fetch('/api/crm/session', { cache: 'no-store', credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw new Error('guest');
        setAuth('authenticated');
        return loadData();
      })
      .catch(() => setAuth('guest'));
  }, []);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setLoginError('');
    setLoading(true);
    const response = await fetch('/api/crm/login', {
      method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      setLoginError('Contraseña incorrecta.');
      setLoading(false);
      return;
    }
    setAuth('authenticated');
    setPassword('');
    await loadData();
  };

  const logout = async () => {
    await fetch('/api/crm/logout', { method: 'POST', credentials: 'same-origin' });
    setAuth('guest');
    setData(emptyCrmData());
  };

  const persist = async (next: CrmData, message = 'Cambios guardados') => {
    setSaving(true);
    const response = await fetch('/api/crm/data', {
      method: 'PUT', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: next }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setNotice(payload.error || 'No se pudo guardar.');
    } else {
      setData(payload.data);
      setNotice(message);
    }
    setSaving(false);
    setTimeout(() => setNotice(''), 2800);
  };

  const updateRecord = (collection: Collection, id: string, patch: Record<string, unknown>) => {
    const list = data[collection] as Array<{ id: string }>;
    const next = { ...data, [collection]: list.map((item) => item.id === id ? { ...item, ...patch } : item) } as CrmData;
    void persist(next);
  };

  const deleteRecord = (collection: Collection, id: string) => {
    if (!window.confirm('¿Eliminar este registro del CRM?')) return;
    const list = data[collection] as Array<{ id: string }>;
    const next = { ...data, [collection]: list.filter((item) => item.id !== id) } as CrmData;
    void persist(next, 'Registro eliminado');
  };

  const addRecord = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!modal) return;
    const form = new FormData(event.currentTarget);
    const now = new Date().toISOString();
    const id = `${modal.slice(0, -1)}-${crypto.randomUUID()}`;
    let record: Record<string, unknown>;

    if (modal === 'leads') record = { id, name: text(form, 'name'), company: text(form, 'company'), email: text(form, 'email'), phone: text(form, 'phone'), service: text(form, 'service'), budget: text(form, 'budget'), details: text(form, 'details'), source: text(form, 'source') || 'Registro manual', stage: 'new', value: number(form, 'value'), nextAction: text(form, 'nextAction'), createdAt: now, updatedAt: now };
    else if (modal === 'clients') record = { id, name: text(form, 'name'), company: text(form, 'company'), email: text(form, 'email'), phone: text(form, 'phone'), website: text(form, 'website'), notes: text(form, 'notes'), status: 'active', createdAt: now };
    else if (modal === 'projects') record = { id, name: text(form, 'name'), client: text(form, 'client'), status: 'planning', budget: number(form, 'budget'), paid: number(form, 'paid'), progress: 0, dueDate: text(form, 'dueDate'), owner: text(form, 'owner') || 'Owen', notes: text(form, 'notes'), createdAt: now };
    else if (modal === 'tasks') record = { id, title: text(form, 'title'), project: text(form, 'project'), assignee: text(form, 'assignee') || 'Owen', priority: text(form, 'priority') || 'medium', status: 'pending', dueDate: text(form, 'dueDate'), createdAt: now };
    else record = { id, number: text(form, 'number') || `CYN-${String(data.invoices.length + 1).padStart(4, '0')}`, client: text(form, 'client'), project: text(form, 'project'), amount: number(form, 'amount'), status: 'draft', dueDate: text(form, 'dueDate'), createdAt: now };

    const next = { ...data, [modal]: [record, ...(data[modal] as unknown[])] } as CrmData;
    setModal(null);
    void persist(next, 'Nuevo registro creado');
  };

  const metrics = useMemo(() => {
    const openLeads = data.leads.filter((lead) => !['won', 'lost'].includes(lead.stage));
    const pipeline = openLeads.reduce((sum, lead) => sum + lead.value, 0);
    const receivable = data.invoices.filter((invoice) => invoice.status !== 'paid').reduce((sum, invoice) => sum + invoice.amount, 0);
    const collected = data.invoices.filter((invoice) => invoice.status === 'paid').reduce((sum, invoice) => sum + invoice.amount, 0);
    return { openLeads: openLeads.length, pipeline, receivable, collected, activeProjects: data.projects.filter((project) => !['live', 'paused'].includes(project.status)).length };
  }, [data]);

  const query = search.toLowerCase();
  const matches = (...values: unknown[]) => !query || values.some((value) => String(value || '').toLowerCase().includes(query));

  if (auth === 'checking') return <main className="crm-shell crm-center"><Loader2 className="crm-spinner" /><p>Abriendo sistema privado…</p></main>;

  if (auth === 'guest') return (
    <main className="crm-shell crm-login-screen">
      <section className="crm-login-card">
        <Brand />
        <span className="crm-private-badge"><LockKeyhole size={14} /> Área privada</span>
        <h1>CRM de la agencia</h1>
        <p>Prospectos, clientes, proyectos, tareas y finanzas en un solo lugar.</p>
        <form onSubmit={login}>
          <label>Contraseña administrativa<input autoFocus type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••••••" required /></label>
          {loginError && <span className="crm-error">{loginError}</span>}
          <button disabled={loading}>{loading ? <Loader2 className="crm-spinner" /> : <LockKeyhole size={17} />} Entrar al CRM</button>
        </form>
        <small>Sesión cifrada y protegida con cookie HTTP-only.</small>
      </section>
    </main>
  );

  return (
    <main className="crm-shell">
      <aside className={`crm-sidebar${mobileNav ? ' open' : ''}`}>
        <div className="crm-sidebar-brand"><Brand /><button onClick={() => setMobileNav(false)}><X /></button></div>
        <span className="crm-workspace-label">Workspace</span>
        <nav>{tabs.map(({ id, label, icon: Icon }) => <button className={tab === id ? 'active' : ''} key={id} onClick={() => { setTab(id); setMobileNav(false); }}><Icon size={18} />{label}{id === 'leads' && data.leads.length > 0 && <b>{data.leads.length}</b>}</button>)}</nav>
        <div className="crm-sidebar-bottom"><span><Sparkles size={15} /> Cynador Agency OS</span><button onClick={logout}><LogOut size={17} /> Cerrar sesión</button></div>
      </aside>

      <section className="crm-main">
        <header className="crm-topbar">
          <button className="crm-menu" onClick={() => setMobileNav(true)}><Menu /></button>
          <div><span>Panel administrativo</span><h1>{tabs.find((item) => item.id === tab)?.label}</h1></div>
          <div className="crm-top-actions">
            <label><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar…" /></label>
            {tab !== 'dashboard' && <button className="crm-primary" onClick={() => setModal(tab)}><Plus size={17} /> Nuevo</button>}
            <button className="crm-icon-button" title="Exportar copia JSON" onClick={() => { const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const anchor = document.createElement('a'); anchor.href = URL.createObjectURL(blob); anchor.download = `cynador-crm-${new Date().toISOString().slice(0, 10)}.json`; anchor.click(); URL.revokeObjectURL(anchor.href); }}><Download size={18} /></button>
          </div>
        </header>

        {notice && <div className="crm-notice">{saving && <Loader2 className="crm-spinner" />} {notice}</div>}
        {loading ? <div className="crm-center"><Loader2 className="crm-spinner" /><p>Cargando CRM…</p></div> : (
          <div className="crm-content">
            {tab === 'dashboard' && <Dashboard data={data} metrics={metrics} setTab={setTab} />}
            {tab === 'leads' && <LeadsTable items={data.leads.filter((lead) => matches(lead.name, lead.company, lead.email, lead.service))} update={updateRecord} remove={deleteRecord} />}
            {tab === 'clients' && <ClientsTable items={data.clients.filter((client) => matches(client.name, client.company, client.email, client.website))} remove={deleteRecord} />}
            {tab === 'projects' && <ProjectsTable items={data.projects.filter((project) => matches(project.name, project.client, project.owner))} update={updateRecord} remove={deleteRecord} />}
            {tab === 'tasks' && <TasksTable items={data.tasks.filter((task) => matches(task.title, task.project, task.assignee))} update={updateRecord} remove={deleteRecord} />}
            {tab === 'invoices' && <InvoicesTable items={data.invoices.filter((invoice) => matches(invoice.number, invoice.client, invoice.project))} update={updateRecord} remove={deleteRecord} />}
          </div>
        )}
      </section>

      {modal && <CreateModal collection={modal} close={() => setModal(null)} submit={addRecord} />}
    </main>
  );
}

function Dashboard({ data, metrics, setTab }: { data: CrmData; metrics: { openLeads: number; pipeline: number; receivable: number; collected: number; activeProjects: number }; setTab: (tab: Tab) => void }) {
  const cards = [
    ['Prospectos abiertos', metrics.openLeads, Target, 'leads'], ['Pipeline estimado', money(metrics.pipeline), BarChart3, 'leads'], ['Proyectos activos', metrics.activeProjects, BriefcaseBusiness, 'projects'], ['Por cobrar', money(metrics.receivable), CircleDollarSign, 'invoices'],
  ] as const;
  const urgentTasks = data.tasks.filter((task) => task.status !== 'done').slice(0, 5);
  return <>
    <div className="crm-welcome"><div><span><Sparkles size={15} /> Control de la agencia</span><h2>Buenos días. Aquí está lo importante.</h2><p>Última actualización: {new Date(data.updatedAt).toLocaleString('es-DO')}</p></div><div><b>{money(metrics.collected)}</b><small>Ingresos cobrados registrados</small></div></div>
    <div className="crm-kpis">{cards.map(([label, value, Icon, destination]) => <button key={label} onClick={() => setTab(destination)}><span><Icon size={20} /></span><small>{label}</small><b>{value}</b></button>)}</div>
    <div className="crm-dashboard-grid">
      <section className="crm-panel"><div className="crm-panel-title"><div><span>Venta</span><h3>Prospectos recientes</h3></div><button onClick={() => setTab('leads')}>Ver todos</button></div>{data.leads.slice(0, 5).map((lead) => <div className="crm-feed-row" key={lead.id}><i>{lead.name.slice(0, 1).toUpperCase()}</i><div><b>{lead.company || lead.name}</b><span>{lead.service || lead.email}</span></div><em className={`status-${lead.stage}`}>{leadStages[lead.stage]}</em></div>)}{data.leads.length === 0 && <Empty text="Los formularios nuevos aparecerán aquí automáticamente." />}</section>
      <section className="crm-panel"><div className="crm-panel-title"><div><span>Operación</span><h3>Próximas tareas</h3></div><button onClick={() => setTab('tasks')}>Abrir tareas</button></div>{urgentTasks.map((task) => <div className="crm-feed-row" key={task.id}><i><Clock3 size={16} /></i><div><b>{task.title}</b><span>{task.project || task.assignee}</span></div><em className={`priority-${task.priority}`}>{task.dueDate ? shortDate(task.dueDate) : taskStatuses[task.status]}</em></div>)}{urgentTasks.length === 0 && <Empty text="No hay tareas pendientes." />}</section>
    </div>
  </>;
}

function Empty({ text: label }: { text: string }) { return <div className="crm-empty"><Activity /><p>{label}</p></div>; }
function DeleteButton({ action }: { action: () => void }) { return <button className="crm-delete" onClick={action} title="Eliminar"><Trash2 size={16} /></button>; }

function LeadsTable({ items, update, remove }: { items: CrmData['leads']; update: (collection: Collection, id: string, patch: Record<string, unknown>) => void; remove: (collection: Collection, id: string) => void }) {
  return <section className="crm-panel crm-table-panel"><div className="crm-panel-title"><div><span>Pipeline comercial</span><h3>{items.length} prospectos</h3></div></div>{items.length === 0 ? <Empty text="No hay prospectos con este filtro." /> : <div className="crm-table"><div className="crm-table-head"><span>Prospecto</span><span>Servicio / valor</span><span>Siguiente acción</span><span>Etapa</span><span /></div>{items.map((lead) => <div className="crm-table-row" key={lead.id}><span><b>{lead.company || lead.name}</b><small>{lead.name} · {lead.email}<br />{lead.phone}</small></span><span><b>{lead.service || 'Por definir'}</b><small>{lead.value ? money(lead.value) : lead.budget || 'Sin valorar'} · {lead.source}</small></span><span><b>{lead.nextAction || 'Contactar'}</b><small>{new Date(lead.createdAt).toLocaleDateString('es-DO')}</small></span><span><select value={lead.stage} onChange={(event) => update('leads', lead.id, { stage: event.target.value, updatedAt: new Date().toISOString() })}>{Object.entries(leadStages).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></span><DeleteButton action={() => remove('leads', lead.id)} /></div>)}</div>}</section>;
}

function ClientsTable({ items, remove }: { items: CrmData['clients']; remove: (collection: Collection, id: string) => void }) {
  return <section className="crm-card-grid">{items.map((client) => <article className="crm-record-card" key={client.id}><div className="crm-record-head"><i><UserRound /></i><DeleteButton action={() => remove('clients', client.id)} /></div><span>Cliente {client.status === 'active' ? 'activo' : 'inactivo'}</span><h3>{client.company || client.name}</h3><p>{client.name}<br />{client.email}<br />{client.phone}</p>{client.website && <a href={client.website.startsWith('http') ? client.website : `https://${client.website}`} target="_blank" rel="noreferrer">{client.website}</a>}<small>{client.notes || 'Sin notas internas'}</small></article>)}{items.length === 0 && <Empty text="Agrega el primer cliente de Cynador." />}</section>;
}

function ProjectsTable({ items, update, remove }: { items: CrmData['projects']; update: (collection: Collection, id: string, patch: Record<string, unknown>) => void; remove: (collection: Collection, id: string) => void }) {
  return <section className="crm-card-grid">{items.map((project) => <article className="crm-record-card crm-project-card" key={project.id}><div className="crm-record-head"><i><BriefcaseBusiness /></i><DeleteButton action={() => remove('projects', project.id)} /></div><select value={project.status} onChange={(event) => update('projects', project.id, { status: event.target.value })}>{Object.entries(projectStatuses).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><h3>{project.name}</h3><p>{project.client || 'Cliente por asignar'} · Responsable: {project.owner}</p><div className="crm-progress"><span style={{ width: `${project.progress}%` }} /></div><div className="crm-project-numbers"><b>{project.progress}%</b><b>{money(project.paid)} / {money(project.budget)}</b></div><small>Entrega: {shortDate(project.dueDate)}</small></article>)}{items.length === 0 && <Empty text="Todavía no hay proyectos registrados." />}</section>;
}

function TasksTable({ items, update, remove }: { items: CrmData['tasks']; update: (collection: Collection, id: string, patch: Record<string, unknown>) => void; remove: (collection: Collection, id: string) => void }) {
  return <section className="crm-panel crm-table-panel"><div className="crm-panel-title"><div><span>Producción</span><h3>{items.filter((item) => item.status !== 'done').length} tareas abiertas</h3></div></div>{items.length === 0 ? <Empty text="No hay tareas registradas." /> : <div className="crm-task-list">{items.map((task) => <div className={`crm-task status-${task.status}`} key={task.id}><button onClick={() => update('tasks', task.id, { status: task.status === 'done' ? 'pending' : 'done' })}><CheckCircle2 /></button><div><b>{task.title}</b><span>{task.project || 'General'} · {task.assignee}</span></div><em className={`priority-${task.priority}`}>{task.priority}</em><small>{shortDate(task.dueDate)}</small><DeleteButton action={() => remove('tasks', task.id)} /></div>)}</div>}</section>;
}

function InvoicesTable({ items, update, remove }: { items: CrmData['invoices']; update: (collection: Collection, id: string, patch: Record<string, unknown>) => void; remove: (collection: Collection, id: string) => void }) {
  return <section className="crm-panel crm-table-panel"><div className="crm-panel-title"><div><span>Facturación</span><h3>{money(items.reduce((sum, invoice) => sum + invoice.amount, 0))} registrado</h3></div></div>{items.length === 0 ? <Empty text="No hay facturas registradas." /> : <div className="crm-table"><div className="crm-table-head"><span>Factura</span><span>Cliente / proyecto</span><span>Vencimiento</span><span>Estado</span><span /></div>{items.map((invoice) => <div className="crm-table-row" key={invoice.id}><span><b>{invoice.number}</b><small>{money(invoice.amount)}</small></span><span><b>{invoice.client}</b><small>{invoice.project || 'Servicio general'}</small></span><span><b>{shortDate(invoice.dueDate)}</b></span><span><select value={invoice.status} onChange={(event) => update('invoices', invoice.id, { status: event.target.value })}>{Object.entries(invoiceStatuses).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></span><DeleteButton action={() => remove('invoices', invoice.id)} /></div>)}</div>}</section>;
}

function CreateModal({ collection, close, submit }: { collection: Collection; close: () => void; submit: (event: FormEvent<HTMLFormElement>) => void }) {
  const title = tabs.find((item) => item.id === collection)?.label;
  return <div className="crm-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><form className="crm-modal" onSubmit={submit}><div className="crm-modal-head"><div><span>Nuevo registro</span><h2>{title}</h2></div><button type="button" onClick={close}><X /></button></div><div className="crm-form-grid">
    {collection === 'leads' && <><Field name="name" label="Nombre" required /><Field name="company" label="Empresa" required /><Field name="email" label="Correo" type="email" /><Field name="phone" label="WhatsApp" /><Field name="service" label="Servicio interesado" /><Field name="value" label="Valor estimado USD" type="number" /><Field name="budget" label="Presupuesto declarado" /><Field name="source" label="Fuente" /><Field name="nextAction" label="Próxima acción" wide /><Field name="details" label="Notas del proyecto" wide textarea /></>}
    {collection === 'clients' && <><Field name="name" label="Contacto principal" required /><Field name="company" label="Empresa" required /><Field name="email" label="Correo" type="email" /><Field name="phone" label="WhatsApp" /><Field name="website" label="Sitio web" wide /><Field name="notes" label="Notas internas" wide textarea /></>}
    {collection === 'projects' && <><Field name="name" label="Nombre del proyecto" required /><Field name="client" label="Cliente" required /><Field name="budget" label="Presupuesto USD" type="number" /><Field name="paid" label="Monto cobrado USD" type="number" /><Field name="dueDate" label="Fecha de entrega" type="date" /><Field name="owner" label="Responsable" /><Field name="notes" label="Alcance / notas" wide textarea /></>}
    {collection === 'tasks' && <><Field name="title" label="Tarea" required wide /><Field name="project" label="Proyecto" /><Field name="assignee" label="Responsable" /><label>Prioridad<select name="priority"><option value="low">Baja</option><option value="medium">Media</option><option value="high">Alta</option></select></label><Field name="dueDate" label="Fecha límite" type="date" /></>}
    {collection === 'invoices' && <><Field name="number" label="Número de factura" /><Field name="amount" label="Monto USD" type="number" required /><Field name="client" label="Cliente" required /><Field name="project" label="Proyecto" /><Field name="dueDate" label="Vencimiento" type="date" /></>}
  </div><button className="crm-primary crm-submit" type="submit"><Plus size={17} /> Crear registro</button></form></div>;
}

function Field({ name, label, type = 'text', required = false, wide = false, textarea = false }: { name: string; label: string; type?: string; required?: boolean; wide?: boolean; textarea?: boolean }) {
  return <label className={wide ? 'wide' : ''}>{label}{textarea ? <textarea name={name} required={required} rows={4} /> : <input name={name} type={type} required={required} />}</label>;
}
