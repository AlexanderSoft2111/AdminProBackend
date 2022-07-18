const fs  = require('fs');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');

const borrarImagen = (path) => {
    //Si existe lo borramos
    if( fs.existsSync(path) ){
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async(nombre, tipo, id) => {
    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            //buscamos el medico por el ID
            const medico = await Medico.findById(id);
            if(!medico){
                console.log('No es un médico por ID');
                return false;
            }

            //Construimos el path en donde esta guardado el archivo
            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);
            
            //Guardamos la nueva propiedad del objeto
            medico.img = nombre;
            await medico.save();
            return true;
        break;

        case 'hospitales':
            //buscamos el medico por el ID
            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log('No hay un hospital por ese ID');
                return false;
            }

            //Construimos el path en donde esta guardado el archivo
            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);
            
            //Guardamos la nueva propiedad del objeto
            hospital.img = nombre;
            await hospital.save();
            return true;
        break;

        case 'usuarios':
            //buscamos el medico por el ID
            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('No es un usuario por ID');
                return false;
            }

            //Construimos el path en donde esta guardado el archivo
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            
            //Guardamos la nueva propiedad del objeto
            usuario.img = nombre;
            await usuario.save();
            return true;
        break;
    
        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}