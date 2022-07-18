/* ruta Hospitales

ruta:api/busqueda?todo */

const { Router } = require('express');
const { getTodo, getDocumentColeccion } = require('../controllers/busqueda');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda', validarJWT, getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentColeccion);

module.exports = router;