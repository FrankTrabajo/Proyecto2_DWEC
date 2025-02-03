const mongoose = require('mongoose');

const SiteSchema = mongoose.Schema({
    siteName: {type: String, required: true},
    lat: {type: String, required: true},
    lon: {type: String, required: true},
    description: {type: String, required: false},
    postOwner: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Post"
    }]
})