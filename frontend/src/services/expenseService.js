const API_URL =
  process.env.REACT_APP_API_URL || "https://expensetrackertestrailway-production.up.railway.app";

//Get all expenses
export const getExpenses = async (token) => {
  const response = await fetch(`${API_URL}/api/expenses`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error("Failed to fetch expenses");
  return await response.json();
};

//Add new expense
export const addExpense = async (expense, token) => {
  const response = await fetch(`${API_URL}/api/expenses`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(expense),
  });
  if (!response.ok) throw new Error("Failed to add expense");
  return await response.json();
};

//Delete expense
export const deleteExpense = async (id, token) => {
  const response = await fetch(`${API_URL}/api/expenses/${id}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error("Failed to delete expense");
};
