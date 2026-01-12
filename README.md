# 🛒 E-Commerce Full-Stack Application

This project started from a simple goal:  
**I didn't want to build another frontend-only project.**  
I wanted to understand how a real **full-stack system works end to end** — how the frontend talks to the backend, how state is managed, and how real production problems appear when multiple users interact with the system at the same time.

The result is a full e-commerce platform that simulates a real online store, including authentication, role-based access, orders, and admin flows.

---

## ✨ What This Project Is About

This application simulates a real-world online store experience with:
- Users and admins
- Product catalog
- Cart and order flow
- Backend validation and business logic
- Real concurrency problems (not theoretical ones)

The focus was not just "making it work", but building something **structured, scalable, and production-minded**.

---

## 🏗️ Tech Stack

### Frontend
- React
- Vite
- Redux Toolkit
- Material UI (MUI)
- Firebase Authentication

### Backend
- Node.js
- Express

### Database
- Firebase Firestore

### Testing
- Jest (Redux logic)
- Supertest (API endpoints)

### Deployment
- Frontend: Vercel  
- Backend API: Railway  
- Database: Firestore

---

## 🔑 Core Features

### Authentication
- User registration and login using Firebase Authentication
- Persistent login sessions
- Logout flow

### User Roles
The system supports two roles:

**Regular Users**
- Browse products
- Add/remove products from cart
- Create orders
- View personal order history

**Admin Users**
- View all users
- View all orders
- Manage products
- Access admin-only screens

Role handling is based on user data stored in Firestore and enforced by backend logic.

---

## 🧠 State Management & Architecture

- Global state is managed using **Redux Toolkit**
- Separate slices for:
  - Authentication
  - Users
  - Products
  - Orders
  - Cart
- Clear separation between:
  - UI components
  - State management
  - API / backend logic

This structure keeps the application maintainable as it grows.

---

## 🔴 Handling Race Conditions (Key Challenge)

### The Problem
While testing the order flow, I discovered a real concurrency issue:  
**two users could order the same product within milliseconds**, causing inconsistent stock data.

This issue does not appear until you simulate real user behavior and parallel requests.

### The Solution
- Moved all critical business logic to the backend
- Implemented **server-side validation**
- Used **atomic Firestore operations** to ensure data consistency
- The frontend never decides if an order is valid — it only sends requests

```js
// ❌ Wrong approach (frontend decides)
if (product.stock > 0) {
  createOrder(); // Race condition!
}

// ✅ Correct approach (backend validates atomically)
POST /orders
→ server validates stock inside a transaction
→ decrements stock atomically
→ order succeeds or fails safely
```

**Why this matters:** Between checking stock and creating the order, another user might have already bought the last item. Server-side validation prevents this completely.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account

### 1. Clone the Repository

```bash
git clone https://github.com/yanivsabosky/e-commerce-react-firebase
cd e-commerce-react-firebase
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 3. Set Up Environment Variables

Create `.env` files in both directories:

**Backend** (`backend/.env`)
```
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
```

**Frontend** (`frontend/.env`)
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_BACKEND_URL=http://localhost:5000
```

### 4. Run the Project

**Terminal 1 – Backend API:**
```bash
cd backend
npm run dev
```

**Terminal 2 – Frontend:**
```bash
cd frontend
npm run dev
```

**Access the app:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## 📁 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/          # UI components
│   │   ├── pages/               # Page components
│   │   ├── redux/
│   │   │   ├── slices/          # Redux slices (auth, users, products, orders, cart)
│   │   │   └── store.js
│   │   ├── api/                 # API client functions
│   │   └── App.jsx
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── routes/                  # API endpoints
│   ├── controllers/             # Business logic
│   ├── middleware/              # Authentication, validation
│   ├── services/                # Firebase operations
│   ├── .env
│   └── server.js
```

---

## 🧪 Testing

### Frontend Tests (Redux logic)
```bash
cd frontend
npm run test
```

### Backend API Tests
```bash
cd backend
npm run test:api
```

Tests include:
- **Frontend**: Redux actions, reducers, and state updates
- **Backend**: API endpoints, order validation, and authentication flows

---



---

## 🎯 Key Learnings

- **Backend validation is non-negotiable** in multi-user systems
- **Race conditions are real, not theoretical** — they show up when you stress-test
- **State management architecture matters** — poor structure breaks when the app grows
- **Testing matters** — especially for order flows and concurrent operations
- **Atomic operations are essential** for data consistency in distributed systems

---

## 💡 What I'd Do Differently Today

- Add Redis caching for product searches (saw it become a bottleneck at 100+ concurrent users)
- Load testing with k6 from the start
- More granular error handling on the backend
- Database indexing strategy planned upfront
- Implement pagination for large datasets early

---

## 📝 Future Improvements

- [ ] Redis caching layer
- [ ] Load testing suite (k6)
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Advanced search and filtering
- [ ] Analytics dashboard for admins

---



---

## 👨‍💻 About This Project

This is a junior full-stack developer's attempt to understand how real systems work — not just how to make things work.

I'm interested in writing clear, maintainable code and learning how production systems behave under real usage.
