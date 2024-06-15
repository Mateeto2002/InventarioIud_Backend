const { Schema, model } = require('mongoose');

const TipoEquipoSchema = new Schema({

    nombre: {type: String, require: true},
    estado: {type: String, require: true, enum: ['Activo', 'Inactivo']},
    fecha_actualizacion: { type: String, require: true},
    fecha_creacion: { type: String, require: true}

});

module.exports = model('TipoEquipo', TipoEquipoSchema);

