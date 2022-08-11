const baseDeDatos = [
    {
        id: 1,
        nombre: 'Coconut',
        precio: 4100,
        imagen: 'Coconut.webp'
    },
    {
        id: 2,
        nombre: 'Vanilla',
        precio: 4500,
        imagen: 'Vanilla.webp'
    },
    {
        id: 3,
        nombre: 'Citric',
        precio: 3800,
        imagen: 'Citric.webp'
    },
    {
        id: 4,
        nombre: 'Bubblegum',
        precio: 3300,
        imagen: 'Bubblegum.webp'
    },
    {
        id: 5,
        nombre: 'Lavander',
        precio: 3300,
        imagen: 'Lavander.webp'
    },
    {
        id: 6,
        nombre: 'Wonderlust',
        precio: 3500,
        imagen: 'Wonderlust.webp'
    },
    {
        id: 7,
        nombre: 'Pomegrade',
        precio: 2000,
        imagen: 'Pomegrade.webp'
    },
    {
        id: 8,
        nombre: 'Coconut XL',
        precio: 8100,
        imagen: 'Coconut XL.webp'
    },
    {
        id: 9,
        nombre: 'Vanilla XL',
        precio: 8200,
        imagen: 'Vanilla XL.webp'
    },
    {
        id: 10,
        nombre: 'Citric XL',
        precio: 4800,
        imagen: 'Citric XL FOTOPRODUCTO.webp'
    },
    {
        id: 11,
        nombre: 'Bubblegum XL',
        precio: 4300,
        imagen: 'Bubblegum XL.webp'
    },
    {
        id: 12,
        nombre: 'Lavander XL',
        precio: 5000,
        imagen: 'Foto-lavander.webp'
    },
    {
        id: 13,
        nombre: 'Wonderlust XL',
        precio: 4500,
        imagen: 'wonderlust XL.webp'
    },
    {
        id: 14,
        nombre: 'Pomegrade XL',
        precio: 4300,
        imagen: 'Pomegrade-XL.webp'
    },
    {
        id: 15,
        nombre: 'Coconut XXL',
        precio: 10200,
        imagen: 'Coconut XXL.webp'
    },
    {
        id: 16,
        nombre: 'Vanilla XXL',
        precio: 10500,
        imagen: 'Vanilla-XXL.webp'
    },
    {
        id: 17,
        nombre: 'Citric XXL',
        precio: 8200,
        imagen: 'Citric XXL.webp'
    },
    {
        id: 18,
        nombre: 'Bubblegum XXL',
        precio: 8500,
        imagen: 'Bubblegum XXL.webp'
    }

];

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones

function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    renderizarCarrito();

}

function renderizarCarrito() {
    DOMcarrito.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    DOMtotal.textContent = calcularTotal();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    renderizarCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}


function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();
