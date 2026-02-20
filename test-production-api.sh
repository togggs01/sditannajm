#!/bin/bash

echo "🧪 Testing Production API..."

# Test GET /api/guru
echo ""
echo "📋 Testing GET /api/guru..."
curl -X GET https://sditannajm.sch.id/api/guru \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n"

# Test POST /api/guru (with sample data)
echo ""
echo "📝 Testing POST /api/guru..."
curl -X POST https://sditannajm.sch.id/api/guru \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "Test Guru",
    "nip": "123456789",
    "jabatan": "Guru Kelas",
    "email": "test@example.com",
    "telepon": "08123456789"
  }' \
  -w "\nStatus: %{http_code}\n"

echo ""
echo "✅ Test completed!"
