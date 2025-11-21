# GitHub Pages Deployment Guide

This repository is configured for automatic deployment to GitHub Pages on every push to the `main` branch.

## Overview

GitHub Pages deployment creates a static export of the Next.js application. This means:
- ✅ Client-side functionality works
- ✅ Static pages and routing
- ✅ Client-side API calls (to external APIs or Vercel deployment)
- ❌ Server-side API routes (not supported in static export)
- ❌ Server-side rendering (SSR)
- ❌ Incremental Static Regeneration (ISR)

**Note**: For full functionality including server-side features, use the Vercel deployment. GitHub Pages is suitable for static hosting and demo purposes.

## Automatic Deployment

### How It Works

The repository includes a GitHub Actions workflow (`.github/workflows/github-pages.yml`) that:
1. Triggers on every push to `main` branch
2. Installs dependencies
3. Builds a static export of the application
4. Deploys to GitHub Pages

### Enable GitHub Pages

1. **Go to Repository Settings**
   - Navigate to: `https://github.com/StudioDeFi/solana-defi-wallet-repository/settings/pages`

2. **Configure Source**
   - Under "Build and deployment"
   - **Source**: Select "GitHub Actions"
   - This enables the workflow-based deployment

3. **Wait for Deployment**
   - Push to `main` branch triggers deployment
   - Check "Actions" tab for deployment status
   - Once complete, site will be available at:
     `https://studiodefi.github.io/solana-defi-wallet-repository/`

### Custom Domain (Optional)

To use a custom domain:

1. **Add Custom Domain**
   - Go to Settings → Pages
   - Under "Custom domain", enter your domain
   - Click "Save"

2. **Configure DNS**
   - Add CNAME record pointing to: `studiodefi.github.io`
   - Or A records pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Update Base Path** (if using subdomain)
   - If not using custom domain, the base path is set automatically
   - For custom domain, no base path is needed

## Build Configuration

### Static Export Mode

The application uses conditional configuration for static export:

```javascript
// next.config.js
const isStaticExport = process.env.NEXT_CONFIG_MODE === 'static';

const nextConfig = {
  output: isStaticExport ? 'export' : undefined,
  images: {
    unoptimized: isStaticExport,
    // ... other config
  },
  // ... rest of config
};
```

### Build Script

The static export is built using:

```bash
npm run build:static
```

This sets `NEXT_CONFIG_MODE=static` which enables:
- Static export mode (`output: 'export'`)
- Unoptimized images (required for static export)
- Client-side only rendering

### Output Directory

The static export is generated in the `./out` directory, which contains:
- HTML files for all pages
- JavaScript bundles
- CSS files
- Static assets (images, fonts, etc.)

## Limitations & Workarounds

### API Routes

**Limitation**: Server-side API routes in `src/app/api/*` won't work in static export.

**Workaround**:
1. Use the Vercel deployment for API calls
2. Configure API base URL to point to Vercel:
   ```javascript
   const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://your-app.vercel.app';
   ```
3. Use external APIs directly from client-side code

### Environment Variables

Since this is a static export, environment variables must be set at build time:

```yaml
# In .github/workflows/github-pages.yml
env:
  NEXT_PUBLIC_SOLANA_RPC_MAINNET: https://api.mainnet-beta.solana.com
  NEXT_PUBLIC_API_BASE: https://your-vercel-deployment.vercel.app
```

All client-side environment variables must be prefixed with `NEXT_PUBLIC_`.

### Dynamic Routes

Static export supports dynamic routes, but they must be pre-generated at build time using `generateStaticParams`.

### Image Optimization

GitHub Pages doesn't support Next.js image optimization. Images are served unoptimized but still functional.

## Manual Deployment

While automatic deployment is configured, you can also deploy manually:

### Build Locally

```bash
# Install dependencies
npm install --legacy-peer-deps

# Build static export
npm run build:static

# Output will be in ./out directory
```

