const API_URL =
  process.env.REACT_APP_API_URL || "https://expensetrackertestrailway-production.up.railway.app";

//Fetch user's budget
export const getBudget = async (token) => {
  const response = await fetch(`${API_URL}/api/budgets`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error("Failed to fetch budget");
  return await response.json();
};

//Save user's budget
export const saveBudget = async (budget, token) => {
  const response = await fetch(`${API_URL}/api/budgets`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(budget),
  });
  if (!response.ok) throw new Error("Failed to save budget");
  return await response.json();
};
