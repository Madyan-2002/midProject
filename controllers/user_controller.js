const mongoose = require('mongoose');
const userModel = require('../models/user.model');

// Get All Users
const getAllUsers =  async (req, res) => {
    const userList = await userModel.find();

    if (!userList) {
        return res.status(404).json({ message: "No User Found" });
    }
    else {
        return res.status(200).json(userList);
    }
};

// Get User By ID
const getUserById = async (req, res) => {
    try {
        const userId = await userModel.findById(req.params.id);

        if (!userId) {
            return res.status(404).json({ message: "User Not Found" });
        }
        return res.status(200).json(userId);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Create New User
const createUser =  async (req, res) => {
    try {
        const newUser = userModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        })
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create user",
            details: error.message
        });
    }

};

// Update User By ID
const updateUserById =  async (req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            },
            { new: true }
        );
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update user",
            details: error.message
        });
    }
};

// Delete User By ID
const deleteUserById =  async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User Not Found " });
        }
        return res.status(200).json({ message: "User Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete user",
            details: error.message
        })
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
};