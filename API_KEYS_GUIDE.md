# 🔑 API Keys Setup Guide

## Quick Setup

Your `.env` file has been created with all necessary API keys. Now you need to add your actual API keys.

## Required API Keys (Recommended)

### 1. **Birdeye API** - Token Prices & Analytics
- **Why**: Real-time Solana token prices, market data, and analytics
- **Get it**: https://birdeye.so/developers
- **Free tier**: Available
- **Update**: 
  ```powershell
  .\scripts\update-env.ps1 -Key 'BIRDEYE_API_KEY' -Value 'your-key-here'
  ```

### 2. **CoinGecko API** - Market Data
- **Why**: Comprehensive cryptocurrency market data
- **Get it**: https://www.coingecko.com/en/api
- **Free tier**: 10-50 calls/minute
- **Update**:
  ```powershell
  .\scripts\update-env.ps1 -Key 'COINGECKO_API_KEY' -Value 'your-key-here'
  ```

### 3. **Solscan API** - Blockchain Explorer
- **Why**: Transaction history, token info, wallet analytics
- **Get it**: https://public-api.solscan.io/
- **Free tier**: Available
- **Update**:
  ```powershell
  .\scripts\update-env.ps1 -Key 'SOLSCAN_API_KEY' -Value 'your-key-here'
  ```

## Optional API Keys

### 4. **Custom Solana RPC** (Recommended for Production)
- **Why**: Better performance, higher rate limits
- **Providers**:
  - QuickNode: https://www.quicknode.com
  - Alchemy: https://www.alchemy.com
  - Helius: https://helius.dev
- **Update**:
  ```powershell
  .\scripts\update-env.ps1 -Key 'NEXT_PUBLIC_SOLANA_RPC_MAINNET' -Value 'https://your-rpc-endpoint.com'
  .\scripts\update-env.ps1 -Key 'SOLANA_RPC_API_KEY' -Value 'your-rpc-key'
  ```

## Security Best Practices

### ✅ Do's
- ✅ Use different keys for development and production
- ✅ Rotate keys regularly (every 90 days)
- ✅ Enable 2FA on all API accounts
- ✅ Monitor API usage for suspicious activity
- ✅ Use environment-specific `.env` files
- ✅ Never commit `.env` to git (already in `.gitignore`)

### ❌ Don'ts
- ❌ Never share API keys publicly
- ❌ Don't hardcode keys in source code
- ❌ Don't use production keys in development
- ❌ Don't commit `.env` files to version control

## Using the Auto-Update Scripts

### Windows (PowerShell)
```powershell
# Update a single key
.\scripts\update-env.ps1 -Key 'BIRDEYE_API_KEY' -Value 'your-key'

# List all current keys
.\scripts\update-env.ps1 -List

# Show help
.\scripts\update-env.ps1 -Help
```

### Mac/Linux (Bash)
```bash
# Make script executable (first time only)
chmod +x scripts/update-env.sh

# Update a single key
./scripts/update-env.sh BIRDEYE_API_KEY 'your-key'

# List all current keys
./scripts/update-env.sh list

# Show help
./scripts/update-env.sh help
```

## Manual Update

You can also edit `.env` directly:
```env
BIRDEYE_API_KEY="your-key-here"
COINGECKO_API_KEY="your-key-here"
SOLSCAN_API_KEY="your-key-here"
```

## Testing Your Keys

After adding keys, restart your dev server:
```bash
npm run dev
```

The app will automatically use the new keys. Check the browser console for any API errors.

## What Works Without API Keys?

✅ **Basic Features** (No keys needed):
- Wallet connection
- Token browsing (using public Jupiter API)
- Basic swap quotes
- UI and themes

⚠️ **Limited Features** (Works but limited):
- Price data (uses free public APIs)
- Token metadata (uses public sources)

❌ **Requires API Keys**:
- Enhanced price data (Birdeye/CoinGecko)
- Transaction history (Solscan)
- Advanced analytics

## Production Deployment

For production, use environment variables in your hosting platform:

### Vercel
1. Go to Project Settings → Environment Variables
2. Add each key as a variable
3. Redeploy

### Other Platforms
Set environment variables in your platform's dashboard or CI/CD pipeline.

## Need Help?

- Check API provider documentation
- Verify keys are correct (no extra spaces)
- Check rate limits if getting errors
- Ensure keys are active and not expired

---

**Remember**: Your `.env` file is secure and will never be committed to git! 🔒

