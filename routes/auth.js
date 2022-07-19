/* ruta auth

ruta: api/login */

const {Router} = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

const { login, loginGoogle, renewToken } = require('../controllers/auth');


const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
    ],
    login
);

router.post('/google',
    [
        check('token', 'El password es obligatorio').not().isEmpty(),
    ],
    loginGoogle
);

router.get('/renew',
    validarJWT,
    renewToken
);

module.exports = router;