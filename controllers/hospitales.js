const {response} = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find()
                                     .populate('usuario', 'nombre email img'); //para mostrar el nombre y el email del usuario en la consulta

    res.json({
        ok: true,
        hospitales
    });
}
const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {
        
        const hospitalDB = await hospital.save();      
        
        res.json({
            ok: true,
            hospitalDB
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const actualizarHospital = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualziar Hospital'
    });
}
const borrarHospitales = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrar Hospitales'
    });
}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospitales
}