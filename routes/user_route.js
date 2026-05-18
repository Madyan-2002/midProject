const express = require('express');
const router = express.Router();

const userModel = require('../models/user.model');
const userController = require('../controllers/user_controller');


// Get All Users
router.get('/',userController.getAllUsers);

// Get User By ID
router.get('/:id',userController.getUserById);

// Create New User
router.post('/',userController.createUser);

// Update User By ID
router.put('/:id',userController.updateUserById);

//Delete User By ID
router.delete('/:id',userController.deleteUserById);

// User Login and Registration
router.post('/login', userController.loginUser);

router.post('/register', userController.registerUser);

module.exports = router;