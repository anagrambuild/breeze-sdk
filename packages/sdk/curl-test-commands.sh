#!/bin/bash

echo "🔍 GET Endpoints Curl Test Commands"
echo "=================================="
echo ""

echo "1. 📊 GET FUND DATA:"
echo "curl -H \"api-key: userkey_0000\" http://localhost:8080/getfund/DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW"
echo ""

echo "2. 👤 GET USER INFO:"
echo "curl -H \"api-key: userkey_0000\" http://localhost:8080/user/YOUR_USER_ID_HERE"
echo ""

echo "3. 📁 GET USER FUNDS:"
echo "curl -H \"api-key: userkey_0000\" http://localhost:8080/userfunds/YOUR_USER_ID_HERE"
echo ""

echo "4. 💰 GET USER VALUE:"
echo "curl -H \"api-key: userkey_0000\" http://localhost:8080/uservalue/YOUR_USER_ID_HERE"
echo ""

echo "5. 📈 GET USER STATS:"
echo "curl -H \"api-key: userkey_0000\" \"http://localhost:8080/userstats/YOUR_USER_ID_HERE?start=2025-01-01T00:00:00.000Z&end=2025-01-31T23:59:59.999Z\""
echo ""

echo "=================================="
echo "🧪 QUICK TEST COMMANDS (copy & paste):"
echo ""

# Test Fund (we know this works)
echo "# Test getFund:"
echo "curl -H \"api-key: userkey_0000\" http://localhost:8080/getfund/DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW"
echo ""

# Test possible user endpoints
echo "# Test getUserInfo (try different formats):"
echo "curl -H \"api-key: userkey_0000\" http://localhost:8080/user/user_123"
echo "curl -H \"api-key: userkey_0000\" http://localhost:8080/getuserinfo/user_123"
echo "curl -H \"api-key: userkey_0000\" http://localhost:8080/userinfo/user_123"
echo ""

echo "# Test getUserFunds:"
echo "curl -H \"api-key: userkey_0000\" http://localhost:8080/userfunds/user_123"
echo "curl -H \"api-key: userkey_0000\" http://localhost:8080/user/funds/user_123"
echo "curl -H \"api-key: userkey_0000\" http://localhost:8080/getUserFunds/user_123"
echo ""

echo "# Test getUserValue:"
echo "curl -H \"api-key: userkey_0000\" http://localhost:8080/uservalue/user_123"
echo "curl -H \"api-key: userkey_0000\" http://localhost:8080/user/value/user_123"
echo "curl -H \"api-key: userkey_0000\" http://localhost:8080/getUserValue/user_123"
echo ""

echo "# Test getUserStats:"
echo "curl -H \"api-key: userkey_0000\" \"http://localhost:8080/userstats/user_123?start=2025-01-01T00:00:00.000Z&end=2025-01-31T23:59:59.999Z\""
echo "curl -H \"api-key: userkey_0000\" \"http://localhost:8080/user/stats/user_123?start=2025-01-01T00:00:00.000Z&end=2025-01-31T23:59:59.999Z\""
echo "curl -H \"api-key: userkey_0000\" \"http://localhost:8080/getUserStats/user_123?start=2025-01-01T00:00:00.000Z&end=2025-01-31T23:59:59.999Z\""