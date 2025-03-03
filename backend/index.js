import express from 'express';
import logger from './logging/logger';
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});
// API Route to return file tree
app.get('/api/test', (req, res) => {
  res.json('test sucess');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

// Export app for Vercel
export default app;
