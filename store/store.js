import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import usersReducer from "./usersSlice";
import productsReducer from "./productsSlice";
import commentsReducer from "./commentSlices";
import categoryReducer from "./categorySlice";
import reviewUsReducer from "./reviewUsSlice";
import orderReducer from "./orderSlice";
import statsReducer from "./statsSlice";
import notificationsReducer from "./notificationsSlice";

const combinedReducer = combineReducers({
  users: usersReducer,
  products: productsReducer,
  comments: commentsReducer,
  globalReviews: reviewUsReducer,
  category: categoryReducer,
  order: orderReducer,
  stats: statsReducer,
  notifications: notificationsReducer,   
});

export const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
  });

export const wrapper = createWrapper(makeStore);