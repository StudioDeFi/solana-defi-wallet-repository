# Vercel Setup & Repository Migration Guide

> **📢 Note**: This repository now has automated deployment configured!  
> For complete deployment documentation, see: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

## Vercel Project Information
- **Project ID**: `prj_0jZfdorrk1hX9QvTbHOKAgSsrGWk`
- **Project URL**: `solana-defi-wallet-repository-git-main-tradeos.vercel.app`

## ✅ Automated Deployment Now Available

This repository is now configured with **automatic deployment** to Vercel via GitHub Actions.

### What's New:
1. **GitHub Actions Workflow** - Automatically deploys on every push to `main` branch
2. **Comprehensive Documentation** - Detailed setup and troubleshooting guides
3. **Both Deployment Methods** - Supports GitHub Actions and Vercel Git Integration

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for complete instructions.

## ⚠️ Important: Update Vercel Repository Connection (If Using Git Integration)

If you're using Vercel Git Integration, your project may be connected to the **old repository**:
- ❌ Old: `SMSDAO/solana-defi-wallet`
- ✅ New: `StudioDeFi/solana-defi-wallet-repository`

## Quick Fix: Update Repository Connection

### Option 1: Use GitHub Actions (Recommended)
No manual connection needed! Just configure secrets in GitHub:
1. Go to repository Settings → Secrets and variables → Actions
2. Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`
3. Push to `main` branch - deployment happens automatically!

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md#method-1-github-actions-recommended) for details.

### Option 2: Update Vercel Git Integration
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: `solana-defi-wallet-repository-git-main-tradeos`
3. Go to **Settings** → **Git**
4. Click **Disconnect** next to the old repository
5. Click **Connect Git Repository**
6. Select: `StudioDeFi/solana-defi-wallet-repository`
7. Click **Import**

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md#method-2-vercel-git-integration-alternative) for details.

## Required Environment Variables

Make sure these are set in Vercel **Settings** → **Environment Variables**:
```env
NODE_ENV=production
SKIP_ENV_VALIDATION=true
DATABASE_URL=your-database-connection-string
NEXT_PUBLIC_SOLANA_RPC_MAINNET=https://api.mainnet-beta.solana.com
# Generate with: openssl rand -base64 32
JWT_SECRET=your-secure-random-secret-32-chars-minimum
NEXT_PUBLIC_APP_URL=https://your-deployment-url.vercel.app
```

Optional API keys:
```env
BIRDEYE_API_KEY=your-birdeye-api-key
JUPITER_API_KEY=your-jupiter-api-key
```

## Build Configuration

The project uses these settings (from `vercel.json`):
- **Build Command**: `npm run vercel-build` (includes Prisma generate)
- **Install Command**: `npm install --legacy-peer-deps`
- **Framework**: Next.js 14 (auto-detected)
- **Node Version**: 20.x (recommended)

## Current Status

✅ Automated deployment workflows configured  
✅ GitHub Actions workflow for Vercel deployment  
✅ All dependencies updated (including jsonwebtoken)  
✅ Comprehensive deployment documentation  
⚠️ **Action Required**: Configure GitHub secrets OR update Vercel Git connection

## Next Steps

1. **Choose your deployment method**:
   - GitHub Actions (recommended): [Setup Guide](./VERCEL_DEPLOYMENT.md#setup-required-secrets)
   - Vercel Git Integration: [Setup Guide](./VERCEL_DEPLOYMENT.md#initial-setup)

2. **Configure environment variables** in Vercel Dashboard

3. **Test deployment** by pushing to `main` branch

## Need Help?

- **Full Documentation**: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- **GitHub Pages Deployment**: [GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md)
- **General Deployment Guide**: [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)
- **Repository Issues**: [Open an Issue](https://github.com/StudioDeFi/solana-defi-wallet-repository/issues)

