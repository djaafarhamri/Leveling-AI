const express = require('express');
const path = require('path');
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// API Route to return file tree
app.get("/api/test", (req, res) => {
  res.json("fileTree");
});

// Serve static files from frontend build
const staticPath = path.join(__dirname, './dist');
console.log('Static path:', staticPath);
app.use(express.static(staticPath));

// Handle React routing, return the main index.html file for all routes
app.get('*', (req, res) => {
  console.log('Serving index.html for:', req.url);
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Only run app.listen if not in a Vercel environment
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export app for Vercel
module.exports = app;
