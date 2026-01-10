/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Hardcoded for GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/Artemisia-Studio' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
