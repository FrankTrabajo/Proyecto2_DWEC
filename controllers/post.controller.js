const Post = require('../models/postModel.js');
const User = require('../models/userModel.js');
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();


const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

const getPost = async (req,res) => {
    try {
        const { id } = req.params;
        const post = await User.findById(id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const createPost = async (req,res) => {
    try {
        //Aqui leo el token de la cookie
        const token = req.cookies.authToken;
        console.log(token);
        if(!token){
            return res.status(401).json({message: "No autorizado, debe iniciar sesión"});
        }

        //Verifico si el token es correcto
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        console.log("Token correcto" + decoded);
        if(!decoded){
            return res.status(401).json({message: "No autorizado, debe iniciar sesión"});
        }
        

        const user = await User.findById(decoded.userId).select('-password');
        if(!user){
            return res.status(401).json({message: "No autorizado, debe iniciar sesión"});
        }

        const {title, type, description, url} = req.body;
        const { photo } = req.files;
        

        photo.mv(__dirname + '/upload/' + photo.name);

        const post = await Post.create({
            title, type, description, photo, url, owner: user._id
        });
        user.posts.push(post._id);
        await user.save();
        
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: "Error al crear post" + error.message});
    }
};

const updatePost = async (req,res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndUpdate(id, req.body);
        if(!post){
            res.status(404).json({message: "Post not found"});
        }
        const updatePost = await Post.findById(id);
        res.status(200).json(updatePost);
    } catch (error) {
        req.status(500).json({message: error.message});
    }
};

const deletePost = async (req,res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);
        if(!post){
            res.status(404).json({message: "Post not found"});
        }
        res.status(200).json({message: "Post delete succesfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost
}