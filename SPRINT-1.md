**PROJECT BOARD LINK**

https://github.com/users/brianna-pischke/projects/1/views/1

**WEEKLY STAND-UP MEETING MINUTES**

10/19/2025 1:00-1:45 (All members) — Set up GitHub and GitHub Projects, discussed and developed Milestone 1, and decided on MongoDB as database.

10/22/2025 8:00-8:25 (All members) - Discussed changes made to Milestone 1 from last meeting (confirmed it was ready to submit), broke down Milestone 2 into actionable todos (assigned each member a todo and created internal deadlines to stay on track), and then documented our plan in our project's board for this sprint.

10/29/25 8:00-8:30 (All members) - Discussed progress so far (backend set up and hooked up to database) work on the models currently in progress. Added admin permissions to all members. Work on connecting backend to frontend for next meeting.

11/05/25 8:00-8:15 (All members) - Discussed progress since previous meeting (api and connecting frontend to backend). Discussed how MongoDB is set up on Atlas, its connection string, and moving from private account to public. Considered authentication implementation. Planned to connect functionality and prepare hosting enviornment by next meeting.

11/12/2025 8:00-8:15 (All members) - Overwent api and connected frontend to backend in Railway. Went over implementation of authentication system and .env files. Overwent pending pull requests and committed them. Divided out work for Sprint.MD document and how it should look.

**PROGRESS SUMMARY**

User registration: User first creates an account to use the dashboard. The screenshot shows a new user, Billy, filling out the registration form. Once they submit their details, the backend will create them as a new user, hash their password for protection, and store their information in the MongoDB Users collection.

<img width="1439" height="710" alt="image" src="https://github.com/user-attachments/assets/11e5d747-603a-45de-a095-bc8b318641e7" />

User appears in MongoDB: Once registered, the new user appears in MongoDB with a unique ID, name, email, hashed password, and timestamps of when it was created. This confirms that registration works and the data is stored correctly.

<img width="1067" height="392" alt="image" src="https://github.com/user-attachments/assets/5aefc65e-25fa-45fb-8e8a-8c6f57fbb3cc" />

User login: The user logs in using their credentials. To be successfully logged in, the backend verifies the hashed password and returns a valid JWT. This allows the user to access their dashboard. 

<img width="1439" height="703" alt="image" src="https://github.com/user-attachments/assets/e8d6e438-db9d-4cc8-a69d-26a65a11bd25" />

Adding an expense: Once logged into the dashboard, the user is able to add an expense with the expense form. In the photo, the user is entering a new expense, Bubblegum, with an amount and chosen date. Once submitted, the form will send the data to the backend.
<img width="1433" height="709" alt="image" src="https://github.com/user-attachments/assets/c1112da1-bb84-4d4c-8199-a7aaadb00515" />

Expense saved in database: Once a user submits the form, the new expense is stored in the MongoDB. Each one is stored with an unique ID, userId, the title/amount/date, and timestamps. The photo shows that the new Bubblegum entry was added and that the system is working correctly. 
<img width="1067" height="392" alt="image" src="https://github.com/user-attachments/assets/9c402b68-6ff8-4ccf-b468-3d859d746357" />

Expense displays on dashboard: The dashboard loads all expenses that the user has logged within the selected year. In the photo, the new Bubblegum expense is displayed correctly. 

Data stays after refreshing: This photo shows the deployed version after refreshing the page. All expenses show immediately, and will remain stored when the page is reloaded or the user logs out. 
