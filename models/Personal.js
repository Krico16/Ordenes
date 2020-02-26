var mongoose = require('mongoose');

const PersonalSchema = new mongoose.Schema({
    Identificador: String,
    Costo: Number,
    Utilidad: Number,
    Valor: Number
});

const PreventivoSchema = new mongoose.Schema({
    Cantidad: Number,
    HorasxPreventivo: Number,
    HorasxPreventivoAnual: Number,
    HorasPerdidas: Number,
    HorasxCambio: Number
});

const CorrectivoSchema = new mongoose.Schema({
    Cantidad: Number,
    HorasxCorrectivo: Number,
    HorasxRepuesto: Number,
    HorasPerdidas: Number
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
    Personal: [PersonalSchema]
});

PersonalSchema.pre('save', next => {
    var personal = this;
    personal.Utilidad = personal.Costo * 0.5;
    personal.Valor = personal.Costo * 1.5;
    next();
});

var Personal = mongoose.model('Personal', PersonalSchema);
var Preventivo = mongoose.model('Preventivo', PreventivoSchema);
var Correctivo = mongoose.model('Correctivo', CorrectivoSchema);

var Orden = mongoose.model('Orden', orderSchema);

module.exports = {Orden , Personal, Preventivo, Correctivo};
