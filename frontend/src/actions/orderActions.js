import { adminOrdersFail, adminOrdersRequest, adminOrdersSuccess, createOrderFail, createOrderRequest, createOrderSuccess, deleteOrderFail, deleteOrderRequest, deleteOrderSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess, updateOrderFail, updateOrderRequest, updateOrderSuccess, userOrdersFail, userOrdersRequest, userOrdersSuccess } from '../slices/orderSlice';
import axios from 'axios';
import { clearCart } from '../slices/cartSlice';
// export const createOrder = order => async(dispatch) => {
//     try {
//        dispatch(createOrderRequest())
//        const {data} = await axios.post(`/api/v1/order/new`, order)
//        dispatch(createOrderSuccess(data))
//     } catch (error) {
//         dispatch(createOrderFail(error.response.data.message))
//     }
// }

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: 'CREATE_ORDER_REQUEST' });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/orders/order/new', order, config);

        dispatch({
            type: 'CREATE_ORDER_SUCCESS',
            payload: data
        });
        // Clear the cart after successful order
        dispatch(clearCart());


    } catch (error) {
        dispatch({
            type: 'CREATE_ORDER_FAIL',
            payload: error.response?.data?.message || error.message || 'Failed to create order'
        });
    }
}

export const userOrders = async (dispatch) => {
    try {
        dispatch(userOrdersRequest())
        const { data } = await axios.get(`/api/v1/orders/myorders`)
        dispatch(userOrdersSuccess(data))
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch user orders';
        dispatch(userOrdersFail(errorMessage))
    }
}
export const orderDetail = id => async (dispatch) => {
    try {
        dispatch(orderDetailRequest())
        const { data } = await axios.get(`/api/v1/orders/order/${id}`)
        dispatch(orderDetailSuccess(data))
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch order details';
        dispatch(orderDetailFail(errorMessage))
    }
}

export const adminOrders = () => async (dispatch) => {
    try {
        dispatch(adminOrdersRequest())
        const { data } = await axios.get(`/api/v1/orders/admin/orders`)
        dispatch(adminOrdersSuccess(data))
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch admin orders';
        dispatch(adminOrdersFail(errorMessage))
    }
}

export const deleteOrder = id => async (dispatch) => {
    try {
        dispatch(deleteOrderRequest())
        await axios.delete(`/api/v1/orders/admin/order/${id}`)
        dispatch(deleteOrderSuccess())
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete order';
        dispatch(deleteOrderFail(errorMessage))
    }
}

export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch(updateOrderRequest())
        const { data } = await axios.put(`/api/v1/orders/admin/order/${id}`, orderData)
        dispatch(updateOrderSuccess(data))
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to update order';
        dispatch(updateOrderFail(errorMessage))
    }
}