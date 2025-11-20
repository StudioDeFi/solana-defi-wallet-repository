/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    outputFileTracingIncludes: {
      '/': ['./public/**/*'],
    },
  },
  images: {
    unoptimized: true,
    domains: [
      'raw.githubusercontent.com',
      'assets.coingecko.com',
      'token-list.solana.com',
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    // Externalize heavy dependencies - load from CDN
    config.externals = config.externals || {};
    if (!isServer) {
      config.externals['three'] = 'THREE';
      config.externals['@react-three/fiber'] = 'ReactThreeFiber';
      config.externals['@react-three/drei'] = 'ReactThreeDrei';
    }
    return config;
  },
};

module.exports = nextConfig;

