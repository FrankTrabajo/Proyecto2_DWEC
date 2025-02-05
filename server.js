const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const postRoute = require('./routes/postRoute.js');
const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://fran:Ar3DAU4nbytye89Z@prueba1.8u19y.mongodb.net/?retryWrites=true&w=majority&appName=Prueba1")
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

app.use('/post', postRoute);

app.get('/', (req,res) => {
    //Aqui debe de aparecer el index
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/home', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'create.html'));
})