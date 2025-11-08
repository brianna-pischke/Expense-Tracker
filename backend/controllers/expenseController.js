const Expense = require('../models/Expense');

// @desc    Get all expenses for logged in user
// @route   GET /api/expenses
// @access  Private
const getExpenses = async (req, res, next) => {
  try {
    // Only get expenses for the logged in user
    const expenses = await Expense.find({ userId: req.user.id })
      .populate('userId', 'name email')
      .populate('categoryId', 'name');
    res.json(expenses);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single expense by ID
// @route   GET /api/expenses/:id
// @access  Private
const getExpenseById = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Ensure user owns this expense (check before populating)
    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this expense' });
    }

    // Populate after authorization check
    const populatedExpense = await Expense.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('categoryId', 'name');

    res.json(populatedExpense);
  } catch (err) {
    next(err);
  }
};

// @desc    Create new expense
// @route   POST /api/expenses
// @access  Private
const createExpense = async (req, res, next) => {
  try {
    const { title, amount, date, categoryId } = req.body;

    // Validation
    if (!title || amount === undefined || !date) {
      return res.status(400).json({ 
        message: 'Please provide title, amount, and date' 
      });
    }

    // Automatically set userId to logged in user (prevent user from setting their own userId)
    const expenseData = {
      title: title.trim(),
      amount: Number(amount),
      date: new Date(date),
      categoryId: categoryId || null,
      userId: req.user.id
    };

    const created = await Expense.create(expenseData);
    const expense = await Expense.findById(created._id)
      .populate('userId', 'name email')
      .populate('categoryId', 'name');
    res.status(201).json(expense);
  } catch (err) {
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    next(err);
  }
};

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = async (req, res, next) => {
  try {
    let expense = await Expense.findById(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Ensure user owns this expense
    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this expense' });
    }

    // Prevent changing userId - always keep the original owner
    const updateData = { ...req.body };
    delete updateData.userId;

    // Clean up the update data
    if (updateData.title) updateData.title = updateData.title.trim();
    if (updateData.amount !== undefined) updateData.amount = Number(updateData.amount);
    if (updateData.date) updateData.date = new Date(updateData.date);

    expense = await Expense.findByIdAndUpdate(req.params.id, updateData, { 
      new: true,
      runValidators: true
    })
      .populate('userId', 'name email')
      .populate('categoryId', 'name');
    
    res.json(expense);
  } catch (err) {
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    next(err);
  }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Ensure user owns this expense
    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this expense' });
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense
};


