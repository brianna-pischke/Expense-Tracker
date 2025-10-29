const mongoose = require('mongoose');

// Define category schema
const categorySchema = new mongoose.Schema({
  name: String
});

// Create and export category model
module.exports = mongoose.model('Category', categorySchema);
