const mongoose = require('mongoose');

const modelo = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    fecha: {
        type: Date,
        require: true
    },
    id_cliente: {
        type: String,
        require: true
    }
});
module.exports = mongoose.model('venta', modelo);