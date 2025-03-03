//importamos mongoose
const mongoose = require('mongoose');
//definimos el esquema del sitio y decimos como queremos que sean sus campos
const SiteSchema = mongoose.Schema({
    siteName: {type: String, required: true},
    lat: {type: String, required: true},
    lon: {type: String, required: true},
    description: {type: String, required: false},
    postOwner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Post"
    }
});
//por ultimo exportamos el modelo
module.exports = mongoose.model("Site", SiteSchema);