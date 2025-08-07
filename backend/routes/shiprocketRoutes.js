// backend/routes/shiprocketRoutes.js

const express = require('express');
const { authenticate, estimateDeliveryDate } = require('../services/shiprocketService');
const router = express.Router();

router.post('/authenticate', async (req, res) => {
    try {
        const token = await authenticate();
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to authenticate with Shiprocket' });
    }
});

router.post('/estimate-delivery', async (req, res) => {
    const { pickup_postcode, delivery_postcode } = req.body;

    try {
        const token = await authenticate();  // Ensure we have a valid token
        const estimatedDeliveryDate = await estimateDeliveryDate(pickup_postcode, delivery_postcode, token);

        res.status(200).json({ estimated_delivery_date: estimatedDeliveryDate });
    } catch (error) {
        res.status(500).json({ message: 'Failed to estimate delivery date' });
    }
});

module.exports = router;