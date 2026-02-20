#!/bin/bash

echo "========================================="
echo "Hostinger Deployment Script v2"
echo "SDIT ANNAJM RABBANI"
echo "========================================="
echo ""

# Set production environment
export NODE_ENV=production

# Stop existing process
echo "Stopping existing application..."
pm2 stop sdit-annajm 2>/dev/null || echo "No existing PM2 process"
pm2 delete sdit-annajm 2>/dev/null || echo "No PM2 process to delete"
pkill -f "next start" 2>/dev/null || echo "No existing Node process"
sleep 2
echo "✓ Application stopped"
echo ""

# Check .env file
if [ ! -f .env ]; then
    echo "ERROR: .env file not found!"
    echo "Please create .env file with DATABASE_URL"
    exit 1
fi

echo "✓ Environment file found"
echo ""

# Clean everything thoroughly
echo "Cleaning old build and cache..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf node_modules/.prisma
rm -rf .turbo
echo "✓ Clean completed"
echo ""

# Remove node_modules and reinstall (fresh install)
echo "Removing old node_modules..."
rm -rf node_modules
echo "✓ Old modules removed"
echo ""

# Install ALL dependencies (including devDependencies for build)
echo "Installing ALL dependencies (this may take a while)..."
npm install --production=false --legacy-peer-deps
if [ $? -ne 0 ]; then
    echo "ERROR: npm install failed"
    exit 1
fi

# Install dotenv explicitly
npm install dotenv
echo "✓ All dependencies installed"
echo ""

# Verify critical packages
echo "Verifying critical packages..."
if [ ! -d "node_modules/@tailwindcss" ]; then
    echo "ERROR: @tailwindcss not found, installing manually..."
    npm install @tailwindcss/postcss tailwindcss --save
fi
echo "✓ Critical packages verified"
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
    echo "Check the error messages above"
    exit 1
fi
echo "✓ Build completed successfully"
echo ""

# Start application with PM2
echo "Starting application with PM2..."
# Create logs directory
mkdir -p logs
pm2 start ecosystem.config.js
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to start with PM2"
    exit 1
fi
pm2 save
echo "✓ Application started"
echo ""

# Show status
echo "========================================="
echo "✓ DEPLOYMENT SUCCESSFUL!"
echo "========================================="
echo ""
pm2 status
echo ""
echo "Website: https://sditannajm.sch.id"
echo "Admin: https://sditannajm.sch.id/admin"
echo ""
echo "Useful commands:"
echo "  View logs: pm2 logs sdit-annajm"
echo "  Restart: pm2 restart sdit-annajm"
echo "  Stop: pm2 stop sdit-annajm"
echo "  Monitor: pm2 monit"
echo ""
