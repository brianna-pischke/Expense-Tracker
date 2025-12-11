import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import "./DisplayExpenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import ExpensesChart from "./ExpensesChart";

function DisplayExpenses(props) {
  const currentYear = new Date().getFullYear().toString();
  const [filterYear, setFilteredYear] = useState(currentYear);
  
  const filterChangeHandler = year => {
    setFilteredYear(year);  
  };
  
  const filteredExpenses = props.expenses_list.filter(expense => expense.date.getFullYear().toString() === filterYear);
  
  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter selected={filterYear} onFilterChange={filterChangeHandler}/>
        <ExpensesChart expenses={filteredExpenses} />
        {filteredExpenses.length === 0 && (<p>No expenses found.</p>)}
        
        {
          filteredExpenses.length > 0 && 
          (filteredExpenses.map((i) => (
          <ExpenseItem
            key={i.id}
            title={i.title}
            amount={i.amount}
            date={i.date}
          /> 
        ))
        )}
      </Card>
    </div>
  );
}

export default DisplayExpenses;
