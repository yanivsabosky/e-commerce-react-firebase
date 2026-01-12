# 🛒 E-Commerce Full-Stack Application

This project started from a simple goal:  
**I didn’t want to build another frontend-only project.**  
I wanted to understand how a real **full-stack system works end to end** — how the frontend talks to the backend, how state is managed across the app, and how real production problems actually appear.

The result is a full e-commerce platform that simulates a real online store, including authentication, role-based access, orders, and admin flows.

---

## ✨ What This Project Is About

This application simulates a real-world online store experience with:
- Users and admins
- Product catalog
- Cart and order flow
- Backend validation and business logic
- Real concurrency problems (not theoretical ones)

The focus was not just “making it work”, but building something **structured, scalable, and production-minded**.

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
- User registration and login with Firebase Authentication
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
While testing order creation, I discovered a real concurrency issue:  
**two users could order the same product within milliseconds**, causing inconsistent stock data.

This issue doesn’t show up until you simulate real user behavior and parallel requests.

### The Solution
- Moved all critical business logic to the backend
- Implemented **server-side validation**
- Used **atomic Firestore operations** to ensure data consistency
- The frontend never decides if an order is valid — it only sends requests

```js
// ❌ Wrong approach (frontend decides)
if (product.stock > 0) {
  createOrder();
}

// ✅ Correct approach (backend decides)
POST /orders
→ server validates stock atomically
→ order succeeds or fails safely
