import {
  Blocks,
  Bot,
  Building2,
  Code2,
  Database,
  Globe2,
  Hotel,
  KeyRound,
  Landmark,
  LineChart,
  Plane,
  Search,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  Store,
  Utensils,
} from 'lucide-react';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cynador.com';
export const contactPhoneE164 = '+18295539900';
export const contactPhoneDisplay = '+1 (829) 553-9900';
export const whatsappNumber = contactPhoneE164.replace('+', '');
export const contactEmail = 'cynador@gmail.com';
export const whatsappUrl = `https://wa.me/${whatsappNumber}`;
export const proactivitisPlayStore = 'https://play.google.com/store/apps/details?id=com.proactivitis.app';

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  promise: string;
  description: string;
  deliverables: string[];
  outcomes: string[];
  icon: typeof Code2;
};

export const services: Service[] = [
  {
    slug: 'diseno-web-premium',
    name: 'Diseño web premium',
    shortName: 'Diseño web',
    eyebrow: 'La percepción cambia el precio',
    promise: 'Una presencia digital imposible de confundir con una plantilla.',
    description:
      'Dirección de arte, arquitectura de conversión y una experiencia visual a la altura de empresas que no compiten por ser las más baratas.',
    deliverables: ['Estrategia y arquitectura', 'Diseño UX/UI a medida', 'Sistema visual responsive', 'Prototipo y dirección de contenido'],
    outcomes: ['Mayor percepción de valor', 'Mensaje comercial más claro', 'Mejor calidad de oportunidades'],
    icon: Globe2,
  },
  {
    slug: 'desarrollo-web-nextjs',
    name: 'Desarrollo web con Next.js',
    shortName: 'Desarrollo web',
    eyebrow: 'Código construido para durar',
    promise: 'Velocidad, control y capacidad de crecer sin reconstruirlo todo.',
    description:
      'Desarrollamos productos web con código moderno, rendimiento medible, componentes reutilizables y una base técnica preparada para SEO.',
    deliverables: ['Next.js y TypeScript', 'CMS o panel de gestión', 'Integraciones y APIs', 'QA, seguridad y despliegue'],
    outcomes: ['Carga más rápida', 'Menos dependencia técnica', 'Escalabilidad real'],
    icon: Code2,
  },
  {
    slug: 'plataformas-y-sistemas-web',
    name: 'Plataformas y sistemas web',
    shortName: 'Plataformas web',
    eyebrow: 'Más que una página',
    promise: 'El sistema que conecta ventas, operaciones, datos y clientes.',
    description:
      'Construimos motores de reserva, directorios, marketplaces, áreas privadas y herramientas internas alrededor del proceso real del negocio.',
    deliverables: ['Descubrimiento funcional', 'Base de datos y permisos', 'Pagos y automatizaciones', 'Paneles y analítica'],
    outcomes: ['Procesos conectados', 'Menos trabajo manual', 'Nuevas fuentes de ingresos'],
    icon: Blocks,
  },
  {
    slug: 'seo-tecnico',
    name: 'SEO técnico y arquitectura',
    shortName: 'SEO técnico',
    eyebrow: 'Visibilidad construida desde la base',
    promise: 'Una web que Google puede descubrir, entender y priorizar.',
    description:
      'Auditoría, arquitectura de información, indexación, datos estructurados, rendimiento y estrategia de contenido conectada con demanda real.',
    deliverables: ['Auditoría técnica', 'Arquitectura semántica', 'Schema y sitemaps', 'Medición e indexación'],
    outcomes: ['Mayor cobertura orgánica', 'Mejor calidad técnica', 'Crecimiento acumulativo'],
    icon: Search,
  },
  {
    slug: 'seo-programatico',
    name: 'SEO programático',
    shortName: 'SEO programático',
    eyebrow: 'Miles de oportunidades, un sistema',
    promise: 'Cobertura orgánica a escala sin publicar miles de páginas vacías.',
    description:
      'Diseñamos modelos de datos, plantillas editoriales y controles de calidad para cubrir servicios, mercados e intenciones de búsqueda de forma útil.',
    deliverables: ['Investigación de patrones', 'Modelo de contenido', 'Generación controlada', 'Hubs e interlinking'],
    outcomes: ['Cobertura de long tail', 'Publicación eficiente', 'Autoridad temática'],
    icon: Database,
  },
  {
    slug: 'ecommerce-y-reservas',
    name: 'E-commerce y reservas',
    shortName: 'E-commerce',
    eyebrow: 'De la intención al pago',
    promise: 'Menos fricción entre descubrir, confiar, reservar y pagar.',
    description:
      'Experiencias de compra y reserva conectadas con inventario, disponibilidad, pagos, notificaciones y seguimiento comercial.',
    deliverables: ['Catálogo y checkout', 'Stripe y métodos de pago', 'Reservas y disponibilidad', 'Correos transaccionales'],
    outcomes: ['Venta directa', 'Mejor conversión', 'Operación centralizada'],
    icon: ShoppingBag,
  },
];

