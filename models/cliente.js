const mongoose = require('mongoose');

const modelo = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: {
        type: String,
        require: true
    },
    direccion: {
        type: String,
        require: true
    },
    telefono: {
        type: String,
        require: true
    }
});
module.exports = mongoose.model('cliente', modelo);