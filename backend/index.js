const express = require('express');
const path = require('path');
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// API routes
app.get('/api/test', (req, res) => {
  res.json("test 1")
});

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Serve static files from frontend build
const staticPath = path.join(__dirname, '../frontend/dist');
console.log('Static path:', staticPath);
app.use(express.static(staticPath));

// Handle React routing, return the main index.html file for all routes
app.get('*', (req, res) => {
  console.log('Serving index.html for:', req.url);
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Set the port based on the environment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;