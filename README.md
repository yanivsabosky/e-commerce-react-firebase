# E-Commerce React Application

This project is a full e-commerce web application built with React and Firebase.  
I built it as part of a learning and final project process, with the goal of practicing real-world application structure, state management, authentication, and role-based access.

The application simulates a real online store experience, including users, admins, products, carts, and orders.

---

## Technologies Used

- React
- Vite
- Redux Toolkit
- Firebase Authentication
- Firebase Firestore
- Material UI (MUI)
- JavaScript (ES6+)
- Git & GitHub

---

## What This Project Includes

### Authentication
- User registration and login using Firebase Authentication
- Persistent login state
- Logout functionality

### User Roles
The app supports two types of users:

**Regular Users**
- Browse products
- Add and remove products from cart
- Create orders
- View personal order history

**Admin Users**
- View all users
- View all orders
- Manage products
- Access admin-only screens

Role handling is based on user data stored in Firestore and managed through Redux.

---

## State Management

Global state is managed using **Redux Toolkit**.  
The project includes separate slices for:

- Authentication
- Users
- Products
- Orders
- Cart

This structure helps keep the logic organized and scalable.

---

## Data & Backend

Firebase Firestore is used as the database for:
- Users
- Products
- Orders

Firebase Authentication handles login and registration, while Firestore stores application data.

Sensitive configuration is stored in environment variables and is not included in the repository.

---

## Environment Variables

The project uses a `.env` file for Firebase configuration (ignored by Git).

Example:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
