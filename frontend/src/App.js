import React, { useState, useEffect } from "react";
import DisplayExpenses from "./components/Expenses/DisplayExpenses";
import NewExpense from "./components/NewExpense/NewExpense";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import BudgetTracker from "./components/Budget/BudgetTracker";
import BudgetDisplay from "./components/Budget/BudgetDisplay";
import { getExpenses, addExpense } from "./services/expenseService";
import { getCategories } from "./services/categoryService";
import { getBudgets, saveBudget } from "./services/budgetService";

/**
 * Main App Component
 * Manages authentication state and coordinates between authenticated and unauthenticated views
 * Handles fetching and managing expenses, categories, and budgets for logged-in users
 */
const App = () => {
  // State for storing user's expenses (array of expense objects)
  const [expenses, setExpenses] = useState([]);
  
  // State for storing available expense categories (e.g., Food, Transport, etc.)
  const [categories, setCategories] = useState([]);
  
  // Loading state to show loading indicator while fetching data
  const [loading, setLoading] = useState(true);
  
  // Error state to display error messages to user
  const [error, setError] = useState(null);
  
  // JWT token for authentication - initialized from localStorage for session persistence
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  // Tracks whether user is viewing login or register form ('login' or 'register')
  const [authMode, setAuthMode] = useState('login');
  
  // Budget state - array of budgets, one per month (format: { month: Number, year: Number, monthlyLimit: Number })
  const [budgets, setBudgets] = useState([]);

  /**
   * Effect: Check authentication status on initial component mount
   * Runs once when component first loads
   */
  useEffect(() => {
    // Check if user has a stored token from previous session
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  /**
   * Effect: Fetch user's expenses, categories, and budgets when authenticated
   * Runs whenever token changes (login, logout, token refresh)
   */
  useEffect(() => {
    if (!token) return;

    async function fetchData() {
      try {
        // Fetch expenses, categories, and budgets simultaneously
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
        
        // If error is due to invalid/expired token, log user out
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

  /**
   * Handles adding a new expense
   * @param {Object} expense - New expense object
   */
  const addExpenseHandler = async (expense) => {
    try {
      const saved = await addExpense(expense, token);
      setExpenses((prev) => [
        { 
          ...saved, 
          id: saved._id, 
          date: new Date(saved.date) 
        },
        ...prev,
      ]);
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Handles successful login
   */
  const handleLogin = (newToken) => {
    setToken(newToken);
    setLoading(true);
  };

  /**
   * Handles successful registration
   */
  const handleRegister = (newToken) => {
    setToken(newToken);
    setLoading(true);
  };

  /**
   * Handles user logout
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setExpenses([]);
    setCategories([]);
    setBudgets([]);
  };

  /**
   * Save budget handler
   * @param {Object} budgetData - Budget object with { monthlyLimit, month, year }
   */
  const handleSaveBudget = async (budgetData) => {
    try {
      const savedBudget = await saveBudget(budgetData, token);
      
      // Update budgets array - replace if exists for that month/year, add if new
      setBudgets((prev) => {
        const existingIndex = prev.findIndex(
          b => b.month === savedBudget.month && b.year === savedBudget.year
        );
        if (existingIndex >= 0) {
          // Update existing budget
          const updated = [...prev];
          updated[existingIndex] = savedBudget;
          return updated;
        }
        // Add new budget and sort by year/month (newest first)
        return [...prev, savedBudget].sort((a, b) => {
          if (a.year !== b.year) return b.year - a.year;
          return b.month - a.month;
        });
      });
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Get current month's budget
   * @returns {Object|null} Budget object for current month or null
   */
  const getCurrentMonthBudget = () => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;  // JavaScript months are 0-indexed, so add 1 (1-12)
    const currentYear = now.getFullYear();
    return budgets.find(b => b.month === currentMonth && b.year === currentYear) || null;
  };

  /**
   * Calculate total expenses for all time
   */
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

  // Show loading message while fetching user data
  if (loading) return <p>Loading data...</p>;
  
  // Show error message if data fetch failed
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const totalSpent = calculateTotalSpent();
  const currentBudget = getCurrentMonthBudget();

  return (
    <div>
      {/* Logout button */}
      <div style={{ textAlign: 'right', padding: '1rem' }}>
        <button onClick={handleLogout}>Logout</button>
      </div>
      
      {/* Budget tracker - set/edit budget */}
      <BudgetTracker onSaveBudget={handleSaveBudget} currentBudget={currentBudget} />
      
      {/* Budget display - show budget vs spending */}
      <BudgetDisplay budget={currentBudget} totalSpent={totalSpent} />
      
      {/* Form to add new expenses */}
      <NewExpense onAddExpense={addExpenseHandler} categories={categories} />
      
      {/* Display list of expenses */}
      <DisplayExpenses expenses_list={expenses} />
    </div>
  );
};

export default App;
