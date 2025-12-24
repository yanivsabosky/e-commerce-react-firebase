// Central Redux store configuration
// Combines all application slices

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import productsSlice from './productsSlice'
import usersSlice from './usersSlice'
import ordersSlice  from './ordersSlice '


export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productsSlice,
    users : usersSlice,
    orders :ordersSlice
  }
});
