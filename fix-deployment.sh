#!/bin/bash

echo "========================================="
echo "SDIT ANNAJM - Deployment Fix Script"
echo "========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists
echo "1. Checking environment variables..."
if [ -f .env ]; then
    echo -e "${GREEN}✓ .env file found${NC}"
else
    echo -e "${RED}✗ .env file not found!${NC}"
    echo "Please create .env file with DATABASE_URL"
    exit 1
fi

# Install dependencies
echo ""
echo "2. Installing dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi

# Generate Prisma Client
echo ""
echo "3. Generating Prisma Client..."
npx prisma generate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Prisma Client generated${NC}"
else
    echo -e "${RED}✗ Failed to generate Prisma Client${NC}"
    exit 1
fi

# Push database schema
echo ""
echo "4. Pushing database schema..."
npx prisma db push
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database schema pushed${NC}"
else
    echo -e "${YELLOW}⚠ Warning: Database push failed (might be already synced)${NC}"
fi

# Clean build
echo ""
echo "5. Cleaning old build..."
rm -rf .next
echo -e "${GREEN}✓ Old build cleaned${NC}"

# Build application
echo ""
echo "6. Building application..."
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Application built successfully${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi

echo ""
echo "========================================="
echo -e "${GREEN}✓ Deployment fix completed!${NC}"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Start the application: npm start"
echo "2. Or restart PM2: pm2 restart sdit-annajm"
echo "3. Check website: https://sditannajm.sch.id"
echo ""
