const cards = document.getElementById('cards')
const elementos = document.getElementById('elementos')
const footer = document.getElementById('carrito-footer')
const template = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito =document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

cards.addEventListener('click', e => {
    addCarrito(e)
})

elementos.addEventListener('click', e =>{
    btnAccion(e)
})

const fetchData = async () => {
    try {
        const res = await fetch ('productos.json')
        const objeto = await res.json()
        pintarCards(objeto)
        addCarrito(objeto)
    } catch (error) {
        console.log(error)
    }
}

const pintarCards = data => {

   data.forEach(producto => {
       console.log(producto)
       template.querySelector('img').setAttribute("src", producto.thumbnailUrl)
       template.querySelector('h5').textContent = producto.nombre
       template.querySelector('p span').textContent = producto.precio
       template.querySelector('button').dataset.id = producto.id


       const clone = template.cloneNode(true)
       fragment.appendChild(clone)
       cards.appendChild(fragment)
   })
   
}

const addCarrito = e => {
    if (e.target.classList.contains('btn-primary')){

        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = (objeto) => {
     const producto= {
         id: objeto.querySelector('.btn-primary').dataset.id,
         nombre: objeto.querySelector('h5').textContent,
         precio: objeto.querySelector('p').textContent,
         cantidad: 1
     }

     if(carrito.hasOwnProperty(producto.id)){
         producto.cantidad = carrito[producto.id].cantidad + 1
     }

     carrito[producto.id] = {...producto}
}

const pintarCarrito = () =>{
    elementos.InnerHTML = ''
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
        elementos.appendChild(fragment)
        pintarFooter()
    })
    
    
}

const pintarFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0){
        footer.innerHTML = '<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>' 
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio,0)
    
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito ={}
        pintarCarrito()
    })
}

const btnAumentarDisminuir = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()
}