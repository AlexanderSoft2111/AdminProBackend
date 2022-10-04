const { response } = require('express');
const Usuario = require('../models/usuario');

const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(404).json({
            ok: false,
            msg: 'No existe token'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

}

const validarADMIN_ROLE = async(req, res = response, next) => {

    try {

        const uid = req.uid;

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){

            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario en BD'
            });
        }
        
        if(usuarioDB.role !== 'ADMIN_ROLE'){
            
            return res.status(404).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

        next();

        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}

const validarADMIN_ROLE_o_MismoUsuario = async(req, res = response, next) => {

    try {

        const uid = req.uid;
        const id = req.params.id;

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){

            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario en BD'
            });
        }
        
        if(usuarioDB.role === 'ADMIN_ROLE' || id === uid){

            next();
        } else {
            return res.status(404).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
            
        }
        
        

        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}