const mongoose = require('mongoose');

const modelo = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre1: {
        type: String,
        require: true
    },
    nombreOriginal: {
        type: String,
        require: true
    },
    ext: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    precio: {
        type: String,
        require: true
    },
    entrada: {
        type: String,
        require: true
    },
    salida: {
        type: String,
        require: true
    },
    estado: {
        type: String,
        require: true
    },
    categoria: {
        type: String,
        require: true
    }
});
module.exports = mongoose.model('producto', modelo);