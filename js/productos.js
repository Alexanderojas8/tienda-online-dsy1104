// ==========================================================
// CATÁLOGO DE PRODUCTOS
// ==========================================================

const productos = [

    // ======================================================
    // MOUSE GAMER
    // ======================================================

    {
        id: 1,
        nombre: "Mouse Gamer RGB M1",
        categoria: "Mouse",
        descripcion: "Mouse gamer RGB con diseño ergonómico y alta precisión.",
        precio: 19990,
        stock: 15,
        imagen: "img/carrusel/Carrusel/Mouse1.jpg"
    },

    {
        id: 2,
        nombre: "Mouse Gamer RGB M2",
        categoria: "Mouse",
        descripcion: "Mouse inalámbrico gamer con iluminación RGB y múltiples botones.",
        precio: 24990,
        stock: 12,
        imagen: "img/carrusel/Carrusel/Mouse2.jpg"
    },

    {
        id: 3,
        nombre: "Mouse Gamer RGB M3",
        categoria: "Mouse",
        descripcion: "Mouse gamer de alta precisión con iluminación multicolor.",
        precio: 21990,
        stock: 10,
        imagen: "img/carrusel/Carrusel/Mouse3.jpg"
    },


    // ======================================================
    // TECLADOS GAMER
    // ======================================================

    {
        id: 4,
        nombre: "Teclado Gamer RGB",
        categoria: "Teclados",
        descripcion: "Teclado gamer completo con iluminación RGB y reposamuñecas.",
        precio: 39990,
        stock: 14,
        imagen: "img/carrusel/Carrusel/TecladoGamer.webp"
    },

    {
        id: 5,
        nombre: "Teclado Mecánico Compacto",
        categoria: "Teclados",
        descripcion: "Teclado mecánico compacto con iluminación RGB para gaming.",
        precio: 44990,
        stock: 11,
        imagen: "img/carrusel/Carrusel/TecladoGamer1.webp"
    },

    {
        id: 6,
        nombre: "Teclado Gamer One Hand",
        categoria: "Teclados",
        descripcion: "Teclado gamer para una mano, ideal para juegos competitivos.",
        precio: 29990,
        stock: 8,
        imagen: "img/carrusel/Carrusel/TecladoGamer2.webp"
    },

    {
        id: 7,
        nombre: "Teclado RGB Pro",
        categoria: "Teclados",
        descripcion: "Teclado gamer RGB con iluminación completa y respuesta rápida.",
        precio: 49990,
        stock: 9,
        imagen: "img/carrusel/Carrusel/TecladoGamer3.webp"
    },

    {
        id: 8,
        nombre: "Teclado Mecánico Black",
        categoria: "Teclados",
        descripcion: "Teclado mecánico negro con retroiluminación multicolor.",
        precio: 42990,
        stock: 13,
        imagen: "img/carrusel/Carrusel/TecladoGamer4.webp"
    },

    {
        id: 9,
        nombre: "Teclado Gamer White RGB",
        categoria: "Teclados",
        descripcion: "Teclado gamer compacto blanco con iluminación RGB.",
        precio: 45990,
        stock: 7,
        imagen: "img/carrusel/Carrusel/TecladoGamer5.webp"
    },


    // ======================================================
    // AUDÍFONOS GAMER
    // ======================================================

    {
        id: 10,
        nombre: "Audífonos Gamer RGB",
        categoria: "Audífonos",
        descripcion: "Audífonos gamer con micrófono e iluminación RGB.",
        precio: 29990,
        stock: 20,
        imagen: "img/carrusel/Carrusel/Audifonos Gamer.webp"
    },

    {
        id: 11,
        nombre: "Audífonos Gamer Onikuma Pro",
        categoria: "Audífonos",
        descripcion: "Audífonos gamer con diseño premium y sonido envolvente.",
        precio: 34990,
        stock: 12,
        imagen: "img/carrusel/Carrusel/AudifonosGamer1.jpg"
    },

    {
        id: 12,
        nombre: "Audífonos Gaming Black",
        categoria: "Audífonos",
        descripcion: "Headset gamer negro con micrófono ajustable.",
        precio: 25990,
        stock: 16,
        imagen: "img/carrusel/Carrusel/AudifonosGamer2.jpg"
    },

    {
        id: 13,
        nombre: "Audífonos Gamer Pink RGB",
        categoria: "Audífonos",
        descripcion: "Audífonos gamer rosados con iluminación RGB.",
        precio: 32990,
        stock: 8,
        imagen: "img/carrusel/Carrusel/AudifonosGamer3.webp"
    },

    {
        id: 14,
        nombre: "Audífonos Gamer Blue",
        categoria: "Audífonos",
        descripcion: "Audífonos gamer azules con micrófono y sonido estéreo.",
        precio: 27990,
        stock: 18,
        imagen: "img/carrusel/Carrusel/AudifonosGamer4.webp"
    },

    {
        id: 15,
        nombre: "Audífonos Gamer RGB Pro",
        categoria: "Audífonos",
        descripcion: "Headset gamer RGB con conexión múltiple y micrófono.",
        precio: 36990,
        stock: 10,
        imagen: "img/carrusel/Carrusel/AudifonosGamer5.webp"
    },


    // ======================================================
    // LAPTOP GAMER
    // ======================================================

    {
        id: 16,
        nombre: "Laptop Gamer ROG",
        categoria: "Laptop Gamer",
        descripcion: "Laptop gamer diseñada para alto rendimiento y juegos exigentes.",
        precio: 899990,
        stock: 6,
        imagen: "img/carrusel/Carrusel/LaptopGamer.webp"
    },

    {
        id: 17,
        nombre: "Laptop Gamer Legion",
        categoria: "Laptop Gamer",
        descripcion: "Laptop gamer Legion con hardware preparado para gaming.",
        precio: 999990,
        stock: 5,
        imagen: "img/carrusel/Carrusel/LaptopGamer1.webp"
    },

    {
        id: 18,
        nombre: "Laptop Gamer ROG Dual",
        categoria: "Laptop Gamer",
        descripcion: "Equipo gamer portátil con diseño de alto rendimiento.",
        precio: 1199990,
        stock: 4,
        imagen: "img/carrusel/Carrusel/LaptopGamer2.webp"
    },

    {
        id: 19,
        nombre: "Laptop Gamer Slim",
        categoria: "Laptop Gamer",
        descripcion: "Laptop gamer delgada y potente para jugar y trabajar.",
        precio: 849990,
        stock: 7,
        imagen: "img/carrusel/Carrusel/LaptopGamer3.webp"
    },

    {
        id: 20,
        nombre: "Laptop Gamer RTX",
        categoria: "Laptop Gamer",
        descripcion: "Laptop gamer equipada para gráficos de alto rendimiento.",
        precio: 1099990,
        stock: 5,
        imagen: "img/carrusel/Carrusel/Laptopgamer4.webp"
    },

    {
        id: 21,
        nombre: "Laptop Gamer MSI RTX",
        categoria: "Laptop Gamer",
        descripcion: "Laptop MSI gamer orientada a rendimiento extremo.",
        precio: 1399990,
        stock: 3,
        imagen: "img/carrusel/Carrusel/LaptopGamer5.webp"
    },


    // ======================================================
    // MONITORES GAMER
    // ======================================================

    {
        id: 22,
        nombre: "Monitor Gamer ROG Curvo",
        categoria: "Monitores",
        descripcion: "Monitor gamer curvo para una experiencia visual inmersiva.",
        precio: 299990,
        stock: 8,
        imagen: "img/carrusel/Carrusel/MonitorGamer.jpg"
    },

    {
        id: 23,
        nombre: "Monitor Gamer RGB",
        categoria: "Monitores",
        descripcion: "Monitor gamer con diseño RGB y panel de alta calidad.",
        precio: 249990,
        stock: 9,
        imagen: "img/carrusel/Carrusel/MonitorGamer1.webp"
    },

    {
        id: 24,
        nombre: "Monitor Gamer 34 pulgadas",
        categoria: "Monitores",
        descripcion: "Monitor ultrawide de 34 pulgadas diseñado para gaming.",
        precio: 399990,
        stock: 5,
        imagen: "img/carrusel/Carrusel/MonitorGamer2.jpg"
    },

    {
        id: 25,
        nombre: "Monitor Gamer Ultrawide",
        categoria: "Monitores",
        descripcion: "Monitor panorámico curvo para simuladores y juegos.",
        precio: 349990,
        stock: 6,
        imagen: "img/carrusel/Carrusel/MonitorGamer3.webp"
    },

    {
        id: 26,
        nombre: "Monitor Gamer 27 RGB",
        categoria: "Monitores",
        descripcion: "Monitor gamer de 27 pulgadas con alta frecuencia de actualización.",
        precio: 279990,
        stock: 7,
        imagen: "img/carrusel/Carrusel/MonitorGamer4.jpg"
    },

    {
        id: 27,
        nombre: "Monitor Gamer UWQHD",
        categoria: "Monitores",
        descripcion: "Monitor gamer ultrawide UWQHD para máxima inmersión.",
        precio: 429990,
        stock: 4,
        imagen: "img/carrusel/Carrusel/MonitorGamer5.jpg"
    },


    // ======================================================
    // PC GAMER
    // ======================================================

    {
        id: 28,
        nombre: "PC Gamer RGB",
        categoria: "PC Gamer",
        descripcion: "PC Gamer con gabinete RGB y componentes de alto rendimiento.",
        precio: 799990,
        stock: 6,
        imagen: "img/carrusel/Carrusel/PcGamer.webp"
    },

    {
        id: 29,
        nombre: "PC Gamer Black Edition",
        categoria: "PC Gamer",
        descripcion: "Equipo gamer negro con iluminación RGB y gran capacidad.",
        precio: 899990,
        stock: 5,
        imagen: "img/carrusel/Carrusel/Pcgamer1.webp"
    },

    {
        id: 30,
        nombre: "PC Gamer RGB Tower",
        categoria: "PC Gamer",
        descripcion: "Torre gamer RGB preparada para juegos y multitarea.",
        precio: 849990,
        stock: 7,
        imagen: "img/carrusel/Carrusel/PcGaymer2.webp"
    },

    {
        id: 31,
        nombre: "PC Gamer Blue Edition",
        categoria: "PC Gamer",
        descripcion: "PC Gamer con iluminación azul y sistema de alto rendimiento.",
        precio: 949990,
        stock: 4,
        imagen: "img/carrusel/Carrusel/PcGaymer3.webp"
    },

    {
        id: 32,
        nombre: "Setup PC Gamer Completo",
        categoria: "PC Gamer",
        descripcion: "Setup gamer completo con PC, monitor y accesorios.",
        precio: 1199990,
        stock: 3,
        imagen: "img/carrusel/Carrusel/Pcgamer4.webp"
    },

    {
        id: 33,
        nombre: "PC Gamer White RGB",
        categoria: "PC Gamer",
        descripcion: "PC gamer blanco con iluminación RGB y gabinete panorámico.",
        precio: 999990,
        stock: 5,
        imagen: "img/carrusel/Carrusel/Pcgamer5.webp"
    },


    // ======================================================
    // SILLAS GAMER
    // ======================================================

    {
        id: 34,
        nombre: "Silla Gamer Premium",
        categoria: "Sillas Gamer",
        descripcion: "Silla gamer ergonómica con soporte lumbar y reposabrazos.",
        precio: 149990,
        stock: 9,
        imagen: "img/carrusel/Carrusel/SillaGamer.png"
    },

    {
        id: 35,
        nombre: "Silla Gamer RGB",
        categoria: "Sillas Gamer",
        descripcion: "Silla gamer con iluminación RGB y diseño ergonómico.",
        precio: 189990,
        stock: 5,
        imagen: "img/carrusel/Carrusel/SillaGamer1.webp"
    },

    {
        id: 36,
        nombre: "Silla Gamer RGB Duo",
        categoria: "Sillas Gamer",
        descripcion: "Silla gamer con estilo RGB y respaldo de alto confort.",
        precio: 179990,
        stock: 7,
        imagen: "img/carrusel/Carrusel/SillaGamer2.webp"
    },

    {
        id: 37,
        nombre: "Silla Gamer Red",
        categoria: "Sillas Gamer",
        descripcion: "Silla gamer roja y negra con diseño deportivo.",
        precio: 129990,
        stock: 11,
        imagen: "img/carrusel/Carrusel/SillaGamer3.png"
    },

    {
        id: 38,
        nombre: "Silla Gamer Pink",
        categoria: "Sillas Gamer",
        descripcion: "Silla gamer rosada con diseño ergonómico.",
        precio: 139990,
        stock: 8,
        imagen: "img/carrusel/Carrusel/SillaGamer4.webp"
    },

    {
        id: 39,
        nombre: "Silla Gamer Reclining",
        categoria: "Sillas Gamer",
        descripcion: "Silla gamer reclinable con reposapiés y soporte lumbar.",
        precio: 169990,
        stock: 6,
        imagen: "img/carrusel/Carrusel/SillaGamer5.webp"
    }

];


