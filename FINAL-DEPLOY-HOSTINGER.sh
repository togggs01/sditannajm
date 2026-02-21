#!/bin/bash

echo "========================================="
echo "🚀 FINAL DEPLOY - Hostinger Business"
echo "SDIT ANNAJM RABBANI"
echo "Fix Prisma Engine Error"
echo "========================================="
echo ""

# Stop PM2
echo "📦 Step 1: Stopping PM2..."
pm2 stop sdit-annajm 2>/dev/null || true
pm2 delete sdit-annajm 2>/dev/null || true
echo "✅ PM2 stopped"
echo ""

# Clean
echo "🧹 Step 2: Cleaning old files..."
rm -rf .next
rm -rf node_modules
echo "✅ Cleaned"
echo ""

# Install
echo "📦 Step 3: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ npm install failed!"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Generate Prisma
echo "🔧 Step 4: Generating Prisma Client..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo "❌ Prisma generate failed!"
    exit 1
fi
echo "✅ Prisma Client generated"
echo ""

# Verify Prisma binaries
echo "🔍 Step 5: Verifying Prisma binaries..."
if [ -d "node_modules/.prisma/client" ]; then
    echo "✅ Prisma client directory exists"
    ls -lh node_modules/.prisma/client/*.node 2>/dev/null || echo "⚠️  Warning: No .node files found"
else
    echo "❌ Prisma client directory not found!"
    exit 1
fi
echo ""

# Test DB connection
echo "🔌 Step 6: Testing database connection..."
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.\$connect()
  .then(() => {
    console.log('✅ Database connection successful!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  });
"
if [ $? -ne 0 ]; then
    echo "❌ Database connection failed!"
    echo "Check your DATABASE_URL in .env"
    exit 1
fi
echo ""

# Build
echo "🏗️  Step 7: Building application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi
echo "✅ Build completed"
echo ""

# Start PM2
echo "🚀 Step 8: Starting with PM2..."
pm2 start npm --name "sdit-annajm" -- start
pm2 save
echo "✅ PM2 started"
echo ""

# Show status
echo "========================================="
echo "✅ DEPLOYMENT SUCCESSFUL!"
echo "========================================="
echo ""
pm2 status
echo ""
pm2 logs sdit-annajm --lines 20
echo ""
echo "🌐 Website: https://sditannajm.sch.id"
echo "👤 Admin: https://sditannajm.sch.id/login"
echo ""
echo "📊 Commands:"
echo "  pm2 logs sdit-annajm    - View logs"
echo "  pm2 restart sdit-annajm - Restart app"
echo "  pm2 monit               - Monitor"
echo ""
echo "🎉 POST /api/guru should work now!"
echo ""
