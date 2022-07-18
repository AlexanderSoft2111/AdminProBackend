/* ruta Hospitales

api/hospitales */

const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitales, crearHospital, actualizarHospital, borrarHospitales } = require('../controllers/hospitales');


const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getHospitales);

router.post('/', 
[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos]
, crearHospital);

router.put('/:id',
[],
actualizarHospital)

router.delete('/:id', borrarHospitales)

module.exports = router;