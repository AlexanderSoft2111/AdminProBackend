/* ruta usuarios

api/usuarios */

const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/', [
    check('nombre', 'el nombre es obligario').not().isEmpty(),
    check('email', 'el email es obligario').isEmail(),
    check('password', 'el password es obligario').not().isEmpty(),
    validarCampos
], crearUsuario);

router.put('/:id',
validarJWT,//Valida si el JWT es valido
validarADMIN_ROLE_o_MismoUsuario,//valida si el usuario es ADMIN_ROLE
[
    check('nombre', 'el nombre es obligario').not().isEmpty(),
    check('email', 'el email es obligario').isEmail(),
    check('role', 'el role es obligario').not().isEmpty(),
    validarCampos //Valida todos los campos del check
],actualizarUsuario)

router.delete('/:id', validarJWT,validarADMIN_ROLE,borrarUsuario)

module.exports = router;