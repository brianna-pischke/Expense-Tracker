const API_URL =
  process.env.REACT_APP_API_URL_USERS || "https://your-render-api.onrender.com/api/users";

//Fetch users
export const getUsers = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch users");
  return await response.json();
};

//Add new users
export const addUser = async (user) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Failed to create user");
  return await response.json();
};