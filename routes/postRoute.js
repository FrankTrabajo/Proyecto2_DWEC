const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Post = require('../models/postModel.js');
const { getPost, getPosts, createPost, updatePost, deletePost } = require('../controllers/post.controller.js');

router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

module.exports = router;