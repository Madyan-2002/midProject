const express = require('express');
const router = express.Router();
const productController = require('../controllers/product_controller');
const productModel = require('../models/product.model');

// Get All Products
router.get('/', productController.getAllProducts);

// Get Product By ID 
router.get('/:id', productController.getProductById);

//get with determined attributes
router.get('/base/info', productController.getProductWithBaseInfo);

//get count of products
router.get('/base/count', productController.getProductCount);

//Create New Product
router.post('/', productController.createProduct);

//Update Product By ID
router.put('/:id', productController.updateProductById);

//Filter Products favorite
router.get('/base/favorites/:count', productController.getFavoriteProducts);

//Delete Product By ID
router.delete('/:id', productController.deleteProductById);

module.exports = router;