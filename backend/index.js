const path = require('path')
const express = require('express')

const app = express()

// Serve static files from the frontend build
const frontendBuildPath = path.join(__dirname, '../frontend/dist')
app.use(express.static(frontendBuildPath))

// API routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' })
})

// Fallback to index.html for client-side routing (e.g., React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'))
})

// Export the Express app for Vercel to use
module.exports = app

// Start the server locally if not in a Vercel environment
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}
