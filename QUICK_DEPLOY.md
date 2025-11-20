# ⚡ Quick Deploy for UI Testing

## Fastest Way to Test UI (No Build Required!)

### Option 1: Development Server (Recommended)
```powershell
.\scripts\quick-start.ps1
```

**Benefits:**
- ✅ No build time
- ✅ Hot reload (instant updates)
- ✅ Smaller footprint
- ✅ Perfect for UI testing

### Option 2: Lightweight Production Build
```powershell
.\scripts\build-light.ps1
npm run start
```

## What You Get

### ✅ Full UI Features
- Wallet connection (browser extension)
- Token browsing
- Swap interface
- Theme switching
- All animations

### ✅ Auto-Detected Extensions
- Phantom wallet
- Solflare wallet
- Any Solana wallet extension

### ✅ No Heavy Dependencies
- No Three.js (CSS animations)
- No Prisma (mock data)
- No heavy libraries

## Disk Space

| Method | Size | Time |
|--------|------|------|
| Dev Server | ~100MB | Instant |
| Light Build | ~150MB | 2-3 min |
| Full Build | ~500MB | 5-10 min |

## Quick Commands

```powershell
# Start dev server (fastest)
.\scripts\quick-start.ps1

# Or manually
npm run dev

# Build for production (lightweight)
.\scripts\build-light.ps1
npm run start
```

## Troubleshooting

### Port 3000 Busy?
```powershell
$env:PORT=3001
npm run dev
```

### Missing Dependencies?
```powershell
npm install --legacy-peer-deps
```

### Want Full Features?
See `BUILD_LIGHT.md` for switching to full build.

---

**Start testing in seconds!** ⚡

