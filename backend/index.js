console.log('Server starting...');
const express = require('express');
const path = require('path');
const app = express();

// Console log to verify server is running
console.log('Express server started');

// API routes (replace with your actual routes)
app.get('/api/test', (req, res) => {
  console.log('API route hit:', req.path);
  res.json("test success")
});

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.path);
  next();
});

// Serve static files
const frontendPath = path.join(__dirname, '../frontend/dist');
console.log('Serving static files from:', frontendPath);
app.use(express.static(frontendPath));

// For any request that doesn't match an asset or API route, send the index.html
app.get('*', (req, res) => {
  console.log('Fallback route hit, serving index.html');
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;