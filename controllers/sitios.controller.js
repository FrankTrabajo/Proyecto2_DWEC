const Sitios = require('../models/siteModel.js'); 
const User = require('../models/userModel.js');
const Post = require('../models/postModel.js');  
const jsonwebtoken = require('jsonwebtoken');   
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs'); 

dotenv.config();

//para obtener todos los sitios
const getSitios = async(req, res) => {
    try {
        const sitios = await Sitios.find({});
        res.status(200).json(sitios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//obtener todos los post de un sitio en especifico
const getSitio = async (req, res) => {
    try {
        const { siteId } = req.params;    
        const sitios = await Post.find({ site: siteId }).populate('owner', 'name email');
        res.status(200).json(sitios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//crear un sitio
const createSitio = async (req, res) => {
    try {
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

        const usuario = await User.findById(decoded.userId).select('-password');
        if (!usuario) {
            return res.status(401).json({ message: "No autorizado, debe iniciar sesión" });
        }
        
        const { siteName, siteLocation, title, type, description, url } = req.body;

        if (!siteName || !siteLocation) {
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

        // Creo el sitio
        const site = await Sitios.create({
            name: siteName,
            location: siteLocation,
            createdBy: usuario._id
        });

        // Creo el post de un al sitio
        const post = await Post.create({
            title,
            type,
            description,
            photo: photoPath,
            url,
            owner: usuario._id,
            site: site._id // Asociamos el post al sitio recién creado
        });

        // Agregar el post al usuario
        usuario.posts.push(post._id);
        await usuario.save();

        return res.status(200).json({ site, post });

    } catch (error) {
        req.status(500).json({ message: error.message });
    }
};

//actualizar sitio
const updateSitio = async (req, res)=>{
    try {
        const { id } = req.params;
        const sitio = await Sitios.findByIdAndUpdate(id, req.body);
        if(!sitio){
            res.status(404).json({message: "Sitio not found"});
        }
        const sitioActualizado = await Sitios.findById(id);
        res.status(200).json(sitioActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//borrar sitio
const deleteSitio = async (req, res) =>{
    try {
        const { id } = req.params;
        const sitio = await Sitios.findByIdAndDelete(id);
        if(!sitio){
            res.status(404).json({message: "Sitio not found"});
        }
        res.status(200).json({message : "Sitio borrado adecuadamente"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSitios,
    getSitio,
    createSitio,
    updateSitio,
    deleteSitio

};