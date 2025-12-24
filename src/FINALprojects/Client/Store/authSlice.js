// Redux slice responsible for authentication state
// Stores the currently logged-in user's information and permissions
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  fullname: "",
  email: "",
  isAdmin: null,
  allowOthersToSeeMyOrders: null,
  isLoggedIn: false
};

// Slice that controls authentication-related state
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // REGISTER SUCCESS
    RegisterSuccess: (state, action) => {
      state.uid = action.payload.uid;
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state.allowOthersToSeeMyOrders = action.payload.allowOthersToSeeMyOrders;
      state.isLoggedIn = true;
    },
    // Login SUCCESS
    LoginSuccess: (state, action) => {
      state.uid = action.payload.uid;
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state.allowOthersToSeeMyOrders = action.payload.allowOthersToSeeMyOrders;
      state.isLoggedIn = true;
    },
    Logout: (state) => {
      return initialState; // Default Behavior For User To Logged Out 
    },
    
  }
});

export const { RegisterSuccess, LoginSuccess, Logout } = authSlice.actions;
export default authSlice.reducer;
