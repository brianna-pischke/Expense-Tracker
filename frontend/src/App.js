import React, { useState, useEffect } from "react";
import DisplayExpenses from "./components/Expenses/DisplayExpenses";
import NewExpense from "./components/NewExpense/NewExpense";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import BudgetTracker from "./components/Budget/BudgetTracker";
import BudgetDisplay from "./components/Budget/BudgetDisplay";
import { getExpenses, addExpense } from "./services/expenseService";
import { getCategories } from "./services/categoryService";
import { getBudget, saveBudget } from "./services/budgetService";

const App = () => {
    // State for storing user's expenses (array of expense objects)
  const [expenses, setExpenses] = useState([]);
    // State for storing available expense categories (e.g., Food, Transport, etc.) *future implementation
  const [categories, setCategories] = useState([]);
    // Loading state to show loading indicator while fetching data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    // JWT token for authentication - initialized from localStorage for session persistence
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  // Budget state
  const [budget, setBudget] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
        // Check if user has a stored token from previous session
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Load expenses + categories + budget from backend when logged in
  useEffect(() => {
    if (!token) return;

    async function fetchData() {
      try {
        const [expenseData, categoryData, budgetData] = await Promise.all([
          getExpenses(token),
          getCategories(token),
          getBudget(token).catch(() => ({ amount: 0, _id: null })), // Default to 0 if no budget
        ]);
        // Transform backend expense data to frontend format
        const formatted = expenseData.map((exp) => ({
          id: exp._id,
          title: exp.title,
          amount: exp.amount,
          date: new Date(exp.date),
          category: exp.categoryId?.name || "Uncategorized",
        }));
        setExpenses(formatted);
        setCategories(categoryData);
        setBudget(budgetData);
      } catch (err) {
        setError(err.message);
        // If unauthorized, clear token
        if (err.message.includes('authorized')) {
          localStorage.removeItem('token');
          setToken(null);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token]);

  // Add expense to backend + local state
  const addExpenseHandler = async (expense) => {
    try {
      const saved = await addExpense(expense, token);
      setExpenses((prev) => [
        { ...saved, id: saved._id, date: new Date(saved.date) },
        ...prev,
      ]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = (newToken) => {
    setToken(newToken);
    setLoading(true);
  };

  const handleRegister = (newToken) => {
    setToken(newToken);
    setLoading(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setExpenses([]);
    setCategories([]);
    setBudget(null);
  };

  // Save budget handler
  const handleSaveBudget = async (amount) => {
    try {
      const savedBudget = await saveBudget(amount, token);
      setBudget(savedBudget);
    } catch (err) {
      setError(err.message);
    }
  };

  // Calculate total spent from expenses
  const calculateTotalSpent = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  // Show login/register if no token
  if (!token) {
    return authMode === 'login' ? (
      <Login 
        onLogin={handleLogin} 
        onToggleMode={() => setAuthMode('register')} 
      />
    ) : (
      <Register 
        onRegister={handleRegister} 
        onToggleMode={() => setAuthMode('login')} 
      />
    );
  }

  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const totalSpent = calculateTotalSpent();

  return (
    <div>
      <div style={{ textAlign: 'right', padding: '1rem' }}>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <BudgetTracker onSaveBudget={handleSaveBudget} currentBudget={budget} />
      <BudgetDisplay budget={budget} totalSpent={totalSpent} />
      <NewExpense onAddExpense={addExpenseHandler} categories={categories} />
      <DisplayExpenses expenses_list={expenses} />
    </div>
  );
};

export default App;
