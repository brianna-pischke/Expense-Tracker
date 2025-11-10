const API_URL =
  process.env.REACT_APP_API_URL || "https://your-render-api.onrender.com/api/expenses";

//Get all expenses
export const getExpenses = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch expenses");
  return await response.json();
};

//Add new expense
export const addExpense = async (expense) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  if (!response.ok) throw new Error("Failed to add expense");
  return await response.json();
};

//Delete expense
export const deleteExpense = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete expense");
};
