#!/bin/bash

echo "========================================="
echo "Copy Prisma to Standalone Build"
echo "========================================="
echo ""

# Check if standalone exists
if [ ! -d ".next/standalone" ]; then
    echo "ERROR: Standalone build not found!"
    echo "Please run 'npm run build' first"
    exit 1
fi

# Create directories
echo "Creating directories..."
mkdir -p .next/standalone/node_modules/.prisma
mkdir -p .next/standalone/node_modules/@prisma
echo "✓ Directories created"
echo ""

# Copy Prisma Client
echo "Copying Prisma Client..."
if [ -d "node_modules/.prisma/client" ]; then
    cp -r node_modules/.prisma/client .next/standalone/node_modules/.prisma/
    echo "✓ Copied .prisma/client"
else
    echo "ERROR: node_modules/.prisma/client not found!"
    echo "Run 'npx prisma generate' first"
    exit 1
fi

if [ -d "node_modules/@prisma/client" ]; then
    cp -r node_modules/@prisma/client .next/standalone/node_modules/@prisma/
    echo "✓ Copied @prisma/client"
else
    echo "ERROR: node_modules/@prisma/client not found!"
    exit 1
fi
echo ""

# Copy public and static
echo "Copying public and static folders..."
cp -r public .next/standalone/ 2>/dev/null || echo "Public folder not found"
cp -r .next/static .next/standalone/.next/ 2>/dev/null || echo "Static folder not found"
echo "✓ Public and static copied"
echo ""

# List engine files
echo "Verifying Prisma engine files..."
if [ -f ".next/standalone/node_modules/.prisma/client/libquery_engine-debian-openssl-1.1.x.so.node" ]; then
    echo "✓ Found: libquery_engine-debian-openssl-1.1.x.so.node"
fi
if [ -f ".next/standalone/node_modules/.prisma/client/libquery_engine-debian-openssl-3.0.x.so.node" ]; then
    echo "✓ Found: libquery_engine-debian-openssl-3.0.x.so.node"
fi
echo ""

echo "========================================="
echo "✓ COPY COMPLETED!"
echo "========================================="
echo ""
echo "You can now run:"
echo "  node .next/standalone/server.js"
echo ""
