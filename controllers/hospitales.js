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

    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const hospital = await Hospital.findById(id);

        if(!hospital){

            return res.status(404).json({
                ok: false,
                msg: 'No existe el hospital con ese Id'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true } );
        
        res.json({
            ok: true,
            msg: 'actualizar Hospital',
            hospital: hospitalActualizado
        });
    
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const borrarHospitales = async(req, res = response) => {

    const id  = req.params.id;

    try {
        
        const hospital = await Hospital.findById(id);

        if(!hospital){

            return res.status(404).json({
                ok: false,
                msg: 'No existe el hospital con ese Id'
            });
        }

        await Hospital.findByIdAndDelete(id);
        
        res.json({
            ok: true,
            msg: 'Hospital Eliminado',
        });
    
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospitales
}