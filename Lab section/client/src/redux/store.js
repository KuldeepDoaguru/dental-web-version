// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userReducer from './user/userSlice';
// import {persistReducer} from 'redux-persist';
// import storage from "redux-persist/lib/storage";
// import persistStore from "redux-persist/es/persistStore";

// const rootReducer = combineReducers({
//     user: userReducer,
//   });

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware : (getDefaultMiddleware) => getDefaultMiddleware({
//         serializableCheck: false,
//     })
// }) 

// export const persistor = persistStore(store);


import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userSlice from './user/userSlice';


const persistConfig = {
    key: 'root',
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, userSlice);
  
  const store = configureStore({
    reducer: {
      auth: persistedReducer,
    },
  });
  
  let persistor = persistStore(store);
  
  export { store, persistor };
  