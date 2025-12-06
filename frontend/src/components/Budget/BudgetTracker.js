import React, { useState } from "react";
import "./budgetTracker.css";
import Card from "../UI/Card";

const BudgetTracker = ({ onSaveBudget, currentBudget }) => {
  const [enteredAmount, setEnteredAmount] = useState(currentBudget?.monthlyLimit?.toString() || '');
  const [error, setError] = useState('');  
  const [success, setSuccess] = useState('');  
  
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
    setError('');  // Clear error when typing
    setSuccess('');  // Clear success when typing
  };

  const submitHandler = async (event) => {  // Make it async
    event.preventDefault();
    const budgetAmount = parseFloat(enteredAmount);
    
    if (isNaN(budgetAmount) || budgetAmount < 0) {
      setError('Please enter a valid positive number');
      return;
    }

    try {
      // Get current date
      const now = new Date();
      const month = now.getMonth() + 1;  // 1-12
      const year = now.getFullYear();
      
      // Send budget
      await onSaveBudget({
        monthlyLimit: budgetAmount,
        month: month,
        year: year
      });
      
      setSuccess('Budget saved successfully!');  // Show success
      setError('');
    } catch (err) {
      setError('Failed to save budget. Please try again.');
      setSuccess('');
    }
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
        
        {/* ADD ERROR/SUCCESS MESSAGES */}
        {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: '0.5rem' }}>{success}</p>}
        
        <div className="budget-tracker__actions">
          <button type="submit">Save Budget</button>
        </div>
      </form>
    </Card>
  );
};

export default BudgetTracker;
