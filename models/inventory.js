var mongoose = require('mongoose');

var InsumoSchema = new mongoose.Schema({
    Item: String,
    Stored: Number,
    Cost : Number
});

var RepuestoSchema = new mongoose.Schema({
    Item: String,
    ListPrice: Number,
    UnitCost:  Number,
    SolCost: Number,
    Stock: Number
});

var EquipoSchema = new mongoose.Schema({
    Item: String,
    Cost: Number
});

const InventorySchema = new mongoose.Schema({
    Insumos: [InsumoSchema],
    Repuestos: [RepuestoSchema],
    Equipos: [EquipoSchema]
});

var Inventario = mongoose.model('Inventory', InventorySchema);
var Insumo = mongoose.model('Insumo', InsumoSchema);
var Repuesto = mongoose.model('Repuesto', RepuestoSchema);
var Equipo = mongoose.model('Equipo', EquipoSchema);

module.exports = {Inventario, Insumo, Repuesto, Equipo};