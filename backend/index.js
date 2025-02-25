const express = require('express');
const path = require('path');
const app = express();

// Parse JSON bodies
app.use(express.json());

// API routes should come before the static file serving
app.get('/api/test', (req, res) => {
  res.json("test 200")
});

// Serve static files from the React app
const frontendBuildPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendBuildPath));

// Important: This catch-all route must come after API routes
// This handles client-side routing by serving index.html for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;