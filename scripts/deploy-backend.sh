#!/bin/bash

# Exit immediately if any command fails
set -e

echo "🚀 Deploying Ranked Choice Backend..."

# Navigate to backend directory
cd backend

# Install dependencies
echo "📦 Installing dependencies..."
npm ci || { echo "❌ npm ci failed"; exit 1; }

# Build the application
echo "🔨 Building application..."
npm run build || { echo "❌ Build failed"; exit 1; }

# Check for required env vars
echo "==> Checking for required env vars"
npm run check:env || { echo "❌ Environment check failed"; exit 1; }

# Run migrations
echo "🔄 Running migrations..."
npm run db:migrate || { echo "❌ Database migration failed"; exit 1; }

# Check if build was successful
if [ ! -f "dist/server.js" ]; then
    echo "❌ Build failed! dist/server.js not found"
    exit 1
fi

echo "✅ Build successful!"

# If PM2 is available, restart the application
if command -v pm2 &> /dev/null; then
    echo "🔄 Restarting PM2 process..."
    pm2 restart ranked-choice-api || pm2 start ecosystem.config.js
    pm2 save
    echo "✅ PM2 process restarted"
else
    echo "⚠️  PM2 not found. Please install PM2 and start manually:"
    echo "   npm install -g pm2"
    echo "   pm2 start ecosystem.config.js"
    exit 1
fi

echo "🎉 Backend deployment complete!"
echo "📡 Health check: curl http://YOUR_EC2_IP/api/health"
