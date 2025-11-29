const Budget = require("../models/Budget");

exports.createBudget = async (req, res) => {
  try {
    const { amount, month } = req.body;

    const budget = await Budget.create({
      userId: req.user.id,
      amount,
      month,
    });

  res.status(201).json(budget);
  } catch (err) {
    console.error("Error creating budget:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id }).sort({ month: 1 });
    res.status(200).json(budgets);
  } catch (err) {
    console.error("Error fetching budgets:", err);
    res.status(500).json({ message: "Server error" });
  }
};
