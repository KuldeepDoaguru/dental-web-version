// reducers/userReducer.js
import { createReducer } from "@reduxjs/toolkit";
import { setUser, clearUser } from "../slices/UserSlicer";

// Initial state for the user
const initialState = { name: "", id: null };

// Create a reducer using createReducer from Redux Toolkit
export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
    })
    .addCase(clearUser, (state) => {
      state.name = "";
      state.id = null;
    });
});
