#!/bin/bash

echo "========================================="
echo "Complete Fix Script"
echo "SDIT ANNAJM RABBANI"
echo "========================================="
echo ""

# Stop everything
echo "Step 1: Stopping application..."
pm2 stop sdit-annajm 2>/dev/null
pm2 delete sdit-annajm 2>/dev/null
pkill -f "next start" 2>/dev/null
sleep 2
echo "✓ Stopped"
echo ""

# Check environment
echo "Step 2: Checking environment..."
if [ ! -f .env ]; then
    echo "✗ ERROR: .env file not found!"
    exit 1
fi
echo "✓ Environment OK"
echo ""

# Clean everything
echo "Step 3: Cleaning old files..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf node_modules/.prisma
rm -rf .turbo
echo "✓ Cleaned"
echo ""

# Install dependencies
echo "Step 4: Installing dependencies..."
echo "This will take a few minutes..."
npm install --production=false --legacy-peer-deps
if [ $? -ne 0 ]; then
    echo "✗ npm install failed"
    exit 1
fi
echo "✓ Dependencies installed"
echo ""

# Verify critical packages
echo "Step 5: Verifying critical packages..."
MISSING=0

if [ ! -d "node_modules/@prisma/client" ]; then
    echo "Installing @prisma/client..."
    npm install @prisma/client
    MISSING=1
fi

if [ ! -d "node_modules/@tailwindcss" ]; then
    echo "Installing @tailwindcss/postcss..."
    npm install @tailwindcss/postcss --save
    MISSING=1
fi

if [ ! -d "node_modules/tailwindcss" ]; then
    echo "Installing tailwindcss..."
    npm install tailwindcss --save
    MISSING=1
fi

if [ $MISSING -eq 0 ]; then
    echo "✓ All critical packages present"
else
    echo "✓ Missing packages installed"
fi
echo ""

# Generate Prisma
echo "Step 6: Generating Prisma Client..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo "✗ Prisma generate failed"
    exit 1
fi
echo "✓ Prisma Client generated"
echo ""

# Test database
echo "Step 7: Testing database connection..."
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.\$connect()
  .then(() => {
    console.log('✓ Database connected');
    return prisma.admin.count();
  })
  .then((count) => {
    console.log('✓ Admin table OK, count:', count);
    process.exit(0);
  })
  .catch((e) => {
    console.error('✗ Database error:', e.message);
    process.exit(1);
  });
"
if [ $? -ne 0 ]; then
    echo "✗ Database connection failed"
    exit 1
fi
echo ""

# Build
echo "Step 8: Building application..."
echo "This will take a few minutes..."
npm run build
if [ $? -ne 0 ]; then
    echo "✗ Build failed"
    exit 1
fi
echo "✓ Build successful"
echo ""

# Start with PM2
echo "Step 9: Starting application..."
pm2 start npm --name sdit-annajm -- start
if [ $? -ne 0 ]; then
    echo "✗ Failed to start"
    exit 1
fi
pm2 save
echo "✓ Application started"
echo ""

# Wait and check
echo "Step 10: Checking application health..."
sleep 5
pm2 status
echo ""

# Show logs
echo "Recent logs:"
pm2 logs sdit-annajm --lines 30 --nostream
echo ""

echo "========================================="
echo "✓ COMPLETE FIX DONE!"
echo "========================================="
echo ""
echo "Website: https://sditannajm.sch.id"
echo "Admin: https://sditannajm.sch.id/admin"
echo ""
echo "Monitor: pm2 logs sdit-annajm"
echo ""
