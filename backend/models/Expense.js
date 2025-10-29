const mongoose = require('mongoose');

// Define expense schema
const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category'
  },
  title: String,
  amount: Number,
  date: Date
});

// Create and export expense model
module.exports = mongoose.model('Expense', expenseSchema);
