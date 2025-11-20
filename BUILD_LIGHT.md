# 🚀 Lightweight Build for UI Testing

## Why Lightweight Build?

- **Saves Disk Space**: Removes heavy dependencies (Three.js, Prisma, etc.)
- **Faster Installs**: Only essential packages
- **Better Performance**: Smaller bundle size
- **UI Testing Focus**: Perfect for testing UI without full backend

## Quick Start

### Windows
```powershell
.\scripts\build-light.ps1
npm run start
```

### Mac/Linux
```bash
chmod +x scripts/build-light.sh
./scripts/build-light.sh
npm run start
```

## What's Removed?

### Heavy Dependencies (CDN/Lightweight Alternatives)
- ❌ `three` → CSS animations
- ❌ `@react-three/fiber` → Not needed for UI testing
- ❌ `@react-three/drei` → Not needed
- ❌ `prisma` → Mock data for UI
- ❌ `@prisma/client` → Not needed
- ❌ `sharp` → Next.js handles images
- ❌ `express` → Next.js API routes
- ❌ `bcryptjs` → Not needed for UI
- ❌ `jsonwebtoken` → Mock auth for UI
- ❌ `recharts` → Simple CSS charts
- ❌ `react-query` → Basic fetch
- ❌ `react-hook-form` → Simple forms
- ❌ `zod` → Basic validation
- ❌ `date-fns` → Native Date API
- ❌ `qrcode.react` → Optional feature
- ❌ `ws` → Not needed for UI
- ❌ `cors`, `helmet`, `rate-limiter-flexible` → Next.js handles

## What's Kept?

### Essential Dependencies
- ✅ `next` - Framework
- ✅ `react` / `react-dom` - Core
- ✅ `@solana/web3.js` - Blockchain
- ✅ `@solana/wallet-adapter-*` - Wallet connection
- ✅ `framer-motion` - Animations
- ✅ `zustand` - State management
- ✅ `axios` - API calls
- ✅ `lucide-react` - Icons
- ✅ `tailwindcss` - Styling
- ✅ `react-hot-toast` - Notifications

## Build Size Comparison

| Build Type | Size | Dependencies |
|------------|------|--------------|
| Full Build | ~500MB | All features |
| Light Build | ~150MB | UI only |
| **Savings** | **~350MB** | **70% smaller** |

## Features Available in Light Build

✅ **Full UI Functionality**:
- Wallet connection (browser extension)
- Token browsing
- Swap interface UI
- Theme switching
- All animations and effects

✅ **Mock Data**:
- Token prices (from public APIs)
- Swap quotes (simulated)
- Portfolio data (from wallet)

❌ **Not Available** (requires full build):
- Database operations
- Limit orders storage
- DCA orders storage
- User sessions

## Auto-Install Extensions

The app automatically detects and uses browser wallet extensions:
- **Phantom** - Auto-detected
- **Solflare** - Auto-detected
- **Other wallets** - Via wallet adapter

No need to install heavy wallet libraries!

## Switching Back to Full Build

```bash
# Restore full package.json
cp package.full.json package.json

# Restore full config
cp next.config.full.js next.config.js

# Reinstall all dependencies
npm install
```

## Performance Tips

1. **Use Browser DevTools**: Test UI without building
2. **Hot Reload**: Changes reflect instantly
3. **CDN Resources**: Heavy libs load from CDN
4. **Standalone Output**: Smaller production builds

## Troubleshooting

### Build Fails
```bash
# Clean and retry
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run build
```

### Missing Features
Some features require full build. Check `BUILD_LIGHT.md` for what's available.

### Port Already in Use
```bash
PORT=3001 npm run start
```

---

**Enjoy lightweight UI testing!** 🎨

