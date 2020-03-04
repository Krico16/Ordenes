var mongoose = require('mongoose');
var autoIncrement = require('./Utils/autoIncrement');

const OrdenSchema = new mongoose.Schema({
    Codigo : {
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
    if(!this.isNew){
        next();
        return;
    }

    autoIncrement('Ordenes', this, next);
});


var OrderModel = mongoose.model('Orden', OrdenSchema);

module.exports = {
    OrderModel
};