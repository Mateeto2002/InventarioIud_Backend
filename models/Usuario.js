const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({

    nombre: {type: String, require: true},
    email: {type: String, require: true},
    password: { type: String, require: true},
    estado: {type: String, require: true, enum: ['Activo', 'Inactivo']},
    fecha_actualizacion: { type: String, require: true},
    fecha_creacion: { type: String, require: true}


    //  Falta el rol aqui y el router
});

module.exports = model('Usuario', UsuarioSchema);