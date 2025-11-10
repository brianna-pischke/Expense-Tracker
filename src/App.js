import React, { useEffect, useState } from "react";
import DisplayExpenses from "./components/Expenses/DisplayExpenses";
import NewExpense from "./components/NewExpense/NewExpense";
import { getExpenses, addExpense } from "./services/expenseService";
import { getCategories } from "./services/categoryService";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//Load expenses + categories from backend
  useEffect(() => {
    async function fetchData() {
      try {
        const [expenseData, categoryData] = await Promise.all([
          getExpenses(),
          getCategories(),
        ]);

        const formatted = expenseData.map((exp) => ({
          id: exp._id,
          title: exp.title,
          amount: exp.amount,
          date: new Date(exp.date),
          category:
            exp.categoryId?.name || "Uncategorized", // from populate()
        }));

        setExpenses(formatted);
        setCategories(categoryData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

//Add expense to backend + local state
  const addExpenseHandler = async (expense) => {
    try {
      const saved = await addExpense(expense);
      setExpenses((prev) => [
        { ...saved, id: saved._id, date: new Date(saved.date) },
        ...prev,
      ]);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} categories={categories} />
      <DisplayExpenses expenses_list={expenses} />
    </div>
  );
};

export default App;