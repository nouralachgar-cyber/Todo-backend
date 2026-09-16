# Full-Stack Todo List Application

Build a complete full-stack Todo List application.

## Project goal

Create a modern, responsive Todo List web application where users can:

* Register an account
* Login securely
* Logout
* Create tasks
* Read their tasks
* Update tasks
* Mark tasks as completed
* Delete tasks
* Search tasks
* Filter tasks by status
* Only access their own tasks

The project must be clean, beginner-friendly, well organized, and suitable for a web development school project and portfolio.

---

# TECHNOLOGY STACK

## Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* React Router DOM
* Axios
* Lucide React icons

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* CORS
* dotenv

---

# PROJECT STRUCTURE

Create this structure:

todo-app/

client/
src/
components/
Navbar.jsx
TodoForm.jsx
TodoItem.jsx
TodoList.jsx

```
    pages/
        Login.jsx
        Register.jsx
        Dashboard.jsx

    services/
        api.js

    App.jsx
    main.jsx
    index.css
```

server/
controllers/
authController.js
todoController.js

```
middleware/
    authMiddleware.js

models/
    User.js
    Todo.js

routes/
    authRoutes.js
    todoRoutes.js

server.js
```

.env

---

# AUTHENTICATION

Implement complete authentication.

## Register

Endpoint:

POST /api/auth/register

Fields:

* name
* email
* password

Requirements:

* Validate required fields
* Validate email
* Password must have a reasonable minimum length
* Check if email already exists
* Hash password using bcryptjs
* Save user in MongoDB
* Never return the password
* Return a success response

---

# LOGIN

Endpoint:

POST /api/auth/login

Fields:

* email
* password

Requirements:

* Find user by email
* Compare password using bcryptjs
* If credentials are invalid, return a clear error
* Generate JWT token
* Return token and safe user information

---

# CURRENT USER

Endpoint:

GET /api/auth/me

Requirements:

* Require authentication
* Read JWT token
* Find current user
* Return user information without password

---

# JWT AUTHENTICATION

Create:

server/middleware/authMiddleware.js

The middleware must:

* Read Authorization header
* Expect:

Bearer TOKEN

* Verify JWT
* Get user ID
* Attach user ID to request
* Reject unauthorized requests

---

# USER MODEL

Create:

server/models/User.js

Fields:

* name
* email
* password
* createdAt

Email must be unique.

Password must never be returned in normal API responses.

---

# TODO MODEL

Create:

server/models/Todo.js

Fields:

* title
* completed
* user
* createdAt
* updatedAt

The user field must reference the User model.

Default completed value:

false

---

# TODO API

All Todo routes must be protected with authentication middleware.

## Get todos

GET /api/todos

Return only the authenticated user's tasks.

---

## Create todo

POST /api/todos

Body:

{
"title": "Learn React"
}

Requirements:

* title is required
* create task for authenticated user
* completed defaults to false

---

## Update todo

PUT /api/todos/:id

Allow updating:

* title
* completed

The user must only be able to update their own task.

---

## Delete todo

DELETE /api/todos/:id

The user must only be able to delete their own task.

---

# BACKEND RESPONSE FORMAT

Use clean JSON responses.

Success example:

{
"success": true,
"message": "Task created successfully",
"todo": {}
}

Error example:

{
"success": false,
"message": "Something went wrong"
}

Use appropriate HTTP status codes.

---

# FRONTEND ROUTES

Create these routes:

/login

/register

/dashboard

The dashboard must be protected.

If a user is not authenticated and tries to access /dashboard, redirect them to /login.

If an authenticated user visits /login or /register, redirect them to /dashboard.

---

# LOGIN PAGE

Create a modern and clean login page.

Fields:

* Email
* Password

Button:

Login

Also provide:

"Don't have an account? Create one"

Link to Register.

Show loading state while logging in.

Show clear error messages.

After successful login:

* Save authentication token
* Save user information if necessary
* Redirect to dashboard

---

# REGISTER PAGE

Create a modern registration page.

Fields:

* Name
* Email
* Password
* Confirm Password

Button:

Create Account

Validate:

* All fields required
* Valid email
* Password confirmation must match

After successful registration:

Redirect user to login page.

---

# DASHBOARD

Create the main Todo dashboard.

Include:

* Navbar
* User name
* Logout button
* Todo creation form
* Search
* Filters
* Todo list
* Empty state

Example layout:

Todo App

Hello, User 👋

[ Add a new task... ] [Add]

[ All ] [ Active ] [ Completed ]

[ Search tasks... ]

Task list

