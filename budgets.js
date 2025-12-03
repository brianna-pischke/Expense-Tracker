const express = require('express');
const router = express.Router();
const {
    setBudget,
    getBudget,
    getCurrentBudget,
    getAllBudgets,
    deleteBudget,
} = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

// All Routes require authentication
router.use(protect);

router.post('/', setBudget);
router.get('/', getAllBudgets);
router.get('/current', getCurrentBudget);
router.get('/:month/:year', getBudget);
router.delete('/:id', deleteBudget);

module.exports = router;