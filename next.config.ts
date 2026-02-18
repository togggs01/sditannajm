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
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Ensure path aliases are resolved correctly
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    
    // Disable chunking for debugging
    config.optimization = {
      ...config.optimization,
      splitChunks: false,
      runtimeChunk: false,
    };
    return config;
  },
};

export default nextConfig;
