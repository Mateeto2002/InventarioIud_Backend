
const { Schema, model } = require('mongoose');

const InventarioSchema = new Schema({

    serial: {type: String, require: true, unique: true},
    modelo: {type: String, require: true},
    foto: { type: String, require: true},
    descripcion: {type: String, require: true},
    color: {type: String, require: true},
    fecha_compra: { type: String, require: true},
    precio: {type: Number, require: true},

    
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', require: true},
    marca: { type: Schema.Types.ObjectId, ref: 'Marca', require: true},
    estado_equipo: { type: Schema.Types.ObjectId, ref: 'EstadoEquipo', require: true},
    tipo_equipo: { type: Schema.Types.ObjectId, ref: 'TipoEquipo', require: true}

});

module.exports = model('Inventario', InventarioSchema);