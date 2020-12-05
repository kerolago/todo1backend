const mongoose = require('mongoose');

const modelo = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    fecha: {
        type: Date,
        require: true
    },
    estado: {
        type: String,
        requie: true
    }

});
module.exports = mongoose.model('compras', modelo);