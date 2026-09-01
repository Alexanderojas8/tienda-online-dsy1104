const productos = [
    {
        id: 1,
        nombre: "Mouse Gamer",
        precio: 19990,
        imagen: "https://via.placeholder.com/250x180?text=Mouse+Gamer"
    },
    {
        id: 2,
        nombre: "Teclado Mecánico",
        precio: 39990,
        imagen: "https://via.placeholder.com/250x180?text=Teclado"
    },
    {
        id: 3,
        nombre: "Audífonos Gamer",
        precio: 29990,
        imagen: "https://via.placeholder.com/250x180?text=Audifonos"
    },
    {
        id: 4,
        nombre: "Monitor Gaming",
        precio: 149990,
        imagen: "https://via.placeholder.com/250x180?text=Monitor"
    }
];

const contenedorProductos = document.getElementById("lista-productos");

productos.forEach(function(producto) {

    const tarjeta = document.createElement("article");

    tarjeta.classList.add("producto");

    tarjeta.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">

        <h3>${producto.nombre}</h3>

        <p>$${producto.precio.toLocaleString("es-CL")}</p>

        <a href="producto-detalle.html?id=${producto.id}">
            Ver detalle
        </a>

        <button onclick="agregarAlCarrito(${producto.id})">
            Añadir al carrito
        </button>
    `;

    contenedorProductos.appendChild(tarjeta);
});

function agregarAlCarrito(idProducto) {

    const productoEncontrado = productos.find(function(producto) {
        return producto.id === idProducto;
    });

    console.log("Producto seleccionado:", productoEncontrado);
}