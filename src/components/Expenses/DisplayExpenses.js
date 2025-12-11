import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import "./DisplayExpenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import ExpensesChart from "./ExpensesChart";

function DisplayExpenses(props) {
  const currentYear = new Date().getFullYear().toString();
  const [filterYear, setFilteredYear] = useState(currentYear);
  
  const filterChangeHandler = (year) => {
    setFilteredYear(year);  
  };
  
  // Safety check: ensure expenses_list exists and is an array
  const expenses = props.expenses_list || [];
  
  // Filter expenses with safety checks
  const filteredExpenses = expenses.filter((expense) => {
    // Ensure date exists and is a valid Date object
    if (!expense || !expense.date) return false;
    
    // Convert to Date if it's a string
    const expenseDate = expense.date instanceof Date ? expense.date : new Date(expense.date);
    
    return expenseDate.getFullYear().toString() === filterYear;
  });
  
  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter selected={filterYear} onFilterChange={filterChangeHandler} />
        <ExpensesChart expenses={filteredExpenses} />
        {filteredExpenses.length === 0 && <p>No expenses found.</p>}
        {filteredExpenses.length > 0 && filteredExpenses.map((i) => (
          <ExpenseItem
            key={i.id}
            title={i.title}
            amount={i.amount}
            date={i.date instanceof Date ? i.date : new Date(i.date)}
          />
        ))}
      </Card>
    </div>
  );
}

export default DisplayExpenses;
