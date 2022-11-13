import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
// import users from "./usersSlice";
import usersReducer from "./usersSlice";
import productsReducer from "./productsSlice";
import commentsReducer from "./commentSlices";
import categoryReducer from "./categorySlice";
import reviewUsReducer from "./reviewUsSlice";

const combinedReducer = combineReducers({
  users: usersReducer,
  products: productsReducer,
  comments: commentsReducer,
  globalReviews: reviewUsReducer,
  category: categoryReducer,
});

export const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
  });

export const wrapper = createWrapper(makeStore);
