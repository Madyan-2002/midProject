const express = require('express');
const router = express.Router();


const userModel = require('../models/user.model');
const userController = require('../controllers/user_controller');

const authJwt = require('../helper/jwt');

// User Login and Registration
router.post('/login', userController.loginUser);

router.post('/register', userController.registerUser);

// Get All Users
router.get('/',authJwt,userController.getAllUsers);

// Get User By ID
router.get('/:id',authJwt,userController.getUserById);

// Create New User
router.post('/',userController.createUser);

// Update User By ID
router.put('/:id',authJwt,userController.updateUserById);

//Delete User By ID
router.delete('/:id',authJwt,userController.deleteUserById);



module.exports = router;