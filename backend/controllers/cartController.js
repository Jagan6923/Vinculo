const axios = require('axios')
const Product = require('../models/productModel');
const Cart = require('../models/cart'); // Adjust the path based on your project structure

// Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const { product, quantity, size } = req.body;
    const user = req.user.id; // Assuming the user ID is available from middleware

    console.log('Adding to cart:', { product, quantity, size, user });

    // Validate required fields
    if (!product || !quantity || !size) {
      return res.status(400).json({
        success: false,
        message: 'Product ID, quantity, and size are required'
      });
    }

    // Check if product exists
    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check stock availability
    if (productExists.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }

    // Find or create a cart for the user
    let cart = await Cart.findOne({ user });

    if (!cart) {
      cart = new Cart({ user, items: [] });
    }

    // Check if item already exists in the cart
    const itemIndex = cart.items.findIndex(item =>
      item.product.toString() === product.toString() && item.size === size
    );

    if (itemIndex > -1) {
      // Update quantity if item exists
      cart.items[itemIndex].quantity += parseInt(quantity);
    } else {
      // Add new item to cart
      cart.items.push({ product, quantity: parseInt(quantity), size });
    }

    await cart.save();
    console.log('Cart saved successfully');

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};



// Get Cart
exports.getCart = async (req, res) => {
  try {
    console.log("Getting cart for user:", req.user._id);

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(200).json({ cartItems: [] }); // Return empty cart instead of 404
    }

    // Fetch product details for each item using direct database query
    const populatedItems = await Promise.all(
      cart.items.map(async (item) => {
        try {
          const productDetails = await Product.findById(item.product);

          if (!productDetails) {
            console.log(`Product not found for ID: ${item.product}`);
            return null; // Skip this item if product not found
          }

          return {
            ...item._doc, // Spread the item object and include _doc to ensure we get the full Mongoose document
            product: {
              ...productDetails._doc,
              _id: productDetails._id,
            },
            image: productDetails.images && productDetails.images.length > 0
              ? productDetails.images[0].image
              : '/images/default-product.png'
          };
        } catch (error) {
          console.error(`Error fetching product ${item.product}:`, error.message);
          return null; // Skip this item on error
        }
      })
    );

    // Filter out null items (products that weren't found or had errors)
    const validItems = populatedItems.filter(item => item !== null);

    console.log(`Found ${validItems.length} valid cart items`);

    res.json({ cartItems: validItems });
  } catch (error) {
    console.error('Cart fetch error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




// Update Cart
exports.updateCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const user = req.user.id; // Assuming the user ID is available from middleware

    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Find and update item in the cart
    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    item.quantity = quantity;
    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Remove Cart Item
exports.removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const user = req.user.id; // Assuming the user ID is available from middleware

    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Remove item from cart
    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    item.remove();
    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Clear Cart
exports.clearCart = async (req, res) => {
  try {
    const user = req.user.id;

    await Cart.findOneAndUpdate(
      { user },
      { $set: { items: [] } },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Cart cleared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};