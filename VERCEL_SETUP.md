# Vercel Setup & Repository Migration Guide

## ⚠️ Critical: Update Vercel Repository Connection

Your Vercel project is currently connected to the **old repository**:
- ❌ Old: `SMSDAO/solana-defi-wallet`
- ✅ New: `StudioDeFi/solana-defi-wallet-repository`

## Steps to Fix Vercel Repository Connection

### 1. Go to Vercel Dashboard
1. Navigate to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: `solana-defi-wallet-repository-git-main-tradeos`

### 2. Update Git Repository
1. Go to **Settings** → **Git**
2. Click **Disconnect** next to the old repository
3. Click **Connect Git Repository**
4. Select **GitHub** and authorize if needed
5. Search for and select: `StudioDeFi/solana-defi-wallet-repository`
6. Click **Import**

### 3. Verify Configuration
After connecting, verify:
- ✅ Repository: `StudioDeFi/solana-defi-wallet-repository`
- ✅ Branch: `main`
- ✅ Root Directory: `./` (default)
- ✅ Build Command: `npm run vercel-build`
- ✅ Install Command: `npm install --legacy-peer-deps`

### 4. Environment Variables
Make sure these are set in **Settings** → **Environment Variables**:
```
DATABASE_URL=your-database-url
NEXT_PUBLIC_SOLANA_RPC_MAINNET=https://api.mainnet-beta.solana.com
JWT_SECRET=your-secret-key
NEXT_PUBLIC_APP_URL=https://solana-defi-wallet-repository-git-main-tradeos.vercel.app
NODE_ENV=production
```

### 5. Trigger Deployment
After updating the repository:
- Vercel will automatically trigger a new deployment
- Or manually trigger: **Deployments** → **Redeploy**

## Build Configuration

The project is configured with:
- **Build Command**: `npm run vercel-build` (includes Prisma generate)
- **Install Command**: `npm install --legacy-peer-deps`
- **Framework**: Next.js (auto-detected)
- **Node Version**: 20.x (recommended)

## Troubleshooting

### If build still fails:
1. Check that repository is correctly connected
2. Verify environment variables are set
3. Check build logs for specific errors
4. Ensure `package-lock.json` is committed (it is)

### Common Issues:
- **"Invalid Version" error**: Fixed by regenerating `package-lock.json` ✅
- **"Prisma command not found"**: Fixed by using `npx prisma generate` ✅
- **"Tailwind CSS not found"**: Fixed by ensuring it's in dependencies ✅
- **Wrong repository**: Update Vercel Git connection ⚠️

## Current Status

✅ All code fixes applied
✅ `package-lock.json` regenerated
⚠️ **Vercel repository connection needs update**

Once the repository is updated in Vercel, the build should succeed!

