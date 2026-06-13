const express = require('express');
const router = express.Router();
const productController = require('../controllers/product_controller');
const productModel = require('../models/product.model');
const authJwt = require('../helper/jwt');
const isAdmin = require('../helper/is_admin');

// Get All Products
router.get('/',  productController.getAllProducts);

// Get Product By ID 
router.get('/:id', productController.getProductById);

//get with determined attributes
router.get('/base/info', authJwt, productController.getProductWithBaseInfo);

//get count of products
router.get('/base/count', authJwt, productController.getProductCount);

//Create New Product
router.post('/', authJwt, isAdmin, productController.createProduct);

//Update Product By ID
router.put('/:id', authJwt, isAdmin, productController.updateProductById);

//Filter Products favorite
router.get('/base/favorites/:count', authJwt, productController.getFavoriteProducts);

//Delete Product By ID
router.delete('/:id', authJwt, isAdmin, productController.deleteProductById);

module.exports = router;