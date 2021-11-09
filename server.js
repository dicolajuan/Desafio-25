//import { Archivo } from './Archivo.js';

const express = require('express');
const handlebars = require('express-handlebars');
const { insertDocuments, readDocuments } = require('./Controllers/functionsCRUD-Mongo.js');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const {normalizar, desnormalizar} = require('./normalizador');
const session = require('express-session');

const objProductos = [];
const objMensajes = [];

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 10000 }
}));

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: "./views/layouts",
        partialsDir: "./views/partials"
    })
);
    
app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'hbs'); // registra el motor de plantillas

http.listen(3030, async () => {
    

    let productosMongo = await readDocuments('producto');
    productosMongo.forEach(prod => {
        objProductos.push(prod);
    });

    let mensajesMongo = await readDocuments('mensajes');
    mensajesMongo.forEach(mens => {
        objMensajes.push(mens);
    });

    console.log('escuchando desde servidor. Puerto: 3030')} )


io.on ('connection', async (socket) => {
    console.log('Usuario conectado');

    socket.emit('productCatalog', { products: objProductos});
    socket.on('newProduct', async (data) => {
        insertDocuments(data,'producto');
        objProductos.push(data);
        normalizar(data);
        io.sockets.emit('productCatalog', { products: objProductos});
    });

    socket.on('login', async (data) => {
        console.log('object');
        window.location.href = "/listPoducts";
    });

    socket.emit('mensajes', objMensajes);
    socket.on('nuevo-mensaje', async (data)=>{
        insertDocuments(data,'mensaje');
        objMensajes.push(data);
        normalizar(data);
        io.sockets.emit('mensajes', objMensajes);
    });

});

app.get('/', (req,res)=>{
    res.render('login');
});

app.post('/login', (req,res) => {
    console.log('/login',req.body);
    req.session.user=req.body.userName;
    console.log('SESSION: ', req.session);
    if(req.session.user || req.session.user != ''){
        res.redirect('/listProducts');
    } else {
        res.redirect('/');
    }
});

app.get('/logout', (req,res) => {
    res.clearCookie('user');
    req.session.destroy()
    res.redirect('/');
});

app.get('/listProducts', (req,res)=>{
    //req.session.cookie.maxAge = 20000;
    console.log(req.session);
    if(req.session.user){
        res.render('products', { products: objProductos, userName: req.session.user});
    } else {
        res.redirect('/');
    }
});
