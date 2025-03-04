// Importamos Express y configuramos un enrutador para manejar las rutas .
const express = require ('express');
const router = express.Router();
//importamos los controladores del sitio
const { getSitio, getSitios, createSitio, updateSitio, deleteSitio} = require('../controllers/sitios.controller.js');

// Definimos las rutas para poder realizar el CRUD de los posts
router.get('/', getSitios);
router.get('/:id', getSitio);

router.post('/',createSitio);

router.put('/:id', updateSitio);

router.delete('/:id', deleteSitio);

module.exports = router;