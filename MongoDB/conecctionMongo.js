const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/ecommerce';

const connectDB = async () =>{
    await mongoose.connect(URI, 
        { 
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 1000
        })
    console.log('Conectado a la base de datos...');
}

const closeDB = async () => {
    await mongoose.connection.close();
}

module.exports = {
    connectDB,
    closeDB
}
