//importamos mongoose
const mongoose = require('mongoose');
//definimos el esquema del post y decimos como queremos que sean sus campos
const PostSchema = mongoose.Schema({
    title: {type: String, required: true},
    type: {type: String, required: true},
    description: {type: String, required: false},
    photo: {type: String, required: false, default: null},
    creationDate: {type: Date, default: Date.now} ,
    url: { type: String, required: false},
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    site: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Site"
    }
})
//por ultimo exportamos el modelo
module.exports = mongoose.model("Post", PostSchema);