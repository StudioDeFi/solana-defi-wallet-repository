# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   - `DATABASE_URL`: PostgreSQL connection string
   - `NEXT_PUBLIC_SOLANA_RPC_MAINNET`: Solana RPC endpoint
   - `JWT_SECRET`: Secret key for JWT tokens
   - `BIRDEYE_API_KEY`: (Optional) Birdeye API key for price data

3. **Set Up Database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Mobile App Setup

1. **Navigate to mobile directory**
   ```bash
   cd mobile
   npm install
   ```

2. **Run on Android**
   ```bash
   npm run android
   ```

3. **Run on iOS**
   ```bash
   npm run ios
   ```

4. **Build for Production**
   ```bash
   npm run build:android  # For Android APK
   npm run build:ios      # For iOS App Store
   ```

## Desktop App Setup

1. **Navigate to desktop directory**
   ```bash
   cd desktop
   npm install
   ```

2. **Run in Development**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## API Keys

### Required
- **Solana RPC**: Get from [Solana RPC Providers](https://docs.solana.com/cluster/rpc-endpoints)
  - Or use public endpoints (may have rate limits)

### Optional
- **Birdeye API**: For enhanced price data
- **CoinGecko API**: For additional price sources

## Database Setup

1. **Install PostgreSQL**
   - Download from [postgresql.org](https://www.postgresql.org/download/)

2. **Create Database**
   ```sql
   CREATE DATABASE solana_wallet;
   ```

3. **Run Migrations**
   ```bash
   npx prisma migrate dev
   ```

## Troubleshooting

### TypeScript Errors
If you see module resolution errors, ensure:
- All dependencies are installed: `npm install`
- TypeScript is properly configured: `npm run type-check`

### Wallet Connection Issues
- Ensure wallet extension is installed (Phantom, Solflare, etc.)
- Check browser console for errors
- Verify RPC endpoint is accessible

### API Errors
- Check environment variables are set correctly
- Verify API keys are valid
- Check network connectivity

## Production Deployment

### Web
1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to Vercel, Netlify, or your preferred hosting:
   ```bash
   npm run start
   ```

### Mobile
1. Configure app.json with your app details
2. Build using EAS:
   ```bash
   eas build --platform android
   eas build --platform ios
   ```

### Desktop
1. Build the application:
   ```bash
   cd desktop
   npm run build
   ```

2. Installers will be in the `release` directory

