const express = require('express');
const router = express.Router();

const productModel = require('../models/product.model');

// Get All Products
router.get('/', async (req, res) => {
    const productList = await productModel.find();

    if (!productList) {
        return res.status(404).json({ message: "No Product Found" });
    } else {
        return res.status(200).json(productList);
    }
})

// Get Product By ID 
router.get('/:id', async (req, res) => {
    try {
        const productId = await productModel.findById(req.params.id);

        if (!productId) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        return res.status(200).json(productId);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

//Create New Product
router.post('/', async (req, res) => {
    try {
        const newProduct = productModel({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            stock: req.body.stock,
            category: req.body.category,
            seller: req.body.seller
        })

        const savedProduct = await newProduct.save();
        return res.status(201).json(savedProduct);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create product",
            details: error.message
        });
    }
});

//Update Product By ID
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
                stock: req.body.stock,
                category: req.body.category,
                seller: req.body.seller
            },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        return res.status(200).json(updatedProduct);

    } catch (error) {
        return res.status(500).json({
            message: "Failed to update product",
            details: error.message
        });
    }
});

//Delete Product By ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        return res.status(200).json({ message: "Product Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete product",
            details: error.message
        });
    }
});

module.exports = router;