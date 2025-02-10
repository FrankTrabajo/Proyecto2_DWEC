const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {type: String, required: true},
    type: {type: String, required: true},
    description: {type: String, required: false},
    photo: {type: String, required: false},
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

module.exports = mongoose.model("Post", PostSchema);