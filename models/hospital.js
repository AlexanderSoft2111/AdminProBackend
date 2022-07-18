const {Schema, model} = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        // Referencia para indicar la relación con la colección Usuario
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
}, { collection: 'hospitales'});

//Metodo para cambiar visualmente la propiedad devuelta
HospitalSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();

    return object;
})

module.exports = model('Hospital', HospitalSchema);