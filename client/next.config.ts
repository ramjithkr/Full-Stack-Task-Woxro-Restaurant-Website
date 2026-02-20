/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(), // Explicitly set the root directory
  },
};

module.exports = nextConfig;
