const {normalize, schema} = require('normalizr');

const authorSchema = new schema.Entity('author',{},{idAttribute: 'email'});

const mensajeSchema = new schema.Entity('mensaje',{
     author: authorSchema
}, {idAttribute: 'fecha'});

const normalizar = (mensaje) => {
    let normalizedMensaje = normalize(mensaje, mensajeSchema);
    longAntes = JSON.stringify(mensaje).length;
    longDespues = JSON.stringify(normalizedMensaje).length;
    console.log('Longitud antes de normalizar:', longAntes);
    console.log('Longitud después de normalizar:', longDespues);
    console.log('Compresión:', `${Math.trunc((1 - (longDespues / longAntes)) * 100)} %`);
    return normalizedMensaje;
}

const desnormalizar = (normalizedMensaje) => {
    return denormalizedMensaje = denormalize(normalizedMensaje.result, mensajeSchema, normalizedMensaje.entities);;
}

module.exports = {
    normalizar,
    desnormalizar
}
