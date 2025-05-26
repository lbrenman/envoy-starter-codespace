const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const SERVICE_NAME = process.env.SERVICE_NAME || 'Backend-1';

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
    message: `Hello from ${SERVICE_NAME}!`,
    service: SERVICE_NAME,
    timestamp: new Date().toISOString(),
    headers: req.headers
  });
});

// API endpoint
app.get('/api', (req, res) => {
  res.json({
    service: SERVICE_NAME,
    endpoint: '/api',
    data: {
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ]
    },
    timestamp: new Date().toISOString()
  });
});

// Simulate slow endpoint
app.get('/slow', (req, res) => {
  setTimeout(() => {
    res.json({
      service: SERVICE_NAME,
      message: 'This was a slow response',
      delay: '2 seconds',
      timestamp: new Date().toISOString()
    });
  }, 2000);
});

// Simulate error endpoint
app.get('/error', (req, res) => {
  if (Math.random() > 0.5) {
    res.status(500).json({
      service: SERVICE_NAME,
      error: 'Simulated server error',
      timestamp: new Date().toISOString()
    });
  } else {
    res.json({
      service: SERVICE_NAME,
      message: 'Lucky! No error this time',
      timestamp: new Date().toISOString()
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`${SERVICE_NAME} running on port ${PORT}`);
});