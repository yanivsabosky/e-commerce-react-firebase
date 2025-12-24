// Redux slice for managing products data
// Includes product list, loading/error state and aggregated sold totals

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],  
  loading: false,
  error: null,
  soldTotals: {} // Aggregated quantities sold per product
}

const prodSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // SET PRODUCTS
    setProducts: (state, action) => {
      // Convert Firestore Timestamps to ISO strings before storing
      const sanitizedProducts = action.payload.map(product => ({
        ...product,
        createdAt: product.createdAt 
          ? convertTimestampToString(product.createdAt)
          : null
      }));
      
      state.items = sanitizedProducts;
      state.loading = false;
      state.error = null;
    },

    // Sets loading flag (used during async operations)
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

     // Sets error state and disables loading
    setError: (state, action) => {
      state.error = action.payload;  
      state.loading = false;
    },

    // =====================================================
    // CALCULATE SOLD TOTALS (WITH PRIVACY CHECK)
    // =====================================================
    // Aggregates product quantities from orders
    // Only includes users that allow sharing order statistics
    setSoldTotals(state, action) {
      const orders = action.payload.orders;
      const users = action.payload.users;

      const totals = {};

      orders.forEach(order => {
        const buyer = users.find(u => u.uid === order.userId);

        // User doesn't allow others to see their orders
        if (!buyer || !buyer.allowOthersToSeeMyOrders) return;

        // Has permission → sum quantities
        if (order.items && Array.isArray(order.items)) {
          order.items.forEach(item => {
            if (!totals[item.id]) totals[item.id] = 0;
            totals[item.id] += item.quantity;
          });
        }
      });

      state.soldTotals = totals;
    }
  }
});

// Helper function to convert Firestore Timestamp
function convertTimestampToString(timestamp) {
  // If it's a Firestore Timestamp object with toDate method
  if (timestamp && typeof timestamp.toDate === 'function') {
    try {
      return timestamp.toDate().toISOString();
    } catch (e) {
      console.error("Error converting timestamp:", e);
      return null;
    }
  }

  // If it's an object with seconds property
  if (timestamp && typeof timestamp.seconds === 'number') {
    try {
      return new Date(timestamp.seconds * 1000).toISOString();
    } catch (e) {
      console.error("Error converting timestamp:", e);
      return null;
    }
  }

  // If it's already a string or Date
  if (typeof timestamp === 'string' || timestamp instanceof Date) {
    try {
      return new Date(timestamp).toISOString();
    } catch (e) {
      console.error("Error converting timestamp:", e);
      return null;
    }
  }

  return null;
}

export const { setProducts, setLoading, setError, setSoldTotals } = prodSlice.actions;
export default prodSlice.reducer;

