# 🎓 AI-Driven Learning Platform (Mini MVP)

A full-stack web application that enables users to learn topics through structured AI-generated lessons.

Users can select a category and sub-category, submit a prompt, receive a lesson-like response from OpenAI, and review their learning history. The system also includes an admin dashboard to view all users and their prompt activity.

---

## 🏗 Architecture Overview

### Backend
- Node.js  
- Express.js  
- TypeScript  
- PostgreSQL  
- Prisma ORM  
- OpenAI GPT-4o API  

Structured using layered architecture:

Routes → Controllers → Services → Database

### Frontend
- React  
- Vite  
- Axios  
- Responsive CSS  

---

## 🚀 Features

### User Flow
- Register / Login (phone-based)
- Select Category
- Select Sub-Category
- Submit Prompt
- Receive AI-generated lesson
- View learning history

### Admin Dashboard
- View all users
- View all prompts per user

---

## 📊 Database Schema

### Users
- id
- name
- phone (unique)

### Categories
- id
- name (unique)

### SubCategories
- id
- name
- categoryId  
- Unique constraint: (name, categoryId)

### Prompts
- id
- userId
- categoryId
- subCategoryId
- prompt
- response
- createdAt

Relationships:
- One User → Many Prompts  
- One Category → Many SubCategories  
- One Category → Many Prompts  
- One SubCategory → Many Prompts  

---

## 📌 Example Use Case

Example scenario:

1. A user registers with a name and phone number.
2. The user selects the category "Science".
3. The user selects the sub-category "Space".
4. The user submits the prompt: "Explain black holes".
5. The system sends the request to OpenAI.
6. The AI returns a structured lesson.
7. The lesson is stored in the database.
8. The user can revisit their learning history.
9. The admin dashboard can display the user and their prompt history.

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- OpenAI API key

---

### 1️⃣ Clone Repository

```bash
git clone https://github.com/AvigailCher/ai-learning-mvp.git
cd ai-learning-mvp
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
DATABASE_URL="postgresql://user:password@localhost:5432/ai_learning_mvp"
OPENAI_API_KEY="sk-..."
PORT=3000
```

Run migrations:

```bash
npx prisma migrate dev
```

Start server:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:3000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend (.env.example)

```
DATABASE_URL=""
OPENAI_API_KEY=""
PORT=3000
```

### Frontend (.env.example)

```
VITE_API_URL="http://localhost:3000/api"
```

---

## 📡 API Endpoints

### Users
- POST /api/users
- GET /api/users
- GET /api/users/by-phone

### Categories
- POST /api/categories
- GET /api/categories

### SubCategories
- POST /api/sub-categories
- GET /api/sub-categories?categoryId=

### Prompts
- POST /api/prompts
- GET /api/prompts/:userId

---

## 🎯 Project Scope

This project focuses on:
- Clean architecture
- REST API design
- Database relationships and constraints
- AI integration
- Modular and maintainable code structure

Advanced features such as authentication roles, Docker, and deployment are outside the MVP scope.

---

## 👩‍💻 Author

Avigail Cher  
GitHub: https://github.com/AvigailCher/ai-learning-mvp
