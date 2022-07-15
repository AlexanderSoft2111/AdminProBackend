const {response} = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');
const { generarToken } = require("../helpers/jwt");


const getUsuarios = async(req, res = response) => {
    
    const usuarios = await Usuario.find({}, 'nombre email');

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    });
}

const crearUsuario = async(req, res = response) => {

    const {email, password} = req.body;

    try {

        const existeCorreo = await Usuario.findOne({email});
        
        if(existeCorreo){

            return res.json({
                ok: false,
                msg: 'El correo ya se encuentra registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
    
        await usuario.save();

        //Generar JWT
        const token = await generarToken(Usuario.id);
    
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
    
}

const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {
        
        const ususarioBD = await Usuario.findById(uid);

        if(!ususarioBD){
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe en la BD'
            });
        }

        const {password, google, email,...campos} = req.body;
        
        if(ususarioBD.email !== email){

            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.status(200).json({
            ok: true,
            usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
        
    }


}

const borrarUsuario = async(req, res = response) => {
    const uid = req.params.id;

    try {

        const ususarioBD = await Usuario.findById(uid);

        if(!ususarioBD){
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe en la BD'
            });
        }

       await Usuario.findByIdAndDelete(uid);
        
        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
        
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}