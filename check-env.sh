#!/bin/bash

echo "=== Checking Environment Variables ==="
echo ""

# Check if .env file exists
if [ -f .env ]; then
    echo "✓ .env file found"
    echo ""
    echo "Environment variables in .env:"
    grep -v '^#' .env | grep -v '^$' | while IFS= read -r line; do
        key=$(echo "$line" | cut -d '=' -f 1)
        echo "  - $key: Set"
    done
else
    echo "✗ .env file not found!"
fi

echo ""
echo "=== Current Environment ==="
echo "NODE_ENV: ${NODE_ENV:-not set}"
echo "DATABASE_URL: ${DATABASE_URL:+Set (hidden)}"
echo ""

# Test database connection
echo "=== Testing Database Connection ==="
npx prisma db execute --stdin <<< "SELECT 1;" 2>&1 | head -5

echo ""
echo "=== Prisma Client Status ==="
if [ -d "node_modules/.prisma/client" ]; then
    echo "✓ Prisma Client generated"
else
    echo "✗ Prisma Client not generated"
    echo "  Run: npx prisma generate"
fi
