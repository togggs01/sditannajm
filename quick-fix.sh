#!/bin/bash

echo "========================================="
echo "Quick Fix Script with Environment Reload"
echo "========================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "✗ .env file not found!"
    exit 1
fi
echo "✓ .env file found"
echo ""

# Install dotenv if not exists
if ! npm list dotenv > /dev/null 2>&1; then
    echo "Installing dotenv..."
    npm install dotenv
fi
echo "✓ dotenv available"
echo ""

# Stop app
echo "Stopping application..."
pm2 delete sdit-annajm 2>/dev/null || true
echo ""

# Regenerate Prisma Client with explicit DATABASE_URL
echo "Regenerating Prisma Client..."
export $(cat .env | grep -v '^#' | xargs)
npx prisma generate
if [ $? -ne 0 ]; then
    echo "✗ Prisma generate failed!"
    echo "DATABASE_URL: ${DATABASE_URL:+Set (hidden)}"
    exit 1
fi
echo "✓ Prisma Client regenerated"
echo ""

# Clean cache
echo "Cleaning cache..."
rm -rf .next/cache
echo "✓ Cache cleaned"
echo ""

# Create logs directory
mkdir -p logs
echo "✓ Logs directory ready"
echo ""

# Start with ecosystem config
echo "Starting application with ecosystem config..."
pm2 start ecosystem.config.js
pm2 save
echo "✓ Application started"
echo ""

# Show status
pm2 status
echo ""
echo "✓ Quick fix completed!"
echo ""
echo "Useful commands:"
echo "  View logs: pm2 logs sdit-annajm"
echo "  Check env: bash check-env.sh"
echo "  Restart: pm2 restart sdit-annajm"

