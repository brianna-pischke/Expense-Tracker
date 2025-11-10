const API_URL =
  process.env.REACT_APP_API_URL_CATEGORIES || "https://your-render-api.onrender.com/api/categories";

//Fetch categories
export const getCategories = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return await response.json();
};

//Add categories
export const addCategory = async (category) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  if (!response.ok) throw new Error("Failed to add category");
  return await response.json();
};