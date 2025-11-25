const express = require('express');
const {
  getBudget,
  createOrUpdateBudget,
  deleteBudget
} = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Makes all budget routes require authentication
router.use(protect);

// /api/budget
router.get('/', getBudget);
router.post('/', createOrUpdateBudget);
router.delete('/', deleteBudget);

module.exports = router;

