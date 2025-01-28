const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {type: String, required: [true, 'Por favor introduce el nombre'],},
    email: {type: String, required: [true, 'Por favor escriba su email']},
    password: {type: String, required: [true, 'Por favor escriba su contraseña']},
    age: {type: Number, required: [true, 'Por favor escriba su edad']},
});

const User = mongoose.model('User', UserSchema);
module.exports = User;