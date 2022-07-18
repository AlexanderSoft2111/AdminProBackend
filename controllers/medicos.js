const {response} = require('express');
const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre email')
                                .populate('hospital', 'nombre');

    res.json({
        ok: true,
        medicos
    });
}
const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medicoDB
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }

}
const actualizarMedico = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualziar Medico'
    });
}
const borrarMedicos = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrar Medicos'
    });
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedicos
}