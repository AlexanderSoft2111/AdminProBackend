const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const { dbConnection } = require('./database/config');
const app = express();

//Configurar cors
app.use(cors());

//Carpeta publica
app.use( express.static('public'));

//Parseo y lectura del body
app.use(express.json());

//Conectando con la BD
dbConnection();

//importando rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busqueda'));
app.use('/api/uploads', require('./routes/uploads'));

//Agregar el path para que cualquier ruta que no este definida caiga en la aplicacion de angular
app.get('*', (req, res) => {
    res.sendFile( path.resolve(__dirname, 'public/index.html') );
})

//mean_admin
//E4bzGrlFooLUJVYA

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
});