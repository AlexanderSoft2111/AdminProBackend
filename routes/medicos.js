/* ruta Medicos

api/medicos */

const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, actualizarMedico, crearMedico, borrarMedicos } = require('../controllers/medicos');


const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getMedicos);

router.post('/', 
[
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('hospital', 'El hospital debe ser un id de mongo').isMongoId(),
    validarCampos
]
, crearMedico);

router.put('/:id',
[],
actualizarMedico)

router.delete('/:id', borrarMedicos)

module.exports = router;