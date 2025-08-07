import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Assuming you have an endpoint to get product details by ID
const getProductDetails = async (productId) => {
  const { data } = await axios.get(`/api/v1/product/${productId}`);
  return data.product;
};


// Fetch cart items and populate them with product details
export const getCart = createAsyncThunk('cart/getCart', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('/api/v1/cart', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log(data);

    let cartItems = await data.cartItems;

    return { items: cartItems };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch cart items');
  }
});

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async ({ itemId }, { rejectWithValue, dispatch }) => {
    try {
      // Make API call to delete the item from the database
      await axios.delete(`/api/v1/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Dispatch the getCart action to refresh the cart
      await dispatch(getCart());

      // Return itemId to identify the item to remove from the Redux state
      return { itemId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete cart item'
      );
    }
  }
);
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete('/api/v1/cart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initially, items will be empty and populated from the database
    loading: false,
    shippingInfo: {},
    savedAddresses: [], // Empty array; will be populated later
    estimatedDeliveryDate:null
  },
  reducers: {
    addCartItemRequest(state) {
      state.loading = true;
    },
    addCartItemSuccess(state, action) {
      const item = action.payload;
      const isItemExist = state.items.find(i => i.product === item.product);

      if (isItemExist) {
        state.loading = false;
      } else {
        state.items.push(item);
        state.loading = false;
      }
    },
    increaseCartItemQty(state, action) {
      state.items = state.items.map(item => {
        if (item.product._id === action.payload.productId && item.size === action.payload.size) {
          item.quantity += 1;
        }
        return item;
      });
    },

    decreaseCartItemQty(state, action) {
      state.items = state.items.map(item => {
        if (item.product._id === action.payload.productId && item.size === action.payload.size) {
          item.quantity -= 1;
        }
        return item;
      });
    },

    updateCartItemQty(state, action) {
      state.items = state.items.map(item => {
        if (item.product === action.payload.product) {
          item.quantity = action.payload.quantity;
        }
        return item;
      });
    },
    updateCart(state, action) {
      state.items = action.payload;
    },
    removeItemFromCart(state, action) {
      const { productId, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.product._id === productId && item.size === size)
      );

      // Dispatch an action to remove the item from the server
      return async (thunkDispatch) => {
        await thunkDispatch(deleteCartItem({ productId, size }));
      };
    },

    saveShippingInfo(state, action) {
      state.shippingInfo = action.payload;
    },
    addSavedAddress(state, action) {
      state.savedAddresses.push(action.payload);
    },
    saveEstimatedDeliveryDate(state, action) {
        state.estimatedDeliveryDate = action.payload; // Save the estimated date
    },
    editSavedAddress(state, action) {
      state.savedAddresses = state.savedAddresses.map(address =>
        address.id === action.payload.id ? action.payload : address
      );
    },
    removeSavedAddress(state, action) {
      state.savedAddresses = state.savedAddresses.filter(address => address.id !== action.payload);
    },
    orderCompleted(state) {
      state.items = [];
      state.shippingInfo = {};
    },
    fetchCartRequest: (state) => {
      state.loading = true;
    },
    fetchCartSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    fetchCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCartState: (state) => {
      state.items = [];
      state.shippingInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.items = action.payload.items;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder
      // Handle deleting cart item
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the item from the Redux state
        state.items = state.items.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.shippingInfo = {};
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

const { actions, reducer } = cartSlice;


export const {
  addCartItemRequest,
  addCartItemSuccess,
  decreaseCartItemQty,
  increaseCartItemQty,
  updateCartItemQty,
  updateCart,
  removeItemFromCart,
  saveShippingInfo,
  addSavedAddress,
  editSavedAddress,
  removeSavedAddress,
  orderCompleted,
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFail,
  clearCartState,
  saveEstimatedDeliveryDate

} = actions;

export default reducer;