// ==========================================================
// FORMATEAR PRECIO
// ==========================================================

function formatearPrecio(precio) {

    return precio.toLocaleString(
        "es-CL",
        {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0
        }
    );

}


// ==========================================================
// MOSTRAR LISTADO DE PRODUCTOS
// ==========================================================

const contenedorProductos =
    document.getElementById("lista-productos");


if (contenedorProductos) {

    contenedorProductos.innerHTML = "";


    productos.forEach(function (producto) {

        const columna =
            document.createElement("article");


        // 1 celular / 2 tablet / 4 computador
        columna.className =
            "col-12 col-sm-6 col-lg-3";


        columna.innerHTML = `

            <div
                class="card h-100 border-0 shadow-sm producto-card">


                <!-- IMAGEN -->
                <div
                    class="position-relative bg-white
                           rounded-top overflow-hidden">


                    <img
                        src="${producto.imagen}"
                        class="card-img-top producto-imagen"
                        alt="${producto.nombre}">


                    <span
                        class="badge bg-dark position-absolute
                               top-0 start-0 m-3">

                        ${producto.categoria}

                    </span>

                </div>


                <!-- CONTENIDO -->
                <div
                    class="card-body d-flex flex-column p-4">


                    <h3
                        class="h5 card-title fw-bold mb-2">

                        ${producto.nombre}

                    </h3>


                    <p
                        class="card-text text-muted small">

                        ${producto.descripcion}

                    </p>


                    <!-- STOCK -->
                    <div class="mb-3">

                        ${
                            producto.stock > 5

                            ?

                            `
                            <span class="badge bg-success">
                                Stock disponible: ${producto.stock}
                            </span>
                            `

                            :

                            `
                            <span class="badge bg-warning text-dark">
                                Últimas ${producto.stock} unidades
                            </span>
                            `
                        }

                    </div>


                    <!-- PRECIO Y BOTONES -->
                    <div class="mt-auto">

                        <p
                            class="fs-4 fw-bold
                                   text-dark mb-3">

                            ${formatearPrecio(producto.precio)}

                        </p>


                        <div class="d-grid gap-2">

                            <a
                                href="producto-detalle.html?id=${producto.id}"
                                class="btn btn-outline-dark">

                                Ver detalle

                            </a>


                            <button
                                type="button"
                                class="btn btn-dark"
                                onclick="agregarAlCarrito(${producto.id})">

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


// ==========================================================
// AGREGAR PRODUCTO AL CARRITO
// ==========================================================

function agregarAlCarrito(idProducto) {

    const productoEncontrado =
        productos.find(function (producto) {

            return producto.id === idProducto;

        });


    if (!productoEncontrado) {

        alert(
            "Producto no encontrado."
        );

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


    // Si ya existe
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


        // Nuevo producto
        carrito.push({

            id: productoEncontrado.id,

            nombre: productoEncontrado.nombre,

            categoria:
                productoEncontrado.categoria,

            precio:
                productoEncontrado.precio,

            imagen:
                productoEncontrado.imagen,

            stock:
                productoEncontrado.stock,

            cantidad: 1

        });

    }


    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );


    // Actualizar contador inmediatamente
    if (typeof actualizarContadorCarrito === "function") {

        actualizarContadorCarrito();

    }


    alert(
        productoEncontrado.nombre +
        " fue añadido al carrito."
    );

}


// ==========================================================
// DETALLE DEL PRODUCTO
// ==========================================================

const contenedorDetalle =
    document.getElementById(
        "contenido-detalle"
    );


if (contenedorDetalle) {

    const parametros =
        new URLSearchParams(
            window.location.search
        );


    const idProducto =
        Number(
            parametros.get("id")
        );


    const productoSeleccionado =
        productos.find(
            function (producto) {

                return (
                    producto.id ===
                    idProducto
                );

            }
        );


    if (productoSeleccionado) {


        contenedorDetalle.innerHTML = `

            <!-- IMAGEN -->
            <div class="text-center">

                <img
                    src="${productoSeleccionado.imagen}"
                    alt="${productoSeleccionado.nombre}"
                    class="img-fluid rounded">

            </div>


            <!-- INFORMACIÓN -->
            <div>

                <span
                    class="badge bg-dark mb-3">

                    ${productoSeleccionado.categoria}

                </span>


                <h2 class="fw-bold">

                    ${productoSeleccionado.nombre}

                </h2>


                <p class="text-muted">

                    ${productoSeleccionado.descripcion}

                </p>


                <p>

                    <strong>
                        Disponibilidad:
                    </strong>

                    ${productoSeleccionado.stock}
                    unidades

                </p>


                <h3 class="fw-bold">

                    ${formatearPrecio(
                        productoSeleccionado.precio
                    )}

                </h3>


                <button
                    type="button"
                    class="btn btn-dark btn-lg"
                    onclick="agregarAlCarrito(${productoSeleccionado.id})">

                    Añadir al carrito

                </button>

            </div>

        `;

    } else {


        contenedorDetalle.innerHTML = `

            <div
                class="alert alert-warning"
                role="alert">

                <h2 class="h4">
                    Producto no encontrado
                </h2>

                <p class="mb-3">
                    El producto solicitado no existe
                    o fue eliminado.
                </p>

                <a
                    href="productos.html"
                    class="btn btn-dark">

                    Volver a productos

                </a>

            </div>

        `;

    }

}