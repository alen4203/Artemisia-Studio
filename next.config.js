const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Fix for next-export-i18n path resolution with pnpm
    config.resolve.alias['./../../i18n/index.js'] = path.resolve(__dirname, 'i18n/index.js');
    return config;
  },
};

module.exports = nextConfig;
