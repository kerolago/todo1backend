const mongoose = require('mongoose');
const model = require('../models/producto');
const express = require('express');
const fs = require('fs-extra');
const path = require('path');

//GET
exports.get = (req, res) => {
    model.find(req.params.id)
        .sort({ nombre: 1, descrpcion: 1, entrada: 1, sallida: 1, estado: 1, precio: 1, categoria: 1 })
        .select('_id nombre descripcion entrada salida estado precio categoria')
        .exec()
        .then(result => {
            console.log(result);

            if (result) {
                res.status(200).json({
                    modelo: result,
                    filas: result.length,
                    error_estado: false,
                    error: '',
                    mensaje: 'ok'
                });
            } else {
                res.status(404).json({
                    model: null,
                    filas: 0,
                    error_estado: false,
                    error: '',
                    mensaje: '!NO EXISTE DATOS!'
                });
            }
        })
        .catch(ex => {
            console.log(ex);
            res.status(500).json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: ex,
                mensaje: '!ERROR¡'
            });
        });
}


exports.getId = (req, res) => {
        model.findOne({
                _id: req.params.id
            })
            .sort({ nombre: 1, descrpcion: 1, entrada: 1, sallida: 1, estado: 1, precio: 1, categoria: 1 })
            .select('_id nombre descripcion entrada salida estado precio categoria')
            .exec()
            .then(result => {
                if (result) {
                    res.status(200).json({
                        modelo: result,
                        filas: 1,
                        error_estado: false,
                        error: '',
                        mensaje: '!OK¡'
                    });
                } else {
                    res.status(204).json({
                        modelo: null,
                        filas: 0,
                        error_estado: false,
                        error: '',
                        mensaje: '!NO EXISTE DATOS¡'
                    });
                }
            })
            .catch(ex => {
                console.log(ex);

                res.status(500).json({
                    modelo: null,
                    filas: 0,
                    error_estado: true,
                    error: ex,
                    mensaje: '!ERROR¡'
                });
            });
    }
    //POST
exports.post = (req, res) => {
        const Model = new model({
            _id: new mongoose.Types.ObjectId,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            entrada: req.body.entrada,
            salida: req.body.salida,
            estado: req.body.estado,
            precio: req.body.precio,
            categoria: req.body.categoria
        });

        console.log('----- model', Model);

        Model.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    modelo: {
                        _id: Model._id,
                        nombre: Model.nombre,
                        descripcion: Model.descripcion,
                        entrada: Model.entrada,
                        salida: Model.salida,
                        estado: Model.estado,
                        categoria: Model.categoria
                    },
                    filas: 1,
                    error_estado: false,
                    error: '',
                    mensaje: '!REGISTRO ADICIONADO¡'

                });
            })
            .catch(ex => {
                res.status(500).json({
                    modelo: null,
                    filas: 0,
                    error_estado: true,
                    error: ex,
                    mensaje: '!ERROR¡'
                });
            });
        console.log('SALIDA DEL POST');

    }
    //PATCH
exports.patch = (req, res) => {
    model.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        .exec()
        .then(result => {
            console.log(result);

            res.status(200).json({
                modelo: result,
                filas: 1,
                error_estado: false,
                error: '',
                mensaje: '!REGISTRO ACTUALIZADO¡'
            });
        })
        .catch(ex => {
            console.log(ex);
            res.status(500).json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: ex,
                mensaje: '!ERROR¡'
            })
        })
}

//DELETE
exports.delete = (req, res) => {
    model.remove({
            _id: req.params.id
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                modelo: null,
                filas: 0,
                error_estado: false,
                error: '',
                mensaje: '!REGISTRO ELIMINADO¡'
            });
        })
        .catch(ex => {
            console.log(ex);
            res.status(500).json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: '',
                mensaje: '!ERROR¡'
            });
        })
}
exports.uploadImage = (req, res) => {
    if (req.files) {
        var filePath = req.files.archivo.path;
        var fileSplit = filePath.split('/');
        var fileName = fileSplit[1];
        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];
        var nombreOriginal = req.files.archivo.originalFilename;

        if (fileExt == 'png' ||
            fileExt == 'PNG' ||
            fileExt == 'jpg' ||
            fileExt == 'JPG' ||
            fileExt == 'webp' ||
            fileExt == 'jpeg' ||
            fileExt == 'bmp' ||
            fileExt == 'tiff' ||
            fileExt == 'tif' ||
            fileExt == 'gif' ||
            fileExt == 'bitmap' ||
            fileExt == 'svg') {

            const Model = new model({
                _id: new mongoose.Types.ObjectId,
                nombre1: fileName,
                nombreOriginal: nombreOriginal,
                ext: fileExt,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                entrada: req.body.entrada,
                salida: req.body.salida,
                estado: req.body.estado,
                precio: req.body.precio,
                categoria: req.body.categoria



            });
            console.log('--- model'.Model);
            Model.save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        modelo: Model,
                        filas: 1,
                        error_estado: false,
                        mensaje: '!REGISTRO ADICIONADO¡'
                    });
                })
                .catch(ex => {
                    res.status(500).json({
                        modelo: null,
                        filas: 0,
                        error_estado: true,
                        error: ex,
                        mensaje: '!ERRROR¡'
                    });
                });

        } else {
            fs.unlink(filePath, () => {
                res.status(201).json({
                    modelo: null,
                    filas: 0,
                    error_estado: false,
                    error: '',
                    mensaje: '!LA EXTENCION DEL ARCHIVO NO ES VALIDA¡'
                });
            });
        }

    } else {
        res.status(202).json({
            modelo: null,
            filas: 0,
            error_estado: false,
            error: '',
            mensaje: '!NO SE HA CARGADO EL ARCHIVO¡'
        });
    }

}
exports.getimage = (req, res) => {
    var file = req.params.archivo;
    var path_file = './uploads/' + file;
    fs.exists(path_file, function(exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(404).send({ message: 'LA IMAGEN NO EXISTE' });
        }
    });
}