const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Function to generate file tree
function generateTree(dir) {
  const ignoredDirs = new Set(["node_modules", ".git"]);
  let tree = [];

  fs.readdirSync(dir).forEach(file => {
    if (!ignoredDirs.has(file)) {
      const fullPath = path.join(dir, file);
      const isDirectory = fs.statSync(fullPath).isDirectory();
      tree.push({
        name: file,
        type: isDirectory ? "directory" : "file",
        children: isDirectory ? generateTree(fullPath) : null,
      });
    }
  });

  return tree;
}

// API Route to return file tree
app.get("/api/test", (req, res) => {
  const parentDir = path.resolve(__dirname, "..");
  const fileTree = generateTree(parentDir);
  res.json(fileTree);
});

// Serve static files from frontend build
const staticPath = path.join(__dirname, './public');
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
