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
  // Budget state - array of budgets, one per month
  const [budgets, setBudgets] = useState([]);

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
        const [expenseData, categoryData, budgetsData] = await Promise.all([
          getExpenses(token),
          getCategories(token),
          getBudgets(token).catch(() => []), // Default to empty array if no budgets
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
        setBudgets(budgetsData);
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
    setBudgets([]);
  };

  // Save budget handler - expects { amount, month }
  const handleSaveBudget = async (budgetData) => {
    try {
      const savedBudget = await saveBudget(budgetData, token);
      // Update budgets array - replace if exists, add if new
      setBudgets((prev) => {
        const existingIndex = prev.findIndex(b => b.month === savedBudget.month);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = savedBudget;
          return updated;
        }
        return [...prev, savedBudget].sort((a, b) => a.month.localeCompare(b.month));
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // Calculate total spent from expenses
  const calculateTotalSpent = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  // Get current month's budget (format: YYYY-MM)
  const getCurrentMonthBudget = () => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return budgets.find(b => b.month === currentMonth) || null;
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
  const currentBudget = getCurrentMonthBudget();

  return (
    <div>
      <div style={{ textAlign: 'right', padding: '1rem' }}>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <BudgetTracker onSaveBudget={handleSaveBudget} currentBudget={currentBudget} />
      <BudgetDisplay budget={currentBudget} totalSpent={totalSpent} />
      <NewExpense onAddExpense={addExpenseHandler} categories={categories} />
      <DisplayExpenses expenses_list={expenses} />
    </div>
  );
};

export default App;
