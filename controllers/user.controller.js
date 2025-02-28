const User = require('../models/userModel.js');
const express = require('express');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
//app.use(express.static('public'));

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


//Aqui crearemos el token de usuario de cuando se logea
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
        const token = jsonwebtoken.sign({userId: user._id.toString(), email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});

        //Enviar el token como cookie
        res.cookie('authToken', token, {httpOnly:true, secure: false, maxAge: 3600000});

        res.status(200).json({message: "Login correcto", user});
    } catch (error) {
        res.status(500).json({message: "Error en el login?" + error.message});
    }
}
//Aqui hacemos el logout, eliminamos el token de sesion 
const logoutUser = async(req,res) => {
    //Tiene que tener el mismo nombre de la cookie creada en el login
    res.clearCookie('authToken')
    res.json({message: "Sesion cerrada"});
}

const active = async (req,res) => {
    const { id } = req.params;
    let user = await User.findByIdAndUpdate(id,{ active: true }, { new: true } );

    if(!user){
        res.status(404).json({message: "Usuario no encontrado"});
    }
    res.status(200);
}

const inactive = async (req,res) => {
    const { id } = req.params;
    let user = await User.findByIdAndUpdate(id,{ active: false }, { new: true } );

    if(!user){
        res.status(404).json({message: "Usuario no encontrado"});
    }
    res.status(200);
}

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