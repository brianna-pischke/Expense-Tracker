# Expense Tracker

![Screenshot 2023-05-17 at 7 14 42 PM](https://github.com/ReeveFernandes/Expense-Tracker/assets/92554845/552e0672-02b5-4464-87ba-7ec7755757b9)


Welcome to Expense Tracker, a web application built with React.js that helps you keep track of your expenses. This expense tracker provides a simple and intuitive interface for managing your financial transactions and monitoring your spending habits.

## Features

- **Expense Categories:** Categorize your expenses for better organization and analysis.
- **Add and Delete Expenses:** Easily add new expenses.
- **Transaction History:** View a list of all your transactions along with the date.
- **Filter and Search:** Filter expenses by category and search for specific transactions.
- **Expense Summary:** Get a quick overview of your total income and expenses.
- **Responsive Design:** Enjoy a seamless experience across different devices and screen sizes.

## Live Demo

##View live application (https://expense-tracker-production-3a74.up.railway.app/)

## Getting Started

To run the application locally and explore its codebase, follow these steps:

1. Clone the repository:

```bash
   git clone https://github.com/brianna-pischke/Expense-Tracker.git
```

2. **Navigate to the backend directory:**
```bash
   cd backend
```

3. **Install backend dependencies:**
```bash
   npm install
```

4. **Create a `.env` file in the backend directory:**
```bash
   touch .env
```

5. **Add environment variables to `.env`:**
```
   MONGO_URI=mongodb+srv://expense_team_user:CVhrk5ScCPau0N8A@cluster0.j3qbnwx.mongodb.net/?appName=Cluster0
   JWT_SECRET=BzRnKU9NHle8aIcYv7jtr1QLxEhoO6yXbCu2dWMADPsFG35JTmwk0ZpfgVqSi4
   PORT=5000
```

6. **Start the backend server:**
```bash
   npm start
```
   
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Open a new terminal and navigate to the frontend directory:**
```bash
   cd frontend
```

2. **Install frontend dependencies:**
```bash
   npm install
```

3. **Create a `.env` file in the frontend directory (optional):**
```bash
   touch .env
```

4. **Add environment variable (optional - defaults to localhost):**
```
   REACT_APP_API_URL=http://localhost:5000
```

5. **Start the development server:**
```bash
   npm start
```

6. **Open your browser and visit:**
```
   http://localhost:3000

## Acknowledgements

- The Expense Tracker project is based on the React - The Complete Guide (incl Hooks, React Router, Redux) course by Academind by Maximilian Schwarzmüller on Udemy.

Enjoy tracking your expenses with Expense Tracker!
