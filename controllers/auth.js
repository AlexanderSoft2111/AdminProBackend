const { response } = require("express");
const bcrypt = require('bcrypt');

const Usuario = require("../models/usuario");
const { generarToken } = require("../helpers/jwt");

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

module.exports = {
    login
}