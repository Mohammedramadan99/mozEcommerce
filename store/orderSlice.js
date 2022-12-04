// recive the data of stripe here 

import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import getStripe from "../utils/getStripe";

const hostname =
  typeof window !== "undefined" && window.location.hostname
    ? window.location.hostname
    : "";
const origin =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";

// Create stripe 
export const stripeAction = createAsyncThunk(
  "order/stripe",
  async (orderData, { rejectWithValue, getState, dispatch }) => {
    
    try {
      //http call
    const user = process.browser && getState()?.users;
    const { userAuth } = user;
    // router.push('/payment')
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      };
      localStorage.setItem("orderProducts", JSON.stringify(orderData.products));
    
      const userId = userAuth._id;
      const { data } = await axios.post(`${origin}/api/stripe/`, {
        orderData,
        userId,
      },config);
      // const stripe = await getStripe();
      // stripe?.redirectToCheckout({ sessionId: data?.id });
      //dispatch action
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);


// create new order
export const createOrderAction = createAsyncThunk(
  "order/create",
  async (orderData, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${origin}/api/order`,
        orderData,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
//fetch products
export const fetchOrdersAction = createAsyncThunk(
  "order/all",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log(id);
      const { data } = await axios.get(`${origin}/api/order`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
//fetch order details
export const fetchOrderAction = createAsyncThunk(
  "order/detail",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log(id);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(`${origin}/api/order/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
//update an order 
export const updateOrderAction = createAsyncThunk(
  "order/update",
  async (orderValues, { rejectWithValue, getState, dispatch }) => {
    try
    {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const order = process.browser && getState()?.order;
      const { ordersList } = order;
      const currOrder = ordersList?.filter((o) => o._id === orderValues.id);
      console.log("currOrder", currOrder);
      const newOrder = { ...currOrder[0], delivery_status: orderValues.status};
      console.log("newOrder", newOrder);
      const { data } = await axios.put(
        `${origin}/api/order/${orderValues.id}`,
        newOrder,
        config
      );
      // insert the updated order into the orders list 
      const newOrdersList = ordersList.map(o =>
      {
        o._id === data._id ? data : o;
      })
      console.log("data", data);
      console.log("newOrdersList", newOrdersList);
      return newOrdersList;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const productSlice = createSlice({
  name: "order",
  initialState: {},
  reducers: {
    reset: (state) => {
      state.appErr = null;
      state.serverErr = null;
      state.isCreated = false;
      state.isUpdated = false;
      state.addedReview = false;
    },
  },
  extraReducers: (builder) => {
    //create product
    builder.addCase(stripeAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(stripeAction.fulfilled, (state, action) => {
      state.session = action?.payload.session;
      state.loading = false;
      state.isCreated = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(stripeAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr =
        action?.payload?.message || action?.payload?.error?.message;
      state.serverErr = action?.error?.message;
    });
    builder.addCase(createOrderAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createOrderAction.fulfilled, (state, action) => {
      state.order = action?.payload;
      state.loading = false;
      state.isCreated = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(createOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr =
        action?.payload?.message || action?.payload?.error?.message;
      state.serverErr = action?.error?.message;
    });
    // fetch orders
    builder.addCase(fetchOrdersAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchOrdersAction.fulfilled, (state, action) => {
      state.ordersList = action?.payload.orders;
      state.loading = false;
      state.isCreated = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(fetchOrdersAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr =
        action?.payload?.message || action?.payload?.error?.message;
      state.serverErr = action?.error?.message;
    });
    // fetch order details
    builder.addCase(fetchOrderAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchOrderAction.fulfilled, (state, action) => {
      state.orderDetails = action?.payload.order;
      state.loading = false;
      state.isCreated = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(fetchOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr =
        action?.payload?.message || action?.payload?.error?.message;
      state.serverErr = action?.error?.message;
    });
    // update order 
    builder.addCase(updateOrderAction.pending, (state, action) => {
      state.updateLoading = true;
    });
    builder.addCase(updateOrderAction.fulfilled, (state, action) => {
      // state.ordersList = action?.payload?.updatedOrders
      state.updateLoading = false;
      state.isUpdated = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(updateOrderAction.rejected, (state, action) => {
      state.updateLoading = false;
      state.appErr =
        action?.payload?.message || action?.payload?.error?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch products
  },
});

export const { reset } = productSlice.actions;

export default productSlice.reducer;
