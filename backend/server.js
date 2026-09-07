const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

// Permite recibir información en formato JSON
app.use(express.json());

// Ruta del archivo donde se guardan los productos
const archivoProductos = path.join(__dirname, "productos.json");

// Leer productos desde productos.json
function leerProductos() {
    try {
        const datos = fs.readFileSync(archivoProductos, "utf8");
        return JSON.parse(datos);
    } catch (error) {
        console.error("Error al leer los productos:", error);
        return [];
    }
}

// Guardar productos en productos.json
function guardarProductos(productos) {
    fs.writeFileSync(
        archivoProductos,
        JSON.stringify(productos, null, 4),
        "utf8"
    );
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
// OBTENER TODOS LOS PRODUCTOS
// ===============================

app.get("/api/productos", (req, res) => {
    const productos = leerProductos();

    res.json(productos);
});

// ===============================
// OBTENER PRODUCTO POR ID
// ===============================

app.get("/api/productos/:id", (req, res) => {
    const productos = leerProductos();
    const id = Number(req.params.id);

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    res.json(producto);
});

// ===============================
// CREAR PRODUCTO
// ===============================

app.post("/api/productos", (req, res) => {
    const productos = leerProductos();

    const {
        codigo,
        nombre,
        descripcion,
        precio,
        stock,
        categoria
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

    const nuevoProducto = {
        id: productos.length > 0
            ? Math.max(...productos.map(p => p.id)) + 1
            : 1,

        codigo,
        nombre,
        descripcion: descripcion || "",
        precio: Number(precio),
        stock: Number(stock),
        categoria
    };

    productos.push(nuevoProducto);

    guardarProductos(productos);

    res.status(201).json({
        mensaje: "Producto creado correctamente",
        producto: nuevoProducto
    });
});

// ===============================
// ACTUALIZAR PRODUCTO
// ===============================

app.put("/api/productos/:id", (req, res) => {
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
        categoria
    } = req.body;

    if (codigo !== undefined) producto.codigo = codigo;
    if (nombre !== undefined) producto.nombre = nombre;
    if (descripcion !== undefined) producto.descripcion = descripcion;
    if (precio !== undefined) producto.precio = Number(precio);
    if (stock !== undefined) producto.stock = Number(stock);
    if (categoria !== undefined) producto.categoria = categoria;

    guardarProductos(productos);

    res.json({
        mensaje: "Producto actualizado correctamente",
        producto
    });
});

// ===============================
// ELIMINAR PRODUCTO
// ===============================

app.delete("/api/productos/:id", (req, res) => {
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
});

// ===============================
// INICIAR SERVIDOR
// ===============================

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});