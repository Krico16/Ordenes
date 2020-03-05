var mongoose = require('mongoose');
var autoIncrement = require('./Utils/autoIncrement');

const DatosSchema = new mongoose.Schema({
    FichaTecnica: {
        type: String
    },
    InformeTecnico: {
        type: String
    }
});

const OrdenSchema = new mongoose.Schema({
    Codigo: {
        type: Number,
        unique: true,
        min: 1
    },
    Tipo: {
        type: String,
        enum: ['CORRECTIVO1', 'CORRECTIVO2', 'PREVENTIVO'],
        default: 'PREVENTIVO'
    },
    Creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    Motivo: {
        type: String
    },
    Equipo: String,
    Posicion: String,
    Datos: Array,
    Estado: {
        type: String,
        enum: ['PENDIENTE', 'NO ATENDIDO', 'ATENDIDO']
    },
    Cierre: {
        type: Date
    }
}, {
    timestamps: {
        createdAt: 'Creado',
        updatedAt: 'Modificado'
    }
});

OrdenSchema.pre('save', (next) => {
    if (!this.isNew) {
        next();
        return;
    }

    autoIncrement('Ordenes', this, next);
});


var OrderModel = mongoose.model('Orden', OrdenSchema);

module.exports = {
    OrderModel
};