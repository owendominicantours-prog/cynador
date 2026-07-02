import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cynador | Marketing Online, Diseno Web y SEO en Punta Cana',
  description:
    'Agencia de marketing digital en Punta Cana: paginas web, SEO, redes sociales, hosting, branding y estrategia digital para negocios que quieren vender mas.',
  openGraph: {
    title: 'Cynador | Marketing Online & Diseno Web',
    description: 'Diseno web, SEO, redes sociales y estrategia digital en Punta Cana.',
    type: 'website',
    locale: 'es_DO',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
