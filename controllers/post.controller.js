//Importamos los modelos de la base de datos 
const Sitios = require('../models/siteModel.js'); 
const Post = require('../models/postModel.js');
const User = require('../models/userModel.js');

//Importamos  las librerías que nos van a servir para la autenticación y el manejo de archivos
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { default: mongoose } = require('mongoose');

//Cargamos las variables de entorno desde el archivo .env
dotenv.config();

/**
 * Funcion para obtener todos los post
 * @param {request} req 
 * @param {response} res 
 */
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


/**
 * Funcion para obtener todos los post de un usuario en especifico 
 * @param {request} req 
 * @param {response} res 
 */
const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.find({ owner: id });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


/**
 * Funcion para crear un nuevo post creando a su vez el sitio haciendo que 
 * el post.site sea el id del sitio creado anteriormente
 * @param {request} req 
 * @param {response} res 
 */
const createPost = async (req, res) => {
    try {
        //Aqui leo el token de la cookie
        const token = req.cookies.authToken;
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: "No autorizado, debe iniciar sesión" });
        }

        //Verifico si el token es correcto
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        console.log("Token correcto" + decoded);
        if (!decoded) {
            return res.status(401).json({ message: "No autorizado, debe iniciar sesión" });
        }


        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: "No autorizado, debe iniciar sesión" });
        }


        const { siteName, descriptionSite, lat, lon, title, type, description, url } = req.body;
        

        if (!siteName || !lat || !lon) {
            return res.status(400).json({ message: "Debe proporcionar un nombre y ubicación para el sitio" });
        }

        let photoPath = null;


        if (req.files && req.files.photo) {
            const photo = req.files.photo;
            let uploadDir = path.join(__dirname, '../public/uploads/');

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            photoPath = `/uploads/${photo.name}`;
            const url_photo = path.join(uploadDir, photo.name);
            await photo.mv(url_photo);

        }

        const post = await Post.create({
            title,
            type,
            description,
            photo: photoPath,
            url,
            owner: user._id
        });

        const sitio = await Sitios.create({
            siteName,
            lat,
            lon,
            description: descriptionSite,
            postOwner: post._id
        });

        post.site = sitio._id;
        await post.save();
        
        user.posts.push(post._id);
        await user.save();

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: "Error al crear post" + error.message });
    }
};


/**
 * Funcion para actualizar un post en especifico 
 * @param {request} req 
 * @param {response} res 
 */
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndUpdate(id, req.body);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
        }
        const updatePost = await Post.findById(id);
        res.status(200).json(updatePost);
    } catch (error) {
        req.status(500).json({ message: error.message });
    }
};

/**
 * Funcion para eliminar un post en especifico 
 * @param {request} req 
 * @param {response} res 
 */
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const site = await Site.findByIdAndDelete({
            postOwner: id
        });
        const post = await Post.findByIdAndDelete(id);
        if (!post || !site) {
            res.status(404).json({ message: "Post o sitio no encontrado" });
        }
        res.status(200).json({ message: "Post y sitio eliminados correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//exportamos las funciones para poderlas usar en otros sitio
module.exports = {
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost
}