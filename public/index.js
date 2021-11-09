const socket = io();

socket.on('productCatalog', (data) => renderprods(data));

let renderprods = (data) => {
    if (data.products.length > 0) {
        let table =`
        <table>
            <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Thumbnail</th>
            </tr>`;
        let html = data.products.map(e => `
            <tr>
                <td>${e.title}</td>
                <td>$ ${e.price}</td>
                <td><img src="${e.thumbnail}" width="50" height="33"></td>
            </tr>`
        ).join(' ');
        document.getElementById('table').innerHTML = table + html + `</table>`;
        document.getElementById('productCatalog').innerHTML = '';
    } else {
        let html = `<div class="error" style="padding:2em;text-align:center">No hay productos</div>`;
        document.getElementById('productCatalog').innerHTML = html;
    }
}


function createProd(form) {
    console.log("Nuevo producto agregado!");
    let newProduct = {
        title: document.getElementById('title').value,
        price: parseFloat(document.getElementById('price').value),
        thumbnail: document.getElementById('thumbnail').value
    }
    document.getElementById('title').value = "";
    document.getElementById('price').value = "";
    document.getElementById('thumbnail').value = "";
    socket.emit('newProduct', newProduct)
    return false;
}

function login(form) {
    console.log("Nuevo login!");
    let name = document.getElementById('name').value;
    console.log(name);
    socket.emit('Ingresar', name);
    return false;
}

socket.on('mensajes', (data) => render(data));

let render = (data) => {
    console.log(data);
    let html = data.map((e,i)=>`
        <div>
            <img src="${e.author.avatar}" width="50" height="33"></td>
            <strong class="bluetext">${e.author.email}</strong>
            <span class="browntext">[${e.fecha}]: </span>
            <em class="greentext">${e.texto}</em>
        </div>
    `).join(' ');
    document.getElementById("mensajes").innerHTML = html;
}

function enviarMensaje(e){
    let fecha = new Date();
    fecha = fecha.toLocaleString('es-AR');
    let envio = {
        author: {
            email: document.getElementById('usuario').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        texto: document.getElementById('texto').value,
        fecha: fecha,
    }
    console.log(envio);
    document.getElementById('usuario').disabled = true;
    document.getElementById('texto').value = '';
    document.getElementById('divnombre').remove();
    document.getElementById('divapellido').remove();
    document.getElementById('divedad').remove();
    document.getElementById('divalias').remove();
    document.getElementById('divavatar').remove();
    socket.emit('nuevo-mensaje', envio);
    return false;
}