/* =========================
   PRODUCTOS INICIALES
   ========================= */

const productosIniciales = [
    {
        id: 1,
        codigo: "PROD001",
        nombre: "Mouse Gamer",
        descripcion: "Mouse gamer con iluminación RGB.",
        precio: 19990,
        stock: 15,
        stockCritico: 3,
        categoria: "Perifericos",
        imagen: ""
    },
    {
        id: 2,
        codigo: "PROD002",
        nombre: "Teclado Mecánico",
        descripcion: "Teclado mecánico para gaming.",
        precio: 39990,
        stock: 10,
        stockCritico: 2,
        categoria: "Perifericos",
        imagen: ""
    },
    {
        id: 3,
        codigo: "PROD003",
        nombre: "Audífonos Gamer",
        descripcion: "Audífonos gamer con micrófono.",
        precio: 29990,
        stock: 20,
        stockCritico: 5,
        categoria: "Audio",
        imagen: ""
    },
    {
        id: 4,
        codigo: "PROD004",
        nombre: "Monitor Gaming",
        descripcion: "Monitor gaming de alta resolución.",
        precio: 149990,
        stock: 5,
        stockCritico: 2,
        categoria: "Monitores",
        imagen: ""
    }
];


/* =========================
   CARGAR PRODUCTOS
   ========================= */

let productosAdmin = JSON.parse(
    localStorage.getItem("productosAdmin")
);

if (!productosAdmin) {

    productosAdmin = productosIniciales;

    guardarProductos();
}


function guardarProductos() {

    localStorage.setItem(
        "productosAdmin",
        JSON.stringify(productosAdmin)
    );
}


/* =========================
   LISTAR PRODUCTOS
   ========================= */

const tablaProductos =
    document.getElementById("tabla-productos");


if (tablaProductos) {

    mostrarProductos();
}


