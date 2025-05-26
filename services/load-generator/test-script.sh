#!/bin/bash

echo "🚀 Starting Envoy Load Testing Script"
echo "Waiting for Envoy to be ready..."

# Wait for Envoy to be ready
sleep 10

ENVOY_URL="http://envoy:8000"
ADMIN_URL="http://envoy:8080"

echo "📊 Testing Envoy Proxy Configuration"
echo "=================================="

# Test basic connectivity
echo "1. Testing basic connectivity..."
curl -s "$ENVOY_URL/" | head -3

echo -e "\n2. Testing path-based routing..."
echo "   - Testing /api/v1/ route (Backend 1):"
curl -s "$ENVOY_URL/api/v1/" | head -3

echo "   - Testing /api/v2/ route (Backend 2):"
curl -s "$ENVOY_URL/api/v2/" | head -3

echo "   - Testing /python/ route (Backend 3):"
curl -s "$ENVOY_URL/python/" | head -3

echo -e "\n3. Testing load balancing..."
echo "Making 6 requests to see load balancing in action:"
for i in {1..6}; do
    echo "Request $i:"
    curl -s "$ENVOY_URL/loadbalance" | grep -E '(service|message)' | head -2
    sleep 1
done

echo -e "\n4. Testing health checks..."
curl -s "$ENVOY_URL/api/v1/health" | head -3

echo -e "\n5. Load testing (10 concurrent requests)..."
for i in {1..10}; do
    curl -s "$ENVOY_URL/" > /dev/null &
done
wait

echo -e "\n6. Testing slow endpoints..."
echo "This will take a few seconds..."
time curl -s "$ENVOY_URL/api/v1/slow" | head -3

echo -e "\n📈 Envoy Admin Stats (sample):"
echo "=============================="
curl -s "$ADMIN_URL/stats" | grep -E "(envoy_cluster|envoy_http)" | head -10

echo -e "\n🔍 Envoy Clusters Status:"
echo "========================="
curl -s "$ADMIN_URL/clusters" | head -10

echo -e "\n✅ Load testing completed!"
echo "Check the Envoy admin interface at: $ADMIN_URL"
echo "Key admin endpoints:"
echo "  - Stats: $ADMIN_URL/stats" 
echo "  - Clusters: $ADMIN_URL/clusters"
echo "  - Config: $ADMIN_URL/config_dump"

# Keep container running for manual testing
echo -e "\nContainer will stay running for manual testing..."
tail -f /dev/null