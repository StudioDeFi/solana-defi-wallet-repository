#!/bin/bash

echo "===================================="
echo "Solana Wallet - Local Setup"
echo "===================================="
echo ""

echo "Step 1: Installing dependencies..."
npm install --legacy-peer-deps || npm install --force

echo ""
echo "Step 2: Generating Prisma client..."
npx prisma generate

echo ""
echo "Step 3: Setting up database..."
npx prisma migrate dev --name init

echo ""
echo "Step 4: Starting development server..."
echo ""
echo "===================================="
echo "Server will start at http://localhost:3000"
echo "===================================="
echo ""
npm run dev

