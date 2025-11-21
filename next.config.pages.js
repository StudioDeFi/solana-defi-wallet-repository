/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Static export for GitHub Pages
  output: 'export',
  distDir: 'docs',
  
  // Disable features not supported in static export
  images: {
    unoptimized: true,
  },
  
  // Set base path for GitHub Pages (will be repository name)
  // For user/organization pages, leave basePath empty
  // For project pages, set to repository name: basePath: '/solana-defi-wallet-repository'
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  
  // Asset prefix for GitHub Pages
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  
  // Trailing slash for better GitHub Pages compatibility
  trailingSlash: true,

  webpack: (config, { isServer }) => {
    // Resolve path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
      '@/components': require('path').resolve(__dirname, 'src/components'),
      '@/lib': require('path').resolve(__dirname, 'src/lib'),
      '@/hooks': require('path').resolve(__dirname, 'src/hooks'),
      '@/store': require('path').resolve(__dirname, 'src/store'),
      '@/api': require('path').resolve(__dirname, 'src/api'),
      '@/types': require('path').resolve(__dirname, 'src/types'),
      '@/utils': require('path').resolve(__dirname, 'src/utils'),
    };

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
