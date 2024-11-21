import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./session";
import cruzReducer from "./cruzSlice"
const store = configureStore({
  reducer: {
    session: sessionReducer,
    cruz: cruzReducer, 
  },
});

export default store;
