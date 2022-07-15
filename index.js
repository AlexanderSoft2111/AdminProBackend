const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');
const app = express();

//Configurar cors
app.use(cors());

//Parseo y lectura del body
app.use(express.json());

//Conectando con la BD
dbConnection();

//importando rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

//mean_admin
//E4bzGrlFooLUJVYA

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
});