### Deploy with GitHub CLI

```bash
# Install GitHub CLI (if not already installed)
# https://cli.github.com/

# Push to main branch
git push origin main

# Deployment will trigger automatically
# Check status with:
gh run list --workflow=github-pages.yml
```

## Monitoring Deployment

### GitHub Actions

1. Go to repository on GitHub
2. Click "Actions" tab
3. Select "Deploy to GitHub Pages" workflow
4. View latest runs and logs

### Deployment Status

Check deployment status:
- Badge: ![GitHub Pages](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/github-pages.yml/badge.svg)
- URL: https://studiodefi.github.io/solana-defi-wallet-repository/

## Troubleshooting

### Build Fails

**Check workflow logs**:
1. Go to Actions tab
2. Click on failed workflow run
3. Expand build step to see errors

**Common issues**:

1. **Module not found errors**
   - Ensure all dependencies are in package.json
   - Try: `npm install --legacy-peer-deps`

2. **Static export errors**
   - Check if dynamic server features are used
   - Review Next.js static export compatibility

3. **Image optimization errors**
   - Ensure `images.unoptimized: true` is set for static export

### Pages Not Deploying

1. **Check GitHub Pages is enabled**
   - Settings → Pages → Source should be "GitHub Actions"

2. **Check workflow permissions**
   - Settings → Actions → General
   - Workflow permissions should include "Read and write permissions"

3. **Verify workflow file**
   - Ensure `.github/workflows/github-pages.yml` exists
   - Check for syntax errors

### 404 Errors

1. **Missing .nojekyll file**
   - Add `.nojekyll` file to `public/` directory
   - This prevents Jekyll processing

2. **Base path issues**
   - If using repository name in URL, ensure base path is set
   - Check routing configuration

### Assets Not Loading

1. **Check asset paths**
   - Use relative paths or Next.js Image component
   - Avoid hardcoded absolute paths

2. **CORS issues**
   - If loading assets from external sources
   - Ensure CORS headers are configured

## Comparison: GitHub Pages vs Vercel

| Feature | GitHub Pages | Vercel |
|---------|--------------|--------|
| Static Hosting | ✅ | ✅ |
| Server-Side Rendering | ❌ | ✅ |
| API Routes | ❌ | ✅ |
| Image Optimization | ❌ | ✅ |
| Edge Functions | ❌ | ✅ |
| Custom Domain | ✅ | ✅ |
| Automatic Deployment | ✅ | ✅ |
| Cost | Free | Free (with limits) |

**Recommendation**: Use Vercel for full functionality, GitHub Pages for static demos/documentation.

## CI/CD Pipeline

The deployment pipeline:

```
Push to main
    ↓
GitHub Actions Triggered
    ↓
Install Dependencies
    ↓
Generate Prisma Client
    ↓
Build Static Export
    ↓
Upload to GitHub Pages
    ↓
Deploy
    ↓
Live at GitHub Pages URL
```

## Best Practices

1. **Use environment variables for configuration**
   - Set in workflow file
   - Prefix with `NEXT_PUBLIC_` for client-side access

2. **Optimize bundle size**
   - Code splitting is enabled
   - Use dynamic imports for large components

3. **Test locally before pushing**
   ```bash
   npm run build:static
   npx serve out
   ```

4. **Monitor build times**
   - Keep dependencies minimal
   - Use caching in GitHub Actions

5. **Use Vercel for API endpoints**
   - Deploy full app to Vercel
   - Point GitHub Pages build to Vercel for API calls

## Support

- **GitHub Pages Documentation**: https://docs.github.com/pages
- **Next.js Static Export**: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- **Repository Issues**: https://github.com/StudioDeFi/solana-defi-wallet-repository/issues

---

**Last Updated**: 2025-11-21  
**GitHub Pages URL**: https://studiodefi.github.io/solana-defi-wallet-repository/
