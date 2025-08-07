const express = require('express');
const { addToCart, getCart, updateCart, removeCartItem, clearCart } = require('../controllers/cartController'); // Make sure clearCart is imported
const { isAuthenticatedUser } = require('../middlewares/authenticate');

const router = express.Router();

router.post('/', isAuthenticatedUser, addToCart);
router.get('/', isAuthenticatedUser, getCart);
router.put('/:itemId', isAuthenticatedUser, updateCart);
router.delete('/:itemId', isAuthenticatedUser, removeCartItem);
router.delete('/', isAuthenticatedUser, clearCart);
module.exports = router;
