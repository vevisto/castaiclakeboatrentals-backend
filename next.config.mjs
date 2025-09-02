/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      {
        protocol: 'https',
        hostname: 'backendcastaic.nepalisoftware.com',
      },
      {
        protocol: 'https',
        hostname: 'castaiclake.nepalisoftware.com',
      },
      {
        protocol: 'https',
        hostname: 'castaiclakeboatrentals.com',
      },
      {
        protocol: 'https',
        hostname: 'secure.castaiclakeboatrentals.com',
      },
    ],
  },
};

export default nextConfig;
