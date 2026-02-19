#!/bin/bash

echo "========================================="
echo "Comprehensive Fix Script"
echo "SDIT ANNAJM RABBANI"
echo "========================================="
echo ""

# Step 1: Stop everything
echo "Step 1: Stopping all processes..."
pm2 stop all 2>/dev/null
pm2 delete all 2>/dev/null
pkill -9 -f "next" 2>/dev/null
sleep 3
echo "✓ Stopped"
echo ""

# Step 2: Check environment
echo "Step 2: Checking environment..."
if [ ! -f .env ]; then
    echo "✗ ERROR: .env file not found!"
    exit 1
fi
echo "✓ .env exists"
echo ""

# Step 3: Test components
echo "Step 3: Testing components..."
node test-components.js
if [ $? -ne 0 ]; then
    echo "✗ Some components are missing!"
    exit 1
fi
echo ""

# Step 4: Clean everything
echo "Step 4: Cleaning build artifacts..."
rm -rf .next
rm -rf .turbo
rm -rf node_modules/.cache
rm -rf node_modules/.prisma
echo "✓ Cleaned"
echo ""

# Step 5: Install dependencies
echo "Step 5: Installing dependencies..."
npm install --production=false --legacy-peer-deps
if [ $? -ne 0 ]; then
    echo "✗ npm install failed"
    exit 1
fi
echo "✓ Dependencies installed"
echo ""

# Step 6: Generate Prisma
echo "Step 6: Generating Prisma Client..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo "✗ Prisma generate failed"
    exit 1
fi
echo "✓ Prisma generated"
echo ""

# Step 7: Test database
echo "Step 7: Testing database..."
node test-database.js
if [ $? -ne 0 ]; then
    echo "✗ Database test failed"
    exit 1
fi
echo ""

# Step 8: Build
echo "Step 8: Building application..."
npm run build
if [ $? -ne 0 ]; then
    echo "✗ Build failed"
    exit 1
fi
echo "✓ Build successful"
echo ""

# Step 9: Start
echo "Step 9: Starting application..."
pm2 start npm --name sdit-annajm -- start
if [ $? -ne 0 ]; then
    echo "✗ Failed to start"
    exit 1
fi
pm2 save
echo "✓ Started"
echo ""

# Step 10: Wait and verify
echo "Step 10: Verifying application..."
sleep 5

# Check PM2 status
if pm2 list | grep -q "sdit-annajm.*online"; then
    echo "✓ PM2 process is online"
else
    echo "✗ PM2 process is not online"
    pm2 logs sdit-annajm --lines 50 --nostream
    exit 1
fi

# Test API endpoints
echo ""
echo "Testing API endpoints..."

# Test /api/auth/me
echo -n "  /api/auth/me: "
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/auth/me)
if [ "$HTTP_CODE" = "401" ]; then
    echo "✓ OK (HTTP $HTTP_CODE - expected)"
elif [ "$HTTP_CODE" = "200" ]; then
    echo "✓ OK (HTTP $HTTP_CODE)"
else
    echo "✗ Failed (HTTP $HTTP_CODE)"
fi

# Test login page
echo -n "  /login: "
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/login)
if [ "$HTTP_CODE" = "200" ]; then
    echo "✓ OK (HTTP $HTTP_CODE)"
else
    echo "✗ Failed (HTTP $HTTP_CODE)"
fi

# Test login API
echo -n "  POST /api/auth/login: "
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}')
if [ "$HTTP_CODE" = "200" ]; then
    echo "✓ OK (HTTP $HTTP_CODE)"
else
    echo "⚠ HTTP $HTTP_CODE (check credentials)"
fi

echo ""
echo "========================================="
echo "✓ ALL FIXES COMPLETED!"
echo "========================================="
echo ""
pm2 status
echo ""
echo "Website: https://sditannajm.sch.id"
echo "Admin: https://sditannajm.sch.id/admin"
echo "Login: admin / admin123"
echo ""
echo "Monitor: pm2 logs sdit-annajm"
echo ""
