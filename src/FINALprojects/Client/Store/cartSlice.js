// Redux slice responsible for managing the shopping cart state
// Handles adding, removing and clearing items from the cart

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []  // Cart items: each item includes product data + quantity
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

     // =====================================================
    // ADD ITEM TO CART
    // =====================================================
    // If item already exists → increase quantity (up to stock limit)
    // If item does not exist → add as new item with quantity = 1
    addToCart(state, action) { 
      const search = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (search !== -1) {
        // Already In Cart
        const currentItem = state.items[search];
        
        // Check For Stock
        if (currentItem.quantity < action.payload.stock) {
          //Check For Update Item
          state.items = state.items.map((item) =>
            item.id !== action.payload.id
              ? item
              : { ...item, quantity: item.quantity + 1 }
          );
        } else {
          // Review for Out Of The Stock
          console.log("Out of stock!");
        }
        
      } else {
        // Check For Inventory
        if (action.payload.stock > 0) {
          state.items = [
            ...state.items,
            { ...action.payload, quantity: 1 }
          ];
        }
      }
    },

    // Removing 
    removeFromCart(state, action) {
      const id = action.payload;
      const obj = state.items.find(item => item.id === id);

      if (!obj) return;

      if (obj.quantity > 1) {
        state.items = state.items.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        state.items = state.items.filter(item => item.id !== id);
      }
    },

    // =====================================================
    // CLEAR CART
    // =====================================================
    // Resets cart to initial empty state
    clearCart(state) {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;