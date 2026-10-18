
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ===============================
// ARCHIVOS JSON
// ===============================

const archivoProductos = path.join(__dirname, "productos.json");
const archivoUsuarios = path.join(__dirname, "usuarios.json");
const archivoPedidos = path.join(__dirname, "pedidos.json");

// ===============================
// FUNCIONES PARA ARCHIVOS
// ===============================

function leerArchivo(ruta) {
    if (!fs.existsSync(ruta)) {
        return [];
    }

    const contenido = fs.readFileSync(ruta, "utf8");
    const datos = JSON.parse(contenido);

    if (!Array.isArray(datos)) {
        throw new Error("El archivo debe contener una lista");
    }

    return datos;
}

function guardarArchivo(ruta, datos) {
    fs.writeFileSync(
        ruta,
        JSON.stringify(datos, null, 4),
        "utf8"
    );
}

function leerProductos() {
    return leerArchivo(archivoProductos);
}

function guardarProductos(productos) {
    guardarArchivo(archivoProductos, productos);
}

function leerUsuarios() {
    return leerArchivo(archivoUsuarios);
}

function guardarUsuarios(usuarios) {
    guardarArchivo(archivoUsuarios, usuarios);
}

function leerPedidos() {
    return leerArchivo(archivoPedidos);
}

function guardarPedidos(pedidos) {
    guardarArchivo(archivoPedidos, pedidos);
}

// ===============================
// RUTA PRINCIPAL
// ===============================

app.get("/", (req, res) => {
    res.json({
        mensaje: "Backend Tienda Online funcionando correctamente"
    });
});

// ===============================
// PRODUCTOS - OBTENER TODOS
// ===============================

app.get("/api/productos", (req, res) => {
    try {
        res.json(leerProductos());
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al consultar productos"
        });
    }
});

// ===============================
// PRODUCTOS - OBTENER POR ID
// ===============================

app.get("/api/productos/:id", (req, res) => {
    try {
        const productos = leerProductos();
        const id = Number(req.params.id);

        const producto = productos.find(p => p.id === id);

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al consultar producto"
        });
    }
});

// ===============================
// PRODUCTOS - CREAR
// ===============================

app.post("/api/productos", (req, res) => {
    try {
        const productos = leerProductos();

        const {
            codigo,
            nombre,
            descripcion,
            precio,
            stock,
            stockCritico,
            categoria,
            imagen
        } = req.body;

        if (
            !codigo ||
            !nombre ||
            precio === undefined ||
            stock === undefined ||
            !categoria
        ) {
            return res.status(400).json({
                mensaje: "Código, nombre, precio, stock y categoría son obligatorios"
            });
        }

        if (
            !Number.isFinite(Number(precio)) ||
            Number(precio) < 0 ||
            !Number.isInteger(Number(stock)) ||
            Number(stock) < 0
        ) {
            return res.status(400).json({
                mensaje: "Precio o stock no válido"
            });
        }

        const nuevoProducto = {
            id: productos.length > 0
                ? Math.max(...productos.map(p => p.id)) + 1
                : 1,
            codigo,
            nombre,
            descripcion: descripcion || "",
            precio: Number(precio),
            stock: Number(stock),
            stockCritico: Number(stockCritico) || 0,
            categoria,
            imagen: imagen || ""
        };

        productos.push(nuevoProducto);
        guardarProductos(productos);

        res.status(201).json({
            mensaje: "Producto creado correctamente",
            producto: nuevoProducto
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al crear producto"
        });
    }
});

// ===============================
// PRODUCTOS - ACTUALIZAR
// ===============================

app.put("/api/productos/:id", (req, res) => {
    try {
        const productos = leerProductos();
        const id = Number(req.params.id);

        const producto = productos.find(p => p.id === id);

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        const {
            codigo,
            nombre,
            descripcion,
            precio,
            stock,
            stockCritico,
            categoria,
            imagen
        } = req.body;

        if (
            precio !== undefined &&
            (!Number.isFinite(Number(precio)) || Number(precio) < 0)
        ) {
            return res.status(400).json({
                mensaje: "Precio no válido"
            });
        }

        if (
            stock !== undefined &&
            (!Number.isInteger(Number(stock)) || Number(stock) < 0)
        ) {
            return res.status(400).json({
                mensaje: "Stock no válido"
            });
        }

        if (codigo !== undefined) producto.codigo = codigo;
        if (nombre !== undefined) producto.nombre = nombre;
        if (descripcion !== undefined) producto.descripcion = descripcion;
        if (precio !== undefined) producto.precio = Number(precio);
        if (stock !== undefined) producto.stock = Number(stock);
        if (stockCritico !== undefined) {
            producto.stockCritico = Number(stockCritico);
        }
        if (categoria !== undefined) producto.categoria = categoria;
        if (imagen !== undefined) producto.imagen = imagen;

        guardarProductos(productos);

        res.json({
            mensaje: "Producto actualizado correctamente",
            producto
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al actualizar producto"
        });
    }
});

