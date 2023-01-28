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
  "reviewUs/created",
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

//Update

//fetch all products
export const fetchGlobalReviewsAction = createAsyncThunk(
  "reviewUs/list",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try
    {
      const { data } = await axios.get(`${origin}/api/review/us`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
//fetch product details
export const fetchProductDetailsAction = createAsyncThunk(
  "reviewUs/detail",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try
    {
      console.log(id)
      const { data } = await axios.get(`${origin}/api/reviewUs/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Add Likes to product
export const toggleAddLikesToproduct = createAsyncThunk(
  "reviewUs/like",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser &&  getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    console.log(config);
    try {
      const { data } = await axios.put(
        `/api/products/likes`,
        { productId },
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Add DisLikes to product
export const toggleAddDisLikesToproduct = createAsyncThunk(
  "reviewUs/dislike",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser &&  getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `/api/products/dislikes`,
        { productId },
        config
      );

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
      state.isCreated = false;
      state.addedReview = false;
    },
  },
  extraReducers: (builder) => {
    //create product
    builder.addCase(createGlobalReviewAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createGlobalReviewAction.fulfilled, (state, action) => {
      state.globalReviewCreated = action?.payload;
      state.loading = false;
      state.isCreated = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(createGlobalReviewAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr =
        action?.payload?.message || action?.payload?.error?.message;
      state.serverErr = action?.error?.message;
    });    
    //fetch products
    builder.addCase(fetchGlobalReviewsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchGlobalReviewsAction.fulfilled, (state, action) => {
      state.reviewsList = action?.payload.reviews;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(fetchGlobalReviewsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export const {
  reset,
} = productSlice.actions;

export default productSlice.reducer;