const { response } = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req, res = response) => {

   const tipo = req.params.tipo;
    const id = req.params.id;

    //Validar colecciones validas
    const tiposValidos = ['usuarios','medicos','hospitales']
    if( !tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: 'No es un usuario, medico u hospital'
        });
    }

    //Validar si no envian ningun archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No existen archivos'});
      } 
    
    //Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar Extensiones
    const extencionesValidas = ['JPG','jpg','jpeg','gif','png'];
    if( !extencionesValidas.includes(extensionArchivo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión válida'
        });
    }

    //nombre Archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //Guardar archivo
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
              ok: false,
              msg: 'No se pudo guardar el archivo'
          });
        }

        //Actualizar imagen
        actualizarImagen(nombreArchivo, tipo, id);
    
        res.json({
            ok: true,
            msg: 'Se guardo el archivo',
            nombreArchivo
        });
    
    });

}

const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImagen = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //Revisar si existe la imagen
    if( fs.existsSync(pathImagen) ){
        res.sendFile(pathImagen);
    } else {
        const pathImagen = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImagen);   
    }
}

module.exports = {
    fileUpload,
    retornaImagen
}