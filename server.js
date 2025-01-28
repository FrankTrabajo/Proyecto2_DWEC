const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(bodyParser.json());

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

// rutas de Login
app.get("/login", (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// ruta de register
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/', (req,res) => {
    //Aqui debe de aparecer el index
});