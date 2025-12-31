import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', 'framer-motion'],
  },
};

export default nextConfig;
