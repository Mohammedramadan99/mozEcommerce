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
//action to redirect
const resetCategoryAction = createAction("category/reset");
//create
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (category, { rejectWithValue, getState, dispatch }) => {
    //get user token
      const categoryData = { ...category };
    const user = process.browser && getState()?.users;
    const { userAuth } = user;
    const config = {
    headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${origin}/api/category`,
        categoryData,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//delete
export const deleteCategoryAction = createAsyncThunk(
  "category/delete",
  async (commentId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser && getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.delete(
        `${origin}/api/category/${commentId}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// update
export const updateCategoryAction = createAsyncThunk(
  "category/update",
  async (category, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser && getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${origin}/api/category/${category.id}`,category.data,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch categories
export const fetchCategoriesAction = createAsyncThunk(
  "category/all",
  async (_, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser && getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${origin}/api/category`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch comment details
export const fetchCategoryDetailsAction = createAsyncThunk(
  "category/fetch-details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser && getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${origin}/api/category/${id}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const categorySlices = createSlice({
  name: "category",
  initialState: {
    loading: false,
    categories: [],
    categoryCreated: "",
    appErr: "",
    serverErr: "",
  },
  reducers: {
    reset: (state) => {
      state.appErr = null;
      state.serverErr = null;
      state.isCreated = false;
      state.isDeleted = false;
      state.isUpdated = false;
      state.addedReview = false;
      state.categoryCreated = "";
    },
  },
  extraReducers: (builder) => {
    //create
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryCreated = action?.payload?.created;
      state.isCreated = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.categoryCreated = null;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //delete
    builder.addCase(deleteCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentDeleted = action?.payload.deleted;
      state.isDeleted = true
      state.categories = action?.payload?.categories;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.commentCreated = null;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    builder.addCase(resetCategoryAction, (state, action) => {
      state.isUpdate = true;
    });

    // all categories
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action?.payload;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.categoryDetails = null;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch category Details
    builder.addCase(fetchCategoryDetailsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryDetails = action?.payload;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(fetchCategoryDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.categoryDetails = null;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch category Details
    builder.addCase(updateCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.categoryDetails = null;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});
export const {reset} = categorySlices.actions
export default categorySlices.reducer;
