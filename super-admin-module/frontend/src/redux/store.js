import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/UserReducers";
import { branchReducer } from "./reducers/BranchReducers";

export const store = configureStore({
  reducer: {
    user: userReducer,
    branch: branchReducer,
  },
});
