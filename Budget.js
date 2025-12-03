const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema(
    {
        // Reference to the user who owns this budget
        userId: {
            type: mongoose.Schema.Typers.ObjectId,
            ref: 'User',
            required: true,
    },
    // Monthly budget limit
    monthlyLimit: {
        type: Number,
        required: [true, 'Please provide a monthly budget limit'],
        min: [0, 'Budget limit must be a positive number'],
    },
    // Month (1-2, 1 = January, 12 December)
     month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    // Year
    year: {
        type: Number,
        required: true,
        min: 2019,
    },
    },
    {
        timestamps: true, //Auto adds createdAt and updatedAt fields
    }
)

// Create compound index to prevent duplicate budgets for same month
budgetSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });
module.exports = mongoose.model('Budget', budgetSchema);
