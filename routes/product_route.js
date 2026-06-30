const express = require('express');
const router = express.Router();
const productController = require('../controllers/product_controller');
const productModel = require('../models/product.model');
const authJwt = require('../helper/jwt');
const isAdmin = require('../helper/is_admin');
const uploads = require('../helper/uploads');

// Get All Product
router.get('/', productController.getAllProducts);

// الـ specific routes أولاً قبل /:id
router.get('/base/info', authJwt, productController.getProductWithBaseInfo);
router.get('/base/count', authJwt, productController.getProductCount);
router.get('/base/favorites/:count', authJwt, productController.getFavoriteProducts);

// الـ dynamic route في الأخير
router.get('/:id', productController.getProductById);

router.post('/', authJwt, isAdmin, uploads.single("image"), productController.createProduct);
router.post('/uploads', authJwt, isAdmin, uploads.single("image"), productController.uploadImage);

router.put('/:id', authJwt, isAdmin, productController.updateProductById);
router.delete('/:id', authJwt, isAdmin, productController.deleteProductById);


module.exports = router;