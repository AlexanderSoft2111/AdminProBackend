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

    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const medico = await Medico.findById(id);

        if(!medico){

            return res.status(404).json({
                ok: false,
                msg: 'No existe un médico con ese Id'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true } );
        
        res.json({
            ok: true,
            msg: 'actualizar Médico',
            medico: medicoActualizado
        });
    
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}
const borrarMedicos = async(req, res = response) => {

    const id  = req.params.id;

    try {
        
        const medico = await Medico.findById(id);

        if(!medico){

            return res.status(404).json({
                ok: false,
                msg: 'No existe un médico con ese Id'
            });
        }

        await Medico.findByIdAndDelete( id );
        
        res.json({
            ok: true,
            msg: 'Médico Eliminado'
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedicos
}