const mongoose = require('mongoose');

/**
 * Budget Model
 * Stores monthly budget limits for users
 * Each user can have one budget per month/year combination
 */
const budgetSchema = new mongoose.Schema(
  {
    // Reference to the user who owns this budget
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Monthly budget limit (e.g., 2000 for $2000/month)
    monthlyLimit: {
      type: Number,
      required: [true, 'Please provide a monthly budget limit'],
      min: [0, 'Budget limit must be a positive number'],
    },
    // Month (1-12, where 1 = January, 12 = December)
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    // Year (e.g., 2025)
    year: {
      type: Number,
      required: true,
      min: 2019,  // Minimum year allowed
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
  }
);

// Create compound index to ensure one budget per user per month/year
// This prevents duplicate budgets for the same month
budgetSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('Budget', budgetSchema);
