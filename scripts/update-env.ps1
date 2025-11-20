# ============================================
# Auto-Update .env File Script
# ============================================
# This script helps update .env with new keys
# ============================================

param(
    [string]$Key = "",
    [string]$Value = "",
    [switch]$List,
    [switch]$Help
)

$envFile = ".env"
$exampleFile = ".env.example"

function Show-Help {
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host "Solana Wallet - .env Manager" -ForegroundColor Cyan
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\scripts\update-env.ps1 -Key 'BIRDEYE_API_KEY' -Value 'your-key'" -ForegroundColor White
    Write-Host "  .\scripts\update-env.ps1 -List" -ForegroundColor White
    Write-Host "  .\scripts\update-env.ps1 -Help" -ForegroundColor White
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  .\scripts\update-env.ps1 -Key BIRDEYE_API_KEY -Value 'abc123'" -ForegroundColor White
    Write-Host "  .\scripts\update-env.ps1 -Key JWT_SECRET -Value (openssl rand -base64 32)" -ForegroundColor White
    Write-Host ""
}

function Update-EnvKey {
    param([string]$Key, [string]$Value)
    
    if (-not (Test-Path $envFile)) {
        Write-Host "Creating .env file from .env.example..." -ForegroundColor Yellow
        Copy-Item $exampleFile $envFile
    }
    
    $content = Get-Content $envFile -Raw
    $pattern = "($Key=)(.*)"
    
    if ($content -match $pattern) {
        $newContent = $content -replace $pattern, "`$1`"$Value`""
        Set-Content -Path $envFile -Value $newContent -NoNewline
        Write-Host "✅ Updated $Key" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Key $Key not found. Adding to end of file..." -ForegroundColor Yellow
        Add-Content -Path $envFile -Value "$Key=`"$Value`""
        Write-Host "✅ Added $Key" -ForegroundColor Green
    }
}

function List-EnvKeys {
    if (Test-Path $envFile) {
        Write-Host "Current .env keys:" -ForegroundColor Cyan
        Write-Host "==================" -ForegroundColor Cyan
        Get-Content $envFile | Where-Object { $_ -match '^[A-Z_]+=' } | ForEach-Object {
            $key = ($_ -split '=')[0]
            $value = ($_ -split '=')[1] -replace '"', ''
            if ($value.Length -gt 20) {
                $value = $value.Substring(0, 20) + "..."
            }
            Write-Host "$key = $value" -ForegroundColor White
        }
    } else {
        Write-Host "⚠️  .env file not found. Create it from .env.example" -ForegroundColor Yellow
    }
}

if ($Help) {
    Show-Help
    exit
}

if ($List) {
    List-EnvKeys
    exit
}

if ($Key -and $Value) {
    Update-EnvKey -Key $Key -Value $Value
} else {
    Write-Host "❌ Error: Both -Key and -Value are required" -ForegroundColor Red
    Show-Help
    exit 1
}

