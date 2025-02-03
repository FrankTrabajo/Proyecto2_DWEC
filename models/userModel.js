const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: { type: String, required: true, default: "[ROLE_USER]"},
    active: { type: Boolean, default: true}, // Si está true el usuario está activo
    photo: {type: String, required: false},
    posts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Post"
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;