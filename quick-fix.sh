#!/bin/bash

echo "========================================="
echo "Quick Fix Script"
echo "========================================="
echo ""

# Stop app
echo "Stopping application..."
pm2 stop sdit-annajm 2>/dev/null
echo ""

# Install missing packages
echo "Installing missing packages..."
npm install @tailwindcss/postcss tailwindcss @prisma/client --save
echo ""

# Generate Prisma
echo "Generating Prisma Client..."
npx prisma generate
echo ""

# Clean and rebuild
echo "Cleaning and rebuilding..."
rm -rf .next
npm run build
if [ $? -ne 0 ]; then
    echo "✗ Build failed!"
    exit 1
fi
echo ""

# Restart
echo "Restarting application..."
pm2 restart sdit-annajm
pm2 save
echo ""

echo "✓ Quick fix completed!"
echo ""
echo "Checking logs..."
pm2 logs sdit-annajm --lines 50 --nostream

