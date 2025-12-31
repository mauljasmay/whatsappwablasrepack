import type { NextConfig } from "next";
import createNextPlugin from "next/dist/build/next-image-plugin-webapp";

const nextConfig: NextConfig = {
  // Performance Optimizations
  reactStrictMode: true,
  swcMinify: true,

  // Output
  output: 'standalone',

  // Images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental features for speed
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', 'framer-motion'],
    turbo: undefined,
    // Enable app router optimizations
    appDir: undefined,
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Optimize chunks
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
      runtimeChunk: true,
    };

    // Disable source maps in production for speed
    if (process.env.NODE_ENV === 'production') {
      config.devtool = false;
      config.optimization.minimize = true;
    }

    return config;
  },

  // Disable source maps in production for better performance
  productionBrowserSourceMaps: false,

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // Remove unused code
    strip: true,
    // Improve tree shaking
    // swcMinify handles minification
  },

  // Enable PWA with Next Image plugin
  images: {
    unoptimized: false,
    // Use Next.js Image plugin for WebP and AVIF support
  },

  // Disable expensive features if not needed
  onDemandEntries: false,
  optimizeServerReact: true,
};

export default nextConfig;
