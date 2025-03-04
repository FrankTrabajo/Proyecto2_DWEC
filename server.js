const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const postRoute = require('./routes/postRoute.js');
const userRoute = require('./routes/userRoute.js');
const siteRoute = require('./routes/sitioRoute.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const PORT = 3000;
const jwt = require('jsonwebtoken');
const User = require('./models/userModel.js');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(cors());





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

// ruta de Login
app.get("/login", (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// ruta de register
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// ruta de profile
app.get("/profile", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// route de post
app.use('/api/post', postRoute);
// route de usuarios
app.use('/user', userRoute);
// route de sitios
app.use('/api/site', siteRoute);

// Ruta principal
app.get('/', (req,res) => {
    //Aqui debe de aparecer el index
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para ir al mapa
app.get('/mapa', (req,res) => {
    //Aqui debe de aparecer el index
    res.sendFile(path.join(__dirname, 'public', 'mapa.html'));
});


// Ruta para crear un post nuevo, solo la vista
app.get('/create_post', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'create.html'));
})

// Ruta para ir a la pagina del usuario administrador
app.get('/admin-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
})

// Ruta para comprobar si el usuario está logueado o no
app.get("/check-auth", (req, res) => {
    if(req.cookies.authToken) {
        res.status(200).json({ logueado: true });
    }else {
        res.status(200).json({ logueado: false });
    }
});

// Ruta para comprobar si el usuario logueado es admin o no
app.get("/check-admin", (req, res) => {
    const token = req.cookies.authToken;

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        res.json({ admin: decode.role.includes('ROLE_ADMIN')});

    } catch (error) {
        res.json({ admin: false});
    }
});

//Ruta para comprobar si el usuario esta activo o no
app.get('/check-active', (req,res) => {
    const token = req.cookies.authToken;
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ active: decode.active });
    } catch (error) {
        res.json({ active: decode.active });
    }
})

app.get('/get-id-user', async(req,res) => {
    const token = req.cookies.authToken;
    if(!token){
        return res.status(401).json({ message: 'No autorizado, debe iniciar sesión' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decodificado:', decoded);

        if(!decoded || !decoded.userId){
            return res.status(401).json({ message: 'Token inválido o no contiene userId' });
        }

        const user = await User.findById(decoded.userId).select('-password');
        if(!user){
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        res.json({ userId: decoded.userId });
    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
});


app.get("/post/update", async(req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'update.html'));
});