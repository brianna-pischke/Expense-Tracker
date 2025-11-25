const Budget = require('../models/Budget');

// @desc    Get budget for logged in user
// @route   GET /api/budget
// @access  Private
const getBudget = async (req, res, next) => {
  try {
    let budget = await Budget.findOne({ userId: req.user.id });
    
    // If no budget exists, return default
    if (!budget) {
      return res.json({ amount: 0, _id: null });
    }
    
    res.json(budget);
  } catch (err) {
    next(err);
  }
};

// @desc    Create or update budget for logged in user
// @route   POST /api/budget
// @access  Private
const createOrUpdateBudget = async (req, res, next) => {
  try {
    const { amount } = req.body;

    // Validation
    if (amount === undefined || amount === null) {
      return res.status(400).json({ 
        message: 'Please provide a budget amount' 
      });
    }

    if (amount < 0) {
      return res.status(400).json({ 
        message: 'Budget amount must be positive' 
      });
    }

    // Find existing budget or create new one
    const budget = await Budget.findOneAndUpdate(
      { userId: req.user.id },
      { 
        amount: Number(amount),
        userId: req.user.id
      },
      { 
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.status(201).json(budget);
  } catch (err) {
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    next(err);
  }
};

// @desc    Delete budget for logged in user
// @route   DELETE /api/budget
// @access  Private
const deleteBudget = async (req, res, next) => {
  try {
    const budget = await Budget.findOne({ userId: req.user.id });
    
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    await Budget.findByIdAndDelete(budget._id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBudget,
  createOrUpdateBudget,
  deleteBudget
};

