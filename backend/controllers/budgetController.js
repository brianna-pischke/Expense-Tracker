const Budget = require('../models/Budget');

/**
 * Set or update a monthly budget
 * POST /api/budgets
 */
const setBudget = async (req, res) => {
  try {
    const { monthlyLimit, month, year } = req.body;
    const userId = req.user.id;  // From protect middleware

    // Validate required fields
    if (!monthlyLimit || !month || !year) {
      return res.status(400).json({ 
        message: 'Please provide monthlyLimit, month, and year' 
      });
    }

    // Validate month range
    if (month < 1 || month > 12) {
      return res.status(400).json({ 
        message: 'Month must be between 1 and 12' 
      });
    }

    // Validate positive budget
    if (monthlyLimit < 0) {
      return res.status(400).json({ 
        message: 'Budget limit must be a positive number' 
      });
    }

    // Check if budget already exists for this user/month/year
    let budget = await Budget.findOne({ userId, month, year });

    if (budget) {
      // Update existing budget
      budget.monthlyLimit = monthlyLimit;
      await budget.save();
      
      return res.json({
        message: 'Budget updated successfully',
        budget,
      });
    } else {
      // Create new budget
      budget = await Budget.create({
        userId,
        monthlyLimit,
        month,
        year,
      });

      return res.status(201).json({
        message: 'Budget created successfully',
        budget,
      });
    }
  } catch (error) {
    console.error('Set budget error:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get budget for a specific month and year
 * GET /api/budgets/:month/:year
 */
const getBudget = async (req, res) => {
  try {
    const { month, year } = req.params;
    const userId = req.user.id;

    // Find budget for this user/month/year
    const budget = await Budget.findOne({ 
      userId, 
      month: parseInt(month), 
      year: parseInt(year) 
    });

    if (!budget) {
      return res.status(404).json({ 
        message: 'No budget found for this month' 
      });
    }

    res.json(budget);
  } catch (error) {
    console.error('Get budget error:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get current month's budget
 * GET /api/budgets/current
 */
const getCurrentBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;  // JavaScript months are 0-indexed
    const year = currentDate.getFullYear();

    // Find budget for current month
    const budget = await Budget.findOne({ userId, month, year });

    if (!budget) {
      return res.status(404).json({ 
        message: 'No budget set for current month' 
      });
    }

    res.json(budget);
  } catch (error) {
    console.error('Get current budget error:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all budgets for a user
 * GET /api/budgets
 */
const getAllBudgets = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all budgets for this user, sorted by year and month (newest first)
    const budgets = await Budget.find({ userId })
      .sort({ year: -1, month: -1 });

    res.json(budgets);
  } catch (error) {
    console.error('Get all budgets error:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a budget
 * DELETE /api/budgets/:id
 */
const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find budget and verify ownership
    const budget = await Budget.findOne({ _id: id, userId });

    if (!budget) {
      return res.status(404).json({ 
        message: 'Budget not found or unauthorized' 
      });
    }

    await budget.deleteOne();

    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error('Delete budget error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  setBudget,
  getBudget,
  getCurrentBudget,
  getAllBudgets,
  deleteBudget,
};
