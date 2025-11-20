# ============================================
# Lightweight Build Script for UI Testing
# ============================================

Write-Host "🚀 Starting Lightweight Build..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean previous builds
Write-Host "📦 Step 1: Cleaning..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
if (Test-Path "node_modules") { 
    Write-Host "  Keeping node_modules (optional: remove manually to save space)" -ForegroundColor Gray
}

# Step 2: Use lightweight package.json
Write-Host "📝 Step 2: Using lightweight dependencies..." -ForegroundColor Yellow
if (Test-Path "package.light.json") {
    Copy-Item "package.json" "package.full.json" -ErrorAction SilentlyContinue
    Copy-Item "package.light.json" "package.json" -Force
    Write-Host "  ✅ Switched to lightweight package.json" -ForegroundColor Green
}

# Step 3: Use lightweight next.config
Write-Host "⚙️  Step 3: Using lightweight Next.js config..." -ForegroundColor Yellow
if (Test-Path "next.config.light.js") {
    Copy-Item "next.config.js" "next.config.full.js" -ErrorAction SilentlyContinue
    Copy-Item "next.config.light.js" "next.config.js" -Force
    Write-Host "  ✅ Switched to lightweight config" -ForegroundColor Green
}

# Step 4: Install only essential dependencies
Write-Host "📥 Step 4: Installing essential dependencies only..." -ForegroundColor Yellow
Write-Host "  This may take a minute..." -ForegroundColor Gray
npm install --no-optional --legacy-peer-deps 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Installation had warnings, continuing..." -ForegroundColor Yellow
}

# Step 5: Build
Write-Host "🔨 Step 5: Building application..." -ForegroundColor Yellow
$env:NODE_ENV = "production"
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ Build successful!" -ForegroundColor Green
} else {
    Write-Host "  ❌ Build failed" -ForegroundColor Red
    exit 1
}

# Step 6: Show build size
Write-Host ""
Write-Host "📊 Build Summary:" -ForegroundColor Cyan
$nextSize = (Get-ChildItem ".next" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "  Build size: $([math]::Round($nextSize, 2)) MB" -ForegroundColor White

Write-Host ""
Write-Host "✅ Lightweight build complete!" -ForegroundColor Green
Write-Host "🚀 Start server: npm run start" -ForegroundColor Cyan
Write-Host "🌐 App will be at: http://localhost:3000" -ForegroundColor Cyan

