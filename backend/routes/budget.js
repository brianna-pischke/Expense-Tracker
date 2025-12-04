const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createBudget,
  getBudgets
} = require("../controllers/budgetController");

router.post("/", auth, createBudget);

router.get("/", auth, getBudgets);

module.exports = router;
