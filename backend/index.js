const express = require('express')
const app = express()

// Middleware for parsing JSON
app.use(express.json())

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`)
  next()
})

// API Route to return file tree
app.get("/api/test", (req, res) => {
  res.json("fileTree")
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// Export app for Vercel
module.exports = app
