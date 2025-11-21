# Vercel Automatic Deployment Guide

This repository is configured for automatic deployment to Vercel on every push to the `main` branch.

## Project Information

- **Project ID**: `prj_0jZfdorrk1hX9QvTbHOKAgSsrGWk`
- **Repository**: `StudioDeFi/solana-defi-wallet-repository`
- **Branch**: `main`

## Deployment Methods

### Method 1: GitHub Actions (Recommended)

The repository includes a GitHub Actions workflow (`.github/workflows/vercel-deploy.yml`) that automatically deploys to Vercel on every push to the main branch.

#### Setup Required Secrets

To enable GitHub Actions deployment, add these secrets in your GitHub repository settings (`Settings` → `Secrets and variables` → `Actions`):

1. **VERCEL_TOKEN**: Your Vercel authentication token
   - Generate at: https://vercel.com/account/tokens
   - Required scope: Full access to your Vercel account

2. **VERCEL_ORG_ID**: Your Vercel organization/team ID
   - Find in Vercel project settings → General → Project ID section
   - Or run: `vercel whoami` after logging in with Vercel CLI

#### How It Works

1. On push to `main` branch, the workflow:
   - Checks out the code
   - Installs Vercel CLI
   - Pulls Vercel environment configuration
   - Builds the project
   - Deploys to Vercel production

2. You can also trigger deployment manually:
   - Go to Actions tab in GitHub
   - Select "Vercel Deployment" workflow
   - Click "Run workflow"

### Method 2: Vercel Git Integration (Alternative)

Connect your GitHub repository directly to Vercel for automatic deployments:

#### Initial Setup

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Connect Repository**
   - Select "Import Git Repository"
   - Authorize GitHub access if needed
   - Select: `StudioDeFi/solana-defi-wallet-repository`
   - Click "Import"

3. **Configure Project**
   - **Project Name**: (auto-filled)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run vercel-build` (from vercel.json)
   - **Install Command**: `npm install --legacy-peer-deps` (from vercel.json)
   - **Output Directory**: `.next` (auto-detected)

4. **Environment Variables**

   Add these environment variables in Vercel project settings:

   ```env
   # Required
   NODE_ENV=production
   SKIP_ENV_VALIDATION=true
   
   # Database (if using)
   DATABASE_URL=your-database-connection-string
   
   # Solana RPC
   NEXT_PUBLIC_SOLANA_RPC_MAINNET=https://api.mainnet-beta.solana.com
   
   # Authentication
   # Replace with a secure random string of at least 32 characters
   # Generate with: openssl rand -base64 32
   JWT_SECRET=your-secure-random-secret-32-chars-minimum
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=https://your-deployment-url.vercel.app
   
   # Optional API Keys
   BIRDEYE_API_KEY=your-birdeye-api-key
   JUPITER_API_KEY=your-jupiter-api-key
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at `https://your-project.vercel.app`

#### Automatic Deployments

Once connected, Vercel will automatically:
- Deploy every push to `main` branch (production)
- Create preview deployments for pull requests
- Run build checks on commits

## Build Configuration

The project uses the configuration from `vercel.json`:

```json
{
  "buildCommand": "npm run vercel-build",
  "installCommand": "npm install --legacy-peer-deps",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### Build Process

1. **Install Dependencies**: `npm install --legacy-peer-deps`
2. **Generate Prisma Client**: `npx prisma generate`
3. **Build Next.js**: `next build`

### Build Settings

- **Node Version**: 20.x (recommended)
- **Framework**: Next.js 14
- **Package Manager**: npm
- **Build Command**: `npm run vercel-build`

## Vercel CLI Manual Deployment

For manual deployments using Vercel CLI:

### Install Vercel CLI

```bash
npm install -g vercel
```

### Login to Vercel

```bash
vercel login
```

### Link Project (First Time)

```bash
vercel link
# Enter project ID when prompted: prj_0jZfdorrk1hX9QvTbHOKAgSsrGWk
```

### Deploy to Production

```bash
# Deploy to production
vercel --prod

# Or with environment variables
vercel --prod \
  -e NODE_ENV=production \
  -e SKIP_ENV_VALIDATION=true
```

### Deploy to Preview

```bash
# Deploy preview environment
vercel
```

## Monitoring Deployments

### Via Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Select your project
3. View deployments, logs, and analytics

### Via GitHub Actions

1. Go to your repository
2. Click "Actions" tab
3. View workflow runs and logs

## Environment Variables Management

### Adding/Updating Variables

#### Via Vercel Dashboard

1. Go to Project Settings → Environment Variables
2. Add or update variables
3. Redeploy to apply changes

#### Via Vercel CLI

```bash
# Add environment variable
vercel env add VARIABLE_NAME production

# List environment variables
vercel env ls

# Pull environment variables
vercel env pull
```

## Troubleshooting

### Build Fails

**Check build logs**:
- Vercel Dashboard → Deployments → Select deployment → View logs
- GitHub Actions → Workflow run → Build step logs

**Common issues**:

1. **Missing environment variables**
   - Solution: Add required variables in Vercel settings

2. **Prisma client generation fails**
   - Solution: Ensure `DATABASE_URL` is set
   - Or use: `npx prisma generate || echo "Skipped"`

3. **Package installation fails**
   - Solution: Check if `--legacy-peer-deps` is used
   - Update install command in vercel.json

### Deployment Not Triggering

**For GitHub Actions**:
- Check if secrets are configured
- Verify workflow file is in `.github/workflows/`
- Check Actions tab for errors

**For Vercel Git Integration**:
- Verify repository is connected in Vercel dashboard
- Check if branch is set to `main`
- Verify webhooks are active (Settings → Git)

### Preview Deployments Not Working

- Ensure Vercel Git integration is connected
- Check if preview deployments are enabled (Project Settings → Git)
- Verify pull request has commits pushed

## Performance & Optimization

### Enabled Optimizations

- ✅ SWC minification
- ✅ Image optimization
- ✅ Code splitting
- ✅ Compression
- ✅ Edge caching
- ✅ Serverless functions (API routes)

### Monitoring Performance

- Use Vercel Analytics (if enabled)
- Check Lighthouse scores
- Monitor Core Web Vitals

## Support & Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Repository Issues**: https://github.com/StudioDeFi/solana-defi-wallet-repository/issues

## Deployment Status

Current deployment status can be monitored via:
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub Actions Badge: ![Vercel Deployment](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/vercel-deploy.yml/badge.svg)

---

**Last Updated**: 2025-11-21  
**Vercel Project ID**: `prj_0jZfdorrk1hX9QvTbHOKAgSsrGWk`
