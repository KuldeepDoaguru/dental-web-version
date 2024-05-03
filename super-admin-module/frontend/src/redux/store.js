import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { userReducer } from "./reducers/UserReducers";
import { branchReducer } from "./reducers/BranchReducers";

// Define the root reducer
const rootReducer = combineReducers({
  user: userReducer,
  branch: branchReducer,
});

// Configuration for Redux Persist
const persistConfig = {
  key: "root",
  storage,
  // Optionally, you can blacklist or whitelist specific reducers
  // blacklist: ['user'], // reducers listed here won't be persisted
  // whitelist: ['branch'], // only listed reducers will be persisted
};

// Wrap the root reducer with Redux Persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
});

// Create the Redux persistor
export const persistor = persistStore(store);
