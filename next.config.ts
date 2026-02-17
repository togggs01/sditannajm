import type { NextConfig } from "next";

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
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  
  // Disable all chunking for debugging
  webpack: (config, { isServer }) => {
    // Disable chunking for both client and server
    config.optimization = {
      ...config.optimization,
      splitChunks: false,
      runtimeChunk: false,
    };
    return config;
  },
};

export default nextConfig;
