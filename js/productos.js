const API_URL = "http://localhost:3000/api/productos";

let productos = [];

function obtenerImagenProducto(producto) {
    if (producto.imagen) {
        return producto.imagen;
    }

    const imagenesPorId = {
        1: "img/mouse.jpg.png",
        2: "img/teclado.jpg.png",
        3: "img/audifonos.jpg.png",
        4: "img/monitor.jpg.png"
    };

    return imagenesPorId[producto.id] || "img/sin-imagen.png";
}

function formatearPrecio(precio) {
    return Number(precio || 0).toLocaleString(
        "es-CL",
        {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0
        }
    );
}

async function cargarProductos() {
    try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener los productos");
        }

        productos = await respuesta.json();

        productos = productos.map(function (producto) {
            return {
                ...producto,
                imagen: obtenerImagenProducto(producto),
                categoria: producto.categoria || "Sin categoría",
                descripcion:
                    producto.descripcion ||
                    "Producto disponible en nuestra tienda online.",
                stock: Number(producto.stock || 0),
                precio: Number(producto.precio || 0)
            };
        });

        mostrarProductos();
        mostrarDetalleProducto();

    } catch (error) {
        console.error("Error al cargar productos:", error);

        const contenedorProductos =
            document.getElementById("lista-productos");

        if (contenedorProductos) {
            contenedorProductos.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger">
                        No fue posible cargar los productos.
                        Verifica que el backend esté encendido.
                    </div>
                </div>
            `;
        }
    }
}

function mostrarProductos() {
    const contenedorProductos =
        document.getElementById("lista-productos");

    if (!contenedorProductos) {
        return;
    }

    contenedorProductos.innerHTML = "";

    productos.forEach(function (producto) {
        const columna =
            document.createElement("article");

        columna.className =
            "col-12 col-sm-6 col-lg-3";

        let mensajeStock = "";

        if (producto.stock > 5) {
            mensajeStock = `
                <span class="badge bg-success">
                    Stock disponible: ${producto.stock}
                </span>
            `;
        } else if (producto.stock > 0) {
            mensajeStock = `
                <span class="badge bg-warning text-dark">
                    Últimas ${producto.stock} unidades
                </span>
            `;
        } else {
            mensajeStock = `
                <span class="badge bg-danger">
                    Sin stock
                </span>
            `;
        }

        columna.innerHTML = `
            <div class="card h-100 border-0 shadow-sm producto-card">

                <div class="position-relative bg-white rounded-top overflow-hidden">

                    <img
                        src="${producto.imagen}"
                        class="card-img-top producto-imagen"
                        alt="${producto.nombre}"
                    >

                    <span class="badge bg-dark position-absolute top-0 start-0 m-3">
                        ${producto.categoria}
                    </span>

                </div>

                <div class="card-body d-flex flex-column p-4">

                    <h3 class="h5 card-title fw-bold mb-2">
                        ${producto.nombre}
                    </h3>

                    <p class="card-text text-muted small">
                        ${producto.descripcion}
                    </p>

                    <div class="mb-3">
                        ${mensajeStock}
                    </div>

                    <div class="mt-auto">

                        <p class="fs-4 fw-bold text-dark mb-3">
                            ${formatearPrecio(producto.precio)}
                        </p>

                        <div class="d-grid gap-2">

                            <a
                                href="producto-detalle.html?id=${producto.id}"
                                class="btn btn-outline-dark"
                            >
                                Ver detalle
                            </a>

                            <button
                                type="button"
                                class="btn btn-dark"
                                onclick="agregarAlCarrito(${producto.id})"
                                ${producto.stock <= 0 ? "disabled" : ""}
                            >
                                Añadir al carrito
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        `;

        contenedorProductos.appendChild(
            columna
        );
    });
}

function agregarAlCarrito(idProducto) {
    const productoEncontrado =
        productos.find(function (producto) {
            return producto.id === idProducto;
        });

    if (!productoEncontrado) {
        alert("Producto no encontrado.");
        return;
    }

    if (productoEncontrado.stock <= 0) {
        alert("Este producto no tiene stock disponible.");
        return;
    }

    let carrito =
        JSON.parse(
            localStorage.getItem("carrito")
        ) || [];

    const productoEnCarrito =
        carrito.find(function (producto) {
            return producto.id === idProducto;
        });

    if (productoEnCarrito) {
        if (
            productoEnCarrito.cantidad >=
            productoEncontrado.stock
        ) {
            alert(
                "No hay más unidades disponibles de este producto."
            );
            return;
        }

        productoEnCarrito.cantidad += 1;

    } else {
        carrito.push({
            id: productoEncontrado.id,
            nombre: productoEncontrado.nombre,
            categoria: productoEncontrado.categoria,
            precio: productoEncontrado.precio,
            imagen: productoEncontrado.imagen,
            stock: productoEncontrado.stock,
            cantidad: 1
        });
    }

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    if (
        typeof actualizarContadorCarrito ===
        "function"
    ) {
        actualizarContadorCarrito();
    }

    alert(
        productoEncontrado.nombre +
        " fue añadido al carrito."
    );
}

function mostrarDetalleProducto() {
    const contenedorDetalle =
        document.getElementById(
            "contenido-detalle"
        );

    if (!contenedorDetalle) {
        return;
    }

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    const idProducto =
        Number(
            parametros.get("id")
        );

    const productoSeleccionado =
        productos.find(function (producto) {
            return producto.id === idProducto;
        });

    if (productoSeleccionado) {
        contenedorDetalle.innerHTML = `
            <div class="text-center">

                <img
                    src="${productoSeleccionado.imagen}"
                    alt="${productoSeleccionado.nombre}"
                    class="img-fluid rounded"
                >

            </div>

            <div>

                <span class="badge bg-dark mb-3">
                    ${productoSeleccionado.categoria}
                </span>

                <h2 class="fw-bold">
                    ${productoSeleccionado.nombre}
                </h2>

                <p class="text-muted">
                    ${productoSeleccionado.descripcion}
                </p>

                <p>
                    <strong>Disponibilidad:</strong>
                    ${productoSeleccionado.stock} unidades
                </p>

                <h3 class="fw-bold">
                    ${formatearPrecio(
                        productoSeleccionado.precio
                    )}
                </h3>

                <button
                    type="button"
                    class="btn btn-dark btn-lg"
                    onclick="agregarAlCarrito(${productoSeleccionado.id})"
                    ${productoSeleccionado.stock <= 0 ? "disabled" : ""}
                >
                    Añadir al carrito
                </button>

            </div>
        `;

    } else {
        contenedorDetalle.innerHTML = `
            <div class="alert alert-warning">

                <h2 class="h4">
                    Producto no encontrado
                </h2>

                <p>
                    El producto solicitado no existe
                    o fue eliminado.
                </p>

                <a
                    href="productos.html"
                    class="btn btn-dark"
                >
                    Volver a productos
                </a>

            </div>
        `;
    }
}

cargarProductos();