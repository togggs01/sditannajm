#!/bin/bash

echo "========================================="
echo "Diagnostic Script"
echo "========================================="
echo ""

echo "1. Checking Node.js version..."
node --version
echo ""

echo "2. Checking npm version..."
npm --version
echo ""

echo "3. Checking if .env exists..."
if [ -f .env ]; then
    echo "✓ .env file exists"
    echo "DATABASE_URL is set: $(grep -q DATABASE_URL .env && echo 'YES' || echo 'NO')"
else
    echo "✗ .env file NOT found"
fi
echo ""

echo "4. Checking Prisma Client..."
if [ -d "node_modules/@prisma/client" ]; then
    echo "✓ Prisma Client installed"
else
    echo "✗ Prisma Client NOT installed"
fi
echo ""

echo "5. Checking Tailwind packages..."
if [ -d "node_modules/@tailwindcss" ]; then
    echo "✓ @tailwindcss installed"
else
    echo "✗ @tailwindcss NOT installed"
fi

if [ -d "node_modules/tailwindcss" ]; then
    echo "✓ tailwindcss installed"
else
    echo "✗ tailwindcss NOT installed"
fi
echo ""

echo "6. Checking build directory..."
if [ -d ".next" ]; then
    echo "✓ .next directory exists"
    echo "Build time: $(stat -c %y .next 2>/dev/null || stat -f %Sm .next 2>/dev/null)"
else
    echo "✗ .next directory NOT found (app not built)"
fi
echo ""

echo "7. Testing database connection..."
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.\$connect()
  .then(() => {
    console.log('✓ Database connection OK');
    return prisma.admin.count();
  })
  .then((count) => {
    console.log('✓ Admin table accessible, count:', count);
    process.exit(0);
  })
  .catch((e) => {
    console.error('✗ Database error:', e.message);
    process.exit(1);
  });
" 2>&1
echo ""

echo "8. Checking PM2 status..."
pm2 list
echo ""

echo "9. Checking recent logs..."
echo "Last 20 lines of PM2 logs:"
pm2 logs sdit-annajm --lines 20 --nostream 2>/dev/null || echo "No PM2 logs available"
echo ""

echo "========================================="
echo "Diagnostic completed"
echo "========================================="
