/* ruta usuarios

api/usuarios */

const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/', [
    check('nombre', 'el nombre es obligario').not().isEmpty(),
    check('email', 'el email es obligario').isEmail(),
    check('password', 'el password es obligario').not().isEmpty(),
    validarCampos
], crearUsuario);

router.put('/:id',
validarJWT,
[
    check('nombre', 'el nombre es obligario').not().isEmpty(),
    check('email', 'el email es obligario').isEmail(),
    check('role', 'el role es obligario').not().isEmpty(),
    validarCampos
],actualizarUsuario)

router.delete('/:id', validarJWT,borrarUsuario)

module.exports = router;