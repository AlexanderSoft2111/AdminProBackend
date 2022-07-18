const {Schema, model} = require('mongoose');

const MedicoSchema = Schema({
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
    },
    hospital: {
        // Referencia para indicar la relación con la colección Hospital
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
});

//Metodo para cambiar visualmente la propiedad devuelta
MedicoSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();

    return object;
})

module.exports = model('Medico', MedicoSchema);