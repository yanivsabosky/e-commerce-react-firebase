// Redux slice for managing orders data
// Stores all orders fetched from the backend / Firestore
import { createSlice } from "@reduxjs/toolkit";

const  initialState = {
    items: [],
    loading: false
  }

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
     // Sets the full orders list
    setOrders(state, action) {
      state.items = action.payload;
    }
  }
});


export const { setOrders } = ordersSlice.actions;
export default ordersSlice.reducer
