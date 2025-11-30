import React from "react";
import "./budgetTracker.css";
import Card from "../UI/Card";

// Stub component for PR 1 - will be fully implemented in PR 2
const BudgetTracker = ({ onSaveBudget, currentBudget }) => {
  return (
    <Card className="budget-tracker">
      <div className="budget-tracker__form">
        <div className="budget-tracker__control">
          <label>Monthly Budget</label>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter budget amount"
            disabled
          />
        </div>
        <div className="budget-tracker__actions">
          <button type="button" disabled>Save Budget</button>
        </div>
      </div>
    </Card>
  );
};

export default BudgetTracker;
