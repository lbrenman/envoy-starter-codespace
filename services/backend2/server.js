const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const SERVICE_NAME = process.env.SERVICE_NAME || 'Backend-2';

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: SERVICE_NAME,
    timestamp: new Date().toISOString()
  });
});

// Main endpoint
app.get('/', (req, res) => {
  res.json({
    message: `Greetings from ${SERVICE_NAME}!`,
    service: SERVICE_NAME,
    version: '2.0',
    timestamp: new Date().toISOString(),
    request_id: Math.random().toString(36).substr(2, 9)
  });
});

// API endpoint with different data
app.get('/api', (req, res) => {
  res.json({
    service: SERVICE_NAME,
    endpoint: '/api',
    data: {
      products: [
        { id: 1, name: 'Laptop', price: 999.99 },
        { id: 2, name: 'Phone', price: 699.99 },
        { id: 3, name: 'Tablet', price: 399.99 }
      ]
    },
    timestamp: new Date().toISOString()
  });
});

// Different slow endpoint timing
app.get('/slow', (req, res) => {
  setTimeout(() => {
    res.json({
      service: SERVICE_NAME,
      message: 'Backend-2 slow response completed',
      delay: '1.5 seconds',
      timestamp: new Date().toISOString()
    });
  }, 1500);
});

// Stats endpoint
app.get('/stats', (req, res) => {
  res.json({
    service: SERVICE_NAME,
    stats: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
      timestamp: new Date().toISOString()
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`${SERVICE_NAME} running on port ${PORT}`);
});