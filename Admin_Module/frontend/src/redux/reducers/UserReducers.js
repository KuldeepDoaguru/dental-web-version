// reducers/userReducer.js
import { createReducer } from "@reduxjs/toolkit";
import { setUser, clearUser, toggleTableRefresh } from "../slices/UserSlicer";

// Initial state for the user
const initialState = { name: "", id: null, branch: null, refreshTable: false };

// Create a reducer using createReducer from Redux Toolkit
export const userReducer = createReducer(initialState, (builder) => {
  console.log("Initial User State:", initialState);
  builder
    .addCase(setUser, (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.branch = action.payload.branch;
      state.employee_name = action.payload.employee_name;
      state.employee_mobile = action.payloademployee_mobile;
      state.employee_designation = action.payload.employee_designation;
      console.log("User State after setUser:", state);
    })
    .addCase(clearUser, (state) => {
      state.name = "";
      state.id = null;
      state.branch = null;
      state.employee_name = null;
      state.employee_mobile = null;
      state.employee_designation = null;
    })
    .addCase(toggleTableRefresh, (state) => {
      state.refreshTable = !state.refreshTable;
    });
});
