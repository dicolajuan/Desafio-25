const {Producto} = require('../Models/productos');
const {Mensaje} = require('../Models/mensajes');
const {connectDB, closeDB} = require('../MongoDB/conecctionMongo');


const insertDocuments = async (obj,collection) => {
    await connectDB();
    collection == 'producto' ? await Producto.insertMany(obj) : await Mensaje.insertMany(obj)
    //await Producto.insertMany({title:'new product 2', price:100,thumbnail: 'images'});
    await closeDB();
}

const readDocuments = async (collection) => {
    await connectDB();
    let arrayDocuments = collection == 'producto' ? await Producto.find({},{_id:0, __v:0}) : await Mensaje.find({},{_id:0, __v:0});
    //await Producto.insertMany({title:'new product 2', price:100,thumbnail: 'images'});
    await closeDB();
    return arrayDocuments;
}

module.exports = { insertDocuments, readDocuments };
