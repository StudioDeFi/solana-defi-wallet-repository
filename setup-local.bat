@echo off
echo ====================================
echo Solana Wallet - Local Setup
echo ====================================
echo.

echo Step 1: Installing dependencies...
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo.
    echo Trying with --force flag...
    call npm install --force
)

echo.
echo Step 2: Generating Prisma client...
call npx prisma generate

echo.
echo Step 3: Setting up database...
call npx prisma migrate dev --name init

echo.
echo Step 4: Starting development server...
echo.
echo ====================================
echo Server will start at http://localhost:3000
echo ====================================
echo.
call npm run dev

