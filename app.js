const express = require('express');
const bodyParser = require('body-parser');

const multipart = require('connect-multiparty');



const app = express();


//RUTAS

const userRouter = require('./routers/user');
const rolRouter = require('./routers/rol');
const clienRouter = require('./routers/cliente');
const ventaRouter = require('./routers/venta');
const detventaRouter = require('./routers/detventa');
const compraRouter = require('./routers/producto');
const productoRouter = require('./routers/categoria');


//MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//CONFIGURACION CABECERAS Y CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, token,identity');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next();
})

//RUTAS BODY-PARSER

app.use('/api/user', userRouter);
app.use('/api/rol', rolRouter);
app.use('/api/cliente', clienRouter);
app.use('/api/venta', ventaRouter);
app.use('/api/detventa', detventaRouter);
app.use('/api/compra', compraRouter);
app.use('/api/producto', compraRouter);
app.use('/api/producto', productoRouter);

//HANDLING ERRORS
app.use((req, res, next) => {
    const error = new Error(' -- !NO SE ENCONTRADO EL SITIO¡----');
    error.status = 500;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            status: error.status
        }
    });
});

module.exports = app;