// ===============================
// PRODUCTOS - ELIMINAR
// ===============================

app.delete("/api/productos/:id", (req, res) => {
    try {
        const productos = leerProductos();
        const id = Number(req.params.id);

        const indice = productos.findIndex(p => p.id === id);

        if (indice === -1) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        const productoEliminado = productos.splice(indice, 1)[0];

        guardarProductos(productos);

        res.json({
            mensaje: "Producto eliminado correctamente",
            producto: productoEliminado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al eliminar producto"
        });
    }
});

// ===============================
// USUARIOS - OBTENER TODOS
// ===============================

app.get("/api/usuarios", (req, res) => {
    try {
        res.json(leerUsuarios());
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al consultar usuarios"
        });
    }
});

// ===============================
// USUARIOS - OBTENER POR ID
// ===============================

app.get("/api/usuarios/:id", (req, res) => {
    try {
        const usuarios = leerUsuarios();
        const id = Number(req.params.id);

        const usuario = usuarios.find(u => u.id === id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al consultar usuario"
        });
    }
});

// ===============================
// USUARIOS - CREAR
// ===============================

app.post("/api/usuarios", (req, res) => {
    try {
        const usuarios = leerUsuarios();

        const {
            run,
            nombre,
            apellidos,
            correo,
            password,
            tipoUsuario,
            region,
            comuna,
            direccion
        } = req.body;

        if (
            !run ||
            !nombre ||
            !apellidos ||
            !correo ||
            !password ||
            !tipoUsuario
        ) {
            return res.status(400).json({
                mensaje: "RUN, nombre, apellidos, correo, contraseña y tipo de usuario son obligatorios"
            });
        }

        if (usuarios.some(u => u.correo === correo)) {
            return res.status(400).json({
                mensaje: "El correo ya está registrado"
            });
        }

        if (usuarios.some(u => u.run === run)) {
            return res.status(400).json({
                mensaje: "El RUN ya está registrado"
            });
        }

        const nuevoUsuario = {
            id: usuarios.length > 0
                ? Math.max(...usuarios.map(u => u.id)) + 1
                : 1,
            run,
            nombre,
            apellidos,
            correo,
            password,
            tipoUsuario,
            region: region || "",
            comuna: comuna || "",
            direccion: direccion || ""
        };

        usuarios.push(nuevoUsuario);
        guardarUsuarios(usuarios);

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            usuario: nuevoUsuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al crear usuario"
        });
    }
});

// ===============================
// USUARIOS - ACTUALIZAR
// ===============================

app.put("/api/usuarios/:id", (req, res) => {
    try {
        const usuarios = leerUsuarios();
        const id = Number(req.params.id);

        const usuario = usuarios.find(u => u.id === id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        const {
            run,
            nombre,
            apellidos,
            correo,
            password,
            tipoUsuario,
            region,
            comuna,
            direccion
        } = req.body;

        if (run !== undefined) usuario.run = run;
        if (nombre !== undefined) usuario.nombre = nombre;
        if (apellidos !== undefined) usuario.apellidos = apellidos;
        if (correo !== undefined) usuario.correo = correo;
        if (password !== undefined) usuario.password = password;
        if (tipoUsuario !== undefined) usuario.tipoUsuario = tipoUsuario;
        if (region !== undefined) usuario.region = region;
        if (comuna !== undefined) usuario.comuna = comuna;
        if (direccion !== undefined) usuario.direccion = direccion;

        guardarUsuarios(usuarios);

        res.json({
            mensaje: "Usuario actualizado correctamente",
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al actualizar usuario"
        });
    }
});

// ===============================
// USUARIOS - ELIMINAR
// ===============================

app.delete("/api/usuarios/:id", (req, res) => {
    try {
        const usuarios = leerUsuarios();
        const id = Number(req.params.id);

        const indice = usuarios.findIndex(u => u.id === id);

        if (indice === -1) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        const usuarioEliminado = usuarios.splice(indice, 1)[0];

        guardarUsuarios(usuarios);

        res.json({
            mensaje: "Usuario eliminado correctamente",
            usuario: usuarioEliminado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al eliminar usuario"
        });
    }
});

// ===============================
// PEDIDOS - CONSULTAR TODOS
// ===============================

app.get("/api/pedidos", (req, res) => {
    try {
        res.json(leerPedidos());
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al consultar pedidos"
        });
    }
});

