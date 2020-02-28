var mongoose = require('mongoose');

const OrdenSchema = new mongoose.Schema({
    alv: String
});

var OrderModel = mongoose.model('Orden', OrdenSchema);

module.exports = {
    OrderModel
};