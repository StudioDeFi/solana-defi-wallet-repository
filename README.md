# Solana Wallet - Advanced Multi-Platform Wallet

[![GitHub Pages](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/github-pages.yml/badge.svg)](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/github-pages.yml)
[![Vercel Deployment](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/vercel-deploy.yml/badge.svg)](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/vercel-deploy.yml)
[![Proof HTML](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/proof-html.yml/badge.svg)](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/proof-html.yml)
[![Auto Assign](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/auto-assign.yml/badge.svg)](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/auto-assign.yml)

A comprehensive Solana wallet application with advanced features, MEV protection, and multi-platform support (Web, Mobile APK, iOS, Windows).

## Features

### 🚀 Core Features
- **Multi-Wallet Support**: Connect with Phantom, Solflare, Torus, Ledger, MathWallet, and more
- **Ultra API**: MEV protection, dynamic slippage, priority fees
- **Standard Swap API**: Most common use case preset
- **Lite API**: Optimized for speed
- **Prices API**: Real-time multi-source pricing from 22+ DEX and 40+ swap aggregators
- **Token API**: 22,000+ tokens with logos, metadata, and sensor scoring
- **Limit Order API**: Conditional orders
- **DCA API**: Dollar cost averaging

### 🎨 UI Features
- **Modern 3D Design**: Aura FX and NEON Glow effects
- **Dynamic Color Matching**: Automatically matches token logo colors to UI elements
- **Theme System**: Dark, Dim, and Day modes
- **Responsive Design**: Works seamlessly across all devices

### 🔒 Security
- Secure API framework with authentication
- Admin controls and database integration
- Rate limiting and request validation
- JWT-based session management

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Solana**: @solana/web3.js, @solana/wallet-adapter
- **Database**: PostgreSQL with Prisma ORM
- **API**: Next.js API Routes

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Solana RPC endpoint (or use public endpoints)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/StudioDeFi/solana-defi-wallet-repository.git
cd solana-defi-wallet-repository
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/solana_wallet"
NEXT_PUBLIC_SOLANA_RPC_MAINNET="https://api.mainnet-beta.solana.com"
JWT_SECRET="your-secret-key"
BIRDEYE_API_KEY="your-birdeye-api-key"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/          # API routes
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   ├── wallet/      # Wallet connection components
│   │   ├── swap/        # Swap interface
│   │   ├── tokens/      # Token list components
│   │   ├── portfolio/   # Portfolio components
│   │   ├── theme/       # Theme components
│   │   └── ui/          # UI components (GlowCard, NeonText, etc.)
│   ├── lib/             # Utility libraries
│   │   ├── solana.ts    # Solana utilities
│   │   ├── swap-aggregators.ts
│   │   ├── price-aggregators.ts
│   │   └── token-registry.ts
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Zustand state management
│   ├── types/           # TypeScript types
│   └── api/             # API SDK
├── prisma/              # Database schema
└── public/              # Static assets
```

## API Documentation

### Swap APIs

#### Ultra API
```typescript
POST /api/swap/ultra
{
  inputMint: string;
  outputMint: string;
  amount: string;
  mevProtection?: boolean;
  dynamicSlippage?: boolean;
  priorityFee?: 'low' | 'medium' | 'high';
}
```

#### Standard Swap API
```typescript
POST /api/swap/standard
{
  inputMint: string;
  outputMint: string;
  amount: string;
  slippage?: number;
}
```

#### Lite API
```typescript
POST /api/swap/lite
{
  inputMint: string;
  outputMint: string;
  amount: string;
}
```

### Prices API
```typescript
GET /api/prices?tokens=TOKEN1,TOKEN2&sources=coingecko,birdeye
GET /api/prices/[token]
```

### Token API
```typescript
GET /api/tokens?search=SOL&verified=true&limit=50
GET /api/tokens/[address]
```

### Orders API
```typescript
# Limit Orders
GET /api/orders/limit
POST /api/orders/limit
DELETE /api/orders/limit/[id]

# DCA Orders
GET /api/orders/dca
POST /api/orders/dca
PATCH /api/orders/dca/[id]/pause
PATCH /api/orders/dca/[id]/resume
DELETE /api/orders/dca/[id]
```

## Mobile & Desktop Apps

### Mobile (React Native)
```bash
cd mobile
npm install
npm run android  # For Android APK
npm run ios      # For iOS
```

### Desktop (Electron/Tauri)
```bash
cd desktop
npm install
npm run dev      # Development
npm run build    # Production build
```

## Security Features

- JWT-based authentication
- Rate limiting on API endpoints
- Input validation and sanitization
- Secure wallet connection handling
- MEV protection for swaps
- Dynamic slippage calculation

## 📦 Version 1.0.0

**First Production Release** - January 20, 2025

This release includes:
- ✅ Production-ready optimizations (SEO, performance, security)
- ✅ Comprehensive error handling and accessibility
- ✅ Complete design system with documentation
- ✅ Full API documentation
- ✅ Vercel deployment ready

See [CHANGELOG.md](./CHANGELOG.md) for full release notes.

## 🚀 Automated Deployment

This repository is configured for automatic deployment to both **GitHub Pages** and **Vercel** on every push to the `main` branch.

### GitHub Pages (Static Export)
- **URL**: https://studioDefi.github.io/solana-defi-wallet-repository/
- **Status**: ![GitHub Pages](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/github-pages.yml/badge.svg)
- **Features**: Static hosting, client-side functionality
- **Setup**: [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) - Quick setup guide
- **Documentation**: [GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md) - Full documentation

### Vercel (Full Features)
- **Project ID**: `prj_0jZfdorrk1hX9QvTbHOKAgSsrGWk`
- **Status**: ![Vercel Deployment](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/vercel-deploy.yml/badge.svg)
- **Features**: Full Next.js with SSR, API routes, and server-side features
- **Setup**: [VERCEL_SECRETS_SETUP.md](./VERCEL_SECRETS_SETUP.md) - Configure GitHub secrets
- **Documentation**: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - Full documentation

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/StudioDeFi/solana-defi-wallet-repository)

1. Click the button above or go to [vercel.com](https://vercel.com)
2. Import this repository: `https://github.com/StudioDeFi/solana-defi-wallet-repository`
3. Add environment variables (see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md))
4. Deploy!

## 📚 Documentation

### Deployment Guides
- **[Deployment Summary](./DEPLOYMENT_SUMMARY.md)** - Quick reference for all deployment options
- **[GitHub Pages Setup](./GITHUB_PAGES_SETUP.md)** - Enable GitHub Pages in 5 minutes
- **[GitHub Pages Deployment](./GITHUB_PAGES_DEPLOYMENT.md)** - Complete static deployment guide
- **[Vercel Secrets Setup](./VERCEL_SECRETS_SETUP.md)** - Configure GitHub Actions secrets for Vercel
- **[Vercel Deployment](./VERCEL_DEPLOYMENT.md)** - Complete Vercel deployment guide
- **[Production Deployment](./PRODUCTION_DEPLOYMENT.md)** - General deployment for various platforms

### Project Documentation
- **[Design System](./DESIGN_SYSTEM.md)** - Component architecture, usage, and wire-up documentation
- **[Optimization Summary](./OPTIMIZATION_SUMMARY.md)** - All production optimizations applied
- **[CHANGELOG](./CHANGELOG.md)** - Version history and detailed release notes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## About

**Repository:** [https://github.com/StudioDeFi/solana-defi-wallet-repository](https://github.com/StudioDeFi/solana-defi-wallet-repository)

**Version:** 1.0.0  
**Maintained by:** StudioDeFi  
**Release Date:** January 20, 2025
