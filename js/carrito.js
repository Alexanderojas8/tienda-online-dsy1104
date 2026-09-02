let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorCarrito = document.getElementById("carrito-contenido");
const contenedorTotal = document.getElementById("carrito-total");


function mostrarCarrito() {

    if (carrito.length === 0) {

        contenedorCarrito.innerHTML = `
            <p>Tu carrito está vacío.</p>
        `;

        contenedorTotal.innerHTML = `
            <h3>Total: $0</h3>
        `;

        return;
    }


    contenedorCarrito.innerHTML = "";

    let total = 0;


    carrito.forEach(function(producto) {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;


        const elementoProducto = document.createElement("article");

        elementoProducto.classList.add("producto-carrito");


        elementoProducto.innerHTML = `
            <div>
                <h3>${producto.nombre}</h3>

                <p>
                    Precio: $${producto.precio.toLocaleString("es-CL")}
                </p>

                <p>
                    Cantidad: ${producto.cantidad}
                </p>

                <p>
                    Subtotal: $${subtotal.toLocaleString("es-CL")}
                </p>
            </div>

            <div>
                <button onclick="aumentarCantidad(${producto.id})">
                    +
                </button>

                <button onclick="disminuirCantidad(${producto.id})">
                    -
                </button>

                <button onclick="eliminarProducto(${producto.id})">
                    Eliminar
                </button>
            </div>
        `;

        contenedorCarrito.appendChild(elementoProducto);
    });


    contenedorTotal.innerHTML = `
        <h3>
            Total: $${total.toLocaleString("es-CL")}
        </h3>
    `;
}


function aumentarCantidad(idProducto) {

    const producto = carrito.find(function(producto) {
        return producto.id === idProducto;
    });

    producto.cantidad += 1;

    guardarCarrito();
}


function disminuirCantidad(idProducto) {

    const producto = carrito.find(function(producto) {
        return producto.id === idProducto;
    });

    if (producto.cantidad > 1) {

        producto.cantidad -= 1;

    } else {

        eliminarProducto(idProducto);

        return;
    }

    guardarCarrito();
}


function eliminarProducto(idProducto) {

    carrito = carrito.filter(function(producto) {
        return producto.id !== idProducto;
    });

    guardarCarrito();
}


function guardarCarrito() {

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}


mostrarCarrito();