// ===============================
// PEDIDOS - CONSULTAR POR ID
// ===============================

app.get("/api/pedidos/:id", (req, res) => {
    try {
        const pedidos = leerPedidos();
        const id = Number(req.params.id);

        const pedido = pedidos.find(p => p.id === id);

        if (!pedido) {
            return res.status(404).json({
                mensaje: "Pedido no encontrado"
            });
        }

        res.json(pedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al consultar pedido"
        });
    }
});

// ===============================
// PEDIDOS - REGISTRAR COMPRA
// ===============================

app.post("/api/pedidos", (req, res) => {
    try {
        const { cliente, productos: productosSolicitados } = req.body;

        if (
            !cliente ||
            typeof cliente !== "object" ||
            Array.isArray(cliente) ||
            !Array.isArray(productosSolicitados) ||
            productosSolicitados.length === 0
        ) {
            return res.status(400).json({
                mensaje: "Debes enviar cliente y productos"
            });
        }

        const campos = [
            "nombre",
            "correo",
            "telefono",
            "direccion",
            "region",
            "comuna"
        ];

        for (const campo of campos) {
            if (
                typeof cliente[campo] !== "string" ||
                !cliente[campo].trim()
            ) {
                return res.status(400).json({
                    mensaje: `El campo ${campo} es obligatorio`
                });
            }
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                cliente.correo.trim()
            )
        ) {
            return res.status(400).json({
                mensaje: "Correo electrónico no válido"
            });
        }

        const productos = leerProductos();
        const cantidades = new Map();

        for (const item of productosSolicitados) {
            const id = Number(item?.id);
            const cantidad = Number(item?.cantidad);

            if (
                !Number.isSafeInteger(id) ||
                id <= 0 ||
                !Number.isSafeInteger(cantidad) ||
                cantidad <= 0
            ) {
                return res.status(400).json({
                    mensaje: "Producto o cantidad no válida"
                });
            }

            cantidades.set(
                id,
                (cantidades.get(id) || 0) + cantidad
            );
        }

        const detallePedido = [];
        let total = 0;

        for (const [id, cantidad] of cantidades) {
            const producto = productos.find(
                p => Number(p.id) === id
            );

            if (!producto) {
                return res.status(404).json({
                    mensaje: `El producto ${id} no existe`
                });
            }

            const stock = Number(producto.stock);
            const precio = Number(producto.precio);

            if (
                !Number.isSafeInteger(stock) ||
                stock < 0 ||
                !Number.isFinite(precio) ||
                precio < 0
            ) {
                return res.status(500).json({
                    mensaje: "Inventario con datos inválidos"
                });
            }

            if (cantidad > stock) {
                return res.status(409).json({
                    mensaje:
                        `Stock insuficiente para ${producto.nombre}. ` +
                        `Disponible: ${stock}`
                });
            }

            const subtotal = precio * cantidad;

            detallePedido.push({
                id: producto.id,
                nombre: producto.nombre,
                precio,
                cantidad,
                subtotal
            });

            total += subtotal;
        }

        const pedidos = leerPedidos();

        const nuevoPedido = {
            id: pedidos.length > 0
                ? Math.max(...pedidos.map(p => Number(p.id) || 0)) + 1
                : 1,
            fecha: new Date().toISOString(),
            cliente: {
                nombre: cliente.nombre.trim(),
                correo: cliente.correo.trim(),
                telefono: cliente.telefono.trim(),
                direccion: cliente.direccion.trim(),
                region: cliente.region.trim(),
                comuna: cliente.comuna.trim()
            },
            productos: detallePedido,
            total,
            estado: "Confirmado"
        };

        // Se guarda una copia para restaurar los pedidos
        // si falla la actualización del inventario.
        const pedidosAnteriores = [...pedidos];

        pedidos.push(nuevoPedido);

        for (const detalle of detallePedido) {
            const producto = productos.find(
                p => Number(p.id) === Number(detalle.id)
            );

            producto.stock -= detalle.cantidad;
        }

        guardarPedidos(pedidos);

        try {
            guardarProductos(productos);
        } catch (error) {
            try {
                guardarPedidos(pedidosAnteriores);
            } catch (errorRestauracion) {
                console.error(
                    "Error al restaurar pedidos:",
                    errorRestauracion
                );
            }

            throw error;
        }

        res.status(201).json({
            mensaje: "Pedido registrado correctamente",
            pedido: nuevoPedido
        });
    } catch (error) {
        console.error("Error al registrar pedido:", error);

        res.status(500).json({
            mensaje: "No se pudo registrar el pedido"
        });
    }
});

// ===============================
// INICIAR SERVIDOR
// ===============================

app.listen(PORT, () => {
    console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
    );
});
