#!/bin/bash

echo "🚀 Starting Production Deployment..."

# Stop any running processes
echo "📦 Stopping existing processes..."
pm2 stop sdit-annajm 2>/dev/null || true

# Clean build artifacts
echo "🧹 Cleaning build artifacts..."
rm -rf .next
rm -rf node_modules/.cache

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Generate Prisma Client with production config
echo "🔧 Generating Prisma Client..."
NODE_ENV=production npx prisma generate

# Build application
echo "🏗️  Building application..."
NODE_ENV=production npm run build

# Start with PM2
echo "🚀 Starting application with PM2..."
pm2 start npm --name "sdit-annajm" -- start
pm2 save

echo "✅ Deployment completed!"
echo "📊 Check status: pm2 status"
echo "📝 Check logs: pm2 logs sdit-annajm"
