/* ruta uploads

ruta:api/uploads */

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { fileUpload, retornaImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Establecer esta configuración para poder subir el archivo
router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload);

router.get('/:tipo/:foto', retornaImagen);

module.exports = router;