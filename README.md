# 📝 Todo Application (FastAPI + Next.js)

This is a simple yet functional **Todo application** with a **FastAPI (Python)** backend and a **Next.js** frontend.  
The app allows to manage tasks by creating, editing, deleting, as well as searching, sorting, and filtering them.

The project follows a separated frontend/backend architecture and can be used both for learning purposes and as a starter template.

---

## 🔧 Technologies

### Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL
- Uvicorn

### Frontend
- Next.js
- React
- TypeScript

---

## ✨ Features

### Task Management
- Create new tasks
- Edit existing tasks
- Delete tasks
- View the task list
- Search tasks by title
- Sort tasks (e.g. by creation date or status)
- Filter tasks (e.g. completed / not completed)

---

## ⚙️ Environment Variables

### Backend

| Variable        | Description                           | Example Value |
|-----------------|---------------------------------------|---------------|
| DATABASE_URL    | Database connection string             | postgresql+asyncpg://user:password@localhost:5432/todo_db |
| CORS_ORIGINS    | Allowed CORS origins (comma-separated)| http://localhost:3000 |

---

### Frontend

| Variable               | Description                    | Example Value |
|------------------------|--------------------------------|---------------|
| NEXT_PUBLIC_API_URL    | Base URL of the backend API    | http://localhost:8000 |

---


## 🚀 Running the Project Locally

### 1. Start the Backend

Navigate to the backend directory   
`cd backend`

Create a virtual environment   
`python -m venv venv`

Activate the virtual environment  

Windows:  
`venv\Scripts\activate`

macOS / Linux:  
`source venv/bin/activate`

Install dependencies   
`pip install -r requirements.txt`

Create a `.env` file   

Run the backend server  
`uvicorn app.main:app --reload`

Backend will be available at:  
http://localhost:8000

---

### 2. Start the Frontend

Navigate to the frontend directory  
`cd frontend`

Install dependencies   
`npm install` 

Create a `.env` variables file  

Start the development server    
`npm run dev`

Frontend will be available at:  
http://localhost:3000
