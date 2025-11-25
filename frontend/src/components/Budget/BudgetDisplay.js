import React from "react";
import "./budgetTracker.css";
import Card from "../UI/Card";

// Stub component for PR 1 - will be fully implemented in PR 2
const BudgetDisplay = ({ budget, totalSpent }) => {
  if (!budget || budget.amount === 0) {
    return null;
  }

  return (
    <Card className="budget-display">
      <div className="budget-display__header">
        <h3>Budget Overview</h3>
      </div>
      <div className="budget-display__content">
        <div className="budget-display__row">
          <span className="budget-display__label">Budget:</span>
          <span className="budget-display__value">${budget.amount?.toFixed(2) || '0.00'}</span>
        </div>
      </div>
    </Card>
  );
};

export default BudgetDisplay;
