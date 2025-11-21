# Deployment Summary

This document provides a quick overview of all deployment options available for this repository.

## Automated Deployments ✅

This repository is configured for **automatic deployment** on every push to the `main` branch:

### 1. GitHub Pages (Static Export)
- **Status**: ![GitHub Pages](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/github-pages.yml/badge.svg)
- **URL**: https://studiodefi.github.io/solana-defi-wallet-repository/
- **Type**: Static site (client-side only)
- **Workflow**: `.github/workflows/github-pages.yml`
- **Documentation**: [GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md)

**Features**:
- ✅ Static hosting (free)
- ✅ Client-side functionality
- ✅ Automatic deployment on push to main
- ❌ No server-side API routes
- ❌ No SSR/ISR

**Setup**: GitHub Pages is already configured. Just push to `main` branch!

### 2. Vercel (Full Features)
- **Status**: ![Vercel Deployment](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/vercel-deploy.yml/badge.svg)
- **Project ID**: `prj_0jZfdorrk1hX9QvTbHOKAgSsrGWk`
- **Type**: Full Next.js application
- **Workflow**: `.github/workflows/vercel-deploy.yml`
- **Documentation**: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

**Features**:
- ✅ Full Next.js features (SSR, ISR, API routes)
- ✅ Server-side rendering
- ✅ API endpoints
- ✅ Image optimization
- ✅ Edge functions
- ✅ Automatic deployment on push to main

**Setup Required**:
1. Add GitHub Secrets:
   - `VERCEL_TOKEN`: Your Vercel authentication token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
2. Configure environment variables in Vercel Dashboard
3. Push to `main` branch

**Alternative Setup**: Connect repository directly in Vercel Dashboard (see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md#method-2-vercel-git-integration-alternative))

## Deployment Comparison

| Feature | GitHub Pages | Vercel |
|---------|--------------|--------|
| **Cost** | Free | Free (with limits) |
| **Setup** | Automatic ✅ | Requires secrets ⚠️ |
| **Static Pages** | ✅ | ✅ |
| **API Routes** | ❌ | ✅ |
| **SSR/ISR** | ❌ | ✅ |
| **Image Optimization** | ❌ | ✅ |
| **Custom Domain** | ✅ | ✅ |
| **HTTPS** | ✅ | ✅ |
| **Auto Deploy** | ✅ | ✅ |

**Recommendation**: 
- Use **Vercel** for production (full features)
- Use **GitHub Pages** for demos/documentation

## Quick Start Guide

### Deploy to GitHub Pages
Already configured! Just push to `main`:
```bash
git push origin main
```

Check deployment status: [Actions Tab](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/github-pages.yml)

### Deploy to Vercel

#### Method 1: GitHub Actions
1. Add secrets in GitHub repo settings:
   ```
   VERCEL_TOKEN=<your-token>
   VERCEL_ORG_ID=<your-org-id>
   ```
2. Push to main:
   ```bash
   git push origin main
   ```

#### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

#### Method 3: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/StudioDeFi/solana-defi-wallet-repository)

## Environment Variables

### Required for Vercel
```env
NODE_ENV=production
SKIP_ENV_VALIDATION=true
DATABASE_URL=your-database-connection-string
NEXT_PUBLIC_SOLANA_RPC_MAINNET=https://api.mainnet-beta.solana.com
# Replace with a secure random string of at least 32 characters
# Generate with: openssl rand -base64 32
JWT_SECRET=your-secure-random-secret-32-chars-minimum
NEXT_PUBLIC_APP_URL=https://your-deployment-url.vercel.app
```

### Optional
```env
BIRDEYE_API_KEY=your-birdeye-api-key
JUPITER_API_KEY=your-jupiter-api-key
```

## Build Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm run build` | Standard Next.js build | Vercel, local production |
| `npm run build:static` | Static export | GitHub Pages |
| `npm run vercel-build` | Vercel-specific build | Vercel deployment |
| `npm run dev` | Development server | Local development |

## CI/CD Workflows

### GitHub Actions Workflows

1. **GitHub Pages Deployment** (`.github/workflows/github-pages.yml`)
   - Trigger: Push to `main` or manual dispatch
   - Steps: Install → Generate Prisma → Build Static → Deploy
   - Output: Static site to GitHub Pages

2. **Vercel Deployment** (`.github/workflows/vercel-deploy.yml`)
   - Trigger: Push to `main` or manual dispatch
   - Steps: Install Vercel CLI → Pull config → Build → Deploy
   - Output: Full app to Vercel

3. **Proof HTML** (`.github/workflows/proof-html.yml`)
   - Trigger: Push to any branch
   - Purpose: Validate HTML files

4. **Auto Assign** (`.github/workflows/auto-assign.yml`)
   - Trigger: Issue/PR creation
   - Purpose: Auto-assign reviewers

## Monitoring & Status

### Check Deployment Status

- **GitHub Pages**: [Workflow Status](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/github-pages.yml)
- **Vercel**: [Workflow Status](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/vercel-deploy.yml)
- **Vercel Dashboard**: https://vercel.com/dashboard

### View Live Deployments

- **GitHub Pages**: https://studiodefi.github.io/solana-defi-wallet-repository/
- **Vercel**: Check Vercel Dashboard for URL

## Troubleshooting

### GitHub Pages Issues
- **404 errors**: Ensure GitHub Pages is enabled in repo settings
- **Assets not loading**: Check base path configuration
- See: [GITHUB_PAGES_DEPLOYMENT.md#troubleshooting](./GITHUB_PAGES_DEPLOYMENT.md#troubleshooting)

### Vercel Issues
- **Build fails**: Check environment variables
- **Deployment not triggering**: Verify GitHub secrets are set
- See: [VERCEL_DEPLOYMENT.md#troubleshooting](./VERCEL_DEPLOYMENT.md#troubleshooting)

## Documentation

- **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Complete Vercel deployment guide
- **[GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md)** - GitHub Pages setup and configuration
- **[VERCEL_SETUP.md](./VERCEL_SETUP.md)** - Quick reference for Vercel setup
- **[PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)** - General production deployment guide
- **[README.md](./README.md)** - Project overview and getting started

## Support

- **Issues**: [GitHub Issues](https://github.com/StudioDeFi/solana-defi-wallet-repository/issues)
- **Discussions**: [GitHub Discussions](https://github.com/StudioDeFi/solana-defi-wallet-repository/discussions)
- **Documentation**: Check files listed above

---

**Last Updated**: 2025-11-21  
**Repository**: StudioDeFi/solana-defi-wallet-repository  
**Version**: 1.0.0
