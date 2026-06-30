const mongoose = require('mongoose');
const productModel = require('../models/product.model');
const categoryModel = require('../models/category.model');

// Get All Products
const getAllProducts = async (req, res) => {

    let filter = {};
    if (req.query.category) {
        filter = { category: { $in: req.query.category.split(',') } };
    }

    const productList = await productModel.find(filter).populate('category', 'name');

    if (!productList) {
        return res.status(404).json({ message: "No Product Found" });
    } else {
        return res.status(200).json(productList);
    }
};

// Get Product By ID
const getProductById = async (req, res) => {
    const productId = mongoose.isValidObjectId(req.params.id);
    if(!productId) {
        return res.status(400).json({ message: "Invalid Product ID" });
    }
    try {
        const product = await productModel.findById(req.params.id).populate('category', 'name');
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


//get with determined attributes
const getProductWithBaseInfo = async (req, res) => {

    const productWithBaseInfo = await productModel.find().select('title -_id');
    if (!productWithBaseInfo) {
        return res.status(404).json({ message: "No Product Found" });
    }
    return res.status(200).json(productWithBaseInfo);
};

//get count of products
const getProductCount = async (req, res) => {
    const productCount = await productModel.countDocuments();
    if (!productCount) {
        return res.status(404).json({ message: "No Product Found" });
    }
    return res.status(200).json({ count: productCount });
};


// Create New Product
const createProduct = async (req, res) => {
    try {
        const newProduct = productModel({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.file ? [req.file.filename] : [],  
            stock: req.body.stock,
            category: req.body.category,
            isFavorite: req.body.isFavorite ?? false,
             createdBy: req.user.userId,
        })
        const savedProduct = await newProduct.save();
        return res.status(201).json(savedProduct);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create product",
            details: error.message
        });
    }
};

// Update Product By ID
const updateProductById = async (req, res) => {
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
                isFavorite: req.body.isFavorite,
                createdBy: req.body.createdBy
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
};

//Filter Products favorite
const getFavoriteProducts = async (req, res) => {
    const count = parseInt(req.params.count) ? req.params.count : 0;
    try {
        const favoriteProducts = await productModel.find({ isFavorite: true }).limit(count);
        return res.status(200).json(favoriteProducts);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch favorite products",
            details: error.message
        });
    }
};

// Delete Product By ID
const deleteProductById = async (req, res) => {
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
}

// uploads image 
const uploadImage = (req, res) => {
    res.json({ image: req.file.fieldname })
}


module.exports = {
    getAllProducts,
    getProductById,
    getProductWithBaseInfo,
    getProductCount,
    createProduct,
    updateProductById,
    getFavoriteProducts,
    deleteProductById,
    uploadImage
};