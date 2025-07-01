#!/bin/bash

echo "🔍 Connection Debugging Script"
echo "=============================="
echo ""

echo "1. Testing if port 8080 is open..."
if command -v nc >/dev/null 2>&1; then
    nc -z localhost 8080 && echo "✅ Port 8080 is open" || echo "❌ Port 8080 is not accessible"
else
    echo "⚠️  netcat not available, skipping port check"
fi
echo ""

echo "2. Testing basic HTTP connection..."
curl -v http://localhost:8080/ 2>&1 | head -10
echo ""

echo "3. Testing the actual API endpoint..."
curl -X POST http://localhost:8080/create_user_fund/tx \
  -H "Content-Type: application/json" \
  -H "api-key: userkey_0000" \
  -d '{
    "params": {
      "fund_id": "DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW",
      "user_key": "4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh"
    }
  }' -v
echo ""

echo "4. Checking if any process is using port 8080..."
if command -v lsof >/dev/null 2>&1; then
    lsof -i :8080 || echo "No process found on port 8080"
else
    echo "lsof not available"
fi