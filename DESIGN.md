## TEAM MEMBERS
-Juan Boyer
-Camden Ness
-Chace Nuttall
-BriAnna Pischke

## FORKED REPOSITORY LINK
https://github.com/brianna-pischke/Expense-Tracker

## PROJECT BOARD LINK
https://github.com/users/brianna-pischke/projects/1/views/1

## DATABASE SCHEMA DIAGRAM
<img width="2048" height="1198" alt="ExpenseTrackerDbSchema" src="https://github.com/user-attachments/assets/e6c9440f-8616-4211-b5ba-883c5de4d3e6" />

## USER MODEL
{
id: ObjectId,
name: String,
email: String,
password: String,
}

## EXPENSE MODEL
{
 id: ObjectId,
 userId: ObjectId,
 amount: Number,
 categoryId: ObjectId,
 title: String,
 date: Date,
 }

 ## CATEGORIES
 {
 id: ObjectId,
 name: String,
 }

 ## RELATIONSHPS
 One User → many Expenses
 One User → many Categories
 Each Expense → belongs to one User
 Each Category -> belongs to one User

 ## REST API SPECS
 REGISTER: METHOD (POST) / END POINT REQUEST (username, email, password) / END POINT RESPONSE (success: "true/false") / ENDPOINT (/register)
 
 LOGIN IN: METHOD (POST) / END POINT REQUEST (email or username, password) / END POINT RESPONSE (success: "true/false", token) / ENDPOINT (/login)
 
 ADD EXPENSE: METHOD (POST) / END POINT REQUEST (title, amount, date) / END POINT RESPONSE (success: "true/false", title, amount, date) / ENDPOINT (/add-expense)

 FILTER BY YEAR: METHOD (GET) / END POINT REQUEST (year) / END POINT RESPONSE ([{title, amount, date}]) / ENDPOINT (/expenses?year={year})

