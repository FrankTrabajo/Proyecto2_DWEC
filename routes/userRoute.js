const express = require('express');
const router = express.Router();
const {logoutUser, getUsers, getUser, createUser, updateUser, deleteUser, loginUser, getUserProfile} = require('../controllers/user.controller.js');

router.get('/', getUsers);
router.get("/:id", getUser);

router.post("/", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;