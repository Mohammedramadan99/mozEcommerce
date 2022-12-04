import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";


const hostname =
  typeof window !== "undefined" && window.location.hostname
    ? window.location.hostname
    : "";
const origin =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";

//Create
export const createGlobalReviewAction = createAsyncThunk(
  "notifications/create",
  async (revData, { rejectWithValue, getState, dispatch }) => {
    // console.log(product);
    //get user token
    const user = process.browser &&  getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      // console.log("from redx " + formData);
      const { data } = await axios.post(
        `${origin}/api/review/us`,
        revData,
        config
      );
      //dispatch action
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all products
export const fetchNotificationsAction = createAsyncThunk(
  "notifications/all",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try
    {
      const { data } = await axios.get(`${origin}/api/notifications`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// delete a notification
export const deleteNotificationAction = createAsyncThunk(
  "notifications/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try
    {
      const { data } = await axios.delete(`${origin}/api/notifications/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const productSlice = createSlice({
  name: "product",
  initialState: {},
  reducers: {
    reset: (state) => {
      state.appErr = null;
      state.serverErr = null; 
      state.isDeleted = true
    },
  },
  extraReducers: (builder) => {
    //create product
    builder.addCase(fetchNotificationsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchNotificationsAction.fulfilled, (state, action) => {
      state.allNotifications = action?.payload?.notifications;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(fetchNotificationsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr =
        action?.payload?.message || action?.payload?.error?.message;
      state.serverErr = action?.error?.message;
    });    
    //delete notification
    builder.addCase(deleteNotificationAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteNotificationAction.fulfilled, (state, action) => {
      state.isDeleted = action?.payload?.deleted;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(deleteNotificationAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr =
        action?.payload?.message || action?.payload?.error?.message;
      state.serverErr = action?.error?.message;
    });    
  },
});

export const {
  reset,
} = productSlice.actions;

export default productSlice.reducer;