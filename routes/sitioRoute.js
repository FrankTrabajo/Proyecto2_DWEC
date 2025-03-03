const express = require ('express');
const router = express.Router();
const { getSitio, getSitios, createSitio, updateSitio, deleteSitio} = require('../controllers/sitios.controller.js');

router.get('/', getSitios);
router.get('/:id', getSitio);

router.post('/',createSitio);

router.put('/:id', updateSitio);

router.delete('/:id', deleteSitio);

module.exports = router;