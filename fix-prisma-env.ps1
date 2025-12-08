# Set script to run in repo root
$repoRoot = "D:\studiodefi\solana-defi-wallet-repository"
Set-Location $repoRoot

# 1. Define new environment variable values
$envVars = @"
DATABASE_URL=postgresql://neondb_owner:npg_4TeVLmkoS6HG@ep-mute-paper-a4izskeo-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_DATABASE_URL=postgresql://neondb_owner:npg_4TeVLmkoS6HG@ep-mute-paper-a4izskeo.us-east-1.aws.neon.tech/neondb?sslmode=require
"@

# 2. Write/replace `.env` file in repo root
$envFile = Join-Path $repoRoot ".env"
Set-Content -Path $envFile -Value $envVars -Encoding UTF8

# 3. Output confirmation and current `.env` file contents
Write-Host "`n[.env file overwritten with:]"
Get-Content $envFile | Write-Host

# 4. Set PowerShell session variables (for subprocesses, if Prisma needs it)
$env:DATABASE_URL = "postgresql://neondb_owner:npg_4TeVLmkoS6HG@ep-mute-paper-a4izskeo-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
$env:DIRECT_DATABASE_URL = "postgresql://neondb_owner:npg_4TeVLmkoS6HG@ep-mute-paper-a4izskeo.us-east-1.aws.neon.tech/neondb?sslmode=require"

Write-Host "`n[PowerShell ENV variables set:]"
Write-Host "DATABASE_URL: $($env:DATABASE_URL)"
Write-Host "DIRECT_DATABASE_URL: $($env:DIRECT_DATABASE_URL)"

# 5. Clean node_modules and package-lock.json to fix corrupted builds
Write-Host "`n[Cleaning node_modules, .next, and package-lock.json]"
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue

# 6. Reinstall node packages
Write-Host "`n[Running npm install]"
npm install

# 7. Run Prisma generate (outputs result)
Write-Host "`n[Running Prisma generate]"
npx prisma generate

# 8. Optional: Run Next build (outputs result)
Write-Host "`n[Running Next.js build]"
npm run build