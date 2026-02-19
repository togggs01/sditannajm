#!/bin/bash

echo "========================================="
echo "Application Logs"
echo "========================================="
echo ""

echo "PM2 Status:"
pm2 status
echo ""

echo "Last 100 lines of logs:"
echo "----------------------------------------"
pm2 logs sdit-annajm --lines 100 --nostream
echo ""

echo "To follow logs in real-time, run:"
echo "  pm2 logs sdit-annajm"
echo ""
