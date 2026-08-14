import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return <main className="interior-main"><section className="interior-hero"><div className="wrap"><span className="kicker">Error 404</span><h1>Esta ruta todavía no forma parte del <em>sistema.</em></h1><p>Regresa al inicio o explora nuestros proyectos en producción.</p><div className="interior-actions"><Link className="primary-btn" href="/"><ArrowLeft size={17} /> Volver al inicio</Link></div></div></section></main>;
}
