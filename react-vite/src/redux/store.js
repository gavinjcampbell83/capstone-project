import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./session";
import cruzReducer from "./cruzSlice"
import reviewReducer from "./reviewSlice"

const store = configureStore({
  reducer: {
    session: sessionReducer,
    cruz: cruzReducer, 
    review: reviewReducer,
  },
});

export default store;
