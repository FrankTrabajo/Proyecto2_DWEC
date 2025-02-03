const Post = require('../models/postModel.js');

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
        const post = await Post.create(req.body);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: error.message});
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