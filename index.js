const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');
const app = express();

//Configurar cors
app.use(cors());

//Conectando con la BD
dbConnection();

//rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    });
})

//mean_admin
//E4bzGrlFooLUJVYA

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
});