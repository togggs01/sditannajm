import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false,
  },
  compress: true,
  poweredByHeader: false,
  
  webpack: (config, { isServer, dev }) => {
    // Set path alias for both client and server
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(process.cwd()),
    };
    
    // Don't modify chunking in development
    if (dev) return config;
    
    // Production optimizations (client-side only)
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunk (React, Next.js)
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Vendor chunk (other node_modules)
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              priority: 30,
              enforce: true,
            },
            // Common chunk (shared code)
            common: {
              name: 'common',
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }
    
    return config;
  },
};

export default nextConfig;
