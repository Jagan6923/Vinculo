const mongoose = require('mongoose');
const app = require('./app');
const connectDatabase = require('./config/database');
const axios = require('axios');
const express = require('express');

// Set strictQuery option
mongoose.set('strictQuery', false); // or true, depending on your preference

// Connect to the database
connectDatabase();

app.get('/api/v1/payment/check-status', async (req, res) => {
    try {
        const response = await axios.get('https://api.razorpay.com/v1/account', {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64')}`
            }
        });

        if (response.status === 200) {
            res.status(200).send('Razorpay is up');
        } else {
            res.status(503).send('Razorpay is down');
        }
    } catch (error) {
        console.error('Error checking Razorpay status:', error.response ? error.response.data : error.message);
        res.status(503).send('Razorpay is down');
    }
});

const server = app.listen(process.env.PORT, () => {
    console.log(`My Server listening to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`);
});



// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection error');
    server.close(() => {
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception error');
    server.close(() => {
        process.exit(1);
    });
});