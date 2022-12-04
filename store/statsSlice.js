// recive the data of stripe here

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

const compare = (a,b) =>
{
  if (a._id < b._id)
  {
    return 1;
  }
  if (a._id > b._id)
  {
    return -1;
  }
  return 0;
}

// month-users
export const usersStatsAction = createAsyncThunk(
  "stats/users",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try
    {
      const user = process.browser && getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      //http call
      const { data } = await axios.get(
        `${origin}/api/stats/month/users`,
        config
      );
        data?.users?.sort(compare)
      // dispatch action
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
// month-orders
export const monthOrdersStatsAction = createAsyncThunk(
  "stats/month-orders",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try
    {
      const user = process.browser && getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      //http call
      const { data } = await axios.get(
        `${origin}/api/stats/month/orders`,
        config
      );
        data?.users?.sort(compare)
      // dispatch action
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
// month-income
export const incomeStatsAction = createAsyncThunk(
  "stats/income",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try
    {
      const user = process.browser && getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      //http call
      const { data } = await axios.get(
        `${origin}/api/stats/month/income`,
        config
      );
        data?.users?.sort(compare)
      // dispatch action
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
// sales of week 
export const weekSalesAction = createAsyncThunk(
  "stats/weekSales",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try
    {
      const user = process.browser && getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      //http call
      const { data } = await axios.get(
        `${origin}/api/stats/week-sales`,
        config
      );
        data?.users?.sort(compare)

      const newData = data?.weekSales?.map((item) => {
        const DAYS = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];
        return {
          day: DAYS[item._id - 1],
          amount: item.total / 100,
        };
      });
      console.log("newData", newData);
      // dispatch action
      return newData;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
// orders
export const ordersStatsAction = createAsyncThunk(
  "stats/Orders",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try
    {
      const user = process.browser && getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      //http call
      const { data } = await axios.get(
        `${origin}/api/stats/orders?new=true`,
        config
      );
        data?.users?.sort(compare)
      // dispatch action
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
// orders
export const allTimeStatsAction = createAsyncThunk(
  "stats/all-time",
  async (numbers, { rejectWithValue, getState, dispatch }) => {
    try
    {
      const user = process.browser && getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      //http call
      const { data } = await axios.get(
        `${origin}/api/stats/all-time${numbers ? '?numbers=true' : '' }`,
        config
      );
      // dispatch action
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Update

//slice
const productSlice = createSlice({
  name: "order",
  initialState: {},
  reducers: {
    reset: (state) => {
      state.appErr = null;
      state.serverErr = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    //create product
    builder.addCase(usersStatsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(usersStatsAction.fulfilled, (state, action) => {
      state.users = action?.payload.users;
      state.loading = false;
      state.isCreated = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(usersStatsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr =
        action?.payload?.message || action?.payload?.error?.message;
      state.serverErr = action?.error?.message;
    });
    // orders
    builder.addCase(monthOrdersStatsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(monthOrdersStatsAction.fulfilled, (state, action) => {
      state.monthOrders = action?.payload.orders;
      state.loading = false;
      state.isCreated = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(monthOrdersStatsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr =
        action?.payload?.message || action?.payload?.error?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch products
    builder.addCase(incomeStatsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(incomeStatsAction.fulfilled, (state, action) =>
    {
      state.income = action?.payload.income;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(incomeStatsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // week sales 
    builder.addCase(weekSalesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(weekSalesAction.fulfilled, (state, action) =>
    {
      state.weekSales = action?.payload;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(weekSalesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // week sales 
    builder.addCase(ordersStatsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(ordersStatsAction.fulfilled, (state, action) =>
    {
      state.orders = action?.payload.orders;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(ordersStatsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // all time
    builder.addCase(allTimeStatsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(allTimeStatsAction.fulfilled, (state, action) =>
    {
      state.allTime = action?.payload.data;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(allTimeStatsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export const { reset } = productSlice.actions;

export default productSlice.reducer;