const API_URL =
  process.env.REACT_APP_API_URL || "https://expensetrackertestrailway-production.up.railway.app";

//Fetch categories
export const getCategories = async (token) => {
  const response = await fetch(`${API_URL}/api/categories`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error("Failed to fetch categories");
  return await response.json();
};

//Add categories
export const addCategory = async (category, token) => {
  const response = await fetch(`${API_URL}/api/categories`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(category),
  });
  if (!response.ok) throw new Error("Failed to add category");
  return await response.json();
};
