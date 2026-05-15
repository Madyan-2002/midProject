const mongoose = require('mongoose');
const cartModel = require('../models/cart.model');
const productModel = require('../models/product.model');
const userModel = require('../models/user.model');

// Get Cart By User ID
const getCartByUserId = async (req, res) => {
    const userId = mongoose.isValidObjectId(req.params.userId);
    if (!userId) {
        return res.status(400).json({ message: "Invalid User ID" });
    }
    try {
        const cart = await cartModel.findOne({ user: req.params.userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: "Cart Not Found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove Product From Cart
const removeProductFromCart = async (req, res) => {
    const userId = mongoose.isValidObjectId(req.params.userId);
    const productId = mongoose.isValidObjectId(req.params.productId);

    if (!userId || !productId) {
        return res.status(400).json({ message: "Invalid User ID or Product ID" });
    }

    try {
        const cart = await cartModel.findOne({ user: req.params.userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart Not Found" });
        }
        const itemIndex = cart.items.findIndex(item => item.product.toString() === req.params.productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Product Not Found in Cart" });
        } else {
            cart.items.splice(itemIndex, 1);
            await cart.save();
            return res.status(200).json(cart);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Add Product To Cart
const addToCart = async (req, res) => {

    try {
        const { productId, quantity } = req.body;

        const userId = req.user.userId;

        // search for existing cart
        let cart = await Cart.findOne({
            user: userId
        });

        // if no cart create one
        if (!cart) {

            cart = new Cart({
                user: userId,
                items: []
            });

        }

        // check if product already exists
        const productIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        // if exists increase quantity
        if (productIndex > -1) {

            cart.items[productIndex].quantity += quantity;

        } else {

            // add new item
            cart.items.push({
                product: productId,
                quantity
            });

        }

        await cart.save();

        res.status(200).json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// Clear Cart By User ID
const clearCartByUserId = async (req, res) => {
    const userId = mongoose.isValidObjectId(req.params.userId);

    if (!userId) {
        return res.status(400).json({ message: "Invalid User ID" });
    }
    try {
        const cart = await cartModel.findOne({ user: req.params.userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart Not Found" });
        }
        cart.items = [];
        await cart.save();
        return res.status(200).json(cart);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getCartByUserId,
    removeProductFromCart,
    addToCart,
    clearCartByUserId
};


