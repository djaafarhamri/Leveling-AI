const express = require('express');
const path = require('path');
const app = express();

// Your API routes
app.get('/api/test', (req, res) => {
  res.json("test success")
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// All other GET requests not handled before will return your frontend app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;