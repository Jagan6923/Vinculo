import axios from 'axios';
import { fetchCartRequest, fetchCartSuccess, fetchCartFail } from '../slices/cartSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
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
    orderCompleted
} from '../slices/cartSlice';

// export const fetchCart = () => async (dispatch) => {
//     try {
//       dispatch(fetchCartRequest());
//       const { data } = await axios.get('/api/v1/cart');
//       dispatch(fetchCartSuccess(data.cartItems));
//     } catch (error) {
//       dispatch(fetchCartFail(error.response?.data?.message || 'An error occurred'));
//     }
//   };

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
    console.log("Test fetch cart");

    try {
        const response = await axios.get('/api/v1/cart', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        return rejectWithValue(error.response.data.message || 'Server Error');
    }
});


// Add an item to the cart
export const addCartItem = (id, quantity, size) => async (dispatch, getState) => {
    try {
        dispatch(addCartItemRequest());

        // Send request to add cart item to the database
        const { data } = await axios.post(`/api/v1/cart`, { product: id, quantity, size });

        dispatch(addCartItemSuccess(data.cart));

    } catch (error) {
        console.error(error);
        console.error(error);

    }
};

// Decrease the quantity of an item in the cart
export const decreaseCartItem = (id) => async (dispatch, getState) => {
    try {
        dispatch(decreaseCartItemQty(id));

        // Send request to decrease cart item quantity in the database
        await axios.put(`/api/v1/cart/decrease`, { product: id });

    } catch (error) {
        console.error(error);
    }
};

// Increase the quantity of an item in the cart
export const increaseCartItem = (id) => async (dispatch, getState) => {
    try {
        dispatch(increaseCartItemQty(id));

        // Send request to increase cart item quantity in the database
        await axios.put(`/api/v1/cart/increase`, { product: id });

    } catch (error) {
        console.error(error);
    }
};

// Remove an item from the cart
export const removeItemFromCartAction = (productId, size) => async (dispatch, getState) => {
    try {
        dispatch(removeItemFromCart({ productId, size }));

        // Properly send request to remove the cart item from the database
        await axios.delete('/api/v1/cart', {
            data: { productId, size },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

    } catch (error) {
        console.error("Error in removing item from cart:", error);
    }
};


// Load cart items from the database when the user logs in
export const loadCartItems = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/cart`);

        dispatch(updateCart(data.cartItems));

    } catch (error) {
        console.error(error);
    }
};

// Update the entire cart in the database (useful if doing batch updates)
export const updateCartAction = (cartItems) => async (dispatch, getState) => {
    try {
        await axios.put(`/api/v1/cart/update`, { cartItems });

    } catch (error) {
        console.error(error);
    }
};

// Update the quantity of a specific cart item
export const updateCartItemQtyAction = (itemId, quantity) => async (dispatch, getState) => {
    try {
        dispatch(updateCartItemQty({ product: itemId, quantity }));

        // Send request to update cart item quantity in the database
        const { data } = await axios.put(`/api/v1/cart/${itemId}`, { quantity });

        dispatch(updateCart(data.cart));

    } catch (error) {
        console.error(error);
    }
};