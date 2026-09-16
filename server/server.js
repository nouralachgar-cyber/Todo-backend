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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Todo API is running',
    version: '1.0.0',
  });
});

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
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in .env file');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined in .env file');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = app;
