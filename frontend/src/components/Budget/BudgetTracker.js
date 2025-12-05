import React, { useState } from "react";
import "./budgetTracker.css";
import Card from "../UI/Card";

const BudgetTracker = ({ onSaveBudget, currentBudget }) => {
  const [enteredAmount, setEnteredAmount] = useState(currentBudget?.monthlyLimit?.toString() || '');  
  
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

    // Get current date
    const now = new Date();
    const month = now.getMonth() + 1;  // 1-12
    const year = now.getFullYear();
    
    // Send budget in the format backend expects: { monthlyLimit, month, year }
    onSaveBudget({
      monthlyLimit: budgetAmount,  
      month: month,                 
      year: year                   
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
