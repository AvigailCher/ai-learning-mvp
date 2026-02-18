# 🎨 Frontend - AI Learning MVP

A modern React application for interactive AI-powered learning with Vite, Axios, and responsive CSS.

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Architecture](#-architecture)
- [Components](#-components)
- [API Integration](#-api-integration)
- [Styling](#-styling)
- [State Management](#-state-management)
- [Development](#-development)

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- npm or yarn
- Backend running on http://localhost:3000

### Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env if needed
# VITE_API_URL=http://localhost:3000/api

# Start development server
npm run dev
```

**App runs on:** http://localhost:5173

---

## 🏗️ Architecture

### React Component Structure
```
App.jsx (Main Router & State)
├── Register (Page 1)
├── Dashboard (Page 2)
├── PromptForm (Page 3)
└── PromptHistory (Page 4)

api.js (API Communication Layer)
```

### State Management

**App.jsx manages:**
```javascript
// User state
const [user, setUser] = useState({
  id: null,
  name: '',
  phone: ''
})

// Selected category state
const [selectedCategory, setSelectedCategory] = useState({
  categoryId: null,
  categoryName: '',
  subCategoryId: null,
  subCategoryName: ''
})

// Current page
const [currentPage, setCurrentPage] = useState('register')
```

### Page Flow

```
1. User loads app
   ↓
2. Shows Register page (login/registration)
   ↓
3. User enters name + phone
   ↓
4a. If NEW user → Create account → Go to Dashboard
4b. If EXISTING user → Login silently → Go to History
   ↓
5a. NEW users: Select category and subcategory in Dashboard
5b. EXISTING users: See their history immediately
   ↓
6. User submits prompt in PromptForm
   ↓
7. AI generates response
   ↓
8. View prompt in PromptHistory
```

---

## 🎨 Components

### 1. Register Component
**File:** `src/components/Register.jsx`

**Purpose:** Combined login/registration with smart user detection

**Features:**
- Name input (required)
- Phone input (required)
- Submit button with loading state
- Error messages
- Smart detection: existing user = login, new user = register

---

### 2. Dashboard Component
**File:** `src/components/Dashboard.jsx`

**Purpose:** Category and subcategory selection interface

**Features:**
- Displays all categories as cards
- Click category → load subcategories
- Click subcategory → select and navigate
- Loading states during API calls
- Error handling

---

### 3. PromptForm Component
**File:** `src/components/PromptForm.jsx`

**Purpose:** AI prompt submission and response display

**Features:**
- Display selected category + subcategory
- Textarea for prompt input
- Submit button
- Loading spinner while AI responds
- Display formatted AI response
- Navigation buttons

---

### 4. PromptHistory Component
**File:** `src/components/PromptHistory.jsx`

**Purpose:** Display user's learning history

**Features:**
- Load user's prompts on mount
- Display all past prompts
- Show: prompt, response, category, subcategory, date
- "Ask Another Question" button
- Reverse chronological order (newest first)

---

### 5. App Component (Main Router)
**File:** `src/App.jsx`

**Purpose:** Main router managing pages and global state

**Smart User Routing:**
- New users → Dashboard (pick category)
- Existing users → History (see past learning)

---

## 🔗 API Integration

### API Module
**File:** `src/api.js`

**Available Functions:**

1. `registerUser(name, phone)` - POST /api/users
2. `getUserByPhone(phone)` - GET /api/users/by-phone
3. `getCategories()` - GET /api/categories
4. `getSubCategories(categoryId)` - GET /api/sub-categories
5. `createPrompt(data)` - POST /api/prompts
6. `getUserPrompts(userId)` - GET /api/prompts/:userId

**Configuration:**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
```

---

## 🎨 Styling

### Design Philosophy
- Modern, clean UI
- Purple gradient theme
- Card-based layout
- Responsive design (mobile, tablet, desktop)
- Smooth transitions

### CSS Files
- `index.css` - Global styles
- `App.css` - Main layout
- `components/Register.css` - Form styling
- `components/Dashboard.css` - Category cards
- `components/PromptForm.css` - Form and response
- `components/PromptHistory.css` - History list

### Responsive Design
- 3 columns on desktop
- 2 columns on tablet
- 1 column on mobile

---

## 🔧 Development

### Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

```bash
# Backend API URL
VITE_API_URL=http://localhost:3000/api
```

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🐛 Troubleshooting

### "Cannot reach backend"
- Ensure backend is running on :3000
- Check VITE_API_URL in .env
- Check browser console for network errors

### "Axios not installed"
```bash
npm install axios
```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Axios Documentation](https://axios-http.com/)

---

**Frontend is modern, responsive, and production-ready.** ✨
