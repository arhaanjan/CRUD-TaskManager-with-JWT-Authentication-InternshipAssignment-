# 📝 Task Manager App (CRUD + JWT Authentication)

A full-stack **Task Manager** application built for the Vexocore IT Services Internship Assignment.  
Supports **user authentication**, **task management**, and **persistent storage** with a deployed backend and frontend.  

---

## 🚀 Features

- 🔑 **User Authentication** (Register & Login with JWT)  
- 📋 **CRUD Operations** on tasks (Create, Read, Update, Delete)  
- ✅ **Toggle task status** (Pending ↔ Completed)  
- 🌍 **CORS enabled** for frontend–backend communication  
- 📦 **Database-backed** (Azure SQL Server)  
- 🖥️ **Deployed frontend & backend**  

---

## 🛠️ Tech Stack

### Backend
- **.NET 8 Web API**
- **Entity Framework Core** (Code First, Migrations)
- **SQL Server (Azure Cloud)**
- **JWT Authentication**
- **Deployed on Render**

### Frontend
- **React (Vite)**
- **Axios for API calls**
- **LocalStorage for JWT token persistence**
- **Deployed on Vercel**

---

### ⚙️ Key Files Overview

- **`Program.cs`** → Configures **CORS, EF Core, JWT, Swagger**, and runs DB migrations at startup.  
- **`AuthController.cs`** → Handles **user registration & login**, returns **JWT token**.  
- **`TasksController.cs`** → Provides **CRUD APIs** for tasks (Create, Read, Update, Delete, Toggle).  
- **`AppDbContext.cs`** → Defines **Users** and **Tasks** tables with relationships.  
- **`Migrations/`** → Contains EF Core migrations for database schema.  
- **`App.jsx`** → React UI for login/register and task management.  
- **`api.js`** → Axios instance with **baseURL** set to backend and **JWT interceptor**.  

### Deployed Links
- https://crud-task-manager-with-jwt-authenti.vercel.app/ (frontend)
- https://crud-taskmanager-with-jwt-authentication-tndo.onrender.com/swagger (for api testing)
