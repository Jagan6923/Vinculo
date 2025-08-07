// backend/routes/deliveryRoutes.js

const express = require('express');
const { estimateDeliveryDate } = require('../services/shiprocketService');
const router = express.Router();

// You can use this route to get the estimated delivery date
router.post('/delivery-date', async (req, res) => {
    const { pickup_postcode, delivery_postcode } = req.body;

    try {
        const token = await authenticate();
        const deliveryDate = await estimateDeliveryDate(pickup_postcode, delivery_postcode, token);
        res.status(200).json({ deliveryDate });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get delivery date' });
    }
});

module.exports = router;