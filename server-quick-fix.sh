#!/bin/bash

echo "========================================="
echo "Server Quick Fix - Login Error"
echo "========================================="
echo ""

# Stop app
echo "1. Stopping application..."
pm2 stop sdit-annajm 2>/dev/null
echo "✓ Stopped"
echo ""

# Clean cache
echo "2. Cleaning cache..."
rm -rf .next
rm -rf .turbo
rm -rf node_modules/.cache
echo "✓ Cleaned"
echo ""

# Check if critical files exist
echo "3. Checking critical files..."
if [ ! -f "app/api/auth/login/route.ts" ]; then
    echo "✗ ERROR: app/api/auth/login/route.ts not found!"
    echo "Please upload the file first"
    exit 1
fi
echo "✓ Files OK"
echo ""

# Rebuild
echo "4. Building application..."
npm run build
if [ $? -ne 0 ]; then
    echo "✗ Build failed!"
    exit 1
fi
echo "✓ Build successful"
echo ""

# Restart
echo "5. Restarting application..."
pm2 restart sdit-annajm
pm2 save
echo "✓ Restarted"
echo ""

# Wait and check
sleep 3
echo "6. Checking status..."
pm2 status
echo ""

# Test API
echo "7. Testing login API..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}')

if [ "$HTTP_CODE" = "200" ]; then
    echo "✓ Login API working (HTTP $HTTP_CODE)"
elif [ "$HTTP_CODE" = "401" ]; then
    echo "⚠ Login API responding but credentials wrong (HTTP $HTTP_CODE)"
else
    echo "✗ Login API error (HTTP $HTTP_CODE)"
fi
echo ""

echo "========================================="
echo "✓ Quick fix completed!"
echo "========================================="
echo ""
echo "Test login at: https://sditannajm.sch.id/login"
echo "Credentials: admin / admin123"
echo ""
echo "If still error, check logs:"
echo "  pm2 logs sdit-annajm"
echo ""
