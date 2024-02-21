import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/UserReducers";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
