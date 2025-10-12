import type { NextConfig } from 'next';

// Define the configuration with the NextConfig type
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/**',
      },
      // You can also add the placeholder domain here
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

// Use 'export default' instead of 'module.exports'
export default nextConfig;