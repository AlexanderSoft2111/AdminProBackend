const mongoose = require('mongoose');

const dbConnection = async() => {
   try {
       await mongoose.connect(process.env.DB_CNN);
        console.log('BD online')
   } catch (error) {
        throw new Error('Error en la conexión revisar los Logs', error);
   }
}

module.exports = {
    dbConnection
}