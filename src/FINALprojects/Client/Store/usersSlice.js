// Redux slice responsible for storing users data
// Used mainly by admin pages (customers, statistics, etc.)
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [], // Array of users fetched from Firestore
 
};

const usersSlice = createSlice({
    name: "auth",
  initialState,
  reducers: {
    // =====================================================
    // SET USERS
    // =====================================================
    // Replaces the current users list with fetched data
    setUsers:(state, action)=>{
        state.items = action.payload
      
    }
  }
})

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;