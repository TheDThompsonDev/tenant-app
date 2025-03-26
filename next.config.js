/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: process.platform === 'win32',
  },
  experimental: {
    esmExternals: 'loose',
  },
};

module.exports = nextConfig;
