const { Schema, model } = require('mongoose');

const MarcaSchema = new Schema({

    nombre: {type: String, require: true},
    estado: {type: String, require: true, enum: ['Activo', 'Inactivo']},
    fecha_actualizacion: { type: String, require: true},
    fecha_creacion: { type: String, require: true}

});

module.exports = model('Marca', MarcaSchema);