// Importamos Express y configuramos un enrutador para manejar las rutas .
// También importamos Mongoose
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
// Importamos el modelo y los controladores de posts
const Post = require('../models/postModel.js');
const { getPost, getPosts, createPost, updatePost, deletePost } = require('../controllers/post.controller.js');

// Definimos las rutas para poder realizar el CRUD de los posts
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

// Exportamos el router
module.exports = router;