/* =========================
   CONFIGURACIÓN DE LA API
   ========================= */

const API_URL = "http://localhost:3000/api/productos";

let productos = [];


/* =========================
   CARGAR PRODUCTOS DESDE BACKEND
   ========================= */

async function cargarProductos() {

    try {

        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener los productos");
        }

        productos = await respuesta.json();

        // Asignar imágenes según ID
        productos = productos.map(function(producto) {

            const imagenes = {
                1: "img/mouse.jpg.png",
                2: "img/teclado.jpg.png",
                3: "img/audifonos.jpg.png",
                4: "img/monitor.jpg.png",
            };

            producto.imagen =
                producto.imagen ||
                imagenes[producto.id] ||
                "img/sin-imagen.png";

            return producto;
        });

        mostrarProductos();
        mostrarDetalleProducto();

    } catch (error) {

        console.error("Error al cargar productos:", error);

        const contenedor = document.getElementById("lista-productos");

        if (contenedor) {
            contenedor.innerHTML = `
                <p>
                    No fue posible cargar los productos.
                    Verifica que el servidor esté encendido.
                </p>
            `;
        }
    }
}


/* =========================
   LISTADO DE PRODUCTOS
   ========================= */

function mostrarProductos() {

    const contenedorProductos =
        document.getElementById("lista-productos");

    if (!contenedorProductos) {
        return;
    }

    contenedorProductos.innerHTML = "";

    productos.forEach(function(producto) {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("producto");

        tarjeta.innerHTML = `
            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
            >

            <h3>${producto.nombre}</h3>

            <p>
                $${producto.precio.toLocaleString("es-CL")}
            </p>

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
   CARRITO
   ========================= */

function agregarAlCarrito(idProducto) {

    const productoEncontrado =
        productos.find(function(producto) {
            return producto.id === idProducto;
        });

    if (!productoEncontrado) {

        alert("Producto no encontrado");

        return;
    }

    let carrito =
        JSON.parse(localStorage.getItem("carrito")) || [];

    const productoEnCarrito =
        carrito.find(function(producto) {
            return producto.id === idProducto;
        });

    if (productoEnCarrito) {

        productoEnCarrito.cantidad += 1;

    } else {

        carrito.push({
            id: productoEncontrado.id,
            nombre: productoEncontrado.nombre,
            precio: productoEncontrado.precio,
            imagen: productoEncontrado.imagen,
            cantidad: 1
        });
    }

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    alert("Producto añadido al carrito");
}


/* =========================
   DETALLE DEL PRODUCTO
   ========================= */

function mostrarDetalleProducto() {

    const contenedorDetalle =
        document.getElementById("contenido-detalle");

    if (!contenedorDetalle) {
        return;
    }

    const parametros =
        new URLSearchParams(window.location.search);

    const idProducto =
        Number(parametros.get("id"));

    const productoSeleccionado =
        productos.find(function(producto) {
            return producto.id === idProducto;
        });

    if (productoSeleccionado) {

        contenedorDetalle.innerHTML = `
            <img
                src="${productoSeleccionado.imagen}"
                alt="${productoSeleccionado.nombre}"
            >

            <div>

                <h2>
                    ${productoSeleccionado.nombre}
                </h2>

                <p>
                    ${productoSeleccionado.descripcion ||
                    "Producto disponible en nuestra tienda online."}
                </p>

                <p>
                    <strong>Categoría:</strong>
                    ${productoSeleccionado.categoria || "Sin categoría"}
                </p>

                <p>
                    <strong>Stock:</strong>
                    ${productoSeleccionado.stock}
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


/* =========================
   INICIAR
   ========================= */

cargarProductos();