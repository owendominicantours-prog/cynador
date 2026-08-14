import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Brand } from '@/components/Brand';

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Cynador, inicio">
        <Brand />
      </Link>
      <nav aria-label="Navegación principal">
        <Link href="/servicios">Servicios</Link>
        <Link href="/proyectos">Proyectos</Link>
        <Link href="/casos/proactivitis">Caso Proactivitis</Link>
        <Link href="/nosotros">Nosotros</Link>
      </nav>
      <Link className="header-cta" href="/contacto">
        Iniciar proyecto <ArrowUpRight size={16} />
      </Link>
    </header>
  );
}
