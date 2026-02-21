#!/bin/bash

echo "========================================="
echo "🚀 Deploy Next.js Standalone + Prisma"
echo "SDIT ANNAJM RABBANI"
echo "========================================="
echo ""

# Check .env
if [ ! -f .env ]; then
    echo "❌ ERROR: .env file not found!"
    exit 1
fi

# Stop PM2
echo "📦 Stopping PM2..."
pm2 stop sdit-annajm 2>/dev/null || true
pm2 delete sdit-annajm 2>/dev/null || true

# Clean
echo "🧹 Cleaning..."
rm -rf .next
rm -rf node_modules/.prisma

# Install
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Build
echo "🏗️  Building..."
npm run build

# Copy Prisma to standalone
echo "📋 Copying Prisma binaries to standalone..."
cp -r node_modules/.prisma .next/standalone/node_modules/
cp -r node_modules/@prisma .next/standalone/node_modules/

# Copy public & static
echo "📋 Copying public files..."
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

# Start with node (not npm)
echo "🚀 Starting with Node.js..."
cd .next/standalone
NODE_ENV=production pm2 start server.js --name "sdit-annajm"
pm2 save

echo ""
echo "========================================="
echo "✅ Deployment successful!"
echo "========================================="
echo ""
pm2 status
echo ""
echo "🌐 Website: https://sditannajm.sch.id"
echo "📊 Logs: pm2 logs sdit-annajm"
echo ""
