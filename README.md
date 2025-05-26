# Envoy Proxy Learning Project 🚀

A comprehensive hands-on project to learn Envoy Proxy fundamentals using GitHub Codespaces. This project demonstrates key Envoy concepts including load balancing, routing, health checks, and observability.

## 🎯 What You'll Learn

- **Envoy Proxy Basics**: Configuration, listeners, clusters, and routes
- **Load Balancing**: Round-robin distribution across multiple backends
- **Path-based Routing**: Route requests based on URL paths
- **Health Checking**: Automatic service health monitoring
- **Rate Limiting**: Control request rates to protect services
- **Observability**: Admin interface, stats, and logging
- **Service Discovery**: How Envoy discovers and manages backends

## 🏗️ Architecture

```
Internet/Codespace → Envoy Proxy (Port 8000) → Backend Services
                          ↓
                    Admin Interface (Port 8080)
```

**Backend Services:**
- **Backend 1**: Node.js service (routes: `/api/v1/`)
- **Backend 2**: Node.js service (routes: `/api/v2/`)  
- **Backend 3**: Python Flask service (routes: `/python/`)
- **Load Balancing**: All services available at `/` and `/loadbalance`

## 🚀 Quick Start

1. **Clone this repository** in GitHub Codespaces
2. **Start all services:**
   ```bash
   docker-compose up --build
   ```
3. **Wait for services to start** (about 30 seconds)
4. **Access Envoy** at the forwarded port 8000
5. **Check the admin interface** at port 8080

## 🧪 Testing Envoy Features

### Basic Connectivity
```bash
# Test main endpoint (load balanced)
curl http://localhost:8000/

# Test health endpoint
curl http://localhost:8000/health
```

### Path-based Routing
```bash
# Route to Backend 1 (Node.js)
curl http://localhost:8000/api/v1/

# Route to Backend 2 (Node.js)  
curl http://localhost:8000/api/v2/

# Route to Backend 3 (Python Flask)
curl http://localhost:8000/python/
```

### Load Balancing
```bash
# Make multiple requests to see load balancing
for i in {1..5}; do
  curl http://localhost:8000/loadbalance
  echo "---"
done
```

### Performance Testing
```bash
# Test slow endpoints
curl http://localhost:8000/api/v1/slow
curl http://localhost:8000/api/v2/slow
curl http://localhost:8000/python/slow

# Test error handling
curl http://localhost:8000/api/v1/error
```

### Rate Limiting
```bash
# Test rate limiting (configured for 100 requests per minute)
for i in {1..10}; do
  curl -w "%{http_code}\n" http://localhost:8000/ -o /dev/null -s
done
```

## 📊 Admin Interface

The Envoy admin interface is available at **port 8080** and provides:

### Key Admin Endpoints
- **Stats**: `http://localhost:8080/stats` - Detailed metrics
- **Clusters**: `http://localhost:8080/clusters` - Backend service status
- **Config**: `http://localhost:8080/config_dump` - Current configuration
- **Listeners**: `http://localhost:8080/listeners` - Active listeners
- **Server Info**: `http://localhost:8080/server_info` - Envoy version and build info

### Useful Stats to Monitor
```bash
# Connection stats
curl http://localhost:8080/stats | grep "cluster.*cx_"

# Request stats  
curl http://localhost:8080/stats | grep "cluster.*rq_"

# Health check stats
curl http://localhost:8080/stats | grep "health_check"

# Rate limiting stats
curl http://localhost:8080/stats | grep "rate_limit"
```

## 🔧 Configuration Deep Dive

### Envoy Configuration Structure
The main config file (`envoy-config/envoy.yaml`) demonstrates:

1. **Admin Interface**: Management and monitoring
2. **Listeners**: Accept incoming connections  
3. **Routes**: Path-based request routing
4. **Clusters**: Backend service definitions
5. **Health Checks**: Automatic service monitoring
6. **Filters**: Request processing (rate limiting, logging)

### Key Configuration Concepts

**Listeners**: Define how Envoy accepts connections
```yaml
listeners:
- name: main_listener
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8000
```

**Clusters**: Define backend services
```yaml
clusters:
- name: backend1_cluster
  connect_timeout: 0.25s
  type: LOGICAL_DNS
  lb_policy: ROUND_ROBIN
```

**Routes**: Define request routing logic
```yaml
routes:
- match:
    prefix: "/api/v1/"
  route:
    cluster: backend1_cluster
```

## 🛠️ Load Testing

Run the automated load generator to test Envoy features:

```bash
# Start load testing container
docker-compose --profile tools up load-generator
```

This will automatically test:
- Basic connectivity
- Path-based routing
- Load balancing
- Health checks
- Performance under load

## 📈 Learning Exercises

### Exercise 1: Modify Load Balancing
1. Change the load balancing policy from `ROUND_ROBIN` to `LEAST_REQUEST`
2. Restart Envoy and observe the behavior
3. Check admin stats to see the difference

### Exercise 2: Add Circuit Breaking
1. Add circuit breaker configuration to a cluster
2. Test with the `/error` endpoint
3. Monitor circuit breaker stats

### Exercise 3: Custom Headers
1. Add custom headers to requests
2. Modify routing based on headers
3. Test with curl using custom headers

### Exercise 4: Timeouts
1. Configure request timeouts
2. Test with slow endpoints
3. Observe timeout behavior in logs

## 🐛 Troubleshooting

###