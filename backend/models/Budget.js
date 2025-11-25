const mongoose = require('mongoose');

// Define budget schema
const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, 'User ID is required'],
    unique: true // One budget per user
  },
  amount: {
    type: Number,
    required: [true, 'Please provide a budget amount'],
    min: [0, 'Budget amount must be positive']
  }
}, {
  timestamps: true
});

// Create and export budget model
module.exports = mongoose.model('Budget', budgetSchema);

