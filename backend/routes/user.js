const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel'); // Assuming your model is in the models folder

// Get user addresses by email
router.get('/user/:email/address', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await UserModel.findOne({ email }).select('savedAddresses');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.savedAddresses);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete an address by ID
router.delete('/user/:email/address/:addressId', async (req, res) => {
    try {
        const email = req.params.email;
        const addressId = req.params.addressId;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the address by ID and remove it
        const addressIndex = user.savedAddresses.findIndex(address => address._id.toString() === addressId);
        if (addressIndex === -1) {
            return res.status(404).json({ message: 'Address not found' });
        }

        user.savedAddresses.splice(addressIndex, 1); // Remove the address
        await user.save(); // Save the updated user document

        res.status(200).json({ message: 'Address removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
