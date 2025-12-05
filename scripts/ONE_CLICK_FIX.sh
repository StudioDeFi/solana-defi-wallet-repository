#!/bin/bash

# ONE_CLICK_FIX.sh - Resolves Vercel deployment/build failures
# This script automates upgrades and cleanups for the solana-defi-wallet monorepo

set -e

echo "🚀 Starting ONE_CLICK_FIX for Solana DeFi Wallet..."

# Navigate to project root
cd "$(dirname "$0")/.."

echo "📦 Step 1: Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps

echo "🔧 Step 2: Generating Prisma client..."
npx prisma generate || echo "Prisma generate skipped (no DATABASE_URL)"

echo "🛡️ Step 3: Running npm audit fix for security patches..."
npm audit fix || echo "Some vulnerabilities could not be auto-fixed"

echo "✅ Step 4: Verifying TypeScript configuration..."
echo "   - Checking tsconfig.json excludes mobile/ and desktop/ directories"
if grep -q '"mobile"' tsconfig.json && grep -q '"desktop"' tsconfig.json; then
    echo "   ✓ mobile and desktop directories are excluded from TypeScript compilation"
elif grep -q '"mobile"' tsconfig.json; then
    echo "   ✓ mobile directory is excluded from TypeScript compilation"
    echo "   ⚠ Warning: desktop directory may need to be added to tsconfig.json exclude"
else
    echo "   ⚠ Warning: mobile and desktop directories may need to be added to tsconfig.json exclude"
fi

echo "🏗️ Step 5: Testing build..."
if npm run build; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo ""
echo "=========================================="
echo "✅ ONE_CLICK_FIX completed successfully!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Review any remaining npm audit warnings"
echo "2. Commit and push changes"
echo "3. Verify Vercel deployment succeeds"
