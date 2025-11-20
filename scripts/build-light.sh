#!/bin/bash

# ============================================
# Lightweight Build Script for UI Testing
# ============================================

echo "🚀 Starting Lightweight Build..."
echo ""

# Step 1: Clean previous builds
echo "📦 Step 1: Cleaning..."
rm -rf .next
echo "  ✅ Cleaned build directory"

# Step 2: Use lightweight package.json
echo "📝 Step 2: Using lightweight dependencies..."
if [ -f "package.light.json" ]; then
    cp package.json package.full.json 2>/dev/null || true
    cp package.light.json package.json
    echo "  ✅ Switched to lightweight package.json"
fi

# Step 3: Use lightweight next.config
echo "⚙️  Step 3: Using lightweight Next.js config..."
if [ -f "next.config.light.js" ]; then
    cp next.config.js next.config.full.js 2>/dev/null || true
    cp next.config.light.js next.config.js
    echo "  ✅ Switched to lightweight config"
fi

# Step 4: Install only essential dependencies
echo "📥 Step 4: Installing essential dependencies only..."
npm install --no-optional --legacy-peer-deps --prefer-offline
echo "  ✅ Dependencies installed"

# Step 5: Build
echo "🔨 Step 5: Building application..."
NODE_ENV=production npm run build
if [ $? -eq 0 ]; then
    echo "  ✅ Build successful!"
else
    echo "  ❌ Build failed"
    exit 1
fi

# Step 6: Show build size
echo ""
echo "📊 Build Summary:"
NEXT_SIZE=$(du -sh .next 2>/dev/null | cut -f1)
echo "  Build size: $NEXT_SIZE"

echo ""
echo "✅ Lightweight build complete!"
echo "🚀 Start server: npm run start"
echo "🌐 App will be at: http://localhost:3000"

