import type { Metadata } from 'next';
import {
  contactEmail,
  contactPhoneDisplay,
  industries,
  projects,
  services,
  siteUrl,
} from '@/lib/site-data';

export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function pageId(path: string) {
  return `${absoluteUrl(path)}#webpage`;
}

export function breadcrumbId(path: string) {
  return `${absoluteUrl(path)}#breadcrumb`;
}

export function buildMetadata({
  title,
  description,
  path,
  image = '/projects/proactivitis.png',
  keywords = [],
  type = 'website',
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article';
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Cynador', url: siteUrl }],
    creator: 'Cynador',
    publisher: 'Cynador',
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Cynador',
      locale: 'es_DO',
      type,
      images: [{ url: imageUrl, width: 1440, height: 900, alt: `${title} — Cynador` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': organizationId,
    name: 'Cynador',
    alternateName: 'Cynador Digital Business Engine',
    slogan: 'No hacemos páginas web. Construimos negocios que venden.',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      '@id': `${siteUrl}/#logo`,
      url: absoluteUrl('/logo-cynador.png'),
      contentUrl: absoluteUrl('/logo-cynador.png'),
      caption: 'Cynador',
    },
    image: { '@id': `${siteUrl}/#logo` },
    description: 'Agencia de diseño web, desarrollo de plataformas, aplicaciones y SEO técnico para empresas que buscan una ventaja digital.',
    email: contactEmail,
    telephone: contactPhoneDisplay,
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    knowsLanguage: ['Spanish', 'English'],
    knowsAbout: [
      'Diseño web premium',
      'Desarrollo web con Next.js',
      'SEO técnico',
      'SEO programático',
      'Aplicaciones móviles',
      'E-commerce',
      'Sistemas de reservas',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactPhoneDisplay,
      email: contactEmail,
      contactType: 'sales',
      availableLanguage: ['Spanish', 'English'],
      areaServed: 'Worldwide',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Cynador',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          url: absoluteUrl(`/servicios/${service.slug}`),
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    url: siteUrl,
    name: 'Cynador',
    alternateName: 'Cynador Digital Business Engine',
    description: 'Diseño web premium, desarrollo de plataformas, aplicaciones y SEO para empresas que quieren liderar.',
    publisher: { '@id': organizationId },
    inLanguage: ['es', 'en'],
  };
}

export function webPageSchema({
  path,
  name,
  description,
  type = 'WebPage',
  mainEntityId,
  primaryImage,
}: {
  path: string;
  name: string;
  description: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'ProfilePage';
  mainEntityId?: string;
  primaryImage?: string;
}) {
  return {
    '@type': type,
    '@id': pageId(path),
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { '@id': websiteId },
    about: { '@id': organizationId },
    breadcrumb: path === '/' ? undefined : { '@id': breadcrumbId(path) },
    primaryImageOfPage: primaryImage ? { '@type': 'ImageObject', url: absoluteUrl(primaryImage) } : undefined,
    mainEntity: mainEntityId ? { '@id': mainEntityId } : undefined,
    inLanguage: 'es',
    potentialAction: {
      '@type': 'ReadAction',
      target: [absoluteUrl(path)],
    },
  };
}

export function breadcrumbSchema(path: string, items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId(path),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema({
  path,
  name,
  description,
  audience,
  areaServed = 'Worldwide',
}: {
  path: string;
  name: string;
  description: string;
  audience?: string;
  areaServed?: string;
}) {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    description,
    url: absoluteUrl(path),
    provider: { '@id': organizationId },
    mainEntityOfPage: { '@id': pageId(path) },
    serviceType: name,
    areaServed: { '@type': 'Place', name: areaServed },
    audience: audience ? { '@type': 'BusinessAudience', audienceType: audience } : undefined,
  };
}

export function itemListSchema({
  path,
  name,
  items,
  idSuffix = 'itemlist',
}: {
  path: string;
  name: string;
  items: { name: string; path: string; type?: string; image?: string }[];
  idSuffix?: string;
}) {
  return {
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#${idSuffix}`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': item.type || 'Thing',
        name: item.name,
        url: absoluteUrl(item.path),
        image: item.image ? absoluteUrl(item.image) : undefined,
      },
    })),
  };
}

export function schemaGraph(nodes: Record<string, unknown>[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

export const servicesItemList = services.map((service) => ({
  name: service.name,
  path: `/servicios/${service.slug}`,
  type: 'Service',
}));

export const projectsItemList = projects.map((project) => ({
  name: project.name,
  path: `/proyectos/${project.slug}`,
  type: 'CreativeWork',
  image: project.image,
}));

export const industryNames = industries.map((industry) => industry.name);
