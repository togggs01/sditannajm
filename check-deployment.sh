#!/bin/bash

echo "========================================="
echo "Deployment Health Check"
echo "========================================="
echo ""

# Check environment file
echo "1. Checking .env file..."
if [ -f .env ]; then
    echo "   ✓ .env exists"
    if grep -q "DATABASE_URL" .env; then
        echo "   ✓ DATABASE_URL is set"
    else
        echo "   ✗ DATABASE_URL not found in .env"
    fi
else
    echo "   ✗ .env file not found"
fi
echo ""

# Check Prisma Client
echo "2. Checking Prisma Client..."
if [ -d "node_modules/.prisma" ]; then
    echo "   ✓ Prisma Client generated"
else
    echo "   ✗ Prisma Client not generated"
    echo "   Run: npx prisma generate"
fi
echo ""

# Check build
echo "3. Checking Next.js build..."
if [ -d ".next" ]; then
    echo "   ✓ .next directory exists"
    if [ -f ".next/BUILD_ID" ]; then
        echo "   ✓ Build ID: $(cat .next/BUILD_ID)"
    fi
else
    echo "   ✗ .next directory not found"
    echo "   Run: npm run build"
fi
echo ""

# Check database connection
echo "4. Testing database connection..."
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.\$connect().then(() => { console.log('   ✓ Database connection OK'); prisma.\$disconnect(); }).catch((e) => { console.error('   ✗ Database connection failed:', e.message); });"
echo ""

# Check PM2 process
echo "5. Checking PM2 process..."
pm2 list | grep -q "sdit-annajm"
if [ $? -eq 0 ]; then
    echo "   ✓ PM2 process running"
    pm2 describe sdit-annajm | grep -E "status|uptime|restarts"
else
    echo "   ✗ PM2 process not found"
    echo "   Run: pm2 start npm --name sdit-annajm -- start"
fi
echo ""

# Test API endpoints
echo "6. Testing API endpoints..."
echo "   Testing /api/stats..."
curl -s -o /dev/null -w "   Status: %{http_code}\n" http://localhost:3000/api/stats
echo ""

echo "========================================="
echo "Health check completed"
echo "========================================="
