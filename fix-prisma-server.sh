#!/bin/bash

echo "========================================="
echo "Prisma Client Fix for Server"
echo "========================================="
echo ""

# Stop application
echo "Stopping application..."
pm2 stop sdit-annajm 2>/dev/null || echo "No PM2 process running"
echo ""

# Remove old Prisma Client
echo "Removing old Prisma Client..."
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma/client
rm -rf .next/standalone/node_modules/.prisma
rm -rf .next/standalone/node_modules/@prisma
echo "✓ Old Prisma Client removed"
echo ""

# Reinstall Prisma packages
echo "Reinstalling Prisma packages..."
npm install @prisma/client prisma --save
echo "✓ Prisma packages reinstalled"
echo ""

# Generate Prisma Client with all binary targets
echo "Generating Prisma Client..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo "ERROR: Prisma generate failed"
    exit 1
fi
echo "✓ Prisma Client generated"
echo ""

# Copy Prisma to standalone if exists
if [ -d ".next/standalone" ]; then
    echo "Copying Prisma to standalone..."
    mkdir -p .next/standalone/node_modules/.prisma
    mkdir -p .next/standalone/node_modules/@prisma
    cp -r node_modules/.prisma/client .next/standalone/node_modules/.prisma/
    cp -r node_modules/@prisma/client .next/standalone/node_modules/@prisma/
    echo "✓ Prisma copied to standalone"
fi
echo ""

# Test database connection
echo "Testing database connection..."
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.\$connect().then(() => { console.log('✓ Database connection OK'); process.exit(0); }).catch((e) => { console.error('✗ Database connection failed:', e.message); process.exit(1); });"
if [ $? -ne 0 ]; then
    echo "ERROR: Cannot connect to database"
    exit 1
fi
echo ""

# Restart application
echo "Restarting application..."
pm2 restart sdit-annajm
echo "✓ Application restarted"
echo ""

echo "========================================="
echo "✓ FIX COMPLETED!"
echo "========================================="
pm2 status
