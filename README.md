![Auto Assign](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/auto-assign.yml/badge.svg)
![Proof HTML](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/proof-html.yml/badge.svg)
![Vercel Deployment](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/vercel-deploy.yml/badge.svg)

# Solana Wallet - Advanced Multi-Platform Wallet

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

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/StudioDeFi/solana-defi-wallet-repository)

1. Click the button above or go to [vercel.com](https://vercel.com)
2. Import this repository: `https://github.com/StudioDeFi/solana-defi-wallet-repository`
3. Add environment variables (see [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md))
4. Deploy!

## 🐳 Docker Deployment

Deploy the full application stack locally using Docker with a single command.

### Prerequisites

- **Docker**: Version 20.10+ ([Install Docker](https://docs.docker.com/get-docker/))
- **Docker Compose**: Version 2.0+ (included with Docker Desktop)
- **Make**: GNU Make (optional, for convenience commands)

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/StudioDeFi/solana-defi-wallet-repository.git
cd solana-defi-wallet-repository

# 2. Copy environment file and configure
cp .env.example .env
# Edit .env with your configuration (see Environment Variables below)

# 3. Build and start all services
make up-build
# Or without make: docker compose up -d --build

# 4. Check service status
make status

# 5. View logs
make logs
```

The application will be available at:
- **Web App**: http://localhost (via nginx)
- **Direct App**: http://localhost:3000
- **Database**: localhost:5432

### Environment Variables

Key environment variables to configure in `.env`:

| Variable | Description | Default |
|----------|-------------|---------|
| `POSTGRES_USER` | Database username | `solana_user` |
| `POSTGRES_PASSWORD` | Database password | (required) |
| `POSTGRES_DB` | Database name | `solana_wallet` |
| `JWT_SECRET` | JWT signing secret | (required) |
| `NEXT_PUBLIC_SOLANA_RPC_MAINNET` | Solana RPC endpoint | Public endpoint |
| `BIRDEYE_API_KEY` | Birdeye API key | (optional) |
| `LOG_LEVEL` | Logging level | `info` |

### Makefile Commands

| Command | Description |
|---------|-------------|
| `make up` | Start all services |
| `make down` | Stop and remove all services |
| `make restart` | Restart all services |
| `make logs` | View logs from all services |
| `make logs-app` | View application logs |
| `make logs-db` | View database logs |
| `make build` | Build Docker images |
| `make rebuild` | Rebuild images (no cache) |
| `make migrate` | Run database migrations |
| `make seed` | Seed the database |
| `make shell-app` | Open shell in app container |
| `make shell-db` | Open psql shell in database |
| `make status` | Show status of all services |
| `make health` | Check health of all services |
| `make clean` | Remove containers and volumes |
| `make backup-db` | Backup database |
| `make restore-db` | Restore database from backup |

### Database Management

```bash
# Run migrations
make migrate

# Check migration status
make migrate-status

# Seed database with test data
make seed

# Access database shell
make shell-db

# Backup database
make backup-db

# Restore from backup
make restore-db BACKUP=backups/backup_file.sql
```

### Troubleshooting

**Services won't start:**
```bash
# Check logs for errors
make logs

# Rebuild from scratch
make rebuild
make up
```

**Database connection issues:**
```bash
# Verify database is running
make status

# Check database health
make health

# View database logs
make logs-db
```

**Reset everything:**
```bash
# Remove all containers and volumes (WARNING: deletes data)
make clean

# Fresh start
make fresh
```

### Development vs Production

| Aspect | Development | Production |
|--------|-------------|------------|
| Image size | Larger (dev deps) | Optimized (multi-stage) |
| User | Root (convenience) | Non-root (security) |
| Logs | Verbose | Configurable level |
| Rebuild | Frequent | Cache-optimized |

For production deployments, ensure:
- Strong passwords in `.env`
- SSL certificates in `nginx/ssl/`
- Proper firewall rules
- Regular database backups

### Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Nginx     │────▶│    App      │────▶│  PostgreSQL │
│   :80/:443  │     │    :3000    │     │    :5432    │
└─────────────┘     └─────────────┘     └─────────────┘
     ▲                    │
     │              Health Check
   Client           /api/health
```

## 📚 Documentation

- **[Production Deployment Guide](./PRODUCTION_DEPLOYMENT.md)** - Complete deployment instructions for Vercel and other platforms
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