function mostrarProductos() {

    if (!tablaProductos) {
        return;
    }

    tablaProductos.innerHTML = "";


    productosAdmin.forEach(function(producto) {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.codigo}</td>

            <td>${producto.nombre}</td>

            <td>
                $${producto.precio.toLocaleString("es-CL")}
            </td>

            <td>${producto.stock}</td>

            <td>
                <a href="producto-editar.html?id=${producto.id}">
                    Editar
                </a>

                <button
                    type="button"
                    onclick="eliminarProductoAdmin(${producto.id})"
                >
                    Eliminar
                </button>
            </td>
        `;

        tablaProductos.appendChild(fila);
    });
}


/* =========================
   ELIMINAR PRODUCTO
   ========================= */

function eliminarProductoAdmin(idProducto) {

    const confirmar = confirm(
        "¿Seguro que deseas eliminar este producto?"
    );

    if (!confirmar) {
        return;
    }


    productosAdmin = productosAdmin.filter(
        function(producto) {

            return producto.id !== idProducto;
        }
    );


    guardarProductos();

    mostrarProductos();
}


/* =========================
   NUEVO PRODUCTO
   ========================= */

const formularioProducto =
    document.getElementById("form-producto");


if (formularioProducto) {

    formularioProducto.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            limpiarErrores();

            let formularioValido = true;


            const codigo =
                document.getElementById("codigo").value.trim();

            const nombre =
                document.getElementById("nombre").value.trim();

            const descripcion =
                document.getElementById("descripcion").value.trim();

            const precio =
                document.getElementById("precio").value;

            const stock =
                document.getElementById("stock").value;

            const stockCritico =
                document.getElementById("stock-critico").value;

            const categoria =
                document.getElementById("categoria").value;

            const imagen =
                document.getElementById("imagen").value.trim();


            /* CÓDIGO */

            if (codigo === "") {

                mostrarError(
                    "error-codigo",
                    "El código del producto es obligatorio."
                );

                formularioValido = false;

            } else if (codigo.length < 3) {

                mostrarError(
                    "error-codigo",
                    "El código debe tener al menos 3 caracteres."
                );

                formularioValido = false;
            }


            /* NOMBRE */

            if (nombre === "") {

                mostrarError(
                    "error-nombre",
                    "El nombre del producto es obligatorio."
                );

                formularioValido = false;

            } else if (nombre.length > 100) {

                mostrarError(
                    "error-nombre",
                    "El nombre no puede superar los 100 caracteres."
                );

                formularioValido = false;
            }


            /* DESCRIPCIÓN */

            if (descripcion.length > 500) {

                mostrarError(
                    "error-descripcion",
                    "La descripción no puede superar los 500 caracteres."
                );

                formularioValido = false;
            }


            /* PRECIO */

            if (precio === "") {

                mostrarError(
                    "error-precio",
                    "El precio es obligatorio."
                );

                formularioValido = false;

            } else if (Number(precio) < 0) {

                mostrarError(
                    "error-precio",
                    "El precio no puede ser negativo."
                );

                formularioValido = false;
            }


            /* STOCK */

            if (stock === "") {

                mostrarError(
                    "error-stock",
                    "El stock es obligatorio."
                );

                formularioValido = false;

            } else if (
                Number(stock) < 0 ||
                !Number.isInteger(Number(stock))
            ) {

                mostrarError(
                    "error-stock",
                    "El stock debe ser un número entero mayor o igual a 0."
                );

                formularioValido = false;
            }


            /* STOCK CRÍTICO */

            if (
                stockCritico !== "" &&
                (
                    Number(stockCritico) < 0 ||
                    !Number.isInteger(Number(stockCritico))
                )
            ) {

                mostrarError(
                    "error-stock-critico",
                    "El stock crítico debe ser un número entero mayor o igual a 0."
                );

                formularioValido = false;
            }


            /* CATEGORÍA */

            if (categoria === "") {

                mostrarError(
                    "error-categoria",
                    "Debes seleccionar una categoría."
                );

                formularioValido = false;
            }


            if (!formularioValido) {
                return;
            }


            /* CREAR PRODUCTO */

            const nuevoId =
                productosAdmin.length > 0
                    ? Math.max(
                        ...productosAdmin.map(
                            producto => producto.id
                        )
                    ) + 1
                    : 1;


            const nuevoProducto = {

                id: nuevoId,

                codigo: codigo,

                nombre: nombre,

                descripcion: descripcion,

                precio: Number(precio),

                stock: Number(stock),

                stockCritico:
                    stockCritico === ""
                        ? 0
                        : Number(stockCritico),

                categoria: categoria,

                imagen: imagen
            };


            productosAdmin.push(nuevoProducto);

            guardarProductos();


            alert("Producto creado correctamente.");


            window.location.href =
                "productos.html";
        }
    );
}


/* =========================
   EDITAR PRODUCTO
   ========================= */

const formularioEditar =
    document.getElementById("form-editar-producto");


if (formularioEditar) {

    const parametros =
        new URLSearchParams(window.location.search);

    const idProducto =
        Number(parametros.get("id"));


    const productoSeleccionado =
        productosAdmin.find(
            function(producto) {

                return producto.id === idProducto;
            }
        );


    if (productoSeleccionado) {

        document.getElementById(
            "editar-codigo"
        ).value = productoSeleccionado.codigo;


        document.getElementById(
            "editar-nombre"
        ).value = productoSeleccionado.nombre;


        document.getElementById(
            "editar-descripcion"
        ).value = productoSeleccionado.descripcion;


        document.getElementById(
            "editar-precio"
        ).value = productoSeleccionado.precio;


        document.getElementById(
            "editar-stock"
        ).value = productoSeleccionado.stock;


        document.getElementById(
            "editar-stock-critico"
        ).value = productoSeleccionado.stockCritico;


        document.getElementById(
            "editar-categoria"
        ).value = productoSeleccionado.categoria;


        document.getElementById(
            "editar-imagen"
        ).value = productoSeleccionado.imagen;


        formularioEditar.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                const codigo =
                    document.getElementById(
                        "editar-codigo"
                    ).value.trim();


                const nombre =
                    document.getElementById(
                        "editar-nombre"
                    ).value.trim();


                const descripcion =
                    document.getElementById(
                        "editar-descripcion"
                    ).value.trim();


                const precio =
                    document.getElementById(
                        "editar-precio"
                    ).value;


                const stock =
                    document.getElementById(
                        "editar-stock"
                    ).value;


                const stockCritico =
                    document.getElementById(
                        "editar-stock-critico"
                    ).value;


                const categoria =
                    document.getElementById(
                        "editar-categoria"
                    ).value;


                const imagen =
                    document.getElementById(
                        "editar-imagen"
                    ).value.trim();


                if (
                    codigo.length < 3 ||
                    nombre === "" ||
                    nombre.length > 100 ||
                    descripcion.length > 500 ||
                    precio === "" ||
                    Number(precio) < 0 ||
                    stock === "" ||
                    Number(stock) < 0 ||
                    !Number.isInteger(Number(stock)) ||
                    (
                        stockCritico !== "" &&
                        (
                            Number(stockCritico) < 0 ||
                            !Number.isInteger(
                                Number(stockCritico)
                            )
                        )
                    ) ||
                    categoria === ""
                ) {

                    alert(
                        "Revisa los datos ingresados."
                    );

                    return;
                }


                productoSeleccionado.codigo =
                    codigo;

                productoSeleccionado.nombre =
                    nombre;

                productoSeleccionado.descripcion =
                    descripcion;

                productoSeleccionado.precio =
                    Number(precio);

                productoSeleccionado.stock =
                    Number(stock);

                productoSeleccionado.stockCritico =
                    stockCritico === ""
                        ? 0
                        : Number(stockCritico);

                productoSeleccionado.categoria =
                    categoria;

                productoSeleccionado.imagen =
                    imagen;


                guardarProductos();


                alert(
                    "Producto actualizado correctamente."
                );


                window.location.href =
                    "productos.html";
            }
        );

    } else {

        formularioEditar.innerHTML = `
            <p>
                El producto seleccionado no existe.
            </p>

            <a href="productos.html">
                Volver a productos
            </a>
        `;
    }
}


/* =========================
   ERRORES
   ========================= */

function mostrarError(idElemento, mensaje) {

    const elemento =
        document.getElementById(idElemento);

    if (elemento) {

        elemento.textContent = mensaje;
    }
}


function limpiarErrores() {

    const errores =
        document.querySelectorAll(".error");

    errores.forEach(function(error) {

        error.textContent = "";
    });
}