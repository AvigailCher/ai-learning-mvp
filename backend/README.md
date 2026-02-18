# 🔧 Backend - AI Learning MVP

A professional REST API built with Node.js, Express, TypeScript, and Prisma ORM.

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Architecture](#-architecture)
- [API Endpoints](#-api-endpoints)
- [Services](#-services)
- [Database](#-database)
- [Error Handling](#-error-handling)
- [Development](#-development)

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- PostgreSQL (local or remote)
- npm or yarn

### Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your values
# DATABASE_URL="postgresql://user:password@localhost:5432/ai_learning_mvp"
# OPENAI_API_KEY="sk-your-key-here"
# PORT=3000

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

**Server runs on:** http://localhost:3000

---

## 🏗️ Architecture

### MVC Pattern
```
HTTP Request
    ↓
Routes (express routing)
    ↓
Controllers (request handling + validation)
    ↓
Services (business logic)
    ↓
Prisma ORM (database queries)
    ↓
PostgreSQL (data storage)
    ↓
HTTP Response (formatted response)
```

### Folder Structure
```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   │   ├── user.controller.ts
│   │   ├── category.controller.ts
│   │   ├── subCategory.controller.ts
│   │   └── prompts.controller.ts
│   ├── services/         # Business logic
│   │   ├── user.service.ts
│   │   ├── category.service.ts
│   │   ├── subCategory.service.ts
│   │   ├── prompts.service.ts
│   │   └── ai.service.ts
│   ├── routes/           # Express routes
│   │   ├── index.ts
│   │   ├── user.routes.ts
│   │   ├── category.routes.ts
│   │   ├── subCategory.routes.ts
│   │   └── prompts.routes.ts
│   ├── utils/            # Utility functions
│   │   └── errorHandler.ts
│   ├── lib/              # Configuration
│   │   └── prisma.ts
│   ├── app.ts            # Express app setup
│   └── server.ts         # Server entry point
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database versions
├── package.json
├── tsconfig.json
└── README.md
```

### Design Patterns Used

#### 1. Singleton Pattern
```typescript
// lib/prisma.ts
export default new PrismaClient()

// All services share ONE database connection
// Prevents connection leaks and saves resources
```

#### 2. Service Layer Pattern
```typescript
// services/user.service.ts
export const createUser = async (data) => {
  // Business logic only
  // No HTTP concerns
}

// controllers/user.controller.ts
export const registerUserController = async (req, res) => {
  try {
    const user = await createUser(req.body)
    res.json(user)
  } catch (error) {
    errorHandler(error)
  }
}
```

#### 3. Centralized Error Handling
```typescript
// utils/errorHandler.ts
export const errorHandler = (error, statusCode, message) => {
  // All errors have same format
  // Easy to modify globally
}
```

---

## 📡 API Endpoints

### User Endpoints

#### Register/Login User
```http
POST /api/users
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "phone": "1234567890"
}

Response (201):
{
  "id": 1,
  "name": "John Doe",
  "phone": "1234567890"
}

Error (409):
{
  "message": "Phone number already registered"
}
```

#### List All Users
```http
GET /api/users

Response (200):
[
  {
    "id": 1,
    "name": "John Doe",
    "phone": "1234567890",
    "prompts": [...]
  }
]
```

#### Get User by Phone
```http
GET /api/users/by-phone?phone=1234567890

Response (200):
{
  "id": 1,
  "name": "John Doe",
  "phone": "1234567890",
  "prompts": [...]
}

Error (404):
{
  "message": "User not found"
}
```

### Category Endpoints

#### Create Category
```http
POST /api/categories
Content-Type: application/json

Body:
{
  "name": "Science"
}

Response (201):
{
  "id": 1,
  "name": "Science"
}

Error (409):
{
  "message": "Category already exists"
}
```

#### Get All Categories
```http
GET /api/categories

Response (200):
[
  {
    "id": 1,
    "name": "Science",
    "subCategories": [
      { "id": 1, "name": "Physics" },
      { "id": 2, "name": "Biology" }
    ]
  }
]
```

### SubCategory Endpoints

#### Create SubCategory
```http
POST /api/sub-categories
Content-Type: application/json

Body:
{
  "name": "Quantum Physics",
  "categoryId": 1
}

Response (201):
{
  "id": 1,
  "name": "Quantum Physics",
  "categoryId": 1
}

Error (409):
{
  "message": "SubCategory already exists in this Category"
}
```

#### Get SubCategories by Category
```http
GET /api/sub-categories?categoryId=1

Response (200):
[
  {
    "id": 1,
    "name": "Physics",
    "categoryId": 1
  },
  {
    "id": 2,
    "name": "Chemistry",
    "categoryId": 1
  }
]
```

### Prompt Endpoints

#### Create Prompt (with AI Response)
```http
POST /api/prompts
Content-Type: application/json

Body:
{
  "userId": 1,
  "categoryId": 1,
  "subCategoryId": 1,
  "prompt": "Explain black holes"
}

Response (201):
{
  "id": 5,
  "userId": 1,
  "categoryId": 1,
  "subCategoryId": 1,
  "prompt": "Explain black holes",
  "response": "Black holes are regions of spacetime...",
  "createdAt": "2025-01-15T10:30:00Z"
}

Error (404):
{
  "message": "User not found"
}
```

#### Get User's Prompt History
```http
GET /api/prompts/1

Response (200):
[
  {
    "id": 5,
    "userId": 1,
    "categoryId": 1,
    "subCategoryId": 1,
    "prompt": "Explain black holes",
    "response": "Black holes are regions...",
    "createdAt": "2025-01-15T10:30:00Z"
  }
]
```

### Health Check
```http
GET /api/health

Response (200):
{
  "status": "ok"
}
```

---

## 🛠️ Services

### User Service
**File:** `src/services/user.service.ts`

```typescript
// Create new user or get existing
createUser(name: string, phone: string): Promise<User>

// Get all users with their prompts
getAllUsers(): Promise<User[]>

// Get user by phone number
getUserByPhone(phone: string): Promise<User | null>
```

**Features:**
- Phone number uniqueness validation
- Error handling for duplicate phones
- Retrieves complete user with prompts

### Category Service
**File:** `src/services/category.service.ts`

```typescript
// Create new category
createCategory(name: string): Promise<Category>

// Get all categories with subcategories
getAllCategories(): Promise<Category[]>
```

**Features:**
- Category name uniqueness validation
- Includes subcategories in response
- Error handling for duplicates

### SubCategory Service
**File:** `src/services/subCategory.service.ts`

```typescript
// Create new subcategory
createSubCategory(name: string, categoryId: number): Promise<SubCategory>

// Get subcategories for a category
getSubCategoriesByCategory(categoryId: number): Promise<SubCategory[]>
```

**Features:**
- Unique constraint on (name, categoryId) pair
- Prevents duplicate names within same category
- Verifies category exists

### Prompt Service
**File:** `src/services/prompts.service.ts`

```typescript
// Create new prompt and get AI response
createPrompt(userId: number, categoryId: number, subCategoryId: number, prompt: string): Promise<Prompt>

// Get user's prompt history
getUserPrompts(userId: number): Promise<Prompt[]>
```

**Features:**
- Validates user exists
- Validates category/subcategory exist
- Calls AI service for response
- Saves prompt and response to database

### AI Service
**File:** `src/services/ai.service.ts`

```typescript
// Generate lesson from prompt using OpenAI
generateLesson(prompt: string): Promise<string>
```

**Features:**
- Uses OpenAI GPT-4o model
- Professional prompt engineering
- Error handling for API failures
- Returns formatted lesson text

---

## 💾 Database

### Prisma ORM

**Why Prisma?**
- Type-safe database queries
- Auto-generated TypeScript types
- Built-in migrations
- Readable query syntax

### Schema Overview

```prisma
model User {
  id       Int    @id @default(autoincrement())
  name     String
  phone    String @unique
  prompts  Prompt[]
  createdAt DateTime @default(now())
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique
  subCategories SubCategory[]
  prompts Prompt[]
  createdAt DateTime @default(now())
}

model SubCategory {
  id    Int    @id @default(autoincrement())
  name  String
  categoryId Int
  category Category @relation(fields: [categoryId], references: [id])
  prompts Prompt[]
  createdAt DateTime @default(now())
  
  @@unique([name, categoryId])
}

model Prompt {
  id    Int    @id @default(autoincrement())
  userId Int
  user  User @relation(fields: [userId], references: [id])
  categoryId Int
  category Category @relation(fields: [categoryId], references: [id])
  subCategoryId Int
  subCategory SubCategory @relation(fields: [subCategoryId], references: [id])
  prompt String
  response String
  createdAt DateTime @default(now())
}
```

### Unique Constraints

| Field | Type | Why |
|-------|------|-----|
| User.phone | Unique | Prevent duplicate accounts |
| Category.name | Unique | Prevent duplicate categories |
| SubCategory (name, categoryId) | Composite Unique | Can't repeat subcategory name in same category |

### Running Migrations

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# See migration status
npx prisma migrate status

# Reset database (development only!)
npx prisma migrate reset
```

---

## 🚨 Error Handling

### Error Handler Utility
**File:** `src/utils/errorHandler.ts`

```typescript
export const errorHandler = (error: Error, statusCode: number, message: string) => {
  // Handles all errors with consistent format
  // Returns: { message, details? }
}
```

### Common Error Scenarios

| Scenario | Status | Message |
|----------|--------|---------|
| Phone already exists | 409 | Phone number already registered |
| Category already exists | 409 | Category already exists |
| User not found | 404 | User not found |
| Missing required field | 400 | Missing required field: [fieldName] |
| Server error | 500 | Internal server error |

### Example Error Response

```json
{
  "message": "Phone number already registered",
  "details": "User with phone 1234567890 already exists"
}
```

---

## 🔧 Development

### Available Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

### Environment Variables

```bash
# Database connection
DATABASE_URL="postgresql://user:password@localhost:5432/ai_learning_mvp"

# OpenAI API Key
OPENAI_API_KEY="sk-..."

# Server port
PORT=3000

# Environment
NODE_ENV=development
```

### Adding a New Endpoint

1. **Create service** in `src/services/newfeature.service.ts`
2. **Create controller** in `src/controllers/newfeature.controller.ts`
3. **Create routes** in `src/routes/newfeature.routes.ts`
4. **Import routes** in `src/routes/index.ts`

### Testing Endpoints

**Using Postman:**
1. Import backend API
2. Set environment variables
3. Run requests in collection

**Using curl:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","phone":"1234567890"}'
```

---

## 📚 Code Style

### TypeScript
- Proper type definitions on all functions
- No `any` types
- Interfaces for request/response bodies

### Naming Conventions
- camelCase for variables and functions
- PascalCase for classes and types
- UPPER_CASE for constants

### Comments
- English language only
- Explain WHY, not WHAT
- No obvious comments

---

## 🚀 Deployment Checklist

- [ ] All environment variables set
- [ ] Database migrated in production
- [ ] CORS properly configured
- [ ] Error logging enabled
- [ ] Rate limiting configured
- [ ] SSL/TLS enabled
- [ ] Regular database backups scheduled

---

## 📞 Troubleshooting

### "Cannot connect to database"
- Check DATABASE_URL format
- Ensure PostgreSQL is running
- Verify network access

### "OPENAI_API_KEY not found"
- Add key to .env file
- Check format starts with "sk-"
- Restart server after adding

### "Port 3000 already in use"
- Kill process: `lsof -ti:3000 | xargs kill -9`
- Or change PORT in .env

### Prisma type errors
- Regenerate types: `npx prisma generate`
- Ensure schema.prisma is valid
- Run migrations: `npx prisma migrate dev`

---

## 📄 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [OpenAI API Reference](https://platform.openai.com/docs/)

---

**Backend is production-ready and fully documented.** ✨
