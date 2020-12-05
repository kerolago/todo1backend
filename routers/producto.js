const express = require('express');
const controller = require('../controller/producto');
const api = express.Router();
const multipart = require('connect-multiparty');

var md_upload = multipart({ uploadDir: './uploads' });
const md_auth = require('../middleware/autenticate');
api.get('/', md_auth.ensureAuth, controller.get);
api.get('/:id', md_auth.ensureAuth, controller.getId);
api.post('/', md_upload, controller.uploadImage);
api.patch('/:id', md_auth.ensureAuth, controller.patch);
api.delete('/:id', md_auth.ensureAuth, controller.delete);
api.get('/image/:archivo', controller.getimage);

module.exports = api;