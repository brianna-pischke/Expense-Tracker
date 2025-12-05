import React from "react";
import "./budgetTracker.css";
import Card from "../UI/Card";

const BudgetDisplay = ({ budget, totalSpent }) => {
  if (!budget || budget.amount === 0) {
    return null;
  }

  const remaining = budget.amount - totalSpent;
  const isOverBudget = remaining < 0;
  const percentageUsed = budget.amount > 0 ? (totalSpent / budget.amount) * 100 : 0;

  // Determine color based on budget status
  const getStatusColor = () => {
    if (isOverBudget) return '#d32f2f'; // Red for over budget
    if (percentageUsed >= 90) return '#f57c00'; // Orange for close to limit
    if (percentageUsed >= 75) return '#fbc02d'; // Yellow for warning
    return '#388e3c'; // Green for good
  };

  const statusColor = getStatusColor();

  return (
    <Card className="budget-display">
      <div className="budget-display__header">
        <h3>Budget Overview</h3>
      </div>
      <div className="budget-display__content">
        <div className="budget-display__row">
          <span className="budget-display__label">Budget:</span>
          <span className="budget-display__value">${budget.amount.toFixed(2)}</span>
        </div>
        <div className="budget-display__row">
          <span className="budget-display__label">Spent:</span>
          <span className="budget-display__value">${totalSpent.toFixed(2)}</span>
        </div>
        <div className="budget-display__row budget-display__row--highlight">
          <span className="budget-display__label">
            {isOverBudget ? 'Overspent:' : 'Remaining:'}
          </span>
          <span 
            className="budget-display__value"
            style={{ color: statusColor, fontWeight: 'bold' }}
          >
            ${Math.abs(remaining).toFixed(2)}
          </span>
        </div>
        <div className="budget-display__progress">
          <div className="budget-display__progress-bar">
            <div 
              className="budget-display__progress-fill"
              style={{ 
                width: `${Math.min(percentageUsed, 100)}%`,
                backgroundColor: statusColor
              }}
            />
          </div>
          <span className="budget-display__percentage">
            {percentageUsed.toFixed(1)}% used
          </span>
        </div>
      </div>
    </Card>
  );
};

export default BudgetDisplay;
