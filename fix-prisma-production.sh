#!/bin/bash

echo "🔧 Fixing Prisma for Hostinger Production"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Please run this script from the project root directory"
    exit 1
fi

# Remove old Prisma files
echo "🧹 Cleaning old Prisma files..."
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma
echo "✅ Cleaned"
echo ""

# Reinstall Prisma
echo "📦 Reinstalling Prisma..."
npm install @prisma/client@latest prisma@latest --save
echo "✅ Prisma reinstalled"
echo ""

# Generate Prisma Client with correct binary
echo "🔧 Generating Prisma Client for Hostinger..."
npx prisma generate
echo "✅ Prisma Client generated"
echo ""

# Verify binary files
echo "🔍 Verifying Prisma binary files..."
if [ -d "node_modules/.prisma/client" ]; then
    echo "✅ Prisma client directory exists"
    ls -lh node_modules/.prisma/client/*.node 2>/dev/null || echo "⚠️  No .node files found"
else
    echo "❌ Prisma client directory not found!"
    exit 1
fi
echo ""

# Test database connection
echo "🔌 Testing database connection..."
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

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "✅ Prisma is ready for production!"
    echo "=========================================="
    echo ""
    echo "Next steps:"
    echo "1. npm run build"
    echo "2. pm2 restart sdit-annajm"
    echo ""
else
    echo ""
    echo "❌ Prisma setup failed!"
    echo "Please check your DATABASE_URL in .env"
    exit 1
fi
