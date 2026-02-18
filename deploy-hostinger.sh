#!/bin/bash

echo "========================================="
echo "Hostinger Deployment Fix Script"
echo "SDIT ANNAJM RABBANI"
echo "========================================="
echo ""

# Set production environment
export NODE_ENV=production

# Stop existing process
echo "Stopping existing application..."
pm2 stop sdit-annajm 2>/dev/null || echo "No existing PM2 process"
pkill -f "next start" 2>/dev/null || echo "No existing Node process"
echo ""

# Check .env file
if [ ! -f .env ]; then
    echo "ERROR: .env file not found!"
    echo "Please create .env file with DATABASE_URL"
    exit 1
fi

echo "✓ Environment file found"
echo ""

# Clean everything
echo "Cleaning old build and cache..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf node_modules/.prisma
echo "✓ Clean completed"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install --production=false
if [ $? -ne 0 ]; then
    echo "ERROR: npm install failed"
    exit 1
fi
echo "✓ Dependencies installed"
echo ""

# Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo "ERROR: Prisma generate failed"
    echo "Check DATABASE_URL in .env file"
    exit 1
fi
echo "✓ Prisma Client generated"
echo ""

# Push database schema
echo "Pushing database schema..."
npx prisma db push --accept-data-loss
if [ $? -ne 0 ]; then
    echo "WARNING: Database push failed"
    echo "Trying to continue anyway..."
fi
echo ""

# Test database connection
echo "Testing database connection..."
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.\$connect().then(() => { console.log('✓ Database connection OK'); process.exit(0); }).catch((e) => { console.error('✗ Database connection failed:', e.message); process.exit(1); });"
if [ $? -ne 0 ]; then
    echo "ERROR: Cannot connect to database"
    echo "Check your DATABASE_URL in .env"
    exit 1
fi
echo ""

# Build application
echo "Building application..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Build failed"
    exit 1
fi
echo "✓ Build completed"
echo ""

# Start application with PM2
echo "Starting application with PM2..."
pm2 start npm --name sdit-annajm -- start
pm2 save
echo ""

# Show status
echo "========================================="
echo "✓ Deployment successful!"
echo "========================================="
echo ""
pm2 status
echo ""
echo "Website: https://sditannajm.sch.id"
echo "Admin: https://sditannajm.sch.id/admin"
echo ""
echo "View logs: pm2 logs sdit-annajm"
echo "Restart: pm2 restart sdit-annajm"
echo "Stop: pm2 stop sdit-annajm"
echo ""
