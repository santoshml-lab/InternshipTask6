🚀 TaskFlow — SaaS Task Manager

TaskFlow is a modern, responsive SaaS-style task management web application built as a production capstone project.

It provides simulated authentication, task CRUD operations, search and filtering, dashboard statistics, and persistent client-side state using localStorage.

## 🌐 Live Demo

https://internship-task6-red.vercel.app/

## 📦 GitHub Repository

This project is available as a public GitHub repository for final capstone evaluation.

## 📌 Project Overview

TaskFlow helps users organize and manage their daily tasks through a clean SaaS dashboard.

The application demonstrates practical frontend development skills including authentication simulation, dynamic DOM manipulation, CRUD operations, client-side state management, responsive design, and cloud deployment.

## ✨ Features

- 🔐 Simulated Login & Logout
- ➕ Create new tasks
- ✏️ Edit existing tasks
- 🗑️ Delete tasks
- ✅ Mark tasks as completed
- 🔎 Real-time task search
- 🎯 Filter by task status
- ⭐ Filter by task priority
- 📊 Live dashboard statistics
- 💾 localStorage persistence
- 📱 Responsive mobile, tablet and desktop design
- 🎨 Modern SaaS dashboard interface
- ⚡ Dynamic DOM updates without page reload
- ☁️ Live deployment using Vercel

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript ES6+
- DOM Manipulation
- Browser localStorage
- Responsive CSS
- Vercel

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │      TaskFlow UI     │
                    │      index.html      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      app.js           │
                    │                      │
                    │ Authentication       │
                    │ CRUD Operations      │
                    │ Search & Filters     │
                    │ DOM Rendering        │
                    │ Dashboard Statistics │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     localStorage     │
                    │                      │
                    │ User Session         │
                    │ Task Data            │
                    └──────────────────────┘

                               │
                               ▼

                    ┌──────────────────────┐
                    │       Vercel         │
                    │   Live Deployment    │
                    └──────────────────────┘
🔄 Application Workflow
Login
  ↓
Dashboard
  ↓
Create Task
  ↓
View Task
  ↓
Edit / Complete / Delete
  ↓
Search & Filter
  ↓
Save State in localStorage
  ↓
Refresh
  ↓
Task Data Persists
🔐 Authentication
TaskFlow implements a simulated authentication system.
Users can enter a valid email address and password to access the dashboard.
The logged-in user's information is stored in localStorage so the session remains available after page refresh.
Note: This is a frontend authentication simulation and is not intended to replace production server-side authentication.
📝 Task CRUD Operations
Create
Users can create tasks with:
Task title
Description
Status
Priority
Due date
Read
All saved tasks are dynamically rendered on the dashboard.
Update
Users can edit existing task information and change task status or priority.
Delete
Users can delete tasks after confirmation.
Complete
Tasks can be marked as completed using the checkbox.
🔎 Search & Filtering
The application provides dynamic filtering without page reload.
Users can:
Search tasks by title
Search tasks by description
Filter by Pending
Filter by In Progress
Filter by Completed
Filter by High Priority
Filter by Medium Priority
Filter by Low Priority
📊 Dashboard
The dashboard dynamically displays:
Metric
Description
Total Tasks
Total number of saved tasks
Pending
Tasks waiting to be started
In Progress
Active tasks
Completed
Finished tasks
Statistics automatically update whenever task data changes.
💾 Persistent State
TaskFlow uses browser localStorage for client-side persistence.
Stored data includes:
User session
Task records
This allows task information to remain available after refreshing the browser.
📂 Project Structure
TaskFlow/
│
├── index.html
├── style.css
├── app.js
└── README.md
🧠 JavaScript Architecture
index.html
Responsible for:
Application structure
Login interface
Dashboard
Task form
Search and filter controls
Task container
Modal structure
style.css
Responsible for:
SaaS dashboard design
Responsive layout
CSS variables
Cards and buttons
Modal styling
Mobile/tablet/desktop responsiveness
app.js
Responsible for:
Authentication simulation
Application state
Task CRUD operations
Search
Filtering
Dynamic DOM rendering
Dashboard statistics
localStorage persistence
🧪 Testing Results
Functionality
Status
Login Simulation
✅ Passed
Create Task
✅ Passed
Edit Task
✅ Passed
Complete Task
✅ Passed
Delete Task
✅ Passed
Search
✅ Passed
Status Filtering
✅ Passed
Priority Filtering
✅ Passed
Dashboard Statistics
✅ Passed
localStorage Persistence
✅ Passed
Responsive UI
✅ Passed
Vercel Deployment
✅ Passed
🚀 Deployment
The application is deployed using Vercel.
Live Application
https://internship-task6-red.vercel.app/⁠�
The application is publicly accessible for mentor evaluation.
⚙️ Local Setup
Clone the repository:
git clone YOUR_GITHUB_REPOSITORY_URL
Open the project folder:
cd TaskFlow
Then open index.html in a modern web browser.
No backend server or database is required for the current frontend implementation.
🎯 Learning Outcomes
This capstone project provided practical experience with:
Frontend application architecture
JavaScript ES6+
DOM manipulation
CRUD operations
Authentication simulation
Client-side state management
localStorage
Search and filtering
Responsive web design
SaaS dashboard development
Cloud deployment
GitHub project management
🔮 Future Improvements
Future versions could include:
Real backend authentication
Supabase/PostgreSQL database
JWT authentication
User-specific task storage
Team collaboration
Task sharing
Notifications
Calendar integration
Drag-and-drop task management
Analytics and productivity charts
🏁 Capstone Status
Production Capstone Project — Completed ✅
Built with HTML5, CSS3 and JavaScript ES6+ and deployed publicly using Vercel.
👨‍💻 Project
TaskFlow — SaaS Task Manager
Status: Completed ✅
Deployment: Vercel 🚀
