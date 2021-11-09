let mongoose = require('mongoose');
const productosCollection = 'productos';

const ProductoEsquema = mongoose.Schema({
    title: {type: String, require: true, minLength: 3, maxLenghth: 30},
    price: {type: Number, require: true, min: 0, max: 9999999},
    thumbnail: {type: String, require: true, minLength: 1, maxLenghth: 500},
});

const Producto = mongoose.model(productosCollection, ProductoEsquema);

module.exports = { Producto };
