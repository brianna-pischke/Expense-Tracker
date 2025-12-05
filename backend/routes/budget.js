const express = require("express");
const router = express.Router();

// Middleware
const { protect } = require("../middleware/authMiddleware");

// Controller functions
const {
  setBudget,
  getBudget,
  getCurrentBudget,
  getAllBudgets,
  deleteBudget,
} = require("../controllers/budgetController");

// Create or update a budget
router.post("/", protect, setBudget);

// Get all budgets for a user
router.get("/", protect, getAllBudgets);

// Get a specific month/year budget
router.get("/:month/:year", protect, getBudget);

// Get current month's budget
router.get("/current", protect, getCurrentBudget);

// Delete a budget
router.delete("/:id", protect, deleteBudget);

module.exports = router;
