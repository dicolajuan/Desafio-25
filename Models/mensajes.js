let mongoose = require('mongoose');
const mensajesCollection = 'mensajes';

const MensajeEsquema = mongoose.Schema({
    author: {type: Object},
    // nombre: {type: String, require: true, minLength: 3, maxLenghth: 50},
    // apellido: {type: String, require: true, minLength: 3, maxLenghth: 50},
    // edad: {type: Number, require: true, min: 13, max: 110},
    // alias: {type: String, require: true, minLength: 3, maxLenghth: 50},
    // avatar : {type: String, require: true, minLength: 3, maxLenghth: 50},
    //email: {type: String, require: true, minLength: 3, maxLenghth: 50},
    fecha: {type: String, require: true},
    texto: {type: String, require: true, unique: true, minLength: 1, maxLenghth: 200},
});

const Mensaje = mongoose.model(mensajesCollection, MensajeEsquema);

module.exports = { Mensaje };