export type Industry = {
  slug: string;
  name: string;
  singular: string;
  challenge: string;
  conversion: string;
  proof: string;
  icon: typeof Hotel;
};

export const industries: Industry[] = [
  { slug: 'hoteles', name: 'Hoteles y resorts', singular: 'hotel', challenge: 'dependencia de OTAs y una experiencia de reserva fragmentada', conversion: 'reservas directas', proof: 'motor de reserva, habitaciones, experiencias y SEO por destino', icon: Hotel },
  { slug: 'tours', name: 'Tours y excursiones', singular: 'operador turístico', challenge: 'catálogos difíciles de encontrar y demasiadas ventas manuales', conversion: 'reservas de experiencias', proof: 'catálogo, disponibilidad, pagos y páginas por actividad', icon: Plane },
  { slug: 'transporte', name: 'Transporte y rent car', singular: 'empresa de transporte', challenge: 'cotizaciones lentas y rutas sin páginas de captación', conversion: 'solicitudes y reservas', proof: 'rutas, flota, cotizador y automatización', icon: KeyRound },
  { slug: 'inmobiliarias', name: 'Inmobiliarias', singular: 'firma inmobiliaria', challenge: 'propiedades dispersas y leads de baja intención', conversion: 'consultas calificadas', proof: 'inventario, filtros, proyectos y captación por zona', icon: Building2 },
  { slug: 'restaurantes', name: 'Restaurantes y hospitality', singular: 'restaurante', challenge: 'una presencia genérica que no transmite la experiencia', conversion: 'reservas y eventos', proof: 'menú, reservas, ubicaciones y experiencias privadas', icon: Utensils },
  { slug: 'clinicas', name: 'Clínicas y salud', singular: 'clínica', challenge: 'baja confianza digital y procesos de cita poco claros', conversion: 'citas calificadas', proof: 'especialidades, profesionales, seguridad y agenda', icon: Stethoscope },
  { slug: 'abogados', name: 'Firmas legales', singular: 'firma legal', challenge: 'servicios complejos explicados sin diferenciación', conversion: 'consultas de alto valor', proof: 'áreas de práctica, autoridad, casos y contacto seguro', icon: Landmark },
  { slug: 'constructoras', name: 'Construcción y arquitectura', singular: 'constructora', challenge: 'portafolios que se ven bien pero no generan oportunidades', conversion: 'proyectos y licitaciones', proof: 'casos, capacidades, procesos y captación B2B', icon: Building2 },
  { slug: 'servicios-profesionales', name: 'Servicios profesionales', singular: 'empresa de servicios', challenge: 'una propuesta difícil de comparar y demostrar', conversion: 'reuniones comerciales', proof: 'oferta, autoridad, metodología y casos', icon: ShieldCheck },
  { slug: 'retail', name: 'Retail y marcas', singular: 'marca', challenge: 'experiencia desconectada entre catálogo, marca y compra', conversion: 'ventas y distribuidores', proof: 'e-commerce, catálogo, contenidos y analítica', icon: Store },
  { slug: 'saas', name: 'SaaS y tecnología', singular: 'empresa tecnológica', challenge: 'productos potentes explicados con mensajes demasiado técnicos', conversion: 'demos y usuarios', proof: 'producto, onboarding, documentación y captación', icon: Bot },
  { slug: 'empresas-b2b', name: 'Empresas B2B', singular: 'empresa B2B', challenge: 'ciclos largos sin contenido que ayude a decidir', conversion: 'oportunidades calificadas', proof: 'soluciones, industrias, casos y recursos comerciales', icon: LineChart },
];

export type Market = {
  slug: string;
  name: string;
  region: string;
  language: string;
  angle: string;
};

