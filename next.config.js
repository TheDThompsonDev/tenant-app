/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: process.platform === 'win32',
  },
};

module.exports = nextConfig;
