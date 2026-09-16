const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Load env vars - support running from both root and server directory
dotenv.config();
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(process.cwd(), 'server/.env') });

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Middleware
const corsOrigin = process.env.CLIENT_URL || process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(
  cors({
    origin: corsOrigin === '*' ? '*' : corsOrigin.split(',').map((o) => o.trim()),
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connection helper (cached for Vercel serverless)
const MONGO_URI = process.env.MONGO_URI;
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  if (!MONGO_URI) throw new Error('MONGO_URI is not defined');
  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    if (!process.env.VERCEL) process.exit(1);
    throw err;
  }
}

// Health check - must be before DB middleware so Vercel shows "server is running" even if DB not yet connected
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Todo API is running',
    version: '1.0.0',
  });
});
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Todo API is running',
    version: '1.0.0',
  });
});

// In Vercel serverless, ensure DB is connected before handling API routes
if (process.env.VERCEL) {
  app.use(async (req, res, next) => {
    // Skip DB connection for health checks
    if (req.path === '/' || req.path === '/api') return next();
    try {
      await connectDB();
      next();
    } catch (e) {
      next(e);
    }
  });
  // Trigger initial connection on cold start
  connectDB().catch((err) => console.error(err));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Server error. Please try again.',
  });
});

const PORT = process.env.PORT || 5000;

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in .env file');
  if (!process.env.VERCEL) process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined in .env file');
  if (!process.env.VERCEL) process.exit(1);
}

// Local development: connect and listen
if (!process.env.VERCEL) {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
}

module.exports = app;
