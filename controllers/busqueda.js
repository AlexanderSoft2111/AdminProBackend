const { response } = require('express');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;

    //expresion regular para realizar la busqueda flexible
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({nombre: regex}),
        Medico.find({nombre: regex}),
        Hospital.find({nombre: regex})
    ]);

    res.json({
        ok: true,
        msg: 'Busqueda total',
        usuarios,
        medicos,
        hospitales
    });

}

const getDocumentColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;

    //expresion regular para realizar la busqueda flexible
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'usuarios':
              data = await Usuario.find({nombre: regex});
        break;
        
        case 'medicos':
              data = await Medico.find({nombre: regex}).populate('usuario', 'nombre').populate('hospital', 'nombre');
        break;
        
        case 'hospitales':
              data = await Hospital.find({nombre: regex}).populate('usuario', 'nombre');
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'Debe ser una colección usuarios/medicos/hospitales'
            });
    }


    res.json({
        ok: true,
        resultados: data
    });


}

module.exports = {
    getTodo,
    getDocumentColeccion
}