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
  
  // Set base path for GitHub Pages deployment
  // 
  // For user/organization pages (username.github.io):
  //   Leave basePath empty (default)
  //   Site will be at: https://username.github.io/
  //
  // For project pages (username.github.io/repository-name):
  //   Set basePath to your repository name
  //   Example: basePath: '/solana-defi-wallet-repository'
  //   Site will be at: https://username.github.io/repository-name/
  //
  // Set via environment variable before build:
  //   export NEXT_PUBLIC_BASE_PATH=/your-repo-name
  //   npm run build:pages
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  
  // Asset prefix must match basePath for proper asset loading
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
