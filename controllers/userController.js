const User = require('../models/userModel.js');
const express = require('express');

app.use(express.static('public'));

const getUsers =  async (req,res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getUser = async(req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user); 
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createUser = async (req,res) => {
    try {
        await User.create(req.body);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateUser = async (req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if(!user){
            res.status(404).json({message: "User not found"}); 
        }
        const updateUser = await User.findById(id);
        res.status(200).json(updateUser); 
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteUser = async (req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            res.status(404).json({message: "User not found"}); 
        }
        res.status(200).json({message: "User delete succesfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}