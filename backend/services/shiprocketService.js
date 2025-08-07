// backend/services/shiprocketService.js

const axios = require('axios');

const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external';

// Function to authenticate with Shiprocket and get a token
const authenticate = async () => {
    try {
        const response = await axios.post(`${SHIPROCKET_API_URL}/auth/login`, {
            email: 'vinculoshiping@gmail.com',  // Replace with your Shiprocket email
            password: 'Ssmiet@2024'        // Replace with your Shiprocket password
        });

        return response.data.token;
    } catch (error) {
        console.error('Error authenticating with Shiprocket:', error);
        throw error;
    }
};

// Function to estimate delivery date using Shiprocket API
const estimateDeliveryDate = async (pickup_postcode, delivery_postcode, token) => {
    try {
        const response = await axios.get(`${SHIPROCKET_API_URL}/courier/serviceability/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                pickup_postcode,
                delivery_postcode,
                cod: 1,
                weight: 1.0  // Adjust this value based on your use case
            }
        });

        const estimatedDeliveryDate = response.data.data.available_courier_companies[0].etd;
        return estimatedDeliveryDate;
    } catch (error) {
        console.error('Error estimating delivery date:', error);
        throw error;
    }
};

module.exports = { authenticate, estimateDeliveryDate };
