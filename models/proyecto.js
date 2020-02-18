var mongoose = require('mongoose');
//var PersonalSchema = require('./Personal');


const PersonalSchema = new mongoose.Schema({
    Tipo: String,
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

const RespuestoSchema  = new mongoose.Schema({
    Elemento: String,
    Cantidad: Number,
    Medida: String
});

const ProjectSchema = new mongoose.Schema({
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
    Preventivos: PreventivoSchema,
    Correctivos: CorrectivoSchema,
    Personal: [PersonalSchema],
    Repuestos : [RespuestoSchema]
});


var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;