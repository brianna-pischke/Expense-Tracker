const mongoose = require('mongoose');

// Define expense schema
const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, 'User ID is required']
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category'
  },
  title: {
    type: String,
    required: [true, 'Please provide a title for the expense'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Please provide an amount'],
    min: [0, 'Amount must be positive']
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date'],
    default: Date.now
  }
}, {
  timestamps: true
});

// Create and export expense model
module.exports = mongoose.model('Expense', expenseSchema);
