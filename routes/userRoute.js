// Importamos Express y configuramos un enrutador para manejar las rutas .
const express = require('express');
const router = express.Router();
//importamos los controladores del usuario
const {inactive, active, logoutUser, getUsers, getUser, createUser, updateUser, deleteUser, loginUser, getUserProfile} = require('../controllers/user.controller.js');

// Definimos las rutas para poder realizar el CRUD de los posts
router.get('/', getUsers);
router.get("/:id", getUser);

router.post("/", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.put("/active/:id", active);
router.put("/inactive/:id", inactive);

// Exportamos el router
module.exports = router;