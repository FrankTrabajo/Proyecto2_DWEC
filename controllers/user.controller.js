//Importamos los modelos de la base de datos
const User = require('../models/userModel.js');
//Importamos Express para manejar las solicitudes y respuestas HTTP
const express = require('express');
//Importamos  las librerías que nos van a servir para la autenticación y el manejo de archivos
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');
//Cargamos las variables de entorno desde el archivo .env
dotenv.config();
//app.use(express.static('public'));

/**
 * Funcion para obtener todos los usuarios
 * @param {request} req 
 * @param {response} res 
 */

const getUsers =  async (req,res) => {
    try {

        const users = await User.find({});
        let usuariosSend = [];
        for(let usuario of users){
            if(usuario.name !== 'Admin'){
                usuariosSend.push(usuario);
            }
        }

        res.status(200).json(usuariosSend);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

/**
 * Funcion para obtener un usuario en especifico 
 * @param {request} req 
 * @param {response} res 
 */
const getUser = async(req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user); 
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

/**
 * Funcion para crear un nuevo usuario
 * @param {request} req 
 * @param {response} res 
 */
const createUser = async (req,res) => {
    try {

        const { name, email, password } = req.body;

        //Compruebo primero si el usuario exite - usando el email
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.sendFile(path.join(__dirname, 'public', 'login.html'));
        }

        //Aqui preparamos la encriptacion que haremos a la contraseña
        //Hemos puesto 5, por defecto son 10, depende de el numero se haran mas vuelta de encriptado o no
        const salt = await bcrypt.genSalt(5);
        //Aqui creamos la contraseña hasheada
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = await User.create({
            name, email, password: hashPassword
        });

        //await User.create(req.body);
        return res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

/**
 * Funcion para actualizar un usuario en especifico
 * @param {request} req 
 * @param {response} res 
 */
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

/**
 * Funcion para borrar un usuario en especifico
 * @param {request} req 
 * @param {response} res 
 */
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

/**
 * Funcion para crear el token de usuario de cuando se logea 
 * @param {request} req 
 * @param {response} res 
 */
 
const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;

        //Buscamos el usuario por email
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Usuario no encontrado"});
        }

        //Verifico la contraseña
        const passOk = await bcrypt.compare(password, user.password);
        if(!passOk){
            return res.status(400).json({message: "Contraseña incorrecta"});
        }
        
        //Crear TOKEN
        const token = jsonwebtoken.sign({userId: user._id.toString(), email: user.email, role: user.role, active: user.active}, process.env.JWT_SECRET, {expiresIn: '1h'});

        //Enviar el token como cookie
        res.cookie('authToken', token, {httpOnly:true, secure: false, maxAge: 3600000});

        res.status(200).json({message: "Login correcto", user});
    } catch (error) {
        res.status(500).json({message: "Error en el login?" + error.message});
    }
}

/**
 * Funcion para hacer el logout, eliminamos el token de sesion 
 * @param {request} req 
 * @param {response} res 
 */
const logoutUser = async(req,res) => {
    //Tiene que tener el mismo nombre de la cookie creada en el login
    res.clearCookie('authToken')
    res.json({message: "Sesion cerrada"});
}

/**
 * Funcion para activar la cuenta de un usuario en especifico.
 * @param {request} req 
 * @param {response} res 
 */

const active = async (req,res) => {
    const { id } = req.params;
    let user = await User.findByIdAndUpdate(id,{ active: true }, { new: true } );

    if(!user){
        res.status(404).json({message: "Usuario no encontrado"});
    }
    res.status(200);
}

/**
 * Funcion para desactivar la cuenta de un usuario en especifico.
 * @param {request} req 
 * @param {response} res 
 */
const inactive = async (req,res) => {
    const { id } = req.params;
    let user = await User.findByIdAndUpdate(id,{ active: false }, { new: true } );

    if(!user){
        res.status(404).json({message: "Usuario no encontrado"});
    }
    res.status(200);
}


//exportamos las funciones para poderlas usar en otros sitio
module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    active,
    inactive
}