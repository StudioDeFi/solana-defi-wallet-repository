# Localhost Deployment Guide

## Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
npm install --legacy-peer-deps
```

If you encounter issues, try:
```bash
npm install --force
```

### Step 2: Set Up Database
```bash
# Generate Prisma client
npx prisma generate

# Create database and run migrations
npx prisma migrate dev --name init
```

### Step 3: Start Development Server
```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

---

## Manual Setup (If Issues Occur)

### 1. Create .env file
Create a `.env` file in the root directory with:
```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_SOLANA_RPC_MAINNET="https://api.mainnet-beta.solana.com"
JWT_SECRET="dev-secret-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize Database
```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Run Development Server
```bash
npm run dev
```

---

## Troubleshooting

### Database Issues
If you get database errors, the app will still work for basic features (wallet connection, token viewing) without a database. The database is only needed for:
- Limit orders
- DCA orders
- User sessions

### Port Already in Use
If port 3000 is busy:
```bash
PORT=3001 npm run dev
```

### TypeScript Errors
These are usually resolved after:
```bash
npm install
npx prisma generate
```

---

## What Works Without Database

✅ Wallet connection
✅ Token browsing
✅ Price viewing
✅ Swap quotes (viewing)
❌ Limit orders (needs DB)
❌ DCA orders (needs DB)
❌ User sessions (needs DB)

---

## Next Steps After Deployment

1. **Connect a Wallet**: Click "Connect Wallet" and select Phantom, Solflare, etc.
2. **Browse Tokens**: View the token list with search functionality
3. **Get Swap Quotes**: Use the swap interface to get quotes (Ultra/Standard/Lite modes)
4. **View Portfolio**: See your wallet balance and holdings

Enjoy your Solana Wallet! 🚀

