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


/* =========================
   LISTADO DE PRODUCTOS
   ========================= */

const contenedorProductos = document.getElementById("lista-productos");

if (contenedorProductos) {

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
}


/* =========================
   FUNCIÓN CARRITO TEMPORAL
   ========================= */

function agregarAlCarrito(idProducto) {

    const productoEncontrado = productos.find(function(producto) {
        return producto.id === idProducto;
    });

    console.log("Producto seleccionado:", productoEncontrado);
}


/* =========================
   DETALLE DEL PRODUCTO
   ========================= */

const contenedorDetalle = document.getElementById("contenido-detalle");

if (contenedorDetalle) {

    const parametros = new URLSearchParams(window.location.search);

    const idProducto = Number(parametros.get("id"));

    const productoSeleccionado = productos.find(function(producto) {
        return producto.id === idProducto;
    });

    if (productoSeleccionado) {

        contenedorDetalle.innerHTML = `
            <img
                src="${productoSeleccionado.imagen}"
                alt="${productoSeleccionado.nombre}"
            >

            <div>
                <h2>${productoSeleccionado.nombre}</h2>

                <p>
                    Producto disponible en nuestra tienda online.
                </p>

                <h3>
                    $${productoSeleccionado.precio.toLocaleString("es-CL")}
                </h3>

                <button onclick="agregarAlCarrito(${productoSeleccionado.id})">
                    Añadir al carrito
                </button>
            </div>
        `;

    } else {

        contenedorDetalle.innerHTML = `
            <h2>Producto no encontrado</h2>

            <p>
                El producto solicitado no existe.
            </p>
        `;
    }
}