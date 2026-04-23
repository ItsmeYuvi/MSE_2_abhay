# Student Grievance Management System

A full-stack MERN application for students to submit and manage grievances.

## ⚙️ Tech Stack
- MongoDB, Express.js, React.js, Node.js
- JWT Authentication & bcrypt password hashing
- Axios & React Router DOM
- Tailwind CSS (v4) for styling

## 🚀 How to Run

### 1. Start the Backend Server
```bash
cd backend
npm install  # (If not already installed)
npm run start # or node server.js
```
*Note: Make sure MongoDB is running locally on port 27017, or change the `MONGO_URI` in `backend/.env` to your cloud URI.*
Backend will run on `http://localhost:5000`.

### 2. Start the Frontend
Open a new terminal window:
```bash
cd frontend
npm install  # (If not already installed)
npm run dev
```
Frontend will run on the provided Vite local server (usually `http://localhost:5173`).

## 🧠 Features
- Secure Registration and Login (JWT)
- Protected Dashboard for logged-in users only
- File new grievances (Academic, Hostel, Transport, Other)
- Edit and delete own grievances
- Search grievances by title
- Beautiful UI with Tailwind CSS
