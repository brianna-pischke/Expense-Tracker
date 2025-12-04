const mongoose = require('mongoose');

// Define budget schema
const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, 'User ID is required']
  },
  amount: {
    type: Number,
    required: [true, 'Please provide a budget amount'],
    min: [0, 'Budget amount must be positive']
  },
  month: {
    type: String,
    required: [true, 'Please provide a month'],
    // Format: "YYYY-MM" (e.g., "2025-11")
    match: [/^\d{4}-\d{2}$/, 'Month must be in format YYYY-MM']
  }
}, {
  timestamps: true
});

// Create index to ensure one budget per user per month
budgetSchema.index({ userId: 1, month: 1 }, { unique: true });

// Create and export budget model
module.exports = mongoose.model('Budget', budgetSchema);
