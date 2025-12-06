# Copilot Instructions for Solana DeFi Wallet Repository

> **Trust these instructions.** Only perform additional searches if information here is incomplete or found to be in error.

## Repository Summary

A production-ready Solana DeFi wallet application with MEV protection, multi-wallet support, and swap aggregation across 22+ DEX platforms. The codebase is ~2,900 lines of TypeScript/React code in `src/`.

## Tech Stack & Requirements

| Component | Technology | Version |
|-----------|-----------|---------|
| Runtime | Node.js | 20.x (required) |
| Framework | Next.js | 14.x (App Router) |
| Language | TypeScript | 5.x (strict mode) |
| Styling | Tailwind CSS | 3.x |
| State | Zustand | 4.x |
| Animation | Framer Motion | 10.x |
| Database | PostgreSQL + Prisma | 5.x |
| Blockchain | @solana/web3.js, wallet-adapter | 1.x |

## Build Commands (Validated)

**ALWAYS run commands in this order.** The `.npmrc` file configures `legacy-peer-deps=true` globally.

```bash
# 1. Install dependencies (legacy-peer-deps is configured in .npmrc)
npm install

# 2. Generate Prisma client (runs automatically via postinstall, but can run manually)
npx prisma generate

# 3. Development server (http://localhost:3000)
npm run dev

# 4. Production build (~30-60 seconds)
npm run build

# 5. Start production server
npm run start
```

### Build Notes
- The build shows "Dynamic server usage" messages for API routes - this is expected behavior, not an error
- Build creates `.next/` directory with compiled output
- Database is optional for basic features (wallet connection, swap quotes, token browsing)
- Database required for: limit orders, DCA orders, user sessions

### Clean Build (if issues occur)
```bash
npm run clean       # Removes .next and node_modules directories
npm install         # Reinstall dependencies (uses .npmrc settings)
npm run build
```

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API routes
│   │   │   ├── orders/         # Limit & DCA order endpoints
│   │   │   ├── prices/         # Price data endpoints
│   │   │   ├── swap/           # Ultra/Standard/Lite swap APIs
│   │   │   └── tokens/         # Token registry endpoints
│   │   ├── globals.css         # Global styles & CSS variables
│   │   ├── layout.tsx          # Root layout with providers
│   │   └── page.tsx            # Home page (main entry)
│   ├── components/
│   │   ├── wallet/             # WalletProvider, WalletButton
│   │   ├── swap/               # SwapInterface
│   │   ├── tokens/             # TokenList
│   │   ├── portfolio/          # Portfolio display
│   │   ├── theme/              # ThemeProvider, ThemeSwitcher
│   │   ├── ui/                 # GlowCard, NeonText, AuraBackground
│   │   └── ErrorBoundary.tsx   # Global error handler
│   ├── lib/                    # Utilities (db.ts, solana.ts, aggregators)
│   ├── hooks/                  # useWallet, useTokenColors
│   ├── store/                  # Zustand stores (theme-store, wallet-store)
│   ├── types/                  # TypeScript interfaces (index.ts)
│   └── utils/                  # Helpers (cn.ts for class merging)
├── prisma/
│   └── schema.prisma           # Database schema (User, Session, Orders, etc.)
├── .github/workflows/          # CI pipelines
├── package.json                # Dependencies & scripts
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind theme/animations
├── tsconfig.json               # TypeScript config with path aliases
└── vercel.json                 # Vercel deployment config
```

## Path Aliases (use these for imports)

```typescript
import { Component } from '@/components/...';
import { util } from '@/lib/...';
import { useHook } from '@/hooks/...';
import { useStore } from '@/store/...';
import { Type } from '@/types/...';
import { helper } from '@/utils/...';
```

## GitHub Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `vercel-deploy.yml` | Push to main | Build verification & Vercel deploy |
| `nextjs.yml` | Push to main | GitHub Pages deployment |
| `auto-assign.yml` | Issue/PR opened | Auto-assign to maintainer |
| `proof-html.yml` | Push | HTML validation |

## Coding Standards

### Components
```typescript
'use client'; // Only for client components

import React from 'react';
import { ExternalDep } from 'external-package';
import { InternalDep } from '@/components/...';

interface ComponentProps {
  prop: string;
}

export function Component({ prop }: ComponentProps) {
  return <div>{prop}</div>;
}
```

### API Routes
```typescript
// Return format - always include success flag
{ data: T, success: true }      // Success
{ error: string, success: false } // Error
```

### Styling
- Use Tailwind utilities with `clsx` and `tailwind-merge`
- Theme colors via CSS variables: `var(--color-primary)`, `var(--color-glow)`
- See `DESIGN_SYSTEM.md` for component patterns

## Security (Critical for DeFi)

- **NEVER** log or expose private keys, seed phrases, or wallet secrets
- **ALWAYS** validate token addresses (Solana base58 format)
- **ALWAYS** sanitize user inputs before database operations
- **NEVER** commit `.env` files (verify in `.gitignore`)
- Use JWT for session management
- API routes should include rate limiting

## Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts |
| `tsconfig.json` | TypeScript with path aliases |
| `next.config.js` | Next.js, webpack, security headers |
| `tailwind.config.js` | Theme colors, animations |
| `postcss.config.js` | PostCSS plugins |
| `vercel.json` | Deployment, API function settings |
| `prisma/schema.prisma` | Database models |
| `.npmrc` | npm config (legacy-peer-deps=true) |

## Key Documentation

- `README.md` - Project overview, setup, API docs
- `DESIGN_SYSTEM.md` - UI components, architecture, styling
- `BUILD_VERIFICATION.md` - Build troubleshooting
- `PRODUCTION_DEPLOYMENT.md` - Vercel deployment guide
- `QUICK_START.md` - Local development guide

## Database Setup (Optional)

```bash
# Only needed for orders/sessions features
npx prisma generate           # Generate client
npx prisma migrate dev        # Create/apply migrations
```

Environment variables needed:
```
DATABASE_URL="postgresql://username:password@localhost:5432/solana_wallet"
DIRECT_DATABASE_URL="postgresql://username:password@localhost:5432/solana_wallet"
```

## Validation Checklist

Before submitting changes:
1. ✅ `npm run build` completes without errors
2. ✅ No TypeScript errors in modified files
3. ✅ Path aliases used for imports
4. ✅ No `.env` values committed
5. ✅ API responses use `{ data, success }` format
