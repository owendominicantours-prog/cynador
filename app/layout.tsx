import type { Metadata, Viewport } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { JsonLd } from '@/components/JsonLd';
import { siteUrl } from '@/lib/site-data';
import { organizationSchema, schemaGraph, websiteSchema } from '@/lib/seo';
import './globals.css';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CYNADOR — Diseño web, desarrollo y SEO de alto nivel',
    template: '%s | CYNADOR',
  },
  description:
    'Diseñamos y desarrollamos páginas web premium, plataformas digitales y sistemas SEO para empresas que quieren convertirse en referentes.',
  keywords: ['diseño web premium', 'desarrollo web', 'agencia SEO', 'Next.js', 'SEO programático'],
  authors: [{ name: 'Cynador', url: siteUrl }],
  creator: 'Cynador',
  publisher: 'Cynador',
  openGraph: {
    title: 'CYNADOR — Digital Business Engine',
    description: 'Diseño, desarrollo web y SEO para empresas que no compiten por ser las más baratas.',
    type: 'website',
    locale: 'es_DO',
    url: '/',
    siteName: 'Cynador',
    images: [{ url: '/projects/proactivitis.png', width: 1440, height: 900 }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#030814',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${manrope.variable} ${space.variable}`}>
      <body>
        <JsonLd data={schemaGraph([organizationSchema(), websiteSchema()])} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
