/* =========================
   CONFIGURACIÓN API
   ========================= */

const API_URL = "http://localhost:3000/api/productos";

let productosAdmin = [];


/* =========================
   CARGAR PRODUCTOS
   ========================= */

async function cargarProductosAdmin() {

    try {

        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar los productos");
        }

        productosAdmin = await respuesta.json();

        mostrarProductos();

    } catch (error) {

        console.error(
            "Error al cargar productos:",
            error
        );

        if (tablaProductos) {

            tablaProductos.innerHTML = `
                <tr>
                    <td colspan="5">
                        No fue posible cargar los productos.
                        Verifica que el backend esté encendido.
                    </td>
                </tr>
            `;
        }
    }
}


/* =========================
   LISTAR PRODUCTOS
   ========================= */

const tablaProductos =
    document.getElementById("tabla-productos");


if (tablaProductos) {

    cargarProductosAdmin();
}


function mostrarProductos() {

    if (!tablaProductos) {
        return;
    }

    tablaProductos.innerHTML = "";

    productosAdmin.forEach(function(producto) {

        const fila =
            document.createElement("tr");

        fila.innerHTML = `
            <td>
                ${producto.codigo}
            </td>

            <td>
                ${producto.nombre}
            </td>

            <td>
                $${Number(producto.precio)
                    .toLocaleString("es-CL")}
            </td>

            <td>
                ${producto.stock}
            </td>

            <td>

                <a
                    href="producto-editar.html?id=${producto.id}"
                >
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

async function eliminarProductoAdmin(idProducto) {

    const confirmar = confirm(
        "¿Seguro que deseas eliminar este producto?"
    );

    if (!confirmar) {
        return;
    }

    try {

        const respuesta = await fetch(
            `${API_URL}/${idProducto}`,
            {
                method: "DELETE"
            }
        );

        const resultado =
            await respuesta.json();

        if (!respuesta.ok) {

            alert(
                resultado.mensaje ||
                "No fue posible eliminar el producto."
            );

            return;
        }

        alert(
            "Producto eliminado correctamente."
        );

        cargarProductosAdmin();

    } catch (error) {

        console.error(
            "Error al eliminar producto:",
            error
        );

        alert(
            "No fue posible conectar con el servidor."
        );
    }
}


/* =========================
   NUEVO PRODUCTO
   ========================= */

const formularioProducto =
    document.getElementById("form-producto");


if (formularioProducto) {

    formularioProducto.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            limpiarErrores();

            let formularioValido = true;


            const codigo =
                document
                    .getElementById("codigo")
                    .value
                    .trim();

            const nombre =
                document
                    .getElementById("nombre")
                    .value
                    .trim();

            const descripcion =
                document
                    .getElementById("descripcion")
                    .value
                    .trim();

            const precio =
                document
                    .getElementById("precio")
                    .value;

            const stock =
                document
                    .getElementById("stock")
                    .value;

            const stockCritico =
                document
                    .getElementById("stock-critico")
                    .value;

            const categoria =
                document
                    .getElementById("categoria")
                    .value;

            const imagen =
                document
                    .getElementById("imagen")
                    .value
                    .trim();


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
                    !Number.isInteger(
                        Number(stockCritico)
                    )
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


            /* PRODUCTO QUE ENVIAREMOS AL BACKEND */

            const nuevoProducto = {

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


            try {

                const respuesta = await fetch(
                    API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(
                            nuevoProducto
                        )
                    }
                );


                const resultado =
                    await respuesta.json();


                if (!respuesta.ok) {

                    alert(
                        resultado.mensaje ||
                        "No fue posible crear el producto."
                    );

                    return;
                }


                alert(
                    "Producto creado correctamente."
                );


                window.location.href =
                    "productos.html";


            } catch (error) {

                console.error(
                    "Error al crear producto:",
                    error
                );

                alert(
                    "No fue posible conectar con el servidor."
                );
            }
        }
    );
}


/* =========================
   EDITAR PRODUCTO
   ========================= */

const formularioEditar =
    document.getElementById(
        "form-editar-producto"
    );


if (formularioEditar) {

    cargarProductoParaEditar();
}


async function cargarProductoParaEditar() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    const idProducto =
        Number(parametros.get("id"));


    try {

        const respuesta = await fetch(
            `${API_URL}/${idProducto}`
        );

        if (!respuesta.ok) {

            formularioEditar.innerHTML = `
                <p>
                    El producto seleccionado
                    no existe.
                </p>

                <a href="productos.html">
                    Volver a productos
                </a>
            `;

            return;
        }


        const productoSeleccionado =
            await respuesta.json();


        document.getElementById(
            "editar-codigo"
        ).value =
            productoSeleccionado.codigo || "";


        document.getElementById(
            "editar-nombre"
        ).value =
            productoSeleccionado.nombre || "";


        document.getElementById(
            "editar-descripcion"
        ).value =
            productoSeleccionado.descripcion || "";


        document.getElementById(
            "editar-precio"
        ).value =
            productoSeleccionado.precio;


        document.getElementById(
            "editar-stock"
        ).value =
            productoSeleccionado.stock;


        document.getElementById(
            "editar-stock-critico"
        ).value =
            productoSeleccionado.stockCritico || 0;


        let categoria =
            productoSeleccionado.categoria || "";

        // Compatibilidad con producto antiguo
        if (categoria === "Periféricos") {
            categoria = "Perifericos";
        }

        document.getElementById(
            "editar-categoria"
        ).value =
            categoria;


        document.getElementById(
            "editar-imagen"
        ).value =
            productoSeleccionado.imagen || "";


        formularioEditar.addEventListener(
            "submit",
            async function(event) {

                event.preventDefault();


                const codigo =
                    document
                        .getElementById(
                            "editar-codigo"
                        )
                        .value
                        .trim();


                const nombre =
                    document
                        .getElementById(
                            "editar-nombre"
                        )
                        .value
                        .trim();


                const descripcion =
                    document
                        .getElementById(
                            "editar-descripcion"
                        )
                        .value
                        .trim();


                const precio =
                    document
                        .getElementById(
                            "editar-precio"
                        )
                        .value;


                const stock =
                    document
                        .getElementById(
                            "editar-stock"
                        )
                        .value;


                const stockCritico =
                    document
                        .getElementById(
                            "editar-stock-critico"
                        )
                        .value;


                const categoria =
                    document
                        .getElementById(
                            "editar-categoria"
                        )
                        .value;


                const imagen =
                    document
                        .getElementById(
                            "editar-imagen"
                        )
                        .value
                        .trim();


                if (
                    codigo.length < 3 ||
                    nombre === "" ||
                    nombre.length > 100 ||
                    descripcion.length > 500 ||
                    precio === "" ||
                    Number(precio) < 0 ||
                    stock === "" ||
                    Number(stock) < 0 ||
                    !Number.isInteger(
                        Number(stock)
                    ) ||
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


                const productoActualizado = {

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


                try {

                    const respuesta = await fetch(
                        `${API_URL}/${idProducto}`,
                        {
                            method: "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify(
                                productoActualizado
                            )
                        }
                    );


                    const resultado =
                        await respuesta.json();


                    if (!respuesta.ok) {

                        alert(
                            resultado.mensaje ||
                            "No fue posible actualizar el producto."
                        );

                        return;
                    }


                    alert(
                        "Producto actualizado correctamente."
                    );


                    window.location.href =
                        "productos.html";


                } catch (error) {

                    console.error(
                        "Error al actualizar producto:",
                        error
                    );

                    alert(
                        "No fue posible conectar con el servidor."
                    );
                }
            }
        );


    } catch (error) {

        console.error(
            "Error al cargar producto:",
            error
        );

        formularioEditar.innerHTML = `
            <p>
                No fue posible conectarse
                con el servidor.
            </p>
        `;
    }
}


/* =========================
   ERRORES
   ========================= */

function mostrarError(
    idElemento,
    mensaje
) {

    const elemento =
        document.getElementById(
            idElemento
        );

    if (elemento) {

        elemento.textContent =
            mensaje;
    }
}


function limpiarErrores() {

    const errores =
        document.querySelectorAll(
            ".error"
        );

    errores.forEach(
        function(error) {

            error.textContent = "";
        }
    );
}