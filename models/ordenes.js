var mongoose = require('mongoose');

const PreventivoSchema = new mongoose.Schema({
    Cantidad: Number,
    HorasxPreventivo : Date,
    HorasxPreventivoAnual : Date,
    HorasPerdidas : Date,
    HorasxCambio: Date
});

const CorrectivoSchema = new mongoose.Schema({
    Cantidad: Number,
    HorasxCorrectivo : Date,
    HorasxRepuesto: Date,
    HorasPerdidas: Date
});

const orderSchema = new mongoose.Schema({
    Nombre: {
        type: String,
        required: true,
        trim: true
    },
    Cliente: {
        type: String,
        trim: true
    },
    Equipos: {
        type: Number
    },
    Preventivos: [PreventivoSchema],
    Correctivos: [CorrectivoSchema],
    Tecnicos: Number,
    Supervisor: Number,
    Jefe: Number
});

var Orden = mongoose.model('Orden', orderSchema);

module.exports = Orden;