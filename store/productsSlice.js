import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
//Create product action

//action to redirect
const resetproduct = createAction("category/reset");
const resetproductEdit = createAction("product/reset");
const resetproductDelete = createAction("product/delete");

const hostname =
  typeof window !== "undefined" && window.location.hostname
    ? window.location.hostname
    : "";
const origin =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";

//Create
export const createProductAction = createAsyncThunk(
  "product/created",
  async (product, { rejectWithValue, getState, dispatch }) => {
    // console.log(product);
    //get user token
    const user = process.browser && getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const productData = { ...product };
      // console.log("from redx " + formData);
      const { data } = await axios.post(
        `${origin}/api/product`,
        productData,
        config
      );
      //dispatch action
      dispatch(resetproduct());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Update
export const updateproductAction = createAsyncThunk(
  "product/updated",
  async (product, { rejectWithValue, getState, dispatch }) => {
    console.log(product);
    //get user token
    const user = process.browser && getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.put(
        `${origin}/api/products/${product?.id}`,
        product,
        config
      );
      //dispatch
      dispatch(resetproductEdit());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Delete
export const deleteproductAction = createAsyncThunk(
  "product/delete",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser && getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.delete(
        `${origin}/api/products/${productId}`,
        config
      );
      //dispatch
      dispatch(resetproductDelete());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
// all products
export const fetchProductsAction = createAsyncThunk(
  "product/all",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      //http call
      const { data } = await axios.get(`${origin}/api/product`);
      //dispatch
      dispatch(resetproductDelete());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
// review
export const addReview = createAsyncThunk(
  "product/addReview",
  async (reviewData, { rejectWithValue, getState, dispatch }) => {
    const user = process.browser && getState()?.users;
    const { userAuth } = user;
    //get user token
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      const { data } = await axios.put(
        `${origin}/api/review`,
        reviewData,
        config
      );
      return data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);

//fetch all products
export const fetchFilteredProductsAction = createAsyncThunk(
  "product/list",
  async (productsData, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log(productsData);
      const perPage = { n: 9 };
      const allData = {
        keyword: productsData.keyword ? productsData.keyword : "",
        currentPage: productsData.currentPage ? productsData.currentPage : 1,
        priceLess: productsData.priceLess ? productsData.priceLess : 300,
        priceGreater: productsData.priceGreater ? productsData.priceGreater : 0,
        size: productsData.size ? productsData.size : "",
        ratings: productsData.ratings ? productsData.ratings : 0,
        category: productsData.category ? productsData.category.toLowerCase() : null,
      };
      const {
        keyword,
        currentPage,
        priceGreater,
        priceLess,
        ratings,
        category,
      } = allData;
      // ?&ratings[gte]=${ratings}
      let link = `api/product?page=${currentPage}`;
      if (keyword) {
        // link = `api/product?keyword=${keyword}`;
        link = link.concat(`&page=1&keyword=${keyword}`);
      }
      if (priceGreater !== 0) {
        // link = link.concat(
        //   `&price[gte]=${priceGreater}&price[lte]=`
        // );
        link = `api/product?page=1&price[gte]=${priceGreater}`;
      }
      if (priceLess !== 300) {
        link = `api/product?page=1&price[lte]=${priceLess}`;
        // link = link.concat(`&price[gte]=&price[lte]=${priceLess}`);
      }
      if (category) {
        link = link.concat(`&category=${category}&page=1`);
      }
      if (ratings) {
        link = `api/product?ratings[gte]=${ratings}&price[gte]=${priceGreater}&page=1`;
        // link = link.concat(`&ratings[gte]=${ratings}`);
      }
      const { data } = await axios.put(`${origin}/${link}`, perPage);

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
//fetch product details
export const fetchProductDetailsAction = createAsyncThunk(
  "product/detail",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log(id);
      const { data } = await axios.get(`${origin}/api/product/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Add Likes to product
export const toggleAddLikesToproduct = createAsyncThunk(
  "product/like",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser && getState()?.users;
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
  "product/dislike",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser && getState()?.users;
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
  initialState: {
    productsList: { allProducts: [] },
    categories: [],
    cart: {
      products: [],
      shippingAddress: {},
      cartQuantity: 0,
      total: 0,
      isLoading: false,
      message: "",
      showCart: false,
    },
    addedReview: false,
    isCreated: false,
    isUpdated: false,
    profileLoading: false,
    serverErr: null,
  },
  reducers: {
    reset: (state) => {
      state.appErr = null;
      state.serverErr = null;
      state.isCreated = false;
      state.addedReview = false;
    },
    showCartComponent: (state, action) => {
      state.cart.showCart = !state.cart.showCart;
    },
    addToCart(state, action) {
      const product = action.payload;
      const existingIndex = state.cart.products.findIndex(
        (item) => item._id === product._id
      );

      if (existingIndex >= 0) {
        state.cart.products[existingIndex] = {
          ...state.cart.products[existingIndex],
        };

        state.cart.products[existingIndex].activeSize = product.activeSize;
        state.cart.products[existingIndex].quantity = product.quantity;
      } else {
        // let tempProductItem = { ...product };
        console.log("pushhing the product");
        state.cart.products.push(action.payload);
        console.log("pushing ended");
      }
      localStorage.setItem("cart", JSON.stringify(state.cart.products));
      state.cart.total = state.cart.products.reduce(
        (a, c) => a + c.price * c.quantity,
        0
      );
      state.cart.cartQuantity = state.cart.products.reduce(
        (a, c) => a + c.quantity,
        0
      );
    },
    increaseCart(state, action) {
      const product = action.payload;
      const itemIndex = state.products.findIndex(
        (item) => item.product === product.product
      );
      console.log(product);

      if (product.quantity >= state.products[itemIndex].Stock) {
        state.products[itemIndex].quantity = state.products[itemIndex].Stock;
      } else {
        state.products[itemIndex].quantity += 1;
      }

      state.total = state.products.reduce(
        (a, c) => a + c.price * c.quantity,
        0
      );
      state.cartQuantity = state.products.reduce((a, c) => a + c.quantity, 0);
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    decreaseCart(state, action) {
      const product = action.payload;
      const itemIndex = state.products.findIndex(
        (item) => item.product === product.product
      );

      if (state.products[itemIndex].quantity > 1) {
        state.products[itemIndex].quantity -= 1;
      } else if (state.products[itemIndex].quantity === 1) {
        const nextCartItems = state.products.filter(
          (item) => item.product !== product.product
        );

        state.products = nextCartItems;
      }
      state.total = state.products.reduce(
        (a, c) => a + c.price * c.quantity,
        0
      );
      state.cartQuantity = state.products.reduce((a, c) => a + c.quantity, 0);

      localStorage.setItem("products", JSON.stringify(state.products));
    },
    removeFromCart(state, action) {
      const product = action.payload;
      state.cart.products.map((cartItem) => {
        if (cartItem._id === product) {
          const nextCartItems = state.cart.products.filter(
            (item) => item._id !== cartItem._id
          );

          state.cart.products = nextCartItems;
        }
        state.cart.total = state.cart.products.reduce(
          (a, c) => a + c.price * c.quantity,
          0
        );
        state.cart.cartQuantity = state.cart.products.reduce(
          (a, c) => a + c.quantity,
          0
        );

        localStorage.setItem("cart", JSON.stringify(state.cart.products));
        return state;
      });
    },
    allCategories: (state, action) => {
      state.categories = action?.payload;
      console.log(action.payload);
      const categories = state?.productsList?.map((p) => p?.category);

      const uniqueCategories = categories?.filter(function (item, pos) {
        return categories?.indexOf(item) == pos;
      });
      console.log(uniqueCategories);
    },
  },
  extraReducers: (builder) => {
    //create product
    builder.addCase(createProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetproduct, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.productCreated = action?.payload;
      state.loading = false;
      state.isCreated = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr =
        action?.payload?.message || action?.payload?.error?.message;
      state.serverErr = action?.error?.message;
    });

    //Update product
    builder.addCase(updateproductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetproductEdit, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updateproductAction.fulfilled, (state, action) => {
      state.productUpdated = action?.payload;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
      state.isUpdated = false;
    });
    builder.addCase(updateproductAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //Delete product
    builder.addCase(deleteproductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetproductDelete, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deleteproductAction.fulfilled, (state, action) => {
      state.productUpdated = action?.payload;
      state.isDeleted = false;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(deleteproductAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetch products
    builder.addCase(fetchProductsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.productsList.allProducts = action?.payload.products;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(fetchProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch products
    builder.addCase(fetchFilteredProductsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchFilteredProductsAction.fulfilled, (state, action) => {
      state.productsList = action?.payload;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(fetchFilteredProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetch product Details
    builder.addCase(fetchProductDetailsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductDetailsAction.fulfilled, (state, action) => {
      state.productDetails = action?.payload.product;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(fetchProductDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //Likes
    builder.addCase(toggleAddLikesToproduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(toggleAddLikesToproduct.fulfilled, (state, action) => {
      state.likes = action?.payload;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(toggleAddLikesToproduct.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //DisLikes
    builder.addCase(toggleAddDisLikesToproduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(toggleAddDisLikesToproduct.fulfilled, (state, action) => {
      state.dislikes = action?.payload;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(toggleAddDisLikesToproduct.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //review
    builder.addCase(addReview.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addReview.fulfilled, (state, action) => {
      state.loading = false;
      state.addedReview = action?.payload?.success;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(addReview.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export const {
  reset,
  addToCart,
  increaseCart,
  decreaseCart,
  showCartComponent,
  removeFromCart,
  allCategories,
} = productSlice.actions;

export default productSlice.reducer;