import type { Metadata } from 'next';
import { CrmDashboard } from '@/components/CrmDashboard';

export const metadata: Metadata = {
  title: 'CRM privado',
  description: 'Panel operativo privado de Cynador.',
  robots: { index: false, follow: false, noarchive: true, nocache: true },
};

export default function AdminPage() {
  return <CrmDashboard />;
}
