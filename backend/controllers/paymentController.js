const Razorpay = require('razorpay');
const catchAsyncError = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');

// Validate Razorpay configuration
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error('❌ RAZORPAY CONFIGURATION ERROR: Keys are missing!');
    console.log('Please set the following environment variables:');
    console.log('RAZORPAY_KEY_ID=your_test_key_id');
    console.log('RAZORPAY_KEY_SECRET=your_test_key_secret');
    console.log('Get test keys from: https://dashboard.razorpay.com/app/keys');
} else {
    const keyType = process.env.RAZORPAY_KEY_ID.startsWith('rzp_test') ? 'TEST' : 'LIVE';
    console.log(`✅ Razorpay configured with ${keyType} keys`);

    if (process.env.NODE_ENV === 'development' && keyType === 'LIVE') {
        console.warn('⚠️  WARNING: Using LIVE keys in development mode!');
        console.warn('   Consider using TEST keys for development.');
    }
}

// Initialize Razorpay instance with your key_id and key_secret
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.processPayment = catchAsyncError(async (req, res, next) => {
    const { amount, currency, shipping } = req.body;

    // Validate required fields
    if (!amount) {
        return next(new ErrorHandler('Amount is required', 400));
    }

    // Validate Razorpay configuration
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        console.error('Razorpay keys not configured');
        return next(new ErrorHandler('Payment service not configured. Please contact administrator.', 500));
    }

    // Check if using placeholder keys
    if (process.env.RAZORPAY_KEY_ID.includes('replace_with_your')) {
        console.error('Placeholder Razorpay keys detected');
        return next(new ErrorHandler('Payment service not properly configured. Please set up valid Razorpay keys.', 500));
    }

    console.log('Creating Razorpay order:', {
        amount,
        currency: currency || "INR",
        keyType: process.env.RAZORPAY_KEY_ID.startsWith('rzp_test') ? 'TEST' : 'LIVE'
    });

    const options = {
        amount: Math.round(amount * 100), // Convert to paise and ensure it's an integer
        currency: currency || "INR", // default to INR
        receipt: `order_rcptid_${Date.now()}`,
        notes: shipping || {}
    };

    try {
        const order = await razorpay.orders.create(options);

        console.log('✅ Razorpay order created successfully:', order.id);

        res.status(200).json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            key_id: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error('❌ Razorpay order creation failed:', error);

        // Provide specific error messages based on error type
        let errorMessage = 'Payment order creation failed';

        if (error.error && error.error.code) {
            switch (error.error.code) {
                case 'BAD_REQUEST_ERROR':
                    errorMessage = 'Invalid payment request. Please check the amount and try again.';
                    break;
                case 'KEY_SECRET_MISMATCH':
                    errorMessage = 'Payment configuration error. Please contact support.';
                    break;
                default:
                    errorMessage = error.error.description || errorMessage;
            }
        }

        return next(new ErrorHandler(errorMessage, 500));
    }
}); exports.sendRazorpayApiKey = catchAsyncError(async (req, res, next) => {
    if (!process.env.RAZORPAY_KEY_ID) {
        return next(new ErrorHandler('Razorpay API key not configured', 500));
    }

    res.status(200).json({
        success: true,
        razorpayApiKey: process.env.RAZORPAY_KEY_ID,
    });
});

// Verify Razorpay payment
exports.verifyPayment = catchAsyncError(async (req, res, next) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return next(new ErrorHandler('Payment verification data is incomplete', 400));
    }

    const crypto = require('crypto');
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        res.status(200).json({
            success: true,
            message: 'Payment verified successfully'
        });
    } else {
        return next(new ErrorHandler('Invalid payment signature', 400));
    }
});

// Test Razorpay connection
exports.testRazorpay = catchAsyncError(async (req, res, next) => {
    try {
        // Test if Razorpay credentials are working by creating a small test order
        const testOptions = {
            amount: 100, // 1 rupee in paise
            currency: "INR",
            receipt: `test_rcptid_${Date.now()}`,
            notes: {
                test: "This is a test order"
            }
        };

        const testOrder = await razorpay.orders.create(testOptions);

        res.status(200).json({
            success: true,
            message: 'Razorpay connection successful',
            test_order_id: testOrder.id,
            razorpay_configured: true
        });
    } catch (error) {
        console.error('Razorpay test failed:', error);
        res.status(500).json({
            success: false,
            message: 'Razorpay connection failed',
            error: error.message,
            razorpay_configured: false
        });
    }
});
