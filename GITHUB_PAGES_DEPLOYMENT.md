# GitHub Pages Deployment Guide

This guide explains how to deploy the Solana Wallet application to GitHub Pages.

## Overview

The application is configured to generate a static export suitable for GitHub Pages deployment. The static files are output to the `/docs` directory.

⚠️ **Important**: API routes are not available in the static export. The GitHub Pages version only supports frontend features that don't require server-side API routes.

## Quick Start

### 1. Build for GitHub Pages

```bash
npm run build:pages
```

This command:
- Temporarily moves API routes (they can't be statically exported)
- Builds the application with static export configuration
- Outputs files to `/docs` directory
- Restores API routes after build

### 2. Commit and Push

```bash
git add docs/
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### 3. Configure GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `main` (or your default branch)
   - Folder: `/docs`
4. Click **Save**

Your site will be available at: `https://[username].github.io/[repository-name]/`

## Configuration

### Base Path

If deploying to a project page (not a user/organization page), you need to set the base path to your repository name:

```bash
# Set environment variable before building
export NEXT_PUBLIC_BASE_PATH=/solana-defi-wallet-repository
npm run build:pages
```

Or update `next.config.pages.js` directly:

```javascript
basePath: '/your-repository-name',
assetPrefix: '/your-repository-name',
```

### Custom Domain

If using a custom domain:

1. Create a `CNAME` file in the `/docs` directory:
   ```
   your-domain.com
   ```

2. Configure DNS records at your domain provider:
   - Add a CNAME record pointing to `[username].github.io`

3. Enable custom domain in GitHub Pages settings

## Testing Locally

Before deploying, test the static build locally:

```bash
# Option 1: Python
cd docs && python3 -m http.server 8000

# Option 2: Node.js serve package
npx serve docs

# Option 3: Any other static server
```

Then open `http://localhost:8000` in your browser.

## File Structure

```
docs/
├── .nojekyll          # Tells GitHub Pages to skip Jekyll processing
├── index.html         # Main page
├── 404.html          # Custom 404 page
├── _next/            # Next.js assets (JS, CSS, etc.)
├── manifest.json     # PWA manifest
└── ...
```

## Limitations

When deployed to GitHub Pages (static export):

- ❌ **API Routes**: Not available (they require a server)
  - `/api/swap/*` - Swap APIs
  - `/api/tokens/*` - Token APIs
  - `/api/prices/*` - Price APIs
  - `/api/orders/*` - Order APIs

- ✅ **Frontend Features**: Fully functional
  - Wallet connection
  - UI components
  - Client-side routing
  - Theme switching
  - Animations

## Alternative Deployments

For full functionality (including API routes), consider:

- **Vercel**: Automatic deployment with full Next.js support
- **Netlify**: Similar to Vercel
- **Railway**: Full-stack deployment
- **Self-hosted**: Docker, VPS, etc.

See [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) for more details.

## Troubleshooting

### Build Fails

**Issue**: Build fails with API route errors
```
Error: Page "/api/..." is missing "generateStaticParams()"
```

**Solution**: Make sure you're using `npm run build:pages`, not `npm run build`. The build:pages script handles API routes correctly.

### Assets Not Loading

**Issue**: CSS/JS files return 404

**Solution**: Check that `basePath` is set correctly for project pages:
```javascript
basePath: '/repository-name',
```

### 404 on Page Refresh

**Issue**: Refreshing any page except home shows 404

**Solution**: This is normal for client-side routing on GitHub Pages. The app handles it with the 404.html redirect trick that's already configured.

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy-pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm install --legacy-peer-deps
        
      - name: Build for GitHub Pages
        run: npm run build:pages
        
      - name: Deploy
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add docs/
          git commit -m "Deploy to GitHub Pages [skip ci]" || exit 0
          git push
```

## Maintenance

### Updating the Site

1. Make changes to your code
2. Run `npm run build:pages`
3. Commit and push the `/docs` directory
4. GitHub Pages will automatically update

### Keeping Dependencies Updated

```bash
# Update dependencies
npm update

# Check for security issues
npm audit

# Rebuild for Pages
npm run build:pages
```

## Support

For issues or questions:
- Check [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)
- Review [Next.js Static Export docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- Open an issue on GitHub

---

**Last Updated**: November 2025  
**Next.js Version**: 14.2.33
