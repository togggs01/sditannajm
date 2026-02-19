#!/bin/bash

echo "========================================="
echo "Force Restart Script"
echo "========================================="
echo ""

# Kill everything
echo "Step 1: Killing all processes..."
pm2 stop sdit-annajm 2>/dev/null
pm2 delete sdit-annajm 2>/dev/null
pkill -9 -f "next start" 2>/dev/null
pkill -9 -f "node.*next" 2>/dev/null
sleep 3
echo "✓ All processes killed"
echo ""

# Check if port 3000 is free
echo "Step 2: Checking port 3000..."
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "Port 3000 is still in use, killing process..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    sleep 2
fi
echo "✓ Port 3000 is free"
echo ""

# Test database
echo "Step 3: Testing database..."
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.\$connect()
  .then(() => {
    console.log('✓ Database OK');
    return prisma.admin.count();
  })
  .then((count) => {
    console.log('✓ Admin count:', count);
    process.exit(0);
  })
  .catch((e) => {
    console.error('✗ Database error:', e.message);
    process.exit(1);
  });
"
if [ $? -ne 0 ]; then
    echo "✗ Database connection failed!"
    echo "Check your .env file and DATABASE_URL"
    exit 1
fi
echo ""

# Check if build exists
echo "Step 4: Checking build..."
if [ ! -d ".next" ]; then
    echo "✗ Build not found, building..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "✗ Build failed!"
        exit 1
    fi
fi
echo "✓ Build exists"
echo ""

# Start fresh
echo "Step 5: Starting application..."
pm2 start npm --name sdit-annajm -- start
if [ $? -ne 0 ]; then
    echo "✗ Failed to start!"
    exit 1
fi
pm2 save
echo "✓ Application started"
echo ""

# Wait and verify
echo "Step 6: Verifying startup..."
sleep 5

# Check if process is running
if pm2 list | grep -q "sdit-annajm.*online"; then
    echo "✓ Application is running"
else
    echo "✗ Application failed to start"
    echo ""
    echo "Logs:"
    pm2 logs sdit-annajm --lines 50 --nostream
    exit 1
fi
echo ""

# Test API
echo "Step 7: Testing API..."
sleep 2
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/auth/me)
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "401" ]; then
    echo "✓ API is responding (HTTP $HTTP_CODE)"
else
    echo "⚠ API returned HTTP $HTTP_CODE"
fi
echo ""

# Show status
echo "========================================="
echo "✓ RESTART COMPLETED!"
echo "========================================="
echo ""
pm2 status
echo ""
echo "Website: https://sditannajm.sch.id"
echo "Admin: https://sditannajm.sch.id/admin"
echo ""
echo "Monitor logs: pm2 logs sdit-annajm"
echo ""
