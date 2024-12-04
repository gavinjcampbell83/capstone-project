import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./session";
import cruzReducer from "./cruzSlice"
import reviewReducer from "./reviewSlice"
import favoritesReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    session: sessionReducer,
    cruz: cruzReducer, 
    review: reviewReducer,
    favorites: favoritesReducer,
  },
});

export default store;
