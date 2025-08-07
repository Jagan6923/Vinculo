import axios from 'axios';
import { productsFail, productsSuccess, productsRequest, adminProductsRequest, adminProductsSuccess, adminProductsFail } from '../slices/productsSlice';
import { productFail, productSuccess, productRequest, createReviewRequest, createReviewSuccess, createReviewFail, newProductRequest, newProductSuccess, newProductFail, deleteProductRequest, deleteProductSuccess, deleteProductFail, updateProductRequest, updateProductSuccess, updateProductFail, reviewsRequest, reviewsSuccess, reviewsFail, deleteReviewRequest, deleteReviewSuccess, deleteReviewFail } from '../slices/productSlice';

export const getProducts = (keyword, price, category, rating, currentPage) => async (dispatch) => {

    try {
        dispatch(productsRequest())
        let link = `/api/v1/products?page=${currentPage}`;

        if (keyword) {
            link += `&keyword=${keyword}`
        }
        if (price) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if (category) {
            link += `&category=${category}`
        }
        if (rating) {
            link += `&ratings=${rating}`
        }

        console.log('Search API URL:', link); // Debug log
        console.log('Search keyword:', keyword); // Debug log

        const { data } = await axios.get(link);
        console.log('Search results:', data); // Debug log
        dispatch(productsSuccess(data))
    } catch (error) {
        //handle error
        console.error('Search error:', error); // Debug log
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred while fetching products';
        dispatch(productsFail(errorMessage))
    }

}


export const getProduct = id => async (dispatch) => {

    try {
        dispatch(productRequest())
        const { data } = await axios.get(`/api/v1/products/product/${id}`);
        dispatch(productSuccess(data))
    } catch (error) {
        //handle error
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred while fetching product';
        dispatch(productFail(errorMessage))
    }

}

export const createReview = reviewData => async (dispatch) => {

    try {
        dispatch(createReviewRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/products/review`, reviewData, config);
        dispatch(createReviewSuccess(data))
    } catch (error) {
        //handle error
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred while creating review';
        dispatch(createReviewFail(errorMessage))
    }

}

export const getAdminProducts = async (dispatch) => {

    try {
        dispatch(adminProductsRequest())
        const { data } = await axios.get(`/api/v1/products/admin/products`);
        dispatch(adminProductsSuccess(data))
    } catch (error) {
        //handle error
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred while fetching admin products';
        dispatch(adminProductsFail(errorMessage))
    }

}

export const createNewProduct = productData => async (dispatch) => {

    try {
        dispatch(newProductRequest())
        const { data } = await axios.post(`/api/v1/products/admin/product/new`, productData);
        dispatch(newProductSuccess(data))
    } catch (error) {
        //handle error
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred while creating new product';
        dispatch(newProductFail(errorMessage))
    }

}

export const deleteProduct = id => async (dispatch) => {

    try {
        dispatch(deleteProductRequest())
        await axios.delete(`/api/v1/products/admin/product/${id}`);
        dispatch(deleteProductSuccess())
    } catch (error) {
        //handle error
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred while deleting product';
        dispatch(deleteProductFail(errorMessage))
    }

}

export const updateProduct = (id, productData) => async (dispatch) => {

    try {
        dispatch(updateProductRequest())
        const { data } = await axios.put(`/api/v1/products/admin/product/${id}`, productData);
        dispatch(updateProductSuccess(data))
    } catch (error) {
        //handle error
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred while updating product';
        dispatch(updateProductFail(errorMessage))
    }

}


export const getReviews = id => async (dispatch) => {

    try {
        dispatch(reviewsRequest())
        const { data } = await axios.get(`/api/v1/products/admin/reviews`, { params: { id } });
        dispatch(reviewsSuccess(data))
    } catch (error) {
        //handle error
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred while fetching reviews';
        dispatch(reviewsFail(errorMessage))
    }

}

export const deleteReview = (productId, id) => async (dispatch) => {

    try {
        dispatch(deleteReviewRequest())
        await axios.delete(`/api/v1/products/admin/review`, { params: { productId, id } });
        dispatch(deleteReviewSuccess())
    } catch (error) {
        //handle error
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred while deleting review';
        dispatch(deleteReviewFail(errorMessage))
    }

}