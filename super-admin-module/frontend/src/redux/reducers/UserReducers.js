// reducers/userReducer.js
import { createReducer } from "@reduxjs/toolkit";
import { setUser, clearUser, toggleTableRefresh } from "../slices/UserSlicer";

// Initial state for the user
const initialState = { name: "", id: null, refreshTable: false };

// Create a reducer using createReducer from Redux Toolkit
export const userReducer = createReducer(initialState, (builder) => {
  console.log("Initial User State:", initialState);
  builder
    .addCase(setUser, (state, action) => {
      state.name = action.payload.employee_name;
      state.id = action.payload.employee_ID;
      state.email = action.payload.email;
      state.employee_mobile = action.payload.employee_mobile;
      console.log("User State after setUser:", state);
      console.log("User action after setUser:", action.payload);
    })
    .addCase(clearUser, (state) => {
      state.name = null;
      state.id = null;
      state.email = null;
      state.employee_mobile = null;
    })
    .addCase(toggleTableRefresh, (state) => {
      state.refreshTable = !state.refreshTable;
    });
});
