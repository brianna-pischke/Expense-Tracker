const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  password: String
});

// Create and export user model
module.exports = mongoose.model('User', userSchema);
