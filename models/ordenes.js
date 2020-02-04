var mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number
    },
    valores: {
        type: Array
    },
    creacion: {
        type: Date,
        default: Date.now
    },
    direccion: String
});

var Orden = mongoose.model('Orden', orderSchema);

module.exports = Orden;