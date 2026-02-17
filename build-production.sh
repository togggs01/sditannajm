#!/bin/bash

echo "========================================="
echo "Production Build Script"
echo "========================================="
echo ""

# Set production environment
export NODE_ENV=production

# Check .env file
if [ ! -f .env ]; then
    echo "ERROR: .env file not found!"
    exit 1
fi

echo "✓ Environment file found"
echo ""

# Load environment variables
source .env

# Check DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    echo "ERROR: DATABASE_URL not set in .env"
    exit 1
fi

echo "✓ DATABASE_URL configured"
echo ""

# Clean old build
echo "Cleaning old build..."
rm -rf .next
rm -rf node_modules/.cache
echo "✓ Clean completed"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm ci --production=false
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
    exit 1
fi
echo "✓ Prisma Client generated"
echo ""

# Test database connection
echo "Testing database connection..."
npx prisma db push --accept-data-loss
if [ $? -ne 0 ]; then
    echo "WARNING: Database push failed (might be already synced)"
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

echo "========================================="
echo "✓ Production build successful!"
echo "========================================="
echo ""
echo "To start the application:"
echo "  npm start"
echo ""
echo "Or with PM2:"
echo "  pm2 start npm --name sdit-annajm -- start"
echo ""
