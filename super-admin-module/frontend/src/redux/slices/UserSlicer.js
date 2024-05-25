import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { currentUser: null },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload; 
    },
    clearUser: (state) => {
      alert("clear user called");
      state.currentUser = null;
    },
    toggleTableRefresh: (state) => {
      state.refreshTable = !state.refreshTable;
    },
  },
});

// console.log(setUser);

export const { setUser, clearUser, toggleTableRefresh } = userSlice.actions;
export default userSlice.reducer;
