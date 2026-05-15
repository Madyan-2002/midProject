const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart_controller');
const cartModel = require('../models/cart.model');


// Get Cart By User ID
router.get('/:userId', cartController.getCartByUserId);


// Remove Product From Cart
router.delete('/:userId/products/:productId', cartController.removeProductFromCart);



module.exports = router;