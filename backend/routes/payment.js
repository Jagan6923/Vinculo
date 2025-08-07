const express = require('express');
const { processPayment, sendRazorpayApiKey, verifyPayment, testRazorpay } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/authenticate');
const router = express.Router();

// Route for processing payment
router.route('/payment/process').post(isAuthenticatedUser, processPayment);

// Route for verifying payment
router.route('/payment/verify').post(isAuthenticatedUser, verifyPayment);

// Route to test Razorpay connection
router.route('/payment/test').get(testRazorpay);

// Route to send Razorpay API key to frontend
router.route('/razorpayapikey').get(sendRazorpayApiKey); // Remove authentication requirement for API key

module.exports = router;
