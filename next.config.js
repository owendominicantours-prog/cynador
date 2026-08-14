/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  turbopack: {
    root: __dirname,
  },
  poweredByHeader: false,
};
module.exports = nextConfig;
