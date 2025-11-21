#!/bin/bash
# Build script for GitHub Pages static export

set -e  # Exit on error

echo "Building for GitHub Pages..."

# Create temp directory for backups
mkdir -p /tmp/next-build-backup

# Backup original config and API routes
if [ ! -f "next.config.js" ]; then
  echo "Error: next.config.js not found"
  exit 1
fi

if [ ! -f "next.config.pages.js" ]; then
  echo "Error: next.config.pages.js not found"
  exit 1
fi

cp next.config.js next.config.js.backup
if [ -d "src/app/api" ]; then
  mv src/app/api /tmp/next-build-backup/api
  echo "✓ API routes temporarily moved for static export"
fi

# Use GitHub Pages config
cp next.config.pages.js next.config.js
echo "✓ Using GitHub Pages configuration"

# Build the static site
npx next build

BUILD_EXIT=$?

# Restore original config and API routes
mv next.config.js.backup next.config.js
if [ -d "/tmp/next-build-backup/api" ]; then
  mv /tmp/next-build-backup/api src/app/api
  echo "API routes restored"
fi

if [ $BUILD_EXIT -ne 0 ]; then
  echo "❌ Build failed"
  exit $BUILD_EXIT
fi

echo ""
echo "✅ GitHub Pages build complete! Output in /docs directory"
echo ""
echo "⚠️  Note: API routes are not included in static export."
echo "   The app will work for frontend-only features."
echo ""
echo "To test locally:"
echo "  cd docs && python3 -m http.server 8000"
echo "  Or: npx serve docs"
