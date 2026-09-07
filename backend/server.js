const express = require("express");

const app = express();
const PORT = 3000;

// Permite recibir información en formato JSON
app.use(express.json());

// Productos de la tienda
const productos = [
    {
        id: 1,
        codigo: "PROD001",
        nombre: "Mouse Gamer",
        descripcion: "Mouse gamer de alta precisión",
        precio: 19990,
        stock: 15,
        categoria: "Periféricos"
    },
    {
        id: 2,
        codigo: "PROD002",
        nombre: "Teclado Mecánico",
        descripcion: "Teclado mecánico para gaming",
        precio: 39990,
        stock: 10,
        categoria: "Periféricos"
    },
    {
        id: 3,
        codigo: "PROD003",
        nombre: "Audífonos Gamer",
        descripcion: "Audífonos gamer con micrófono",
        precio: 29990,
        stock: 20,
        categoria: "Audio"
    },
    {
        id: 4,
        codigo: "PROD004",
        nombre: "Monitor Gaming",
        descripcion: "Monitor gaming de alta resolución",
        precio: 149990,
        stock: 5,
        categoria: "Monitores"
    }
];

// Ruta principal del backend
app.get("/", (req, res) => {
    res.json({
        mensaje: "Backend Tienda Online funcionando correctamente"
    });
});

// Obtener todos los productos
app.get("/api/productos", (req, res) => {
    res.json(productos);
});

// Obtener un producto por su ID
app.get("/api/productos/:id", (req, res) => {
    const id = Number(req.params.id);

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    res.json(producto);
});

// Crear un nuevo producto
app.post("/api/productos", (req, res) => {
    const { codigo, nombre, descripcion, precio, stock, categoria } = req.body;

    // Validar campos obligatorios
    if (!codigo || !nombre || precio === undefined || stock === undefined || !categoria) {
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

    res.status(201).json({
        mensaje: "Producto creado correctamente",
        producto: nuevoProducto
    });
});

// Actualizar un producto
app.put("/api/productos/:id", (req, res) => {
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

    res.json({
        mensaje: "Producto actualizado correctamente",
        producto
    });
});

// Eliminar un producto
app.delete("/api/productos/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = productos.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    const productoEliminado = productos.splice(indice, 1);

    res.json({
        mensaje: "Producto eliminado correctamente",
        producto: productoEliminado[0]
    });
});


// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
}); 