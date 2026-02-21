#!/bin/bash

echo "🔧 Fixing Prisma Client..."

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

# Verify Prisma Client
echo "✅ Verifying Prisma Client..."
if [ -d "node_modules/@prisma/client" ]; then
    echo "✓ Prisma Client generated successfully"
else
    echo "✗ Prisma Client generation failed"
    exit 1
fi

echo "🎉 Done! Prisma Client is ready."
