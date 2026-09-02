const productosAdmin = [
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


const tablaProductos = document.getElementById("tabla-productos");


if (tablaProductos) {

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
            </td>
        `;

        tablaProductos.appendChild(fila);
    });
}

/* =========================
   FORMULARIO NUEVO PRODUCTO
   ========================= */

const formularioProducto = document.getElementById("form-producto");

if (formularioProducto) {

    formularioProducto.addEventListener("submit", function(event) {

        event.preventDefault();

        limpiarErrores();

        let formularioValido = true;


        const codigo = document.getElementById("codigo").value.trim();

        const nombre = document.getElementById("nombre").value.trim();

        const descripcion = document.getElementById("descripcion").value.trim();

        const precio = document.getElementById("precio").value;

        const stock = document.getElementById("stock").value;

        const stockCritico = document.getElementById("stock-critico").value;

        const categoria = document.getElementById("categoria").value;


        /* =========================
           VALIDAR CÓDIGO
           ========================= */

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


        /* =========================
           VALIDAR NOMBRE
           ========================= */

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


        /* =========================
           VALIDAR DESCRIPCIÓN
           ========================= */

        if (descripcion.length > 500) {

            mostrarError(
                "error-descripcion",
                "La descripción no puede superar los 500 caracteres."
            );

            formularioValido = false;
        }


        /* =========================
           VALIDAR PRECIO
           ========================= */

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


        /* =========================
           VALIDAR STOCK
           ========================= */

        if (stock === "") {

            mostrarError(
                "error-stock",
                "El stock es obligatorio."
            );

            formularioValido = false;

        } else if (Number(stock) < 0) {

            mostrarError(
                "error-stock",
                "El stock no puede ser negativo."
            );

            formularioValido = false;

        } else if (!Number.isInteger(Number(stock))) {

            mostrarError(
                "error-stock",
                "El stock debe ser un número entero."
            );

            formularioValido = false;
        }


        /* =========================
           VALIDAR STOCK CRÍTICO
           ========================= */

        if (stockCritico !== "") {

            if (Number(stockCritico) < 0) {

                mostrarError(
                    "error-stock-critico",
                    "El stock crítico no puede ser negativo."
                );

                formularioValido = false;

            } else if (!Number.isInteger(Number(stockCritico))) {

                mostrarError(
                    "error-stock-critico",
                    "El stock crítico debe ser un número entero."
                );

                formularioValido = false;
            }
        }


        /* =========================
           VALIDAR CATEGORÍA
           ========================= */

        if (categoria === "") {

            mostrarError(
                "error-categoria",
                "Debes seleccionar una categoría."
            );

            formularioValido = false;
        }


        /* =========================
           FORMULARIO CORRECTO
           ========================= */

        if (formularioValido) {

            alert("Producto validado correctamente.");

            formularioProducto.reset();
        }

    });
}


/* =========================
   MOSTRAR MENSAJES DE ERROR
   ========================= */

function mostrarError(idElemento, mensaje) {

    const elementoError = document.getElementById(idElemento);

    if (elementoError) {
        elementoError.textContent = mensaje;
    }
}


/* =========================
   LIMPIAR MENSAJES
   ========================= */

function limpiarErrores() {

    const errores = document.querySelectorAll(".error");

    errores.forEach(function(error) {
        error.textContent = "";
    });
}

/* =========================
   EDITAR PRODUCTO
   ========================= */

const formularioEditar = document.getElementById("form-editar-producto");

if (formularioEditar) {

    const parametros = new URLSearchParams(window.location.search);

    const idProducto = Number(parametros.get("id"));

    const productoSeleccionado = productosAdmin.find(function(producto) {
        return producto.id === idProducto;
    });


    if (productoSeleccionado) {

        document.getElementById("editar-codigo").value =
            productoSeleccionado.codigo;

        document.getElementById("editar-nombre").value =
            productoSeleccionado.nombre;

        document.getElementById("editar-descripcion").value =
            productoSeleccionado.descripcion;

        document.getElementById("editar-precio").value =
            productoSeleccionado.precio;

        document.getElementById("editar-stock").value =
            productoSeleccionado.stock;

        document.getElementById("editar-stock-critico").value =
            productoSeleccionado.stockCritico;

        document.getElementById("editar-categoria").value =
            productoSeleccionado.categoria;

        document.getElementById("editar-imagen").value =
            productoSeleccionado.imagen;


        formularioEditar.addEventListener("submit", function(event) {

            event.preventDefault();

            const nuevoCodigo =
                document.getElementById("editar-codigo").value.trim();

            const nuevoNombre =
                document.getElementById("editar-nombre").value.trim();

            const nuevoPrecio =
                document.getElementById("editar-precio").value;

            const nuevoStock =
                document.getElementById("editar-stock").value;

            const nuevaCategoria =
                document.getElementById("editar-categoria").value;


            if (
                nuevoCodigo.length < 3 ||
                nuevoNombre === "" ||
                nuevoNombre.length > 100 ||
                nuevoPrecio === "" ||
                Number(nuevoPrecio) < 0 ||
                nuevoStock === "" ||
                Number(nuevoStock) < 0 ||
                !Number.isInteger(Number(nuevoStock)) ||
                nuevaCategoria === ""
            ) {

                alert("Revisa los datos ingresados.");

                return;
            }


            alert("Producto actualizado correctamente.");

            window.location.href = "productos.html";
        });

    } else {

        formularioEditar.innerHTML = `
            <p>El producto seleccionado no existe.</p>

            <a href="productos.html">
                Volver a productos
            </a>
        `;
    }
}