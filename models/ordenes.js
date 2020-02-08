var mongoose = require('mongoose');

const TimeSchema = new mongoose.Schema({
    Horas: Number,
    Minutos: Number,
    Segundos: Number
});

const PersonalSchema = new mongoose.Schema({
    Identificador: String,
    Costo: Number,
    Utilidad: Number,
    Valor: Number
});

const PreventivoSchema = new mongoose.Schema({
    Cantidad: Number,
    HorasxPreventivo : [TimeSchema],
    HorasxPreventivoAnual : [TimeSchema],
    HorasPerdidas : [TimeSchema],
    HorasxCambio: [TimeSchema]
});

const CorrectivoSchema = new mongoose.Schema({
    Cantidad: Number,
    HorasxCorrectivo : [TimeSchema],
    HorasxRepuesto: [TimeSchema],
    HorasPerdidas: [TimeSchema]
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
    personal: [{PersonalSchema}]
});

PersonalSchema.pre('save', next => {
    var personal = this;
    personal.Utilidad = personal.Costo * 0.5;
    personal.Valor = personal.Costo * 1.5;
    next();
});

var Orden = mongoose.model('Orden', orderSchema);

module.exports = Orden;