//          Routing 
import { Routes, Route } from "react-router-dom";

// Auth
import Login from "./FINALprojects/Client/Auth/Login";
import Register from "./FINALprojects/Client/Auth/Register";

// Route protection
import ProtectedRoute from "./FINALprojects/Client/ProtectingRoutes/protectingRouth";

// User 
import User from "./FINALprojects/Client/User/User";
import User_products from "./FINALprojects/Client/User/User_products";
import UserAcount from "./FINALprojects/Client/User/UserAcount";
import UserCart from "./FINALprojects/Client/User/UserCart";
import OrderReview from "./FINALprojects/Client/User/WizzardOrder/OrderReview";
import OrderConfirm from "./FINALprojects/Client/User/WizzardOrder/OrderConfirm";
import OrderDone from "./FINALprojects/Client/User/WizzardOrder/OrderDone";
import UserPastOrders from "./FINALprojects/Client/User/UserPastOrders";

// Admin 
import Admin from "./FINALprojects/Client/Admin/Admin";
import Admin_categories from "./FINALprojects/Client/Admin/Admin_categories";
import Admin_customers from "./FINALprojects/Client/Admin/Admin_customers";
import Admin_products from "./FINALprojects/Client/Admin/Admin_products";
import Admin_statistics from "./FINALprojects/Client/Admin/Admin_statistics";


function AppRoutes() {
  return (
     <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/user"
          element={
            <ProtectedRoute adminOnly={false}>
              <User />
            </ProtectedRoute>
          }
        >
          <Route path="products" element={<User_products />} />
          <Route path="cart" element={<UserCart />}>
            <Route path="review" element={<OrderReview />} />
            <Route path="confirm" element={<OrderConfirm />} />
            <Route path="done" element={<OrderDone />} />
          </Route>
          <Route path="my-orders" element={<UserPastOrders />} />
          <Route path="acount" element={<UserAcount />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route path="categories" element={<Admin_categories />} />
          <Route path="customers" element={<Admin_customers />} />
          <Route path="products" element={<Admin_products />} />
          <Route path="statistics" element={<Admin_statistics />} />
        </Route>
      </Routes>
  )
}

export default AppRoutes
