import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/UserReducers";
import { branchReducer } from "./reducers/BranchReducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedBranchReducer = persistReducer(persistConfig, branchReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    branch: persistedBranchReducer,
  },
});

export const persistor = persistStore(store);
