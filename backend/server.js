require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expenses');
const categoryRoutes = require('./routes/categories');
const budgetRoutes = require('./routes/budget');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    'https://frontend-production-df54.up.railway.app',
    'http://localhost:3000'
  ],
  credentials: true
}));

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/budgets', budgetRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; 

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

