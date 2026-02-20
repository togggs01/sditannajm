#!/bin/bash

echo "========================================="
echo "Fix Chunk Errors Script"
echo "========================================="
echo ""

# Stop application
echo "Stopping application..."
pm2 stop sdit-annajm 2>/dev/null || true
sleep 2
echo "✓ Application stopped"
echo ""

# Deep clean
echo "Deep cleaning build artifacts..."
rm -rf .next
rm -rf .next/cache
rm -rf .next/static
rm -rf .next/server
rm -rf node_modules/.cache
rm -rf .turbo
echo "✓ Deep clean completed"
echo ""

# Clean npm cache
echo "Cleaning npm cache..."
npm cache clean --force
echo "✓ npm cache cleaned"
echo ""

# Reinstall dependencies
echo "Reinstalling dependencies..."
rm -rf node_modules
npm install --legacy-peer-deps
npm install dotenv
echo "✓ Dependencies reinstalled"
echo ""

# Load environment
echo "Loading environment variables..."
if [ ! -f .env ]; then
    echo "✗ .env file not found!"
    exit 1
fi
export $(cat .env | grep -v '^#' | xargs)
echo "✓ Environment loaded"
echo ""

# Regenerate Prisma
echo "Regenerating Prisma Client..."
npx prisma generate
echo "✓ Prisma Client regenerated"
echo ""

# Build with verbose output
echo "Building application (this may take a while)..."
NODE_ENV=production npm run build
if [ $? -ne 0 ]; then
    echo "✗ Build failed!"
    echo "Check the error messages above"
    exit 1
fi
echo "✓ Build completed"
echo ""

# Create logs directory
mkdir -p logs
echo "✓ Logs directory ready"
echo ""

# Start application
echo "Starting application..."
pm2 start ecosystem.config.js
pm2 save
echo "✓ Application started"
echo ""

# Show status
pm2 status
echo ""
echo "========================================="
echo "✓ Chunk errors fixed!"
echo "========================================="
echo ""
echo "Monitor: pm2 logs sdit-annajm"
