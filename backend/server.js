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

const archivoUsuarios = path.join(__dirname, "usuarios.json");

function leerUsuarios() {
    try {
        const datos = fs.readFileSync(archivoUsuarios, "utf8");
        return JSON.parse(datos);
    } catch (error) {
        console.error("Error al leer los usuarios:", error);
        return [];
    }
}

function guardarUsuarios(usuarios) {
    fs.writeFileSync(
        archivoUsuarios,
        JSON.stringify(usuarios, null, 4),
        "utf8"
    );
}

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
// OBTENER TODOS LOS USUARIOS
// ===============================

app.get("/api/usuarios", (req, res) => {
    const usuarios = leerUsuarios();

    res.json(usuarios);
});


// ===============================
// OBTENER USUARIO POR ID
// ===============================

app.get("/api/usuarios/:id", (req, res) => {
    const usuarios = leerUsuarios();
    const id = Number(req.params.id);

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    res.json(usuario);
});


// ===============================
// CREAR USUARIO
// ===============================

app.post("/api/usuarios", (req, res) => {
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

    const correoExistente = usuarios.find(
        u => u.correo === correo
    );

    if (correoExistente) {
        return res.status(400).json({
            mensaje: "El correo ya está registrado"
        });
    }

    const runExistente = usuarios.find(
        u => u.run === run
    );

    if (runExistente) {
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
});


// ===============================
// ACTUALIZAR USUARIO
// ===============================

app.put("/api/usuarios/:id", (req, res) => {
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
});


// ===============================
// ELIMINAR USUARIO
// ===============================

app.delete("/api/usuarios/:id", (req, res) => {
    const usuarios = leerUsuarios();
    const id = Number(req.params.id);

    const indice = usuarios.findIndex(
        u => u.id === id
    );

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    const usuarioEliminado =
        usuarios.splice(indice, 1)[0];

    guardarUsuarios(usuarios);

    res.json({
        mensaje: "Usuario eliminado correctamente",
        usuario: usuarioEliminado
    });
});

// ===============================
// INICIAR SERVIDOR
// ===============================

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});