export const markets: Market[] = [
  { slug: 'republica-dominicana', name: 'República Dominicana', region: 'Caribe', language: 'español', angle: 'competir por demanda local e internacional con una operación digital propia' },
  { slug: 'santo-domingo', name: 'Santo Domingo', region: 'República Dominicana', language: 'español', angle: 'diferenciarse en el principal mercado corporativo del país' },
  { slug: 'punta-cana', name: 'Punta Cana', region: 'República Dominicana', language: 'español e inglés', angle: 'convertir demanda turística internacional en reservas directas' },
  { slug: 'miami', name: 'Miami', region: 'Estados Unidos', language: 'inglés y español', angle: 'comunicar valor en un mercado competitivo, bilingüe y orientado a resultados' },
  { slug: 'new-york', name: 'New York', region: 'Estados Unidos', language: 'inglés y español', angle: 'construir autoridad en un mercado saturado y de alta exigencia' },
  { slug: 'puerto-rico', name: 'Puerto Rico', region: 'Caribe', language: 'español e inglés', angle: 'unir captación local con oportunidades de Estados Unidos' },
  { slug: 'mexico', name: 'México', region: 'Latinoamérica', language: 'español', angle: 'escalar servicios y comercio en uno de los mercados digitales más grandes de la región' },
  { slug: 'cancun', name: 'Cancún', region: 'México', language: 'español e inglés', angle: 'reducir intermediación y captar viajeros antes de su llegada' },
  { slug: 'colombia', name: 'Colombia', region: 'Latinoamérica', language: 'español', angle: 'convertir una audiencia digital madura en oportunidades medibles' },
  { slug: 'panama', name: 'Panamá', region: 'Centroamérica', language: 'español', angle: 'proyectar confianza regional desde un hub internacional' },
  { slug: 'costa-rica', name: 'Costa Rica', region: 'Centroamérica', language: 'español e inglés', angle: 'vender experiencias y servicios de alto valor a mercados internacionales' },
  { slug: 'espana', name: 'España', region: 'Europa', language: 'español', angle: 'competir con una experiencia rápida, accesible y técnicamente sólida' },
  { slug: 'chile', name: 'Chile', region: 'Latinoamérica', language: 'español', angle: 'presentar una oferta premium a compradores digitales exigentes' },
  { slug: 'peru', name: 'Perú', region: 'Latinoamérica', language: 'español', angle: 'capturar búsquedas comerciales con contenido útil y diferenciación visual' },
  { slug: 'ecuador', name: 'Ecuador', region: 'Latinoamérica', language: 'español', angle: 'transformar confianza local en un canal digital de adquisición' },
  { slug: 'guatemala', name: 'Guatemala', region: 'Centroamérica', language: 'español', angle: 'ganar visibilidad en categorías con espacio para líderes digitales' },
  { slug: 'canada', name: 'Canadá', region: 'Norteamérica', language: 'inglés y francés', angle: 'presentar servicios con estándares internacionales de rendimiento y confianza' },
  { slug: 'caribe', name: 'el Caribe', region: 'Caribe', language: 'multilingüe', angle: 'conectar mercados insulares con viajeros y compradores globales' },
];

export type Project = {
  slug: string;
  name: string;
  url: string;
  image: string;
  category: string;
  summary: string;
  featured?: boolean;
  metrics?: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: 'proactivitis',
    name: 'Proactivitis',
    url: 'https://proactivitis.com',
    image: '/projects/proactivitis.png',
    category: 'Plataforma + app Android + SEO programático',
    summary: 'Ecosistema de experiencias, traslados y reservas con plataforma web, aplicación Android y una operación digital completa.',
    featured: true,
    metrics: [
      { value: '60K+', label: 'URLs indexadas' },
      { value: '≈ US$4K', label: 'facturación mensual orgánica' },
      { value: '24/7', label: 'operación digital' },
      { value: 'Android', label: 'app publicada en Google Play' },
    ],
  },
  { slug: 'casa-de-campo', name: 'Casa de Campo Experiences', url: 'https://casadecampoexperiences.com', image: '/projects/casadecampo.png', category: 'Experiencias premium', summary: 'Catálogo de experiencias y servicios para un destino internacional de lujo.' },
  { slug: 'caribbean-buggy', name: 'Caribbean Buggy', url: 'https://www.caribbeanboggie.com', image: '/projects/caribbean-buggy.png', category: 'Reservas de excursiones', summary: 'Experiencia comercial para descubrir, comparar y reservar aventuras.' },
  { slug: 'puj-transfer', name: 'PUJ Transfer', url: 'https://pujtransfer.com', image: '/projects/pujtransfer.png', category: 'Transporte y cotización', summary: 'Plataforma para rutas, flota y solicitudes de traslados privados.' },
  { slug: 'saona', name: 'Saona', url: 'https://saona.vercel.app', image: '/projects/saona.png', category: 'Destino y excursiones', summary: 'Landing comercial especializada en experiencias de Isla Saona.' },
  { slug: 'party-boat', name: 'Get Your Party Boat', url: 'https://www.getyourpartyboat.com', image: '/projects/party-boat.png', category: 'Experiencias y reservas', summary: 'Marca, catálogo y conversión para experiencias privadas en barco.' },
  { slug: 'santo-domingo', name: 'Santo Domingo Excursion', url: 'https://santodomingoexcursion.com', image: '/projects/santo-domingo.png', category: 'SEO de destino', summary: 'Captación especializada para tours culturales y privados.' },
  { slug: 'dominican-proactivitis', name: 'Dominican Proactivitis', url: 'https://www.dominicanproactivitis.com', image: '/projects/dominican-proactivitis.png', category: 'Portal turístico', summary: 'Cobertura de destinos y experiencias para viajeros internacionales.' },
  { slug: 'forever-shining', name: 'Forever Shining', url: 'https://forevershining.vercel.app', image: '/projects/forevershining.png', category: 'Catálogo y marca', summary: 'Experiencia visual y comercial para una marca de producto.' },
];

export const totalProgrammaticPages = services.length * industries.length * markets.length;

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

export function getMarket(slug: string) {
  return markets.find((market) => market.slug === slug);
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function solutionPath(service: Service, market: Market, industry: Industry) {
  return `/soluciones/${service.slug}/${market.slug}/${industry.slug}`;
}
