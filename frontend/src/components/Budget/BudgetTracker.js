import React, { useState } from "react";
import "./budgetTracker.css";
import Card from "../UI/Card";

const BudgetTracker = ({ onSaveBudget, currentBudget }) => {
  const [enteredAmount, setEnteredAmount] = useState(currentBudget?.amount?.toString() || '');
  
  // Get current month in YYYY-MM format
  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const budgetAmount = parseFloat(enteredAmount);
    
    if (isNaN(budgetAmount) || budgetAmount < 0) {
      alert('Please enter a valid positive number');
      return;
    }

    // Send budget with amount and month
    onSaveBudget({
      amount: budgetAmount,
      month: getCurrentMonth()
    });
  };

  return (
    <Card className="budget-tracker">
      <form onSubmit={submitHandler} className="budget-tracker__form">
        <div className="budget-tracker__control">
          <label>Monthly Budget</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
            placeholder="Enter budget amount"
          />
        </div>
        <div className="budget-tracker__actions">
          <button type="submit">Save Budget</button>
        </div>
      </form>
    </Card>
  );
};

export default BudgetTracker;
