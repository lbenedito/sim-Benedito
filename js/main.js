class Vela {
    constructor(vela) {
        this.id = vela.id;
        this.modelo = vela.modelo;
        this.precio = vela.precio;
        this.cantidad = 1;
        this.precioTotal = vela.precio;
    }

    agregarVela() {
        this.cantidad++;
    }

    actualizarPrecio() {
        this.precioTotal = this.precio * this.cantidad;
    }
}
//ARRAY
const velas = [{
    id: 0,
    modelo: 'Coconut',
    precio: 4100
},
{
    id: 1,
    modelo: 'Vanilla',
    precio: 4500

},
{
    id: 2,
    modelo: 'Citric',
    precio: 3800
},
{
    id: 3,
    modelo: 'Bubblegum',
    precio: 3300
},
{
    id: 4,
    modelo: 'Lavander"',
    precio: 3300
},
{
    id: 5,
    modelo: 'Wonderlust',
    precio: 3500

},
{
    id: 6,
    modelo: 'Pomegrade',
    precio: 2000

},
{
    id: 7,
    modelo: 'Coconut XL',
    precio: 8100
},
{
    id: 8,
    modelo: 'Vanilla XL',
    precio: 8200

},
{
    id: 9,
    modelo: 'Citric XL',
    precio: 4800
},
{
    id: 10,
    modelo: 'Bubblegum XL',
    precio: 4300
},
{
    id: 11,
    modelo: 'Lavander XL',
    precio: 5000
},
{
    id: 12,
    modelo: 'Wonderlust XL',
    precio: 4500
},
{
    id: 13,
    modelo: 'Pomegrade XL',
    precio: 4300
},
{
    id: 14,
    modelo: 'Coconut XXL',
    precio: 10200
},
{
    id: 15,
    modelo: 'Vanilla XXL',
    precio: 10500
},
{
    id: 16,
    modelo: 'Citric XXL',
    precio: 8200
},
{
    id: 17,
    modelo: 'Bubblegum XXL',
    precio: 8500
}
];

let carrito = [];
let precioTotal;

//FUNCIONES
let nombre = prompt('Hola, ingrese su nombre por favor.');

function saludo() {
    alert(`Bienvenido ${nombre}, seleccioná tus productos!!`);
}

function catalogo() {
    let listaVelas = "";

    for (const vela of velas) {
        listaVelas += `${vela.id}: ${vela.marca} $${vela.precio} \n`;
    }

    let idProducto = prompt(`Informá el número de producto que desees agregar al carrito, o escribi "FIN" para finalizar!! 
    ${listaVelas} \n`);


    while (idProducto !== "FIN") {
        let velaSeleccion = carrito.find((element) => element.id == idProducto);

        if (velaSeleccion) {
            let index = carrito.findIndex((element) => element.id === velaSeleccion.id);
            carrito[index].agregarVela();
            carrito[index].actualizarPrecio();
            alert(`Agregaste otra ${carrito[index].modelo}, al carrito!!
            Ya tenes ${carrito[index].cantidad} Unidades`);
            console.table(carrito);
        } else {
            carrito.push(new Vela(velas[idProducto]));
            alert(`Agregaste ${velas[idProducto].marca} al carrito de compras!!`);
            console.table(carrito);
        }

        idProducto = prompt(`Queres seguir comprando?? Escribi el número del producto que desees agregar al carrito o escribi "FIN" para finalizar tu compra! 
        ${listaVelas}`);
    }
}

function precioFinal() {
    let precioTotal = 0;
    for (const item of carrito) {
        precioTotal += item.precioTotal;
    }
    return precioTotal;
}

//INVOCACION DE LAS FUNCIONES
saludo();
catalogo();
precioTotal = precioFinal();

alert(`El total a pagar de tu compra es $${precioTotal}.
Muchas gracias por tu compra, que tengas un buen dia!`);
console.table(carrito);