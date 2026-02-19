#!/bin/bash

echo "========================================="
echo "Clean Rebuild Script"
echo "========================================="
echo ""

# Stop app
echo "Stopping application..."
pm2 stop sdit-annajm 2>/dev/null
echo ""

# Clean build artifacts
echo "Cleaning build artifacts..."
rm -rf .next
rm -rf .turbo
rm -rf node_modules/.cache
echo "✓ Cleaned"
echo ""

# Rebuild
echo "Building application..."
npm run build
if [ $? -ne 0 ]; then
    echo "✗ Build failed!"
    echo ""
    echo "Try running complete-fix.sh instead"
    exit 1
fi
echo "✓ Build successful"
echo ""

# Restart
echo "Restarting application..."
pm2 restart sdit-annajm
pm2 save
echo "✓ Restarted"
echo ""

# Show status
pm2 status
echo ""
echo "✓ Rebuild completed!"
echo ""
echo "Check logs: pm2 logs sdit-annajm"
