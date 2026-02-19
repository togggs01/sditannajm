#!/bin/bash

echo "========================================="
echo "API Test Script"
echo "========================================="
echo ""

# Check if app is running
echo "1. Checking if application is running..."
pm2 status sdit-annajm
echo ""

# Test database connection
echo "2. Testing database connection..."
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.\$connect();
    console.log('✓ Database connected');
    
    const adminCount = await prisma.admin.count();
    console.log('✓ Admin count:', adminCount);
    
    if (adminCount > 0) {
      const admin = await prisma.admin.findFirst();
      console.log('✓ Sample admin:', {
        id: admin.id,
        username: admin.username,
        role: admin.role
      });
    }
    
    await prisma.\$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

test();
"
echo ""

# Test login API
echo "3. Testing login API..."
echo "Attempting login with admin/admin123..."
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -w "\nHTTP Status: %{http_code}\n" \
  2>/dev/null || echo "✗ API not responding"
echo ""

# Show recent logs
echo "4. Recent application logs:"
pm2 logs sdit-annajm --lines 30 --nostream 2>/dev/null || echo "No logs available"
echo ""

echo "========================================="
echo "Test completed"
echo "========================================="
