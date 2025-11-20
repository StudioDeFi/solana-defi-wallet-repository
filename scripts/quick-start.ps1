# ============================================
# Quick Start - Dev Server (No Build Required!)
# ============================================

Write-Host "🚀 Quick Start - Development Server" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Use lightweight config if available
if (Test-Path "next.config.light.js") {
    Copy-Item "next.config.js" "next.config.full.js" -ErrorAction SilentlyContinue
    Copy-Item "next.config.light.js" "next.config.js" -Force
    Write-Host "✅ Using lightweight config" -ForegroundColor Green
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies (first time only)..." -ForegroundColor Yellow
    Write-Host "   This will take a few minutes..." -ForegroundColor Gray
    npm install --legacy-peer-deps
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Starting development server..." -ForegroundColor Cyan
Write-Host "🌐 App will be at: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

# Start dev server
npm run dev

