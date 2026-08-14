/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'cynador.vercel.app' }],
        destination: 'https://cynador.com/:path*',
        permanent: true,
      },
    ];
  },
  poweredByHeader: false,
};
module.exports = nextConfig;
