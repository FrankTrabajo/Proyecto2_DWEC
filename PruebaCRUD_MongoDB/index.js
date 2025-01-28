const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require('./models/user.model.js');
const { urlencoded } = require("body-parser");
const userRoute = require('./routes/user.route.js');
const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


mongoose.connect("mongodb+srv://fran:Ar3DAU4nbytye89Z@prueba1.8u19y.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Prueba1")
    .then(() => {
        console.log("Conectado");
    })
    .catch((err) => {
        console.log("Error de conexion", err);
    });

app.listen(PORT, () => {
    console.log(`Servidor ejecutado en http://localhost:${PORT}`);
});


// routes
app.use("/api/users", userRoute);


app.get('/', (req,res) => {
    res.send('Hello from node API');
});

