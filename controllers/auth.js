const { response } = require("express");
const bcrypt = require('bcrypt');

const Usuario = require("../models/usuario");
const { generarToken } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = response) => {
    const {email, password} = req.body;

    try {

        const usuarioBD = await Usuario.findOne({email});

        if(!usuarioBD){
            return res.status(404).json({
                ok: false,
                msg: 'El email no existe en la BD'
            });
        }

        const validPass = bcrypt.compareSync(password, usuarioBD.password);

        if(!validPass){
            return res.status(404).json({
                ok: false,
                msg: 'La contraseña no es válida'
            });
        }

        //Generar JWT
        const token = await generarToken(usuarioBD.id);

        res.status(200).json({
            ok: true,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const loginGoogle = async(req, res = response) => {
    
    try {
        
        const {email, name, picture} = await googleVerify(req.body.token)

        const usuarioDB = await Usuario.findOne({email});

        let usuario;

        if(!usuarioDB){
            usuario= new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;

        }

        await usuario.save();


        const token = await generarToken(usuario.id);
    
        res.json({
            ok: true,
            email, name, picture,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    login,
    loginGoogle
}