☐ Learn React
☑ Finish portfolio
☐ Learn Node.js

---

# TODO COMPONENT

Each todo should display:

* Checkbox
* Title
* Edit button
* Delete button

Completed tasks should have:

* checked checkbox
* line-through title
* visually different state

---

# ADD TODO

TodoForm.jsx

Create a form with:

* text input
* Add button

On submit:

POST /api/todos

After success:

* update UI
* clear input
* show the new task immediately

---

# EDIT TODO

Allow users to edit a task.

Use a simple and clean editing experience.

The user should be able to:

* click Edit
* modify title
* save
* cancel

Use:

PUT /api/todos/:id

---

# DELETE TODO

Allow deleting a task.

Use:

DELETE /api/todos/:id

After deleting:

* remove it immediately from UI

---

# COMPLETE TODO

When checkbox is clicked:

Update:

completed

Use:

PUT /api/todos/:id

Update the UI immediately after successful response.

---

# SEARCH

Add a search input.

Users can search tasks by title.

Search should work smoothly on the frontend.

---

# FILTERS

Add:

All

Active

Completed

All:
show every task.

Active:
show tasks where completed === false.

Completed:
show tasks where completed === true.

---

# LOADING STATES

Implement loading states for:

* Login
* Register
* Loading todos
* Creating todo
* Updating todo
* Deleting todo

Use simple spinner or disabled buttons.

---

# ERROR HANDLING

Show user-friendly errors.

Examples:

Invalid email or password.

Email already exists.

Task title is required.

Server error. Please try again.

Do not expose sensitive backend information.

---

# API SERVICE

Create:

client/src/services/api.js

Use Axios.

Configure a base URL:

http://localhost:5000/api

Automatically attach JWT token to authenticated requests.

Keep API communication centralized.

---

# DESIGN

Use Tailwind CSS.

Design requirements:

* Modern
* Clean
* Minimal
* Professional
* Responsive
* Mobile friendly
* Good spacing
* Rounded cards
* Clear buttons
* Good typography
* Accessible contrast

Do not make the design overly complicated.

Use Lucide React icons.

---

# NAVBAR

Navbar should include:

Todo App logo/name

Authenticated user name

Logout button

On mobile, keep the layout responsive.

---

# SECURITY

Do not store passwords as plain text.

Use bcryptjs.

Use JWT authentication.

Protect Todo routes.

Users must never be able to access another user's todos.

Never return password from API responses.

Use environment variables for:

MONGO_URI

JWT_SECRET

PORT

Do not hardcode secrets.

---

# ENVIRONMENT

Create:

server/.env

Example:

PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET

Create a .gitignore that includes:

node_modules
.env
dist

---

# SERVER

Create:

server/server.js

Requirements:

* Express
* JSON middleware
* CORS
* dotenv
* MongoDB connection
* auth routes
* todo routes
* error handling
* start server on PORT

Expected server URL:

http://localhost:5000

---

# PACKAGE SCRIPTS

Backend package.json should contain:

"scripts": {
"start": "node server.js",
"dev": "nodemon server.js"
}

Frontend should use:

npm run dev

---

# CODE QUALITY

Important:

* Use clean React components.
* Avoid duplicated code.
* Use meaningful variable names.
* Keep files organized.
* Add comments only where useful.
* Do not create unnecessary complexity.
* Make the project understandable for a student learning React and Node.js.

---

# FINAL RESULT

The final application must allow this complete flow:

1. User opens application.
2. User sees Login/Register.
3. User creates an account.
4. User logs in.
5. User receives JWT authentication.
6. User enters Dashboard.
7. User sees only their own todos.
8. User can create todos.
9. User can edit todos.
10. User can complete todos.
11. User can delete todos.
12. User can search todos.
13. User can filter todos.
14. User can logout.
15. After logout, dashboard becomes inaccessible.
16. Another user must see only their own todos.

---

# IMPORTANT INSTRUCTION FOR OPENCODE

Before writing code:

1. Inspect the existing project.
2. Do not delete useful existing files.
3. Install any missing dependencies.
4. Create the required folders and files.
5. Implement the backend first.
6. Implement the frontend.
7. Connect frontend to backend.
8. Verify all API endpoints.
9. Fix errors.
10. Make sure the application runs correctly.

Do not just give me code snippets.

Actually create and modify the project files.

At the end, explain:

* What files were created
* What dependencies were installed
* How to start the backend
* How to start the frontend
* How to configure MongoDB
* How authentication works
* How the Todo CRUD works

Do not use fake data as a replacement for the database.

The final project must be functional.
